/* ==========================================================================
   CURSOR.JS
   Custom Cursor Implementation
   ========================================================================== */

// Get cursor elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Track mouse movement
window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15
    });
});

/* ---------- Navigation Logo Cursor Effect ---------- */
const navLogo = document.getElementById('nav-logo');

if (navLogo) {
    // Expand cursor on hover
    navLogo.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            mixBlendMode: 'difference',
            borderColor: 'transparent',
            overwrite: true
        });
        gsap.to(cursorDot, { opacity: 0 });
    });

    // Reset cursor on leave
    navLogo.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            mixBlendMode: 'difference',
            borderColor: 'white',
            overwrite: true
        });
        gsap.to(cursorDot, { opacity: 1 });
    });

    // Magnetic follow effect
    navLogo.addEventListener('mousemove', (e) => {
        const bounds = navLogo.getBoundingClientRect();
        const relX = e.clientX - (bounds.left + bounds.width / 2);
        const relY = e.clientY - (bounds.top + bounds.height / 2);
        gsap.to(navLogo, {
            x: relX * 0.3,
            y: relY * 0.3,
            duration: 0.5
        });
    });

    // Snap back with elastic effect
    navLogo.addEventListener('mouseleave', () => {
        gsap.to(navLogo, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}
