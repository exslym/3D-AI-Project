import html2canvas from 'html2canvas';

export const getScreenshot = tabName => {
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

export const reader = file =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = () => resolve(fileReader.result);
		fileReader.readAsDataURL(file);
	});

export const getContrastingColor = color => {
	// Remove the '#' character if it exists
	const hex = color.replace('#', '');

	// Convert the hex string to RGB values
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Calculate the brightness of the color
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	// Return black or white depending on the brightness
	return brightness > 128 ? 'black' : 'white';
};

export const displayLoading = () => {
	const loader = document.querySelector('#loading');
	const aipickerButtons = document.querySelectorAll('.aipicker-buttons');
	const aipickerTextArea = document.querySelector('.aipicker-textarea');

	loader.classList.add('display');
	aipickerButtons.forEach(button => {
		button.classList.add('disabled');
		button.setAttribute('disabled', '');
	});
	aipickerTextArea.setAttribute('disabled', '');
};

export const hideLoading = () => {
	const loader = document.querySelector('#loading');
	const aipickerButtons = document.querySelectorAll('.aipicker-buttons');
	const aipickerTextArea = document.querySelector('.aipicker-textarea');

	loader.classList.remove('display');
	aipickerButtons.forEach(button => {
		button.classList.remove('disabled');
		button.removeAttribute('disabled');
	});
	aipickerTextArea.removeAttribute('disabled');
};

export const iOSFix = () => {
	const isTablet =
		/^iP/.test(navigator.userAgent) ||
		(/^Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
	if (isTablet) {
		document.querySelector('.forIOS').classList.add('iOS');
	}
};
