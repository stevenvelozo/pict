// Include pict
const libPict = require('pict');

// Initialize an instance of pict
const _Pict = new libPict( { Product: 'Quickstart-Example', ProductVersion: '1.2.3' } );

// Log something trivial out
_Pict.log.trace(`This is a quickstart example log message for the ${_Pict.settings.Product} pict instance.`);

// "Load" some data into AppData
_Pict.AppData.FrankenData = {
    "created": 1664830085,
    "d0": "ia600202.us.archive.org",
    "d1": "ia600202.us.archive.org",
    "d2": "ia800202.us.archive.org",
    "dir": "/7/items/FrankenberryCountChoculaTevevisionCommercial1971",
    "item_size": 36431778,
    "metadata": {
        "identifier": "FrankenberryCountChoculaTevevisionCommercial1971",
        "title": "Franken Berry / Count Chocula : Tevevision Commercial 1971",
        "creator": "General Mills",
        "mediatype": "movies",
        "collection": [
            "classic_tv_commercials",
            "television"
        ],
        "description": "Count Chocula and Franken Berry were both introduced in 1971. Boo Berry Cereal appeared in 1973 followed by Fruit Brute in 1974. Yummy Mummy appeared more than a decade later in 1988 - completing the the group known as the General Mills Monster Cereals.",
        "subject": "Third Eye Cinema; Classic Television Commercials; animation; cartoons;General Mills",
        "licenseurl": "http://creativecommons.org/publicdomain/mark/1.0/",
        "backup_location": "ia903608_22",
        "ia_orig__runtime": "31 seconds"
    }
};

// Use a template to construct a string leveraging state from AppData
const tmpUserDirMessage = _Pict.parseTemplate(`The dir for our FrankenData is: {~Data:AppData.FrankenData.dir~}`);

// Log out the user message to the info log channel
_Pict.log.info(tmpUserDirMessage);
