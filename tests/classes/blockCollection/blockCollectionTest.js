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
      name: 'childviewcontainer',
      location: '../libs',
      main: 'childviewcontainer'
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

require(['core','BlockCollection', 'chai', 'mocha'], function(core, BlockCollection, chai){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 
  var blocks = window.blocks = new core; 

  blocks.createBlock('Block', {
    model:{}, 
    view:{
      blockID: 'ohheeeey'
    }
  },function(block){
    var blockCollection = new BlockCollection([block.view]); 
    console.log(blockCollection); 
  }); 
   
  

}); 