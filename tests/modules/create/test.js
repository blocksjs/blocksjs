require.config({ 
  baseUrl:'../../../src/classes', 
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
require(['core', 'create', 'HTMLBlock'], function(core, create, block){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 
  var blocks = window.blocks = new core; 
    //createBlock 
    describe('createBlock()', function(){ 
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
  
    describe('_createSkeleton', function(){ 
      it('return an object with [blockClass] [, model] [, view] [, subcollection] based on the skeleton in the prototype', function(done){
        var skeleton = block.prototype.skeleton; 
        var settings = {
          x: 500, 
          y: 500
        }
        var ret = create._createSkeleton(skeleton, settings); 
        expect(ret.model).to.not.exist; 
        expect(ret.view).to.exist; 
        expect(ret.view.x).to.equal(500); 
        expect(ret.view.y).to.equal(500); 
        done(); 
      }); 
    }); 

    describe('_extractVals', function(){ 

      it('should allow for any attribute as "settings.attribute" on any object', function(done){
        var skeleton = {
            model:{
                random:'settings.random'
            },
            view: {
                x: 'settings.x', 
                y: 'settings.y', 
                css: 'settings.css'
            } 
        }; 
        var settings = {
            x: 500, 
            y: 500, 
            random: 'testing'
        }
        var retModel = create._extractVals(skeleton.model, settings); 
        var retView = create._extractVals(skeleton.view, settings); 
        expect(retModel).to.exist; 
        expect(retView).to.exist; 
        expect(retView.y).to.equal(500); 
        expect(retModel.random).to.equal('testing'); 
        done(); 
    }); 

    it('should return an array attribute if "settings.attribute.*" is used', function(done){
        var skeleton = {
            model:{
                random:'settings.random'
            }, 
            view: { 
                x: 'settings.x.*', 
                y: 'settings.y', 
                css: 'settings.css' 
            } 
        }; 
        var settings = { 
            x: [500, 200, 100,2000], 
            y: 500, 
            random: 'testing'
        } 
        var retView = create._extractVals(skeleton.view, settings); 
        expect(retView.x).to.be.an('array'); 
        done(); 
    });  
});   

describe('_extractValsCollection', function(){ 
    var settings = { 
            x: [500, 200, 100,2000], 
            y: 600, 
            random: 'testing' 
        } 
    it("should accept a skeleton of {blockClass: 'name', view: {}, model: {}}", function(){
        var skeleton = { 
            children:{ 
                blockClass: 'HTMLBlock',                     
                model:{ 
                    random:'settings.random' 
                }, 
                view: { 
                    x: 'settings.x.*', 
                    y: 'settings.y', 
                    css: 'settings.css' 
                } 
            }        
        }; 

        var ret = create._extractValsCollection(skeleton.children, settings); 
        expect(ret).to.be.an('array'); 
        expect(ret.length).to.equal(1); 

        expect(ret[0].view.x[0]).to.equal(500); 
    });

    it("should accept a skeleton of {blockClass:'name', settings:{}}", function(){
        var skeleton = { 
            children:{ 
                blockClass: 'HTMLBlock', 
                settings:{ 
                    x: 500, 
                    y: 500
                }, 
            }        
        }; 
        var ret = create._extractValsCollection(skeleton.children, settings); 
        expect(ret).to.be.an('array'); 
        expect(ret.length).to.equal(1); 
        expect(ret[0].blockClass).to.equal('HTMLBlock'); 
        expect(ret[0].settings.x).to.equal(500); 
    });  

    it("should accept a skeleton of a group of any number of blocks {'blockClass':{settings based on array of data}, 'blockClass2':{model and view instead of settings if desired}} etc", function(){
        var skeleton = { 
            children:{ 
                'HTMLBlock':{ 
                    model:{ 
                        random:'settings.random' 
                    }, 
                    view: { 
                        x: 'settings.x.*', 
                        y: 'settings.y', 
                        css: 'settings.css' 
                    } 
                } 
            }        
        }; 
        var ret = create._extractValsCollection(skeleton.children, settings); 
        expect(ret).to.be.an('array'); 
        expect(ret.length).to.equal(4); 
        expect(ret[0].view.x).to.equal(500); 
    }); 

    it('should allow for an array of different skeleton types', function(){ 
        var skeleton = { 
            children:[ 
                { 
                    blockClass: 'HTMLBlock',                     
                    model:{ 
                        random:'settings.random' 
                    }, 
                    view: { 
                        x: 'settings.x.0', 
                        y: 'settings.y.0', 
                        css: 'settings.css' 
                    } 
                }, 
                {
                    blockClass: 'HTMLBlock', 
                    settings:{
                        x: 222, 
                        y: 222
                    }
                }, 
                { 
                    'HTMLBlock':{ 
                        model:{ 
                            random:'settings.random' 
                        }, 
                        view: { 
                            x: 'settings.x.*', 
                            y: 'settings.y', 
                            css: 'settings.css' 
                        } 
                    }
                }
            ]      
        }; 
        var ret = create._extractValsCollection(skeleton.children, settings); 
        expect(ret).to.be.an('array'); 
        expect(ret.length).to.equal(6); 
        expect(ret[0].view.y).to.equal(600); 
    }); 
}); 

/*_SET 
    The_extractVals function will return an array if the requested value is an array. 
    This function takes those values and places them on individual objects 
    for example we would have something like... 
    model :{ 
        id: ['woefjwo', '2', '4', 'fjjf'], 
        x: 5, 
        color: 'green' 
    } 
    but we need to make sure there are 4 models with those properties based on the 
    largest array (ids). */ 
describe("_setVals({properties: forBlock})", function(){ 
    it('should take model/view/setting attributes as an array of and return an array of individual model/view/settings objects', function(){
        var skeleton = { 
            'HTMLBlock':{ 
                model:{ 
                    random:'settings.random' 
                }, 
                view: { 
                    x: 'settings.x.*', 
                    y: 'settings.y', 
                    css: 'settings.css' 
                } 
            }             
        }; 
        var settings = { 
            x: [400, 200, 100,2000], 
            y: 400, 
            random: 'testing' 
        } 
        var arrBlockViews = create._setVals(create._extractVals(skeleton['HTMLBlock'].view, settings)); 
        expect(arrBlockViews).to.be.an('array');  
        expect(arrBlockViews.length).to.equal(4); 
        expect(arrBlockViews[0].x).to.equal(400); 
    }); 
}); 

describe('_createCollection', function(){
    it("should take the array of models and array of views and create union objects ", function(){
        var skeleton = { 
            'HTMLBlock':{ 
                model:{ 
                    random:'settings.random' 
                }, 
                view: { 
                    x: 'settings.x.*', 
                    y: 'settings.y', 
                    css: 'settings.css' 
                } 
            }
        }; 
        var settings = { 
            x: [400, 200, 100,2000], 
            y: 400, 
            random: 'testing' 
        } 
        var models = create._setVals(create._extractVals(skeleton['HTMLBlock'].model, settings));                  
        var views = create._setVals(create._extractVals(skeleton['HTMLBlock'].view, settings)); 
        var col = create._createCollection('HTMLBlock', models, views); 
        expect(col).to.be.an('array'); 
    }); 
}); 

  mocha.run(); 
});   