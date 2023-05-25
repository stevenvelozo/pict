const libFableServiceBase = require('fable').ServiceProviderBase;

class PictView extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);
        this.serviceType = 'PictView';

        this.defaultDestinationAddress = this.fable
	}

    renderContent(pContent, pAddress)
    {
        return this.fable.ContentAssignment.contentPushFunction(pContent, pAddress);
    }
}

module.exports = PictView;