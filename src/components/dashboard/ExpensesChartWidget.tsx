"use client";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownLeft } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { EXPENSES_CHART_CONSTANTS } from '@/constants';
import { LineChartData } from '@/types';

const data: LineChartData[] = [
    { value: 4000 },
    { value: 3000 },
    { value: 5000 },
    { value: 2780 },
    { value: 1890 },
    { value: 2390 },
    { value: 3490 },
];

export const ExpensesChartWidget = () => {
    return (
        <Card className="shadow-xs relative h-[178px] flex flex-col justify-center">
            <CardContent className="p-4 space-y-4 relative">
                {/* Header Section */}
                <div className="flex flex-col gap-4">
                     {/* Icon */}
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card shadow-sm">
                        <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Title & Amount */}
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{EXPENSES_CHART_CONSTANTS.totalExpenses}</p>
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-medium text-foreground tracking-tight">{EXPENSES_CHART_CONSTANTS.defaultTotalExpenses}</h2>
                             <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FFC0C5] bg-opacity-50">
                                <span className="text-xs font-medium text-[#681219]">{EXPENSES_CHART_CONSTANTS.percentageChange}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart (Absolute positioned) */}
                <div className="absolute top-8 right-6 w-[120px] h-[60px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#335CFF" 
                                strokeWidth={2} 
                                dot={false} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
