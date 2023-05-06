import { Component, Fragment } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

import './App.css';
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

		// Import game components
		const importAllGameComponents = (r) => r.keys().map((key) => r(key).default);
		this.gameComponents = importAllGameComponents(require.context('./components/funStuff', true, /\.js$/));

		const importAllGameImages = (r) => r.keys().map((key) => r(key));
		this.gameImages = importAllGameImages(require.context('./components/funStuff/images', true));

		// Import uni components
		const importAllUniComponents = (r) => r.keys().map((key) => r(key).default);
		this.uniComponents = importAllUniComponents(require.context('./components/uniStuff', true, /\.js$/));

		const importAllUniImages = (r) => r.keys().map((key) => r(key));
		this.uniImages = importAllUniImages(require.context('./components/uniStuff/images', true));

		// Import others components
		const importAllOthersComponents = (r) => r.keys().map((key) => r(key).default);
		this.othersComponents = importAllOthersComponents(require.context('./components/others', true, /\.js$/));

		const importAllOthersImages = (r) => r.keys().map((key) => r(key));
		this.othersImages = importAllOthersImages(require.context('./components/others/images', true));
	}

	render() {
		return (
			<Fragment>
				{/* Header and top navigation */}
				<Header />
				<TopNavigationBar pathname={this.props.router.location.pathname} />

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
						{this.gameComponents.map((Component, index) => {
							var info = extractInfomationFromModule(Component);
							return (
								<Route key={index} path={info.routeLink} element={
									<Component />
								} />
							);
						})}
						<Route path="/fun-stuff" element={<DisplayGridPage components={this.gameComponents} images={this.gameImages} />} />
					</Route>

					<Route path='/uni-stuff'>
						{this.uniComponents.map((Component, index) => {
							var info = extractInfomationFromModule(Component);
							return (
								<Route key={index} path={info.routeLink} element={
									<Component />
								} />
							);
						})}
						<Route path="/uni-stuff" element={<DisplayGridPage components={this.uniComponents} images={this.uniImages} />} />
					</Route>

					<Route path='/others'>
						{this.othersComponents.map((Component, index) => {
							var info = extractInfomationFromModule(Component);
							return (
								<Route key={index} path={info.routeLink} element={
									<Component />
								} />
							);
						})}
						<Route path="/others" element={<DisplayGridPage components={this.othersComponents} images={this.othersImages} />} />
					</Route>

					<Route path='*' element={
						<Error404page />
					} />
				</Routes>

				{/* Footer */}
				< Footer />
			</Fragment>
		);
	}
}

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}

	return ComponentWithRouterProp;
}

export default withRouter(App);