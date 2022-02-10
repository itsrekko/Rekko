import { Component } from "react";
import '../assets/css/login.css';
import CustomRoundLoginForm from "../components/CustomLoginForm";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: undefined
        }
    };

    render(){
        return(
            <div>
                <header className="login-header">
                    <div className="login-title">
                        Discover your next beauty and wellness obsessions
                    </div>
                    <p className="login-sub-title">
                        Find the best products from trusted sources
                    </p>
                </header>
                <body>
                    <CustomRoundLoginForm/>
                </body>
            </div>
        );
    }
}

export default Login;