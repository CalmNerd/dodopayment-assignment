import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'
import { Bell, Search, ArrowUpRight } from 'lucide-react'

const Header = () => {
    return (
        <nav className="w-full backdrop-blur-sm bg-background/50 sticky top-0 z-30">
            <div className="px-8 py-6">
                <div className="flex items-center justify-between">
                    {/* Left section */}
                    <div className='flex items-center gap-4'>
                        <SidebarTrigger className='md:hidden'/>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden shrink-0">
                                <img src="/avatar.png" alt="Arthur" className="w-full h-full object-cover" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-medium text-foreground">Arthur Taylor</h1>
                                <p className="text-sm text-muted-foreground">Welcome back to Apex 👋</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border-border text-muted-foreground hover:text-foreground">
                            <Search className="h-5 w-5" />
                        </Button>
                        <div className="relative">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border-border text-muted-foreground hover:text-foreground">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </div>
                        <Button className="h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg ml-2 gap-2 font-medium shadow-sm shadow-blue-500/20">
                            Move Money <ArrowUpRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
