// *----------* React *----------*
import React, { Component } from 'react';

// *----------* Router *----------*
import { withRouter } from 'react-router-dom';

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// *----------* Styling  *----------*
const styles = theme => ({
    container: {
        position: 'absolute',
        margin: '25vh 0px',
    },
    info: {
        height: 400,
        width: '30vw',
        borderRadius: '6px 0px 0px 6px',
        backgroundColor: '#eeeeee'
    },
    navigation: {
        height: 400,
        width: '20vw',
        borderRadius: '0px 6px 6px 0px',
        background: 'none',
        backdropFilter: 'blur(5px)',
    },
    button: {
        width: '100%',
        height: '33.333%',
        fontSize: '30px',
    }
});

const theme = createMuiTheme({
    palette:
        { primary: { main: '#00adb5' } }
})

class HomePage extends Component {

    gotoAbout = () =>{
        console.log(`Going to about`);
        // this.props.history.push('/about')
    }

    gotoPortfolio = () =>{
        console.log(`Going to portfolio`);
        // this.props.history.push('/portfolio)
    }
    gotoContact = () =>{
        console.log(`Going to contact`);
        // this.props.history.push('/contact')
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.box}>
                <Grid container className={classes.container} justify="center">
                    <Grid item>
                        <Paper className={classes.info}>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.navigation}>
                            <MuiThemeProvider theme={theme}>

                                <Button name={'about'} color="primary" className={classes.button} onClick={this.gotoAbout}>
                                    About
                            </Button>

                                <Button name={'portfolio'} color="primary" className={classes.button} onClick={this.gotoPortfolio}>
                                    Portfolio
                            </Button>

                                <Button name={'contact'} color="primary" className={classes.button} onClick={this.gotoContact}>
                                    Contact
                            </Button>

                            </MuiThemeProvider>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter((withStyles(styles)(HomePage)));