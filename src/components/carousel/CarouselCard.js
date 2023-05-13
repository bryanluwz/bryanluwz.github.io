import { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class CarouselCard extends Component {
	render() {
		return (
			<Fragment>
				{
					this.props.isLink ?
						<Link className="carousel-card" to={this.props.link}>
							<img className="carousel-card-image" src={this.props.imgSrc} alt={this.props.imgAlt} />
						</Link>
						:
						<div className="carousel-card">
							<img className="carousel-card-image" src={this.props.imgSrc} alt={this.props.imgAlt} />
						</div>
				}
			</Fragment>
		);
	}
}