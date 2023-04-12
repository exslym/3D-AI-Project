import React from 'react';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';
import state from '../store';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
	const snap = useSnapshot(state);

	const generateStyle = () => {
		if (snap.color !== '#ffffff') {
			return {
				backgroundColor: snap.color,
				color: getContrastingColor(snap.color),
				borderColor: snap.color,
				border: 'none',
			};
		} else {
			return {
				backgroundColor: getContrastingColor(snap.color),
				color: snap.color,
				borderColor: getContrastingColor(snap.color),
				border: 'none',
			};
		}
	};

	return (
		<div className='filepicker-container'>
			<div className='flex-1 flex flex-col'>
				<input
					type='file'
					id='file-upload'
					accept='image/*'
					onChange={e => setFile(e.target.files[0])}
				/>
				<label
					htmlFor='file-upload'
					className='filepicker-label lg:text-[1.2rem] text-[100%] font-bold'
					style={generateStyle()}
				>
					Upload File
				</label>
				<p className='filepicker-text'>{file === '' ? 'No file selected' : file.name}</p>
			</div>

			<div className='mt-4 flex flex-wrap gap-3'>
				<CustomButton
					type='outline'
					title='Logo'
					handleClick={() => readFile('logo')}
					customStyles='lg:text-[1.2rem] text-[100%] font-bold'
				/>
				<CustomButton
					type='filled'
					title='Full'
					handleClick={() => readFile('full')}
					customStyles='lg:text-[1.2rem] text-[100%] font-bold'
				/>
			</div>
		</div>
	);
};

export default FilePicker;
