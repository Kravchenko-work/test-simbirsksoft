import React, { Component } from 'react';

import "./SearchGeneral.css";

export default class SearchTeam extends Component {
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

		for (let i = 0; i < data.length; i++) {

			if (!data[i].name.match(regExp)) continue;



			if (yearSearch) {
				if (!(yearSearch == +data[i].founded)) continue
			}

			newData.push(data[i]);
		}

		this.props.function(newData);

	}
	render() {
		return (
			<div className="search">
				<p className="search__subtitle">Поиск по названию:</p>
				<input className="search__input" type="text" />
				<p className="search__subtitle search__subtitle-year">Поиск по году создания команды:</p>
				<input className="search__input search__year" type="text" />
				<input className="search__button" type="button" value="Поиск" onClick={this.searchLeagues} />
			</div>
		)
	}
}
