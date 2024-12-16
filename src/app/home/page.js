"use client";
import React, { useState } from 'react';
import { 
  Lock, 
  Star, 
  ArrowRight, 
  Circle, 
  CheckCircle2 
} from 'lucide-react';

const LearningPage = () => {
  // Mock data - in a real app, this would come from a database
  const [levels] = useState([
    {
      id: 1,
      name: 'Basics',
      chapters: [
        { id: 1, name: 'Greetings', progress: 100, locked: false },
        { id: 2, name: 'Introductions', progress: 50, locked: false },
        { id: 3, name: 'Family', progress: 0, locked: true }
      ]
    },
    {
      id: 2,
      name: 'Intermediate',
      chapters: [
        { id: 4, name: 'Work', progress: 0, locked: true },
        { id: 5, name: 'Hobbies', progress: 0, locked: true },
        { id: 6, name: 'Travel', progress: 0, locked: true }
      ]
    },
    {
      id: 3,
      name: 'Advanced',
      chapters: [
        { id: 7, name: 'Business', progress: 0, locked: true },
        { id: 8, name: 'Culture', progress: 0, locked: true },
        { id: 9, name: 'Literature', progress: 0, locked: true }
      ]
    }
  ]);

  const renderChapterIcon = (chapter) => {
    if (chapter.locked) return <Lock className="text-gray-400" />;
    if (chapter.progress === 100) return <CheckCircle2 className="text-green-500" />;
    if (chapter.progress > 0) return <Circle className="text-blue-500" />;
    return <Circle className="text-gray-300" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Learning Path</h1>
      
      {levels.map((level) => (
        <div key={level.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            {level.name}
            <Star className="ml-2 text-yellow-500" size={24} />
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {level.chapters.map((chapter) => (
              <div 
                key={chapter.id} 
                className={`
                  border rounded-lg p-4 transition-all 
                  ${chapter.locked ? 'bg-gray-100 opacity-60' : 'hover:shadow-lg'}
                  flex items-center justify-between
                `}
              >
                <div className="flex items-center space-x-4">
                  {renderChapterIcon(chapter)}
                  <span className={`
                    font-medium 
                    ${chapter.locked ? 'text-gray-400' : 'text-gray-800'}
                  `}>
                    {chapter.name}
                  </span>
                </div>
                
                {!chapter.locked && (
                  <button 
                    disabled={chapter.locked}
                    className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
                  >
                    <ArrowRight />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPage;