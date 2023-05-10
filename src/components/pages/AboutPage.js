import { Component, Fragment } from "react";
import Segment from "../segment/Segment";

export default class AboutPage extends Component {
	render() {
		return (
			<Fragment>
				<Segment
					title='about'
				>
					annyeong konnichiwa nihao im from malaysia degozaimasuhamida
				</Segment>

				<Segment
					title='fun fakts'
				>
					catters haz five beans on front scritchers, but four beans on back scritchers
				</Segment>

				<Segment
					title='heckin cats'
				>
					placeholder
				</Segment>
			</Fragment>
		);
	}
}