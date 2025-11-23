// import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Search, Bell, ArrowLeftRight } from 'lucide-react';
import { MyCardsWidget } from '@/components/dashboard/MyCardsWidget';
import { SpendingSummaryWidget } from '@/components/dashboard/SpendingSummaryWidget';
import { TransactionsWidget } from '@/components/dashboard/TransactionsWidget';
import { ExpensesChartWidget } from '@/components/dashboard/ExpensesChartWidget';
// import { ExchangeWidget } from '@/components/dashboard/ExchangeWidget'; // (Simulated below)
// import { SubscriptionsWidget } from '@/components/dashboard/SubscriptionsWidget'; // (Simulated below)
import { CreditScoreWidget } from '@/components/dashboard/CreditScoreWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* <Sidebar /> */}
      
      {/* Main Content */}
      <main className="p-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
            
            {/* Column 1 (Left) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <MyCardsWidget />
                <TransactionsWidget />
            </div>

            {/* Column 2 (Middle) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <SpendingSummaryWidget />
                
                {/* Subscription Widget (Simplified inline for brevity) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">My Subscriptions</h3>
                        <Button variant="ghost" size="sm">See All</Button>
                    </div>
                    {/* Promo Card */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-between relative overflow-hidden">
                        <div className="relative z-10">
                           <p className="text-sm font-semibold">50% discount on Apple Music</p>
                           <p className="text-xs text-gray-500 mb-1">For only $4.99 per month!</p>
                           <a href="#" className="text-xs underline text-gray-600">Learn More</a>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg"></div>
                    </div>
                    
                    {/* List */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">S</div>
                                <div><p className="text-sm font-medium">Spotify</p><p className="text-xs text-gray-500">Monthly</p></div>
                            </div>
                            <div className="text-right"><p className="text-sm font-medium">$7.99</p><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Paid</span></div>
                        </div>
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">Y</div>
                                <div><p className="text-sm font-medium">Youtube</p><p className="text-xs text-gray-500">Yearly</p></div>
                            </div>
                            <div className="text-right"><p className="text-sm font-medium">$79.99</p><span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">Expiring</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 3 (Right) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <ExpensesChartWidget />
                
                {/* Exchange Widget (Simplified) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Exchange</h3>
                    </div>
                    <div className="border rounded-xl p-4 mb-4">
                         <div className="flex justify-between items-center mb-2">
                             <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-gray-200">🇺🇸</span> USD</div>
                             <input className="text-right w-24 outline-none font-medium" defaultValue="100.00" />
                         </div>
                         <div className="flex justify-center -my-3 relative z-10">
                             <div className="bg-white border rounded p-1"><ArrowLeftRight size={14} className="rotate-90"/></div>
                         </div>
                         <div className="flex justify-between items-center mt-2">
                             <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-[8px]">EU</span> EUR</div>
                             <div className="text-right w-24 font-medium text-gray-500">90.7</div>
                         </div>
                    </div>
                    <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Exchange</Button>
                </div>

                <CreditScoreWidget />
            </div>

        </div>
      </main>
    </div>
  );
}