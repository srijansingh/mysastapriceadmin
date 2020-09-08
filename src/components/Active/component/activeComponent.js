import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import "../../Toolbar/ProductComponent.css";

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.1),
        width: theme.spacing(10),
        height: theme.spacing(2),
      },
    },
  });

class ActiveComponent extends Component {
    render() {
        const {classes} = this.props;
        let status;
        if(this.props.status === 'active'){
        status = <div style={{color:'lawngreen'}}>Active</div>
        }
        else{
          status = <div style={{color:'red'}}>Inactive</div>
        }
        return (
          <div className={classes.root}>
            <Paper elevation={1} className="product" style={{width:'800px'}}>
                <div className="product-images">
                  <img src={this.props.image} alt={this.props.title} />
                </div>
                <div className="product-box">
                  <div className="product-details">
                      <span className="title">{this.props.title}</span>
                      <span style={{fontWeight:'bold'}}>Price : <span style={{fontWeight:'normal'}}>{this.props.price}</span></span>
                      <span style={{fontWeight:'bold'}}>Rating :<span style={{fontWeight:'normal'}}>{this.props.rating}</span></span>
                      <span>{status}</span>
                    
                  </div>
                  
                </div>
                <div>
                <div className="action-box">
                    <Button href={this.props.link} target="blank" size="small" variant="outlined" color="primary"><ShoppingBasketIcon style={{paddingRight:'0.5rem'}}/>Visit</Button>
                    {/* <Button variant="contained"  style={{margin:'0 0.5rem', backgroundColor:'blue', color:'white'}}><AddBoxRoundedIcon style={{paddingRight:'0.5rem'}} />Add to Catalog</Button> */}
                  </div>
                </div>
            </Paper>
        </div>
        )
    }
}

export default withStyles(styles, {withTheme : true})(ActiveComponent);