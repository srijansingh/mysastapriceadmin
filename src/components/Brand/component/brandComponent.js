import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';

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

class BrandComponent extends Component {
   
   

    render() {
        // const {classes} = this.props;
       
        return (
            <div onClick={this.props.click}>
                

                        <ListItem button>
                                <ListItemIcon><LabelIcon style={{color:"blue"}}/></ListItemIcon>
                                <ListItemText primary={this.props.brand} />
                        </ListItem>

                    
                </div>
                
            
        )
    }
}

export default withStyles(styles, {withTheme : true})(BrandComponent);