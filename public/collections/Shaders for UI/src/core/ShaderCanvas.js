import * as THREE from 'three';
import { commonGLSL } from '../data/shaders';

export class ShaderCanvas {
    constructor(container, shaderData, isFullscreen = false) {
        this.container = container;
        this.shaderData = shaderData;
        this.isFullscreen = isFullscreen;

        this.boundOnResize = this.onResize.bind(this);
        this.boundOnMouseMove = this.onMouseMove.bind(this);

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const geometry = new THREE.PlaneGeometry(2, 2);
        this.geometry = geometry;

        const uniforms = {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2() }
        };

        const fullFragmentShader = `
            #define PI 3.14159265359
            ${commonGLSL}
            ${this.shaderData.code}
        `;

        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fullFragmentShader,
            vertexShader: `
                void main() {
                    gl_Position = vec4( position, 1.0 );
                }
            `,
            extensions: {
                derivatives: true
            }
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.boundOnResize);
        if (this.isFullscreen) {
            window.addEventListener('mousemove', this.boundOnMouseMove);
        }

        this.onResize();
        this.animate();
    }

    onResize() {
        if (!this.renderer || !this.container) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        if (width === 0 || height === 0) return;

        this.renderer.setSize(width, height);
        if (this.material && this.material.uniforms.u_resolution) {
            this.material.uniforms.u_resolution.value.set(width, height);
        }
    }

    onMouseMove(e) {
        if (this.material && this.material.uniforms.u_mouse) {
            const rect = this.container.getBoundingClientRect();
            this.material.uniforms.u_mouse.value.x = e.clientX - rect.left;
            this.material.uniforms.u_mouse.value.y = rect.height - (e.clientY - rect.top);
        }
    }

    animate() {
        if (!this.renderer) return;

        this.animationId = requestAnimationFrame(this.animate.bind(this));

        if (this.material && this.material.uniforms.u_time) {
            this.material.uniforms.u_time.value += 0.01;
        }

        this.renderer.render(this.scene, this.camera);

        if (this.isFullscreen) {
            const timeDisp = document.getElementById('time-display');
            if (timeDisp && this.material) timeDisp.innerText = this.material.uniforms.u_time.value.toFixed(2);
        }
    }

    dispose() {
        window.removeEventListener('resize', this.boundOnResize);
        if (this.isFullscreen) {
            window.removeEventListener('mousemove', this.boundOnMouseMove);
        }

        cancelAnimationFrame(this.animationId);

        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }

        if (this.material) this.material.dispose();
        if (this.geometry) this.geometry.dispose();

        this.renderer = null;
        this.material = null;
        this.geometry = null;
    }
}
