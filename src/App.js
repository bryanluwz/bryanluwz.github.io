import { Component, Fragment } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/pages/HomePage';
import FunStuffPage from './components/pages/FunStuffPage';
import { TopNavigationBar } from './components/nav/TopNavigationBar';
import Error404page from './components/error404/error404';

class App extends Component {
	constructor(props) {
		super(props);

		// Import game components (js files), but also need to grab corresponding img and txt
		const importAllGameComponents = (r) => r.keys().map((key) => r(key).default);
		this.gameComponents = importAllGameComponents(require.context('./components/funStuff', true, /\.js$/));

		const importAllGameImages = (r) => r.keys().map((key) => r(key));
		this.gameImages = importAllGameImages(require.context('./components/funStuff/images', true));
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
						<HomePage gameComponents={this.gameComponents} gameImages={this.gameImages} />
					} />

					<Route path='/fun-stuff'>
						{this.gameComponents.map((Game, index) => {
							return (
								<Route key={index} path={`/fun-stuff/${index}`} element={
									<Game />
								} />
							);
						})}
						<Route path="/fun-stuff" element={<FunStuffPage gameComponents={this.gameComponents} gameImages={this.gameImages} />} />
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