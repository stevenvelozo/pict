const libFableServiceBase = require('fable').ServiceProviderBase;

const libManyfest = require('manyfest');

class FableServiceManyfest extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'Manifest';

        this.manyfest = false;

        if (JSON.stringify(this.options) != '{}')
        {
            this.manyfest = new libManyfest(this.options);
        }
        else
        {
            this.manyfest = new libManyfest();
        }

        // Kinda the same thing, yo
        this.manifest = this.manyfest;
	}
}

module.exports = FableServiceManyfest;