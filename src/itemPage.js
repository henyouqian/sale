import React, { Component } from 'react';
import { render } from 'react-dom';
require("./itemPage.css");

var _rootEl = document.getElementById("root");
FastClick.attach(_rootEl);

export class PageItem extends Component {
	render() {
		return (
			<div className="uk-container uk-container-center">
				<div className="uk-width-1-1 uk-width-medium-1-2 uk-grid-margin">
					<div className="uk-panel uk-panel-box widget_text">
						<div className="uk-panel-badge uk-badge tm-badge-primary"><i className="uk-icon-star"></i></div>
						<div className="uk-panel-teaser">
							<img src="/home_venice.jpg" width="722" height="407" alt=""/>
						</div>
						<h2>四个月练出六块腹肌</h2>
						<div>
							YOOtheme
							<i className="uk-icon-star tm-secondary-color"></i>
							<i className="uk-icon-star tm-secondary-color"></i>
							<i className="uk-icon-star tm-secondary-color"></i>
							<i className="uk-icon-star tm-secondary-color"></i>
							<i className="uk-icon-star tm-icon-muted"></i>
							<hr/>
							<p>
								The Warp framework provides a rich toolset for developing cross-platform themes, including support for LESS, a Customizer and its very own front-end framework UIkit.
							</p>

							<h2>Reservations</h2>
							<form className="uk-form uk-form-stacked">
								<div className="uk-form-row">
									 <label className="uk-form-label">Check In</label>
										<div className="uk-form-controls">
												<div className="uk-form-icon uk-width-1-1">
														<i className="uk-icon-calendar"></i>
														<input className="uk-width-1-1 uk-form-large" type="text" />
												</div>
											</div>
									</div>
								<div className="uk-form-row">
									 <label className="uk-form-label">Check Out</label>
										<div className="uk-form-controls">
											<div className="uk-form-icon uk-width-1-1">
												<i className="uk-icon-calendar"></i>
												<input className="uk-width-1-1 uk-form-large" type="text" />
											</div>
										</div>
									</div>
							</form>

							<p className="uk-text-muted uk-text-small tm-margin-bottom-small">
										* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
							</p>
							<a href="#" className="uk-button uk-button-large tm-button-align-bottom"><i className="uk-icon-search"></i> Search Rooms</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

render(<PageItem />, document.getElementById('root'));