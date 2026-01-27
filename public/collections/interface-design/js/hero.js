/**
 * Hero Section - Cursor-Reactive Background Blobs
 * Using the same smooth GSAP approach as the footer
 */

(function initHeroInteraction() {
    const hero = document.querySelector('.hero');
    const blobs = document.querySelectorAll('.hero-blob');

    if (!hero || blobs.length === 0) return;

    // Parallax multipliers for each blob (like footer)
    // Positive = follows cursor, Negative = inverse/repels
    const blobMultipliers = [
        { x: 0.3, y: 0.3, duration: 2 },     // Purple - follows
        { x: -0.25, y: -0.25, duration: 3 }, // Cyan - inverse
        { x: 0.4, y: 0.4, duration: 2.5 },   // Pink - strong follow
        { x: -0.2, y: -0.2, duration: 2.8 }  // Green - inverse
    ];

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate offset from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        blobs.forEach((blob, i) => {
            const settings = blobMultipliers[i] || { x: 0.2, y: 0.2, duration: 2 };

            gsap.to(blob, {
                x: (x - centerX) * settings.x,
                y: (y - centerY) * settings.y,
                duration: settings.duration,
                ease: "power2.out"
            });
        });
    });

    // Smoothly reset when mouse leaves
    hero.addEventListener('mouseleave', () => {
        blobs.forEach((blob, i) => {
            gsap.to(blob, {
                x: 0,
                y: 0,
                duration: 2,
                ease: "power2.out"
            });
        });
    });
})();
