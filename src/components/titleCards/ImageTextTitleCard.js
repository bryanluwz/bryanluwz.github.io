import { Component } from "react";

export class ImageTextTitleCard extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}