import React, { Component } from 'react';
import "./ListTeam.css";

export default class ListTeam__item extends Component {
	render() {
		return (
			<div className="">
				<h2 className="listTeam__title">{this.props.name}</h2>
				<img className="listTeam__img" src={this.props.img} alt={'Изображение герба ' + this.props.name} />
				<p className="listTeam__founded">Дата создания: {this.props.founded}</p>
				<div className="listTeam__link__inner"><a className="listTeam__link" href={this.props.site}>Сайт команды</a></div>
			</div>
		)
	}
}
