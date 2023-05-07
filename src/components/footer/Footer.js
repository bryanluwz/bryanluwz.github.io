import { Component } from "react";
import './Footer.css';
import { Link } from "react-router-dom";

export default class Footer extends Component {
	render() {
		return (
			<div className={`footer-wrapper ${this.props.isStickyFooter ? "footer-wrapper-sticky" : ""}`}>
				<div className={`footer-container ${this.props.isStickyFooter ? "footer-container-sticky" : ""}`}>
					<div className="footer-container-left">
						<img className="footer-container-left-img" src="./images/shuba.png" alt="nil" onClick={this.props.toggleStickyFooter} />
						<span className="footer-container-left-text">&copy; 2023 Bryan Lu</span>
					</div>
					<div className="footer-container-right">
						<Link className="footer-social-icon" to={"https://github.com/bryanluwz"}><i className="fa fa-github fa-2x" aria-hidden="true" /></Link>
						<Link className="footer-social-icon" to={"https://www.instagram.com/bryanluwezhern/"}><i className="fa fa-instagram fa-2x" aria-hidden="true" /></Link>
						<Link className="footer-social-icon" to={"https://www.linkedin.com/in/bryanluwz/"}><i className="fa fa-linkedin-square fa-2x" aria-hidden="true" /></Link>
					</div>
				</div>
			</div>
		);
	}
}