/**
 * summer.js - Developed for Mohamed Essam
 * مخصص لتبديل الوضع الذهبي وحذف الخلفيات وتغيير الأيقونات
 */

document.addEventListener('DOMContentLoaded', () => {
    const summerBtn = document.querySelector('#summer-toggle');
    const body = document.body;

    // دالة لتحديث الشكل (الأيقونات والألوان)
    const updateUI = (isGold) => {
        const summerIcon = summerBtn.querySelector('i');
        if (isGold) {
            body.classList.add('gold-mode');
            summerIcon.className = 'fas fa-sun'; // أيقونة الشمس
            summerIcon.style.color = '#FFD700';
        } else {
            body.classList.remove('gold-mode');
            summerIcon.className = 'fas fa-cloud-showers-heavy'; // أيقونة السحابة
            summerIcon.style.color = '#fff';
        }
    };

    // 1. التحقق من التفضيل المحفوظ عند تحميل أي صفحة
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'gold') {
        updateUI(true);
    }

    // 2. مستمع الحدث للزر
    if (summerBtn) {
        summerBtn.addEventListener('click', () => {
            const isGold = body.classList.toggle('gold-mode');
            localStorage.setItem('theme-mode', isGold ? 'gold-mode' : 'default');
            
            // تحديث الأيقونة فوراً
            updateUI(isGold);

            // إضافة تأثير حركي بسيط
            summerBtn.style.transform = 'scale(1.2)';
            setTimeout(() => summerBtn.style.transform = 'scale(1)', 200);
        });
    }
});
