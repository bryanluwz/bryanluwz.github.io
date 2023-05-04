import { Component, Fragment } from "react";
import HomePageCarousel from "../carousel/HomePageCarousel";
import CarouselCard from "../carousel/CarouselCard";

import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Segment from "../segment/Segment";
import { ImageTextTitleCard } from "../titleCards/ImageTextTitleCard";
import { GridTitleCard, GridTitleCardWrapper } from "../titleCards/GridTitleCard";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			carouselIndex: 0
		};
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
						title={"hello there"}
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
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"CATGPT =^._.^="}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"scissors paper stone"}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"untitled duck game"}
						/>
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
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"uni github repo"}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"sleeping cat for you to chill"}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"where mrt exit nearest to escalator"}
						/>
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
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"flip a coin"}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"are you fat"}
						/>
						<GridTitleCard
							link={"/"}
							imgSrc={"./images/shuba.png"}
							title={"pop cat"}
						/>
					</GridTitleCardWrapper>
				</Segment>
			</Fragment>
		);
	}
} 