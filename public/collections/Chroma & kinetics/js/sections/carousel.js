/**
 * CHROMA & KINETICS - Carousel Logic
 * Static scroll and 3D dynamic carousel modes
 */

/**
 * Render the carousel based on current motion state
 * @param {Object} c - Color scheme object
 */
function renderCarousel(c) {
    if (!els.carouselWrapper) return;
    els.carouselWrapper.innerHTML = '';

    const items = [
        { t: "Summer", s: "Collection 01" },
        { t: "Winter", s: "Protocol 02" },
        { t: "Hybrid", s: "Theory 03" },
        { t: "Static", s: "Void 04" },
        { t: "Neon", s: "Pulse 05" },
        { t: "Cyber", s: "Edge 06" }
    ];

    if (state.isMotion) {
        render3DCarousel(items, c);
    } else {
        renderStaticCarousel(items, c);
    }
}

/**
 * Render 3D rotating carousel
 * @param {Array} items - Carousel items
 * @param {Object} c - Color scheme
 */
function render3DCarousel(items, c) {
    els.carouselControls.style.display = 'none';

    const scene = document.createElement('div');
    scene.className = 'carousel-scene w-[300px] h-[350px] relative cursor-grab active:cursor-grabbing';

    const pivot = document.createElement('div');
    pivot.className = 'carousel-pivot';

    const angle = 360 / items.length;
    const radius = 350;

    items.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'carousel-card-3d w-[280px] h-[350px] rounded-2xl p-6 flex flex-col justify-end overflow-hidden border border-white/10';
        el.style.backgroundColor = (i % 2 === 0) ? c.primary : c.surface;
        el.style.color = (i % 2 === 0) ? '#fff' : c.text;

        if (i % 2 === 0) {
            el.style.backgroundImage = `linear-gradient(135deg, ${c.primary}, ${c.accent})`;
        }

        el.innerHTML = `
            <div class="absolute inset-0 opacity-20 bg-black"></div>
            <h3 class="relative z-10 text-2xl font-bold heading-font">${item.t}<br>${item.s}</h3>
        `;

        gsap.set(el, {
            rotationY: i * angle,
            z: radius,
            transformOrigin: "50% 50% -" + radius + "px"
        });

        pivot.appendChild(el);
    });

    scene.appendChild(pivot);
    els.carouselWrapper.appendChild(scene);

    // Enable drag rotation
    Draggable.create(pivot, {
        type: "rotationY",
        inertia: true
    });

    // Auto-rotate
    gsap.to(pivot, {
        rotationY: "+=360",
        duration: 40,
        repeat: -1,
        ease: "none"
    });
}

/**
 * Render static scrolling carousel
 * @param {Array} items - Carousel items
 * @param {Object} c - Color scheme
 */
function renderStaticCarousel(items, c) {
    els.carouselControls.style.display = 'flex';

    const container = document.createElement('div');
    container.className = 'w-full overflow-x-auto snap-x flex gap-6 pb-6 mockup-scroll';
    container.id = 'carousel-scroll-container';

    items.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'min-w-[280px] h-[350px] rounded-2xl snap-center p-6 flex flex-col justify-end relative overflow-hidden transition-colors duration-500';
        el.style.backgroundColor = (i % 2 === 0) ? c.primary : c.surface;
        el.style.color = (i % 2 === 0) ? '#fff' : c.text;

        el.innerHTML = `
            <div class="absolute inset-0 opacity-20 bg-gradient-to-t from-black to-transparent"></div>
            <h3 class="relative z-10 text-2xl font-bold heading-font">${item.t}<br>${item.s}</h3>
        `;

        container.appendChild(el);
    });

    els.carouselWrapper.appendChild(container);
}

/**
 * Scroll the static carousel
 * @param {number} dir - Direction (-1 for left, 1 for right)
 */
function scrollCarousel(dir) {
    const container = document.getElementById('carousel-scroll-container');
    if (container) {
        container.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
}

// Export for global access
window.renderCarousel = renderCarousel;
window.scrollCarousel = scrollCarousel;
