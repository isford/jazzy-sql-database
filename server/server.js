const express = require('express');
const bodyParser = require('body-parser');
//require pg and configuration for it
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool ({
    database: 'jazzy_sql',//DB name
    host: 'localhost',
    port: 5432,//db PORT
})

pool.on('connect', () => {
    console.log('Connected to POSTGRES');
});//test for DB connection

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
// const artistList = [ 
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },       
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
// const songList = [
//     {
//         title: 'Take Five',
//         length: '5:24',
//         released: '1959-09-29'
//     },
//     {
//         title: 'So What',
//         length: '9:22',
//         released: '1959-08-17'
//     },
//     {
//         title: 'Black Gold',
//         length: '5:17',
//         released: '2012-02-01'
//     }
// ];

app.get('/artist', (req, res) => {
    console.log(`In /artist GET`);
    const queryText = `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`

    pool.query(queryText)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
    //res.send(artistList);
});

app.post('/artist', (req, res) => {
    console.log('req.body',req.body);

    let queryText = `INSERT INTO "artist"("name", "birthdate")
    VALUES ($1, $2);`

    let values = [req.body.name, req.body.birthdate]//set values 

        pool.query(queryText, values)//sanitizing
    .then( (result) => {
        res.sendStatus(201);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
    //res.sendStatus(201);
});

// app.get('/song', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

app.get('/song', (req, res) => {
    console.log(`In /song GET`);
    const queryText = `SELECT * FROM "song" ORDER BY "title" ASC;`

    pool.query(queryText)
    .then( (result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
    //res.send(artistList);
});

// app.post('/song', (req, res) => {
//     songList.push(req.body);
//     res.sendStatus(201);
// });

app.post('/song', (req, res) => {
    console.log('req.body',req.body);

    let queryText = `INSERT INTO "song" ("title", "length", "released")
    VALUES ($1, $2, $3);`//SQL for DB

    let values = [req.body.title, req.body.length, req.body.released]

        pool.query(queryText, values)//Sanitizing
    .then( (result) => {
        res.sendStatus(201);
    }).catch( (err) => {
        console.log(err);
        res.sendStatus(500);
    })
    //res.sendStatus(201);
});


app.post ('/',)