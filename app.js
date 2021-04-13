const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const e = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

// mysql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_beers'
})

// get all beers
app.get('', (req, res) =>{

    pool.getConnection((err,connection) =>{
       if(err) throw err
       console.log(`connected as id ${connection. threadId}`)
       
       connection.query('SELECT * from beers', (err, rows) =>{
           connection.release() // return the connection to pool

           if(!err){
               res.send(rows)
           }else{
               console.log(err)
           }
           
       })
    })
})

// get a beer by id
app.get('/:id', (req, res) =>{

    pool.getConnection((err,connection) =>{
       if(err) throw err
       console.log(`connected as id ${connection. threadId}`)
       
       connection.query('SELECT * from beers WHERE id=?',[req.params.id], (err, rows) =>{
           connection.release() // return the connection to pool

           if(!err){
               res.send(rows)
           }else{
               console.log(err)
           }
           
       })
    })
})

// Delete a records / beer
app.delete('/:id', (req, res) =>{

    pool.getConnection((err,connection) =>{
       if(err) throw err
       console.log(`connected as id ${connection. threadId}`)
       
       connection.query('DELETE from beers WHERE id=?',[req.params.id], (err, rows) =>{
           connection.release() // return the connection to pool

           if(!err){
               res.send(`beer with the record ID: ${[req.params.id]} has been removed.`)
           }else{
               console.log(err)
           }
           
       })
    })
})

// Add a record / beer
app.post('', (req, res) =>{

    pool.getConnection((err,connection) =>{
       if(err) throw err
       console.log(`connected as id ${connection. threadId}`)

       const params = req.body
       
    
       connection.query('INSERT INTO beers SET ?', params, (err, rows) =>{
           connection.release() // return the connection to pool

           if(!err){
               res.send(`beer with the record ID: ${params.name} has been added.`)
           }else{
               console.log(err)
           }
           
       })

       console.log(req.body)
    })
})


// Update a record / beer
app.put('', (req, res) =>{

    pool.getConnection((err,connection) =>{
       if(err) throw err
       console.log(`connected as id ${connection. threadId}`)

       const {id, name, tagline, description, image } = req.body
       
    
       connection.query('UPDATE beers SET name =?,tagline=?, description=?, image=? WHERE id =? ', [name, tagline,description,image, id], (err, rows) =>{
           connection.release() // return the connection to pool

           if(!err){
               res.send(`beer with the record ID: ${name} has been added.`)
           }else{
               console.log(err)
           }
           
       })

       console.log(req.body)
    })
})



//listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))