"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    LayoutGrid,
    CreditCard,
    ArrowLeftRight,
    History,
    Receipt,
    RefreshCw,
    Settings,
    Headphones,
    ChevronRight,
} from 'lucide-react'
import { NavUser } from './nav-user'
import { NavTeamSwitcher } from './team-switcher'
import { ApexLogoIcon } from '../icons/icons'

interface SidebarNavItem {
    group?: string
    items: {
        title: string
        href: string
        icon: React.ReactNode
        badge?: number
    }[]
}

const teams = [
    { name: "Apex", logo: <ApexLogoIcon className="w-10 h-10" />, plan: "Finance & Banking" },
]

const navigationItems: SidebarNavItem[] = [
    {
        group: 'MAIN',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: <LayoutGrid className="h-5 w-5" />,
            },
            {
                title: 'My Cards',
                href: '/my-cards',
                icon: <CreditCard className="h-5 w-5" />,
            },
            {
                title: 'Transfer',
                href: '/transfer',
                icon: <ArrowLeftRight className="h-5 w-5" />,
            },
            {
                title: 'Transactions',
                href: '/transactions',
                icon: <History className="h-5 w-5" />,
            },
            {
                title: 'Payments',
                href: '/payments',
                icon: <Receipt className="h-5 w-5" />,
            },
            {
                title: 'Exchange',
                href: '/exchange',
                icon: <RefreshCw className="h-5 w-5" />,
            },
        ]
    },
    {
        group: 'OTHERS',
        items: [
            {
                title: 'Settings',
                href: '/settings',
                icon: <Settings className="h-5 w-5" />,
            },
            {
                title: 'Support',
                href: '/support',
                icon: <Headphones className="h-5 w-5" />,
            },
        ]
    }
]

export default function AppSideBar() {
    const pathname = usePathname()
    const { state, isMobile, setOpenMobile } = useSidebar()

    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (
        <Sidebar collapsible="icon" className="bg-sidebar border-r border-sidebar-border">
            <SidebarHeader className="bg-sidebar relative">
                <NavTeamSwitcher teams={teams} />
                <div className='absolute bottom-0 left-1/2 mx-auto max-w-[80%] -translate-x-1/2 h-px bg-sidebar-border w-full z-10' />
            </SidebarHeader>

            <SidebarContent className="bg-sidebar">
                {navigationItems.map((group) => (
                    <SidebarGroup key={group.group} className='py-5 px-0'>
                        <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider py-1 px-6">{group.group}</SidebarGroupLabel>
                        <SidebarGroupContent className=''>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <SidebarMenuItem key={item.title} className='flex items-center relative'>
                                            {isActive && state !== "collapsed" && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2  bg-primary w-1 h-5 rounded-r" />
                                            )}
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                tooltip={item.title}
                                                className={`${state !== "collapsed" ? "mx-5" : "mx-auto"} h-9 px-3 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'text-muted-foreground'}`}
                                            >
                                                <Link href={item.href} onClick={handleNavClick} className="flex items-center justify-between gap-2">
                                                    <div className='flex items-center gap-3'>
                                                        <span className={`block flex items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                                                            {item.icon}
                                                        </span>
                                                        <span className="text-sm">{item.title}</span>
                                                        {item.badge && (
                                                            <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.badge}</span>
                                                        )}
                                                    </div>
                                                    <span className={`${isActive ? 'text-muted-foreground' : 'hidden'}`}><ChevronRight className='size-4' /></span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="bg-sidebar p-4 relative">
            <div className='absolute top-0 left-1/2 mx-auto max-w-[80%] -translate-x-1/2 h-px bg-sidebar-border w-full z-10' />
                <NavUser user={{ name: 'Arthur Taylor', email: 'arthur@alignui.com', avatar: 'avatar.png' }} />
            </SidebarFooter>
        </Sidebar>
    )
}