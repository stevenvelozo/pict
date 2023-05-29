const libFableServiceBase = require('fable').ServiceProviderBase;

const defaultPictViewSettings = (
	{
		DefaultRenderable: false,
		DefaultDestinationAddress: false,
		DefaultTemplateRecordAddress: false,

		ViewIdentifier: 'DEFAULT',

		InitializeOnLoad: true,
		RenderOnLoad: false,

		Templates: [],

		DefaultTemplates: [],

		Renderables: [],

		Manifests: {}
	});

class PictView extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
		this.options = this.fable.Utility.extend(defaultPictViewSettings, this.options);
		this.serviceType = 'PictView';

		// Wire in the essential Pict service
		this.AppData = this.fable.AppData;

		// Load all templates from the array in the options
		// Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
		for (let i = 0; i < this.options.Templates.length; i++)
		{
			let tmpTemplate = this.options.Templates[i];

			if (!tmpTemplate.hasOwnProperty('Hash') || !tmpTemplate.hasOwnProperty('Template'))
			{
				this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Template ${i} in the options array.`, tmpTemplate);
			}
			else
			{
				if (!tmpTemplate.Source)
				{
					tmpTemplate.Source = `PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} options object.`;
				}
				this.fable.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
			}
		}

		// Load all default templates from the array in the options
		// Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
		for (let i = 0; i < this.options.DefaultTemplates.length; i++)
		{
			let tmpDefaultTemplate = this.options.DefaultTemplates[i];

			if (!tmpDefaultTemplate.hasOwnProperty('Postfix') || !tmpDefaultTemplate.hasOwnProperty('Template'))
			{
				this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Default Template ${i} in the options array.`, tmpDefaultTemplate);
			}
			else
			{
				if (!tmpDefaultTemplate.Source)
				{
					tmpDefaultTemplate.Source = `PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} options object.`;
				}
				this.fable.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
			}
		}

		// Load all renderables
		// Renderables are launchable renderable instructions with templates
		// They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
		// The only parts that are necessary are Identifier and Template
		// A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
		this.renderables = {};
		for (let i = 0; i < this.options.Renderables.length; i++)
		{
			let tmpRenderable = this.options.Renderables[i];

			if (!tmpRenderable.hasOwnProperty('RenderableHash') || !tmpRenderable.hasOwnProperty('TemplateHash'))
			{
				this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not load Renderable ${i} in the options array.`, tmpRenderable);
			}
			else
			{
				this.renderables[tmpRenderable.RenderableHash] = tmpRenderable;
			}
		}

		if (this.options.InitializeOnLoad)
		{
			this.initialize();
		}
		if (this.options.RenderOnLoad)
		{
			this.render(this.options.DefaultRenderable, this.options.DefaultDestinationAddress, this.options.DefaultTemplateRecordAddress);
			this.postInitialRenderInitialize();
		}
	}

	internalInitialize()
	{
		return true;
	}

	postInitialRenderInitialize()
	{
		return true;
	}

	initialize()
	{
		this.log.info(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} beginning initialization...`);
		this.internalInitialize();
		this.log.info(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} initialization complete.`);
	}

	render(pRenderable, pRenderDestinationAddress, pTemplateDataAddress)
	{
		let tmpRenderableHash = (typeof (pRenderable) === 'string') ? pRenderable :
			(typeof (this.options.DefaultRenderable) == 'string') ? this.options.DefaultRenderable : false;
		if (!tmpRenderableHash)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it is not a valid renderable.`);
			return false;
		}

		let tmpRenderable = this.renderables[tmpRenderableHash];

		if (!tmpRenderable)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it does not exist.`);
			return false;
		}

		let tmpRenderDestinationAddress = (typeof (pRenderDestinationAddress) === 'string') ? pRenderDestinationAddress :
			(typeof (tmpRenderable.ContentDestinationAddress) === 'string') ? tmpRenderable.ContentDestinationAddress :
				(typeof (this.options.DefaultDestinationAddress) === 'string') ? this.options.DefaultDestinationAddress : false;

		if (!tmpRenderDestinationAddress)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it does not have a valid destination address.`);
			return false;
		}

		let tmpDataAddress = (typeof (pTemplateDataAddress) === 'string') ? pTemplateDataAddress :
			(typeof (tmpRenderable.RecordAddress) === 'string') ? tmpRenderable.RecordAddress :
				(typeof (this.options.DefaultTemplateRecordAddress) === 'string') ? this.options.DefaultTemplateRecordAddress : false;

		let tmpData = (typeof (tmpDataAddress) === 'string') ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
		let tmpContent = this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData)
		return this.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, tmpContent);
	}

	renderAsync(pRenderable, pRenderDestinationAddress, pTemplateDataAddress, fCallback)
	{
		let tmpRenderableHash = (typeof (pRenderable) === 'string') ? pRenderable : false;
		if (!tmpRenderableHash)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not asynchronously render ${tmpRenderableHash} (param ${pRenderable}because it is not a valid renderable.`);
			return fCallback(Error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not asynchronously render ${tmpRenderableHash} (param ${pRenderable}because it is not a valid renderable.`));
		}

		let tmpRenderable = this.renderables[tmpRenderableHash];

		if (!tmpRenderable)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it does not exist.`);
			return fCallback(Error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it does not exist.`));
		}

		let tmpRenderDestinationAddress = (typeof (pRenderDestinationAddress) === 'string') ? pRenderDestinationAddress :
			(typeof (tmpRenderable.ContentDestinationAddress) === 'string') ? tmpRenderable.ContentDestinationAddress :
				(typeof (this.options.DefaultDestinationAddress) === 'string') ? this.options.DefaultDestinationAddress : false;

		if (!tmpRenderDestinationAddress)
		{
			this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render ${tmpRenderableHash} (param ${pRenderable}) because it does not have a valid destination address.`);
			return fCallback(Error(`Could not render ${tmpRenderableHash}`));
		}

		let tmpDataAddress = (typeof (pTemplateDataAddress) === 'string') ? pTemplateDataAddress :
			(typeof (tmpRenderable.RecordAddress) === 'string') ? tmpRenderable.RecordAddress :
				(typeof (this.options.DefaultTemplateRecordAddress) === 'string') ? this.options.DefaultTemplateRecordAddress : false;

		let tmpData = (typeof (tmpDataAddress) === 'string') ? this.fable.DataProvider.getDataByAddress(tmpDataAddress) : undefined;
		this.fable.parseTemplateByHash(tmpRenderable.TemplateHash, tmpData,
			(pError, pContent) =>
			{
				if (pError)
				{
					this.log.error(`PictView [${this.UUID}]::[${this.Hash}] ${this.options.ViewIdentifier} could not render (asynchronously) ${tmpRenderableHash} (param ${pRenderable}) because it did not parse the template.`, pError);
					return fCallback(pError);
				}
				this.fable.ContentAssignment.assignContent(tmpRenderDestinationAddress, pContent);
				return fCallback(null, pContent);
			});
	}
}

module.exports = PictView;