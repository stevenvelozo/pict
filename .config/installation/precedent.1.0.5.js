(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Precedent Meta-Templating
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Process text streams, parsing out meta-template expressions.
*/
var libWordTree = require("./WordTree.js");
var libStringParser = require("./StringParser.js");

var Precedent = function () {
	/**
  * Precedent Constructor
  */
	function Precedent() {
		_classCallCheck(this, Precedent);

		this.WordTree = new libWordTree();

		this.StringParser = new libStringParser();

		this.ParseTree = this.WordTree.ParseTree;
	}

	/**
  * Add a Pattern to the Parse Tree
  * @method addPattern
  * @param {Object} pTree - A node on the parse tree to push the characters into
  * @param {string} pPattern - The string to add to the tree
  * @param {number} pIndex - callback function
  * @return {bool} True if adding the pattern was successful
  */


	_createClass(Precedent, [{
		key: "addPattern",
		value: function addPattern(pPatternStart, pPatternEnd, pParser) {
			return this.WordTree.addPattern(pPatternStart, pPatternEnd, pParser);
		}

		/**
   * Parse a string with the existing parse tree
   * @method parseString
   * @param {string} pString - The string to parse
   * @return {string} The result from the parser
   */

	}, {
		key: "parseString",
		value: function parseString(pString) {
			return this.StringParser.parseString(pString, this.ParseTree);
		}
	}]);

	return Precedent;
}();

module.exports = Precedent;

},{"./StringParser.js":2,"./WordTree.js":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* String Parser
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Parse a string, properly processing each matched token in the word tree.
*/

var StringParser = function () {
	/**
  * StringParser Constructor
  */
	function StringParser() {
		_classCallCheck(this, StringParser);
	}

	/**
  * Create a fresh parsing state object to work with.
  * @method newParserState
  * @param {Object} pParseTree - A node on the parse tree to begin parsing from (usually root)
  * @return {Object} A new parser state object for running a character parser on
  * @private
  */


	_createClass(StringParser, [{
		key: 'newParserState',
		value: function newParserState(pParseTree) {
			return {
				ParseTree: pParseTree,

				Output: '',
				OutputBuffer: '',

				Pattern: false,

				PatternMatch: false,
				PatternMatchOutputBuffer: ''
			};
		}

		/**
   * Assign a node of the parser tree to be the next potential match.
   * If the node has a PatternEnd property, it is a valid match and supercedes the last valid match (or becomes the initial match).
   * @method assignNode
   * @param {Object} pNode - A node on the parse tree to assign
   * @param {Object} pParserState - The state object for the current parsing task
   * @private
   */

	}, {
		key: 'assignNode',
		value: function assignNode(pNode, pParserState) {
			pParserState.PatternMatch = pNode;

			// If the pattern has a END we can assume it has a parse function...
			if (pParserState.PatternMatch.hasOwnProperty('PatternEnd')) {
				// ... this is the legitimate start of a pattern.
				pParserState.Pattern = pParserState.PatternMatch;
			}
		}

		/**
   * Append a character to the output buffer in the parser state.
   * This output buffer is used when a potential match is being explored, or a match is being explored.
   * @method appendOutputBuffer
   * @param {string} pCharacter - The character to append
   * @param {Object} pParserState - The state object for the current parsing task
   * @private
   */

	}, {
		key: 'appendOutputBuffer',
		value: function appendOutputBuffer(pCharacter, pParserState) {
			pParserState.OutputBuffer += pCharacter;
		}

		/**
   * Flush the output buffer to the output and clear it.
   * @method flushOutputBuffer
   * @param {Object} pParserState - The state object for the current parsing task
   * @private
   */

	}, {
		key: 'flushOutputBuffer',
		value: function flushOutputBuffer(pParserState) {
			pParserState.Output += pParserState.OutputBuffer;
			pParserState.OutputBuffer = '';
		}

		/**
   * Check if the pattern has ended.  If it has, properly flush the buffer and start looking for new patterns.
   * @method checkPatternEnd
   * @param {Object} pParserState - The state object for the current parsing task
   * @private
   */

	}, {
		key: 'checkPatternEnd',
		value: function checkPatternEnd(pParserState) {
			if (pParserState.OutputBuffer.length >= pParserState.Pattern.PatternEnd.length + pParserState.Pattern.PatternStart.length && pParserState.OutputBuffer.substr(-pParserState.Pattern.PatternEnd.length) === pParserState.Pattern.PatternEnd) {
				// ... this is the end of a pattern, cut off the end tag and parse it.
				// Trim the start and end tags off the output buffer now
				pParserState.OutputBuffer = pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStart.length, pParserState.OutputBuffer.length - (pParserState.Pattern.PatternStart.length + pParserState.Pattern.PatternEnd.length)));
				// Flush the output buffer.
				this.flushOutputBuffer(pParserState);
				// End pattern mode
				pParserState.Pattern = false;
				pParserState.PatternMatch = false;
			}
		}

		/**
   * Parse a character in the buffer.
   * @method parseCharacter
   * @param {string} pCharacter - The character to append
   * @param {Object} pParserState - The state object for the current parsing task
   * @private
   */

	}, {
		key: 'parseCharacter',
		value: function parseCharacter(pCharacter, pParserState) {
			// (1) If we aren't in a pattern match, and we aren't potentially matching, and this may be the start of a new pattern....
			if (!pParserState.PatternMatch && pParserState.ParseTree.hasOwnProperty(pCharacter)) {
				// ... assign the node as the matched node.
				this.assignNode(pParserState.ParseTree[pCharacter], pParserState);
				this.appendOutputBuffer(pCharacter, pParserState);
			}
			// (2) If we are in a pattern match (actively seeing if this is part of a new pattern token)
			else if (pParserState.PatternMatch) {
					// If the pattern has a subpattern with this key
					if (pParserState.PatternMatch.hasOwnProperty(pCharacter)) {
						// Continue matching patterns.
						this.assignNode(pParserState.PatternMatch[pCharacter], pParserState);
					}
					this.appendOutputBuffer(pCharacter, pParserState);
					if (pParserState.Pattern) {
						// ... Check if this is the end of the pattern (if we are matching a valid pattern)...
						this.checkPatternEnd(pParserState);
					}
				}
				// (3) If we aren't in a pattern match or pattern, and this isn't the start of a new pattern (RAW mode)....
				else {
						pParserState.Output += pCharacter;
					}
		}

		/**
   * Parse a string for matches, and process any template segments that occur.
   * @method parseString
   * @param {string} pString - The string to parse.
   * @param {Object} pParseTree - The parse tree to begin parsing from (usually root)
   */

	}, {
		key: 'parseString',
		value: function parseString(pString, pParseTree) {
			var tmpParserState = this.newParserState(pParseTree);

			for (var i = 0; i < pString.length; i++) {
				// TODO: This is not fast.
				this.parseCharacter(pString[i], tmpParserState);
			}

			this.flushOutputBuffer(tmpParserState);

			return tmpParserState.Output;
		}
	}]);

	return StringParser;
}();

module.exports = StringParser;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Word Tree
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Create a tree (directed graph) of Javascript objects, one character per object.
*/

var WordTree = function () {
	/**
  * WordTree Constructor
  */
	function WordTree() {
		_classCallCheck(this, WordTree);

		this.ParseTree = {};
	}

	/** 
  * Add a child character to a Parse Tree node
  * @method addChild
  * @param {Object} pTree - A parse tree to push the characters into
  * @param {string} pPattern - The string to add to the tree
  * @param {number} pIndex - callback function
  * @returns {Object} The resulting leaf node that was added (or found)
  * @private
  */


	_createClass(WordTree, [{
		key: 'addChild',
		value: function addChild(pTree, pPattern, pIndex) {
			if (pIndex > pPattern.length) return pTree;

			if (!pTree.hasOwnProperty(pPattern[pIndex])) pTree[pPattern[pIndex]] = {};

			return pTree[pPattern[pIndex]];
		}

		/** Add a Pattern to the Parse Tree
   * @method addPattern
   * @param {Object} pTree - A node on the parse tree to push the characters into
   * @param {string} pPattern - The string to add to the tree
   * @param {number} pIndex - callback function
   * @return {bool} True if adding the pattern was successful
   */

	}, {
		key: 'addPattern',
		value: function addPattern(pPatternStart, pPatternEnd, pParser) {
			if (pPatternStart.length < 1) return false;

			var tmpLeaf = this.ParseTree;

			// Add the tree of leaves iteratively
			for (var i = 0; i < pPatternStart.length; i++) {
				tmpLeaf = this.addChild(tmpLeaf, pPatternStart, i);
			}tmpLeaf.PatternStart = pPatternStart;
			tmpLeaf.PatternEnd = typeof pPatternEnd === 'string' && pPatternEnd.length > 0 ? pPatternEnd : pPatternStart;
			tmpLeaf.Parse = typeof pParser === 'function' ? pParser : typeof pParser === 'string' ? function () {
				return pParser;
			} : function (pData) {
				return pData;
			};

			return true;
		}
	}]);

	return WordTree;
}();

module.exports = WordTree;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvUHJlY2VkZW50LmpzIiwic291cmNlL1N0cmluZ1BhcnNlci5qcyIsInNvdXJjZS9Xb3JkVHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBOzs7Ozs7Ozs7QUFTQSxJQUFJLGNBQWMsd0JBQWxCO0FBQ0EsSUFBSSxrQkFBa0IsNEJBQXRCOztJQUVNLFM7QUFFTDs7O0FBR0Esc0JBQ0E7QUFBQTs7QUFDQyxPQUFLLFFBQUwsR0FBZ0IsSUFBSSxXQUFKLEVBQWhCOztBQUVBLE9BQUssWUFBTCxHQUFvQixJQUFJLGVBQUosRUFBcEI7O0FBRUEsT0FBSyxTQUFMLEdBQWlCLEtBQUssUUFBTCxDQUFjLFNBQS9CO0FBQ0E7O0FBRUQ7Ozs7Ozs7Ozs7Ozs2QkFRVyxhLEVBQWUsVyxFQUFhLE8sRUFDdkM7QUFDQyxVQUFPLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsYUFBekIsRUFBd0MsV0FBeEMsRUFBcUQsT0FBckQsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7OEJBTVksTyxFQUNaO0FBQ0MsVUFBTyxLQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBSyxTQUE1QyxDQUFQO0FBQ0E7Ozs7OztBQUdGLE9BQU8sT0FBUCxHQUFpQixTQUFqQjs7Ozs7Ozs7O0FDbkRBOzs7Ozs7Ozs7O0lBVU0sWTtBQUVMOzs7QUFHQSx5QkFDQTtBQUFBO0FBQ0M7O0FBRUQ7Ozs7Ozs7Ozs7O2lDQU9nQixVLEVBQ2hCO0FBQ0MsVUFDQTtBQUNJLGVBQVcsVUFEZjs7QUFHQyxZQUFRLEVBSFQ7QUFJQyxrQkFBYyxFQUpmOztBQU1DLGFBQVMsS0FOVjs7QUFRQyxrQkFBYyxLQVJmO0FBU0MsOEJBQTBCO0FBVDNCLElBREE7QUFZQTs7QUFFRDs7Ozs7Ozs7Ozs7NkJBUVksSyxFQUFPLFksRUFDbkI7QUFDQyxnQkFBYSxZQUFiLEdBQTRCLEtB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RUFBakI7QUFDQTs7QUFFRDs7Ozs7Ozs7Ozs7OzsyQkFTVSxLLEVBQU8sUSxFQUFVLE0sRUFDM0I7QUFDQyxPQUFJLFNBQVMsU0FBUyxNQUF0QixFQUNDLE9BQU8sS0FBUDs7QUFFRCxPQUFJLENBQUMsTUFBTSxjQUFOLENBQXFCLFNBQVMsTUFBVCxDQUFyQixDQUFMLEVBQ0MsTUFBTSxTQUFTLE1BQVQsQ0FBTixJQUEwQixFQUExQjs7QUFFRCxVQUFPLE1BQU0sU0FBUyxNQUFULENBQU4sQ0FBUDtBQUNBOztBQUVEOzs7Ozs7Ozs7OzZCQU9ZLGEsRUFBZSxXLEVBQWEsTyxFQUN4QztBQUNDLE9BQUksY0FBYyxNQUFkLEdBQXVCLENBQTNCLEVBQ0MsT0FBTyxLQUFQOztBQUVELE9BQUksVUFBVSxLQUFLLFNBQW5COztBQUVBO0FBQ0EsUUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGNBQWMsTUFBbEMsRUFBMEMsR0FBMUM7QUFDQyxjQUFVLEtBQUssUUFBTCxDQUFjLE9BQWQsRUFBdUIsYUFBdkIsRUFBc0MsQ0FBdEMsQ0FBVjtBQURELElBR0EsUUFBUSxZQUFSLEdBQXVCLGFBQXZCO0FBQ0EsV0FBUSxVQUFSLEdBQXVCLE9BQU8sV0FBUCxLQUF3QixRQUF6QixJQUF1QyxZQUFZLE1BQVosR0FBcUIsQ0FBN0QsR0FBbUUsV0FBbkUsR0FBaUYsYUFBdEc7QUFDQSxXQUFRLEtBQVIsR0FBaUIsT0FBTyxPQUFQLEtBQW9CLFVBQXJCLEdBQW1DLE9BQW5DLEdBQ1gsT0FBTyxPQUFQLEtBQW9CLFFBQXJCLEdBQWlDLFlBQU07QUFBRSxXQUFPLE9BQVA7QUFBaUIsSUFBMUQsR0FDQSxVQUFDLEtBQUQsRUFBVztBQUFFLFdBQU8sS0FBUDtBQUFlLElBRmhDOztBQUlBLFVBQU8sSUFBUDtBQUNBOzs7Ozs7QUFHRixPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4qIFByZWNlZGVudCBNZXRhLVRlbXBsYXRpbmdcbipcbiogQGxpY2Vuc2UgICAgIE1JVFxuKlxuKiBAYXV0aG9yICAgICAgU3RldmVuIFZlbG96byA8c3RldmVuQHZlbG96by5jb20+XG4qXG4qIEBkZXNjcmlwdGlvbiBQcm9jZXNzIHRleHQgc3RyZWFtcywgcGFyc2luZyBvdXQgbWV0YS10ZW1wbGF0ZSBleHByZXNzaW9ucy5cbiovXG52YXIgbGliV29yZFRyZWUgPSByZXF1aXJlKGAuL1dvcmRUcmVlLmpzYCk7XG52YXIgbGliU3RyaW5nUGFyc2VyID0gcmVxdWlyZShgLi9TdHJpbmdQYXJzZXIuanNgKTtcblxuY2xhc3MgUHJlY2VkZW50XG57XG5cdC8qKlxuXHQgKiBQcmVjZWRlbnQgQ29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHRoaXMuV29yZFRyZWUgPSBuZXcgbGliV29yZFRyZWUoKTtcblx0XHRcblx0XHR0aGlzLlN0cmluZ1BhcnNlciA9IG5ldyBsaWJTdHJpbmdQYXJzZXIoKTtcblxuXHRcdHRoaXMuUGFyc2VUcmVlID0gdGhpcy5Xb3JkVHJlZS5QYXJzZVRyZWU7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBBZGQgYSBQYXR0ZXJuIHRvIHRoZSBQYXJzZSBUcmVlXG5cdCAqIEBtZXRob2QgYWRkUGF0dGVyblxuXHQgKiBAcGFyYW0ge09iamVjdH0gcFRyZWUgLSBBIG5vZGUgb24gdGhlIHBhcnNlIHRyZWUgdG8gcHVzaCB0aGUgY2hhcmFjdGVycyBpbnRvXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwUGF0dGVybiAtIFRoZSBzdHJpbmcgdG8gYWRkIHRvIHRoZSB0cmVlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwSW5kZXggLSBjYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcmV0dXJuIHtib29sfSBUcnVlIGlmIGFkZGluZyB0aGUgcGF0dGVybiB3YXMgc3VjY2Vzc2Z1bFxuXHQgKi9cblx0YWRkUGF0dGVybihwUGF0dGVyblN0YXJ0LCBwUGF0dGVybkVuZCwgcFBhcnNlcilcblx0e1xuXHRcdHJldHVybiB0aGlzLldvcmRUcmVlLmFkZFBhdHRlcm4ocFBhdHRlcm5TdGFydCwgcFBhdHRlcm5FbmQsIHBQYXJzZXIpO1xuXHR9XG5cdFxuXHQvKipcblx0ICogUGFyc2UgYSBzdHJpbmcgd2l0aCB0aGUgZXhpc3RpbmcgcGFyc2UgdHJlZVxuXHQgKiBAbWV0aG9kIHBhcnNlU3RyaW5nXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwU3RyaW5nIC0gVGhlIHN0cmluZyB0byBwYXJzZVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSByZXN1bHQgZnJvbSB0aGUgcGFyc2VyXG5cdCAqL1xuXHRwYXJzZVN0cmluZyhwU3RyaW5nKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuU3RyaW5nUGFyc2VyLnBhcnNlU3RyaW5nKHBTdHJpbmcsIHRoaXMuUGFyc2VUcmVlKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZWNlZGVudDtcbiIsIi8qKlxuKiBTdHJpbmcgUGFyc2VyXG4qXG4qIEBsaWNlbnNlICAgICBNSVRcbipcbiogQGF1dGhvciAgICAgIFN0ZXZlbiBWZWxvem8gPHN0ZXZlbkB2ZWxvem8uY29tPlxuKlxuKiBAZGVzY3JpcHRpb24gUGFyc2UgYSBzdHJpbmcsIHByb3Blcmx5IHByb2Nlc3NpbmcgZWFjaCBtYXRjaGVkIHRva2VuIGluIHRoZSB3b3JkIHRyZWUuXG4qL1xuXG5jbGFzcyBTdHJpbmdQYXJzZXJcbntcblx0LyoqXG5cdCAqIFN0cmluZ1BhcnNlciBDb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBmcmVzaCBwYXJzaW5nIHN0YXRlIG9iamVjdCB0byB3b3JrIHdpdGguXG5cdCAqIEBtZXRob2QgbmV3UGFyc2VyU3RhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9IHBQYXJzZVRyZWUgLSBBIG5vZGUgb24gdGhlIHBhcnNlIHRyZWUgdG8gYmVnaW4gcGFyc2luZyBmcm9tICh1c3VhbGx5IHJvb3QpXG5cdCAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgcGFyc2VyIHN0YXRlIG9iamVjdCBmb3IgcnVubmluZyBhIGNoYXJhY3RlciBwYXJzZXIgb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdG5ld1BhcnNlclN0YXRlIChwUGFyc2VUcmVlKVxuXHR7XG5cdFx0cmV0dXJuIChcblx0XHR7XG5cdFx0ICAgIFBhcnNlVHJlZTogcFBhcnNlVHJlZSxcblxuXHRcdFx0T3V0cHV0OiAnJyxcblx0XHRcdE91dHB1dEJ1ZmZlcjogJycsXG5cblx0XHRcdFBhdHRlcm46IGZhbHNlLFxuXG5cdFx0XHRQYXR0ZXJuTWF0Y2g6IGZhbHNlLFxuXHRcdFx0UGF0dGVybk1hdGNoT3V0cHV0QnVmZmVyOiAnJ1xuXHRcdH0pO1xuXHR9XG5cdFx0XG5cdC8qKlxuXHQgKiBBc3NpZ24gYSBub2RlIG9mIHRoZSBwYXJzZXIgdHJlZSB0byBiZSB0aGUgbmV4dCBwb3RlbnRpYWwgbWF0Y2guXG5cdCAqIElmIHRoZSBub2RlIGhhcyBhIFBhdHRlcm5FbmQgcHJvcGVydHksIGl0IGlzIGEgdmFsaWQgbWF0Y2ggYW5kIHN1cGVyY2VkZXMgdGhlIGxhc3QgdmFsaWQgbWF0Y2ggKG9yIGJlY29tZXMgdGhlIGluaXRpYWwgbWF0Y2gpLlxuXHQgKiBAbWV0aG9kIGFzc2lnbk5vZGVcblx0ICogQHBhcmFtIHtPYmplY3R9IHBOb2RlIC0gQSBub2RlIG9uIHRoZSBwYXJzZSB0cmVlIHRvIGFzc2lnblxuXHQgKiBAcGFyYW0ge09iamVjdH0gcFBhcnNlclN0YXRlIC0gVGhlIHN0YXRlIG9iamVjdCBmb3IgdGhlIGN1cnJlbnQgcGFyc2luZyB0YXNrXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRhc3NpZ25Ob2RlIChwTm9kZSwgcFBhcnNlclN0YXRlKVxuXHR7XG5cdFx0cFBhcnNlclN0YXRlLlBhdHRlcm5NYXRjaCA9IHBOb2RlO1xuXG5cdFx0Ly8gSWYgdGhlIHBhdHRlcm4gaGFzIGEgRU5EIHdlIGNhbiBhc3N1bWUgaXQgaGFzIGEgcGFyc2UgZnVuY3Rpb24uLi5cblx0XHRpZiAocFBhcnNlclN0YXRlLlBhdHRlcm5NYXRjaC5oYXNPd25Qcm9wZXJ0eSgnUGF0dGVybkVuZCcpKVxuXHRcdHtcblx0XHRcdC8vIC4uLiB0aGlzIGlzIHRoZSBsZWdpdGltYXRlIHN0YXJ0IG9mIGEgcGF0dGVybi5cblx0XHRcdHBQYXJzZXJTdGF0ZS5QYXR0ZXJuID0gcFBhcnNlclN0YXRlLlBhdHRlcm5NYXRjaDtcblx0XHR9XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBBcHBlbmQgYSBjaGFyYWN0ZXIgdG8gdGhlIG91dHB1dCBidWZmZXIgaW4gdGhlIHBhcnNlciBzdGF0ZS5cblx0ICogVGhpcyBvdXRwdXQgYnVmZmVyIGlzIHVzZWQgd2hlbiBhIHBvdGVudGlhbCBtYXRjaCBpcyBiZWluZyBleHBsb3JlZCwgb3IgYSBtYXRjaCBpcyBiZWluZyBleHBsb3JlZC5cblx0ICogQG1ldGhvZCBhcHBlbmRPdXRwdXRCdWZmZXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBDaGFyYWN0ZXIgLSBUaGUgY2hhcmFjdGVyIHRvIGFwcGVuZFxuXHQgKiBAcGFyYW0ge09iamVjdH0gcFBhcnNlclN0YXRlIC0gVGhlIHN0YXRlIG9iamVjdCBmb3IgdGhlIGN1cnJlbnQgcGFyc2luZyB0YXNrXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRhcHBlbmRPdXRwdXRCdWZmZXIgKHBDaGFyYWN0ZXIsIHBQYXJzZXJTdGF0ZSlcblx0e1xuXHRcdHBQYXJzZXJTdGF0ZS5PdXRwdXRCdWZmZXIgKz0gcENoYXJhY3Rlcjtcblx0fVxuXHRcblx0LyoqXG5cdCAqIEZsdXNoIHRoZSBvdXRwdXQgYnVmZmVyIHRvIHRoZSBvdXRwdXQgYW5kIGNsZWFyIGl0LlxuXHQgKiBAbWV0aG9kIGZsdXNoT3V0cHV0QnVmZmVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwUGFyc2VyU3RhdGUgLSBUaGUgc3RhdGUgb2JqZWN0IGZvciB0aGUgY3VycmVudCBwYXJzaW5nIHRhc2tcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZsdXNoT3V0cHV0QnVmZmVyIChwUGFyc2VyU3RhdGUpXG5cdHtcblx0XHRwUGFyc2VyU3RhdGUuT3V0cHV0ICs9IHBQYXJzZXJTdGF0ZS5PdXRwdXRCdWZmZXI7XG5cdFx0cFBhcnNlclN0YXRlLk91dHB1dEJ1ZmZlciA9ICcnO1xuXHR9XG5cblx0XG5cdC8qKlxuXHQgKiBDaGVjayBpZiB0aGUgcGF0dGVybiBoYXMgZW5kZWQuICBJZiBpdCBoYXMsIHByb3Blcmx5IGZsdXNoIHRoZSBidWZmZXIgYW5kIHN0YXJ0IGxvb2tpbmcgZm9yIG5ldyBwYXR0ZXJucy5cblx0ICogQG1ldGhvZCBjaGVja1BhdHRlcm5FbmRcblx0ICogQHBhcmFtIHtPYmplY3R9IHBQYXJzZXJTdGF0ZSAtIFRoZSBzdGF0ZSBvYmplY3QgZm9yIHRoZSBjdXJyZW50IHBhcnNpbmcgdGFza1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y2hlY2tQYXR0ZXJuRW5kIChwUGFyc2VyU3RhdGUpXG5cdHtcblx0XHRpZiAoKHBQYXJzZXJTdGF0ZS5PdXRwdXRCdWZmZXIubGVuZ3RoID49IHBQYXJzZXJTdGF0ZS5QYXR0ZXJuLlBhdHRlcm5FbmQubGVuZ3RoK3BQYXJzZXJTdGF0ZS5QYXR0ZXJuLlBhdHRlcm5TdGFydC5sZW5ndGgpICYmIFxuXHRcdFx0KHBQYXJzZXJTdGF0ZS5PdXRwdXRCdWZmZXIuc3Vic3RyKC1wUGFyc2VyU3RhdGUuUGF0dGVybi5QYXR0ZXJuRW5kLmxlbmd0aCkgPT09IHBQYXJzZXJTdGF0ZS5QYXR0ZXJuLlBhdHRlcm5FbmQpKVxuXHRcdHtcblx0XHRcdC8vIC4uLiB0aGlzIGlzIHRoZSBlbmQgb2YgYSBwYXR0ZXJuLCBjdXQgb2ZmIHRoZSBlbmQgdGFnIGFuZCBwYXJzZSBpdC5cblx0XHRcdC8vIFRyaW0gdGhlIHN0YXJ0IGFuZCBlbmQgdGFncyBvZmYgdGhlIG91dHB1dCBidWZmZXIgbm93XG5cdFx0XHRwUGFyc2VyU3RhdGUuT3V0cHV0QnVmZmVyID0gcFBhcnNlclN0YXRlLlBhdHRlcm4uUGFyc2UocFBhcnNlclN0YXRlLk91dHB1dEJ1ZmZlci5zdWJzdHIocFBhcnNlclN0YXRlLlBhdHRlcm4uUGF0dGVyblN0YXJ0Lmxlbmd0aCwgcFBhcnNlclN0YXRlLk91dHB1dEJ1ZmZlci5sZW5ndGggLSAocFBhcnNlclN0YXRlLlBhdHRlcm4uUGF0dGVyblN0YXJ0Lmxlbmd0aCtwUGFyc2VyU3RhdGUuUGF0dGVybi5QYXR0ZXJuRW5kLmxlbmd0aCkpKTtcblx0XHRcdC8vIEZsdXNoIHRoZSBvdXRwdXQgYnVmZmVyLlxuXHRcdFx0dGhpcy5mbHVzaE91dHB1dEJ1ZmZlcihwUGFyc2VyU3RhdGUpO1xuXHRcdFx0Ly8gRW5kIHBhdHRlcm4gbW9kZVxuXHRcdFx0cFBhcnNlclN0YXRlLlBhdHRlcm4gPSBmYWxzZTtcblx0XHRcdHBQYXJzZXJTdGF0ZS5QYXR0ZXJuTWF0Y2ggPSBmYWxzZTtcblx0XHR9XG5cdH1cblx0XG5cdC8qKlxuXHQgKiBQYXJzZSBhIGNoYXJhY3RlciBpbiB0aGUgYnVmZmVyLlxuXHQgKiBAbWV0aG9kIHBhcnNlQ2hhcmFjdGVyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwQ2hhcmFjdGVyIC0gVGhlIGNoYXJhY3RlciB0byBhcHBlbmRcblx0ICogQHBhcmFtIHtPYmplY3R9IHBQYXJzZXJTdGF0ZSAtIFRoZSBzdGF0ZSBvYmplY3QgZm9yIHRoZSBjdXJyZW50IHBhcnNpbmcgdGFza1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cGFyc2VDaGFyYWN0ZXIgKHBDaGFyYWN0ZXIsIHBQYXJzZXJTdGF0ZSlcblx0e1xuXHRcdC8vICgxKSBJZiB3ZSBhcmVuJ3QgaW4gYSBwYXR0ZXJuIG1hdGNoLCBhbmQgd2UgYXJlbid0IHBvdGVudGlhbGx5IG1hdGNoaW5nLCBhbmQgdGhpcyBtYXkgYmUgdGhlIHN0YXJ0IG9mIGEgbmV3IHBhdHRlcm4uLi4uXG5cdFx0aWYgKCFwUGFyc2VyU3RhdGUuUGF0dGVybk1hdGNoICYmIHBQYXJzZXJTdGF0ZS5QYXJzZVRyZWUuaGFzT3duUHJvcGVydHkocENoYXJhY3RlcikpXG5cdFx0e1xuXHRcdFx0Ly8gLi4uIGFzc2lnbiB0aGUgbm9kZSBhcyB0aGUgbWF0Y2hlZCBub2RlLlxuXHRcdFx0dGhpcy5hc3NpZ25Ob2RlKHBQYXJzZXJTdGF0ZS5QYXJzZVRyZWVbcENoYXJhY3Rlcl0sIHBQYXJzZXJTdGF0ZSk7XG5cdFx0XHR0aGlzLmFwcGVuZE91dHB1dEJ1ZmZlcihwQ2hhcmFjdGVyLCBwUGFyc2VyU3RhdGUpO1xuXHRcdH1cblx0XHQvLyAoMikgSWYgd2UgYXJlIGluIGEgcGF0dGVybiBtYXRjaCAoYWN0aXZlbHkgc2VlaW5nIGlmIHRoaXMgaXMgcGFydCBvZiBhIG5ldyBwYXR0ZXJuIHRva2VuKVxuXHRcdGVsc2UgaWYgKHBQYXJzZXJTdGF0ZS5QYXR0ZXJuTWF0Y2gpXG5cdFx0e1xuXHRcdFx0Ly8gSWYgdGhlIHBhdHRlcm4gaGFzIGEgc3VicGF0dGVybiB3aXRoIHRoaXMga2V5XG5cdFx0XHRpZiAocFBhcnNlclN0YXRlLlBhdHRlcm5NYXRjaC5oYXNPd25Qcm9wZXJ0eShwQ2hhcmFjdGVyKSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ29udGludWUgbWF0Y2hpbmcgcGF0dGVybnMuXG5cdFx0XHRcdHRoaXMuYXNzaWduTm9kZShwUGFyc2VyU3RhdGUuUGF0dGVybk1hdGNoW3BDaGFyYWN0ZXJdLCBwUGFyc2VyU3RhdGUpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hcHBlbmRPdXRwdXRCdWZmZXIocENoYXJhY3RlciwgcFBhcnNlclN0YXRlKTtcblx0XHRcdGlmIChwUGFyc2VyU3RhdGUuUGF0dGVybilcblx0XHRcdHtcblx0XHRcdFx0Ly8gLi4uIENoZWNrIGlmIHRoaXMgaXMgdGhlIGVuZCBvZiB0aGUgcGF0dGVybiAoaWYgd2UgYXJlIG1hdGNoaW5nIGEgdmFsaWQgcGF0dGVybikuLi5cblx0XHRcdFx0dGhpcy5jaGVja1BhdHRlcm5FbmQocFBhcnNlclN0YXRlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gKDMpIElmIHdlIGFyZW4ndCBpbiBhIHBhdHRlcm4gbWF0Y2ggb3IgcGF0dGVybiwgYW5kIHRoaXMgaXNuJ3QgdGhlIHN0YXJ0IG9mIGEgbmV3IHBhdHRlcm4gKFJBVyBtb2RlKS4uLi5cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cFBhcnNlclN0YXRlLk91dHB1dCArPSBwQ2hhcmFjdGVyO1xuXHRcdH1cblx0fVxuXHRcblx0LyoqXG5cdCAqIFBhcnNlIGEgc3RyaW5nIGZvciBtYXRjaGVzLCBhbmQgcHJvY2VzcyBhbnkgdGVtcGxhdGUgc2VnbWVudHMgdGhhdCBvY2N1ci5cblx0ICogQG1ldGhvZCBwYXJzZVN0cmluZ1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gcFN0cmluZyAtIFRoZSBzdHJpbmcgdG8gcGFyc2UuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwUGFyc2VUcmVlIC0gVGhlIHBhcnNlIHRyZWUgdG8gYmVnaW4gcGFyc2luZyBmcm9tICh1c3VhbGx5IHJvb3QpXG5cdCAqL1xuXHRwYXJzZVN0cmluZyAocFN0cmluZywgcFBhcnNlVHJlZSlcblx0e1xuXHRcdGxldCB0bXBQYXJzZXJTdGF0ZSA9IHRoaXMubmV3UGFyc2VyU3RhdGUocFBhcnNlVHJlZSk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBTdHJpbmcubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0Ly8gVE9ETzogVGhpcyBpcyBub3QgZmFzdC5cblx0XHRcdHRoaXMucGFyc2VDaGFyYWN0ZXIocFN0cmluZ1tpXSwgdG1wUGFyc2VyU3RhdGUpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLmZsdXNoT3V0cHV0QnVmZmVyKHRtcFBhcnNlclN0YXRlKTtcblx0XHRcblx0XHRyZXR1cm4gdG1wUGFyc2VyU3RhdGUuT3V0cHV0O1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nUGFyc2VyO1xuIiwiLyoqXG4qIFdvcmQgVHJlZVxuKlxuKiBAbGljZW5zZSAgICAgTUlUXG4qXG4qIEBhdXRob3IgICAgICBTdGV2ZW4gVmVsb3pvIDxzdGV2ZW5AdmVsb3pvLmNvbT5cbipcbiogQGRlc2NyaXB0aW9uIENyZWF0ZSBhIHRyZWUgKGRpcmVjdGVkIGdyYXBoKSBvZiBKYXZhc2NyaXB0IG9iamVjdHMsIG9uZSBjaGFyYWN0ZXIgcGVyIG9iamVjdC5cbiovXG5cbmNsYXNzIFdvcmRUcmVlXG57XG5cdC8qKlxuXHQgKiBXb3JkVHJlZSBDb25zdHJ1Y3RvclxuXHQgKi9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5QYXJzZVRyZWUgPSB7fTtcblx0fVxuXHRcblx0LyoqIFxuXHQgKiBBZGQgYSBjaGlsZCBjaGFyYWN0ZXIgdG8gYSBQYXJzZSBUcmVlIG5vZGVcblx0ICogQG1ldGhvZCBhZGRDaGlsZFxuXHQgKiBAcGFyYW0ge09iamVjdH0gcFRyZWUgLSBBIHBhcnNlIHRyZWUgdG8gcHVzaCB0aGUgY2hhcmFjdGVycyBpbnRvXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwUGF0dGVybiAtIFRoZSBzdHJpbmcgdG8gYWRkIHRvIHRoZSB0cmVlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwSW5kZXggLSBjYWxsYmFjayBmdW5jdGlvblxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIGxlYWYgbm9kZSB0aGF0IHdhcyBhZGRlZCAob3IgZm91bmQpXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRhZGRDaGlsZCAocFRyZWUsIHBQYXR0ZXJuLCBwSW5kZXgpXG5cdHtcblx0XHRpZiAocEluZGV4ID4gcFBhdHRlcm4ubGVuZ3RoKVxuXHRcdFx0cmV0dXJuIHBUcmVlO1xuXHRcdFxuXHRcdGlmICghcFRyZWUuaGFzT3duUHJvcGVydHkocFBhdHRlcm5bcEluZGV4XSkpXG5cdFx0XHRwVHJlZVtwUGF0dGVybltwSW5kZXhdXSA9IHt9O1xuXHRcdFxuXHRcdHJldHVybiBwVHJlZVtwUGF0dGVybltwSW5kZXhdXTtcblx0fVxuXHRcblx0LyoqIEFkZCBhIFBhdHRlcm4gdG8gdGhlIFBhcnNlIFRyZWVcblx0ICogQG1ldGhvZCBhZGRQYXR0ZXJuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwVHJlZSAtIEEgbm9kZSBvbiB0aGUgcGFyc2UgdHJlZSB0byBwdXNoIHRoZSBjaGFyYWN0ZXJzIGludG9cblx0ICogQHBhcmFtIHtzdHJpbmd9IHBQYXR0ZXJuIC0gVGhlIHN0cmluZyB0byBhZGQgdG8gdGhlIHRyZWVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBJbmRleCAtIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdCAqIEByZXR1cm4ge2Jvb2x9IFRydWUgaWYgYWRkaW5nIHRoZSBwYXR0ZXJuIHdhcyBzdWNjZXNzZnVsXG5cdCAqL1xuXHRhZGRQYXR0ZXJuIChwUGF0dGVyblN0YXJ0LCBwUGF0dGVybkVuZCwgcFBhcnNlcilcblx0e1xuXHRcdGlmIChwUGF0dGVyblN0YXJ0Lmxlbmd0aCA8IDEpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRsZXQgdG1wTGVhZiA9IHRoaXMuUGFyc2VUcmVlO1xuXG5cdFx0Ly8gQWRkIHRoZSB0cmVlIG9mIGxlYXZlcyBpdGVyYXRpdmVseVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcFBhdHRlcm5TdGFydC5sZW5ndGg7IGkrKylcblx0XHRcdHRtcExlYWYgPSB0aGlzLmFkZENoaWxkKHRtcExlYWYsIHBQYXR0ZXJuU3RhcnQsIGkpO1xuXG5cdFx0dG1wTGVhZi5QYXR0ZXJuU3RhcnQgPSBwUGF0dGVyblN0YXJ0O1xuXHRcdHRtcExlYWYuUGF0dGVybkVuZCA9ICgodHlwZW9mKHBQYXR0ZXJuRW5kKSA9PT0gJ3N0cmluZycpICYmIChwUGF0dGVybkVuZC5sZW5ndGggPiAwKSkgPyBwUGF0dGVybkVuZCA6IHBQYXR0ZXJuU3RhcnQ7XG5cdFx0dG1wTGVhZi5QYXJzZSA9ICh0eXBlb2YocFBhcnNlcikgPT09ICdmdW5jdGlvbicpID8gcFBhcnNlciA6IFxuXHRcdFx0XHRcdFx0KHR5cGVvZihwUGFyc2VyKSA9PT0gJ3N0cmluZycpID8gKCkgPT4geyByZXR1cm4gcFBhcnNlcjsgfSA6XG5cdFx0XHRcdFx0XHQocERhdGEpID0+IHsgcmV0dXJuIHBEYXRhOyB9O1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXb3JkVHJlZTtcbiJdfQ==
