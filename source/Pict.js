/**
* @author <steven@velozo.com>
*/
const libFable = require('fable');

// Pict Services
const libPictTemplateProvider = require('./Pict-Template-Provider.js');

// External Library Services
const libFableServiceManyfest = require('./Pict-Fable-Service-Manyfest.js');
//const libFableServiceElucidator = require('./Pict-Fable-Service-Elucidator.js');
//const libFableServiceInformary = require('./Pict-Fable-Service-Informary.js');

const libMouseTrap = require('mousetrap');

class Pict extends libFable
{
	constructor(pSettings)
	{
		super(pSettings);

		// The templateProvider provides a basic key->template mapping with default fallback capabilities
		this.serviceManager.addAndInstantiateServiceType('TemplateProvider', libPictTemplateProvider);
		this.serviceManager.addAndInstantiateServiceType('Manifest', libFableServiceManyfest);
		//this.serviceManager.addServiceType('Solver', libFableServiceElucidator);
		//this.serviceManager.addServiceType('Informary', libFableServiceInformary);


		this._DefaultTemplateMethodsInitialized = false;
		this.serviceManager.instantiateServiceProvider('MetaTemplate');

		this.manifest = this.defaultServices.Manifest.manifest;
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
			this.defaultServices.MetaTemplate.addPattern('{~Data:', '~}',
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

			this.defaultServices.MetaTemplate.addPattern('{~Dollars:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.defaultServices.DataFormat.formatterDollars(tmpColumnData);

					return tmpValue;
				});

			this.defaultServices.MetaTemplate.addPattern('{~Digits:', '~}',
				(pHash, pData)=>
				{
					let tmpHash = pHash.trim();
					let tmpColumnData = this.manifest.getValueAtAddress({AppData: this.appData, Record: pData}, tmpHash);

					let tmpValue = this.defaultServices.DataFormat.formatterAddCommasToNumber(this.defaultServices.DataFormat.formatterRoundNumber(tmpColumnData, 2));

					return tmpValue;
				});

			this.defaultServices.MetaTemplate.addPattern('{~NotEmpty:', '~}',
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
		return this.defaultServices.MetaTemplate.parseString(pTemplateString, pData);
	}

	parseTemplateByHash (pTemplateHash, pData)
	{
		let tmpTemplateString = this.defaultServices.TemplateProvider.getTemplate(pTemplateHash);

		// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
		if (!tmpTemplateString)
		{
			return '';
		}
		return this.parseTemplate(tmpTemplateString, pData);
	}
};

module.exports = Pict;