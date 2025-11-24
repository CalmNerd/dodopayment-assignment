import { MyCardsWidget } from '@/components/dashboard/MyCardsWidget';
import { SpendingSummaryWidget } from '@/components/dashboard/SpendingSummaryWidget';
import { TransactionsWidget } from '@/components/dashboard/TransactionsWidget';
import { ExpensesChartWidget } from '@/components/dashboard/ExpensesChartWidget';
import { ExchangeWidget } from '@/components/dashboard/ExchangeWidget';
import { SubscriptionsWidget } from '@/components/dashboard/SubscriptionsWidget';
import { CreditScoreWidget } from '@/components/dashboard/CreditScoreWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Main Content */}
      <main className="px-6 lg:px-8 max-w-[1600px] mx-auto pt-1 pb-10">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1 (Left) */}
          <div className="space-y-6">
            <MyCardsWidget />
            <TransactionsWidget />
          </div>

          {/* Column 2 (Middle) */}
          <div className="space-y-6">
            <SpendingSummaryWidget />
            <SubscriptionsWidget />
          </div>

          {/* Column 3 (Right) */}
          <div className="space-y-6">
            <ExpensesChartWidget />
            <ExchangeWidget />
            <CreditScoreWidget />
          </div>

        </div>
      </main>
    </div>
  );
}
