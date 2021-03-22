const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const db =require('./db')
const schema = require('./schema')
const app = express()

const port = process.env.PORT || 3000;


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql : true
}))

app.listen(port,()=>{

    console.log("app is listening to port ",port)
    
})

