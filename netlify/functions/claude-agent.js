const { Anthropic } = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // 1. حماية الدالة: السماح بطلبات POST فقط
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // 2. قراءة السؤال القادم من ملف main.js
    const buffer = JSON.parse(event.body);
    const userQuestion = buffer.question;

    // 3. الاتصال المباشر بـ Claude باستخدام المفتاح السري الخاص بك
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // موديل رسمي، سريع ومستقر جداً
      max_tokens: 1024,
      messages: [
        { 
          role: 'user', 
          content: `أنت المساعد الذكي لمطور الواجهات الأمامية محمد عصام. أجب على هذا السؤال باحترافية وبشكل مختصر كلغة مساعد شخصي: ${userQuestion}` 
        }
      ],
    });

    // 4. إرجاع الرد بنجاح للفرونت إند
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: response.content[0].text }),
    };

  } catch (error) {
    console.error('حدث خطأ في الدالة السحابية:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'فشل السيرفر في جلب الرد، تأكد من الـ API Key الخاص بك' }),
    };
  }
};
