import { Center, Environment, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import CanvasLoader from './CanvasLoader';
import Shirt from './Shirt';

const CanvasModel = () => {
	const loader = document.querySelector('#mainLoading');

	function displayLoading() {
		loader.classList.add('display');
	}
	function hideLoading() {
		loader.classList.remove('display');
	}

	return (
		<>
			{/* <div id='mainLoading'></div> */}
			<Canvas
				shadows
				camera={{ position: [0, 0, 0], fov: 25 }}
				gl={{ preserveDrawingBuffer: true }}
				className='w-full max-w-full h-full transition-all ease-in capture'
			>
				<ambientLight intensity={0.5} />
				<Environment preset='city' />

				<CameraRig>
					<Backdrop />
					<Center>
						<Shirt />
					</Center>
				</CameraRig>
			</Canvas>
		</>
	);
};

export default CanvasModel;
