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
import { AboutPage, HomePage, Error404Page, OthersPage } from '../components/pages';
import DisplayRowPage from '../components/pages/DisplayRowPage';

const linkInfo = require("./linkInfo.json");

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: false,
			showCookie: !isCookie(),  // to continue show cookie banner or not
			contentTransitionStage: "fadeIn",
			displayLocation: this.props.router.location
		};

		this.gameDictionary = linkInfo['fun-stuff'];
		this.uniDictionary = linkInfo['uni-stuff'];

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
		if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
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
					<Header />
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

							<Route path='*' element={
								<Error404Page customWarning={"Page not found OAO"} />
							} />
						</Routes>
					</div>
				</main>

				{/* Footer */}
				{this.state.isStickyFooter ?
					< Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
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