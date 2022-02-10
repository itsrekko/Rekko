import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import {Component} from 'react';
import Login from './pages/Login';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poiret One',
      'Regular 400',
    ].join(','),
  },});

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
  }

  componentDidMount() {
    this.setState({
        currentScreen: <Login appContext={this}/>
    })
}

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {this.state.currentScreen}
        </div>
      </ThemeProvider>
    ); 
  }
}
