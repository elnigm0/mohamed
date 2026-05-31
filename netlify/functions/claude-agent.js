const { Anthropic } = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // الحماية: السماح بطلبات POST فقط
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // قراءة السؤال المرسل من الفرونت إند
    const buffer = JSON.parse(event.body);
    const userQuestion = buffer.question;

    // الاتصال المباشر بـ Anthropic باستخدام الـ API Key المخزن في إعدادات نيتليفاى
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // الموديل المستقر المعتمد
      max_tokens: 1024,
      messages: [
        { 
          role: 'user', 
          content: `أنت المساعد الذكي لمطور الواجهات الأمامية محمد عصام. أجب على هذا السؤال باحترافية وبشكل مختصر: ${userQuestion}` 
        }
      ],
    });

    // إرسال الرد بصيغة متوافقة مع الفرونت إند
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ reply: response.content[0].text }),
    };

  } catch (error) {
    console.error('حدث خطأ في السيرفر:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'فشل السيرفر في جلب الرد من Claude' }),
    };
  }
};
