"use client";
import LetsGetStarted from '@/components/welcome/LetsGetStarted';
import Location from '@/components/welcome/location';
import NowWeContinue from '@/components/welcome/NowWeContinue';
import CheckYourLevel from '@/components/welcome/CheckYourLevel';
import Status from '@/components/welcome/Status';
import Knowledge from '@/components/welcome/knowledge';
import React, { useState } from 'react';

const WelcomePage = () => {
    const [isLocationVisible, setIsLocationVisible] = useState(true);
    const [isLetsGetStartedVisible, setIsLetsGetStartedVisible] = useState(false);
    const [isNowWeContinueVisible, setIsNowWeContinueVisible] = useState(false);
    const [isCheckYourLevelVisble, setIsCheckYourLevelVisible] = useState(false);
    const [isStatusVisible, setIsStatusVisible] = useState(false);
    const [isKnowledgeVisible, setIsKnowledgeVisible] = useState(false);

    const handleLocationButtonClick = () => {
        setIsLocationVisible(false);
        setIsLetsGetStartedVisible(true);
    };

    const handleLetsGetStartedButtonClick = () => {
        setIsLetsGetStartedVisible(false);
        setIsNowWeContinueVisible(true);
    };

    const handleNowWeContinueButtonClick = () => {
        setIsNowWeContinueVisible(false);
        setIsCheckYourLevelVisible(true);
    };

    const handleCheckYourLevelButtonClick = () => {
        setIsCheckYourLevelVisible(false);
        setIsStatusVisible(true);
    };

    const handleStatusButtonClick = () => {
        setIsStatusVisible(false);
        setIsKnowledgeVisible(true);
    };

    const renderComponent = () => {
        if (isLocationVisible) {
            return <Location onButtonClick={handleLocationButtonClick} />;
        }

        if (isLetsGetStartedVisible) {
            return <LetsGetStarted onButtonClick={handleLetsGetStartedButtonClick} />;
        }

        if (isNowWeContinueVisible) {
            return <NowWeContinue onButtonClick={handleNowWeContinueButtonClick} />;
        }

        if (isCheckYourLevelVisble) {
            return <CheckYourLevel onButtonClick={handleCheckYourLevelButtonClick} />;
        }

        if (isStatusVisible) {
            return <Status onButtonClick={handleStatusButtonClick} />;
        }

        if (isKnowledgeVisible) {
            return <Knowledge />;
        }

        return <NowWeContinue onButtonClick={handleNowWeContinueButtonClick} />;
    };

    return <div>{renderComponent()}</div>;
};

export default WelcomePage;
