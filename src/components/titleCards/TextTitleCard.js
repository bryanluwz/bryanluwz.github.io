import { Component } from "react";

import './TitleCards.css';

export class ImageTextTitleCard extends Component {
	render() {
		return (
			<div className="image-text-title-card-container">
				<img className="image-text-title-card-img" src={this.props.imgSrc} alt="idk" />
				<div className="image-text-title-card-text">
					<h1 className="image-text-title-card-text-title">
						{this.props.title}
					</h1>
					<div className="image-text-title-card-text-subtitle">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export class TextTitleCard extends Component {
	render() {
		return (
			<div className="image-text-title-card-container" style={{ backgroundColor: this.props.backgroundColor }}>
				<div className="image-text-title-card-text text-title-card-content">
					<h1 className="image-text-title-card-text-title">
						{this.props.title}
					</h1>
					<div className="image-text-title-card-text-subtitle">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}