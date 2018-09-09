import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

export default class NotFound extends Component {
	render() {
		return(
			<div id="not-found">
				<h1>Whoops...</h1>
				<p>Je ne peux afficher la page demandée.
					Les pages suivantes pourraient t'intéresser:</p>

				<IndexLink to="/">Rejoindre en tant que votant</IndexLink>
				<Link to="/speaker">Démarrer la présentation</Link>
				<Link to="/board">Voir les résultats</Link>
			</div>
			);
	}
}
