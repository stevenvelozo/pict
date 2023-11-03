/**
* Pict browser shim loader with Object statefulness for the environement
* @author <steven@velozo.com>
*
* This was born after writing about 10 views and copying basically the same
* mock environment read/write functions into the test harnesses.  It allows
* mocks or other types of communications back-and-forth to be configured
* as an environment for views and applications.
*
* To use this:
*
* 1. Construct a pict object in your favorite fashion:
*        let _Pict = new libPict({...Environment})
* 2. Require this; it's exported as a static subobject of the pict library,
*    so you can do:
*        const libPictEnvironmentLog = require('pict').EnvironmentLog;
* 3. Create an object that is your custom read data.  Any key that is requested
*    but missing will return empty.
*        const tmpContentMap = { '#SomeElement': 'SomeValue' };
* 4. Pass your pict through this to get the custom functions mapped into the ContentAssignment service:
*        let tmpMockEnvironment = new libPictEnvironmentLog(_Pict, tmpContentMap);
* 5. Now you can use your pict as normal, and it will log all of the read/write events out and keep a log of when they occurred.
*/

class PictEnvironmentObject
{
	constructor(pPict, pContentMap)
	{
		this.contentMap = (typeof(pContentMap) == 'object') ? pContentMap : {};

		this.contentMap._ATTRIBUTE_MAP = {};
		this.contentMap._CLASS_LIST = [];

		this.pict = pPict;

		// If this is set to false, we won't keep an array-based log of every read, assignment, append or get.
		this.truncateContentLength = 256;
		this.storeEventLog = true;
		// Where to store each event type
		this.eventLog = {};
		this.eventLog.GetElement = [];
		this.eventLog.Read = [];
		this.eventLog.Prepend = [];
		this.eventLog.Append = [];
		this.eventLog.Assign = [];
		this.eventLog.ReadAttribute = [];
		this.eventLog.SetAttribute = [];
		this.eventLog.RemoveAttribute = [];
		this.eventLog.ReadClass = [];
		this.eventLog.SetClass = [];
		this.eventLog.RemoveClass = [];

		this.pict.ContentAssignment.customGetElementFunction = this.customGetElementFunction.bind(this);
		this.pict.ContentAssignment.customReadFunction = this.customReadFunction.bind(this);
		this.pict.ContentAssignment.customAppendFunction = this.customAppendFunction.bind(this);
		this.pict.ContentAssignment.customPrependFunction = this.customPrependFunction.bind(this)
		this.pict.ContentAssignment.customAssignFunction = this.customAssignFunction.bind(this);
		this.pict.ContentAssignment.customReadAttributeFunction = this.customReadAttributeFunction.bind(this);
		this.pict.ContentAssignment.customSetAttributeFunction = this.customSetAttributeFunction.bind(this);
		this.pict.ContentAssignment.customRemoveAttributeFunction = this.customRemoveAttributeFunction.bind(this);
		this.pict.ContentAssignment.customReadClassFunction = this.customReadClassFunction.bind(this);
		this.pict.ContentAssignment.customSetClassFunction = this.customSetClassFunction.bind(this);
		this.pict.ContentAssignment.customRemoveClassFunction = this.customRemoveClassFunction.bind(this);
	}

	createEventLogEntry(pAddress, pContent)
	{
		let tmpContent = (typeof(pContent) == 'undefined') ? '' : pContent;
		return (
			{
				TimeStamp:this.pict.log.getTimeStamp(),
				Hash: pAddress,
				Content: tmpContent
			});
	}

	customGetElementFunction (pAddress)
	{
		if (this.storeEventLog) this.eventLog.GetElement.push(this.createEventLogEntry(pAddress));
		this.pict.log.info(`Mocking an GET of Address -> [${pAddress}]`);
		return '';
	}

	customReadFunction (pAddress)
	{
		if (this.storeEventLog) this.eventLog.Read.push(this.createEventLogEntry(pAddress));
		this.pict.log.info(`Mocking an READ from Address -> [${pAddress}]`);
		if (this.contentMap.hasOwnProperty(pAddress))
		{
			// The data is in the content map!
			return this.contentMap[pAddress];
		}
		this.pict.log.warn(`Mock read from Address ${pAddress} did not find a value in the content map.`);
		return '';
	}

	customAppendFunction (pAddress, pContent)
	{
		this.contentMap[pAddress] = (typeof(this.contentMap[pAddress]) == 'undefined') ? pContent : this.contentMap[pAddress] + pContent;

		if (this.storeEventLog) this.eventLog.Append.push(this.createEventLogEntry(pAddress, pContent));

		if (pContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an APPEND to Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: pContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an APPEND to Address -> [${pAddress}]`, {Content: pContent});
		}
		return '';
	}
	customPrependFunction (pAddress, pContent)
	{
		this.contentMap[pAddress] = (typeof(this.contentMap[pAddress]) == 'undefined') ? pContent : pContent + this.contentMap[pAddress];

		if (this.storeEventLog) this.eventLog.Prepend.push(this.createEventLogEntry(pAddress, pContent));
		if (pContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an PREPEND to Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: pContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an PREPEND to Address -> [${pAddress}]`, {Content: pContent});
		}
		return '';
	}

	customAssignFunction (pAddress, pContent)
	{
		this.contentMap[pAddress] = pContent;

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pContent));
		if (pContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an ASSIGN to Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: pContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an ASSIGN to Address -> [${pAddress}]`, {Content: pContent});
		}
		return '';
	}

	initializeAttributeMapLocation(pAddress, pAttribute)
	{
		if (!this.contentMap._ATTRIBUTE_MAP.hasOwnProperty(pAddress))
		{
			this.contentMap._ATTRIBUTE_MAP[pAddress] = {};
		}
		if (!this.contentMap._ATTRIBUTE_MAP[pAddress].hasOwnProperty(pAttribute))
		{
			this.contentMap._ATTRIBUTE_MAP[pAddress][pAttribute] = false;
		}
	}

	initializeClassMapLocation(pAddress, pClass)
	{
		if (this.contentMap._CLASS_LIST.indexOf(pClass) === -1)
		{
			this.contentMap._CLASS_LIST.push(pClass);
		}
	}

	customReadAttributeFunction (pAddress, pAttribute)
	{
		this.initializeAttributeMapLocation(pAddress, pAttribute);

		let tmpContent = this.contentMap._ATTRIBUTE_MAP[pAddress][pAttribute];

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pAttribute));
		if (tmpContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an ATTRIBUTE READ for Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: tmpContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an ATTRIBUTE READ for Address -> [${pAddress}]::[${pAttribute}]`, {Content: tmpContent});
		}
		return tmpContent;
	}

	customSetAttributeFunction (pAddress, pAttribute, pValue)
	{
		this.initializeAttributeMapLocation(pAddress, pAttribute);

		this.contentMap._ATTRIBUTE_MAP[pAddress][pAttribute] = pValue;

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pAttribute));
		if (pValue.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an ATTRIBUTE SET for Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: pValue.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an ATTRIBUTE SET for Address -> [${pAddress}]::[${pAttribute}]`, {Content: pValue});
		}
		return pValue;
	}

	customRemoveAttributeFunction (pAddress, pAttribute)
	{
		this.initializeAttributeMapLocation(pAddress, pAttribute);

		let tmpContent = this.contentMap._ATTRIBUTE_MAP[pAddress][pAttribute];

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pAttribute));
		if (tmpContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an ATTRIBUTE REMOVE for Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Content: tmpContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an ATTRIBUTE REMOVE for Address -> [${pAddress}]::[${pAttribute}]`, {Content: tmpContent});
		}

		delete this.contentMap._ATTRIBUTE_MAP[pAddress][pAttribute];

		return true;
	}

	customReadClassFunction (pAddress, pClass)
	{
		const tmpContent = this.contentMap._CLASS_LIST.indexOf(pClass) > -1;

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pClass));
		this.pict.log.info(`Mocking an CLASS READ for Address -> [${pAddress}]::[${pClass}]`, {Content: tmpContent});
		return tmpContent;
	}

	customSetClassFunction (pAddress, pClass)
	{
		let tmpContent = this.contentMap._CLASS_LIST;

		if (!this.contentMap._CLASS_LIST.indexOf(pClass) > -1)
		{
			this.contentMap._CLASS_LIST.push(pClass);
		}

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pClass));
		this.pict.log.info(`Mocking an CLASS SET for Address -> [${pAddress}]::[${pClass}]`, {Content: tmpContent.join()});
		return tmpContent;
	}

	customRemoveClassFunction (pAddress, pClass)
	{
		let tmpContent = this.contentMap._CLASS_LIST;

		tmpContent = this.contentMap._CLASS_LIST.splice(pClass);

		if (this.storeEventLog) this.eventLog.Assign.push(this.createEventLogEntry(pAddress, pClass));
		this.pict.log.info(`Mocking an CLASS REMOVE for Address -> [${pAddress}]::[${pClass}]`, {Content: tmpContent.join()});

		return tmpContent;
	}
}

module.exports = PictEnvironmentObject;