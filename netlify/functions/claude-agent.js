import Anthropic from '@anthropic-ai/sdk';

export default async (request, context) => {
    // قراءة السؤال القادم من المستخدم (الفرونت إند)
    const { question } = await request.json();

    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022', // الموديل المستقر والسريع لعام 2026
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: question
            }
        ]
    });

    return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
    });
};
