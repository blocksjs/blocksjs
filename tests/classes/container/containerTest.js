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
      name: 'mocha',
      location: '../libs',
      main: 'mocha'
    },
    { 
      name: 'chai', 
      location: '../libs', 
      main: 'chai' 
    }, 
    { 
      name: 'chai-jquery', 
      location: '../libs', 
      main: 'chai-jquery' 
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

require(['core', 'chai', 'mocha'], function(core, chai){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 
  blocks = new core; 

	describe("Container", function(){

    var settingses = {
      subcollection:[
      {
        model:{
          wow:'doge'
        },
        subcollection:[
          {},
          {}
        ]
      },
      {
        model:{
          jeremy:'lin'
        },
        view:{
          blockClass:'TextBlock',
          text:'Twilight Zone'
        }
      }
    ]
  };
    blocks.createBlock('Container', settingses,
      function(fullContainer){

    		//this contains the different blocks within this container
    		describe("#subcollection",function(){
    			it("should exist",function(done){
              expect(fullContainer).to.have.a.property('subcollection');
              done();
    			}); 
    		}); 

        //create a block and add to the collection.
        describe("#create()", function(){
          it("should exist", function(done){
            expect(fullContainer.view).to.have.a.property('create');  
            blocks.createBlock('Container',{},function(emptyContainer){
              expect(emptyContainer.view).to.have.a.property('create');  
              done();
            }); 
          });
          it("should set the model and view to the settings passed in", function(done){
            blocks.createBlock('Container',{},function(emptyContainer){
              emptyContainer.view.create({model:{'Jarvis':'the dude'},view:{blockClass:'TextBlock'}});
              done();
            }); 
          });
          it('should automatically set the container as the parent');
          it('should automatically set the view in the subcollection');  
        });

        //render out the collection of blocks within the container
        describe("#render()", function(){
          it("should exist", function(){
            expect(fullContainer.view).to.have.a.property('render');
          });
        });

        //render out one particular block within the container
        describe("#renderBlock()", function(){ 
          it("should exist", function(){ 

          }); 
        }); 

        describe("#toJSON()", function(){ 
          it("should return the JSON output of all the blocks within it",function(){
            expect(JSON.stringify(fullContainer.view.toJSON())).to.equal(JSON.stringify({
              view:{blockClass:'Container'}, 
              subcollection: settingses.subcollection 
            })); 
          }); 
          it("should return each JSON as a 'view'+'data' pair", function(){ 

          }); 
        }); 

        describe('#_verify()', function(){ 
          it('should check to see that each of the models in the models subcollection has a view', function(){

          }); 
          it('should check to see that each of the views has a model', function(done){

          }); 
        }); 

      mocha.run();
      });
  }); 
});