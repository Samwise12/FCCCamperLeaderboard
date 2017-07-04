import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import axios from 'axios';

const Header = () => {
  return (<div>Header</div>)
}
const Footer = () => {
  return (<div>Footer</div>)
}
/////
class Leaderboard extends React.Component {
  render() {
      var count = 0;
      var self = this;
      var userlist = this.props.users.map(function(user) {
         count++;
         return (
           <User user={user} key={user.username} count={count} apiroot={this.props.apiroot} updatePage={this.props.updatePage}/>
         );
      }.bind(this));

    return (
       <table className="table table-striped table-bordered">
          <ColumnHeadings sortTableNum={this.props.sortTableNum}/>
          <tbody>
            {userlist}
          </tbody>
      </table>
    );
  }
}
/////
/////
class Body extends React.Component {
  constructor() {
    super();
    this.state = { 
      users: [],
      reverse: true,
      column: "recent"
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
  removeSortClasses() {
    var nodes = document.getElementsByClassName('sortable');
    for (var i=0; i < nodes.length; i++) {
      nodes.item(i).className = "sortable";
    };
  }
  sortTableNum(column) {
     // only sort descending. After all it's a top100
     // Ignore click if the list was already sorted on that item
     if (column !== this.state.column) {
        this.setState({reverse: true, column: column},  this.getData);
     }
   }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div id="header">
              <h3>Leaderboard</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
              <Leaderboard 
                users={this.state.users} 
                apiroot={this.props.apiroot} 
                updatePage={this.getData.bind(this)} 
                sortTableNum={this.sortTableNum.bind(this)} 
                />
           </div>
        </div>
      </div>
    );
  }
}
//////
class App extends Component {
  render(){
    return(<div>
    <Header />
    <Body apiroot={this.props.apiroot} />
    <Footer />
</div>)}
  }

ReactDOM.render(<App apiroot='"https://fcctop100.herokuapp.com/api/fccusers/"'/>,
  document.getElementById('root'));