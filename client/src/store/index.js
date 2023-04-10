import { proxy } from 'valtio';

const state = proxy({
	intro: true,
	color: 'rgb(100, 200, 255)',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './threejs.png',
	fullDecal: './threejs.png',
});

export default state;
