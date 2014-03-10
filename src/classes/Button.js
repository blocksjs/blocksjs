define(['HTMLBlock'], function(HTMLBlock){ 
	var Button = HTMLBlock.extend({ 
		blockClass: 'Button', 
		superClass: 'HTMLBlock', 
		super: HTMLBlock.prototype, 
		defaultCSS: _.extend({}, HTMLBlock.prototype.defaultCSS, {	
			'min-width':'40px', 
			'min-height':'40px', 
			'background-color':'rgba(250,250,250,.5)', 
			'cursor': 'pointer', 
			'-moz-box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)', 
			'-webkit-box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)',				
			'box-shadow': '0px 1px 10px 0px rgba(0,0,0, .3)',
			'-webkit-border-radius': '4px',
			'-moz-border-radius': '4px',
			'border-radius': '4px', 
			'border': '0', 
			'display': 'inline-block', 
			'color': '#e8e8e8', 
			'font-size': '18px', 
			'font-weight': 'bold', 
			'font-style': 'normal', 
			'line-height': '40px', 
			'text-decoration': 'none', 
			'text-align': 'center', 
			'text-shadow': '1px 1px 0px #000', 
			'&:hover': {
				'background-color': 'rgba(26, 42, 43, 1)',  
			}, 
			'&:active':{
				'-webkit-transition': 'all 0s', 
				'-moz-transition': 'all 0s',
				'transition':' all 0s',
				'bottom': '1px',
			}
		}), 
		defaults:{
			text: 'Button default text', 
			message: 'alert'
		}, 
		skeleton: { 
			model:{
				text: 'settings.text', 
				message: 'settings.message' 
			}, 
			view: {
				css: 'settings.css'
			}			
		}, 
		initialize: function(attributes){
			HTMLBlock.prototype.initialize.call(this, attributes); 
		},
		events: {
			'click': 'emit'
		},
		template: 	function(dat){ 
			return _.template('<a><%= data.text %></a>', dat, {variable: 'data'}); 
		}, 
		//buttons trigger events primarily 
		emit: function(event){ 
			var message = this.model.get('message') || this.get('message'); 
			var pub = {
				channel: 'button', 
				topic: message, 
				data: {
					block:this, 
					event: event
				}
			}; 
			if(window.postal) window.postal.publish(pub); 
			console.log('emitting!', pub); 
			this.parent.trigger(message, pub); 
			return this; 
		}
	});	
	return Button; 
}); 