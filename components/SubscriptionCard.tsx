'use client';

import { Subscription } from '@/types';
import { formatCurrency, formatDate, isUpcomingRenewal, calculateMonthlyEquivalent } from '@/lib/storage';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
  const monthlyEquivalent = calculateMonthlyEquivalent(subscription.cost, subscription.billingCycle);
  const isUpcoming = subscription.status === 'active' && isUpcomingRenewal(subscription.renewalDate, 7);

  return (
    <div className={`group relative rounded-xl border bg-white p-5 transition-all hover:shadow-lg dark:bg-zinc-900 ${
      isUpcoming 
        ? 'border-amber-300 dark:border-amber-700' 
        : 'border-zinc-200 dark:border-zinc-800'
    }`}>
      {isUpcoming && (
        <div className="absolute -top-2 -right-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-medium text-white">
          Renews soon
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {subscription.name}
            </h3>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
              subscription.status === 'active'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            }`}>
              {subscription.status}
            </span>
          </div>
          
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatCurrency(subscription.cost)}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
            </span>
          </div>

          {subscription.billingCycle === 'yearly' && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {formatCurrency(monthlyEquivalent)}/mo equivalent
            </p>
          )}
          
          <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <span>Renews: {formatDate(subscription.renewalDate)}</span>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(subscription)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Edit subscription"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(subscription.id)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
            aria-label="Delete subscription"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}