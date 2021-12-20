import React from 'react';
import { connect } from "react-redux";
import $ from 'jquery';

function mapDispatchToProps(dispatch) {
	return {
		getTask: () => dispatch()
	};
}

const mapStateToProps = state => {
	return { infoHeader: state };
};

class HeaderLeft extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		$(document).ready(() => {
			$('.search-icon').click(function () {
				$(this).parent().parent().addClass('active');
			});
			$('.search-wrapper .close').click(function () {
				$(this).parent().removeClass('active');
			});
		});
	}

	render() {

		return (
			<>
				<div className="search-wrapper">
					<div className="input-holder">
						<input type="text" className="search-input" placeholder="Type to search" />
						<button className="search-icon"><span></span></button>
					</div>
					<button className="close"></button>
				</div>
				<ul className="header-menu nav">
					<li className="dropdown nav-item">
						<a href="#" onClick={e => e.preventDefault()} className="nav-link">
							<i className="nav-link-icon fa fa-cog"></i>
							Configurações
						</a>
					</li>
				</ul>
			</>
		)

	}
}

const HeaderLeftComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderLeft);

export default HeaderLeftComponent
