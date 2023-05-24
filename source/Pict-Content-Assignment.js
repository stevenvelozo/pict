const libFableServiceBase = require('fable').ServiceProviderBase;

class PictContentAssignment extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'PictContentAssignment';

        // This function can be overloaded to push content to addressible locations.
        // That is all this provider does.
        this.contentPushFunction = (pContent, pAddress) => { return false; };
	}

    pushContent(pContent, pAddress)
    {
        return this.contentPushFunction(pContent, pAddress);
    }
}

module.exports = PictContentAssignment;