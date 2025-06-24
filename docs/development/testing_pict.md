# Automated Testing and Pict

## Setting up a View for Testing

Sometimes you want to test some code, and don't want to load the whole module into a browser.  Here is a way to do so:

```javascript
const Chai = require('chai');
const Expect = Chai.expect;

const libPict = require('pict');
const libPictView = require(`pict-view`);

const viewConfiguration = {
	"ViewIdentifier": "Example-View",

	"DefaultRenderable": "Example-Renderable",
	"DefaultDestinationAddress": "#MyApplicationContainer",

	"Templates": [
		{
			"Hash": "Example-View-Template",
			"Template": "<h1>{~D:AppData.TitleText~}</h1> <p>{~D:AppData.Content~}</p>"
		}
	],

	"Renderables": [
		{
			"RenderableHash": "Example-Renderable",
			"TemplateHash": "Example-View-Template"
		}
	]
}

// Normally this would be in another code file; for this example it's embedded here.
class myView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	doSomething(pNonsenseParameter)
	{
		this.pict.log.trace(`This function doesn't do anything; it's part of a very silly test demo.`);
		this.pict.log.debug(`The Nonsense Parameter: ${pNonsenseParameter}`);
	}
}

suite
(
	'Pict Environment Unit Test Example',
	() =>
	{
		setup(() => { });

		suite
			(
				'Basic Tests',
				() =>
				{
					test(
						'Basic Initialization',
						(fDone) =>
						{
							// Initialize pict
							let _Pict = new libPict();
							// Put some application state into pict
							_Pict.AppData.TitleText = `Wary Time`;
							_Pict.AppData.Content = `This is like Lorem Ipsum only with less Latin.`;
							// Setup an "environment" which allows us to inspect the activity -- pict has built in EnvironmentObject and EnvironmentLog
							let _PictEnvironment = new libPict.EnvironmentObject(_Pict);
							// Add our view to pict now that the environment is set up
							let _PictView = _Pict.addView('Pict-TestView', viewConfiguration, myView);
							Expect(_PictView).to.be.an('object');
							// Now manually initialize the view.
							_PictView.initializeAsync(
								(pError) =>
								{
									_PictView.doSomething('This is a nonsense parameter');
									// Now render the view.
									_PictView.render();
									// Check that the view rendered correctly.
									Expect(_PictEnvironment.contentMap['#MyApplicationContainer']).to.contain('<h1>Wary Time</h1>');
									// Signal to mocha that the test is done.
									return fDone();
								})
						}
					);
				}
			);
	}
);
```

The code above exercises a view manually and checks that the content map contains the content we expect with the state we are setting.  The logging output for this test execution looks like:

```
2025-06-24T02:02:50.785Z [trace] (ApplicationNameHere): This function doesn't do anything; it's part of a very silly test demo.
2025-06-24T02:02:50.786Z [debug] (ApplicationNameHere): The Nonsense Parameter: This is a nonsense parameter
2025-06-24T02:02:50.787Z [info] (ApplicationNameHere): Mocking an ASSIGN to Address -> [#MyApplicationContainer]
{
  "Content": "<h1>Wary Time</h1> <p>This is like Lorem Ipsum only with less Latin.</p>"
}
```

There are also mechanisms for inspecting what was logged out.  This is all on top of probing the view's state itself.
