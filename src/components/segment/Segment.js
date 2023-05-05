import { Component } from "react";

import "./Segment.css";

export default class Segment extends Component {
	render() {
		return (
			<div className="segment-container">
				{this.props.title !== undefined && <div className="segment-header">
					<span className="segment-header-title-padding"></span>
					<span className="segment-header-title">
						{this.props.title}
					</span>
					<span className="segment-header-title-padding"> </span>
				</div>}
				<div className="segment-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}