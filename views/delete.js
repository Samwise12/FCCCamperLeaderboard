import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			Usernames: []
		}
	}
	componentDidMount(){
		axios({
			method: 'get',
			url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
			responseType: 'json'
		}).then(res => {
		let arr = [];
			for (let i=0;i<100; i++){
				arr.push(res.data[i].username)
			}
			this.setState({Usernames: arr})
		})
	}
	render(){
	let Usernames = this.state.Usernames;
let names = [];
Usernames.forEach((name,i) => {
	names.push(
		<tr key={i}>
			<td>{name}</td>
		</tr>
		)})
let hundred = [];
for (let j=0; j<100; j++){
	hundred.push(j)
}
let indexes = [];
hundred.forEach((num,j)=>{
	indexes.push(
		<tr key={j}>
			<td>{num}</td>
		</tr>
)})
		return(
			<table><tbody>
			<tr>
				<th>#</th>
				<th>Camper Name</th>
				<th>Points in past 30 days</th>
			</tr>
			<tr>
				<td>{indexes}</td>
				<td>{names}</td>
			</tr>
			</tbody></table>
			)
		}
	}

ReactDOM.render(<App />,
	document.getElementById('root'));