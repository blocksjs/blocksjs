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
      it('should be able to load synchronously'/*, function(done){
        blocks.loadPage('../../tests/testSync.json', function(json){
          expect(_.isObject(json)).to.be.false; 
          done(); 
        });
      }*/); 
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
            expect(document.contains(json.content.view)).to.not.be.null;
            done(); 
          });
        }); 
      }); 
    }); 

    //loadPageSync 
    describe('#_loadPageSync()', function(){
      it('should not render until all children have been loaded and instantiated')
    });   

  mocha.run(); 
}); 

  