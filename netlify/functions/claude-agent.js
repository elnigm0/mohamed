import Anthropic from '@anthropic-ai/sdk';

export default async () => {
    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
        model: 'claude-opus-4-8',
        max_tokens: 4096,
        messages: [
            {
                role: 'user',
                content: 'How can AI improve my coding?'
            }
        ]
    });

    return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
    });
};
