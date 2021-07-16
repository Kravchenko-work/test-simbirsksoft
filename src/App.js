import Header from './component/Header/Header';

import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
		}
	}
	render() {
		return (
			<div className="App">
				<Header />
			</div >
		)
	}
}

