import './style';
import Floater from './floater';
import { Component } from 'preact';


export default class App extends Component {
	render() {
		return (
			<div>
				<h1>
					Git Demo. 
					<div class="subtitle">Todo: overcome problems creating deployment image.</div>
				</h1>
				<Floater/>
			</div>
		);
	}
}
