import { Anthropic } from '@anthropic-ai/sdk';

export default async (request, context) => {
  // 1. الحماية: السماح بطلبات POST فقط
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed - استخدم POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // 2. قراءة السؤال المرسل من الفرونت إند (مستند إلى نظام الـ Request الحديث)
    const buffer = await request.json();
    const userQuestion = buffer.question;

    // 3. الاتصال بـ Claude عبر بوابة Netlify الذكية تلقائياً وبدون الـ API Key الخاص بك
    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-8', // الاسم الصحيح بالشرطات كما في وثيقة Netlify
      max_tokens: 1024,
      messages: [
        { 
          role: 'user', 
          content: `أنت المساعد الذكي لمطور الواجهات الأمامية محمد عصام. أجب على هذا السؤال باحترافية وبشكل مختصر كلغة مساعد شخصي: ${userQuestion}` 
        }
      ],
    });

    // 4. إرسال الرد الحقيقي إلى الفرونت إند بصيغة متوافقة مع الـ Gateway
    return new Response(JSON.stringify({ reply: response.content[0].text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('حدث خطأ في السيرفر:', error);
    return new Response(JSON.stringify({ error: 'فشل الذكاء الاصطناعي في الرد عبر بوابة Netlify' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
