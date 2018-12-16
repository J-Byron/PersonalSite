// *----------* React *----------*
import React, { Component } from 'react';

// *----------* Router *----------*
import { withRouter } from 'react-router-dom';

// *----------* Redux *----------*
import { connect } from 'react-redux';

// *----------* Components *----------*
import PortfolioItem from '../PortfolioItem/PortfolioItem';

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


// *----------* Styling  *----------*
const styles = theme => ({
    container: {
        position: 'absolute',
        margin: '25vh 0px',
    },
    nav: {
        height: 400,
        width: '5vw',
        borderRadius: '6px 0px 0px 6px',
        backgroundColor: 'rgba(238,238,238,.1)',
    },
    content: {
        height: 400,
        width: '45vw',
        borderRadius: '0px 6px 6px 0px',
        backgroundColor: '#eeeeee',
        backdropFilter: 'blur(5px)',
    },
    gridList: {
        width: '90%',
        height: '310px',
        backgroundColor: 'transparent',
    },
});

class PortfolioPage extends Component {
    render() {
        const { classes } = this.props;
        const data = this.props.projects.map((information,i)=>{
            return(
                <GridListTile key={i}>
                    <PortfolioItem information={information}/>
                </GridListTile>
            );
        })

        return (
            <div className={classes.box}>
                <Grid container className={classes.container} justify="center">
                    <Grid item>
                        <Paper className={classes.nav}>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.content}>
                        <h1 style={{ margin: '16px 0px 16px 0px', fontFamily: 'Roboto', color: '#00adb5', fontSize: '30px' }}>
                            PROJECTS
                        </h1>

                        <GridList cellHeight={150} className={classes.gridList} cols={1} style={{ margin: '0px 5%' }}>
                            {data}
                        </GridList>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        projects: reduxState.projects
    }
}
export default withRouter(connect(mapStateToProps)((withStyles(styles)(PortfolioPage))));