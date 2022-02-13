import React, { Component } from "react";
import Search from "@material-ui/icons/Search";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <Search/>
        );
    }
}

export default Home;