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

    //block list 
    describe('#_blockIds', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('_blockIds');  
      }); 

      it('should have update the hash every time a block is created', function(done){
        blocks.createBlock('Block', function(block){
          expect(blocks._blockIds[block.view._blockID]).to.equal(block.view); 
          done(); 
        }); 
      }); 

      it('should update every time a block is deleted', function(done){
        blocks.createBlock('Block', function(block){
          var blockId = block.view._blockID; 
          block.view.remove(); 
          expect(blocks._blockIds[blockId]).to.not.exist; 
          done(); 
        }); 
      });  
    });     

    //userBlockList 
    describe('#_userBlockIds', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('_userBlockIds'); 
      }); 

      it('should update when a created block has a blockId', function(done){
        blocks.createBlock('Block', {
          model:{}, 
          view:{
            blockID: 'mySpecialClass'
          }
        }, function(block){
          expect(blocks._userBlockIds[block.view.get('blockID')]).to.equal(block.view._blockID); 
          done(); 
        }); 
      }); 

      it('should get rid of the objects in the hash when the block is removed', function(done){
        blocks.createBlock('Block', { 
          model:{}, 
          view:{ 
            blockID: 'mySpecialClass2' 
          } 
        }, function(block){ 
          var blockID = block.view.get('blockID'); 
          block.view.remove(); 
          expect(blocks._userBlockIds[blockID]).to.not.exist; 
          done(); 
        }); 
      });  
    }); 

    //classList 
    describe('#classList', function(){ 
      it('should exist', function(){ 
        expect(blocks).to.have.a.property('_classList'); 
      });  

      it('should add the _blockId to the hash when a block is created', function(done){
        blocks.createBlock('Container', { 
          model:{}, 
          view:{ 
            blockID: 'mySpecialClass' 
          } 
        }, function(block){ 
          var classes = block.view.getClassAncestry().concat(block.view.blockClass);
          var maybe; 
          _.each(classes, function(className){ 
            if(className !== 'Block'){ 
              maybe = _.find(blocks._classList[className], function(id){ 
                return id === block.view._blockID; 
              }); 
            } 
          }); 
          expect(maybe).to.exist;  
          done(); 
        }); 
      }); 

      it('should get rid of the id in the hash when the block is removed', function(done){
        blocks.createBlock('Container', { 
          model:{}, 
          view:{ 
            blockID: 'mySpecialClass' 
          } 
        }, function(block){ 
          var classes = block.view.getClassAncestry().concat(block.view.blockClass);
          expect(blocks._userBlockIds[block.view.get('blockID')]).to.equal(block.view._blockID); 
          done(); 
        }); 
      });

    }); 

    //saveState 
    describe('#saveState()', function(){ 
      it('should make an ajax request somewhere'); 
    });    
   
  }); 

  mocha.run(); 
});
 
