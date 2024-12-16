import React, { useState } from 'react';
import {
    Home,
    Target,
    Trophy,
    Shield,
    Zap,
    UserCircle2,
    Settings,
    MessageCircleQuestion
} from 'lucide-react';
import Image from 'next/image';

const SideBar = () => {
    const [activeTab, setActiveTab] = useState('home');

    const sidebarItems = [
        {
            icon: Home,
            name: 'Home',
            key: 'home',
            hasNotification: false
        },
        {
            icon: Target,
            name: 'Goals',
            key: 'goals',
            hasNotification: true
        },
        {
            icon: Trophy,
            name: 'Leaderboard',
            key: 'leaderboard',
            hasNotification: false
        },
        {
            icon: Shield,
            name: 'Leagues',
            key: 'leagues',
            hasNotification: true
        },
        {
            icon: Zap,
            name: 'Quests',
            key: 'quests',
            hasNotification: false
        }
    ];

    const bottomItems = [

        {
            icon: UserCircle2,
            name: 'Logout',
            key: 'Logout',
            hasNotification: false
        }
    ];

    const renderSidebarIcon = (item) => (
        <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={` relative flex flex-row items-center justify-center px-6 py-1 cursor-pointer rounded-xl transition-all duration-200 ${activeTab === item.key ? 'bg-gray-800 text-green-600 ring-2 ring-green-600' : 'hover:bg-gray-800 text-gray-600'}`}>
            <item.icon
                size={40}
                className={activeTab === item.key ? 'text-green-600' : 'text-gray-600'}
            />
            <span className="text-md font-bold ml-4 w-44 uppercase leading-relaxed tracking-wide">{item.name}</span>
        </div>
    );

    return (
        <div
            className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 border-r-2 border-green-500 flex flex-col justify-between py-4 shadow-md ">
            <div className="flex flex-col space-y-2 px-3">
                <h1 className="w-full px-6 text-2xl font-extrabold py-4 text-green-600">E-ALIM</h1>
                <div className="flex flex-col space-y-2 px-1">
                    {sidebarItems.map(renderSidebarIcon)}
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                {bottomItems.map(renderSidebarIcon)}
            </div>
        </div>
    );
};

export default SideBar;