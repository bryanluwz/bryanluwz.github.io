import { Component } from "react";
import { Link } from "react-router-dom";

import './TitleCards.css';

export class GridTitleCardWrapper extends Component {
	render() {
		return (
			<div className="grid-title-cards-wrapper">
				<div className="grid-title-cards-container">
					{this.props.children}
				</div>
				{
					this.props.withViewMore &&
					<Link
						className="grid-title-card-view-more-button"
						to={this.props.viewMoreLink}
					>
						view moar
					</Link>
				}
			</div>
		);
	}
}

export class GridTitleCard extends Component {
	render() {
		return (
			<div
				className="grid-title-card"
			>
				<Link
					to={this.props.link}>
					<img className="grid-title-card-img" src={this.props.imgSrc} alt="idk" />
				</Link>
				<Link
					className="grid-title-card-title"
					to={this.props.link}
				>
					{this.props.title}
				</Link>
			</div >
		);
	}
}