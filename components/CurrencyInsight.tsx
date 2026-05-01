'use client';

import { useEffect, useState } from 'react';

interface RateData {
  rate: number;
  base: string;
  target: string;
  updatedAt: string;
}

export function CurrencyInsight() {
  const [data, setData] = useState<RateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadRate() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=NGN', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to load exchange rate');
        }

        const json = await response.json();
        const rate = json.rates?.NGN;
        const updatedAt = json.date;

        if (typeof rate !== 'number') {
          throw new Error('Exchange rate unavailable');
        }

        setData({
          rate,
          base: 'USD',
          target: 'NGN',
          updatedAt,
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('Could not load currency data right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadRate();

    return () => controller.abort();
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600 dark:text-indigo-300">
            Market Insight
          </p>
          <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            USD to NGN exchange rate
          </h3>
        </div>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          Live API
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-3/5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-2/5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : data ? (
          <div className="space-y-4">
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <p className="text-4xl font-semibold text-zinc-950 dark:text-zinc-50">
                {data.rate.toFixed(2)}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                1 {data.base} = {data.target}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-950/60">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Conversion example</p>
                <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">
                  12 USD ~ {Number(12 * data.rate).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-950/60">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">Updated</p>
                <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">{data.updatedAt}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
