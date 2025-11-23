import { ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const MyCardsWidget = () => {
    return (
        <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">My Cards</CardTitle>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs text-gray-700">
                    <Plus size={14} /> Add Card
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Credit Card Visual */}
                <div className="relative h-48 w-full bg-blue-600 rounded-2xl p-6 text-white overflow-hidden">
                    {/* Abstract shapes for background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div> Active
                            </div>
                            <div className="opacity-80">
                                {/* Mastercard Circles SVG simulation */}
                                <div className="flex">
                                    <div className="w-6 h-6 bg-red-500/80 rounded-full"></div>
                                    <div className="w-6 h-6 bg-yellow-500/80 rounded-full -ml-3"></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm opacity-80 mb-1">Savings Card</p>
                            <h3 className="text-2xl font-semibold tracking-wider">$16,058.94</h3>
                            <div className="flex items-center gap-4 mt-4 text-sm font-mono opacity-90">
                                <span>****</span><span>****</span><span>****</span><span>3294</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spending Limit */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Spending Limit</span>
                        <div>
                            <span className="font-semibold text-gray-900">$1,500.00</span>
                            <span className="text-gray-400 text-xs"> / week</span>
                        </div>
                    </div>
                    <Progress value={45} className="h-2 bg-gray-100 [&_[data-slot=progress-indicator]]:bg-blue-600"/>
                    <div className="flex gap-2">
                        <div className="text-[10px] text-gray-400"><ChevronRight/></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};