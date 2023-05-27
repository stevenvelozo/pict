/**
* Unit tests for Pict
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const Chai = require("chai");
const Expect = Chai.expect;

const libPict = require('../source/Pict.js');

// Outside and inside the docker container, the port is different.
//const _RetoldTestPort = 60086;
const _RetoldTestPort = 8086;

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',

	PictDefaultURLPrefix: `http://localhost:${_RetoldTestPort}/1.0/`
});

suite
(
	'Pict Application Tests',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Simple Application',
			function()
			{
				test
				(
					'Basic application containing a view with a list.',
					function(fDone)
					{
						var testPict = new libPict(_MockSettings);

                        // Now initialize the views
                        let tmpView = testPict.addView(
                            {
                                ViewIdentifier: "Example",
                                RenderOnLoad: false,

                                DefaultRenderable:"ExampleView-Print",
                                DefaultDestinationAddress:"#Example-Print-Container",

                                Templates: [
                                    {
                                        Hash: "ExampleView-Print-Box",
                                        Template: /*html*/`<div><h1>Example!</h1{~TemplateSet:ExampleView-Print-Row:AppData.ExampleData~}</div>`
                                    },
                                    {
                                        Hash: "ExampleView-Print-Row",
                                        Template: /*html*/`<ul>{~Data:Record.Name~}</ul>`
                                    }
                                ],
                                Renderables:[
                                    {
                                        RenderableHash: "ExampleView-Print",
                                        TemplateHash: "ExampleView-Print-Box",
                                        DestinationAddress: "#ExampleView-Print-Container"
                                    }
                                ]
                            }, 'ExampleView');

                        testPict.AppData.ExampleData = [ { Name: 'One' }, { Name: 'Two' }, { Name: 'Three' } ];

                        testPict.serviceManager.instantiateServiceProvider('PictApplication',
                            {
                                MainViewportView: 'ExampleView',
                                MainViewportRenderable: 'ExampleView-Print',
                                MainViewportDefaultDataAddress: 'ExampleData',
                                AutoRenderMainViewportView: true
                            });

						return fDone();
					}
				);
			}
		);
	}
);