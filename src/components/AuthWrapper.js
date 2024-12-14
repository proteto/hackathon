"use client";
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import { supabase } from '@/app/createClient';

const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe?.();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default AuthWrapper;

