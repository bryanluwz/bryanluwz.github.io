import { Component, Fragment } from "react";

export default class TitleCard extends Component {
	render() {
		return (
			<Fragment>
				<div className="title-card-container">
					<div className="title-card-title">
						{this.props.title}
					</div>
					<div className="title-card-subtitle">
						{this.props.subtitle}
					</div>
				</div>
			</Fragment>
		);
	}
}