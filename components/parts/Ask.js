import React, { Component, PropTypes } from 'react';

import Display from './Display';

class Ask extends Component {
	constructor() {
		super();
		this.state = {
			//choices: [],
			answer: undefined
		};
		//this.selectHandler = this.selectHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	/*setUpChoices() {
		let choices = Object.keys(this.props.question);
		choices.shift();
		this.setState({
			choices: choices,
			answer: sessionStorage.answer
		});
	}*/

	/*selectHandler(choice) {
		this.setState({ answer: choice });
		sessionStorage.answer = choice;
		this.props.emit('answer', { question: this.props.question, choice: choice });
	}

	submitHandler(ans) {
        this.setState({ answer: ans });
        sessionStorage.answer = ans;
        this.props.emit('answer', { question: this.props.question, choice: ans });
	}*/

	componentWillMount() {
		//this.setUpChoices();
	}

	componentWillReceiveProps() {
		//this.setUpChoices();
	}

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.setState({ answer: this.state.value });
        sessionStorage.answer = this.state.value;
        this.props.emit('answer', { question: this.props.question, choice: this.state.value });
        event.preventDefault();
    }

	render() {
		const buttonTypes = ['primary', 'success', 'warning', 'danger'];

		return(
			<div id="currentQuestion">
				<Display if={this.state.answer}>
					<h3>Vous avez répondu: {this.state.answer}</h3>
					<p>{this.props.question[this.state.answer]}</p>
				</Display>

				<Display if={!this.state.answer}>
					<h2>{this.props.question.q}</h2>
					{/*<div className="row">
						{this.state.choices.map((choice, i) => {
							return (
								<button
									key={i}
									className={`col-xs-12 col-sm-6 btn btn-${buttonTypes[i]}`}
									onClick={() => this.selectHandler(choice)}>
									{choice}: {this.props.question[choice]}
								</button>

							);
						})}
					</div>*/}
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
				</Display>
			</div>
			);
	}
};

Ask.propTypes = {
	question: PropTypes.oneOfType([
				PropTypes.object.isRequired,
				PropTypes.bool.isRequired
			]),
	emit: PropTypes.func.isRequired
};

export default Ask;
