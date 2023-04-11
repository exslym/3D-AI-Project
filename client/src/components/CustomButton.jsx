import React from 'react';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
import state from '../store';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
	const snap = useSnapshot(state);

	const generateStyle = type => {
		if (snap.color !== '#ffffff') {
			return {
				backgroundColor: snap.color,
				color: getContrastingColor(snap.color),
				borderColor: getContrastingColor(snap.color),
			};
		} else {
			return {
				backgroundColor: getContrastingColor(snap.color),
				color: snap.color,
				borderColor: snap.color,
			};
		}
	};

	return (
		<button
			className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
			style={generateStyle(type)}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
