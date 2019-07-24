import './style';
import Floater from './floater';
import Floater2d from './floater2d';
import Floater3d from './floater3d';
import Floater3df from './floater3df';
import Floater3dfr from './floater3dfr';
import Floater3dfrb from './floater3dfrb';

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
				<Floater3d/>
				<Floater3df/>
				<Floater3dfr/>
				<Floater3dfrb/>
			</div>
		);
	}
}
