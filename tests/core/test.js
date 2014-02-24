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
  ] 
}); 
require(['core', 'chai', 'mocha'], function(core, chai){ 
  var should = chai.should(); 
  var expect = chai.expect; 
  mocha.setup('bdd'); 

  //Blocks Core API 
  describe('core', function(){ 
    var blocks = window.blocks = new core;      

    //postal 
    describe('#postal', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('postal'); 
      }); 
    }); 

    //block list 
    describe('#_blockIds', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('_blockIds');  
      }); 

      it('should have update the hash every time a block is created'); 

      it('should update every time a block is deleted'); 

      it('should not contain special ids that users set'); 

      it('should have a direct reference to each object in the hash'); 
    });     

    //userBlockList 
    describe('#_userBlockIds', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('_userBlockIds'); 
      }); 

      it('should update only if a created block has a blockId'); 

      it('should have a reference to any _blockId put in the hash');

      it('should get rid of the objects in the hash when the block is removed');  
    }); 

    //classList 
    describe('#classList', function(){ 
      it('should have a class list', function(){ 
        expect(blocks).to.have.a.property('_classList'); 
      });  

      it('should have an array for each class loaded in memory');

      it('should add the _blockId to the hash when a block is created'); 

      it('should get rid of the id in the hash when the block is removed');

    }); 

    //createBlock 
    /*describe('#createBlock()', function(){ 
      it('should exist', function(){
        expect(blocks).to.have.a.property('createBlock'); 
      })

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
              expect(block.view.get('y')).to.equal('oh heeey'); 
              done(); 
          });
        }); 
      }); 
      describe('#(name, callback)', function(){ 
        it('should provide a default version of the block state object if no settings are give', function(done){
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
      describe('#(option)', function(){ 
        it('should create a block state object if name and settings are provided', function(done){
          var state = blocks.createBlock({}, function(page){ 
            expect(page).to.exist; 
            done(); 
          }); 
        }); 
      }); 
      it('should return an object', function(done){ 
        var state = blocks.createBlock({}, function(page){ 
          expect(page).to.exist; 
          done(); 
        }); 
      }); 
    }); */

    //_createModel
    describe('#_createModel()', function(){
      it('should return a Backbone.Model if nothing is provided',function(){
        var model = blocks.createModel(); 
        expect(model).to.be.an.instanceof(Backbone.Model); 
      }); 
      it('should return a model with the properties of the json sent into it', function(){
        var model = blocks.createModel({x: 33}); 
        expect(model.get('x')).to.equal(33); 
      }); 
    });   

    //_createView
    describe('#_createView()', function(){
      it('should create the view with the class prototype', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks.createModel(); 
          var view = blocks.createView(model, Block, {x: 33});
          expect(view).to.be.an.instanceof(Block); 
          done(); 
        });   

      }); 
      it('should assign the model to the view', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks.createModel(); 
          var view = blocks.createView(model, Block, {x: 33});
          expect(view.model).to.equal(model); 
          done(); 
        });          
      }); 
      it('should automatically assign the initial variables that are passed in', function(done){
        blocks.getClass('Block', function(Block){
          var model = blocks.createModel(); 
          var view = blocks.createView(model, Block, {x: 33});
          expect(view.get('x')).to.equal(33); 
          done(); 
        });         
      });     
    });   

    //saveState 
    describe('#saveState()', function(){ 
      it('should make an ajax request somewhere'); 
    });    

    //getClass
    describe('#getClass()', function(){ 
      it('should put the requested prototype into the callback', function(done){ 
        blocks.getClass('Container', function(Container){
          expect(new Container).to.be.an.instanceof(require('Container')); 
          done(); 
        }); 
      }); 
    });   

    //loadClasses 
    describe('#loadClasses()', function(){ 
      it('should return an array of the same length as that passed in', function(done){
        blocks.loadClasses(['Block', 'Container'], function(classes){
          expect(classes).to.be.an.instanceof(Array); 
          expect(classes.length).to.equal(2); 
          done(); 
        }); 
      }); 
      it('should return each of the classes with the right prototype in the right order', function(done){
        blocks.loadClasses(['Block', 'Container'], function(classes){
          var Block = require('Block'); 
          var Container = require('Container'); 
          expect(new classes[0]).to.be.an.instanceof(Block); 
          expect(new classes[1]).to.be.an.instanceof(Container); 
          done(); 
        }); 
      }); 
    }); 

    //loadPage 
    describe('#loadPage()', function(){ 
      var json = {}; 
      var json2 = {sync: true}; 
      it('should be able to load a string reference and load it', function(done){
        blocks.loadPage('../../tests/test.json', function(json){
          expect(_.isObject(json)).to.be.true; 
          done(); 
        }); 
      }); 
      it('should parse the json if it is created with json as a first argument (Settings var)', function(done){
        var blocks2 = new core({
          "name": "test",
          "classes": [],
          "content": {
            "view": {
              "x": "0",
              "y": "0",
              "z": "0",
              "autohide": "false",
              "immutableCSS": "false",
              "blockClass": "Page"
            },
            "subcollection": [
              {
                "view": {
                  "x": "635",
                  "y": "231",
                  "z": "0",
                  "autohide": "false",
                  "immutableCSS": "false",
                  "css": {
                    "position": "fixed",
                    "width": "200px",
                    "height": "200px",
                    "max-height": "100%",
                    "max-width": "100%",
                    "text-align": "center",
                    "border": "1px black dotted",
                    "background-color": "rgba(100, 100, 100, .7)",
                    "z-index": "0",
                    "&:hover": {
                      "background-color": "rgba(0,0,20,1)",
                      "color": "white"
                    }
                  },
                  "blockClass": "Block"
                }
              },
            ]
          }
        }, function(page){ 
          expect(_.isObject(page)).to.be.true; 
          done(); 
        }); 
      }); 
      it('should be able to load synchronously', function(done){
        blocks.loadPage('../../tests/testSync.json', function(json){
          expect(_.isObject(json)).to.be.false; 
          done(); 
        });
      }); 
      describe('#callback', function(){ 
        it('should have backbone view/model as a part of the content property', function(done){
          blocks.loadPage('../../tests/test.json', function(json){
            expect(json.content.view).to.exist; 
            expect(json.content.model).to.exist; 
            done(); 
          });
        }); 
        it('should also have the same metadata as the original json as settings', function(done){
          blocks.loadPage('../../tests/test.json', function(json){
            expect(json.settings).to.exist;  
            done(); 
          });
        }); 
        it('should render the page', function(done){
          blocks.loadPage('../../tests/test.json', function(json){
            expect(json.content.view.el.parentNode).to.not.be.null;
            done(); 
          });
        }); 
      }); 
    }); 

    //loadPageSync 
    describe('#_loadPageSync()', function(){
      it('should not render until all children have been loaded and instantiated')
    });   

    //getNumBlocks 
    describe('#getNumBlocks()', function(){
      it('should return the number of blocks on the page', function(done){
        blocks.loadPage('../../tests/test.json', function(json){
          var numChildren = blocks.getNumBlocks([json.settings.content]); 
          expect(numChildren).to.equal(7); //obtained by looking at the json file and counting the number of objects 
          done(); 
        });
      }); 
    });   

    //getBlockById
    describe('#getBlockById()', function(){
      it('should return the block that has the same id as the one passed in (special or not)'); 
    });   

    //getBlocksByClassName
    describe('#getBlocksByClassName()', function(){
      it('should return an array'); 
      it('should return an array of all blocks with this blockClass'); 
    });   

    //getBlocksByEnvironmentType
    describe('#getBlocksByEnvironmentType()', function(){
      it('should return all blocks of the given type (threejs, processing etc)'); 
    });   
  }); 

  mocha.run(); 
});
 
