import { Component, Fragment } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/homePage/HomePage';
import { TopNavigationBar } from './components/nav/TopNavigationBar';
import Error404page from './components/error404/error404';

class App extends Component {
	render() {
		return (
			<Fragment>
				{/* Header and top navigation */}
				<Header />
				<TopNavigationBar pathname={this.props.router.location.pathname} />
				{/* Content Pages */}
				<Routes>
					<Route path="/" element={
						<HomePage>

						</HomePage>
					} />
					<Route path='/*' element={
						<Error404page />
					} />
				</Routes>

				{/* Footer */}
				<Footer />
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