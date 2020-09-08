import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import {fade, withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography, FormControlLabel, Divider } from "@material-ui/core";
import CategoryComponent from "./component/categoryComponent";
import CategoryProduct from "./component/categoryProduct";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Checkbox from '@material-ui/core/Checkbox';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

import "./category.css";
import "../Toolbar/ProductComponent.css";
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
    },
    '& svg': {
        margin: theme.spacing(1.5),
      },
      '& hr': {
        margin: theme.spacing(0, 0.5),
      },
  });
  

class Category extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            isProductLoading:false,
            categories : [],
            products:[],
            countCategory:null,
            countProduct:null,
            selected : null,
            checkedBoxes:[]

        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch(baseUrl+'/api/category', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+ this.props.token
            }
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch category')
            }
            return res.json();
        })
        .then(response => {
                console.log(response)
                this.setState({
                    categories : response.category,
                    isLoading:false
                })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false
            })
            alert(err)
        })
    }



    handleCatagory =(category) => {
        console.log("Cat "+category)
        this.setState({
            selected:category,
            isProductLoading:true
        });

        fetch(baseUrl+'/api/category/product', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
            },
            body : JSON.stringify({category:category})
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Could not fetch product from' + category)
            }
            return res.json()
        })
        .then(response => {
            console.log(response.post);
            this.setState({
                products : response.post,
                countProduct : response.post.length,
                isProductLoading:false
            }) 
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isProductLoading:false,
            })
            alert(err)
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
            fetch(baseUrl+'/api/update/active', {
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
        let Listing;
        if(this.state.isLoading){
            Listing = (
                <List>

                        <ListItem>
                                <ListItemIcon><CircularProgress style={{color:"blue"}}/></ListItemIcon>
                                <ListItemText prumary="Loading"/>
                                
                        </ListItem>

                    </List>
            )
        }
        
        else if(this.state.categories.length < 1){
            Listing = (
                <div className={classes.root}>
                <Paper elevation={3} style={{height:'50px', width:'300px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No active products in catalogue</div>
                </Paper>
            </div>
            );
        }

        else if(this.state.categories!==[]){
            Listing = this.state.categories.map((product, index) => {
               return <CategoryComponent
                    key={index} 
                    category={product}
                    click={(cat) => {this.handleCatagory(product)}}
                />
           })
       
       }


    let ProductList;

    const Loader = (
        <Paper elevation={3} style={{height:'200px', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
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
    
    if(this.state.selected === null){
        ProductList = (
            <div>
            <Paper elevation={3} style={{height:'100vh', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Please click on the Category</div>
            </Paper>
        </div>
        
        );
    }
   else if(this.state.isProductLoading){
    ProductList= (
        <div className={classes.root}>
        {Loader}
        {Loader}
        {Loader}
       
       
        </div>
        )
    }
    
    else if(this.state.selected!==null && this.state.products.length < 1){
        ProductList = (
            <div className={classes.root}>
            <Paper elevation={3} style={{height:'200px', width:'600px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No Result Available</div>
            </Paper>
        </div>
        );
    }

    else if(this.state.products!==[]){
        ProductList= this.state.products.map((product, index) => {

        let status;
        if(product.status === 'active'){
        status = <div style={{color:'lawngreen'}}>Active</div>
        }
        else{
          status = <div style={{color:'red'}}>Inactive</div>
        }

           return (
                <div key={product._id} className={classes.root}>
                    <Paper elevation={1} className="product" style={{width:"100%"}}>
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
    
        return (
            <div>
                <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                <Typography style={{color:'white'}}>
                    Category {this.state.count}
                </Typography>

                <Typography style={{color:'white'}}>
                    
                        
                        <Button style={{width:'200px'}} size="small" color="secondary" variant="contained" onClick={this.handleUpdateStatus}>Add to Catalog</Button>
                       
                </Typography>
                </div>
               
                <div style={{
                        height:'80vh',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between'
                    }}>
                        <div style={{
                                position:"fixed",
                                display:'flex',
                                flexDirection:'column',
                                flexWrap:'wrap',height:'100vh',width:'250px', borderRight:"2px solid #e6e6e6"
                            }}>
                            {Listing}
                        </div>
                        <div style={{
                            position:'absolute',
                            maxWidth:'850px',
                            width:'100%',
                            left:'260px',
                            height:'100vh',
                            overflowY:'scroll',
                            overflowX:'hidden',
                        }}>
                            
                            {ProductList}
                        </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withThemes: true})(Category);