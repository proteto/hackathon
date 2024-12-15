export async function POST(request) {
    const data = await request.json();
    console.log('Onboarding Data:', data);
    return new Response('OK', { status: 200 });
}