import { Component, Fragment, createRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import './App.css';
import './components/others/ContentDisplay.css';

import withRouter from './components/utils/withRouter';
import { getRouteLink, parseModule } from './components/utils/moduleLoadUtils';
import { refreshAllCookies, getCookieValue, isCookie, setCookieValue } from './components/utils/cookieMonster';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { TopNavigationBar } from './components/nav';
import { AboutPage, HomePage, Error404Page, DisplayGridPage, OthersPage } from './components/pages';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: false,
			showCookie: !isCookie(),  // to continue show cookie banner or not
			contentTransitionStage: "fadeIn",
			displayLocation: this.props.router.location
		};

		this.headerRef = createRef();

		// Import js, and imgs
		const importAllComponents = (r) => r.keys().map((key) => r(key).default);
		const importAllImages = (r) => r.keys().map((key) => r(key));
		const importAllCSS = (r) => r.keys().map((key) => r(key));

		// Import game components
		this.gameComponents = importAllComponents(require.context(`./components/funStuff`, true, /\.js$/));
		this.gameImages = importAllImages(require.context(`./components/funStuff/images`, true));
		this.gameDictionary = parseModule(this.gameComponents, this.gameImages);
		this.gameStyles = importAllCSS(require.context(`./components/funStuff/styles`, true));

		// Import uni components
		this.uniComponents = importAllComponents(require.context(`./components/uniStuff`, true, /\.js$/));
		this.uniImages = importAllImages(require.context(`./components/uniStuff/images`, true));
		this.uniDictionary = parseModule(this.uniComponents, this.uniImages);
		this.uniStyles = importAllCSS(require.context(`./components/uniStuff/styles`, true));
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
					<Routes>
						{['/', 'fun-stuff', 'others', 'uni-stuff', 'about'].map((path, index) => {
							return (
								<Route key={index} path={path} element={
									<Fragment>
										<Header />
										<TopNavigationBar pathname={this.props.router.location.pathname} />
									</Fragment>} />
							);
						})
						}
					</Routes>

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

							<Route path='/fun-stuff'>
								{
									Object.keys(this.gameDictionary)
										.map((ModuleDisplayName, index) => {
											var moduleInfo = this.gameDictionary[ModuleDisplayName];
											var routeLink = getRouteLink(moduleInfo.routeLink, "/fun-stuff");
											var Comp = moduleInfo.moduleDefault;
											return (
												<Route
													key={index}
													path={routeLink}
													element={
														<Comp router={this.props.router} />
													} />
											);
										})
								}
								<Route
									path="/fun-stuff"
									element={
										<DisplayGridPage
											path="fun-stuff"
											dictionary={this.gameDictionary} />
									}
								/>
							</Route>

							<Route path='/uni-stuff'>
								{
									Object.keys(this.uniDictionary)
										.map((ModuleDisplayName, index) => {
											var moduleInfo = this.uniDictionary[ModuleDisplayName];
											var routeLink = getRouteLink(moduleInfo.routeLink, "/uni-stuff");
											var Comp = moduleInfo.moduleDefault;
											return (
												<Route
													key={index}
													path={routeLink}
													element={
														<Comp router={this.props.router} />
													} />
											);
										})
								}
								<Route
									path="/uni-stuff"
									element={
										<DisplayGridPage
											path="uni-stuff"
											dictionary={this.uniDictionary} />
									}
								/>
							</Route>

							<Route path='/others' element={
								<OthersPage router={this.props.router} />
							} />

							<Route path='/about' element={
								<AboutPage />
							} />

							<Route path='*' element={
								<Fragment>
									<Header />
									<TopNavigationBar pathname={this.props.router.location.pathname} />
									<Error404Page customWarning={"Page not found OAO"} />
									<Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
								</Fragment>
							} />
						</Routes>
					</div>
				</main>

				{/* Footer */}
				<div
					className={`${this.state.contentTransitionStage}`}
					onAnimationEnd={() => {
						if (this.state.contentTransitionStage === "fadeOut") {
							this.setState({ contentTransitionStage: "fadeIn", displayLocation: this.props.router.location });
						}
					}}>
					<Routes>
						{['/', '/fun-stuff', 'others', 'uni-stuff', 'about'].map((path, index) => {
							return (
								<Route key={index} path={path} element={
									< Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />} />
							);
						})
						}
					</Routes>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(App);