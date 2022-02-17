import React, { Component } from "react";
import CustomSearchBar from '../components/CustomSearchBar';
import '../assets/css/home.css';
import ReviewCardContainer from "../components/ReviewCardContainer";
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviews: [],
            products: []
        }
    }

    // Currently we are fetching all the data there exists for MVP. 
    // TODO: Modify this to include paged fetching
    componentDidMount() {
        axios.get('review/getAllReviews', {})
        .then(res => {
            this.setState({
                reviews: res.data.data
            });
        })
        .catch(error => {
            console.log (`Error fetching all the reviews while mounting the home page with error: ${error}`);
        })

        axios.get('product/getAllProducts', {})
        .then(res => {
            this.setState({
                products: res.data.data
            });
        })
        .catch(error => {
            console.log (`Error fetching all the products while mounting the home page with error: ${error}`);
        })
    }

    render() {
        return(
            <div>
                <div className="searchbar-container">
                    <CustomSearchBar appContext={this.props.appContext}/>
                </div>
                <div className = "card-container">
                    <ReviewCardContainer
                        reviews = {this.state.reviews}
                        products = {this.state.products}
                    />
                </div>
            </div>
            
        );
    }
}

export default Home;