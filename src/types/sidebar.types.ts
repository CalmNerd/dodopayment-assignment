import React from 'react';

export interface SidebarNavItem {
  group?: string;
  items: {
    title: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
  }[];
}

export interface Team {
  name: string;
  logo: React.ReactNode;
  plan: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}