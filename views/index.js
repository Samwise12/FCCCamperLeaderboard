import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import axios from 'axios';

import './styles/app.scss'
import zip from 'lodash/zip';

const Header = () => {
	return (<h4>Sort by either all time points or recent points</h4>)
}
const Footer = () => {
	return (<h1>Created by Samwise12</h1>)
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			Usernames: [],
			img: [],
			recent: [],
			alltime: [],//^recent
			Usernames2: [],
			img2: [],
			recent2: [],
			alltime2: [],			
			toggle: true
		}
	}
	componentDidMount(){
		axios({
			method: 'get',
			url: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
			responseType: 'json'
		}).then(res => {
		let arr1 = [];
			for (let i=0;i<100; i++){
				arr1.push(res.data[i].username)
			}
		let arr2 = [];
			for (let i=0;i<100; i++){
				arr2.push(res.data[i].img)
			}
		let arr3 = [];
			for (let i=0;i<100; i++){
				arr3.push(res.data[i].recent)
			}
		let arr4 = [];
			for (let i=0;i<100; i++){
				arr4.push(res.data[i].alltime)
			}	
			this.setState({img: arr2, Usernames: arr1, recent: arr3, alltime: arr4})
		}).then(
		axios({
			method: 'get',
			url: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
			responseType: 'json'
		}).then(res => {
		let arr5 = [];
			for (let i=0;i<100; i++){
				arr5.push(res.data[i].username)
			}
		let arr6 = [];
			for (let i=0;i<100; i++){
				arr6.push(res.data[i].img)
			}
		let arr7 = [];
			for (let i=0;i<100; i++){
				arr7.push(res.data[i].recent)
			}
		let arr8 = [];
			for (let i=0;i<100; i++){
				arr8.push(res.data[i].alltime)
			}	
			this.setState({img2: arr6, Usernames2: arr5, recent2: arr7, alltime2: arr8})
		})
		)
	}
	allTime(){
		this.setState({toggle: false})
	}
	recent(){
		this.setState({toggle: true})
	}
	render(){
	let Usernames = this.state.Usernames;
	let Img = this.state.img;
	let recent = this.state.recent;
	let alltime = this.state.alltime;
	let Usernames2 = this.state.Usernames2;
	let Img2 = this.state.img2;
	let recent2 = this.state.recent2;
	let alltime2 = this.state.alltime2;
let hundred = []; 
let names = []; let names2 = [];
let img = [];
for (let j=0; j<100; j++){
	hundred.push(j)
}
Usernames.forEach((name,i) => {
	names.push(
		<div key={i}>
	{name}
		</div>
		)})
Usernames2.forEach((name,i) => {
	names2.push(
		<div key={i}>
	{name}
		</div>
		)})


let z = zip(hundred, names, Img, recent, alltime);
let x = z.map(([hundred, names, Img, recent, alltime], i) => {
	return (
		<tr key={i}>
		<td>{hundred}</td>
		<td >
		<img className='col-xs-2' height="50"  src={Img} />
		{names}		
		</td>
		<td>
		{alltime}
		</td>
		<td>
		{recent}
		</td>		
		</tr>
		)
})
////^alltime
let z2 = zip(hundred, names2, Img2, recent2, alltime2);
let x2 = z2.map(([hundred, names2, Img2, recent2, alltime2], i) => {
	return (
		<tr key={i}>
		<td>{hundred}</td>
		<td >
		<img className='col-xs-2' height="50"  src={Img2} />
		{names2}		
		</td>
		<td>
		{alltime2}
		</td>
		<td>
		{recent2}
		</td>		
		</tr>
		)
})

//console.log(this.state.toggle)
		if(this.state.toggle){
		return(<div>
	<div className='m'><button onClick={this.allTime.bind(this)}>All Time</button> 
	<button onClick={this.recent.bind(this)}>Past 30 days</button></div>
	<table ><tbody>
  <tr>
    <th>#</th>
    <th>Camper Username</th>
    <th>All Time Points</th>
    <th>Points in Past 30 Days</th>
  </tr>
  		{x}
	</tbody></table>
			</div>)
		} else {
			return(
			<div>
		<div className='m'><button onClick={this.allTime.bind(this)}>All Time</button> 
	<button onClick={this.recent.bind(this)}>Past 30 days</button></div>
	<table ><tbody>
  <tr>
    <th>#</th>
    <th>Camper Username</th>
    <th>All Time Points</th>
    <th>Points in Past 30 Days</th>
  </tr>
  		{x2}
	</tbody></table>
			</div>
				)//end-return
		}//end-else
		}//end-render
	}//end-App 

ReactDOM.render(<div><Header /><App /><Footer /></div>,
	document.getElementById('root'));