import React from 'react';
import ReactDOM from 'react-dom';

import '../style/index.scss';

import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const App = React.createClass({
	displayName: 'App',
	render() {
		return (
			<div>
				<h1>Hi World 17</h1>
				<ComponentA />
				<ComponentB />
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
