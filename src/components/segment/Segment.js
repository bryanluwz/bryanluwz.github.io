import { Component } from "react";

import "./Segment.css";

export default class Segment extends Component {
	render() {
		return (
			<div className="segment-container">
				<div className="segment-header">
					<div className="segment-header-title">about</div>
				</div>
				<div className="segment-body">
					test body content
					<br />
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit omnis error corrupti consectetur iusto est, doloremque autem assumenda placeat laborum iste accusantium maiores in explicabo veritatis qui adipisci nobis praesentium.
				</div>
			</div>
		);
	}
}