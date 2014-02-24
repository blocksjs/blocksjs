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
var requireArray = ['core','Block','TextBlock','Container','Page', 'chai'];
requireArray.push('json!../../tests/classes/block/testingPageBasicBlock.json');
requireArray.push('json!../../tests/classes/block/testingPageTextBlock.json');
requireArray.push('mocha');

require(requireArray, function(Blocks, blockClass, textBlockClass, containerClass, pageClass, chai, basicPageJSON, textPageJSON){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 

	//view JSON


	//model JSON



	describe("Block", function(){

		console.log(Blocks);
		//basic block with default configurations
		var blockBasic = new blockClass(); //Blocks.createBlock({});
		console.log(blockBasic);
		//basic block with default configurations created as part of a page
		var basicPage = {};//Blocks.loadPage(basicPageJSON);
		var blockBasicInPage = {};//basicPage.getBlocksByClassName('Block');
		//text block with default configurations created as part of a page
		var textPage = {};//Blocks.loadPage(textPageJSON);
		var blockTextInPage = {};//basicPage.getBlocksByClassName('TextBlock');

		var blockText = new textBlockClass();
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



		//gets a whitelisted variable (from attributes)
		describe("#get()", function(){
			it("should return entire attribute list if no arguments passed in", function(){
				var resultsBasic = blockBasic.get();
				// var resultsPageBasic = blockBasicInPage.get();
				// var resultsText = blockTextInPage.get();
				var resultsText = blockText.get();

				expect(_.isEmpty(resultsBasic)).to.equal(_.isEmpty({}));
				// expect(resultsPageBasic).to.equal(void 0);
				expect(JSON.stringify(resultsText)).to.equal(JSON.stringify({text:'You should probably fill this with real text :)'}));
			});
			it("should return undefined if property doesn't exit", function(){
				var resultsBasic = blockBasic.get('jeremy');
				// var resultsPageBasic = blockBasicInPage.get('jeremy');
				// var resultsText = blockTextInPage.get('jeremy');
				var resultsText = blockText.get('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return the correct value if property does exist", function(){
				// var resultsText = blockTextInPage.get('text');
				var resultsText = blockText.get('text');

				//expect(resultsText).to.not.equal(void 0);
				expect(resultsText).to.equal('You should probably fill this with real text :)');
			});
		});

		//sets a whitelisted variable (from attributes)
		//set ( key , new value )
		describe("#set()", function(){
			it("should return undefined if you haven't passed in any parameters", function(){
				var resultsBasic = blockBasic.set();
				// var resultsPageBasic = blockBasicInPage.set();
				// var resultsText = blockTextInPage.set();
				var resultsText = blockText.set();

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return undefined if you haven't passed in a valid key",function(){
				var resultsBasic = blockBasic.set('jeremy');
				// var resultsPageBasic = blockBasicInPage.set('jeremy');
				// var resultsText = blockTextInPage.set('jeremy');
				var resultsText = blockText.set('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return false if you haven't passed in a valid value to be set", function(){
				// var resultsText = blockTextInPage.set('text');
				var resultsText = blockText.set('text');

				expect(resultsText).to.equal(false);
			});
			it("should return the block if everything is valid", function(){
				// var result = blockTextInPage.set('text', 'shanaynay');
				var resultText = blockText.set('text', 'shanaynay');

				// expect(result).to.equal(blockTextInPage);
				expect(resultText).to.equal(blockText);
			});
			it("should successfully update the property that is changing if parameters are valid", function(){
				// blockTextInPage.set('text', 'twiddlydiddly');
				blockText.set('text','shanaynay');

				// expect(blockTextInPage.get('text')).to.equal('twiddlydiddly');				
				expect(blockText.get('text')).to.equal('shanaynay');
			});
		});

		//function to set user generated blockID
		describe("#setID()",function(){
			it("should return false if no ID is passed in",function(){
				expect(blockBasic.setID()).to.equal(false);
				// expect(blockTextInPage.setID()).to.equal(false);
				expect(blockText.setID()).to.equal(false);
			});
			it("should return false if the ID passed in is not a valid string",function(){
				expect(blockBasic.setID(function(){var x = 9; var y = x+7;})).to.equal(false);
				// expect(blockTextInPage.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
				expect(blockText.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
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
				blockText.setID('LinJeremy');
				blockBasic.setID(function(){var x = 9; var y = x+7;});
				// blockTextInPage.setID({traffic:'wow',jeremy:'lin'});
				blockText.setID({traffic:'wow',jeremy:'lin'});

				expect(blockBasic.getID()).to.equal('JeremyLin');
				expect(blockText.getID()).to.equal('LinJeremy');
			});
			it("should return this when parameter passed in is successful", function(){
				var blockResult = blockBasic.setID('TwinkleTwinkle');
				// var textResult = blockTextInPage.setID('NinaFace');
				var textResult = blockText.setID('NinaFace');

				expect(blockResult).to.equal(blockBasic);
				expect(textResult).to.equal(blockText);
			});
		});

		//function to get user generated blockID
		describe("#getID()",function(){
			it("should return null if no ID has been set", function(){
				blockBasic = new blockClass;

				expect(blockBasic.getID()).to.equal(null);
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
				blockBasic = new blockClass();
				var resultsBasic = blockBasic.toJSON();
				// var resultsPageBasic = blockBasicInPage.toJSON();

				expect(JSON.stringify(resultsBasic)).to.equal(JSON.stringify({blockClass:'Block'}));
				// expect(resultsPageBasic).to.equal({className:'Block'});
			});
			it("should return the user set blockID if a user has set an ID", function(){
				blockBasic.setID('magicalmoment');

				expect(JSON.stringify(blockBasic.toJSON())).to.equal(JSON.stringify({blockClass:'Block',blockID:'magicalmoment'}));
			});
			it("should return the view attributes if they come set", function(){
				blockText = undefined;
				blockText = new textBlockClass();
				var newResultsText = blockText.toJSON();

				console.log(blockText.get());
				console.log('THIS IS THE GET');

				expect(JSON.stringify(newResultsText)).to.equal(JSON.stringify({blockClass:'TextBlock', attributes:{text:'You should probably fill this with real text :)'}}));
			});
			it("should return the model data if model is set", function(){
				expect(false).to.equal(true);
			});
			it("should return the updated model data if model is set and then updated dynamically", function(){
				expect(false).to.equal(true);
			});
			it("should return the view data if extra view data is passed in via json settings", function(){
				expect(false).to.equal(true);
				textPage = Blocks.loadPage(textPageJSON);
				blockTextInPage = basicPage.getBlocksByClassName('TextBlock');

				var resultsText = blockTextInPage.toJSON();

				expect(resultsText).to.equal({className:'TextBlock', text:'herro', type:'p'});
			});
			it("should return the updated view data if extra view attributes are added or updated dynamically", function(){
				blockText = new textBlockClass();
				blockText.set('text', 'herro');
				var resultsText = blockText.toJSON();

				expect(JSON.stringify(resultsText)).to.equal(JSON.stringify({blockClass:'TextBlock', attributes:{text:'herro'}}));
				// blockTextInPage.set('text', 'herro');
				// var resultsText = blockTextInPage.toJSON();

				// expect(resultsText).to.equal({className:'TextBlock', text:'You should probably fill this with real text :)', type:'p'});
			});
		});

		//initializes the object
		describe("#initialize()", function(){
			it("should set attributes if attributes are passed in as a hash", function(){
			//hash cannot use the following keys: model, collection, el, id, className, tagName, attributes and events
				var hash = {'magic':'tragic','tragic':'bronson','number':10};
				var newBlock = new blockClass(hash);

				expect(JSON.stringify(newBlock.get())).to.equal(JSON.stringify(hash));
			});
			it("should create an internal _blockID",function(){
				
			});
		});

		//renders the object
		describe("#render()", function(){

		});

		//removes the object and all variable references/event listeners therewithin
		describe("#remove()", function(){
			it("should remove all attributes from memory", function(){

			});
			it("should unsubscribe from all event & stream channels", function(){

			});
			it("should not exist after remove is finished running", function(){

			});
		});

		//should the next two be in here?

		//convenience function to subscribe block to a channel
		describe("#subscribe()", function(){

		});

		//convenience function to unsubscribe block from a channel
		describe("#unsubscribe()", function(){

		});

		//returns an array of ancestors (className) from most recent to Block
		describe("#getClassAncestry()", function(){
			it("should return null for the base block class", function(){
				var resultsBasic = blockBasic.getClassAncestry();
				// var resultsPageBasic = blockBasicInPage.getClassAncestry();

				expect(resultsBasic).to.equal(null);
				// expect(resultsPageBasic).to.equal(null);
			});
			it("should return container then block for the page class", function(){
				// var basicPageResults = basicPage.getClassAncestry();
				// var textPageResults = textPage.getClassAncestry();
				var testPage = new pageClass;
				var resultsPage = testPage.getClassAncestry();

				expect(resultsPage.toString()).to.equal(['Container','Block'].toString());
				// expect(basicPageResults).to.equal(['Container', 'Block']);
				// expect(textPageResults).to.equal(['Container', 'Block']);
			});
			it("should return block for the classes that directly extend Block", function(){
				// var resultsText = blockTextInPage.getClassAncestry();
				var resultsText = blockText.getClassAncestry();
				
				var testContainer = new containerClass;
				var resultsContainer = testContainer.getClassAncestry();

				expect(resultsContainer.toString()).to.equal(['Block'].toString());
				expect(resultsText.toString()).to.equal(['Block'].toString());
			});
		});

		//gets the page this block is a part of
		describe("#getPage()", function(){
			it("should return a reference to the page if the block is part of a page", function(){
				var resultsPageBasic = blockBasicInPage.getPage();
				var resultsText = blockTextInPage.getPage();

				expect(resultsPageBasic).to.equal(basicPage);
				expect(resultsText).to.equal(textPage);
			});
			it("should return undefined if the block is not part of a page", function(){
				var resultsBasic = blockBasic.getPage();

				expect(resultsBasic).to.equal(void 0);
			});
		});

		/// still need checks for: 
		/*

			blockClass

			blockID stuff

			internal _blockID stuff

			super stuff

			environmentType (though i think this should not exist - will talk to lerenzo)

			this.model



		*/

	});
	mocha.run();
});