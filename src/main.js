require.config({ 
	baseUrl:'/src/classes', 
	waitSeconds: 10, 
	paths : {
	    text : '../requirePlugins/text', //text plugin
	    json : '../requirePlugins/json' //json plugin
	  },
	packages: [
		{
			name: 'core', 
			location: '../', 
			main:"core"
		}, 
		{
			name: 'jquery', 
			location: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3', 
			main:"jquery.min"
		}, 
		{
			name: 'underscore', 
			location: '../libs', 
			main:'underscore-min'
		}, 
		{
			name: 'backbone', 
			location: '../libs', 
			main:'backbone-min'
		}, 
		{
			name: 'less', 
			location: '../libs', 
			main:'less'
		},
		{
			name: 'postal', 
			location: '../libs', 
			main: 'postal' 
		}, 
		{ 
			name: 'postal.when', 
			location: '../libs', 
			main: 'postal.when' 
		}, 
		{ 
			name: 'create', 
			location: '../modules', 
			main: 'Create' 
		}, 
		{ 
			name: 'io', 
			location: '../modules', 
			main: 'IO' 
		}, 		
		{ 
			name: 'query', 
			location: '../modules', 
			main: 'Query' 
		}, 
		{ 
			name: 'load', 
			location: '../modules', 
			main: 'PageLoader' 
		}, 
	]
}); 
require(['core', 'json!/examples/interface/index.json'], function(core, settings){
	console.log('settings', settings); 
	var blocks = window.blocks = new core(settings, function(){
		//start module 
	}); 
}); 
