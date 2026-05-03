/* 
=========================================
======( Unified Projects Logic )=========
========[ Start all projects ]===========
=========================================
*/
const projectsData = { 
    /* [Project #1] */
    "Al-safwa academy": {
        img: "images-projects/project-1.png",
        desc: `It features a modern, responsive interface, smart content organization, and a smooth user experience that helps learners focus without complexity. The platform also relies on a fully interactive system that makes accessing lessons, exams, and results simple—creating a complete digital academy experience.`,
        tech: ["Smart", "Reliable", "Scalable", "Professional"]
    },
    /* [Project #2] */
    "Khair masr": {
        img: "images-projects/project-2.png",
        desc: `Khair Masr is a professionally built digital platform designed to serve the agricultural export sector with the highest quality standards. It features a modern, responsive interface and smart content organization to ensure a smooth and efficient user experience for clients and partners.`,
        tech: ["Export", "Agro", "Security", "Performance"]
    },
    /* [Project #3] */
    "Al arzak ala allah": {
        img: "images-projects/project-3.png",
        desc: `Al Arzak Ala Allah is a professional digital system for managing products and workers’ operations. It is designed as a smart solution to help business owners organize inventory, track product movement, and monitor workers’ performance with accuracy and ease.`,
        tech: ["Management", "Efficiency", "Tracking", "Modern"]    
   },
   /* [Project #4] */
    "El-Nigm": {
        img: "images-projects/project-4.png",
        desc: `El-Nigm Café is a modern café that blends comfort with elegance, where great taste meets fast, friendly service. It offers a wide selection of hot and cold drinks in a cozy atmosphere perfect for friends, work, and study.`,
        tech: ["Service", "Atmosphere", "Design", "Quality"]
    }
};
/* =========================================
======( Unified Projects Logic )=========
==========[ End all projects ]===========
=========================================
*/

/* =========================================
=====|| START MODAL CONTROLS ||==========
=========================================
*/
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("projectModal");
    const closeModal = document.querySelector(".close-modal");

    // التحقق من وجود عناصر المودال
    if (!modal) return;

    // إضافة مستمع الحدث لجميع أزرار التفاصيل
    document.querySelectorAll('.btn-outline').forEach(button => {
        button.addEventListener('click', function() {
            // الوصول للسكشن الأب لجلب العنوان
            const section = this.closest('.project-section');
            const h2Element = section ? section.querySelector('h2') : null;
            
            if (!h2Element) return;
            
            const title = h2Element.innerText.trim();
            const data = projectsData[title];

            if (data) {
                // 1. تحديث بيانات المودال
                document.getElementById('modalTitle').innerText = "PROJECT DETAILS";
                document.getElementById('fullTitle').innerText = title;
                document.getElementById('modalImg').src = data.img;
                document.getElementById('fullDesc').innerText = data.desc;
                
                // 2. تحديث قائمة التقنيات
                const techContainer = document.getElementById('modalTech');
                techContainer.innerHTML = '';
                
                data.tech.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'tag'; 
                    span.innerText = t;
                    span.style.cssText = "background: rgba(255,255,255,0.1); padding: 5px 12px; border-radius: 6px; font-size: 13px; margin: 5px; display: inline-block; border: 1px solid rgba(255,255,255,0.1); color: #fff;";
                    techContainer.appendChild(span);
                });

                // 3. فتح المودال مع تأثير أنيميشن
                modal.style.display = "block";
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                document.body.style.overflow = "hidden"; // منع التمرير
            }
        });
    });

    // دالة إغلاق المودال
    const closePanel = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = "none";
        }, 400); 
        document.body.style.overflow = "auto";
    };

    if (closeModal) closeModal.onclick = closePanel;
    
    // إغلاق عند الضغط خارج نافذة المودال
    window.onclick = (event) => {
        if (event.target == modal) closePanel();
    };
});
/* 
=========================================
======|| END MODAL CONTROLS ||===========
=========================================
*/
