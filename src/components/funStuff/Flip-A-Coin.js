import { Component, createRef } from "react";
import { ContentDisplay } from "../others";

import './Flip-A-Coin.css';

export default class FlipACoin extends Component {
	constructor(props) {
		super(props);
		this.coinRef = createRef();
		this.state = {
			isFlippingButtonClickable: true
		};
	}

	handleCoinFlipButton = () => {
		if (!this.state.isFlippingButtonClickable)
			return;
		this.setState({ isFlippingButtonClickable: false });
		this.coinRef.current.flipCoin();
	};

	setIsFlippingButtonClickable = () => {
		this.setState({ isFlippingButtonClickable: true });
	};

	render() {
		return (
			<ContentDisplay
				backButtonRoute={"/fun-stuff"}
				displayName={FlipACoin.displayName}
				displayClearHistory={false}
				faIcon="fa-plane"
				contentBodyAdditionalClasses={[]}
				router={this.props.router}
				handleHeaderTitleClick={() => { ; }}
				handleDeleteHistoryButton={() => { ; }}
			>
				<div className="fac-wrapper">
					<div className="fac-container">
						<Coin ref={this.coinRef} setIsFlippingButtonClickable={this.setIsFlippingButtonClickable} handleCoinFlip={this.handleCoinFlipButton} />
						<div className="fac-buttons">
							<button className={`fac-button ${!this.state.isFlippingButtonClickable ? "fac-button-flipping" : ""}`} onClick={this.handleCoinFlipButton}>
								Flip
							</button>
						</div>
					</div>
				</div>
			</ContentDisplay>
		);
	}
}

FlipACoin.displayName = "Flip A Coin";

class Coin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFlipping: false,
			coinSide: Math.random() > 0.5 ? "heads" : "tails",
			isIdle: true
		};
	}

	flipCoin = () => {
		if (this.state.isFlipping) return;

		this.setState({ isFlipping: true, isIdle: false });

		setTimeout(() => {
			const coinSide = Math.random() > 0.5 ? "heads" : "tails";
			this.setState({ coinSide: coinSide, isFlipping: false });
			setTimeout(() => {
				this.setState({ isIdle: true });
				setTimeout(() => {
					this.props.setIsFlippingButtonClickable();
				}, 200);
			}, 500);
		}, 1000);
	};

	getCoinSide() {
		return this.state.coinSide;
	}

	render() {
		return (
			<div className="fac-coin-container">
				<div className={`fac-coin ${this.state.isIdle ? "facCoinHover" : this.state.isFlipping ? "facCoinOut" : "facCoinIn"}`}
					onClick={this.props.handleCoinFlip}>
					{this.state.coinSide === 'heads' ?
						<img src="./images/shuba.gif" alt="heads" /> :
						<img src="./images/bathing_chomusuke.png" alt="tails" />
					}
				</div>

				<div className={`fac-coin-side-indicator ${this.state.isFlipping ? "fadeOut" : "fadeIn"}`}>
					{this.state.coinSide}
				</div>
			</div>
		);
	}
}