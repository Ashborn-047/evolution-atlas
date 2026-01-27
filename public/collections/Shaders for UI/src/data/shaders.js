import flux_ring from '../shaders/flux_ring.frag?raw';
import kinetic_stripes from '../shaders/kinetic_stripes.frag?raw';
import neon_sunset from '../shaders/neon_sunset.frag?raw';
import vhs_tracking from '../shaders/vhs_tracking.frag?raw';
import warp_speed from '../shaders/warp_speed.frag?raw';
import binary_stream from '../shaders/binary_stream.frag?raw';
import cosmic_nebula from '../shaders/cosmic_nebula.frag?raw';
import hex_forcefield from '../shaders/hex_forcefield.frag?raw';
import cyber_circuit from '../shaders/cyber_circuit.frag?raw';
import crt_terminal from '../shaders/crt_terminal.frag?raw';
import the_void from '../shaders/the_void.frag?raw';
import neo_polka from '../shaders/neo_polka.frag?raw';
import rave_laser from '../shaders/rave_laser.frag?raw';
import liquid_rainbow from '../shaders/liquid_rainbow.frag?raw';
import digital_rain from '../shaders/digital_rain.frag?raw';
import synapse_net from '../shaders/synapse_net.frag?raw';
import oldschool_plasma from '../shaders/oldschool_plasma.frag?raw';
import hypno_spiral from '../shaders/hypno_spiral.frag?raw';
import retro_grid from '../shaders/retro_grid.frag?raw';

export const commonGLSL = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
`;

export const shaders = [
    { id: 'flux_ring', name: 'Flux Ring', desc: 'An interactive, glowing light circle with noise deformation.', code: flux_ring },
    { id: 'kinetic_stripes', name: 'Kinetic Stripes', desc: 'Smooth, animated diagonal stripes with kinetic distortion.', code: kinetic_stripes },
    { id: 'neon_sunset', name: 'Neon Sunset', desc: 'The classic 80s synthwave sun with animated scanlines.', code: neon_sunset },
    { id: 'vhs_tracking', name: 'VHS Tracking', desc: 'Analog video distortion with tracking errors and noise.', code: vhs_tracking },
    { id: 'warp_speed', name: 'Warp Speed', desc: 'Retro sci-fi starfield simulation with radial blur.', code: warp_speed },
    { id: 'binary_stream', name: 'Binary Stream', desc: 'High-speed data transfer visualization.', code: binary_stream },
    { id: 'cosmic_nebula', name: 'Cosmic Nebula', desc: 'FBM noise layers simulating gaseous space structures.', code: cosmic_nebula },
    { id: 'hex_forcefield', name: 'Hex Forcefield', desc: 'A Tron-inspired hexagonal grid with pulsing edges.', code: hex_forcefield },
    { id: 'cyber_circuit', name: 'Cyber Circuit', desc: 'Procedural circuit board patterns with data packets.', code: cyber_circuit },
    { id: 'crt_terminal', name: 'CRT Terminal', desc: 'Old school monitor emulation with scanlines and curvature.', code: crt_terminal },
    { id: 'the_void', name: 'The Void', desc: 'A radial singularity that distorts space and light.', code: the_void },
    { id: 'neo_polka', name: 'Neo Polka', desc: 'Classic polka dots with smoothed anti-aliasing.', code: neo_polka },
    { id: 'rave_laser', name: 'Rave Laser', desc: 'High-energy beams of light reacting to time.', code: rave_laser },
    { id: 'liquid_rainbow', name: 'Liquid Rainbow', desc: 'Smooth color cycling noise creating an oily surface.', code: liquid_rainbow },
    { id: 'digital_rain', name: 'Digital Rain', desc: 'Simulated ASCII rain effect.', code: digital_rain },
    { id: 'synapse_net', name: 'Synapse Net', desc: 'Voronoi cellular structure resembling connections.', code: synapse_net },
    { id: 'oldschool_plasma', name: 'Oldschool Plasma', desc: 'A tribute to the demo scene. Sum of sines interference.', code: oldschool_plasma },
    { id: 'hypno_spiral', name: 'Hypno Spiral', desc: 'Rotational coordinate transformation creating a tunnel.', code: hypno_spiral },
    { id: 'retro_grid', name: 'Retro Grid', desc: 'Perspective projection of a moving synthwave grid.', code: retro_grid }
];
