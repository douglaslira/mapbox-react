import { LOAD_POINTS, LOAD_ROUTERS } from '../../constants/index';

const initialState = {
	points: [],
	routers: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOAD_POINTS:
			return {
				...state,
				points: action.payload
			};
		case LOAD_ROUTERS:
			return {
				...state,
				routers: action.payload
			};
		default:
			return state;
	}
};
