import React, { Component } from 'react';
import League__elem from "./League__elem";
import SearchLeague from "../Functional/SearchName/SearchLeague";
import './ListLeague.css';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";

export default class ListLeague extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			dataSearch: [],
		};

		this.setStateFromSearch = this.setStateFromSearch.bind(this);
	}
	//Функция ПЕРЕДАЁТСЯ через пропс в компонент 'SearchName' 
	//предварительно ПРИВЯЗАВ КОНТЕКСТ в this к текущему компоненту - 'ListLeague'
	//с ЦЕЛЬЮ изменить состояние у текущего компонента
	setStateFromSearch(array) {
		this.setState({
			dataSearch: array,
		})
	}

	componentDidMount() {
		// "Your API token" для осущесвления fetch-запроса к API 
		const MY_API_TOKEN = "92b1cf18272a41399e1a876a4e0f52e4";

		let data = [];
		fetch("http://api.football-data.org/v2/competitions", {
			headers: {
				"X-Auth-Token": MY_API_TOKEN,
			}
		})
			.then(resolve => resolve.json())
			.then((result) => {
				data = result.competitions;
				this.setState({
					data: result.competitions,//данные не изменяются и всегда хранят скаченные с API данные
					dataSearch: result.competitions,//данные изменяются в зависимости от введённых 														пользователем года и названия 
				});
			});
	}

	render() {
		if (!this.state.dataSearch) {
			return <div className="container"><h1>Loading ...</h1></div>
		}

		let freeIdApi = [2000, 2001, 2002, 2003];

		return (
			<div className="listLeague">
				<div className="container">
					<h1>Список лиг</h1>

					<SearchLeague data={this.state.data} func={this.setStateFromSearch} />
					{
						//Для бесплатной подписки к некоторым (2000,2001,2002,2004)
						this.state.dataSearch.map(function (elemCompetition) {
							if (freeIdApi.includes(elemCompetition.id)) {
								return (
									<div key={elemCompetition.id}>
										<NavLink to={`/calendarLeague/${elemCompetition.id}`}>
											<League__elem key={elemCompetition.id} data={elemCompetition} />
										</NavLink>
									</div>
								)
							} else {
								return (
									<div key={elemCompetition.id} className="listLeague__link-block">
										<League__elem key={elemCompetition.id} data={elemCompetition} />
									</div>
								)
							}
						})
					}
				</div>
			</div>
		)
	}
}
