import { Component, Fragment } from "react";
import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import { CarouselCard, CarouselCardWrapper } from "../carousel";
import { Segment } from "../segment";
import { GridTitleCard, GridTitleCardWrapper, ImageTextTitleCard } from "../titleCards";
import { extractInfomationFromModule } from "../utils/moduleLoadUtils";

export default class HomePage extends Component {
	render() {
		return (
			<Fragment>
				{/* Carousel */}
				<CarouselCardWrapper>
					<CarouselCard
						isLink={true}
						link={"/funStuff"}
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
						{this.props.gameComponents.slice(0, Math.min(this.props.gameComponents.length, 4)).map((Comp, index) => {
							var info = extractInfomationFromModule(Comp, "fun-stuff");
							return (
								< GridTitleCard key={index} link={info.routeLink}
									imgSrc={this.props.gameImages[index]}
									title={info.displayName}
								/>
							);
						})}
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
						{this.props.uniComponents.slice(0, Math.min(this.props.uniComponents.length, 4)).map((Comp, index) => {
							var info = extractInfomationFromModule(Comp, "uni-stuff");
							return (
								< GridTitleCard key={index} link={info.routeLink}
									imgSrc={this.props.uniImages[index]}
									title={info.displayName}
								/>
							);
						})}
					</GridTitleCardWrapper>
				</Segment>
			</Fragment>
		);
	}
} 