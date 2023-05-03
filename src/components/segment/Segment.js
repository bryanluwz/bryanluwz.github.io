import { Component } from "react";

import "./Segment.css";

export default class Segment extends Component {
	render() {
		return (
			<div className="segment-container">
				<div className="segment-header">
					<span className="segment-header-title">
						{this.props.title}
					</span>
				</div>
				<div className="segment-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}