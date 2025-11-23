"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

export const ExpensesChartWidget = () => {
    return (
        <Card className="flex flex-col rounded-2xl border-gray-100 shadow-sm relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-1">
                <div className="bg-white/50 backdrop-blur-sm p-1 rounded-lg">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200">
                        <ArrowDownLeft className="h-4 w-4" />
                    </Button>
                </div>
                <div className="max-h-20 aspect-video w-auto">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            {/* <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#335CFF" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#335CFF" stopOpacity={0} />
                                </linearGradient>
                            </defs> */}
                            <Tooltip cursor={false} />
                            <Area type="monotone" dataKey="value" stroke="#335CFF" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardHeader>

            <CardContent>
                <div className="">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-semibold text-gray-900">$6,240.28</h2>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">-2%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};