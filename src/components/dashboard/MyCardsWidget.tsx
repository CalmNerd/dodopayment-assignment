'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Plus, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ApexLogoIcon, DebitCardIcon, WifiIcon } from '@/components/icons/icons';
import { formatCurrency } from '@/lib/utils';
import { MY_CARDS_CONSTANTS } from '@/constants';
import { TimeFrame, SpendingLimitsConfig } from '@/types';

const SPENDING_LIMITS: SpendingLimitsConfig = {
    daily: { limit: 500, spent: 325, label: MY_CARDS_CONSTANTS.timePeriods.day },
    weekly: { limit: 1500, spent: 920, label: MY_CARDS_CONSTANTS.timePeriods.week },
    monthly: { limit: 5000, spent: 3200, label: MY_CARDS_CONSTANTS.timePeriods.month },
} as const;

const MAX_LIMIT = SPENDING_LIMITS.monthly.limit;

const useCSSVariable = (variableName: string, fallback: string) => {
    const [color, setColor] = useState(fallback);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            const value = getComputedStyle(root)
                .getPropertyValue(variableName)
                .trim();
            if (value) {
                setColor(value);
            }
        }
    }, [variableName]);

    return color;
};

const SpendingLimitDisplay = ({ timeFrame }: { timeFrame: TimeFrame }) => {
    const { limit, spent, label } = SPENDING_LIMITS[timeFrame];

    const primaryColor = useCSSVariable('--primary', '#335CFF');
    const borderColor = useCSSVariable('--border', '#E1E4EA');

    const remaining = Math.max(0, MAX_LIMIT - limit);

    const pieData = [
        { name: 'timeframeLimit', value: limit },
        { name: 'remaining', value: remaining },
    ];

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={14}
                            outerRadius={20}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell key="timeframeLimit" fill={primaryColor} />
                            <Cell key="remaining" fill={borderColor} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex-1 w-full">
                <p className="text-sm text-muted-foreground">{MY_CARDS_CONSTANTS.spendingLimit}</p>
                <div className="flex items-center gap-1">
                    <span className="text-lg font-medium text-foreground">{formatCurrency(limit)}</span>
                    <span className="text-xs text-muted-foreground">/ {label}</span>
                </div>
            </div>

            <Button variant="outline" size="icon" className="h-6 w-6 rounded-md border-border">
                <ChevronRight size={14} className="text-muted-foreground" />
            </Button>
        </div>
    );
};

export const MyCardsWidget = () => {
    return (
        <Card className="shadow-xs flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="">
                        <DebitCardIcon className="text-muted-foreground size-6" />
                    </div>
                    <CardTitle className="text-base font-medium text-foreground">{MY_CARDS_CONSTANTS.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Plus size={14} /> {MY_CARDS_CONSTANTS.addCard}
                </Button>
            </CardHeader>
            <CardContent className="flex-1 gap-4 flex flex-col justify-between">
                <div className="relative h-[188px] w-full bg-card border border-border rounded-2xl p-5 overflow-hidden flex flex-col justify-between shadow-xs">
                    <div className="absolute -right-20 -top-24 w-32 h-40 rounded-lg -skew-x-28 border border-border  opacity-50"></div>
                    <div className="absolute -right-32 -top-10 w-32 h-40 rounded-lg -skew-x-28 border border-border  opacity-50"></div>

                    <div className="flex justify-between items-start z-10">
                        <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <ApexLogoIcon className='size-8' />
                                <WifiIcon className='size-6' />
                            </div>

                            <div className="flex items-center gap-1 pr-2 py-0.5 rounded-sm border border-border bg-white">
                                <div className="rounded-full p-1 flex items-center justify-center"><Check size={12} className='text-background bg-green-500 rounded-full p-px' /></div>
                                <span className="text-xs font-medium text-muted-foreground">{MY_CARDS_CONSTANTS.active}</span>
                            </div>

                        </div>

                        {/* Mastercard Logo */}
                        <div className="flex -space-x-2 translate-y-1">
                            <div className="w-6 h-6 bg-[#EB001B] rounded-full opacity-80"></div>
                            <div className="w-6 h-6 bg-[#F79E1B] rounded-full opacity-80"></div>
                        </div>
                    </div>

                    <div className="z-10 mt-auto mb-2">
                        <p className="text-sm text-muted-foreground">{MY_CARDS_CONSTANTS.savingsCard}</p>
                        <div className="flex justify-between items-end mt-1">
                            <h3 className="text-3xl font-medium text-foreground tracking-tight">{MY_CARDS_CONSTANTS.defaultBalance}</h3>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-1 bg-card border border-border rounded-md p-1 z-10">
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-[4px]">
                            <ChevronRight className="h-3 w-3 rotate-180" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-[4px]">
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                <Tabs
                    defaultValue="weekly"
                    className="items-center space-y-5 py-0"
                >
                    <TabsList className="flex gap-px w-full p-0 h-auto bg-border rounded-sm border border-border overflow-hidden shadow-none">
                        <TabsTrigger
                            value="daily"
                            className="flex-1 bg-background data-[state=active]:bg-muted py-1 text-sm font-medium transition-all rounded-none !shadow-none border-none h-auto data-[state=active]:text-foreground data-[state=active]:!shadow-none data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                        >
                            {MY_CARDS_CONSTANTS.timeFrames.daily}
                        </TabsTrigger>
                        <TabsTrigger
                            value="weekly"
                            className="flex-1 bg-background data-[state=active]:bg-muted py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-none !shadow-none border-none h-auto data-[state=active]:text-foreground data-[state=active]:!shadow-none"
                        >
                            {MY_CARDS_CONSTANTS.timeFrames.weekly}
                        </TabsTrigger>
                        <TabsTrigger
                            value="monthly"
                            className="flex-1 bg-background data-[state=active]:bg-muted py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-none !shadow-none border-none h-auto data-[state=active]:text-foreground data-[state=active]:!shadow-none"
                        >
                            {MY_CARDS_CONSTANTS.timeFrames.monthly}
                        </TabsTrigger>
                    </TabsList>
                    <div className='w-full'>
                        <TabsContent value="daily" className="mt-0 w-full">
                            <SpendingLimitDisplay timeFrame="daily" />
                        </TabsContent>
                        <TabsContent value="weekly" className="mt-0 w-full">
                            <SpendingLimitDisplay timeFrame="weekly" />
                        </TabsContent>
                        <TabsContent value="monthly" className="mt-0 w-full">
                            <SpendingLimitDisplay timeFrame="monthly" />
                        </TabsContent>
                    </div>

                </Tabs>

            </CardContent>
        </Card>
    );
};
