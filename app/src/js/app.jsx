import React from 'react';
import ReactDOM from 'react-dom';

import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const App = React.createClass({
	displayName: 'App',
	render() {
		return (
			<div>
				<ComponentA />
				<ComponentB />
			</div>
		);
	},
});

ReactDOM.render(<App />, document.getElementById('app'));
