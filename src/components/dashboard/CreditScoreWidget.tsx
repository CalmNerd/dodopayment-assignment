import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const CreditScoreWidget = () => {
    // Generate bars for visual effect
    const bars = Array.from({ length: 25 }, (_, i) => {
        const isActive = i < 18; // 710 score roughly
        return (
            <div
                key={i}
                className={`w-1.5 h-6 ${isActive ? 'bg-green-600' : 'bg-gray-200'}`}
            />
        );
    });

    return (
        <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-gray-900">Credit Score</CardTitle>
                <Info size={16} className="text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg text-gray-600">Your credit score is</span>
                            <span className="text-lg font-bold text-gray-900">710</span>
                        </div>
                        <p className="text-xs text-gray-500">This score is considered to be Excellent.</p>
                    </div>
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-xl">
                        😎
                    </div>
                </div>

                <div className="flex justify-between items-center gap-1">
                    {bars}
                </div>
            </CardContent>
        </Card>
    );
};