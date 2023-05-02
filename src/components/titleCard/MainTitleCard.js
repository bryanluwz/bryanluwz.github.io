import { Component, Fragment } from "react";

import './MainTitleCard.css';

export default class MainTitleCard extends Component {
	render() {
		return (
			<Fragment>
				<div className="main-title-card-container">
					<div className="main-title-card-title">
						{this.props.title}
					</div>
					<div className="main-title-card-subtitle">
						{this.props.subtitle}
					</div>
				</div>
			</Fragment>
		);
	}
}