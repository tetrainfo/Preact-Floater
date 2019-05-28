import './style';
import Floater from './floater';
import Floater2d from './floater2d';

import { Component } from 'preact';


export default class App extends Component {
	render() {
		return (
			<div>
				<h1>
					Git Preact Demo 
					<div class="subtitle">Todo: overcome problems creating production deployment image.</div>
					<div><a href="https://github.com/tetrainfo/Preact-Floater" target="new">source code</a></div>
				</h1>
				<Floater/>
				<Floater2d/>
			</div>
		);
	}
}
