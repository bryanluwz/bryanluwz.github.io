import { Component, Fragment, createRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import './Main.css';
import '../components/appTemplate/AppTemplate.css';
import '../components/others/ContentDisplay.css';

import withRouter from '../components/utils/withRouter';
import { refreshAllCookies, getCookieValue, isCookie, setCookieValue } from '../components/utils/cookieMonster';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { TopNavigationBar } from '../components/nav';
import { Segment } from '../components/segment';
import { AmnesiaButton } from '../components/others';
import { HomePage, Error404Page, NewsPage, DisplayRowPage, DisplayTextTitleCardPage } from '../components/pages';
import { CAROUSEL_JSON_URL, FUN_STUFF_JSON_URL, LOAD_INFO_JSON_URL, NEWS_JSON_URL, CODING_STUFF_JSON_URL } from './constants';

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: false,
			showCookie: !isCookie(),  // to continue show cookie banner or not
			contentTransitionStage: "fadeIn",
			displayLocation: this.props.router.location,
			gameDictionary: {},
			codingDictionary: {},
			carouselDictionary: {},
			newsDictionary: {},
			loadInfoComp: {}
		};

		this.miscDictionary = null;
		this.aboutPageDictionary = null;
		this.othersPageDictionary = null;

		this.headerRef = createRef();
	}

	componentDidMount() {
		// Init sticky footer
		const isStickyFooter = getCookieValue("isStickyFooter");
		if (isStickyFooter) {
			this.setState({ isStickyFooter: JSON.parse(isStickyFooter) });
		}

		// Init dictionaries that are fetched online then
		// Create and sort the dictionaries
		var carouselInfo = null;
		var funStuffInfo = null;
		var codingStuffInfo = null;
		var newsInfo = null;
		var loadInfoComp = null;

		fetch(FUN_STUFF_JSON_URL)
			.then(response => response.json())
			.then(data => {
				funStuffInfo = data;

				const gameDictionary =
					Object.fromEntries(
						Object.entries(funStuffInfo['fun-stuff']).sort(([, itemA], [, itemB]) => {
							return itemA.displayName > itemB.displayName ? 1 : -1;
						})
					);

				this.setState({ gameDictionary: gameDictionary });
			})
			.catch(error => console.log(error));

		fetch(CODING_STUFF_JSON_URL)
			.then(response => response.json())
			.then(data => {
				codingStuffInfo = data;

				const codingDictionary =
					Object.fromEntries(
						Object.entries(codingStuffInfo['uni-stuff']).sort(([, itemA], [, itemB]) => {
							return itemA.displayName > itemB.displayName ? 1 : -1;
						})
					);

				this.setState({ codingDictionary: codingDictionary });
			})
			.catch(error => console.log(error));

		fetch(CAROUSEL_JSON_URL)
			.then(response => response.json())
			.then(data => {
				carouselInfo = data;

				const carouselDictionary = carouselInfo['carousel'];

				this.setState({ carouselDictionary: carouselDictionary });
			})
			.catch(error => console.log(error));

		fetch(NEWS_JSON_URL)
			.then(response => response.json())
			.then(data => {
				newsInfo = data;

				const newsDictionary =
					Object.fromEntries(
						Object.entries(newsInfo['news']).sort(([, newsA], [, newsB]) => {
							const newsDateA = new Date(newsA.lastUpdatedDate);
							const newsDateB = new Date(newsB.lastUpdatedDate);
							return newsDateB - newsDateA;
						})
					);

				this.setState({ newsDictionary: newsDictionary });
			})
			.catch(error => console.log(error));

		fetch(LOAD_INFO_JSON_URL)
			.then(response => response.json())
			.then(data => {
				loadInfoComp = data;
				this.miscDictionary = loadInfoComp['misc'];
				this.aboutPageDictionary = loadInfoComp['about-page'];
				this.othersPageDictionary = loadInfoComp['others-page'];
			})
			.catch(error => console.log(error));

		refreshAllCookies();
	}

	componentDidUpdate(prevProps, prevState) {
		// Set transition stage only if the pathname changes, in the following conditions
		// 1. Pathnames before '/:' (if it exists) are different
		if (this.props.router.location.pathname.split('/:')[0] !== prevProps.router.location.pathname.split('/:')[0]) {
			this.setState({ contentTransitionStage: "fadeOut" });
			this.headerRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	toggleStickyFooter = () => {
		this.setState((prevState) => ({
			isStickyFooter: !prevState.isStickyFooter
		}), () => { setCookieValue("isStickyFooter", this.state.isStickyFooter); });
	};

	render() {
		return (
			<Fragment>
				{/* Cookie monster */}
				{this.state.showCookie &&
					<CookieConsent
						enableDeclineButton
						expires={999}
						location="bottom"
						declineButtonText="heckin naw"
						buttonText="yesh gib cookies"
						cookieName='wantsCookie'
						visible={this.state.showCookie}
						onAccept={() => { this.setState({ showCookie: false }); localStorage.setItem("isCookieAccepted", JSON.stringify(true)); }}
						onDecline={() => { this.setState({ showCookie: false }); }}
						buttonWrapperClasses='cookie-button-wrapper'
						declineButtonClasses='cookie-button cookie-button-decline'
						buttonClasses="cookie-button"
						containerClasses="cookie-container"
						contentClasses="cookie-content"
					>
						{"you wants cookies for beddar user experience?"}
					</CookieConsent>
				}

				<main ref={this.headerRef}>
					{/* Header and top navigation */}
					<Header imgSrc={this.miscDictionary?.header.imgSrc} />
					<TopNavigationBar pathname={this.props.router.location.pathname} />

					{/* Content Pages */}
					<div
						className={`${this.state.contentTransitionStage}`}
						onAnimationEnd={() => {
							if (this.state.contentTransitionStage === "fadeOut") {
								this.setState({ contentTransitionStage: "fadeIn", displayLocation: this.props.router.location });
							}
						}}>
						<Routes location={this.state.displayLocation}>
							<Route path="/" element={
								<HomePage
									gameDictionary={this.state.gameDictionary}
									codingDictionary={this.state.codingDictionary}
									carouselDictionary={this.state.carouselDictionary}
									newsDictionary={this.state.newsDictionary}
									miscDictionary={this.miscDictionary}
								/>
							} />

							<Route path='/others' element={
								<DisplayTextTitleCardPage pageDictionary={this.othersPageDictionary} router={this.props.router} >
									<Segment title="buttons!">
										<AmnesiaButton router={this.props.router} buttonName={"cookie diet"} confirmName={"you sure?"} />
									</Segment>
								</DisplayTextTitleCardPage>
							} />

							<Route path='/about' element={
								<DisplayTextTitleCardPage pageDictionary={this.aboutPageDictionary} />
							} />

							<Route path='/coding-stuff' element={
								<DisplayRowPage dictionary={this.state.codingDictionary} error404ImgSrc={this.miscDictionary?.error404.imgSrc} />
							} />

							<Route path='/fun-stuff' element={
								<DisplayRowPage dictionary={this.state.gameDictionary} error404ImgSrc={this.miscDictionary?.error404.imgSrc} />
							} />

							<Route path='/news/:newsKey?'
								element={
									<NewsPage
										footerRef={this.footerRef}
										dictionary={this.state.newsDictionary}
									/>
								}
							/>

							<Route path='*' element={
								<Error404Page
									customWarning={"Page not found OAO"}
									imgSrc={this.miscDictionary?.error404.imgSrc} />
							} />
						</Routes>
					</div>
				</main>

				{/* Footer */}
				{this.state.isStickyFooter ?
					< Footer ref={this.footerRef} isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
					:
					<div
						className={`${this.state.contentTransitionStage}`}
						onAnimationEnd={() => {
							if (this.state.contentTransitionStage === "fadeOut") {
								this.setState({ contentTransitionStage: "fadeIn", displayLocation: this.props.router.location });
							}
						}}>
						< Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
					</div>
				}
			</Fragment >
		);
	}
}

export default withRouter(Main);