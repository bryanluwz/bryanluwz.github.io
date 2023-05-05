import { Component } from "react";
import Segment from "../segment/Segment";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";

export default class FunStuffPage extends Component {
	render() {
		return (
			<Segment>
				<GridTitleCardWrapper>
					{this.props.gameComponents.map((Game, index) => {
						return (
							< GridTitleCard key={index} link={`/fun-stuff/${index}`
							}
								imgSrc={this.props.gameImages.find((imagePath) => (imagePath.includes(Game.name))) === undefined ? "./images/shuba.png" : this.props.gameImages.find((imagePath) => (imagePath.includes(Game.name)))}
								title={Game.name.replace(/([a-z])([A-Z])/g, '$1 $2')}
							/>
						);
					})}
				</GridTitleCardWrapper>
			</Segment>
		);
	}
}