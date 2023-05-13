import { Component, Fragment } from "react";
import { Segment } from "../segment";
import { TextTitleCard } from "../titleCards";
import { Link } from "react-router-dom";
import { AmnesiaButton } from "../others";

export default class OthersPage extends Component {
	constructor(props) {
		super(props);
		this.bgColors = [
			"var(--teal-pastel-1)",
			"var(--blue-pastel-1)",
			"var(--pink-pastel-1)",
			"var(--yellow-pastel-1)"
		];
		this.bgColorsIndex = 0;
	}

	getNextBackgroundColor = () => {
		var bgColor = this.bgColors[this.bgColorsIndex];
		this.bgColorsIndex = (this.bgColorsIndex + 1) % this.bgColors.length;
		return bgColor;
	};

	render() {
		return (
			<Fragment>
				<Segment
					title='arigatou'
				>
					<TextTitleCard title="Reference Images" backgroundColor={this.getNextBackgroundColor()}>
						<ol style={{ listStyleType: 'decimal', margin: 0 }}>
							<li style={{ paddingLeft: "5px" }}>Not done yet</li>
							<li style={{ paddingLeft: "5px" }}>Not done yet</li>
						</ol>
					</TextTitleCard>

					<TextTitleCard title="Pusheen" backgroundColor={this.getNextBackgroundColor()}>
						<span>thanks to <u><Link to={"https://pusheen.com"}>pusheen.com</Link></u> for inspiration <i>(and also i used some of the images there as placeholder images {">_<"})</i></span>
					</TextTitleCard>

					<TextTitleCard title="ChatGPT" backgroundColor={this.getNextBackgroundColor()}>
						<span>thanks to <u><Link to={"https://chat.openai.com"}>chatgpt</Link></u> for being there <i>(and also not being there)</i> when i needed you the most</span>
					</TextTitleCard>
				</Segment>

				<Segment title="information">
					<TextTitleCard title="Cookies" backgroundColor={this.getNextBackgroundColor()}>
						<span>just like real-life cookies, our cookies does not last forever, expiration also depends on browser's configuration</span>
						<br /><br />
						<span>however, the cookies' expiration would be extended every time you come and visit :3</span>
						<br /><br />
						<span>if you don't want the cookies anymore, please go on a cookie diet ↓</span>
					</TextTitleCard>
				</Segment>

				<Segment title="buttons!">
					<AmnesiaButton router={this.props.router} buttonName={"cookie diet"} confirmName={"you sure?"} />
				</Segment>
			</Fragment >
		);
	}
}