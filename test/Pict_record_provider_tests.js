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

const _Data_BreakfastCerealSearch = require('./data/Data-Archive-org-BreakfastCerealSearch.json');

const _MockSettings = (
{
	Product: 'MockPict',
	ProductVersion: '1.0.0',
});

const _FileEntityManifest = (
{
	"Scope": "File",

	"Projections":
	[
		{
			"Projection": "FileEntity",
			"Fields":
			{
				"GUIDFile": "{~D:Record.fields"
			}
		}
	],
	"Descriptors":
	{
		"fields.identifier":
		{
			"Hash": "file_identifier",
			"Type": "String",
			"Description": "The unique identifier for the file.",
		},
		"fields.title":
		{
			"Hash": "file_title",
			"Type": "String",
			"Description": "The title of the file.",
		},
		"fields.description":
		{
			"Hash": "file_description",
			"Type": "String",
			"Description": "A description of the file.",
		},
		"fields.mediatype":
		{
			"Hash": "file_mediatype",
			"Type": "String",
			"Description": "The media type of the file.",
		},
		"fields.licenseurl":
		{
			"Hash": "file_licenseurl",
			"Type": "String",
			"Description": "The URL of the license for the file.",
		},
		"fields.downloads":
		{
			"Hash": "file_download_count",
			"Type": "Number",
			"Description": "The number of times the file has been downloaded.",
		},
	}
});

suite(
	'Pict Record Provider Tests',
	() =>
	{
		setup (() => {});

		suite(
			'Project the Files into File Entity Records',
			() =>
			{
				test(
					'Test priority, and, assignment.',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						
						fDone();
					}
				);
			}
		);
	}
);
