import { Component, Fragment } from "react";
import MainTitleCard from '../titleCard/MainTitleCard';
import TitleCard from "../titleCard/TitleCard";
import Carousel from "../carousel/Carousel";

export default class HomePage extends Component {
	render() {
		return (
			<Fragment>
				<Carousel>

				</Carousel>

				<MainTitleCard
					title={"Hello there"}
					subtitle={"general kenobi"}>

				</MainTitleCard>

				<TitleCard>

				</TitleCard>
			</Fragment>
		);
	}
} 