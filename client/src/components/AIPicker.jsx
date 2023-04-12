import React from 'react';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
import state from '../store';
import CustomButton from './CustomButton';

const AIPicker = ({ type, prompt, setPrompt, generatingImg, handleSubmit }) => {
	const snap = useSnapshot(state);

	const generateStyle = () => {
		return {
			backgroundColor: 'rgb(226, 232, 240)',
			opacity: '0.8',
			color: 'rgb(75, 85, 99)',
			borderColor: 'rgba(75, 85, 99, 0.2)',
		};
		// if (snap.color !== '#ffffff') {
		// 	return {
		// 		backgroundColor: getContrastingColor(snap.color),
		// 		color: snap.color,
		// 		borderColor: snap.color,
		// 	};
		// } else {
		// 	return {
		// 		backgroundColor: snap.color,
		// 		color: getContrastingColor(snap.color),
		// 		borderColor: getContrastingColor(snap.color),
		// 	};
		// }
	};

	return (
		<div className='aipicker-container'>
			<textarea
				placeholder='Ask AI...'
				type='outline'
				rows={5}
				value={prompt}
				onChange={e => setPrompt(e.target.value)}
				className='aipicker-textarea'
				style={generateStyle(type)}
			/>
			<div id='loading'></div>
			<div className='flex flex-wrap gap-3'>
				<>
					<CustomButton
						type='outline'
						title='AI Logo'
						handleClick={() => handleSubmit('logo')}
						customStyles='aipicker-buttons lg:text-[1.2rem] text-[100%] font-bold'
					/>
					<CustomButton
						type='filled'
						title='AI Full'
						handleClick={() => handleSubmit('full')}
						customStyles='aipicker-buttons lg:text-[1.2rem] text-[100%] font-bold'
					/>
				</>
				{/* {generatingImg ? (
					<CustomButton type='outline' title='Ask AI...' customStyles='text-lg' />
				) : (
					<>
						<CustomButton
							type='outline'
							title='AI Logo'
							handleClick={() => handleSubmit('logo')}
							customStyles='lg:text-[1.2rem] text-[100%] font-bold'
						/>
						<CustomButton
							type='filled'
							title='AI Full'
							handleClick={() => handleSubmit('full')}
							customStyles='lg:text-[1.2rem] text-[100%] font-bold'
						/>
					</>
				)} */}
			</div>
		</div>
	);
};

export default AIPicker;
