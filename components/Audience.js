import React, { Component, PropTypes } from 'react';

import Display from './parts/Display';
import Join from './parts/Join';
import Ask from './parts/Ask';

class Audience extends Component {
	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>
					<Display if={this.props.member.name}>
						<Display if={!this.props.currentQuestion}>
							<h2>Bienvenue {this.props.member.name}</h2>
							<p>{this.props.audience.length} personnes connectées.</p>
							<p>La question apparaitra ici.</p>
						</Display>

						<Display if={this.props.currentQuestion}>
							<Ask question={this.props.currentQuestion} emit={this.props.emit} />
						</Display>
					</Display>

					<Display if={!this.props.member.name}>
						<h1>Rejoindre la présentation</h1>
						<Join emit={this.props.emit} />
					</Display>
				</Display>
			</div>
			);
	}
};

Audience.propTypes = {
	status: PropTypes.string,
	emit: PropTypes.func,
	member: PropTypes.object,
	audience: PropTypes.array,
	currentQuestion: PropTypes.oneOfType([
			PropTypes.bool.isRequired,
			PropTypes.object.isRequired
		])
};

export default Audience;
