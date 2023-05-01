const libFableServiceBase = require('fable').ServiceProviderBase;

const libInformary = require('informary');

class FableServiceInformary extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
                super(pFable, pOptions, pServiceHash);

                this.serviceType = 'Informary';

                this.informary = new libInformary(this.options.Settings, this.options.Context, this.options.ContextGUID);
	}
}

module.exports = FableServiceInformary;