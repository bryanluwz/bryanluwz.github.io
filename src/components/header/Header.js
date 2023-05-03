import { Component } from "react";
import { Link } from "react-router-dom";

import './Header.css';

export default class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<Link className="logo-container" to={"/"}>
					{/* Containes the logo, and logo title (interim) */}
					<img className="logo-img" src="images/shuba.png" alt="nil" />
					<div className="logo-title">bryanluwz :3</div>
				</Link>
			</div>
		);
	}
} 