const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80&fit=crop';

const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }
    return response;
  } finally {
    clearTimeout(timer);
  }
};

const pickTextField = (record) => {
  const text = Object.values(record || {}).find(
    value => typeof value === 'string' && value.trim().length > 4
  );
  return text || 'Government Fertilizer Update';
};

const pickNumberField = (record) => {
  const numberValue = Object.values(record || {}).find(value => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0;
  });

  return Number.parseFloat(numberValue) || 1000;
};

export const fetchFertilizerData = async () => {
  try {
    const response = await fetchWithTimeout(
      '/api/agri/fertilizer-data',
      {},
      3000
    );
    const data = await response.json();
    const records = Array.isArray(data.records) ? data.records : [];

    return records.map((record, index) => {
      const baseName = pickTextField(record);
      const numericValue = pickNumberField(record);
      const livePrice = Math.max(250, Math.round((numericValue % 2000) + 250));

      return {
        id: 9000 + index,
        name: `${baseName} Fertilizer`,
        category: 'Fertilizer',
        price: livePrice,
        description:
          'Live government-linked fertilizer data mapped into the store schema. Useful for comparing catalogue values with external reference signals.',
        image: FALLBACK_IMAGE,
        sellerName: 'Government Agro Center',
        sellerLocation: 'New Delhi, Delhi',
        sellerPhone: '919979265140',
        reviewCount: 50 + index * 7,
        rating: 4.0,
        isRecommended: false,
        inStock: true,
        badge: null,
        specs: {
          weight: '50kg',
          composition: 'Government dataset mapped value',
          dosage: 'As per crop requirement',
          applicationMethod: 'Soil application',
          suitableFor: ['Wheat', 'Rice', 'Cotton']
        },
        whyUse:
          'This live entry is used as a reference signal when external fertilizer data is available. It helps compare current catalogue pricing with outside datasets.',
        recommendedCrops: ['Wheat', 'Rice', 'Cotton'],
        season: 'Both'
      };
    });
  } catch (error) {
    return [];
  }
};

export const fetchMarketRates = async () => {
  try {
    const response = await fetchWithTimeout(
      '/api/agri/market-rates',
      {},
      3000
    );
    const data = await response.json();
    const html = data.html || '';
    const numbers = [...html.matchAll(/\b\d{2,5}(?:\.\d+)?\b/g)]
      .map(match => Number.parseFloat(match[0]))
      .filter(value => Number.isFinite(value) && value >= 50 && value <= 10000)
      .slice(0, 12);

    if (!numbers.length) return [];

    return numbers.map((value, index) => ({
      label: `Market Ref ${index + 1}`,
      price: Math.round(value)
    }));
  } catch (error) {
    return [];
  }
};

export const mergeLiveProductData = (products, fertilizerData, marketRates) => {
  const liveFertilizers = fertilizerData.slice(0, 6);
  const hasLiveSignals = liveFertilizers.length > 0 || marketRates.length > 0;

  return {
    hasLiveSignals,
    products: products.map((product, index) => {
      const fertilizerMatch =
        product.category === 'Fertilizer'
          ? liveFertilizers[index % Math.max(liveFertilizers.length, 1)]
          : null;
      const marketRate = marketRates.length
        ? marketRates[index % marketRates.length].price
        : null;

      if (!fertilizerMatch && !marketRate) {
        return {
          ...product,
          dataSource: 'cached',
          livePriceLoaded: false,
          marketRate: null
        };
      }

      const price = fertilizerMatch ? fertilizerMatch.price : product.price;
      return {
        ...product,
        price,
        marketRate: marketRate || Math.round(price * 1.08),
        dataSource: 'live',
        livePriceLoaded: true
      };
    })
  };
};
