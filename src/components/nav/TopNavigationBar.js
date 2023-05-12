import { Component } from "react";
import { Link } from "react-router-dom";

import './Nav.css';

export default class TopNavigationBar extends Component {
	render() {
		return (
			<div className="nav-container">
				{/* Contains the nav buttons -- About, Other stuff (interim) */}
				<Link className="nav-button-container" to={"/about"}>
					<button className={`nav-button ${this.props.pathname === '/about' ? "nav-button-underline" : ""}`}>
						about
					</button>
				</Link>
				<Link className="nav-button-container" to={"/fun-stuff"}>
					<button className={`nav-button ${this.props.pathname === '/fun-stuff' ? "nav-button-underline" : ""}`}>
						fun
					</button>
				</Link>
				<Link className="nav-button-container" to={"/uni-stuff"}>
					<button className={`nav-button ${this.props.pathname === '/uni-stuff' ? "nav-button-underline" : ""}`}>
						uni
					</button>
				</Link>
				<Link className="nav-button-container" to={"/others"}>
					<button className={`nav-button ${this.props.pathname === '/others' ? "nav-button-underline" : ""}`}>
						others
					</button>
				</Link>
			</div>
		);
	}
}