// تأثير بسيط لتغيير شفافية النافبار عند التمرير
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 22, 34, 0.9)';
    } else {
        nav.style.background = 'transparent';
    }
});


/* 
=============================
====||START BURGER MENU||====
=============================
*/
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// إغلاق القائمة عند الضغط على أي رابط (للموبايل)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});
/* 
=============================
=====||END BURGER MENU||=====
=============================
*/








/* 
=============================
======||START SKILLS||=======
=============================
*/
document.addEventListener("DOMContentLoaded", function () {
    const skillCards = document.querySelectorAll(".skill-card");

    const observerOptions = {
        threshold: 0.2 // يبدأ التأثير عندما يظهر 20% من القسم على الشاشة
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة التأثير لكل كارت بتأخير زمني (Stagger effect)
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 100); // تأخير 100 ملي ثانية بين كل مهارة والأخرى
                });
                // توقف عن مراقبة القسم بعد ظهور التأثير لأول مرة
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة حاوي المهارات
    const skillsWrapper = document.querySelector(".skills-flex");
    if (skillsWrapper) {
        skillsObserver.observe(skillsWrapper);
    }
});

const cards = document.querySelectorAll('.skill-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const iconColor = window.getComputedStyle(card.querySelector('i')).color;
        card.style.boxShadow = `0 0 20px ${iconColor}`;
        card.style.borderColor = iconColor;
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});
/* 
=============================
=======||END SKILLS||========
=============================
*/






/* 
=============================
=======||START SNOW||========
=============================
*/  
document.querySelector('.fa-snowflake').parentElement.addEventListener('click', function() {
    createSnowfall();
});

function createSnowfall() {
    const duration = 5000; // مدة تساقط الثلج (5 ثوانٍ)
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄'; // شكل الثلجة
        snowflake.className = 'snowflake';
        
        // إعطاء مكان عشوائي وسرعة عشوائية لكل ثلجة
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        // سرعة السقوط بين 2 إلى 5 ثوانٍ
        const fallDuration = Math.random() * 3 + 2;
        snowflake.style.animationDuration = fallDuration + 's';

        document.body.appendChild(snowflake);

        // حذف العنصر بعد انتهاء الحركة لتوفير الذاكرة
        setTimeout(() => {
            snowflake.remove();
        }, fallDuration * 1000);
        
    }, 100); // إنشاء ثلجة جديدة كل 100 مللي ثانية
}



window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* 
=============================
========||END SNOW||=========
=============================
*/



// 1. دالة جلب البيانات من السيرفر السحابي (Netlify Function)
async function askMyAIChatbot(textFromUser) {
    const chatDisplay = document.getElementById('chat-output');

    try {
        // الاتصال بالملف السري الآمن في الخلفية
        const response = await fetch('/.netlify/functions/claude-agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: textFromUser }) // نرسل السؤال هنا
        });
        
        const data = await response.json();
        
        // 🌟 التعديل هنا: نتحقق من وجود محتوى الرد بالشكل الجديد لـ Netlify AI Gateway
        if (data && data.content && data.content[0] && data.content[0].text) {
            chatDisplay.innerText = data.content[0].text; 
        } else if (data && data.reply) {
            // كخطة بديلة (Fallback) إذا قام الكود بإرجاع الحقل المباشر
            chatDisplay.innerText = data.reply;
        } else {
            chatDisplay.innerText = "للأسف، واجه السيرفر مشكلة في صياغة الرد.";
        }
    } catch (error) {
        chatDisplay.innerText = "عذراً، لم نتمكن من الوصول للذكاء الاصطناعي. تأكد من رفع الموقع بشكل صحيح.";
        console.error("Error fetching AI:", error);
    }
}

// 2. إدارة تشغيل السيرش والأزرار والنافذة المنبثقة
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const aiPopup = document.getElementById('ai-response-popup');
const chatOutput = document.getElementById('chat-output');
const closePopupBtn = document.getElementById('close-popup-btn');

function handleAISubmission() {
    const query = userInput.value.trim();
    if (!query) return;

    // أولاً: إظهار النافذة المنبثقة فوراً ونقول للمستخدم انتظر ثواني
    aiPopup.style.display = 'block';
    chatOutput.innerText = "جاري الاتصال بـ Claude وتجهيز الرد الحقيقي... 🤖";

    // ثانياً: نرسل السؤال للدالة لتجلب النتيجة الحقيقية
    askMyAIChatbot(query);

    // ثالثاً: تفريغ حقل السيرش ليكون جاهزاً للسؤال القادم
    userInput.value = "";
}

// تشغيل الـ AI عند الضغط على أيقونة الطائرة الورقية (الإرسال)
if(sendBtn) {
    sendBtn.addEventListener('click', handleAISubmission);
}

// تشغيل الـ AI عند الضغط على زر Enter من الكيبورد داخل السيرش
if(userInput) {
    userInput.value = ""; // تصفير عند تحميل الصفحة
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAISubmission();
        }
    });
}

// إغلاق نافذة النتائج تماماً عند الضغط على علامة X
if(closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
        aiPopup.style.display = 'none';
    });
}


const response = await fetch('/.netlify/functions/claude-agent', {
    

