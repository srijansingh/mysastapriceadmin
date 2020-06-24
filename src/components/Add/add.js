import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";



const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});
  

class  Customer extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            category:null,
            subcategory:null
           
        }
    }

    handleCategory =() => {
        this.setState({
            isLoading:true
        })

        fetch('https://server.mysastaprice.com/api/scrapper', {
            method :'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
            },
            body : JSON.stringify(this.state)
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Could not fetch product from')
            }
            return res.json()
        })
        .then(response => {
            this.setState({
                isLoading:false
            })
            alert("Category Added")
            window.location.reload(false);
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false,
            })
            alert(err)
        })
    }



       
    render(){

        let buttons;
        if(this.state.isLoading){
            buttons = <input style={{background:'#f1f1f1', padding:'10px 0',border:'none',  width:'100%', outline:'none'}} disabled  type="button" value="Loading..." />
        }
        else
        {
            buttons = <input onClick={this.handleCategory} style={{background:'#f1f1f1', padding:'10px 0',border:'none',  width:'100%', outline:'none'}}  type="button" value="Add Category" />
        }
       
        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Add Product Category to Add in Scrapping Queue
               </Typography>

              
               
                
            </div>
            <div style={{
                height:'80vh',
                overflowY:'scroll',
                overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem'
                }}>
                <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                   <table style={{ width:'700px'}}>
                       <tr style={{ background:'#e6e6e6'}}>
                           <th style={{padding:'10px'}}>
                                Subcategory
                           </th>
                           <th >
                                <select onChange={(event)=> this.setState({subcategory : event.target.value})} style={{background:'white', padding:'10px', width:'100%', outline:'none', border:'none'}} name="subcategory">
                                <option style={{padding:'10px'}} disabled selected value="select">Select</option>
                                    <option key={1} style={{padding:'10px'}} value="electronics">Electronics</option>
                                    <option key={2} style={{padding:'10px'}} value="clothing">Clothing</option>
                                </select>
                               
                           </th>
                       </tr>

                       <tr style={{ background:'#e6e6e6'}}>
                           <th style={{padding:'10px'}}>
                                Category
                           </th>
                           <th >
                               <input   onChange={(event)=> this.setState({category : event.target.value})} style={{background:'white', padding:'10px 0',border:'none',  width:'100%', outline:'none'}} placeholder="Add your category from amazon" type="text" name="category" />
                           </th>
                       </tr>

                       <tr  style={{ background:'#e6e6e6'}}>
                           <th colspan="2" >
                                {buttons}
                           </th>
                       </tr>
                     
                   </table>
                </div>

                
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Customer);