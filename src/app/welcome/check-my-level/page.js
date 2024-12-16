"use client";
import React, { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/createClient';
const questionsData = [
    {
        "id": 1,
        "question": "How many make up the pillars of Islam?",
        "description": "This is a core priciple of Islam",
        "options": [
            "4",
            "5",
            "6",
            "7"
        ],
        "answer": 1
    },
    {
        "id": 2,
        "question": "How many make up the articles of faith of islam?",
        "description": "This is a core priciple of Islam",
        "options": [
            "4",
            "5",
            "6",
            "7"
        ],
        "answer": 2
    },
    {
        "id": 3,
        "question": "What is the name of the tribe of our Holy Prophet?",
        "description": "Our Holy prophet's tribe is one of the most important",
        "options": [
            "Banu Aws",
            "Banu Umayyah",
            "Banu Makhzum",
            "Banu Quraysh"
        ],
        "answer": 3
    },
    {
        "id": 4,
        "question": "Which battle is considered the first major battle in Islamic history?",
        "description": "This is one of the most important battles in Islamic history",
        "options": [
            "Battle of Uhud",
            "Battle of Badr",
            "Battle of Khandaq",
            "Battle of Hunayn"
        ],
        "answer": 1
    },
    {
        "id": 5,
        "question": "How many Surahs are there in Quran?",
        "description": "This id the key component of Quran",
        "options": [
            "114",
            "115",
            "116",
            "117"
        ],
        "answer": 0
    },
    {
        "id": 6,
        "question": "Who is the father of prophet muhammed(s)",
        "description": "This is a basic knowledge in islam",
        "options": [
            "Abu Bakr",
            "Abdullah",
            "Abdu Raheem"
        ],
        "answer": 1
    },
    {
        "id": 7,
        "question": "who build Ka'ba",
        "description": "This is a basic knowledge in islam",
        "options": [
            "Prophet Ibrahim  and his son Ismail",
            "Prophet sulaimain",
            "Prophet muhammad",
            "Prophet Ya'koob and his son yusuf"
        ],
        "answer": 0
    }
];

const QuizInterface = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [allCorrect, setAllCorrect] = useState(true);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [checkResult, setCheckResult] = useState(null);

    const currentQuestion = questionsData[currentQuestionIndex];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleCheck = () => {
        if (currentQuestion && selectedOption !== null) {
            const isCorrect = currentQuestion.options.indexOf(selectedOption) === parseInt(currentQuestion.answer);
            if (!isCorrect) {
                setAllCorrect(false)
            }
            setCheckResult(isCorrect ? "Correct" : "Incorrect");
            setChecked(true);
            setProgress((currentQuestionIndex + 1) * (100 / questionsData.length))

        }
    };


    const handleContinue = () => {
        if (currentQuestionIndex === questionsData.length - 1) {
            setShowResult(true);
            return;
        }
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setChecked(false);
        setCheckResult(null);
    };

    const handleOnComplete = useCallback(async () => {
        try {
            // Prepare the data to send to Supabase
            const onboardingData = {
                progress: 1, // Always set progress to 1 when quiz is completed
                level: allCorrect ? 2 : 1 // Set level to 2 if all correct, otherwise 1
            };

            // Get the current user's session
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.error('No active session');
                return;
            }

            // Retrieve the user's email from the session
            const userEmail = session.user.email;

            if (!userEmail) {
                console.error('No email found in session');
                return;
            }

            // Update the user's progress and level in Supabase using email
            const { data, error } = await supabase
                .from('users')
                .update(onboardingData)
                .eq('email', userEmail);

            if (error) {
                throw error;
            }

            console.log('Onboarding completed:', onboardingData);

            // Optional: Navigate to next page or perform additional actions
            router.push('/home');

        } catch (error) {
            console.error('Error during onboarding:', error);
            // Handle error (e.g., show error message to user)
        }
    }, [allCorrect, router]);

    if (showResult) {
        return (
            <div className="fixed inset-0 bg-gray-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <h2 className="text-white font-bold text-xl">Quiz completed!</h2>
                    <p className="text-gray-400 pt-2 text-lg">
                        {allCorrect ? "You have covered fundamentals" : "Your level is set to beginner"}
                    </p>
                    <button
                        onClick={() => handleOnComplete({})}
                        className="text-white py-2 px-6 h-12 rounded-full border-2 border-green-500 hover:bg-green-500 transition-all duration-500 mt-5"
                    >Continue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-900 flex flex-col p-4 md:p-8">
            {/* Progress Section */}
            <div className='w-full flex items-center justify-center rounded-full border-b-2 border-green-500 h-16 md:h-24'>
                <div className="w-full max-w-7xl flex items-center space-x-4">
                    <div className="flex-grow bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question and Options */}
            <div className="flex flex-col items-center justify-center flex-1">
                {currentQuestion && (
                    <div className="max-w-3xl w-full space-y-6">
                        <h2 className="text-xl font-bold text-white text-center">{currentQuestion.question}</h2>
                        <p className='text-gray-400 text-center'>{currentQuestion.description}</p>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={checked}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition 
                                            ${selectedOption === option
                                            ? checked ? (currentQuestion.options.indexOf(option) === parseInt(currentQuestion.answer) ? 'bg-green-100 border-green-500 text-green-500' : 'bg-red-100 border-red-500 text-red-500') : 'bg-green-100 border-green-500 text-green-500'
                                            : checked && currentQuestion.options.indexOf(option) === parseInt(currentQuestion.answer) ? 'bg-green-100 border-green-500 text-green-500' : 'border-gray-200 bg-gray-900 text-white hover:bg-gray-700'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        {checkResult && (
                            <p className={`mt-4 text-center font-bold ${checkResult === 'Correct' ? 'text-green-500' : 'text-red-500'}`}>
                                {checkResult}
                            </p>
                        )}
                    </div>
                )}
            </div>


            {/* Controls Section */}
            <div className="w-full text-white p-2 rounded-full transition border-t-2 border-green-500 h-16 md:h-24 flex justify-end items-center">
                {
                    !checked ?
                        (
                            <button
                                disabled={!selectedOption}
                                onClick={handleCheck}
                                className={`text-white py-2 px-6 h-12 rounded-full border-2  transition-all duration-500  ${selectedOption ? ' border-yellow-500 hover:bg-yellow-500' : 'border-gray-700  bg-gray-700 cursor-not-allowed'}`}
                            >
                                Check
                            </button>
                        )
                        :
                        (
                            <button
                                onClick={handleContinue}
                                className="text-white py-2 px-6 h-12 rounded-full border-2 border-green-500 hover:bg-green-500 transition-all duration-500  flex items-center space-x-2"
                            >
                                <ArrowRight size={24} />
                                <span>Continue</span>
                            </button>
                        )
                }
            </div>
        </div>
    );
};

export default QuizInterface;