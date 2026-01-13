import { useRef, useMemo, FC } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferAttribute } from 'three';

export const DottedSurface: FC = () => {
    const pointsRef = useRef<Points>(null);
    const count = 40 * 60;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const ix = i % 40;
            const iy = Math.floor(i / 40);
            pos[i * 3] = ix * 1.5 - 30;
            pos[i * 3 + 1] = 0;
            pos[i * 3 + 2] = iy * 1.5 - 45;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.elapsedTime;
        const posAttr = pointsRef.current.geometry.attributes.position as BufferAttribute;

        for (let i = 0; i < count; i++) {
            const ix = i % 40;
            const iy = Math.floor(i / 40);

            // Wave motion
            posAttr.array[i * 3 + 1] =
                Math.sin((ix + time * 2) * 0.3) * 2 +
                Math.cos((iy + time * 2) * 0.5) * 2;
        }
        posAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} rotation={[-Math.PI / 4, 0, 0]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};
