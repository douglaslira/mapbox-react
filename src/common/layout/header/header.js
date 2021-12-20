import React from 'react';

import HeaderLogoComponent from "./components/HeaderLogo";
import HeaderLeftComponent from "./components/HeaderLeft";
import HeaderRightComponent from "./components/HeaderRight";

const Header = () => {

	return (
		<div className="app-header header-shadow">
			<HeaderLogoComponent />
			<div className="app-header__content">
				<div className="app-header-left">
					<HeaderLeftComponent />
				</div>
				<div className="app-header-right">
					<HeaderRightComponent />
				</div>
			</div>
		</div>
	)

}

const HeaderComponent = Header;
export default HeaderComponent;
