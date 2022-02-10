const { Component } = require("react");
import Search from "@material-ui/icons/Search";

class Home extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Search/>
        );
    }
}

export default Home;