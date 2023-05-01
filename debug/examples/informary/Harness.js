let libInformary = require('../source/Informary.js');

let tmpInformary = new libInformary();

console.log(`Default nonFormData: ${JSON.stringify(tmpInformary.nonFormData)}`);

tmpInformary.nonFormData.d = 4;

console.log(`Some set value in nonFormData: ${JSON.stringify(tmpInformary.nonFormData)}`);

let tmpTestObject = ( { a: 1, b: 2, c: 3 } );

tmpInformary.nonFormData = tmpTestObject;

console.log(`Assigning the object outright shouldn't work: ${JSON.stringify(tmpInformary.nonFormData)}`);

tmpInformary.nonFormData.OtherValues = tmpTestObject;

console.log(`Assigning a property should work: ${JSON.stringify(tmpInformary.nonFormData)}`);
