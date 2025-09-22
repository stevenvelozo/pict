const libPictApplication = require('pict-application');
const libPictView = require('pict-view');

// Create an options object for the Hello World view
const helloWorldViewOptions =
{
    "ViewIdentifier": "HelloWorldMessage",

    "DefaultRenderable": "HelloWorld-Renderable",
    "DefaultDestinationAddress": "#Application-Container",

    "Templates": [
        {
            "Hash": "HelloWorld-Content",
            "Template": `
<h1>Hello, World!</h1>
<p>This is a simple <em>'Hello, world.'</em> Pict application.</p>
`
        }
    ],
    "Renderables": [
        {
            "RenderableHash": "HelloWorld-Renderable",
            "TemplateHash": "HelloWorld-Content"
        }
    ]
};

// Create a pict application, which manages the views and their lifecycle
class HelloWorldApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		// Add our view
		this.pict.addView('HelloWorldMessageView', helloWorldViewOptions, libPictView);
		// Tell the application which view is the "main" viewport view (so it can automatically render it after initialization)
		this.options.MainViewportViewIdentifier = 'HelloWorldMessageView';
	}
}

module.exports = HelloWorldApplication;