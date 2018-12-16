// *----------*  React *----------*
import React, { Component } from 'react';

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';

// {
//     id: 9,
//     name: 'Example1',
//     description: 'Blah x3',
//     thumbnail: 'https://yt3.ggpht.com/a-/AN66SAyn4D2lHHaONid5n_y_ZIsyInEUOoktizKFew=s900-mo-c-c0xffffffff-rj-k-no',
//     website: 'google.com',
//     github: 'github.com',
//     date_completed: '2015-09-09',
//     tag_id: 5
// }

const styles = theme => ({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#DBD9D9',
        margin: '0px',
    },
    name: {
        height: 20,
        margin: '0px',
        position: 'absolute',
        left: 160,
        top: 10,
        fontFamily: 'Roboto',
        color: '#00adb5'

    },
    description: {
        height: 80,
        width: 380,
        backgroundColor: 'blue',
        position: 'absolute',
        left: 160,
        top: 20,
        fontFamily: 'Roboto',
        color: '#00adb5'
    },

    thumbnail: {
        height: 150,
        width: 150,
        position: 'absolute',
        left: 0
    },

    website: {
        width: '100%',
        height: '33.333%',
        fontSize: '30px',
    },
    github: {

    },
    dateCompleted: {

    },
    tag: {

    }
});

class PortfolioItem extends Component {
    render() {
        const {classes} = this.props;
        const projectInfo = this.props.information;
        return (
                <div className={classes.container}>

                    <p className={classes.name}> {projectInfo.name} </p>
                    <img className={classes.thumbnail} src={projectInfo.thumbnail} alt='' />
                    <p className={classes.description}> {projectInfo.description} </p>
                </div>
        );
    }
}

export default withStyles(styles)(PortfolioItem);