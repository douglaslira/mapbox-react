import React from 'react';

const MarkerComponent = React.lazy(() => import('../modules/marker/Marker'));
const RouterComponent = React.lazy(() => import('../modules/router/Router'));
const indexRoutes = [
	{ path: '/', name: 'Marker', exact: true, restrict: false, component: MarkerComponent },
	{ path: '/router', name: 'Router', exact: true, restrict: false, component: RouterComponent }
];

export default indexRoutes;
