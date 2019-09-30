// implement your API here

const express = require('express');
// install the npm express

const dbModel = require 
('./data/db.js'); //<<<<< data access

const server = express();


// teach express how to read JSON from the request body 
server.use(express.json());




// GET request through server for rendering the list of data ******
server.get('/api/users', (req, res) => {
    dbModel
    .find()
    .then(db => {
         //send list of hubs back to the client 
        res.send(db);
    }).catch(error => {
          res.send(error);

    });
})

// POST <<< request to server ******
server.post('/api/users', (req,res)=>{

    const dbData = req.body;

    dbModel
    .insert(dbData)
    .then(db => {
        res.json(db);
    })
    .catch(error => {
        res.json({message: 'error saving the user' })
    });
})

// DELETE






//PUT 









// port number 
const port = 5000;
server.listen(port, () => console.log(`\n  ** API on port ${port} **\n`));