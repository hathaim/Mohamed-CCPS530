//**************************************
// old code I made, in which i will not be using
//let AccUsers = [];
//*****************************************



//-------------------------------------------------------------------
// mongoose setup
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/accountDB",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
	account : String,
	password: String
});

const User = mongoose.model("User", userSchema);
// end of mongoos set up
//-------------------------------------------------
//other npms
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
//-------------------------------------------------
//main page

app.get("/", function(req, res){
// this will get the html file
		res.sendFile(__dirname + "/name.html");
	
});
//end of main page with my details
//----------------------------------------------

// login

app.get("/login", function(req,res){
	res.sendFile(__dirname + "/login.html");
	
	
});

app.post("/login", function(req,res){
// using the array 
//*************************************************************************************************
// old code I made, in which i will not be using
//	if(AccUsers.length > 0){
//	for(i = 0; i < AccUsers.length; i++){
//		if(AccUsers[i].cPassword === req.body.password && AccUsers[i].cAccount === req.body.account){
//			
//		   res.sendFile(__dirname + "/index.html");
//			
//			break;
//		   }else{
//			   res.sendFile(__dirname + "/loginFalse.html")
//		   }	
//	}} else{
//		res.send("No users registered, please sign up");
//	}
//**********************************************************************************************************
	// using mongoose
		User.find(function(err,users){
				  if(err){
			console.log(err);
		}else{
			console.log(users);
			
			var correct = false;
			
	for(i = 0; i < users.length; i++){
		if(users[i].password === req.body.password && users[i].account === req.body.account){
			correct = true
		   res.sendFile(__dirname + "/index.html");
			
			break;
		   }}
			if(correct == false){
				res.sendFile(__dirname + "/loginFalse.html");
			}
			   
		   
		
		}});
	//..........................................................................................
		
});
//-----------------------------------------------------------
// signup
app.get("/signup", function(req,res){
	
	res.sendFile(__dirname + "/signup.html");
	
});
app.post("/signup", function(req,res){
	
	
	User.find(function(err,users){
				  if(err){
			console.log(err);
		}else{
			var exists = false;
			for(i = 0; i<users.length; i++){
				if(users[i].account == req.body.cAccount){
					exists = true;
					
					break;
				}
				
				
				
				
				
				
				
				
				
			}// end of the for loop
			if(exists === true){
				res.sendFile(__dirname + "/signupExists.html");
					
			}else if(req.body.cPassword == req.body.cPassword2 && req.body.cPassword2.length >= 8){

				
				// mangoose, trying to say the data.
				//..............................................................................
				const userData = new User({
					account : req.body.cAccount,
					password: req.body.cPassword
				});
				console.log(userData);

				userData.save();
				//................................................................................


				res.sendFile(__dirname + "/loginLink.html")
		
			}else if(req.body.cPassword2.length < 8){
		
	
				res.sendFile(__dirname + "/signupToshort.html");
	
			
			}else{
	
				res.sendFile(__dirname + "/signupIncorrect.html");
	
			}	
			
			
			
	
		}});
	
	
	

	
});

//--------------------------------------------------------------------------------------------



// http://localhost:3000

app.listen(3000,function(){
	console.log("Book Server on port 3000")
});