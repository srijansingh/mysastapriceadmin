import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import {fade, withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography, Checkbox, Divider, Button } from "@material-ui/core";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import "./active.css"
import { baseUrl } from "../../config/baseUrl";


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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      maxWidth:'400px',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'white'
    },
    inputRoot: {
      color: 'white',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }
  });
  

class Active extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            products : [],
            count:null,
            checkedBoxes:[]
        }
    }

    componentDidMount(){

        this.setState({
            isLoading:true
        });

        fetch(baseUrl+'/api/activeproduct', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization : 'Bearer ' + this.props.token
            }
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch Active Products')
            }

            return res.json()
        })
            .then(response => {
                console.log(response)
                this.setState({
                    products : response.post,
                    count : response.post.length,
                    isLoading:false
                })
 
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false
            })
        })
    }


    handleChange = (event, id) => {
    
        if(event.target.checked) {
                let arr = this.state.checkedBoxes;
                let ids =`${id}`
                arr.push(ids);
                this.setState = { checkedBoxes: arr};
                console.log(arr)
            } else{
          let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(`${id}`), 1);
          this.setState = {
                    checkedBoxes: items
                }
        }
        
    
      };

    

      handleUpdateStatus = () => {
            fetch(baseUrl+'/api/update/inactive', {
                method: 'PUT',
                headers : {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  Authorization : 'Bearer '+ this.props.token
                },
                body : JSON.stringify({checkedBoxes:this.state.checkedBoxes})
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
    

    render(){

        const {classes} = this.props;
        
        const Loader = (
            <Paper elevation={3} style={{height:'200px', width:'800px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                <div className="a-product-image">
                      
                    </div>
                    <div className="a-product-box">
                      <div className="a-product-details">
                          <span className="a-title"></span>
                          <span className="a-price" ></span>
                          <span className="a-price" ></span>
                        
                      </div>
                      <div className="a-action-box">
                            <div className="a-buttons"></div>
                            <div className="a-buttons"></div>
                      </div>
                    </div>
                </Paper>
        )
  

        let Listing;
        if(this.state.isLoading){
            Listing = (
                <div className={classes.root} style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    {Loader}
                    {Loader}
                    {Loader}
                </div>
            )
        }
        
        else if(this.state.products.length < 1){
            Listing = (
                <div className={classes.root}>
                <Paper elevation={3} style={{height:'200px', width:'800px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No active products in catalogue</div>
                </Paper>
            </div>
            );
        }

        else if(this.state.products!==[]){
            Listing= this.state.products.map((product, index) => {
    
            let status;
            if(product.status === 'active'){
            status = <div style={{color:'lawngreen'}}>Active</div>
            }
            else{
              status = <div style={{color:'red'}}>Inactive</div>
            }
    
               return (
                    <div key={product._id} className={classes.root}>
                        <Paper elevation={1} className="product" style={{width:"800px", padding:'5px 0'}}>
                            <div className="product-check">
                                
                          
                            <Checkbox
                                            checked={this.state.checkedBoxes.find(p => p === product._id)}
                                            value={product.productId}
                                            onChange={(event) => this.handleChange(event, product._id)}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            style={{ border:'1px solid #e6e6e6'}}
                                    >
        
                                <Divider orientation="vertical" flexItem />
                                 </Checkbox>  
                                
                            </div>
                                <div className="product-images">
                                <img src={product.image} alt={product.title} />
                                </div>
                                <div className="product-box">
                                <div className="product-details">
                                    <span className="title">{product.title}</span>
                                    <span style={{fontWeight:'bold'}}>Price : <span style={{fontWeight:'normal'}}>{product.price}</span></span>
                                    <span style={{fontWeight:'bold'}}>Rating :<span style={{fontWeight:'normal'}}>{product.rating}</span></span>
                                    <span>{status}</span>
                                    
                                </div>
                                
                                </div>
                                <div >
                                <div className="action-box">
                                    <Button href={product.link} variant="outlined" color="primary" size="small" style={{width:'100px', marginBottom:'5px'}}><ShoppingBasketIcon style={{paddingRight:'0.5rem'}}/>Visit</Button>
                                </div>
                            </div>
                        </Paper>
                    </div>
               )
           })
       
       }

       let productCount;
       if(this.state.isLoading){
           productCount = (
               <CircularProgress size={18} style={{color:'white'}} />
           )
       }
       else{
           productCount = this.state.count
       }
       
        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.5rem', display:'flex', justifyContent:'space-between'}}>
               <Typography style={{color:'white'}}>
                   Active Products
               </Typography>

               <Typography style={{color:'white'}}>
                  Total Product : {productCount}
               </Typography>
               <Typography style={{color:'white'}}>
                    
                        
                    <Button style={{width:'200px'}} size="small" color="secondary" variant="contained" onClick={this.handleUpdateStatus}>Remove from Catalog</Button>
                   
            </Typography>
            </div>
            <div style={{
                height:'95vh',
                overflowY:'scroll',
                overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                alignItems:'center',
                justifyContent:'space-around'
                }}>
                {Listing}
            </div>
            </div>
        )
    }
}

export default withStyles(styles, {withThemes: true})(Active);