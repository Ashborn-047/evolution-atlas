/**
 * ============================================
 * MODAL DEMOS - Interactive Component Demos
 * ============================================
 * 
 * Makes the component demos inside modals interactive
 * with era-appropriate animations
 */

/**
 * Initialize interactive demos when modal opens
 * Called after modal content is populated
 */
function initModalDemos(eraStyle) {
    initNavDemo(eraStyle);
    initButtonDemo(eraStyle);
    initBadgeDemo(eraStyle);
    initCarouselDemo(eraStyle);

    // Add elastic surface to hybrid modal
    if (eraStyle === 'modal-hybrid') {
        initHybridElasticSurface();
    }
}

/**
 * Navigation Demo - Click to switch active state
 */
function initNavDemo(eraStyle) {
    const navDemo = document.getElementById('demoNav');
    if (!navDemo) return;

    const navItems = navDemo.querySelectorAll('span, a');

    navItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active from all
            navItems.forEach(nav => {
                nav.classList.remove('nav-active');
                // Reset styles based on era
                resetNavStyle(nav, eraStyle);
            });

            // Set active
            item.classList.add('nav-active');
            activateNavStyle(item, eraStyle);
        });
    });
}

function resetNavStyle(el, era) {
    switch (era) {
        case 'modal-retro':
            el.style.background = 'transparent';
            el.style.boxShadow = 'none';
            break;
        case 'modal-glossy':
            el.style.background = 'linear-gradient(to bottom, #666, #333)';
            break;
        case 'modal-flat':
            el.style.borderBottom = 'none';
            el.style.color = '#bdc3c7';
            break;
        case 'modal-material':
            el.style.background = 'transparent';
            el.style.color = '#6750A4';
            break;
        case 'modal-glass':
            el.style.background = 'transparent';
            el.style.border = 'none';
            break;
        case 'modal-hybrid':
            el.style.background = 'transparent';
            el.style.border = 'none';
            break;
    }
}

function activateNavStyle(el, era) {
    switch (era) {
        case 'modal-retro':
            gsap.fromTo(el,
                { background: 'transparent' },
                { background: 'rgba(0,255,0,0.2)', duration: 0.2 }
            );
            el.style.boxShadow = '0 0 10px #0f0';
            break;
        case 'modal-glossy':
            gsap.to(el, {
                background: 'linear-gradient(to bottom, #8a8, #565)',
                duration: 0.3
            });
            break;
        case 'modal-flat':
            gsap.to(el, {
                borderBottom: '2px solid #3498db',
                color: '#3498db',
                duration: 0.2
            });
            break;
        case 'modal-material':
            gsap.fromTo(el,
                { scale: 0.95 },
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );
            el.style.background = '#6750A4';
            el.style.color = 'white';
            break;
        case 'modal-glass':
            gsap.to(el, {
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                duration: 0.3
            });
            break;
        case 'modal-hybrid':
            gsap.fromTo(el,
                { scale: 0.9, opacity: 0.7 },
                {
                    scale: 1,
                    opacity: 1,
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))',
                    border: '1px solid rgba(139,92,246,0.4)',
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.5)'
                }
            );
            break;
    }
}

/**
 * Button Demo - Click feedback
 */
function initButtonDemo(eraStyle) {
    const btnDemo = document.getElementById('demoButton');
    if (!btnDemo) return;

    const btn = btnDemo.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', () => {
        switch (eraStyle) {
            case 'modal-retro':
                gsap.to(btn, {
                    boxShadow: 'inset 0 0 20px rgba(0,255,0,0.8)',
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                break;
            case 'modal-hybrid':
                gsap.to(btn, {
                    scaleX: 1.1,
                    scaleY: 0.9,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out'
                });
                break;
            default:
                gsap.to(btn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
        }
    });
}

/**
 * Badge Demo - Pulse on click
 */
function initBadgeDemo(eraStyle) {
    const badgeDemo = document.getElementById('demoBadge');
    if (!badgeDemo) return;

    const badge = badgeDemo.querySelector('span');
    if (!badge) return;

    badge.style.cursor = 'pointer';
    badge.addEventListener('click', () => {
        gsap.fromTo(badge,
            { scale: 1 },
            {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            }
        );
    });
}

/**
 * Carousel Demo - Click arrows
 */
function initCarouselDemo(eraStyle) {
    const carouselDemo = document.getElementById('demoCarousel');
    if (!carouselDemo) return;

    const arrows = carouselDemo.querySelectorAll('span');
    const dots = [];

    arrows.forEach(arrow => {
        if (arrow.textContent.includes('◀') || arrow.textContent.includes('←') || arrow.textContent.includes('PREV')) {
            arrow.style.cursor = 'pointer';
            arrow.addEventListener('click', () => {
                gsap.to(arrow, { x: -5, duration: 0.1, yoyo: true, repeat: 1 });
            });
        }
        if (arrow.textContent.includes('▶') || arrow.textContent.includes('→') || arrow.textContent.includes('NEXT')) {
            arrow.style.cursor = 'pointer';
            arrow.addEventListener('click', () => {
                gsap.to(arrow, { x: 5, duration: 0.1, yoyo: true, repeat: 1 });
            });
        }
    });
}

/**
 * Hybrid Elastic Surface Effect
 * Makes the modal content respond to mouse movement
 */
function initHybridElasticSurface() {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent || !modalContent.classList.contains('modal-hybrid')) return;

    modalContent.addEventListener('mousemove', (e) => {
        const rect = modalContent.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        gsap.to(modalContent, {
            rotateY: x * 5,
            rotateX: -y * 5,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    modalContent.addEventListener('mouseleave', () => {
        gsap.to(modalContent, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}

// Export for modal.js
window.initModalDemos = initModalDemos;
