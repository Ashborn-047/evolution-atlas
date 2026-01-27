/**
 * CHROMA & KINETICS - Canvas Rendering Logic
 * Preview canvas color application and shape generation
 */

/**
 * Apply color scheme to the preview canvas
 * @param {Object} c - Color scheme object
 */
function applyColorsToCanvas(c) {
    const { hexToRgba } = window.ChromaUtils;
    if (!els.bg) return;

    // Background and text
    els.bg.style.backgroundColor = c.bg;
    els.bg.style.color = c.text;
    els.heroTitle.style.color = c.text;

    // Hero badge
    els.heroBadge.style.borderColor = c.primary;
    els.heroBadge.style.color = c.primary;
    els.heroBadge.style.backgroundColor = hexToRgba(c.primary, 0.1);

    // Dynamic gradient mode
    if (state.isMotion) {
        els.heroTitle.style.backgroundImage = `linear-gradient(45deg, ${c.text}, ${c.primary}, ${c.accent}, ${c.text})`;
        els.heroTitle.classList.add('dynamic-gradient-text');
        els.heroTitle.style.color = 'transparent';
        els.buttons[0].style.backgroundImage = `linear-gradient(90deg, ${c.primary}, ${c.accent}, ${c.primary})`;
        els.buttons[0].classList.add('dynamic-gradient-bg');
    } else {
        els.heroTitle.classList.remove('dynamic-gradient-text');
        els.heroTitle.style.backgroundImage = 'none';
        els.heroTitle.style.color = c.text;
        els.buttons[0].style.backgroundImage = 'none';
        els.buttons[0].classList.remove('dynamic-gradient-bg');
        els.buttons[0].style.backgroundColor = c.primary;
    }

    // Typography
    els.typos.forEach(el => el.style.color = c.text);

    // Cards
    applyCardStyles('.card-solid', c.surface, hexToRgba(c.text, 0.1), c, hexToRgba);
    applyCardStyles('.card-glass', hexToRgba(c.surface, 0.4), hexToRgba(c.text, 0.1), c, hexToRgba);
    applyCardStyles('.card-outline', 'transparent', hexToRgba(c.text, 0.3), c, hexToRgba);

    // Input
    els.input.style.color = c.text;
    els.input.style.borderBottomColor = hexToRgba(c.text, 0.3);
    els.inputHighlight.style.backgroundColor = c.primary;

    // Buttons
    els.buttons[0].style.color = '#ffffff';
    if (['#fcd34d', '#facc15', '#fde047', '#bef264'].includes(c.primary)) {
        els.buttons[0].style.color = '#000000';
    }
    els.buttons[1].style.borderColor = hexToRgba(c.text, 0.3);
    els.buttons[1].style.color = c.text;

    // Status panel
    els.statusPanel.style.borderColor = hexToRgba(c.text, 0.1);
    els.statusPanel.style.backgroundColor = hexToRgba(c.surface, 0.5);

    // Toggle
    els.toggleBg.style.backgroundColor = c.surface;
    els.toggleDot.style.backgroundColor = c.accent;

    // Progress bar
    els.progressBar.style.backgroundColor = c.primary;

    // Tags
    const successTag = document.querySelector('.tag-success');
    if (successTag) {
        successTag.style.color = c.primary;
        successTag.style.borderColor = c.primary;
    }

    // Generate background shapes
    generateShapes(c);
}

/**
 * Apply styles to card elements
 */
function applyCardStyles(selector, bg, border, c, hexToRgba) {
    document.querySelectorAll(selector).forEach(card => {
        card.style.backgroundColor = bg;
        card.style.borderColor = border;
        const iconBg = card.querySelector('.icon-bg');
        if (iconBg) {
            iconBg.style.backgroundColor = hexToRgba(c.primary, 0.2);
            iconBg.style.color = c.primary;
        }
    });
}

/**
 * Generate background blob shapes
 * @param {Object} c - Color scheme
 */
function generateShapes(c) {
    const container = document.getElementById('shapes-container');
    if (!container) return;

    container.innerHTML = '';
    const safePalette = [c.primary, c.accent, c.surface];

    for (let i = 0; i < 8; i++) {
        const div = document.createElement('div');
        const size = Math.random() * 300 + 100;

        div.className = "absolute rounded-full blur-3xl opacity-20 shape-blob";
        div.style.width = size + 'px';
        div.style.height = size + 'px';
        div.style.left = Math.random() * 100 + '%';
        div.style.top = Math.random() * 100 + '%';
        div.style.backgroundColor = safePalette[i % 3];
        div.style.transform = `translate(-50%, -50%)`;

        container.appendChild(div);
    }
}

/**
 * Apply motion effects to preview elements based on MotionSystem config
 */
function applyMotionToPreview() {
    if (!window.MotionSystem) return;

    const config = window.MotionSystem.config;

    // Apply card motion
    const cards = document.querySelectorAll('.card-solid, .card-glass, .card-outline');
    const cardConfig = config.elements.card;
    cards.forEach(card => {
        card.classList.remove('motion-shift', 'motion-tilt', 'motion-stretch', 'motion-glow', 'motion-lift', 'motion-pulse');
        if (cardConfig.effect && cardConfig.effect !== 'none') {
            card.classList.add(`motion-${cardConfig.effect}`);
            card.style.setProperty('--motion-duration', `${cardConfig.duration || 400}ms`);
        }
    });

    // Apply button motion
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    const btnConfig = config.elements.button;
    buttons.forEach(btn => {
        btn.classList.remove('motion-press', 'motion-wobble', 'motion-ripple', 'motion-bounce', 'motion-scale', 'motion-glow');
        if (btnConfig.effect && btnConfig.effect !== 'none') {
            btn.classList.add(`motion-${btnConfig.effect}`);
        }
    });

    // Apply typography motion
    const typos = document.querySelectorAll('.typo-h1, .typo-h2');
    const typoConfig = config.elements.typography;
    typos.forEach(typo => {
        typo.classList.remove('motion-breathe', 'motion-wave', 'motion-fade', 'motion-glitch', 'motion-static');
        if (typoConfig.effect && typoConfig.effect !== 'static' && typoConfig.effect !== 'none') {
            typo.classList.add(`motion-${typoConfig.effect}`);
        }
    });

    console.log(`[Canvas] Motion applied: era=${config.era}`);
}

/**
 * Inject motion CSS styles
 */
function injectMotionStyles() {
    if (document.getElementById('motion-preview-styles')) return;

    const style = document.createElement('style');
    style.id = 'motion-preview-styles';
    style.textContent = `
        /* Card Motion Effects */
        .motion-shift { transition: transform var(--motion-duration, 400ms) linear; }
        .motion-shift:hover { transform: translate(4px, 4px); }
        
        .motion-tilt { transition: transform var(--motion-duration, 400ms) ease-out; transform-style: preserve-3d; }
        .motion-tilt:hover { transform: perspective(1000px) rotateX(5deg) rotateY(5deg); }
        
        .motion-stretch { transition: transform var(--motion-duration, 400ms) cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .motion-stretch:hover { transform: scaleX(1.02) scaleY(0.98); }
        
        .motion-glow { transition: box-shadow var(--motion-duration, 400ms) ease-out; }
        .motion-glow:hover { box-shadow: 0 0 30px rgba(100, 150, 255, 0.4); }
        
        .motion-lift { transition: transform var(--motion-duration, 400ms) ease-out, box-shadow var(--motion-duration, 400ms) ease-out; }
        .motion-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        
        .motion-pulse { animation: pulseAnim 2s ease-in-out infinite; }
        
        /* Button Motion Effects */
        .motion-press { transition: transform 0.1s linear; }
        .motion-press:active { transform: translateY(3px); }
        
        .motion-wobble:active { animation: wobbleAnim 0.5s ease-out; }
        
        .motion-bounce { transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .motion-bounce:active { transform: scale(0.9); }
        
        .motion-scale { transition: transform 0.2s ease-out; }
        .motion-scale:active { transform: scale(0.95); }
        
        /* Typography Motion Effects */
        .motion-breathe { animation: breatheAnim 3s ease-in-out infinite; }
        .motion-fade { animation: fadeAnim 4s ease-in-out infinite; }
        .motion-glitch { animation: glitchAnim 3s linear infinite; }
        
        @keyframes breatheAnim {
            0%, 100% { transform: scale(0.98); opacity: 0.9; }
            50% { transform: scale(1.02); opacity: 1; }
        }
        
        @keyframes fadeAnim {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        
        @keyframes pulseAnim {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        @keyframes wobbleAnim {
            0% { transform: scale(0.95); }
            25% { transform: scale(1.05) rotate(3deg); }
            50% { transform: scale(0.98) rotate(-2deg); }
            75% { transform: scale(1.02) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes glitchAnim {
            0%, 90%, 100% { transform: translateX(0); filter: none; }
            92% { transform: translateX(-2px); filter: hue-rotate(90deg); }
            94% { transform: translateX(2px); filter: hue-rotate(-90deg); }
            96% { transform: translateX(-1px); }
            98% { transform: translateX(1px); }
        }
    `;
    document.head.appendChild(style);
}

// Inject motion styles on load
injectMotionStyles();

// Listen for motion config changes
window.addEventListener('motionConfigChanged', applyMotionToPreview);

// Export for global access
window.applyColorsToCanvas = applyColorsToCanvas;
window.generateShapes = generateShapes;
window.applyMotionToPreview = applyMotionToPreview;

