import { Component } from "react";
import { Link } from "react-router-dom";

import './Header.css';

export default class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<Link className="logo-container" to={"/"}>
					<img className="logo-img" src="./images/shuba.gif" alt="nil" />
					<div className="logo-title">bryanluwz</div>
				</Link>
			</div>
		);
	}
} 