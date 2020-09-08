import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography,Paper } from "@material-ui/core";
import CustomerComponent from "./component/customerComponent";
import { baseUrl } from "../../config/baseUrl";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
            customer:[]
           
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })


        fetch(baseUrl+'/api/customer', {
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
                    customer : response.post,
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



       
    render(){

        const {classes} = this.props;
        
        const customers = this.state.customer.map((list, index) => {
            return <CustomerComponent key={index} index={index} name={list.name} email={list.email} />
        })

        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Customer
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
                <div style={{ width:'500px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                                <TableRow>  
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

                
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Customer);