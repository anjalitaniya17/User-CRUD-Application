var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var fs=require("fs");
var user = require("./user_model");
var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/ajax",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// get the static HTML page 
app.get("/",function(req,res){
    res.render("./public/index.html");
});

// get all users from database and send to ajax 
app.get("/users",function(req,res){
    user.find({},function(err,user){
        if(err){
            console.log(err);
        } else{
            res.send({users:user});
            
        }
    });
});
  
// get data from ajax and add to database
app.post("/users",function(req,res){
   
    var users=req.body.Data; 
    
    
    user.create(users,function(err,created){
        if(err){
            console.log(err);
        } else{
            res.send("successfullly created user");
        }
    });
});


// got edited information from ajax and update it on database 
app.put("/users/:id",function(req,res){
    var name=req.body.name;
    var age=req.body.age;
    var email=req.body.email;
    var updatedUser={name:name,age:age,email:email};
    //console.log(updatedUser);
    
    user.findByIdAndUpdate(req.params.id,updatedUser,function(err,updated){
        if(err){
            console.log(err);
        } else{
            //console.log(updated);
            res.send( updated.name + " "  + "updated successfullly");
        }
    });
});

//delete user by id which is got from ajax 
app.delete("/users/:id",function(req,res){
    user.findByIdAndRemove(req.params.id,function(err,user){
        if(err){
            console.log(err);
        } else {
             res.send(user.name + " " +" removed successfullly");
          
        }
    });
});
  
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("ajax server has started");
// });

app.listen(3001, () => console.log('App listening on port 3001'));