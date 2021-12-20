import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapBoxUtilities from '../../common/component/mapbox/MapBox';

import { MarkerService } from '../../common/services/MarkerService';
import { loadPoints } from '../../redux/actions/mapbox/MapBoxActions';
import { Link } from 'react-router-dom';

const Marker = () => {
	const mapContainerPins = useRef(null);
	const map = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (map.current) return;
		MarkerService.getMarker().then(response => {
			dispatch(loadPoints(response));
			MapBoxUtilities.initializeMap({
				page: 'cruise',
				markers: response,
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

const MarkerComponent = Marker;
export default MarkerComponent;
