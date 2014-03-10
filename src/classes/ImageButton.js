define(['Button'], function(Button){ 
	var ImageButton = Button.extend({ 
		blockClass: 'ImageButton', 
		superClass: 'Button', 
		super: Button.prototype, 
		defaultCSS: _.extend({}, Button.prototype.defaultCSS, {	
			'padding':'5px', 
			'img':{
				'height':'100%'
			}
		}), 
		defaults: _.extend({}, Button.prototype.defaults, {
			img: 'http://www.caraputzrath.com/yahoo_site_admin/assets/images/hula_hoop11.30553148_std.gif', 
		}), 
		skeleton: { 
			model:{
				img: 'settings.img', 
				message: 'settings.message'
			}, 
			view: {
				css: 'settings.css'
			}			
		}, 
		template: 	function(dat){ 
			return _.template('<a><img src="<%= data.img %>" /></a>', dat, {variable: 'data'}); 
		},
	});	
	return ImageButton; 
}); 