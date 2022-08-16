const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/user', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, name, email, password) 
                       values(${user.id}, '${user.name}', '${user.email}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.put('/user/:id', (req, res)=> {
    const user = req.body
    const updateQuery = `update users
    set name = '${user.name}',
    email = '${user.email}',
    password = '${user.password}'
    where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err) {
            res.send('user updated successfully')
        } else {
            res.send(err.message)
        }
    })
    client.end
})

app.delete('/user/:id', (req, res) => {
    let deleteQuery = `delete from users where id=${req.params.id}`
    client.query(deleteQuery, (err, result) => {
        if(!err){
            res.status(200).send('user deleted successfully')
        } else {
            res.send(err.message)
        }
    })
    client.end
})