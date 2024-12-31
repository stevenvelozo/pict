// This assumes Pict has been required in the browser. Delcare these as globals so linter can do its job.
/* global Pict, _Pict: writeable */

/**
 * Simple function to load a pict Application
 *
 * @param {import('pict-application')} [pPictApplication] - The pict application to load.
 * @param {number} [pLogNoisiness] - The log noisiness level.
 */
module.exports = function (pPictApplication, pLogNoisiness)
{
	let tmpLogNoisiness = (typeof(pLogNoisiness) == 'undefined') ? 0 : pLogNoisiness;

	// Set up a basal pict on the window object
	if (pPictApplication && ('default_configuration' in pPictApplication) && ('pict_configuration' in pPictApplication.default_configuration))
	{
		window._Pict = new Pict(pPictApplication.default_configuration.pict_configuration);
	}
	else
	{
		window._Pict = new Pict();
	}

	window._Pict.LogNoisiness = tmpLogNoisiness;

	let tmpApplicationHash = 'DefaultApplication';
	let tmpDefaultConfiguration = {};

	if ('default_configuration' in pPictApplication)
	{
		tmpDefaultConfiguration = pPictApplication.default_configuration;

		if ('Hash' in pPictApplication.default_configuration)
		{
			tmpDefaultConfiguration = pPictApplication.default_configuration;
			tmpApplicationHash = pPictApplication.default_configuration.Hash;
		}
	}
	_Pict.log.info(`Loading the pict application [${tmpApplicationHash}] and associated views.`);

	_Pict.addApplication(tmpApplicationHash, tmpDefaultConfiguration, pPictApplication);

	_Pict.PictApplication.initializeAsync(
		function (pError)
		{
			if (pError)
			{
				console.log('Error initializing the pict application: '+pError)
			}
			_Pict.log.info('Loading the Application and associated views.');
		});
}
