import React from 'react';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
import state from '../store';
import CustomButton from './CustomButton';

const AIPicker = ({ type, prompt, setPrompt, generatingImg, handleSubmit }) => {
	const snap = useSnapshot(state);

	const generateStyle = type => {
		return {
			color: getContrastingColor(snap.color),
			borderColor: getContrastingColor(snap.color),
		};
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
			<div className='flex flex-wrap gap-3'>
				{generatingImg ? (
					<CustomButton type='outline' title='Ask AI...' customStyles='text-lg' />
				) : (
					<>
						<CustomButton
							type='outline'
							title='AI Logo'
							handleClick={() => handleSubmit('logo')}
							customStyles='text-md'
						/>
						<CustomButton
							type='filled'
							title='AI Full'
							handleClick={() => handleSubmit('full')}
							customStyles='text-md'
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AIPicker;
