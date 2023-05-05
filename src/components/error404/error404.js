import { Component } from "react";

import './error404.css';

export default class Error404page extends Component {
	render() {
		return (
			<div className="error404-container">
				<img className="error404-img" src="./images/404.png" alt="404" />
				<span className="error404-text">page not found</span>
			</div>
		);
	}
}