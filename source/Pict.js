/**
* @license MIT
* @author <steven@velozo.com>
*/
const libFable = require('fable');

const libFableServiceManyfest = require('./Pict-Fable-Service-Manyfest.js');
const libFableServiceElucidator = require('./Pict-Fable-Service-Elucidator.js');
const libFableServiceInformary = require('./Pict-Fable-Service-Informary.js');

const libMouseTrap = require('mousetrap');

class Pict
{
	constructor(pOptions)
	{
		this.fable = new libFable(pOptions);

		this.log = this.fable.log;
		this.settings = this.fable.settings;

		this.serviceManager = this.fable.serviceManager;

		this.fable.serviceManager.addServiceType('Manifest', libFableServiceManyfest);
		this.fable.serviceManager.addServiceType('Solver', libFableServiceElucidator);
		this.fable.serviceManager.addServiceType('Informary', libFableServiceInformary);

		// Register the services
		this.defaultTemplateProcessor = this.fable.serviceManager.instantiateServiceProvider('MetaTemplate', {}, 'defaultTemplateProcessor');
		this._DefaultTemplateMethodsInitialized = false;

		this.manifestServiceProvider = this.fable.serviceManager.instantiateServiceProvider('Manifest', {}, 'defaultManifest');
		this.manifest = this.manifestServiceProvider.manifest;

		this._TemplateContainer = {};

		this.appData = {};
	}

	initializeTemplateMethods(fExtraTemplateMethods)
	{
		/*
		 *
		 * To stave off madness, these are inefficient for now.  The wkhtmltopdf renderer leaves much to be desired
		 * in the way of feedback with regards to javascript compatibility.
		 *
		 */
		if (!this._DefaultTemplateMethodsInitialized)
		{
			this.defaultTemplateProcessor.addPattern('{~Data:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpValue = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					if ((tmpValue == null) || (tmpValue == 'undefined') || (typeof(tmpValue) == 'undefined'))
					{
						//console.log('undefined!');
						return '';
					}
					return tmpValue;
				});

			this.defaultTemplateProcessor.addPattern('{~Dollars:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.fable.DataArithmatic.formatterDollars(tmpColumnData);

					return tmpValue;
				});

			this.defaultTemplateProcessor.addPattern('{~Digits:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.fable.DataArithmatic.formatterAddCommasToNumber(this.fable.DataArithmatic.formatterRoundNumber(tmpColumnData, 2));

					return tmpValue;
				});

			this.defaultTemplateProcessor.addPattern('{~NotEmpty:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpHashParts = tmpHash.split('|');

					if (tmpHashParts.length != 2)
					{
						return '';
					}

					let tmpTruthiness = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHashParts[0]);

					let tmpValue = '';

					// For now just check truthiness
					if (tmpTruthiness)
					{
						tmpValue = tmpHashParts[1];
					}

					return tmpValue;
				});

			this._DefaultTemplateMethodsInitialized = true;
		}
	}

	parseTemplate (pTemplateString, pData)
	{
		return this.defaultTemplateProcessor.parseString(pTemplateString, pData);
	}
};

module.exports = Pict;