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
import { ProgressBar } from '../components/others';
import { HomePage, Error404Page, NewsPage, DisplayRowPage, AboutPage, OthersPage } from '../components/pages';
import { CAROUSEL_JSON_URL, FUN_STUFF_JSON_URL, LOAD_INFO_JSON_URL, NEWS_JSON_URL, GITHUB_USERNAME, EXTRAS_JSON_URL } from './constants';
import { formatRepoName } from './utils';

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
			extrasDictionary: {},
			loadInfoComp: {},
			scrollToTopButtonIsVisible: false,
			showHamburger: false,
			isFetchDone: false
		};

		this.navs = {
			"/": { name: "Home", link: "/", hideInNavBar: true },
			"/about": { name: "About", link: "/about" },
			"/fun-stuff": { name: "Fun", link: "/fun-stuff" },
			"/coding-stuff": { name: "Code", link: "/coding-stuff" },
			"/extras-stuff": { name: "Extras", link: "/extras-stuff" },
			"/news": { name: "News", link: "/news" },
			"/others": { name: "Others", link: "/others" },
		};

		this.miscDictionary = null;

		this.headerRef = createRef();
		this.loadingProgressRef = createRef();
		this.scrollToTopButtonRef = createRef();
	}

	componentDidMount() {
		// Add event listener
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleResize);

		this.handleResize();

		// Init sticky footer
		const isStickyFooter = getCookieValue("isStickyFooter");
		if (isStickyFooter) {
			this.setState({ isStickyFooter: JSON.parse(isStickyFooter) });
		}

		// Init dictionaries that are fetched online then
		// Create and sort the dictionaries
		var carouselInfo = null;
		var funStuffInfo = null;
		var newsInfo = null;
		var extrasStuffInfo = null;
		var loadInfoComp = null;

		(async () => {
			this.loadingProgressRef.current?.setProgress(0.1);

			await fetch(FUN_STUFF_JSON_URL)
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

			this.loadingProgressRef.current?.setProgress(0.3);

			await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
				.then(response => response.json())
				.then(data => {
					const codingDictionary = {};
					data.forEach(repo => {
						const { name, description, pushed_at, html_url } = repo;

						const formattedName = formatRepoName(name);

						// Format the last updated date
						const formattedDate = new Date(pushed_at).toLocaleDateString('en-UK', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						});

						codingDictionary[name] = {
							displayName: formattedName,
							subtitle: description,
							lastUpdatedDate: formattedDate,
							routeLink: html_url
						};
					});
					this.setState({ codingDictionary: codingDictionary });
				})
				.catch(error => {
					console.error('Error:', error);
				});

			this.loadingProgressRef.current?.setProgress(0.5);

			await fetch(EXTRAS_JSON_URL)
				.then(response => response.json())
				.then(data => {
					extrasStuffInfo = data;

					const extrasDictionary = Object.fromEntries(
						Object.entries(extrasStuffInfo['extras-stuff']).sort(([, itemA], [, itemB]) => {
							return itemA.displayName > itemB.displayName ? 1 : -1;
						})
					);

					this.setState({ extrasDictionary: extrasDictionary });
				})
				.catch(error => {
					console.log(error);
				});

			this.loadingProgressRef.current?.setProgress(0.69);  // nice

			await fetch(CAROUSEL_JSON_URL)
				.then(response => response.json())
				.then(data => {
					carouselInfo = data;

					const carouselDictionary = carouselInfo['carousel'];

					const shuffledCarouselDictionary = Object.fromEntries(
						Object.entries(carouselDictionary).sort(() => Math.random() - 0.5)
					);

					this.setState({ carouselDictionary: shuffledCarouselDictionary });
				})
				.catch(error => console.log(error));

			this.loadingProgressRef.current?.setProgress(0.8);

			await fetch(NEWS_JSON_URL)
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

			this.loadingProgressRef.current?.setProgress(0.9);

			await fetch(LOAD_INFO_JSON_URL)
				.then(response => response.json())
				.then(data => {
					loadInfoComp = data;
					this.miscDictionary = loadInfoComp['misc'];
				})
				.catch(error => console.log(error));

			this.loadingProgressRef.current?.setProgress(1.0);

			setTimeout(() => {
				this.setState({ isFetchDone: true });
			}, 100);
		})();

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

	componentWillUnmount() {
		// Remove event listener
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleResize);
	}

	toggleStickyFooter = () => {
		this.setState((prevState) => ({
			isStickyFooter: !prevState.isStickyFooter
		}), () => {
			setCookieValue("isStickyFooter", this.state.isStickyFooter);
			this.handleScroll();
		});
	};

	handleScroll = () => {
		if (window.scrollY > 300) {
			this.scrollToTopButtonRef.current.style.opacity = 1;
			this.scrollToTopButtonRef.current.style.transform = "scale(100%)";
			this.scrollToTopButtonRef.current.style.pointerEvents = "all";
		} else {
			this.scrollToTopButtonRef.current.style.opacity = 0;
			this.scrollToTopButtonRef.current.style.transform = "scale(0%)";
			this.scrollToTopButtonRef.current.style.pointerEvents = "none";
		}

		// Get bounding client rect from footer
		const footerRect = document.getElementById("footer").getBoundingClientRect();

		if (footerRect.top < window.innerHeight) {
			const offset = Math.max(0, window.innerHeight - footerRect.top);
			this.scrollToTopButtonRef.current.style.bottom = (offset + 17) + "px";
		}
		else {
			this.scrollToTopButtonRef.current.style.bottom = "17px";
		}
	};

	handleResize = () => {
		// Check if width is greater than 666px
		// Only set state if the state is different
		if (window.innerWidth > 666) {
			if (this.state.showHamburger) {
				this.setState({ showHamburger: false });
			}
		}
		else {
			if (!this.state.showHamburger) {
				this.setState({ showHamburger: true });
			}
		}
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
					<Header
						imgSrc={this.miscDictionary?.header.imgSrc}
						showHamburger={this.state.showHamburger}
						navs={this.navs}
					/>
					{!this.state.showHamburger &&
						<TopNavigationBar
							pathname={this.props.router.location.pathname}
							navs={this.navs}
						/>
					}

					{/* Content Pages */}

					<div
						className={`${this.state.contentTransitionStage} ${this.state.isFetchDone ? "" : "loading-icon-container"}`}
						onAnimationEnd={() => {
							if (this.state.contentTransitionStage === "fadeOut") {
								this.setState({ contentTransitionStage: "fadeIn", displayLocation: this.props.router.location });
							}
						}}>
						{this.state.isFetchDone ?
							<Routes location={this.state.displayLocation}>
								<Route path="/" element={
									<HomePage
										carouselDictionary={this.state.carouselDictionary}
										gameDictionary={this.state.gameDictionary}
										codingDictionary={this.state.codingDictionary}
										newsDictionary={this.state.newsDictionary}
										extrasDictionary={this.state.extrasDictionary}
										miscDictionary={this.miscDictionary}
									/>
								} />

								<Route path='/others' element={
									<OthersPage
										router={this.props.router}
										animation={true}
									/>
								} />

								<Route path='/about' element={
									<AboutPage animation={true} />
								} />

								<Route path='/coding-stuff' element={
									<DisplayRowPage
										dictionary={this.state.codingDictionary}
										error404ImgSrc={this.miscDictionary?.error404.imgSrc}
										animation={true} />
								} />

								<Route path='/fun-stuff' element={
									<DisplayRowPage
										dictionary={this.state.gameDictionary}
										error404ImgSrc={this.miscDictionary?.error404.imgSrc}
										animation={true} />
								} />

								<Route path='/extras-stuff' element={
									<DisplayRowPage
										dictionary={this.state.extrasDictionary}
										error404ImgSrc={this.miscDictionary?.error404.imgSrc}
										animation={true} />
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
							:
							<Fragment>
								<div>Loading...</div>
								<ProgressBar ref={this.loadingProgressRef} />
							</Fragment>
						}
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
						< Footer ref={this.footerRef} isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />
					</div>
				}

				<button
					ref={this.scrollToTopButtonRef}
					className={`scroll-to-top-button ${this.state.scrollToTopButtonIsVisible ? "scroll-to-top-button-visible" : ""}`}
					onClick={() => {
						this.headerRef.current?.scrollIntoView({ behavior: 'smooth' });
					}
					}
				>
					<i className="fa fa-chevron-up" />
				</button>
			</Fragment >
		);
	}
}

export default withRouter(Main);