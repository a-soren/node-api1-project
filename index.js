const express = require('express');
const db= require('./data/db.js');
const server = express();
server.use(express.json());
const port=8000;
server.listen(port,()=> console.log('\n===API on port 8000===\n'));



server.get('/api/users', (req, res)=>{
    db.find()
    .then(hubs => {
        res.json({hubs});
    })
    .catch(err => {
        res.status(500).json({error: 'failed to get data from DB'})
    })
})

server.post('/api/users', (req,res)=>{
    const hubInfo=req.body;

    console.log(hubInfo);

    db.insert(hubInfo)
    .then(hub => {
        res.status(200).json(hub);
    })
    .catch(err => {
        res.status(500).json({error: 'failed to add data to database'})
    })
})

server.put('/api/users/:id', (req,res)=>{
    const id = req.params.id
    const user=req.body;
   if (!user.id){
       res.status(404).json({error:'this user with that id does not exist.'})
   }else{
       if (!user.name || !user.bio){
           res.status(400).json({error:'please type in the name and bio for user'})
           return
       }     
   }

   db.update(id,user)
   .then(updatedUser => {
       db.findById(id).then(updatedUser => {
           res.json(updatedUser)
       })
   })
   .catch(err=> {
       res.status(500).json({error:'user info could not be updated'})
   })
})

server.delete('/api/users/:id', (req,res)=>{
    const id = req.params.id
    db.remove(id)
    .then(count => {
        res.status(200).json({message:`${id} was deleted`})
    })
    .catch(err =>{
        res.status(500).json({error:`${id} was not removed successfully`})
    })
})

