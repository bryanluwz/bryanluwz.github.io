import { Component, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/homePage/HomePage';
import { TopNavigationBar } from './components/nav/TopNavigationBar';

export default class App extends Component {
	render() {
		return (
			<Fragment>
				{/* Header and top navigation */}
				<Header />
				<TopNavigationBar />
				{/* Content Pages */}
				<Routes>
					<Route path="/" element={
						<HomePage>

						</HomePage>
					} />
				</Routes>

				{/* Footer */}
				<Footer />
			</Fragment>
		);
	}
}