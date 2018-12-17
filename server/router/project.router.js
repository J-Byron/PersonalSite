// *----------* Modules *----------*
const express = require('express');
const router = express.Router();
const pg = require('pg');
const url = require('url');

// *----------* Pool *----------*
let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    let params = url.parse(process.env.DATABASE_URL);
    let auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

} else {
    // only change the things on the right side of the ||
    config = {
        user: process.env.PG_USER || null, //env var: PGUSER
        password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
        host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
        port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
        database: process.env.DATABASE_NAME || 'portfolio', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

const pool = new pg.Pool(config)

// *----------* Routes *----------*
router.post('/', (req, res) => {
    const project = req.body;
    const queryString = `INSERT INTO projects (name,description,github, thumbnail, website, date_completed ,tag_id ) VALUES ($1,$2,$3,$4,$5,$6,$7);`;

    pool.query(queryString,[project.name,project.description, project.github, project.thumbnail, project.website, project.date_completed, project.tag])
    .then(result => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log(`Error from DB in post: ${err}`);
        res.send(500)
    });

});

router.get('/', (req, res) => {
    const queryString = `SELECT projects.name, projects.description, projects.github, projects.thumbnail, projects.website, projects.date_completed , tags.name as tag
    FROM projects JOIN tags ON projects.tag_id = tags.id ORDER BY projects.date_completed DESC;`;

    pool.query(queryString).then(result=>{
        console.log(result.rows);
        res.send(result.rows);
    }).catch(err=>{
        console.log(`Error from DB in get: ${err}`);
        res.sendStatus(500);
    })
});

router.get('/tags', (req, res) => {
    const queryString = `SELECT tags.name FROM tags;`;
    pool.query(queryString).then(result=>{
        res.send(result.rows)
    }).catch(err=>{
        console.log(`Error from DB in /tags get: ${err}`);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const queryString = 'DELETE FROM projects WHERE id=$1;';
    pool.query(queryString,[id]).then(result=>{
        res.sendStatus(201);
    }).catch(err=>{
        res.sendStatus(500);
    });
});

// *----------* Export *----------*
module.exports = router;