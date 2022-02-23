import React from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import '../assets/css/home.css';

const useStyles = makeStyles(() => ({
    button: {
        "&.MuiButton-root": {
          backgroundColor: '#6C5B57',
          width: "245px",
          "@media (max-width: 768px)": { width: "100px" },
          outerHeight: '30px',
          '&:hover': {
            backgroundColor: '#5e4f4b',
          }
        },
        "&.MuiButton-sizeLarge": "56px",
        marginLeft: '10px'
      },
    }));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class ReviewCard extends React.Component {
    
    handleSubmit = async (event) => {
        console.log('Submit functionality works');
    }

    render() {
        const classes = this.props.classes;
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
                            Comment
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

export default withMyHook(ReviewCard);
