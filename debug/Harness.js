console.log(`--> Launching pict debug harness...`);

let libPict = require('../source/Pict.js');

console.log(`--> Instantiating pict...`);

let tmpPict = new libPict({"Nombre":"Numero uno hombre."});

tmpPict.log.info(`Pict initialized ... Nombre [${tmpPict.settings.Nombre}]`);

let tmpManyfest = tmpPict.serviceManager.instantiateServiceProviderWithoutRegistration('Manifest');

console.log(`--> Instantiated manyfest getting [${tmpManyfest.manyfest.getValueAtAddress(tmpPict.settings, 'Nombre')}]`);