import { Component, Fragment } from "react";
import Segment from "../segment/Segment";
import { TextTitleCard } from "../titleCards/ImageTextTitleCard";

export default class AboutPage extends Component {
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
					title='about'
				>
					<TextTitleCard title={"Hello there"} backgroundColor={this.getNextBackgroundColor()}>
						annyeong konnichiwa nihao im from malaysia degozaimasuhamida
					</TextTitleCard>
				</Segment>

				<Segment
					title='fun fakts'
				>
					<TextTitleCard title="fakten" backgroundColor={this.getNextBackgroundColor()}>
						catters haz five beans on front scritchers, but four beans on back scritchers
					</TextTitleCard>
				</Segment>

				<Segment
					title='heckin cats'
				>
					<TextTitleCard title="nyein nyein" backgroundColor={this.getNextBackgroundColor()}>
						neko chan kawaiis
						<br />
						猫ちゃんかわいい
					</TextTitleCard>
				</Segment>

				<Segment
					title='Uni Life'
				>
					<TextTitleCard title="NTU is NUTs" backgroundColor={this.getNextBackgroundColor()}>
						the only thing i like about NTU are the cats there
					</TextTitleCard>
				</Segment>
			</Fragment>
		);
	}
}