import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Home, ShoppingCart, TrendingUp } from 'lucide-react';

const transactions = [
    { id: 1, title: 'Salary Deposit', sub: 'Monthly salary', amount: '$3,500.00', date: 'Sep 18', icon: Home, type: 'incoming' },
    { id: 2, title: 'Stock Dividend', sub: 'Payment from investments', amount: '$846.14', date: 'Sep 18', icon: TrendingUp, type: 'incoming' },
    { id: 3, title: 'Refund from Amazon', sub: 'Order #124235', amount: '$36.24', date: 'Sep 15', icon: ShoppingCart, type: 'incoming' },
];

export const TransactionsWidget = () => {
    return (
        <Card className="rounded-2xl border-gray-100 shadow-sm h-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-base font-medium text-gray-900">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-500 text-xs">See All</Button>
            </CardHeader>
            <CardContent>
                {/* Tabs mockup */}
                <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                    <button className="flex-1 bg-white shadow-sm rounded-md py-1 text-sm font-medium text-gray-900">Incoming</button>
                    <button className="flex-1 py-1 text-sm font-medium text-gray-500">Outgoing</button>
                    <button className="flex-1 py-1 text-sm font-medium text-gray-500">Pending</button>
                </div>

                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-700">
                                    <tx.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{tx.title}</p>
                                    <p className="text-xs text-gray-500">{tx.sub}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{tx.amount}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                                <ArrowUpRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};