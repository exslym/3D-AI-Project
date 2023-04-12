export const serverUrl = 'https://threejs-ai-project-n5gw.onrender.com';

const config = {
	development: {
		backendUrl: `${serverUrl}/api/v1/dalle`,
		// backendUrl: `http://localhost:8080/api/v1/dalle`,
	},
	production: {
		backendUrl: `${serverUrl}/api/v1/dalle`,
	},
};

export default config;
