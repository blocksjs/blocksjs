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
    	name:'ViewBlock',
    	location:'./',
    	main:'ViewBlock'
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
	}, 
  ] 
}); 
var requireArray = ['core','postal','Block','ViewBlock','Container','Page', 'load', 'chai'];
requireArray.push('json!../../tests/classes/block/testingPageBasicBlock.json');
requireArray.push('json!../../tests/classes/block/testingPageTextBlock.json');
requireArray.push('mocha');

require(requireArray, function(Blocks, Postal, Block, ViewBlock, Container, Page, PageLoader, chai, basicPageJSON, textPageJSON){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 

	//view JSON


	//model JSON



	describe("Block", function(){

		console.log(Blocks);
		//basic block with default configurations
		var blockBasic = new Block(); //Blocks.createBlock({});
		console.log(blockBasic);


/*		
		other configurations to test. to be moved elsewhere.

		//basic block with default configurations created as part of a page
		var basicPage = {};//Blocks.loadPage(basicPageJSON);
		var blockBasicInPage = {};//basicPage.getBlocksByClassName('Block');
		//text block with default configurations created as part of a page
		var textPage = {};//Blocks.loadPage(textPageJSON);
		var blockTextInPage = {};//basicPage.getBlocksByClassName('TextBlock');

		// var blockText = new textBlockClass();
		var blockText = new Block();

		console.log(blockText.get());
		console.log('FIRST MAJR');

		//block with view config but no model
		var blockView;
		//block with model config but no view
		var blockModel;
		//block with both model & view configs
		var blockViewModel;

		//block with view config but no model created as part of a page
		var blockViewInPage;
		//block with model config but no view created as part of a page
		var blockModelInPage;
		//block with both model & view configs created as part of a page
		var blockViewModelInPage;
*/

		//new block type that extends Block with some defaults
			var BlockDefaults = function(options){
				var newBlock = _.extend({}, Block.prototype, {
					blockClass: 'BlockDefaults',
					superClass: 'Block',
					super: Block.prototype,
					defaults: {
						hello: 'goodbye',
						goodbye: 'no!'
					},
					initialize: function(options){ 
						Block.call(this, options); 
					}, 
				});
				newBlock.initialize(options);
				return newBlock;
			};

			//function to make sure 2 JSONs are equal
			var matchJSONs = function(values, others){
				_.each(values,function(value, key){
					expect(others[key]).to.exist;
					expect(others[key]).to.equal(value);
				});

				_.each(others,function(value, key){
					expect(values[key]).to.exist;
					expect(values[key]).to.equal(value);
				});
			}

		//the following tests make sure things that happen in the constructor 
		//work properly. separate functions called from the constructor are tested
		//separately below the constructor description.
		describe("#constructor", function(){
			it("should return a block successfully and for said block to be an object", function(){
				var basicBlock = new Block();
				expect(basicBlock).to.exist;
				expect(basicBlock).to.be.an('object');
			});
			it("should set passed in options to the block directly if they don't override anything set internally", function(){
				var basicBlock = new Block({
					hello: 'BONJOUR!',
					goodbye: 'Mai pourqoi??'
				});
				expect(basicBlock.hello).to.equal('BONJOUR!');
				expect(basicBlock.goodbye).to.equal('Mai pourqoi??');
			});
			it("should ignore passed in options if they override an internally set variable in the block", function(){
				
				// if blockClass can be set like this in the future
				//then the way this test is written
				//needs to be updated

				var basicBlock = new Block({
					get: 'hardy hardy',
					blockClass: 'shmickshmick',
				});
				expect(basicBlock.get).to.be.a('function');
				expect(basicBlock.blockClass).to.not.equal('shmickshmick');

				// superClass should still be good though

				var defaultsBlock = new BlockDefaults({
					superClass: 'JABADOO',
					get: 'hardy hardy',
					initialize: 90
				});
				expect(defaultsBlock.get).to.be.a('function');
				expect(defaultsBlock.initialize).to.be.a('function');
				expect(defaultsBlock.superClass).to.equal('Block');				
			});
			it("should set the defaults to the block directly", function(){
				var defaultsBlock = new BlockDefaults();
				expect(defaultsBlock.hello).to.equal('goodbye');
				expect(defaultsBlock.goodbye).to.equal('no!');
			});
			it("should override the defaults if the same key is passed in as an option (and it should be set directly to the block)", function(){
				var defaultsBlock = new BlockDefaults({
					hello: 'HERRO!'
				});
				expect(defaultsBlock.hello).to.equal('HERRO!');
			});
			it("should be able to do a mix and match of the above", function(){
				var defaultsBlock = new BlockDefaults({
					jeremy: true,
					abadaba: 39,
					set: 'yoyobado',
					hello: '9gag is a fun place to be'				
				});
				expect(defaultsBlock.jeremy).to.equal(true);
				expect(defaultsBlock.abadaba).to.equal(39);
				expect(defaultsBlock.set).to.be.a('function');
				expect(defaultsBlock.hello).to.equal('9gag is a fun place to be');
				expect(defaultsBlock.goodbye).to.equal('no!');
				expect(defaultsBlock.blockClass).to.equal('BlockDefaults');
				expect(defaultsBlock.superClass).to.equal('Block');
			});
		});

		//the following tests make sure that the whitelist is set properly
		describe("#_whitelist", function(){
			it("should exist in a regular block", function(){
				var basicBlock = new Block();
				expect(basicBlock._whitelist).to.exist;
			});
			it("should exist in anything that extends block using standard class definitions", function(){
				var viewBlock = new ViewBlock();
				expect(viewBlock._whitelist).to.exist;
			});
			it("should exist in anything that extends block in real time", function(){
				var defaultsBlock = new BlockDefaults();
				expect(defaultsBlock._whitelist).to.exist;
			});
			it("should include the blockClass as 'false' in the whitelist for Block", function(){
				var basicBlock = new Block();
				expect(basicBlock._whitelist.blockClass).to.be.false;
			});
			it("should include the blockClass as 'false' in the whitelist for things that extend Block using standard class definitions", function(){
				var viewBlock = new ViewBlock();
				expect(viewBlock._whitelist.blockClass).to.be.false;
			});
			it("should include the blockClass as 'false' in the whitelist for things that extend Block in realtime", function(){
				var defaultsBlock = new BlockDefaults();
				expect(defaultsBlock._whitelist.blockClass).to.be.false;
			});
			it("should include items in the defaults", function(){
				var defaultsBlock = new BlockDefaults();
				expect(defaultsBlock._whitelist.hello).to.be.true;
			});
			it("should include items passed in as options if they aren't overriding an internally set variable in the class", function(){
				var basicBlock = new Block({
					why: 'why not?',
					isItTime: 'time is an illusion'
				});
				expect(basicBlock._whitelist.why).to.be.true;
				expect(basicBlock._whitelist.isItTime).to.be.true;
			});
			it("should not include items passed in as options if they are overriding an internally set variable in the class", function(){
				var basicBlock = new Block({
					_blockID: 'yoyoyo'
				});
				expect(basicBlock._whitelist._blockID).to.not.exist;
			});
			it("should be able to do a mix and match of the above tests properly", function(){
				var defaultsBlock = new BlockDefaults({
					_blockID: 'yoyobado',
					jeremy: true,
					abadaba: 39,
					bockID: 'yoyobado',
					hello: '9gag is a fun place to be'				
				});
				expect(defaultsBlock._whitelist._blockID).to.not.exist;
				expect(defaultsBlock._whitelist.jeremy).to.be.true;
				expect(defaultsBlock._whitelist.bockID).to.be.true;
				expect(defaultsBlock._whitelist.abadaba).to.be.true;
				expect(defaultsBlock._whitelist.hello).to.be.true;
				expect(defaultsBlock._whitelist.goodbye).to.be.true;
				expect(defaultsBlock._whitelist.blockClass).to.be.false;
			});
		});

		//gets a whitelisted variable (from attributes)
		describe("#get()", function(){
			var blockBasic = new Block({
				magic: '3'
			});
			it("should return undefined if property doesn't exit", function(){
				var resultsBasic = blockBasic.get('jeremy');
				// var resultsPageBasic = blockBasicInPage.get('jeremy');
				// var resultsText = blockTextInPage.get('jeremy');
				//var resultsText = blockText.get('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				//expect(resultsText).to.equal(void 0);
			});
			it("should return undefined if attribute passed in is not on whitelist", function(){
				expect(blockBasic.get('_blockID')).to.equal(void 0);
			});
			it("should return 'Block' if attribute is blockClass (which is falsely on white list)", function(){
				var blockBasic = new Block();
				expect(blockBasic.blockClass).to.exist;
				expect(blockBasic.get('blockClass')).to.equal('Block');
			})
			it("should return entire whitelisted attribute list if no arguments passed in", function(){
				var resultsBasic = blockBasic.get();
				// var resultsPageBasic = blockBasicInPage.get();
				// var resultsText = blockTextInPage.get();
				//var resultsText = blockText.get();

				var values = {magic:'3',blockClass:'Block'};

				matchJSONs(values,resultsBasic);

				var defaultsBlock = new BlockDefaults({
					jeremy: true,
					abadaba: 39,
					set: 'yoyobado',
					hello: '9gag is a fun place to be'				
				});
				var resultsDefaults = defaultsBlock.get();
				var values2 = {jeremy: true, abadaba:39, hello: '9gag is a fun place to be', goodbye: 'no!', blockClass: 'BlockDefaults'};
				
				matchJSONs(values2, resultsDefaults);

				// expect(resultsPageBasic).to.equal(void 0);
				//expect(JSON.stringify(resultsText)).to.equal(JSON.stringify({text:'You should probably fill this with real text :)'}));
			});
			it("should return the correct value if property does exist & is on whitelist", function(){
				// var resultsText = blockTextInPage.get('text');
				//var resultsText = blockText.get('text');
				expect(blockBasic.get('magic')).to.equal('3');
				//expect(resultsText).to.not.equal(void 0);
				//expect(resultsText).to.equal('You should probably fill this with real text :)');
			});
		});

		//sets a whitelisted variable (from attributes)
		//set ( key , new value )
		describe("#set()", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});
			it("should return undefined if you haven't passed in any parameters", function(){
				var resultsBasic = blockBasic.set();
				// var resultsPageBasic = blockBasicInPage.set();
				// var resultsText = blockTextInPage.set();
				//var resultsText = blockText.set();

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				//expect(resultsText).to.equal(void 0);
			});
			it("should return undefined if you haven't passed in a valid key",function(){
				var resultsBasic = blockBasic.set('jeremy');
				// var resultsPageBasic = blockBasicInPage.set('jeremy');
				// var resultsText = blockTextInPage.set('jeremy');
				//var resultsText = blockText.set('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				//expect(resultsText).to.equal(void 0);
			});
			it("should return undefined if attribute passed in is not in the internal whitelist", function(){
				expect(blockBasic.set('_blockID', '389')).to.equal(void 0);
			});
			it("should return undefined if attribute passed in is not set to true in the internal whitelist", function(){
				expect(blockBasic.set('blockClass', '389')).to.equal(void 0);
			});
			it("should return false if you haven't passed in a valid value to be set", function(){
				// var resultsText = blockTextInPage.set('text');
				// var resultsText = blockText.set('text');
				var result = blockBasic.set('magic');

				expect(result).to.equal(false);
			});
			it("should return the block if everything is valid", function(){
				// var result = blockTextInPage.set('text', 'shanaynay');
				// var resultText = blockText.set('text', 'shanaynay');
				var result = blockBasic.set('magic', 'tragic');

				// expect(result).to.equal(blockTextInPage);
				// expect(resultText).to.equal(blockText);
				expect(result).to.equal(blockBasic);
			});
			it("should successfully update the property that is changing if parameters are valid", function(){
				// var result = blockTextInPage.set('text', 'shanaynay');
				// var resultText = blockText.set('text', 'shanaynay');
				blockBasic.set('magic', 'tragic');

				// expect(result).to.equal(blockTextInPage);
				// expect(resultText).to.equal(blockText);
				expect(blockBasic.get('magic')).to.equal('tragic');
			});
			it("should trigger an 'attribute:change' event when setting successfully ", function(){
				var thingy = false;
				blockBasic.on('dragic:change',function(){
					thingy = 'shmo';
				});
				blockBasic.set('dragic','WHOWA');
				expect(thingy).to.equal('shmo');
			});
			it("should trigger a change event every time something sets", function(){
				var count = 0;
				blockBasic.on('change', function(){
					count++;
				});
				blockBasic.set('dragic','goran');
				blockBasic.set('tragic','moran');
				blockBasic.set('magic','floran');
				expect(count).to.equal(3);
			});
		});

		//function to set user generated blockID
		describe("#setID()",function(){
			it("should return false if no ID is passed in",function(){
				expect(blockBasic.setID()).to.equal(false);
				// expect(blockTextInPage.setID()).to.equal(false);
				//expect(blockText.setID()).to.equal(false);
			});
			it("should return false if the ID passed in is not a valid string",function(){
				expect(blockBasic.setID(function(){var x = 9; var y = x+7;})).to.equal(false);
				// expect(blockTextInPage.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
				//expect(blockText.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
			});
			it("should set ID to null if null is passed in as the ID", function(){
				blockBasic.setID('magic');
				blockBasic.setID(null);

				expect(blockBasic.getID()).to.equal(null);
			});
			it("should change the blockID if the parameter passed in is valid", function(){
				blockBasic.setID('JeremyLin');
				expect(blockBasic.getID()).to.equal('JeremyLin');
			});
			it("should not change the blockID if the paramter passed in is invalid", function(){
				blockBasic.setID('JeremyLin');
				// blockTextInPage.setID('LinJeremy');
				//blockText.setID('LinJeremy');
				blockBasic.setID(function(){var x = 9; var y = x+7;});
				// blockTextInPage.setID({traffic:'wow',jeremy:'lin'});
				//blockText.setID({traffic:'wow',jeremy:'lin'});

				expect(blockBasic.getID()).to.equal('JeremyLin');
				//expect(blockText.getID()).to.equal('LinJeremy');
			});
			it("should return this when parameter passed in is successful", function(){
				var blockResult = blockBasic.setID('TwinkleTwinkle');
				// var textResult = blockTextInPage.setID('NinaFace');
				//var textResult = blockText.setID('NinaFace');

				expect(blockResult).to.equal(blockBasic);
				//expect(textResult).to.equal(blockText);
			});
		});

		//function to get user generated blockID
		describe("#getID()",function(){
			var	blockBasic = new Block();
			it("should return undefined if no ID has been set", function(){
				expect(blockBasic.getID()).to.equal(void 0);
			});
			it("should return the ID if an ID has been set", function(){
				blockBasic.setID('Transistor');

				expect(blockBasic.getID()).to.equal('Transistor');
			});
		});

		//returns the block's whitelisted variables + classname
		//in the json format
		describe("#toJSON()", function(){
			it("should return solely the className if the Block has no extra model or view data", function(){
				//check for both standard Block and something that extends it
				var blockBasic = new Block();
				var resultsBasic = blockBasic.toJSON();
				// var resultsPageBasic = blockBasicInPage.toJSON();

				var values = {blockClass: 'Block'};
				matchJSONs(values, resultsBasic);
				// expect(resultsPageBasic).to.equal({className:'Block'});
			});
			it("should return the user set blockID if a user has set an ID", function(){
				blockBasic.setID('magicalmoment');

				matchJSONs({blockClass:'Block',blockID:'magicalmoment'},blockBasic.toJSON());
			});
			it("should return defaults that are set", function(){
				// blockText = new textBlockClass();
				var defaultsBlock = new BlockDefaults();
				matchJSONs({
					blockClass: 'BlockDefaults',
					hello: 'goodbye',
					goodbye: 'no!'
				}, defaultsBlock.toJSON());
			});
			it("should return extra attributes passed in through attributes that are valid", function(){
				var blockBasic = new Block({
					jarjar: 'binks',
					farfar: 'stinks',
					why: false
				});
				matchJSONs({
					jarjar: 'binks',
					farfar: 'stinks',
					why: false,
					blockClass: 'Block'
				}, blockBasic.toJSON());
			});
/*			it("should return the model data if model is set", function(){
				expect(false).to.equal(true);
			});
			it("should return the updated model data if model is set and then updated dynamically", function(){
				expect(false).to.equal(true);
			});
			it("should return the view data if extra view data is passed in via json settings", function(){
				expect(false).to.equal(true);
			});
*/			it("should return an up-to-date version of the block if it was updated dynamically", function(){
				var blockBasic = new Block({
					hello: 'bello',
					smack: 'shack'
				});

				blockBasic.set('hello','but why?');
				blockBasic.set('smack', false);
				blockBasic.setID('livepainters.tumblr.com');

				matchJSONs({
					hello: 'but why?',
					smack: false,
					blockID: 'livepainters.tumblr.com',
					blockClass: 'Block'
				}, blockBasic.toJSON());

				var defaultsBlock = new BlockDefaults({
					gerbil: 'hamster'
				});

				defaultsBlock.set('goodbye','yes!');

				matchJSONs({
					hello: 'goodbye',
					goodbye: 'yes!',
					gerbil: 'hamster',
					blockClass: 'BlockDefaults'
				}, defaultsBlock.toJSON());
			});
		});
/*
		//initializes the object
		describe("#initialize()", function(){
			it("should set attributes if attributes are passed in as a hash", function(){
			//hash cannot use the following keys: model, collection, el, id, className, tagName, attributes and events
				var hash = {'magic':'tragic','tragic':'bronson','number':10};
				var newBlock = new Block(hash);

				expect(JSON.stringify(newBlock.get())).to.equal(JSON.stringify(hash));
			});
			it("should create an internal _blockID",function(){
				
			});
		});

		//renders the object
		describe("#render()", function(){

		});
*/
		//removes the object and all variable references/event listeners therewithin
		describe("#remove()", function(){
			it("should remove all attributes from memory", function(){

			});
			it("should unsubscribe from all event & stream channels", function(){

			});
			it("should not exist after remove is finished running", function(){

			});
		});

		//returns an array of ancestors (className) from most recent to Block
		describe("#getClassAncestry()", function(){
			it("should return 'Block' for the base block class", function(){
				var resultsBasic = blockBasic.getClassAncestry();
				// var resultsPageBasic = blockBasicInPage.getClassAncestry();

				expect(resultsBasic.toString()).to.equal(['Block'].toString());
				// expect(resultsPageBasic).to.equal(null);
			});
			it("should return ['BlockDefaults', 'Block'] for BlockDefaults (directly 'anonymously' extends block)", function(){
				var defaultsBlock = new BlockDefaults();
				expect(defaultsBlock.getClassAncestry().toString()).to.equal(['BlockDefaults', 'Block'].toString());
			});
			it("should return ['ViewBlock','Block'] for ViewBlock (directly 'standardly' extends block", function(){
				var viewBlock = new ViewBlock();
				expect(viewBlock.getClassAncestry().toString()).to.equal(['ViewBlock', 'Block'].toString());
			});
			it("should return ['Page','HTMLContainer','Container','ViewBlock','Block'] for Page", function(){
				var sequence = ['Page','HTMLContainer','Container','ViewBlock','Block'];
				var page = new Page();
				expect(page.getClassAncestry().toString()).to.equal(sequence.toString());
			});
			it("should return the same when using the 'getClassList' alias", function(){
				var sequence = ['Page','HTMLContainer','Container','ViewBlock','Block'];
				var page = new Page();
				expect(page.getClassList().toString()).to.equal(sequence.toString());				
			})
		});

		//gets the page this block is a part of
		describe("#getPage()", function(){
			it("should return a reference to the page if the block is part of a page", function(){
				var loadedPage = PageLoader.loadPage(basicPageJSON);

				console.log(loadedPage);

				expect(loadedPage).to.exist;

				//need unit test in here

				//using blocks to create something
			});
			it("should return undefined if the block is not part of a page", function(){


				var resultsBasic = blockBasic.getPage();

				expect(resultsBasic).to.equal(void 0);
			});
		});

		//traverses block tree to get the page that this is a part of
		describe("#_findPage", function(){
			it("should return a reference to the page if the block is part of a page", function(){
				//need unit test in here

				//using blocks to create something
			});
			it("should return undefined if the block is not part of a page", function(){
				var resultsBasic = blockBasic.getPage();

				expect(resultsBasic).to.equal(void 0);
			});
		});

		//traverses block tree to find page & sets the blocks page variable
		describe("#_getPage", function(){
			it("should set whatever findPage returns as the blocks page", function(){
				var basicBlock = new Block();
				// another one for something in a page

				basicBlock._getPage();

				expect(basicBlock.getPage()).to.equal(basicBlock._findPage());
			});
		});

		//a convenience function to create subscriptions
		describe("#in(attribute, topic, channel)", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});
			console.log('GET DA TINGY');
			console.log(blockBasic.get('magic'));
			// blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.jeremy = function(data){
				blockBasic.lin = data;
			}
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};

			it("should return undefined if attribute isn't passed in", function(){
				expect(blockBasic.in()).to.equal(void 0);
			});
			it("should return undefined if attribute doesn't exist in block", function(){
				expect(blockBasic.in('shanaynaybadoooo')).to.equal(void 0);
			});
			it("should return undefined if topic isn't passed in", function(){
//NEED TO FIX THIS TOO	
	//maybe not anymore
				//may need to change 'blockID' to something else
				expect(blockBasic.in('magic')).to.equal(void 0);
			});
			it("should return false if the attribute is not a white listed variable in block", function(){
// NEED TO FIX THIS SO THAT IT'S WHITE LISTED
	//maybe not anymore
				//expect(blockBasic.in('blockClass', 'topic')).to.equal(false);
			});
			it("should create a subscription on the topic to change the attribute with incoming data if the attribute is a non-function in block", function(){
				blockBasic.in('magic', 'topic');
				Postal.publish({
					topic: 'topic',
					data: 'shmata'
				});
				//perhaps might need to set timeout here
				expect(blockBasic.get('magic')).to.equal('shmata');
			});
			it("should create a subscription on the topic to call the attribute in block if it is a function in block", function(){
				blockBasic.in('jeremy', 'topic');
				Postal.publish({
					topic:'topic',
					data: 'linning!'
				});
				expect(blockBasic.lin).to.equal('linning!');
			});
			it("should do the same as the above two tests, but set a channel as well, if a channel is passed in", function(){
				blockBasic.in('magic', 'topic', 'STRATEGY');
				Postal.publish({
					channel: 'STRATEGY',
					topic: 'topic',
					data: 'batata'
				});

				blockBasic.in('jeremy', 'topic', 'TRIII');
				Postal.publish({
					channel: 'TRIII',
					topic: 'topic',
					data: 'shmatata'
				});
				//perhaps might need to set timeout here
				expect(blockBasic.get('magic')).to.equal('batata');
				expect(blockBasic.lin).to.equal('shmatata');
			});
			it("should create a new _ins if it is not created yet", function(){
				var blockNew = new Block({dragic:'er'});
				expect(blockNew._ins).to.not.exist;
				blockNew.in('dragic', 'jjajj');
				expect(blockNew._ins).to.exist;
			});
			it("should set a new array (keyed with attribute) on the internal _ins object in block if this attribute doesn't have any subscriptions yet", function(){
				expect(blockBasic._ins.dragic).to.equal(void 0);
				blockBasic.in('dragic', 'shloof');
				expect(blockBasic._ins.dragic).length(1);
			});
			it("should push a new object onto the array (keyed with attribute) on the internal _ins object in block if this attribute already has subscriptions", function(){
				expect(blockBasic._ins.tragic).to.equal(void 0);
				blockBasic.in('tragic','distance');
				blockBasic.in('tragic','magic');
				blockBasic.in('tragic', 'aloof.three', 'ofSparta');
				expect(blockBasic._ins.tragic).length(3);
			});
			it("should return the block so that it can be daisy chained with more functions", function(){
				expect(blockBasic.in('tragic','herro','berro')).to.equal(blockBasic);
			});
			//do we want the following? for now not implemented
			it("should set the attribute passed in as a function on the callback of the subscription IF the attribute is an anonymous function", function(){

			});
		});

		//a convenience function to create publishers that publish on attribute changes
		describe("#out(attribute, topic, channel", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});

			// blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			it("should return undefined if attribute isn't passed in", function(){
				expect(blockBasic.out()).to.equal(void 0);
			});
			it("should return undefined if attribute doesn't exist in block", function(){
				expect(blockBasic.out('jernodmmdm')).to.equal(void 0);
			});
			it("should return undefined if topic isn't passed in", function(){
				expect(blockBasic.out('magic')).to.equal(void 0);
			});
			it("should return false if the attribute is not a white listed variable in block", function(){
				//expect(blockBasic.out('blockClass', 'herro')).to.equal(false);
			});
			it("should listen to the attribute passed in, publishing any changes on the topic passed in", function(done){
				blockBasic.out('magic','topic');
				var booltime = false;
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						console.log('herro');
						booltime = data;
					}
				});
				blockBasic.set('magic','triangle');
				//might need more time
					expect(booltime).to.equal('triangle');
					done();
/*				setTimeout(function(){
					expect(booltime).to.equal('triangle');
					done();
				}, 400);
*/			});
			it("should listen to the attribute passed in, publishing any changes on the topic & channel passed in (if channel also passed)", function(){
				blockBasic.out('magic','topic','chancy');
				var booltime = false;
				Postal.subscribe({
					channel: 'chancy',
					topic: 'topic',
					callback: function(data){
						booltime = data*2;
					}
				});
				blockBasic.set('magic',4);
				//might need more time
				expect(booltime).to.equal(8);
			});
			it("should create a new object _outs if it does not exist", function(){
				var blockNew = new Block({dragic:'er'});
				expect(blockNew._outs).to.not.exist;
				blockNew.out('dragic', 'jjajj');
				expect(blockNew._outs).to.exist;
			});
			it("should set a new array (keyed with attribute) on the internal _outs object in block if this attribute doesn't have any subscriptions yet (with the callback for listenTo)", function(){
				expect(blockBasic._outs.dragic).to.not.exist;
				blockBasic.out('dragic', 'shloof');
				expect(blockBasic._outs.dragic).to.exist;
				expect(blockBasic._outs.dragic.length).to.equal(1);
			});
			it("should push a new callback for listenTo onto the array (keyed with attribute) on the internal _outs object in block if this attribute already has subscriptions", function(){
				expect(blockBasic._outs.tragic).to.equal(void 0);
				blockBasic.out('tragic', 'shloof');
				blockBasic.out('tragic', 'droof', 'gjagag');
				blockBasic.out('tragic', 'gjgjgjs', 'sleep');
				expect(blockBasic._outs.tragic).length(3);
			});			
			it("should return the block so that it can be daisy chained with more functions", function(){
				expect(blockBasic.out('tragic','herro','berro')).to.equal(blockBasic);
			});
		});

		//a convenience function to clear all subscriptions on an attribute
		describe("#clearIns(attribute)", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.in('magic','tragic');
			blockBasic.in('tragic', 'topic', 'channel');

			it("should return undefined if attribute is passed in and it doesn't exist in block", function(){
				expect(blockBasic.clearIns('stagbb')).to.equal(void 0);
			});
			it("should do nothing if a valid attribute is passed in that hasn't had any subscriptions created for it", function(){
				var savedState = blockBasic._ins.toString();
				blockBasic.clearIns('dragic');
				expect(blockBasic._ins.toString()).to.equal(savedState);
			});
			it("should unsubscribe from all the subscriptions in _ins if a valid attribute is passed in for which subscriptions exist", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.clearIns('magic');
				Postal.publish({
					topic: 'topic',
					data: 'seventy'
				});
				Postal.publish({
					channel: 'channel',
					topic: 'otherTopic',
					data: 'seventy'
				});
				expect(blockBasic.magic).to.not.equal('seventy');
			});
			it("should delete the array for the attribute passed if an array previously existed within _ins", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				expect(blockBasic._ins.magic).to.exist;
				blockBasic.clearIns('magic');
				expect(blockBasic._ins.magic).to.not.exist;
			});
			it("should unsubscribe from all subscriptions in _ins if no attributes passed in", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.in('dragic', 'topic');
				blockBasic.in('dragic', 'otherTopic', 'channel');
				blockBasic.in('tragic', 'topic');
				blockBasic.in('tragic', 'otherTopic', 'channel');
				blockBasic.clearIns();
				Postal.publish({
					topic: 'topic',
					data: 'seventy'
				});
				Postal.publish({
					channel: 'channel',
					topic: 'otherTopic',
					data: 'seventy'
				});
				expect(blockBasic.magic).to.not.equal('seventy');				
				expect(blockBasic.tragic).to.not.equal('seventy');				
				expect(blockBasic.dragic).to.not.equal('seventy');				
			});
			it("should have an empty object for _ins after after clearIns is called without an attribute", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.in('dragic', 'topic');
				blockBasic.in('dragic', 'otherTopic', 'channel');
				blockBasic.in('tragic', 'topic');
				blockBasic.in('tragic', 'otherTopic', 'channel');
				blockBasic.clearIns();
				expect(blockBasic._ins).to.be.empty;				
			});
			it("should return the block so that DAISY CHAINING!!!", function(){
				expect(blockBasic.clearIns()).to.equal(blockBasic);
			});
		})

		//a convenience function to clear all listeners on an attribute that publish a message
		describe("#clearOuts(attribute)", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});

			// blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.out('magic','tragic');
			blockBasic.out('tragic', 'topic', 'channel');

			it("should return undefined if attribute is passed in and it doesn't exist in block", function(){
				expect(blockBasic.clearOuts('JDJDJDJ')).to.equal(void 0);
			});
			it("should do nothing if a valid attribute is passed in that hasn't had any listener/publishers created for it", function(){
				var savedState = blockBasic._outs.toString();
				blockBasic.clearOuts('dragic');
				expect(blockBasic._outs.toString()).to.equal(savedState);
			});
			it("should stop listening to all listeners using callbacks for an attribute in _outs if a valid attribute is passed in for which listeners exist", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				var shmoop = 'doop';
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						shmoop = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'shmopic',
					callback: function(data){
						shmoop = data;
					}
				});
				blockBasic.clearOuts('tragic');
				blockBasic.set('tragic','face');
				expect(shmoop).to.equal('doop');
			});
			it("should delete the array for the attribute passed if an array previously existed within _outs", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.clearOuts('tragic');
				expect(blockBasic._outs.tragic).to.equal(void 0);
			});
			it("should stop listening to all listeners in _outs if no attributes passed in", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.out('magic', 'topic');
				blockBasic.out('magic', 'shmopic','hello');
				blockBasic.out('dragic', 'topic');
				blockBasic.out('dragic', 'shmopic','hello');
				var shmoop = 'doop';
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						shmoop = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'shmopic',
					callback: function(data){
						shmoop = data;
					}
				});
				blockBasic.clearOuts();
				blockBasic.set('tragic','face');
				expect(shmoop).to.equal('doop');
			});
			it("should have an empty object for _outs after after clearOuts is called without an attribute", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.out('magic', 'topic');
				blockBasic.out('magic', 'shmopic','hello');
				blockBasic.out('dragic', 'topic');
				blockBasic.out('dragic', 'shmopic','hello');
				blockBasic.clearOuts();
				expect(blockBasic._outs).to.be.empty;
			});
			it("should return the block so that DAISY CHAINING!!!", function(){
				expect(blockBasic.clearOuts()).to.equal(blockBasic);
			});
		});

		//internal clear for singular attribute in
		describe("#_clearIn(attribute)", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};

			blockBasic.in('magic','tragic');
			blockBasic.in('tragic', 'topic', 'channel');

			it("should unsubscribe from all the subscriptions in _ins for attribute", function(){
				blockBasic.in('magic','tragic','hello');
				blockBasic.magic = 'KROKODOLO';
				blockBasic._clearIn('magic');
				Postal.publish({
					channel: 'hello',
					topic: 'tragic',
					data: 'shmata'
				});
				Postal.publish({
					topic: 'tragic',
					data: 'shmata'
				});
				expect(blockBasic.magic).to.equal('KROKODOLO');
			});
			it("should delete the array for the attribute passed in in _ins", function(){
				blockBasic.in('tragic','tragic');
				blockBasic._clearIn('tragic');
				expect(blockBasic._ins.tragic).to.equal(void 0);
			});
		});

		//internal clear for singular attribute out
		describe("#_clearOut(attribute)", function(){
			var blockBasic = new Block({
				tragic: 7,
				magic: 7,
				dragic: 7
			});

			// blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.out('magic','tragic');
			blockBasic.out('tragic', 'topic', 'channel');

			it("should stop listening to all listeners using callbacks for the attribute in _outs", function(){
				blockBasic.out('magic','tragic','hello');
				var beats = 'beats';

				Postal.subscribe({
					topic: 'tragic',
					callback: function(data){
						beats = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'tragic',
					callback: function(data){
						beats = data;
					}
				});
				blockBasic._clearOut('magic');
				blockBasic.set('magic', 'squareface');
				expect(beats).to.equal('beats');
			});
			it("should delete the array for the attribute passed in in _outs", function(){
				blockBasic.out('tragic','tragic');
				blockBasic._clearOut('tragic');
				expect(blockBasic._outs.tragic).to.equal(void 0);
			});
		});


		/// still need checks for: 
		/*

			Block

			blockID stuff

			internal _blockID stuff

			super stuff

			environmentType (though i think this should not exist - will talk to lerenzo)

			this.model



		*/

	});
	mocha.run();
});