import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Join extends Component {
	constructor() {
		super();
		this.joinHandler = this.joinHandler.bind(this);
	}

	joinHandler() {
		const fullName = this.fullNameTextBox.value;
		this.props.emit('join', {name: fullName	});
	}

	render() {
		return (
			<form action="javascript:" onSubmit={this.joinHandler}>
				<div className="form-group">
					<label htmlFor="fullName"> Nom complet</label>
					<input type="text" id="fullName" ref={(fullName) => this.fullNameTextBox = fullName}
						className="form-control" placeholder="Entrez votre nom" required />
				</div>
				<button className="btn btn-primary">Rejoindre</button>

				{/*<Link to="/speaker">Join as speaker</Link>
				<Link to="/board">Go to the Board</Link>*/}
			</form>
			);
	}
};

Join.propTypes = {
	emit: PropTypes.func.isRequired
};

export default Join;
