import React from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import '../assets/css/home.css';

class ReviewCard extends React.Component {
    
    handleSubmit = async (event) => {
        console.log('Submit functionality works');
    }

    render() {
    return (
        <div className='card-row'>
            <Card className='card'>
                <CardContent>
                    <Typography gutterBottom align='left' color="textSecondary" component="h6">
                    {this.props.heading}
                    </Typography>
                    <Typography gutterBottom align='left' component="h6">
                    {this.props.brandName}
                    </Typography>
                    <Typography gutterBottom align='left' variant="h4" component="h4">
                    {this.props.productName}
                    </Typography>
                    <Typography variant="body2" align='left' color="textSecondary" component="p">
                    {this.props.review}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button 
                        id="comment"
                        variant="contained" 
                        className={classes.button}
                        style={{
                            textTransform: 'none',
                            marginTop: '15px',
                            minHeight: '54px',
                            maxHeight: '54px',
                        }}
                        onClick={this.handleSubmit}
                    >
                    <Typography style={{
                            fontWeight: 550,
                            lineHeight: '21.47px',
                            fontSize: '17px',
                            color: '#FFFFFF'
                        }}>
                            Continue
                        </Typography>
                    </Button>

                    <Button 
                        id="comment"
                        variant="contained" 
                        className={classes.button}
                        style={{
                            textTransform: 'none',
                            marginTop: '15px',
                            minHeight: '54px',
                            maxHeight: '54px',
                        }}
                        onClick={this.handleSubmit}
                    >
                    <Typography style={{
                            fontWeight: 550,
                            lineHeight: '21.47px',
                            fontSize: '17px',
                            color: '#FFFFFF'
                    }}>
                            Like
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </div>
    )}
}

ReviewCard.propTypes = {
    heading: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired
}

export default ReviewCard;
