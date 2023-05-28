const libFableServiceBase = require('fable').ServiceProviderBase;

const defaultPictSettings = (
	{
        Name: 'DefaultPictApplication',
        InitializeOnLoad: true,
		// The main "viewport" is the view that is used to host our application
		MainViewportView: 'Default-View',
        MainViewportRenderable: 'Application-Default-View-Renderable',
        MainViewportDestinationAddress: 'Application-Destination-Address',
        MainViewportDefaultDataAddress: '',
		// Whether or not we should automatically render the main viewport when appropriate
		AutoRenderMainViewportView: false,
        Manifests: {},
		// The prefix to prepend on all template destination hashes
		IdentifierAddressPrefix: 'PICT-'
	});

class PictApplication extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);
        this.options = this.fable.Utility.extend(defaultPictSettings, this.options);
        this.serviceType = 'PictApplication';

        this.AppData = this.fable.AppData;

        this.initializationFunctionSet = [];

        let tmpManifestKeys = Object.keys(this.options.Manifests);
        if (tmpManifestKeys.length > 0)
        {
            for (let i = 0; i < tmpManifestKeys.length; i++ )
            {
                // Load each manifest
                let tmpManifestKey = tmpManifestKeys[i];
                this.fable.serviceManager.instantiateServiceProvider('Manifest', this.options.Manifests[tmpManifestKey], tmpManifestKey);
            }
        }

        if (this.options.InitializeOnLoad)
        {
            return this.initialize();
        }
        if (this.options.AutoRenderMainViewportView)
        {
            this.log.info(`Pict Application ${this.options.Name}[${this.UUID}]::[${this.Hash}] beginning auto render of [${this.options.MainViewportView}::${this.options.MainViewportRenderable}].`);
            return this.renderAsync(this.options.MainViewportView, this.options.MainViewportRenderable, this.options.MainViewportDestinationAddress, this.options.MainViewportDefaultDataAddress, fStageComplete);
        }
	}

    internalInitialize()
    {
        return true;
    }

    initialize(fCallback)
    {
        this.log.info(`Pict Application ${this.options.Name}[${this.UUID}]::[${this.Hash}] beginning initialization...`);
        this.internalInitialize();
        this.log.info(`Pict Application ${this.options.Name}[${this.UUID}]::[${this.Hash}] initialization complete.`);
    }

    render(pViewHash, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress)
    {
        let tmpView = (typeof(pViewHash) === 'string') ? this.services.PictView[pViewHash] : false;
        if (!tmpView)
        {
            this.log.error(`PictApplication [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not render from View ${pViewHash} because it is not a valid view.`);
            return false;
        }


        return tmpView.render(pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress);
    }

    renderAsync(pViewHash, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback)
    {
        let tmpView = (typeof(pViewHash) === 'string') ? this.services.PictView[pViewHash] : false;
        if (!tmpView)
        {
            this.log.error(`PictApplication [${this.UUID}]::[${this.Hash}] ${this.options.Name} could not render from View ${pViewHash} because it is not a valid view.`);
            return false;
        }

        return tmpView.renderAsync(pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback);
    }
}

module.exports = PictApplication;