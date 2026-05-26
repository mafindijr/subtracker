'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CreditCard,
    Calendar,
    Settings,
    Menu,
    X,
    TrendingUp,
    Shield,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Subscriptions', icon: CreditCard, href: '#subscriptions' },
    { name: 'Renewals', icon: Calendar, href: '#renewals' },
    { name: 'Insights', icon: TrendingUp, href: '#insights' },
    { name: 'Security', icon: Shield, href: '#security' },
    { name: 'Settings', icon: Settings, href: '#settings' },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Header */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <CreditCard size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">SubTracker</span>
                </Link>
                <button
                    onClick={toggleSidebar}
                    className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Content */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
                {/* Logo Section */}
                <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
                    <Link href="/" className={`flex items-center gap-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                            <CreditCard size={24} />
                        </div>
                        {!isCollapsed && (
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">SubTracker</span>
                        )}
                    </Link>
                    <button
                        onClick={toggleCollapse}
                        className="hidden rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:block"
                    >
                        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                  ${isActive
                                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'}
                  ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
                `}
                                title={isCollapsed ? item.name : ''}
                            >
                                <item.icon size={22} className="shrink-0" />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section */}
                <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <div className={`flex flex-col gap-2 ${isCollapsed ? 'lg:items-center' : ''}`}>
                        {!isCollapsed && (
                            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Appearance
                            </div>
                        )}
                        <div className={`flex items-center justify-between rounded-xl bg-zinc-50 p-2 dark:bg-zinc-900 ${isCollapsed ? 'lg:flex-col lg:gap-2' : ''}`}>
                            {!isCollapsed && <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">Theme</span>}
                            <ThemeToggle />
                        </div>

                        <button className={`
              mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50 dark:hover:bg-red-900/10
              ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
            `}>
                            <LogOut size={22} className="shrink-0" />
                            {!isCollapsed && <span>Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
