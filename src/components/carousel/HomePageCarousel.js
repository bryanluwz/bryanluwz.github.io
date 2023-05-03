import { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class HomePageCarousel extends Component {
	render() {
		return (
			<div className="carousel-main-container">
				<Carousel
					showArrows={true}
					showStatus={false}
					showIndicators={false}
					autoPlay={true}
					infiniteLoop={true}
					emulateTouch
					swipeable
					stopOnHover={false}
					interval={8000}
					transitionTime={500}

					renderArrowPrev={(clickHandler, hasPrev) => {
						return (
							<button
								className={"control-arrow-custom control-prev-custom"}
								ariaLabel="previous slide / item"
								onClick={clickHandler}
							>
								<i class="fa fa-angle-left control-arrow-icon fa-2x" aria-hidden="true"></i>
							</button>
						);
					}}

					renderArrowNext={(clickHandler, hasPrev) => {
						return (
							<button
								className={"control-arrow-custom control-next-custom"}
								ariaLabel="next slide / item"
								onClick={clickHandler}
							>
								<i class="fa fa-angle-right control-arrow-icon fa-2x" aria-hidden="true"></i>
							</button>
						);
					}}

					className="carousel-container">
					{this.props.children}
				</Carousel>
			</div>
		);
	}
}