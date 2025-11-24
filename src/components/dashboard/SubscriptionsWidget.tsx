import { EllipsisVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionIcon, AppleMusicIcon, PrimeVideoIcon, YoutubeMusicIcon, SpotifyMusicIcon } from '../icons/icons';
import { Separator } from '../ui/separator';
import { SUBSCRIPTIONS_CONSTANTS } from '@/constants';

export const SubscriptionsWidget = () => {
    return (
        <Card className="shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2 w-full">
                    <div className="p-0.5">
                        <SubscriptionIcon className="w-6 h-6" />
                    </div>
                    <CardTitle className="flex-1text-base font-medium text-foreground line-clamp-1">{SUBSCRIPTIONS_CONSTANTS.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1">
                    {SUBSCRIPTIONS_CONSTANTS.seeAll}
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Promo Card */}
                <div className="bg-secondary h-[128] rounded-xl p-4 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute -top-20 -right-20 w-40 h-40">
                        <AppleMusicIcon className='size-full' />
                    </div>
                    <div className="flex flex-col items-start gap-4 z-10">
                        <div className='size-8'>
                            <AppleMusicIcon className='size-full' />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{SUBSCRIPTIONS_CONSTANTS.promoTitle}</p>
                            <p className="text-xs text-muted-foreground">
                                {SUBSCRIPTIONS_CONSTANTS.promoDescription}&nbsp;
                                <a href="#" className="text-xs font-medium text-muted-foreground underline decoration-muted-foreground/50 hover:text-foreground">{SUBSCRIPTIONS_CONSTANTS.learnMore}</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-2">
                    {/* Spotify */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                                <SpotifyMusicIcon />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{SUBSCRIPTIONS_CONSTANTS.subscriptionNames.salaryDeposit}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">{SUBSCRIPTIONS_CONSTANTS.subscriptionPrices.salaryDeposit} <span className="text-muted-foreground">{SUBSCRIPTIONS_CONSTANTS.perMonth}</span></p>
                            </div>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">{SUBSCRIPTIONS_CONSTANTS.status.paid}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-muted-foreground">
                                <EllipsisVertical size={16} className="text-mutex-foreground" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Youtube */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                                <YoutubeMusicIcon />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{SUBSCRIPTIONS_CONSTANTS.subscriptionNames.youtubeMusic}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">{SUBSCRIPTIONS_CONSTANTS.subscriptionPrices.youtubeMusic} <span className="text-muted-foreground">{SUBSCRIPTIONS_CONSTANTS.perYear}</span></p>
                            </div>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-[10px] bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full font-medium">{SUBSCRIPTIONS_CONSTANTS.status.expiring}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-muted-foreground">
                                <EllipsisVertical size={16} className="text-mutex-foreground" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Amazon */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                                <PrimeVideoIcon />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{SUBSCRIPTIONS_CONSTANTS.subscriptionNames.primeVideo}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">{SUBSCRIPTIONS_CONSTANTS.subscriptionPrices.primeVideo} <span className="text-muted-foreground">{SUBSCRIPTIONS_CONSTANTS.perMonth}</span></p>
                            </div>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full font-medium">{SUBSCRIPTIONS_CONSTANTS.status.pending}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-muted-foreground">
                                <EllipsisVertical size={16} className="text-mutex-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};