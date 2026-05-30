'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Subscription, SubscriptionFormData, FilterType, SummaryData } from '@/types';
import {
  getSubscriptions,
  saveSubscriptions,
  generateId,
  calculateMonthlyEquivalent,
  isUpcomingRenewal
} from '@/lib/storage';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  filteredSubscriptions: Subscription[];
  searchQuery: string;
  filterType: FilterType;
  filterCategory: string;
  filterBillingCycle: string;
  isLoading: boolean;
  summary: SummaryData;
  addSubscription: (data: SubscriptionFormData) => void;
  updateSubscription: (id: string, data: SubscriptionFormData) => void;
  deleteSubscription: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
  setFilterCategory: (category: string) => void;
  setFilterBillingCycle: (cycle: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBillingCycle, setFilterBillingCycle] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      const loaded = getSubscriptions();
      setSubscriptions(loaded);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveSubscriptions(subscriptions);
    }
  }, [subscriptions, isLoading]);

  const filteredSubscriptions = subscriptions
    .filter(sub => {
      // Status filter
      if (filterType === 'active' && sub.status !== 'active') return false;
      if (filterType === 'inactive' && sub.status !== 'inactive') return false;

      // Category filter
      if (filterCategory !== 'all' && sub.category !== filterCategory) return false;

      // Billing cycle filter
      if (filterBillingCycle !== 'all' && sub.billingCycle !== filterBillingCycle) return false;

      // Search query
      if (searchQuery && !sub.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    })
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime());

  const summary: SummaryData = {
    totalMonthly: subscriptions.reduce((total, sub) => {
      if (sub.status === 'active') {
        return total + calculateMonthlyEquivalent(sub.cost, sub.billingCycle);
      }
      return total;
    }, 0),
    activeCount: subscriptions.filter(sub => sub.status === 'active').length,
    upcomingRenewals: subscriptions.filter(sub =>
      sub.status === 'active' && isUpcomingRenewal(sub.renewalDate, 7)
    ).length,
    annualProjection: subscriptions.reduce((total, sub) => {
      if (sub.status === 'active') {
        const monthly = calculateMonthlyEquivalent(sub.cost, sub.billingCycle);
        return total + (monthly * 12);
      }
      return total;
    }, 0),
  };

  const addSubscription = useCallback((data: SubscriptionFormData) => {
    const newSubscription: Subscription = {
      id: generateId(),
      name: data.name,
      cost: parseFloat(data.cost),
      billingCycle: data.billingCycle,
      category: data.category,
      renewalDate: data.renewalDate,
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    setSubscriptions(prev => [...prev, newSubscription]);
  }, []);

  const updateSubscription = useCallback((id: string, data: SubscriptionFormData) => {
    setSubscriptions(prev => prev.map(sub =>
      sub.id === id
        ? {
          ...sub,
          name: data.name,
          cost: parseFloat(data.cost),
          billingCycle: data.billingCycle,
          category: data.category,
          renewalDate: data.renewalDate,
          status: data.status,
        }
        : sub
    ));
  }, []);

  const deleteSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  }, []);

  return (
    <SubscriptionContext.Provider value={{
      subscriptions,
      filteredSubscriptions,
      searchQuery,
      filterType,
      filterCategory,
      filterBillingCycle,
      isLoading,
      summary,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      setSearchQuery,
      setFilterType,
      setFilterCategory,
      setFilterBillingCycle,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
}
