import { Component } from "react";

export default class Segment extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}