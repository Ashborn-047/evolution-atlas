/**
 * ============================================
 * TIMELINE - Auto-scrolling History Cards
 * ============================================
 * 
 * Features:
 * - Dynamic card generation from data
 * - Infinite horizontal scroll animation
 * - Click to open era-specific modal with component demos
 * 
 * GSAP Methods Used:
 * - gsap.to() with repeat: -1 for infinite scroll
 */


/**
 * Timeline data for UI history eras
 * Each era has a unique modal style class and component demos
 */
const timelineData = [
    {
        year: '1995',
        title: 'The Hyperlink',
        desc: 'Raw HTML structure. Interaction was binary: clicked or unclicked.',
        styleClass: 'modal-retro',
        btnText: 'VISIT',
        components: {
            nav: `<a href="#" style="color: #0f0; text-decoration: underline;">HOME</a>
                  <a href="#" style="color: #0f0; text-decoration: underline;">ABOUT</a>`,
            button: `<button style="background: #0f0; color: #000; border: none; padding: 8px 16px; font-family: monospace; font-weight: bold;">SUBMIT</button>`,
            badge: `<span style="background: #0f0; color: #000; padding: 2px 8px; font-family: monospace; font-size: 12px;">NEW!</span>`,
            input: `<input type="text" style="background: #000; border: 2px solid #0f0; color: #0f0; padding: 6px; font-family: monospace;" placeholder="> enter text">`,
            carousel: `<span style="color: #0f0;">[&lt; PREV]</span> <span style="color: #fff;">Page 1 of 3</span> <span style="color: #0f0;">[NEXT &gt;]</span>`
        }
    },
    {
        year: '2005',
        title: 'Web 2.0 Gloss',
        desc: 'Plastic, gel buttons, and reflections. The interface mimicked physical objects.',
        styleClass: 'modal-glossy',
        btnText: 'SUBMIT',
        components: {
            nav: `<span style="background: linear-gradient(to bottom, #666, #333); padding: 6px 12px; border-radius: 8px; color: white; border: 1px solid #888;">Home</span>
                  <span style="background: linear-gradient(to bottom, #666, #333); padding: 6px 12px; border-radius: 8px; color: white; border: 1px solid #888;">Gallery</span>`,
            button: `<button style="background: linear-gradient(to bottom, #5a5, #383); padding: 10px 20px; border-radius: 10px; color: white; border: 2px solid #6b6; box-shadow: inset 0 2px 0 rgba(255,255,255,0.4);">Download</button>`,
            badge: `<span style="background: linear-gradient(to bottom, #f80, #c60); padding: 4px 10px; border-radius: 10px; color: white; font-size: 11px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);">★ Featured</span>`,
            input: `<input type="text" style="padding: 8px; border-radius: 8px; border: 2px solid #888; background: linear-gradient(to bottom, #eee, #ccc);" placeholder="Search...">`,
            carousel: `<span style="background: linear-gradient(to bottom, #555, #333); padding: 4px 10px; border-radius: 6px; color: white;">◀</span>
                       <span style="color: #aaa;">●</span><span style="color: #fff;">●</span><span style="color: #aaa;">●</span>
                       <span style="background: linear-gradient(to bottom, #555, #333); padding: 4px 10px; border-radius: 6px; color: white;">▶</span>`
        }
    },
    {
        year: '2010',
        title: 'Flat Design',
        desc: 'Minimalism rebellion. No shadows, no gradients. Pure digital utility.',
        styleClass: 'modal-flat',
        btnText: 'EXPLORE',
        components: {
            nav: `<span style="color: #3498db; padding: 8px; border-bottom: 2px solid #3498db;">Dashboard</span>
                  <span style="color: #bdc3c7; padding: 8px;">Settings</span>`,
            button: `<button style="background: #1abc9c; color: white; padding: 10px 24px; border: none; text-transform: uppercase; font-weight: 600;">Get Started</button>`,
            badge: `<span style="background: #9b59b6; color: white; padding: 4px 12px; font-size: 11px; text-transform: uppercase;">Premium</span>`,
            input: `<input type="text" style="border: none; border-bottom: 2px solid #3498db; padding: 8px; background: transparent; color: white;" placeholder="Enter email">`,
            carousel: `<span style="color: #fff;">◀</span>
                       <span style="width: 8px; height: 8px; background: #3498db; border-radius: 50%; display: inline-block;"></span>
                       <span style="width: 8px; height: 8px; background: #555; border-radius: 50%; display: inline-block;"></span>
                       <span style="color: #fff;">▶</span>`
        }
    },
    {
        year: '2014',
        title: 'Material Design',
        desc: 'Paper physics. Surfaces respond to touch with ripples and shadow depth.',
        styleClass: 'modal-material',
        btnText: 'TOUCH',
        components: {
            nav: `<span style="background: #6750A4; color: white; padding: 8px 16px; border-radius: 20px;">Home</span>
                  <span style="color: #6750A4; padding: 8px 16px;">Explore</span>`,
            button: `<button style="background: #6750A4; color: white; padding: 12px 24px; border: none; border-radius: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">Continue</button>`,
            badge: `<span style="background: #E8DEF8; color: #21005D; padding: 6px 16px; border-radius: 8px; font-size: 12px;">Updated</span>`,
            input: `<div style="position: relative; display: inline-block;">
                     <input type="text" style="border: 2px solid #6750A4; border-radius: 4px; padding: 12px; background: white; width: 120px;" placeholder=" ">
                   </div>`,
            carousel: `<span style="width: 24px; height: 24px; background: #6750A4; border-radius: 50%; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">←</span>
                       <span style="background: #6750A4; width: 20px; height: 4px; border-radius: 2px; display: inline-block;"></span>
                       <span style="background: #CAC4D0; width: 20px; height: 4px; border-radius: 2px; display: inline-block;"></span>
                       <span style="width: 24px; height: 24px; background: #6750A4; border-radius: 50%; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 12px;">→</span>`
        }
    },
    {
        year: '2020',
        title: 'Glassmorphism',
        desc: 'Frosted aesthetics. Layers of blur created hierarchy and modern depth.',
        styleClass: 'modal-glass',
        btnText: 'VIEW',
        components: {
            nav: `<span style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 12px; color: white; border: 1px solid rgba(255,255,255,0.2);">Home</span>
                  <span style="color: rgba(255,255,255,0.7); padding: 8px 16px;">About</span>`,
            button: `<button style="background: rgba(6,182,212,0.3); backdrop-filter: blur(10px); padding: 10px 20px; border-radius: 12px; color: white; border: 1px solid rgba(255,255,255,0.2);">Explore</button>`,
            badge: `<span style="background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: 20px; color: white; border: 1px solid rgba(255,255,255,0.15); font-size: 11px;">Online</span>`,
            input: `<input type="text" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 10px; color: white;" placeholder="Search...">`,
            carousel: `<span style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 8px; color: white; backdrop-filter: blur(5px);">◀</span>
                       <span style="width: 8px; height: 8px; background: rgba(6,182,212,0.8); border-radius: 50%; display: inline-block;"></span>
                       <span style="width: 8px; height: 8px; background: rgba(255,255,255,0.3); border-radius: 50%; display: inline-block;"></span>
                       <span style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 8px; color: white; backdrop-filter: blur(5px);">▶</span>`
        }
    },
    {
        year: '2025',
        title: 'Hybrid Fluid',
        desc: 'Living interfaces. Solid structure mixed with organic motion and light.',
        styleClass: 'modal-hybrid',
        btnText: 'INITIALIZE',
        components: {
            nav: `<span style="background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3)); padding: 8px 16px; border-radius: 16px; color: white; border: 1px solid rgba(139,92,246,0.4);">Dashboard</span>
                  <span style="color: rgba(255,255,255,0.6); padding: 8px 16px;">Settings</span>`,
            button: `<button style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 10px 24px; border-radius: 14px; color: white; border: none; box-shadow: 0 4px 15px rgba(139,92,246,0.4);">Start</button>`,
            badge: `<span style="background: linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.5)); padding: 4px 14px; border-radius: 20px; color: white; font-size: 11px; animation: pulse 2s infinite;">● Live</span>`,
            input: `<input type="text" style="background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.4); border-radius: 12px; padding: 10px; color: white;" placeholder="Type here...">`,
            carousel: `<span style="background: linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.4)); padding: 6px 12px; border-radius: 10px; color: white;">◀</span>
                       <span style="width: 20px; height: 4px; background: linear-gradient(90deg, #8b5cf6, #06b6d4); border-radius: 2px; display: inline-block;"></span>
                       <span style="width: 12px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; display: inline-block;"></span>
                       <span style="background: linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.4)); padding: 6px 12px; border-radius: 10px; color: white;">▶</span>`
        }
    }
];


/**
 * Generate timeline cards from data
 * Creates 3x duplicates for seamless infinite scroll
 */
function generateTimelineCards() {
    const timelineTrack = document.getElementById('timelineTrack');
    if (!timelineTrack) return;

    // Triplicate data for seamless loop
    const displayData = [...timelineData, ...timelineData, ...timelineData];

    displayData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'timeline-card';
        card.innerHTML = `
            <span class="year">${item.year}</span>
            <h4>${item.title}</h4>
        `;

        // Click opens modal with original data index
        card.addEventListener('click', () => {
            openModal(index % timelineData.length);
        });

        timelineTrack.appendChild(card);
    });
}


/**
 * Initialize infinite scroll animation
 * 
 * GSAP Animation:
 * - Moves track by 33.33% (one set length)
 * - Linear easing for constant speed
 * - repeat: -1 for infinite loop
 */
function initTimelineScroll() {
    gsap.to(".timeline-track", {
        x: "-33.33%",
        duration: 20,
        ease: "none",
        repeat: -1
    });
}


// Export data for modal module
window.timelineData = timelineData;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    generateTimelineCards();
    initTimelineScroll();
});
