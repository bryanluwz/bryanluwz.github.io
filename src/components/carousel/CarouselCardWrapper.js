import { Component } from "react";
import { Carousel } from "react-responsive-carousel";

export default class CarouselCardWrapper extends Component {
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
					showThumbs={false}

					renderArrowPrev={(clickHandler, hasPrev) => {
						return (
							<button
								className={"control-arrow-custom control-prev-custom"}
								aria-label="previous slide / item"
								onClick={clickHandler}
							>
								<i className="fa fa-angle-left control-arrow-icon fa-2x" aria-hidden="true"></i>
							</button>
						);
					}}

					renderArrowNext={(clickHandler, hasPrev) => {
						return (
							<button
								className={"control-arrow-custom control-next-custom"}
								aria-label="next slide / item"
								onClick={clickHandler}
							>
								<i className="fa fa-angle-right control-arrow-icon fa-2x" aria-hidden="true"></i>
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