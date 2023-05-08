import { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

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

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isStickyFooter: true
		};

		// Import js, and imgs
		const importAllComponents = (r) => r.keys().map((key) => r(key).default);
		const importAllImages = (r) => r.keys().map((key) => r(key));

		// Import game components
		this.gameComponents = importAllComponents(require.context(`./components/funStuff`, true, /\.js$/));
		this.gameImages = importAllImages(require.context(`./components/funStuff/images`, true));

		// Import uni components
		this.uniComponents = importAllComponents(require.context(`./components/uniStuff`, true, /\.js$/));
		this.uniImages = importAllImages(require.context(`./components/funStuff/images`, true));

		// Import others components
		this.othersComponents = importAllComponents(require.context(`./components/others/`, true, /\.js$/));
		this.othersImages = importAllImages(require.context(`./components/others/images`, true));
	}

	toggleStickyFooter = () => {
		this.setState((prevState) => ({
			isStickyFooter: !prevState.isStickyFooter
		}));
	};

	render() {
		return (
			<Fragment>
				{/* Header and top navigation */}
				<Routes>
					{['/', '/fun-stuff', 'others', 'uni-stuff'].map((path, index) => {
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
				<Routes>
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

					<Route path='/others'>
						{this.othersComponents.map((Comp, index) => {
							var info = extractInfomationFromModule(Comp, "/others");
							return (
								<Route key={index} path={info.routeLink} element={
									<Comp router={this.props.router} />
								} />
							);
						})}
						<Route path="/others" element={<DisplayGridPage path="others" components={this.othersComponents} images={this.othersImages} />} />
					</Route>

					<Route path='*' element={
						<Error404page customWarning={"Page not found OAO"} />
					} />
				</Routes>

				{/* Footer */}
				<Routes>
					{['/', '/fun-stuff', 'others', 'uni-stuff'].map((path, index) => {
						return (
							<Route key={index} path={path} element={
								< Footer isStickyFooter={this.state.isStickyFooter} toggleStickyFooter={this.toggleStickyFooter} />} />
						);
					})
					}
				</Routes>
			</Fragment>
		);
	}
}

export default withRouter(App);