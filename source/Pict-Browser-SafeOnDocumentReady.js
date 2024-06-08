
/**
 * Provide a safe on document ready function (without needing a framework like jquery)
 *
 * @param {function} fCallback - The function to call when the document is ready
 */
module.exports = function (fCallback)
{
	if (!document)
	{
		console.log('No document object found; no initialization happening.');
		return;
	}
	// In case the document is already rendered
	if (document.readyState!='loading') fCallback();
	// Modern browsers have event listener capabilities
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', fCallback);
	// IE <= 8 and ... other abominations
	else document.attachEvent('onreadystatechange', function() { if (document.readyState=='complete') fCallback(); });
}
