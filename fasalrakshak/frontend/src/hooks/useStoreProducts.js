import { useEffect, useState } from 'react';
import { storeData } from '../pages/Store/storeData';
import {
  fetchFertilizerData,
  fetchMarketRates,
  mergeLiveProductData
} from '../services/agriAPI';

const baseProducts = storeData.map(product => ({
  ...product,
  dataSource: 'cached',
  livePriceLoaded: false,
  marketRate: null
}));

export const useStoreProducts = () => {
  const [products, setProducts] = useState(baseProducts);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [fertilizerData, marketRates] = await Promise.all([
          fetchFertilizerData(),
          fetchMarketRates()
        ]);

        if (!active) return;

        const merged = mergeLiveProductData(baseProducts, fertilizerData, marketRates);
        setProducts(merged.products);
        setIsLive(merged.hasLiveSignals);
        setError(merged.hasLiveSignals ? null : 'Using cached catalogue data');
      } catch (loadError) {
        if (!active) return;
        setProducts(baseProducts);
        setIsLive(false);
        setError('Using cached catalogue data');
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { products, isLive, isLoading, error };
};

export default useStoreProducts;
