import React, { Component } from 'react';
import "./SearchData.css";

export default class SearchLeague extends Component {
	constructor(props) {
		super(props);

		this.searchSeasonsInLeagues = this.searchSeasonsInLeagues.bind(this);
		this.updateDate = this.props.function;

		this.state = {
			seasons: this.props.data.seasons,
			data: this.props.data,
		}
	}

	searchSeasonsInLeagues() {
		let seasons = this.state.seasons, seasonsUpdate = [], data = this.state.data;

		let dateStartInput, dateEndInput, dateStart, dateEnd;

		let elemsSeason = document.querySelectorAll('.calendar__seasons-item');

		//Считываем дату, введённую пользователем
		dateStartInput = new Date(+document.querySelector('.searchData__year-start').value, +document.querySelector('.searchData__month-start').value, +document.querySelector('.searchData__day-start').value);
		if (+document.querySelector('.searchData__year-end').value) {
			dateEndInput = new Date(+document.querySelector('.searchData__year-end').value, +document.querySelector('.searchData__month-end').value, +document.querySelector('.searchData__day-end').value);
		} else {
			dateEndInput = new Date(2030, 1, 1);
		}


		for (let i = 0; i < seasons.length; i++) {
			dateStart = new Date(seasons[i].startDate);
			dateEnd = new Date(seasons[i].endDate);



			if ((dateStart > dateStartInput) && (dateEnd < dateEndInput)) {
				seasonsUpdate.push(seasons[i]);
			}

			for (let i = 0; i < elemsSeason.length; i++) {
				elemsSeason[i].style.border = "3px solid #fb00ff";
			}
		}

		data.seasons = seasonsUpdate;

		this.updateDate(data);

	}

	render() {
		return (
			<div className="container">
				<div className="searchData">
					<h2 className="seatchData__title">Поиск по дате: </h2>
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
