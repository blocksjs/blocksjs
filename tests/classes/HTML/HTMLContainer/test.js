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
      location: '..', 
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
    	name:'Block',
    	location:'./',
    	main:'Block'
    },
    {
    	name:'TextBlock',
    	location:'./',
    	main:'TextBlock'
    },
    {
    	name:'Container',
    	location:'./',
    	main:'Container'
	},
    {
    	name:'Page',
    	location:'./',
    	main:'Page'
    }
  ] 
}); 
require(['core'], function(core){ 
  	var expect = chai.expect; 
  	var blocks = window.blocks = new core; 
  	mocha.setup('bdd'); 

  	describe('HTMLContainer', function(){ 
  		it("should automatically have children instantiated on it's collection object when created", function(done){
  			blocks.createBlock('HTMLContainer', { 
  				model:{}, 
  				view:{}, 
  				subcollection:[{}, {}] 
  			}, function(container){ 
  				var subcollection = container.view.subcollection; 
  				setTimeout(function(){ 
  					expect(container.view.subcollection.length).to.equal(2); 
  					done(); 
  				}, 10);   				
  			}); 
  		});  
  		it("should automatically add children to collection when it creates them itself", function(done){
  			blocks.createBlock('HTMLContainer', { 
  				model:{}, 
  				view:{  
  					blockID:'myspecialBlock' 
  				},  
  				subcollection:[{}, {}]
  			}, function(container){ 
  				container.view.createBlock('Block', function(block){  					
  					var view = container.view.subcollection.findByModel(block.model); 
					expect(block.view).to.equal(view);  
  					done(); 
  				});   				
  			}); 
  		}); 
  		it("should render out the html of all of its children", function(done){
  			blocks.createBlock('HTMLContainer', {
  				model:{}, 
  				view:{}, 
  				subcollection:[{}, {}]
  			}, function(container){ 
  				console.log(container); 
  				setTimeout(function(){
  					// console.log(container.view.subcollection); 
	  				// console.log(container.view.subcollection.findByIndex(1)); 
	  				// console.log(container.view.subcollection.findByIndex(1).el); 
	  				console.log('container',container.view.render().el); 
	  				done(); 
  				}, 100);   				
  			}); 
  		}); 
  	}); 

	mocha.run();
});