import { useRef, useMemo, FC } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FlickeringGrid: FC = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 40 * 40;

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const opacities = useMemo(() => new Float32Array(count).map(() => Math.random()), [count]);

    useFrame(() => {
        if (!meshRef.current) return;

        for (let i = 0; i < count; i++) {
            const x = (i % 40) - 20;
            const y = Math.floor(i / 40) - 20;

            dummy.position.set(x * 1.1, y * 1.1, 0);

            // Random flickering
            if (Math.random() < 0.05) {
                opacities[i] = Math.random() * 0.5;
            }

            dummy.scale.setScalar(opacities[i] * 0.5);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, -5]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </instancedMesh>
    );
};
