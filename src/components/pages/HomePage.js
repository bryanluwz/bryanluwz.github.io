import { Component, Fragment } from "react";
import HomePageCarousel from "../carousel/HomePageCarousel";
import CarouselCard from "../carousel/CarouselCard";
import Segment from "../segment/Segment";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";
import { extractInfomationFromModule } from "../utils/utils";
import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AboutComponent from "../about/AboutComponent";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
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
					<AboutComponent title={"Hello there"} >
						<span>Oh, hey, didn't see you there!</span>
						<br />
						<br />
						<span>Welcome to my website • ω •</span>
						<br />
						<br />
						<Link to={"/about"}>moar info</Link>
					</AboutComponent>
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

				{/* Segment - others */}
				<Segment
					title={"others"}
				>
					<GridTitleCardWrapper
						withViewMore={true}
						viewMoreLink={"/others"}
						minElemSize={'140px'}
						maxElemSize={'1fr'}
					>
						{this.props.othersComponents.slice(0, Math.min(this.props.othersComponents.length, 4)).map((Comp, index) => {
							var info = extractInfomationFromModule(Comp, "others");
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