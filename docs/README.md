# Pict

Welcome to the pict documentation!

Pict is a non-opinionated suite of tools meant to provide the disparate parts of Model, View and Controller patterns for web, console and other applications.  The technology was designed to not require development to be "fully bought in on a framework" to use.

## Ultra Quickstart

Here is a minimum viable quickstart from the documentation:

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

Obviously this is a silly example, but, *you are reading a quickstart*.  See more in the quickstart here...
