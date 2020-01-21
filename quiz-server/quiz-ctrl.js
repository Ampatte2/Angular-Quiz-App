const bcrypt = require("bcrypt");
const mysql = require("mysql");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const expressJwt = require("express-jwt");
const SqlString = require("sqlstring");

const connection = mysql.createConnection({
    host: "localhost",
    user: "quiz",
    password: "Roflpwn123",
    database: "quiz"
})
connection.connect(function(err){
    if(err)throw err;
    console.log("connected");
});

let privateKey = fs.readFileSync('./private.key', 'utf8');
let publicKey = fs.readFileSync('./public.key', 'utf8');

const signOptions = {
    expiresIn: "30d",
    algorithm: "RS256"
}

const checkIfAuthenticated = expressJwt({
    secret: publicKey
})

category = async (req, res, next)=>{
        //used query string to access the right category and get data to populate
        connection.query("SELECT * FROM problems WHERE framework=('"+req.query.type+"')", function(err, response){
            
            if(response[0]===undefined){
                console.log("error")
            }else{
                let result = JSON.parse(JSON.stringify(response))
                res.send(result);
            }
        })
        
        
    }


addproblem = async (req, res, next)=>{
    //used query string to access the right category and get data to populate
    
    let uniqueId = `${req.body.userId}` + "P" + `${req.body.problemId}`;
    

    //Working on not having it add duplicate values to the database;
    //Already created uniqueid to determine whether combination was unique by form userId + P + problemid;
    connection.query("INSERT IGNORE INTO myproblems VALUES ('"+req.body.userId+"', '"+req.body.problemId+"', '"+uniqueId+"')", function(err, response){
        if(err){
            console.log(err);
        }else{
            
            res.send({user: req.body.userId})
        }
    })
    
    
}

myproblems = async (req, res, next)=>{

    let userId = parseInt(req.query.data);
    

    connection.query("SELECT * FROM problems WHERE id IN(SELECT problemid FROM myproblems WHERE userid='"+userId+"')", function(err, response){
        if(err){
            console.log(err);
        }else{
            let result = JSON.parse(JSON.stringify(response)); 
            res.send(result);
        }
    })
}
createproblem = async (req,res,next)=>{

        let problem = req.body.problem

        connection.query("INSERT INTO problems VALUES (Null,"+SqlString.escape(problem.title)+", "+SqlString.escape(problem.description)+", "+SqlString.escape(problem.answer)+", "+SqlString.escape(problem.framework)+", "+SqlString.escape(problem.difficulty)+", "+SqlString.escape(problem.img)+", "+SqlString.escape(parseInt(problem.author))+"); ", function(err, response){
            
            if(err){
                console.log(err);
            }else{
                res.send({problemId:response.insertId, userId: problem.author})
            }
        })
        
    }

    //login the user
login = async (req,res,next) =>{
    let user = req.body.user.username;
    let password = req.body.user.password;

    let results = await new Promise((resolve, reject)=>connection.query("SELECT id, username, password FROM users WHERE username=('"+req.body.user.username+"')", function(err, response){
        if(response[0]=== undefined){
            
            res.status(201).json({message: "no user was found"});
        }else if(response[0].password !== password){
            res.status(201).json({message: "incorrect password"});

        }else{
            let payload = {username: user};
            let token = jwt.sign(payload, privateKey, signOptions);
            res.json({
                token:token,
                id:response[0].id,
                expiresIn: jwt.decode(token).exp
            });
        }
    }) 
    );
    
        
                 
            
            
        
        
    }

register = async (req,res, next) =>{
    
    
    connection.query("INSERT INTO users VALUES (null, "+SqlString.escape(req.body.user.username)+", "+SqlString.escape(req.body.user.password)+", null)", function(err, response){
        if(err){
            console.log("error");
            res.status(200).json({error: err.sqlMessage});
        }else{
            res.send(response)
        }
    })
    
    

}

search = async (req,res,next)=>{
    //if req.body.type = myproblems
    console.log(req.body.data)
    if(req.body.data.view === "myproblems"){
    connection.query("SELECT * FROM problems WHERE MATCH (title) AGAINST("+SqlString.escape(req.body.data.description)+" IN NATURAL LANGUAGE MODE) AND id IN(SELECT problemid FROM myproblems WHERE userid="+SqlString.escape(req.body.data.userid)+") and framework="+SqlString.escape(req.body.data.framework)+";", function(err, response){
        if(err){
            console.log("error", err.sqlMessage)
            res.status(200).json({error:err.sqlMessage})
        }else{
            let result = JSON.parse(JSON.stringify(response));
            console.log(result)
            res.send(result);
        }
    })
    }else{
        connection.query("SELECT * FROM problems WHERE MATCH (title) AGAINST("+SqlString.escape(req.body.data.description)+" IN NATURAL LANGUAGE MODE) and framework="+SqlString.escape(req.body.data.framework)+"", function(err, response){
            if(err){
                console.log("error", err.sqlMessage)
                res.status(200).json({error:err.sqlMessage});
            }else{
                let result = JSON.parse(JSON.stringify(response));
                console.log(result)
                res.send(result);
            }
        })
    }
    //else if req.body.type = problems
    //connect.query("SELECT * FROM problems WHERE MATCH (description) AGAINST("+SqlString.escape(req.body)+" IN NATURAL LANGUAGE MODE) and framework="+SqlString.escape(req.body)+"",
}




module.exports = {
    register,
    login,
    category,
    myproblems,
    createproblem,
    addproblem,
    search
}