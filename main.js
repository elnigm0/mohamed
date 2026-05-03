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









