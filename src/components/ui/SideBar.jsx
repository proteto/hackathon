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
            className={`relative flex flex-row items-center justify-center px-6 py-3 cursor-pointer rounded-lg  transition-all duration-200 ${activeTab === item.key ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-600'} `} >
            <item.icon
                size={28}
                className={activeTab === item.key ? 'text-green-600' : 'text-gray-600'}
            />
            <span className="text-xs mt-1 w-44">{item.name}</span>

            {item.hasNotification && (
                <div className=" absolute top-2 right-2  w-3 h-3  bg-red-500  rounded-full " />
            )}
        </div>
    );

    return (
        <div
            className=" fixed left-0 top-0 bottom-0  w-56  bg-gray-900 border-r  flex flex-col  justify-between  py-4 shadow-md " >
            <div className="flex flex-col space-y-2">
                {sidebarItems.map(renderSidebarIcon)}
            </div>

            <div className="flex flex-col space-y-2">
                {bottomItems.map(renderSidebarIcon)}
            </div>
        </div>
    );
};

export default SideBar;