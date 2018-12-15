// *----------* React *----------*
import React, { Component } from 'react';

// *----------* Redux *----------*

// *----------* Router *----------*

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles =  {
    root: {
      width: 200,
      height: 300,
    },
  };

class HomePage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                hello
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);