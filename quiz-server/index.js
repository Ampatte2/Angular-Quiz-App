const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes")


//connect to the server



const port = process.env.Port || 8000

const app = express()
            .use(cors())
            .use(bodyParser.json())
            .use(router)

app.listen(port, ()=>{
    console.log(`Express is listening on Port: ${port}`)
})