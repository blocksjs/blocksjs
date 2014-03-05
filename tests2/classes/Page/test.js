require.config({ 
  baseUrl:'../../../src/classes', 
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

  	describe('Page', function(){ 
      it('should exist', function(done){
        blocks.createBlock('Page', {
            model:{}, 
            view:{}, 
            subcollection: [{view:{blockClass:'HTMLBlock'}},{
              view:{
                blockClass:'HTMLContainer'
              },
              subcollection:[{view:{blockClass:'HTMLBlock'}},{view:{blockClass:'HTMLBlock'}}]
            }]
          },function(page){ 
            expect(page).to.exist; 
            done(); 
        }); 
      }); 
      it('should be able to save JSON and be recreated', function(done){
        blocks.createBlock('Page', {
            model:{}, 
            view:{}, 
            subcollection: [{view:{blockClass:'HTMLBlock'}},{
              view:{
                blockClass:'HTMLContainer'
              },
              subcollection:[{view:{blockClass:'HTMLBlock'}},{view:{blockClass:'HTMLBlock'}}]
            }]
          },function(page){ 
           setTimeout(function(){
              var content = page.view.saveState().content; 
              expect(blocks.getNumBlocks([content])).to.equal(5); 
              done(); 
            }, 100);         
        }); 
      });
      it('should be able to create a stylesheet', function(done){
        blocks.createBlock('Page', {
            model:{}, 
            view:{}, 
            subcollection: [{view:{blockClass:'HTMLBlock'}},{
              view:{
                blockClass:'HTMLContainer'
              },
              subcollection:[{view:{blockClass:'HTMLBlock'}},{view:{blockClass:'HTMLBlock'}}]
            }]
          },function(page){ 
            page.view.renderCSS();  
            expect(document.getElementById(page.view._blockID + '_style')).to.exist; 
            done(); 
        }); 
      }); 
      it('should render itself and its children to the page', function(done){
        blocks.createBlock('Page', {
            model:{}, 
            view:{}, 
            subcollection: [{view:{blockClass:'HTMLBlock'}},{
              view:{
                blockClass:'HTMLContainer'
              },
              subcollection:[{view:{blockClass:'HTMLBlock'}},{view:{blockClass:'HTMLBlock'}}]
            }]
          },function(page){ 
            expect(document.contains(page.view.render().el)).to.be.true; 
            done(); 
        }); 
      });
  	}); 

	mocha.run();
});