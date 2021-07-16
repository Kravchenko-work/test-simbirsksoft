import React, { Component } from 'react';
import "./SearchData.css";

export default class SearchTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			matches: this.props.matches,
		}

		this.searchSeasonsInLeagues = this.searchSeasonsInLeagues.bind(this);
		this.updateDataParentComponent = this.props.function;
	}

	searchSeasonsInLeagues() {

		let matches = this.state.matches, matchesUpdate = [];
		let dateStartInput, dateEndInput, dateMatch;

		//Считываем дату, введённую пользователем
		dateStartInput = new Date(+document.querySelector('.searchData__year-start').value, +(document.querySelector('.searchData__month-start').value), +(document.querySelector('.searchData__day-start').value) - 31);
		if (+document.querySelector('.searchData__year-end').value) {
			dateEndInput = new Date(+document.querySelector('.searchData__year-end').value, +document.querySelector('.searchData__month-end').value, +document.querySelector('.searchData__day-end').value);
		} else {
			dateEndInput = new Date(2030, 1, 1);
		}

		let searchItem = document.querySelectorAll('.calendarTeam__datePlay');
		for (let i = 0; i < matches.length; i++) {
			dateMatch = new Date(matches[i].utcDate);

			if ((dateMatch >= dateStartInput) && (dateMatch <= dateEndInput)) {
				matchesUpdate.push(matches[i]);
			}
		}

		for (let item of searchItem) {
			item.classList.add("calendarTeam__datePlay-search");
		}
		matches = matchesUpdate;

		this.updateDataParentComponent(matches);
	}

	render() {
		return (
			<div className="container">
				<div className="searchData">
					<h2 className="seatchData__title">Поиск по дате проведения игры: </h2>
					<div className="searchData__flex">
						<div className="searchData__item">
							<p className="searchData__p">С</p>
							<input className="searchData__input searchData__day searchData__day-start" type="text" />
							<input className="searchData__input searchData__month searchData__month-start" type="text" />
							<input className="searchData__input searchData__year searchData__year-start" type="text" />
						</div>
						<div className="searchData__item">
							<p className="searchData__p">по</p>
							<input className="searchData__input searchData__day searchData__day-end" type="text" />
							<input className="searchData__input searchData__month searchData__month-end" type="text" />
							<input className="searchData__input searchData__year searchData__year-end" type="text" />
						</div>
						<input className="searchData__button" type="button" value="Поиск" onClick={this.searchSeasonsInLeagues} />
					</div>
				</div>
			</div>
		)
	}
}
