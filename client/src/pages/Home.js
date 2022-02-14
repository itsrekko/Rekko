import React, { Component } from "react";
import CustomSearchBar from '../components/CustomSearchBar';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <CustomSearchBar/>
        );
    }
}

export default Home;