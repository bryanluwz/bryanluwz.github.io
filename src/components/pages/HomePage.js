import { Component, Fragment } from "react";
import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import { CarouselCard, CarouselCardWrapper } from "../carousel";
import { Segment } from "../segment";
import { GridTitleCard, GridTitleCardWrapper, ImageTextTitleCard } from "../titleCards";
import { getRouteLink } from "../utils/moduleLoadUtils";

export default class HomePage extends Component {
	render() {
		return (
			<Fragment>
				{/* Carousel */}
				<CarouselCardWrapper>
					<CarouselCard
						isLink={true}
						link={"/fun-stuff"}
						imgSrc={"./images/testimg1.webp"}
						imgAlt={"nil"}
					/>
					<CarouselCard
						isLink={false}
						link={""}
						imgSrc={"./images/testimg2.webp"}
						imgAlt={"nil"}
					/>
				</CarouselCardWrapper>

				{/* Segment -- Hello there */}
				<Segment
					title={"about"}
				>
					<ImageTextTitleCard
						imgSrc={"./images/shuba.png"}
						title={"Hello there"}
					>
						<span>Oh, hey, didn't see you there!</span>
						<br />
						<br />
						<span>Welcome to my website • ω •</span>
						<br />
						<br />
						<Link to={"/about"}><u>moar info</u></Link>
					</ImageTextTitleCard>
				</Segment>

				{/* Segment - some fun stuff */}
				<Segment
					title={"fun stuff"}
				>
					<GridTitleCardWrapper
						withViewMore={true}
						viewMoreLink={"/fun-stuff"}
						minElemSize={'140px'}
						maxElemSize={'1fr'}
					>
						{
							Object.keys(this.props.gameDictionary)
								.slice(0, Math.min(Object.keys(this.props.gameDictionary).length, 4))
								.map((ModuleDisplayName, index) => {
									var moduleInfo = this.props.gameDictionary[ModuleDisplayName];
									var routeLink = getRouteLink(moduleInfo.routeLink, "/fun-stuff");
									return (
										< GridTitleCard
											key={index}
											link={routeLink}
											imgSrc={moduleInfo.icon}
											title={moduleInfo.displayName}
										/>
									);
								})
						}
					</GridTitleCardWrapper>
				</Segment>

				{/* Segment - uni */}
				<Segment
					title={"uni"}
				>
					<GridTitleCardWrapper
						withViewMore={true}
						viewMoreLink={"/uni-stuff"}
						minElemSize={'140px'}
						maxElemSize={'1fr'}
					>
						{
							Object.keys(this.props.uniDictionary)
								.slice(0, Math.min(Object.keys(this.props.uniDictionary).length, 4))
								.map((ModuleDisplayName, index) => {
									var moduleInfo = this.props.uniDictionary[ModuleDisplayName];
									var routeLink = getRouteLink(moduleInfo.routeLink, "/uni-stuff");
									return (
										< GridTitleCard
											key={index}
											link={routeLink}
											imgSrc={moduleInfo.icon}
											title={moduleInfo.displayName}
										/>
									);
								})
						}
					</GridTitleCardWrapper>
				</Segment>
			</Fragment>
		);
	}
} 