import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';

class ReviewCardContainer extends React.Component {
    // Add implementation of the review card over here when both reviews and products are populated.
    render() {
        console.log(this.props);
        return(
            <div>
                <p> TODO: Required to add implementation for the cards for every card in a loop</p>
            </div>
    )}
}

ReviewCardContainer.propTypes = {
    reviews: PropTypes.array.isRequired,
}

export default ReviewCardContainer;