require.config({ 
	baseUrl:'./src/classes', 
	waitSeconds: 10, 
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
	]
}); 
require(['core'], function(core){
	//start module 
	var blocks = window.blocks = new core; 
}); 
