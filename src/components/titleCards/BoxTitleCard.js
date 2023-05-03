import { Component } from "react";

export class BoxTitleCard extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}