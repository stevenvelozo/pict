# A Simple Hello World Application in Pict

This is part of the pict documentation, and provides a configuration-only
content view.

## The Javascript Source Code

The code below loads an extremely simple view that displays a hello world
message in a div.

```javascript
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

		// Tell the application which view is the main viewport view
		this.options.MainViewportViewIdentifier = 'HelloWorldMessageView';
	}
}

module.exports = HelloWorldApplication;
```

## The HTML Shell

The pict application is initialized and presents itself in the
`#Application-Container` div.  This is the only part of the DOM the pict
application touches.

```html
<!doctype html>
<html lang="en">
	<head>
		<title>Hello World</title>
		<style id="PICT-CSS"></style>
		<script src="../../../dependencies/pict.min.js" type="text/javascript"></script>
		<script type="text/javascript">Pict.safeOnDocumentReady(() => { Pict.safeLoadPictApplication(HelloWorld, 0)});</script>
	</head>
	<body>
		<div id="Application-Container"></div>
		<script src="./hello_world.min.js" type="text/javascript"></script>
	</body>
</html>
```

## Building the Application

This application uses `gulp` to build and minify itself.  There is a wrapping
packaging tool called `quackage` that deals with things like uglification and
browser compatibility.  The configuration for this is all available here.

To build this app, make sure to install the dependencies in the root of the
pict repository and run `npx quack build` to generate the `hello_world.min.js`
that is included by the `index.html`.

You can then open `index.html` with a browser directly from the filesystem, or,
serve it up from a web server however you prefer.

*Please note the dependency `pict.min.js` is shared across all examples, so if
you use this from outside the pict repository, you may need to copy it to a
different location and alter the html reference.

## Step-by-Step Running Locally

### Step 1: Check Out the pict Repository

```shell
git clone https://github.com/stevenvelozo/pict
```

### Step 2: Navigate to the 