// *----------* React *----------*
import React, { Component } from 'react';

// *----------* Router *----------*
import { withRouter } from 'react-router-dom';

// *----------* Redux *----------*
import { connect } from 'react-redux';

// *----------* Material UI *----------*
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import HomeIcon from '@material-ui/icons/ArrowBackIos';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// *----------* Styling  *----------*
const styles = theme => ({
    container: {
        position: 'absolute',
        margin: '25vh 0px',
    },
    form: {
        // display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#DBD9D9'
    },
    nav: {
        height: 400,
        width: '5vw',
        borderRadius: '6px 0px 0px 6px',
        backgroundColor: 'rgba(238,238,238,.1)',
    },
    textField: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    multiline: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
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
    submitButton: {
        margin: '20px 10% 40px 10%',
        marginTop: 50,
        textSize: 100,
        width: 250,
        height: 50,
        color: '#eeeeee'
    }, table: {
        maxWidth: '100%',
    },
    head: {
        backgroundColor: '#222831'
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(0,173,181,.43)',
        },
        '&:hover button': {
            visibility: 'visible'
        }
    },
    button: {
        visibility: 'hidden'
    }
});

const theme = createMuiTheme({
    palette:
        { primary: { main: '#00adb5' } }
})

class AdminPage extends Component {

    state = {
        name: '',
        description: '',
        thumbnail: '',
        website: '',
        github: '',
        date_completed: '',
        tag: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        // Finds location of tag in array of
        const findLocation = (name) =>{
            let index = 1;
            for(let val of this.props.tags){
                if(val.name === name){
                    return index;
                }
                index++
            }
        }

        this.props.dispatch({type:'POST_PROJECT',payload: {...this.state,tag: (findLocation(this.state.tag))}});
        
        this.setState({
            name: '',
            description: '',
            thumbnail: '',
            website: '',
            github: '',
            date_completed: '',
            tag: ''
        })
    }

    handleDeleteClick = (id) => (event) =>{
        this.props.dispatch({type: 'DELETE_PROJECT', payload:id})
    }

    componentWillMount() {
        this.props.dispatch({ type: 'FETCH_PROJECTS' })
        this.props.dispatch({ type: 'FETCH_TAGS' })
    }

    gotoHome = () => {
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.box}>
                <Grid container className={classes.container} justify="center">
                    <Grid item>
                        <Paper className={classes.nav}>
                            <IconButton
                                aria-label="Close"
                                onClick={this.gotoHome}
                                style={{ margin: '16px 0px 0px 0px', color: '#00adb5' }}
                            >
                                <HomeIcon style={{ width: 30, height: 30 }} />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.content}>
                        <h1 style={{ margin: '16px 0px 16px 0px', fontFamily: 'Roboto', color: '#00adb5', fontSize: '30px' }}>
                            ADMIN
                        </h1>
                        <GridList cellHeight={1000} className={classes.gridList} cols={1} style={{ margin: '0px 5%' }}>
                            <form className={classes.form} noValidate autoComplete="off">
                                <p style={{ textAlign: 'left', margin: '10px 0px 10px 10px', fontFamily: 'Roboto', fontSize: '20px', color: '#222831' }}> ADD PROJECT </p>
                                <TextField
                                    name='name'
                                    value={this.state.name}
                                    label="name"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    name='date_completed'
                                    label='Date'
                                    value={this.state.date_completed}
                                    type="date"
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormControl className={classes.textField}>
                                    <InputLabel >Tag</InputLabel>
                                    <Select
                                        name='tag'
                                        value={this.state.tag}
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {this.props.tags.map((tag, i) => {
                                            return (<MenuItem key={i} value={tag.name}>{tag.name}</MenuItem>);
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    name='github'
                                    value={this.state.github}
                                    label="GitHub URL"
                                    onChange={this.handleChange}
                                    className={classes.textField}
                                />
                                <TextField
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    label="Website URL (optional)"
                                    className={classes.textField}
                                />

                                <TextField
                                    value={this.state.thumbnail}
                                    name='thumbnail'
                                    onChange={this.handleChange}
                                    label="Image URL (optional)"
                                    className={classes.textField}
                                />
                                <TextField
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    label='Description'
                                    multiline
                                    rows="4"
                                    className={classes.multiline}
                                    margin="normal"
                                />
                                <MuiThemeProvider theme={theme}>
                                    <Button variant="contained" color="primary" className={classes.submitButton} onClick={this.handleSubmit}>
                                        submit
                                </Button>
                                </MuiThemeProvider>

                                <Table className={classes.table}>
                                    <TableHead className={classes.head}>
                                        <TableRow>
                                            <TableCell style={{ color: '#eeeeee', fontSize: '25px', fontFamily: 'Roboto' }}>Name</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.projects.map((project, i) => {
                                            return (
                                                <TableRow className={classes.row} key={i}>
                                                    <TableCell style={{ fontSize: '15px', fontFamily: 'Roboto' }} component="th" scope="row">
                                                        {project.name}
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: 'right' }} component="th" scope="row">
                                                        <IconButton onClick={this.handleDeleteClick(project.id)} className={classes.button}>
                                                            <Delete style={{ color: '#FE4365' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </form>
                        </GridList>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        projects: reduxState.projects,
        tags: reduxState.tags
    }
}

export default withRouter(connect(mapStateToProps)((withStyles(styles)(AdminPage))));