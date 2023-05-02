const libFableServiceBase = require('fable').ServiceProviderBase;

const libManyfest = require('manyfest');

class FableServiceManyfest extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'Manifest';

        if (JSON.stringify(this.options) == '{}')
        {
            this.options = { Scope:'PictDefault', Descriptors: {} };
        }

        this.manyfest = new libManyfest(this.options);
        // Kinda the same thing, yo
        this.manifest = this.manyfest;
	}
}

module.exports = FableServiceManyfest;