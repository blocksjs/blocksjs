require.config({ 
  baseUrl:'../../../../src/classes', 
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
  ] 
}); 

require(['core', 'HTMLBlock'], function(core, block){ 
	var expect = chai.expect; 
  	mocha.setup('bdd'); 
  	var blocks = window.blocks = new core;
  	blocks.createBlock('HTMLBlock', {
  		model: {}, 
  		view: {
  			blockID: 'mySpecialBlock'
  		}
  	}, function(block){

  	}); 
	describe("HTMLBlock", function(){
		it('should have a class list that shows all block classes');
		it('should have an id equal to the block ID if that is set'); 
		it('should have its _blockID for an #id if not set'); 
		it('should have a css object that refects the css sent in and its defaults', function(done){
			blocks.createBlock('HTMLBlock', {
				model:{}, 
				view: {
					x: 5, 
					'hoh':'owheofiwef',
					css: {
						'width':'100px', 
						'height':'100px', 
						'background':'green'
					}
				}
			}, function(block){
				var css = block.view.css.get('background'); 
				expect(css).to.equal('green'); 
        console.log(block.view.toJSON())
				done(); 
			}); 
		});  
	}); 

	mocha.run();
});