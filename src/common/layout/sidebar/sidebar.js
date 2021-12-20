import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import $ from 'jquery';
import 'metismenu';

import { Translate } from "react-redux-i18n";

const SideBar = () => {

	useEffect(() => {
		$(".vertical-nav-menu").metisMenu();
		$('.close-sidebar-btn').click(function () {
			const classToSwitch = $(this).attr('data-class');
			const containerElement = '.app-container';
			const closeBtn = $(this);
			$(containerElement).toggleClass(classToSwitch);
			if (closeBtn.hasClass('is-active')) {
				closeBtn.removeClass('is-active');
			} else {
				closeBtn.addClass('is-active');
			}
		});
	}, []);


	return (
		<div className="app-sidebar sidebar-shadow">
			<div className="app-header__logo">
				<div className="logo-src"></div>
				<div className="header__pane ml-auto">
					<div>
						<button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="app-header__mobile-menu">
				<div>
					<button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</button>
				</div>
			</div>
			<div className="app-header__menu">
				<span>
					<button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
						<span className="btn-icon-wrapper">
							<i className="fa fa-ellipsis-v fa-w-6"></i>
						</span>
					</button>
				</span>
			</div>
			<div className="scrollbar-sidebar">
				<div className="app-sidebar__inner">
					<ul className="vertical-nav-menu">
						<li className="app-sidebar__heading">
							<Translate value="sidebar.portifolio" />
						</li>
						<li>
							<Link to="/">
								<i className="metismenu-icon pe-7s-rocket"></i>
								<Translate value="sidebar.innovation_projects" />
							</Link>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-notebook"></i>
								<Translate value="sidebar.lessons_learned" />
							</a>
						</li>
						<li className="app-sidebar__heading">
							<Translate value="sidebar.idea_management" />
						</li>
						<li>
							<Link to="/innovation/challenge">
								<i className="metismenu-icon pe-7s-note2"></i>
								<Translate value="sidebar.innovation_challenges" />
							</Link>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-light"></i>
								<Translate value="sidebar.capture_of_ideas" />
								<i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
							</a>
							<ul>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 1.1 Banco de Ideias
									</a>
								</li>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 1.2 Estruturação
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-note2"></i>
								<Translate value="sidebar.pre_selection" />
							</a>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-science"></i>
								<Translate value="sidebar.search" />
								<i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
							</a>
							<ul>
								<li>
									<a href="/pipeline/#/finallistofpreselectedprojects/proposals/bychallenge">
										<i className="metismenu-icon"></i> 3.1 Ideias Selecionadas
									</a>
								</li>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 3.2 Pesquisa & Estudo
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-hammer"></i>
								<Translate value="sidebar.committee_evaluation" />
								<i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
							</a>
							<ul>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 4.1 Aguardando Avaliação
									</a>
								</li>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 4.2 Avaliados
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#">
								<i className="metismenu-icon pe-7s-diamond"></i>
								<Translate value="sidebar.development" />
								<i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
							</a>
							<ul>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 5.1 Inovação Fechada
									</a>
								</li>
								<li>
									<a href="#">
										<i className="metismenu-icon"></i> 5.2 Inovação Aberta
									</a>
								</li>
							</ul>
						</li>
						<li className="app-sidebar__heading">
							<Translate value="sidebar.planning" />
						</li>
						<li>
							<a href="/planning">
								<i className="metismenu-icon pe-7s-target"></i>
								<Translate value="sidebar.planning_strategy" />
							</a>
						</li>
						<li className="app-sidebar__heading">
							<Translate value="sidebar.trainings" />
						</li>
						<li>
							<a href="/gerencial/cursos">
								<i className="metismenu-icon pe-7s-study"></i>
								<Translate value="sidebar.project_management" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

const SideBarComponent = SideBar;
export default SideBarComponent;
