console.log(`--> Launching pict debug harness...`);

let libPict = require('../dist/pict.compatible.js');

console.log(`--> Instantiating pict...`);

let tmpPict = new libPict({"Nombre":"Numero uno hombre."});
tmpPict.initializeTemplateMethods();

tmpPict.log.info(`Pict initialized ... Nombre [${tmpPict.settings.Nombre}]`);


let tmpTemplateOutput2 = tmpPict.parseTemplate(`
<td>{~Data:Record.worktype_String~}</td>
<td align="center">{~Data:Record.itemnumber~}</td>
<td width="45%">{~Data:Record.description~}</td>
<td align="left">{~Data:Record.units~}</td>
<td align="right">{~Dollars:Record.costperunit~}</td>
<td align="right">{~Digits:Record.quantity~}</td>
<td align="right">{~Dollars:Record.amount~}</td>
`, {
    "addressprefix": "MaterialsOnHand.UUID1",
    "idrecord": 1,
    "description": "Stockpile Qty Obs - January 25",
    "quantity": 2593.78,
    "units": "LNFT",
    "costperunit": "0.0",
    "worktype": 310381,
    "worktype_String": "0032 Horizontal Directional Drill (Carrier Conduit)",
    "worktype_StringAbbreviated": "0032",
    "worktype_PayItems": "TS-728-37007",
    "itemnumber": "TS-728-37007"
});

tmpPict.log.info('...Done: '+tmpTemplateOutput2);