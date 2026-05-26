export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionStatus = 'active' | 'inactive';

export type SubscriptionCategory =
  | 'Entertainment'
  | 'Software'
  | 'Utilities'
  | 'Health'
  | 'Finance'
  | 'Education'
  | 'Other';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: BillingCycle;
  category: SubscriptionCategory;
  renewalDate: string;
  status: SubscriptionStatus;
  createdAt: string;
}

export interface SubscriptionFormData {
  name: string;
  cost: string;
  billingCycle: BillingCycle;
  category: SubscriptionCategory;
  renewalDate: string;
  status: SubscriptionStatus;
}

export type FilterType = 'all' | 'active' | 'inactive';

export interface SummaryData {
  totalMonthly: number;
  activeCount: number;
  upcomingRenewals: number;
  annualProjection: number;
}