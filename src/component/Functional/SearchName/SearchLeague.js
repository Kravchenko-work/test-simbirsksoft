import React, { Component } from 'react';
import "./SearchGeneral.css";

export default class SearchLeague extends Component {
	constructor(props) {
		super(props);

		this.searchLeagues = this.searchLeagues.bind(this);
	}

	searchLeagues(event) {
		let nameSearch = document.querySelector('.search__input').value;
		let yearSearch = +document.querySelector('.search__year').value;

		let data = this.props.data;

		let newData = [];

		let regExp = new RegExp(nameSearch, "gi");

		let dataStart, dataEnd;
		for (let i = 0; i < data.length; i++) {

			if (!data[i].name.match(regExp)) continue;

			if (yearSearch && data[i].currentSeason) {

				dataStart = new Date(data[i].currentSeason.startDate);
				dataEnd = new Date(data[i].currentSeason.endDate);
				if (!((yearSearch >= dataStart.getFullYear() && yearSearch <= dataEnd.getFullYear()))) continue;
				console.log('yes');

			}
			newData.push(data[i]);
		}

		this.props.func(newData);

	}

	render() {
		return (
			<div className="search">
				<p className="search__subtitle">Поиск по названию:</p>
				<input className="search__input" type="text" />
				<p className="search__subtitle search__subtitle-year">Поиск по году:</p>
				<input className="search__input search__year" type="text" />
				<input className="search__button" type="button" value="Поиск" onClick={this.searchLeagues} />
			</div>
		)
	}
}
