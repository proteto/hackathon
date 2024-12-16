import { supabase } from '@/app/createClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChapterPage({ params }) {
  const { chapterId } = params;
  const [chapter, setChapter] = useState(null);
  const [answer, setAnswer] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      if (!user) router.push('/login');
      else setUser(user);
    };

    const fetchChapter = async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select(`
          id, 
          name, 
          chapter_answers (answer_text)
        `)
        .eq('id', chapterId)
        .single();
        
      if (error) console.error('Error fetching chapter:', error);
      else {
        setChapter(data);
        setAnswer(data.chapter_answers[0]?.answer_text || 'No answer provided.');
      }
    };

    fetchUser();
    fetchChapter();
  }, [chapterId, router]);

  const markAsCompleted = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        chapter_id: chapter.id,
        status: 'completed'
      });

    if (error) console.error('Error marking as completed:', error);
    else alert('Chapter marked as completed!');
  };

  return (
    <div className="p-8">
      {chapter && (
        <>
          <h1 className="text-3xl font-bold">{chapter.name}</h1>
          <p className="mt-4">{answer}</p>

          <button 
            className="mt-8 bg-green-500 text-white p-2 rounded" 
            onClick={markAsCompleted}
          >
            Mark as Completed
          </button>
        </>
      )}
    </div>
  );
}
