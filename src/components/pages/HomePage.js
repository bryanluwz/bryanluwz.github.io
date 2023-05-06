import { Component, Fragment } from "react";
import HomePageCarousel from "../carousel/HomePageCarousel";
import CarouselCard from "../carousel/CarouselCard";
import Segment from "../segment/Segment";
import { ImageTextTitleCard } from "../titleCards/ImageTextTitleCard";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";
import { extractInfomationFromModule } from "../utils/utils";
import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		console.log(this.props);
	}

	render() {
		return (
			<Fragment>
				{/* Carousel */}
				<HomePageCarousel>
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
				</HomePageCarousel>

				{/* Segment -- Hello there */}
				<Segment
					title={"about"}
				>
					<ImageTextTitleCard
						imgSrc={"./images/shuba.png"}
						title={"Hello there"}
					>
						Hello there!
						<br />
						Welcome to my website!
						<br />
						I sure hope you'll find much fun here.
					</ImageTextTitleCard>
				</Segment>

				{/* Segment - some fun stuff */}
				<Segment
					title={"fun stuff"}
				>
					<GridTitleCardWrapper
						withViewMore={true}
						viewMoreLink={"/fun-stuff"}
					>
						{this.props.gameComponents.slice(0, Math.min(this.props.gameComponents.length, 3)).map((Component, index) => {
							var info = extractInfomationFromModule(Component);
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
					>
						{this.props.uniComponents.slice(0, Math.min(this.props.uniComponents.length, 3)).map((Component, index) => {
							var info = extractInfomationFromModule(Component);
							return (
								< GridTitleCard key={index} link={info.routeLink}
									imgSrc={this.props.uniImages[index]}
									title={info.displayName}
								/>
							);
						})}
					</GridTitleCardWrapper>
				</Segment>

				{/* Segment - others */}
				<Segment
					title={"others"}
				>
					<GridTitleCardWrapper
						withViewMore={true}
						viewMoreLink={"/others"}
					>
						{this.props.othersComponents.slice(0, Math.min(this.props.othersComponents.length, 3)).map((Component, index) => {
							var info = extractInfomationFromModule(Component);
							return (
								< GridTitleCard key={index} link={info.routeLink}
									imgSrc={this.props.othersImages[index]}
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