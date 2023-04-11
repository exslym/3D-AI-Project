import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const Backdrop = () => {
	const snap = useSnapshot(state);
	const shadows = useRef();

	return (
		<AccumulativeShadows
			ref={shadows}
			color={snap.color}
			temporal
			frames={40}
			alphaTest={0.9}
			scale={10}
			rotation={[Math.PI / 2, 0.3, 0]}
			position={[-3, 0, -0.15]}
		>
			{/* <RandomizedLight
				amount={2}
				radius={50}
				intensity={0.01}
				ambient={0.2}
				position={[25, 10, -50]}
			/> */}
			<RandomizedLight
				amount={6}
				radius={50}
				intensity={0.99}
				ambient={0.85}
				position={[30, -1, -5]}
			/>
		</AccumulativeShadows>
	);
};

export default Backdrop;
