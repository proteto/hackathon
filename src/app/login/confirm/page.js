"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/createClient";

export default function Confirm() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const checkAndAddUser = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user;

        if (!user) {
          console.error('Error fetching user');
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user:', error);
        } else if (!data) {
          const res = await supabase
            .from('users')
            .insert([{ email: user.email, name: user.user_metadata.displayName || '', progress: 0 }]);

          if (res.error) {
            console.error('Error adding user:', res.error?.message);
          } else {
            console.log('User added:', res);
          }
        }
      } catch (error) {
        console.error('Error in user check:', error);
      }
    };

    checkAndAddUser();

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          setTimeout(() => router.push("/learn"), 0);
        }
        return prevCountdown - 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Login successfully, redirecting in {countdown} seconds...
        </h2>
      </div>
    </div>
  );
}

