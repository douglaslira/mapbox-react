import config from 'config';

export const MarkerService = {
	getMarker
};

function getMarker() {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch(`${config.apiUrl}/markers`, requestOptions)
		.then(handleResponse)
		.then(response => {
			return response;
		});
}

function handleResponse(obj) {
	return obj.result().then(response => {
		const data = response && JSON.parse(response);
		if (!obj.ok) {
			const error = (data && data.message) || obj.statusText;
			return Promise.reject(error);
		}
		return data;
	});
}
