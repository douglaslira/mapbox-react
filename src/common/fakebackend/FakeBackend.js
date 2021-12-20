import markerData from './data/markerData';
import routerData from './data/routerData';

export function FakeBackend() {
	let realFetch = window.fetch;

	let markersList = markerData;
	let routersList = routerData;

	window.fetch = (url, opts) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (typeof url === 'string' && url.endsWith('/markers') && opts.method === 'GET') {
					let responseJson = markersList;
					resolve({ ok: true, result: () => Promise.resolve(JSON.stringify(responseJson)) });
					return;
				}
				if (typeof url === 'string' && url.endsWith('/routers') && opts.method === 'GET') {
					let responseJson = routersList;
					resolve({ ok: true, result: () => Promise.resolve(JSON.stringify(responseJson)) });
					return;
				}
				realFetch(url, opts).then(response => resolve(response));
			}, 500);
		});
	};
}
