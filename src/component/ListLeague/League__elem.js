import React, { Component } from 'react';

import "./ListLeague.css";

export default class League__elem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data,
			date: this.props.data.currentSeason,
			name: this.props.data.name,
		}
	}


	render() {
		let freeIdApi = [2000, 2001, 2002, 2003];
		let name = this.state.name, dateStart, dateEnd;

		if (!name) {
			return <div className="container"><h1>Loading ...</h1></div>
		}
		if (!this.state.date) {
			dateStart = dateEnd = "не известно";

		} else {
			dateStart = new Date(this.state.date.startDate);
			dateEnd = new Date(this.state.date.endDate);

			dateStart = `${dateStart.getDate()} / ${dateStart.getMonth()} / ${dateStart.getFullYear()}`;
			dateEnd = `${dateEnd.getDate()} / ${dateEnd.getMonth()} / ${dateEnd.getFullYear()}`;

		}
		if (freeIdApi.includes(this.state.data.id)) {
			return (
				<div className="cardLeague">
					<span className="cardLeague__text">{name}</span>
					<span className="cardLeague__date">{`c ${dateStart} по ${dateEnd}`}</span>
				</div>
			)
		} else {
			return (
				<div className="cardLeague-block">
					<span className="cardLeague__text-block">{name}</span>
					<span className="cardLeague__date-block">{`c ${dateStart} по ${dateEnd}`}</span>
				</div>
			)
		}




	}
}
