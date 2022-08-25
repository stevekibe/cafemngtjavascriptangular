const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/signup',(req,res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err,results) => {
        if(!err) {
            if(results.length <=0){
                query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactNumber,user.email,user.password], (err,results) =>{
                    if(!err){
                        return res.status(200).json({message:"Succesfuly Registered"});
                    }
                    else{
                        return res.status(500).json(err);
                    }

                });
            }
            else{
                return res.status(400).json({message: "Email Already Exist ."});
            }
        } 
        else {
            return res.status(500).json(err);
        }
    });

});

router.post('/login',(req,res) =>{
    const user = res.body;
    query = "select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0 || results[0].password){
                return res.status(401).json({message:"incorrect Username or Password"});
            }
            else if(results[0].status === 'false'){
                return res.status(401).json({message:"wait for Admin Approval"});
            }
            else if (results[0].password == user.password){
                const response = { email: results[0].email, role: role}
            }
            else{
                return res.status(400).json({message:"something went wrong try again later"});
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});


module.exports = router;