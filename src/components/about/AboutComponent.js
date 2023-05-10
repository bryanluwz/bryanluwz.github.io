import { Component, Fragment } from "react";
import { ImageTextTitleCard } from "../titleCards/ImageTextTitleCard";

export default class AboutComponent extends Component {
	render() {
		return (
			<ImageTextTitleCard
				imgSrc={"./images/shuba.png"}
				title={this.props.title ? this.props.title : "Hello there"}
			>
				{this.props.children ?
					this.props.children :
					<Fragment>
						Welcome to my website!
						<br />
						I sure hope you'll find much fun here.
					</Fragment>}
			</ImageTextTitleCard>
		);
	}
}