import React, { Component } from 'react';
import ListTeam__item from "./ListTeam__item";
import SearchTeam from "./../Functional/SearchName/SearchTeam";
import "./ListTeam";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";

export default class ListTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			dataSearch: [],
		}

		this.setStateFromSearch = this.setStateFromSearch.bind(this);
	}

	setStateFromSearch(array) {
		this.setState({
			dataSearch: array,
		})
	}

	componentDidMount() {
		// "Your API token" для осущесвления fetch-запроса к API 
		const MY_API_TOKEN = "92b1cf18272a41399e1a876a4e0f52e4";

		fetch("https://api.football-data.org/v2/teams", {
			headers: {
				"X-Auth-Token": MY_API_TOKEN,
			}
		})
			.then(resolve => resolve.json())
			.then(
				(result) => {
					this.setState({
						data: result.teams,
						dataSearch: result.teams,
					});
				}
			)
	}

	showModalWindow() {

	}

	render() {
		let dataTeams = this.state.dataSearch;

		if (!this.state.dataSearch) {
			return <div className="container"><h1>Loading ...</h1></div>
		}

		return (
			<div className="container">
				<h1>Список команд</h1>
				<SearchTeam data={this.state.data} function={this.setStateFromSearch} />
				<div className="listTeam">
					{
						dataTeams.map(function (elemTeams) {
							return (
								<div className="listTeam__item" key={elemTeams.id}>
									<NavLink to={`/calendarTeam/${elemTeams.id}/${elemTeams.name}`}>
										<ListTeam__item key={elemTeams.id} name={elemTeams.name} img={elemTeams.crestUrl} site={elemTeams.website} founded={elemTeams.founded} />
									</NavLink>
								</div>

							)
						})
					}
				</div>
			</div>

		)
	}
}
