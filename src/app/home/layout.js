"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import SideBar from "@/components/ui/SideBar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function HomeLayout({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            } else {
                window.location.href = "/login";
            }
        };

        fetchUserSession();
    }, []);

    return (
        <div className="flex flex-row items-center justify-center bg-white dark:bg-[#1d1d1d] pl-56">
            <SideBar />
            <div className="w-full max-w-[calc(100vw-16rem)]">
                {/* Content area */}
                <div className="w-full ml-4 bg-gray-900 min-h-screen">
                    <div className="flex flex-col bg-gray-900 rounded-xl overflow-y-auto h-fit py-10 px-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
