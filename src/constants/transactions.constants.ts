export const TRANSACTIONS_CONSTANTS = {
  // Widget title
  title: 'Recent Transactions',

  // Button labels
  seeAll: 'See All',

  // Tab labels
  tabs: {
    incoming: 'Incoming',
    outgoing: 'Outgoing',
    pending: 'Pending',
  },

  // Transaction titles
  transactionTitles: {
    salaryDeposit: 'Salary Deposit',
    stockDividend: 'Stock Dividend',
    rentalIncome: 'Rental Income',
    refundAmazon: 'Refund from Amazon',
  },

  // Transaction descriptions
  transactionDescriptions: {
    salaryDeposit: 'Monthly salary from Apex...',
    stockDividend: 'Payment from stock investm...',
    rentalIncome: 'Rental payment from Mr. Du...',
    refundAmazon: 'Refund of Order No #124235',
  },

  // Transaction amounts
  transactionAmounts: {
    salaryDeposit: '$3,500.00',
    stockDividend: '$846.14',
    rentalIncome: '$100.00',
    refundAmazon: '$36.24',
  },

  // Transaction dates
  transactionDates: {
    sep18: 'Sep 18',
    sep17: 'Sep 17',
    sep15: 'Sep 15',
  },
} as const;