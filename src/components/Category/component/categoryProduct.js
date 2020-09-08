import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Checkbox from '@material-ui/core/Checkbox';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import "../../Toolbar/ProductComponent.css";
import { baseUrl } from '../../../config/baseUrl';

const styles = (theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.1),
        width: theme.spacing(2),
        height: theme.spacing(2),
      },
    },
  });

class CategoryProduct extends Component {
  constructor(props){
    super(props);
    this.state={
      checked: false,
      checkedBoxes: []
    }
  }

  handleChange = (event, id) => {
    
    if(event.target.checked) {
			let arr = this.state.checkedBoxes;
			arr.push(id);
      console.log(arr)
			this.setState = { checkedBoxes: arr};
		} else{
      let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(id), 1);
      this.setState = {
				checkedBoxes: items
			}
    }
    

  };

  handleStatus =(sid) => {

    fetch(baseUrl+'/api/update/active', {
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
           window.location.reload(false);
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
            <Paper elevation={1} className="product" style={{width:"100%"}}>
              <div>
                  <Checkbox
                    checked={this.state.checkedBoxes.find(p => p === this.props.productId)}
                    value={this.props.productId}
                    onChange={(event) => this.handleChange(event, this.props.productId)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
              </div>
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
                <div >
                  <div className="action-box">
                    <Button href={this.props.link} variant="outlined" color="primary" size="small" style={{width:'100px', marginBottom:'5px'}}><ShoppingBasketIcon style={{paddingRight:'0.5rem'}}/>Visit</Button>
                    <Button onClick={(sid) => {this.handleStatus(this.props.productId)}} variant="outlined" size="small" color="primary" style={{width:'100px',marginTop:'5px'}} ><AddBoxRoundedIcon style={{paddingRight:'0.5rem'}} />Select</Button>
                  </div>
                </div>
            </Paper>
        </div>
        )
    }
}

export default withStyles(styles, {withTheme : true})(CategoryProduct);