const { Anthropic } = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // السماح بطلبات POST فقط
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const buffer = JSON.parse(event.body);
    const userQuestion = buffer.question;

    // الاتصال بـ Claude باستخدام الـ API Key الخاص بك لتجنب ليميت نيتليفاى
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: userQuestion }
      ],
    });

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // لحل أي مشكلة حظر بين الدومينات
      },
      body: JSON.stringify({ reply: response.content[0].text }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
