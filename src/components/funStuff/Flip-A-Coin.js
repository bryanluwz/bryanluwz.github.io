import { Component, createRef } from "react";
import { ContentDisplay } from "../others";

import './Flip-A-Coin.css';

export default class FlipACoin extends Component {
	constructor(props) {
		super(props);
		this.coinRef = createRef();
	}

	handleCoinFlipButton = () => {
		this.coinRef.current.flipCoin();
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
						<div className="fac-coin-container">
							<Coin ref={this.coinRef} />
						</div>
						<div className="fac-buttons">
							<button className="fac-button" onClick={this.handleCoinFlipButton}>
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
			coinSide: Math.random() > 0.5 ? "heads" : "tails"
		};
	}

	flipCoin = () => {
		if (this.state.isFlipping) return;

		this.setState({ isFlipping: true });

		var prevCoinSide = this.state.coinSide;
		var coinSide = Math.random() > 0.5 ? "heads" : "tails";

		this.setCoinSide(coinSide);

		console.log(prevCoinSide + " -> " + coinSide);

		setTimeout(() => {
			this.setState({ isFlipping: false });
		}, prevCoinSide === coinSide ? 1000 : 1250);
	};

	getCoinSide = () => {
		return this.state.coinSide;
	};

	setCoinSide = (side) => {
		this.setState({
			coinSide: side
		});
	};

	render() {
		return (
			<div
				className={`fac-coin fac-coin-flipping ${this.state.isFlipping ? '' : 'paused'} ${!this.state.isFlipping ? (this.state.coinSide === 'heads' ? 'fac-coin-heads' : 'fac-coin-tails') : ''}`}
				onAnimationEnd={() => {
					this.setState({
						isFlipping: false
					});
				}}
				onClick={this.flipCoin}
			>
				<div className="fac-coin-heads"></div>
				<div className="fac-coin-tails"></div>
			</div>
		);
	}
}