const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const _collection = require('lodash/collection'); // find
const _util = require('lodash/util'); // matches

const app = express();

// Hot reloading
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
// End hot reloading

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(3000);

let connections = [];
let audience = [];
let title = 'Untitled Presentation';
let speaker = {};
let questions = require('./app-questions');
let currentQuestion = false;
/*var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
};*/
let results = {};

const io = require('socket.io')(server);

io.on('connection', (client) => {
	client.emit('welcome', {
		title: title,
		speaker: speaker,
		audience: audience,
		questions: questions,
		currentQuestion: currentQuestion,
		results: results
	});

	connections.push(client);
	console.log('Connected: %s socket. Total: %s', client.id, connections.length);

	client.on('join', (payload) => {
		const newMember = {
			id: client.id,
			name: payload.name,
			type: 'member'
		};

		client.emit('joined', newMember);
		audience.push(newMember);
		io.emit('audience', audience);
		console.log('Audience joined: %s', payload.name);
	});

	client.on('start', (payload) => {
		speaker.name = payload.name;
		speaker.id = client.id;
		speaker.type = 'speaker';
		title = payload.title;
		client.emit('joined', speaker);
		io.emit('start', {title: title, speaker: speaker});
		console.log('Presentation Started: "%s" by %s', title, speaker.name);
	});

	client.on('ask', (question) => {
		currentQuestion = question;
		// results = { a: 0, b: 0, c: 0, d: 0 };
		results = {};
		io.emit('ask', currentQuestion);
		console.log('Question asked "%s"', question.q);
	});

	client.on('answer', (payload) => {
		if (!results[payload.choice] ){
            results[payload.choice] = 0;
		}
		results[payload.choice]++;
		io.emit('results', results);
		console.log('Answer: "%s" - %j', payload.choice, results);
	});

	client.on('disconnect', () => {
		var memberDisconnected = _collection.find(audience, _util.matches({ id: client.id }));
		if (memberDisconnected) {
			audience.splice(audience.indexOf(memberDisconnected), 1);
			io.emit('audience', audience);
			console.log('Left: %s (%s audience members)', memberDisconnected.name, audience.length);
		} else if (client.id === speaker.id) {
			console.log('%s has left. %s is over.', speaker.name, title);
			speaker = {};
			title = 'Untitled Presentation';
			currentQuestion = false;
			io.emit('end', { title: title, speaker: speaker, currentQuestion: currentQuestion });
		}

		connections.splice(connections.indexOf(client), 1);
		client.disconnect();
		console.log('Disconnected: %s sockets remaining.', connections.length);
	});
});

console.log('Server running at http://localhost:3000');
