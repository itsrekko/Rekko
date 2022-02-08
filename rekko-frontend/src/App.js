import './App.css';
import {Component} from 'react';
import {Title} from './components/Title';
import SearchBar from './components/SearchBar';
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Title/>
          </h1>
        </header>
        <body className="App-body">
          <SearchBar/>
        </body>
      </div>
    ); 
  }
}
