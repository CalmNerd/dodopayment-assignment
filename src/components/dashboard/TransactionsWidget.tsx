import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Landmark, ChartLine } from 'lucide-react';
import { AmazonIcon, RecentTransactionsIcon, RentanIncomeIcon } from '../icons/icons';
import { TRANSACTIONS_CONSTANTS } from '@/constants';
import { Transaction } from '@/types';

const transactions: Transaction[] = [
    { id: 1, title: TRANSACTIONS_CONSTANTS.transactionTitles.salaryDeposit, sub: TRANSACTIONS_CONSTANTS.transactionDescriptions.salaryDeposit, amount: TRANSACTIONS_CONSTANTS.transactionAmounts.salaryDeposit, date: TRANSACTIONS_CONSTANTS.transactionDates.sep18, icon: Landmark, color: 'bg-background border-border' },
    { id: 2, title: TRANSACTIONS_CONSTANTS.transactionTitles.stockDividend, sub: TRANSACTIONS_CONSTANTS.transactionDescriptions.stockDividend, amount: TRANSACTIONS_CONSTANTS.transactionAmounts.stockDividend, date: TRANSACTIONS_CONSTANTS.transactionDates.sep18, icon: ChartLine, color: 'bg-background border-border' },
    { id: 3, title: TRANSACTIONS_CONSTANTS.transactionTitles.rentalIncome, sub: TRANSACTIONS_CONSTANTS.transactionDescriptions.rentalIncome, amount: TRANSACTIONS_CONSTANTS.transactionAmounts.rentalIncome, date: TRANSACTIONS_CONSTANTS.transactionDates.sep17, icon: RentanIncomeIcon, color: 'bg-[#E0FAEC] text-[#1FC16B] border-transparent' },
    { id: 4, title: TRANSACTIONS_CONSTANTS.transactionTitles.refundAmazon, sub: TRANSACTIONS_CONSTANTS.transactionDescriptions.refundAmazon, amount: TRANSACTIONS_CONSTANTS.transactionAmounts.refundAmazon, date: TRANSACTIONS_CONSTANTS.transactionDates.sep15, icon: AmazonIcon, color: 'bg-background border-border' },
];

export const TransactionsWidget = () => {
    return (
        <Card className="shadow-xs h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 w-full">
                    <div className="p-0.5">
                        <RecentTransactionsIcon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex-1text-base font-medium text-foreground line-clamp-1">{TRANSACTIONS_CONSTANTS.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
                    {TRANSACTIONS_CONSTANTS.seeAll}
                </Button>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-3">
                {/* Tabs */}
                <Tabs defaultValue="incoming" className="w-full">
                    <TabsList className="flex gap-px bg-muted p-1 rounded-xl w-full h-auto">
                        <TabsTrigger value="incoming" className="flex-1 h-auto rounded-md px-0 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border-0 data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground data-[state=active]:rounded-lg transition-all">{TRANSACTIONS_CONSTANTS.tabs.incoming}</TabsTrigger>
                        <TabsTrigger value="outgoing" className="flex-1 h-auto rounded-md px-0 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border-0 data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground data-[state=active]:rounded-lg transition-colors">{TRANSACTIONS_CONSTANTS.tabs.outgoing}</TabsTrigger>
                        <TabsTrigger value="pending" className="flex-1 h-auto rounded-md px-0 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border-0 data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground data-[state=active]:rounded-lg transition-colors">{TRANSACTIONS_CONSTANTS.tabs.pending}</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="space-y-2">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between gap-3 group cursor-pointer p-2 hover:bg-muted/50 rounded-xl transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${tx.color === 'bg-background border-border' ? 'bg-card border-border' : tx.color}`}>
                                    <tx.icon size={18} className={tx.color.includes('text-[#1FC16B]') ? 'text-[#1FC16B]' : 'text-foreground'} />
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <p className="text-sm font-medium text-foreground line-clamp-1">{tx.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{tx.sub}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                                <p className="text-xs text-muted-foreground">{tx.date}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-muted-foreground group-hover:text-foreground">
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
