import { proxy } from 'valtio';

const state = proxy({
	intro: true,
	color: 'rgb(146, 235, 255)',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './exs_logo.png',
	fullDecal: './exs_logo.png',
});

export default state;
