"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/app/createClient";

const Location = ({ onButtonClick }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [user, setUser] = useState(null);
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const getSession = async () => {
            const { data: session, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error getting session:", error);
            } else if (session?.session?.user) {
                setUser(session.session.user);
            }
        };

        getSession();
    }, []);

    const countries = [
        "india", "pakistan", "bangladesh", "afghanistan", "saudi arabia",
        "america", "canada", "mexico", "australia", "new zealand",
        "germany", "france", "italy", "spain", "portugal",
        "russia", "ukraine", "belarus", "poland", "hungary",
        "turkey", "japan", "south korea", "north korea", "china",
        "indonesia", "malaysia", "singapore", "thailand", "vietnam",
        "maldives", "bali", "bora bora", "maui", "hawaii",
    ];

    useEffect(() => {
        if (typedText.length < "Where are you staying?".length) {
            const timeout = setTimeout(() => {
                setTypedText("Where are you staying?".slice(0, typedText.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [typedText]);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    const handleContinue = async () => {
        onButtonClick();
        if (!selectedCountry || !user?.email) {
            return;
        }

        try {
            const { error } = await supabase
                .from("users")
                .update({ country: selectedCountry })
                .match({ email: user.email });

            if (error) {
                console.error("Error updating country:", error);
            }
        } catch (error) {
            console.error("Error during updating country:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-8">
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-green-500 text-left capitalize">
                    {typedText}
                </h2>
                <div className="max-w-2xl w-full bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <div className="space-y-4 h-96 overflow-y-auto pr-4 scroll-m-1">
                        {countries.map((country, index) => (
                            <button
                                key={index}
                                onClick={() => handleCountrySelect(country)}
                                className={`w-full text-left p-4 rounded-xl transition capitalize
                                ${selectedCountry === country
                                        ? "bg-green-100 text-green-500 font-bold border-green-500"
                                        : "bg-gray-900 hover:bg-gray-700"
                                    }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 w-fit bg-green-500 cursor-pointer focus:ring-2 text-white py-3 px-10 rounded-full hover:bg-green-600 transition flex items-center justify-center ${!selectedCountry ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleContinue}
                    disabled={!selectedCountry}
                >
                    Continue <ArrowRight size={20} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Location;

