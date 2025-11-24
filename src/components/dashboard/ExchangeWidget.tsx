import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExchangeIcon, USFlagIcon, EuroFlagIcon } from '../icons/icons';
import { EXCHANGE_CONSTANTS } from '@/constants';

export const ExchangeWidget = () => {
    return (
        <Card className="shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 w-full">
                    <div className="p-0.5">
                        <ExchangeIcon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex-1text-base font-medium text-foreground line-clamp-1">{EXCHANGE_CONSTANTS.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
                    {EXCHANGE_CONSTANTS.currencies}
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-2 gap-4 border-b border-border">
                        <div className="flex items-center justify-center gap-2 flex-1">
                            <USFlagIcon />
                            <span className="text-sm leading-5 font-medium text-foreground">{EXCHANGE_CONSTANTS.usd}</span>
                            <Button variant="outline" size="icon" className="w-5 h-5 flex items-center justify-center border border-border rounded-full shadow-xs bg-card p-0.5">
                                <ChevronDown size={18} className="text-muted-foreground" />
                            </Button>
                        </div>

                        <div className="w-0 h-6 border-l border-border"></div>

                        <button className="w-6 h-6 flex items-center justify-center rounded-md p-0.5">
                            <ArrowLeftRight size={20} className="text-muted-foreground" />
                        </button>

                        <div className="w-0 h-6 border-l border-border"></div>

                        <div className="flex items-center justify-center gap-2 flex-1">
                            <EuroFlagIcon />
                            <span className="text-sm leading-5 font-medium text-foreground">{EXCHANGE_CONSTANTS.eur}</span>
                            <Button variant="outline" size="icon" className="w-5 h-5 flex items-center justify-center border border-border rounded-full shadow-xs bg-card p-0.5">
                                <ChevronDown size={18} className="text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 gap-1">
                        <div className="w-full flex items-center justify-center">
                            <div className="flex items-center justify-center gap-0.5">
                                <span className="!text-[32px] md:!text-[32px] leading-10 font-medium text-foreground">{EXCHANGE_CONSTANTS.dollarSymbol}</span>
                                <Input
                                    type="text"
                                    defaultValue={EXCHANGE_CONSTANTS.defaultAmount}
                                    className="!text-[32px] md:!text-[32px] leading-10 font-medium text-foreground text-left border-none shadow-none h-auto p-0 focus-visible:ring-0 bg-transparent inline-block max-w-[120px]"
                                />
                            </div>
                        </div>
                        <p className="text-sm leading-5 text-muted-foreground text-center w-full">{EXCHANGE_CONSTANTS.available} : {EXCHANGE_CONSTANTS.defaultAvailable}</p>
                    </div>

                    <div className="flex items-center justify-center px-4 py-1.5 gap-2 h-7 bg-secondary border-t border-border">
                        <span className="text-xs leading-4 text-muted-foreground">{EXCHANGE_CONSTANTS.exchangeRate} <span className="font-medium text-foreground">{EXCHANGE_CONSTANTS.defaultExchangeRate}</span></span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">{EXCHANGE_CONSTANTS.tax}</span>
                        <span className="text-xs leading-4 font-medium text-foreground">{EXCHANGE_CONSTANTS.defaultTax}</span>
                    </div>
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">{EXCHANGE_CONSTANTS.exchangeFee}</span>
                        <span className="text-xs leading-4 font-medium text-foreground">{EXCHANGE_CONSTANTS.defaultExchangeFee}</span>
                    </div>
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">{EXCHANGE_CONSTANTS.totalAmount}</span>
                        <span className="text-xs leading-4 font-medium text-foreground">{EXCHANGE_CONSTANTS.defaultTotal}</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full h-9 px-2 py-2 gap-1 text-sm leading-5 font-medium text-muted-foreground hover:text-foreground border-border shadow-xs rounded-lg flex items-center justify-center"
                >
                    <ExchangeIcon className="w-5 h-5" />
                    {EXCHANGE_CONSTANTS.exchange}
                </Button>
            </CardContent>
        </Card>
    );
};