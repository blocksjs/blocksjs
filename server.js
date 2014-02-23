var fs 		= require("fs"); 
var express = require("express"); 
var app = express(); 

//server for socket
var server = require('http').createServer(app); 
server.listen(process.env.PORT || 8801); 

//basic settings 
app.configure(function(){ 
	app.use(express.cookieParser()); 
	app.use(express.session({secret: 'secret variable that gets hashed, omg!'})); 
	app.use(express.bodyParser()); 
	app.use(express.methodOverride()); 
	app.use(app.router); 
	app.use(express.static(__dirname));  
});  