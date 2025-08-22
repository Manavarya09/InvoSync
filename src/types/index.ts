export interface Invoice {
  id: string;
  userId?: string;
  vendor: string;
  invoiceNo: string;
  date: string;
  currency: string;
  total: number;
  rawText: string;
  lineItems: LineItem[];
  createdAt: string;
}

export interface LineItem {
  id: string;
  invoiceId: string;
  description: string;
  amount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd?: string;
}

export interface UsageLimit {
  id: string;
  userId: string;
  monthYear: string;
  invoicesParsed: number;
  updatedAt: string;
}