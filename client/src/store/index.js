import { proxy } from 'valtio';

const state = proxy({
	intro: true,
	color: 'rgb(146, 235, 255)',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './images/default.png',
	fullDecal: './images/default.png',
});

export default state;
