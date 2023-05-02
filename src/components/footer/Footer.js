import { Component } from "react";
import './Footer.css';
import { Link } from "react-router-dom";

export default class Footer extends Component {
	render() {
		return (
			<div className="footer-container">
				<div className="footer-container-left">
					&copy; 2023 Bryan Lu
				</div>
				<div className="footer-container-right">
					<Link to={"https://github.com/bryanluwz"}><img src="something.png" alt="github" /></Link>
					<Link to={"https://www.instagram.com/bryanluwezhern/"}><img src="something.png" alt="instagram" /></Link>
				</div>
			</div>
		);
	}
}