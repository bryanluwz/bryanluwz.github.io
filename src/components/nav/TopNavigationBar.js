import { Component } from "react";
import { Link } from "react-router-dom";

import './Nav.css';

export class TopNavigationBar extends Component {
	render() {
		return (
			<div className="nav-container">
				{/* Contains the nav buttons -- About, Other stuff (interim) */}
				<Link className="nav-button-container" to={"/"}>
					<button className="nav-button">
						home
					</button>
				</Link>
				<Link className="nav-button-container" to={"/fun-stuff"}>
					<button className="nav-button">
						fun
					</button>
				</Link>
				<Link className="nav-button-container" to={"/uni-stuff"}>
					<button className="nav-button">
						uni
					</button>
				</Link>
				<Link className="nav-button-container" to={"/others"}>
					<button className="nav-button">
						others
					</button>
				</Link>
			</div>
		);
	}
}