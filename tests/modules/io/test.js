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
require(['core'], function(core){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 
  var blocks = window.blocks = new core; 

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
    mocha.run(); 
}); 