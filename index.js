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
server.delete('/api/users/:id', (req,res) => {
  
     const id = req.params.id;

     dbModel
     .remove(id)
     .then(res => {
         //send the list of hubs back to the client 
        res.json(db);// .json() will set the right headers and convert to JSON
    })
    .catch(error => {
        res.json({
            message: 'error saving the db'});
     });
})





//PUT 
server.put('/api/user/:id', (req,res)=> {
    const id = req.params.id;
    //grab the changes from the body
    const changes = req.body;

     dbModel.update(id, changes)
     .then(db => {
        //send the list of hubs back to the client 
        res.json(db);// .json() will set the right headers and convert to JSON
        })
        .catch(error => {
            res.json({
                message: 'error saving the db'});
        });
})








// port number 
const port = 5000;
server.listen(port, () => console.log(`\n  ** API on port ${port} **\n`));