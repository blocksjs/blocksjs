require.config({ 
  baseUrl:'./../../src/classes', 
  waitSeconds: 10, 
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
    var blocks = new core; 

    //modules array 
    describe('#modules', function(){ 
      it("should exist", function(){ 
          expect(blocks).to.have.a.property("modules"); 
      });
    });     

    //postal 
    describe('#postal', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('postal'); 
      }); 
    }); 

    //block list 
    describe('#blockList', function(){
      it('should exist', function(){
        expect(blocks).to.have.a.property('blockList'); 
      }); 
    });     

    //userBlockList 
    describe('#userBlockList', function(){
      it('should have a user block list', function(){
        expect(blocks).to.have.a.property('userBlockList'); 
      }); 
    });     

    //classList 
    describe('#classList', function(){
      it('should have a class list', function(){
        expect(blocks).to.have.a.property('classList'); 
      }); 
    }); 

    //createBlock
    describe('#createBlock()', function(){
      it('should return an object', function(done){
        var state = blocks.createBlock({}, function(page){
          expect(page).to.exist; 
          done(); 
        }); 
      }); 
    });     

    //createModel
    describe('#createModel()', function(){
      it('should return a Backbone.Model if nothing is provided',function(){
        var model = blocks.createModel(); 
        expect(model).to.be.an.instanceof(Backbone.Model); 
      }); 
      it('should return a model with the properties of the json sent into it'); 
      it('should set subcollection if that is an option property'); 
    });   

    //createView
    describe('#createView()', function(){
      it('should create the view with the class prototype'); 
      it('should create a blockCollection if that is an option'); 
    });   

    //saveState
    describe('#saveState()', function(){
      it('should make an ajax request somewhere'); 
    });   

    //getClass
    describe('#getClass()', function(done){ 
      it('should require the class that is requested', function(){ 
        blocks.getClass('Page', function(klass){ 
          var blockProto = require('Page'); 
          console.log(blockProto, klass);  
          expect(klass).to.equal(blockProto); 
          done(); 
        }); 
      }); 
    });   

    //loadClasses 
    describe('#loadClasses()', function(){ 
      it('should return an array'); 
      it('should return each of the classes with the right prototype in the right order ')
    }); 

    //loadPage 
    describe('#loadPage()', function(){ 
      var json = {}; 
      var json2 = {sync: true}; 
      it('should load the json if a string or just parse it if the json is already on the page'); 
      it('should be able to load synchronously'); 
      describe('#callback', function(){ 
        it('should have an object with a page property'); 
        it('should have backbone view/model as a part of the page'); 
        it('should also have the same metadata as the original json'); 
        it('should render the page'); 
      }); 
    }); 

    //loadPageSync 
    describe('#_loadPageSync()', function(){
      it('should not render until all children have been loaded and instantiated')
    });   

    //getNumBlocks 
    describe('#getNumBlocks()', function(){
      it('should return the number of blocks on the page'); 
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
 
