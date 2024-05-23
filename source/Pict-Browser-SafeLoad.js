// Simple function to load a pict Application
module.exports = function (pPictApplication, pLogNoisiness)
{
	let tmpLogNoisiness = (typeof(pLogNoisiness) == 'undefined') ? 0 : pLogNoisiness;

	// Set up a basal pict on the window object
	if (pPictApplication && pPictApplication.hasOwnProperty('default_configuration') && pPictApplication.default_configuration.hasOwnProperty('pict_configuration'))
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

	if (pPictApplication.hasOwnProperty('default_configuration'))
	{
		tmpDefaultConfiguration = pPictApplication.default_configuration;

		if (pPictApplication.default_configuration.hasOwnProperty('Hash'))
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