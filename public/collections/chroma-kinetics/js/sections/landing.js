/**
 * CHROMA & KINETICS - Landing Page Logic
 * Hero animations, timeline scroll effects, navigation
 */

/**
 * Initialize landing page animations
 */
function initLanding() {
    const landingText = document.getElementById('landing-text');
    const landingControls = document.getElementById('landing-controls');

    // Entrance animations
    const tl = gsap.timeline();
    if (landingText) {
        tl.to(landingText, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
    }
    if (landingControls) {
        tl.to(landingControls, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }, "-=1");
    }

    // Timeline scroll animations
    initTimelineAnimations();
}

/**
 * Initialize timeline scroll-triggered animations
 */
function initTimelineAnimations() {
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const direction = index % 2 === 0 ? -50 : 50;
        const content = item.querySelector('.timeline-content');
        if (content) {
            gsap.fromTo(content,
                { opacity: 0, x: direction },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        scroller: "#landing-page",
                        start: "top 80%"
                    }
                }
            );
        }
    });
}

/**
 * Enter the laboratory (transition from landing to app)
 */
function enterLab() {
    const landingPage = document.getElementById('landing-page');
    const appInterface = document.getElementById('app-interface');

    const tl = gsap.timeline({
        onComplete: () => {
            landingPage.style.display = 'none';
            appInterface.style.pointerEvents = 'auto';
            appInterface.classList.remove('fixed', 'inset-0');
            appInterface.classList.add('relative', 'min-h-screen', 'w-full');
            document.body.classList.remove('overflow-hidden');
            document.body.style.overflow = 'auto';

            // Trigger UI update after transition
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
    });

    tl.to('#landing-page', { opacity: 0, duration: 0.5 })
        .to('#app-interface', { opacity: 1, duration: 1 }, "-=0.2");
}

/**
 * Exit the laboratory (return to landing page)
 */
function exitLab() {
    const landingPage = document.getElementById('landing-page');
    const appInterface = document.getElementById('app-interface');

    const tl = gsap.timeline({
        onComplete: () => {
            appInterface.classList.add('fixed', 'inset-0');
            appInterface.classList.remove('relative', 'min-h-screen', 'w-full');
        }
    });

    landingPage.style.display = 'flex';
    tl.to('#app-interface', { opacity: 0, duration: 0.5 })
        .to('#landing-page', { opacity: 1, duration: 0.5 })
        .set('#app-interface', { pointerEvents: 'none' });
}

// Export for global access
window.initLanding = initLanding;
window.enterLab = enterLab;
window.exitLab = exitLab;
