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
import { AboutPage, HomePage, Error404Page, OthersPage, NewsPage } from '../components/pages';
import DisplayRowPage from '../components/pages/DisplayRowPage';

const carouselInfo = require("./carousel.json");
const funStuffInfo = require("./funStuff.json");
const uniStuffInfo = require("./uniStuff.json");
const newsInfo = require("./news.json");
const loadInfoComp = require("../components/loadInfo.json");

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: false,
			showCookie: !isCookie(),  // to continue show cookie banner or not
			contentTransitionStage: "fadeIn",
			displayLocation: this.props.router.location
		};

		this.gameDictionary =
			Object.fromEntries(
				Object.entries(funStuffInfo['fun-stuff']).sort(([, itemA], [, itemB]) => {
					return itemA.displayName > itemB.displayName ? 1 : -1;
				})
			);

		this.uniDictionary =
			Object.fromEntries(
				Object.entries(uniStuffInfo['uni-stuff']).sort(([, itemA], [, itemB]) => {
					return itemA.displayName > itemB.displayName ? 1 : -1;
				})
			);

		this.carouselDictionary = carouselInfo['carousel'];

		this.newsDictionary =
			Object.fromEntries(
				Object.entries(newsInfo['news']).sort(([, newsA], [, newsB]) => {
					const newsDateA = new Date(newsA.lastUpdatedDate);
					const newsDateB = new Date(newsB.lastUpdatedDate);
					return newsDateB - newsDateA;
				})
			);

		this.miscDictionary = loadInfoComp['misc'];

		this.headerRef = createRef();
	}

	componentDidMount() {
		const isStickyFooter = getCookieValue("isStickyFooter");
		if (isStickyFooter) {
			this.setState({ isStickyFooter: JSON.parse(isStickyFooter) });
		}

		refreshAllCookies();
	}

	componentDidUpdate(prevProps, prevState) {
		// Change only if the pathname changes, given that (colon is for news id)
		// The previous pathname and the new one both does not have a colon, OR
		// The previous pathname does not contain a colon, and the new one does have a colon
		// Basically only ignore when both pathname has a colon after '/news/
		if (this.props.router.location.pathname !== prevProps.router.location.pathname &&
			!(this.props.router.location.pathname.includes('/news/:') && prevProps.router.location.pathname.includes('/news/:'))) {
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
					</CookieConsent>}

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
									gameDictionary={this.gameDictionary}
									uniDictionary={this.uniDictionary}
									carouselDictionary={this.carouselDictionary}
									newsDictionary={this.newsDictionary}
									miscDictionary={this.miscDictionary}
								/>
							} />

							<Route path='/others' element={
								<OthersPage router={this.props.router} />
							} />

							<Route path='/about' element={
								<AboutPage />
							} />

							<Route path='/uni-stuff' element={
								<DisplayRowPage dictionary={this.uniDictionary} />
							} />

							<Route path='/fun-stuff' element={
								<DisplayRowPage dictionary={this.gameDictionary} />
							} />

							<Route path='/news/:newsKey?'
								element={
									<NewsPage
										footerRef={this.footerRef}
										dictionary={this.newsDictionary}
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