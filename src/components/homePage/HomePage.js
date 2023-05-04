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
					<ImageTextTitleCard
						imgSrc={"./images/shuba.gif"}
						title={"hello there"}
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nobis veniam recusandae deleniti perferendis, modi voluptatem excepturi porro, aperiam labore, esse deserunt suscipit consequuntur? Excepturi illo quibusdam dignissimos? Unde, laudantium.
						<br />
						<br />
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat explicabo eligendi asperiores cupiditate atque id voluptatum quasi a reprehenderit modi reiciendis, doloribus, minima porro debitis. Voluptatem similique exercitationem autem quisquam!
						<br />
						<br />
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nisi voluptatem officia expedita fuga, ullam voluptatibus iure eos suscipit dolorum repudiandae perferendis molestias vitae quaerat ipsa distinctio ab vero eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id velit sit illo reiciendis similique voluptatibus aliquid, aperiam ipsa amet ad beatae veritatis? Explicabo ipsam error nulla! Incidunt eaque fugit explicabo.
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

				{/* Segment - uni */}
				<Segment
					title={"uni"}
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