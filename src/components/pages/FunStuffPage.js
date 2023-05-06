import { Component } from "react";
import Segment from "../segment/Segment";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";

export default class FunStuffPage extends Component {
	render() {
		return (
			<Segment>
				<GridTitleCardWrapper
					minSize={"160px"}
					maxSize={"1fr"}
				>
					{this.props.gameComponents.map((Game, index) => {
						return (
							< GridTitleCard key={index} link={`/fun-stuff/${Game.displayName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
							}
								imgSrc={this.props.gameImages[index]}
								title={Game.displayName.replace(/([a-z])([A-Z])/g, '$1 $2')}
							/>
						);
					})}
				</GridTitleCardWrapper>
			</Segment>
		);
	}
}