export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionStatus = 'active' | 'inactive';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: BillingCycle;
  renewalDate: string;
  status: SubscriptionStatus;
  createdAt: string;
}

export interface SubscriptionFormData {
  name: string;
  cost: string;
  billingCycle: BillingCycle;
  renewalDate: string;
  status: SubscriptionStatus;
}

export type FilterType = 'all' | 'active' | 'inactive';

export interface SummaryData {
  totalMonthly: number;
  activeCount: number;
  upcomingRenewals: number;
}