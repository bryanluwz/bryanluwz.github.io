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
					<Link className="footer-social-icon" to={"https://github.com/bryanluwz"}><i className="fa fa-github fa-2x" aria-hidden="true" /></Link>
					<Link className="footer-social-icon" to={"https://www.instagram.com/bryanluwezhern/"}><i className="fa fa-instagram fa-2x" aria-hidden="true" /></Link>
					<Link className="footer-social-icon" to={"https://www.linkedin.com/in/bryanluwz/"}><i className="fa fa-linkedin-square fa-2x" aria-hidden="true" /></Link>
				</div>
			</div>
		);
	}
}