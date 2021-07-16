import React, { Component } from 'react';
import "./CalendarTeam.css";
import SearchTeam from "./../Functional/SearchData/SearchTeam";



export default class CalendarTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			matches: [],
			matchesSearch: [],
		};

		this.updateDate = this.updateDate.bind(this);
	}

	updateDate(matches) {
		this.setState({
			matchesSearch: matches,
		})
	}

	componentDidMount() {
		const MY_API_TOKEN = "92b1cf18272a41399e1a876a4e0f52e4";

		fetch(`https://api.football-data.org/v2/teams/${this.props.match.params.id}/matches`, {
			headers: {
				"X-Auth-Token": MY_API_TOKEN,
			}
		})
			.then(resolve => resolve.json())
			.then(
				(result) => {
					this.setState({
						data: result,
						matches: result.matches,
						matchesSearch: result.matches,
					});
				}
			)
	}

	render() {
		let data = this.state.data;
		if (!data) {
			return (
				<div className="container"><h1>Loading ...</h1></div>
			);
		}

		data.matches = this.state.matchesSearch;
		let rival, name = this.props.match.params.name;
		if (data.count == "0") {
			return (
				<div className="container"><h2 className="calendarTeam__notCount">Матчи отсутствуют в API (count = 0)</h2></div>
			);
		}
		return (
			<div className="container">
				<SearchTeam matches={this.state.matches} function={this.updateDate} />
				<div className="block-calendarTeam">
					<h1 className="block-calendarTeam__subtitle">Календарь команды <span className="block-calendarTeam__title">{name}</span></h1>
					<div className="calendarTeam">
						{
							data.matches.map(function (match, id) {
								if (match.homeTeam.name == name) {
									rival = match.awayTeam.name;
								} else {
									rival = match.homeTeam.name;
								}
								return (
									<div className="calendarTeam__card" key={id}>
										<div className="calendarTeam__title">
											<p className="calendarTeam__nameLeague">Название лиги: <span>{match.competition.name}</span></p>
											<p className="calendarTeam__nameCountry">Название страны: {match.competition.area.name}</p>
											<img className="calendarTeam__img" src={match.competition.area.ensignUrl} />
										</div>
										<p className="calendarTeam__dateSeason">
											Даты сезона: {`${match.season.startDate} / ${match.season.endDate}`}
										</p>
										<p className="calendarTeam__datePlay">
											Дата игры: {`${new Date(match.utcDate).getDate()} / ${new Date(match.utcDate).getMonth() + 1} / ${new Date(match.utcDate).getFullYear()}`}
										</p>
										<p className="calendarTeam__rival">
											Соперник: {rival}
										</p>
									</div>
								)
							})
						}
					</div>
				</div>
			</div >
		)
	}
}
