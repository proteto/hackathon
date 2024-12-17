import React, { useState } from 'react';
import { Home, Settings, UserCircle2, SettingsIcon, User2Icon, Menu } from 'lucide-react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/createClient';

const SideBar = ({ onToggle, isOpen }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const router = useRouter();


    const sidebarItems = [
        { icon: Home, name: 'Home', key: 'Learn', path: 'home' },
        {
            icon: SettingsIcon, name: 'Tools', key: 'Tools', path: 'tools',
            subItems: [
                { name: 'Masjid Finder', path: 'home/tools/masjid-finder' },
                { name: 'Qibla Finder', path: 'home/tools/qibla-finder' },
                { name: 'Prayer Times', path: 'home/tools/prayer-times' },
            ],
        },
        { icon: User2Icon, name: 'Community', key: 'Community', path: 'community' },
    ];

    const bottomItems = [
        { icon: UserCircle2, name: 'Profile', key: 'Profile', path: 'home/profile' },
        { icon: Settings, name: 'Sign Out', key: 'SignOut', path: 'signout' },
    ];

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out:", error.message);
            } else {
                router.push('/login');
            }

        } catch (error) {
            console.error("An error occurred during sign out:", error);
        }
    };


    const renderSidebarIcon = (item) => {
        const isActive = activeTab === item.key;
        const isTools = item.key === 'Tools';
        const isSignOut = item.key === 'SignOut';


        const toggleTools = () => {
            setIsToolsOpen(!isToolsOpen);
        };

        return (
            <div key={item.key} className='relative'>
                <div
                    onClick={() => {
                        if (isTools) {
                            toggleTools();
                        }
                        if (isSignOut) {
                            handleSignOut()
                        }
                    }}
                >
                    <Link
                        href={`/${item.path}`}
                        onClick={(e) => {
                            setActiveTab(item.key);
                            if (onToggle && isOpen && !isTools && !isSignOut) {
                                onToggle();
                            }
                            if (isTools) {
                                e.preventDefault();
                            }
                            if (isSignOut) {
                                e.preventDefault()
                            }
                        }}
                        className={`flex flex-row items-center justify-start px-4 py-3 mt-2 cursor-pointer rounded-xl transition-all duration-200 group
                        ${isActive ? 'bg-green-600/10 text-green-500 ring-2 ring-green-600' : 'hover:bg-gray-800'}
                        ${isTools && isToolsOpen ? 'bg-gray-800' : ''}`
                        }
                    >
                        <item.icon size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold ml-3 uppercase tracking-wider flex-1">{item.name}</span>
                        {isTools && (
                            <div className="ml-1 transition-all duration-300 transform ">
                                {isToolsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        )}
                    </Link>
                </div>

                {isTools && isToolsOpen && item.subItems && (
                    <div className=" ml-2 mt-2 overflow-hidden transition-all duration-500" >
                        {item.subItems.map((subItem, index) => (
                            <Link
                                key={index}
                                href={`/${subItem.path}`}
                                onClick={() => {
                                    if (onToggle && isOpen) {
                                        onToggle();
                                    }
                                }}
                                className="block px-12 py-2 text-md hover:bg-gray-700 rounded-md whitespace-nowrap"
                            >
                                {subItem.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className=" w-64 flex flex-col justify-between h-screen py-6 px-2">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-4 md:hidden">
                    <h1 className="text-2xl font-black text-green-500 tracking-tighter">E-ALIM</h1>
                    <button className="p-2" onClick={onToggle}>
                        <Menu size={32} color="white" />
                    </button>
                </div>
                <h1 className="px-6 text-3xl font-black pb-6 text-green-500 tracking-tighter hidden md:block">E-ALIM</h1>
                <nav className="space-y-2 px-2">{sidebarItems.map(renderSidebarIcon)}</nav>
            </div>

            <div className="border-t border-green-500/10 pt-4 space-y-2 px-2">{bottomItems.map(renderSidebarIcon)}</div>
        </div>
    );
};

export default SideBar;