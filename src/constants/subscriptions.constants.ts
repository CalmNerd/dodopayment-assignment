export const SUBSCRIPTIONS_CONSTANTS = {
  // Widget title
  title: 'My Subscriptions',

  // Button labels
  seeAll: 'See All',
  learnMore: 'Learn More',

  // Promo card
  promoTitle: '50% discount on Apple Music',
  promoDescription: 'For only $4.99 per month!',

  // Subscription names
  subscriptionNames: {
    salaryDeposit: 'Salary Deposit',
    youtubeMusic: 'Youtube Music',
    primeVideo: 'Prime Video',
  },

  // Subscription prices
  subscriptionPrices: {
    appleMusic: '$4.99',
    salaryDeposit: '$7.99',
    youtubeMusic: '$79.99',
    primeVideo: '$9.99',
  },

  // Time periods
  perMonth: '/month',
  perYear: '/year',

  // Status labels
  status: {
    paid: 'Paid',
    expiring: 'Expiring',
    pending: 'Pending',
  },
} as const;