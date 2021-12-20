import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapBoxUtilities from '../../common/component/mapbox/MapBox';

import { RouterService } from '../../common/services/RouterService';
import { loadRouters } from '../../redux/actions/mapbox/MapBoxActions';

const Router = () => {
	const points = useSelector(state => state.mapBoxObj.points);
	const mapContainerPins = useRef(null);
	const map = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (map.current) return;

		RouterService.getRouter().then(response => {
			dispatch(loadRouters(response));
			MapBoxUtilities.initializeMap({
				page: 'cruise',
				markers: points,
				shouldDisplayRoutes: true,
				navigation: {
					visible: true,
					position: 'bottom-right',
					showCompass: false,
					showZoom: true
				},
				fullscreen: {
					visible: true,
					position: 'top-left'
				},
				map: {
					container: 'map-canvas',
					style: 'mapbox://styles/sabinelettermann/cjrtfdfsd2sdb2soz3vmnlc8x',
					zoom: 3,
					scrollZoom: false,
					routeData: response.longlat,
					attributionControl: false
				},
				popup: {
					template: 'default',
					anchor: 'bottom',
					offset: [0, -35]
				}
			});
		});
	}, []);

	return (
		<div className="row">
			<div className="col">
				<div ref={mapContainerPins} id="map-canvas" className="map-container mt-5" />
			</div>
		</div>
	);
};

const RouterComponent = Router;
export default RouterComponent;
