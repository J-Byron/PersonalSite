import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

// *----------* React-Redux *----------*
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// *----------* Redux-Saga *----------*
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects'

// *----------* Axios *----------*
import Axios from 'axios';

// "id"
// "name"
// "description"
// "thumbnail"
// "website"
// "github"
// "date_completed"
// "tag_id"

const fakeData = [
    {
        id: 9,
        name: 'Example1',
        description: 'Blah x3',
        thumbnail: 'https://yt3.ggpht.com/a-/AN66SAyn4D2lHHaONid5n_y_ZIsyInEUOoktizKFew=s900-mo-c-c0xffffffff-rj-k-no',
        website: 'google.com',
        github: 'https://colorhunt.co/popular',
        date_completed: '2015-09-09',
        tag: 'JS'
    },
    {
        id: 10,
        name: 'Example2',
        description: 'Blah x9',
        thumbnail: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
        website: 'google.com',
        github: 'github.com',
        date_completed: '2015-09-09',
        tag: 'JQuery'
    },
    {
        id: 11,
        name: 'Example3',
        description: 'Blah x9',
        thumbnail: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
        website: 'google.com',
        github: 'github.com',
        date_completed: '2015-09-09',
        tag: 'Redux'
    },
]




// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// *----------* REDUX *----------*

// Used to store projects returned from the server
const projects = (state = fakeData, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        projects,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// *----------* SAGAS *----------*

function* fetchProjects() {
    try {
        // Get data from table
        const projectResponse = yield call(Axios.get, '/projects');
        // update reduxStore with response from table
        yield dispatch({ type: 'SET_PROJECTS', payload: projectResponse.data })
    } catch (error) {
        console.log(`Error in fetchProjects: ${error}`);
    }
}

function* fetchTags() {
    try {
        // Get data from table
        const tagResponse = yield call(Axios.get, '/projects/tags');
        // update reduxStore with response from table
        yield dispatch({ type: 'SET_TAGS', payload: tagResponse.data })
    } catch (error) {
        console.log(`Error in fetchProjects: ${error}`);
    }
}

function* postProject(action) {
    try {
        console.log('Sending to projects: ', action.payload);
        // send data to table
        yield call(Axios.post, '/projects', action.payload);

        // dispatch fetch to update reduxStore with new data in DB
        yield dispatch({type: 'FETCH_PROJECTS'})

    } catch (error) {
        console.log(`Error in postProject: ${error}`);
    }
}




// Create the rootSaga generator function
function* rootSaga() {
    // fetches projects from project table: fetch -> axios -> router -> DB -> router -> axios -> fetch -> projects
    yield takeEvery('FETCH_PROJECTS', fetchProjects)

    // fetches tags from tags table: fetch -> axios -> router -> DB -> router -> axios -> fetch -> tags
    yield takeEvery('FETCH_TAGS', fetchTags)

    // posts project to table: post -> axios -> router -> DB. post -> Fetch
    yield takeEvery('POST_PROJECT', postProject)
}

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
