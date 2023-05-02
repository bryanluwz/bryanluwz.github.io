import { Component } from "react";
import { Link } from "react-router-dom";

import './Header.css';

export default class Header extends Component {
	render() {
		return (
			<div className="header-container">
				<div className="logo-container">
					{/* Containes the logo, and logo title (interim) */}
					<img className="logo-img" src="./something.png" alt="0.o" />
					<div className="logo-title">bryanluwz :3</div>
				</div>
				<div className="nav-container">
					{/* Contains the nav buttons -- About, Other stuff (interim) */}
					<Link>
						<button className="nav-button">
							about
						</button>
					</Link>
					<Link to={"/randomStuff"}>
						<button className="nav-button">
							random stuff
						</button>
					</Link>
				</div>
			</div>
		);
	}
} 