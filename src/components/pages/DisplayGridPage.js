import { Component } from "react";
import Segment from "../segment/Segment";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";
import { extractInfomationFromModule } from "../utils/utils";

export default class DisplayGridPage extends Component {
	render() {
		return (
			<Segment>
				<GridTitleCardWrapper>
					{this.props.components.map((components, index) => {
						var info = extractInfomationFromModule(components);
						return (
							< GridTitleCard key={index} link={info.routeLink}
								imgSrc={this.props.images[index]}
								title={info.displayName}
							/>
						);
					})}
				</GridTitleCardWrapper>
			</Segment>
		);
	}
}