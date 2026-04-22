'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  isLoading: boolean;
  summary: SummaryData;
  addSubscription: (data: SubscriptionFormData) => void;
  updateSubscription: (id: string, data: SubscriptionFormData) => void;
  deleteSubscription: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = getSubscriptions();
    setSubscriptions(loaded);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveSubscriptions(subscriptions);
    }
  }, [subscriptions, isLoading]);

  const filteredSubscriptions = subscriptions
    .filter(sub => {
      if (filterType === 'active') return sub.status === 'active';
      if (filterType === 'inactive') return sub.status === 'inactive';
      return true;
    })
    .filter(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
  };

  const addSubscription = useCallback((data: SubscriptionFormData) => {
    const newSubscription: Subscription = {
      id: generateId(),
      name: data.name,
      cost: parseFloat(data.cost),
      billingCycle: data.billingCycle,
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
      isLoading,
      summary,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      setSearchQuery,
      setFilterType,
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