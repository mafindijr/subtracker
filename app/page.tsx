'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSubscriptions } from '@/context/SubscriptionContext';
import { Subscription } from '@/types';
import { formatCurrency } from '@/lib/storage';
import {
  Navbar,
  ThemeToggle,
  SummaryCard,
  SubscriptionCard,
  SubscriptionForm,
  EmailForm,
  SearchBar,
  FilterTabs,
  SortSelect,
  PricingSection,
  ServicesSection,
  CurrencyInsight,
} from '@/components';

const SpendingChart = dynamic(() => import('@/components').then(mod => ({ default: mod.SpendingChart })));

export default function Dashboard() {
  const {
    filteredSubscriptions,
    searchQuery,
    filterType,
    summary,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    setSearchQuery,
    setFilterType,
  } = useSubscriptions();

  const [showForm, setShowForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [sortOption, setSortOption] = useState<'renewal' | 'cost' | 'name'>('renewal');

  const handleAdd = (data: Parameters<typeof addSubscription>[0]) => {
    addSubscription(data);
    setShowForm(false);
  };

  const handleEdit = (data: Parameters<typeof addSubscription>[0]) => {
    if (editingSubscription) {
      updateSubscription(editingSubscription.id, data);
      setEditingSubscription(null);
    }
  };

  const handleEditClick = (subscription: Subscription) => {
    setEditingSubscription(subscription);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      deleteSubscription(id);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSubscription(null);
  };

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === 'cost') {
      return a.cost - b.cost;
    }
    return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar>
        <ThemeToggle />
      </Navbar>

      <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Track and manage your subscriptions
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="Monthly Spending"
              value={formatCurrency(summary.totalMonthly)}
              subtitle="Total active subscriptions"
              variant="default"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <SummaryCard
              title="Active Subscriptions"
              value={summary.activeCount}
              subtitle={`${filteredSubscriptions.length} shown`}
              variant="success"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <SummaryCard
              title="Upcoming Renewals"
              value={summary.upcomingRenewals}
              subtitle="Within 7 days"
              variant={summary.upcomingRenewals > 0 ? 'warning' : 'default'}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Subscriptions
                  </h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Subscription
                  </button>
                </div>

                <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_auto]">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <FilterTabs activeFilter={filterType} onFilterChange={setFilterType} />
                  </div>
                  <SortSelect value={sortOption} onChange={setSortOption} />
                </div>

                {sortedSubscriptions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                      No subscriptions found
                    </h3>
                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                      {searchQuery || filterType !== 'all'
                        ? 'Try adjusting your search or filter'
                        : 'Add your first subscription to get started'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {sortedSubscriptions.map((subscription) => (
                      <SubscriptionCard
                        key={subscription.id}
                        subscription={subscription}
                        onEdit={handleEditClick}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <SpendingChart />
              <EmailForm />
              <CurrencyInsight />
            </div>
          </div>
        
          <div className="mb-8 space-y-8">
            <ServicesSection />
            <PricingSection />
          </div>
        
        </div>
      </main>

      {showForm && (
        <SubscriptionForm
          onSubmit={handleAdd}
          onCancel={handleCancelForm}
        />
      )}

      {editingSubscription && (
        <SubscriptionForm
          subscription={editingSubscription}
          onSubmit={handleEdit}
          onCancel={handleCancelForm}
        />
      )}
    </>
  );
}
