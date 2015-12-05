import React, { Component } from 'react';

export class SideMenu extends Component {
	render() {
		return (
			<div id="offcanvas" className="uk-offcanvas">
				<div className="uk-offcanvas-bar uk-offcanvas-bar-show">
					<ul className="uk-nav uk-nav-offcanvas uk-nav-parent-icon" data-uk-nav="">
						<li><a href="">Item</a></li>
						<li className="uk-active"><a href="">Activeaa</a></li>

						<li className="uk-parent" aria-expanded="false">
								<a href="#">Parent</a>
								<div style={{overflow:"hidden",height:0,position:"relative"}} className="uk-hidden"><ul className="uk-nav-sub">
										<li><a href="">Sub item</a></li>
										<li><a href="">Sub item</a>
												<ul>
														<li><a href="">Sub item</a></li>
														<li><a href="">Sub item</a></li>
												</ul>
										</li>
								</ul></div>
						</li>

						<li className="uk-parent" aria-expanded="false">
								<a href="#">Parent</a>
								<div style={{overflow:"hidden",height:0,position:"relative"}} className="uk-hidden"><ul className="uk-nav-sub">
										<li><a href="">Sub item</a></li>
										<li><a href="">Sub item</a></li>
								</ul></div>
						</li>

						<li><a href="">Item</a></li>

						<li className="uk-nav-header">Header</li>
						<li className="uk-parent"><a href=""><i className="uk-icon-star"></i> Parent</a></li>
						<li><a href=""><i className="uk-icon-twitter"></i> Item</a></li>
						<li className="uk-nav-divider"></li>
						<li><a href=""><i className="uk-icon-rss"></i> Item</a></li>
					</ul>
				</div>
			</div>
		);
	}
}