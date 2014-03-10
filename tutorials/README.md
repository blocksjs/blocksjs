#Tutorial 01: Learning BlocksJS 
##Creating a popout grid of blocks with JSON 

**Goal:** We want to create a sipmle interaction where we click a btton and a grid 
of blocks appears. Once a user has selected one it will be saved as a referece 
for the page to use. 


*** 
##Zero: What is our index.json file? 
With BlocksJS we should always be able to create a page by simply looking at the 
list of blocks that are on the page and any settings they have. The BlocksJS engine 
will parse it, look up the module definition of each blockClass and create each of 
those blocks as listed. So in a nutshell, the index.json is simply a list of things 
on the page. 
```javascript 
{ 
	//The "name" attribute is the name of the page, useful for metadata purposes. 
  	"name": "testPage ", 

  	//This is the set of classes that the page is using. This is important because 
  	//the FIRST thing that BlocksJS does when it loads a page is preload all of the 
  	//classes listed here. While it is not necessary to preload the classes, it will 
  	//result in fewer mysterious rendering problems such as blocks taking too long 
  	//to render or rendering out of order. 
  	"classes": [ 
    	"Image", 
    	"ColumnContainer" 
  	], 

  	//the content attribute is where the page block and it's children are defined. 
  	//This is the "list" of things on the page and their attributes. 
  	"content": {

  		//Each class can be instantiated in one of two ways. Model/View attributes 
  		//to be placed on the block. Each block usually has a model and a view. 
  		//The model is optional but can have properties that will override the 
  		//defaults for the block view. Likewise we can set those properties in 
  		//the view that might not have anything to do with the data being represented 
  		//but HOW that data is represented. CSS is specified in the view given that 
  		//it is a purely visual, likewise if we have a RowContainer we could specified 
  		//how the rows are distributed. 
  		"blockClass":"Page", 
  		"model": {}, 
  		"view": {}, 

  		//or we can choose to not care about the small details of the model and 
  		//view, and we can simply give users a set of settings that they can 
  		//change. These settings will automatically go to the proper model/view 
  		//attributes so long as the block's skeleton sets that up. 
  		"settings":{} 

  		//For now we just want a generic page, there isn't anything special 
  		//about this page. It just shows it's children and that's all it has 
  		//to do. We can get rid of the model/viewsettings properties and simply 
  		//list blockClass: 'Page'

  		//Now we need to declare what the page has. It is a type of container so we declare its children. 
  		"children":[] 
  	}
} 
```

##One Creating Blocks
***

###Create a Button 
To begin the interaction we need a button on the page. let's add that to our 
index.json file under children for the page block. 
```json
	{
		"name": "testPage ",
		"classes": [
	    	"Button"
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add"
		  			}
		  		}
	  		]  		
	  	}
	}
```
So we've added the Block to the page, but it needs a little bit of styling to make 
sure it's always in the same place. Let's give it a little bit of css. 
```json

	{
		"name": "testPage ",
		"classes": [
	    	"Button"
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}
	  		]  		
	  	}
	}
```
This should make sure we've placed it in the upper right hand corner. Now let's 
add a grid Container where the images would be and give it some images! 



###Add a Container for Images
```json
	{
		"name": "testPage ",
		"classes": [
	    	"Image", 
	    	"ColumnContainer" 
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"message":"showBlocks", 
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}, 
		  		{
		  			"blockClass":"GridContainer"
		  		}
	  		]  		
	  	}
	} 
```
When we view the page we should see both the button and the container. Lookin' Dandy! 
This is a beautiful website on it's own, but let's make it actually do something. 
Ya know...be more than pretty cows dancing around. 

***
##Two: Syncing Events between blocks

When we click on a button we expect something to happen, right? That's why buttons 
exist! Likewise, buttons in BlocksJS emit an event to the page with a message. 
They also alert their parent that they've been pressed. All button blocks do this 
by default and thus if we want to make more types of button-type objects we should 
in some way (there are multiple ways to extend a class as we shall see later). 

The key feature of the button blockClass is that it automatically sends a message when it is clicked or activated. Looking at the blockClass itself we see that when it is pressed it automatically calls the *'emit'* function, which sends a message to the global 'button' channel. 

###//(In the Button block declaration, linked here)
```javascript
	emit: function(event){ 
		//allow our model to override our defaults by default. We could change this in 
		//a new class that extends button to change this behavior. 
		var message = this.model.get('message') || this.get('message'); 
		var pub = {
			channel: 'button', 
			topic: message, 
			data: event
		}; 
		if(window.postal) window.postal.publish(pub); 
		this.parent.trigger(message, pub); 
		return this; 
	}

```



Ok so we have a message published when the button is pressed, but the container 
doesn't yet listen for those changes. Blocks can take a special *'ins'* array when 
being created. 
```json
	{
		"name": "testPage ",
		"classes": [
	    	"Image", 
	    	"ColumnContainer" 
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"message":"showBlocks",
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}, 
		  		{
		  			"blockClass":"GridContainer", 
		  			"settings":{ 
			          "ins": [
						["show","showBlocks", "button"]
						//,["other ins as well....."]
			        ], 
		  		}
	  		]  		
	  	}
	} 
```


This is a list of messages we want the block to listen for and respond to afterwards. 
This would correspond to a function being called and some chain of events beginning
for whatever reason. 

###The ins: 
```javascript
	[fnName, topic, channel] //these are going to be used to create a subscription 
									for a callback in the grid container to show itself. 
```
In our case, we simply want the grid to appear, hence it calls show. But we also need it 
to be invisible when the page loads so that we can get the effect. So lets add some css 
to the container 
```json 
	{ 
		"name": "testPage ", 
		"classes": [ 
	    	"Image", 
	    	"ColumnContainer" 
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"message":"showBlocks", 
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}, 
		  		{
		  			"blockClass":"GridContainer", 
			  			"settings":{ 
				        "ins": [
							["show","showBlocks", "button"]
							//,["other ins as well....."]
				        ], 
				        "css":{
				            "opacity":0, 
				            "pointer-events":"none"
				        }
		  			}
	  			}
	  		]		
	  	}
	} 
```

Let's make sure the setup is working! After loading the page you should NOT
see a container and when you click the 'Add' button it should show up. If you've done 
that then you're doing well! 

Now that it's showing up we need to select a new block from the options. The choices 
are ALL image buttons, a premade class that is a button but with an image instead 
of text. That's a pretty common web block so it's already made for you. It's still a button
block, so it emits whatever message you pass into it when clicked, but you can 
also give an 'img' attribute to make it unique. Let's give our container some ImageButtons! 
```json 

	{
		"name": "testPage ",
		"classes": [
	    	"Image", 
	    	"ColumnContainer" 
	  	], 
	  	"content": {
	  		"blockClass":"Page", 
	  		"children":  [
	  			{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"message":"showBlocks", 
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}, 
		  		{
		  			"blockClass":"GridContainer", 
			  			"settings":{ 
				        "ins": [
							["show","showBlocks", "button"]
							//,["other ins as well....."]
				        ], 
				        "css":{
				            "opacity":0, 
				            "pointer-events":"none"
				        }
		  			}, 
		  			"children":[
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			//we can give it any image we want. 
			        			"img":"http://24.media.tumblr.com/9de54792014c9427c7ba5f3d73d7b84c/tumblr_meoeqxtwiz1r4xjo2o1_500.gif", 
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://www.thisiscolossal.com/wp-content/uploads/2013/01/1.gif", 
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://25.media.tumblr.com/2cbd1acc1dab13af5dc33df8520deb88/tumblr_mvovuywB4m1s6bjwgo1_400.gif",
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://24.media.tumblr.com/9de54792014c9427c7ba5f3d73d7b84c/tumblr_meoeqxtwiz1r4xjo2o1_500.gif", 
			        			"message":"selectBlock"
			        		}
			        	}
			        ]
	  			}
	  		]
	  	}
	} 
```


We have given the container four children Image Buttons which should load if we 
refresh the page. Great job! The only thing left to do is make sure that the container
is listening to the selectBlock event so that it can hide again. 
```json

	{
		"name": "testPage ",
		"classes": [
	    	"Image", 
	    	"ColumnContainer" 
	  	], 
	  	"content": {
			"blockClass":"Page", 
			"children":[
				{
		  			"blockClass": "Button", 
		  			"settings": {
		  				"text": "Add", 
		  				"message":"showBlocks",
		  				"css":{
				            "width":"50px", 
				            "height":"50px", 
				            "position":"absolute", 
				            "top": "5px", 
				            "right": "5px"
				        }
		  			}
		  		}, 
		  		{ 
			        "blockClass":"GridContainer", 
			        "settings":{ 
			          "ins": [
						["show","showBlocks", "button"], 
						["hide", "selectBlock", "button"]
			          ], 
			          "css":{
			            "opacity":0, 
			            "pointer-events":"none"
			          }
			        }, 
			        "children":[
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			//we can give it any image we want. 
			        			"img":"http://24.media.tumblr.com/9de54792014c9427c7ba5f3d73d7b84c/tumblr_meoeqxtwiz1r4xjo2o1_500.gif", 
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://www.thisiscolossal.com/wp-content/uploads/2013/01/1.gif", 
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://25.media.tumblr.com/2cbd1acc1dab13af5dc33df8520deb88/tumblr_mvovuywB4m1s6bjwgo1_400.gif",
			        			"message":"selectBlock"
			        		}
			        	}, 
			        	{
			        		"blockClass":"ImageButton", 
			        		"settings":{
			        			"img":"http://24.media.tumblr.com/9de54792014c9427c7ba5f3d73d7b84c/tumblr_meoeqxtwiz1r4xjo2o1_500.gif", 
			        			"message":"selectBlock"
			        		}
			        	}
			        ] 
			    } 
			]
		}
	} 
```


There you have it! a website with pretty basic functionality with relatively little work. 
And you didn't even have to write a line of code (well sort of...) :D We'll be looking 
through some of the smaller details in other tutorials like making a varying number of 
children at once and making blocks programmatically. 