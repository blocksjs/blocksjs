define(["Page"], function(Page){ 
	//Page View 
	var LoopPage = Page.extend({ 
		className: Page.prototype.className + 'LoopPage', 
		defaultCSS: _.extend({}, Page.prototype.defaultCSS, { 
			'.time, .record, .add, .play':{
	    		'position': 'absolute',
	    		'border-color':'black',
				'border-radius': '15px',
				'background': 'white',
				'padding': '5px',
				'border':'2px solid',
				'z-index': 10,
	    	},
			'.record:hover, .time:hover, .add:hover, .play:hover':{
				background:'orange',
			},
			'.record:active, .time:active, .add:active, .play:active':{
				background:'yellow',
			},
	        '.record, .play, .add':{
	            right:'20px',
	        },
	        '.add':{
	            top: '20px',
	        },
	    	'.record' :{
	            top: '90px',
			},
	        '.play':{
	            top: '160px',
	        },
			'.time' :{
		        top:  '20px',
			    left: '30px',
	            padding: '5px 15px',
				'font-weight':'bold',
				'font-size':'48px',
			},
			'overflow':'hidden'
			/*

			position:'fixed', 
			width	: '100%', 
			height	: '100%', 
			'*':{ 
				'box-sizing': 'border-box', 
				'-moz-box-sizing': 'border-box', 
				'-webkit-box-sizing': 'border-box', 
			} */
		}),
		initialize: function(){
			Page.prototype.initialize();
			this.$el.html('<script data-main="BigBeatSystem.js" src="../libs/require.js"></script><img class="add" id="addButton" src="./Resources/addButton.png" /><img class="record" id="recordButton" src="./Resources/recordButton.png" /><img class="record" id="stopButton" src="./Resources/stopButton.png" style="display:none;" /><img class="play" id="playButton" src="./Resources/playButton.png" style="display:none;" /><img class="play" id="pauseButton" src="./Resources/pauseButton.png" style="display:none;" /><div class="time" id="seconds" style="display:none"></div><form style="display:none;"><input id="file" type="file"></form>');
		} 
	});  
	return LoopPage; 
}); 