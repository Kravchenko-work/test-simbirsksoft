import React, { Component } from 'react';
import SearchLeague from "./../Functional/SearchData/SearchLeague";
import './CalendarLeague.css';

export default class CalendarLeague extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
		};

		this.updateDataOnpage = this.updateDataOnpage.bind(this);
	}

	updateDataOnpage(objectData) {
		this.setState({
			dataSearch: objectData,
		})
	}

	componentDidMount() {
		// "Your API token" для осущесвления fetch-запроса к API 
		const MY_API_TOKEN = "92b1cf18272a41399e1a876a4e0f52e4";
		fetch(`https://api.football-data.org/v2/competitions/${this.props.match.params.id}`, {
			headers: {
				"X-Auth-Token": MY_API_TOKEN,
			}
		})
			.then(resolve => resolve.json())
			.then(
				(result) => {
					this.setState({
						data: result,
						dataSearch: result,
					});
				}
			)
	}

	render() {
		let data = this.state.dataSearch;//Данные по API ...competitions/id

		if (!data) {
			return (
				<div className="container"><h1>Loading ...</h1></div>
			);
		}
		let dataStart, dataEnd;

		return (
			<div>
				<SearchLeague function={this.updateDataOnpage} data={data} />
				<div className="container">
					<div className="calendar">
						<div className="calendar__top">
							<h2 className="calendar__title">{data.name}</h2>
							<img className="calendar__logo" src={data.emblemUrl} />
						</div>
						<div className="calendar__seasons">
							{
								data.seasons.map(function (item, index) {

									//Создание строк для даты начала и конца
									dataStart = new Date(item.startDate);
									dataStart = `${dataStart.getDate()} / ${dataStart.getMonth()} / ${dataStart.getFullYear()}`;
									dataEnd = new Date(item.endDate);
									dataEnd = `${dataEnd.getDate()} / ${dataEnd.getMonth()} / ${dataEnd.getFullYear()}`;

									return (
										<div className="calendar__seasons-item" key={item.id}>
											<h3 className="calendar__titleSeason" >{index + 1} лига:</h3>
											<p className="calendar__data calendar__data-start">Начало: {dataStart}</p>
											<p className="calendar__data calendar__data-end">Конец: {dataEnd}</p>
											<div className="calendar__win">
												<p className="calendar__win-name">Победитель: {(item.winner?.name) ? item.winner.name : " Отсуствует"}</p>
												<img className="calendar__win-img" src={item.winner?.crestUrl} />
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>

			</div>
		)
	}
}

