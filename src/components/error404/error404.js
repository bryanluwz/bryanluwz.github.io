import { Component } from "react";

import './error404.css';

export default class Error404page extends Component {
	render() {
		return (
			<div className="error404-container">
				<img className="error404-img" src="./images/404.png" alt="404" />
				<span className="error404-text">{this.props.customWarning ? this.props.customWarning : "page not found"}</span>
			</div>
		);
	}
}