import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSnapshot } from 'valtio';
import CustomButton from '../components/CustomButton';
import { iOSFix } from '../config/helpers';
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from '../config/motion';
import state from '../store';

const Home = () => {
	const snap = useSnapshot(state);

	setTimeout(() => {
		const mainLoader = document.querySelector('#mainLoading');
		setTimeout(() => {
			mainLoader.classList.add('disabled');
		}, 5000);
	}, 1500);

	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className='home' {...slideAnimation('left')}>
					<motion.header {...slideAnimation('down')}>
						<a
							href='https://www.linkedin.com/in/exslym/'
							target='_blank'
							className='flex items-center gap-[2vmin]'
						>
							<img
								src='./images/logo.png'
								alt='logo'
								className='xl:w-16 xl:h-16 lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8 object-contain'
							/>
							<h2 className='font-bold lg:text-[1.8rem] md:text-[1.4rem] text-md text-gray-500'>
								exslym
							</h2>
						</a>
					</motion.header>

					<motion.div className='home-content' {...headContainerAnimation}>
						<motion.div {...headTextAnimation}>
							<h1 className='head-text'>
								LET'S <br />
								DO IT.
							</h1>
						</motion.div>
						<motion.div {...headContentAnimation} className='flex flex-col md:gap-5 gap-3'>
							<p className='head-subtext'>
								<strong>Create</strong> your unique and&nbsp;exclusive shirt with&nbsp;our brand-new
								3D&nbsp;customization tool. <strong>Uleash your&nbsp;imagination</strong>{' '}
								and&nbsp;define&nbsp;your&nbsp;own&nbsp;style.
							</p>
							<CustomButton
								type='filled'
								title='Customize It'
								handleClick={() => (state.intro = false)}
								customStyles='w-fit px-4 font-bold lg:text-[2vmin] text-[100%]'
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Home;
