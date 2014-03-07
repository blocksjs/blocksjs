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
  //Blocks Core API 
  describe('core', function(){ 
    var blocks = window.blocks = new core;      


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
      it('should return the block that has that _blockID', function(done){
        blocks.createBlock('Container', function(block){ 
          var blockID = block.view._blockID; 
          expect(blocks.getBlockById(blockID)).to.equal(block.view); 
          done(); 
        }); 
      }); 
    });   

    //getBlocksByClassName 
    describe('#getBlocksByClassName()', function(){
      it('should return an array of all blocks with this blockClass', function(done){
        blocks.createBlock('Container', function(block){ 
          var classes = blocks.getBlocksByClassName('Container'); 
          expect(classes).to.be.an.instanceof(Array); 
          expect(classes).to.have.length.above(0); 
          done(); 
        });
      }); 
    });    
  }); 

  mocha.run(); 

}); 

