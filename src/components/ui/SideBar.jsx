import React, { useState } from 'react';
import { Home, Target, Trophy, Shield, Zap, UserCircle2, Settings, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

const SideBar = () => {
    const [activeTab, setActiveTab] = useState('home');

    const sidebarItems = [
        { icon: Home, name: 'Home', key: 'home', hasNotification: false, path: 'home/learn' },
        { icon: Target, name: 'Goals', key: 'goals', hasNotification: true },
        { icon: Trophy, name: 'Leaderboard', key: 'leaderboard', hasNotification: false },
        { icon: Shield, name: 'Leagues', key: 'leagues', hasNotification: true },
        { icon: Zap, name: 'Quests', key: 'quests', hasNotification: false }
    ];

    const bottomItems = [
        { icon: UserCircle2, name: 'Profile', key: 'profile', hasNotification: false },
        { icon: Settings, name: 'Settings', key: 'settings', hasNotification: false },
        { icon: MessageCircleQuestion, name: 'Support', key: 'support', hasNotification: false }
    ];

    const renderSidebarIcon = (item) => {
        const isActive = activeTab === item.key;

        return (
            <Link
                href={`/${item.path}`}
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`relative flex flex-row items-center justify-start px-4 mx-2 py-3 mt-5 cursor-pointer rounded-xl transition-all duration-200 group 
                    ${isActive ? 'bg-green-600/10 text-green-500 ring-2 ring-green-600' : 'hover:bg-gray-800'}`}>
                <div className="relative">
                    <item.icon size={24} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold ml-3 uppercase tracking-wider">{item.name}</span>
            </Link>
        );
    };

    return (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 border-r-2 border-green-500/20 flex flex-col justify-between py-6 shadow-xl">
            <div>
                <h1 className="px-6 text-3xl font-black pb-6 ml-2 text-green-500 tracking-tighter">E-ALIM</h1>
                <nav className="space-y-2 px-2">{sidebarItems.map(renderSidebarIcon)}</nav>
            </div>

            <div className="border-t border-green-500/10 pt-4 space-y-2 px-2">{bottomItems.map(renderSidebarIcon)}</div>
        </div>
    );
};

export default SideBar;