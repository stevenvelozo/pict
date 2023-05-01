const libReadline = require('readline');

/********************************************************************
 * Stolen from Informary for basic management of values in the config
 */
const getValueAtAddress = (pObject, pAddress) =>
{
    // Make sure pObject is an object
    if (!typeof(pObject) === 'object') return false;
    // Make sure pAddress is a string
    if (!typeof(pAddress) === 'string') return false;

    let tmpSeparatorIndex = pAddress.indexOf('.');

    if (tmpSeparatorIndex === -1)
    {
        // Now is the time to return the value in the address
        return pObject[pAddress];
    }
    else
    {
        let tmpSubObjectName = pAddress.substring(0, tmpSeparatorIndex);
        let tmpNewAddress = pAddress.substring(tmpSeparatorIndex+1);

        // If there is an object property already named for the sub object, but it isn't an object
        // then the system can't set the value in there.  Error and abort!
        if (pObject.hasOwnProperty(tmpSubObjectName) && typeof(pObject[tmpSubObjectName]) !== 'object')
        {
            return false;
        }
        else if (pObject.hasOwnProperty(tmpSubObjectName))
        {
            // If there is already a subobject pass that to the recursive thingy
            return getValueAtAddress(pObject[tmpSubObjectName], tmpNewAddress);
        }
        else
        {
            // Create a subobject and then pass that
            pObject[tmpSubObjectName] = {};
            return getValueAtAddress(pObject[tmpSubObjectName], tmpNewAddress);
        }
    }
};

const setValueAtAddress = (pObject, pAddress, pValue) =>
{
    // Make sure pObject is an object
    if (!typeof(pObject) === 'object') return false;
    // Make sure pAddress is a string
    if (!typeof(pAddress) === 'string') return false;

    let tmpSeparatorIndex = pAddress.indexOf('.');

    if (tmpSeparatorIndex === -1)
    {
        // Now is the time to set the value in the object
        pObject[pAddress] = pValue;
        return true;
    }
    else
    {
        let tmpSubObjectName = pAddress.substring(0, tmpSeparatorIndex);
        let tmpNewAddress = pAddress.substring(tmpSeparatorIndex+1);

        // If there is an object property already named for the sub object, but it isn't an object
        // then the system can't set the value in there.  Error and abort!
        if (pObject.hasOwnProperty(tmpSubObjectName) && typeof(pObject[tmpSubObjectName]) !== 'object')
        {
            if (!pObject.hasOwnProperty('__ERROR'))
                pObject['__ERROR'] = {};
            // Put it in an error object so data isn't lost
            pObject['__ERROR'][pAddress] = pValue;
            return false;
        }
        else if (pObject.hasOwnProperty(tmpSubObjectName))
        {
            // If there is already a subobject pass that to the recursive thingy
            return setValueAtAddress(pObject[tmpSubObjectName], tmpNewAddress, pValue);
        }
        else
        {
            // Create a subobject and then pass that
            pObject[tmpSubObjectName] = {};
            return setValueAtAddress(pObject[tmpSubObjectName], tmpNewAddress, pValue);
        }
    }
};
/*
 * End of Informary-stolen code
 *******************************************************************/


const tmpConsoleInteraction = libReadline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    });

tmpConsoleInteraction.question(
    'What do you think of Luxury? ',
    (pResponse) =>
    {
        console.log(`--> You should think about why you think Luxury is [${pResponse}]`);
        tmpConsoleInteraction.close();
    });