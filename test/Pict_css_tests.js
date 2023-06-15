/**
* Unit tests for Pict
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
	Product: 'MockPict',
	ProductVersion: '1.0.0',
});

suite
(
	'Pict CSS',
	() =>
	{
		setup (() => {});

		suite
		(
			'Basic CSS merging',
			() =>
			{
				test
				(
					'Create a bit of CSS.',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						Expect(testPict.CSSMap.generateCSS()).to.be.a('string', 'No CSS should still generate an empty string.');
						Expect(testPict.CSSMap.generateCSS()).to.equal('');
						testPict.CSSMap.addCSS('Test', 'body { bgcolor: #000000; }');
						Expect(testPict.CSSMap.generateCSS()).to.equal('/* Test from Unknown */\nbody { bgcolor: #000000; }\n');
						fDone();
					}
				);
				test
				(
					'Test priority, and, assignment.',
					(fDone) =>
					{
						let testPict = new libPict(_MockSettings);
						testPict.CSSMap.addCSS('T1', 'a', 100, 'F1');
						testPict.CSSMap.addCSS('T2', 'b', 100, 'F1');
						testPict.CSSMap.addCSS('E1', 'zzz', 150, 'F1');
						testPict.CSSMap.addCSS('T3', 'c', 100, 'F1');
						testPict.CSSMap.addCSS('T4', 'd', 100, 'F1');
						testPict.CSSMap.addCSS('T1', 'e', 100, 'F1');
						Expect(testPict.CSSMap.generateCSS()).to.equal('/* T1 from F1 */\ne\n/* T2 from F1 */\nb\n/* T3 from F1 */\nc\n/* T4 from F1 */\nd\n/* E1 from F1 */\nzzz\n');
						testPict.CSSMap.injectCSS();
						fDone();
					}
				);
			}
		);
	}
);