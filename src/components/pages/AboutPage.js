import { Component, Fragment } from "react";
import { Segment } from "../segment";
import { TextTitleCard } from "../titleCards";

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
					title='me'
				>
					<TextTitleCard title={"hello there"} backgroundColor={this.getNextBackgroundColor()}>
						<span>annyeong konnichiwa nihao im <b>bryan</b> from malaysia degozaimasuhamida</span>
						<br /><br />
						<span>im currently studying in singapore ntu komputer enginiring course tho</span>
					</TextTitleCard>
				</Segment>

				<Segment
					title='heckin cats'
				>
					<TextTitleCard title="did you knows" backgroundColor={this.getNextBackgroundColor()}>
						catters haz five beans on front scritchers, but only four beans on back scritchers
					</TextTitleCard>
				</Segment>

				<Segment
					title='Uni Life'
				>
					<TextTitleCard title="NTU is NUTs" backgroundColor={this.getNextBackgroundColor()}>
						<span>the only thing i like about ntu are the cats there</span>
						<br />
						<br />
						<i>*cocks pistol*</i>
						<br />
						<br />
						<span><b>LOL</b> I'm just kidding hahaha</span>
						<br /><br />
						<span>NTU is one of the <b>best universities</b> in the world and you should definitely come and study here for a enjoyable experience, yeah totally</span>
					</TextTitleCard>
				</Segment>
			</Fragment>
		);
	}
}