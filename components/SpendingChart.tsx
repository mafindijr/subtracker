'use client';

import { useSubscriptions } from '@/context/SubscriptionContext';
import { formatCurrency } from '@/lib/storage';

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#0ea5e9', '#3b82f6'
];

export function SpendingChart() {
  const { subscriptions } = useSubscriptions();

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  if (activeSubscriptions.length === 0) {
    return null;
  }

  const chartData = activeSubscriptions.map(sub => ({
    name: sub.name,
    value: sub.billingCycle === 'yearly' ? sub.cost / 12 : sub.cost,
    fullCost: sub.cost,
    cycle: sub.billingCycle,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Monthly Spending Breakdown
      </h3>
      
      <div className="mt-4 space-y-3">
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.name}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {formatCurrency(item.value)}/mo
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
              <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                {percentage.toFixed(1)}% · {formatCurrency(item.fullCost)}/{item.cycle === 'monthly' ? 'mo' : 'yr'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Total Monthly</span>
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}