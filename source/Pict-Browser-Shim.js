/**
* Pict browser shim loader
* @license MIT
* @author <steven@velozo.com>
*/

// Load the pict module into the browser global automatically.
const libPict = require('./Pict.js');

if (typeof(window) === 'object')
{
    window.Pict = libPict;
}

module.exports = libPict;