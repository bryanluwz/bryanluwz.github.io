import { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import './App.css';
import './components/pages/ContentDisplay.css';

import withRouter from './components/utils/withRouter';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/pages/HomePage';
import { TopNavigationBar } from './components/nav/TopNavigationBar';
import Error404page from './components/error404/error404';
import { extractInfomationFromModule } from './components/utils/utils';
import DisplayGridPage from './components/pages/DisplayGridPage';
import { getCookieValue, isCookie, setCookieValue } from './components/utils/cookieMonster';
import AboutPage from './components/pages/AboutPage';
import OthersPage from './components/pages/OthersPage';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: false,
			showCookie: !isCookie(),  // to continue show cookie banner or not
			contentTransitionStage: "fadeIn",
			displayLocation: this.props.router.location
		};

		// Import js, and imgs
		const importAllComponents = (r) => r.keys().map((key) => r(key).default);
		const importAllImages = (r) => r.keys().map((key) => r(key));

		// Import game components
		this.gameComponents = importAllComponents(require.context(`./components/funStuff`, true, /\.js$/));
		this.gameImages = importAllImages(require.context(`./components/funStuff/images`, true));

		// Import uni components
		this.uniComponents = importAllComponents(require.context(`./components/uniStuff`, true, /\.js$/));
		this.uniImages = importAllImages(require.context(`./components/uniStuff/images`, true));
	}

	componentDidMount() {
		const isStickyFooter = getCookieValue("isStickyFooter");
		if (isStickyFooter) {
			this.setState({ isStickyFooter: JSON.parse(isStickyFooter) });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
			this.setState({ contentTransitionStage: "fadeOut" });
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
						location="bottom"
						declineButtonText="heckin naw"
						buttonText="yesh gib cookies"
						visible={this.state.showCookie}
						onAccept={() => { this.setState({ showCookie: false }); localStorage.setItem("isCookieAccepted", JSON.stringify(true)); }}
						onDecline={() => { this.setState({ showCookie: false }); }}
						buttonWrapperClasses='cookie-button-wrapper'
						declineButtonClasses='cookie-button cookie-button-decline'
						buttonClasses="cookie-button"
						containerClasses="cookie-container"
						contentClasses="cookie-content"
					>
						{"you wants cookies for improving user experience?"}
					</CookieConsent>}

				<main>
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
									gameComponents={this.gameComponents}
									gameImages={this.gameImages}
									uniComponents={this.uniComponents}
									uniImages={this.uniImages}
									othersComponents={this.othersComponents}
									othersImages={this.othersImages}
								/>
							} />

							<Route path='/fun-stuff'>
								{this.gameComponents.map((Comp, index) => {
									var info = extractInfomationFromModule(Comp, "/fun-stuff");
									return (
										<Route key={index} path={info.routeLink} element={
											<Comp router={this.props.router} />
										} />
									);
								})}
								<Route path="/fun-stuff" element={<DisplayGridPage path="fun-stuff" components={this.gameComponents} images={this.gameImages} />} />
							</Route>

							<Route path='/uni-stuff'>
								{this.uniComponents.map((Comp, index) => {
									var info = extractInfomationFromModule(Comp, "/uni-stuff");
									return (
										<Route key={index} path={info.routeLink} element={
											<Comp router={this.props.router} />
										} />
									);
								})}
								<Route path="/uni-stuff" element={<DisplayGridPage path="uni-stuff" components={this.uniComponents} images={this.uniImages} />} />
							</Route>

							<Route path='/others' element={
								<OthersPage />
							} />

							<Route path='/about' element={
								<AboutPage />
							} />

							<Route path='*' element={
								<Fragment>
									<Header />
									<TopNavigationBar pathname={this.props.router.location.pathname} />
									<Error404page customWarning={"Page not found OAO"} />
									< Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
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