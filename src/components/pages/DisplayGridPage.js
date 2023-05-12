import { Component } from "react";
import { Segment } from "../segment";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards";
import { extractInfomationFromModule } from "../utils/moduleLoadUtils";

export default class DisplayGridPage extends Component {
	constructor(props) {
		super(props);
		this.bgColors = [
			"var(--teal-pastel-1)",
			"var(--blue-pastel-1)",
			"var(--pink-pastel-1)",
			"var(--yellow-pastel-1)"
		];
		this.previousBgColor = -1;
	}

	randomBgColor = () => {
		var nextBgColor = this.previousBgColor;
		while (nextBgColor === this.previousBgColor) {
			nextBgColor = Math.floor((Math.random() * 69420) % this.bgColors.length);
		}
		this.previousBgColor = nextBgColor;
		return this.bgColors[nextBgColor];
	};

	render() {
		return (
			<Segment>
				<GridTitleCardWrapper
					minElemSize={'140px'}
					maxElemSize={'1fr'}
				>
					{this.props.components.map((components, index) => {
						var info = extractInfomationFromModule(components, this.props.path);
						return (
							< GridTitleCard
								key={index}
								link={info.routeLink}
								imgSrc={this.props.images[index]}
								title={info.displayName}
								backgroundColor={this.randomBgColor()}
							/>
						);
					})}
				</GridTitleCardWrapper>
			</Segment>
		);
	}
}