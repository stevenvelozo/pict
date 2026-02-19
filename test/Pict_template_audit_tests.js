/**
* Unit tests for Pict Template Auditing
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

const Chai = require("chai");
const Expect = Chai.expect;

const libPict = require('../source/Pict.js');

const _MockSettings = (
	{
		Product: 'MockPictAudit',
		ProductVersion: '1.0.0'
	});

suite(
	'Pict Template Auditing',
	function ()
	{
		setup(
			function ()
			{
			}
		);

		suite(
			'Audit Toggle',
			function ()
			{
				test(
					'Auditing is disabled by default.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						Expect(testPict.TemplateDebug).to.equal(false);
						Expect(testPict.TemplateDebugStack).to.equal(false);
						Expect(testPict.TemplateAudit.auditLog).to.be.an('array').that.is.empty;
					}
				);
				test(
					'No audit entries when TemplateDebug is false.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.parseTemplate('<p>{~D:Record.Name~}</p>', { Name: 'Test' });
						Expect(testPict.TemplateAudit.auditLog).to.be.an('array').that.is.empty;
					}
				);
			}
		);

		suite(
			'Basic Auditing',
			function ()
			{
				test(
					'Simple template produces one audit entry with timing.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;

						testPict.parseTemplate('<p>{~D:Record.Name~}</p>', { Name: 'Frankenberry' });

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						let tmpNode = testPict.TemplateAudit.auditLog[0];
						Expect(tmpNode.Entrypoint).to.equal('parseTemplate');
						Expect(tmpNode.StartTime).to.be.a('number');
						Expect(tmpNode.FinishTime).to.be.a('number');
						Expect(tmpNode.FinishTime).to.be.at.least(tmpNode.StartTime);
						Expect(tmpNode.Duration).to.be.a('number');
						Expect(tmpNode.DataSize).to.be.a('number');
						Expect(tmpNode.DataSize).to.be.greaterThan(0);
						Expect(tmpNode.ChildTemplates).to.be.an('array').that.is.empty;
						Expect(tmpNode.StackTrace).to.be.null;
					}
				);
				test(
					'parseTemplateByHash uses the hash name as TemplateHash.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('Greeting', '<p>Hello {~D:Record.Name~}</p>');

						testPict.parseTemplateByHash('Greeting', { Name: 'World' });

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						Expect(testPict.TemplateAudit.auditLog[0].TemplateHash).to.equal('Greeting');
					}
				);
				test(
					'TemplateAudit.clear() resets the log.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.parseTemplate('<p>test</p>', {});
						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);

						testPict.TemplateAudit.clear();
						Expect(testPict.TemplateAudit.auditLog).to.be.an('array').that.is.empty;
					}
				);
			}
		);

		suite(
			'Nested Templates',
			function ()
			{
				test(
					'Template expression {~T:...~} creates child audit nodes.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('Child', '<span>{~D:Record.Value~}</span>');

						testPict.parseTemplate('<div>{~T:Child:Record~}</div>', { Value: 'nested' });

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						let tmpRoot = testPict.TemplateAudit.auditLog[0];
						Expect(tmpRoot.ChildTemplates).to.have.length(1);

						let tmpChild = tmpRoot.ChildTemplates[0];
						Expect(tmpChild.TemplateHash).to.equal('Child');
						Expect(tmpChild.StartTime).to.be.a('number');
						Expect(tmpChild.FinishTime).to.be.a('number');
						Expect(tmpChild.ChildTemplates).to.be.an('array').that.is.empty;
					}
				);
				test(
					'TemplateSet {~TS:...~} creates set node with per-iteration children.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('Item', '<li>{~D:Record.name~}</li>');
						testPict.AppData.Items = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }];

						testPict.parseTemplate('<ul>{~TS:Item:AppData.Items~}</ul>', {});

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						let tmpRoot = testPict.TemplateAudit.auditLog[0];
						// The root parseTemplate contains a TemplateSet child
						// TemplateSet creates a parseTemplateSet audit node
						// which contains 3 parseTemplate children (one per item)
						let tmpSetNode = null;
						// Walk to find the set node
						function findSetNode(pNode)
						{
							if (pNode.Entrypoint === 'parseTemplateSet')
							{
								tmpSetNode = pNode;
								return;
							}
							for (let i = 0; i < pNode.ChildTemplates.length; i++)
							{
								findSetNode(pNode.ChildTemplates[i]);
							}
						}
						findSetNode(tmpRoot);

						Expect(tmpSetNode).to.not.be.null;
						Expect(tmpSetNode.ChildTemplates).to.have.length(3);
					}
				);
				test(
					'Three levels of nesting produces correct tree depth.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('Level2', '<b>{~T:Level3:Record~}</b>');
						testPict.TemplateProvider.addTemplate('Level3', '<i>{~D:Record.val~}</i>');

						testPict.parseTemplate('<div>{~T:Level2:Record~}</div>', { val: 'deep' });

						let tmpSummary = testPict.TemplateAudit.getSummary();
						Expect(tmpSummary.MaxDepth).to.be.at.least(2);
						Expect(tmpSummary.TotalCalls).to.be.at.least(3);
					}
				);
			}
		);

		suite(
			'Async Auditing',
			function ()
			{
				test(
					'Async parseTemplate creates audit entries.',
					function (fDone)
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('AsyncChild', '<span>{~D:Record.val~}</span>');

						testPict.parseTemplate('<div>{~T:AsyncChild:Record~}</div>', { val: 'async' },
							(pError, pResult) =>
							{
								Expect(pError).to.not.be.an('error');
								Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
								let tmpRoot = testPict.TemplateAudit.auditLog[0];
								Expect(tmpRoot.FinishTime).to.be.a('number');
								Expect(tmpRoot.ChildTemplates).to.have.length(1);
								Expect(tmpRoot.ChildTemplates[0].TemplateHash).to.equal('AsyncChild');
								fDone();
							});
					}
				);
				test(
					'Async parseTemplateSet creates audit entries.',
					function (fDone)
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('AsyncItem', '<li>{~D:Record.x~}</li>');
						testPict.AppData.List = [{ x: 1 }, { x: 2 }];

						testPict.parseTemplate('<ul>{~TS:AsyncItem:AppData.List~}</ul>', {},
							(pError, pResult) =>
							{
								Expect(pError).to.not.be.an('error');
								Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
								let tmpRoot = testPict.TemplateAudit.auditLog[0];
								Expect(tmpRoot.FinishTime).to.be.a('number');

								let tmpSummary = testPict.TemplateAudit.getSummary();
								Expect(tmpSummary.TotalCalls).to.be.at.least(3);
								fDone();
							});
					}
				);
			}
		);

		suite(
			'Stack Traces',
			function ()
			{
				test(
					'TemplateDebugStack captures Error().stack.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateDebugStack = true;

						testPict.parseTemplate('<p>{~D:Record.Name~}</p>', { Name: 'Test' });

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						let tmpNode = testPict.TemplateAudit.auditLog[0];
						Expect(tmpNode.StackTrace).to.be.a('string');
						Expect(tmpNode.StackTrace).to.contain('Error');
					}
				);
				test(
					'StackTrace is null when TemplateDebugStack is false.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateDebugStack = false;

						testPict.parseTemplate('<p>{~D:Record.Name~}</p>', { Name: 'Test' });

						Expect(testPict.TemplateAudit.auditLog[0].StackTrace).to.be.null;
					}
				);
			}
		);

		suite(
			'Audit Summary',
			function ()
			{
				test(
					'TemplateAudit.getSummary() returns correct counts.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('SummaryChild', '<span>{~D:Record.v~}</span>');

						testPict.parseTemplate('<div>{~T:SummaryChild:Record~}</div>', { v: 'a' });
						testPict.parseTemplate('<p>plain</p>', {});

						let tmpSummary = testPict.TemplateAudit.getSummary();
						Expect(tmpSummary.RootCalls).to.equal(2);
						Expect(tmpSummary.TotalCalls).to.be.at.least(3);
						Expect(tmpSummary.TotalDuration).to.be.a('number');
						Expect(tmpSummary.MaxDepth).to.be.at.least(1);
					}
				);
				test(
					'Summary on empty log returns zeros.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						let tmpSummary = testPict.TemplateAudit.getSummary();
						Expect(tmpSummary.RootCalls).to.equal(0);
						Expect(tmpSummary.TotalCalls).to.equal(0);
						Expect(tmpSummary.TotalDuration).to.equal(0);
						Expect(tmpSummary.MaxDepth).to.equal(0);
					}
				);
			}
		);

		suite(
			'TemplateSetByHash Auditing',
			function ()
			{
				test(
					'parseTemplateSetByHash uses the hash name.',
					function ()
					{
						const testPict = new libPict(_MockSettings);
						testPict.TemplateAudit.prepareAuditing();

						testPict.TemplateDebug = true;
						testPict.TemplateProvider.addTemplate('SetItem', '<li>{~D:Record.n~}</li>');

						testPict.parseTemplateSetByHash('SetItem', [{ n: 'one' }, { n: 'two' }]);

						Expect(testPict.TemplateAudit.auditLog).to.have.length(1);
						Expect(testPict.TemplateAudit.auditLog[0].TemplateHash).to.equal('SetItem');
						Expect(testPict.TemplateAudit.auditLog[0].Entrypoint).to.equal('parseTemplateSet');
					}
				);
			}
		);
	}
);
