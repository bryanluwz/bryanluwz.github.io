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
import { CAROUSEL_JSON_URL, FUN_STUFF_JSON_URL, LOAD_INFO_JSON_URL, NEWS_JSON_URL, GITHUB_USERNAME, EXTRAS_JSON_URL } from './constants';
import { formatRepoName } from './utils';
import { Fade } from 'react-reveal';

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
			scrollToTopButtonIsVisible: false
		};

		this.miscDictionary = null;
		this.aboutPageDictionary = null;
		this.othersPageDictionary = null;

		this.headerRef = createRef();
		this.scrollToTopButtonRef = createRef();
	}

	componentDidMount() {
		// Add event listener
		window.addEventListener('scroll', this.handleScroll);

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

		fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
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

		fetch(EXTRAS_JSON_URL)
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

		fetch(CAROUSEL_JSON_URL)
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

	componentWillUnmount() {
		// Remove event listener
		window.removeEventListener('scroll', this.handleScroll);
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
		console.log(footerRect.top);

		if (footerRect.top < window.innerHeight) {
			const offset = Math.max(0, window.innerHeight - footerRect.top);
			this.scrollToTopButtonRef.current.style.bottom = (offset + 17) + "px";
		}
		else {
			this.scrollToTopButtonRef.current.style.bottom = "17px";
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
					<Header imgSrc={this.miscDictionary?.header.imgSrc} />
					<TopNavigationBar
						pathname={this.props.router.location.pathname}
						navs={
							{
								"/about": { name: "About", link: "/about" },
								"/fun-stuff": { name: "Fun", link: "/fun-stuff" },
								"/coding-stuff": { name: "Code", link: "/coding-stuff" },
								"/extras-stuff": { name: "Extras", link: "/extras-stuff" },
								"/news": { name: "News", link: "/news" },
								"/others": { name: "Others", link: "/others" }
							}
						}
					/>

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
									carouselDictionary={this.state.carouselDictionary}
									gameDictionary={this.state.gameDictionary}
									codingDictionary={this.state.codingDictionary}
									newsDictionary={this.state.newsDictionary}
									extrasDictionary={this.state.extrasDictionary}
									miscDictionary={this.miscDictionary}
								/>
							} />

							<Route path='/others' element={
								<DisplayTextTitleCardPage pageDictionary={this.othersPageDictionary} router={this.props.router} animation={true} left >
									<Segment title="buttons!">
										<Fade bottom>
											<AmnesiaButton router={this.props.router} buttonName={"cookie diet"} confirmName={"you sure?"} />
										</Fade>
									</Segment>
								</DisplayTextTitleCardPage>
							} />

							<Route path='/about' element={
								<DisplayTextTitleCardPage pageDictionary={this.aboutPageDictionary} animation={true} left />
							} />

							<Route path='/coding-stuff' element={
								<DisplayRowPage dictionary={this.state.codingDictionary} error404ImgSrc={this.miscDictionary?.error404.imgSrc} animation={true} left />
							} />

							<Route path='/fun-stuff' element={
								<DisplayRowPage dictionary={this.state.gameDictionary} error404ImgSrc={this.miscDictionary?.error404.imgSrc} animation={true} left />
							} />

							<Route path='/extras-stuff' element={
								<DisplayRowPage dictionary={this.state.extrasDictionary} error404ImgSrc={this.miscDictionary?.error404.imgSrc} animation={true} left />
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