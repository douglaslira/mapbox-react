import React from 'react';
import startinnovlogo from "../../../assets/images/logoRodapepb.png";

class Footer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
			return (
				<div className="app-wrapper-footer">
					<div className="app-footer">
						<div className="app-footer__inner">
							<div className="app-footer-left">
								<ul className="nav">
									<li className="nav-item">
										<img src={startinnovlogo} alt="" />
									</li>
								</ul>
							</div>
							<div className="app-footer-right">
								<ul className="nav">
									<li className="nav-item">
										<a href="#" onClick={e => e.preventDefault()} className="nav-link">
										&copy; 2020 - StartInnov.com
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
			</div>
		)
	}
}

const FooterComponent = Footer;
export default FooterComponent;
