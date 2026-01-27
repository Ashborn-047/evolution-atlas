/* ==========================================================================
   HERO.JS
   Hero Section Interactions (Eclipse Effect & Pixel Animation)
   ========================================================================== */

/* ==================== HERO ENTRANCE ANIMATION ==================== */
gsap.from('.hero-line', {
    y: 150,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: 'power4.out'
});

/* ==================== INK ECLIPSE EFFECT ==================== */
const inkContainer = document.querySelector('#hero-ink-trigger');
const inkText = inkContainer.querySelector('h1');

// Split the INK text into individual characters with shadow
const inkChars = splitTextWithShadow(inkText);

// Apply eclipse-style 3D rotation on mouse move
inkContainer.addEventListener('mousemove', (e) => {
    const bounds = inkContainer.getBoundingClientRect();

    inkChars.forEach(char => {
        const charBounds = char.getBoundingClientRect();
        const distX = e.clientX - (charBounds.left + charBounds.width / 2);

        gsap.to(char, {
            rotationY: gsap.utils.clamp(-45, 45, distX * 0.2),
            z: 30,
            duration: 0.5
        });

        const shadow = char.querySelector('.eclipse-shadow');
        if (shadow) {
            gsap.to(shadow, {
                x: -distX * 0.2,
                opacity: 0.8 - Math.abs(distX) / 200,
                duration: 0.5
            });
        }
    });
});

// Reset on mouse leave
inkContainer.addEventListener('mouseleave', () => {
    inkChars.forEach(char => {
        gsap.to(char, { rotationY: 0, z: 0, duration: 0.5 });
        const shadow = char.querySelector('.eclipse-shadow');
        if (shadow) {
            gsap.to(shadow, {
                x: 0,
                opacity: 0,
                duration: 0.5
            });
        }
    });

    // Reset cursor
    gsap.to(cursorOutline, {
        scale: 1,
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        borderColor: 'white'
    });
});

// Eclipse-style big circle cursor with negative effect
inkContainer.addEventListener('mouseenter', () => {
    gsap.to(cursorOutline, {
        scale: 2,
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        borderColor: 'transparent'
    });
});

/* ==================== PIXEL SCRAMBLE EFFECT (ORIGINAL) ==================== */
const pixelTrigger = document.querySelector('#hero-pixel-trigger');
const pixelText = document.querySelector('#pixel-text');
const originalText = "To Pixels";
const pixelChars = "█▓▒░01<!>_";  // Original character set
let pixelInterval = null;

// Activate pixel scramble on hover
pixelTrigger.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(pixelInterval);

    // Switch to pixel font
    pixelText.classList.remove('font-serif', 'italic', 'font-light');
    pixelText.classList.add('font-pixel', 'uppercase', 'not-italic');
    pixelText.style.letterSpacing = "0.1em";

    // Animate character reveal
    pixelInterval = setInterval(() => {
        pixelText.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) return originalText[index];
                return pixelChars[Math.floor(Math.random() * 16)] || pixelChars[0];
            })
            .join("");

        if (iteration >= originalText.length) {
            clearInterval(pixelInterval);
            pixelText.innerText = originalText.toUpperCase();
        }
        iteration += 1 / 3;
    }, 30);  // Original 30ms interval
});

// Reset to original state on leave
pixelTrigger.addEventListener('mouseleave', () => {
    clearInterval(pixelInterval);
    pixelText.classList.add('font-serif', 'italic', 'font-light');
    pixelText.classList.remove('font-pixel', 'uppercase', 'not-italic');
    pixelText.style.letterSpacing = "normal";
    pixelText.innerText = originalText;
});
