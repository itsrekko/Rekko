import React, { Component } from "react";
import Home from '../pages/Home';
import AddProductComponent from "../components/AddProductComponent";

class WelcomeUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }
    changeToHomeScreen = (event) => {
        this.props.appContext.setState({
            currentScreen: <Home appContext={this.props.appContext}/>
        })
    }

    render(){
        return(
            <AddProductComponent
                username={this.state.appContext.state.username}
                userid={this.state.appContext.state.userid}
                cardTitle={'What’s a beauty product you can’t live without at the moment?'}
                buttonText={'Start discovering products'}
                buttonAction={this.changeToHomeScreen}
            />
        );
    }
}

export default WelcomeUser;