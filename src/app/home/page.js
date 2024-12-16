"use client";
import { supabase } from '../createClient';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const [levels, setLevels] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      setUser(user);
    };

    const fetchLevels = async () => {
      const { data, error } = await supabase
        .from('levels')
        .select(`
          id, 
          name, 
          headings (
            id, 
            name, 
            subheadings (
              id, 
              name, 
              chapters (
                id, 
                name
              )
            )
          )
        `);
      if (error) console.error('Error fetching levels:', error);
      else setLevels(data);
    };

    fetchUser();
    fetchLevels();
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Learn Page</h1>

      {levels.map(level => (
        <div key={level.id} className="mt-8">
          <h2 className="text-2xl font-semibold">{level.name}</h2>

          {level.headings.map(heading => (
            <div key={heading.id} className="mt-4">
              <h3 className="text-xl font-bold">{heading.name}</h3>

              {heading.subheadings.map(subheading => (
                <div key={subheading.id} className="mt-2">
                  <h4 className="font-semibold">{subheading.name}</h4>

                  {subheading.chapters.map(chapter => (
                    <p
                      key={chapter.id}
                      className="cursor-pointer text-blue-500 underline"
                      onClick={() => router.push(`/learn/${chapter.id}`)}
                    >
                      {chapter.name}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
