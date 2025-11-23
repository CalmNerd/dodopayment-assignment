"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
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
    SidebarTrigger,
} from '@/components/ui/sidebar'
import {
    Home,
    TrendingUp,
    Search,
    Filter,
    Github,
    Star,
    GitFork,
    Code,
    PieChart,
    Frame,
    Map,
    Command,
    SquareTerminal,
    Bot,
    BookOpen,
    Settings2,
    GalleryVerticalEnd,
    AudioWaveform,
    Settings,
    HelpCircle,
} from 'lucide-react'
import { NavUser } from './nav-user'
import { NavTeamSwitcher } from './team-switcher'

interface SidebarNavItem {
    group?: string
    items: {
        title: string
        href: string
        icon: React.ReactNode
        description: string
    }[]
}

// const data = {
//     user: {
//         name: "shadcn",
//         email: "m@example.com",
//         avatar: "/avatars/shadcn.jpg",
//     },
//     teams: [
//         {
//             name: "Acme Inc",
//             logo: GalleryVerticalEnd,
//             plan: "Enterprise",
//         },
//         {
//             name: "Acme Corp.",
//             logo: AudioWaveform,
//             plan: "Startup",
//         },
//         {
//             name: "Evil Corp.",
//             logo: Command,
//             plan: "Free",
//         },
//     ],
//     navMain: [
//         {
//             title: "Playground",
//             url: "#",
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: "History",
//                     url: "#",
//                 },
//                 {
//                     title: "Starred",
//                     url: "#",
//                 },
//                 {
//                     title: "Settings",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Models",
//             url: "#",
//             icon: Bot,
//             items: [
//                 {
//                     title: "Genesis",
//                     url: "#",
//                 },
//                 {
//                     title: "Explorer",
//                     url: "#",
//                 },
//                 {
//                     title: "Quantum",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Documentation",
//             url: "#",
//             icon: BookOpen,
//             items: [
//                 {
//                     title: "Introduction",
//                     url: "#",
//                 },
//                 {
//                     title: "Get Started",
//                     url: "#",
//                 },
//                 {
//                     title: "Tutorials",
//                     url: "#",
//                 },
//                 {
//                     title: "Changelog",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Settings",
//             url: "#",
//             icon: Settings2,
//             items: [
//                 {
//                     title: "General",
//                     url: "#",
//                 },
//                 {
//                     title: "Team",
//                     url: "#",
//                 },
//                 {
//                     title: "Billing",
//                     url: "#",
//                 },
//                 {
//                     title: "Limits",
//                     url: "#",
//                 },
//             ],
//         },
//     ],
//     projects: [
//         {
//             name: "Design Engineering",
//             url: "#",
//             icon: Frame,
//         },
//         {
//             name: "Sales & Marketing",
//             url: "#",
//             icon: PieChart,
//         },
//         {
//             name: "Travel",
//             url: "#",
//             icon: Map,
//         },
//     ],
// }

const teams = [
    { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
]

export default function AppSideBar() {
    const pathname = usePathname()
    const { state, isMobile, setOpenMobile } = useSidebar()

    const navigationItems: SidebarNavItem[] = [
        {
            group: 'Main',
            items: [
                {
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: <Home className="h-4 w-4" />,
                    description: 'Repository overview and search'
                },
                {
                    title: 'My Cards',
                    href: '/my-cards',
                    icon: <Search className="h-4 w-4" />,
                    description: 'Discover repositories by topics and languages'
                },
                {
                    title: 'Transfer',
                    href: '/transfer',
                    icon: <Filter className="h-4 w-4" />,
                    description: 'Advanced repository filtering options'
                },
                {
                    title: 'Transactions',
                    href: '/transactions',
                    icon: <TrendingUp className="h-4 w-4" />,
                    description: 'Trending repositories by time period'
                },
                {
                    title: 'Exchange',
                    href: '/exchange',
                    icon: <TrendingUp className="h-4 w-4" />,
                    description: 'Trending repositories by time period'
                },
                {
                    title: 'Payments',
                    href: '/payments',
                    icon: <TrendingUp className="h-4 w-4" />,
                    description: 'Trending repositories by time period'
                },
            ]
        },
        {
            group: 'Other',
            items: [
                {
                    title: 'Settings',
                    href: '/settings',
                    icon: <Settings className="h-4 w-4" />,
                    description: 'Settings'
                },
                {
                    title: 'Support',
                    href: '/support',
                    icon: <HelpCircle className="h-4 w-4" />,
                    description: 'Support'
                },
            ]
        }
    ]

    // Close mobile sidebar when navigation occurs
    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {/* <div className="flex items-center gap-2 px-1 py-3">
                    <Link href="/" className='size-7' onClick={handleNavClick}>
                        <Github className="" />
                    </Link>
                    <AnimatePresence mode="wait">
                        {state === "expanded" && (
                            <motion.div
                                key="header-text"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="w-full font-semibold flex items-center justify-between gap-2">
                                <Link href="/" onClick={handleNavClick}>
                                    <motion.span>
                                        DevQuest
                                    </motion.span>
                                </Link>
                                {!isMobile && <SidebarTrigger />}
                            </motion.div>

                        )}
                    </AnimatePresence>
                </div> */}

                <NavTeamSwitcher teams={teams} />
                {!isMobile && <SidebarTrigger />}

            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    {navigationItems.map((group) => (
                        <React.Fragment key={group.group}>
                            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href

                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    tooltip={item.title}
                                                >
                                                    <Link href={item.href} onClick={handleNavClick}>
                                                        {item.icon}
                                                        <AnimatePresence mode="wait">
                                                            {state === "expanded" && (
                                                                <motion.span
                                                                    key={`nav-${item.title}`}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: -10 }}
                                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                                >
                                                                    {item.title}
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </React.Fragment>
                    ))}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='px-0'>
                {/* <SidebarGroup>
                    <AnimatePresence mode="wait">
                        {state === "expanded" && (
                            <motion.div
                                key="quick-access-label"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Most Starred"
                                >
                                    <Link href="/repositories?q=stars:>1000" onClick={handleNavClick}>
                                        <Star className="h-4 w-4" />
                                        <AnimatePresence mode="wait">
                                            {state === "expanded" && (
                                                <motion.span
                                                    key="most-starred"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                >
                                                    Most Starred
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Most Forked"
                                >
                                    <Link href="/repositories?q=forks:>100" onClick={handleNavClick}>
                                        <GitFork className="h-4 w-4" />
                                        <AnimatePresence mode="wait">
                                            {state === "expanded" && (
                                                <motion.span
                                                    key="most-forked"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                >
                                                    Most Forked
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="By Language"
                                >
                                    <Link href="/repositories?q=language:javascript" onClick={handleNavClick}>
                                        <Code className="h-4 w-4" />
                                        <AnimatePresence mode="wait">
                                            {state === "expanded" && (
                                                <motion.span
                                                    key="by-language"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                >
                                                    By Language
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
                <NavUser user={{ name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://github.com/shadcn.png' }} />
            </SidebarFooter>
        </Sidebar>
    )
}