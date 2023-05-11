import { Component, Fragment } from "react";
import Segment from "../segment/Segment";
import { TextTitleCard } from "../titleCards/ImageTextTitleCard";
import { Link } from "react-router-dom";

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
						<span typeof="decimal">thanks to <u><Link to={"https://chat.openai.com"}>chatgpt</Link></u> for being there <i>(and also not being there)</i> when i needed you the most</span>
					</TextTitleCard>
				</Segment>
			</Fragment>
		);
	}
}