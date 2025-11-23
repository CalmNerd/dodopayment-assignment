"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShoppingBag, FileText, DollarSign, InfoIcon } from 'lucide-react';

const data = [
    { name: 'Shopping', value: 900, color: '#335CFF' },
    { name: 'Utilities', value: 600, color: '#47C2FF' },
    { name: 'Others', value: 200, color: '#E1E4EA' }, // Gray for "empty" or remaining
];

const categories = [
    { label: 'Shopping', amount: '$900.00', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
    { label: 'Utilities', amount: '$600.00', icon: FileText, color: 'text-sky-500 bg-sky-50' },
    { label: 'Others', amount: '$200.00', icon: DollarSign, color: 'text-gray-600 bg-gray-50' },
];

export const SpendingSummaryWidget = () => {
    return (
        <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">Spending Summary</CardTitle>
                <Select defaultValue="week">
                    <SelectTrigger className="h-8 w-[100px] text-xs">
                        <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                {/* Gauge Chart */}
                <div className="relative h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="70%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                cornerRadius={10}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mb-1">Spend</p>
                        <p className="text-3xl font-semibold text-gray-900">$1,800</p>
                    </div>
                </div>

                {/* Legend / Categories */}
                <div className="grid grid-cols-3 gap-2 w-full mt-4 border-t pt-4 border-gray-100">
                    {categories.map((cat) => (
                        <div key={cat.label} className="flex flex-col items-center gap-2">
                            <div className={`p-2 rounded-full ${cat.color}`}>
                                <cat.icon size={16} />
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-500">{cat.label}</p>
                                <p className="text-sm font-semibold text-gray-900">{cat.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 w-full bg-gray-50 rounded-lg p-2 flex items-center justify-between gap-2 text-xs text-gray-500 border border-dashed border-gray-200">
                    <span>Your weekly spending limit is $2000</span>                 <InfoIcon size={16} className="text-gray-400" />

                </div>
            </CardContent>
        </Card>
    );
};