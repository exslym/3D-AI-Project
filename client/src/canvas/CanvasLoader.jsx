import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
	const { progress } = useProgress();
	return (
		<Html>
			<div className='canvas-loader-container'>
				<p className='canvas-loader-spinner'>Loading... </p>
				<p className='canvas-loader-procent'>{progress.toFixed(1)}%</p>
			</div>
		</Html>
	);
};

export default CanvasLoader;
