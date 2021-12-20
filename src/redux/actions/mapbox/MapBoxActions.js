import { LOAD_POINTS, LOAD_ROUTERS } from '../../constants/index';

export function loadPoints(payload) {
	return { type: LOAD_POINTS, payload };
}
export function loadRouters(payload) {
	return { type: LOAD_ROUTERS, payload };
}
