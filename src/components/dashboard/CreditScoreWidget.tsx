import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditScoreIcon } from '../icons/icons';
import { Separator } from '../ui/separator';
import { CREDIT_SCORE_CONSTANTS } from '@/constants';

export const CreditScoreWidget = () => {
    // Generate bars 
    const totalBars = 36;
    const activeBars = 25;

    const bars = Array.from({ length: totalBars }, (_, i) => {
        const isActive = i < activeBars;
        return (
            <div
                key={i}
                className={`flex-1 h-[22px] w-1 ${isActive ? 'bg-[#1FC16B]' : 'bg-border'}`}
            />
        );
    });

    return (
        <Card className="shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 w-full">
                    <div className="p-0.5">
                        <CreditScoreIcon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex-1text-base font-medium text-foreground line-clamp-1">{CREDIT_SCORE_CONSTANTS.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
                    {CREDIT_SCORE_CONSTANTS.details}
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator className='' />
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-normal text-muted-foreground mb-1">
                            {CREDIT_SCORE_CONSTANTS.scoreMessage} <span className="font-semibold text-foreground">710</span>
                        </h3>
                        <p className="text-xs text-muted-foreground">{CREDIT_SCORE_CONSTANTS.scoreDescription}</p>
                    </div>
                    <div className="w-11 h-11 bg-[#FFF1EB] rounded-full flex items-center justify-center text-xl shrink-0">
                        {CREDIT_SCORE_CONSTANTS.emoji}
                    </div>
                </div>

                <div className="flex justify-between items-center gap-1">
                    {bars}
                </div>
            </CardContent>
        </Card>
    );
};
