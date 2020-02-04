const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes")
const url = require("url");



//connect to the server


const port = process.env.PORT;

const app = express()
            .use(cors())
            .use(bodyParser.json())
            .use(router)

const distDir = __dirname + "/dist/"

app.use(express.static(distDir));

app.listen(port, ()=>{
    console.log(`Express is listening on Port: ${port}`)
})