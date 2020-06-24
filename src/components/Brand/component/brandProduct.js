import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import "./brandProduct.css";

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  });

class BrandProduct extends Component {

  handleStatus =(sid) => {

    fetch('https://server.mysastaprice.com/api/update/active', {
      method: 'PUT',
      headers : {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization : 'Bearer '+ this.props.token
      },
      body : JSON.stringify({id:sid})
    })
    .then(res => {
      if(res.status !==200 ){
        throw new Error('Could not add to Catalogue')
      }
      return res.json()
    })
    .then(response => {
          console.log(response);
          alert("Product added to catalogue");
  })
  .catch(err => {
      console.log(err);
      alert(err)
  })
  }

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
            <Paper elevation={3} className="product" style={{height:'200px', width:'100%'}}>
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
                  <div className="action-box">
                    <Button href={this.props.link} variant="contained" color="secondary" style={{marginRight:'0.5rem',  backgroundColor:'blue', color:'white'}}><ShoppingBasketIcon style={{paddingRight:'0.5rem'}}/>Visit at Amazon</Button>
                    <Button onClick={(sid) => {this.handleStatus(this.props.productId)}}  variant="contained"  style={{margin:'0 0.5rem', backgroundColor:'blue', color:'white'}}><AddBoxRoundedIcon style={{paddingRight:'0.5rem'}} />Add to Catalog</Button>
                  </div>
                </div>
            </Paper>
        </div>
        )
    }
}

export default withStyles(styles, {withTheme : true})(BrandProduct);