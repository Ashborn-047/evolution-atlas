import './styles/main.css';
import { shaders } from './data/shaders';
import { ShaderCanvas } from './core/ShaderCanvas';

const app = {
    currentView: 'landing',
    libInstances: new Map(),
    fullInstance: null,
    activeShader: null,

    init() {
        this.setupLanding();
        this.renderLibrary();
        this.setupEventListeners();
    },

    setupLanding() {
        const container = document.getElementById('landing-canvas-container');
        const landingShader = shaders.find(s => s.id === 'cosmic_nebula');

        // Wait for styles/flex to settle for correct resolution
        setTimeout(() => {
            if (this.landingInstance) this.landingInstance.dispose();
            this.landingInstance = new ShaderCanvas(container, landingShader, true);
            this.runHudAnimations();
        }, 100);
    },

    runHudAnimations() {
        const codeText = `01001000 01101001
01100111 01101000
PRECISION MEDIUMP
VEC3_COLOR = 0.0;
GL_FRAG_COLOR = VEC4
// SYSTEM_READY
VOID_MAIN() {
  INIT_CORE();
}`;

        const logLines = [
            "LOADING_ASSETS... [OK]",
            "BUFFER_SIZE: 1024",
            "RENDER_LOOP: TRUE",
            "FPS: LOCKED_60",
            "// COMPILING SHADER",
            "SUCCESS_STATE"
        ];

        const typewriter = (element, text, speed = 30) => {
            let i = 0;
            element.innerHTML = '';
            const timer = setInterval(() => {
                if (i < text.length) {
                    const char = text.charAt(i);
                    element.innerHTML += char === '\n' ? '<br>' : char;
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        };

        const binaryContainer = document.getElementById('hud-code-binary');
        const logContainer = document.getElementById('hud-compilation-log');
        const progressBar = document.getElementById('hud-progress-bar');

        if (binaryContainer) typewriter(binaryContainer, codeText);

        if (progressBar && logContainer) {
            logContainer.innerHTML = '';
            progressBar.style.width = '0%';

            setTimeout(() => {
                progressBar.style.width = '100%';

                logLines.forEach((line, index) => {
                    setTimeout(() => {
                        const div = document.createElement('div');
                        div.className = "opacity-0 transition-opacity duration-300";
                        div.innerText = line;
                        logContainer.appendChild(div);
                        setTimeout(() => div.classList.remove('opacity-0'), 50);
                    }, index * 400);
                });
            }, 500);
        }
    },

    renderLibrary() {
        const grid = document.getElementById('shader-grid');
        grid.innerHTML = '';
        this.libInstances = new Map(); // Store instances by element ID

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const shaderId = entry.target.dataset.shaderId;
                const container = entry.target.querySelector('.canvas-container');

                if (entry.isIntersecting) {
                    // Load shader
                    if (!this.libInstances.has(shaderId)) {
                        const shader = shaders.find(s => s.id === shaderId);
                        const instance = new ShaderCanvas(container, shader);
                        this.libInstances.set(shaderId, instance);
                        entry.target.classList.add('shader-loaded');
                    }
                } else {
                    // Unload shader to free WebGL context
                    if (this.libInstances.has(shaderId)) {
                        const instance = this.libInstances.get(shaderId);
                        instance.dispose();
                        this.libInstances.delete(shaderId);
                        entry.target.classList.remove('shader-loaded');
                    }
                }
            });
        }, {
            rootMargin: '100px', // Preload slightly before entering
            threshold: 0.1
        });

        shaders.forEach((shader) => {
            const card = document.createElement('div');
            card.className = "group relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-400 transition cursor-pointer h-64 flex flex-col shader-card opacity-0 transition-opacity duration-500";
            card.dataset.shaderId = shader.id;
            card.onclick = () => this.openShader(shader);

            const canvasContainer = document.createElement('div');
            canvasContainer.className = "flex-grow relative bg-black canvas-container";

            const cardFooter = document.createElement('div');
            cardFooter.className = "p-4 bg-gray-900 z-10 border-t border-gray-800 flex justify-between items-center group-hover:bg-gray-800 transition";
            cardFooter.innerHTML = `
                <h3 class="font-bold text-lg text-white">${shader.name}</h3>
                <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#0f0]"></div>
            `;

            card.appendChild(canvasContainer);
            card.appendChild(cardFooter);
            grid.appendChild(card);

            observer.observe(card);

            // Trigger fade-in
            setTimeout(() => card.classList.remove('opacity-0'), 50);
        });
    },

    openShader(shader) {
        this.activeShader = shader;
        this.switchView('shader-view');

        document.getElementById('active-shader-title').innerText = shader.name;
        document.getElementById('active-shader-desc').innerText = shader.desc;

        const container = document.getElementById('fullscreen-canvas-container');
        container.innerHTML = '';
        if (this.fullInstance) this.fullInstance.dispose();

        this.fullInstance = new ShaderCanvas(container, shader, true);
    },

    switchView(viewId) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

        const targetView = viewId.includes('view') ? viewId : `${viewId}-view`;
        document.getElementById(targetView).classList.add('active');

        if (viewId === 'library' || viewId === 'landing') {
            if (this.fullInstance) {
                this.fullInstance.dispose();
                this.fullInstance = null;
                this.activeShader = null;
            }
        }

        window.scrollTo(0, 0);

        // Update Nav Link Styles
        document.getElementById('nav-home').classList.toggle('text-cyan-400', viewId === 'landing');
        document.getElementById('nav-home').classList.toggle('font-bold', viewId === 'landing');
        document.getElementById('nav-library').classList.toggle('text-cyan-400', viewId === 'library');
        document.getElementById('nav-library').classList.toggle('font-bold', viewId === 'library');
    },

    setupEventListeners() {
        document.getElementById('nav-logo').onclick = () => this.switchView('landing');
        document.getElementById('nav-home').onclick = () => this.switchView('landing');
        document.getElementById('nav-library').onclick = () => this.switchView('library');
        document.getElementById('cta-library').onclick = () => this.switchView('library');
        document.getElementById('btn-return').onclick = () => this.switchView('library');

        // Standalone support
        window.addEventListener('activate-shader', (e) => {
            const shader = shaders.find(s => s.name.toLowerCase() === e.detail.name.toLowerCase());
            if (shader) {
                this.openShader(shader);
            }
        });

        // View Source Logic
        const sourceModal = document.getElementById('source-modal');
        const sourceContent = document.getElementById('source-content');

        document.getElementById('btn-view-source').onclick = () => {
            if (this.activeShader) {
                sourceContent.innerText = this.activeShader.code;
                sourceModal.classList.add('active');
            }
        };

        document.getElementById('btn-close-source').onclick = () => {
            sourceModal.classList.remove('active');
        };

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') sourceModal.classList.remove('active');
        });

        // Global mouse for landing
        window.addEventListener('mousemove', (e) => {
            if (this.landingInstance) this.landingInstance.onMouseMove(e);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    app.init();
});
