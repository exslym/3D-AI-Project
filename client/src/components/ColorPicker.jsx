import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = () => {
	const snap = useSnapshot(state);

	return (
		<div className='absolute left-full ml-3'>
			<SketchPicker
				color={snap.color}
				disableAlpha
				onChange={color => (state.color = color.hex)}
				presetColors={[
					'#ffffff',
					// '#F0EDE2',
					'#98B4D4',
					// '#567277',
					'#009B77',
					// '#005520',
					'#BD4A55',
					'#5B5EA6',
					'#34568B',
					// '#4B4443',
					'#384C3B',
					'#000000',
				]}
			/>
		</div>
	);
};

export default ColorPicker;
