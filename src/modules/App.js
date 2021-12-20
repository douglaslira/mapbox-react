import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PrivateRoute } from '../common/component/privateroute/PrivateRoute';

import Loader from '../common/component/loader/Loader';
import ErrorBoundary from '../common/component/errorboundary/ErrorBoundary';

import indexRoutes from '../routers';

import { RouterService } from '../common/services/RouterService';
import { MarkerService } from '../common/services/MarkerService';
import { loadRouters, loadPoints } from '../redux/actions/mapbox/MapBoxActions';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		RouterService.getRouter().then(response => {
			dispatch(loadRouters(response));
		});
		MarkerService.getMarker().then(response => {
			dispatch(loadPoints(response));
		});
	}, []);

	return (
		<div className="container">
			<ErrorBoundary>
				<div>
					<div className="btn-group mt-5" role="group" aria-label="Basic example">
						<Link to="/" className="btn btn-outline-secondary">
							Markers
						</Link>
						<Link to="/router" className="btn btn-outline-secondary">
							Routers
						</Link>
					</div>
					<Suspense fallback={<Loader />}>
						<Switch>
							{indexRoutes.map((prop, key) => {
								if (prop.restrict) {
									return <PrivateRoute path={prop.path} exact={prop.exact} key={key} component={prop.component} />;
								}
								return <Route path={prop.path} exact={prop.exact} key={key} component={prop.component} />;
							})}
						</Switch>
					</Suspense>
				</div>
			</ErrorBoundary>
		</div>
	);
};

const AppComponent = App;

export default AppComponent;
