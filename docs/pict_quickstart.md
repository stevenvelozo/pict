# Pict Quickstart

You don't need much to use pict.

It works either in node via NPM or in a web browser via CDN/locally.  It even works quite well providing the engine for command-line applications or wrapped in your favorite native application wrapper.

## Node.js Usage Example

### Step 1: Install the pict Module

```shell
npm install pict
```

### Step 2: Import the Module to your Application and Initialize the Toolkit

```javascript
const libPict = require('pict');

const _Pict = new libPict( { Product: 'Quickstart-Example', ProductVersion: '1.2.3' } );
```

This will initialize a pict and prepare all the fable services available.  The object passed in becomes the `settings` property of pict.  So if you inspected `_Pict.settings.ProductVersion` it would be set to `1.2.3` in this case.  Settings are expected to be plain Javascript objects without loops or functions.  This configuration is technically used to initialize fable and includes things like logging init (which is what the Product string we set in the example is used for, primarily).

Note that you don't *have* to pass any config.  No object or an empty object works just fine... fable sets the application name to `ApplicationNameHere` and the version to `0.0.0` so it's apparent nothing has been configured.

### Step 3: Do Something

Now that we have our pict, we can do something with it.  Like log to the javascript console.

```javascript
_Pict.log.trace(`This is a quickstart example log message for the ${_Pict.settings.Product} pict instance.`);
```

Which in my case output the following to the console:

```
2025-06-23T19:14:04.881Z [trace] (Quickstart-Example): This is a quickstart example log message for the Quickstart-Example pict instance.
```

Okay your pict is up and running!  Full source for the minimum viable example here:

```javascript
const libPict = require('pict');

const _Pict = new libPict( { Product: 'Quickstart-Example', ProductVersion: '1.2.3' } );

_Pict.log.trace(`This is a quickstart example log message for the ${_Pict.settings.Product} pict instance.`);
```

Obviously this is a silly example, but, *you are reading a quickstart*.  Still, let's go on and do something a little more interesting, although our quickstart is technically "started"...

### Step 4: Add Some State to the AppData

Pict is meant to help juggle the connection between complexity, state and user interaction.  To that end, there is an empty object provided called `AppData` which is where the *Application Data* is meant to go.  Usually what the user is actively interacting with, the record what might get saved as output and/or any supporting data you think should be put here.

We are going to put a snippet of data from the unit test into AppData... the unit testing example data is mostly taken from [archive.org](https://www.archive.org/) and int this case it's about a children's cereal commercial from the 1960s for Frankenberry Count Chocula cereal.  Which is _spooky_.  Please note this data has been significantly trimmed from the original version of JSON, which is available in the `test/data/Data-Archive-org-Frankenberry.json` file in the pict repository.

```javascript
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
```

We are setting this data directly, which is a completely fine way to get state into AppData.  Although you might need to request data from an external API, which is also supported in a variety of ways with built-in tools or you can stuff it in there yourself.

### Step 5: Templating with AppData

The extensible templating engine built into pict uses what we refer to as *jellyfish templates* which look like this: `{~Data:Appdata.FrankenData.d0~}` which would resolve to `ia600202.us.archive.org`.  These template expressions work a lot like mustache templates or any other template parser you might expect -- the key difference is that they are built around *addressible data*.  They are called jellyfish templates because they look like jellyfish: `{~` ... and this shape was chosen so they could be used alongside other templating frameworks (for instance the aforementioned mustache templates).

For example we could show a log message telling us which "dir" the data is in:

```javascript
const tmpUserDirMessage = _Pict.parseTemplate(`The dir for our FrankenData is: {~Data:AppData.FrankenData.dir~}`);

_Pict.log.info(tmpUserDirMessage);
```

This constructs a string, and logs it out.  The jellyfish template expressions almost all have shorthand versions -- the template expressions `{~Data:AppData.FrankenData.dir~}` and `{~D:AppData.FrankenData.dir~}` are the same.

The output for me in this case is:

```
2025-06-23T19:14:04.884Z [info] (Quickstart-Example): The dir for our FrankenData is: /7/items/FrankenberryCountChoculaTevevisionCommercial1971
```

## More Advanced Topics

So far we have initialized pict, done a little logging and put a bit of state into AppData.  The full code for this example with comments:

```javascript
// Include the pict module
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
```
