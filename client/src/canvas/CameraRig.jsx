import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const CameraRig = ({ children }) => {
	const group = useRef();
	const snap = useSnapshot(state);

	useFrame((state, delta) => {
		const isBreakpointLarge = window.innerWidth > 1920;
		const isBreakpoint1920 = window.innerWidth > 1440 && window.innerWidth <= 1920;
		const isBreakpoint1440 = window.innerWidth > 1280 && window.innerWidth <= 1440;
		const isBreakpoint1280 = window.innerWidth > 1024 && window.innerWidth <= 1280;
		const isBreakpoint768 = window.innerWidth > 768 && window.innerWidth <= 1024;
		const isBreakpoint430 = window.innerWidth > 430 && window.innerWidth <= 768;
		const isMobile = window.innerWidth > 320 && window.innerWidth <= 430;

		//* set the initial position of the model
		let targetPosition = [-0.4, 0, 2];
		if (snap.intro) {
			switch (true) {
				case isBreakpointLarge:
					targetPosition = [-0.35, 0, 2.5];
					break;
				case isBreakpoint1920:
					targetPosition = [-0.25, 0, 2];
					break;
				case isBreakpoint1440:
					targetPosition = [-0.25, 0, 2];
					break;
				case isBreakpoint1280:
					targetPosition = [-0.35, 0, 2.5];
					break;
				case isBreakpoint768:
					targetPosition = [-0.35, 0, 2.8];
					break;
				case isBreakpoint430:
					targetPosition = [0, 0.2, 3];
					break;
				case isMobile:
					targetPosition = [0, 0.18, 2.8];
					break;
				default:
					// targetPosition = [0, 0.3, 3.5];
					targetPosition = [0, 0.18, 2.8];
					break;
			}
		} else {
			if (isBreakpoint430) {
				targetPosition = [0, 0, 2.8];
			} else if (isMobile) {
				targetPosition = [0, -0.05, 3];
			} else targetPosition = [0, -0.025, 2];
		}

		//* set the camera position
		easing.damp3(state.camera.position, targetPosition, 0.25, delta);

		//* set the model rotation smoothly
		easing.dampE(
			group.current.rotation,
			[state.pointer.y / 10, -state.pointer.x / 5, 0],
			0.25,
			delta,
		);
	});

	return <group ref={group}>{children}</group>;
};

export default CameraRig;
