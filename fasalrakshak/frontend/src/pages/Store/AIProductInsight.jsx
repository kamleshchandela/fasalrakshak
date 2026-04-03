import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, Loader2, Sparkles } from 'lucide-react';

const parseAdvice = (text) =>
  text
    .split('\n')
    .map(line => line.replace(/^[-*\d.\s]+/, '').trim())
    .filter(Boolean)
    .slice(0, 4);

const AIProductInsight = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState([]);
  const [error, setError] = useState('');

  const prompt = useMemo(
    () => `
    You are an agricultural expert. A farmer is looking at buying:
    Product: ${product.name}
    Category: ${product.category}
    Composition: ${product.specs.composition}
    Suitable for: ${product.recommendedCrops.join(', ')}
    Season: ${product.season}

    Give a SHORT response (max 4 bullet points) covering:
    1. Best time to apply this product
    2. One common mistake farmers make with it
    3. What NOT to mix it with
    4. Expected result after correct use

    Keep language simple. Farmer-friendly. No jargon.
  `,
    [product]
  );

  const handleFetchAdvice = async () => {
    if (advice.length) {
      setIsExpanded(current => !current);
      return;
    }

    setIsExpanded(true);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agri/anthropic-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Could not fetch AI advice.');
      }

      const data = await response.json();
      const text = data?.content?.map?.(item => item.text).join('\n') || '';
      const points = parseAdvice(text);

      if (!points.length) {
        throw new Error('No advice returned.');
      }

      setAdvice(points);
    } catch (fetchError) {
      setError(fetchError.message || 'AI advice is not available right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-700" />
          <h3 className="text-sm font-bold text-amber-900">AI Product Insight</h3>
        </div>
        <button
          onClick={() => setIsExpanded(current => !current)}
          className="rounded-full p-1 text-amber-700 transition-colors hover:bg-amber-100"
          aria-label="Toggle AI advice"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <button
        onClick={handleFetchAdvice}
        className="mt-3 flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-amber-600"
      >
        <Sparkles className="h-4 w-4" />
        Get AI Advice
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3 text-sm text-amber-950">
          {isLoading && (
            <div className="flex items-center gap-2 font-medium text-amber-800">
              <Loader2 className="h-4 w-4 animate-spin" />
              Getting expert advice...
            </div>
          )}

          {!isLoading && error && (
            <p className="rounded-xl bg-white/70 p-3 text-amber-900">{error}</p>
          )}

          {!isLoading &&
            !error &&
            advice.map(point => (
              <div key={point} className="flex items-start gap-2 rounded-xl bg-white/70 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                <p>{point}</p>
              </div>
            ))}

          <p className="text-xs text-amber-800">
            AI advice is suggestive. Consult local agronomist for critical decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIProductInsight;
