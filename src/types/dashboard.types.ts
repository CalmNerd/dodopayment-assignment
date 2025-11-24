import React from 'react';

export type TimeFrame = 'daily' | 'weekly' | 'monthly';

export interface SpendingLimit {
  limit: number;
  spent: number;
  label: string;
}

export interface SpendingLimitsConfig {
  daily: SpendingLimit;
  weekly: SpendingLimit;
  monthly: SpendingLimit;
}

export interface Transaction {
  id: number;
  title: string;
  sub: string;
  amount: string;
  date: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export interface SpendingCategory {
  label: string;
  amount: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Subscription {
  name: string;
  price: string;
  period: string;
  status: 'paid' | 'expiring' | 'pending';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface LineChartData {
  value: number;
}