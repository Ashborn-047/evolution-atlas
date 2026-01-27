/* ==========================================================================
   ARCHIVE.JS
   Archive Grid Interactions (8 Typography Experiments)
   ========================================================================== */

/* ==================== EXP_01: ELASTIC ==================== */
const elasticContainer = document.querySelector('#elastic-text');
const elasticChars = splitText(elasticContainer.querySelector('h2'));

elasticContainer.addEventListener('mousemove', (e) => {
    const bounds = elasticContainer.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    elasticChars.forEach(char => {
        const charBounds = char.getBoundingClientRect();
        const charCenterX = charBounds.left + charBounds.width / 2 - bounds.left;
        const charCenterY = charBounds.top + charBounds.height / 2 - bounds.top;
        const dist = Math.abs(mouseX - charCenterX);

        if (dist < 150) {
            const strength = (150 - dist) / 150;
            gsap.to(char, {
                y: (mouseY - charCenterY) * strength * 0.3,
                scaleX: 1 - strength * 0.2,
                scaleY: 1 + strength * 0.3,
                color: '#ccff00',
                duration: 0.3
            });
        } else {
            gsap.to(char, {
                y: 0,
                scaleX: 1,
                scaleY: 1,
                color: 'white',
                duration: 0.5
            });
        }
    });
});

elasticContainer.addEventListener('mouseleave', () => {
    gsap.to(elasticChars, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        color: 'white',
        duration: 0.5
    });
});

/* ==================== EXP_02: LAYERS (Chromatic Aberration) ==================== */
const dimensionContainer = document.querySelector('#dimension-text');
const layers = dimensionContainer.querySelectorAll('.layer-clone');

dimensionContainer.addEventListener('mousemove', (e) => {
    const bounds = dimensionContainer.getBoundingClientRect();
    const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (e.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(layers[0], { x: relX * 20, y: relY * 20, duration: 0.2 });
    gsap.to(layers[1], { x: relX * 40, y: relY * 40, duration: 0.3 });
});

dimensionContainer.addEventListener('mouseleave', () => {
    gsap.to(layers, { x: 0, y: 0, duration: 0.5 });
});

/* ==================== EXP_03: ECLIPSE (3D Rotation) ==================== */
const eclipseContainer = document.querySelector('#eclipse-text');
const eclipseChars = splitTextWithShadow(eclipseContainer.querySelector('h2'));

eclipseContainer.addEventListener('mousemove', (e) => {
    const bounds = eclipseContainer.getBoundingClientRect();

    eclipseChars.forEach(char => {
        const charBounds = char.getBoundingClientRect();
        const distX = e.clientX - (charBounds.left + charBounds.width / 2);

        gsap.to(char, {
            rotationY: gsap.utils.clamp(-45, 45, distX * 0.2),
            z: 30,
            duration: 0.5
        });
        gsap.to(char.querySelector('.eclipse-shadow'), {
            x: -distX * 0.2,
            opacity: 0.8 - Math.abs(distX) / 200,
            duration: 0.5
        });
    });
});

eclipseContainer.addEventListener('mouseleave', () => {
    eclipseChars.forEach(char => {
        gsap.to(char, { rotationY: 0, z: 0, duration: 0.5 });
        gsap.to(char.querySelector('.eclipse-shadow'), {
            x: 0,
            opacity: 0,
            duration: 0.5
        });
    });
});

// Custom cursor for eclipse
eclipseContainer.addEventListener('mouseenter', () => {
    gsap.to(cursorOutline, {
        scale: 2,
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        borderColor: 'transparent'
    });
});

eclipseContainer.addEventListener('mouseleave', () => {
    gsap.to(cursorOutline, {
        scale: 1,
        backgroundColor: 'transparent',
        mixBlendMode: 'difference',
        borderColor: 'white'
    });
});

/* ==================== EXP_04: GLITCH ==================== */
const glitchZone = document.querySelector('#glitch-text');
const glitchLayers = glitchZone.querySelectorAll('.glitch-layer');

glitchZone.addEventListener('mousemove', () => {
    glitchLayers.forEach(layer => {
        gsap.to(layer, {
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 10,
            skewX: (Math.random() - 0.5) * 20,
            opacity: Math.random() > 0.1 ? 1 : 0,
            duration: 0.05,
            overwrite: true
        });
    });
});

glitchZone.addEventListener('mouseleave', () => {
    glitchLayers.forEach(layer => {
        gsap.to(layer, {
            x: 0,
            y: 0,
            skewX: 0,
            opacity: 0,
            duration: 0.2
        });
    });
});

/* ==================== EXP_05: VAPOR (Ghosting Trail) ==================== */
const vaporText = document.querySelector('#vapor-text h2');
const vaporContainer = document.querySelector('#vapor-text');

// Create vapor clones
if (vaporText && vaporContainer) {
    for (let i = 0; i < 3; i++) {
        let clone = vaporText.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = '50%';
        clone.style.left = '50%';
        clone.style.transform = 'translate(-50%, -50%)';
        clone.style.pointerEvents = 'none';
        clone.style.opacity = 0;
        clone.classList.add('vapor-clone');
        vaporContainer.appendChild(clone);
    }

    const vaporClones = document.querySelectorAll('.vapor-clone');

    vaporContainer.addEventListener('mousemove', () => {
        vaporClones.forEach((clone, i) => {
            gsap.to(clone, {
                y: -(i + 1) * 10 - Math.random() * 5,
                opacity: 0.3,
                filter: `blur(${4 + i * 2}px)`,
                duration: 0.3
            });
        });
    });

    vaporContainer.addEventListener('mouseleave', () => {
        gsap.to(vaporClones, {
            y: 0,
            opacity: 0,
            filter: 'blur(0px)',
            duration: 0.5
        });
    });
}

/* ==================== EXP_06: PIXELS (Character Scramble) ==================== */
// Same effect as hero "To Pixels" for consistency
const pixelKinetic = document.querySelector('#pixel-kinetic-text h2');
const pixelContainer = document.querySelector('#pixel-kinetic-text');
const pixelOriginal = "PIXELS";
const archivePixelChars = "█▓▒░01<!>_";  // Same as hero To Pixels
let pixInt;

pixelContainer.addEventListener('mouseenter', () => {
    let iteration = 0;
    clearInterval(pixInt);

    // Animate character reveal - same logic as hero To Pixels
    pixInt = setInterval(() => {
        pixelKinetic.innerText = pixelOriginal
            .split('')
            .map((char, i) => {
                if (i < iteration) return pixelOriginal[i];
                return archivePixelChars[Math.floor(Math.random() * 16)] || archivePixelChars[0];
            })
            .join('');

        if (iteration >= pixelOriginal.length) {
            clearInterval(pixInt);
            pixelKinetic.innerText = pixelOriginal;
        }
        iteration += 1 / 3;  // Same speed as hero
    }, 30);  // Same interval as hero (30ms)
});

pixelContainer.addEventListener('mouseleave', () => {
    clearInterval(pixInt);
    pixelKinetic.innerText = pixelOriginal;
});

/* ==================== GENERAL ARCHIVE ITEM CURSOR ==================== */
document.querySelectorAll('.archive-item').forEach(el => {
    // Eclipse handles its own cursor
    if (el.id !== 'eclipse-text') {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                borderColor: 'var(--accent-color)',
                mixBlendMode: 'normal'
            });
            gsap.to(cursorDot, { background: 'var(--accent-color)' });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                borderColor: 'white',
                mixBlendMode: 'difference'
            });
            gsap.to(cursorDot, { background: 'white' });
        });
    }
});

/* ==================== EXP_09: FLUID (Wobbly Distortion) ==================== */
const fluidText = document.querySelector('#fluid-text h2');
const fluidContainer = document.querySelector('#fluid-text');

// Get the turbulence and displacement elements for the fluid effect
const fluidTurbulence = document.querySelector('#ink-distortion feTurbulence');
const fluidDisplacement = document.querySelector('#ink-distortion feDisplacementMap');

// State for fluid animation
let fluidState = { freq: 0, scale: 0 };
let fluidTween = null;

function updateFluidFilter() {
    if (fluidTurbulence) fluidTurbulence.setAttribute('baseFrequency', fluidState.freq);
    if (fluidDisplacement) fluidDisplacement.setAttribute('scale', fluidState.scale);
}

if (fluidContainer && fluidText) {
    fluidContainer.addEventListener('mouseenter', () => {
        // Apply the filter
        fluidText.style.filter = 'url(#ink-distortion)';

        // Animate to wavy state
        gsap.to(fluidState, {
            scale: 25,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: updateFluidFilter
        });

        // Create continuous wave animation
        if (fluidTween) fluidTween.kill();
        fluidTween = gsap.fromTo(fluidState,
            { freq: 0.015 },
            {
                freq: 0.04,
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                onUpdate: updateFluidFilter
            }
        );
    });

    fluidContainer.addEventListener('mouseleave', () => {
        if (fluidTween) fluidTween.kill();

        gsap.to(fluidState, {
            freq: 0,
            scale: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: updateFluidFilter,
            onComplete: () => {
                fluidText.style.filter = 'none';
            }
        });
    });
}
