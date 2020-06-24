import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import {fade, withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import BrandComponent from "./component/brandComponent";
import BrandProduct from "./component/brandProduct";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import "./brand.css";

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
  

class Brand extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            isProductLoading:false,
            brand : [],
            products:[],
            countBrand:0,
            countProduct:null,
            selected : null

        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://server.mysastaprice.com/api/brand', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + this.props.token
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
                brand : response.post,
                countBrand : response.post.length,
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

        fetch('https://server.mysastaprice.com/api/brand/product', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization : 'Bearer ' + this.props.token
            },
            body : JSON.stringify({category:category})
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch Product from ' + category)
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
                isProductLoading:false
            })
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
        
        else if(this.state.brand.length < 1){
            Listing = (
                <div className={classes.root}>
                <Paper elevation={3} style={{height:'50px', width:'300px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No active products in catalogue</div>
                </Paper>
            </div>
            );
        }

        else if(this.state.brand!==[]){
            Listing = this.state.brand.map((product, index) => {
               return <BrandComponent
                    key={index} 
                    brand={product._id}
                    click={(cat) => {this.handleCatagory(product._id)}}
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
           return <BrandProduct
            key={product._id} 
            image={product.image} 
            title={product.title}
            brand = {product.brand}
            link={product.link}
            price={product.price} 
            status={product.status}
            rating={product.rating} 
            productId={product._id} 
            token={this.props.token}
            />
       })
   
   }
   




       
        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
               <Typography style={{color:'white'}}>
                  Brand
               </Typography>

               <Typography style={{color:'white'}}>
                  Total Brand: {this.state.countBrand}
               </Typography>
            </div>
            <div style={{
                height:'100vh',
                // overflowY:'scroll',
                // overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
                }}>
                    <div style={{
                        position:"fixed",
                        display:'flex',
                        flexDirection:'column',
                        
                        flexWrap:'wrap',height:'100vh',width:'250px', borderRight:"2px solid #e6e6e6"}}>
                            <div style={{overflowY:'scroll',
                        overflowX:'hidden',
                        height:'100vh'}}>
                        {Listing}
                        </div>
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

export default withStyles(styles, {withThemes: true})(Brand);