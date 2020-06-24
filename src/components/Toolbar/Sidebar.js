import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import LabelIcon from '@material-ui/icons/Label';
import FaceIcon from '@material-ui/icons/Face';
import CategoryIcon from '@material-ui/icons/Category';
import BrandingWatermarkOutlinedIcon from '@material-ui/icons/BrandingWatermarkOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import "./Sidebar.css"
import { Divider } from '@material-ui/core';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function NestedListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


const styles = (theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

  class Sidebar extends Component {
    constructor(){
        super();
        this.state={
            open:false
        }
    }

    handleClick = () => {
        this.setState({
            open:!this.state.open
        })
    }
    render() {

        const {classes} = this.props;

        return (

            <div className="sidebar">
                <List>
                    <ListItemLink key="0"  href="/">
                            <ListItemIcon><DashboardIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                    </ListItemLink>
                   

                    <ListItemLink key="1"  href="/products">
                            <ListItemIcon><LabelIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Search Product" />
                    </ListItemLink>

                    <ListItemLink key="1"  href="/add-category">
                            <ListItemIcon><LabelIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Add Category" />
                    </ListItemLink>
                             
                    <ListItemLink key="2" href="/active">
                            <ListItemIcon><LabelIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Active Product" />
                    </ListItemLink>

                   
                    
                    <ListItemLink key="3" href="/category">
                            <ListItemIcon><CategoryIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Category" />
                    </ListItemLink>

                   

                    <ListItemLink key="4" href="/brand">
                            <ListItemIcon><BrandingWatermarkOutlinedIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Brand" />
                    </ListItemLink>

                    <ListItemLink key="5" href="/customers">
                            <ListItemIcon><FaceIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Customers" />
                    </ListItemLink>
                    
                    <Divider />

                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon >
                        <AccountBoxIcon style={{color:"blue"}}/>
                        </ListItemIcon>
                        <ListItemText primary="My Account" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                        <NestedListItemLink key="6" className={classes.nested} href="/myprofile">
                            <ListItemIcon>
                            <AccountCircleIcon style={{color:"black"}}/>
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </NestedListItemLink>
                        
                        <NestedListItemLink key="7" className={classes.nested} onClick={this.props.logout}>
                            <ListItemIcon>
                                <ExitToAppIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                        </NestedListItemLink>

                        
                        </List>
                    </Collapse>

                </List>
            </div>

        )
    }
}

export default withStyles(styles, {withTheme:true})(Sidebar)