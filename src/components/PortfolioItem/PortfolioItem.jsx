// *----------*  React *----------*
import React, { Component } from 'react';

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';


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
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 160,
        top: 20,
        fontFamily: 'Roboto',
        fontSize: '15px',
        color: '#393e46',
        textAlign: 'left',

    },

    thumbnail: {
        height: 150,
        width: 150,
        position: 'absolute',
        left: 0
    },
    media: {
        height: 150,
        width: 150,
    },
    website: {
        width: '100%',
        height: '33.333%',
        fontSize: '30px',
    },
    github: {

    },
    dateCompleted: {
        height: 20,
        margin: '0px 10px 0px 380px',
        paddingTop: 10,
        fontFamily: 'Roboto',
        fontSize: '15px',
        color: '#AEADAD'
    },
    tag: {
        height: 20,
        position: 'absolute',
        left: 160,
        top: 100,
        fontFamily: 'Roboto',
        fontSize: '15px',
        color: '#AEADAD'
    }
});

class PortfolioItem extends Component {

    handleMediaClick = (gitUrl) => (event) =>{
        window.open(gitUrl, '_blank');
    }

    render() {
        const { classes } = this.props;
        const projectInfo = this.props.information;
        console.log(projectInfo);
        return (
            <div className={classes.container}>

                <p className={classes.name}> {projectInfo.name} </p>
                <p className={classes.tag}> {projectInfo.tag} </p>

                <Card className={classes.thumbnail}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={projectInfo.thumbnail}
                            onClick={this.handleMediaClick(projectInfo.github)}
                        />
                    </CardActionArea>
                </Card>
                {/* <img className={classes.thumbnail} src={projectInfo.thumbnail} alt='' /> */}
                <p className={classes.description}> {projectInfo.description} </p>
                <p className={classes.dateCompleted}>{projectInfo.date_completed}</p>
            </div>
        );
    }
}

export default withStyles(styles)(PortfolioItem);