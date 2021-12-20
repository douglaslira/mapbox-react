import mapboxgl from 'mapbox-gl';

const MapBoxUtilities = {
	apiKey: '<KEY>',
	markers: [],
	data: {
		type: 'FeatureCollection',
		features: []
	},
	hasMapInstance: false,
	map: null,
	bounds: null,
	config: null,
	shouldDisplayRoutes: false,
	countryCode: 'us',
	languageMapper: {
		de: 'name_de',
		br: 'name_pt',
		it: 'name_en',
		fr: 'name_fr',
		nl: 'name_en',
		us: 'name_en',
		ru: 'name_ru',
		au: 'name_en'
	},
	initializeMap: function (config) {
		this.config = config;
		mapboxgl.accessToken = this.apiKey;
		if (!this.hasMapInstance) {
			const map = new mapboxgl.Map(config.map);
			this.markers = config.markers;
			this.bounds = new mapboxgl.LngLatBounds();
			this.shouldDisplayRoutes = config.shouldDisplayRoutes ?? false;
			this.setData();

			map.on('resize', () => {
				if (this.bounds && this.bounds._sw && this.bounds._ne) {
					map.fitBounds(this.bounds, { padding: 50 });
				}
			});

			map.on('load', () => {
				// Set language
				map.setLayoutProperty('country-label', 'text-field', ['get', this.languageMapper[this.countryCode]]);
				map.addSource('markers', {
					type: 'geojson',
					data: this.data
				});

				// Add markers on MapBox
				this.addMarkers(map, config, this.bounds);

				// Add routers on MapBox
				if (this.shouldDisplayRoutes) {
					this.addRoutes();
				}

				// Styled labels
				this.data.features.forEach(function (feature, index) {
					var layerID = `pin-${index}`;
					if (!map.getLayer(layerID)) {
						map.addLayer({
							id: layerID,
							type: 'symbol',
							source: 'markers',
							layout: {
								'icon-allow-overlap': false,
								'text-field': '{label}',
								'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
								'text-size': 11,
								'text-transform': 'uppercase',
								'text-letter-spacing': 0.05,
								'text-offset': [0, 1.7],
								'text-allow-overlap': false,
								'text-ignore-placement': false,
								'icon-ignore-placement': false
							},
							paint: {
								'text-color': '#202',
								'text-halo-color': '#fff',
								'text-halo-width': 2
							}
						});
					}
				});
			});

			// Fit bound coordinates
			this.fitBounds(map, this.bounds);

			// Zoom
			if (!config.map || !config.map.scrollZoom) {
				map.scrollZoom.disable();
			}

			// Navigation
			if (config.navigation && config.navigation.visible) {
				map.addControl(
					new mapboxgl.NavigationControl({
						showCompass: config.navigation.showCompass,
						showZoom: config.navigation.showZoom
					}),
					config.navigation.position
				);
			}

			// FullScreen
			if (config.fullscreen && config.fullscreen.visible) {
				map.addControl(new mapboxgl.FullscreenControl(), config.fullscreen.position);
			}

			// Allow some one instance
			this.hasMapInstance = false;

			// ControlMap
			map.addControl(new mapboxgl.AttributionControl(), 'top-right');

			this.map = map;
		}
	},
	addRoutes() {
		const map = this.map;
		const config = this.config;
		const bounds = this.bounds;

		if (!config) {
			this.shouldDisplayRoutes = true;
			return;
		}

		let element = document.getElementById(`${config.map.container}`);
		element.classList.add('routes-map-test-active');

		var routes = config.map.routeData;
		if (routes && routes.length > 0) {
			routes.forEach((coordinates, index) => {
				if (coordinates && coordinates.length > 0) {
					coordinates.forEach((coordinate, index) => {
						bounds.extend(coordinate);
					});
					var layerID = `route-${index}`;
					if (!map.getLayer(layerID)) {
						// Create layer to drawn the line
						map.addLayer({
							id: layerID,
							type: 'line',
							source: {
								type: 'geojson',
								data: {
									type: 'Feature',
									properties: {},
									geometry: {
										type: 'LineString',
										coordinates: coordinates
									}
								}
							},
							layout: {
								'line-join': 'round',
								'line-cap': 'round'
							},
							paint: {
								'line-color': '#202',
								'line-width': 1
							}
						});
					}

					// Create layer to drawn the arrows
					map.addLayer({
						id: `arrow-layer${layerID}`,
						type: 'symbol',
						source: {
							type: 'geojson',
							data: {
								type: 'Feature',
								properties: {},
								geometry: {
									type: 'LineString',
									coordinates: coordinates
								}
							}
						},
						layout: {
							'symbol-placement': 'line-center',
							'symbol-spacing': 1,
							'icon-allow-overlap': false,
							'icon-rotate': 90,
							'icon-image': 'triangle-11',
							'icon-size': 1,
							visibility: 'visible'
						}
					});
				}
			});
		}
	},
	fitBounds(map, bounds) {
		map.on('load', e => {
			map.fitBounds(bounds, {
				padding: { top: 50, bottom: 50, left: 50, right: 50 },
				duration: 0
			});
		});
	},
	setData() {
		this.markers
			.filter(marker => marker.long && marker.lat)
			.map((marker, index) => {
				var label = marker.title;
				if (marker.title.indexOf(',') > -1) {
					label = marker.title.split(',')[0];
				}
				let showMarker = true;
				if (this.markers[0].title == marker.title && index !== 0) {
					showMarker = false;
				} else if (this.markers[this.markers.length - 1].title == marker.title && index !== this.markers.length - 1 && index !== 0) {
					showMarker = false;
				}

				// Create layer to drawn the pins
				var feature = {
					type: 'Feature',
					geometry: {
						coordinates: [marker.long, marker.lat],
						type: 'Point'
					},
					properties: {
						data: marker.data,
						day: marker.day,
						title: marker.title,
						description: marker.description,
						label: label,
						harbourUrl: marker.harbourUrl,
						imageUrl: marker.image,
						mapper: marker.mapper,
						maxDiscount: marker.maxDiscount,
						minPrice: marker.minPrice,
						nid: marker.nid,
						showMarker: showMarker
					}
				};
				this.data.features.push(feature);
			});
	},
	addMarkers(map, config, bounds) {
		this.data.features.forEach((marker, index) => {
			const markerEl = document.createElement('div');
			const firstDestination = index === 0;
			const lastDestination = index === this.data.features.length - 1;
			const markerType = `marker-html ${firstDestination || lastDestination ? 'highlighted' : ''}`;
			switch (config.page) {
				case 'destination':
					markerEl.innerHTML = `
						<div class='marker-html'>
							<div class='marker-html_pin normal'></div>
						</div>`;
					break;
				case 'cruise':
					markerEl.innerHTML = `<div class='${marker.properties.showMarker ? markerType : ''}'>
							<div class='marker-html_pin number'>${marker.properties.day}</div>
						</div>`;
					break;
				default:
					markerEl.innerHTML = `
						<div class='marker-html'>
							<div class='marker-html_pin normal'></div>
						</div>`;
					break;
			}

			// Cursor style
			markerEl.style.cursor = 'pointer';

			// Create popup template
			let popupTemplate = this.setPopupTemplate(config.popup, marker);
			let popup = new mapboxgl.Popup({
				anchor: config.popup.anchor,
				offset: config.popup.offset,
				keepInView: false
			}).setHTML(popupTemplate);

			// Create marker and add to map
			new mapboxgl.Marker(markerEl, {
				offset: [0, 0]
			})
				.setLngLat(marker.geometry.coordinates)
				.setPopup(popup)
				.addTo(map);

			// Add to bounds
			bounds.extend(marker.geometry.coordinates);
		});
	},
	setPopupTemplate(popupConfig, marker) {
		switch (popupConfig.template) {
			case 'destination':
				return this.popupDestinationTemplate(marker);
			case 'contact':
				return this.popupContactTemplate(marker);
			default:
				return this.popupTemplate(marker);
		}
	},
	popupTemplate(item) {
		return `<div className="content">
				<img className="img-responsive img-map" src="${item.properties.imageUrl}" alt="${item.properties.title}" />
				<h3>${item.properties.title}</h3>
				<p>${item.properties.description}</p>
			</div>`;
	},
	popupContactTemplate(item) {
		return `<div className="content">${item.properties.address}</div>`;
	},
	popupDestinationTemplate(item) {
		return '<div></div>';
	}
};
export default MapBoxUtilities;
