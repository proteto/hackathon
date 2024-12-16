"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/app/createClient';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                const { data: user } = await supabase
                    .from('users')
                    .select('name, country, level')
                    .eq('email', session.user.email)
                    .single();

                if (user) {
                    setUserData({
                        name: user.name,
                        country: user.country,
                        level: user.level,
                        progress: 65,
                        avatarUrl: "/api/placeholder/200/200"
                    });
                    setEditedName(user.name);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleNameSave = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            await supabase
                .from('users')
                .update({ name: editedName })
                .eq('email', session.user.email);

            setUserData(prev => ({ ...prev, name: editedName }));
            setIsEditing(false);
        }
    };

    if (!userData) return null;

    return (
        <div className="bg-gray-800 flex justify-start p-4 rounded-xl max-h-screen">
            <div className="w-full max-w-md bg-white shadow-sm rounded-xl overflow-hidden shadow-gray-500">
                {/* Header with Level and Country */}
                <div className="flex justify-between p-4 bg-gray-900 border-b">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                            {userData.level}
                        </div>
                    </div>
                    <div className="text-gray-200 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {userData.country}
                    </div>
                </div>

                {/* Name Section */}
                <div className="flex flex-col items-center py-6 px-4 bg-gray-800">
                    {/* Name Editing */}
                    <div className="flex items-center">
                        {isEditing ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border px-2 py-1 rounded text-center"
                                />
                                <br />
                                <button
                                    onClick={handleNameSave}
                                    className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold mr-2">{userData.name}</h2>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

