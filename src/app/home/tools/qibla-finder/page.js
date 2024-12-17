"use client";
import React, { useState, useEffect, useRef } from 'react';

const QiblaFinder = () => {
    const [heading, setHeading] = useState(null);
    const [qiblaDirection, setQiblaDirection] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [compassError, setCompassError] = useState(null);
    const [loading, setLoading] = useState(true);
    const compassRef = useRef(null);

    const kaabaCoordinates = {
        latitude: 21.422487,
        longitude: 39.826206,
    };


    const getQiblaDirection = (userLat, userLng) => {
        const lat1 = (userLat * Math.PI) / 180;
        const lng1 = (userLng * Math.PI) / 180;
        const lat2 = (kaabaCoordinates.latitude * Math.PI) / 180;
        const lng2 = (kaabaCoordinates.longitude * Math.PI) / 180;

        const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);

        let bearing = (Math.atan2(y, x) * 180) / Math.PI;

        bearing = (bearing + 360) % 360;

        setQiblaDirection(bearing)
    };


    useEffect(() => {

        const handleCompassChange = (event) => {
            if (event.webkitCompassHeading) {
                setHeading(event.webkitCompassHeading)
            } else {
                setHeading(event.alpha);
            }
        };


        if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
            window.DeviceOrientationEvent.requestPermission().then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleCompassChange, true);
                } else {
                    setCompassError("Compass access denied");
                }
            }).catch(() => {
                setCompassError("Compass access failed");
            });
        } else if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleCompassChange, true);
        } else {
            setCompassError("Compass not supported");
        }


        return () => {
            window.removeEventListener('deviceorientation', handleCompassChange, true)
        };

    }, []);




    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getQiblaDirection(position.coords.latitude, position.coords.longitude);
                    setLoading(false);
                },
                (error) => {
                    let errorMessage = "Unknown error";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location access denied by user";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information unavailable";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Location request timed out";
                            break;
                    }
                    setLocationError(errorMessage);
                    setLoading(false);
                }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setLocationError("Geolocation is not supported");
            setLoading(false);
        }
    }, [getQiblaDirection]);

    const needleStyle = {
        transform: `rotate(${heading !== null ? heading + qiblaDirection : qiblaDirection}deg)`,
        transition: 'transform 0.1s ease-out'
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white min-h-screen font-sans">
            <h1 className="text-3xl font-bold mb-6 text-green-500">Qibla Finder</h1>
            {loading && <p className="text-gray-300 text-center mb-4">Loading...</p>}
            {locationError && <p className="text-red-400 text-center mb-4">{locationError}</p>}
            {compassError && <p className="text-red-400 text-center mb-4">{compassError}</p>}

            {!loading && !locationError && !compassError && (
                <div className="relative w-64 h-64 mb-8">
                    <div className="absolute w-full h-full bg-gray-800 rounded-full border-2 border-gray-700" />
                    <div className="absolute w-2/3 h-2/3 rounded-full top-1/6 left-1/6 bg-gray-800/30 backdrop-blur-sm"></div>
                    <div
                        className="absolute w-1 h-32 bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-top transition-transform duration-100 ease-out"
                        style={needleStyle}
                    ></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            )}


            {qiblaDirection !== null && !loading && !locationError && !compassError && (
                <p className="text-gray-200 text-center text-lg">
                    Qibla Direction: <span className="font-medium text-green-400">{qiblaDirection.toFixed(2)}°</span>
                </p>
            )}
        </div>
    );
};

export default QiblaFinder;