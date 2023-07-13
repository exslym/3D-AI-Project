import { Center, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { iOSFix } from '../config/helpers';
import state from '../store/index';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

const CanvasModel = () => {
	const snap = useSnapshot(state);

	if (snap.intro) {
		setTimeout(() => {
			iOSFix();
		}, 1000);
	}

	return (
		<>
			<div id='mainLoading'></div>
			<Canvas
				shadows
				camera={{ position: [0, 0, 0], fov: 25 }}
				gl={{ preserveDrawingBuffer: true }}
				className='transition-all ease-in capture forIOS'
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
