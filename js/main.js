// تأثير بسيط لتغيير شفافية النافبار عند التمرير
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 22, 34, 0.9)';
        } else {
            nav.style.background = 'transparent';
        }
    }
});

/* =============================
====||START BURGER MENU||====
=============================
*/
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });
}

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.toggle('active');
}

// إغلاق القائمة عند الضغط على أي رابط (للموبايل)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        if (nav) nav.classList.remove('active');
    });
});
/* =============================
=====||END BURGER MENU||=====
=============================
*/

/* =============================
======||START SKILLS||=======
=============================
*/
document.addEventListener("DOMContentLoaded", function () {
    const skillCards = document.querySelectorAll(".skill-card");

    const observerOptions = {
        threshold: 0.2
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsWrapper = document.querySelector(".skills-flex");
    if (skillsWrapper) {
        skillsObserver.observe(skillsWrapper);
    }
});

const cards = document.querySelectorAll('.skill-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
            const iconColor = window.getComputedStyle(icon).color;
            card.style.boxShadow = `0 0 20px ${iconColor}`;
            card.style.borderColor = iconColor;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});
/* =============================
=======||END SKILLS||========
=============================
*/

/* =============================
=======||START SNOW||========
=============================
*/  
const snowTrigger = document.querySelector('.fa-snowflake');
if (snowTrigger && snowTrigger.parentElement) {
    snowTrigger.parentElement.addEventListener('click', function() {
        createSnowfall();
    });
}

function createSnowfall() {
    const duration = 5000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.className = 'snowflake';
        
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        const fallDuration = Math.random() * 3 + 2;
        snowflake.style.animationDuration = fallDuration + 's';

        document.body.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, fallDuration * 1000);
        
    }, 100);
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});
/* =============================
========||END SNOW||=========
=============================
*/

/* =============================
=======||START AI CHAT||=====
=============================
*/
// 1. دالة جلب البيانات من السيرفر السحابي المتوافقة مع تحديث Netlify الجديد
async function askMyAIChatbot(textFromUser) {
    const chatDisplay = document.getElementById('chat-output');
    if (!chatDisplay) return;

    try {
        const response = await fetch('/.netlify/functions/claude-agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: textFromUser })
        });
        
        const data = await response.json();
        
        // التعديل الأساسي لقراءة البنية الجديدة لـ Netlify AI Gateway
        if (data && data.content && data.content[0] && data.content[0].text) {
            chatDisplay.innerText = data.content[0].text; 
        } else if (data && data.reply) {
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
    if (!userInput || !aiPopup || !chatOutput) return;
    
    const query = userInput.value.trim();
    if (!query) return;

    // أولاً: إظهار النافذة المنبثقة وتنبيه المستخدم
    aiPopup.style.display = 'block';
    chatOutput.innerText = "جاري الاتصال بـ Claude وتجهيز الرد الحقيقي... 🤖";

    // ثانياً: إرسال السؤال للدالة السحابية
    askMyAIChatbot(query);

    // ثالثاً: تفريغ حقل الإدخال بعد الإرسال مباشرة
    userInput.value = "";
}

// تشغيل عند الضغط على زر الإرسال
if (sendBtn) {
    sendBtn.addEventListener('click', handleAISubmission);
}

// تشغيل عند الضغط على Enter داخل حقل الكتابة
if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAISubmission();
        }
    });
}

// إغلاق النافذة عند الضغط على X
if (closePopupBtn && aiPopup) {
    closePopupBtn.addEventListener('click', () => {
        aiPopup.style.display = 'none';
    });
}

aiPopup.style.display = 'block';
chatOutput.innerText = "جاري الاتصال بـ Claude...";

/* =============================
========||END AI CHAT||======
=============================
*/
