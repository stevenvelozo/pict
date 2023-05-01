const libFableServiceBase = require('fable').ServiceProviderBase;

const libElucidator = require('elucidator');

class FableServiceElucidator extends libFableServiceBase
{
	constructor(pFable, pOptions, pServiceHash)
	{
        super(pFable, pOptions, pServiceHash);

        this.serviceType = 'Solver';

        this.solver = new libElucidator(this.options);
	}
}

module.exports = FableServiceElucidator;