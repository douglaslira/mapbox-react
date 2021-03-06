import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import $ from 'jquery';
import Popper from 'popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import style from './assets/styles/style.scss';

import { Provider } from 'react-redux';
import store from './redux/store/index';
import AppComponent from './modules/App';
import { FakeBackend } from './common/fakebackend/fakeBackend';

const hist = createBrowserHistory();
FakeBackend();

render(
	<Provider store={store}>
		<Router history={hist}>
			<AppComponent />
		</Router>
	</Provider>,
	document.getElementById('app')
);
