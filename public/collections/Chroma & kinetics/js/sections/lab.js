/**
 * CHROMA & KINETICS - Lab Interface Logic
 * Sidebar controls, state management, UI rendering
 */

/**
 * Application state
 */
const state = {
    baseSystem: 'monochromatic',
    mixSystem: 'monochromatic',
    variantIndex: 0,
    isHybrid: false,
    isMotion: false,
    motionPattern: 'fluid'
};

// DOM element references
let els = {};

/**
 * Cache DOM element references
 */
function cacheElements() {
    els = {
        bg: document.getElementById('preview-canvas'),
        heroTitle: document.getElementById('hero-title'),
        heroBadge: document.getElementById('hero-badge'),
        typos: document.querySelectorAll('.typo-h1, .typo-h2, .typo-h3, .typo-body'),
        buttons: document.querySelectorAll('.btn-primary, .btn-secondary'),
        input: document.querySelector('.input-field'),
        inputHighlight: document.querySelector('.input-highlight'),
        statusPanel: document.querySelector('.status-panel'),
        toggleBg: document.querySelector('.toggle-bg'),
        toggleDot: document.querySelector('.toggle-dot'),
        progressBar: document.querySelector('.progress-bar'),
        spectrumGrid: document.getElementById('spectrum-grid'),
        hierarchyPanel: document.getElementById('hierarchy-panel'),
        variantSlider: document.getElementById('variantSlider'),
        hybridControls: document.getElementById('hybrid-controls'),
        motionControls: document.getElementById('motion-controls'),
        baseLabel: document.getElementById('base-label'),
        narrative: document.getElementById('narrative-text'),
        variantTitle: document.getElementById('variant-title'),
        variantCounter: document.getElementById('variant-counter'),
        carouselWrapper: document.getElementById('carousel-wrapper'),
        carouselControls: document.getElementById('carousel-controls'),
        motionToggle: document.getElementById('motionToggle'),
        motionDot: document.getElementById('motion-dot')
    };
}

/**
 * Set up lab control event listeners
 */
function setupLabListeners() {
    // Hybrid Toggle
    const hybridToggle = document.getElementById('hybridToggle');
    hybridToggle?.addEventListener('change', (e) => {
        state.isHybrid = e.target.checked;
        els.hybridControls.classList.toggle('hidden', !state.isHybrid);

        if (state.isHybrid) {
            els.motionToggle.removeAttribute('disabled');
            els.motionToggle.classList.remove('btn-disabled');
            els.motionToggle.title = "Enable Dynamic Mode";
        } else {
            state.isMotion = false;
            els.motionToggle.setAttribute('disabled', 'true');
            els.motionToggle.classList.add('btn-disabled');
            els.motionToggle.classList.remove('bg-white', 'text-black');
            els.motionDot.classList.remove('bg-green-500');
            els.motionDot.classList.add('bg-gray-500');
            els.motionControls.classList.add('hidden');
        }
        updateUI();
    });

    // Motion Toggle
    els.motionToggle?.addEventListener('click', (e) => {
        if (!state.isHybrid) return;
        state.isMotion = !state.isMotion;
        const btn = e.currentTarget;

        if (state.isMotion) {
            btn.classList.add('bg-white', 'text-black');
            els.motionDot.classList.remove('bg-gray-500');
            els.motionDot.classList.add('bg-green-500');
            els.motionControls.classList.remove('hidden');
        } else {
            btn.classList.remove('bg-white', 'text-black');
            els.motionDot.classList.remove('bg-green-500');
            els.motionDot.classList.add('bg-gray-500');
            els.motionControls.classList.add('hidden');
        }
        updateUI();
    });

    // Variant Slider
    els.variantSlider?.addEventListener('input', (e) => {
        state.variantIndex = parseInt(e.target.value);
        updateUI();
    });

    // Parallax Mouse Move
    document.addEventListener('mousemove', (e) => {
        if (!state.isMotion) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.card-solid, .card-glass, .card-outline', {
            rotationY: x, rotationX: -y, transformPerspective: 1000, ease: "power1.out", duration: 0.5
        });
        gsap.to('.shape-blob', { x: -x * 2, y: -y * 2, duration: 1 });
    });
}

/**
 * Set base color system
 */
function setBase(sys) {
    state.baseSystem = sys;
    document.querySelectorAll('.base-btn').forEach(b => b.classList.remove('active-sys', 'border-blue-500'));
    event.currentTarget.classList.add('active-sys', 'border-blue-500');
    updateUI();
}

/**
 * Set mix/accent color system
 */
function setMix(sys) {
    state.mixSystem = sys;
    document.querySelectorAll('.mix-btn').forEach(b => b.classList.remove('bg-emerald-500', 'text-black'));
    event.currentTarget.classList.add('bg-emerald-500', 'text-black');
    updateUI();
}

/**
 * Set motion pattern
 */
function setMotionPattern(pat) {
    state.motionPattern = pat;
    document.querySelectorAll('.motion-btn').forEach(b => {
        b.classList.remove('border-purple-500', 'bg-purple-500/20', 'text-white');
        b.classList.add('text-gray-400', 'border-white/10');
    });
    event.currentTarget.classList.remove('text-gray-400', 'border-white/10');
    event.currentTarget.classList.add('border-purple-500', 'bg-purple-500/20', 'text-white');

    if (state.isMotion) {
        updateAnimations(paletteDB[state.baseSystem][state.variantIndex].colors);
    }
}

/**
 * Main UI update function
 */
function updateUI() {
    const { hexToRgba, adjustBrightness } = window.ChromaUtils;
    const baseTheme = paletteDB[state.baseSystem][state.variantIndex];
    let finalColors = { ...baseTheme.colors };
    const phil = philosophyDB[state.baseSystem];
    let narrative = `<strong class="text-blue-400">${phil.logic}</strong><br><span class="text-gray-400">${phil.usage}</span>`;

    if (state.isMotion) {
        narrative += `<br><br><strong class="text-green-400">Dynamic Mode (${state.motionPattern.toUpperCase()})</strong><br><span class="text-gray-400">${phil.motionLogic}</span>`;
    }

    if (state.isHybrid) {
        const mixTheme = paletteDB[state.mixSystem][state.variantIndex % paletteDB[state.mixSystem].length];
        const mixPhil = philosophyDB[state.mixSystem];
        finalColors.primary = mixTheme.colors.primary;
        finalColors.accent = mixTheme.colors.accent;
        narrative = `<strong class="text-emerald-400">Hybrid Architecture</strong><br><span class="text-gray-400">Structure: <em>${phil.name}</em> → Accent: <em>${mixPhil.name}</em></span><br><br><span class="text-[10px] text-gray-500">Combining ${phil.logic.toLowerCase()} with ${mixPhil.logic.toLowerCase()} for unique visual identity.</span>`;
        els.baseLabel.innerText = "Base Locked";
        els.baseLabel.className = "text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30";
    } else {
        els.baseLabel.innerText = "Structure";
        els.baseLabel.className = "text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30";
    }

    els.variantTitle.innerText = baseTheme.name + (state.isHybrid ? " (Hybrid)" : "");
    els.variantCounter.innerText = `0${state.variantIndex + 1}/10`;
    els.narrative.innerHTML = narrative;

    renderSpectrum(finalColors);
    renderHierarchy(finalColors, state.baseSystem, state.isHybrid ? state.mixSystem : state.baseSystem);
    applyColorsToCanvas(finalColors);
    renderCarousel(finalColors);
    updateAnimations(finalColors);
}

/**
 * Render the color spectrum grid
 */
function renderSpectrum(c) {
    const { adjustBrightness } = window.ChromaUtils;
    if (!els.spectrumGrid) return;

    els.spectrumGrid.innerHTML = '';
    const swatches = [
        c.bg, c.surface, c.text, c.primary, c.accent,
        adjustBrightness(c.primary, 20), adjustBrightness(c.primary, -20),
        adjustBrightness(c.bg, 10), adjustBrightness(c.bg, 20), "#ffffff"
    ];

    swatches.forEach(hex => {
        const div = document.createElement('div');
        div.className = "w-full h-8 rounded swatch cursor-pointer border border-white/10";
        div.style.backgroundColor = hex;
        els.spectrumGrid.appendChild(div);
    });
}

/**
 * Render the palette hierarchy panel with palette-specific or hybrid details
 */
function renderHierarchy(c, baseSys, activeSys) {
    if (!els.hierarchyPanel) return;

    // Detect hybrid mode
    const isHybridMode = state.isHybrid && state.baseSystem !== state.mixSystem;

    if (isHybridMode) {
        // HYBRID MODE RENDERING
        const hybridKey = `${state.baseSystem}-${state.mixSystem}`;
        const hybrid = window.hybridPalettes[hybridKey];
        const basePhil = philosophyDB[state.baseSystem];
        const accentPhil = philosophyDB[state.mixSystem];

        if (!hybrid) {
            els.hierarchyPanel.innerHTML = `<p class="text-gray-500 text-[10px]">Hybrid data not found for ${hybridKey}</p>`;
            return;
        }

        // Build hybrid color roles
        const colorRoles = [
            { name: "Background", color: c.bg, desc: hybrid.colorStrategy.bg, source: "base" },
            { name: "Surface", color: c.surface, desc: hybrid.colorStrategy.surface, source: "base" },
            { name: "Text", color: c.text, desc: hybrid.colorStrategy.text, source: "base" },
            { name: "Primary", color: c.primary, desc: hybrid.colorStrategy.primary, source: "accent" },
            { name: "Accent", color: c.accent, desc: hybrid.colorStrategy.accent, source: "accent" }
        ];

        let html = `
            <!-- Fusion Identity -->
            <div class="mb-4 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400">${hybrid.name}</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">${hybrid.category}</span>
                </div>
                <p class="text-[12px] text-white font-medium mb-2 italic">"${hybrid.mood}"</p>
                <p class="text-[10px] text-gray-400 leading-relaxed">${hybrid.personality}</p>
            </div>
            
            <!-- Hybrid Components -->
            <div class="mb-4 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <div class="flex gap-2">
                    <div class="flex-1 p-2 rounded bg-blue-500/10 border border-blue-500/20">
                        <span class="text-[8px] font-bold uppercase text-blue-400 block">Base Structure</span>
                        <span class="text-[10px] text-white">${basePhil.name}</span>
                    </div>
                    <div class="flex-1 p-2 rounded bg-purple-500/10 border border-purple-500/20">
                        <span class="text-[8px] font-bold uppercase text-purple-400 block">Accent Source</span>
                        <span class="text-[10px] text-white">${accentPhil.name}</span>
                    </div>
                </div>
            </div>
            
            <!-- Emotion Tags -->
            <div class="mb-4 flex flex-wrap gap-1">
                ${hybrid.emotion.split(', ').map(e => `<span class="text-[9px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">${e}</span>`).join('')}
            </div>
            
            <!-- Color Roles with Source Indicators -->
            <div class="space-y-2">
        `;

        colorRoles.forEach(role => {
            const sourceColor = role.source === 'base' ? 'blue' : 'purple';
            html += `
                <div class="analysis-card p-3 rounded border-l-[3px] hover:bg-white/[0.04] transition-colors" style="border-left-color: ${role.color}">
                    <div class="flex justify-between items-center mb-1">
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold uppercase tracking-wide opacity-80">${role.name}</span>
                            <span class="text-[8px] px-1.5 py-0.5 rounded bg-${sourceColor}-500/20 text-${sourceColor}-400">${role.source}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-[9px] font-mono text-gray-500">${role.color}</span>
                            <div class="w-4 h-4 rounded shadow-sm border border-white/20" style="background: ${role.color}"></div>
                        </div>
                    </div>
                    <p class="text-[10px] opacity-60 leading-relaxed">${role.desc}</p>
                </div>
            `;
        });

        html += `</div>`;

        // Best For
        if (hybrid.bestFor) {
            html += `
                <div class="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Best For</span>
                    <p class="text-[10px] text-gray-400 leading-relaxed">${hybrid.bestFor}</p>
                </div>
            `;
        }

        // Design Notes
        if (hybrid.designNotes) {
            html += `
                <div class="mt-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                    <div class="flex items-center gap-2 mb-1">
                        <svg class="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Design Notes</span>
                    </div>
                    <p class="text-[10px] text-cyan-200/70 leading-relaxed">${hybrid.designNotes}</p>
                </div>
            `;
        }

        els.hierarchyPanel.innerHTML = html;

    } else {
        // STANDARD MODE RENDERING (existing logic)
        const phil = philosophyDB[activeSys];
        const currentPalette = paletteDB[activeSys][state.variantIndex];
        const hasColorRoles = currentPalette && currentPalette.colorRoles;

        const colorRoles = [
            { name: "Background", key: "bg", color: c.bg, desc: hasColorRoles ? currentPalette.colorRoles.bg : phil.background },
            { name: "Surface", key: "surface", color: c.surface, desc: hasColorRoles ? currentPalette.colorRoles.surface : phil.surface },
            { name: "Text", key: "text", color: c.text, desc: hasColorRoles ? currentPalette.colorRoles.text : phil.text },
            { name: "Primary", key: "primary", color: c.primary, desc: hasColorRoles ? currentPalette.colorRoles.primary : phil.primary },
            { name: "Accent", key: "accent", color: c.accent, desc: hasColorRoles ? currentPalette.colorRoles.accent : phil.accent }
        ];

        let html = `
            <!-- Palette Mood & Personality -->
            <div class="mb-4 p-3 rounded-lg bg-gradient-to-r from-white/5 to-transparent border border-white/10">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-blue-400">${currentPalette.name}</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400">${phil.name}</span>
                </div>
                <p class="text-[12px] text-white font-medium mb-2 italic">"${currentPalette.mood}"</p>
                <p class="text-[10px] text-gray-400 leading-relaxed">${currentPalette.personality}</p>
            </div>
            
            <!-- Emotion Tags -->
            <div class="mb-4 flex flex-wrap gap-1">
                ${currentPalette.emotion.split(', ').map(e => `<span class="text-[9px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">${e}</span>`).join('')}
            </div>
            
            <!-- Color Roles -->
            <div class="space-y-2">
        `;

        colorRoles.forEach(role => {
            html += `
                <div class="analysis-card p-3 rounded border-l-[3px] hover:bg-white/[0.04] transition-colors" style="border-left-color: ${role.color}">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-bold uppercase tracking-wide opacity-80">${role.name}</span>
                        <div class="flex items-center gap-2">
                            <span class="text-[9px] font-mono text-gray-500">${role.color}</span>
                            <div class="w-4 h-4 rounded shadow-sm border border-white/20" style="background: ${role.color}"></div>
                        </div>
                    </div>
                    <p class="text-[10px] opacity-60 leading-relaxed">${role.desc}</p>
                </div>
            `;
        });

        html += `</div>`;

        if (currentPalette.bestFor) {
            html += `
                <div class="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Best For</span>
                    <p class="text-[10px] text-gray-400 leading-relaxed">${currentPalette.bestFor}</p>
                </div>
            `;
        }

        if (phil.accessibility) {
            html += `
                <div class="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <div class="flex items-center gap-2 mb-1">
                        <svg class="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400">Accessibility</span>
                    </div>
                    <p class="text-[10px] text-amber-200/70 leading-relaxed">${phil.accessibility}</p>
                </div>
            `;
        }

        els.hierarchyPanel.innerHTML = html;
    }
}

/**
 * Set motion era and apply defaults
 */
function setMotionEra(era) {
    if (window.MotionSystem) {
        window.MotionSystem.setEra(era);
    }

    // Update UI
    document.querySelectorAll('.era-btn').forEach(btn => {
        if (btn.dataset.era === era) {
            btn.classList.add('active-era-btn', 'border-purple-500', 'bg-purple-500/20', 'text-white');
            btn.classList.remove('border-white/10', 'text-gray-400');
        } else {
            btn.classList.remove('active-era-btn', 'border-purple-500', 'bg-purple-500/20', 'text-white');
            btn.classList.add('border-white/10', 'text-gray-400');
        }
    });

    console.log(`[Lab] Motion era set to: ${era}`);
}

/**
 * Toggle auto-recommend for motion era
 */
function toggleAutoRecommend() {
    if (window.MotionSystem) {
        const newState = !window.MotionSystem.config.autoRecommend;
        window.MotionSystem.toggleAutoRecommend(newState);

        const btn = document.getElementById('auto-recommend-btn');
        if (btn) {
            btn.textContent = newState ? '🔄 Auto: ON' : '🔄 Auto: OFF';
            btn.classList.toggle('bg-green-500/20', newState);
            btn.classList.toggle('text-green-400', newState);
            btn.classList.toggle('border-green-500/30', newState);
        }

        // If enabling, apply recommendation
        if (newState) {
            const recommended = window.MotionSystem.autoRecommendEra(state.baseSystem, state.isHybrid ? state.mixSystem : null);
            setMotionEra(recommended);
        }
    }
}

/**
 * Open element parameter panel
 */
function openElementPanel(elementType) {
    const panel = document.getElementById('element-params-panel');
    const title = document.getElementById('element-panel-title');
    const content = document.getElementById('element-panel-content');

    if (!panel || !title || !content) return;

    // Get presets for this element
    const presets = window[`${elementType}MotionPresets`];
    if (!presets) {
        content.innerHTML = '<p class="text-gray-500 text-[10px]">Presets not loaded</p>';
        panel.classList.remove('hidden');
        return;
    }

    // Element names map
    const names = {
        card: 'Card Motion',
        button: 'Button Motion',
        typography: 'Typography Motion',
        navigation: 'Navigation Motion',
        carousel: 'Carousel Motion',
        toggle: 'Toggle Motion'
    };

    title.textContent = names[elementType] || elementType;

    // Build effects dropdown
    const effects = presets.effects;
    let effectOptions = Object.entries(effects).map(([id, data]) =>
        `<option value="${id}">${data.name}</option>`
    ).join('');

    // Get current config
    const config = window.MotionSystem?.getElementConfig(elementType) || {};

    content.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="text-[9px] text-gray-500 block mb-1">Effect</label>
                <select id="effect-select" onchange="updateElementEffect('${elementType}', this.value)"
                    class="w-full p-2 rounded bg-[#0a0f1a] border border-white/20 text-[10px] text-white outline-none focus:border-cyan-500"
                    style="color-scheme: dark;">
                    ${effectOptions}
                </select>
            </div>
            <div>
                <label class="text-[9px] text-gray-500 block mb-1">Intensity: <span id="intensity-val">${config.intensity || 60}%</span></label>
                <input type="range" min="0" max="100" value="${config.intensity || 60}" 
                    oninput="updateElementParam('${elementType}', 'intensity', this.value)"
                    class="w-full h-1.5 bg-gray-800 rounded appearance-none cursor-pointer accent-cyan-500">
            </div>
            <div>
                <label class="text-[9px] text-gray-500 block mb-1">Duration: <span id="duration-val">${config.duration || 400}ms</span></label>
                <input type="range" min="100" max="1000" step="50" value="${config.duration || 400}"
                    oninput="updateElementParam('${elementType}', 'duration', this.value)"
                    class="w-full h-1.5 bg-gray-800 rounded appearance-none cursor-pointer accent-cyan-500">
            </div>
        </div>
    `;

    panel.classList.remove('hidden');

    // Highlight active element button
    document.querySelectorAll('.element-btn').forEach(btn => {
        btn.classList.remove('border-cyan-500', 'bg-cyan-500/10');
    });
    event.currentTarget?.classList.add('border-cyan-500', 'bg-cyan-500/10');
}

/**
 * Close element parameter panel
 */
function closeElementPanel() {
    const panel = document.getElementById('element-params-panel');
    if (panel) panel.classList.add('hidden');

    document.querySelectorAll('.element-btn').forEach(btn => {
        btn.classList.remove('border-cyan-500', 'bg-cyan-500/10');
    });
}

/**
 * Update element effect
 */
function updateElementEffect(elementType, effect) {
    if (window.MotionSystem) {
        window.MotionSystem.setElement(elementType, { effect });
    }
}

/**
 * Update element parameter
 */
function updateElementParam(elementType, param, value) {
    if (window.MotionSystem) {
        window.MotionSystem.setElement(elementType, { [param]: parseInt(value) });
    }

    // Update display value
    const valEl = document.getElementById(`${param}-val`);
    if (valEl) {
        valEl.textContent = param === 'intensity' ? `${value}%` : `${value}ms`;
    }
}

/**
 * Component effects definitions
 */
const componentEffects = {
    card: ['Shift', 'Tilt', 'Stretch', 'Glow', 'Lift', 'Pulse', 'Invert'],
    button: ['Press', 'Wobble', 'Ripple', 'Bounce', 'Scale', 'Magnetic', 'Glow'],
    typography: ['Static', 'Elastic', 'Layers', 'Glitch', 'Vapor', 'Aura', 'Fluid', 'Wave'],
    navigation: ['Underline', 'Morph', 'Glow', 'Slide', 'Fisheye', 'Dot'],
    carousel: ['Slide', 'Deck', 'Sphere', 'Elastic', 'Fade', 'Coverflow'],
    toggle: ['Slide', 'Bounce', 'Morph', 'Flip', 'Glow', 'Liquid']
};

let activeComponent = null;
let activeEffect = null;

/**
 * Show effects panel for a specific component
 */
function showComponentEffects(componentType) {
    const panel = document.getElementById('effects-panel');
    const titleEl = document.getElementById('effects-panel-title');
    const buttonsEl = document.getElementById('effects-buttons');
    const previewEl = document.getElementById('effect-preview');

    if (!panel || !titleEl || !buttonsEl) return;

    activeComponent = componentType;

    // Update title
    const titles = {
        card: 'Card Effects',
        button: 'Button Effects',
        typography: 'Typography Effects',
        navigation: 'Nav Effects',
        carousel: 'Carousel Effects',
        toggle: 'Toggle Effects'
    };
    titleEl.textContent = titles[componentType] || componentType;

    // Generate effect buttons
    const effects = componentEffects[componentType] || [];
    buttonsEl.innerHTML = effects.map(effect => `
        <button onclick="applyEffect('${componentType}', '${effect.toLowerCase()}')"
            class="effect-btn px-2 py-1 rounded text-[9px] font-bold border border-white/20 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
            data-effect="${effect.toLowerCase()}">${effect}</button>
    `).join('');

    // Show default preview placeholder
    previewEl.innerHTML = `<span class="text-gray-500 text-[10px]">Click an effect above</span>`;

    // Highlight active component button
    document.querySelectorAll('.component-btn').forEach(btn => {
        if (btn.dataset.component === componentType) {
            btn.classList.add('border-cyan-500', 'bg-cyan-500/10');
        } else {
            btn.classList.remove('border-cyan-500', 'bg-cyan-500/10');
        }
    });

    panel.classList.remove('hidden');
}

/**
 * Close effects panel
 */
function closeEffectsPanel() {
    const panel = document.getElementById('effects-panel');
    if (panel) panel.classList.add('hidden');

    document.querySelectorAll('.component-btn').forEach(btn => {
        btn.classList.remove('border-cyan-500', 'bg-cyan-500/10');
    });

    activeComponent = null;
    activeEffect = null;
}

/**
 * Apply effect and show live preview
 */
function applyEffect(componentType, effectName) {
    activeEffect = effectName;
    const previewEl = document.getElementById('effect-preview');
    if (!previewEl) return;

    // Highlight active effect button
    document.querySelectorAll('.effect-btn').forEach(btn => {
        if (btn.dataset.effect === effectName) {
            btn.classList.add('bg-cyan-500/30', 'border-cyan-500', 'text-white');
        } else {
            btn.classList.remove('bg-cyan-500/30', 'border-cyan-500', 'text-white');
        }
    });

    // Generate live preview based on component type
    previewEl.innerHTML = generatePreview(componentType, effectName);

    // Also apply to main canvas elements
    applyEffectToCanvas(componentType, effectName);
}

/**
 * Generate preview HTML for component + effect
 */
function generatePreview(componentType, effectName) {
    const previews = {
        card: `<div class="preview-card effect-${effectName} p-4 rounded-lg bg-white/10 border border-white/20 cursor-pointer w-full max-w-[200px]">
            <div class="text-[11px] font-bold text-white mb-1">Card Preview</div>
            <div class="text-[9px] text-gray-400">Hover to see ${effectName} effect</div>
        </div>`,
        button: `<button class="preview-button effect-${effectName} px-4 py-2 rounded-lg bg-cyan-500 text-white text-[11px] font-bold cursor-pointer">
            Click Me
        </button>`,
        typography: `<div class="preview-type effect-${effectName} text-2xl font-bold text-white cursor-pointer">
            Typography
        </div>`,
        navigation: `<div class="preview-nav flex gap-4">
            <span class="nav-item effect-${effectName} text-[11px] text-gray-400 cursor-pointer hover:text-white">Home</span>
            <span class="nav-item effect-${effectName} text-[11px] text-cyan-400 cursor-pointer border-b border-cyan-400">Active</span>
            <span class="nav-item effect-${effectName} text-[11px] text-gray-400 cursor-pointer hover:text-white">About</span>
        </div>`,
        carousel: `<div class="preview-carousel flex items-center gap-2 effect-${effectName}">
            <div class="w-8 h-12 bg-white/10 rounded opacity-50 scale-90"></div>
            <div class="w-10 h-14 bg-cyan-500/30 rounded border border-cyan-500/50"></div>
            <div class="w-8 h-12 bg-white/10 rounded opacity-50 scale-90"></div>
        </div>`,
        toggle: `<div class="preview-toggle effect-${effectName} w-12 h-6 bg-white/20 rounded-full relative cursor-pointer" onclick="this.classList.toggle('active')">
            <div class="toggle-dot w-5 h-5 bg-cyan-400 rounded-full absolute top-0.5 left-0.5 transition-all"></div>
        </div>`
    };

    return previews[componentType] || '<span class="text-gray-500 text-[10px]">No preview</span>';
}

/**
 * Apply effect to main canvas elements
 */
function applyEffectToCanvas(componentType, effectName) {
    // Remove previous effect classes and add new one
    const selectors = {
        card: '.card-solid, .card-glass, .card-outline',
        button: '.btn-primary, .btn-secondary',
        typography: '.typo-h1, .typo-h2',
        toggle: '.toggle-bg'
    };

    const selector = selectors[componentType];
    if (!selector) return;

    document.querySelectorAll(selector).forEach(el => {
        // Remove all effect- classes
        el.className = el.className.replace(/\beffect-\w+/g, '');
        // Add new effect class
        el.classList.add(`effect-${effectName}`);
    });

    console.log(`[Lab] Applied ${effectName} to ${componentType}`);
}

// Export for global access
window.state = state;
window.els = els;
window.cacheElements = cacheElements;
window.setupLabListeners = setupLabListeners;
window.setBase = setBase;
window.setMix = setMix;
window.setMotionPattern = setMotionPattern;
window.updateUI = updateUI;
window.renderSpectrum = renderSpectrum;
window.renderHierarchy = renderHierarchy;
window.setMotionEra = setMotionEra;
window.toggleAutoRecommend = toggleAutoRecommend;
window.openElementPanel = openElementPanel;
window.closeElementPanel = closeElementPanel;
window.updateElementEffect = updateElementEffect;
window.updateElementParam = updateElementParam;
window.showComponentEffects = showComponentEffects;
window.closeEffectsPanel = closeEffectsPanel;
window.applyEffect = applyEffect;
