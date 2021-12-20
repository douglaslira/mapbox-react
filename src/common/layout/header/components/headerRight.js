import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import douglaslira from "../../../../assets/images/douglaslira.jpg";
import LangSwitchComponent from '../../../component/langswitch/langSwitch';
import { AuthService } from '../../../services/auth/AuthService';

const HeaderRight = () => {

	const authObj = useSelector(state => state.authObj);
	const logout = () => {
		AuthService.logout();
		window.location.reload();
	}

	return (
		<div className="header-btn-lg pr-0">
			<div className="widget-content p-0">
				<div className="widget-content-wrapper">
					<div className="widget-content-left">
						<div className="btn-group">
							<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
								<img width="42" className="rounded-circle" src={douglaslira} alt="" />
								<i className="fa fa-angle-down ml-2 opacity-8"></i>
							</a>
							<div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
								<button type="button" tabIndex="0" className="dropdown-item">Meu perfil</button>
								<h6 tabIndex="-1" className="dropdown-header">Configurações</h6>
								<button type="button" tabIndex="0" className="dropdown-item">Mudar foto</button>
								<div tabIndex="-1" className="dropdown-divider"></div>
								<button type="button" tabIndex="0" className="dropdown-item" onClick={logout}>Sair</button>
							</div>
						</div>
					</div>
					<div className="widget-content-left  ml-3 header-user-info">
						<div className="widget-heading">
							Boa tarde, {authObj.profileInfo.firstName} {authObj.profileInfo.lastName}!
						</div>
						<div className="widget-subheading">
						{authObj.profileInfo.mail}
						</div>
					</div>
					<div className="widget-content-right header-user-info ml-3">
						<button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
							<i className="pe-7s-lock pr-1 pl-1"></i>
						</button>
					</div>
					<div className="widget-content-right header-user-info ml-3">
						<LangSwitchComponent />
					</div>
				</div>
			</div>
		</div>
	)

}
const HeaderRightComponent = HeaderRight;
export default HeaderRightComponent;
