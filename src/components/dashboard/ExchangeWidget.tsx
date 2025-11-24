import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExchangeIcon, USFlagIcon, EuroFlagIcon } from '../icons/icons';

export const ExchangeWidget = () => {
    return (
        <Card className="shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 w-full">
                    <div className="p-0.5">
                        <ExchangeIcon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex-1text-base font-medium text-foreground line-clamp-1">Exchange</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
                    Currencies
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-center p-2 gap-4 border-b border-border">
                        <div className="flex items-center justify-center gap-2 flex-1">
                            <USFlagIcon />
                            <span className="text-sm leading-5 font-medium text-foreground">USD</span>
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
                            <span className="text-sm leading-5 font-medium text-foreground">EUR</span>
                            <Button variant="outline" size="icon" className="w-5 h-5 flex items-center justify-center border border-border rounded-full shadow-xs bg-card p-0.5">
                                <ChevronDown size={18} className="text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 gap-1">
                        <div className="w-full flex items-center justify-center">
                            <div className="flex items-center justify-center gap-0.5">
                                <span className="!text-[32px] md:!text-[32px] leading-10 font-medium text-foreground">$</span>
                                <Input
                                    type="text"
                                    defaultValue="100.00"
                                    className="!text-[32px] md:!text-[32px] leading-10 font-medium text-foreground text-left border-none shadow-none h-auto p-0 focus-visible:ring-0 bg-transparent inline-block max-w-[120px]"
                                />
                            </div>
                        </div>
                        <p className="text-sm leading-5 text-muted-foreground text-center w-full">Available : $16,058.94</p>
                    </div>

                    <div className="flex items-center justify-center px-4 py-1.5 gap-2 h-7 bg-secondary border-t border-border">
                        <span className="text-xs leading-4 text-muted-foreground">1 USD = <span className="font-medium text-foreground">0.94 EUR</span></span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">Tax (2%)</span>
                        <span className="text-xs leading-4 font-medium text-foreground">$2.00</span>
                    </div>
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">Exchange fee (1%)</span>
                        <span className="text-xs leading-4 font-medium text-foreground">$1.00</span>
                    </div>
                    <div className="flex items-start gap-4 h-4">
                        <span className="text-xs leading-4 text-muted-foreground flex-1">Total amount</span>
                        <span className="text-xs leading-4 font-medium text-foreground">€90.7</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full h-9 px-2 py-2 gap-1 text-sm leading-5 font-medium text-muted-foreground hover:text-foreground border-border shadow-xs rounded-lg flex items-center justify-center"
                >
                    <ExchangeIcon className="w-5 h-5" />
                    Exchange
                </Button>
            </CardContent>
        </Card>
    );
};