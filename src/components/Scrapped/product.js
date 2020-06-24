import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {fade, withStyles } from "@material-ui/core/styles";
import SearchResult from "./component/searchResult";
import "./product.css";


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
  

class Product extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            searchItem : '',
            products : [],
            count : 0,
            error:false
        }
    }

    searchHandle = (event) => {
        console.log(this.state.searchItem)
       
        this.setState({
            searchItem : event.target.value,
            isLoading:true
        })
        console.log(this.state)
        fetch('https://server.mysastaprice.com/api/product/search', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + this.props.token
            },
            body : JSON.stringify(this.state)
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        })
            .then(response => {
                console.log(response.post);
                this.setState({
                    products : response.post,
                    count : response.post.length,
                    isLoading:false,
                    error:false
                })
               
                
            })
        
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false,
                error:true
            })
    
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
        if(this.state.searchItem===''){
            Listing = (
                <div className={classes.root}>
                <Paper elevation={3} style={{height:'200px', width:'800px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{display:'flex', alignItem:'center'}}>
                        <SearchIcon style={{color:'blue', textAlign:'center',fontSize:'4rem'}} />
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around', alignItem:'center',color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Start typing to search for product</div>
                    </div>
                </Paper>
            </div>
            );
        }
        else if(this.state.isLoading){
            Listing = (
                <div className={classes.root} style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    {Loader}
                {Loader}
                {Loader}
                </div>
                
            )
        }
        
        else if(this.state.searchItem!=='' && this.state.products.length < 1){
            Listing = (
                <div className={classes.root}>
                <Paper elevation={3} style={{height:'200px', width:'800px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No search result for "{this.state.searchItem}"</div>
                </Paper>
            </div>
            );
        }

        // else if(this.state.searchItem!=='' && !this.state.isLoading && this.state.error){
        //     Listing = (
        //         <div className={classes.root}>
        //         <Paper elevation={3} style={{height:'200px', width:'800px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
        //             <div style={{color:'red',fontSize:'1.2rem',fontWeight:'bold'}}>Something went wrong. Please check your internet connection</div>
        //         </Paper>
        //     </div>
        //     );
        // }


        else if(this.state.products!==[]){
            Listing = this.state.products.map((product, index) => {
               return <SearchResult
                key={product._id} 
                token={this.props.token}
                image={product.image} 
                title={product.title}
                brand = {product.brand}
                link={product.link}
                price={product.price} 
                status={product.status}
                rating={product.rating} 
                productId={product._id} 

                />
           })
       
       }
       


       

        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.5rem'}}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}

                        onChange ={ (event) => this.searchHandle(event)}
                    />
                </div>
            </div>
            <div style={{
                height:'100vh',
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

export default withStyles(styles, {withThemes: true})(Product);