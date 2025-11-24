"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShoppingBag, FileText, DollarSign } from 'lucide-react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { InfoIcon } from '../icons/icons';

const data = [
    { name: 'Shopping', value: 900, color: '#335CFF' },
    { name: 'Utilities', value: 600, color: '#47C2FF' },
    { name: 'Others', value: 300, color: '#E1E4EA' },
];

const categories = [
    { label: 'Shopping', amount: '$900.00', icon: ShoppingBag, color: 'text-[#335CFF] bg-[#EBF1FF]' },
    { label: 'Utilities', amount: '$600.00', icon: FileText, color: 'text-[#47C2FF] bg-[#EBF8FF]' },
    { label: 'Others', amount: '$200.00', icon: DollarSign, color: 'text-[#525866] bg-[#F2F5F8]' },
];

export const SpendingSummaryWidget = () => {
    return (
        <Card className="shadow-xs flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2 w-full">
                    <PieChartIcon size={24} className="text-muted-foreground" />
                    <CardTitle className="flex-1 text-base font-medium text-foreground line-clamp-1">Spending Summary</CardTitle>
                </div>
                <Select defaultValue="week">
                    <SelectTrigger size='sm' className=" w-[110px] text-xs border-border bg-card">
                        <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center gap-4">
                <Separator className='max-w-[90%] block mx-auto' />
                {/* Gauge Chart */}
                <div className="relative h-[124px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="100%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={1}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center pb-4">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mb-1">SPEND</p>
                        <p className="text-2xl font-medium text-foreground">$1,800.00</p>
                    </div>
                </div>

                <Separator className='max-w-[90%] block mx-auto' />

                {/* Legend / Categories */}
                <div className="flex items-start gap-px justify-between w-full relative">
                    {categories.map((cat, index) => (
                        <div key={cat.label} className="flex flex-col items-center gap-3 flex-1 relative">
                            <div className={`p-1.5 rounded-full ${cat.color}`}>
                                <cat.icon size={18} />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-xs text-muted-foreground">{cat.label}</p>
                                <p className="text-sm font-medium text-foreground">{cat.amount}</p>
                            </div>
                            {/* Vertical Divider */}
                            {index < categories.length - 1 && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[100%] bg-border hidden sm:block" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full rounded-lg p-2.5 flex items-center justify-between gap-2 text-xs text-muted-foreground border border-border">
                    <span>Your weekly spending limit is <span className="font-medium">$2000</span>.</span>
                    <InfoIcon />
                </div>
            </CardContent>
        </Card>
    );
};
