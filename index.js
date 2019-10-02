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
        if(db){
        res.send(db);
        } else {}
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved."});
        //   res.send(error);
    
    });
})

server.get('/api/users/:id', (req,res)=> {
    dbModel
    .findById()
    .then(db => {
    if(db){
        res.send(db);// sends data if the id is there
    } else { // if there is no id a 404 no found for the id is sent instead
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." })
})




// POST <<< request to server ******
server.post('/api/users', (req,res)=>{

    const dbData = req.body;

    dbModel
    .insert(dbData)
    .then(db => {
        if(!dbData.name && !dbData.bio){
          res.status(400).json({
            errorMessage: "Please provide name and bio for the user." 
          });
        }
        else{
            res.status(201).json(db);
        }
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
         //send the list of db's back to the client 
        if(db) {
        res.json(db);// .json() will set the right headers and convert to JSON
        } else { 
            res.status(404).json({
                message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "The user could not be removed" });
     });
})


//PUT 
server.put('/api/users/:id', (req,res)=> {
    const id = req.params.id;
    //grab the changes from the body
    const changes = req.body;

     dbModel
     .update(id, changes)
     .then(db => {
        //send the list back to the client 
        if(!db){
            res.status(404).json({
                message: "The user with the specified ID does not exist" })
        } else if (changes.name && changes.bio) {
            res.json(db);// .json() will set the right headers and convert to JSON
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The user information could not be modified." });
        });
})








// port number 
const port = 5000;
server.listen(port, () => console.log(`\n  ** API on port ${port} **\n`));