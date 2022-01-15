import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';
import {Component} from 'react';
import { Navbar } from './layout/Navbar';
export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <Home/>
        </header>
        <body className="App-body">
          <p>body component will go here</p>
        </body>
      </div>
    ); 
  }
}


/*
<img src={logo} className="App-logo" alt="logo" />
*/