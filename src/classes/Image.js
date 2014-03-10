define(['HTMLBlock'], function(HTMLBlock){ 
	var Image = HTMLBlock.extend({ 
		blockClass: 'Image', 
		superClass: 'HTMLBlock', 
		super: HTMLBlock.prototype, 
		defaults:{
			img: 'http://www.caraputzrath.com/yahoo_site_admin/assets/images/hula_hoop11.30553148_std.gif'
		}, 
		skeleton: { 
			model:{
				image: 'settings.img'
			}			
		}, 
		template: 	function(dat){ 
			return _.template('<img src= <%= data.img %> />', dat, {variable: 'data'}); 
		}
	});	
	return Image; 
}); 