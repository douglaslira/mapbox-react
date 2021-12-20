import { combineReducers } from 'redux';

import MapBoxReducer from './mapbox/MapBoxReducer';

export default combineReducers({
	mapBoxObj: MapBoxReducer
});
