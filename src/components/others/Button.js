import { Component } from "react";
import { removeAllCookies } from "../utils/cookieMonster";

import './Buttons.css';

export class Button extends Component {
	constructor(props) {
		super(props);
		this.buttonName = this.props.buttonName;
		this.buttonClasses = ["button-element"];
	}

	buttonHandlerFunction = () => {
		;
	};

	render() {
		return (
			<div className="button-wrapper">
				<button className="button-element" onClick={this.buttonHandlerFunction}>
					{this.buttonName}
				</button>
			</div>
		);
	}
}

export class DangerousButton extends Component {
	constructor(props) {
		super(props);
		this.buttonName = this.props.buttonName ? this.props.buttonName : "button";
		this.confirmName = this.props.confirmName ? this.props.confirmName : "confirm";
		this.state = {
			isConfirm: false
		};
	}

	handleButtonClick = () => {
		if (!this.state.isConfirm) {
			this.setState({ isConfirm: true }, () => {
				setTimeout(() => {
					this.setState({ isConfirm: false });
				}, 2000);
			});
		}
		else {
			this.buttonHandlerFunction();
		}
	};

	buttonHandlerFunction = () => {
		;
	};

	render() {
		return (
			<div className="button-wrapper">
				<button className={`button-element amnesia-button-element ${this.state.isConfirm ? "amnesia-button-confirm" : ""}`} onClick={this.handleButtonClick}>
					{this.state.isConfirm ? this.confirmName : this.buttonName}
				</button>
			</div>
		);
	}
}

// Custom button to remove everything
export class AmnesiaButton extends DangerousButton {
	buttonHandlerFunction = () => {
		removeAllCookies();
		this.props.router.navigate('/');
		window.location.reload();
	};
}