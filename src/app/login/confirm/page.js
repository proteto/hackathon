"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Confirm() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          setTimeout(() => router.push("/learn"), 0);
        }
        return prevCountdown - 1;
      });
    }, 1000);

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

