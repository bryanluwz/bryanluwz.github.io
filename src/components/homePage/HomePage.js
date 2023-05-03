import { Component, Fragment } from "react";
import HomePageCarousel from "../carousel/HomePageCarousel";
import CarouselCard from "../carousel/CarouselCard";

import '../carousel/Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Segment from "../segment/Segment";
import { ImageTextTitleCard } from "../titleCards/ImageTextTitleCard";

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
					<ImageTextTitleCard>
						Hello
					</ImageTextTitleCard>
				</Segment>

				{/* Segment - some fun stuff */}
				<Segment
					title={"fun stuff"}
				>
					<div>
						hello
					</div>
				</Segment>

				{/* Segment - quizzes */}
				<Segment
					title={"quizzes"}
				>
					<div>
						hello
					</div>
				</Segment>

				{/* Segment - others */}
				<Segment
					title={"others"}
				>
					<div>
						hello
					</div>
				</Segment>


			</Fragment>
		);
	}
} 