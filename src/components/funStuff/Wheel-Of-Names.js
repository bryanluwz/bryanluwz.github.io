import { Component, createRef } from "react";
import { ContentDisplay } from "../others";
import { Wheel } from "react-custom-roulette";
import { getCookieValue, setCookieValue } from "../utils/cookieMonster";

export default class WheelOfNames extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wheelData: [], // this is the formated array of options that is goin got be passed into the wheel
			data: [], // this is an array of the options
			selectedIndex: -1,
			history: [],
			isSpinning: false
		};

		this.backgroundColors = {
			"--yellow-pastel-1": "#ffefc4",
			"--blue-pastel-1": "#def8ff",
			"--pink-pastel-1": "#ffeeed",
			"--teal-pastel-1": "#e4fbf7",
		};
		this.textColors = { "--lavender-pastel-font-1": "#5d4542" };

		this.optionsInputTextareaRef = createRef();

		this.cookieName = "wheelOfNames";
	}

	componentDidMount() {
		this.handleOptionsUpdate();
		const wheelOfNamesData = getCookieValue(this.cookieName);
		if (wheelOfNamesData) {
			if (wheelOfNamesData.data) {
				this.setState({ data: wheelOfNamesData.data });
				this.optionsInputTextareaRef.current.value = wheelOfNamesData.data.join("\n");
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.data !== this.state.data) {
			this.handleOptionsUpdate();
			this.setStoredOptions(this.state.data);
		}
	}

	// Spin button / functionality handler functions
	handleSpinButton = () => {
		if (!this.state.isSpinning && this.state.data.length !== 0) {
			this.setState({
				selectedIndex: Math.floor((Math.random() * this.state.wheelData.length * 69420) % this.state.wheelData.length),
				isSpinning: true
			});
		}
	};

	resetSpinButton = () => {
		if (this.state.isSpinning) {
			this.setState({ isSpinning: false });
		}
	};

	// History
	updateHistory = () => {

	};

	handleDeleteHistoryButton = () => {
		this.setState({ history: [] });
	};

	// Handle wheel customisation / update
	handleOptionsUpdate = () => {
		const wheelData = [];
		this.state.data.forEach(option => {
			var existIndex = wheelData.findIndex(obj => obj.option === option);
			if (existIndex !== -1) {
				wheelData[existIndex].optionSize++;
			}
			else {
				wheelData.push({ option: option, image: "", style: {}, optionSize: 1 });
			}
		});

		if (wheelData.length === 0) {
			wheelData.push({ option: "", image: "", style: {}, optionSize: 1 });
		}

		this.setState({ wheelData: wheelData });
	};

	// Handle textarea display & functionality
	handleOptionsInputTextareaChange = () => {
		const nextData = this.optionsInputTextareaRef.current.value.split("\n")
			.map(option => option.trim())
			.filter(option => option !== '')
			.map(option => option.length > 10 ? option.substring(0, 10) + '...' : option);

		this.setState({ data: nextData });
	};

	// Handle other buttons
	handleClearTextareaButton = () => {
		this.optionsInputTextareaRef.current.value = "";
		this.handleOptionsInputTextareaChange();
	};

	// Handle stored data
	getStoredOptions = () => {
		const data = getCookieValue(this.cookieName);
		if (data) {
			if (data.data)
				return data.data;
		}
	};

	setStoredOptions = (nextData) => {
		const data = getCookieValue(this.cookieName);
		if (data) {
			data.data = nextData;
			setCookieValue(this.cookieName, data);
		}
		else {
			setCookieValue(this.cookieName, { data: data });
		}
	};

	render() {
		return (
			<ContentDisplay
				backButtonRoute={"/fun-stuff"}
				displayName={WheelOfNames.displayName}
				displayClearHistory={true}
				faIcon="fa-trash"
				contentBodyAdditionalClasses={[]}
				router={this.props.router}
				handleHeaderTitleClick={() => { ; }}
				handleDeleteHistoryButton={this.handleDeleteHistoryButton}
			>
				<div className="won-wrapper">
					{/* These containers will appear side by side, unless second container hidden, then main will be middle*/}
					<div className="won-main-container">
						<div className="won-wheel-container">
							{/* This is where the wheel will be in */}
							<Wheel
								mustStartSpinning={this.state.isSpinning}
								prizeNumber={this.state.selectedIndex}
								data={this.state.wheelData}
								onStopSpinning={this.resetSpinButton}
								disableInitialAnimation
								spinDuration={0.69}

								pointerProps={{ src: "./images/shuba.png", style: { userSelect: "none" } }}

								radiusLineWidth={0}
								outerBorderColor="none"

								fontFamily="Poppins"

								backgroundColors={Object.values(this.backgroundColors)}
								textColors={Object.values(this.textColors)}
							/>
						</div>
						<button
							className={`won-spin-button ${(this.state.isSpinning || this.state.data.length === 0) ? 'won-spin-button-spinning' : ''}`}
							onClick={this.handleSpinButton}>
							SPIN
						</button>
					</div>

					{/* In mobile no hiding just scrolling */}
					<div className="won-info-container" >
						<div className="won-info-header">
							<button className="won-function-button">Hide</button>
							<button
								className="won-function-button"
								onClick={this.handleClearTextareaButton}
							>
								clear
							</button>
						</div>
						{/* only body hidable */}
						<div className="won-info-body">
							<div className="won-info">
								{/* Other functions (sort, shuffle) might be added here in the future */}
								<textarea
									ref={this.optionsInputTextareaRef}
									className="won-options-container"
									placeholder="Enter your options here"
									onKeyDown={(evt) => { if (evt.key === 'Enter') this.handleOptionsInputTextareaChange(); }}
								/>
							</div>
							<div className="won-history">
								<div className="won-history-header">
									<div className="won-history-title">
										wheel history
									</div>
									<button
										className="won-function-button"
										onClick={this.handleDeleteHistoryButton}
									>
										clear history
									</button>
								</div>
								<div className="won-history-record">
									record here
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContentDisplay >
		);
	}
}

WheelOfNames.displayName = "Wheel of Names";
