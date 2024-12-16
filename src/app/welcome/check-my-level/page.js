"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import questionsData from './questions.json';
import { CircularProgress } from '@mui/material';

const renderSVGCharacter = (characterConfig) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={characterConfig.viewBox}
            className={characterConfig.className}
        >
            {characterConfig.elements.map((element, index) => {
                switch (element.type) {
                    case 'circle':
                        return <circle key={index} {...element} />;
                    case 'rect':
                        return <rect key={index} {...element} />;
                    case 'path':
                        return <path key={index} {...element} />;
                    default:
                        return null;
                }
            })}
        </svg>
    );
};


const QuizInterface = ({ initialOnComplete }) => {
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState('basic');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [typedText, setTypedText] = useState('');
    const [quizComplete, setQuizComplete] = useState(false);
    const [categoryScores, setCategoryScores] = useState({
        basic: { correct: 0 },
        moderate: { correct: 0 },
        advanced: { correct: 0 }
    });
    const [userLevel, setUserLevel] = useState(null);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const categoryOrder = ['basic', 'moderate', 'advanced'];
    const [unansweredCategories, setUnansweredCategories] = useState([])
    const processedOptions = useRef({});
    const questions = categoryOrder.reduce((acc, category) => {
        acc[category] = questionsData[category].map((q) => ({
            ...q,
            character: renderSVGCharacter({
                viewBox: "0 0 200 200",
                className: "w-48 h-48",
                elements: [{ type: "circle", cx: "100", cy: "100", r: "90", fill: "#F0F0F0" }],
            }),
            options: q.options,

        }));
        return acc;
    }, {});


    const currentQuestions = questions[currentCategory];
    const currentQuestion = currentQuestions?.[currentQuestionIndex];

    const handleOnComplete = useCallback(async (selections) => {
        try {
            console.log('Onboarding completed:', selections);
            await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selections),
            });
        } catch (error) {
            console.error('Error during onboarding:', error);
        }
    }, [router]);

    useEffect(() => {
        if (quizComplete) return
        const currentQuestionText = currentQuestion?.question || '';
        if (typedText.length < currentQuestionText.length) {
            const timeout = setTimeout(() => {
                setTypedText(currentQuestionText.slice(0, typedText.length + 1));
            }, 20);
            return () => clearTimeout(timeout);
        }

    }, [typedText, currentQuestionIndex, currentCategory, currentQuestions, quizComplete, currentQuestion]);


    const calculateProgressPercentage = useCallback(() => {
        if (!currentQuestions || currentQuestions.length === 0) return 0;
        return ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    }, [currentQuestions, currentQuestionIndex]);


    const handleOptionSelect = (option) => {
        setSelectedOptions(prev => ({ ...prev, [currentQuestion?.question]: option }));
    };
    const calculateCategoryAccuracy = useCallback((category) => {
        const total = questions[category]?.length || 0;
        if (total === 0) return 0;

        const correct = categoryScores[category]?.correct || 0;
        const accuracy = correct / total;

        return Number.isNaN(accuracy) ? 0 : accuracy
    }, [questions, categoryScores]);


    const handleContinue = () => {
        if (!currentQuestion || !selectedOptions[currentQuestion.question]) return;
        const isLastQuestion = currentQuestionIndex === (currentQuestions?.length || 0) - 1;


        if (isLastQuestion) {
            const currentCategoryIndex = categoryOrder.indexOf(currentCategory);
            const nextCategoryIndex = currentCategoryIndex + 1;
            const categoryQuestions = questions[currentCategory];
            const allQuestionsAnswered = categoryQuestions?.every(q => selectedOptions[q.question]); // Check if every question has a selected option

             if (!allQuestionsAnswered) {
                // Set the level to the last unfinished category
                setUserLevel(currentCategory);
                setUnansweredCategories(prev => [...prev, currentCategory])
                setShowAnalysis(true);
                setAnalysisProgress(calculateProgressPercentage())
                setSelectedOptions({});
                return;
            }

            if (nextCategoryIndex < categoryOrder.length) {
                setCurrentCategory(categoryOrder[nextCategoryIndex]);
                setCurrentQuestionIndex(0);
                setTypedText("");
                setSelectedOptions({});
            } else {
                setUserLevel('advanced');
                setQuizComplete(true);
                setShowAnalysis(true);
                setAnalysisProgress(calculateProgressPercentage());
                setSelectedOptions({});
            }
            return
        }
        setCurrentQuestionIndex((prev) => prev + 1);
        setTypedText("");
    };

    const handleBack = () => {
        if (currentQuestionIndex <= 0) return;
        setTypedText("");
        setCurrentQuestionIndex((prev) => prev - 1);

    };

    useEffect(() => {
        if (!currentQuestion) return;
        const selectedOption = selectedOptions[currentQuestion.question];
        if (selectedOption === undefined) return;
        if (processedOptions.current[currentQuestion.question]) return;

        const correctIndex = currentQuestion.answer;

        if (currentQuestion.options.indexOf(selectedOption) === parseInt(correctIndex)) {
          setCategoryScores(prev => ({
             ...prev,
            [currentCategory]: {
              correct: ((prev[currentCategory]?.correct) || 0) + 1
              }
            }));
        }
        processedOptions.current[currentQuestion.question] = true;
    }, [selectedOptions, currentQuestion, currentCategory, currentQuestions]);

    const renderAnalysis = () => {

        const handleReviewContinue = () => {
            setShowAnalysis(false);
            if (quizComplete)
                handleOnComplete(selectedOptions);
        };

        if (quizComplete)
            return (
                <div className='flex items-center justify-center p-4 h-full w-full text-center' >
                    <div className="max-w-4xl w-full">
                        <h2 className="text-white font-bold text-xl">Quiz completed!</h2>
                        <p className="text-gray-400 pt-2 text-lg">
                            Your level has been set to: <strong>{userLevel}</strong>
                        </p>
                        <div className='pt-10 flex flex-col items-center'>
                            {categoryOrder.map(cat => (
                                <div key={cat} style={{ margin: 10 }}>
                                    <div style={{ display: 'flex', gap: 20, alignItems: "center" }}>
                                        <CircularProgress variant="determinate" size={80} value={calculateCategoryAccuracy(cat) * 100} style={{ color: "lightgreen" }} />
                                        <span style={{ color: 'white' }}> {cat} correct {categoryScores[cat]?.correct || 0}/{questions[cat]?.length} </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleReviewContinue}
                            className="text-white py-2 px-6 h-12 rounded-full border-2 border-green-500 hover:bg-green-500 transition-all duration-500 mt-5"
                        >Continue
                        </button>
                    </div>
                </div>
            );


        return (
            <div className='h-full w-full flex items-center  justify-center  '>
                <div style={{ display: "flex", gap: 10, justifyContent: 'center', flexDirection: "column" }}>
                    <h2 className='text-center text-white font-bold text-xl '>Current section complete</h2>
                     {
                    unansweredCategories.length > 0 &&  (
                    <p className="text-gray-400 pt-2 text-lg text-center">
                            Your level has been set to: <strong>{userLevel}</strong>
                    </p>
                    )
                }
                    <div style={{ display: 'flex', gap: 20, justifyContent: "center", alignItems: "center", marginBottom: 10 }}  >
                        <CircularProgress variant="determinate" value={analysisProgress} style={{ color: "lightgreen" }} size={80} />
                        {
                        unansweredCategories.length === 0 && (
                            <span style={{ color: 'white' }}>Your level is : <strong>{userLevel}</strong> </span>
                        )

                    }
                    </div>
                    <div className='flex flex-col items-center'>
                        {categoryOrder.map(cat => (
                             !unansweredCategories.includes(cat) && (
                            <div key={cat} style={{ margin: 10 }}>
                                <div style={{ display: 'flex', gap: 20, alignItems: "center" }}>
                                    <CircularProgress variant="determinate" size={80} value={calculateCategoryAccuracy(cat) * 100} style={{ color: "lightgreen" }} />
                                    <span style={{ color: 'white' }}> {cat} correct {categoryScores[cat]?.correct || 0}/{questions[cat]?.length} </span>
                                </div>
                            </div>
                             )
                        ))}
                    </div>
                    <button
                        onClick={handleReviewContinue}
                        className="text-white py-2 px-6 h-12 rounded-full border-2 border-green-500 hover:bg-green-500 transition-all duration-500 mt-5 "
                    >
                        Continue to Next Category
                    </button>
                </div>
            </div>
        );
    };

     if (showAnalysis) return renderAnalysis()

    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col items-between justify-between p-4 md:p-8">
            {/* Progress Section */}
            <div className='w-full flex items-center justify-center rounded-full border-b-2 border-green-500 h-16 md:h-24'>
                <div className="w-full max-w-7xl flex items-center space-x-4">
                    {currentQuestionIndex > 0 && (
                        <button
                            onClick={handleBack}
                            className="text-white hover:text-green-500 hover:bg-gray-700 p-2 rounded-full transition-all duration-500"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="flex-grow bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-full transition-all duration-300"
                            style={{ width: `${calculateProgressPercentage()}%` }}
                        />
                    </div>
                </div>
            </div>
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 max-w-3xl w-full mx-auto">
                {/* Character */}
                <div className="flex-shrink-0">
                    {currentQuestion?.character}
                </div>

                {/* Question Container */}
                <div className='flex flex-col items-baseline space-y-4 w-full md:w-auto'>
                    {/* Question Text */}
                    <div className="flex items-center space-x-2 border-l border-r-2 border-y-2 border-green-500 px-4 py-2 mb-4 rounded-r-2xl">
                        <h2 className="text-xl font-bold text-white">
                            {typedText}
                        </h2>
                    </div>

                    {/* Options */}
                    <div className="flex-grow bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-lg relative w-full">
                        <div className="space-y-4">
                            {currentQuestion?.options?.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition 
                      ${selectedOptions[currentQuestion?.question] === option
                                            ? 'bg-green-100 border-green-500 text-green-500'
                                            : 'border-gray-200 bg-gray-900 text-white hover:bg-gray-700'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Section */}
            <div className="w-full text-white p-2 rounded-full transition border-t-2 border-green-500 h-16 md:h-24 flex justify-end items-center">
                {selectedOptions[currentQuestion?.question] && (
                    <button
                        onClick={handleContinue}
                        className="text-white py-2 px-6 h-12 rounded-full border-2 border-green-500 hover:bg-green-500 transition-all duration-500 flex items-center space-x-2"
                    >
                        <ArrowRight size={24} />
                        <span>Continue</span>
                    </button>
                )}
            </div>
        </div>
    );
};
export default QuizInterface;