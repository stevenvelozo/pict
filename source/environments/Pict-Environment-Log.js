/**
* Pict browser shim loader
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
class PictEnvironmentLog
{
	/**
	 * @typedef {import('../Pict')} Pict
	 */
	/**
	 * @param {Pict} pPict - The pict object to attach the custom read/write functions to.
	 * @param {Map<String, any>} pContentMap - The content map to use for custom reads.
	 */
	constructor(pPict, pContentMap)
	{
		this.contentMap = (typeof(pContentMap) == 'object') ? pContentMap : {};

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

		this.pict.ContentAssignment.customGetElementFunction = this.customGetElementFunction.bind(this);
		this.pict.ContentAssignment.customReadFunction = this.customReadFunction.bind(this);
		this.pict.ContentAssignment.customAppendFunction = this.customAppendFunction.bind(this);
		this.pict.ContentAssignment.customPrependFunction = this.customPrependFunction.bind(this)
		this.pict.ContentAssignment.customAssignFunction = this.customAssignFunction.bind(this);

		this.pict.ContentAssignment.customReadAttributeFunction = this.customReadAttributeFunction.bind(this);
		this.pict.ContentAssignment.customSetAttributeFunction = this.customSetAttributeFunction.bind(this);
	}

	/**
	 * Create an event log entry.
	 *
	 * @param {string} pAddress - The address of the event.
	 * @param {string} pContent - The content of the event.
	 */
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

	/**
	 * Custom GetElement function.
	 *
	 * @param {string} pAddress - The address of the element.
	 */
	customGetElementFunction(pAddress)
	{
		if (this.storeEventLog) this.eventLog.GetElement.push(this.createEventLogEntry(pAddress));
		this.pict.log.info(`Mocking an GET of Address -> [${pAddress}]`);
		return '';
	}

	/**
	 * Custom Read function.
	 *
	 * @param {string} pAddress - The address of the element.
	 */
	customReadFunction(pAddress)
	{
		if (this.storeEventLog) this.eventLog.Read.push(this.createEventLogEntry(pAddress));
		this.pict.log.info(`Mocking an READ from Address -> [${pAddress}]`);
		if (pAddress in this.contentMap)
		{
			// The data is in the content map!
			return this.contentMap[pAddress];
		}
		this.pict.log.warn(`Mock read from Address ${pAddress} did not find a value in the content map.`);
		return '';
	}

	/**
	 * Custom Append function.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @param {string} pContent - The content to append.
	 */
	customAppendFunction(pAddress, pContent)
	{
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

	/**
	 * Custom Prepend function.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @param {string} pContent - The content to prepend.
	 */
	customPrependFunction(pAddress, pContent)
	{
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

	/**
	 * Custom Assign function.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @param {string} pContent - The content to assign.
	 */
	customAssignFunction(pAddress, pContent)
	{
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

	/**
	 * Custom Read Attribute function.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @param {string} pAttribute - The attribute to read.
	 */
	customReadAttributeFunction(pAddress, pAttribute)
	{
		this.pict.log.info(`Mocking an READ ATTRIBUTE from Address -> [${pAddress}]`, {Attribute: pAttribute});
		return '';
	}

	/**
	 * Custom Set Attribute function.
	 *
	 * @param {string} pAddress - The address of the element.
	 * @param {string} pAttribute - The attribute to set.
	 */
	customSetAttributeFunction(pAddress, pAttribute, pContent)
	{
		if (pContent.length > this.truncateContentLength)
		{
			this.pict.log.info(`Mocking an SET ATTRIBUTE to Address -> [${pAddress}] (log truncated to first ${this.truncateContentLength} characters)`, {Attribute: pAttribute, Content: pContent.substring(0, this.truncateContentLength)});
		}
		else
		{
			this.pict.log.info(`Mocking an SET ATTRIBUTE to Address -> [${pAddress}]`, {Attribute: pAttribute, Content: pContent});
		}
		return '';
	}
}

module.exports = PictEnvironmentLog;
