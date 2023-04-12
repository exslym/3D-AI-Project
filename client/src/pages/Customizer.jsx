import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import html2canvas from 'html2canvas';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { serverUrl } from '../config/config';
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants';
import { reader } from '../config/helpers';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';

const Customizer = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState('');
	const [prompt, setPrompt] = useState('');
	const [generatingImg, setGeneratingImg] = useState(false);

	const [activeEditorTab, setActiveEditorTab] = useState('');
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	const loader = document.querySelector('#loading');

	function displayLoading() {
		loader.classList.add('display');
		const aipickerButtons = document.querySelectorAll('.aipicker-buttons');
		const aipickerTextArea = document.querySelector('.aipicker-textarea');
		aipickerButtons.forEach(button => {
			button.classList.add('disabled');
			button.setAttribute('disabled', '');
		});
		aipickerTextArea.setAttribute('disabled', '');
	}
	function hideLoading() {
		loader.classList.remove('display');
		const aipickerButtons = document.querySelectorAll('.aipicker-buttons');
		const aipickerTextArea = document.querySelector('.aipicker-textarea');
		aipickerButtons.forEach(button => {
			button.classList.remove('disabled');
			button.removeAttribute('disabled');
		});
		aipickerTextArea.removeAttribute('disabled');
	}

	const handleSubmit = async type => {
		if (!prompt) return alert('Please enter a prompt');
		try {
			setGeneratingImg(true);
			displayLoading();

			//* call our backend to generate an AI image
			const response = await fetch(`${serverUrl}/api/v1/dalle`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt,
				}),
			});

			const data = await response.json();
			hideLoading();

			handleDecals(type, `data:image/png;base64,${data.photo}`);
		} catch (error) {
			console.log(error);
		} finally {
			setGeneratingImg(false);
			// setActiveEditorTab('');
		}
	};
	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type];
		state[decalType.stateProperty] = result;
		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab);
		}
	};

	const capture = tabName => {
		switch (tabName) {
			case 'download':
				const captureElement = document.querySelector('.capture');
				const date = Math.floor(Date.now() / 100);

				html2canvas(captureElement)
					.then(canvas => {
						canvas.style.display = 'none';
						document.body.appendChild(canvas);
						return canvas;
					})
					.then(canvas => {
						const image = canvas.toDataURL('image/png');
						const a = document.createElement('a');
						a.setAttribute('download', `my-tshirt-design-${date}.png`);
						a.setAttribute('href', image);
						a.click();
						canvas.remove();
					});
				break;
		}
	};
	const handleActiveFilterTab = tabName => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tabName];
				break;
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tabName];
				break;
		}

		//* after setting the state, activeFilterTab is updated
		setActiveFilterTab(prevState => {
			return {
				...prevState,
				[tabName]: !prevState[tabName],
			};
		});
	};

	const readFile = type => {
		reader(file).then(result => {
			handleDecals(type, result);
			setActiveEditorTab('');
		});
	};

	//* show tab content depending on the activeTab
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorPicker />;

			case 'filepicker':
				return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

			case 'aipicker':
				return (
					<AIPicker
						prompt={prompt}
						setPrompt={setPrompt}
						generatingImg={generatingImg}
						handleSubmit={handleSubmit}
					/>
				);

			default:
				return null;
		}
	};

	const toggleEditorTab = tabName => {
		switch (tabName) {
			case 'colorpicker':
				if (activeEditorTab === tabName) {
					setActiveEditorTab('');
				} else {
					setActiveEditorTab(tabName);
				}
				break;
			case 'filepicker':
				if (activeEditorTab === tabName) {
					setActiveEditorTab('');
				} else {
					setActiveEditorTab(tabName);
				}
				break;
			case 'aipicker':
				if (activeEditorTab === tabName) {
					setActiveEditorTab('');
				} else {
					setActiveEditorTab(tabName);
				}
				break;
		}
	};

	const goBack = () => {
		setActiveEditorTab('');
		state.intro = true;
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key='pickers'
						className='absolute top-0 left-0 z-10 '
						{...slideAnimation('left')}
					>
						<div className='flex items-center min-h-screen'>
							<div className='editortabs-container tabs'>
								{EditorTabs.map(tab => (
									<Tab key={tab.name} tab={tab} handleClick={() => toggleEditorTab(tab.name)} />
								))}
								{generateTabContent(activeEditorTab)}
							</div>
						</div>
					</motion.div>

					<motion.div key='goBack' className='absolute z-10 top-5 right-5' {...fadeAnimation}>
						<CustomButton
							type='filled'
							title='Go Back'
							handleClick={() => goBack()}
							customStyles='w-fit px-4 font-bold lg:text-[2vmin] text-[100%]'
						/>
					</motion.div>

					<motion.div key='tabs' className='filtertabs-container' {...slideAnimation('up')}>
						{FilterTabs.map(tab => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => {
									handleActiveFilterTab(tab.name);
									capture(tab.name);
								}}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
