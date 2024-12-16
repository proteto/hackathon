import { supabase } from "@/app/createClient";

export async function POST(req) {
  const body = await req.json();
  const { user_id, chapter_id, status } = body;

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({ user_id, chapter_id, status });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
