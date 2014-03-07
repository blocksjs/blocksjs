require.config({ 
  baseUrl:'./../../src/classes', 
  waitSeconds: 10, 
  paths: {
     json:'../requirePlugins/json',
     text:'../requirePlugins/text',
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
    }
  ] 
}); 
require(['core'], function(core){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 
    //createBlock 
    describe('#createBlock()', function(){ 
      it('should exist', function(){
        expect(blocks).to.have.a.property('createBlock'); 
      });

      describe('#(name, json, callback)', function(){ 
        it('should provide a block state object into the callback based on the settings', function(done){
          blocks.createBlock('Container', {
            view: {
              x: 5, 
              y: 13
            }, 
            model: {
              x:33, 
              y: 'oh heeey'
            }
          },function(block){ 
              expect(block.view).to.be.an.instanceof(require('Container')); 
              expect(block.model.get('x')).to.equal(33); 
              expect(block.view.get('y')).to.equal(13); 
              
              done(); 
          });
        }); 
      }); 
      describe('#(name, callback)', function(){ 
        it('should provide a default version of the block state object if no settings are given', function(done){
          blocks.createBlock('Container', function(block){ 
            expect(block.view).to.be.an.instanceof(require('Container')); 
            done(); 
          });
        }); 
      }); 
      describe('#(settings, callback) should work', function(){ 
        it('if class is specified', function(done){ 
          blocks.createBlock( 

            //super basic settings with class 
            { 
              view:{ 
                blockClass:'Container' 
              }, 
              model: {} 
            }, 

            //callback 
            function(block){ 
              expect(block.view).to.be.an.instanceof(require('Container')); 
              done(); 
          }); 
        }); 
        it('and if no class is specified in view properties create block by default', function(done){
          blocks.createBlock({}, function(block){ 
              expect(block.view).to.be.an.instanceof(require('Block')); 
              done(); 
          }); 
        }); 
      });
      describe('#(option)', function(){ 
        it('should create a block state object if blockClass and model/view settings are provided', function(done){
          blocks.createBlock({
            blockClass: 'Block', 
            model:{
              woop: true
            }, 
            view: {
              'ohheyyy':'ohhhyyyy back'
            }
          }, function(block){ 
            expect(block).to.exist; 
            done(); 
          }); 
        }); 
      }); 
      describe('parent and _blockID', function(){
        it('should return a view with a _blockID and parent (required)', function(done){
          blocks.createBlock('Block', function(block){
            var parent = block.view.parent; 
            var id = block.view._blockID;
            expect(parent).to.exist; 
            expect(id).to.exist;  
            done(); 
          }); 
        }); 
      });       
    }); 

    //_createModel
    describe('#_createModel()', function(){
      it('should return a Backbone.Model if nothing is provided',function(){
        var model = blocks._createModel(); 
        expect(model).to.be.an.instanceof(Backbone.Model); 
      }); 
      it('should return a model with the properties of the json sent into it', function(){
        var model = blocks._createModel({x: 33}); 
        expect(model.get('x')).to.equal(33); 
      }); 
    });   

    //_createView
    describe('#_createView()', function(){
      it('should create the view with the class prototype', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks._createModel(); 
          var view = blocks._createView(model, Block, {x: 33});
          expect(view).to.be.an.instanceof(Block); 
          done(); 
        });   

      }); 
      it('should assign the model to the view', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks._createModel(); 
          var view = blocks._createView(model, Block, {x: 33});
          expect(view.model).to.equal(model); 
          done(); 
        });          
      }); 
      it('should automatically assign the initial variables that are passed in', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks._createModel(); 
          var view = blocks._createView(model, Block, {x: 33});
          expect(view.get('x')).to.equal(33); 
          done(); 
        });         
      });     
    });  

  mocha.run(); 
}); 

    