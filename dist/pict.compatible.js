"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _get(){if(typeof Reflect!=="undefined"&&Reflect.get){_get=Reflect.get.bind();}else{_get=function _get(target,property,receiver){var base=_superPropBase(target,property);if(!base)return;var desc=Object.getOwnPropertyDescriptor(base,property);if(desc.get){return desc.get.call(arguments.length<3?target:receiver);}return desc.value;};}return _get.apply(this,arguments);}function _superPropBase(object,property){while(!Object.prototype.hasOwnProperty.call(object,property)){object=_getPrototypeOf(object);if(object===null)break;}return object;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});Object.defineProperty(subClass,"prototype",{writable:false});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}else if(call!==void 0){throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return _typeof(key)==="symbol"?key:String(key);}function _toPrimitive(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj;}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;},_typeof(obj);}(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.Pict=f();}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o;}return r;}()({1:[function(require,module,exports){'use strict';var eachOfLimit=require('async.util.eachoflimit');var withoutIndex=require('async.util.withoutindex');module.exports=function eachLimit(arr,limit,iterator,cb){return eachOfLimit(limit)(arr,withoutIndex(iterator),cb);};},{"async.util.eachoflimit":3,"async.util.withoutindex":14}],2:[function(require,module,exports){'use strict';module.exports=function(tasks){function makeCallback(index){function fn(){if(tasks.length){tasks[index].apply(null,arguments);}return fn.next();}fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null;};return fn;}return makeCallback(0);};},{}],3:[function(require,module,exports){var once=require('async.util.once');var noop=require('async.util.noop');var onlyOnce=require('async.util.onlyonce');var keyIterator=require('async.util.keyiterator');module.exports=function eachOfLimit(limit){return function(obj,iterator,cb){cb=once(cb||noop);obj=obj||[];var nextKey=keyIterator(obj);if(limit<=0){return cb(null);}var done=false;var running=0;var errored=false;(function replenish(){if(done&&running<=0){return cb(null);}while(running<limit&&!errored){var key=nextKey();if(key===null){done=true;if(running<=0){cb(null);}return;}running+=1;iterator(obj[key],key,onlyOnce(function(err){running-=1;if(err){cb(err);errored=true;}else{replenish();}}));}})();};};},{"async.util.keyiterator":7,"async.util.noop":9,"async.util.once":10,"async.util.onlyonce":11}],4:[function(require,module,exports){'use strict';var setImmediate=require('async.util.setimmediate');var restParam=require('async.util.restparam');module.exports=function(fn){return restParam(function(args){var callback=args.pop();args.push(function(){var innerArgs=arguments;if(sync){setImmediate(function(){callback.apply(null,innerArgs);});}else{callback.apply(null,innerArgs);}});var sync=true;fn.apply(this,args);sync=false;});};},{"async.util.restparam":12,"async.util.setimmediate":13}],5:[function(require,module,exports){'use strict';module.exports=Array.isArray||function isArray(obj){return Object.prototype.toString.call(obj)==='[object Array]';};},{}],6:[function(require,module,exports){'use strict';var isArray=require('async.util.isarray');module.exports=function isArrayLike(arr){return isArray(arr)||// has a positive integer length property
typeof arr.length==='number'&&arr.length>=0&&arr.length%1===0;};},{"async.util.isarray":5}],7:[function(require,module,exports){'use strict';var _keys=require('async.util.keys');var isArrayLike=require('async.util.isarraylike');module.exports=function keyIterator(coll){var i=-1;var len;var keys;if(isArrayLike(coll)){len=coll.length;return function next(){i++;return i<len?i:null;};}else{keys=_keys(coll);len=keys.length;return function next(){i++;return i<len?keys[i]:null;};}};},{"async.util.isarraylike":6,"async.util.keys":8}],8:[function(require,module,exports){'use strict';module.exports=Object.keys||function keys(obj){var _keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){_keys.push(k);}}return _keys;};},{}],9:[function(require,module,exports){'use strict';module.exports=function noop(){};},{}],10:[function(require,module,exports){'use strict';module.exports=function once(fn){return function(){if(fn===null)return;fn.apply(this,arguments);fn=null;};};},{}],11:[function(require,module,exports){'use strict';module.exports=function only_once(fn){return function(){if(fn===null)throw new Error('Callback was already called.');fn.apply(this,arguments);fn=null;};};},{}],12:[function(require,module,exports){'use strict';module.exports=function restParam(func,startIndex){startIndex=startIndex==null?func.length-1:+startIndex;return function(){var length=Math.max(arguments.length-startIndex,0);var rest=new Array(length);for(var index=0;index<length;index++){rest[index]=arguments[index+startIndex];}switch(startIndex){case 0:return func.call(this,rest);case 1:return func.call(this,arguments[0],rest);}};};},{}],13:[function(require,module,exports){(function(setImmediate){(function(){'use strict';var _setImmediate=typeof setImmediate==='function'&&setImmediate;var fallback=function fallback(fn){setTimeout(fn,0);};module.exports=function setImmediate(fn){// not a direct alias for IE10 compatibility
return(_setImmediate||fallback)(fn);};}).call(this);}).call(this,require("timers").setImmediate);},{"timers":99}],14:[function(require,module,exports){'use strict';module.exports=function withoutIndex(iterator){return function(value,index,callback){return iterator(value,callback);};};},{}],15:[function(require,module,exports){'use strict';var once=require('async.util.once');var noop=require('async.util.noop');var isArray=require('async.util.isarray');var restParam=require('async.util.restparam');var ensureAsync=require('async.util.ensureasync');var iterator=require('async.iterator');module.exports=function(tasks,cb){cb=once(cb||noop);if(!isArray(tasks))return cb(new Error('First argument to waterfall must be an array of functions'));if(!tasks.length)return cb();function wrapIterator(iterator){return restParam(function(err,args){if(err){cb.apply(null,[err].concat(args));}else{var next=iterator.next();if(next){args.push(wrapIterator(next));}else{args.push(cb);}ensureAsync(iterator).apply(null,args);}});}wrapIterator(iterator(tasks))();};},{"async.iterator":2,"async.util.ensureasync":4,"async.util.isarray":5,"async.util.noop":9,"async.util.once":10,"async.util.restparam":12}],16:[function(require,module,exports){},{}],17:[function(require,module,exports){/**
* Cache data structure with:
*  - enumerable items
*  - unique hash item access (if none is passed in, one is generated)
*  - size (length) expiration
*  - controllable expiration (e.g. keep in cache longer if older/less likely to change)
*  - time-based expiration
*  - custom expiration based on passed-in function
*
* Also:
*  - built to work well with browserify
*  - no dependencies at all
*  - pet friendly
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module CashMoney
*/ /**
* Quality Cache Goodness
*
* @class CashMoney
* @constructor
*/var libLinkedList=require("./LinkedList.js");var CashMoney=/*#__PURE__*/function(){function CashMoney(){_classCallCheck(this,CashMoney);// The map of node objects by hash because Reasons.
this._HashMap={};this._List=new libLinkedList();// If the list gets over maxLength, we will automatically remove nodes on insertion.
this.maxLength=0;// If cache entries get over this age, they are removed with prune
this.maxAge=0;}// Add (or update) a node in the cache
_createClass(CashMoney,[{key:"put",value:function put(pData,pHash){// If the hash of the record exists
if(this._HashMap.hasOwnProperty(pHash)){// Just update the hashed records datum
this._HashMap[pHash].Datum=pData;return this._HashMap[pHash].Datum;}var tmpNode=this._List.push(pData,pHash);this._HashMap[tmpNode.Hash]=tmpNode;// Automatically prune if over length, but only prune this nodes worth.
if(this.maxLength>0&&this._List.length>this.maxLength){// Pop it off the head of the list
tmpNode=this._List.pop();// Also remove it from the hashmap
delete this._HashMap[tmpNode.Hash];}// Now some expiration properties on the node metadata... namely the birthdate in ms of the node
tmpNode.Metadata.Created=+new Date();return tmpNode.Datum;}// Reinvigorate a node based on hash, updating the timestamp and moving it to the head of the list (also removes custom metadata)
},{key:"touch",value:function touch(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;// Get the old node out of the list
var tmpNode=this._List.remove(this._HashMap[pHash]);// Remove it from the hash map
delete this._HashMap[pHash];// Now put it back, fresh.
return this.put(tmpNode.Datum,tmpNode.Hash);}// Expire a cached record based on hash
},{key:"expire",value:function expire(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;var tmpNode=this._HashMap[pHash];// Remove it from the list of cached records
tmpNode=this._List.remove(tmpNode);// Also remove it from the hashmap
delete this._HashMap[tmpNode.Hash];// Return it in case the consumer wants to do anything with it
return tmpNode;}// Prune records from the cached set based on maxAge
},{key:"pruneBasedOnExpiration",value:function pruneBasedOnExpiration(fComplete,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;if(this.maxAge<1)return fComplete(tmpRemovedRecords);// Now enumerate each record and remove any that are expired
var tmpNow=+new Date();var tmpKeys=Object.keys(this._HashMap);for(var i=0;i<tmpKeys.length;i++){// Expire the node if it is older than max age milliseconds
if(tmpNow-this._HashMap[tmpKeys[i]].Metadata.Created>=this.maxAge)tmpRemovedRecords.push(this.expire(tmpKeys[i]));}fComplete(tmpRemovedRecords);}// Prune records from the cached set based on maxLength
},{key:"pruneBasedOnLength",value:function pruneBasedOnLength(fComplete,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;// Pop records off until we have reached maxLength unless it's 0
if(this.maxLength>0)while(this._List.length>this.maxLength)tmpRemovedRecords.push(this._List.pop());return fComplete(tmpRemovedRecords);}// Prune records from the cached set based on passed in pPruneFunction(pDatum, pHash, pNode) -- returning true expires it
},{key:"pruneCustom",value:function pruneCustom(fComplete,fPruneFunction,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;var tmpKeys=Object.keys(this._HashMap);for(var i=0;i<tmpKeys.length;i++){var tmpNode=this._HashMap[tmpKeys[i]];// Expire the node if the passed in function returns true
if(fPruneFunction(tmpNode.Datum,tmpNode.Hash,tmpNode))tmpRemovedRecords.push(this.expire(tmpKeys[i]));}fComplete(tmpRemovedRecords);}// Prune the list down to the asserted rules (max age then max length if still too long)
},{key:"prune",value:function prune(fComplete){var _this=this;var tmpRemovedRecords=[];// If there are no cached records, we are done.
if(this._List.length<1)return fComplete(tmpRemovedRecords);// Now prune based on expiration time
this.pruneBasedOnExpiration(function(fExpirationPruneComplete){// Now prune based on length, then return the removed records in the callback.
_this.pruneBasedOnLength(fComplete,tmpRemovedRecords);},tmpRemovedRecords);}// Read a datum by hash from the cache
},{key:"read",value:function read(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;return this._HashMap[pHash].Datum;}// Get a low level node (including metadata statistics) by hash from the cache
},{key:"getNode",value:function getNode(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;return this._HashMap[pHash];}}]);return CashMoney;}();module.exports=CashMoney;},{"./LinkedList.js":19}],18:[function(require,module,exports){/**
* Double Linked List Node
*
* @author Steven Velozo <steven@velozo.com>
* @module CashMoney
*/ /**
* Linked List Node Prototype
*
* @class LinkedListNode
* @constructor
*/var LinkedListNode=/*#__PURE__*/_createClass(function LinkedListNode(){_classCallCheck(this,LinkedListNode);this.Hash=false;this.Datum=false;// This is where expiration and other elements are stored;
this.Metadata={};this.LeftNode=false;this.RightNode=false;// To allow safe specialty operations on nodes
this.__ISNODE=true;});module.exports=LinkedListNode;},{}],19:[function(require,module,exports){"use strict";/**
* Simple double linked list to hold the cache entries in, in order.
*
* @author Steven Velozo <steven@velozo.com>
* @module FeeFiFo
*/var libLinkedListNode=require('./LinkedList-Node.js');/**
* Quality Cache Goodness
*
* @class CashMoney
* @constructor
*/var LinkedList=/*#__PURE__*/function(){function LinkedList(){_classCallCheck(this,LinkedList);// Total number of nodes ever processed by this ADT
this.totalNodes=0;// The length of the set of nodes currently in the list
this.length=0;this.head=false;this.tail=false;}// Create a node object.
_createClass(LinkedList,[{key:"initializeNode",value:function initializeNode(pDatum,pHash){// Don't allow undefined to be added to the list because of reasons
if(typeof pDatum==='undefined')return false;this.totalNodes++;// Get (or create) a unique hash
var tmpHash=typeof pHash!='undefined'?pHash:"NODE[".concat(this.totalNodes,"]");var tmpNode=new libLinkedListNode();tmpNode.Hash=tmpHash;tmpNode.Datum=pDatum;return tmpNode;}// Add a node to the end (right of tail) of the list.
},{key:"append",value:function append(pDatum,pHash){// TODO: Should we check if pDatum is actually a node and do the "right" thing?
var tmpNode=this.initializeNode(pDatum,pHash);if(!tmpNode)return false;// The list just got longer!
this.length++;// If the list was empty, create a new list from it (it isn't possible to have a tail with no head)
if(this.length==1){this.head=tmpNode;this.tail=tmpNode;return tmpNode;}this.tail.RightNode=tmpNode;tmpNode.LeftNode=this.tail;this.tail=tmpNode;return tmpNode;}// Append to tail of list (FIFO)
},{key:"push",value:function push(pDatum,pHash){return this.append(pDatum,pHash);}// Add a node to the beginning (left of head) of the list.
},{key:"prepend",value:function prepend(pDatum,pHash){// TODO: Should we check if pDatum is actually a node and do the "right" thing?
var tmpNode=this.initializeNode(pDatum,pHash);if(!tmpNode)return false;// The list just got longer!
this.length++;// If the list was empty, create a new list from it (it isn't possible to have a tail with no head)
if(this.length==1){this.head=tmpNode;this.tail=tmpNode;return tmpNode;}this.head.LeftNode=tmpNode;tmpNode.RightNode=this.head;this.head=tmpNode;return tmpNode;}// Remove a node from the list
},{key:"remove",value:function remove(pNode){if(typeof pNode==='undefined')return false;if(!pNode.__ISNODE)return false;this.length--;// Last element in list.  Empty it out.
if(this.length<1){this.head=false;this.tail=false;return pNode;}// It's somewhere in the middle, surgically remove it.
if(pNode.LeftNode&&pNode.RightNode){pNode.LeftNode.RightNode=pNode.RightNode;pNode.RightNode.LeftNode=pNode.LeftNode;pNode.RightNode=false;pNode.LeftNode=false;return pNode;}// It's the tail
if(pNode.LeftNode){pNode.LeftNode.RightNode=false;this.tail=pNode.LeftNode;pNode.LeftNode=false;return pNode;}// It must be the head
pNode.RightNode.LeftNode=false;this.head=pNode.RightNode;pNode.RightNode=false;return pNode;}// Remove the head of the list (FIFO)
},{key:"pop",value:function pop(){return this.remove(this.head);}// Enumerate over each node IN ORDER, running the function fAction(pDatum, pHash, fCallback) then calling the function fComplete callback when done
},{key:"each",value:function each(fAction,fComplete){var _this2=this;if(this.length<1)return fComplete();var tmpNode=false;var fIterator=function fIterator(pError){// If the user passed in a callback with an error, call their callback with the error
if(pError)return fComplete(pError);// If there is no node, this must be the initial run.
if(!tmpNode)tmpNode=_this2.head;// Check if we are at the tail of the list
else if(!tmpNode.RightNode)return fComplete();// Proceed to the next node
else tmpNode=tmpNode.RightNode;// Call the actual action
// I hate this pattern because long tails eventually cause stack overflows.
fAction(tmpNode.Datum,tmpNode.Hash,fIterator);};// Now kick off the iterator
return fIterator();}// Seek a specific node, 0 is the index of the first node.
},{key:"seek",value:function seek(pNodeIndex){if(!pNodeIndex)return false;if(this.length<1)return false;if(pNodeIndex>=this.length)return false;var tmpNode=this.head;for(var i=0;i<pNodeIndex;i++){tmpNode=tmpNode.RightNode;}return tmpNode;}}]);return LinkedList;}();module.exports=LinkedList;},{"./LinkedList-Node.js":18}],20:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/ /**
* Data Arithmatic
*
* @class DataArithmatic
*/var DataArithmatic=/*#__PURE__*/function(){function DataArithmatic(){_classCallCheck(this,DataArithmatic);// Regular Expressions (so they don't have to be recompiled every time)
// These could be defined as static, but I'm not sure if that will work with browserify ... and specifically the QT browser.
this._Regex_formatterInsertCommas=/.{1,3}/g;// Match Function:
// function(pMatch, pSign, pZeros, pBefore, pDecimal, pAfter)
// Thoughts about below:   /^([+-]?)(0*)(\d+)(\.(\d+))?$/;
this._Regex_formatterAddCommasToNumber=/^([-+]?)(0?)(\d+)(.?)(\d+)$/g;this._Regex_formatterDollarsRemoveCommas=/,/gi;this._Regex_formatterCleanNonAlpha=/[^a-z0-9]/gi;// TODO: Potentially pull these in from a configuration.
// TODO: Use locale data for this if it's defaults all the way down.
this._Value_MoneySign_Currency='$';this._Value_NaN_Currency='--';this._Value_GroupSeparator_Number=',';this._Value_Prefix_StringHash='HSH';this._Value_Clean_formatterCleanNonAlpha='_';this._UseEngineStringStartsWith=typeof String.prototype.startsWith==='function';this._UseEngineStringEndsWith=typeof String.prototype.endsWith==='function';}/*************************************************************************
	 * String Manipulation and Comparison Functions
	 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/ /**
	 * Reverse a string
	 *
	 * @param {string} pString - The string to reverse
	 * @returns {string}
	 */_createClass(DataArithmatic,[{key:"stringReverse",value:function stringReverse(pString){// TODO: Benchmark if there are faster ways we want to do this with all the newer JS stuff
//       ... and if it will work with browserify in a clean way.
return pString.split('').reverse().join('');}/**
	 * Test if a string starts with a given substring.
	 *
	 * @param {*} pString
	 * @param {*} pSearchString
	 * @param {*} pStartIndex
	 * @returns {*}
	 */},{key:"stringStartsWith",value:function stringStartsWith(pString,pSearchString,pStartIndex){if(this._UseEngineStringStartsWith){return pString.startsWith(pSearchString,pStartIndex);}else{return this.stringStartsWith_Polyfill.call(pString,pSearchString,pStartIndex);}}/**
	 * Check if a string starts with a given substring.  This is a safe polyfill for the ES6 string.startsWith() function.
	 *
	 * @param {*} pSearchString - The string to search for
	 * @param {*} pStartIndex - The index to start the search at
	 * @returns {boolean}
	 */},{key:"stringStartsWith_Polyfill",value:function stringStartsWith_Polyfill(pSearchString,pStartIndex){return this.slice(pStartIndex||0,pSearchString.length)===pSearchString;}/**
	 * Test if a string starts with a given substring.
	 *
	 * @param {*} pString
	 * @param {*} pSearchString
	 * @param {*} pEndIndex
	 * @returns {*}
	 */},{key:"stringEndsWith",value:function stringEndsWith(pString,pSearchString,pEndIndex){if(this._UseEngineStringEndsWith){return pString.endsWith(pSearchString,pEndIndex);}else{return this.stringEndsWith_Polyfill.call(pString,pSearchString,pEndIndex);}}/**
	 * Check if a string starts with a given substring.  This is a safe polyfill for the ES6 string.startsWith() function.
	 *
	 * @param {*} pSearchString - The string to search for
	 * @param {*} pEndIndex - The index to end the search at
	 * @returns {boolean}
	 */},{key:"stringEndsWith_Polyfill",value:function stringEndsWith_Polyfill(pSearchString,pEndIndex){// This works much better than >= because
// it compensates for NaN:
if(!(pEndIndex<this.length)){pEndIndex=this.length;}else{pEndIndex|=0;// round position
}return this.substr(pEndIndex-pSearchString.length,pSearchString.length)===pSearchString;}/**
	 * Generate an insecure string hash.  Not meant to be secure, just a quick way to generate a hash for a string.  This is not a cryptographic hash.  Additional warranty and disclaimer ... this is not for passwords!
	 *
	 * @param {string} pString
	 * @returns {string}
	 */},{key:"insecureStringHash",value:function insecureStringHash(pString){var tmpHash=0;var tmpStringLength=pString.length;var tmpCharacterIndex=0;while(tmpCharacterIndex<tmpStringLength){tmpHash=(tmpHash<<5)-tmpHash+pString.charCodeAt(tmpCharacterIndex++)|0;}return"".concat(this._Value_Prefix_StringHash).concat(tmpHash);}/**
	 * Clean wrapping characters if they exist consistently around the string.  If they do not, the string is returned unchanged.
	 *
	 * @param {string} pWrapCharacter - The character expected as the wrapping character
	 * @param {string} pString - the string to clean
	 * @returns {string}
	 */},{key:"cleanEnclosureWrapCharacters",value:function cleanEnclosureWrapCharacters(pWrapCharacter,pString){// # Use case from ManyFest DSL:
//
// When a boxed property is passed in, it should have quotes of some
// kind around it.
//
// For instance:
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// This function is necessary to remove the wrapping quotes before object
// resolution can occur.
if(pString.startsWith(pWrapCharacter)&&pString.endsWith(pWrapCharacter)){return pString.substring(1,pString.length-1);}else{return pString;}}/**
	 *
	 * @param {*} pString
	 * @returns
	 */},{key:"cleanNonAlphaCharacters",value:function cleanNonAlphaCharacters(pString){if(typeof pString=='string'&&pString!=''){return pString.replace(this._Regex_formatterCleanNonAlpha,this._Value_Clean_formatterCleanNonAlpha);}}/*************************************************************************
	 * Number Formatting Functions
	 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/ /**
	 * Insert commas every 3 characters from the right.  Used by formatterAddCommasToNumber().
	 *
	 * @param {*} pString
	 * @returns {*}
	 */},{key:"formatterInsertCommas",value:function formatterInsertCommas(pString){// Reverse, because it's easier to do things from the left, given arbitrary digit counts
var tmpReversed=this.stringReverse(pString);// Add commas every three characters
var tmpReversedWithCommas=tmpReversed.match(this._Regex_formatterInsertCommas).join(',');// Reverse again (back to normal direction)
return this.stringReverse(tmpReversedWithCommas);}},{key:"processAddCommasToNumberRegex",value:function processAddCommasToNumberRegex(pMatch,pSign,pZeros,pBefore,pDecimal,pAfter){// If there was no decimal, the last capture grabs the final digit, so
// we have to put it back together with the 'before' substring
return pSign+(pDecimal?this.formatterInsertCommas(pBefore)+pDecimal+pAfter:this.formatterInsertCommas(pBefore+pAfter));}/**
	 * Add Commas to a Number for readability.
	 *
	 * @param {*} pNumber
	 * @returns {string}
	 */},{key:"formatterAddCommasToNumber",value:function formatterAddCommasToNumber(pNumber){// If the regex doesn't match, `replace` returns the string unmodified
return pNumber.toString().replace(this._Regex_formatterAddCommasToNumber,this.processAddCommasToNumberRegex.bind(this));}/**
	 * This will take a number and format it as a dollar string.  It will also add commas to the number.  If the number is not a number, it will return '--'.
	 *
	 * @param {*} pValue
	 * @returns {string}
	 */},{key:"formatterDollars",value:function formatterDollars(pValue){var tmpDollarAmount=parseFloat(pValue).toFixed(2);if(isNaN(tmpDollarAmount)){// Try again and see if what was passed in was a dollars string.
if(typeof pValue=='string'){// TODO: Better rounding function?  This is a hack to get rid of the currency symbol and commas.
tmpDollarAmount=parseFloat(pValue.replace(this._Value_MoneySign_Currency,'').replace(this._Regex_formatterDollarsRemoveCommas,'')).toFixed(2);}// If we didn't get a number, return the "not a number" string.
if(isNaN(tmpDollarAmount)){return this._Value_NaN_Currency;}}// TODO: Get locale data and use that for this stuff.
return"$".concat(this.formatterAddCommasToNumber(tmpDollarAmount));}/**
	 * Round a number to a certain number of digits.  If the number is not a number, it will return 0.  If no digits are specified, it will default to 2 significant digits.
	 *
	 * @param {*} pValue
	 * @param {number} pDigits
	 * @returns {string}
	 */},{key:"formatterRoundNumber",value:function formatterRoundNumber(pValue,pDigits){var tmpDigits=typeof pDigits=='undefined'?2:pDigits;var tmpValue=parseFloat(pValue).toFixed(tmpDigits);if(isNaN(tmpValue)){var tmpZed=0;return tmpZed.toFixed(tmpDigits);}else{return tmpValue;}}/*************************************************************************
	 * String Tokenization Functions
	 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/ /**
	 * Return the string before the matched substring.
	 *
	 * If the substring is not found, the entire string is returned.  This only deals with the *first* match.
	 *
	 * @param {string} pString
	 * @param {string} pMatch
	 * @returns {string}
	 */},{key:"stringBeforeMatch",value:function stringBeforeMatch(pString,pMatch){return pString.split(pMatch)[0];}/**
	 * Return the string after the matched substring.
	 *
	 * If the substring is not found, an empty string is returned.  This only deals with the *first* match.
	 *
	 * @param {string} pString
	 * @param {string} pMatch
	 * @returns {string}
	 */},{key:"stringAfterMatch",value:function stringAfterMatch(pString,pMatch){var tmpStringSplitLocation=pString.indexOf(pMatch);if(tmpStringSplitLocation<0||tmpStringSplitLocation+pMatch.length>=pString.length){return'';}return pString.substring(tmpStringSplitLocation+pMatch.length);}/**
	 * Count the number of enclosures in a string based on the start and end characters.
	 *
	 * If no start or end characters are specified, it will default to parentheses.  If the string is not a string, it will return 0.
	 *
	 * @param {string} pString
	 * @param {string} pEnclosureStart
	 * @param {string} pEnclosureEnd
	 * @returns the count of full in the string
	 */},{key:"stringCountEnclosures",value:function stringCountEnclosures(pString,pEnclosureStart,pEnclosureEnd){var tmpString=typeof pString=='string'?pString:'';var tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';var tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';var tmpEnclosureCount=0;var tmpEnclosureDepth=0;for(var i=0;i<tmpString.length;i++){// This is the start of an enclosure
if(tmpString[i]==tmpEnclosureStart){if(tmpEnclosureDepth==0){tmpEnclosureCount++;}tmpEnclosureDepth++;}else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;}}return tmpEnclosureCount;}/**
	 * Get the value of the enclosure at the specified index.
	 *
	 * If the index is not a number, it will default to 0.  If the string is not a string, it will return an empty string.  If the enclosure is not found, it will return an empty string.  If the enclosure
	 *
	 * @param {string} pString
	 * @param {number} pEnclosureIndexToGet
	 * @param {string} pEnclosureStart
	 * @param {string}} pEnclosureEnd
	 * @returns {string}
	 */},{key:"stringGetEnclosureValueByIndex",value:function stringGetEnclosureValueByIndex(pString,pEnclosureIndexToGet,pEnclosureStart,pEnclosureEnd){var tmpString=typeof pString=='string'?pString:'';var tmpEnclosureIndexToGet=typeof pEnclosureIndexToGet=='number'?pEnclosureIndexToGet:0;var tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';var tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';var tmpEnclosureCount=0;var tmpEnclosureDepth=0;var tmpMatchedEnclosureIndex=false;var tmpEnclosedValueStartIndex=0;var tmpEnclosedValueEndIndex=0;for(var i=0;i<tmpString.length;i++){// This is the start of an enclosure
if(tmpString[i]==tmpEnclosureStart){tmpEnclosureDepth++;// Only count enclosures at depth 1, but still this parses both pairs of all of them.
if(tmpEnclosureDepth==1){tmpEnclosureCount++;if(tmpEnclosureIndexToGet==tmpEnclosureCount-1){// This is the start of *the* enclosure
tmpMatchedEnclosureIndex=true;tmpEnclosedValueStartIndex=i;}}}// This is the end of an enclosure
else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;// Again, only count enclosures at depth 1, but still this parses both pairs of all of them.
if(tmpEnclosureDepth==0&&tmpMatchedEnclosureIndex&&tmpEnclosedValueEndIndex<=tmpEnclosedValueStartIndex){tmpEnclosedValueEndIndex=i;tmpMatchedEnclosureIndex=false;}}}if(tmpEnclosureCount<=tmpEnclosureIndexToGet){// Return an empty string if the enclosure is not found
return'';}if(tmpEnclosedValueEndIndex>0&&tmpEnclosedValueEndIndex>tmpEnclosedValueStartIndex){return tmpString.substring(tmpEnclosedValueStartIndex+1,tmpEnclosedValueEndIndex);}else{return tmpString.substring(tmpEnclosedValueStartIndex+1);}}/**
	 * Remove an enclosure from a string based on the index of the enclosure.
	 *
	 * @param {string} pString
	 * @param {number} pEnclosureIndexToRemove
	 * @param {number} pEnclosureStart
	 * @param {number} pEnclosureEnd
	 * @returns {string}
	 */},{key:"stringRemoveEnclosureByIndex",value:function stringRemoveEnclosureByIndex(pString,pEnclosureIndexToRemove,pEnclosureStart,pEnclosureEnd){var tmpString=typeof pString=='string'?pString:'';var tmpEnclosureIndexToRemove=typeof pEnclosureIndexToRemove=='number'?pEnclosureIndexToRemove:0;var tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';var tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';var tmpEnclosureCount=0;var tmpEnclosureDepth=0;var tmpMatchedEnclosureIndex=false;var tmpEnclosureStartIndex=0;var tmpEnclosureEndIndex=0;for(var i=0;i<tmpString.length;i++){// This is the start of an enclosure
if(tmpString[i]==tmpEnclosureStart){tmpEnclosureDepth++;if(tmpEnclosureDepth==1){tmpEnclosureCount++;if(tmpEnclosureIndexToRemove==tmpEnclosureCount-1){tmpMatchedEnclosureIndex=true;tmpEnclosureStartIndex=i;}}}else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;if(tmpEnclosureDepth==0&&tmpMatchedEnclosureIndex&&tmpEnclosureEndIndex<=tmpEnclosureStartIndex){tmpEnclosureEndIndex=i;tmpMatchedEnclosureIndex=false;}}}if(tmpEnclosureCount<=tmpEnclosureIndexToRemove){return tmpString;}var tmpReturnString='';if(tmpEnclosureStartIndex>1){tmpReturnString=tmpString.substring(0,tmpEnclosureStartIndex);}if(tmpString.length>tmpEnclosureEndIndex+1&&tmpEnclosureEndIndex>tmpEnclosureStartIndex){tmpReturnString+=tmpString.substring(tmpEnclosureEndIndex+1);}return tmpReturnString;}}]);return DataArithmatic;}();module.exports=DataArithmatic;},{}],21:[function(require,module,exports){;(function(globalScope){'use strict';/*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */ // -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //
// The maximum exponent magnitude.
// The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
var EXP_LIMIT=9e15,// 0 to 9e15
// The limit on the value of `precision`, and on the value of the first argument to
// `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
MAX_DIGITS=1e9,// 0 to 1e9
// Base conversion alphabet.
NUMERALS='0123456789abcdef',// The natural logarithm of 10 (1025 digits).
LN10='2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',// Pi (1025 digits).
PI='3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',// The initial configuration properties of the Decimal constructor.
DEFAULTS={// These values must be integers within the stated ranges (inclusive).
// Most of these values can be changed at run-time using the `Decimal.config` method.
// The maximum number of significant digits of the result of a calculation or base conversion.
// E.g. `Decimal.config({ precision: 20 });`
precision:20,// 1 to MAX_DIGITS
// The rounding mode used when rounding to `precision`.
//
// ROUND_UP         0 Away from zero.
// ROUND_DOWN       1 Towards zero.
// ROUND_CEIL       2 Towards +Infinity.
// ROUND_FLOOR      3 Towards -Infinity.
// ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
// ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
// ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
// ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
// ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
//
// E.g.
// `Decimal.rounding = 4;`
// `Decimal.rounding = Decimal.ROUND_HALF_UP;`
rounding:4,// 0 to 8
// The modulo mode used when calculating the modulus: a mod n.
// The quotient (q = a / n) is calculated according to the corresponding rounding mode.
// The remainder (r) is calculated as: r = a - n * q.
//
// UP         0 The remainder is positive if the dividend is negative, else is negative.
// DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
// FLOOR      3 The remainder has the same sign as the divisor (Python %).
// HALF_EVEN  6 The IEEE 754 remainder function.
// EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
//
// Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
// division (9) are commonly used for the modulus operation. The other rounding modes can also
// be used, but they may not give useful results.
modulo:1,// 0 to 9
// The exponent value at and beneath which `toString` returns exponential notation.
// JavaScript numbers: -7
toExpNeg:-7,// 0 to -EXP_LIMIT
// The exponent value at and above which `toString` returns exponential notation.
// JavaScript numbers: 21
toExpPos:21,// 0 to EXP_LIMIT
// The minimum exponent value, beneath which underflow to zero occurs.
// JavaScript numbers: -324  (5e-324)
minE:-EXP_LIMIT,// -1 to -EXP_LIMIT
// The maximum exponent value, above which overflow to Infinity occurs.
// JavaScript numbers: 308  (1.7976931348623157e+308)
maxE:EXP_LIMIT,// 1 to EXP_LIMIT
// Whether to use cryptographically-secure random number generation, if available.
crypto:false// true/false
},// ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //
Decimal,inexact,noConflict,quadrant,external=true,decimalError='[DecimalError] ',invalidArgument=decimalError+'Invalid argument: ',precisionLimitExceeded=decimalError+'Precision limit exceeded',cryptoUnavailable=decimalError+'crypto unavailable',tag='[object Decimal]',mathfloor=Math.floor,mathpow=Math.pow,isBinary=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,isHex=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,isOctal=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,isDecimal=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,BASE=1e7,LOG_BASE=7,MAX_SAFE_INTEGER=9007199254740991,LN10_PRECISION=LN10.length-1,PI_PRECISION=PI.length-1,// Decimal.prototype object
P={toStringTag:tag};// Decimal prototype methods
/*
   *  absoluteValue             abs
   *  ceil
   *  clampedTo                 clamp
   *  comparedTo                cmp
   *  cosine                    cos
   *  cubeRoot                  cbrt
   *  decimalPlaces             dp
   *  dividedBy                 div
   *  dividedToIntegerBy        divToInt
   *  equals                    eq
   *  floor
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyperbolicCosine          cosh
   *  hyperbolicSine            sinh
   *  hyperbolicTangent         tanh
   *  inverseCosine             acos
   *  inverseHyperbolicCosine   acosh
   *  inverseHyperbolicSine     asinh
   *  inverseHyperbolicTangent  atanh
   *  inverseSine               asin
   *  inverseTangent            atan
   *  isFinite
   *  isInteger                 isInt
   *  isNaN
   *  isNegative                isNeg
   *  isPositive                isPos
   *  isZero
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 log
   *  [maximum]                 [max]
   *  [minimum]                 [min]
   *  minus                     sub
   *  modulo                    mod
   *  naturalExponential        exp
   *  naturalLogarithm          ln
   *  negated                   neg
   *  plus                      add
   *  precision                 sd
   *  round
   *  sine                      sin
   *  squareRoot                sqrt
   *  tangent                   tan
   *  times                     mul
   *  toBinary
   *  toDecimalPlaces           toDP
   *  toExponential
   *  toFixed
   *  toFraction
   *  toHexadecimal             toHex
   *  toNearest
   *  toNumber
   *  toOctal
   *  toPower                   pow
   *  toPrecision
   *  toSignificantDigits       toSD
   *  toString
   *  truncated                 trunc
   *  valueOf                   toJSON
   */ /*
   * Return a new Decimal whose value is the absolute value of this Decimal.
   *
   */P.absoluteValue=P.abs=function(){var x=new this.constructor(this);if(x.s<0)x.s=1;return finalise(x);};/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of positive Infinity.
   *
   */P.ceil=function(){return finalise(new this.constructor(this),this.e+1,2);};/*
   * Return a new Decimal whose value is the value of this Decimal clamped to the range
   * delineated by `min` and `max`.
   *
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */P.clampedTo=P.clamp=function(min,max){var k,x=this,Ctor=x.constructor;min=new Ctor(min);max=new Ctor(max);if(!min.s||!max.s)return new Ctor(NaN);if(min.gt(max))throw Error(invalidArgument+max);k=x.cmp(min);return k<0?min:x.cmp(max)>0?max:new Ctor(x);};/*
   * Return
   *   1    if the value of this Decimal is greater than the value of `y`,
   *  -1    if the value of this Decimal is less than the value of `y`,
   *   0    if they have the same value,
   *   NaN  if the value of either Decimal is NaN.
   *
   */P.comparedTo=P.cmp=function(y){var i,j,xdL,ydL,x=this,xd=x.d,yd=(y=new x.constructor(y)).d,xs=x.s,ys=y.s;// Either NaN or ±Infinity?
if(!xd||!yd){return!xs||!ys?NaN:xs!==ys?xs:xd===yd?0:!xd^xs<0?1:-1;}// Either zero?
if(!xd[0]||!yd[0])return xd[0]?xs:yd[0]?-ys:0;// Signs differ?
if(xs!==ys)return xs;// Compare exponents.
if(x.e!==y.e)return x.e>y.e^xs<0?1:-1;xdL=xd.length;ydL=yd.length;// Compare digit by digit.
for(i=0,j=xdL<ydL?xdL:ydL;i<j;++i){if(xd[i]!==yd[i])return xd[i]>yd[i]^xs<0?1:-1;}// Compare lengths.
return xdL===ydL?0:xdL>ydL^xs<0?1:-1;};/*
   * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * cos(0)         = 1
   * cos(-0)        = 1
   * cos(Infinity)  = NaN
   * cos(-Infinity) = NaN
   * cos(NaN)       = NaN
   *
   */P.cosine=P.cos=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.d)return new Ctor(NaN);// cos(0) = cos(-0) = 1
if(!x.d[0])return new Ctor(1);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+LOG_BASE;Ctor.rounding=1;x=cosine(Ctor,toLessThanHalfPi(Ctor,x));Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant==2||quadrant==3?x.neg():x,pr,rm,true);};/*
   *
   * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   *  cbrt(0)  =  0
   *  cbrt(-0) = -0
   *  cbrt(1)  =  1
   *  cbrt(-1) = -1
   *  cbrt(N)  =  N
   *  cbrt(-I) = -I
   *  cbrt(I)  =  I
   *
   * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
   *
   */P.cubeRoot=P.cbrt=function(){var e,m,n,r,rep,s,sd,t,t3,t3plusx,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);external=false;// Initial estimate.
s=x.s*mathpow(x.s*x,1/3);// Math.cbrt underflow/overflow?
// Pass x to Math.pow as integer, then adjust the exponent of the result.
if(!s||Math.abs(s)==1/0){n=digitsToString(x.d);e=x.e;// Adjust n exponent so it is a multiple of 3 away from x exponent.
if(s=(e-n.length+1)%3)n+=s==1||s==-2?'0':'00';s=mathpow(n,1/3);// Rarely, e may be one less than the result exponent value.
e=mathfloor((e+1)/3)-(e%3==(e<0?-1:2));if(s==1/0){n='5e'+e;}else{n=s.toExponential();n=n.slice(0,n.indexOf('e')+1)+e;}r=new Ctor(n);r.s=x.s;}else{r=new Ctor(s.toString());}sd=(e=Ctor.precision)+3;// Halley's method.
// TODO? Compare Newton's method.
for(;;){t=r;t3=t.times(t).times(t);t3plusx=t3.plus(x);r=divide(t3plusx.plus(x).times(t),t3plusx.plus(t3),sd+2,1);// TODO? Replace with for-loop and checkRoundingDigits.
if(digitsToString(t.d).slice(0,sd)===(n=digitsToString(r.d)).slice(0,sd)){n=n.slice(sd-3,sd+1);// The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
// , i.e. approaching a rounding boundary, continue the iteration.
if(n=='9999'||!rep&&n=='4999'){// On the first iteration only, check to see if rounding up gives the exact result as the
// nines may infinitely repeat.
if(!rep){finalise(t,e+1,0);if(t.times(t).times(t).eq(x)){r=t;break;}}sd+=4;rep=1;}else{// If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
// If not, then there are further digits and m will be truthy.
if(!+n||!+n.slice(1)&&n.charAt(0)=='5'){// Truncate to the first rounding digit.
finalise(r,e+1,1);m=!r.times(r).times(r).eq(x);}break;}}}external=true;return finalise(r,e,Ctor.rounding,m);};/*
   * Return the number of decimal places of the value of this Decimal.
   *
   */P.decimalPlaces=P.dp=function(){var w,d=this.d,n=NaN;if(d){w=d.length-1;n=(w-mathfloor(this.e/LOG_BASE))*LOG_BASE;// Subtract the number of trailing zeros of the last word.
w=d[w];if(w)for(;w%10==0;w/=10)n--;if(n<0)n=0;}return n;};/*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   */P.dividedBy=P.div=function(y){return divide(this,new this.constructor(y));};/*
   * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
   * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */P.dividedToIntegerBy=P.divToInt=function(y){var x=this,Ctor=x.constructor;return finalise(divide(x,new Ctor(y),0,1,1),Ctor.precision,Ctor.rounding);};/*
   * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
   *
   */P.equals=P.eq=function(y){return this.cmp(y)===0;};/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
   * direction of negative Infinity.
   *
   */P.floor=function(){return finalise(new this.constructor(this),this.e+1,3);};/*
   * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
   * false.
   *
   */P.greaterThan=P.gt=function(y){return this.cmp(y)>0;};/*
   * Return true if the value of this Decimal is greater than or equal to the value of `y`,
   * otherwise return false.
   *
   */P.greaterThanOrEqualTo=P.gte=function(y){var k=this.cmp(y);return k==1||k===0;};/*
   * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [1, Infinity]
   *
   * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
   *
   * cosh(0)         = 1
   * cosh(-0)        = 1
   * cosh(Infinity)  = Infinity
   * cosh(-Infinity) = Infinity
   * cosh(NaN)       = NaN
   *
   *  x        time taken (ms)   result
   * 1000      9                 9.8503555700852349694e+433
   * 10000     25                4.4034091128314607936e+4342
   * 100000    171               1.4033316802130615897e+43429
   * 1000000   3817              1.5166076984010437725e+434294
   * 10000000  abandoned after 2 minute wait
   *
   * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
   *
   */P.hyperbolicCosine=P.cosh=function(){var k,n,pr,rm,len,x=this,Ctor=x.constructor,one=new Ctor(1);if(!x.isFinite())return new Ctor(x.s?1/0:NaN);if(x.isZero())return one;pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+4;Ctor.rounding=1;len=x.d.length;// Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
// i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))
// Estimate the optimum number of times to use the argument reduction.
// TODO? Estimation reused from cosine() and may not be optimal here.
if(len<32){k=Math.ceil(len/3);n=(1/tinyPow(4,k)).toString();}else{k=16;n='2.3283064365386962890625e-10';}x=taylorSeries(Ctor,1,x.times(n),new Ctor(1),true);// Reverse argument reduction
var cosh2_x,i=k,d8=new Ctor(8);for(;i--;){cosh2_x=x.times(x);x=one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));}return finalise(x,Ctor.precision=pr,Ctor.rounding=rm,true);};/*
   * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
   *
   * sinh(0)         = 0
   * sinh(-0)        = -0
   * sinh(Infinity)  = Infinity
   * sinh(-Infinity) = -Infinity
   * sinh(NaN)       = NaN
   *
   * x        time taken (ms)
   * 10       2 ms
   * 100      5 ms
   * 1000     14 ms
   * 10000    82 ms
   * 100000   886 ms            1.4033316802130615897e+43429
   * 200000   2613 ms
   * 300000   5407 ms
   * 400000   8824 ms
   * 500000   13026 ms          8.7080643612718084129e+217146
   * 1000000  48543 ms
   *
   * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
   *
   */P.hyperbolicSine=P.sinh=function(){var k,pr,rm,len,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+4;Ctor.rounding=1;len=x.d.length;if(len<3){x=taylorSeries(Ctor,2,x,x,true);}else{// Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
// i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
// 3 multiplications and 1 addition
// Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
// i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
// 4 multiplications and 2 additions
// Estimate the optimum number of times to use the argument reduction.
k=1.4*Math.sqrt(len);k=k>16?16:k|0;x=x.times(1/tinyPow(5,k));x=taylorSeries(Ctor,2,x,x,true);// Reverse argument reduction
var sinh2_x,d5=new Ctor(5),d16=new Ctor(16),d20=new Ctor(20);for(;k--;){sinh2_x=x.times(x);x=x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));}}Ctor.precision=pr;Ctor.rounding=rm;return finalise(x,pr,rm,true);};/*
   * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * tanh(x) = sinh(x) / cosh(x)
   *
   * tanh(0)         = 0
   * tanh(-0)        = -0
   * tanh(Infinity)  = 1
   * tanh(-Infinity) = -1
   * tanh(NaN)       = NaN
   *
   */P.hyperbolicTangent=P.tanh=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(x.s);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+7;Ctor.rounding=1;return divide(x.sinh(),x.cosh(),Ctor.precision=pr,Ctor.rounding=rm);};/*
   * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
   * this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [0, pi]
   *
   * acos(x) = pi/2 - asin(x)
   *
   * acos(0)       = pi/2
   * acos(-0)      = pi/2
   * acos(1)       = 0
   * acos(-1)      = pi
   * acos(1/2)     = pi/3
   * acos(-1/2)    = 2*pi/3
   * acos(|x| > 1) = NaN
   * acos(NaN)     = NaN
   *
   */P.inverseCosine=P.acos=function(){var halfPi,x=this,Ctor=x.constructor,k=x.abs().cmp(1),pr=Ctor.precision,rm=Ctor.rounding;if(k!==-1){return k===0// |x| is 1
?x.isNeg()?getPi(Ctor,pr,rm):new Ctor(0)// |x| > 1 or x is NaN
:new Ctor(NaN);}if(x.isZero())return getPi(Ctor,pr+4,rm).times(0.5);// TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3
Ctor.precision=pr+6;Ctor.rounding=1;x=x.asin();halfPi=getPi(Ctor,pr+4,rm).times(0.5);Ctor.precision=pr;Ctor.rounding=rm;return halfPi.minus(x);};/*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
   * value of this Decimal.
   *
   * Domain: [1, Infinity]
   * Range: [0, Infinity]
   *
   * acosh(x) = ln(x + sqrt(x^2 - 1))
   *
   * acosh(x < 1)     = NaN
   * acosh(NaN)       = NaN
   * acosh(Infinity)  = Infinity
   * acosh(-Infinity) = NaN
   * acosh(0)         = NaN
   * acosh(-0)        = NaN
   * acosh(1)         = 0
   * acosh(-1)        = NaN
   *
   */P.inverseHyperbolicCosine=P.acosh=function(){var pr,rm,x=this,Ctor=x.constructor;if(x.lte(1))return new Ctor(x.eq(1)?0:NaN);if(!x.isFinite())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(Math.abs(x.e),x.sd())+4;Ctor.rounding=1;external=false;x=x.times(x).minus(1).sqrt().plus(x);external=true;Ctor.precision=pr;Ctor.rounding=rm;return x.ln();};/*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * asinh(x) = ln(x + sqrt(x^2 + 1))
   *
   * asinh(NaN)       = NaN
   * asinh(Infinity)  = Infinity
   * asinh(-Infinity) = -Infinity
   * asinh(0)         = 0
   * asinh(-0)        = -0
   *
   */P.inverseHyperbolicSine=P.asinh=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+2*Math.max(Math.abs(x.e),x.sd())+6;Ctor.rounding=1;external=false;x=x.times(x).plus(1).sqrt().plus(x);external=true;Ctor.precision=pr;Ctor.rounding=rm;return x.ln();};/*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
   * value of this Decimal.
   *
   * Domain: [-1, 1]
   * Range: [-Infinity, Infinity]
   *
   * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
   *
   * atanh(|x| > 1)   = NaN
   * atanh(NaN)       = NaN
   * atanh(Infinity)  = NaN
   * atanh(-Infinity) = NaN
   * atanh(0)         = 0
   * atanh(-0)        = -0
   * atanh(1)         = Infinity
   * atanh(-1)        = -Infinity
   *
   */P.inverseHyperbolicTangent=P.atanh=function(){var pr,rm,wpr,xsd,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.e>=0)return new Ctor(x.abs().eq(1)?x.s/0:x.isZero()?x:NaN);pr=Ctor.precision;rm=Ctor.rounding;xsd=x.sd();if(Math.max(xsd,pr)<2*-x.e-1)return finalise(new Ctor(x),pr,rm,true);Ctor.precision=wpr=xsd-x.e;x=divide(x.plus(1),new Ctor(1).minus(x),wpr+pr,1);Ctor.precision=pr+4;Ctor.rounding=1;x=x.ln();Ctor.precision=pr;Ctor.rounding=rm;return x.times(0.5);};/*
   * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
   * Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
   *
   * asin(0)       = 0
   * asin(-0)      = -0
   * asin(1/2)     = pi/6
   * asin(-1/2)    = -pi/6
   * asin(1)       = pi/2
   * asin(-1)      = -pi/2
   * asin(|x| > 1) = NaN
   * asin(NaN)     = NaN
   *
   * TODO? Compare performance of Taylor series.
   *
   */P.inverseSine=P.asin=function(){var halfPi,k,pr,rm,x=this,Ctor=x.constructor;if(x.isZero())return new Ctor(x);k=x.abs().cmp(1);pr=Ctor.precision;rm=Ctor.rounding;if(k!==-1){// |x| is 1
if(k===0){halfPi=getPi(Ctor,pr+4,rm).times(0.5);halfPi.s=x.s;return halfPi;}// |x| > 1 or x is NaN
return new Ctor(NaN);}// TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6
Ctor.precision=pr+6;Ctor.rounding=1;x=x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();Ctor.precision=pr;Ctor.rounding=rm;return x.times(2);};/*
   * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
   * of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi/2, pi/2]
   *
   * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   *
   * atan(0)         = 0
   * atan(-0)        = -0
   * atan(1)         = pi/4
   * atan(-1)        = -pi/4
   * atan(Infinity)  = pi/2
   * atan(-Infinity) = -pi/2
   * atan(NaN)       = NaN
   *
   */P.inverseTangent=P.atan=function(){var i,j,k,n,px,t,r,wpr,x2,x=this,Ctor=x.constructor,pr=Ctor.precision,rm=Ctor.rounding;if(!x.isFinite()){if(!x.s)return new Ctor(NaN);if(pr+4<=PI_PRECISION){r=getPi(Ctor,pr+4,rm).times(0.5);r.s=x.s;return r;}}else if(x.isZero()){return new Ctor(x);}else if(x.abs().eq(1)&&pr+4<=PI_PRECISION){r=getPi(Ctor,pr+4,rm).times(0.25);r.s=x.s;return r;}Ctor.precision=wpr=pr+10;Ctor.rounding=1;// TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);
// Argument reduction
// Ensure |x| < 0.42
// atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))
k=Math.min(28,wpr/LOG_BASE+2|0);for(i=k;i;--i)x=x.div(x.times(x).plus(1).sqrt().plus(1));external=false;j=Math.ceil(wpr/LOG_BASE);n=1;x2=x.times(x);r=new Ctor(x);px=x;// atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
for(;i!==-1;){px=px.times(x2);t=r.minus(px.div(n+=2));px=px.times(x2);r=t.plus(px.div(n+=2));if(r.d[j]!==void 0)for(i=j;r.d[i]===t.d[i]&&i--;);}if(k)r=r.times(2<<k-1);external=true;return finalise(r,Ctor.precision=pr,Ctor.rounding=rm,true);};/*
   * Return true if the value of this Decimal is a finite number, otherwise return false.
   *
   */P.isFinite=function(){return!!this.d;};/*
   * Return true if the value of this Decimal is an integer, otherwise return false.
   *
   */P.isInteger=P.isInt=function(){return!!this.d&&mathfloor(this.e/LOG_BASE)>this.d.length-2;};/*
   * Return true if the value of this Decimal is NaN, otherwise return false.
   *
   */P.isNaN=function(){return!this.s;};/*
   * Return true if the value of this Decimal is negative, otherwise return false.
   *
   */P.isNegative=P.isNeg=function(){return this.s<0;};/*
   * Return true if the value of this Decimal is positive, otherwise return false.
   *
   */P.isPositive=P.isPos=function(){return this.s>0;};/*
   * Return true if the value of this Decimal is 0 or -0, otherwise return false.
   *
   */P.isZero=function(){return!!this.d&&this.d[0]===0;};/*
   * Return true if the value of this Decimal is less than `y`, otherwise return false.
   *
   */P.lessThan=P.lt=function(y){return this.cmp(y)<0;};/*
   * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
   *
   */P.lessThanOrEqualTo=P.lte=function(y){return this.cmp(y)<1;};/*
   * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * If no base is specified, return log[10](arg).
   *
   * log[base](arg) = ln(arg) / ln(base)
   *
   * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
   * otherwise:
   *
   * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
   * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
   * between the result and the correctly rounded result will be one ulp (unit in the last place).
   *
   * log[-b](a)       = NaN
   * log[0](a)        = NaN
   * log[1](a)        = NaN
   * log[NaN](a)      = NaN
   * log[Infinity](a) = NaN
   * log[b](0)        = -Infinity
   * log[b](-0)       = -Infinity
   * log[b](-a)       = NaN
   * log[b](1)        = 0
   * log[b](Infinity) = Infinity
   * log[b](NaN)      = NaN
   *
   * [base] {number|string|Decimal} The base of the logarithm.
   *
   */P.logarithm=P.log=function(base){var isBase10,d,denominator,k,inf,num,sd,r,arg=this,Ctor=arg.constructor,pr=Ctor.precision,rm=Ctor.rounding,guard=5;// Default base is 10.
if(base==null){base=new Ctor(10);isBase10=true;}else{base=new Ctor(base);d=base.d;// Return NaN if base is negative, or non-finite, or is 0 or 1.
if(base.s<0||!d||!d[0]||base.eq(1))return new Ctor(NaN);isBase10=base.eq(10);}d=arg.d;// Is arg negative, non-finite, 0 or 1?
if(arg.s<0||!d||!d[0]||arg.eq(1)){return new Ctor(d&&!d[0]?-1/0:arg.s!=1?NaN:d?0:1/0);}// The result will have a non-terminating decimal expansion if base is 10 and arg is not an
// integer power of 10.
if(isBase10){if(d.length>1){inf=true;}else{for(k=d[0];k%10===0;)k/=10;inf=k!==1;}}external=false;sd=pr+guard;num=naturalLogarithm(arg,sd);denominator=isBase10?getLn10(Ctor,sd+10):naturalLogarithm(base,sd);// The result will have 5 rounding digits.
r=divide(num,denominator,sd,1);// If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
// calculate 10 further digits.
//
// If the result is known to have an infinite decimal expansion, repeat this until it is clear
// that the result is above or below the boundary. Otherwise, if after calculating the 10
// further digits, the last 14 are nines, round up and assume the result is exact.
// Also assume the result is exact if the last 14 are zero.
//
// Example of a result that will be incorrectly rounded:
// log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
// The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
// will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
// the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
// place is still 2.6.
if(checkRoundingDigits(r.d,k=pr,rm)){do{sd+=10;num=naturalLogarithm(arg,sd);denominator=isBase10?getLn10(Ctor,sd+10):naturalLogarithm(base,sd);r=divide(num,denominator,sd,1);if(!inf){// Check for 14 nines from the 2nd rounding digit, as the first may be 4.
if(+digitsToString(r.d).slice(k+1,k+15)+1==1e14){r=finalise(r,pr+1,0);}break;}}while(checkRoundingDigits(r.d,k+=10,rm));}external=true;return finalise(r,pr,rm);};/*
   * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.max = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'lt');
  };
   */ /*
   * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
   *
   * arguments {number|string|Decimal}
   *
  P.min = function () {
    Array.prototype.push.call(arguments, this);
    return maxOrMin(this.constructor, arguments, 'gt');
  };
   */ /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */P.minus=P.sub=function(y){var d,e,i,j,k,len,pr,rm,xd,xe,xLTy,yd,x=this,Ctor=x.constructor;y=new Ctor(y);// If either is not finite...
if(!x.d||!y.d){// Return NaN if either is NaN.
if(!x.s||!y.s)y=new Ctor(NaN);// Return y negated if x is finite and y is ±Infinity.
else if(x.d)y.s=-y.s;// Return x if y is finite and x is ±Infinity.
// Return x if both are ±Infinity with different signs.
// Return NaN if both are ±Infinity with the same sign.
else y=new Ctor(y.d||x.s!==y.s?x:NaN);return y;}// If signs differ...
if(x.s!=y.s){y.s=-y.s;return x.plus(y);}xd=x.d;yd=y.d;pr=Ctor.precision;rm=Ctor.rounding;// If either is zero...
if(!xd[0]||!yd[0]){// Return y negated if x is zero and y is non-zero.
if(yd[0])y.s=-y.s;// Return x if y is zero and x is non-zero.
else if(xd[0])y=new Ctor(x);// Return zero if both are zero.
// From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
else return new Ctor(rm===3?-0:0);return external?finalise(y,pr,rm):y;}// x and y are finite, non-zero numbers with the same sign.
// Calculate base 1e7 exponents.
e=mathfloor(y.e/LOG_BASE);xe=mathfloor(x.e/LOG_BASE);xd=xd.slice();k=xe-e;// If base 1e7 exponents differ...
if(k){xLTy=k<0;if(xLTy){d=xd;k=-k;len=yd.length;}else{d=yd;e=xe;len=xd.length;}// Numbers with massively different exponents would result in a very high number of
// zeros needing to be prepended, but this can be avoided while still ensuring correct
// rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
i=Math.max(Math.ceil(pr/LOG_BASE),len)+2;if(k>i){k=i;d.length=1;}// Prepend zeros to equalise exponents.
d.reverse();for(i=k;i--;)d.push(0);d.reverse();// Base 1e7 exponents equal.
}else{// Check digits to determine which is the bigger number.
i=xd.length;len=yd.length;xLTy=i<len;if(xLTy)len=i;for(i=0;i<len;i++){if(xd[i]!=yd[i]){xLTy=xd[i]<yd[i];break;}}k=0;}if(xLTy){d=xd;xd=yd;yd=d;y.s=-y.s;}len=xd.length;// Append zeros to `xd` if shorter.
// Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
for(i=yd.length-len;i>0;--i)xd[len++]=0;// Subtract yd from xd.
for(i=yd.length;i>k;){if(xd[--i]<yd[i]){for(j=i;j&&xd[--j]===0;)xd[j]=BASE-1;--xd[j];xd[i]+=BASE;}xd[i]-=yd[i];}// Remove trailing zeros.
for(;xd[--len]===0;)xd.pop();// Remove leading zeros and adjust exponent accordingly.
for(;xd[0]===0;xd.shift())--e;// Zero?
if(!xd[0])return new Ctor(rm===3?-0:0);y.d=xd;y.e=getBase10Exponent(xd,e);return external?finalise(y,pr,rm):y;};/*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * The result depends on the modulo mode.
   *
   */P.modulo=P.mod=function(y){var q,x=this,Ctor=x.constructor;y=new Ctor(y);// Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
if(!x.d||!y.s||y.d&&!y.d[0])return new Ctor(NaN);// Return x if y is ±Infinity or x is ±0.
if(!y.d||x.d&&!x.d[0]){return finalise(new Ctor(x),Ctor.precision,Ctor.rounding);}// Prevent rounding of intermediate calculations.
external=false;if(Ctor.modulo==9){// Euclidian division: q = sign(y) * floor(x / abs(y))
// result = x - q * y    where  0 <= result < abs(y)
q=divide(x,y.abs(),0,3,1);q.s*=y.s;}else{q=divide(x,y,0,Ctor.modulo,1);}q=q.times(y);external=true;return x.minus(q);};/*
   * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
   * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */P.naturalExponential=P.exp=function(){return naturalExponential(this);};/*
   * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   */P.naturalLogarithm=P.ln=function(){return naturalLogarithm(this);};/*
   * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
   * -1.
   *
   */P.negated=P.neg=function(){var x=new this.constructor(this);x.s=-x.s;return finalise(x);};/*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   */P.plus=P.add=function(y){var carry,d,e,i,k,len,pr,rm,xd,yd,x=this,Ctor=x.constructor;y=new Ctor(y);// If either is not finite...
if(!x.d||!y.d){// Return NaN if either is NaN.
if(!x.s||!y.s)y=new Ctor(NaN);// Return x if y is finite and x is ±Infinity.
// Return x if both are ±Infinity with the same sign.
// Return NaN if both are ±Infinity with different signs.
// Return y if x is finite and y is ±Infinity.
else if(!x.d)y=new Ctor(y.d||x.s===y.s?x:NaN);return y;}// If signs differ...
if(x.s!=y.s){y.s=-y.s;return x.minus(y);}xd=x.d;yd=y.d;pr=Ctor.precision;rm=Ctor.rounding;// If either is zero...
if(!xd[0]||!yd[0]){// Return x if y is zero.
// Return y if y is non-zero.
if(!yd[0])y=new Ctor(x);return external?finalise(y,pr,rm):y;}// x and y are finite, non-zero numbers with the same sign.
// Calculate base 1e7 exponents.
k=mathfloor(x.e/LOG_BASE);e=mathfloor(y.e/LOG_BASE);xd=xd.slice();i=k-e;// If base 1e7 exponents differ...
if(i){if(i<0){d=xd;i=-i;len=yd.length;}else{d=yd;e=k;len=xd.length;}// Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
k=Math.ceil(pr/LOG_BASE);len=k>len?k+1:len+1;if(i>len){i=len;d.length=1;}// Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
d.reverse();for(;i--;)d.push(0);d.reverse();}len=xd.length;i=yd.length;// If yd is longer than xd, swap xd and yd so xd points to the longer array.
if(len-i<0){i=len;d=yd;yd=xd;xd=d;}// Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
for(carry=0;i;){carry=(xd[--i]=xd[i]+yd[i]+carry)/BASE|0;xd[i]%=BASE;}if(carry){xd.unshift(carry);++e;}// Remove trailing zeros.
// No need to check for zero, as +x + +y != 0 && -x + -y != 0
for(len=xd.length;xd[--len]==0;)xd.pop();y.d=xd;y.e=getBase10Exponent(xd,e);return external?finalise(y,pr,rm):y;};/*
   * Return the number of significant digits of the value of this Decimal.
   *
   * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
   *
   */P.precision=P.sd=function(z){var k,x=this;if(z!==void 0&&z!==!!z&&z!==1&&z!==0)throw Error(invalidArgument+z);if(x.d){k=getPrecision(x.d);if(z&&x.e+1>k)k=x.e+1;}else{k=NaN;}return k;};/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
   * rounding mode `rounding`.
   *
   */P.round=function(){var x=this,Ctor=x.constructor;return finalise(new Ctor(x),x.e+1,Ctor.rounding);};/*
   * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-1, 1]
   *
   * sin(x) = x - x^3/3! + x^5/5! - ...
   *
   * sin(0)         = 0
   * sin(-0)        = -0
   * sin(Infinity)  = NaN
   * sin(-Infinity) = NaN
   * sin(NaN)       = NaN
   *
   */P.sine=P.sin=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+LOG_BASE;Ctor.rounding=1;x=sine(Ctor,toLessThanHalfPi(Ctor,x));Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant>2?x.neg():x,pr,rm,true);};/*
   * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   *  sqrt(-n) =  N
   *  sqrt(N)  =  N
   *  sqrt(-I) =  N
   *  sqrt(I)  =  I
   *  sqrt(0)  =  0
   *  sqrt(-0) = -0
   *
   */P.squareRoot=P.sqrt=function(){var m,n,sd,r,rep,t,x=this,d=x.d,e=x.e,s=x.s,Ctor=x.constructor;// Negative/NaN/Infinity/zero?
if(s!==1||!d||!d[0]){return new Ctor(!s||s<0&&(!d||d[0])?NaN:d?x:1/0);}external=false;// Initial estimate.
s=Math.sqrt(+x);// Math.sqrt underflow/overflow?
// Pass x to Math.sqrt as integer, then adjust the exponent of the result.
if(s==0||s==1/0){n=digitsToString(d);if((n.length+e)%2==0)n+='0';s=Math.sqrt(n);e=mathfloor((e+1)/2)-(e<0||e%2);if(s==1/0){n='5e'+e;}else{n=s.toExponential();n=n.slice(0,n.indexOf('e')+1)+e;}r=new Ctor(n);}else{r=new Ctor(s.toString());}sd=(e=Ctor.precision)+3;// Newton-Raphson iteration.
for(;;){t=r;r=t.plus(divide(x,t,sd+2,1)).times(0.5);// TODO? Replace with for-loop and checkRoundingDigits.
if(digitsToString(t.d).slice(0,sd)===(n=digitsToString(r.d)).slice(0,sd)){n=n.slice(sd-3,sd+1);// The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
// 4999, i.e. approaching a rounding boundary, continue the iteration.
if(n=='9999'||!rep&&n=='4999'){// On the first iteration only, check to see if rounding up gives the exact result as the
// nines may infinitely repeat.
if(!rep){finalise(t,e+1,0);if(t.times(t).eq(x)){r=t;break;}}sd+=4;rep=1;}else{// If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
// If not, then there are further digits and m will be truthy.
if(!+n||!+n.slice(1)&&n.charAt(0)=='5'){// Truncate to the first rounding digit.
finalise(r,e+1,1);m=!r.times(r).eq(x);}break;}}}external=true;return finalise(r,e,Ctor.rounding,m);};/*
   * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-Infinity, Infinity]
   *
   * tan(0)         = 0
   * tan(-0)        = -0
   * tan(Infinity)  = NaN
   * tan(-Infinity) = NaN
   * tan(NaN)       = NaN
   *
   */P.tangent=P.tan=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+10;Ctor.rounding=1;x=x.sin();x.s=1;x=divide(x,new Ctor(1).minus(x.times(x)).sqrt(),pr+10,0);Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant==2||quadrant==4?x.neg():x,pr,rm,true);};/*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   */P.times=P.mul=function(y){var carry,e,i,k,r,rL,t,xdL,ydL,x=this,Ctor=x.constructor,xd=x.d,yd=(y=new Ctor(y)).d;y.s*=x.s;// If either is NaN, ±Infinity or ±0...
if(!xd||!xd[0]||!yd||!yd[0]){return new Ctor(!y.s||xd&&!xd[0]&&!yd||yd&&!yd[0]&&!xd// Return NaN if either is NaN.
// Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
?NaN// Return ±Infinity if either is ±Infinity.
// Return ±0 if either is ±0.
:!xd||!yd?y.s/0:y.s*0);}e=mathfloor(x.e/LOG_BASE)+mathfloor(y.e/LOG_BASE);xdL=xd.length;ydL=yd.length;// Ensure xd points to the longer array.
if(xdL<ydL){r=xd;xd=yd;yd=r;rL=xdL;xdL=ydL;ydL=rL;}// Initialise the result array with zeros.
r=[];rL=xdL+ydL;for(i=rL;i--;)r.push(0);// Multiply!
for(i=ydL;--i>=0;){carry=0;for(k=xdL+i;k>i;){t=r[k]+yd[i]*xd[k-i-1]+carry;r[k--]=t%BASE|0;carry=t/BASE|0;}r[k]=(r[k]+carry)%BASE|0;}// Remove trailing zeros.
for(;!r[--rL];)r.pop();if(carry)++e;else r.shift();y.d=r;y.e=getBase10Exponent(r,e);return external?finalise(y,Ctor.precision,Ctor.rounding):y;};/*
   * Return a string representing the value of this Decimal in base 2, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toBinary=function(sd,rm){return toStringBinary(this,2,sd,rm);};/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
   * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
   *
   * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toDecimalPlaces=P.toDP=function(dp,rm){var x=this,Ctor=x.constructor;x=new Ctor(x);if(dp===void 0)return x;checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);return finalise(x,dp+x.e+1,rm);};/*
   * Return a string representing the value of this Decimal in exponential notation rounded to
   * `dp` fixed decimal places using rounding mode `rounding`.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toExponential=function(dp,rm){var str,x=this,Ctor=x.constructor;if(dp===void 0){str=finiteToString(x,true);}else{checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);x=finalise(new Ctor(x),dp+1,rm);str=finiteToString(x,true,dp+1);}return x.isNeg()&&!x.isZero()?'-'+str:str;};/*
   * Return a string representing the value of this Decimal in normal (fixed-point) notation to
   * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
   * omitted.
   *
   * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   * (-0).toFixed(3) is '0.000'.
   * (-0.5).toFixed(0) is '-0'.
   *
   */P.toFixed=function(dp,rm){var str,y,x=this,Ctor=x.constructor;if(dp===void 0){str=finiteToString(x);}else{checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);y=finalise(new Ctor(x),dp+x.e+1,rm);str=finiteToString(y,false,dp+y.e+1);}// To determine whether to add the minus sign look at the value before it was rounded,
// i.e. look at `x` rather than `y`.
return x.isNeg()&&!x.isZero()?'-'+str:str;};/*
   * Return an array representing the value of this Decimal as a simple fraction with an integer
   * numerator and an integer denominator.
   *
   * The denominator will be a positive non-zero value less than or equal to the specified maximum
   * denominator. If a maximum denominator is not specified, the denominator will be the lowest
   * value necessary to represent the number exactly.
   *
   * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
   *
   */P.toFraction=function(maxD){var d,d0,d1,d2,e,k,n,n0,n1,pr,q,r,x=this,xd=x.d,Ctor=x.constructor;if(!xd)return new Ctor(x);n1=d0=new Ctor(1);d1=n0=new Ctor(0);d=new Ctor(d1);e=d.e=getPrecision(xd)-x.e-1;k=e%LOG_BASE;d.d[0]=mathpow(10,k<0?LOG_BASE+k:k);if(maxD==null){// d is 10**e, the minimum max-denominator needed.
maxD=e>0?d:n1;}else{n=new Ctor(maxD);if(!n.isInt()||n.lt(n1))throw Error(invalidArgument+n);maxD=n.gt(d)?e>0?d:n1:n;}external=false;n=new Ctor(digitsToString(xd));pr=Ctor.precision;Ctor.precision=e=xd.length*LOG_BASE*2;for(;;){q=divide(n,d,0,1,1);d2=d0.plus(q.times(d1));if(d2.cmp(maxD)==1)break;d0=d1;d1=d2;d2=n1;n1=n0.plus(q.times(d2));n0=d2;d2=d;d=n.minus(q.times(d2));n=d2;}d2=divide(maxD.minus(d0),d1,0,1,1);n0=n0.plus(d2.times(n1));d0=d0.plus(d2.times(d1));n0.s=n1.s=x.s;// Determine which fraction is closer to x, n0/d0 or n1/d1?
r=divide(n1,d1,e,1).minus(x).abs().cmp(divide(n0,d0,e,1).minus(x).abs())<1?[n1,d1]:[n0,d0];Ctor.precision=pr;external=true;return r;};/*
   * Return a string representing the value of this Decimal in base 16, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toHexadecimal=P.toHex=function(sd,rm){return toStringBinary(this,16,sd,rm);};/*
   * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
   * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
   *
   * The return value will always have the same sign as this Decimal, unless either this Decimal
   * or `y` is NaN, in which case the return value will be also be NaN.
   *
   * The return value is not affected by the value of `precision`.
   *
   * y {number|string|Decimal} The magnitude to round to a multiple of.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toNearest() rounding mode not an integer: {rm}'
   * 'toNearest() rounding mode out of range: {rm}'
   *
   */P.toNearest=function(y,rm){var x=this,Ctor=x.constructor;x=new Ctor(x);if(y==null){// If x is not finite, return x.
if(!x.d)return x;y=new Ctor(1);rm=Ctor.rounding;}else{y=new Ctor(y);if(rm===void 0){rm=Ctor.rounding;}else{checkInt32(rm,0,8);}// If x is not finite, return x if y is not NaN, else NaN.
if(!x.d)return y.s?x:y;// If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
if(!y.d){if(y.s)y.s=x.s;return y;}}// If y is not zero, calculate the nearest multiple of y to x.
if(y.d[0]){external=false;x=divide(x,y,0,rm,1).times(y);external=true;finalise(x);// If y is zero, return zero with the sign of x.
}else{y.s=x.s;x=y;}return x;};/*
   * Return the value of this Decimal converted to a number primitive.
   * Zero keeps its sign.
   *
   */P.toNumber=function(){return+this;};/*
   * Return a string representing the value of this Decimal in base 8, round to `sd` significant
   * digits using rounding mode `rm`.
   *
   * If the optional `sd` argument is present then return binary exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toOctal=function(sd,rm){return toStringBinary(this,8,sd,rm);};/*
   * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
   * to `precision` significant digits using rounding mode `rounding`.
   *
   * ECMAScript compliant.
   *
   *   pow(x, NaN)                           = NaN
   *   pow(x, ±0)                            = 1

   *   pow(NaN, non-zero)                    = NaN
   *   pow(abs(x) > 1, +Infinity)            = +Infinity
   *   pow(abs(x) > 1, -Infinity)            = +0
   *   pow(abs(x) == 1, ±Infinity)           = NaN
   *   pow(abs(x) < 1, +Infinity)            = +0
   *   pow(abs(x) < 1, -Infinity)            = +Infinity
   *   pow(+Infinity, y > 0)                 = +Infinity
   *   pow(+Infinity, y < 0)                 = +0
   *   pow(-Infinity, odd integer > 0)       = -Infinity
   *   pow(-Infinity, even integer > 0)      = +Infinity
   *   pow(-Infinity, odd integer < 0)       = -0
   *   pow(-Infinity, even integer < 0)      = +0
   *   pow(+0, y > 0)                        = +0
   *   pow(+0, y < 0)                        = +Infinity
   *   pow(-0, odd integer > 0)              = -0
   *   pow(-0, even integer > 0)             = +0
   *   pow(-0, odd integer < 0)              = -Infinity
   *   pow(-0, even integer < 0)             = +Infinity
   *   pow(finite x < 0, finite non-integer) = NaN
   *
   * For non-integer or very large exponents pow(x, y) is calculated using
   *
   *   x^y = exp(y*ln(x))
   *
   * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
   * probability of an incorrectly rounded result
   * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
   * i.e. 1 in 250,000,000,000,000
   *
   * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
   *
   * y {number|string|Decimal} The power to which to raise this Decimal.
   *
   */P.toPower=P.pow=function(y){var e,k,pr,r,rm,s,x=this,Ctor=x.constructor,yn=+(y=new Ctor(y));// Either ±Infinity, NaN or ±0?
if(!x.d||!y.d||!x.d[0]||!y.d[0])return new Ctor(mathpow(+x,yn));x=new Ctor(x);if(x.eq(1))return x;pr=Ctor.precision;rm=Ctor.rounding;if(y.eq(1))return finalise(x,pr,rm);// y exponent
e=mathfloor(y.e/LOG_BASE);// If y is a small integer use the 'exponentiation by squaring' algorithm.
if(e>=y.d.length-1&&(k=yn<0?-yn:yn)<=MAX_SAFE_INTEGER){r=intPow(Ctor,x,k,pr);return y.s<0?new Ctor(1).div(r):finalise(r,pr,rm);}s=x.s;// if x is negative
if(s<0){// if y is not an integer
if(e<y.d.length-1)return new Ctor(NaN);// Result is positive if x is negative and the last digit of integer y is even.
if((y.d[e]&1)==0)s=1;// if x.eq(-1)
if(x.e==0&&x.d[0]==1&&x.d.length==1){x.s=s;return x;}}// Estimate result exponent.
// x^y = 10^e,  where e = y * log10(x)
// log10(x) = log10(x_significand) + x_exponent
// log10(x_significand) = ln(x_significand) / ln(10)
k=mathpow(+x,yn);e=k==0||!isFinite(k)?mathfloor(yn*(Math.log('0.'+digitsToString(x.d))/Math.LN10+x.e+1)):new Ctor(k+'').e;// Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.
// Overflow/underflow?
if(e>Ctor.maxE+1||e<Ctor.minE-1)return new Ctor(e>0?s/0:0);external=false;Ctor.rounding=x.s=1;// Estimate the extra guard digits needed to ensure five correct rounding digits from
// naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
// new Decimal(2.32456).pow('2087987436534566.46411')
// should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
k=Math.min(12,(e+'').length);// r = x^y = exp(y*ln(x))
r=naturalExponential(y.times(naturalLogarithm(x,pr+k)),pr);// r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
if(r.d){// Truncate to the required precision plus five rounding digits.
r=finalise(r,pr+5,1);// If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
// the result.
if(checkRoundingDigits(r.d,pr,rm)){e=pr+10;// Truncate to the increased precision plus five rounding digits.
r=finalise(naturalExponential(y.times(naturalLogarithm(x,e+k)),e),e+5,1);// Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
if(+digitsToString(r.d).slice(pr+1,pr+15)+1==1e14){r=finalise(r,pr+1,0);}}}r.s=s;external=true;Ctor.rounding=rm;return finalise(r,pr,rm);};/*
   * Return a string representing the value of this Decimal rounded to `sd` significant digits
   * using rounding mode `rounding`.
   *
   * Return exponential notation if `sd` is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   */P.toPrecision=function(sd,rm){var str,x=this,Ctor=x.constructor;if(sd===void 0){str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);}else{checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);x=finalise(new Ctor(x),sd,rm);str=finiteToString(x,sd<=x.e||x.e<=Ctor.toExpNeg,sd);}return x.isNeg()&&!x.isZero()?'-'+str:str;};/*
   * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
   * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
   * omitted.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * 'toSD() digits out of range: {sd}'
   * 'toSD() digits not an integer: {sd}'
   * 'toSD() rounding mode not an integer: {rm}'
   * 'toSD() rounding mode out of range: {rm}'
   *
   */P.toSignificantDigits=P.toSD=function(sd,rm){var x=this,Ctor=x.constructor;if(sd===void 0){sd=Ctor.precision;rm=Ctor.rounding;}else{checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);}return finalise(new Ctor(x),sd,rm);};/*
   * Return a string representing the value of this Decimal.
   *
   * Return exponential notation if this Decimal has a positive exponent equal to or greater than
   * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
   *
   */P.toString=function(){var x=this,Ctor=x.constructor,str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);return x.isNeg()&&!x.isZero()?'-'+str:str;};/*
   * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
   *
   */P.truncated=P.trunc=function(){return finalise(new this.constructor(this),this.e+1,1);};/*
   * Return a string representing the value of this Decimal.
   * Unlike `toString`, negative zero will include the minus sign.
   *
   */P.valueOf=P.toJSON=function(){var x=this,Ctor=x.constructor,str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);return x.isNeg()?'-'+str:str;};// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.
/*
   *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
   *                           finiteToString, naturalExponential, naturalLogarithm
   *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
   *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
   *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
   *  convertBase              toStringBinary, parseOther
   *  cos                      P.cos
   *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
   *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
   *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
   *                           taylorSeries, atan2, parseOther
   *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
   *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
   *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
   *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
   *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
   *                           P.truncated, divide, getLn10, getPi, naturalExponential,
   *                           naturalLogarithm, ceil, floor, round, trunc
   *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
   *                           toStringBinary
   *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
   *  getLn10                  P.logarithm, naturalLogarithm
   *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
   *  getPrecision             P.precision, P.toFraction
   *  getZeroString            digitsToString, finiteToString
   *  intPow                   P.toPower, parseOther
   *  isOdd                    toLessThanHalfPi
   *  maxOrMin                 max, min
   *  naturalExponential       P.naturalExponential, P.toPower
   *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
   *                           P.toPower, naturalExponential
   *  nonFiniteToString        finiteToString, toStringBinary
   *  parseDecimal             Decimal
   *  parseOther               Decimal
   *  sin                      P.sin
   *  taylorSeries             P.cosh, P.sinh, cos, sin
   *  toLessThanHalfPi         P.cos, P.sin
   *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
   *  truncate                 intPow
   *
   *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
   *                           naturalLogarithm, config, parseOther, random, Decimal
   */function digitsToString(d){var i,k,ws,indexOfLastWord=d.length-1,str='',w=d[0];if(indexOfLastWord>0){str+=w;for(i=1;i<indexOfLastWord;i++){ws=d[i]+'';k=LOG_BASE-ws.length;if(k)str+=getZeroString(k);str+=ws;}w=d[i];ws=w+'';k=LOG_BASE-ws.length;if(k)str+=getZeroString(k);}else if(w===0){return'0';}// Remove trailing zeros of last w.
for(;w%10===0;)w/=10;return str+w;}function checkInt32(i,min,max){if(i!==~~i||i<min||i>max){throw Error(invalidArgument+i);}}/*
   * Check 5 rounding digits if `repeating` is null, 4 otherwise.
   * `repeating == null` if caller is `log` or `pow`,
   * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
   */function checkRoundingDigits(d,i,rm,repeating){var di,k,r,rd;// Get the length of the first word of the array d.
for(k=d[0];k>=10;k/=10)--i;// Is the rounding digit in the first word of d?
if(--i<0){i+=LOG_BASE;di=0;}else{di=Math.ceil((i+1)/LOG_BASE);i%=LOG_BASE;}// i is the index (0 - 6) of the rounding digit.
// E.g. if within the word 3487563 the first rounding digit is 5,
// then i = 4, k = 1000, rd = 3487563 % 1000 = 563
k=mathpow(10,LOG_BASE-i);rd=d[di]%k|0;if(repeating==null){if(i<3){if(i==0)rd=rd/100|0;else if(i==1)rd=rd/10|0;r=rm<4&&rd==99999||rm>3&&rd==49999||rd==50000||rd==0;}else{r=(rm<4&&rd+1==k||rm>3&&rd+1==k/2)&&(d[di+1]/k/100|0)==mathpow(10,i-2)-1||(rd==k/2||rd==0)&&(d[di+1]/k/100|0)==0;}}else{if(i<4){if(i==0)rd=rd/1000|0;else if(i==1)rd=rd/100|0;else if(i==2)rd=rd/10|0;r=(repeating||rm<4)&&rd==9999||!repeating&&rm>3&&rd==4999;}else{r=((repeating||rm<4)&&rd+1==k||!repeating&&rm>3&&rd+1==k/2)&&(d[di+1]/k/1000|0)==mathpow(10,i-3)-1;}}return r;}// Convert string of `baseIn` to an array of numbers of `baseOut`.
// Eg. convertBase('255', 10, 16) returns [15, 15].
// Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
function convertBase(str,baseIn,baseOut){var j,arr=[0],arrL,i=0,strL=str.length;for(;i<strL;){for(arrL=arr.length;arrL--;)arr[arrL]*=baseIn;arr[0]+=NUMERALS.indexOf(str.charAt(i++));for(j=0;j<arr.length;j++){if(arr[j]>baseOut-1){if(arr[j+1]===void 0)arr[j+1]=0;arr[j+1]+=arr[j]/baseOut|0;arr[j]%=baseOut;}}}return arr.reverse();}/*
   * cos(x) = 1 - x^2/2! + x^4/4! - ...
   * |x| < pi/2
   *
   */function cosine(Ctor,x){var k,len,y;if(x.isZero())return x;// Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
// i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1
// Estimate the optimum number of times to use the argument reduction.
len=x.d.length;if(len<32){k=Math.ceil(len/3);y=(1/tinyPow(4,k)).toString();}else{k=16;y='2.3283064365386962890625e-10';}Ctor.precision+=k;x=taylorSeries(Ctor,1,x.times(y),new Ctor(1));// Reverse argument reduction
for(var i=k;i--;){var cos2x=x.times(x);x=cos2x.times(cos2x).minus(cos2x).times(8).plus(1);}Ctor.precision-=k;return x;}/*
   * Perform division in the specified base.
   */var divide=function(){// Assumes non-zero x and k, and hence non-zero result.
function multiplyInteger(x,k,base){var temp,carry=0,i=x.length;for(x=x.slice();i--;){temp=x[i]*k+carry;x[i]=temp%base|0;carry=temp/base|0;}if(carry)x.unshift(carry);return x;}function compare(a,b,aL,bL){var i,r;if(aL!=bL){r=aL>bL?1:-1;}else{for(i=r=0;i<aL;i++){if(a[i]!=b[i]){r=a[i]>b[i]?1:-1;break;}}}return r;}function subtract(a,b,aL,base){var i=0;// Subtract b from a.
for(;aL--;){a[aL]-=i;i=a[aL]<b[aL]?1:0;a[aL]=i*base+a[aL]-b[aL];}// Remove leading zeros.
for(;!a[0]&&a.length>1;)a.shift();}return function(x,y,pr,rm,dp,base){var cmp,e,i,k,logBase,more,prod,prodL,q,qd,rem,remL,rem0,sd,t,xi,xL,yd0,yL,yz,Ctor=x.constructor,sign=x.s==y.s?1:-1,xd=x.d,yd=y.d;// Either NaN, Infinity or 0?
if(!xd||!xd[0]||!yd||!yd[0]){return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
!x.s||!y.s||(xd?yd&&xd[0]==yd[0]:!yd)?NaN:// Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
xd&&xd[0]==0||!yd?sign*0:sign/0);}if(base){logBase=1;e=x.e-y.e;}else{base=BASE;logBase=LOG_BASE;e=mathfloor(x.e/logBase)-mathfloor(y.e/logBase);}yL=yd.length;xL=xd.length;q=new Ctor(sign);qd=q.d=[];// Result exponent may be one less than e.
// The digit array of a Decimal from toStringBinary may have trailing zeros.
for(i=0;yd[i]==(xd[i]||0);i++);if(yd[i]>(xd[i]||0))e--;if(pr==null){sd=pr=Ctor.precision;rm=Ctor.rounding;}else if(dp){sd=pr+(x.e-y.e)+1;}else{sd=pr;}if(sd<0){qd.push(1);more=true;}else{// Convert precision in number of base 10 digits to base 1e7 digits.
sd=sd/logBase+2|0;i=0;// divisor < 1e7
if(yL==1){k=0;yd=yd[0];sd++;// k is the carry.
for(;(i<xL||k)&&sd--;i++){t=k*base+(xd[i]||0);qd[i]=t/yd|0;k=t%yd|0;}more=k||i<xL;// divisor >= 1e7
}else{// Normalise xd and yd so highest order digit of yd is >= base/2
k=base/(yd[0]+1)|0;if(k>1){yd=multiplyInteger(yd,k,base);xd=multiplyInteger(xd,k,base);yL=yd.length;xL=xd.length;}xi=yL;rem=xd.slice(0,yL);remL=rem.length;// Add zeros to make remainder as long as divisor.
for(;remL<yL;)rem[remL++]=0;yz=yd.slice();yz.unshift(0);yd0=yd[0];if(yd[1]>=base/2)++yd0;do{k=0;// Compare divisor and remainder.
cmp=compare(yd,rem,yL,remL);// If divisor < remainder.
if(cmp<0){// Calculate trial digit, k.
rem0=rem[0];if(yL!=remL)rem0=rem0*base+(rem[1]||0);// k will be how many times the divisor goes into the current remainder.
k=rem0/yd0|0;//  Algorithm:
//  1. product = divisor * trial digit (k)
//  2. if product > remainder: product -= divisor, k--
//  3. remainder -= product
//  4. if product was < remainder at 2:
//    5. compare new remainder and divisor
//    6. If remainder > divisor: remainder -= divisor, k++
if(k>1){if(k>=base)k=base-1;// product = divisor * trial digit.
prod=multiplyInteger(yd,k,base);prodL=prod.length;remL=rem.length;// Compare product and remainder.
cmp=compare(prod,rem,prodL,remL);// product > remainder.
if(cmp==1){k--;// Subtract divisor from product.
subtract(prod,yL<prodL?yz:yd,prodL,base);}}else{// cmp is -1.
// If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
// to avoid it. If k is 1 there is a need to compare yd and rem again below.
if(k==0)cmp=k=1;prod=yd.slice();}prodL=prod.length;if(prodL<remL)prod.unshift(0);// Subtract product from remainder.
subtract(rem,prod,remL,base);// If product was < previous remainder.
if(cmp==-1){remL=rem.length;// Compare divisor and new remainder.
cmp=compare(yd,rem,yL,remL);// If divisor < new remainder, subtract divisor from remainder.
if(cmp<1){k++;// Subtract divisor from remainder.
subtract(rem,yL<remL?yz:yd,remL,base);}}remL=rem.length;}else if(cmp===0){k++;rem=[0];}// if cmp === 1, k will be 0
// Add the next digit, k, to the result array.
qd[i++]=k;// Update the remainder.
if(cmp&&rem[0]){rem[remL++]=xd[xi]||0;}else{rem=[xd[xi]];remL=1;}}while((xi++<xL||rem[0]!==void 0)&&sd--);more=rem[0]!==void 0;}// Leading zero?
if(!qd[0])qd.shift();}// logBase is 1 when divide is being used for base conversion.
if(logBase==1){q.e=e;inexact=more;}else{// To calculate q.e, first get the number of digits of qd[0].
for(i=1,k=qd[0];k>=10;k/=10)i++;q.e=i+e*logBase-1;finalise(q,dp?pr+q.e+1:pr,rm,more);}return q;};}();/*
   * Round `x` to `sd` significant digits using rounding mode `rm`.
   * Check for over/under-flow.
   */function finalise(x,sd,rm,isTruncated){var digits,i,j,k,rd,roundUp,w,xd,xdi,Ctor=x.constructor;// Don't round if sd is null or undefined.
out:if(sd!=null){xd=x.d;// Infinity/NaN.
if(!xd)return x;// rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
// w: the word of xd containing rd, a base 1e7 number.
// xdi: the index of w within xd.
// digits: the number of digits of w.
// i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
// they had leading zeros)
// j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).
// Get the length of the first word of the digits array xd.
for(digits=1,k=xd[0];k>=10;k/=10)digits++;i=sd-digits;// Is the rounding digit in the first word of xd?
if(i<0){i+=LOG_BASE;j=sd;w=xd[xdi=0];// Get the rounding digit at index j of w.
rd=w/mathpow(10,digits-j-1)%10|0;}else{xdi=Math.ceil((i+1)/LOG_BASE);k=xd.length;if(xdi>=k){if(isTruncated){// Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
for(;k++<=xdi;)xd.push(0);w=rd=0;digits=1;i%=LOG_BASE;j=i-LOG_BASE+1;}else{break out;}}else{w=k=xd[xdi];// Get the number of digits of w.
for(digits=1;k>=10;k/=10)digits++;// Get the index of rd within w.
i%=LOG_BASE;// Get the index of rd within w, adjusted for leading zeros.
// The number of leading zeros of w is given by LOG_BASE - digits.
j=i-LOG_BASE+digits;// Get the rounding digit at index j of w.
rd=j<0?0:w/mathpow(10,digits-j-1)%10|0;}}// Are there any non-zero digits after the rounding digit?
isTruncated=isTruncated||sd<0||xd[xdi+1]!==void 0||(j<0?w:w%mathpow(10,digits-j-1));// The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
// of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
// will give 714.
roundUp=rm<4?(rd||isTruncated)&&(rm==0||rm==(x.s<0?3:2)):rd>5||rd==5&&(rm==4||isTruncated||rm==6&&// Check whether the digit to the left of the rounding digit is odd.
(i>0?j>0?w/mathpow(10,digits-j):0:xd[xdi-1])%10&1||rm==(x.s<0?8:7));if(sd<1||!xd[0]){xd.length=0;if(roundUp){// Convert sd to decimal places.
sd-=x.e+1;// 1, 0.1, 0.01, 0.001, 0.0001 etc.
xd[0]=mathpow(10,(LOG_BASE-sd%LOG_BASE)%LOG_BASE);x.e=-sd||0;}else{// Zero.
xd[0]=x.e=0;}return x;}// Remove excess digits.
if(i==0){xd.length=xdi;k=1;xdi--;}else{xd.length=xdi+1;k=mathpow(10,LOG_BASE-i);// E.g. 56700 becomes 56000 if 7 is the rounding digit.
// j > 0 means i > number of leading zeros of w.
xd[xdi]=j>0?(w/mathpow(10,digits-j)%mathpow(10,j)|0)*k:0;}if(roundUp){for(;;){// Is the digit to be rounded up in the first word of xd?
if(xdi==0){// i will be the length of xd[0] before k is added.
for(i=1,j=xd[0];j>=10;j/=10)i++;j=xd[0]+=k;for(k=1;j>=10;j/=10)k++;// if i != k the length has increased.
if(i!=k){x.e++;if(xd[0]==BASE)xd[0]=1;}break;}else{xd[xdi]+=k;if(xd[xdi]!=BASE)break;xd[xdi--]=0;k=1;}}}// Remove trailing zeros.
for(i=xd.length;xd[--i]===0;)xd.pop();}if(external){// Overflow?
if(x.e>Ctor.maxE){// Infinity.
x.d=null;x.e=NaN;// Underflow?
}else if(x.e<Ctor.minE){// Zero.
x.e=0;x.d=[0];// Ctor.underflow = true;
}// else Ctor.underflow = false;
}return x;}function finiteToString(x,isExp,sd){if(!x.isFinite())return nonFiniteToString(x);var k,e=x.e,str=digitsToString(x.d),len=str.length;if(isExp){if(sd&&(k=sd-len)>0){str=str.charAt(0)+'.'+str.slice(1)+getZeroString(k);}else if(len>1){str=str.charAt(0)+'.'+str.slice(1);}str=str+(x.e<0?'e':'e+')+x.e;}else if(e<0){str='0.'+getZeroString(-e-1)+str;if(sd&&(k=sd-len)>0)str+=getZeroString(k);}else if(e>=len){str+=getZeroString(e+1-len);if(sd&&(k=sd-e-1)>0)str=str+'.'+getZeroString(k);}else{if((k=e+1)<len)str=str.slice(0,k)+'.'+str.slice(k);if(sd&&(k=sd-len)>0){if(e+1===len)str+='.';str+=getZeroString(k);}}return str;}// Calculate the base 10 exponent from the base 1e7 exponent.
function getBase10Exponent(digits,e){var w=digits[0];// Add the number of digits of the first word of the digits array.
for(e*=LOG_BASE;w>=10;w/=10)e++;return e;}function getLn10(Ctor,sd,pr){if(sd>LN10_PRECISION){// Reset global state in case the exception is caught.
external=true;if(pr)Ctor.precision=pr;throw Error(precisionLimitExceeded);}return finalise(new Ctor(LN10),sd,1,true);}function getPi(Ctor,sd,rm){if(sd>PI_PRECISION)throw Error(precisionLimitExceeded);return finalise(new Ctor(PI),sd,rm,true);}function getPrecision(digits){var w=digits.length-1,len=w*LOG_BASE+1;w=digits[w];// If non-zero...
if(w){// Subtract the number of trailing zeros of the last word.
for(;w%10==0;w/=10)len--;// Add the number of digits of the first word.
for(w=digits[0];w>=10;w/=10)len++;}return len;}function getZeroString(k){var zs='';for(;k--;)zs+='0';return zs;}/*
   * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
   * integer of type number.
   *
   * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
   *
   */function intPow(Ctor,x,n,pr){var isTruncated,r=new Ctor(1),// Max n of 9007199254740991 takes 53 loop iterations.
// Maximum digits array length; leaves [28, 34] guard digits.
k=Math.ceil(pr/LOG_BASE+4);external=false;for(;;){if(n%2){r=r.times(x);if(truncate(r.d,k))isTruncated=true;}n=mathfloor(n/2);if(n===0){// To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
n=r.d.length-1;if(isTruncated&&r.d[n]===0)++r.d[n];break;}x=x.times(x);truncate(x.d,k);}external=true;return r;}function isOdd(n){return n.d[n.d.length-1]&1;}/*
   * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
   */function maxOrMin(Ctor,args,ltgt){var y,x=new Ctor(args[0]),i=0;for(;++i<args.length;){y=new Ctor(args[i]);if(!y.s){x=y;break;}else if(x[ltgt](y)){x=y;}}return x;}/*
   * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
   * digits.
   *
   * Taylor/Maclaurin series.
   *
   * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
   *
   * Argument reduction:
   *   Repeat x = x / 32, k += 5, until |x| < 0.1
   *   exp(x) = exp(x / 2^k)^(2^k)
   *
   * Previously, the argument was initially reduced by
   * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
   * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
   * found to be slower than just dividing repeatedly by 32 as above.
   *
   * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
   * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
   * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
   *
   *  exp(Infinity)  = Infinity
   *  exp(-Infinity) = 0
   *  exp(NaN)       = NaN
   *  exp(±0)        = 1
   *
   *  exp(x) is non-terminating for any finite, non-zero x.
   *
   *  The result will always be correctly rounded.
   *
   */function naturalExponential(x,sd){var denominator,guard,j,pow,sum,t,wpr,rep=0,i=0,k=0,Ctor=x.constructor,rm=Ctor.rounding,pr=Ctor.precision;// 0/NaN/Infinity?
if(!x.d||!x.d[0]||x.e>17){return new Ctor(x.d?!x.d[0]?1:x.s<0?0:1/0:x.s?x.s<0?0:x:0/0);}if(sd==null){external=false;wpr=pr;}else{wpr=sd;}t=new Ctor(0.03125);// while abs(x) >= 0.1
while(x.e>-2){// x = x / 2^5
x=x.times(t);k+=5;}// Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
// necessary to ensure the first 4 rounding digits are correct.
guard=Math.log(mathpow(2,k))/Math.LN10*2+5|0;wpr+=guard;denominator=pow=sum=new Ctor(1);Ctor.precision=wpr;for(;;){pow=finalise(pow.times(x),wpr,1);denominator=denominator.times(++i);t=sum.plus(divide(pow,denominator,wpr,1));if(digitsToString(t.d).slice(0,wpr)===digitsToString(sum.d).slice(0,wpr)){j=k;while(j--)sum=finalise(sum.times(sum),wpr,1);// Check to see if the first 4 rounding digits are [49]999.
// If so, repeat the summation with a higher precision, otherwise
// e.g. with precision: 18, rounding: 1
// exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
// `wpr - guard` is the index of first rounding digit.
if(sd==null){if(rep<3&&checkRoundingDigits(sum.d,wpr-guard,rm,rep)){Ctor.precision=wpr+=10;denominator=pow=t=new Ctor(1);i=0;rep++;}else{return finalise(sum,Ctor.precision=pr,rm,external=true);}}else{Ctor.precision=pr;return sum;}}sum=t;}}/*
   * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
   * digits.
   *
   *  ln(-n)        = NaN
   *  ln(0)         = -Infinity
   *  ln(-0)        = -Infinity
   *  ln(1)         = 0
   *  ln(Infinity)  = Infinity
   *  ln(-Infinity) = NaN
   *  ln(NaN)       = NaN
   *
   *  ln(n) (n != 1) is non-terminating.
   *
   */function naturalLogarithm(y,sd){var c,c0,denominator,e,numerator,rep,sum,t,wpr,x1,x2,n=1,guard=10,x=y,xd=x.d,Ctor=x.constructor,rm=Ctor.rounding,pr=Ctor.precision;// Is x negative or Infinity, NaN, 0 or 1?
if(x.s<0||!xd||!xd[0]||!x.e&&xd[0]==1&&xd.length==1){return new Ctor(xd&&!xd[0]?-1/0:x.s!=1?NaN:xd?0:x);}if(sd==null){external=false;wpr=pr;}else{wpr=sd;}Ctor.precision=wpr+=guard;c=digitsToString(xd);c0=c.charAt(0);if(Math.abs(e=x.e)<1.5e15){// Argument reduction.
// The series converges faster the closer the argument is to 1, so using
// ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
// multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
// 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
// later be divided by this number, then separate out the power of 10 using
// ln(a*10^b) = ln(a) + b*ln(10).
// max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
//while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
// max n is 6 (gives 0.7 - 1.3)
while(c0<7&&c0!=1||c0==1&&c.charAt(1)>3){x=x.times(y);c=digitsToString(x.d);c0=c.charAt(0);n++;}e=x.e;if(c0>1){x=new Ctor('0.'+c);e++;}else{x=new Ctor(c0+'.'+c.slice(1));}}else{// The argument reduction method above may result in overflow if the argument y is a massive
// number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
// function using ln(x*10^e) = ln(x) + e*ln(10).
t=getLn10(Ctor,wpr+2,pr).times(e+'');x=naturalLogarithm(new Ctor(c0+'.'+c.slice(1)),wpr-guard).plus(t);Ctor.precision=pr;return sd==null?finalise(x,pr,rm,external=true):x;}// x1 is x reduced to a value near 1.
x1=x;// Taylor series.
// ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
// where x = (y - 1)/(y + 1)    (|x| < 1)
sum=numerator=x=divide(x.minus(1),x.plus(1),wpr,1);x2=finalise(x.times(x),wpr,1);denominator=3;for(;;){numerator=finalise(numerator.times(x2),wpr,1);t=sum.plus(divide(numerator,new Ctor(denominator),wpr,1));if(digitsToString(t.d).slice(0,wpr)===digitsToString(sum.d).slice(0,wpr)){sum=sum.times(2);// Reverse the argument reduction. Check that e is not 0 because, besides preventing an
// unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
if(e!==0)sum=sum.plus(getLn10(Ctor,wpr+2,pr).times(e+''));sum=divide(sum,new Ctor(n),wpr,1);// Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
// been repeated previously) and the first 4 rounding digits 9999?
// If so, restart the summation with a higher precision, otherwise
// e.g. with precision: 12, rounding: 1
// ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
// `wpr - guard` is the index of first rounding digit.
if(sd==null){if(checkRoundingDigits(sum.d,wpr-guard,rm,rep)){Ctor.precision=wpr+=guard;t=numerator=x=divide(x1.minus(1),x1.plus(1),wpr,1);x2=finalise(x.times(x),wpr,1);denominator=rep=1;}else{return finalise(sum,Ctor.precision=pr,rm,external=true);}}else{Ctor.precision=pr;return sum;}}sum=t;denominator+=2;}}// ±Infinity, NaN.
function nonFiniteToString(x){// Unsigned.
return String(x.s*x.s/0);}/*
   * Parse the value of a new Decimal `x` from string `str`.
   */function parseDecimal(x,str){var e,i,len;// Decimal point?
if((e=str.indexOf('.'))>-1)str=str.replace('.','');// Exponential form?
if((i=str.search(/e/i))>0){// Determine exponent.
if(e<0)e=i;e+=+str.slice(i+1);str=str.substring(0,i);}else if(e<0){// Integer.
e=str.length;}// Determine leading zeros.
for(i=0;str.charCodeAt(i)===48;i++);// Determine trailing zeros.
for(len=str.length;str.charCodeAt(len-1)===48;--len);str=str.slice(i,len);if(str){len-=i;x.e=e=e-i-1;x.d=[];// Transform base
// e is the base 10 exponent.
// i is where to slice str to get the first word of the digits array.
i=(e+1)%LOG_BASE;if(e<0)i+=LOG_BASE;if(i<len){if(i)x.d.push(+str.slice(0,i));for(len-=LOG_BASE;i<len;)x.d.push(+str.slice(i,i+=LOG_BASE));str=str.slice(i);i=LOG_BASE-str.length;}else{i-=len;}for(;i--;)str+='0';x.d.push(+str);if(external){// Overflow?
if(x.e>x.constructor.maxE){// Infinity.
x.d=null;x.e=NaN;// Underflow?
}else if(x.e<x.constructor.minE){// Zero.
x.e=0;x.d=[0];// x.constructor.underflow = true;
}// else x.constructor.underflow = false;
}}else{// Zero.
x.e=0;x.d=[0];}return x;}/*
   * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
   */function parseOther(x,str){var base,Ctor,divisor,i,isFloat,len,p,xd,xe;if(str.indexOf('_')>-1){str=str.replace(/(\d)_(?=\d)/g,'$1');if(isDecimal.test(str))return parseDecimal(x,str);}else if(str==='Infinity'||str==='NaN'){if(!+str)x.s=NaN;x.e=NaN;x.d=null;return x;}if(isHex.test(str)){base=16;str=str.toLowerCase();}else if(isBinary.test(str)){base=2;}else if(isOctal.test(str)){base=8;}else{throw Error(invalidArgument+str);}// Is there a binary exponent part?
i=str.search(/p/i);if(i>0){p=+str.slice(i+1);str=str.substring(2,i);}else{str=str.slice(2);}// Convert `str` as an integer then divide the result by `base` raised to a power such that the
// fraction part will be restored.
i=str.indexOf('.');isFloat=i>=0;Ctor=x.constructor;if(isFloat){str=str.replace('.','');len=str.length;i=len-i;// log[10](16) = 1.2041... , log[10](88) = 1.9444....
divisor=intPow(Ctor,new Ctor(base),i,i*2);}xd=convertBase(str,base,BASE);xe=xd.length-1;// Remove trailing zeros.
for(i=xe;xd[i]===0;--i)xd.pop();if(i<0)return new Ctor(x.s*0);x.e=getBase10Exponent(xd,xe);x.d=xd;external=false;// At what precision to perform the division to ensure exact conversion?
// maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
// log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
// E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
// maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
// Therefore using 4 * the number of digits of str will always be enough.
if(isFloat)x=divide(x,divisor,len*4);// Multiply by the binary exponent part if present.
if(p)x=x.times(Math.abs(p)<54?mathpow(2,p):Decimal.pow(2,p));external=true;return x;}/*
   * sin(x) = x - x^3/3! + x^5/5! - ...
   * |x| < pi/2
   *
   */function sine(Ctor,x){var k,len=x.d.length;if(len<3){return x.isZero()?x:taylorSeries(Ctor,2,x,x);}// Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
// i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
// and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))
// Estimate the optimum number of times to use the argument reduction.
k=1.4*Math.sqrt(len);k=k>16?16:k|0;x=x.times(1/tinyPow(5,k));x=taylorSeries(Ctor,2,x,x);// Reverse argument reduction
var sin2_x,d5=new Ctor(5),d16=new Ctor(16),d20=new Ctor(20);for(;k--;){sin2_x=x.times(x);x=x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));}return x;}// Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
function taylorSeries(Ctor,n,x,y,isHyperbolic){var j,t,u,x2,i=1,pr=Ctor.precision,k=Math.ceil(pr/LOG_BASE);external=false;x2=x.times(x);u=new Ctor(y);for(;;){t=divide(u.times(x2),new Ctor(n++*n++),pr,1);u=isHyperbolic?y.plus(t):y.minus(t);y=divide(t.times(x2),new Ctor(n++*n++),pr,1);t=u.plus(y);if(t.d[k]!==void 0){for(j=k;t.d[j]===u.d[j]&&j--;);if(j==-1)break;}j=u;u=y;y=t;t=j;i++;}external=true;t.d.length=k+1;return t;}// Exponent e must be positive and non-zero.
function tinyPow(b,e){var n=b;while(--e)n*=b;return n;}// Return the absolute value of `x` reduced to less than or equal to half pi.
function toLessThanHalfPi(Ctor,x){var t,isNeg=x.s<0,pi=getPi(Ctor,Ctor.precision,1),halfPi=pi.times(0.5);x=x.abs();if(x.lte(halfPi)){quadrant=isNeg?4:1;return x;}t=x.divToInt(pi);if(t.isZero()){quadrant=isNeg?3:2;}else{x=x.minus(t.times(pi));// 0 <= x < pi
if(x.lte(halfPi)){quadrant=isOdd(t)?isNeg?2:3:isNeg?4:1;return x;}quadrant=isOdd(t)?isNeg?1:4:isNeg?3:2;}return x.minus(pi).abs();}/*
   * Return the value of Decimal `x` as a string in base `baseOut`.
   *
   * If the optional `sd` argument is present include a binary exponent suffix.
   */function toStringBinary(x,baseOut,sd,rm){var base,e,i,k,len,roundUp,str,xd,y,Ctor=x.constructor,isExp=sd!==void 0;if(isExp){checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);}else{sd=Ctor.precision;rm=Ctor.rounding;}if(!x.isFinite()){str=nonFiniteToString(x);}else{str=finiteToString(x);i=str.indexOf('.');// Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
// maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
// minBinaryExponent = floor(decimalExponent * log[2](10))
// log[2](10) = 3.321928094887362347870319429489390175864
if(isExp){base=2;if(baseOut==16){sd=sd*4-3;}else if(baseOut==8){sd=sd*3-2;}}else{base=baseOut;}// Convert the number as an integer then divide the result by its base raised to a power such
// that the fraction part will be restored.
// Non-integer.
if(i>=0){str=str.replace('.','');y=new Ctor(1);y.e=str.length-i;y.d=convertBase(finiteToString(y),10,base);y.e=y.d.length;}xd=convertBase(str,10,base);e=len=xd.length;// Remove trailing zeros.
for(;xd[--len]==0;)xd.pop();if(!xd[0]){str=isExp?'0p+0':'0';}else{if(i<0){e--;}else{x=new Ctor(x);x.d=xd;x.e=e;x=divide(x,y,sd,rm,0,base);xd=x.d;e=x.e;roundUp=inexact;}// The rounding digit, i.e. the digit after the digit that may be rounded up.
i=xd[sd];k=base/2;roundUp=roundUp||xd[sd+1]!==void 0;roundUp=rm<4?(i!==void 0||roundUp)&&(rm===0||rm===(x.s<0?3:2)):i>k||i===k&&(rm===4||roundUp||rm===6&&xd[sd-1]&1||rm===(x.s<0?8:7));xd.length=sd;if(roundUp){// Rounding up may mean the previous digit has to be rounded up and so on.
for(;++xd[--sd]>base-1;){xd[sd]=0;if(!sd){++e;xd.unshift(1);}}}// Determine trailing zeros.
for(len=xd.length;!xd[len-1];--len);// E.g. [4, 11, 15] becomes 4bf.
for(i=0,str='';i<len;i++)str+=NUMERALS.charAt(xd[i]);// Add binary exponent suffix?
if(isExp){if(len>1){if(baseOut==16||baseOut==8){i=baseOut==16?4:3;for(--len;len%i;len++)str+='0';xd=convertBase(str,base,baseOut);for(len=xd.length;!xd[len-1];--len);// xd[0] will always be be 1
for(i=1,str='1.';i<len;i++)str+=NUMERALS.charAt(xd[i]);}else{str=str.charAt(0)+'.'+str.slice(1);}}str=str+(e<0?'p':'p+')+e;}else if(e<0){for(;++e;)str='0'+str;str='0.'+str;}else{if(++e>len)for(e-=len;e--;)str+='0';else if(e<len)str=str.slice(0,e)+'.'+str.slice(e);}}str=(baseOut==16?'0x':baseOut==2?'0b':baseOut==8?'0o':'')+str;}return x.s<0?'-'+str:str;}// Does not strip trailing zeros.
function truncate(arr,len){if(arr.length>len){arr.length=len;return true;}}// Decimal methods
/*
   *  abs
   *  acos
   *  acosh
   *  add
   *  asin
   *  asinh
   *  atan
   *  atanh
   *  atan2
   *  cbrt
   *  ceil
   *  clamp
   *  clone
   *  config
   *  cos
   *  cosh
   *  div
   *  exp
   *  floor
   *  hypot
   *  ln
   *  log
   *  log2
   *  log10
   *  max
   *  min
   *  mod
   *  mul
   *  pow
   *  random
   *  round
   *  set
   *  sign
   *  sin
   *  sinh
   *  sqrt
   *  sub
   *  sum
   *  tan
   *  tanh
   *  trunc
   */ /*
   * Return a new Decimal whose value is the absolute value of `x`.
   *
   * x {number|string|Decimal}
   *
   */function abs(x){return new this(x).abs();}/*
   * Return a new Decimal whose value is the arccosine in radians of `x`.
   *
   * x {number|string|Decimal}
   *
   */function acos(x){return new this(x).acos();}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function acosh(x){return new this(x).acosh();}/*
   * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function add(x,y){return new this(x).plus(y);}/*
   * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function asin(x){return new this(x).asin();}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function asinh(x){return new this(x).asinh();}/*
   * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function atan(x){return new this(x).atan();}/*
   * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
   * `precision` significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function atanh(x){return new this(x).atanh();}/*
   * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
   * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * Domain: [-Infinity, Infinity]
   * Range: [-pi, pi]
   *
   * y {number|string|Decimal} The y-coordinate.
   * x {number|string|Decimal} The x-coordinate.
   *
   * atan2(±0, -0)               = ±pi
   * atan2(±0, +0)               = ±0
   * atan2(±0, -x)               = ±pi for x > 0
   * atan2(±0, x)                = ±0 for x > 0
   * atan2(-y, ±0)               = -pi/2 for y > 0
   * atan2(y, ±0)                = pi/2 for y > 0
   * atan2(±y, -Infinity)        = ±pi for finite y > 0
   * atan2(±y, +Infinity)        = ±0 for finite y > 0
   * atan2(±Infinity, x)         = ±pi/2 for finite x
   * atan2(±Infinity, -Infinity) = ±3*pi/4
   * atan2(±Infinity, +Infinity) = ±pi/4
   * atan2(NaN, x) = NaN
   * atan2(y, NaN) = NaN
   *
   */function atan2(y,x){y=new this(y);x=new this(x);var r,pr=this.precision,rm=this.rounding,wpr=pr+4;// Either NaN
if(!y.s||!x.s){r=new this(NaN);// Both ±Infinity
}else if(!y.d&&!x.d){r=getPi(this,wpr,1).times(x.s>0?0.25:0.75);r.s=y.s;// x is ±Infinity or y is ±0
}else if(!x.d||y.isZero()){r=x.s<0?getPi(this,pr,rm):new this(0);r.s=y.s;// y is ±Infinity or x is ±0
}else if(!y.d||x.isZero()){r=getPi(this,wpr,1).times(0.5);r.s=y.s;// Both non-zero and finite
}else if(x.s<0){this.precision=wpr;this.rounding=1;r=this.atan(divide(y,x,wpr,1));x=getPi(this,wpr,1);this.precision=pr;this.rounding=rm;r=y.s<0?r.minus(x):r.plus(x);}else{r=this.atan(divide(y,x,wpr,1));}return r;}/*
   * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function cbrt(x){return new this(x).cbrt();}/*
   * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
   *
   * x {number|string|Decimal}
   *
   */function ceil(x){return finalise(x=new this(x),x.e+1,2);}/*
   * Return a new Decimal whose value is `x` clamped to the range delineated by `min` and `max`.
   *
   * x {number|string|Decimal}
   * min {number|string|Decimal}
   * max {number|string|Decimal}
   *
   */function clamp(x,min,max){return new this(x).clamp(min,max);}/*
   * Configure global settings for a Decimal constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *   maxE       {number}
   *   minE       {number}
   *   modulo     {number}
   *   crypto     {boolean|number}
   *   defaults   {true}
   *
   * E.g. Decimal.config({ precision: 20, rounding: 4 })
   *
   */function config(obj){if(!obj||_typeof(obj)!=='object')throw Error(decimalError+'Object expected');var i,p,v,useDefaults=obj.defaults===true,ps=['precision',1,MAX_DIGITS,'rounding',0,8,'toExpNeg',-EXP_LIMIT,0,'toExpPos',0,EXP_LIMIT,'maxE',0,EXP_LIMIT,'minE',-EXP_LIMIT,0,'modulo',0,9];for(i=0;i<ps.length;i+=3){if(p=ps[i],useDefaults)this[p]=DEFAULTS[p];if((v=obj[p])!==void 0){if(mathfloor(v)===v&&v>=ps[i+1]&&v<=ps[i+2])this[p]=v;else throw Error(invalidArgument+p+': '+v);}}if(p='crypto',useDefaults)this[p]=DEFAULTS[p];if((v=obj[p])!==void 0){if(v===true||v===false||v===0||v===1){if(v){if(typeof crypto!='undefined'&&crypto&&(crypto.getRandomValues||crypto.randomBytes)){this[p]=true;}else{throw Error(cryptoUnavailable);}}else{this[p]=false;}}else{throw Error(invalidArgument+p+': '+v);}}return this;}/*
   * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function cos(x){return new this(x).cos();}/*
   * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function cosh(x){return new this(x).cosh();}/*
   * Create and return a Decimal constructor with the same configuration properties as this Decimal
   * constructor.
   *
   */function clone(obj){var i,p,ps;/*
     * The Decimal constructor and exported function.
     * Return a new Decimal instance.
     *
     * v {number|string|Decimal} A numeric value.
     *
     */function Decimal(v){var e,i,t,x=this;// Decimal called without new.
if(!(x instanceof Decimal))return new Decimal(v);// Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
// which points to Object.
x.constructor=Decimal;// Duplicate.
if(isDecimalInstance(v)){x.s=v.s;if(external){if(!v.d||v.e>Decimal.maxE){// Infinity.
x.e=NaN;x.d=null;}else if(v.e<Decimal.minE){// Zero.
x.e=0;x.d=[0];}else{x.e=v.e;x.d=v.d.slice();}}else{x.e=v.e;x.d=v.d?v.d.slice():v.d;}return;}t=_typeof(v);if(t==='number'){if(v===0){x.s=1/v<0?-1:1;x.e=0;x.d=[0];return;}if(v<0){v=-v;x.s=-1;}else{x.s=1;}// Fast path for small integers.
if(v===~~v&&v<1e7){for(e=0,i=v;i>=10;i/=10)e++;if(external){if(e>Decimal.maxE){x.e=NaN;x.d=null;}else if(e<Decimal.minE){x.e=0;x.d=[0];}else{x.e=e;x.d=[v];}}else{x.e=e;x.d=[v];}return;// Infinity, NaN.
}else if(v*0!==0){if(!v)x.s=NaN;x.e=NaN;x.d=null;return;}return parseDecimal(x,v.toString());}else if(t!=='string'){throw Error(invalidArgument+v);}// Minus sign?
if((i=v.charCodeAt(0))===45){v=v.slice(1);x.s=-1;}else{// Plus sign?
if(i===43)v=v.slice(1);x.s=1;}return isDecimal.test(v)?parseDecimal(x,v):parseOther(x,v);}Decimal.prototype=P;Decimal.ROUND_UP=0;Decimal.ROUND_DOWN=1;Decimal.ROUND_CEIL=2;Decimal.ROUND_FLOOR=3;Decimal.ROUND_HALF_UP=4;Decimal.ROUND_HALF_DOWN=5;Decimal.ROUND_HALF_EVEN=6;Decimal.ROUND_HALF_CEIL=7;Decimal.ROUND_HALF_FLOOR=8;Decimal.EUCLID=9;Decimal.config=Decimal.set=config;Decimal.clone=clone;Decimal.isDecimal=isDecimalInstance;Decimal.abs=abs;Decimal.acos=acos;Decimal.acosh=acosh;// ES6
Decimal.add=add;Decimal.asin=asin;Decimal.asinh=asinh;// ES6
Decimal.atan=atan;Decimal.atanh=atanh;// ES6
Decimal.atan2=atan2;Decimal.cbrt=cbrt;// ES6
Decimal.ceil=ceil;Decimal.clamp=clamp;Decimal.cos=cos;Decimal.cosh=cosh;// ES6
Decimal.div=div;Decimal.exp=exp;Decimal.floor=floor;Decimal.hypot=hypot;// ES6
Decimal.ln=ln;Decimal.log=log;Decimal.log10=log10;// ES6
Decimal.log2=log2;// ES6
Decimal.max=max;Decimal.min=min;Decimal.mod=mod;Decimal.mul=mul;Decimal.pow=pow;Decimal.random=random;Decimal.round=round;Decimal.sign=sign;// ES6
Decimal.sin=sin;Decimal.sinh=sinh;// ES6
Decimal.sqrt=sqrt;Decimal.sub=sub;Decimal.sum=sum;Decimal.tan=tan;Decimal.tanh=tanh;// ES6
Decimal.trunc=trunc;// ES6
if(obj===void 0)obj={};if(obj){if(obj.defaults!==true){ps=['precision','rounding','toExpNeg','toExpPos','maxE','minE','modulo','crypto'];for(i=0;i<ps.length;)if(!obj.hasOwnProperty(p=ps[i++]))obj[p]=this[p];}}Decimal.config(obj);return Decimal;}/*
   * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function div(x,y){return new this(x).div(y);}/*
   * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The power to which to raise the base of the natural log.
   *
   */function exp(x){return new this(x).exp();}/*
   * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
   *
   * x {number|string|Decimal}
   *
   */function floor(x){return finalise(x=new this(x),x.e+1,3);}/*
   * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
   * rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
   *
   * arguments {number|string|Decimal}
   *
   */function hypot(){var i,n,t=new this(0);external=false;for(i=0;i<arguments.length;){n=new this(arguments[i++]);if(!n.d){if(n.s){external=true;return new this(1/0);}t=n;}else if(t.d){t=t.plus(n.times(n));}}external=true;return t.sqrt();}/*
   * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
   * otherwise return false.
   *
   */function isDecimalInstance(obj){return obj instanceof Decimal||obj&&obj.toStringTag===tag||false;}/*
   * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function ln(x){return new this(x).ln();}/*
   * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
   * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
   *
   * log[y](x)
   *
   * x {number|string|Decimal} The argument of the logarithm.
   * y {number|string|Decimal} The base of the logarithm.
   *
   */function log(x,y){return new this(x).log(y);}/*
   * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function log2(x){return new this(x).log(2);}/*
   * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function log10(x){return new this(x).log(10);}/*
   * Return a new Decimal whose value is the maximum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */function max(){return maxOrMin(this,arguments,'lt');}/*
   * Return a new Decimal whose value is the minimum of the arguments.
   *
   * arguments {number|string|Decimal}
   *
   */function min(){return maxOrMin(this,arguments,'gt');}/*
   * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function mod(x,y){return new this(x).mod(y);}/*
   * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function mul(x,y){return new this(x).mul(y);}/*
   * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} The base.
   * y {number|string|Decimal} The exponent.
   *
   */function pow(x,y){return new this(x).pow(y);}/*
   * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
   * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
   * are produced).
   *
   * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
   *
   */function random(sd){var d,e,k,n,i=0,r=new this(1),rd=[];if(sd===void 0)sd=this.precision;else checkInt32(sd,1,MAX_DIGITS);k=Math.ceil(sd/LOG_BASE);if(!this.crypto){for(;i<k;)rd[i++]=Math.random()*1e7|0;// Browsers supporting crypto.getRandomValues.
}else if(crypto.getRandomValues){d=crypto.getRandomValues(new Uint32Array(k));for(;i<k;){n=d[i];// 0 <= n < 4294967296
// Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
if(n>=4.29e9){d[i]=crypto.getRandomValues(new Uint32Array(1))[0];}else{// 0 <= n <= 4289999999
// 0 <= (n % 1e7) <= 9999999
rd[i++]=n%1e7;}}// Node.js supporting crypto.randomBytes.
}else if(crypto.randomBytes){// buffer
d=crypto.randomBytes(k*=4);for(;i<k;){// 0 <= n < 2147483648
n=d[i]+(d[i+1]<<8)+(d[i+2]<<16)+((d[i+3]&0x7f)<<24);// Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
if(n>=2.14e9){crypto.randomBytes(4).copy(d,i);}else{// 0 <= n <= 2139999999
// 0 <= (n % 1e7) <= 9999999
rd.push(n%1e7);i+=4;}}i=k/4;}else{throw Error(cryptoUnavailable);}k=rd[--i];sd%=LOG_BASE;// Convert trailing digits to zeros according to sd.
if(k&&sd){n=mathpow(10,LOG_BASE-sd);rd[i]=(k/n|0)*n;}// Remove trailing words which are zero.
for(;rd[i]===0;i--)rd.pop();// Zero?
if(i<0){e=0;rd=[0];}else{e=-1;// Remove leading words which are zero and adjust exponent accordingly.
for(;rd[0]===0;e-=LOG_BASE)rd.shift();// Count the digits of the first word of rd to determine leading zeros.
for(k=1,n=rd[0];n>=10;n/=10)k++;// Adjust the exponent for leading zeros of the first word of rd.
if(k<LOG_BASE)e-=LOG_BASE-k;}r.e=e;r.d=rd;return r;}/*
   * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
   *
   * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
   *
   * x {number|string|Decimal}
   *
   */function round(x){return finalise(x=new this(x),x.e+1,this.rounding);}/*
   * Return
   *   1    if x > 0,
   *  -1    if x < 0,
   *   0    if x is 0,
   *  -0    if x is -0,
   *   NaN  otherwise
   *
   * x {number|string|Decimal}
   *
   */function sign(x){x=new this(x);return x.d?x.d[0]?x.s:0*x.s:x.s||NaN;}/*
   * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function sin(x){return new this(x).sin();}/*
   * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function sinh(x){return new this(x).sinh();}/*
   * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   *
   */function sqrt(x){return new this(x).sqrt();}/*
   * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
   * using rounding mode `rounding`.
   *
   * x {number|string|Decimal}
   * y {number|string|Decimal}
   *
   */function sub(x,y){return new this(x).sub(y);}/*
   * Return a new Decimal whose value is the sum of the arguments, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * Only the result is rounded, not the intermediate calculations.
   *
   * arguments {number|string|Decimal}
   *
   */function sum(){var i=0,args=arguments,x=new this(args[i]);external=false;for(;x.s&&++i<args.length;)x=x.plus(args[i]);external=true;return finalise(x,this.precision,this.rounding);}/*
   * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
   * digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tan(x){return new this(x).tan();}/*
   * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
   * significant digits using rounding mode `rounding`.
   *
   * x {number|string|Decimal} A value in radians.
   *
   */function tanh(x){return new this(x).tanh();}/*
   * Return a new Decimal whose value is `x` truncated to an integer.
   *
   * x {number|string|Decimal}
   *
   */function trunc(x){return finalise(x=new this(x),x.e+1,1);}// Create and configure initial Decimal constructor.
Decimal=clone(DEFAULTS);Decimal.prototype.constructor=Decimal;Decimal['default']=Decimal.Decimal=Decimal;// Create the internal constants from their string values.
LN10=new Decimal(LN10);PI=new Decimal(PI);// Export.
// AMD.
if(typeof define=='function'&&define.amd){define(function(){return Decimal;});// Node and other environments that support module.exports.
}else if(typeof module!='undefined'&&module.exports){if(typeof Symbol=='function'&&_typeof(Symbol.iterator)=='symbol'){P[Symbol['for']('nodejs.util.inspect.custom')]=P.toString;P[Symbol.toStringTag]='Decimal';}module.exports=Decimal;// Browser.
}else{if(!globalScope){globalScope=typeof self!='undefined'&&self&&self.self==self?self:window;}noConflict=globalScope.Decimal;Decimal.noConflict=function(){globalScope.Decimal=noConflict;return Decimal;};globalScope.Decimal=Decimal;}})(this);},{}],22:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _utils=require("./utils.js");var addedDiff=function addedDiff(lhs,rhs){if(lhs===rhs||!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return{};return Object.keys(rhs).reduce(function(acc,key){if((0,_utils.hasOwnProperty)(lhs,key)){var difference=addedDiff(lhs[key],rhs[key]);if((0,_utils.isObject)(difference)&&(0,_utils.isEmpty)(difference))return acc;acc[key]=difference;return acc;}acc[key]=rhs[key];return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=addedDiff;exports["default"]=_default;},{"./utils.js":28}],23:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _utils=require("./utils.js");var deletedDiff=function deletedDiff(lhs,rhs){if(lhs===rhs||!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return{};return Object.keys(lhs).reduce(function(acc,key){if((0,_utils.hasOwnProperty)(rhs,key)){var difference=deletedDiff(lhs[key],rhs[key]);if((0,_utils.isObject)(difference)&&(0,_utils.isEmpty)(difference))return acc;acc[key]=difference;return acc;}acc[key]=undefined;return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=deletedDiff;exports["default"]=_default;},{"./utils.js":28}],24:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _added=_interopRequireDefault(require("./added.js"));var _deleted=_interopRequireDefault(require("./deleted.js"));var _updated=_interopRequireDefault(require("./updated.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}var detailedDiff=function detailedDiff(lhs,rhs){return{added:(0,_added["default"])(lhs,rhs),deleted:(0,_deleted["default"])(lhs,rhs),updated:(0,_updated["default"])(lhs,rhs)};};var _default=detailedDiff;exports["default"]=_default;},{"./added.js":22,"./deleted.js":23,"./updated.js":27}],25:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _utils=require("./utils.js");var diff=function diff(lhs,rhs){if(lhs===rhs)return{};// equal return no diff
if(!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return rhs;// return updated rhs
var deletedValues=Object.keys(lhs).reduce(function(acc,key){if(!(0,_utils.hasOwnProperty)(rhs,key)){acc[key]=undefined;}return acc;},(0,_utils.makeObjectWithoutPrototype)());if((0,_utils.isDate)(lhs)||(0,_utils.isDate)(rhs)){if(lhs.valueOf()==rhs.valueOf())return{};return rhs;}return Object.keys(rhs).reduce(function(acc,key){if(!(0,_utils.hasOwnProperty)(lhs,key)){acc[key]=rhs[key];// return added r key
return acc;}var difference=diff(lhs[key],rhs[key]);// If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
if((0,_utils.isEmptyObject)(difference)&&!(0,_utils.isDate)(difference)&&((0,_utils.isEmptyObject)(lhs[key])||!(0,_utils.isEmptyObject)(rhs[key])))return acc;// return no diff
acc[key]=difference;// return updated key
return acc;// return updated key
},deletedValues);};var _default=diff;exports["default"]=_default;},{"./utils.js":28}],26:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"addedDiff",{enumerable:true,get:function get(){return _added["default"];}});Object.defineProperty(exports,"deletedDiff",{enumerable:true,get:function get(){return _deleted["default"];}});Object.defineProperty(exports,"detailedDiff",{enumerable:true,get:function get(){return _detailed["default"];}});Object.defineProperty(exports,"diff",{enumerable:true,get:function get(){return _diff["default"];}});Object.defineProperty(exports,"updatedDiff",{enumerable:true,get:function get(){return _updated["default"];}});var _diff=_interopRequireDefault(require("./diff.js"));var _added=_interopRequireDefault(require("./added.js"));var _deleted=_interopRequireDefault(require("./deleted.js"));var _updated=_interopRequireDefault(require("./updated.js"));var _detailed=_interopRequireDefault(require("./detailed.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj};}},{"./added.js":22,"./deleted.js":23,"./detailed.js":24,"./diff.js":25,"./updated.js":27}],27:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _utils=require("./utils.js");var updatedDiff=function updatedDiff(lhs,rhs){if(lhs===rhs)return{};if(!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return rhs;if((0,_utils.isDate)(lhs)||(0,_utils.isDate)(rhs)){if(lhs.valueOf()==rhs.valueOf())return{};return rhs;}return Object.keys(rhs).reduce(function(acc,key){if((0,_utils.hasOwnProperty)(lhs,key)){var difference=updatedDiff(lhs[key],rhs[key]);// If the difference is empty, and the lhs is an empty object or the rhs is not an empty object
if((0,_utils.isEmptyObject)(difference)&&!(0,_utils.isDate)(difference)&&((0,_utils.isEmptyObject)(lhs[key])||!(0,_utils.isEmptyObject)(rhs[key])))return acc;// return no diff
acc[key]=difference;return acc;}return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=updatedDiff;exports["default"]=_default;},{"./utils.js":28}],28:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.makeObjectWithoutPrototype=exports.isObject=exports.isEmptyObject=exports.isEmpty=exports.isDate=exports.hasOwnProperty=void 0;var isDate=function isDate(d){return d instanceof Date;};exports.isDate=isDate;var isEmpty=function isEmpty(o){return Object.keys(o).length===0;};exports.isEmpty=isEmpty;var isObject=function isObject(o){return o!=null&&_typeof(o)==='object';};exports.isObject=isObject;var hasOwnProperty=function hasOwnProperty(o){var _Object$prototype$has;for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key2=1;_key2<_len;_key2++){args[_key2-1]=arguments[_key2];}return(_Object$prototype$has=Object.prototype.hasOwnProperty).call.apply(_Object$prototype$has,[o].concat(args));};exports.hasOwnProperty=hasOwnProperty;var isEmptyObject=function isEmptyObject(o){return isObject(o)&&isEmpty(o);};exports.isEmptyObject=isEmptyObject;var makeObjectWithoutPrototype=function makeObjectWithoutPrototype(){return Object.create(null);};exports.makeObjectWithoutPrototype=makeObjectWithoutPrototype;},{}],29:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/ /**
* Instruction Set Bace Class.
*
* @class ElucidatorInstructionSet
*/var ElucidatorInstructionSet=/*#__PURE__*/function(){function ElucidatorInstructionSet(pElucidator){_classCallCheck(this,ElucidatorInstructionSet);this.elucidator=pElucidator;this.namespace='default';}// Create an empty namespace for instructions and operations if either one doesn't exist
_createClass(ElucidatorInstructionSet,[{key:"initializeNamespace",value:function initializeNamespace(pNamespace){if(typeof pNamespace=='string'){this.namespace=pNamespace;}if(!this.elucidator.instructionSets.hasOwnProperty(this.namespace)){this.elucidator.instructionSets[this.namespace.toLowerCase()]={};}if(!this.elucidator.operationSets.hasOwnProperty(this.namespace)){this.elucidator.operationSets[this.namespace.toLowerCase()]={};}}// Add an instruction to the set
},{key:"addInstruction",value:function addInstruction(pInstructionHash,fInstructionFunction){if(typeof pInstructionHash!='string'){this.elucidator.logError("Attempted to add an instruction with an invalid hash; expected a string but the instruction hash type was ".concat(_typeof(pInstructionHash)));return false;}if(typeof fInstructionFunction!='function'){this.elucidator.logError("Attempted to add an instruction with an invalid function; expected a function but type was ".concat(_typeof(fInstructionFunction)));return false;}this.elucidator.instructionSets[this.namespace.toLowerCase()][pInstructionHash]=fInstructionFunction;return true;}},{key:"initializeInstructions",value:function initializeInstructions(){// This is where we map in the instructions.
// If the extending class calls super it will inject a harmless noop into the scope.
// It isn't recommended to do these inline as lambdas, but this code is generally not expected to be called.
// Unless the developer wants a noop in their instruction set...........
this.addInstruction('noop',function(pOperation){pOperation.logInfo('Executing a no-operation operation.');return true;});return true;}// Add an operation to the set
},{key:"addOperation",value:function addOperation(pOperationHash,pOperation){if(typeof pOperationHash!='string'){this.elucidator.logError("Attempted to add an operation with an invalid hash; expected a string but the operation hash type was ".concat(_typeof(pOperationHash)),pOperation);return false;}if(_typeof(pOperation)!='object'){this.elucidator.logError("Attempted to add an invalid operation; expected an object data type but the type was ".concat(_typeof(pOperation)),pOperation);return false;}// Validate the Description subobject, which is key to functioning.
if(!pOperation.hasOwnProperty("Description")){this.elucidator.logError("Attempted to add an operation with an invalid description; no Description subobject set.",pOperation);return false;}if(_typeof(pOperation.Description)!='object'){this.elucidator.logError("Attempted to add an operation with an invalid description; Description subobject was not an object.  The type was ".concat(_typeof(pOperation.Description),"."),pOperation);return false;}if(typeof pOperation.Description.Hash!='string'){if(typeof pOperation.Description.Operation=='string'){// Use the "Operation" as the "Hash"
pOperation.Description.Hash=pOperation.Description.Operation;}else{this.elucidator.logError("Attempted to add an operation with an invalid description; Description subobject did not contain a valid Hash which is required to call the operation.",pOperation);return false;}}// Now auto create data if it is missing or wrong in the Description
if(typeof pOperation.Description.Namespace!='string'||pOperation.Description.Namespace!=this.namespace){pOperation.Description.Namespace=this.namespace;}if(typeof pOperation.Description.Summary!='string'){pOperation.Description.Summary="[".concat(pOperation.Description.Namespace,"] [").concat(pOperation.Description.Hash,"] operation.");}// If there are no inputs, or outputs, or steps, add them.
if(!pOperation.hasOwnProperty('Inputs')){pOperation.Inputs={};}if(!pOperation.hasOwnProperty('Outputs')){pOperation.Outputs={};}if(!pOperation.hasOwnProperty('Steps')){pOperation.Steps=[];}// If there are no inputs, or outputs, or steps, add them.
// TODO: Add a step where we try to load this into Manyfest and see that it's valid.
if(_typeof(pOperation.Inputs)!=='object'){this.elucidator.logError("Attempted to add an operation with an invalid Inputs object.",pOperation);return false;}// If there are no inputs, or outputs, or steps, add them.
// TODO: Add a step where we try to load this into Manyfest and see that it's valid.
if(_typeof(pOperation.Outputs)!=='object'){this.elucidator.logError("Attempted to add an operation with an invalid Outputs object.",pOperation);return false;}if(!Array.isArray(pOperation.Steps)){this.elucidator.logError("Attempted to add an operation with an invalid Steps array.",pOperation);return false;}this.elucidator.operationSets[this.namespace.toLowerCase()][pOperationHash.toLowerCase()]=pOperation;return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('noop',{"Description":{"Operation":"noop","Description":"No operation - no affect on any data."}});return true;}}]);return ElucidatorInstructionSet;}();;module.exports=ElucidatorInstructionSet;},{}],30:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/ /**
* Elucidator simple logging shim (for browser and dependency-free running)
*/var logToConsole=function logToConsole(pLogLine,pLogObject,pLogLevel){var tmpLogLine=typeof pLogLine==='string'?pLogLine:'';var tmpLogLevel=typeof pLogLevel==='string'?pLogLevel:'INFO';console.log("[Elucidator:".concat(tmpLogLevel,"] ").concat(tmpLogLine));if(pLogObject)console.log(JSON.stringify(pLogObject,null,4)+"\n");};var logInfo=function logInfo(pLogLine,pLogObject){logToConsole(pLogLine,pLogObject,'Info');};var logWarning=function logWarning(pLogLine,pLogObject){logToConsole(pLogLine,pLogObject,'Warning');};var logError=function logError(pLogLine,pLogObject){logToConsole(pLogLine,pLogObject,'Error');};module.exports={logToConsole:logToConsole,info:logInfo,warning:logWarning,error:logError};},{}],31:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Elucidator-LogToConsole.js');var libManyfest=require('manyfest');var libPrecedent=require('precedent');var libElucidatorInstructionSet=require('./Elucidator-InstructionSet.js');/**
* Elucidator object address-based descriptions and manipulations.
*
* @class Elucidator
*/var Elucidator=/*#__PURE__*/function(){function Elucidator(pOperations,fInfoLog,fErrorLog){_classCallCheck(this,Elucidator);// Wire in logging
this.logInfo=typeof fInfoLog==='function'?fInfoLog:libSimpleLog.info;this.logWarning=typeof fWarningLog==='function'?fWarningLog:libSimpleLog.warning;this.logError=typeof fErrorLog==='function'?fErrorLog:libSimpleLog.error;// Instructions are the basic building blocks for operations
this.instructionSets={};// Operations are the solvers that can be called (instructions can't be called directly)
// These can be added at run-time as well
this.operationSets={};// Decide later how to make this truly unique.
this.UUID=0;this.loadDefaultInstructionSets();if(pOperations){var tmpSolverHashes=Object.keys(pOperations);for(var i=0;i<tmpSolverHashes.length;i++){this.addOperation('Custom',tmpSolverHashes[i],pOperations[tmpSolverHashes[i]]);}}}// Load an instruction set
_createClass(Elucidator,[{key:"loadInstructionSet",value:function loadInstructionSet(cInstructionSet){var tmpInstructionSet=new cInstructionSet(this);// Setup the namespace
tmpInstructionSet.initializeNamespace();tmpInstructionSet.initializeInstructions();tmpInstructionSet.initializeOperations();}},{key:"loadDefaultInstructionSets",value:function loadDefaultInstructionSets(){// The javascript math instructions and operations
// These provide the "Math" namespace
this.loadInstructionSet(require("./InstructionSets/Math-Javascript.js"));// A precision javascript math library that is consistent across browsers, stable and without mantissa issues
// Uses Decimal.js
// These provide the "PreciseMath" namespace
this.loadInstructionSet(require("./InstructionSets/PreciseMath-Decimal.js"));// The abstract geometry instructions and operations (rectangle area, circle area, etc.)
// These provide the "Geometry" namespace
this.loadInstructionSet(require("./InstructionSets/Geometry.js"));// The logic operations (if, execution of instructions, etc.)
// These provide the "Logic" namespace
this.loadInstructionSet(require("./InstructionSets/Logic.js"));// Basic string manipulation instructions and operations
// These provide the "String" namespace
this.loadInstructionSet(require("./InstructionSets/String.js"));// Basic set manipulation instructions and operations
// These provide the "Set" namespace
this.loadInstructionSet(require("./InstructionSets/Set.js"));}},{key:"operationExists",value:function operationExists(pNamespace,pOperationHash){if(typeof pNamespace!='string'||typeof pOperationHash!='string'){return false;}var tmpNamespace=pNamespace.toLowerCase();return this.operationSets.hasOwnProperty(tmpNamespace)&&this.operationSets[tmpNamespace].hasOwnProperty(pOperationHash.toLowerCase());}},{key:"addOperation",value:function addOperation(pNamespace,pOperationHash,pOperation){if(typeof pNamespace!='string'){this.logError("Attempted to add an operation at runtime via Elucidator.addOperation with an invalid namespace; expected a string but the type was ".concat(_typeof(pNamespace)),pOperation);return false;}var tmpOperationInjector=new libElucidatorInstructionSet(this);tmpOperationInjector.initializeNamespace(pNamespace);return tmpOperationInjector.addOperation(pOperationHash,pOperation);}},{key:"solveInternalOperation",value:function solveInternalOperation(pNamespace,pOperationHash,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext){if(!this.operationExists(pNamespace,pOperationHash)){this.logError("Attempted to solveInternalOperation for namespace ".concat(pNamespace," operationHash ").concat(pOperationHash," but the operation was not found."));// TODO: Should this return something with an error log populated?
return false;}var tmpOperation=this.operationSets[pNamespace.toLowerCase()][pOperationHash.toLowerCase()];return this.solveOperation(tmpOperation,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext);}},{key:"solveOperation",value:function solveOperation(pOperationObject,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext){var _this3=this;var tmpOperation=JSON.parse(JSON.stringify(pOperationObject));if(_typeof(pInputObject)!='object'){this.logError("Attempted to run a solve but the passed in Input was not an object.  The type was ".concat(_typeof(pInputObject),"."));return false;}var tmpInputObject=pInputObject;// Default to reusing the input object as the output object.
var tmpOutputObject=tmpInputObject;// This is how recursive solutions bind their context together.
var tmpSolutionContext=pSolutionContext;if(typeof tmpSolutionContext==='undefined'){tmpSolutionContext={"SolutionGUID":"Solution-".concat(this.UUID++),"SolutionBaseNamespace":pOperationObject.Description.Namespace,"SolutionBaseOperation":pOperationObject.Description.Operation,"SolutionLog":[]};// This is the root operation, see if there are Inputs and Outputs created ... if not, create them.
if(!tmpOperation.hasOwnProperty('Inputs')){tmpOperation.Inputs={};}if(!tmpOperation.hasOwnProperty('Outputs')){tmpOperation.Outputs={};}// This is the root Operation, see if there is a hash translation available for either side (input or output)
if(tmpOperation.hasOwnProperty('InputHashTranslationTable')){tmpSolutionContext.InputHashMapping=JSON.parse(JSON.stringify(tmpOperation.InputHashTranslationTable));}else{tmpSolutionContext.InputHashMapping={};}if(tmpOperation.hasOwnProperty('OutputHashTranslationTable')){tmpSolutionContext.OutputHashMapping=JSON.parse(JSON.stringify(tmpOperation.OutputHashTranslationTable));}if(_typeof(pOutputObject)!='object'&&typeof tmpOutputHashMapping=='undefined'&&typeof tmpInputHashMapping!='undefined'){// Reuse the input hash mapping if:
//   1) we auto-mapped the input hash mapping to the output because only an input object was supplied
//   2) there *was not* an output hash mapping supplied
//   3) there *was* an input hash mapping supplied
//
// This seems simple at first but exposes some really interesting behaviors in terms of
// reusing the same object and schema for input and output, but having different hash
// mappings for each of them.
tmpSolutionContext.OutputHashMapping=tmpSolutionContext.InputHashMapping;}}if(_typeof(pOutputObject)=='object'){// If the call defined an explicit, different output object from the input object use that instead.
tmpOutputObject=pOutputObject;}var tmpDescriptionManyfest=false;if(typeof pDescriptionManyfest==='undefined'){// We are going to use this for some clever schema manipulations, then recreate the object
tmpDescriptionManyfest=new libManyfest();// Synthesize a manyfest from the Input and Output properties
var tmpManyfestSchema={Scope:'Solver Data Part Descriptions',Descriptors:tmpDescriptionManyfest.schemaManipulations.mergeAddressMappings(tmpOperation.Inputs,tmpOperation.Outputs)};}else{// Clone the passed-in manyfest, so mutations do not alter the upstream version
tmpDescriptionManyfest=pDescriptionManyfest.clone();}// Now that the operation object has been created uniquely, apply any passed-in address-hash and hash-hash remappings
if(pInputAddressMapping){tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOperation.Inputs,pInputAddressMapping);}if(pOutputAddressMapping){tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOperation.Inputs,pOutputAddressMapping);}if(tmpSolutionContext.InputHashMapping){tmpDescriptionManyfest.hashTranslations.addTranslation(tmpSolutionContext.InputHashMapping);}if(tmpSolutionContext.OutputHashMapping){tmpDescriptionManyfest.hashTranslations.addTranslation(tmpSolutionContext.OutputHashMapping);}// Set some kind of unique identifier for the operation
tmpOperation.UUID=this.UUID++;tmpOperation.SolutionContext=tmpSolutionContext;if(tmpOperation.Description.Synopsys){tmpSolutionContext.SolutionLog.push("[".concat(tmpOperation.UUID,"]: Solver running operation ").concat(tmpOperation.Description.Synopsys));}var tmpPrecedent=new libPrecedent();tmpPrecedent.addPattern('{{Name:','}}',function(pHash){var tmpHash=pHash.trim();var tmpDescriptor=tmpDescriptionManyfest.getDescriptorByHash(tmpHash);// Return a human readable value
if(_typeof(tmpDescriptor)=='object'&&tmpDescriptor.hasOwnProperty('Name')){return tmpDescriptor.Name;}else{return tmpHash;}});tmpPrecedent.addPattern('{{InputValue:','}}',function(pHash){var tmpHash=pHash.trim();return tmpDescriptionManyfest.getValueByHash(tmpInputObject,tmpHash);});tmpPrecedent.addPattern('{{OutputValue:','}}',function(pHash){var tmpHash=pHash.trim();return tmpDescriptionManyfest.getValueByHash(tmpOutputObject,tmpHash);});if(tmpOperation.hasOwnProperty('Log')&&tmpOperation.Log.hasOwnProperty('PreOperation')){if(typeof tmpOperation.Log.PreOperation=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PreOperation));}else if(Array.isArray(tmpOperation.Log.PreOperation)){for(var i=0;i<tmpOperation.Log.PreOperation.length;i++){if(typeof tmpOperation.Log.PreOperation[i]=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PreOperation[i]));}}}}// Now step through each operation and solve
var _loop=function _loop(_i2){var tmpStep=tmpOperation.Steps[_i2];// Instructions are always endpoints -- they *do not* recurse.
if(tmpStep.hasOwnProperty('Instruction')){var tmpInputSchema={"Scope":"InputObject","Descriptors":JSON.parse(JSON.stringify(tmpOperation.Inputs))};// Perform step-specific address mappings.
tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpInputSchema.Descriptors,tmpStep.InputHashAddressMap);var tmpInputManyfest=new libManyfest(tmpInputSchema);if(tmpSolutionContext.InputHashMapping){tmpInputManyfest.hashTranslations.addTranslation(tmpSolutionContext.InputHashMapping);}var tmpOutputSchema={"Scope":"OutputObject","Descriptors":JSON.parse(JSON.stringify(tmpOperation.Outputs))};tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOutputSchema.Descriptors,tmpStep.OutputHashAddressMap);var tmpOutputManyfest=new libManyfest(tmpOutputSchema);if(tmpSolutionContext.OutputHashMapping){tmpOutputManyfest.hashTranslations.addTranslation(tmpSolutionContext.OutputHashMapping);}// Construct the instruction state object
var tmpInstructionState={Elucidator:_this3,Namespace:tmpStep.Namespace.toLowerCase(),Instruction:tmpStep.Instruction.toLowerCase(),Operation:tmpOperation,SolutionContext:tmpSolutionContext,DescriptionManyfest:tmpDescriptionManyfest,InputObject:tmpInputObject,InputManyfest:tmpInputManyfest,OutputObject:tmpOutputObject,OutputManyfest:tmpOutputManyfest};tmpInstructionState.logError=function(pMessage){tmpSolutionContext.SolutionLog.push("[ERROR][Operation ".concat(tmpInstructionState.Operation.Description.Namespace,":").concat(tmpInstructionState.Operation.Description.Hash," - Step #").concat(_i2,":").concat(tmpStep.Namespace,":").concat(tmpStep.Instruction,"] ").concat(pMessage));};tmpInstructionState.logInfo=function(pMessage){tmpSolutionContext.SolutionLog.push("[INFO][Operation ".concat(tmpInstructionState.Operation.Description.Namespace,":").concat(tmpInstructionState.Operation.Description.Hash," - Step #").concat(_i2,":").concat(tmpStep.Namespace,":").concat(tmpStep.Instruction,"] ").concat(pMessage));};if(_this3.instructionSets[tmpInstructionState.Namespace].hasOwnProperty(tmpInstructionState.Instruction)){var fInstruction=_this3.instructionSets[tmpInstructionState.Namespace][tmpInstructionState.Instruction];fInstruction(tmpInstructionState);}}// Operations recurse.
if(tmpStep.hasOwnProperty('Operation')){if(typeof tmpStep.Operation=='string'){_this3.solveInternalOperation(tmpStep.Namespace,tmpStep.Operation,tmpInputObject,tmpOutputObject,tmpDescriptionManyfest,tmpStep.InputHashAddressMap,tmpStep.OutputHashAddressMap,tmpSolutionContext);}else if(_typeof(tmpStep.Operation)=='object'){// You can even define an inline object operation!  This gets crazy fast
_this3.solveOperation(tmpStep.Operation,tmpInputObject,tmpOutputObject,tmpDescriptionManyfest,tmpStep.InputHashAddressMap,tmpStep.OutputHashAddressMap,tmpSolutionContext);}}};for(var _i2=0;_i2<tmpOperation.Steps.length;_i2++){_loop(_i2);}if(tmpOperation.hasOwnProperty('Log')&&tmpOperation.Log.hasOwnProperty('PostOperation')){if(typeof tmpOperation.Log.PostOperation=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PostOperation));}else if(Array.isArray(tmpOperation.Log.PreOperation)){for(var _i3=0;_i3<tmpOperation.Log.PostOperation.length;_i3++){if(typeof tmpOperation.Log.PostOperation[_i3]=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PostOperation[_i3]));}}}}return tmpSolutionContext;}}]);return Elucidator;}();;module.exports=Elucidator;},{"./Elucidator-InstructionSet.js":29,"./Elucidator-LogToConsole.js":30,"./InstructionSets/Geometry.js":32,"./InstructionSets/Logic.js":33,"./InstructionSets/Math-Javascript.js":34,"./InstructionSets/PreciseMath-Decimal.js":58,"./InstructionSets/Set.js":59,"./InstructionSets/String.js":60,"manyfest":92,"precedent":95}],32:[function(require,module,exports){// Solution providers are meant to be stateless, and not classes.
// These solution providers are akin to drivers, connecting code libraries or 
// other types of behavior to mapping operations.
var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var Geometry=/*#__PURE__*/function(_libElucidatorInstruc){_inherits(Geometry,_libElucidatorInstruc);var _super=_createSuper(Geometry);function Geometry(pElucidator){var _this4;_classCallCheck(this,Geometry);_this4=_super.call(this,pElucidator);_this4.namespace='Geometry';return _this4;}// Geometry provides no instructions
_createClass(Geometry,[{key:"initializeInstructions",value:function initializeInstructions(){return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('rectanglearea',require("./Operations/Geometry-RectangleArea.json"));return true;}}]);return Geometry;}(libElucidatorInstructionSet);module.exports=Geometry;},{"../Elucidator-InstructionSet.js":29,"./Operations/Geometry-RectangleArea.json":35}],33:[function(require,module,exports){// Solution providers are meant to be stateless, and not classes.
// These solution providers are akin to drivers, connecting code libraries or 
// other types of behavior to mapping operations.
var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var ifInstruction=function ifInstruction(pOperation){var tmpLeftValue=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'leftValue');var tmpRightValue=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'rightValue');var tmpComparator=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'comparator').toString().toLowerCase();var tmpComparisonOperator='equal';// This may eventually come from configuration; for now just leave it here.
var tmpComparisonOperatorMapping={'==':'equal','eq':'equal','equal':'equal','!=':'notequal','noteq':'notequal','notequal':'notequal','===':'identity','id':'identity','identity':'identity','>':'greaterthan','gt':'greaterthan','greaterthan':'greaterthan','>=':'greaterthanorequal','gte':'greaterthanorequal','greaterthanorequal':'greaterthanorequal','<':'lessthan','lt':'lessthan','lessthan':'lessthan','<=':'lessthanorequal','lte':'lessthanorequal','lessthanorequal':'lessthanorequal'};if(tmpComparisonOperatorMapping.hasOwnProperty(tmpComparator)){tmpComparisonOperator=tmpComparisonOperatorMapping[tmpComparator];}var tmpTrueNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'trueNamespace');var tmpTrueOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'trueOperation');var tmpFalseNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'falseNamespace');var tmpFalseOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'falseOperation');var tmpTruthiness=null;switch(tmpComparisonOperator){case'equal':tmpTruthiness=tmpLeftValue==tmpRightValue;break;case'identity':tmpTruthiness=tmpLeftValue===tmpRightValue;break;case'notequal':tmpTruthiness=tmpLeftValue!=tmpRightValue;break;case'greaterthan':tmpTruthiness=tmpLeftValue>tmpRightValue;break;case'greaterthanorequal':tmpTruthiness=tmpLeftValue>=tmpRightValue;break;case'lessthan':tmpTruthiness=tmpLeftValue<tmpRightValue;break;case'lessthanorequal':tmpTruthiness=tmpLeftValue<=tmpRightValue;break;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'truthinessResult',tmpTruthiness);// Now execute the operations (unless it is a noop or a bunk operation)
// This is, frankly, kindof a mind-blowing amount of recursion possibility.
// Both of these are falling back on the base solution hash mapping.
// --> Not certain if this is the correct approach and the only way to tell will be through exercise of this
if(tmpTruthiness&&typeof tmpTrueNamespace=='string'&&typeof tmpTrueOperation=='string'&&tmpTrueOperation!='noop'){pOperation.Elucidator.solveInternalOperation(tmpTrueNamespace,tmpTrueOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);}else if(typeof tmpFalseNamespace=='string'&&typeof tmpFalseOperation=='string'&&tmpFalseOperation!='noop'){pOperation.Elucidator.solveInternalOperation(tmpFalseNamespace,tmpFalseOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);}return true;};var executeOperation=function executeOperation(pOperation){var tmpNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'namespace');var tmpOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'operation');pOperation.Elucidator.solveInternalOperation(tmpNamespace,tmpOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);return true;};var Logic=/*#__PURE__*/function(_libElucidatorInstruc2){_inherits(Logic,_libElucidatorInstruc2);var _super2=_createSuper(Logic);function Logic(pElucidator){var _this5;_classCallCheck(this,Logic);_this5=_super2.call(this,pElucidator);_this5.namespace='Logic';return _this5;}_createClass(Logic,[{key:"initializeInstructions",value:function initializeInstructions(){// Logic actually wants a noop instruction!
_get(_getPrototypeOf(Logic.prototype),"initializeInstructions",this).call(this);this.addInstruction('if',ifInstruction);this.addInstruction('execute',executeOperation);return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('if',require("./Operations/Logic-If.json"));this.addOperation('execute',require("./Operations/Logic-Execute.json"));return true;}}]);return Logic;}(libElucidatorInstructionSet);module.exports=Logic;},{"../Elucidator-InstructionSet.js":29,"./Operations/Logic-Execute.json":36,"./Operations/Logic-If.json":37}],34:[function(require,module,exports){// Solution providers are meant to be stateless, and not classes.
// These solution providers are akin to drivers, connecting code libraries or 
// other types of behavior to mapping operations.
var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var add=function add(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA+tmpB);return true;};var subtract=function subtract(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA-tmpB);return true;};var multiply=function multiply(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA*tmpB);return true;};var divide=function divide(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA/tmpB);return true;};var aggregate=function aggregate(pOperation){var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpObjectType=_typeof(tmpA);var tmpAggregationValue=0;if(tmpObjectType=='object'){if(Array.isArray(tmpA)){for(var i=0;i<tmpA.length;i++){// If this is an array, enumerate it and try to aggregate each number
var tmpValue=parseInt(tmpA[i]);if(isNaN(tmpValue)){pOperation.logError("Array element index [".concat(i,"] could not be parsed as a number; skipping.  (").concat(tmpA[i],")"));}else{tmpAggregationValue+=tmpValue;pOperation.logInfo("Adding element [".concat(i,"] value ").concat(tmpValue," totaling: ").concat(tmpAggregationValue));}}}else{var tmpObjectKeys=Object.keys(tmpA);for(var _i4=0;_i4<tmpObjectKeys.length;_i4++){var _tmpValue=parseInt(tmpA[tmpObjectKeys[_i4]]);if(isNaN(_tmpValue)){pOperation.logError("Object property [".concat(tmpObjectKeys[_i4],"] could not be parsed as a number; skipping.  (").concat(tmpA[tmpObjectKeys[_i4]],")"));}else{tmpAggregationValue+=_tmpValue;pOperation.logInfo("Adding object property [".concat(tmpObjectKeys[_i4],"] value ").concat(_tmpValue," totaling: ").concat(tmpAggregationValue));}}}}else{var _tmpValue2=parseInt(tmpA);if(isNaN(_tmpValue2)){pOperation.logError("Direct value could not be parsed as a number; skipping.  (".concat(tmpA,")"));}else{tmpAggregationValue+=_tmpValue2;}}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpAggregationValue);return true;};var MathJavascript=/*#__PURE__*/function(_libElucidatorInstruc3){_inherits(MathJavascript,_libElucidatorInstruc3);var _super3=_createSuper(MathJavascript);function MathJavascript(pElucidator){var _this6;_classCallCheck(this,MathJavascript);_this6=_super3.call(this,pElucidator);_this6.namespace='Math';return _this6;}_createClass(MathJavascript,[{key:"initializeInstructions",value:function initializeInstructions(){this.addInstruction('add',add);this.addInstruction('subtract',subtract);this.addInstruction('sub',subtract);this.addInstruction('multiply',multiply);this.addInstruction('mul',multiply);this.addInstruction('divide',divide);this.addInstruction('div',divide);this.addInstruction('aggregate',aggregate);return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('add',require("./Operations/Math-Add.json"));this.addOperation('subtract',require("./Operations/Math-Subtract.json"));this.addOperation('multiply',require("./Operations/Math-Multiply.json"));this.addOperation('divide',require("./Operations/Math-Divide.json"));this.addOperation('aggregate',require("./Operations/Math-Aggregate.json"));return true;}}]);return MathJavascript;}(libElucidatorInstructionSet);module.exports=MathJavascript;},{"../Elucidator-InstructionSet.js":29,"./Operations/Math-Add.json":38,"./Operations/Math-Aggregate.json":39,"./Operations/Math-Divide.json":40,"./Operations/Math-Multiply.json":41,"./Operations/Math-Subtract.json":42}],35:[function(require,module,exports){module.exports={"Description":{"Namespace":"Geometry","Operation":"RectangleArea","Synopsis":"Solve for the area of a rectangle:  Area = Width * Height"},"Inputs":{"Width":{"Hash":"Width","Type":"Number"},"Height":{"Hash":"Height","Type":"Number"}},"Outputs":{"Area":{"Hash":"Area","Name":"Area of the Rectangle"},"Ratio":{"Hash":"Ratio","Name":"The Ratio between the Width and the Height"}},"Log":{"PreOperation":"Solve for [ {{Name:Area}} ] based on [ {{Name:Width}} ] and [ {{Name:Height}} ].","PostOperation":"Operation complete; [ {{Name:Area}} ] = {{InputValue:Width}} * {{InputValue:Height}} = {{OutputValue:Area}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"multiply","InputHashAddressMap":{"a":"Width","b":"Height"},"OutputHashAddressMap":{"x":"Area"}},{"Namespace":"PreciseMath","Instruction":"divide","InputHashAddressMap":{"a":"Width","b":"Height"},"OutputHashAddressMap":{"x":"Ratio"}}]};},{}],36:[function(require,module,exports){module.exports={"Description":{"Namespace":"Logic","Operation":"Execute","Synopsis":"Execute an operation based on namespace and operation."},"Inputs":{"namespace":{"Hash":"namespace","Type":"string","Default":"logic"},"operation":{"Hash":"operation","Type":"string","Default":"noop"}},"Outputs":{},"Log":{"PreOperation":"Execute the {{InputValue:operation}} operation in namespace {{InputValue:namespace}}.","PostOperation":"Operation [{{InputValue:namespace}}:{{InputValue:operation}}] execution complete."},"Steps":[{"Namespace":"Logic","Instruction":"execute"}]};},{}],37:[function(require,module,exports){module.exports={"Description":{"Namespace":"Logic","Operation":"If","Synopsis":"Comparison-based if of leftValue and RightValue based on comparator.  Executes trueNamespace:trueOperation or falseNamespace:falseOperation based on truthiness of result.  Also outputs a true or false to truthinessResult."},"Inputs":{"leftValue":{"Hash":"leftValue","Type":"Any"},"rightValue":{"Hash":"rightValue","Type":"Any","Default":true},"comparator":{"Hash":"comparator","Type":"String","Default":"=="},"trueNamespace":{"Hash":"trueNamespace","Type":"String","Default":"logic"},"trueOperation":{"Hash":"trueOperation","Type":"String","Default":"noop"},"falseNamespace":{"Hash":"falseNamespace","Type":"String","Default":"logic"},"falseOperation":{"Hash":"falseOperation","Type":"String","Default":"noop"}},"Outputs":{"truthinessResult":{"Hash":"truthinessResult","Type":"Boolean"}},"Log":{"PreOperation":"Compare {{Name:leftValue}} and {{Name:rightValue}} with the {{InputValue:comparator}} operator, storing the truthiness in {{Name:truthinessResult}}.","PostOperation":"Operation complete: {{InputValue:leftValue}} {{InputValue:comparator}} {{InputValue:rightValue}} evaluated to {{OutputValue:truthinessResult}}"},"Steps":[{"Namespace":"Logic","Instruction":"If"}]};},{}],38:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Add","Synopsis":"Add two numbers:  x = a + b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Add {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} + {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"add"}]};},{}],39:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Aggregate","Synopsis":"Aggregate a set of numbers (from array or object address):  x = a + b + ... + z"},"Inputs":{"a":{"Hash":"a","Type":"Set"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Aggregate all numeric values in {{Name:a}}, storing the resultant in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"aggregate"}]};},{}],40:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Divide","Synopsis":"Divide two numbers:  x = a / b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Divide {{Name:a}} over {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} / {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"divide"}]};},{}],41:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Multiply","Synopsis":"Multiply two numbers:  x = a * b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Multiply {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} * {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"multiply"}]};},{}],42:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Subtract","Synopsis":"Subtract two numbers:  x = a - b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Subtract {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} - {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"subtract"}]};},{}],43:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Add","Synopsis":"Precisely add two numbers:  x = a + b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Add {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} + {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"add"}]};},{}],44:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Aggregate","Synopsis":"Precisely aggregate a set of numbers (from array or object address):  x = a + b + ... + z"},"Inputs":{"a":{"Hash":"a","Type":"Set"},"ValueNames":{"Hash":"ValueNames","Type":"Set"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Aggregate all numeric values in {{Name:a}}, storing the resultant in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"aggregate"}]};},{}],45:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Divide","Synopsis":"Precisely divide two numbers:  x = a / b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Divide {{Name:a}} over {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} / {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"divide"}]};},{}],46:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"GroupValuesAndAggregate","Synopsis":"Group values in a set and aggregate the set of numbers (from array or object addresses)"},"Inputs":{"inputDataSet":{"Hash":"inputDataSet","Type":"Set"},"groupByProperty":{"Hash":"groupByProperty","Type":"Any"},"groupValueProperty":{"Hash":"groupValueProperty","Type":"Any"},"recordIndicatorProperty":{"Hash":"recordIndicatorProperty","Type":"String","Default":false}},"Outputs":{"outputDataSet":{"Hash":"outputDataSet","Type":"Set"}},"Log":{"PreOperation":"Group {{Name:inputDataSet}} by {{Name:groupByProperty}} and create a map, storing the resultant in {{Name:outputDataSet}}.","PostOperation":"Operation complete: Grouping {{Name:inputDataSet}} by {{Name:groupByProperty}} into aggregated values in {{Name:outputDataSet}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"groupvaluesandaggregate"}]};},{}],47:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Multiply","Synopsis":"Precisely multiply two numbers:  x = a * b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Multiply {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} * {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"multiply"}]};},{}],48:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Round","Synopsis":"Precisely round a number."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"precision":{"Hash":"precision","Type":"Number"},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}}) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"round"}]};},{}],49:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"SetPrecision","Synopsis":"Set the precision."},"Inputs":{"precision":{"Hash":"precision","Type":"Number","Default":2}},"Outputs":{},"Log":{"PreOperation":"Set precision to {{InputValue:precision}}.","PostOperation":"Operation complete: Default precision set to {{InputValue:precision}}."},"Steps":[{"Namespace":"PreciseMath","Instruction":"setprecision"}]};},{}],50:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"SetRoundingMode","Synopsis":"Set the rounding mode."},"Inputs":{"roundingmode":{"Hash":"roundingmode","Type":"String","Default":"ROUND_HALF_UP"}},"Outputs":{},"Log":{"PreOperation":"Set rounding mode to {{InputValue:roundingmode}}.","PostOperation":"Operation complete: Default rounding mode set to {{InputValue:roundingmode}}."},"Steps":[{"Namespace":"PreciseMath","Instruction":"setroundingmode"}]};},{}],51:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Subtract","Synopsis":"Precisely subtract two numbers:  x = a - b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Subtract {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} - {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"subtract"}]};},{}],52:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"ToDecimalPlaces","Synopsis":"Precisely round a number to a certain number of decimal places."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"decimalplaces":{"Hash":"decimalplaces","Type":"Number","Default":2},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}} to {{Value:decimalplaces}} decimal places, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}} TO {{Value:decimalplaces}} decimal places) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"todecimalplaces"}]};},{}],53:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"ToSignificantDigits","Synopsis":"Precisely round a number to a specific number of significant digits."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"digits":{"Hash":"digits","Type":"Number","Default":12},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}} to {{InputValue:digits}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}} TO {{InputValue:digits}}) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"tosignificantdigits"}]};},{}],54:[function(require,module,exports){module.exports={"Description":{"Namespace":"Set","Operation":"GroupValuesBy","Synopsis":"Group set of Sub object values by another property in the objects."},"Inputs":{"inputDataSet":{"Hash":"inputDataSet","Type":"Set"},"groupByProperty":{"Hash":"groupByProperty","Type":"Any"},"groupValueProperty":{"Hash":"groupValueProperty","Type":"Any"}},"Outputs":{"outputDataSet":{"Hash":"outputDataSet","Type":"Set"}},"Log":{"PreOperation":"Group {{Name:inputDataSet}} by {{Name:groupByProperty}} and create a mapped result set into {{Name:outputDataSet}}.","PostOperation":"Operation complete: Grouping {{Name:inputDataSet}} by {{Name:groupByProperty}} into {{Name:outputDataSet}}"},"Steps":[{"Namespace":"Set","Instruction":"GroupValuesBy"}]};},{}],55:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Replace","Synopsis":"Replace all instances of searchFor with replaceWith in inputString"},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"},"searchFor":{"Hash":"searchFor","Type":"String"},"replaceWith":{"Hash":"replaceWith","Type":"String"}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Search for [{{InputValue:searchFor}}] and replace it with [{{InputValue:replaceWith}}] in [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}] replacing [{{InputValue:searchFor}}] with [{{InputValue:replaceWith}}]."},"Steps":[{"Namespace":"String","Instruction":"replace"}]};},{}],56:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Substring","Synopsis":"Get all characters between indexStart and indexEnd (optional) for a given inputString."},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"},"indexStart":{"Hash":"indexStart","Type":"Number","Default":0},"indexEnd":{"Hash":"indexEnd","Type":"String","Default":null}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Get all characters between {{InputValue:indexStart}} and {{InputValue:indexEnd}} in [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}] between {{InputValue:indexStart}} and {{InputValue:indexEnd}}."},"Steps":[{"Namespace":"String","Instruction":"substring"}]};},{}],57:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Trim","Synopsis":"Trim whitespace off the end of string in inputString, putting the result in outputString"},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Trim the whitespace from value [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}]"},"Steps":[{"Namespace":"String","Instruction":"trim"}]};},{}],58:[function(require,module,exports){var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var libDecimal=require('decimal.js');var add=function add(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.plus(tmpB).toString());return true;};var subtract=function subtract(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.sub(tmpB).toString());return true;};var multiply=function multiply(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.mul(tmpB).toString());return true;};var divide=function divide(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.div(tmpB).toString());return true;};var round=function round(pOperation){var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpPrecision=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'precision'));var tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');// Eventually don't set this every time...
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(!isNaN(tmpPrecision)){libDecimal.set({precision:tmpPrecision});}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',libDecimal.round(tmpA).toString());};var tosignificantdigits=function tosignificantdigits(pOperation){var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpDigits=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'digits'));var tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');// Eventually don't set this every time...
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(isNaN(tmpDigits)){tmpDigits=12;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toSignificantDigits(tmpDigits).toString());};var todecimalplaces=function todecimalplaces(pOperation){var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));var tmpDecimalPlaces=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'decimalplaces'));var tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');// Eventually don't set this every time...
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(isNaN(tmpDecimalPlaces)){tmpDecimalPlaces=2;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toDecimalPlaces(tmpDecimalPlaces).toString());};var setprecision=function setprecision(pOperation){var tmpPrecision=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'precision'));console.log(tmpPrecision);if(!isNaN(tmpPrecision)){libDecimal.set({precision:tmpPrecision});}};var setroundingmode=function setroundingmode(pOperation){var tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');// Eventually don't set this every time...
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}};var aggregate=function aggregate(pOperation){var tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');var tmpObjectType=_typeof(tmpA);var tmpAggregationValue=new libDecimal(0);if(tmpObjectType=='object'){if(Array.isArray(tmpA)){for(var i=0;i<tmpA.length;i++){// If this is an array, enumerate it and try to aggregate each number
var tmpValue=new libDecimal(tmpA[i]);if(isNaN(tmpValue)){pOperation.logError("Array element index [".concat(i,"] could not be parsed as a number by Decimal.js; skipping.  (").concat(tmpA[i],")"));}else{tmpAggregationValue=tmpAggregationValue.plus(tmpValue);pOperation.logInfo("Adding element [".concat(i,"] value ").concat(tmpValue," totaling: ").concat(tmpAggregationValue));}}}else{var tmpObjectKeys=Object.keys(tmpA);for(var _i5=0;_i5<tmpObjectKeys.length;_i5++){var _tmpValue3=new libDecimal(tmpA[tmpObjectKeys[_i5]]);if(isNaN(_tmpValue3)){pOperation.logError("Object property [".concat(tmpObjectKeys[_i5],"] could not be parsed as a number; skipping.  (").concat(tmpA[tmpObjectKeys[_i5]],")"));}else{tmpAggregationValue=tmpAggregationValue.plus(_tmpValue3);pOperation.logInfo("Adding object property [".concat(tmpObjectKeys[_i5],"] value ").concat(_tmpValue3," totaling: ").concat(tmpAggregationValue));}}}}else{var _tmpValue4=new libDecimal(tmpA);if(isNaN(_tmpValue4)){pOperation.logError("Direct value could not be parsed as a number; skipping.  (".concat(tmpA,")"));}else{tmpAggregationValue=_tmpValue4;}}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpAggregationValue.toString());return true;};var groupValuesAndAggregate=function groupValuesAndAggregate(pOperation){var tmpInputDataSet=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputDataSet');var tmpGroupByProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupByProperty');var tmpGroupValueProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupValueProperty');var tmpOutputDataSet={};var tmpProcessedOutputDataSet={};var tmpObjectType=_typeof(tmpInputDataSet);if(tmpObjectType=='object'){if(Array.isArray(tmpInputDataSet)){for(var i=0;i<tmpInputDataSet.length;i++){if(_typeof(tmpInputDataSet[i])!=='object'){pOperation.logInfo("Element [".concat(i,"] was not an object; skipping group operation."));}else{var tmpValue=tmpInputDataSet[i];var tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo("Element [".concat(i,"] doesn't have the group by property [").concat(tmpGroupByProperty,"]; setting group to [__NO_GROUP]."));tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo("Element [".concat(i,"] doesn't have the group value property [").concat(tmpGroupValueProperty,"]; skipping group operation."));}else{var tmpDecimalValue=new libDecimal(tmpValue[tmpGroupValueProperty]);if(isNaN(tmpDecimalValue)){pOperation.logError("Object property [".concat(i,"] could not be parsed as a number; skipping.  (").concat(tmpValue[tmpGroupValueProperty],")"));}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){tmpOutputDataSet[tmpGroupByValue]=tmpDecimalValue;}else{tmpOutputDataSet[tmpGroupByValue]=tmpOutputDataSet[tmpGroupByValue].plus(tmpDecimalValue);}pOperation.logInfo("Adding object property [".concat(i,"] value ").concat(tmpDecimalValue," totaling: ").concat(tmpOutputDataSet[tmpGroupByValue]));}}}}}else{var tmpObjectKeys=Object.keys(tmpInputDataSet);for(var _i6=0;_i6<tmpObjectKeys.length;_i6++){if(_typeof(tmpInputDataSet[tmpObjectKeys[_i6]])!=='object'){pOperation.logInfo("Element [".concat(_i6,"] was not an object; skipping group operation."));}else{var _tmpValue5=tmpInputDataSet[tmpObjectKeys[_i6]];var _tmpGroupByValue=_tmpValue5[tmpGroupByProperty];if(!_tmpValue5.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo("Element [".concat(tmpObjectKeys[_i6],"][").concat(_i6,"] doesn't have the group by property [").concat(tmpGroupByProperty,"]; setting group to [__NO_GROUP]."));_tmpGroupByValue='__NO_GROUP';}if(!_tmpValue5.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo("Element [".concat(tmpObjectKeys[_i6],"][").concat(_i6,"] doesn't have the group value property [").concat(tmpGroupValueProperty,"]; skipping group operation."));}else{var _tmpDecimalValue=new libDecimal(_tmpValue5[tmpGroupValueProperty]);if(isNaN(_tmpDecimalValue)){pOperation.logError("Object property [".concat(tmpObjectKeys[_i6],"][").concat(_i6,"] to group ").concat(_tmpGroupByValue," could not be parsed as a number; skipping.  (").concat(_tmpValue5[tmpGroupValueProperty],")"));}else{if(!tmpOutputDataSet.hasOwnProperty(_tmpGroupByValue)){tmpOutputDataSet[_tmpGroupByValue]=_tmpDecimalValue;}else{tmpOutputDataSet[_tmpGroupByValue]=tmpOutputDataSet[_tmpGroupByValue].plus(_tmpDecimalValue);}pOperation.logInfo("Adding object property [".concat(tmpObjectKeys[_i6],"][").concat(_i6,"] to group ").concat(_tmpGroupByValue," value ").concat(_tmpDecimalValue," totaling: ").concat(tmpOutputDataSet[_tmpGroupByValue]));}}}}}// Now marshal the aggregated values
var tmpOutputGroups=Object.keys(tmpOutputDataSet);for(var j=0;j<tmpOutputGroups.length;j++){tmpProcessedOutputDataSet[tmpOutputGroups[j]]=tmpOutputDataSet[tmpOutputGroups[j]].toString();}}else{pOperation.logError("Input set is neither an Array nor an Object");}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputDataSet',tmpProcessedOutputDataSet);return true;};var toFraction=function toFraction(pOperation){// This could be done in one line, but, would be more difficult to comprehend.
var tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toFraction().toString());return true;};var PreciseMath=/*#__PURE__*/function(_libElucidatorInstruc4){_inherits(PreciseMath,_libElucidatorInstruc4);var _super4=_createSuper(PreciseMath);function PreciseMath(pElucidator){var _this7;_classCallCheck(this,PreciseMath);_this7=_super4.call(this,pElucidator);_this7.namespace='PreciseMath';return _this7;}_createClass(PreciseMath,[{key:"initializeInstructions",value:function initializeInstructions(){this.addInstruction('add',add);this.addInstruction('subtract',subtract);this.addInstruction('sub',subtract);this.addInstruction('multiply',multiply);this.addInstruction('mul',multiply);this.addInstruction('divide',divide);this.addInstruction('div',divide);this.addInstruction('aggregate',aggregate);this.addInstruction('groupvaluesandaggregate',groupValuesAndAggregate);this.addInstruction('setprecision',setprecision);this.addInstruction('setroundingmode',setroundingmode);this.addInstruction('todecimalplaces',todecimalplaces);this.addInstruction('tosignificantdigits',tosignificantdigits);this.addInstruction('round',round);this.addInstruction('tofraction',toFraction);return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('add',require("./Operations/PreciseMath-Add.json"));this.addOperation('subtract',require("./Operations/PreciseMath-Subtract.json"));this.addOperation('multiply',require("./Operations/PreciseMath-Multiply.json"));this.addOperation('divide',require("./Operations/PreciseMath-Divide.json"));this.addOperation('aggregate',require('./Operations/PreciseMath-Aggregate.json'));this.addOperation('groupvaluesandaggregate',require('./Operations/PreciseMath-GroupValuesAndAggregate.json'));this.addOperation('setprecision',require('./Operations/PreciseMath-SetPrecision.json'));this.addOperation('setroundingmode',require('./Operations/PreciseMath-SetRoundingMode.json'));this.addOperation('tosignificantdigits',require('./Operations/PreciseMath-ToSignificantDigits.json'));this.addOperation('todecimalplaces',require('./Operations/PreciseMath-ToDecimalPlaces.json'));this.addOperation('round',require('./Operations/PreciseMath-Round.json'));return true;}}]);return PreciseMath;}(libElucidatorInstructionSet);module.exports=PreciseMath;},{"../Elucidator-InstructionSet.js":29,"./Operations/PreciseMath-Add.json":43,"./Operations/PreciseMath-Aggregate.json":44,"./Operations/PreciseMath-Divide.json":45,"./Operations/PreciseMath-GroupValuesAndAggregate.json":46,"./Operations/PreciseMath-Multiply.json":47,"./Operations/PreciseMath-Round.json":48,"./Operations/PreciseMath-SetPrecision.json":49,"./Operations/PreciseMath-SetRoundingMode.json":50,"./Operations/PreciseMath-Subtract.json":51,"./Operations/PreciseMath-ToDecimalPlaces.json":52,"./Operations/PreciseMath-ToSignificantDigits.json":53,"decimal.js":21}],59:[function(require,module,exports){// Solution providers are meant to be stateless, and not classes.
// These solution providers are akin to drivers, connecting code libraries or 
// other types of behavior to mapping operations.
var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var groupValuesBy=function groupValuesBy(pOperation){var tmpInputDataSet=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputDataSet');var tmpGroupByProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupByProperty');var tmpGroupValueProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupValueProperty');var tmpOutputDataSet={};var tmpObjectType=_typeof(tmpInputDataSet);if(tmpObjectType=='object'){if(Array.isArray(tmpInputDataSet)){for(var i=0;i<tmpInputDataSet.length;i++){if(_typeof(tmpInputDataSet[i])!=='object'){pOperation.logInfo("Element [".concat(i,"] was not an object; skipping group operation."));}else{var tmpValue=tmpInputDataSet[i];var tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo("Element [".concat(i,"] doesn't have the group by property [").concat(tmpGroupByProperty,"]; setting group to [__NO_GROUP]."));tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo("Element [".concat(i,"] doesn't have the group value property [").concat(tmpGroupValueProperty,"]; skipping group operation."));}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){// Create a new grouped value
pOperation.logInfo("Creating a new group [".concat(tmpGroupByValue,"] for element [").concat(i,"]."));tmpOutputDataSet[tmpGroupByValue]=[];}tmpOutputDataSet[tmpGroupByValue].push(tmpValue[tmpGroupValueProperty]);}}}}else{var tmpObjectKeys=Object.keys(tmpInputDataSet);for(var _i7=0;_i7<tmpObjectKeys.length;_i7++){if(_typeof(tmpInputDataSet[tmpObjectKeys[_i7]])!=='object'){pOperation.logInfo("Element [".concat(_i7,"] was not an object; skipping group operation."));}else{var _tmpValue6=tmpInputDataSet[tmpObjectKeys[_i7]];var _tmpGroupByValue2=_tmpValue6[tmpGroupByProperty];if(!_tmpValue6.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo("Element [".concat(tmpObjectKeys[_i7],"][").concat(_i7,"] doesn't have the group by property [").concat(tmpGroupByProperty,"]; setting group to [__NO_GROUP]."));_tmpGroupByValue2='__NO_GROUP';}if(!_tmpValue6.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo("Element [".concat(tmpObjectKeys[_i7],"][").concat(_i7,"] doesn't have the group value property [").concat(tmpGroupValueProperty,"]; skipping group operation."));}else{if(!tmpOutputDataSet.hasOwnProperty(_tmpGroupByValue2)){// Create a new grouped value
pOperation.logInfo("Creating a new group [".concat(_tmpGroupByValue2,"] for element [").concat(tmpObjectKeys[_i7],"][").concat(_i7,"]."));tmpOutputDataSet[_tmpGroupByValue2]=[];}tmpOutputDataSet[_tmpGroupByValue2].push(_tmpValue6[tmpGroupValueProperty]);}}}}}else{pOperation.logError("Input set is neither an Array nor an Object");}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputDataSet',tmpOutputDataSet);return true;};var Set=/*#__PURE__*/function(_libElucidatorInstruc5){_inherits(Set,_libElucidatorInstruc5);var _super5=_createSuper(Set);function Set(pElucidator){var _this8;_classCallCheck(this,Set);_this8=_super5.call(this,pElucidator);_this8.namespace='Set';return _this8;}_createClass(Set,[{key:"initializeInstructions",value:function initializeInstructions(){// Logic actually wants a noop instruction!
_get(_getPrototypeOf(Set.prototype),"initializeInstructions",this).call(this);this.addInstruction('groupvaluesby',groupValuesBy);return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('groupvaluesby',require("./Operations/Set-GroupValuesBy.json"));return true;}}]);return Set;}(libElucidatorInstructionSet);module.exports=Set;},{"../Elucidator-InstructionSet.js":29,"./Operations/Set-GroupValuesBy.json":54}],60:[function(require,module,exports){// Solution providers are meant to be stateless, and not classes.
// These solution providers are akin to drivers, connecting code libraries or 
// other types of behavior to mapping operations.
var libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');var trim=function trim(pOperation){var tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.trim());return true;};var replace=function replace(pOperation){var tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');var tmpSearchFor=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'searchFor');var tmpReplaceWith=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'replaceWith');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.replace(tmpSearchFor,tmpReplaceWith));return true;};var substring=function substring(pOperation){var tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');var indexStart=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'indexStart');var indexEnd=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'indexEnd');if(indexEnd!=null){pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.substring(indexStart,indexEnd));}else{pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.substring(indexStart));}return true;};var StringOperations=/*#__PURE__*/function(_libElucidatorInstruc6){_inherits(StringOperations,_libElucidatorInstruc6);var _super6=_createSuper(StringOperations);function StringOperations(pElucidator){var _this9;_classCallCheck(this,StringOperations);_this9=_super6.call(this,pElucidator);_this9.namespace='String';return _this9;}_createClass(StringOperations,[{key:"initializeInstructions",value:function initializeInstructions(){this.addInstruction('trim',trim);this.addInstruction('replace',replace);this.addInstruction('substring',substring);return true;}},{key:"initializeOperations",value:function initializeOperations(){this.addOperation('trim',require("./Operations/String-Trim.json"));this.addOperation('replace',require("./Operations/String-Replace.json"));this.addOperation('substring',require("./Operations/String-Substring.json"));return true;}}]);return StringOperations;}(libElucidatorInstructionSet);module.exports=StringOperations;},{"../Elucidator-InstructionSet.js":29,"./Operations/String-Replace.json":55,"./Operations/String-Substring.json":56,"./Operations/String-Trim.json":57}],61:[function(require,module,exports){/**
* Base Logger Class
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/var BaseLogger=/*#__PURE__*/function(){function BaseLogger(pLogStreamSettings,pFableLog){_classCallCheck(this,BaseLogger);// This should not possibly be able to be instantiated without a settings object
this._Settings=_typeof(pLogStreamSettings)=='object'?pLogStreamSettings:{};// The base logger does nothing but associate a UUID with itself
// We added this as the mechanism for tracking loggers to allow multiple simultaneous streams
// to the same provider.
this.loggerUUID=this.generateInsecureUUID();// Eventually we can use this array to ompute which levels the provider allows.
// For now it's just used to precompute some string concatenations.
this.levels=["trace","debug","info","warn","error","fatal"];}// This is meant to generate programmatically insecure UUIDs to identify loggers
_createClass(BaseLogger,[{key:"generateInsecureUUID",value:function generateInsecureUUID(){var tmpDate=new Date().getTime();var tmpUUID='LOGSTREAM-xxxxxx-yxxxxx'.replace(/[xy]/g,function(pCharacter){// Funny algorithm from w3resource that is twister-ish without the deep math and security
// ..but good enough for unique log stream identifiers
var tmpRandomData=(tmpDate+Math.random()*16)%16|0;tmpDate=Math.floor(tmpDate/16);return(pCharacter=='x'?tmpRandomData:tmpRandomData&0x3|0x8).toString(16);});return tmpUUID;}},{key:"initialize",value:function initialize(){// No operation.
}},{key:"trace",value:function trace(pLogText,pLogObject){this.write("trace",pLogText,pLogObject);}},{key:"debug",value:function debug(pLogText,pLogObject){this.write("debug",pLogText,pLogObject);}},{key:"info",value:function info(pLogText,pLogObject){this.write("info",pLogText,pLogObject);}},{key:"warn",value:function warn(pLogText,pLogObject){this.write("warn",pLogText,pLogObject);}},{key:"error",value:function error(pLogText,pLogObject){this.write("error",pLogText,pLogObject);}},{key:"fatal",value:function fatal(pLogText,pLogObject){this.write("fatal",pLogText,pLogObject);}},{key:"write",value:function write(pLogLevel,pLogText,pLogObject){// The base logger does nothing.
return true;}}]);return BaseLogger;}();module.exports=BaseLogger;},{}],62:[function(require,module,exports){/**
* Default Logger Provider Function
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/ // Return the providers that are available without extensions loaded
var getDefaultProviders=function getDefaultProviders(){var tmpDefaultProviders={};tmpDefaultProviders.console=require('./Fable-Log-Logger-Console.js');tmpDefaultProviders["default"]=tmpDefaultProviders.console;return tmpDefaultProviders;};module.exports=getDefaultProviders();},{"./Fable-Log-Logger-Console.js":64}],63:[function(require,module,exports){module.exports=[{"loggertype":"console","streamtype":"console","level":"trace"}];},{}],64:[function(require,module,exports){var libBaseLogger=require('./Fable-Log-BaseLogger.js');var ConsoleLogger=/*#__PURE__*/function(_libBaseLogger){_inherits(ConsoleLogger,_libBaseLogger);var _super7=_createSuper(ConsoleLogger);function ConsoleLogger(pLogStreamSettings,pFableLog){var _this10;_classCallCheck(this,ConsoleLogger);_this10=_super7.call(this,pLogStreamSettings);_this10._ShowTimeStamps=_this10._Settings.hasOwnProperty('showtimestamps')?_this10._Settings.showtimestamps==true:true;_this10._FormattedTimeStamps=_this10._Settings.hasOwnProperty('formattedtimestamps')?_this10._Settings.formattedtimestamps==true:true;_this10._ContextMessage=_this10._Settings.hasOwnProperty('Context')?"(".concat(_this10._Settings.Context,")"):pFableLog._Settings.hasOwnProperty('Product')?"(".concat(pFableLog._Settings.Product,")"):'Unnamed_Log_Context';// Allow the user to decide what gets output to the console
_this10._OutputLogLinesToConsole=_this10._Settings.hasOwnProperty('outputloglinestoconsole')?_this10._Settings.outputloglinestoconsole:true;_this10._OutputObjectsToConsole=_this10._Settings.hasOwnProperty('outputobjectstoconsole')?_this10._Settings.outputobjectstoconsole:true;// Precompute the prefix for each level
_this10.prefixCache={};for(var i=0;i<=_this10.levels.length;i++){_this10.prefixCache[_this10.levels[i]]="[".concat(_this10.levels[i],"] ").concat(_this10._ContextMessage,": ");if(_this10._ShowTimeStamps){// If there is a timestamp we need a to prepend space before the prefixcache string, since the timestamp comes first
_this10.prefixCache[_this10.levels[i]]=' '+_this10.prefixCache[_this10.levels[i]];}}return _this10;}_createClass(ConsoleLogger,[{key:"write",value:function write(pLevel,pLogText,pObject){var tmpTimeStamp='';if(this._ShowTimeStamps&&this._FormattedTimeStamps){tmpTimeStamp=new Date().toISOString();}else if(this._ShowTimeStamps){tmpTimeStamp=+new Date();}var tmpLogLine="".concat(tmpTimeStamp).concat(this.prefixCache[pLevel]).concat(pLogText);if(this._OutputLogLinesToConsole){console.log(tmpLogLine);}// Write out the object on a separate line if it is passed in
if(this._OutputObjectsToConsole&&typeof pObject!=='undefined'){console.log(JSON.stringify(pObject,null,2));}// Provide an easy way to be overridden and be consistent
return tmpLogLine;}}]);return ConsoleLogger;}(libBaseLogger);module.exports=ConsoleLogger;},{"./Fable-Log-BaseLogger.js":61}],65:[function(require,module,exports){var libConsoleLog=require('./Fable-Log-Logger-Console.js');var libFS=require('fs');var libPath=require('path');var SimpleFlatFileLogger=/*#__PURE__*/function(_libConsoleLog){_inherits(SimpleFlatFileLogger,_libConsoleLog);var _super8=_createSuper(SimpleFlatFileLogger);function SimpleFlatFileLogger(pLogStreamSettings,pFableLog){var _this11;_classCallCheck(this,SimpleFlatFileLogger);_this11=_super8.call(this,pLogStreamSettings,pFableLog);// If a path isn't provided for the logfile, it tries to use the ProductName or Context
_this11.logFileRawPath=_this11._Settings.hasOwnProperty('path')?_this11._Settings.path:"./".concat(_this11._ContextMessage,".log");_this11.logFilePath=libPath.normalize(_this11.logFileRawPath);_this11.logFileStreamOptions=_this11._Settings.hasOwnProperty('fileStreamoptions')?_this11._Settings.fileStreamOptions:{"flags":"a","encoding":"utf8"};_this11.fileWriter=libFS.createWriteStream(_this11.logFilePath,_this11.logFileStreamOptions);_this11.activelyWriting=false;_this11.logLineStrings=[];_this11.logObjectStrings=[];_this11.defaultWriteCompleteCallback=function(){};_this11.defaultBufferFlushCallback=function(){};return _this11;}_createClass(SimpleFlatFileLogger,[{key:"closeWriter",value:function closeWriter(fCloseComplete){var tmpCloseComplete=typeof fCloseComplete=='function'?fCloseComplete:function(){};if(this.fileWriter){this.fileWriter.end('\n');return this.fileWriter.once('finish',tmpCloseComplete.bind(this));}}},{key:"completeBufferFlushToLogFile",value:function completeBufferFlushToLogFile(fFlushComplete){this.activelyWriting=false;var tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;if(this.logLineStrings.length>0){this.flushBufferToLogFile(tmpFlushComplete);}else{return tmpFlushComplete();}}},{key:"flushBufferToLogFile",value:function flushBufferToLogFile(fFlushComplete){if(!this.activelyWriting){// Only want to be writing one thing at a time....
this.activelyWriting=true;var tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;// Get the current buffer arrays.  These should always have matching number of elements.
var tmpLineStrings=this.logLineStrings;var tmpObjectStrings=this.logObjectStrings;// Reset these to be filled while we process this queue...
this.logLineStrings=[];this.logObjectStrings=[];// This is where we will put each line before writing it to the file...
var tmpConstructedBufferOutputString='';for(var i=0;i<tmpLineStrings.length;i++){// TODO: Windows Newline?   ....... yo no se!
tmpConstructedBufferOutputString+="".concat(tmpLineStrings[i],"\n");if(tmpObjectStrings[i]!==false){tmpConstructedBufferOutputString+="".concat(tmpObjectStrings[i],"\n");}}if(!this.fileWriter.write(tmpConstructedBufferOutputString,'utf8')){// If the streamwriter returns false, we need to wait for it to drain.
this.fileWriter.once('drain',this.completeBufferFlushToLogFile.bind(this,tmpFlushComplete));}else{return this.completeBufferFlushToLogFile(tmpFlushComplete);}}}},{key:"write",value:function write(pLevel,pLogText,pObject){var tmpLogLine=_get(_getPrototypeOf(SimpleFlatFileLogger.prototype),"write",this).call(this,pLevel,pLogText,pObject);// Use a very simple array as the write buffer
this.logLineStrings.push(tmpLogLine);// Write out the object on a separate line if it is passed in
if(typeof pObject!=='undefined'){this.logObjectStrings.push(JSON.stringify(pObject,null,4));}else{this.logObjectStrings.push(false);}this.flushBufferToLogFile();}}]);return SimpleFlatFileLogger;}(libConsoleLog);module.exports=SimpleFlatFileLogger;},{"./Fable-Log-Logger-Console.js":64,"fs":16,"path":94}],66:[function(require,module,exports){/**
* Fable Logging Add-on
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable Logger
*/ /**
* Fable Solution Log Wrapper Main Class
*
* @class FableLog
* @constructor
*/var FableLog=/*#__PURE__*/function(){function FableLog(pFableSettings,pFable){_classCallCheck(this,FableLog);var tmpSettings=_typeof(pFableSettings)==='object'?pFableSettings:{};this._Settings=tmpSettings;this._Providers=require('./Fable-Log-DefaultProviders-Node.js');this._StreamDefinitions=tmpSettings.hasOwnProperty('LogStreams')?tmpSettings.LogStreams:require('./Fable-Log-DefaultStreams.json');this.logStreams=[];// This object gets decorated for one-time instantiated providers that
//  have multiple outputs, such as bunyan.
this.logProviders={};// A hash list of the GUIDs for each log stream, so they can't be added to the set more than one time
this.activeLogStreams={};this.logStreamsTrace=[];this.logStreamsDebug=[];this.logStreamsInfo=[];this.logStreamsWarn=[];this.logStreamsError=[];this.logStreamsFatal=[];this.datumDecorator=function(pDatum){return pDatum;};this.uuid=typeof tmpSettings.Product==='string'?tmpSettings.Product:'Default';}_createClass(FableLog,[{key:"addLogger",value:function addLogger(pLogger,pLevel){// Bail out if we've already created one.
if(this.activeLogStreams.hasOwnProperty(pLogger.loggerUUID)){return false;}// Add it to the streams and to the mutex
this.logStreams.push(pLogger);this.activeLogStreams[pLogger.loggerUUID]=true;// Make sure a kosher level was passed in
switch(pLevel){case'trace':this.logStreamsTrace.push(pLogger);case'debug':this.logStreamsDebug.push(pLogger);case'info':this.logStreamsInfo.push(pLogger);case'warn':this.logStreamsWarn.push(pLogger);case'error':this.logStreamsError.push(pLogger);case'fatal':this.logStreamsFatal.push(pLogger);break;}return true;}},{key:"setDatumDecorator",value:function setDatumDecorator(fDatumDecorator){if(typeof fDatumDecorator==='function'){this.datumDecorator=fDatumDecorator;}else{this.datumDecorator=function(pDatum){return pDatum;};}}},{key:"trace",value:function trace(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsTrace.length;i++){this.logStreamsTrace[i].trace(pMessage,tmpDecoratedDatum);}}},{key:"debug",value:function debug(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsDebug.length;i++){this.logStreamsDebug[i].debug(pMessage,tmpDecoratedDatum);}}},{key:"info",value:function info(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsInfo.length;i++){this.logStreamsInfo[i].info(pMessage,tmpDecoratedDatum);}}},{key:"warn",value:function warn(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsWarn.length;i++){this.logStreamsWarn[i].warn(pMessage,tmpDecoratedDatum);}}},{key:"error",value:function error(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsError.length;i++){this.logStreamsError[i].error(pMessage,tmpDecoratedDatum);}}},{key:"fatal",value:function fatal(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsFatal.length;i++){this.logStreamsFatal[i].fatal(pMessage,tmpDecoratedDatum);}}},{key:"initialize",value:function initialize(){// "initialize" each logger as defined in the logging parameters
for(var i=0;i<this._StreamDefinitions.length;i++){var tmpStreamDefinition=Object.assign({loggertype:'default',streamtype:'console',level:'info'},this._StreamDefinitions[i]);if(!this._Providers.hasOwnProperty(tmpStreamDefinition.loggertype)){console.log("Error initializing log stream: bad loggertype in stream definition ".concat(JSON.stringify(tmpStreamDefinition)));}else{this.addLogger(new this._Providers[tmpStreamDefinition.loggertype](tmpStreamDefinition,this),tmpStreamDefinition.level);}}// Now initialize each one.
for(var _i8=0;_i8<this.logStreams.length;_i8++){this.logStreams[_i8].initialize();}}},{key:"logTime",value:function logTime(pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time';var tmpTime=new Date();this.info("".concat(tmpMessage," ").concat(tmpTime," (epoch ").concat(+tmpTime,")"),pDatum);}// Get a timestamp
},{key:"getTimeStamp",value:function getTimeStamp(){return+new Date();}},{key:"getTimeDelta",value:function getTimeDelta(pTimeStamp){var tmpEndTime=+new Date();return tmpEndTime-pTimeStamp;}// Log the delta between a timestamp, and now with a message
},{key:"logTimeDelta",value:function logTimeDelta(pTimeDelta,pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';var tmpDatum=_typeof(pDatum)==='object'?pDatum:{};var tmpEndTime=+new Date();this.info("".concat(tmpMessage," logged at (epoch ").concat(+tmpEndTime,") took (").concat(pTimeDelta,"ms)"),pDatum);}},{key:"logTimeDeltaHuman",value:function logTimeDeltaHuman(pTimeDelta,pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';var tmpEndTime=+new Date();var tmpMs=parseInt(pTimeDelta%1000);var tmpSeconds=parseInt(pTimeDelta/1000%60);var tmpMinutes=parseInt(pTimeDelta/(1000*60)%60);var tmpHours=parseInt(pTimeDelta/(1000*60*60));tmpMs=tmpMs<10?"00"+tmpMs:tmpMs<100?"0"+tmpMs:tmpMs;tmpSeconds=tmpSeconds<10?"0"+tmpSeconds:tmpSeconds;tmpMinutes=tmpMinutes<10?"0"+tmpMinutes:tmpMinutes;tmpHours=tmpHours<10?"0"+tmpHours:tmpHours;this.info("".concat(tmpMessage," logged at (epoch ").concat(+tmpEndTime,") took (").concat(pTimeDelta,"ms) or (").concat(tmpHours,":").concat(tmpMinutes,":").concat(tmpSeconds,".").concat(tmpMs,")"),pDatum);}},{key:"logTimeDeltaRelative",value:function logTimeDeltaRelative(pStartTime,pMessage,pDatum){this.logTimeDelta(this.getTimeDelta(pStartTime),pMessage,pDatum);}},{key:"logTimeDeltaRelativeHuman",value:function logTimeDeltaRelativeHuman(pStartTime,pMessage,pDatum){this.logTimeDeltaHuman(this.getTimeDelta(pStartTime),pMessage,pDatum);}}]);return FableLog;}();// This is for backwards compatibility
function autoConstruct(pSettings){return new FableLog(pSettings);}module.exports=FableLog;module.exports["new"]=autoConstruct;module.exports.LogProviderBase=require('./Fable-Log-BaseLogger.js');module.exports.LogProviderConsole=require('./Fable-Log-Logger-Console.js');module.exports.LogProviderConsole=require('./Fable-Log-Logger-SimpleFlatFile.js');},{"./Fable-Log-BaseLogger.js":61,"./Fable-Log-DefaultProviders-Node.js":62,"./Fable-Log-DefaultStreams.json":63,"./Fable-Log-Logger-Console.js":64,"./Fable-Log-Logger-SimpleFlatFile.js":65}],67:[function(require,module,exports){module.exports={"Product":"ApplicationNameHere","ProductVersion":"0.0.0","ConfigFile":false,"LogStreams":[{"level":"trace"}]};},{}],68:[function(require,module,exports){(function(process){(function(){/**
* Fable Settings Template Processor
*
* This class allows environment variables to come in via templated expressions, and defaults to be set.
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable Settings
*/var FableSettingsTemplateProcessor=/*#__PURE__*/function(){function FableSettingsTemplateProcessor(pDependencies){_classCallCheck(this,FableSettingsTemplateProcessor);// Use a no-dependencies templating engine to parse out environment variables
this.templateProcessor=new pDependencies.precedent();// TODO: Make the environment variable wrap expression demarcation characters configurable?
this.templateProcessor.addPattern('${','}',function(pTemplateValue){var tmpTemplateValue=pTemplateValue.trim();var tmpSeparatorIndex=tmpTemplateValue.indexOf('|');// If there is no pipe, the default value will end up being whatever the variable name is.
var tmpDefaultValue=tmpTemplateValue.substring(tmpSeparatorIndex+1);var tmpEnvironmentVariableName=tmpSeparatorIndex>-1?tmpTemplateValue.substring(0,tmpSeparatorIndex):tmpTemplateValue;if(process.env.hasOwnProperty(tmpEnvironmentVariableName)){return process.env[tmpEnvironmentVariableName];}else{return tmpDefaultValue;}});}_createClass(FableSettingsTemplateProcessor,[{key:"parseSetting",value:function parseSetting(pString){return this.templateProcessor.parseString(pString);}}]);return FableSettingsTemplateProcessor;}();module.exports=FableSettingsTemplateProcessor;}).call(this);}).call(this,require('_process'));},{"_process":98}],69:[function(require,module,exports){/**
* Fable Settings Add-on
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable Settings
*/var libPrecedent=require('precedent');var libFableSettingsTemplateProcessor=require('./Fable-Settings-TemplateProcessor.js');var FableSettings=/*#__PURE__*/function(){function FableSettings(pFableSettings){_classCallCheck(this,FableSettings);// Expose the dependencies for downstream re-use
this.dependencies={precedent:libPrecedent};// Initialize the settings value template processor
this.settingsTemplateProcessor=new libFableSettingsTemplateProcessor(this.dependencies);// set straight away so anything that uses it respects the initial setting
this._configureEnvTemplating(pFableSettings);this["default"]=this.buildDefaultSettings();// Construct a new settings object
var tmpSettings=this.merge(pFableSettings,this.buildDefaultSettings());// The base settings object (what they were on initialization, before other actors have altered them)
this.base=JSON.parse(JSON.stringify(tmpSettings));if(tmpSettings.DefaultConfigFile){try{// If there is a DEFAULT configuration file, try to load and merge it.
tmpSettings=this.merge(require(tmpSettings.DefaultConfigFile),tmpSettings);}catch(pException){// Why this?  Often for an app we want settings to work out of the box, but
// would potentially want to have a config file for complex settings.
console.log('Fable-Settings Warning: Default configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}if(tmpSettings.ConfigFile){try{// If there is a configuration file, try to load and merge it.
tmpSettings=this.merge(require(tmpSettings.ConfigFile),tmpSettings);}catch(pException){// Why this?  Often for an app we want settings to work out of the box, but
// would potentially want to have a config file for complex settings.
console.log('Fable-Settings Warning: Configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}this.settings=tmpSettings;}// Build a default settings object.  Use the JSON jimmy to ensure it is always a new object.
_createClass(FableSettings,[{key:"buildDefaultSettings",value:function buildDefaultSettings(){return JSON.parse(JSON.stringify(require('./Fable-Settings-Default')));}// Update the configuration for environment variable templating based on the current settings object
},{key:"_configureEnvTemplating",value:function _configureEnvTemplating(pSettings){// default environment variable templating to on
this._PerformEnvTemplating=!pSettings||pSettings.NoEnvReplacement!==true;}// Resolve (recursive) any environment variables found in settings object.
},{key:"_resolveEnv",value:function _resolveEnv(pSettings){for(var tmpKey in pSettings){if(_typeof(pSettings[tmpKey])==='object'){this._resolveEnv(pSettings[tmpKey]);}else if(typeof pSettings[tmpKey]==='string'){pSettings[tmpKey]=this.settingsTemplateProcessor.parseSetting(pSettings[tmpKey]);}}}/**
	 * Check to see if a value is an object (but not an array).
	 */},{key:"_isObject",value:function _isObject(value){return _typeof(value)==='object'&&!Array.isArray(value);}/**
	 * Merge two plain objects. Keys that are objects in both will be merged property-wise.
	 */},{key:"_deepMergeObjects",value:function _deepMergeObjects(toObject,fromObject){var _this12=this;if(!fromObject||!this._isObject(fromObject)){return;}Object.keys(fromObject).forEach(function(key){var fromValue=fromObject[key];if(_this12._isObject(fromValue)){var toValue=toObject[key];if(toValue&&_this12._isObject(toValue)){// both are objects, so do a recursive merge
_this12._deepMergeObjects(toValue,fromValue);return;}}toObject[key]=fromValue;});return toObject;}// Merge some new object into the existing settings.
},{key:"merge",value:function merge(pSettingsFrom,pSettingsTo){// If an invalid settings from object is passed in (e.g. object constructor without passing in anything) this should still work
var tmpSettingsFrom=_typeof(pSettingsFrom)==='object'?pSettingsFrom:{};// Default to the settings object if none is passed in for the merge.
var tmpSettingsTo=_typeof(pSettingsTo)==='object'?pSettingsTo:this.settings;// do not mutate the From object property values
var tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));tmpSettingsTo=this._deepMergeObjects(tmpSettingsTo,tmpSettingsFromCopy);if(this._PerformEnvTemplating){this._resolveEnv(tmpSettingsTo);}// Update env tempating config, since we just updated the config object, and it may have changed
this._configureEnvTemplating(tmpSettingsTo);return tmpSettingsTo;}// Fill in settings gaps without overwriting settings that are already there
},{key:"fill",value:function fill(pSettingsFrom){// If an invalid settings from object is passed in (e.g. object constructor without passing in anything) this should still work
var tmpSettingsFrom=_typeof(pSettingsFrom)==='object'?pSettingsFrom:{};// do not mutate the From object property values
var tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));this.settings=this._deepMergeObjects(tmpSettingsFromCopy,this.settings);return this.settings;}}]);return FableSettings;}();;// This is for backwards compatibility
function autoConstruct(pSettings){return new FableSettings(pSettings);}module.exports=FableSettings;module.exports["new"]=autoConstruct;module.exports.precedent=libPrecedent;},{"./Fable-Settings-Default":67,"./Fable-Settings-TemplateProcessor.js":68,"precedent":95}],70:[function(require,module,exports){/**
* Random Byte Generator - Browser version
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/ // Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var RandomBytes=/*#__PURE__*/function(){function RandomBytes(){_classCallCheck(this,RandomBytes);// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
this.getRandomValues=typeof crypto!='undefined'&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!='undefined'&&typeof window.msCrypto.getRandomValues=='function'&&msCrypto.getRandomValues.bind(msCrypto);}// WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
_createClass(RandomBytes,[{key:"generateWhatWGBytes",value:function generateWhatWGBytes(){var tmpBuffer=new Uint8Array(16);// eslint-disable-line no-undef
this.getRandomValues(tmpBuffer);return tmpBuffer;}// Math.random()-based (RNG)
},{key:"generateRandomBytes",value:function generateRandomBytes(){// If all else fails, use Math.random().  It's fast, but is of unspecified
// quality.
var tmpBuffer=new Uint8Array(16);// eslint-disable-line no-undef
for(var i=0,tmpValue;i<16;i++){if((i&0x03)===0){tmpValue=Math.random()*0x100000000;}tmpBuffer[i]=tmpValue>>>((i&0x03)<<3)&0xff;}return tmpBuffer;}},{key:"generate",value:function generate(){if(this.getRandomValues){return this.generateWhatWGBytes();}else{return this.generateRandomBytes();}}}]);return RandomBytes;}();module.exports=RandomBytes;},{}],71:[function(require,module,exports){/**
* Fable UUID Generator
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable UUID
*/ /**
* Fable Solution UUID Generation Main Class
*
* @class FableUUID
* @constructor
*/var libRandomByteGenerator=require('./Fable-UUID-Random.js');var FableUUID=/*#__PURE__*/function(){function FableUUID(pSettings){_classCallCheck(this,FableUUID);// Determine if the module is in "Random UUID Mode" which means just use the random character function rather than the v4 random UUID spec.
// Note this allows UUIDs of various lengths (including very short ones) although guaranteed uniqueness goes downhill fast.
this._UUIDModeRandom=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDModeRandom')?pSettings.UUIDModeRandom==true:false;// These two properties are only useful if we are in Random mode.  Otherwise it generates a v4 spec
// Length for "Random UUID Mode" is set -- if not set it to 8
this._UUIDLength=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDLength')?pSettings.UUIDLength+0:8;// Dictionary for "Random UUID Mode"
this._UUIDRandomDictionary=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDDictionary')?pSettings.UUIDDictionary+0:'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';this.randomByteGenerator=new libRandomByteGenerator();// Lookup table for hex codes
this._HexLookup=[];for(var i=0;i<256;++i){this._HexLookup[i]=(i+0x100).toString(16).substr(1);}}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
_createClass(FableUUID,[{key:"bytesToUUID",value:function bytesToUUID(pBuffer){var i=0;// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
return[this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]]].join('');}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
},{key:"generateUUIDv4",value:function generateUUIDv4(){var tmpBuffer=new Array(16);var tmpRandomBytes=this.randomByteGenerator.generate();// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
tmpRandomBytes[6]=tmpRandomBytes[6]&0x0f|0x40;tmpRandomBytes[8]=tmpRandomBytes[8]&0x3f|0x80;return this.bytesToUUID(tmpRandomBytes);}// Simple random UUID generation
},{key:"generateRandom",value:function generateRandom(){var tmpUUID='';for(var i=0;i<this._UUIDLength;i++){tmpUUID+=this._UUIDRandomDictionary.charAt(Math.floor(Math.random()*(this._UUIDRandomDictionary.length-1)));}return tmpUUID;}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
},{key:"getUUID",value:function getUUID(){if(this._UUIDModeRandom){return this.generateRandom();}else{return this.generateUUIDv4();}}}]);return FableUUID;}();// This is for backwards compatibility
function autoConstruct(pSettings){return new FableUUID(pSettings);}module.exports=FableUUID;module.exports["new"]=autoConstruct;},{"./Fable-UUID-Random.js":70}],72:[function(require,module,exports){var _OperationStatePrototype=JSON.stringify({"Metadata":{"GUID":false,"Hash":false,"Title":"","Summary":"","Version":0},"Status":{"Completed":false,"CompletionProgress":0,"CompletionTimeElapsed":0,"Steps":1,"StepsCompleted":0,"StartTime":0,"EndTime":0},"Errors":[],"Log":[]});var FableOperation=/*#__PURE__*/function(){function FableOperation(pFable,pOperationName,pOperationHash){_classCallCheck(this,FableOperation);this.fable=pFable;this.name=pOperationName;this.state=JSON.parse(_OperationStatePrototype);this.state.Metadata.GUID=this.fable.getUUID();this.state.Metadata.Hash=this.state.GUID;if(typeof pOperationHash=='string'){this.state.Metadata.Hash=pOperationHash;}}_createClass(FableOperation,[{key:"GUID",get:function get(){return this.state.Metadata.GUID;}},{key:"Hash",get:function get(){return this.state.Metadata.Hash;}},{key:"log",get:function get(){return this;}},{key:"writeOperationLog",value:function writeOperationLog(pLogLevel,pLogText,pLogObject){this.state.Log.push("".concat(new Date().toUTCString()," [").concat(pLogLevel,"]: ").concat(pLogText));if(_typeof(pLogObject)=='object'){this.state.Log.push(JSON.stringify(pLogObject));}}},{key:"writeOperationErrors",value:function writeOperationErrors(pLogText,pLogObject){this.state.Errors.push("".concat(pLogText));if(_typeof(pLogObject)=='object'){this.state.Errors.push(JSON.stringify(pLogObject));}}},{key:"trace",value:function trace(pLogText,pLogObject){this.writeOperationLog('TRACE',pLogText,pLogObject);this.fable.log.trace(pLogText,pLogObject);}},{key:"debug",value:function debug(pLogText,pLogObject){this.writeOperationLog('DEBUG',pLogText,pLogObject);this.fable.log.debug(pLogText,pLogObject);}},{key:"info",value:function info(pLogText,pLogObject){this.writeOperationLog('INFO',pLogText,pLogObject);this.fable.log.info(pLogText,pLogObject);}},{key:"warn",value:function warn(pLogText,pLogObject){this.writeOperationLog('WARN',pLogText,pLogObject);this.fable.log.warn(pLogText,pLogObject);}},{key:"error",value:function error(pLogText,pLogObject){this.writeOperationLog('ERROR',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.error(pLogText,pLogObject);}},{key:"fatal",value:function fatal(pLogText,pLogObject){this.writeOperationLog('FATAL',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.fatal(pLogText,pLogObject);}}]);return FableOperation;}();module.exports=FableOperation;},{}],73:[function(require,module,exports){var libFableServiceBase=require('./Fable-ServiceProviderBase.js');var libDataArithmatic=require('data-arithmatic');var FableServiceDataArithmatic=/*#__PURE__*/function(_libFableServiceBase){_inherits(FableServiceDataArithmatic,_libFableServiceBase);var _super9=_createSuper(FableServiceDataArithmatic);function FableServiceDataArithmatic(pFable,pOptions,pServiceHash){var _this13;_classCallCheck(this,FableServiceDataArithmatic);_this13=_super9.call(this,pFable,pOptions,pServiceHash);_this13.serviceType='DataArithmatic';_this13._DataArithmaticLibrary=new libDataArithmatic();return _this13;}return _createClass(FableServiceDataArithmatic);}(libFableServiceBase);module.exports=FableServiceDataArithmatic;},{"./Fable-ServiceProviderBase.js":78,"data-arithmatic":20}],74:[function(require,module,exports){var libFableServiceBase=require('./Fable-ServiceProviderBase.js');var libPrecedent=require('precedent');var FableServiceMetaTemplate=/*#__PURE__*/function(_libFableServiceBase2){_inherits(FableServiceMetaTemplate,_libFableServiceBase2);var _super10=_createSuper(FableServiceMetaTemplate);function FableServiceMetaTemplate(pFable,pOptions,pServiceHash){var _this14;_classCallCheck(this,FableServiceMetaTemplate);_this14=_super10.call(this,pFable,pOptions,pServiceHash);_this14.serviceType='MetaTemplate';_this14._MetaTemplateLibrary=new libPrecedent(_this14.options);return _this14;}/**
	 * Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pTree - A node on the parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @param {number} pIndex - callback function
	 * @return {bool} True if adding the pattern was successful
	 */_createClass(FableServiceMetaTemplate,[{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,pParser){return this._MetaTemplateLibrary.addPattern(pPatternStart,pPatternEnd,pParser);}/**
	 * Parse a string with the existing parse tree
	 * @method parseString
	 * @param {string} pString - The string to parse
	 * @return {string} The result from the parser
	 */},{key:"parseString",value:function parseString(pString,pData){return this._MetaTemplateLibrary.parseString(pString,pData);}}]);return FableServiceMetaTemplate;}(libFableServiceBase);module.exports=FableServiceMetaTemplate;},{"./Fable-ServiceProviderBase.js":78,"precedent":95}],75:[function(require,module,exports){var libFableServiceBase=require('./Fable-ServiceProviderBase.js');var FableServiceTemplate=/*#__PURE__*/function(_libFableServiceBase3){_inherits(FableServiceTemplate,_libFableServiceBase3);var _super11=_createSuper(FableServiceTemplate);// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
//
// NOTE: This does not implement underscore escape expressions
// NOTE: This does not implement underscore magic browser variable assignment
//
// This is an implementation of that.
// TODO: Make this use precedent, add configuration, add debugging.
function FableServiceTemplate(pFable,pOptions,pServiceHash){var _this15;_classCallCheck(this,FableServiceTemplate);_this15=_super11.call(this,pFable,pOptions,pServiceHash);_this15.serviceType='Template';// These are the exact regex's used in lodash/underscore
// TODO: Switch this to precedent
_this15.Matchers={Evaluate:/<%([\s\S]+?)%>/g,Interpolate:/<%=([\s\S]+?)%>/g,Escaper:/\\|'|\r|\n|\t|\u2028|\u2029/g,Unescaper:/\\(\\|'|r|n|t|u2028|u2029)/g,// This is how underscore does it, so we are keeping it for now.
GuaranteedNonMatch:/.^/};// This is a helper for the escaper and unescaper functions.
// Right now we are going to keep what underscore is doing, but, not forever.
_this15.templateEscapes={'\\':'\\',"'":"'",'r':'\r','\r':'r','n':'\n','\n':'n','t':'\t','\t':'t','u2028':"\u2028","\u2028":'u2028','u2029':"\u2029","\u2029":'u2029'};// This is defined as such to underscore that it is a dynamic programming
// function on this class.
_this15.renderFunction=false;_this15.templateString=false;return _this15;}_createClass(FableServiceTemplate,[{key:"renderTemplate",value:function renderTemplate(pData){return this.renderFunction(pData);}},{key:"templateFunction",value:function templateFunction(pData){var fRenderTemplateBound=this.renderTemplate.bind(this);return fRenderTemplateBound;}},{key:"buildTemplateFunction",value:function buildTemplateFunction(pTemplateText,pData){var _this16=this;// For now this is being kept in a weird form ... this is to mimic the old
// underscore code until this is rewritten using precedent.
this.TemplateSource="__p+='"+pTemplateText.replace(this.Matchers.Escaper,function(pMatch){return"\\".concat(_this16.templateEscapes[pMatch]);}).replace(this.Matchers.Interpolate||this.Matchers.GuaranteedNonMatch,function(pMatch,pCode){return"'+\n(".concat(decodeURIComponent(pCode),")+\n'");}).replace(this.Matchers.Evaluate||this.Matchers.GuaranteedNonMatch,function(pMatch,pCode){return"';\n".concat(decodeURIComponent(pCode),"\n;__p+='");})+"';\n";this.TemplateSource="with(pTemplateDataObject||{}){\n".concat(this.TemplateSource,"}\n");this.TemplateSource="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n".concat(this.TemplateSource,"return __p;\n");this.renderFunction=new Function('pTemplateDataObject',this.TemplateSource);if(typeof pData!='undefined'){return this.renderFunction(pData);}// Provide the compiled function source as a convenience for build time
// precompilation.
this.TemplateSourceCompiled='function(obj){\n'+this.TemplateSource+'}';return this.templateFunction();}}]);return FableServiceTemplate;}(libFableServiceBase);module.exports=FableServiceTemplate;},{"./Fable-ServiceProviderBase.js":78}],76:[function(require,module,exports){var libFableServiceBase=require('./Fable-ServiceProviderBase.js');// TODO: These are still pretty big -- consider the smaller polyfills
var libAsyncWaterfall=require('async.waterfall');var libAsyncEachLimit=require('async.eachlimit');var FableServiceUtility=/*#__PURE__*/function(_libFableServiceBase4){_inherits(FableServiceUtility,_libFableServiceBase4);var _super12=_createSuper(FableServiceUtility);// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
//
// NOTE: This does not implement underscore escape expressions
// NOTE: This does not implement underscore magic browser variable assignment
//
// This is an implementation of that.
// TODO: Make this use precedent, add configuration, add debugging.
function FableServiceUtility(pFable,pOptions,pServiceHash){var _this17;_classCallCheck(this,FableServiceUtility);_this17=_super12.call(this,pFable,pOptions,pServiceHash);_this17.templates={};// These two functions are used extensively throughout
_this17.waterfall=libAsyncWaterfall;_this17.eachLimit=libAsyncEachLimit;return _this17;}// Underscore and lodash have a behavior, _.extend, which merges objects.
// Now that es6 gives us this, use the native thingy.
_createClass(FableServiceUtility,[{key:"extend",value:function extend(pDestinationObject){for(var _len2=arguments.length,pSourceObjects=new Array(_len2>1?_len2-1:0),_key3=1;_key3<_len2;_key3++){pSourceObjects[_key3-1]=arguments[_key3];}return Object.assign.apply(Object,[pDestinationObject].concat(pSourceObjects));}// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
},{key:"template",value:function template(pTemplateText,pData){var tmpTemplate=this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Template');return tmpTemplate.buildTemplateFunction(pTemplateText,pData);}// Build a template function from a template hash, and, register it with the service provider
},{key:"buildHashedTemplate",value:function buildHashedTemplate(pTemplateHash,pTemplateText,pData){var tmpTemplate=this.fable.serviceManager.instantiateServiceProvider('Template',{},pTemplateHash);this.templates[pTemplateHash]=tmpTemplate.buildTemplateFunction(pTemplateText,pData);return this.templates[pTemplateHash];}// This is a safe, modern version of chunk from underscore
// Algorithm pulled from a mix of these two polyfills:
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
// https://youmightnotneed.com/lodash
// This implementation was most tolerant in browsers.  Uglify can fix the rest.
},{key:"chunk",value:function chunk(pInput,pChunkSize,pChunkCache){var tmpInputArray=_toConsumableArray(pInput);// Note lodash defaults to 1, underscore defaults to 0
var tmpChunkSize=typeof pChunkSize=='number'?pChunkSize:0;var tmpChunkCache=typeof pChunkCache!='undefined'?pChunkCache:[];if(tmpChunkSize<=0){return tmpChunkCache;}while(tmpInputArray.length){tmpChunkCache.push(tmpInputArray.splice(0,tmpChunkSize));}return tmpChunkCache;}}]);return FableServiceUtility;}(libFableServiceBase);module.exports=FableServiceUtility;},{"./Fable-ServiceProviderBase.js":78,"async.eachlimit":1,"async.waterfall":15}],77:[function(require,module,exports){/**
* Fable Application Services Management
* @license MIT
* @author <steven@velozo.com>
*/var libFableServiceBase=require('./Fable-ServiceProviderBase.js');var FableService=/*#__PURE__*/function(){function FableService(pFable){_classCallCheck(this,FableService);this.fable=pFable;this.serviceTypes=[];// A map of instantiated services
this.services={};// A map of the default instantiated service by type
this.defaultServices={};// A map of class constructors for services
this.serviceClasses={};}_createClass(FableService,[{key:"addServiceType",value:function addServiceType(pServiceType,pServiceClass){// Add the type to the list of types
this.serviceTypes.push(pServiceType);// Add the container for instantiated services to go in
this.services[pServiceType]={};if(typeof pServiceClass=='function'&&pServiceClass.prototype instanceof libFableServiceBase){// Add the class to the list of classes
this.serviceClasses[pServiceType]=pServiceClass;}else{// Add the base class to the list of classes
this.serviceClasses[pServiceType]=libFableServiceBase;}}},{key:"instantiateServiceProvider",value:function instantiateServiceProvider(pServiceType,pOptions,pCustomServiceHash){// Instantiate the service
var tmpService=this.instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash);// Add the service to the service map
this.services[pServiceType][tmpService.Hash]=tmpService;// If this is the first service of this type, make it the default
if(!this.defaultServices.hasOwnProperty(pServiceType)){this.defaultServices[pServiceType]=tmpService;}return tmpService;}// Create a service provider but don't register it to live forever in fable.services
},{key:"instantiateServiceProviderWithoutRegistration",value:function instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash){// Instantiate the service
var tmpService=new this.serviceClasses[pServiceType](this.fable,pOptions,pCustomServiceHash);return tmpService;}},{key:"setDefaultServiceInstantiation",value:function setDefaultServiceInstantiation(pServiceType,pServiceHash){if(this.services[pServiceType].hasOwnProperty(pServiceHash)){this.defaultServices[pServiceType]=this.services[pServiceType][pServiceHash];return true;}return false;}}]);return FableService;}();module.exports=FableService;module.exports.ServiceProviderBase=libFableServiceBase;},{"./Fable-ServiceProviderBase.js":78}],78:[function(require,module,exports){/**
* Fable Service Base
* @license MIT
* @author <steven@velozo.com>
*/var FableServiceProviderBase=/*#__PURE__*/_createClass(function FableServiceProviderBase(pFable,pOptions,pServiceHash){_classCallCheck(this,FableServiceProviderBase);this.fable=pFable;this.options=_typeof(pOptions)==='object'?pOptions:{};this.serviceType='Unknown';this.UUID=pFable.getUUID();this.Hash=typeof pServiceHash==='string'?pServiceHash:"".concat(this.UUID);});module.exports=FableServiceProviderBase;},{}],79:[function(require,module,exports){/**
* Fable Application Services Support Library
* @license MIT
* @author <steven@velozo.com>
*/var libFableSettings=require('fable-settings');var libFableUUID=require('fable-uuid');var libFableLog=require('fable-log');var libFableServiceManager=require('./Fable-ServiceManager.js');var libFableServiceDataArithmatic=require('./Fable-Service-DataArithmatic.js');var libFableServiceTemplate=require('./Fable-Service-Template.js');var libFableServiceMetaTemplate=require('./Fable-Service-MetaTemplate.js');var libFableServiceUtility=require('./Fable-Service-Utility.js');var libFableOperation=require('./Fable-Operation.js');var Fable=/*#__PURE__*/function(){function Fable(pSettings){_classCallCheck(this,Fable);var tmpSettings=new libFableSettings(pSettings);this.settingsManager=tmpSettings;// Instantiate the UUID generator
this.libUUID=new libFableUUID(this.settingsManager.settings);this.log=new libFableLog(this.settingsManager.settings);this.log.initialize();// Built-in dependencies
this.Dependencies={precedent:libFableSettings.precedent};// Location for Operation state
this.Operations={};this.serviceManager=new libFableServiceManager(this);// Initialize and instantiate the default baked-in Data Arithmatic service
this.serviceManager.addServiceType('DataArithmatic',libFableServiceDataArithmatic);this.fable.serviceManager.instantiateServiceProvider('DataArithmatic',{},'Default-Service-DataArithmatic');// This service is passing through the data arithmatic library
this.DataArithmatic=this.serviceManager.defaultServices.DataArithmatic._DataArithmaticLibrary;// Initialize the template service
this.serviceManager.addServiceType('Template',libFableServiceTemplate);// Initialize the metatemplate service
this.serviceManager.addServiceType('MetaTemplate',libFableServiceMetaTemplate);// Initialize and instantiate the default baked-in Utility service
this.serviceManager.addServiceType('Utility',libFableServiceUtility);this.fable.serviceManager.instantiateServiceProvider('Utility',{},'Default-Service-Utility');this.Utility=this.serviceManager.defaultServices.Utility;this.services=this.serviceManager.services;this.defaultServices=this.serviceManager.defaultServices;}_createClass(Fable,[{key:"settings",get:function get(){return this.settingsManager.settings;}},{key:"fable",get:function get(){return this;}},{key:"getUUID",value:function getUUID(){return this.libUUID.getUUID();}},{key:"createOperation",value:function createOperation(pOperationName,pOperationHash){var tmpOperation=new libFableOperation(this,pOperationName,pOperationHash);if(this.Operations.hasOwnProperty(tmpOperation.Hash)){// Uh Oh ...... Operation Hash Collision!
// TODO: What to do?!
}else{this.Operations[tmpOperation.Hash]=tmpOperation;}return tmpOperation;}},{key:"getOperation",value:function getOperation(pOperationHash){if(!this.Operations.hasOwnProperty(pOperationHash)){return false;}else{return this.Operations[pOperationHash];}}}]);return Fable;}();// This is for backwards compatibility
function autoConstruct(pSettings){return new Fable(pSettings);}module.exports=Fable;module.exports["new"]=autoConstruct;module.exports.LogProviderBase=libFableLog.LogProviderBase;module.exports.ServiceProviderBase=libFableServiceManager.ServiceProviderBase;module.exports.precedent=libFableSettings.precedent;},{"./Fable-Operation.js":72,"./Fable-Service-DataArithmatic.js":73,"./Fable-Service-MetaTemplate.js":74,"./Fable-Service-Template.js":75,"./Fable-Service-Utility.js":76,"./Fable-ServiceManager.js":77,"fable-log":66,"fable-settings":69,"fable-uuid":71}],80:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/ /**
* Informary Logging
*
* @class InformaryLog
*/var InformaryLog=/*#__PURE__*/function(){function InformaryLog(pSettings){_classCallCheck(this,InformaryLog);this._Settings=pSettings;}_createClass(InformaryLog,[{key:"writeConsole",value:function writeConsole(pLevel,pMessage,pObject){// Write the message
console.log('['+pLevel+'] ('+this._Settings.Form+') '+pMessage);// Write out the object if it is passed in
if(typeof pObject!=='undefined'){console.log(JSON.stringify(pObject,null,4));}}},{key:"trace",value:function trace(pMessage,pObject){this.writeConsole('TRACE',pMessage,pObject);}},{key:"debug",value:function debug(pMessage,pObject){this.writeConsole('DEBUG',pMessage,pObject);}},{key:"info",value:function info(pMessage,pObject){this.writeConsole('INFO',pMessage,pObject);}},{key:"warning",value:function warning(pMessage,pObject){this.writeConsole('WARNING',pMessage,pObject);}},{key:"error",value:function error(pMessage,pObject){this.writeConsole('ERROR',pMessage,pObject);}// Log the current date and time, well formatted (with Moment-Timezone)
},{key:"logTime",value:function logTime(pMessage){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time';var tmpDate=new Date();this.info(tmpMessage+': '+tmpDate.toString());}// Get a timestamp
},{key:"getTimeStamp",value:function getTimeStamp(){return+new Date();}},{key:"getTimeDelta",value:function getTimeDelta(pTimeStamp){var tmpEndTime=+new Date();return tmpEndTime-pTimeStamp;}// Log the delta between a timestamp, and now with a message
},{key:"logTimeDelta",value:function logTimeDelta(pTimeStamp,pMessage){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';var tmpEndTime=+new Date();var tmpOperationTime=tmpEndTime-pTimeStamp;this.info(tmpMessage+' ('+tmpOperationTime+'ms)');}}]);return InformaryLog;}();module.exports=InformaryLog;},{}],81:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libObjectDiff=require('deep-object-diff');var libCacheTraxx=require('cachetrax');/**
* Informary browser sync library
*
* @class Informary
*/var Informary=/*#__PURE__*/function(){function Informary(pSettings,pContext,pContextGUID){_classCallCheck(this,Informary);this._Dependencies={};this._Dependencies.jqueryLibrary=require('jquery');// Adding a container for non-html state to be stored in, which will be marshalled into and out of the passed in FormData.
this._NonHTMLState={};this._NonHTMLStateProperty="__InformaryNonHTMLState";this._Settings=_typeof(pSettings)==='object'?pSettings:{// The form we are dealing with (this is a hash set on the form itself)
Form:'UNSET_HTML_FORM_ID',User:0,// The number of undo levels available
UndoLevels:25,// If this is true, show a whole lotta logs
DebugLog:false};if(this._Settings.__VirtualDOM){// If a virtual dom was passed in for unit tests, use that.
this._Dependencies.jquery=this._Dependencies.jqueryLibrary(this._Settings.__VirtualDOM);}else{this._Dependencies.jquery=this._Dependencies.jqueryLibrary;}if(!this._Settings.User){// If no user was passed in, set a default of 0
this._Settings.User=0;}if(!this._Settings.Form){this._Settings.Form='UNSET_HTML_FORM_ID';}// This has behaviors similar to bunyan, for consistency
this._Log=new(require('./Informary-Log.js'))(this._Settings);this.log=this._Log;// This is lazily set so unit tests can set an external provider for harnesses
this._LocalStorage=null;this._UndoKeys=[];this._UndoBuffer=new libCacheTraxx();// Default to 25 undo levels if it isn't passed in via settings
this._UndoBuffer.maxLength=this._Settings.UndoLevels?this._Settings.UndoLevels:25;this._RedoKeys=[];this._RedoBuffer=new libCacheTraxx();this._RedoBuffer.maxLength=this._UndoBuffer.maxLength;// The initially loaded document state (filled out when pushed to form)
this._SourceDocumentState=false;// The latest current document state
this._CurrentDocumentState=false;// If no context is passed in, use `Context_0`
// This could cause undo/redo leakage.
this._Context=pContext?pContext.toString():'InformaryDefaultContext';this._ContextGUID=pContextGUID?pContextGUID.toString():'0x000000001';}/******************************************************
	 * Storage Provider
	 * --
	 * This could be abstracted to another class
	 */_createClass(Informary,[{key:"setStorageProvider",value:function setStorageProvider(pStorageProvider){this._LocalStorage=pStorageProvider;}},{key:"checkStorageProvider",value:function checkStorageProvider(){// When running in a browser, this likely won't be set.  If it isn't,
if(!this._LocalStorage){this._LocalStorage=window.localStorage;if(!this._LocalStorage){var cache={};this._LocalStorage={setItem:function setItem(key,value){cache[key]=value;},getItem:function getItem(key){return cache[key];},removeItem:function removeItem(key){delete cache[key];}};}}}},{key:"getIndexKey",value:function getIndexKey(pValueType){return"Informary_Index_User[".concat(this._Settings.User.toString(),"]_ValueType[").concat(pValueType,"]");}},{key:"getStorageKey",value:function getStorageKey(pValueType){return"Informary_Data_User[".concat(this._Settings.User.toString(),"]_ValueType[").concat(pValueType,"]_Context[").concat(this._Context,"]_ContextGUID[").concat(this._ContextGUID,"]");}// Read the whole index
},{key:"readIndex",value:function readIndex(pValueType){this.checkStorageProvider();var tmpIndex=false;var tmpData=this._LocalStorage.getItem(this.getIndexKey(pValueType));if(tmpData){try{tmpIndex=JSON.parse(tmpData);}catch(pError){this.log.error("Error parsing local storage index key [".concat(this.getIndexKey(pValueType),"]"));}}if(!tmpIndex){tmpIndex={IndexCreateTime:Date.now(),IndexUser:this._Settings.User};}tmpIndex.IndexLastReadTime=Date.now();return tmpIndex;}// Read just the record key for the index
},{key:"readIndexValue",value:function readIndexValue(pValueType){var tmpIndex=this.readIndex(pValueType);var tmpIndexKeyValue=tmpIndex[this.getStorageKey(pValueType)];// Rather than return undefined, return false if it's a miss
return tmpIndexKeyValue?tmpIndexKeyValue:false;}// Touch the index for a value type
},{key:"touchIndex",value:function touchIndex(pValueType){this.checkStorageProvider();var tmpIndex=this.readIndex(pValueType);var tmpKey=this.getStorageKey(pValueType);tmpIndex[tmpKey]={Time:Date.now(),ValueType:pValueType,User:this._Settings.User,Context:this._Context,ContextGUID:this._ContextGUID};// This relies on the readIndex above to initialize the localstorage provider
this._LocalStorage.setItem(this.getIndexKey(pValueType),JSON.stringify(tmpIndex));}},{key:"readData",value:function readData(pValueType){// Check that the storage provider is initialized
this.checkStorageProvider();var tmpData=this._LocalStorage.getItem(this.getStorageKey(pValueType));if(tmpData){try{tmpData=JSON.parse(tmpData);}catch(pError){this.log.error("Error parsing local storage key [".concat(this.getStorageKey(pValueType),"]"));tmpData=false;}}else{tmpData=false;}return tmpData;}},{key:"writeData",value:function writeData(pValueType,pData){// Check that the storage provider is initialized
this.checkStorageProvider();// Touch the index with a timestamp for the value
this.touchIndex(pValueType);// set the actual item
this._LocalStorage.setItem(this.getStorageKey(pValueType),JSON.stringify(pData));}},{key:"deleteData",value:function deleteData(pValueType){// Check that the storage provider is initialized
this.checkStorageProvider();// Touch the index with a timestamp for the value.  Should we tell it it's a delete operation?  Hmmm..
this.touchIndex(pValueType);// set the actual item
this._LocalStorage.removeItem(this.getStorageKey(pValueType));}/*
	 * End of Storage Provider section
	 ******************************************************/},{key:"getValueAtAddress",value:function getValueAtAddress(pObject,pAddress){// Make sure pObject is an object
if(!_typeof(pObject)==='object')return false;// Make sure pAddress is a string
if(!_typeof(pAddress)==='string')return false;var tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex===-1){// Now is the time to return the value in the address
return pObject[pAddress];}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress);}else{// Create a subobject and then pass that
pObject[tmpSubObjectName]={};return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress);}}}},{key:"setValueAtAddress",value:function setValueAtAddress(pObject,pAddress,pValue){// Make sure pObject is an object
if(!_typeof(pObject)==='object')return false;// Make sure pAddress is a string
if(!_typeof(pAddress)==='string')return false;var tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex===-1){// Now is the time to set the value in the object
pObject[pAddress]=pValue;return true;}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){if(!pObject.hasOwnProperty('__ERROR'))pObject['__ERROR']={};// Put it in an error object so data isn't lost
pObject['__ERROR'][pAddress]=pValue;return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}else{// Create a subobject and then pass that
pObject[tmpSubObjectName]={};return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}}}},{key:"setValueAtAddressInContainer",value:function setValueAtAddressInContainer(pRecordObject,pFormContainerAddress,pFormContainerIndex,pFormValueAddress,pFormValue){// First see if there *is* a container object
var tmpContainerObject=this.getValueAtAddress(pRecordObject,pFormContainerAddress);if(typeof pFormContainerAddress!=='string')return false;var tmpFormContainerIndex=parseInt(pFormContainerIndex,10);if(isNaN(tmpFormContainerIndex))return false;if(_typeof(tmpContainerObject)!=='object'||!Array.isArray(tmpContainerObject)){// Check if there is a value here and we want to store it in the "__OverwrittenData" thing
tmpContainerObject=[];this.setValueAtAddress(pRecordObject,pFormContainerAddress,tmpContainerObject);}for(var i=0;tmpContainerObject.length+i<=tmpFormContainerIndex+1;i++){// Add objects to this container until it has enough
tmpContainerObject.push({});}// Now set the value *in* the container object
return this.setValueAtAddress(tmpContainerObject[tmpFormContainerIndex],pFormValueAddress,pFormValue);}// Write out source data
},{key:"storeSourceData",value:function storeSourceData(pData){return this.writeData('Source',pData);}// Write out recovery data
},{key:"storeRecoveryData",value:function storeRecoveryData(fCallback){var _this18=this;var tmpCallback=typeof fCallback=='function'?fCallback:function(){};var tmpRecoveryData={};this.marshalFormToData(tmpRecoveryData,function(){_this18._RecoveryDocumentState=tmpRecoveryData;return tmpCallback(_this18.writeData('Recovery',_this18._RecoveryDocumentState));});}},{key:"snapshotData",value:function snapshotData(){var _this19=this;var tmpNewUndoKey=Date.now().toString();// Check to see if there are any changes to the data to be stored
var tmpOldRecoveryState=JSON.stringify(this._RecoveryDocumentState);this.storeRecoveryData(function(){if(tmpOldRecoveryState!=JSON.stringify(_this19._RecoveryDocumentState)){if(_this19._Settings.DebugLog){_this19.log.debug("Creating recovery snapshot at [".concat(tmpNewUndoKey,"]..."));}// Destroy all data in the redo ring, because this new snapshot invalidates it.
while(_this19._RedoKeys.length>0){var tmpRedoKey=_this19._RedoKeys.pop();_this19._RedoBuffer.expire(tmpRedoKey);}_this19._UndoKeys.push(tmpNewUndoKey);_this19._UndoBuffer.put(_this19._RecoveryDocumentState,tmpNewUndoKey);}else{if(_this19._Settings.DebugLog){_this19.log.debug("Skipped creating recovery snapshot at [".concat(tmpNewUndoKey,"] because there were no changes to the recovery state..."));}}});}},{key:"snapshotDataInitial",value:function snapshotDataInitial(){var _this20=this;var tmpNewUndoKey=Date.now().toString();if(this._UndoKeys.length>0){this.log.info("Skipping creation of initial snapshot because one already exists.");return false;}this.storeRecoveryData(function(){if(_this20._Settings.DebugLog){_this20.log.debug("Creating recovery snapshot at [".concat(tmpNewUndoKey,"]..."));}_this20._UndoKeys.push(tmpNewUndoKey);_this20._UndoBuffer.put(_this20._RecoveryDocumentState,tmpNewUndoKey);});return true;}},{key:"undoSnapshotCount",value:function undoSnapshotCount(){// The initial snapshot is special to prevent confusing conditions when form data hasn't been edited.
return this._UndoKeys.length;}},{key:"redoSnapshotCount",value:function redoSnapshotCount(){return this._RedoKeys.length;}},{key:"revertToPreviousSnapshot",value:function revertToPreviousSnapshot(fCallback){var _this21=this;var tmpCallback=typeof fCallback=='function'?fCallback:function(){};if(this._UndoKeys.length<1){this.log.info("Not enough undo snapshots; skipping undo.");return tmpCallback(false);}var tmpSnapshotKey=this._UndoKeys.pop();var tmpSnapshotData=this._UndoBuffer.read(tmpSnapshotKey);if(tmpSnapshotData){// Add it to the redo buffer
this._RedoKeys.push(tmpSnapshotKey);this._RedoBuffer.put(tmpSnapshotData,tmpSnapshotKey);// Check if the form data matches and if so advance back one step
var tmpCurrentFormData={};this.marshalFormToData(tmpCurrentFormData,function(){// Remove the expired snapshot of data from the Undu buffer
_this21._UndoBuffer.expire(tmpSnapshotKey);_this21.marshalDataToForm(tmpSnapshotData,function(){_this21._RecoveryDocumentState=tmpSnapshotData;_this21.log.info("Informary reverted to snapshot ID ".concat(tmpSnapshotKey));if(JSON.stringify(tmpCurrentFormData)==JSON.stringify(tmpSnapshotData)&&_this21._UndoKeys.length>0){return _this21.revertToPreviousSnapshot(tmpCallback);}if(_this21._UndoKeys.length==0){_this21.log.info("Snapshot Data Depleted -- Creating Extra Undo Snapshot");_this21.snapshotDataInitial();}return tmpCallback(true);});});}return tmpCallback(false);}},{key:"reapplyNextRevertedSnapshot",value:function reapplyNextRevertedSnapshot(fCallback){var _this22=this;var tmpCallback=typeof fCallback=='function'?fCallback:function(){};var tmpSnapshotKey=this._RedoKeys.pop();var tmpSnapshotData=this._RedoBuffer.read(tmpSnapshotKey);if(tmpSnapshotData){// Add it to the undo buffer
this._UndoKeys.push(tmpSnapshotKey);this._UndoBuffer.put(tmpSnapshotData,tmpSnapshotKey);// Remove the expired snapshot of data from the Redo buffer
this._RedoBuffer.expire(tmpSnapshotKey);// Check if the form data matches and if so advance back one step
var tmpCurrentFormData={};this.marshalFormToData(tmpCurrentFormData,function(){_this22.marshalDataToForm(tmpSnapshotData,function(){_this22._RecoveryDocumentState=tmpSnapshotData;_this22.log.info("Informary reapplied snapshot ID ".concat(tmpSnapshotKey));if(JSON.stringify(tmpCurrentFormData)==JSON.stringify(tmpSnapshotData)&&_this22._RedoKeys.length>0){// If the old form data matches the applied data, roll back farther
return _this22.reapplyNextRevertedSnapshot(tmpCallback);}return tmpCallback(true);});});}return tmpCallback(false);}},{key:"clearRecoveryData",value:function clearRecoveryData(){return this.deleteData('Recovery');}},{key:"readRecoveryData",value:function readRecoveryData(){return this.readData('Recovery');}},{key:"restoreRecoveryScenarioData",value:function restoreRecoveryScenarioData(fCallback){var _this23=this;var tmpCallback=typeof fCallback=='function'?fCallback:function(){};var tmpRecoveryScenarioData=this.readRecoveryScenario();if(tmpRecoveryScenarioData&&tmpRecoveryScenarioData.ExistingRecovery){this.marshalDataToForm(tmpRecoveryScenarioData.ExistingRecovery,function(){_this23.clearRecoveryScenarioData();// Store a new recovery data
//this.storeSourceData();
return tmpCallback(true);});}return tmpCallback(false);}},{key:"clearRecoveryScenarioData",value:function clearRecoveryScenarioData(){return this.deleteData('RecoveryScenario');}},{key:"storeRecoveryScenarioData",value:function storeRecoveryScenarioData(pRecoveryScenarioData){return this.writeData('RecoveryScenario',pRecoveryScenarioData);}},{key:"readRecoveryScenario",value:function readRecoveryScenario(){return this.readData('RecoveryScenario');}// Checks if there is a recovery record, and detailed data about what it might be
},{key:"checkRecoveryState",value:function checkRecoveryState(pSourceData){var tmpRecoveryData={NewSource:pSourceData,ExistingSource:this.readData('Source'),ExistingRecovery:this.readData('Recovery')};if(!tmpRecoveryData.ExistingSource||!tmpRecoveryData.ExistingRecovery){// There is either no source or no read data, so we are not in a recovery state
return false;}else{// Now check the differences
var tmpRecoveryDifferences=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingSource,tmpRecoveryData.ExistingRecovery);if(JSON.stringify(tmpRecoveryDifferences)==JSON.stringify(libObjectDiff.detailedDiff({},{}))){// No differences -- we're good for now
return false;}else{this._Log.info("Informary found recovery data at ".concat(this.getStorageKey('Recovery'),"!"));// Put the recovery changes in the object for helpfulness
tmpRecoveryData.Diffs={};tmpRecoveryData.Diffs.ExistingRecovery_ExistingSource=tmpRecoveryDifferences;tmpRecoveryData.Diffs.ExistingSource_NewSource=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingSource,tmpRecoveryData.NewSource);tmpRecoveryData.Diffs.ExistingRecovery_NewSource=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingRecovery,tmpRecoveryData.NewSource);// Put the index data in the object for helpfulness
tmpRecoveryData.Index={};tmpRecoveryData.Index.ExistingSource=this.readIndexValue('Source');tmpRecoveryData.Index.ExistingRecovery=this.readIndexValue('Recovery');this.writeData('RecoveryScenario',tmpRecoveryData);return tmpRecoveryData;}}}},{key:"compareCurrentStateToUndoAndRedo",value:function compareCurrentStateToUndoAndRedo(fCallback){var _this24=this;var tmpCallBack=typeof fCallback==='function'?fCallback:function(){};var tmpCurrentStateData={};var tmpCurrentUndoObject={};var tmpCurrentRedoObject={};this.marshalFormToData(tmpCurrentStateData,function(){var tmpCurrentStateDataJSON=JSON.stringify(tmpCurrentStateData);if(_this24._UndoKeys.length>0){var tmpCurrentUndoBufferSnapshotKey=_this24._UndoKeys[_this24._UndoKeys.length-1];tmpCurrentUndoObject=_this24._UndoBuffer.read(tmpCurrentUndoBufferSnapshotKey);}if(_this24._RedoKeys.length>0){// Because there can be duplication of records in the redo buffer that may include
// the current data in the form multiple times, we need to enumerate the redo buffer
// until the JSON doesn't match the current data.
var tmpFirstRedoIndexWithDifferences=_this24._RedoKeys.length-1;for(var i=_this24._RedoKeys.length-1;i>=0;i--){var tmpRedoComparisonJSON=JSON.stringify(_this24._RedoBuffer.read(_this24._RedoKeys[i]));if(tmpRedoComparisonJSON!=tmpCurrentStateDataJSON){tmpFirstRedoIndexWithDifferences=i;// Once we have found a set of redo data that doesn't match, we don't want to keep looking
break;}}tmpCurrentRedoObject=_this24._RedoBuffer.read(_this24._RedoKeys[tmpFirstRedoIndexWithDifferences]);}var tmpComparisonData={UndoDelta:libObjectDiff.detailedDiff(tmpCurrentStateData,tmpCurrentUndoObject),UndoGUIDDelta:{Added:[],Deleted:[]},RedoDelta:libObjectDiff.detailedDiff(tmpCurrentStateData,tmpCurrentRedoObject),RedoGUIDDelta:{Added:[],Deleted:[]}};// Perform GUID diff operations
// Get all GUID values from the form
var tmpCurrentGUIDElements=[];var tmpCurrentDataIndex=0;if(tmpCurrentStateData.hasOwnProperty('__GUID')){tmpCurrentGUIDElements=Object.keys(tmpCurrentStateData.__GUID).sort();}// Get the deltas for undo data
var tmpUndoGUIDElements=[];if(tmpCurrentUndoObject.hasOwnProperty('__GUID')){tmpUndoGUIDElements=Object.keys(tmpCurrentUndoObject.__GUID).sort();}var tmpUndoDataIndex=0;var tmpUndoDataMaxIndex=tmpUndoGUIDElements.length-1;for(tmpCurrentDataIndex=0;tmpCurrentDataIndex<tmpCurrentGUIDElements.length;tmpCurrentDataIndex++){while(tmpUndoDataIndex<=tmpUndoDataMaxIndex&&tmpUndoGUIDElements[tmpUndoDataIndex]!=tmpCurrentGUIDElements[tmpCurrentDataIndex]){// Check to see if the string in the Undo keys is less than the string in the current form element.
// If so, it was deleted
if(tmpUndoGUIDElements[tmpUndoDataIndex]<tmpCurrentGUIDElements[tmpCurrentDataIndex]){tmpComparisonData.UndoGUIDDelta.Added.push(tmpUndoGUIDElements[tmpUndoDataIndex]);tmpUndoDataIndex++;}else{// It must be greater if it is inequal, so break out of the while
break;}}if(tmpUndoDataIndex<=tmpUndoDataMaxIndex&&tmpUndoGUIDElements[tmpUndoDataIndex]==tmpCurrentGUIDElements[tmpCurrentDataIndex]){// If the elements match, skip it because it exists on both sides.
tmpUndoDataIndex++;}else{tmpComparisonData.UndoGUIDDelta.Deleted.push(tmpCurrentGUIDElements[tmpCurrentDataIndex]);}}// If there are any GUIDS left in the Undo GUID list, they are additions
for(var _i9=tmpUndoDataIndex;_i9<=tmpUndoDataMaxIndex;_i9++){tmpComparisonData.UndoGUIDDelta.Added.push(tmpUndoGUIDElements[_i9]);}// Get the deltas for Redo data
var tmpRedoGUIDElements=[];if(tmpCurrentRedoObject.hasOwnProperty('__GUID')){tmpRedoGUIDElements=Object.keys(tmpCurrentRedoObject.__GUID).sort();}var tmpRedoDataIndex=0;var tmpRedoDataMaxIndex=tmpRedoGUIDElements.length-1;for(tmpCurrentDataIndex=0;tmpCurrentDataIndex<tmpCurrentGUIDElements.length;tmpCurrentDataIndex++){while(tmpRedoDataIndex<=tmpRedoDataMaxIndex&&tmpRedoGUIDElements[tmpRedoDataIndex]!=tmpCurrentGUIDElements[tmpCurrentDataIndex]){// Check to see if the string in the Redo keys is less than the string in the current form element.
// If so, it was deleted
if(tmpRedoGUIDElements[tmpRedoDataIndex]<tmpCurrentGUIDElements[tmpCurrentDataIndex]){tmpComparisonData.RedoGUIDDelta.Added.push(tmpRedoGUIDElements[tmpRedoDataIndex]);tmpRedoDataIndex++;}else{// It must be greater if it is inequal, so break out of the while
break;}}if(tmpRedoDataIndex<=tmpRedoDataMaxIndex&&tmpRedoGUIDElements[tmpRedoDataIndex]==tmpCurrentGUIDElements[tmpCurrentDataIndex]){// If the elements match, skip it because it exists on both sides.
tmpRedoDataIndex++;}else{tmpComparisonData.RedoGUIDDelta.Deleted.push(tmpCurrentGUIDElements[tmpCurrentDataIndex]);}}// If there are any GUIDS left in the Redo GUID list, they are additions
for(var _i10=tmpRedoDataIndex;_i10<=tmpRedoDataMaxIndex;_i10++){tmpComparisonData.RedoGUIDDelta.Added.push(tmpRedoGUIDElements[_i10]);}tmpCallBack(tmpComparisonData);});}},{key:"createArrayContainers",value:function createArrayContainers(pRecordObject,fCallback,pArrayPropertyAddress){// Much simplified recursion that generates array containers
if(this._Settings.DebugLog){this.log.debug("Informary Data->Form marshalling recursive entry...");}}},{key:"nonFormData",get:function get(){return this._NonHTMLState;}},{key:"marshalDataToForm",value:function marshalDataToForm(pRecordObject,fCallback,pParentPropertyAddress,pContainerPropertyAddress,pContainerIndex){var _this25=this;// Because this is recursive, we only want to call this on the outermost call of the stack.
var tmpRecoveryState=false;if(this._Settings.DebugLog){this.log.debug("Informary Data->Form marshalling recursive entry...");}// Guard against bad record objects being passed in
if(_typeof(pRecordObject)!=='object'){this.log.error('Invalid record object passed in!');return fCallback('Invalid record object passed in!');}if(pRecordObject===null){return fCallback();}if(pRecordObject===undefined){return fCallback();}var tmpParentPropertyAddress=typeof pParentPropertyAddress!=='undefined'?pParentPropertyAddress:false;var tmpParentPropertyAddressString=typeof pParentPropertyAddress!=='undefined'?pParentPropertyAddress:'JSON OBJECT ROOT';var tmpContainerPropertyAddress=typeof pContainerPropertyAddress!=='undefined'?pContainerPropertyAddress:false;var tmpContainerPropertyIndex=typeof pContainerIndex!=='undefined'?pContainerIndex:false;if(this._Settings.DebugLog){this.log.debug("Informary Data->Form found parent address [".concat(tmpParentPropertyAddress,"] and is parsing properties"));}if(tmpParentPropertyAddressString=='JSON OBJECT ROOT'){// Check if there is data to go into the NonHTMLState object
if(pRecordObject.hasOwnProperty(this._NonHTMLStateProperty)&&_typeof(pRecordObject[this._NonHTMLStateProperty])==='object'){// Every time we marshal data to the form, we will overwrite this.
// TODO: Should we warn or anything?  This is a potentially destructive operation.
this._NonHTMLState=pRecordObject[this._NonHTMLStateProperty];}}var tmpRecordObjectKeys=Object.keys(pRecordObject);tmpRecordObjectKeys.forEach(function(pKey){var tmpRecord=pRecordObject[pKey];var tmpPropertyAddress=tmpParentPropertyAddress.length>0?"".concat(pParentPropertyAddress,".").concat(pKey):pKey;if(_this25._Settings.DebugLog){_this25.log.debug("Informary Data->Form parent address [".concat(tmpParentPropertyAddressString,"] parsing property [").concat(tmpPropertyAddress,"]"));}switch(_typeof(tmpRecord)){// If it's an object, check if we should be marshaling the whole value in or recursing.
case'object':// Check to see if it's an array, as we will put it into the extended object.
if(Array.isArray(tmpRecord)){for(var i=0;i<tmpRecord.length;i++){// The undefined is in the Property Address because this is an array element, and needs to be put in the array.
_this25.marshalDataToForm(tmpRecord[i],function(){},undefined,tmpPropertyAddress,i.toString());}}else{// We've switched this to synchronous for safe browser mode
// Leaving an empty callback in there in case we decide to switch back.
return _this25.marshalDataToForm(tmpRecord,function(){},tmpPropertyAddress,tmpContainerPropertyAddress,tmpContainerPropertyIndex.toString());}break;// Ignore undefined properties
case'undefined':break;// Otherwise marshal it into the form
default:var tmpFormElement=[];if(tmpContainerPropertyAddress&&tmpContainerPropertyIndex){// This is an array element
tmpFormElement=_this25._Dependencies.jquery("\n\t\t\t\t\t\t\t\tinput[data-i-form=\"".concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"][data-i-container=\"").concat(tmpContainerPropertyAddress,"\"][data-i-index=\"").concat(tmpContainerPropertyIndex,"\"],\n\t\t\t\t\t\t\t\tselect[data-i-form=\"").concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"][data-i-container=\"").concat(tmpContainerPropertyAddress,"\"][data-i-index=\"").concat(tmpContainerPropertyIndex,"\"],\n\t\t\t\t\t\t\t\ttextarea[data-i-form=\"").concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"][data-i-container=\"").concat(tmpContainerPropertyAddress,"\"][data-i-index=\"").concat(tmpContainerPropertyIndex,"\"]\n\t\t\t\t\t\t\t"));}else{tmpFormElement=_this25._Dependencies.jquery("\n\t\t\t\t\t\t\t\tinput[data-i-form=\"".concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"],\n\t\t\t\t\t\t\t\tselect[data-i-form=\"").concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"],\n\t\t\t\t\t\t\t\ttextarea[data-i-form=\"").concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"]\n\t\t\t\t\t\t\t"));}if(tmpFormElement.length>0){// set the text area to the text content
if(_this25._Dependencies.jquery(tmpFormElement)[0].tagName==='TEXTAREA'){_this25._Dependencies.jquery(tmpFormElement)[0].textContent=tmpRecord;// set the correct option to 'selected' for select tags
}else if(_this25._Dependencies.jquery(tmpFormElement)[0].tagName==='SELECT'){_this25._Dependencies.jquery("select[data-i-form=\"".concat(_this25._Settings.Form,"\"][data-i-datum=\"").concat(tmpPropertyAddress,"\"] option[value=\"").concat(tmpRecord,"\"]")).prop('selected',true);// otherwise just set the value for input
}else{_this25._Dependencies.jquery(tmpFormElement).val(tmpRecord);}// Check if this is a GUID value and set the data-i-guid property in it
var tmpGUIDAttribute=_this25._Dependencies.jquery(_this25).attr('data-i-guid');// For some browsers, `attr` is undefined; for others,
// `attr` is false.  Check for both.
if(typeof tmpGUIDAttribute!=='undefined'&&tmpGUIDAttribute!==false){_this25._Dependencies.jquery(tmpFormElement).attr('data-i-guid',tmpRecord);}}break;}});if(!pParentPropertyAddress){return fCallback(tmpRecoveryState);}else{return fCallback();}}},{key:"marshalFormToData",value:function marshalFormToData(pRecordObject,fCallback){var _this26=this;if(this._Settings.DebugLog){this.log.debug("Informary Form->Data marshalling recursive entry...");}// Guard against bad record objects being passed in
if(_typeof(pRecordObject)!=='object'){this.log.error('Invalid record object passed in!  Informary needs a Javascript object to put values into.');return fCallback('Invalid record object passed in!  Informary needs a Javascript object to put values into.');}var tmpFormValueElements=this._Dependencies.jquery("\n\t\t\t\tinput[data-i-form=".concat(this._Settings.Form,"],\n\t\t\t\tselect[data-i-form=").concat(this._Settings.Form,"],\n\t\t\t\ttextarea[data-i-form=").concat(this._Settings.Form,"]\n\t\t\t"));var tmpUnknownValueIndex=0;// For any state that the form doesn't want to store in html elements, but still be merged into the informary record object
pRecordObject[this._NonHTMLStateProperty]=this._NonHTMLState;this._Dependencies.jquery.each(tmpFormValueElements,function(pRecordIndex,pRecordAddress){var tmpFormValueAddress=_this26._Dependencies.jquery(pRecordAddress).attr('data-i-datum');var tmpFormContainerAddress=_this26._Dependencies.jquery(pRecordAddress).attr('data-i-container');var tmpFormContainerIndex=_this26._Dependencies.jquery(pRecordAddress).attr('data-i-index');var tmpFormContainerGUID=_this26._Dependencies.jquery(pRecordAddress).attr('data-i-guid');var tmpFormValue;// check to see which element type this is before trying to collect the value
if(_this26._Dependencies.jquery(pRecordAddress).tagName==='TEXTAREA'){tmpFormValue=_this26._Dependencies.jquery(pRecordAddress).textContent;}else{tmpFormValue=_this26._Dependencies.jquery(pRecordAddress).val();}// If the value is non existant, set it to null
if(typeof tmpFormValue==='undefined'){tmpFormValue=null;}if(typeof tmpFormValueAddress==='undefined'){tmpFormValueAddress='__ERROR.UnsetDatum.'+tmpUnknownValueIndex;tmpUnknownValueIndex++;}if(tmpFormContainerGUID){var tmpGUIDValueAddress='__GUID.'+tmpFormContainerGUID;_this26.setValueAtAddress(pRecordObject,tmpGUIDValueAddress,tmpFormContainerGUID);}if(tmpFormContainerAddress&&tmpFormContainerIndex){_this26.setValueAtAddressInContainer(pRecordObject,tmpFormContainerAddress,tmpFormContainerIndex,tmpFormValueAddress,tmpFormValue);}else{_this26.setValueAtAddress(pRecordObject,tmpFormValueAddress,tmpFormValue);}});return fCallback();}}]);return Informary;}();;module.exports=Informary;},{"./Informary-Log.js":80,"cachetrax":17,"deep-object-diff":26,"jquery":82}],82:[function(require,module,exports){/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */(function(global,factory){"use strict";if(_typeof(module)==="object"&&_typeof(module.exports)==="object"){// For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket trac-14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else{factory(global);}// Pass this if window is not defined yet
})(typeof window!=="undefined"?window:this,function(window,noGlobal){// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";var arr=[];var getProto=Object.getPrototypeOf;var _slice=arr.slice;var flat=arr.flat?function(array){return arr.flat.call(array);}:function(array){return arr.concat.apply([],array);};var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var fnToString=hasOwn.toString;var ObjectFunctionString=fnToString.call(Object);var support={};var isFunction=function isFunction(obj){// Support: Chrome <=57, Firefox <=52
// In some browsers, typeof returns "function" for HTML <object> elements
// (i.e., `typeof document.createElement( "object" ) === "function"`).
// We don't want to classify *any* DOM node as a function.
// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
// Plus for old WebKit, typeof returns "function" for HTML collections
// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
return typeof obj==="function"&&typeof obj.nodeType!=="number"&&typeof obj.item!=="function";};var isWindow=function isWindow(obj){return obj!=null&&obj===obj.window;};var document=window.document;var preservedScriptAttributes={type:true,src:true,nonce:true,noModule:true};function DOMEval(code,node,doc){doc=doc||document;var i,val,script=doc.createElement("script");script.text=code;if(node){for(i in preservedScriptAttributes){// Support: Firefox 64+, Edge 18+
// Some browsers don't support the "nonce" property on scripts.
// On the other hand, just using `getAttribute` is not enough as
// the `nonce` attribute is reset to an empty string whenever it
// becomes browsing-context connected.
// See https://github.com/whatwg/html/issues/2369
// See https://html.spec.whatwg.org/#nonce-attributes
// The `node.getAttribute` check was added for the sake of
// `jQuery.globalEval` so that it can fake a nonce-containing node
// via an object.
val=node[i]||node.getAttribute&&node.getAttribute(i);if(val){script.setAttribute(i,val);}}}doc.head.appendChild(script).parentNode.removeChild(script);}function toType(obj){if(obj==null){return obj+"";}// Support: Android <=2.3 only (functionish RegExp)
return _typeof(obj)==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":_typeof(obj);}/* global Symbol */ // Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module
var version="3.6.4",// Define a local copy of jQuery
jQuery=function jQuery(selector,context){// The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);};jQuery.fn=jQuery.prototype={// The current version of jQuery being used
jquery:version,constructor:jQuery,// The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);},// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){// Return all the elements in a clean array
if(num==null){return _slice.call(this);}// Return just the one element from the set
return num<0?this[num+this.length]:this[num];},// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){// Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems);// Add the old object onto the stack (as a reference)
ret.prevObject=this;// Return the newly-formed element set
return ret;},// Execute a callback for every element in the matched set.
each:function each(callback){return jQuery.each(this,callback);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},even:function even(){return this.pushStack(jQuery.grep(this,function(_elem,i){return(i+1)%2;}));},odd:function odd(){return this.pushStack(jQuery.grep(this,function(_elem,i){return i%2;}));},eq:function eq(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function end(){return this.prevObject||this.constructor();},// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;// Handle a deep copy situation
if(typeof target==="boolean"){deep=target;// Skip the boolean and the target
target=arguments[i]||{};i++;}// Handle case when target is a string or something (possible in deep copy)
if(_typeof(target)!=="object"&&!isFunction(target)){target={};}// Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){// Only deal with non-null/undefined values
if((options=arguments[i])!=null){// Extend the base object
for(name in options){copy=options[name];// Prevent Object.prototype pollution
// Prevent never-ending loop
if(name==="__proto__"||target===copy){continue;}// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=Array.isArray(copy)))){src=target[name];// Ensure proper type for the source value
if(copyIsArray&&!Array.isArray(src)){clone=[];}else if(!copyIsArray&&!jQuery.isPlainObject(src)){clone={};}else{clone=src;}copyIsArray=false;// Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy);// Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}}// Return the modified object
return target;};jQuery.extend({// Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),// Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isPlainObject:function isPlainObject(obj){var proto,Ctor;// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
if(!obj||toString.call(obj)!=="[object Object]"){return false;}proto=getProto(obj);// Objects with no prototype (e.g., `Object.create( null )`) are plain
if(!proto){return true;}// Objects with prototype are plain iff they were constructed by a global Object function
Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;},isEmptyObject:function isEmptyObject(obj){var name;for(name in obj){return false;}return true;},// Evaluates a script in a provided context; falls back to the global one
// if not specified.
globalEval:function globalEval(code,options,doc){DOMEval(code,{nonce:options&&options.nonce},doc);},each:function each(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;},// results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else{push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;// Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;},// arg is for internal usage only
map:function map(elems,callback,arg){var length,value,i=0,ret=[];// Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}// Go through every key on the object,
}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}// Flatten any nested arrays
return flat(ret);},// A global GUID counter for objects
guid:1,// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];}// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(_i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length"in obj&&obj.length,type=toType(obj);if(isFunction(obj)||isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle=/*!
 * Sizzle CSS Selector Engine v2.3.10
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2023-02-14
 */function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,// Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,// Instance-specific data
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),nonnativeSelectorCache=createCache(),sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;}return 0;},// Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,pushNative=arr.push,push=arr.push,slice=arr.slice,// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|"+"ismap|loop|multiple|open|readonly|required|scoped",// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]",// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
identifier="(?:\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+// Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+// "Attribute values must be CSS identifiers [capture 5]
// or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+// 3. anything else (capture 2)
".*"+")\\)|)",// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rleadingCombinator=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rdescend=new RegExp(whitespace+"|>"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),// For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rhtml=/HTML$/i,rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\([^\\r\\n\\f])","g"),funescape=function funescape(escape,nonHex){var high="0x"+escape.slice(1)-0x10000;return nonHex?// Strip the backslash prefix from a non-hex escape sequence
nonHex:// Replace a hexadecimal escape sequence with the encoded Unicode code point
// Support: IE <=11+
// For values outside the Basic Multilingual Plane (BMP), manually construct a
// surrogate pair
high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function fcssescape(ch,asCodePoint){if(asCodePoint){// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if(ch==="\0"){return"\uFFFD";}// Control characters and (dependent upon position) numbers get escaped as code points
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}// Other potentially-special ASCII characters get backslash-escaped
return"\\"+ch;},// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();},inDisabledFieldset=addCombinator(function(elem){return elem.disabled===true&&elem.nodeName.toLowerCase()==="fieldset";},{dir:"parentNode",next:"legend"});// Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes);// Support: Android<4.0
// Detect silently failing push.apply
// eslint-disable-next-line no-unused-expressions
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?// Leverage slice if possible
function(target,els){pushNative.apply(target,slice.call(els));}:// Support: IE<9
// Otherwise append directly
function(target,els){var j=target.length,i=0;// Can't trust NodeList.length
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,// nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[];// Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}// Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){setDocument(context);context=context||document;if(documentIsHTML){// If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){// ID selector
if(m=match[1]){// Document context
if(nodeType===9){if(elem=context.getElementById(m)){// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m){results.push(elem);return results;}}else{return results;}// Element context
}else{// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}// Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;// Class selector
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}// Take advantage of querySelectorAll
if(support.qsa&&!nonnativeSelectorCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))&&(// Support: IE 8 only
// Exclude object elements
nodeType!==1||context.nodeName.toLowerCase()!=="object")){newSelector=selector;newContext=context;// qSA considers elements outside a scoping root when evaluating child or
// descendant combinators, which is not what we want.
// In such cases, we work around the behavior by prefixing every selector in the
// list with an ID selector referencing the scope context.
// The technique has to be used as well when a leading combinator is used
// as such selectors are not recognized by querySelectorAll.
// Thanks to Andrew Dupont for this technique.
if(nodeType===1&&(rdescend.test(selector)||rleadingCombinator.test(selector))){// Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;// We can use :scope instead of the ID hack if the browser
// supports it & if we're not changing the context.
if(newContext!==context||!support.scope){// Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=nid.replace(rcssescape,fcssescape);}else{context.setAttribute("id",nid=expando);}}// Prefix every selector in the list
groups=tokenize(selector);i=groups.length;while(i--){groups[i]=(nid?"#"+nid:":scope")+" "+toSelector(groups[i]);}newSelector=groups.join(",");}try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){nonnativeSelectorCache(selector,true);}finally{if(nid===expando){context.removeAttribute("id");}}}}}// All others
return select(selector.replace(rtrim,"$1"),context,results,seed);}/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key+" ")>Expr.cacheLength){// Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;}/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;}/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{// Remove from its parent by default
if(el.parentNode){el.parentNode.removeChild(el);}// release memory in IE
el=null;}}/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&a.sourceIndex-b.sourceIndex;// Use IE sourceIndex if available on both nodes
if(diff){return diff;}// Check if b follows a
if(cur){while(cur=cur.nextSibling){if(cur===b){return-1;}}}return a?1:-1;}/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */function createDisabledPseudo(disabled){// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
return function(elem){// Only certain elements can match :enabled or :disabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
if("form"in elem){// Check for inherited disabledness on relevant non-disabled elements:
// * listed form-associated elements in a disabled fieldset
//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
// * option elements in a disabled optgroup
//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
// All such elements have a "form" property.
if(elem.parentNode&&elem.disabled===false){// Option elements defer to a parent optgroup if present
if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}// Support: IE 6 - 11
// Use the isDisabled shortcut property to check for disabled fieldset ancestors
return elem.isDisabled===disabled||// Where there is no isDisabled, check manually
/* jshint -W018 */elem.isDisabled!==!disabled&&inDisabledFieldset(elem)===disabled;}return elem.disabled===disabled;// Try to winnow out elements that can't be disabled before trusting the disabled property.
// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
// even exist on them, let alone have a boolean value.
}else if("label"in elem){return elem.disabled===disabled;}// Remaining elements are neither :enabled nor :disabled
return false;};}/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;// Match elements found at the specified indexes
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});}/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;}// Expose support vars for convenience
support=Sizzle.support={};/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML=Sizzle.isXML=function(elem){var namespace=elem&&elem.namespaceURI,docElem=elem&&(elem.ownerDocument||elem).documentElement;// Support: IE <=8
// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
// https://bugs.jquery.com/ticket/4833
return!rhtml.test(namespace||docElem&&docElem.nodeName||"HTML");};/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;// Return early if doc is invalid or already selected
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(doc==document||doc.nodeType!==9||!doc.documentElement){return document;}// Update global variables
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document);// Support: IE 9 - 11+, Edge 12 - 18+
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(preferredDoc!=document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){// Support: IE 11, Edge
if(subWindow.addEventListener){subWindow.addEventListener("unload",unloadHandler,false);// Support: IE 9 - 10 only
}else if(subWindow.attachEvent){subWindow.attachEvent("onunload",unloadHandler);}}// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
// Safari 4 - 5 only, Opera <=11.6 - 12.x only
// IE/Edge & older browsers don't support the :scope pseudo-class.
// Support: Safari 6.0 only
// Safari 6.0 supports :scope but it's an alias of :root there.
support.scope=assert(function(el){docElem.appendChild(el).appendChild(document.createElement("div"));return typeof el.querySelectorAll!=="undefined"&&!el.querySelectorAll(":scope fieldset div").length;});// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
// Make sure the the `:has()` argument is parsed unforgivingly.
// We include `*` in the test to detect buggy implementations that are
// _selectively_ forgiving (specifically when the list includes at least
// one valid selector).
// Note that we treat complete lack of support for `:has()` as if it were
// spec-compliant support, which is fine because use of `:has()` in such
// environments will fail in the qSA path and fall back to jQuery traversal
// anyway.
support.cssHas=assert(function(){try{document.querySelector(":has(*,:jqfake)");return false;}catch(e){return true;}});/* Attributes
	---------------------------------------------------------------------- */ // Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes=assert(function(el){el.className="i";return!el.getAttribute("className");});/* getElement(s)By*
	---------------------------------------------------------------------- */ // Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName=assert(function(el){el.appendChild(document.createComment(""));return!el.getElementsByTagName("*").length;});// Support: IE<9
support.getElementsByClassName=rnative.test(document.getElementsByClassName);// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(el){docElem.appendChild(el).id=expando;return!document.getElementsByName||!document.getElementsByName(expando).length;});// ID filter and find
if(support.getById){Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){// Verify the id attribute
node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}// Fall back on getElementsByName
elems=context.getElementsByName(id);i=0;while(elem=elems[i++]){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}return[];}};}// Tag
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);// DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0,// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag);// Filter out possible comments
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;};// Class
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}};/* QSA/matchesSelector
	---------------------------------------------------------------------- */ // QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches=[];// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See https://bugs.jquery.com/ticket/13378
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){// Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(el){var input;// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>";// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(el.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}// Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
input=document.createElement("input");input.setAttribute("name","");el.appendChild(input);if(!el.querySelectorAll("[name='']").length){rbuggyQSA.push("\\["+whitespace+"*name"+whitespace+"*="+whitespace+"*(?:''|\"\")");}// Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}// Support: Firefox <=3.6 - 5 only
// Old Firefox doesn't throw on a badly-escaped identifier.
el.querySelectorAll("\\\f");rbuggyQSA.push("[\\r\\n\\f]");});assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a>"+"<select disabled='disabled'><option/></select>";// Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");// Support: IE8
// Enforce case-sensitivity of name attribute
if(el.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(el.querySelectorAll(":enabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Support: IE9-11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
docElem.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}// Support: Opera 10 - 11 only
// Opera 10-11 does not throw on post-comma invalid pseudos
el.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(el){// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(el,"*");// This should fail with an exception
// Gecko does not error, returns false instead
matches.call(el,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}if(!support.cssHas){// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
// Our regular `try-catch` mechanism fails to detect natively-unsupported
// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
// in browsers that parse the `:has()` argument as a forgiving selector list.
// https://drafts.csswg.org/selectors/#relational now requires the argument
// to be parsed unforgivingly, but browsers have not yet fully adjusted.
rbuggyQSA.push(":has");}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));/* Contains
	---------------------------------------------------------------------- */hasCompare=rnative.test(docElem.compareDocumentPosition);// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){// Support: IE <9 only
// IE doesn't have `contains` on `document` so we need to check for
// `documentElement` presence.
// We need to fall back to `a` when `documentElement` is missing
// as `ownerDocument` of elements within `<template/>` may have
// a null one - a default behavior of all modern browsers.
var adown=a.nodeType===9&&a.documentElement||a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;};/* Sorting
	---------------------------------------------------------------------- */ // Document order sorting
sortOrder=hasCompare?function(a,b){// Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;}// Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}// Calculate position if both inputs belong to the same document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
compare=(a.ownerDocument||a)==(b.ownerDocument||b)?a.compareDocumentPosition(b):// Otherwise we know they are disconnected
1;// Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){// Choose the first element that is related to our preferred document
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(a==document||a.ownerDocument==preferredDoc&&contains(preferredDoc,a)){return-1;}// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(b==document||b.ownerDocument==preferredDoc&&contains(preferredDoc,b)){return 1;}// Maintain original order
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){// Exit early if the nodes are identical
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];// Parentless nodes are either documents or disconnected
if(!aup||!bup){// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
/* eslint-disable eqeqeq */return a==document?-1:b==document?1:/* eslint-enable eqeqeq */aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;// If the nodes are siblings, we can do a quick check
}else if(aup===bup){return siblingCheck(a,b);}// Otherwise we need full lists of their ancestors for comparison
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);}// Walk down the tree looking for a discrepancy
while(ap[i]===bp[i]){i++;}return i?// Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]):// Otherwise nodes in our document sort first
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
/* eslint-disable eqeqeq */ap[i]==preferredDoc?-1:bp[i]==preferredDoc?1:/* eslint-enable eqeqeq */0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){setDocument(elem);if(support.matchesSelector&&documentIsHTML&&!nonnativeSelectorCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);// IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch||// As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){nonnativeSelectorCache(expr,true);}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if((context.ownerDocument||context)!=document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){// Set document vars if needed
// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if((elem.ownerDocument||elem)!=document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()],// Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape);};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;// Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}}// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;};/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){// If no nodeType, this is expected to be an array
while(node=elem[i++]){// Do not traverse comment nodes
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent==="string"){return elem.textContent;}else{// Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}// Do not include comment or processing instruction nodes
return ret;};Expr=Sizzle.selectors={// Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1]=match[1].replace(runescape,funescape);// Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function CHILD(match){/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){// nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);}// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd");// other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}// Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||"";// Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&(// Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&(// advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){// excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}// Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";/* eslint-disable max-len */return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;/* eslint-enable max-len */};},"CHILD":function CHILD(type,what,_argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?// Shortcut for :nth-*(n)
function(elem){return!!elem.parentNode;}:function(elem,_context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){// :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}// Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild];// non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){// Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||(// Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){// When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else{// Use previously-cached element index if available
if(useCache){// ...in a gzip-friendly way
node=elem;outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}// xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){// Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){// Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}}// Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function PSEUDO(pseudo,argument){// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);}// But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{// Potentially complex pseudos
"not":markFunction(function(selector){// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,_context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;// Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,_context,xml){input[0]=elem;matcher(input,null,xml,results);// Don't keep the element (issue #299)
input[0]=null;return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||getText(elem)).indexOf(text)>-1;};}),// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){// lang value must be a valid identifier
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),// Miscellaneous
"target":function target(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function root(elem){return elem===docElem;},"focus":function focus(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},// Boolean properties
"enabled":createDisabledPseudo(false),"disabled":createDisabledPseudo(true),"checked":function checked(elem){// In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function selected(elem){// Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){// eslint-disable-next-line no-unused-expressions
elem.parentNode.selectedIndex;}return elem.selected===true;},// Contents
"empty":function empty(elem){// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function parent(elem){return!Expr.pseudos["empty"](elem);},// Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&(// Support: IE <10 only
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},// Position-in-collection
"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(_matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(_matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument>length?length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];// Add button/input type pseudos
for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}// Easy API for creating new setFilters
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){// Comma and first run
if(!matched||(match=rcomma.exec(soFar))){if(match){// Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false;// Combinators
if(match=rleadingCombinator.exec(soFar)){matched=match.shift();tokens.push({value:matched,// Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}// Filters
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}}// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector):// Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?// Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}return false;}:// Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});// Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if(skip&&skip===elem.nodeName.toLowerCase()){elem=elem[dir]||elem;}else if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){// Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else{// Reuse newcache so results back-propagate to previous elements
uniqueCache[key]=newCache;// A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}return false;};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,// Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),// Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)?// ...intermediate processing is necessary
[]:// ...otherwise use results directly
results:matcherIn;// Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);}// Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);// Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){// Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){// Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);}// Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}// Add elements to results, through postFinder if defined
}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,// The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));// Avoid hanging onto element (issue #299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);// Return special upon seeing a positional matcher
if(matcher[expando]){// Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,// We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find["TAG"]("*",outermost),// Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
outermostContext=context==document||context||outermost;}// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;// Support: IE 11+, Edge 17 - 18+
// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
// two documents; shallow comparisons work.
// eslint-disable-next-line eqeqeq
if(!context&&elem.ownerDocument!=document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}}// Track unmatched elements for set filters
if(bySet){// They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;}// Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}}// `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i;// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){// Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}// Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);}// Add matches to results
push.apply(results,setMatched);// Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}}// Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match/* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){// Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}// Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));// Save selector and tokenization
cached.selector=selector;}return cached;};/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[];// Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){// Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;// Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);}// Fetch a seed set for right-to-left matching
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];// Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){// Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){// If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}}// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};// One-time assignments
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates=!!hasDuplicate;// Initialize against the default document
setDocument();// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(el){// Should return 1, but returns 4 (following)
return el.compareDocumentPosition(document.createElement("fieldset"))&1;});// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(el){el.innerHTML="<a href='#'></a>";return el.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes||!assert(function(el){el.innerHTML="<input/>";el.firstChild.setAttribute("value","");return el.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,_name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(el){return el.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;// Deprecated
jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;jQuery.escapeSelector=Sizzle.escape;var dir=function dir(elem,_dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[_dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var _siblings=function siblings(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();}var rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;// Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}// Single element
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}// Arraylike of elements (jQuery, arguments, Array)
if(typeof qualifier!=="string"){return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}// Filtered directly for both simple and complex selectors
return jQuery.filter(qualifier,elements,not);}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}if(elems.length===1&&elem.nodeType===1){return jQuery.find.matchesSelector(elem,expr)?[elem]:[];}return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function find(selector){var i,ret,len=this.length,self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}ret=this.pushStack([]);for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}return len>1?jQuery.uniqueSort(ret):ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector||[],false));},not:function not(selector){return this.pushStack(winnow(this,selector||[],true));},is:function is(selector){return!!winnow(this,// If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}});// Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery,// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
// Strict HTML recognition (trac-11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;// HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;}// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery;// Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){// Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else{match=rquickExpr.exec(selector);}// Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){// HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context;// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));// HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){// Properties of context are called as methods if possible
if(isFunction(this[match])){this[match](context[match]);// ...and otherwise set as attributes
}else{this.attr(match,context[match]);}}}return this;// HANDLE: $(#id)
}else{elem=document.getElementById(match[2]);if(elem){// Inject the element directly into the jQuery object
this[0]=elem;this.length=1;}return this;}// HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return(context||root).find(selector);// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else{return this.constructor(context).find(selector);}// HANDLE: $(DOMElement)
}else if(selector.nodeType){this[0]=selector;this.length=1;return this;// HANDLE: $(function)
// Shortcut for document ready
}else if(isFunction(selector)){return root.ready!==undefined?root.ready(selector):// Execute immediately if ready is not present
selector(jQuery);}return jQuery.makeArray(selector,this);};// Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn;// Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,// Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],targets=typeof selectors!=="string"&&jQuery(selectors);// Positional selectors never match, since there's no _selection_ context
if(!rneedsContext.test(selectors)){for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){// Always skip document fragments
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:// Don't pass non-elements to Sizzle
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);},// Determine the position of an element within the set
index:function index(elem){// No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;}// Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);}// Locate the position of the desired element
return indexOf.call(this,// If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,_i,until){return dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return dir(elem,"nextSibling");},prevAll:function prevAll(elem){return dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,_i,until){return dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,_i,until){return dir(elem,"previousSibling",until);},siblings:function siblings(elem){return _siblings((elem.parentNode||{}).firstChild,elem);},children:function children(elem){return _siblings(elem.firstChild);},contents:function contents(elem){if(elem.contentDocument!=null&&// Support: IE 11+
// <object> elements with no `data` attribute has an object
// `contentDocument` with a `null` prototype.
getProto(elem.contentDocument)){return elem.contentDocument;}// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
if(nodeName(elem,"template")){elem=elem.content||elem;}return jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){// Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);}// Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;// Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=true;});return object;}/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var// Flag to know if list is currently firing
firing,// Last fire value for non-forgettable lists
memory,// Flag to know if list was already fired
_fired,// Flag to prevent firing
_locked,// Actual callback list
list=[],// Queue of execution data for repeatable lists
queue=[],// Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1,// Fire callbacks
fire=function fire(){// Enforce single-firing
_locked=_locked||options.once;// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
_fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){// Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){// Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}}// Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false;// Clean up if we're done firing for good
if(_locked){// Keep an empty list if we have data for future add calls
if(memory){list=[];// Otherwise, this object is spent
}else{list="";}}},// Actual Callbacks object
self={// Add a callback or a collection of callbacks to the list
add:function add(){if(list){// If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&toType(arg)!=="string"){// Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;},// Remove a callback from the list
remove:function remove(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);// Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;},// Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;},// Remove all callbacks from the list
empty:function empty(){if(list){list=[];}return this;},// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function disable(){_locked=queue=[];list=memory="";return this;},disabled:function disabled(){return!list;},// Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function lock(){_locked=queue=[];if(!memory&&!firing){list=memory="";}return this;},locked:function locked(){return!!_locked;},// Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(!_locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;},// Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;},// To know if the callbacks have already been called at least once
fired:function fired(){return!!_fired;}};return self;};function Identity(v){return v;}function Thrower(ex){throw ex;}function adoptValue(value,resolve,reject,noValue){var method;try{// Check for promise aspect first to privilege synchronous behavior
if(value&&isFunction(method=value.promise)){method.call(value).done(resolve).fail(reject);// Other thenables
}else if(value&&isFunction(method=value.then)){method.call(value,resolve,reject);// Other non-thenables
}else{// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
resolve.apply(undefined,[value].slice(noValue));}// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
// Deferred#then to conditionally suppress rejection.
}catch(value){// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get global-object context
reject.apply(undefined,[value]);}}jQuery.extend({Deferred:function Deferred(func){var tuples=[// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},"catch":function _catch(fn){return _promise.then(null,fn);},// Keep pipe for back-compat
pipe:function pipe(/* fnDone, fnFail, fnProgress */){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(_i,tuple){// Map tuples (progress, done, fail) to arguments (done, fail, progress)
var fn=isFunction(fns[tuple[4]])&&fns[tuple[4]];// deferred.progress(function() { bind to newDefer or newDefer.notify })
// deferred.done(function() { bind to newDefer or newDefer.resolve })
// deferred.fail(function() { bind to newDefer or newDefer.reject })
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else{newDefer[tuple[0]+"With"](this,fn?[returned]:arguments);}});});fns=null;}).promise();},then:function then(onFulfilled,onRejected,onProgress){var maxDepth=0;function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function mightThrow(){var returned,then;// Support: Promises/A+ section 2.3.3.3.3
// https://promisesaplus.com/#point-59
// Ignore double-resolution attempts
if(depth<maxDepth){return;}returned=handler.apply(that,args);// Support: Promises/A+ section 2.3.1
// https://promisesaplus.com/#point-48
if(returned===deferred.promise()){throw new TypeError("Thenable self-resolution");}// Support: Promises/A+ sections 2.3.3.1, 3.5
// https://promisesaplus.com/#point-54
// https://promisesaplus.com/#point-75
// Retrieve `then` only once
then=returned&&(// Support: Promises/A+ section 2.3.4
// https://promisesaplus.com/#point-64
// Only check objects and functions for thenability
_typeof(returned)==="object"||typeof returned==="function")&&returned.then;// Handle a returned thenable
if(isFunction(then)){// Special processors (notify) just wait for resolution
if(special){then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special));// Normal processors (resolve) also hook into progress
}else{// ...and disregard older resolution values
maxDepth++;then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith));}// Handle all other returned values
}else{// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Identity){that=undefined;args=[returned];}// Process the value(s)
// Default process is resolve
(special||deferred.resolveWith)(that,args);}},// Only normal processors (resolve) catch and reject exceptions
process=special?mightThrow:function(){try{mightThrow();}catch(e){if(jQuery.Deferred.exceptionHook){jQuery.Deferred.exceptionHook(e,process.stackTrace);}// Support: Promises/A+ section 2.3.3.3.4.1
// https://promisesaplus.com/#point-61
// Ignore post-resolution exceptions
if(depth+1>=maxDepth){// Only substitute handlers pass on context
// and multiple values (non-spec behavior)
if(handler!==Thrower){that=undefined;args=[e];}deferred.rejectWith(that,args);}}};// Support: Promises/A+ section 2.3.3.3.1
// https://promisesaplus.com/#point-57
// Re-resolve promises immediately to dodge false rejection from
// subsequent errors
if(depth){process();}else{// Call an optional hook to record the stack, in case of exception
// since it's otherwise lost when execution goes async
if(jQuery.Deferred.getStackHook){process.stackTrace=jQuery.Deferred.getStackHook();}window.setTimeout(process);}};}return jQuery.Deferred(function(newDefer){// progress_handlers.add( ... )
tuples[0][3].add(resolve(0,newDefer,isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith));// fulfilled_handlers.add( ... )
tuples[1][3].add(resolve(0,newDefer,isFunction(onFulfilled)?onFulfilled:Identity));// rejected_handlers.add( ... )
tuples[2][3].add(resolve(0,newDefer,isFunction(onRejected)?onRejected:Thrower));}).promise();},// Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj!=null?jQuery.extend(obj,_promise):_promise;}},deferred={};// Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
_promise[tuple[1]]=list.add;// Handle state
if(stateString){list.add(function(){// state = "resolved" (i.e., fulfilled)
// state = "rejected"
_state=stateString;},// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[3-i][2].disable,// rejected_handlers.disable
// fulfilled_handlers.disable
tuples[3-i][3].disable,// progress_callbacks.lock
tuples[0][2].lock,// progress_handlers.lock
tuples[0][3].lock);}// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add(tuple[3].fire);// deferred.notify = function() { deferred.notifyWith(...) }
// deferred.resolve = function() { deferred.resolveWith(...) }
// deferred.reject = function() { deferred.rejectWith(...) }
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?undefined:this,arguments);return this;};// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[tuple[0]+"With"]=list.fireWith;});// Make the deferred a promise
_promise.promise(deferred);// Call given func if any
if(func){func.call(deferred,deferred);}// All done!
return deferred;},// Deferred helper
when:function when(singleValue){var// count of uncompleted subordinates
remaining=arguments.length,// count of unprocessed arguments
i=remaining,// subordinate fulfillment data
resolveContexts=Array(i),resolveValues=_slice.call(arguments),// the primary Deferred
primary=jQuery.Deferred(),// subordinate callback factory
updateFunc=function updateFunc(i){return function(value){resolveContexts[i]=this;resolveValues[i]=arguments.length>1?_slice.call(arguments):value;if(! --remaining){primary.resolveWith(resolveContexts,resolveValues);}};};// Single- and empty arguments are adopted like Promise.resolve
if(remaining<=1){adoptValue(singleValue,primary.done(updateFunc(i)).resolve,primary.reject,!remaining);// Use .then() to unwrap secondary thenables (cf. gh-3000)
if(primary.state()==="pending"||isFunction(resolveValues[i]&&resolveValues[i].then)){return primary.then();}}// Multiple arguments are aggregated like Promise.all array elements
while(i--){adoptValue(resolveValues[i],updateFunc(i),primary.reject);}return primary.promise();}});// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook=function(error,stack){// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
if(window.console&&window.console.warn&&error&&rerrorNames.test(error.name)){window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,stack);}};jQuery.readyException=function(error){window.setTimeout(function(){throw error;});};// The deferred used on DOM ready
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){readyList.then(fn)// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
["catch"](function(error){jQuery.readyException(error);});return this;};jQuery.extend({// Is the DOM ready to be used? Set to true once it occurs.
isReady:false,// A counter to track how many items to wait for before
// the ready event fires. See trac-6781
readyWait:1,// Handle when the DOM is ready
ready:function ready(wait){// Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}// Remember that the DOM is ready
jQuery.isReady=true;// If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;}// If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]);}});jQuery.ready.then=readyList.then;// The ready event handler and self cleanup method
function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){// Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else{// Use the handy event callback
document.addEventListener("DOMContentLoaded",completed);// A fallback to window.onload, that will always work
window.addEventListener("load",completed);}// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function access(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;// Sets many values
if(toType(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);}// Sets one value
}else if(value!==undefined){chainable=true;if(!isFunction(value)){raw=true;}if(bulk){// Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null;// ...except when executing function values
}else{bulk=fn;fn=function fn(elem,_key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}if(chainable){return elems;}// Gets
if(bulk){return fn.call(elems);}return len?fn(elems[0],key):emptyGet;};// Matches dashed string for camelizing
var rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g;// Used by camelCase as callback to replace()
function fcamelCase(_all,letter){return letter.toUpperCase();}// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);}var acceptData=function acceptData(owner){// Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
return owner.nodeType===1||owner.nodeType===9||!+owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={cache:function cache(owner){// Check if the owner object already has a cache
var value=owner[this.expando];// If not, create one
if(!value){value={};// We can accept data for non-element nodes in modern browsers,
// but we should not, see trac-8335.
// Always return an empty object.
if(acceptData(owner)){// If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value;// Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else{Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function set(owner,data,value){var prop,cache=this.cache(owner);// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if(typeof data==="string"){cache[camelCase(data)]=value;// Handle: [ owner, { properties } ] args
}else{// Copy the properties one-by-one to the cache object
for(prop in data){cache[camelCase(prop)]=data[prop];}}return cache;},get:function get(owner,key){return key===undefined?this.cache(owner):// Always use camelCase key (gh-2257)
owner[this.expando]&&owner[this.expando][camelCase(key)];},access:function access(owner,key,value){// In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){return this.get(owner,key);}// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value);// Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function remove(owner,key){var i,cache=owner[this.expando];if(cache===undefined){return;}if(key!==undefined){// Support array or space separated string of keys
if(Array.isArray(key)){// If key is an array of keys...
// We always set camelCase keys, so remove that.
key=key.map(camelCase);}else{key=camelCase(key);// If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
key=key in cache?[key]:key.match(rnothtmlwhite)||[];}i=key.length;while(i--){delete cache[key[i]];}}// Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
if(owner.nodeType){owner[this.expando]=undefined;}else{delete owner[this.expando];}}},hasData:function hasData(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data();//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function getData(data){if(data==="true"){return true;}if(data==="false"){return false;}if(data==="null"){return null;}// Only convert to a number if it doesn't change the string
if(data===+data+""){return+data;}if(rbrace.test(data)){return JSON.parse(data);}return data;}function dataAttr(elem,key,data){var name;// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=getData(data);}catch(e){}// Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data);}else{data=undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function data(elem,name,_data){return dataUser.access(elem,name,_data);},removeData:function removeData(elem,name){dataUser.remove(elem,name);},// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function _data(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function _removeData(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;// Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){// Support: IE 11 only
// The attrs elements can be null (trac-14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;}// Sets multiple values
if(_typeof(key)==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data;// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){// Attempt to get data from the cache
// The key will always be camelCased in Data
data=dataUser.get(elem,key);if(data!==undefined){return data;}// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,key);if(data!==undefined){return data;}// We tried really hard, but the data doesn't exist.
return;}// Set the data...
this.each(function(){// We always store the camelCased key
dataUser.set(this,key,value);});},null,value,arguments.length>1,null,true);},removeData:function removeData(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type);// Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||Array.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}return queue||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);};// If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");}// Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}},// Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);// Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);},// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var documentElement=document.documentElement;var isAttached=function isAttached(elem){return jQuery.contains(elem.ownerDocument,elem);},composed={composed:true};// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
// Check attachment across shadow DOM boundaries when possible (gh-3504)
// Support: iOS 10.0-10.2 only
// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
// leading to errors. We need to check for `getRootNode`.
if(documentElement.getRootNode){isAttached=function isAttached(elem){return jQuery.contains(elem.ownerDocument,elem)||elem.getRootNode(composed)===elem.ownerDocument;};}var isHiddenWithinTree=function isHiddenWithinTree(elem,el){// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;// Inline style trumps all
return elem.style.display==="none"||elem.style.display===""&&// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none, so first confirm that elem is
// in the document.
isAttached(elem)&&jQuery.css(elem,"display")==="none";};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),// Starting value computation is required for potential unit mismatches
initialInUnit=elem.nodeType&&(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){// Support: Firefox <=54
// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
initial=initial/2;// Trust units reported by jQuery.css
unit=unit||initialInUnit[3];// Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;while(maxIterations--){// Evaluate and update our best guess (doubling guesses that zero out).
// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
jQuery.style(elem,prop,initialInUnit+unit);if((1-scale)*(1-(scale=currentValue()/initial||0.5))<=0){maxIterations=0;}initialInUnit=initialInUnit/scale;}initialInUnit=initialInUnit*2;jQuery.style(elem,prop,initialInUnit+unit);// Make sure we update the tween properties later on
valueParts=valueParts||[];}if(valueParts){initialInUnit=+initialInUnit||+initial||0;// Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var defaultDisplayMap={};function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];if(display){return display;}temp=doc.body.appendChild(doc.createElement(nodeName));display=jQuery.css(temp,"display");temp.parentNode.removeChild(temp);if(display==="none"){display="block";}defaultDisplayMap[nodeName]=display;return display;}function showHide(elements,show){var display,elem,values=[],index=0,length=elements.length;// Determine new display value for elements that need to change
for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}display=elem.style.display;if(show){// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
// check is required in this first loop unless we have a nonempty display value (either
// inline or about-to-be-restored)
if(display==="none"){values[index]=dataPriv.get(elem,"display")||null;if(!values[index]){elem.style.display="";}}if(elem.style.display===""&&isHiddenWithinTree(elem)){values[index]=getDefaultDisplay(elem);}}else{if(display!=="none"){values[index]="none";// Remember what we're overwriting
dataPriv.set(elem,"display",display);}}}// Set the display of the elements in a second loop to avoid constant reflow
for(index=0;index<length;index++){if(values[index]!=null){elements[index].style.display=values[index];}}return elements;}jQuery.fn.extend({show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHiddenWithinTree(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var rscriptType=/^$|^module$|\/(?:java|ecma)script/i;(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (trac-11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (trac-14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);// Support: Android <=4.1 only
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;// Support: IE <=9 only
// IE <=9 replaces <option> tags with their contents when inserted outside of
// the select element.
div.innerHTML="<option></option>";support.option=!!div.lastChild;})();// We have to close these tags to support XHTML (trac-13200)
var wrapMap={// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;// Support: IE <=9 only
if(!support.option){wrapMap.optgroup=wrapMap.option=[1,"<select multiple='multiple'>","</select>"];}function getAll(context,tag){// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
var ret;if(typeof context.getElementsByTagName!=="undefined"){ret=context.getElementsByTagName(tag||"*");}else if(typeof context.querySelectorAll!=="undefined"){ret=context.querySelectorAll(tag||"*");}else{ret=[];}if(tag===undefined||tag&&nodeName(context,tag)){return jQuery.merge([context],ret);}return ret;}// Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,attached,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){// Add nodes directly
if(toType(elem)==="object"){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem);// Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));// Convert html into DOM nodes
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));// Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2];// Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;}// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes);// Remember the top-level container
tmp=fragment.firstChild;// Ensure the created nodes are orphaned (trac-12392)
tmp.textContent="";}}}// Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){// Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}attached=isAttached(elem);// Append to fragment
tmp=getAll(fragment.appendChild(elem),"script");// Preserve script evaluation history
if(attached){setGlobalEval(tmp);}// Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}var rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;}// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync(elem,type){return elem===safeActiveElement()===(type==="focus");}// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function _on(elem,types,selector,data,fn,one){var origFn,type;// Types can be a map of types/handlers
if(_typeof(types)==="object"){// ( types-Object, selector, data )
if(typeof selector!=="string"){// ( types-Object, data )
data=data||selector;selector=undefined;}for(type in types){_on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){// ( types, fn )
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){// ( types, selector, fn )
fn=data;data=undefined;}else{// ( types, data, fn )
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function fn(event){// Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);};// Use same guid so caller can remove using origFn
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});}/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem);// Only attach events to objects that accept data
if(!acceptData(elem)){return;}// Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}// Ensure that invalid selectors throw exceptions at attach time
// Evaluate against documentElement in case elem is a non-element node (e.g., document)
if(selector){jQuery.find.matchesSelector(documentElement,selector);}// Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid=jQuery.guid++;}// Init the element's event structure and main handler, if this is the first
if(!(events=elemData.events)){events=elemData.events=Object.create(null);}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){// Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};}// Handle multiple events separated by a space
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// There *must* be a type, no attaching namespace-only handlers
if(!type){continue;}// If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{};// If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type;// Update special based on newly reset type
special=jQuery.event.special[type]||{};// handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);// Init the event handler queue if we're the first
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0;// Only use addEventListener if the special events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}// Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}// Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=true;}},// Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;}// Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();// Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");// Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}}// Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}}// Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function dispatch(nativeEvent){var i,j,ret,matched,handleObj,handlerQueue,args=new Array(arguments.length),// Make a writable jQuery.Event from the native event object
event=jQuery.event.fix(nativeEvent),handlers=(dataPriv.get(this,"events")||Object.create(null))[event.type]||[],special=jQuery.event.special[event.type]||{};// Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;for(i=1;i<arguments.length;i++){args[i]=arguments[i];}event.delegateTarget=this;// Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}// Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers);// Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){// If the event is namespaced, then each handler is only invoked if it is
// specially universal or its namespaces are a superset of the event's.
if(!event.rnamespace||handleObj.namespace===false||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}// Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target;// Find delegate handlers
if(delegateCount&&// Support: IE <=9
// Black-hole SVG <use> instance trees (trac-13180)
cur.nodeType&&// Support: Firefox <=42
// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
// Support: IE 11 only
// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
!(event.type==="click"&&event.button>=1)){for(;cur!==this;cur=cur.parentNode||this){// Don't check non-elements (trac-13208)
// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
if(cur.nodeType===1&&!(event.type==="click"&&cur.disabled===true)){matchedHandlers=[];matchedSelectors={};for(i=0;i<delegateCount;i++){handleObj=_handlers[i];// Don't conflict with Object.prototype properties (trac-13203)
sel=handleObj.selector+" ";if(matchedSelectors[sel]===undefined){matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matchedSelectors[sel]){matchedHandlers.push(handleObj);}}if(matchedHandlers.length){handlerQueue.push({elem:cur,handlers:matchedHandlers});}}}}// Add the remaining (directly-bound) handlers
cur=this;if(delegateCount<_handlers.length){handlerQueue.push({elem:cur,handlers:_handlers.slice(delegateCount)});}return handlerQueue;},addProp:function addProp(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:true,configurable:true,get:isFunction(hook)?function(){if(this.originalEvent){return hook(this.originalEvent);}}:function(){if(this.originalEvent){return this.originalEvent[name];}},set:function set(value){Object.defineProperty(this,name,{enumerable:true,configurable:true,writable:true,value:value});}});},fix:function fix(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent);},special:{load:{// Prevent triggered image.load events from bubbling to window.load
noBubble:true},click:{// Utilize native event to ensure correct state for checkable inputs
setup:function setup(data){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var el=this||data;// Claim the first handler
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){// dataPriv.set( el, "click", ... )
leverageNative(el,"click",returnTrue);}// Return false to allow normal processing in the caller
return false;},trigger:function trigger(data){// For mutual compressibility with _default, replace `this` access with a local var.
// `|| data` is dead code meant only to preserve the variable through minification.
var el=this||data;// Force setup before triggering a click
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){leverageNative(el,"click");}// Return non-false to allow normal event-path propagation
return true;},// For cross-browser consistency, suppress native .click() on links
// Also prevent it if we're currently inside a leveraged native-event stack
_default:function _default(event){var target=event.target;return rcheckableType.test(target.type)&&target.click&&nodeName(target,"input")&&dataPriv.get(target,"click")||nodeName(target,"a");}},beforeunload:{postDispatch:function postDispatch(event){// Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative(el,type,expectSync){// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
if(!expectSync){if(dataPriv.get(el,type)===undefined){jQuery.event.add(el,type,returnTrue);}return;}// Register the controller as a special universal handler for all event namespaces
dataPriv.set(el,type,false);jQuery.event.add(el,type,{namespace:false,handler:function handler(event){var notAsync,result,saved=dataPriv.get(this,type);if(event.isTrigger&1&&this[type]){// Interrupt processing of the outer synthetic .trigger()ed event
// Saved data should be false in such cases, but might be a leftover capture object
// from an async native handler (gh-4350)
if(!saved.length){// Store arguments for use when handling the inner native event
// There will always be at least one argument (an event object), so this array
// will not be confused with a leftover capture object.
saved=_slice.call(arguments);dataPriv.set(this,type,saved);// Trigger the native event and capture its result
// Support: IE <=9 - 11+
// focus() and blur() are asynchronous
notAsync=expectSync(this,type);this[type]();result=dataPriv.get(this,type);if(saved!==result||notAsync){dataPriv.set(this,type,false);}else{result={};}if(saved!==result){// Cancel the outer synthetic event
event.stopImmediatePropagation();event.preventDefault();// Support: Chrome 86+
// In Chrome, if an element having a focusout handler is blurred by
// clicking outside of it, it invokes the handler synchronously. If
// that handler calls `.remove()` on the element, the data is cleared,
// leaving `result` undefined. We need to guard against this.
return result&&result.value;}// If this is an inner synthetic event for an event with a bubbling surrogate
// (focus or blur), assume that the surrogate already propagated from triggering the
// native event and prevent that from happening again here.
// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
// bubbling surrogate propagates *after* the non-bubbling base), but that seems
// less bad than duplication.
}else if((jQuery.event.special[type]||{}).delegateType){event.stopPropagation();}// If this is a native event triggered above, everything is now in order
// Fire an inner synthetic event with the original arguments
}else if(saved.length){// ...and capture the result
dataPriv.set(this,type,{value:jQuery.event.trigger(// Support: IE <=9 - 11+
// Extend with the prototype to reset the above stopImmediatePropagation()
jQuery.extend(saved[0],jQuery.Event.prototype),saved.slice(1),this)});// Abort handling of the native event
event.stopImmediatePropagation();}}});}jQuery.removeEvent=function(elem,type,handle){// This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){// Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}// Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type;// Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&// Support: Android <=2.3 only
src.returnValue===false?returnTrue:returnFalse;// Create target properties
// Support: Safari <=6 - 7 only
// Target should not be a text node (trac-504, trac-13143)
this.target=src.target&&src.target.nodeType===3?src.target.parentNode:src.target;this.currentTarget=src.currentTarget;this.relatedTarget=src.relatedTarget;// Event type
}else{this.type=src;}// Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);}// Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||Date.now();// Mark it as fixed
this[jQuery.expando]=true;};// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:false,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e&&!this.isSimulated){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopImmediatePropagation();}this.stopPropagation();}};// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each({altKey:true,bubbles:true,cancelable:true,changedTouches:true,ctrlKey:true,detail:true,eventPhase:true,metaKey:true,pageX:true,pageY:true,shiftKey:true,view:true,"char":true,code:true,charCode:true,key:true,keyCode:true,button:true,buttons:true,clientX:true,clientY:true,offsetX:true,offsetY:true,pointerId:true,pointerType:true,screenX:true,screenY:true,targetTouches:true,toElement:true,touches:true,which:true},jQuery.event.addProp);jQuery.each({focus:"focusin",blur:"focusout"},function(type,delegateType){jQuery.event.special[type]={// Utilize native event if possible so blur/focus sequence is correct
setup:function setup(){// Claim the first handler
// dataPriv.set( this, "focus", ... )
// dataPriv.set( this, "blur", ... )
leverageNative(this,type,expectSync);// Return false to allow normal processing in the caller
return false;},trigger:function trigger(){// Force setup before trigger
leverageNative(this,type);// Return non-false to allow normal event-path propagation
return true;},// Suppress native focus or blur if we're currently inside
// a leveraged native-event stack
_default:function _default(event){return dataPriv.get(event.target,type);},delegateType:delegateType};});// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;// For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function on(types,selector,data,fn){return _on(this,types,selector,data,fn);},one:function one(types,selector,data,fn){return _on(this,types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){// ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if(_typeof(types)==="object"){// ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){// ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var// Support: IE <=10 - 11, Edge 12 - 13 only
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i,// checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rcleanScript=/^\s*<!\[CDATA\[|\]\]>\s*$/g;// Prefer a tbody over its parent table for containing new rows
function manipulationTarget(elem,content){if(nodeName(elem,"table")&&nodeName(content.nodeType!==11?content:content.firstChild,"tr")){return jQuery(elem).children("tbody")[0]||elem;}return elem;}// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){if((elem.type||"").slice(0,5)==="true/"){elem.type=elem.type.slice(5);}else{elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,udataOld,udataCur,events;if(dest.nodeType!==1){return;}// 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.get(src);events=pdataOld.events;if(events){dataPriv.remove(dest,"handle events");for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}}// 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}}// Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();// Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked;// Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){// Flatten any nested arrays
args=flat(args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],valueIsFunction=isFunction(value);// We can't cloneNode fragments that contain checked, in WebKit
if(valueIsFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(valueIsFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}// Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;// Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (trac-8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);// Keep references to cloned scripts for later restoration
if(hasScripts){// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;// Reenable scripts
jQuery.map(scripts,restoreScript);// Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src&&(node.type||"").toLowerCase()!=="module"){// Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl&&!node.noModule){jQuery._evalUrl(node.src,{nonce:node.nonce||node.getAttribute("nonce")},doc);}}else{// Unwrap a CDATA section containing script contents. This shouldn't be
// needed as in XML documents they're already not visible when
// inspecting element contents and in HTML documents they have no
// meaning but we're preserving that logic for backwards compatibility.
// This will be removed completely in 4.0. See gh-4904.
DOMEval(node.textContent.replace(rcleanScript,""),node,doc);}}}}}}return collection;}function _remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&isAttached(node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function htmlPrefilter(html){return html;},clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=isAttached(elem);// Fix IE cloning issues
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}}// Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else{cloneCopyEvent(elem,clone);}}// Preserve script evaluation history
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));}// Return the cloned set
return clone;},cleanData:function cleanData(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);// This is a shortcut to avoid jQuery.event.remove's overhead
}else{jQuery.removeEvent(elem,type,data.handle);}}}// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){// Support: Chrome <=35 - 45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({detach:function detach(selector){return _remove(this,selector,true);},remove:function remove(selector){return _remove(this,selector);},text:function text(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function append(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function empty(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){// Prevent memory leaks
jQuery.cleanData(getAll(elem,false));// Remove any remaining nodes
elem.textContent="";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;}// See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{};// Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0;// If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var ignored=[];// Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}}// Force callback invocation
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);// Support: Android <=4.0 only, PhantomJS 1 only
// .get() because push.apply(_, arraylike) throws on ancient WebKit
push.apply(ret,elems.get());}return this.pushStack(ret);};});var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var rcustomProp=/^--/;var getStyles=function getStyles(elem){// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};var swap=function swap(elem,options,callback){var ret,name,old={};// Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.call(elem);// Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};var rboxStyle=new RegExp(cssExpand.join("|"),"i");var whitespace="[\\x20\\t\\r\\n\\f]";var rtrimCSS=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g");(function(){// Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){// This is a singleton, we need to execute it only once
if(!div){return;}container.style.cssText="position:absolute;left:-11111px;width:60px;"+"margin-top:1px;padding:0;border:0";div.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;"+"margin:auto;border:1px;padding:1px;"+"width:60%;top:1%";documentElement.appendChild(container).appendChild(div);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
reliableMarginLeftVal=roundPixelMeasures(divStyle.marginLeft)===12;// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
// Some styles come back with percentage values, even though they shouldn't
div.style.right="60%";pixelBoxStylesVal=roundPixelMeasures(divStyle.right)===36;// Support: IE 9 - 11 only
// Detect misreporting of content dimensions for box-sizing:border-box elements
boxSizingReliableVal=roundPixelMeasures(divStyle.width)===36;// Support: IE 9 only
// Detect overflow:scroll screwiness (gh-3699)
// Support: Chrome <=64
// Don't get tricked when zoom affects offsetWidth (gh-4029)
div.style.position="absolute";scrollboxSizeVal=roundPixelMeasures(div.offsetWidth/3)===12;documentElement.removeChild(container);// Nullify the div so it wouldn't be stored in the memory and
// it will also be a sign that checks already performed
div=null;}function roundPixelMeasures(measure){return Math.round(parseFloat(measure));}var pixelPositionVal,boxSizingReliableVal,scrollboxSizeVal,pixelBoxStylesVal,reliableTrDimensionsVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");// Finish early in limited (non-browser) environments
if(!div.style){return;}// Support: IE <=9 - 11 only
// Style of cloned element affects source element cloned (trac-8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";jQuery.extend(support,{boxSizingReliable:function boxSizingReliable(){computeStyleTests();return boxSizingReliableVal;},pixelBoxStyles:function pixelBoxStyles(){computeStyleTests();return pixelBoxStylesVal;},pixelPosition:function pixelPosition(){computeStyleTests();return pixelPositionVal;},reliableMarginLeft:function reliableMarginLeft(){computeStyleTests();return reliableMarginLeftVal;},scrollboxSize:function scrollboxSize(){computeStyleTests();return scrollboxSizeVal;},// Support: IE 9 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Behavior in IE 9 is more subtle than in newer versions & it passes
// some versions of this test; make sure not to make it pass there!
//
// Support: Firefox 70+
// Only Firefox includes border widths
// in computed dimensions. (gh-4529)
reliableTrDimensions:function reliableTrDimensions(){var table,tr,trChild,trStyle;if(reliableTrDimensionsVal==null){table=document.createElement("table");tr=document.createElement("tr");trChild=document.createElement("div");table.style.cssText="position:absolute;left:-11111px;border-collapse:separate";tr.style.cssText="border:1px solid";// Support: Chrome 86+
// Height set through cssText does not get applied.
// Computed height then comes back as 0.
tr.style.height="1px";trChild.style.height="9px";// Support: Android 8 Chrome 86+
// In our bodyBackground.html iframe,
// display for all div elements is set to "inline",
// which causes a problem only in Android 8 Chrome 86.
// Ensuring the div is display: block
// gets around this issue.
trChild.style.display="block";documentElement.appendChild(table).appendChild(tr).appendChild(trChild);trStyle=window.getComputedStyle(tr);reliableTrDimensionsVal=parseInt(trStyle.height,10)+parseInt(trStyle.borderTopWidth,10)+parseInt(trStyle.borderBottomWidth,10)===tr.offsetHeight;documentElement.removeChild(table);}return reliableTrDimensionsVal;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,isCustomProp=rcustomProp.test(name),// Support: Firefox 51+
// Retrieving style before computed somehow
// fixes an issue with getting wrong values
// on detached elements
style=elem.style;computed=computed||getStyles(elem);// getPropertyValue is needed for:
//   .css('filter') (IE 9 only, trac-12537)
//   .css('--customProperty) (gh-3144)
if(computed){// Support: IE <=9 - 11+
// IE only supports `"float"` in `getPropertyValue`; in computed styles
// it's only available as `"cssFloat"`. We no longer modify properties
// sent to `.css()` apart from camelCasing, so we need to check both.
// Normally, this would create difference in behavior: if
// `getPropertyValue` returns an empty string, the value returned
// by `.css()` would be `undefined`. This is usually the case for
// disconnected elements. However, in IE even disconnected elements
// with no styles return `"none"` for `getPropertyValue( "float" )`
ret=computed.getPropertyValue(name)||computed[name];if(isCustomProp&&ret){// Support: Firefox 105+, Chrome <=105+
// Spec requires trimming whitespace for custom properties (gh-4926).
// Firefox only trims leading whitespace. Chrome just collapses
// both leading & trailing whitespace to a single space.
//
// Fall back to `undefined` if empty string returned.
// This collapses a missing definition with property defined
// and set to an empty string but there's no standard API
// allowing us to differentiate them without a performance penalty
// and returning `undefined` aligns with older jQuery.
//
// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
// as whitespace while CSS does not, but this is not a problem
// because CSS preprocessing replaces them with U+000A LINE FEED
// (which *is* CSS whitespace)
// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
ret=ret.replace(rtrimCSS,"$1")||undefined;}if(ret===""&&!isAttached(elem)){ret=jQuery.style(elem,name);}// A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// https://drafts.csswg.org/cssom/#resolved-values
if(!support.pixelBoxStyles()&&rnumnonpx.test(ret)&&rboxStyle.test(name)){// Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;// Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;// Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined?// Support: IE <=9 - 11 only
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){// Define the hook, we'll check on the first run if it's really needed.
return{get:function get(){if(conditionFn()){// Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;}// Hook needed; redefine it so that the support test is not executed again.
return(this.get=hookFn).apply(this,arguments);}};}var cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style,vendorProps={};// Return a vendor-prefixed property or undefined
function vendorPropName(name){// Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName(name){var _final=jQuery.cssProps[name]||vendorProps[name];if(_final){return _final;}if(name in emptyStyle){return name;}return vendorProps[name]=vendorPropName(name)||name;}var// Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"};function setPositiveNumber(_elem,value,subtract){// Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches?// Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function boxModelAdjustment(elem,dimension,box,isBorderBox,styles,computedVal){var i=dimension==="width"?1:0,extra=0,delta=0;// Adjustment may not be necessary
if(box===(isBorderBox?"border":"content")){return 0;}for(;i<4;i+=2){// Both box models exclude margin
if(box==="margin"){delta+=jQuery.css(elem,box+cssExpand[i],true,styles);}// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
if(!isBorderBox){// Add padding
delta+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);// For "border" or "margin", add border
if(box!=="padding"){delta+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);// But still keep track of it otherwise
}else{extra+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}// If we get here with a border-box (content + padding + border), we're seeking "content" or
// "padding" or "margin"
}else{// For "content", subtract padding
if(box==="content"){delta-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}// For "content" or "padding", subtract border
if(box!=="margin"){delta-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}// Account for positive content-box scroll gutter when requested by providing computedVal
if(!isBorderBox&&computedVal>=0){// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
// Assuming integer scroll gutter, subtract the rest and round down
delta+=Math.max(0,Math.ceil(elem["offset"+dimension[0].toUpperCase()+dimension.slice(1)]-computedVal-delta-extra-0.5// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
// Use an explicit zero to avoid NaN (gh-3964)
))||0;}return delta;}function getWidthOrHeight(elem,dimension,extra){// Start with computed style
var styles=getStyles(elem),// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
// Fake content-box until we know it's needed to know the true value.
boxSizingNeeded=!support.boxSizingReliable()||extra,isBorderBox=boxSizingNeeded&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",valueIsBorderBox=isBorderBox,val=curCSS(elem,dimension,styles),offsetProp="offset"+dimension[0].toUpperCase()+dimension.slice(1);// Support: Firefox <=54
// Return a confounding non-pixel value or feign ignorance, as appropriate.
if(rnumnonpx.test(val)){if(!extra){return val;}val="auto";}// Support: IE 9 - 11 only
// Use offsetWidth/offsetHeight for when box sizing is unreliable.
// In those cases, the computed value can be trusted to be border-box.
if((!support.boxSizingReliable()&&isBorderBox||// Support: IE 10 - 11+, Edge 15 - 18+
// IE/Edge misreport `getComputedStyle` of table rows with width/height
// set in CSS while `offset*` properties report correct values.
// Interestingly, in some cases IE 9 doesn't suffer from this issue.
!support.reliableTrDimensions()&&nodeName(elem,"tr")||// Fall back to offsetWidth/offsetHeight when value is "auto"
// This happens for inline elements with no explicit setting (gh-3571)
val==="auto"||// Support: Android <=4.1 - 4.3 only
// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
!parseFloat(val)&&jQuery.css(elem,"display",false,styles)==="inline")&&// Make sure the element is visible & connected
elem.getClientRects().length){isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";// Where available, offsetWidth/offsetHeight approximate border box dimensions.
// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
// retrieved value as a content box dimension.
valueIsBorderBox=offsetProp in elem;if(valueIsBorderBox){val=elem[offsetProp];}}// Normalize "" and auto
val=parseFloat(val)||0;// Adjust for the element's box model
return val+boxModelAdjustment(elem,dimension,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles,// Provide the current computed size to request scroll gutter calculation (gh-3589)
val)+"px";}jQuery.extend({// Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){// We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},// Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"gridArea":true,"gridColumn":true,"gridColumnEnd":true,"gridColumnStart":true,"gridRow":true,"gridRowEnd":true,"gridRowStart":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},// Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{},// Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){// Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}// Make sure that we're working with the right name
var ret,type,hooks,origName=camelCase(name),isCustomProp=rcustomProp.test(name),style=elem.style;// Make sure that we're working with the right name. We don't
// want to query the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Gets hook for the prefixed version, then unprefixed version
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// Check if we're setting a value
if(value!==undefined){type=_typeof(value);// Convert "+=" or "-=" to relative numbers (trac-7345)
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret);// Fixes bug trac-9237
type="number";}// Make sure that null and NaN values aren't set (trac-7116)
if(value==null||value!==value){return;}// If a number was passed in, add the unit (except for certain CSS properties)
// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
// "px" to a few hardcoded values.
if(type==="number"&&!isCustomProp){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");}// background-* props affect original clone's values
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";}// If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){if(isCustomProp){style.setProperty(name,value);}else{style[name]=value;}}}else{// If a hook was provided get the non-computed value from there
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}// Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=camelCase(name),isCustomProp=rcustomProp.test(name);// Make sure that we're working with the right name. We don't
// want to modify the value if it is a CSS custom property
// since they are user-defined.
if(!isCustomProp){name=finalPropName(origName);}// Try prefixed name followed by the unprefixed name
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];// If a hook was provided get the computed value from there
if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}// Otherwise, if a way to get the computed value exists, use that
if(val===undefined){val=curCSS(elem,name,styles);}// Convert "normal" to computed value
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}// Make numeric if forced or a qualifier was provided and val looks numeric
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(_i,dimension){jQuery.cssHooks[dimension]={get:function get(elem,computed,extra){if(computed){// Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display"))&&(// Support: Safari 8+
// Table columns in Safari have non-zero offsetWidth & zero
// getBoundingClientRect().width unless display is changed.
// Support: IE <=11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
!elem.getClientRects().length||!elem.getBoundingClientRect().width)?swap(elem,cssShow,function(){return getWidthOrHeight(elem,dimension,extra);}):getWidthOrHeight(elem,dimension,extra);}},set:function set(elem,value,extra){var matches,styles=getStyles(elem),// Only read styles.position if the test has a chance to fail
// to avoid forcing a reflow.
scrollboxSizeBuggy=!support.scrollboxSize()&&styles.position==="absolute",// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
boxSizingNeeded=scrollboxSizeBuggy||extra,isBorderBox=boxSizingNeeded&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",subtract=extra?boxModelAdjustment(elem,dimension,extra,isBorderBox,styles):0;// Account for unreliable border-box dimensions by comparing offset* to computed and
// faking a content-box to get border and padding (gh-3699)
if(isBorderBox&&scrollboxSizeBuggy){subtract-=Math.ceil(elem["offset"+dimension[0].toUpperCase()+dimension.slice(1)]-parseFloat(styles[dimension])-boxModelAdjustment(elem,dimension,"border",false,styles)-0.5);}// Convert to pixels if value adjustment is needed
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[dimension]=value;value=jQuery.css(elem,dimension);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}});// These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function expand(value){var i=0,expanded={},// Assumes a single number if not a string
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(prefix!=="margin"){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(Array.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function get(tween){var result;// Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];}// Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,"");// Empty strings, null, undefined and "auto" are converted to 0.
return!result||result==="auto"?0:result;},set:function set(tween){// Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(jQuery.cssHooks[tween.prop]||tween.elem.style[finalPropName(tween.prop)]!=null)){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init;// Back compat <1.8 extension point
jQuery.fx.step={};var fxNow,inProgress,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;function schedule(){if(inProgress){if(document.hidden===false&&window.requestAnimationFrame){window.requestAnimationFrame(schedule);}else{window.setTimeout(schedule,jQuery.fx.interval);}jQuery.fx.tick();}}// Animations created synchronously will run synchronously
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=Date.now();}// Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type};// If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){// We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");// Queue-skipping animations hijack the fx hooks
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){// Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}// Detect show/hide animations
for(prop in props){value=props[prop];if(rfxtypes.test(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){// Pretend to be hidden if this is a "show" and
// there is still data from a stopped show/hide
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;// Ignore all other no-op show/hide data
}else{continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}// Bail out if this is a no-op like .hide().hide()
propTween=!jQuery.isEmptyObject(props);if(!propTween&&jQuery.isEmptyObject(orig)){return;}// Restrict "overflow" and "display" styles during box animations
if(isBox&&elem.nodeType===1){// Support: IE <=9 - 11, Edge 12 - 15
// Record all 3 overflow attributes because IE does not infer the shorthand
// from identically-valued overflowX and overflowY and Edge just mirrors
// the overflowX value there.
opts.overflow=[style.overflow,style.overflowX,style.overflowY];// Identify a display type, preferring old show/hide data over the CSS cascade
restoreDisplay=dataShow&&dataShow.display;if(restoreDisplay==null){restoreDisplay=dataPriv.get(elem,"display");}display=jQuery.css(elem,"display");if(display==="none"){if(restoreDisplay){display=restoreDisplay;}else{// Get nonempty value(s) by temporarily forcing visibility
showHide([elem],true);restoreDisplay=elem.style.display||restoreDisplay;display=jQuery.css(elem,"display");showHide([elem]);}}// Animate inline elements as inline-block
if(display==="inline"||display==="inline-block"&&restoreDisplay!=null){if(jQuery.css(elem,"float")==="none"){// Restore the original display value at the end of pure show/hide animations
if(!propTween){anim.done(function(){style.display=restoreDisplay;});if(restoreDisplay==null){display=style.display;restoreDisplay=display==="none"?"":display;}}style.display="inline-block";}}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}// Implement show/hide animations
propTween=false;for(prop in orig){// General show/hide setup for this element animation
if(!propTween){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=dataPriv.access(elem,"fxshow",{display:restoreDisplay});}// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
if(toggle){dataShow.hidden=!hidden;}// Show elements before animating them
if(hidden){showHide([elem],true);}/* eslint-disable no-loop-func */anim.done(function(){/* eslint-enable no-loop-func */ // The final step of a "hide" animation is actually hiding the element
if(!hidden){showHide([elem]);}dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});}// Per-property setup
propTween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=propTween.start;if(hidden){propTween.end=propTween.start;propTween.start=0;}}}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;// camelCase, specialEasing and expand cssHook pass
for(index in props){name=camelCase(index);easing=specialEasing[name];value=props[index];if(Array.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];// Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){// Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),// Support: Android 2.3 only
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);// If there's more to do, yield
if(percent<1&&length){return remaining;}// If this was an empty animation, synthesize a final progress notification
if(!length){deferred.notifyWith(elem,[animation,1,0]);}// Resolve the animation and report its conclusion
deferred.resolveWith(elem,[animation]);return false;},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0,// If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}// Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=result.stop.bind(result);}return result;}}jQuery.map(props,createTween,animation);if(isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}// Attach callbacks from options
animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));return animation;}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function tweener(props,callback){if(isFunction(props)){callback=props;props=["*"];}else{props=props.match(rnothtmlwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function prefilter(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else{Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&_typeof(speed)==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!isFunction(easing)&&easing};// Go to the end state if fx are off
if(jQuery.fx.off){opt.duration=0;}else{if(typeof opt.duration!=="number"){if(opt.duration in jQuery.fx.speeds){opt.duration=jQuery.fx.speeds[opt.duration];}else{opt.duration=jQuery.fx.speeds._default;}}}// Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";}// Queueing
opt.old=opt.complete;opt.complete=function(){if(isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){// Show any hidden elements after setting opacity to 0
return this.filter(isHiddenWithinTree).css("opacity",0).show()// Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){// Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall);// Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}// Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;// Enable finishing flag on private data
data.finish=true;// Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}// Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}// Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}// Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(_i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});// Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=Date.now();for(;i<timers.length;i++){timer=timers[i];// Run the timer and safely remove it when done (allowing for external removal)
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);jQuery.fx.start();};jQuery.fx.interval=13;jQuery.fx.start=function(){if(inProgress){return;}inProgress=true;schedule();};jQuery.fx.stop=function(){inProgress=null;};jQuery.fx.speeds={slow:600,fast:200,// Default speed
_default:400};// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox";// Support: Android <=4.3 only
// Default value for a checkbox should be "on"
support.checkOn=input.value!=="";// Support: IE <=11 only
// Must access selectedIndex to make default options select
support.optSelected=opt.selected;// Support: IE <=11 only
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}// Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}// Attribute hooks are determined by the lowercase version
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name);// Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue&&value==="radio"&&nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function removeAttr(elem,value){var name,i=0,// Attribute names can contain non-HTML whitespace characters
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
attrNames=value&&value.match(rnothtmlwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){elem.removeAttribute(name);}}}});// Hooks for boolean attributes
boolHook={set:function set(elem,value,name){if(value===false){// Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else{elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(_i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();if(!isXML){// Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[lowercaseName];attrHandle[lowercaseName]=ret;ret=getter(elem,name,isXML)!=null?lowercaseName:null;attrHandle[lowercaseName]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function prop(elem,name,value){var ret,hooks,nType=elem.nodeType;// Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){// Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function get(elem){// Support: IE <=9 - 11 only
// elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// Use proper attribute retrieval (trac-12072)
var tabindex=jQuery.find.attr(elem,"tabindex");if(tabindex){return parseInt(tabindex,10);}if(rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href){return 0;}return-1;}}},propFix:{"for":"htmlFor","class":"className"}});// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if(!support.optSelected){jQuery.propHooks.selected={get:function get(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;},set:function set(elem){/* eslint no-unused-expressions: "off" */var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});// Strip and collapse whitespace according to HTML spec
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
function stripAndCollapse(value){var tokens=value.match(rnothtmlwhite)||[];return tokens.join(" ");}function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}function classesToArray(value){if(Array.isArray(value)){return value;}if(typeof value==="string"){return value.match(rnothtmlwhite)||[];}return[];}jQuery.fn.extend({addClass:function addClass(value){var classNames,cur,curValue,className,i,finalValue;if(isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}classNames=classesToArray(value);if(classNames.length){return this.each(function(){curValue=getClass(this);cur=this.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){for(i=0;i<classNames.length;i++){className=classNames[i];if(cur.indexOf(" "+className+" ")<0){cur+=className+" ";}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){this.setAttribute("class",finalValue);}}});}return this;},removeClass:function removeClass(value){var classNames,cur,curValue,className,i,finalValue;if(isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}classNames=classesToArray(value);if(classNames.length){return this.each(function(){curValue=getClass(this);// This expression is here for better compressibility (see addClass)
cur=this.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){for(i=0;i<classNames.length;i++){className=classNames[i];// Remove *all* instances
while(cur.indexOf(" "+className+" ")>-1){cur=cur.replace(" "+className+" "," ");}}// Only assign if different to avoid unneeded rendering.
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){this.setAttribute("class",finalValue);}}});}return this;},toggleClass:function toggleClass(value,stateVal){var classNames,className,i,self,type=_typeof(value),isValidValue=type==="string"||Array.isArray(value);if(isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}if(typeof stateVal==="boolean"&&isValidValue){return stateVal?this.addClass(value):this.removeClass(value);}classNames=classesToArray(value);return this.each(function(){if(isValidValue){// Toggle individual class names
self=jQuery(this);for(i=0;i<classNames.length;i++){className=classNames[i];// Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else{self.addClass(className);}}// Toggle whole class name
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){// Store className if set
dataPriv.set(this,"__className__",className);}// If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function hasClass(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+stripAndCollapse(getClass(elem))+" ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function val(value){var hooks,ret,valueIsFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;// Handle most common string cases
if(typeof ret==="string"){return ret.replace(rreturn,"");}// Handle cases where value is null/undef or number
return ret==null?"":ret;}return;}valueIsFunction=isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(valueIsFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}// Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(Array.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];// If set returns undefined, fall back to normal setting
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:// Support: IE <=10 - 11 only
// option.text throws exceptions (trac-14686, trac-14858)
// Strip and collapse whitespace
// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
stripAndCollapse(jQuery.text(elem));}},select:{get:function get(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one",values=one?null:[],max=one?index+1:options.length;if(index<0){i=max;}else{i=one?index:0;}// Loop through all the selected options
for(;i<max;i++){option=options[i];// Support: IE <=9 only
// IE8-9 doesn't update selected after form reset (trac-2551)
if((option.selected||i===index)&&// Don't return options that are disabled or in a disabled optgroup
!option.disabled&&(!option.parentNode.disabled||!nodeName(option.parentNode,"optgroup"))){// Get the specific value for the option
value=jQuery(option).val();// We don't need an array for one selects
if(one){return value;}// Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];/* eslint-disable no-cond-assign */if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}/* eslint-enable no-cond-assign */}// Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}});// Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function set(elem,value){if(Array.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});// Return jQuery for attributes-only inclusion
support.focusin="onfocusin"in window;var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,stopPropagationCallback=function stopPropagationCallback(e){e.stopPropagation();};jQuery.extend(jQuery.event,{trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,lastElement,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=lastElement=tmp=elem=elem||document;// Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;}// focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){// Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type;// Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,_typeof(event)==="object"&&event);// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;// Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;}// Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]);// Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}// Determine event propagation path in advance, per W3C events spec (trac-9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
if(!onlyHandlers&&!special.noBubble&&!isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}// Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}// Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){lastElement=cur;event.type=i>1?bubbleType:special.bindType||type;// jQuery handler
handle=(dataPriv.get(cur,"events")||Object.create(null))[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);}// Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type;// If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){// Call a native DOM method on the target with the same name as the event.
// Don't do default actions on window, that's where global variables be (trac-6170)
if(ontype&&isFunction(elem[type])&&!isWindow(elem)){// Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;}// Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;if(event.isPropagationStopped()){lastElement.addEventListener(type,stopPropagationCallback);}elem[type]();if(event.isPropagationStopped()){lastElement.removeEventListener(type,stopPropagationCallback);}jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;},// Piggyback on a donor event to simulate a different one
// Used only for `focus(in | out)` events
simulate:function simulate(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true});jQuery.event.trigger(e,null,elem);}});jQuery.fn.extend({trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){// Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function setup(){// Handle: regular nodes (via `this.ownerDocument`), window
// (via `this.document`) & document (via `this`).
var doc=this.ownerDocument||this.document||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function teardown(){var doc=this.ownerDocument||this.document||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else{dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce={guid:Date.now()};var rquery=/\?/;// Cross-browser xml parsing
jQuery.parseXML=function(data){var xml,parserErrorElem;if(!data||typeof data!=="string"){return null;}// Support: IE 9 - 11 only
// IE throws on parseFromString with invalid input.
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){}parserErrorElem=xml&&xml.getElementsByTagName("parsererror")[0];if(!xml||parserErrorElem){jQuery.error("Invalid XML: "+(parserErrorElem?jQuery.map(parserErrorElem.childNodes,function(el){return el.textContent;}).join("\n"):data));}return xml;};var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(Array.isArray(obj)){// Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){// Treat each array item as a scalar.
add(prefix,v);}else{// Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+(_typeof(v)==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&toType(obj)==="object"){// Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{// Serialize scalar item.
add(prefix,obj);}}// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function add(key,valueOrFunction){// If value is a function, invoke it and use its return value
var value=isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value==null?"":value);};if(a==null){return"";}// If an array was passed in, assume that it is an array of form elements.
if(Array.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){// Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else{// If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}// Return the resulting serialization
return s.join("&");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){// Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;// Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(_i,elem){var val=jQuery(this).val();if(val==null){return null;}if(Array.isArray(val)){return jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};});}return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,// trac-7653, trac-8125, trac-8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={},/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={},// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
allTypes="*/".concat("*"),// Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href;// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){// dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(isFunction(func)){// For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){// Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);// Otherwise append
}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;}/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;// Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}// Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}// Check to see if we have a response for the expected dataType
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{// Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}// Or just use first one
finalDataType=finalDataType||firstDataType;}// If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},// Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice();// Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift();// Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}// Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){// There's only work to do if current dataType is non-auto
if(current==="*"){current=prev;// Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){// Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current];// If none found, seek a pair
if(!conv){for(conv2 in converters){// If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){// If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){// Condense equivalence converters
if(conv===true){conv=converters[conv2];// Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}}// Apply converter (if not an equivalence)
if(conv!==true){// Unless errors are allowed to bubble, catch and return them
if(conv&&s["throws"]){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return{state:"success",data:response};}jQuery.extend({// Counter for holding the number of active queries
active:0,// Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},// Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{// Convert anything to text
"* text":String,// Text to html (true = no transformation)
"text html":true,// Evaluate text as a json expression
"text json":JSON.parse,// Parse text as xml
"text xml":jQuery.parseXML},// For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}},// Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings?// Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):// Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),// Main method
ajax:function ajax(url,options){// If url is an object, simulate pre-1.5 signature
if(_typeof(url)==="object"){options=url;url=undefined;}// Force options to be an object
options=options||{};var transport,// URL without anti-cache param
cacheURL,// Response headers
responseHeadersString,responseHeaders,// timeout handle
timeoutTimer,// Url cleanup var
urlAnchor,// Request state (becomes false upon send and true upon completion)
completed,// To know if global events are to be dispatched
fireGlobals,// Loop variable
i,// uncached part of the url
uncached,// Create the final options object
s=jQuery.ajaxSetup({},options),// Callbacks context
callbackContext=s.context||s,// Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,// Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),// Status-dependent callbacks
_statusCode=s.statusCode||{},// Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={},// Default abort message
strAbort="canceled",// Fake xhr
jqXHR={readyState:0,// Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(completed){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()+" "]=(responseHeaders[match[1].toLowerCase()+" "]||[]).concat(match[2]);}}match=responseHeaders[key.toLowerCase()+" "];}return match==null?null:match.join(", ");},// Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return completed?responseHeadersString:null;},// Caches the header
setRequestHeader:function setRequestHeader(name,value){if(completed==null){name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name;requestHeaders[name]=value;}return this;},// Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(completed==null){s.mimeType=type;}return this;},// Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(completed){// Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}else{// Lazy-add the new callbacks in a way that preserves old ones
for(code in map){_statusCode[code]=[_statusCode[code],map[code]];}}}return this;},// Cancel the request
abort:function abort(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}};// Attach deferreds
deferred.promise(jqXHR);// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (trac-10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//");// Alias method option to type as per ticket trac-12004
s.type=options.method||options.type||s.method||s.type;// Extract dataTypes list
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""];// A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a");// Support: IE <=8 - 11, Edge 12 - 15
// IE throws exception on accessing the href property if url is malformed,
// e.g. http://example.com:80x/
try{urlAnchor.href=s.url;// Support: IE <=8 - 11 only
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){// If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}}// Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}// Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);// If request was aborted inside a prefilter, stop there
if(completed){return jqXHR;}// We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
fireGlobals=jQuery.event&&s.global;// Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}// Uppercase the type
s.type=s.type.toUpperCase();// Determine if request has content
s.hasContent=!rnoContent.test(s.type);// Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
// Remove hash to simplify url manipulation
cacheURL=s.url.replace(rhash,"");// More options handling for requests with no content
if(!s.hasContent){// Remember the hash so we can put it back
uncached=s.url.slice(cacheURL.length);// If data is available and should be processed, append data to url
if(s.data&&(s.processData||typeof s.data==="string")){cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data;// trac-9682: remove data so that it's not used in an eventual retry
delete s.data;}// Add or update anti-cache param if needed
if(s.cache===false){cacheURL=cacheURL.replace(rantiCache,"$1");uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce.guid++ +uncached;}// Put hash and anti-cache on the URL that will be requested (gh-1732)
s.url=cacheURL+uncached;// Change '%20' to '+' if this is encoded form body content (gh-2658)
}else if(s.data&&s.processData&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0){s.data=s.data.replace(r20,"+");}// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}// Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}// Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);// Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}// Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||completed)){// Abort if not done already and return
return jqXHR.abort();}// Aborting is no longer a cancellation
strAbort="abort";// Install callbacks on deferreds
completeDeferred.add(s.complete);jqXHR.done(s.success);jqXHR.fail(s.error);// Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);// If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;// Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}// If request was aborted inside ajaxSend, stop there
if(completed){return jqXHR;}// Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{completed=false;transport.send(requestHeaders,done);}catch(e){// Rethrow post-completion exceptions
if(completed){throw e;}// Propagate others as results
done(-1,e);}}// Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;// Ignore repeat invocations
if(completed){return;}completed=true;// Clear timeout if it exists
if(timeoutTimer){window.clearTimeout(timeoutTimer);}// Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined;// Cache response headers
responseHeadersString=headers||"";// Set readyState
jqXHR.readyState=status>0?4:0;// Determine if successful
isSuccess=status>=200&&status<300||status===304;// Get response data
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}// Use a noop converter for missing script but not if jsonp
if(!isSuccess&&jQuery.inArray("script",s.dataTypes)>-1&&jQuery.inArray("json",s.dataTypes)<0){s.converters["text script"]=function(){};}// Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess);// If successful, handle type chaining
if(isSuccess){// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}}// if no content
if(status===204||s.type==="HEAD"){statusText="nocontent";// if not modified
}else if(status===304){statusText="notmodified";// If we have data, let's convert it
}else{statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else{// Extract error from statusText and normalize for non-aborts
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}}// Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";// Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}// Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);}// Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);// Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(_i,method){jQuery[method]=function(url,data,callback,type){// Shift arguments if data argument was omitted
if(isFunction(data)){type=type||callback;callback=data;data=undefined;}// The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery.ajaxPrefilter(function(s){var i;for(i in s.headers){if(i.toLowerCase()==="content-type"){s.contentType=s.headers[i]||"";}}});jQuery._evalUrl=function(url,options,doc){return jQuery.ajax({url:url,// Make this explicit, since user can override this through ajaxSetup (trac-11264)
type:"GET",dataType:"script",cache:true,async:false,global:false,// Only evaluate the response if it is successful (gh-4126)
// dataFilter is not invoked for failure responses, so using it instead
// of the default converter is kludgy but it works.
converters:{"text script":function textScript(){}},dataFilter:function dataFilter(response){jQuery.globalEval(response,options,doc);}});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(this[0]){if(isFunction(html)){html=html.call(this[0]);}// The elements to wrap the target around
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function wrap(html){var htmlIsFunction=isFunction(html);return this.each(function(i){jQuery(this).wrapAll(htmlIsFunction?html.call(this,i):html);});},unwrap:function unwrap(selector){this.parent(selector).not("body").each(function(){jQuery(this).replaceWith(this.childNodes);});return this;}});jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem);};jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={// File protocol always yields status code 0, assume 200
0:200,// Support: IE <=9 only
// trac-1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var _callback,errorCallback;// Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function send(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password);// Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}}// Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);}// X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}// Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);}// Callback
_callback=function callback(type){return function(){if(_callback){_callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.ontimeout=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){// Support: IE <=9 only
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else{complete(// File: protocol always yields status 0; see trac-8605, trac-14207
xhr.status,xhr.statusText);}}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,// Support: IE <=9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};};// Listen to events
xhr.onload=_callback();errorCallback=xhr.onerror=xhr.ontimeout=_callback("error");// Support: IE 9 only
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else{xhr.onreadystatechange=function(){// Check readyState before timeout as it changes
if(xhr.readyState===4){// Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(_callback){errorCallback();}});}};}// Create the abort callback
_callback=_callback("abort");try{// Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){// trac-14683: Only rethrow if this hasn't been notified as an error yet
if(_callback){throw e;}}},abort:function abort(){if(_callback){_callback();}}};}});// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});// Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}});// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}});// Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){// This transport only deals with cross domain or forced-by-attrs requests
if(s.crossDomain||s.scriptAttrs){var script,_callback2;return{send:function send(_,complete){script=jQuery("<script>").attr(s.scriptAttrs||{}).prop({charset:s.scriptCharset,src:s.url}).on("load error",_callback2=function callback(evt){script.remove();_callback2=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}});// Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0]);},abort:function abort(){if(_callback2){_callback2();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;// Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce.guid++;this[callback]=true;return callback;}});// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data");// Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){// Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;// Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}// Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];};// Force json dataType
s.dataTypes[0]="json";// Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};// Clean-up function (fires after converters)
jqXHR.always(function(){// If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName);// Otherwise restore preexisting value
}else{window[callbackName]=overwritten;}// Save back as free
if(s[callbackName]){// Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback;// Save the callback name for future use
oldCallbacks.push(callbackName);}// Call if it was a function and we have a response
if(responseContainer&&isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;});// Delegate to script
return"script";}});// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}();// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(typeof data!=="string"){return[];}if(typeof context==="boolean"){keepScripts=context;context=false;}var base,parsed,scripts;if(!context){// Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
if(support.createHTMLDocument){context=document.implementation.createHTMLDocument("");// Set the base href for the created document
// so any parsed elements with URLs
// are based on the document's URL (gh-2965)
base=context.createElement("base");base.href=document.location.href;context.head.appendChild(base);}else{context=document;}}parsed=rsingleTag.exec(data);scripts=!keepScripts&&[];// Single tag
if(parsed){return[context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);};/**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=stripAndCollapse(url.slice(off));url=url.slice(0,off);}// If it's a function
if(isFunction(params)){// We assume that it's the callback
callback=params;params=undefined;// Otherwise, build a param string
}else if(params&&_typeof(params)==="object"){type="POST";}// If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({url:url,// If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){// Save response for use in complete callback
response=arguments;self.html(selector?// If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):// Otherwise use the full result
responseText);// If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;};jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.offset={setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};// Set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1;// Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(isFunction(options)){// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({// offset() relates an element's border box to the document origin
offset:function offset(options){// Preserve chaining for setter
if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var rect,win,elem=this[0];if(!elem){return;}// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
// Support: IE <=11 only
// Running getBoundingClientRect on a
// disconnected node in IE throws an error
if(!elem.getClientRects().length){return{top:0,left:0};}// Get document-relative position by adding viewport scroll to viewport-relative gBCR
rect=elem.getBoundingClientRect();win=elem.ownerDocument.defaultView;return{top:rect.top+win.pageYOffset,left:rect.left+win.pageXOffset};},// position() relates an element's margin box to its offset parent's padding box
// This corresponds to the behavior of CSS absolute positioning
position:function position(){if(!this[0]){return;}var offsetParent,offset,doc,elem=this[0],parentOffset={top:0,left:0};// position:fixed elements are offset from the viewport, which itself always has zero offset
if(jQuery.css(elem,"position")==="fixed"){// Assume position:fixed implies availability of getBoundingClientRect
offset=elem.getBoundingClientRect();}else{offset=this.offset();// Account for the *real* offset parent, which can be the document or its root element
// when a statically positioned element is identified
doc=elem.ownerDocument;offsetParent=elem.offsetParent||doc.documentElement;while(offsetParent&&(offsetParent===doc.body||offsetParent===doc.documentElement)&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.parentNode;}if(offsetParent&&offsetParent!==elem&&offsetParent.nodeType===1){// Incorporate borders into its offset, since they are outside its content origin
parentOffset=jQuery(offsetParent).offset();parentOffset.top+=jQuery.css(offsetParent,"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent,"borderLeftWidth",true);}}// Subtract parent offsets and element margins
return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};},// This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}});// Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){// Coalesce documents and windows
var win;if(isWindow(elem)){win=elem;}else if(elem.nodeType===9){win=elem.defaultView;}if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else{elem[method]=val;}},method,val,arguments.length);};});// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(_i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);// If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});});// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){// Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(isWindow(elem)){// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
return funcName.indexOf("outer")===0?elem["inner"+name]:elem.document.documentElement["client"+name];}// Get document width or height
if(elem.nodeType===9){doc=elem.documentElement;// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined?// Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra):// Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable);};});});jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(_i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.fn.extend({bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){// ( namespace ) or ( selector, types [, fn] )
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);},hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});jQuery.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(_i,name){// Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy=function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!isFunction(fn)){return undefined;}// Simulated bind
args=_slice.call(arguments,2);proxy=function proxy(){return fn.apply(context||this,args.concat(_slice.call(arguments)));};// Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;};jQuery.holdReady=function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}};jQuery.isArray=Array.isArray;jQuery.parseJSON=JSON.parse;jQuery.nodeName=nodeName;jQuery.isFunction=isFunction;jQuery.isWindow=isWindow;jQuery.camelCase=camelCase;jQuery.type=toType;jQuery.now=Date.now;jQuery.isNumeric=function(obj){// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type=jQuery.type(obj);return(type==="number"||type==="string")&&// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
!isNaN(obj-parseFloat(obj));};jQuery.trim=function(text){return text==null?"":(text+"").replace(rtrim,"$1");};// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}var// Map over jQuery in case of overwrite
_jQuery=window.jQuery,// Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;};// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if(typeof noGlobal==="undefined"){window.jQuery=window.$=jQuery;}return jQuery;});},{}],83:[function(require,module,exports){// When a boxed property is passed in, it should have quotes of some
// kind around it.
//
// For instance:
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// This function removes the wrapping quotes.
//
// Please note it *DOES NOT PARSE* template literals, so backticks just
// end up doing the same thing as other quote types.
//
// TODO: Should template literals be processed?  If so what state do they have access to?  That should happen here if so.
// TODO: Make a simple class include library with these
var cleanWrapCharacters=function cleanWrapCharacters(pCharacter,pString){if(pString.startsWith(pCharacter)&&pString.endsWith(pCharacter)){return pString.substring(1,pString.length-1);}else{return pString;}};module.exports=cleanWrapCharacters;},{}],84:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');/**
* Hash Translation
*
* This is a very simple translation table for hashes, which allows the same schema to resolve
* differently based on a loaded translation table.
*
* This is to prevent the requirement for mutating schemas over and over again when we want to
* reuse the structure but look up data elements by different addresses.
*
* One side-effect of this is that a translation table can "override" the built-in hashes, since
* this is always used to resolve hashes before any of the functionCallByHash(pHash, ...) perform
* their lookups by hash.
*
* @class ManyfestHashTranslation
*/var ManyfestHashTranslation=/*#__PURE__*/function(){function ManyfestHashTranslation(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestHashTranslation);// Wire in logging
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;this.translationTable={};}_createClass(ManyfestHashTranslation,[{key:"translationCount",value:function translationCount(){return Object.keys(this.translationTable).length;}},{key:"addTranslation",value:function addTranslation(pTranslation){var _this27=this;// This adds a translation in the form of:
// { "SourceHash": "DestinationHash", "SecondSourceHash":"SecondDestinationHash" }
if(_typeof(pTranslation)!='object'){this.logError("Hash translation addTranslation expected a translation be type object but was passed in ".concat(_typeof(pTranslation)));return false;}var tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(function(pTranslationSource){if(typeof pTranslation[pTranslationSource]!='string'){_this27.logError("Hash translation addTranslation expected a translation destination hash for [".concat(pTranslationSource,"] to be a string but the referrant was a ").concat(_typeof(pTranslation[pTranslationSource])));}else{_this27.translationTable[pTranslationSource]=pTranslation[pTranslationSource];}});}},{key:"removeTranslationHash",value:function removeTranslationHash(pTranslationHash){if(this.translationTable.hasOwnProperty(pTranslationHash)){delete this.translationTable[pTranslationHash];}}// This removes translations.
// If passed a string, just removes the single one.
// If passed an object, it does all the source keys.
},{key:"removeTranslation",value:function removeTranslation(pTranslation){var _this28=this;if(typeof pTranslation=='string'){this.removeTranslationHash(pTranslation);return true;}else if(_typeof(pTranslation)=='object'){var tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(function(pTranslationSource){_this28.removeTranslation(pTranslationSource);});return true;}else{this.logError("Hash translation removeTranslation expected either a string or an object but the passed-in translation was type ".concat(_typeof(pTranslation)));return false;}}},{key:"clearTranslations",value:function clearTranslations(){this.translationTable={};}},{key:"translate",value:function translate(pTranslation){if(this.translationTable.hasOwnProperty(pTranslation)){return this.translationTable[pTranslation];}else{return pTranslation;}}}]);return ManyfestHashTranslation;}();module.exports=ManyfestHashTranslation;},{"./Manyfest-LogToConsole.js":85}],85:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/ /**
* Manyfest simple logging shim (for browser and dependency-free running)
*/var logToConsole=function logToConsole(pLogLine,pLogObject){var tmpLogLine=typeof pLogLine==='string'?pLogLine:'';console.log("[Manyfest] ".concat(tmpLogLine));if(pLogObject)console.log(JSON.stringify(pLogObject));};module.exports=logToConsole;},{}],86:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');/**
* Object Address Resolver
*
* IMPORTANT NOTE: This code is intentionally more verbose than necessary, to
*                 be extremely clear what is going on in the recursion for
*                 each of the three address resolution functions.
*
*                 Although there is some opportunity to repeat ourselves a
*                 bit less in this codebase (e.g. with detection of arrays
*                 versus objects versus direct properties), it can make
*                 debugging.. challenging.  The minified version of the code
*                 optimizes out almost anything repeated in here.  So please
*                 be kind and rewind... meaning please keep the codebase less
*                 terse and more verbose so humans can comprehend it.
*
*
* @class ManyfestObjectAddressResolverCheckAddressExists
*/var ManyfestObjectAddressResolverCheckAddressExists=/*#__PURE__*/function(){function ManyfestObjectAddressResolverCheckAddressExists(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestObjectAddressResolverCheckAddressExists);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};}// Check if an address exists.
//
// This is necessary because the getValueAtAddress function is ambiguous on
// whether the element/property is actually there or not (it returns
// undefined whether the property exists or not).  This function checks for
// existance and returns true or false dependent.
_createClass(ManyfestObjectAddressResolverCheckAddressExists,[{key:"checkAddressExists",value:function checkAddressExists(pObject,pAddress){// TODO: Should these throw an error?
// Make sure pObject is an object
if(_typeof(pObject)!='object')return false;// Make sure pAddress is a string
if(typeof pAddress!='string')return false;// TODO: Make this work for things like SomeRootObject.Metadata["Some.People.Use.Bad.Object.Property.Names"]
var tmpSeparatorIndex=pAddress.indexOf('.');// This is the terminal address string (no more dots so the RECUSION ENDS IN HERE somehow)
if(tmpSeparatorIndex==-1){// Check if the address refers to a boxed property
var tmpBracketStartIndex=pAddress.indexOf('[');var tmpBracketStopIndex=pAddress.indexOf(']');// Boxed elements look like this:
// 		MyValues[10]
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(tmpBracketStartIndex>0//    2) The end bracket has something between them
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is data
&&tmpBracketStopIndex-tmpBracketStartIndex>1){// The "Name" of the Object contained too the left of the bracket
var tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();// If the subproperty doesn't test as a proper Object, none of the rest of this is possible.
// This is a rare case where Arrays testing as Objects is useful
if(_typeof(pObject[tmpBoxedPropertyName])!=='object'){return false;}// The "Reference" to the property within it, either an array element or object property
var tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();// Attempt to parse the reference as a number, which will be used as an array element
var tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to treat it as a dynamic object property.
if(isNaN(tmpBoxedPropertyNumber)){// This isn't a number ... let's treat it as a dynamic object property.
// We would expect the property to be wrapped in some kind of quotes so strip them
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);// Check if the property exists.
return pObject[tmpBoxedPropertyName].hasOwnProperty(tmpBoxedPropertyReference);}else{// Use the new in operator to see if the element is in the array
return tmpBoxedPropertyNumber in pObject[tmpBoxedPropertyName];}}else{// Check if the property exists
return pObject.hasOwnProperty(pAddress);}}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// Test if the tmpNewAddress is an array or object
// Check if it's a boxed property
var _tmpBracketStartIndex=tmpSubObjectName.indexOf('[');var _tmpBracketStopIndex=tmpSubObjectName.indexOf(']');// Boxed elements look like this:
// 		MyValues[42]
// 		MyValues['Color']
// 		MyValues["Weight"]
// 		MyValues[`Diameter`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(_tmpBracketStartIndex>0//    2) The end bracket has something between them
&&_tmpBracketStopIndex>_tmpBracketStartIndex//    3) There is data
&&_tmpBracketStopIndex-_tmpBracketStartIndex>1){var _tmpBoxedPropertyName=tmpSubObjectName.substring(0,_tmpBracketStartIndex).trim();var _tmpBoxedPropertyReference=tmpSubObjectName.substring(_tmpBracketStartIndex+1,_tmpBracketStopIndex).trim();var _tmpBoxedPropertyNumber=parseInt(_tmpBoxedPropertyReference,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students[1].Tardy
//       BUT
//         StudentData.Sections.Algebra.Students is an object, so the [1].Tardy is not possible to access
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students["JaneDoe"].Grade
//       BUT
//         StudentData.Sections.Algebra.Students is an array, so the ["JaneDoe"].Grade is not possible to access
// TODO: Should this be an error or something?  Should we keep a log of failures like this?
if(Array.isArray(pObject[_tmpBoxedPropertyName])==isNaN(_tmpBoxedPropertyNumber)){// Because this is an impossible address, the property doesn't exist
// TODO: Should we throw an error in this condition?
return false;}//This is a bracketed value
//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to reat it as a dynamic object property.
if(isNaN(_tmpBoxedPropertyNumber)){// This isn't a number ... let's treat it as a dynanmic object property.
_tmpBoxedPropertyReference=this.cleanWrapCharacters('"',_tmpBoxedPropertyReference);_tmpBoxedPropertyReference=this.cleanWrapCharacters('`',_tmpBoxedPropertyReference);_tmpBoxedPropertyReference=this.cleanWrapCharacters("'",_tmpBoxedPropertyReference);// Recurse directly into the subobject
return this.checkAddressExists(pObject[_tmpBoxedPropertyName][_tmpBoxedPropertyReference],tmpNewAddress);}else{// We parsed a valid number out of the boxed property name, so recurse into the array
return this.checkAddressExists(pObject[_tmpBoxedPropertyName][_tmpBoxedPropertyNumber],tmpNewAddress);}}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
return this.checkAddressExists(pObject[tmpSubObjectName],tmpNewAddress);}else{// Create a subobject and then pass that
pObject[tmpSubObjectName]={};return this.checkAddressExists(pObject[tmpSubObjectName],tmpNewAddress);}}}}]);return ManyfestObjectAddressResolverCheckAddressExists;}();;module.exports=ManyfestObjectAddressResolverCheckAddressExists;},{"./Manyfest-LogToConsole.js":85}],87:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var libPrecedent=require('precedent');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');/**
* Object Address Resolver - DeleteValue
*
* IMPORTANT NOTE: This code is intentionally more verbose than necessary, to
*                 be extremely clear what is going on in the recursion for
*                 each of the three address resolution functions.
*
*                 Although there is some opportunity to repeat ourselves a
*                 bit less in this codebase (e.g. with detection of arrays
*                 versus objects versus direct properties), it can make
*                 debugging.. challenging.  The minified version of the code
*                 optimizes out almost anything repeated in here.  So please
*                 be kind and rewind... meaning please keep the codebase less
*                 terse and more verbose so humans can comprehend it.
*
* TODO: Once we validate this pattern is good to go, break these out into
*       three separate modules.
*
* @class ManyfestObjectAddressResolverDeleteValue
*/var ManyfestObjectAddressResolverDeleteValue=/*#__PURE__*/function(){function ManyfestObjectAddressResolverDeleteValue(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestObjectAddressResolverDeleteValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}_createClass(ManyfestObjectAddressResolverDeleteValue,[{key:"checkFilters",value:function checkFilters(pAddress,pRecord){var _this29=this;var tmpPrecedent=new libPrecedent();// If we don't copy the string, precedent takes it out for good.
// TODO: Consider adding a "don't replace" option for precedent
var tmpAddress=pAddress;if(!this.elucidatorSolver){// Again, manage against circular dependencies
var libElucidator=require('elucidator');this.elucidatorSolver=new libElucidator({},this.logInfo,this.logError);}if(this.elucidatorSolver){// This allows the magic filtration with elucidator configuration
// TODO: We could pass more state in (e.g. parent address, object, etc.)
// TODO: Discuss this metaprogramming AT LENGTH
var tmpFilterState={Record:pRecord,keepRecord:true};// This is about as complex as it gets.
// TODO: Optimize this so it is only initialized once.
// TODO: That means figuring out a healthy pattern for passing in state to this
tmpPrecedent.addPattern('<<~~','~~>>',function(pInstructionHash){// This is for internal config on the solution steps.  Right now config is not shared across steps.
if(_this29.elucidatorSolverState.hasOwnProperty(pInstructionHash)){tmpFilterState.SolutionState=_this29.elucidatorSolverState[pInstructionHash];}_this29.elucidatorSolver.solveInternalOperation('Custom',pInstructionHash,tmpFilterState);});tmpPrecedent.addPattern('<<~?','?~>>',function(pMagicSearchExpression){if(typeof pMagicSearchExpression!=='string'){return false;}// This expects a comma separated expression:
//     Some.Address.In.The.Object,==,Search Term to Match
var tmpMagicComparisonPatternSet=pMagicSearchExpression.split(',');var tmpSearchAddress=tmpMagicComparisonPatternSet[0];var tmpSearchComparator=tmpMagicComparisonPatternSet[1];var tmpSearchValue=tmpMagicComparisonPatternSet[2];tmpFilterState.ComparisonState={SearchAddress:tmpSearchAddress,Comparator:tmpSearchComparator,SearchTerm:tmpSearchValue};_this29.elucidatorSolver.solveOperation({"Description":{"Operation":"Simple_If","Synopsis":"Test for "},"Steps":[{"Namespace":"Logic","Instruction":"if","InputHashAddressMap":{// This is ... dynamically assigning the address in the instruction
// The complexity is astounding.
"leftValue":"Record.".concat(tmpSearchAddress),"rightValue":"ComparisonState.SearchTerm","comparator":"ComparisonState.Comparator"},"OutputHashAddressMap":{"truthinessResult":"keepRecord"}}]},tmpFilterState);});tmpPrecedent.parseString(tmpAddress);// It is expected that the operation will mutate this to some truthy value
return tmpFilterState.keepRecord;}else{return true;}}// Delete the value of an element at an address
},{key:"deleteValueAtAddress",value:function deleteValueAtAddress(pObject,pAddress,pParentAddress){// Make sure pObject (the object we are meant to be recursing) is an object (which could be an array or object)
if(_typeof(pObject)!='object')return undefined;// Make sure pAddress (the address we are resolving) is a string
if(typeof pAddress!='string')return undefined;// Stash the parent address for later resolution
var tmpParentAddress="";if(typeof pParentAddress=='string'){tmpParentAddress=pParentAddress;}// TODO: Make this work for things like SomeRootObject.Metadata["Some.People.Use.Bad.Object.Property.Names"]
var tmpSeparatorIndex=pAddress.indexOf('.');// This is the terminal address string (no more dots so the RECUSION ENDS IN HERE somehow)
if(tmpSeparatorIndex==-1){// Check if the address refers to a boxed property
var tmpBracketStartIndex=pAddress.indexOf('[');var tmpBracketStopIndex=pAddress.indexOf(']');// Check for the Object Set Type marker.
// Note this will not work with a bracket in the same address box set
var tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');// Boxed elements look like this:
// 		MyValues[10]
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(tmpBracketStartIndex>0//    2) The end bracket has something between them
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is data
&&tmpBracketStopIndex-tmpBracketStartIndex>1){// The "Name" of the Object contained too the left of the bracket
var tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();// If the subproperty doesn't test as a proper Object, none of the rest of this is possible.
// This is a rare case where Arrays testing as Objects is useful
if(_typeof(pObject[tmpBoxedPropertyName])!=='object'){return false;}// The "Reference" to the property within it, either an array element or object property
var tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();// Attempt to parse the reference as a number, which will be used as an array element
var tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to treat it as a dynamic object property.
if(isNaN(tmpBoxedPropertyNumber)){// This isn't a number ... let's treat it as a dynamic object property.
// We would expect the property to be wrapped in some kind of quotes so strip them
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);// Return the value in the property
delete pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference];return true;}else{delete pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber];return true;}}// The requirements to detect a boxed set element are:
//    1) The start bracket is after character 0
else if(tmpBracketStartIndex>0//    2) The end bracket is after the start bracket
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is nothing in the brackets
&&tmpBracketStopIndex-tmpBracketStartIndex==1){var _tmpBoxedPropertyName2=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[_tmpBoxedPropertyName2])){// We asked for a set from an array but it isnt' an array.
return false;}var tmpInputArray=pObject[_tmpBoxedPropertyName2];// Count from the end to the beginning so splice doesn't %&%#$ up the array
for(var i=tmpInputArray.length-1;i>=0;i--){// The filtering is complex but allows config-based metaprogramming directly from schema
var tmpKeepRecord=this.checkFilters(pAddress,tmpInputArray[i]);if(tmpKeepRecord){// Delete elements end to beginning
tmpInputArray.splice(i,1);}}return true;}// The object has been flagged as an object set, so treat it as such
else if(tmpObjectTypeMarkerIndex>0){var tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(_typeof(pObject[tmpObjectPropertyName])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}delete pObject[tmpObjectPropertyName];return true;}else{// Now is the point in recursion to return the value in the address
delete pObject[pAddress];return true;}}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// BOXED ELEMENTS
// Test if the tmpNewAddress is an array or object
// Check if it's a boxed property
var _tmpBracketStartIndex2=tmpSubObjectName.indexOf('[');var _tmpBracketStopIndex2=tmpSubObjectName.indexOf(']');// Boxed elements look like this:
// 		MyValues[42]
// 		MyValues['Color']
// 		MyValues["Weight"]
// 		MyValues[`Diameter`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(_tmpBracketStartIndex2>0//    2) The end bracket has something between them
&&_tmpBracketStopIndex2>_tmpBracketStartIndex2//    3) There is data
&&_tmpBracketStopIndex2-_tmpBracketStartIndex2>1){var _tmpBoxedPropertyName3=tmpSubObjectName.substring(0,_tmpBracketStartIndex2).trim();var _tmpBoxedPropertyReference2=tmpSubObjectName.substring(_tmpBracketStartIndex2+1,_tmpBracketStopIndex2).trim();var _tmpBoxedPropertyNumber2=parseInt(_tmpBoxedPropertyReference2,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students[1].Tardy
//       BUT
//         StudentData.Sections.Algebra.Students is an object, so the [1].Tardy is not possible to access
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students["JaneDoe"].Grade
//       BUT
//         StudentData.Sections.Algebra.Students is an array, so the ["JaneDoe"].Grade is not possible to access
// TODO: Should this be an error or something?  Should we keep a log of failures like this?
if(Array.isArray(pObject[_tmpBoxedPropertyName3])==isNaN(_tmpBoxedPropertyNumber2)){return false;}// Check if the boxed property is an object.
if(_typeof(pObject[_tmpBoxedPropertyName3])!='object'){return false;}//This is a bracketed value
//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to reat it as a dynamic object property.
if(isNaN(_tmpBoxedPropertyNumber2)){// This isn't a number ... let's treat it as a dynanmic object property.
_tmpBoxedPropertyReference2=this.cleanWrapCharacters('"',_tmpBoxedPropertyReference2);_tmpBoxedPropertyReference2=this.cleanWrapCharacters('`',_tmpBoxedPropertyReference2);_tmpBoxedPropertyReference2=this.cleanWrapCharacters("'",_tmpBoxedPropertyReference2);// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);// Recurse directly into the subobject
return this.deleteValueAtAddress(pObject[_tmpBoxedPropertyName3][_tmpBoxedPropertyReference2],tmpNewAddress,tmpParentAddress);}else{// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);// We parsed a valid number out of the boxed property name, so recurse into the array
return this.deleteValueAtAddress(pObject[_tmpBoxedPropertyName3][_tmpBoxedPropertyNumber2],tmpNewAddress,tmpParentAddress);}}// The requirements to detect a boxed set element are:
//    1) The start bracket is after character 0
else if(_tmpBracketStartIndex2>0//    2) The end bracket is after the start bracket
&&_tmpBracketStopIndex2>_tmpBracketStartIndex2//    3) There is nothing in the brackets
&&_tmpBracketStopIndex2-_tmpBracketStartIndex2==1){var _tmpBoxedPropertyName4=pAddress.substring(0,_tmpBracketStartIndex2).trim();if(!Array.isArray(pObject[_tmpBoxedPropertyName4])){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the array and grab the addresses from there.
var tmpArrayProperty=pObject[_tmpBoxedPropertyName4];// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpBoxedPropertyName4);// The container object is where we have the "Address":SOMEVALUE pairs
var tmpContainerObject={};for(var _i11=0;_i11<tmpArrayProperty.length;_i11++){var tmpPropertyParentAddress="".concat(tmpParentAddress,"[").concat(_i11,"]");var tmpValue=this.deleteValueAtAddress(pObject[_tmpBoxedPropertyName4][_i11],tmpNewAddress,tmpPropertyParentAddress);tmpContainerObject["".concat(tmpPropertyParentAddress,".").concat(tmpNewAddress)]=tmpValue;}return tmpContainerObject;}// OBJECT SET
// Note this will not work with a bracket in the same address box set
var _tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');if(_tmpObjectTypeMarkerIndex>0){var _tmpObjectPropertyName=pAddress.substring(0,_tmpObjectTypeMarkerIndex).trim();if(_typeof(pObject[_tmpObjectPropertyName])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the Object and grab the addresses from there.
var tmpObjectProperty=pObject[_tmpObjectPropertyName];var tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpObjectPropertyName);// The container object is where we have the "Address":SOMEVALUE pairs
var _tmpContainerObject={};for(var _i12=0;_i12<tmpObjectPropertyKeys.length;_i12++){var _tmpPropertyParentAddress="".concat(tmpParentAddress,".").concat(tmpObjectPropertyKeys[_i12]);var _tmpValue7=this.deleteValueAtAddress(pObject[_tmpObjectPropertyName][tmpObjectPropertyKeys[_i12]],tmpNewAddress,_tmpPropertyParentAddress);// The filtering is complex but allows config-based metaprogramming directly from schema
var _tmpKeepRecord=this.checkFilters(pAddress,_tmpValue7);if(_tmpKeepRecord){_tmpContainerObject["".concat(_tmpPropertyParentAddress,".").concat(tmpNewAddress)]=_tmpValue7;}}return _tmpContainerObject;}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}else{// Create a subobject and then pass that
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);pObject[tmpSubObjectName]={};return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}}}}]);return ManyfestObjectAddressResolverDeleteValue;}();;module.exports=ManyfestObjectAddressResolverDeleteValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"elucidator":31,"precedent":95}],88:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var libPrecedent=require('precedent');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');/**
* Object Address Resolver - GetValue
*
* IMPORTANT NOTE: This code is intentionally more verbose than necessary, to
*                 be extremely clear what is going on in the recursion for
*                 each of the three address resolution functions.
*
*                 Although there is some opportunity to repeat ourselves a
*                 bit less in this codebase (e.g. with detection of arrays
*                 versus objects versus direct properties), it can make
*                 debugging.. challenging.  The minified version of the code
*                 optimizes out almost anything repeated in here.  So please
*                 be kind and rewind... meaning please keep the codebase less
*                 terse and more verbose so humans can comprehend it.
*
* TODO: Once we validate this pattern is good to go, break these out into
*       three separate modules.
*
* @class ManyfestObjectAddressResolverGetValue
*/var ManyfestObjectAddressResolverGetValue=/*#__PURE__*/function(){function ManyfestObjectAddressResolverGetValue(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestObjectAddressResolverGetValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}_createClass(ManyfestObjectAddressResolverGetValue,[{key:"checkFilters",value:function checkFilters(pAddress,pRecord){var _this30=this;var tmpPrecedent=new libPrecedent();// If we don't copy the string, precedent takes it out for good.
// TODO: Consider adding a "don't replace" option for precedent
var tmpAddress=pAddress;if(!this.elucidatorSolver){// Again, manage against circular dependencies
var libElucidator=require('elucidator');this.elucidatorSolver=new libElucidator({},this.logInfo,this.logError);}if(this.elucidatorSolver){// This allows the magic filtration with elucidator configuration
// TODO: We could pass more state in (e.g. parent address, object, etc.)
// TODO: Discuss this metaprogramming AT LENGTH
var tmpFilterState={Record:pRecord,keepRecord:true};// This is about as complex as it gets.
// TODO: Optimize this so it is only initialized once.
// TODO: That means figuring out a healthy pattern for passing in state to this
tmpPrecedent.addPattern('<<~~','~~>>',function(pInstructionHash){// This is for internal config on the solution steps.  Right now config is not shared across steps.
if(_this30.elucidatorSolverState.hasOwnProperty(pInstructionHash)){tmpFilterState.SolutionState=_this30.elucidatorSolverState[pInstructionHash];}_this30.elucidatorSolver.solveInternalOperation('Custom',pInstructionHash,tmpFilterState);});tmpPrecedent.addPattern('<<~?','?~>>',function(pMagicSearchExpression){if(typeof pMagicSearchExpression!=='string'){return false;}// This expects a comma separated expression:
//     Some.Address.In.The.Object,==,Search Term to Match
var tmpMagicComparisonPatternSet=pMagicSearchExpression.split(',');var tmpSearchAddress=tmpMagicComparisonPatternSet[0];var tmpSearchComparator=tmpMagicComparisonPatternSet[1];var tmpSearchValue=tmpMagicComparisonPatternSet[2];tmpFilterState.ComparisonState={SearchAddress:tmpSearchAddress,Comparator:tmpSearchComparator,SearchTerm:tmpSearchValue};_this30.elucidatorSolver.solveOperation({"Description":{"Operation":"Simple_If","Synopsis":"Test for "},"Steps":[{"Namespace":"Logic","Instruction":"if","InputHashAddressMap":{// This is ... dynamically assigning the address in the instruction
// The complexity is astounding.
"leftValue":"Record.".concat(tmpSearchAddress),"rightValue":"ComparisonState.SearchTerm","comparator":"ComparisonState.Comparator"},"OutputHashAddressMap":{"truthinessResult":"keepRecord"}}]},tmpFilterState);});tmpPrecedent.parseString(tmpAddress);// It is expected that the operation will mutate this to some truthy value
return tmpFilterState.keepRecord;}else{return true;}}// Get the value of an element at an address
},{key:"getValueAtAddress",value:function getValueAtAddress(pObject,pAddress,pParentAddress){// Make sure pObject (the object we are meant to be recursing) is an object (which could be an array or object)
if(_typeof(pObject)!='object')return undefined;// Make sure pAddress (the address we are resolving) is a string
if(typeof pAddress!='string')return undefined;// Stash the parent address for later resolution
var tmpParentAddress="";if(typeof pParentAddress=='string'){tmpParentAddress=pParentAddress;}// TODO: Make this work for things like SomeRootObject.Metadata["Some.People.Use.Bad.Object.Property.Names"]
var tmpSeparatorIndex=pAddress.indexOf('.');// This is the terminal address string (no more dots so the RECUSION ENDS IN HERE somehow)
if(tmpSeparatorIndex==-1){// Check if the address refers to a boxed property
var tmpBracketStartIndex=pAddress.indexOf('[');var tmpBracketStopIndex=pAddress.indexOf(']');// Check for the Object Set Type marker.
// Note this will not work with a bracket in the same address box set
var tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');// Boxed elements look like this:
// 		MyValues[10]
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(tmpBracketStartIndex>0//    2) The end bracket has something between them
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is data
&&tmpBracketStopIndex-tmpBracketStartIndex>1){// The "Name" of the Object contained too the left of the bracket
var tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();// If the subproperty doesn't test as a proper Object, none of the rest of this is possible.
// This is a rare case where Arrays testing as Objects is useful
if(_typeof(pObject[tmpBoxedPropertyName])!=='object'){return undefined;}// The "Reference" to the property within it, either an array element or object property
var tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();// Attempt to parse the reference as a number, which will be used as an array element
var tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return undefined;}//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to treat it as a dynamic object property.
if(isNaN(tmpBoxedPropertyNumber)){// This isn't a number ... let's treat it as a dynamic object property.
// We would expect the property to be wrapped in some kind of quotes so strip them
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);// Return the value in the property
return pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference];}else{return pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber];}}// The requirements to detect a boxed set element are:
//    1) The start bracket is after character 0
else if(tmpBracketStartIndex>0//    2) The end bracket is after the start bracket
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is nothing in the brackets
&&tmpBracketStopIndex-tmpBracketStartIndex==1){var _tmpBoxedPropertyName5=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[_tmpBoxedPropertyName5])){// We asked for a set from an array but it isnt' an array.
return false;}var tmpInputArray=pObject[_tmpBoxedPropertyName5];var tmpOutputArray=[];for(var i=0;i<tmpInputArray.length;i++){// The filtering is complex but allows config-based metaprogramming directly from schema
var tmpKeepRecord=this.checkFilters(pAddress,tmpInputArray[i]);if(tmpKeepRecord){tmpOutputArray.push(tmpInputArray[i]);}}return tmpOutputArray;}// The object has been flagged as an object set, so treat it as such
else if(tmpObjectTypeMarkerIndex>0){var tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(_typeof(pObject[tmpObjectPropertyName])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}return pObject[tmpObjectPropertyName];}else{// Now is the point in recursion to return the value in the address
return pObject[pAddress];}}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// BOXED ELEMENTS
// Test if the tmpNewAddress is an array or object
// Check if it's a boxed property
var _tmpBracketStartIndex3=tmpSubObjectName.indexOf('[');var _tmpBracketStopIndex3=tmpSubObjectName.indexOf(']');// Boxed elements look like this:
// 		MyValues[42]
// 		MyValues['Color']
// 		MyValues["Weight"]
// 		MyValues[`Diameter`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(_tmpBracketStartIndex3>0//    2) The end bracket has something between them
&&_tmpBracketStopIndex3>_tmpBracketStartIndex3//    3) There is data
&&_tmpBracketStopIndex3-_tmpBracketStartIndex3>1){var _tmpBoxedPropertyName6=tmpSubObjectName.substring(0,_tmpBracketStartIndex3).trim();var _tmpBoxedPropertyReference3=tmpSubObjectName.substring(_tmpBracketStartIndex3+1,_tmpBracketStopIndex3).trim();var _tmpBoxedPropertyNumber3=parseInt(_tmpBoxedPropertyReference3,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students[1].Tardy
//       BUT
//         StudentData.Sections.Algebra.Students is an object, so the [1].Tardy is not possible to access
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students["JaneDoe"].Grade
//       BUT
//         StudentData.Sections.Algebra.Students is an array, so the ["JaneDoe"].Grade is not possible to access
// TODO: Should this be an error or something?  Should we keep a log of failures like this?
if(Array.isArray(pObject[_tmpBoxedPropertyName6])==isNaN(_tmpBoxedPropertyNumber3)){return undefined;}// Check if the boxed property is an object.
if(_typeof(pObject[_tmpBoxedPropertyName6])!='object'){return undefined;}//This is a bracketed value
//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to reat it as a dynamic object property.
if(isNaN(_tmpBoxedPropertyNumber3)){// This isn't a number ... let's treat it as a dynanmic object property.
_tmpBoxedPropertyReference3=this.cleanWrapCharacters('"',_tmpBoxedPropertyReference3);_tmpBoxedPropertyReference3=this.cleanWrapCharacters('`',_tmpBoxedPropertyReference3);_tmpBoxedPropertyReference3=this.cleanWrapCharacters("'",_tmpBoxedPropertyReference3);// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);// Recurse directly into the subobject
return this.getValueAtAddress(pObject[_tmpBoxedPropertyName6][_tmpBoxedPropertyReference3],tmpNewAddress,tmpParentAddress);}else{// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);// We parsed a valid number out of the boxed property name, so recurse into the array
return this.getValueAtAddress(pObject[_tmpBoxedPropertyName6][_tmpBoxedPropertyNumber3],tmpNewAddress,tmpParentAddress);}}// The requirements to detect a boxed set element are:
//    1) The start bracket is after character 0
else if(_tmpBracketStartIndex3>0//    2) The end bracket is after the start bracket
&&_tmpBracketStopIndex3>_tmpBracketStartIndex3//    3) There is nothing in the brackets
&&_tmpBracketStopIndex3-_tmpBracketStartIndex3==1){var _tmpBoxedPropertyName7=pAddress.substring(0,_tmpBracketStartIndex3).trim();if(!Array.isArray(pObject[_tmpBoxedPropertyName7])){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the array and grab the addresses from there.
var tmpArrayProperty=pObject[_tmpBoxedPropertyName7];// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpBoxedPropertyName7);// The container object is where we have the "Address":SOMEVALUE pairs
var tmpContainerObject={};for(var _i13=0;_i13<tmpArrayProperty.length;_i13++){var tmpPropertyParentAddress="".concat(tmpParentAddress,"[").concat(_i13,"]");var tmpValue=this.getValueAtAddress(pObject[_tmpBoxedPropertyName7][_i13],tmpNewAddress,tmpPropertyParentAddress);tmpContainerObject["".concat(tmpPropertyParentAddress,".").concat(tmpNewAddress)]=tmpValue;}return tmpContainerObject;}// OBJECT SET
// Note this will not work with a bracket in the same address box set
var _tmpObjectTypeMarkerIndex2=pAddress.indexOf('{}');if(_tmpObjectTypeMarkerIndex2>0){var _tmpObjectPropertyName2=pAddress.substring(0,_tmpObjectTypeMarkerIndex2).trim();if(_typeof(pObject[_tmpObjectPropertyName2])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the Object and grab the addresses from there.
var tmpObjectProperty=pObject[_tmpObjectPropertyName2];var tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpObjectPropertyName2);// The container object is where we have the "Address":SOMEVALUE pairs
var _tmpContainerObject2={};for(var _i14=0;_i14<tmpObjectPropertyKeys.length;_i14++){var _tmpPropertyParentAddress2="".concat(tmpParentAddress,".").concat(tmpObjectPropertyKeys[_i14]);var _tmpValue8=this.getValueAtAddress(pObject[_tmpObjectPropertyName2][tmpObjectPropertyKeys[_i14]],tmpNewAddress,_tmpPropertyParentAddress2);// The filtering is complex but allows config-based metaprogramming directly from schema
var _tmpKeepRecord2=this.checkFilters(pAddress,_tmpValue8);if(_tmpKeepRecord2){_tmpContainerObject2["".concat(_tmpPropertyParentAddress2,".").concat(tmpNewAddress)]=_tmpValue8;}}return _tmpContainerObject2;}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}else{// Create a subobject and then pass that
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);pObject[tmpSubObjectName]={};return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}}}}]);return ManyfestObjectAddressResolverGetValue;}();;module.exports=ManyfestObjectAddressResolverGetValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"elucidator":31,"precedent":95}],89:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var libPrecedent=require('precedent');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');/**
* Object Address Resolver - SetValue
*
* IMPORTANT NOTE: This code is intentionally more verbose than necessary, to
*                 be extremely clear what is going on in the recursion for
*                 each of the three address resolution functions.
*
*                 Although there is some opportunity to repeat ourselves a
*                 bit less in this codebase (e.g. with detection of arrays
*                 versus objects versus direct properties), it can make
*                 debugging.. challenging.  The minified version of the code
*                 optimizes out almost anything repeated in here.  So please
*                 be kind and rewind... meaning please keep the codebase less
*                 terse and more verbose so humans can comprehend it.
*
*
* @class ManyfestObjectAddressSetValue
*/var ManyfestObjectAddressSetValue=/*#__PURE__*/function(){function ManyfestObjectAddressSetValue(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestObjectAddressSetValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}// Set the value of an element at an address
_createClass(ManyfestObjectAddressSetValue,[{key:"setValueAtAddress",value:function setValueAtAddress(pObject,pAddress,pValue){// Make sure pObject is an object
if(_typeof(pObject)!='object')return false;// Make sure pAddress is a string
if(typeof pAddress!='string')return false;var tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex==-1){// Check if it's a boxed property
var tmpBracketStartIndex=pAddress.indexOf('[');var tmpBracketStopIndex=pAddress.indexOf(']');// Boxed elements look like this:
// 		MyValues[10]
// 		MyValues['Name']
// 		MyValues["Age"]
// 		MyValues[`Cost`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(tmpBracketStartIndex>0//    2) The end bracket has something between them
&&tmpBracketStopIndex>tmpBracketStartIndex//    3) There is data
&&tmpBracketStopIndex-tmpBracketStartIndex>1){// The "Name" of the Object contained too the left of the bracket
var tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();// If the subproperty doesn't test as a proper Object, none of the rest of this is possible.
// This is a rare case where Arrays testing as Objects is useful
if(_typeof(pObject[tmpBoxedPropertyName])!=='object'){return false;}// The "Reference" to the property within it, either an array element or object property
var tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();// Attempt to parse the reference as a number, which will be used as an array element
var tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to treat it as a dynamic object property.
if(isNaN(tmpBoxedPropertyNumber)){// This isn't a number ... let's treat it as a dynamic object property.
// We would expect the property to be wrapped in some kind of quotes so strip them
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);// Return the value in the property
pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference]=pValue;return true;}else{pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber]=pValue;return true;}}else{// Now is the time in recursion to set the value in the object
pObject[pAddress]=pValue;return true;}}else{var tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);var tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);// Test if the tmpNewAddress is an array or object
// Check if it's a boxed property
var _tmpBracketStartIndex4=tmpSubObjectName.indexOf('[');var _tmpBracketStopIndex4=tmpSubObjectName.indexOf(']');// Boxed elements look like this:
// 		MyValues[42]
// 		MyValues['Color']
// 		MyValues["Weight"]
// 		MyValues[`Diameter`]
//
// When we are passed SomeObject["Name"] this code below recurses as if it were SomeObject.Name
// The requirements to detect a boxed element are:
//    1) The start bracket is after character 0
if(_tmpBracketStartIndex4>0//    2) The end bracket has something between them
&&_tmpBracketStopIndex4>_tmpBracketStartIndex4//    3) There is data
&&_tmpBracketStopIndex4-_tmpBracketStartIndex4>1){var _tmpBoxedPropertyName8=tmpSubObjectName.substring(0,_tmpBracketStartIndex4).trim();var _tmpBoxedPropertyReference4=tmpSubObjectName.substring(_tmpBracketStartIndex4+1,_tmpBracketStopIndex4).trim();var _tmpBoxedPropertyNumber4=parseInt(_tmpBoxedPropertyReference4,10);// Guard: If the referrant is a number and the boxed property is not an array, or vice versa, return undefined.
//        This seems confusing to me at first read, so explaination:
//        Is the Boxed Object an Array?  TRUE
//        And is the Reference inside the boxed Object not a number? TRUE
//        -->  So when these are in agreement, it's an impossible access state
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students[1].Tardy
//       BUT
//         StudentData.Sections.Algebra.Students is an object, so the [1].Tardy is not possible to access
// This could be a failure in the recursion chain because they passed something like this in:
//    StudentData.Sections.Algebra.Students["JaneDoe"].Grade
//       BUT
//         StudentData.Sections.Algebra.Students is an array, so the ["JaneDoe"].Grade is not possible to access
// TODO: Should this be an error or something?  Should we keep a log of failures like this?
if(Array.isArray(pObject[_tmpBoxedPropertyName8])==isNaN(_tmpBoxedPropertyNumber4)){return false;}//This is a bracketed value
//    4) If the middle part is *only* a number (no single, double or backtick quotes) it is an array element,
//       otherwise we will try to reat it as a dynamic object property.
if(isNaN(_tmpBoxedPropertyNumber4)){// This isn't a number ... let's treat it as a dynanmic object property.
_tmpBoxedPropertyReference4=this.cleanWrapCharacters('"',_tmpBoxedPropertyReference4);_tmpBoxedPropertyReference4=this.cleanWrapCharacters('`',_tmpBoxedPropertyReference4);_tmpBoxedPropertyReference4=this.cleanWrapCharacters("'",_tmpBoxedPropertyReference4);// Recurse directly into the subobject
return this.setValueAtAddress(pObject[_tmpBoxedPropertyName8][_tmpBoxedPropertyReference4],tmpNewAddress,pValue);}else{// We parsed a valid number out of the boxed property name, so recurse into the array
return this.setValueAtAddress(pObject[_tmpBoxedPropertyName8][_tmpBoxedPropertyNumber4],tmpNewAddress,pValue);}}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){if(!pObject.hasOwnProperty('__ERROR'))pObject['__ERROR']={};// Put it in an error object so data isn't lost
pObject['__ERROR'][pAddress]=pValue;return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}else{// Create a subobject and then pass that
pObject[tmpSubObjectName]={};return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}}}}]);return ManyfestObjectAddressSetValue;}();;module.exports=ManyfestObjectAddressSetValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"precedent":95}],90:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');/**
* Object Address Generation
*
* Automagically generate addresses and properties based on a passed-in object,
* to be used for easy creation of schemas.  Meant to simplify the lives of
* developers wanting to create schemas without typing a bunch of stuff.
*
* IMPORTANT NOTE: This code is intentionally more verbose than necessary, to
*                 be extremely clear what is going on in the recursion for
*                 each of the three address resolution functions.
*
*                 Although there is some opportunity to repeat ourselves a
*                 bit less in this codebase (e.g. with detection of arrays
*                 versus objects versus direct properties), it can make
*                 debugging.. challenging.  The minified version of the code
*                 optimizes out almost anything repeated in here.  So please
*                 be kind and rewind... meaning please keep the codebase less
*                 terse and more verbose so humans can comprehend it.
*
*
* @class ManyfestObjectAddressGeneration
*/var ManyfestObjectAddressGeneration=/*#__PURE__*/function(){function ManyfestObjectAddressGeneration(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestObjectAddressGeneration);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;}// generateAddressses
//
// This flattens an object into a set of key:value pairs for *EVERY SINGLE
// POSSIBLE ADDRESS* in the object.  It can get ... really insane really
// quickly.  This is not meant to be used directly to generate schemas, but
// instead as a starting point for scripts or UIs.
//
// This will return a mega set of key:value pairs with all possible schema
// permutations and default values (when not an object) and everything else.
_createClass(ManyfestObjectAddressGeneration,[{key:"generateAddressses",value:function generateAddressses(pObject,pBaseAddress,pSchema){var tmpBaseAddress=typeof pBaseAddress=='string'?pBaseAddress:'';var tmpSchema=_typeof(pSchema)=='object'?pSchema:{};var tmpObjectType=_typeof(pObject);var tmpSchemaObjectEntry={Address:tmpBaseAddress,Hash:tmpBaseAddress,Name:tmpBaseAddress,// This is so scripts and UI controls can force a developer to opt-in.
InSchema:false};if(tmpObjectType=='object'&&pObject==null){tmpObjectType='null';}switch(tmpObjectType){case'string':tmpSchemaObjectEntry.DataType='String';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'number':case'bigint':tmpSchemaObjectEntry.DataType='Number';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'undefined':case'null':tmpSchemaObjectEntry.DataType='Any';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'object':if(Array.isArray(pObject)){tmpSchemaObjectEntry.DataType='Array';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;}for(var i=0;i<pObject.length;i++){this.generateAddressses(pObject[i],"".concat(tmpBaseAddress,"[").concat(i,"]"),tmpSchema);}}else{tmpSchemaObjectEntry.DataType='Object';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;tmpBaseAddress+='.';}var tmpObjectProperties=Object.keys(pObject);for(var _i15=0;_i15<tmpObjectProperties.length;_i15++){this.generateAddressses(pObject[tmpObjectProperties[_i15]],"".concat(tmpBaseAddress).concat(tmpObjectProperties[_i15]),tmpSchema);}}break;case'symbol':case'function':// Symbols and functions neither recurse nor get added to the schema
break;}return tmpSchema;}}]);return ManyfestObjectAddressGeneration;}();;module.exports=ManyfestObjectAddressGeneration;},{"./Manyfest-LogToConsole.js":85}],91:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');/**
* Schema Manipulation Functions
*
* @class ManyfestSchemaManipulation
*/var ManyfestSchemaManipulation=/*#__PURE__*/function(){function ManyfestSchemaManipulation(pInfoLog,pErrorLog){_classCallCheck(this,ManyfestSchemaManipulation);// Wire in logging
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;}// This translates the default address mappings to something different.
//
// For instance you can pass in manyfest schema descriptor object:
// 	{
//	  "Address.Of.a": { "Hash": "a", "Type": "Number" },
//	  "Address.Of.b": { "Hash": "b", "Type": "Number" }
//  }
//
//
// And then an address mapping (basically a Hash->Address map)
//  {
//    "a": "New.Address.Of.a",
//    "b": "New.Address.Of.b"
//  }
//
// NOTE: This mutates the schema object permanently, altering the base hash.
//       If there is a collision with an existing address, it can lead to overwrites.
// TODO: Discuss what should happen on collisions.
_createClass(ManyfestSchemaManipulation,[{key:"resolveAddressMappings",value:function resolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){if(_typeof(pManyfestSchemaDescriptors)!='object'){this.logError("Attempted to resolve address mapping but the descriptor was not an object.");return false;}if(_typeof(pAddressMapping)!='object'){// No mappings were passed in
return true;}// Get the arrays of both the schema definition and the hash mapping
var tmpManyfestAddresses=Object.keys(pManyfestSchemaDescriptors);var tmpHashMapping={};tmpManyfestAddresses.forEach(function(pAddress){if(pManyfestSchemaDescriptors[pAddress].hasOwnProperty('Hash')){tmpHashMapping[pManyfestSchemaDescriptors[pAddress].Hash]=pAddress;}});var tmpAddressMappingSet=Object.keys(pAddressMapping);tmpAddressMappingSet.forEach(function(pInputAddress){var tmpNewDescriptorAddress=pAddressMapping[pInputAddress];var tmpOldDescriptorAddress=false;var tmpDescriptor=false;// See if there is a matching descriptor either by Address directly or Hash
if(pManyfestSchemaDescriptors.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=pInputAddress;}else if(tmpHashMapping.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=tmpHashMapping[pInputAddress];}// If there was a matching descriptor in the manifest, store it in the temporary descriptor
if(tmpOldDescriptorAddress){tmpDescriptor=pManyfestSchemaDescriptors[tmpOldDescriptorAddress];delete pManyfestSchemaDescriptors[tmpOldDescriptorAddress];}else{// Create a new descriptor!  Map it to the input address.
tmpDescriptor={Hash:pInputAddress};}// Now re-add the descriptor to the manyfest schema
pManyfestSchemaDescriptors[tmpNewDescriptorAddress]=tmpDescriptor;});return true;}},{key:"safeResolveAddressMappings",value:function safeResolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){// This returns the descriptors as a new object, safely remapping without mutating the original schema Descriptors
var tmpManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptors));this.resolveAddressMappings(tmpManyfestSchemaDescriptors,pAddressMapping);return tmpManyfestSchemaDescriptors;}},{key:"mergeAddressMappings",value:function mergeAddressMappings(pManyfestSchemaDescriptorsDestination,pManyfestSchemaDescriptorsSource){if(_typeof(pManyfestSchemaDescriptorsSource)!='object'||_typeof(pManyfestSchemaDescriptorsDestination)!='object'){this.logError("Attempted to merge two schema descriptors but both were not objects.");return false;}var tmpSource=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsSource));var tmpNewManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsDestination));// The first passed-in set of descriptors takes precedence.
var tmpDescriptorAddresses=Object.keys(tmpSource);tmpDescriptorAddresses.forEach(function(pDescriptorAddress){if(!tmpNewManyfestSchemaDescriptors.hasOwnProperty(pDescriptorAddress)){tmpNewManyfestSchemaDescriptors[pDescriptorAddress]=tmpSource[pDescriptorAddress];}});return tmpNewManyfestSchemaDescriptors;}}]);return ManyfestSchemaManipulation;}();module.exports=ManyfestSchemaManipulation;},{"./Manyfest-LogToConsole.js":85}],92:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var libPrecedent=require('precedent');var libHashTranslation=require('./Manyfest-HashTranslation.js');var libObjectAddressCheckAddressExists=require('./Manyfest-ObjectAddress-CheckAddressExists.js');var libObjectAddressGetValue=require('./Manyfest-ObjectAddress-GetValue.js');var libObjectAddressSetValue=require('./Manyfest-ObjectAddress-SetValue.js');var libObjectAddressDeleteValue=require('./Manyfest-ObjectAddress-DeleteValue.js');var libObjectAddressGeneration=require('./Manyfest-ObjectAddressGeneration.js');var libSchemaManipulation=require('./Manyfest-SchemaManipulation.js');var _DefaultConfiguration={Scope:'Default',Descriptors:{}};/**
* Manyfest object address-based descriptions and manipulations.
*
* @class Manyfest
*/var Manyfest=/*#__PURE__*/function(){function Manyfest(pManifest,pInfoLog,pErrorLog,pOptions){_classCallCheck(this,Manyfest);// Wire in logging
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;// Create an object address resolver and map in the functions
this.objectAddressCheckAddressExists=new libObjectAddressCheckAddressExists(this.logInfo,this.logError);this.objectAddressGetValue=new libObjectAddressGetValue(this.logInfo,this.logError);this.objectAddressSetValue=new libObjectAddressSetValue(this.logInfo,this.logError);this.objectAddressDeleteValue=new libObjectAddressDeleteValue(this.logInfo,this.logError);this.options={strict:false,defaultValues:{"String":"","Number":0,"Float":0.0,"Integer":0,"Boolean":false,"Binary":0,"DateTime":0,"Array":[],"Object":{},"Null":null}};this.scope=undefined;this.elementAddresses=undefined;this.elementHashes=undefined;this.elementDescriptors=undefined;// This can cause a circular dependency chain, so it only gets initialized if the schema specifically calls for it.
this.dataSolvers=undefined;// So solvers can use their own state
this.dataSolverState=undefined;this.reset();if(_typeof(pManifest)==='object'){this.loadManifest(pManifest);}this.schemaManipulations=new libSchemaManipulation(this.logInfo,this.logError);this.objectAddressGeneration=new libObjectAddressGeneration(this.logInfo,this.logError);this.hashTranslations=new libHashTranslation(this.logInfo,this.logError);}/*************************************************************************
	 * Schema Manifest Loading, Reading, Manipulation and Serialization Functions
	 */ // Reset critical manifest properties
_createClass(Manyfest,[{key:"reset",value:function reset(){this.scope='DEFAULT';this.elementAddresses=[];this.elementHashes={};this.elementDescriptors={};this.dataSolvers=undefined;this.dataSolverState={};this.libElucidator=undefined;}},{key:"setElucidatorSolvers",value:function setElucidatorSolvers(pElucidatorSolver,pElucidatorSolverState){this.objectAddressCheckAddressExists.elucidatorSolver=pElucidatorSolver;this.objectAddressGetValue.elucidatorSolver=pElucidatorSolver;this.objectAddressSetValue.elucidatorSolver=pElucidatorSolver;this.objectAddressDeleteValue.elucidatorSolver=pElucidatorSolver;this.objectAddressCheckAddressExists.elucidatorSolverState=pElucidatorSolverState;this.objectAddressGetValue.elucidatorSolverState=pElucidatorSolverState;this.objectAddressSetValue.elucidatorSolverState=pElucidatorSolverState;this.objectAddressDeleteValue.elucidatorSolverState=pElucidatorSolverState;}},{key:"clone",value:function clone(){// Make a copy of the options in-place
var tmpNewOptions=JSON.parse(JSON.stringify(this.options));var tmpNewManyfest=new Manyfest(this.getManifest(),this.logInfo,this.logError,tmpNewOptions);// Import the hash translations
tmpNewManyfest.hashTranslations.addTranslation(this.hashTranslations.translationTable);return tmpNewManyfest;}// Deserialize a Manifest from a string
},{key:"deserialize",value:function deserialize(pManifestString){// TODO: Add guards for bad manifest string
return this.loadManifest(JSON.parse(pManifestString));}// Load a manifest from an object
},{key:"loadManifest",value:function loadManifest(pManifest){if(_typeof(pManifest)!=='object'){this.logError("(".concat(this.scope,") Error loading manifest; expecting an object but parameter was type ").concat(_typeof(pManifest),"."));}var tmpManifest=_typeof(pManifest)=='object'?pManifest:{};if(tmpManifest.hasOwnProperty('Scope')){if(typeof tmpManifest.Scope==='string'){this.scope=tmpManifest.Scope;}else{this.logError("(".concat(this.scope,") Error loading scope from manifest; expecting a string but property was type ").concat(_typeof(tmpManifest.Scope),"."),tmpManifest);}}else{this.logError("(".concat(this.scope,") Error loading scope from manifest object.  Property \"Scope\" does not exist in the root of the object."),tmpManifest);}if(tmpManifest.hasOwnProperty('Descriptors')){if(_typeof(tmpManifest.Descriptors)==='object'){var tmpDescriptionAddresses=Object.keys(tmpManifest.Descriptors);for(var i=0;i<tmpDescriptionAddresses.length;i++){this.addDescriptor(tmpDescriptionAddresses[i],tmpManifest.Descriptors[tmpDescriptionAddresses[i]]);}}else{this.logError("(".concat(this.scope,") Error loading description object from manifest object.  Expecting an object in 'Manifest.Descriptors' but the property was type ").concat(_typeof(tmpManifest.Descriptors),"."),tmpManifest);}}else{this.logError("(".concat(this.scope,") Error loading object description from manifest object.  Property \"Descriptors\" does not exist in the root of the Manifest object."),tmpManifest);}// This seems like it would create a circular dependency issue but it only goes as deep as the schema defines Solvers
if(tmpManifest.hasOwnProperty('Solvers')&&_typeof(tmpManifest.Solvers)=='object'){// There are elucidator solvers passed-in, so we will create one to filter data.
var libElucidator=require('elucidator');// WARNING THESE CAN MUTATE THE DATA
// The pattern for the solver is: {<~~SolverName~~>} anywhere in a property.
//   Yes, this means your Javascript elements can't have my self-styled jellyfish brackets in them.
//   This does, though, mean we can filter at multiple layers safely.
//   Because these can be put at any address
// The solver themselves:
//   They are passed-in an object, and the current record is in the Record subobject.
//   Basic operations can just write to the root object but...
//   IF YOU PERMUTE THE Record SUBOBJECT YOU CAN AFFECT RECURSION
// This is mostly meant for if statements to filter.
//   Basically on aggregation, if a filter is set it will set "keep record" to true and let the solver decide differently.
// Please refresh yourself on the complex metaprogramming mechanics of both the manyfest DSL and the elucidator configuration permutation before changing any of this.
//   You broke it.  You bought it.
this.dataSolvers=new libElucidator(tmpManifest.Solvers,this.logInfo,this.logError);// Load the solver state in so each instruction can have internal config
var tmpSolverKeys=Object.keys(tmpManifest.Solvers);for(var _i16=0;_i16<tmpSolverKeys.length;_i16++){// Each of these are passed through the metatemplate.
this.dataSolverState[tmpSolverKeys]=tmpManifest.Solvers[tmpSolverKeys[_i16]];}this.setElucidatorSolvers(this.dataSolvers,this.dataSolverState);}}// Serialize the Manifest to a string
// TODO: Should this also serialize the translation table?
},{key:"serialize",value:function serialize(){return JSON.stringify(this.getManifest());}},{key:"getManifest",value:function getManifest(){return{Scope:this.scope,Descriptors:JSON.parse(JSON.stringify(this.elementDescriptors))};}// Add a descriptor to the manifest
},{key:"addDescriptor",value:function addDescriptor(pAddress,pDescriptor){if(_typeof(pDescriptor)==='object'){// Add the Address into the Descriptor if it doesn't exist:
if(!pDescriptor.hasOwnProperty('Address')){pDescriptor.Address=pAddress;}if(!this.elementDescriptors.hasOwnProperty(pAddress)){this.elementAddresses.push(pAddress);}// Add the element descriptor to the schema
this.elementDescriptors[pAddress]=pDescriptor;// Always add the address as a hash
this.elementHashes[pAddress]=pAddress;if(pDescriptor.hasOwnProperty('Hash')){// TODO: Check if this is a good idea or not..
//       Collisions are bound to happen with both representations of the address/hash in here and developers being able to create their own hashes.
this.elementHashes[pDescriptor.Hash]=pAddress;}else{pDescriptor.Hash=pAddress;}return true;}else{this.logError("(".concat(this.scope,") Error loading object descriptor for address '").concat(pAddress,"' from manifest object.  Expecting an object but property was type ").concat(_typeof(pDescriptor),"."));return false;}}},{key:"getDescriptorByHash",value:function getDescriptorByHash(pHash){return this.getDescriptor(this.resolveHashAddress(pHash));}},{key:"getDescriptor",value:function getDescriptor(pAddress){return this.elementDescriptors[pAddress];}// execute an action function for each descriptor
},{key:"eachDescriptor",value:function eachDescriptor(fAction){var tmpDescriptorAddresses=Object.keys(this.elementDescriptors);for(var i=0;i<tmpDescriptorAddresses.length;i++){fAction(this.elementDescriptors[tmpDescriptorAddresses[i]]);}}/*************************************************************************
	 * Beginning of Object Manipulation (read & write) Functions
	 */ // Check if an element exists by its hash
},{key:"checkAddressExistsByHash",value:function checkAddressExistsByHash(pObject,pHash){return this.checkAddressExists(pObject,this.resolveHashAddress(pHash));}// Check if an element exists at an address
},{key:"checkAddressExists",value:function checkAddressExists(pObject,pAddress){return this.objectAddressCheckAddressExists.checkAddressExists(pObject,pAddress);}// Turn a hash into an address, factoring in the translation table.
},{key:"resolveHashAddress",value:function resolveHashAddress(pHash){var tmpAddress=undefined;var tmpInElementHashTable=this.elementHashes.hasOwnProperty(pHash);var tmpInTranslationTable=this.hashTranslations.translationTable.hasOwnProperty(pHash);// The most straightforward: the hash exists, no translations.
if(tmpInElementHashTable&&!tmpInTranslationTable){tmpAddress=this.elementHashes[pHash];}// There is a translation from one hash to another, and, the elementHashes contains the pointer end
else if(tmpInTranslationTable&&this.elementHashes.hasOwnProperty(this.hashTranslations.translate(pHash))){tmpAddress=this.elementHashes[this.hashTranslations.translate(pHash)];}// Use the level of indirection only in the Translation Table
else if(tmpInTranslationTable){tmpAddress=this.hashTranslations.translate(pHash);}// Just treat the hash as an address.
// TODO: Discuss this ... it is magic but controversial
else{tmpAddress=pHash;}return tmpAddress;}// Get the value of an element by its hash
},{key:"getValueByHash",value:function getValueByHash(pObject,pHash){var tmpValue=this.getValueAtAddress(pObject,this.resolveHashAddress(pHash));if(typeof tmpValue=='undefined'){// Try to get a default if it exists
tmpValue=this.getDefaultValue(this.getDescriptorByHash(pHash));}return tmpValue;}// Get the value of an element at an address
},{key:"getValueAtAddress",value:function getValueAtAddress(pObject,pAddress){var tmpValue=this.objectAddressGetValue.getValueAtAddress(pObject,pAddress);if(typeof tmpValue=='undefined'){// Try to get a default if it exists
tmpValue=this.getDefaultValue(this.getDescriptor(pAddress));}return tmpValue;}// Set the value of an element by its hash
},{key:"setValueByHash",value:function setValueByHash(pObject,pHash,pValue){return this.setValueAtAddress(pObject,this.resolveHashAddress(pHash),pValue);}// Set the value of an element at an address
},{key:"setValueAtAddress",value:function setValueAtAddress(pObject,pAddress,pValue){return this.objectAddressSetValue.setValueAtAddress(pObject,pAddress,pValue);}// Delete the value of an element by its hash
},{key:"deleteValueByHash",value:function deleteValueByHash(pObject,pHash,pValue){return this.deleteValueAtAddress(pObject,this.resolveHashAddress(pHash),pValue);}// Delete the value of an element at an address
},{key:"deleteValueAtAddress",value:function deleteValueAtAddress(pObject,pAddress,pValue){return this.objectAddressDeleteValue.deleteValueAtAddress(pObject,pAddress,pValue);}// Validate the consistency of an object against the schema
},{key:"validate",value:function validate(pObject){var tmpValidationData={Error:null,Errors:[],MissingElements:[]};if(_typeof(pObject)!=='object'){tmpValidationData.Error=true;tmpValidationData.Errors.push("Expected passed in object to be type object but was passed in ".concat(_typeof(pObject)));}var addValidationError=function addValidationError(pAddress,pErrorMessage){tmpValidationData.Error=true;tmpValidationData.Errors.push("Element at address \"".concat(pAddress,"\" ").concat(pErrorMessage,"."));};// Now enumerate through the values and check for anomalies based on the schema
for(var i=0;i<this.elementAddresses.length;i++){var tmpDescriptor=this.getDescriptor(this.elementAddresses[i]);var tmpValueExists=this.checkAddressExists(pObject,tmpDescriptor.Address);var tmpValue=this.getValueAtAddress(pObject,tmpDescriptor.Address);if(typeof tmpValue=='undefined'||!tmpValueExists){// This will technically mean that `Object.Some.Value = undefined` will end up showing as "missing"
// TODO: Do we want to do a different message based on if the property exists but is undefined?
tmpValidationData.MissingElements.push(tmpDescriptor.Address);if(tmpDescriptor.Required||this.options.strict){addValidationError(tmpDescriptor.Address,'is flagged REQUIRED but is not set in the object');}}// Now see if there is a data type specified for this element
if(tmpDescriptor.DataType){var tmpElementType=_typeof(tmpValue);switch(tmpDescriptor.DataType.toString().trim().toLowerCase()){case'string':if(tmpElementType!='string'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but is of the type ").concat(tmpElementType));}break;case'number':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but is of the type ").concat(tmpElementType));}break;case'integer':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but is of the type ").concat(tmpElementType));}else{var tmpValueString=tmpValue.toString();if(tmpValueString.indexOf('.')>-1){// TODO: Is this an error?
addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but has a decimal point in the number."));}}break;case'float':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but is of the type ").concat(tmpElementType));}break;case'DateTime':var tmpValueDate=new Date(tmpValue);if(tmpValueDate.toString()=='Invalid Date'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," but is not parsable as a Date by Javascript"));}default:// Check if this is a string, in the default case
// Note this is only when a DataType is specified and it is an unrecognized data type.
if(tmpElementType!='string'){addValidationError(tmpDescriptor.Address,"has a DataType ".concat(tmpDescriptor.DataType," (which auto-converted to String because it was unrecognized) but is of the type ").concat(tmpElementType));}break;}}}return tmpValidationData;}// Returns a default value, or, the default value for the data type (which is overridable with configuration)
},{key:"getDefaultValue",value:function getDefaultValue(pDescriptor){if(_typeof(pDescriptor)!='object'){return undefined;}if(pDescriptor.hasOwnProperty('Default')){return pDescriptor.Default;}else{// Default to a null if it doesn't have a type specified.
// This will ensure a placeholder is created but isn't misinterpreted.
var tmpDataType=pDescriptor.hasOwnProperty('DataType')?pDescriptor.DataType:'String';if(this.options.defaultValues.hasOwnProperty(tmpDataType)){return this.options.defaultValues[tmpDataType];}else{// give up and return null
return null;}}}// Enumerate through the schema and populate default values if they don't exist.
},{key:"populateDefaults",value:function populateDefaults(pObject,pOverwriteProperties){return this.populateObject(pObject,pOverwriteProperties,// This just sets up a simple filter to see if there is a default set.
function(pDescriptor){return pDescriptor.hasOwnProperty('Default');});}// Forcefully populate all values even if they don't have defaults.
// Based on type, this can do unexpected things.
},{key:"populateObject",value:function populateObject(pObject,pOverwriteProperties,fFilter){var _this31=this;// Automatically create an object if one isn't passed in.
var tmpObject=_typeof(pObject)==='object'?pObject:{};// Default to *NOT OVERWRITING* properties
var tmpOverwriteProperties=typeof pOverwriteProperties=='undefined'?false:pOverwriteProperties;// This is a filter function, which is passed the schema and allows complex filtering of population
// The default filter function just returns true, populating everything.
var tmpFilterFunction=typeof fFilter=='function'?fFilter:function(pDescriptor){return true;};this.elementAddresses.forEach(function(pAddress){var tmpDescriptor=_this31.getDescriptor(pAddress);// Check the filter function to see if this is an address we want to set the value for.
if(tmpFilterFunction(tmpDescriptor)){// If we are overwriting properties OR the property does not exist
if(tmpOverwriteProperties||!_this31.checkAddressExists(tmpObject,pAddress)){_this31.setValueAtAddress(tmpObject,pAddress,_this31.getDefaultValue(tmpDescriptor));}}});return tmpObject;}}]);return Manyfest;}();;module.exports=Manyfest;},{"./Manyfest-HashTranslation.js":84,"./Manyfest-LogToConsole.js":85,"./Manyfest-ObjectAddress-CheckAddressExists.js":86,"./Manyfest-ObjectAddress-DeleteValue.js":87,"./Manyfest-ObjectAddress-GetValue.js":88,"./Manyfest-ObjectAddress-SetValue.js":89,"./Manyfest-ObjectAddressGeneration.js":90,"./Manyfest-SchemaManipulation.js":91,"elucidator":31,"precedent":95}],93:[function(require,module,exports){/*global define:false */ /**
 * Copyright 2012-2017 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.6.5
 * @url craig.is/killing/mice
 */(function(window,document,undefined){// Check if mousetrap is used inside browser, if not, return
if(!window){return;}/**
     * mapping of special keycodes to their corresponding keys
     *
     * everything in this dictionary cannot use keypress events
     * so it has to be here to map to the correct keycodes for
     * keyup/keydown events
     *
     * @type {Object}
     */var _MAP={8:'backspace',9:'tab',13:'enter',16:'shift',17:'ctrl',18:'alt',20:'capslock',27:'esc',32:'space',33:'pageup',34:'pagedown',35:'end',36:'home',37:'left',38:'up',39:'right',40:'down',45:'ins',46:'del',91:'meta',93:'meta',224:'meta'};/**
     * mapping for special characters so they can support
     *
     * this dictionary is only used incase you want to bind a
     * keyup or keydown event to one of these keys
     *
     * @type {Object}
     */var _KEYCODE_MAP={106:'*',107:'+',109:'-',110:'.',111:'/',186:';',187:'=',188:',',189:'-',190:'.',191:'/',192:'`',219:'[',220:'\\',221:']',222:'\''};/**
     * this is a mapping of keys that require shift on a US keypad
     * back to the non shift equivelents
     *
     * this is so you can use keyup events with these keys
     *
     * note that this will only work reliably on US keyboards
     *
     * @type {Object}
     */var _SHIFT_MAP={'~':'`','!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7','*':'8','(':'9',')':'0','_':'-','+':'=',':':';','\"':'\'','<':',','>':'.','?':'/','|':'\\'};/**
     * this is a list of special strings you can use to map
     * to modifier keys when you specify your keyboard shortcuts
     *
     * @type {Object}
     */var _SPECIAL_ALIASES={'option':'alt','command':'meta','return':'enter','escape':'esc','plus':'+','mod':/Mac|iPod|iPhone|iPad/.test(navigator.platform)?'meta':'ctrl'};/**
     * variable to store the flipped version of _MAP from above
     * needed to check if we should use keypress or not when no action
     * is specified
     *
     * @type {Object|undefined}
     */var _REVERSE_MAP;/**
     * loop through the f keys, f1 to f19 and add them to the map
     * programatically
     */for(var i=1;i<20;++i){_MAP[111+i]='f'+i;}/**
     * loop through to map numbers on the numeric keypad
     */for(i=0;i<=9;++i){// This needs to use a string cause otherwise since 0 is falsey
// mousetrap will never fire for numpad 0 pressed as part of a keydown
// event.
//
// @see https://github.com/ccampbell/mousetrap/pull/258
_MAP[i+96]=i.toString();}/**
     * cross browser add event method
     *
     * @param {Element|HTMLDocument} object
     * @param {string} type
     * @param {Function} callback
     * @returns void
     */function _addEvent(object,type,callback){if(object.addEventListener){object.addEventListener(type,callback,false);return;}object.attachEvent('on'+type,callback);}/**
     * takes the event and returns the key character
     *
     * @param {Event} e
     * @return {string}
     */function _characterFromEvent(e){// for keypress events we should return the character as is
if(e.type=='keypress'){var character=String.fromCharCode(e.which);// if the shift key is not pressed then it is safe to assume
// that we want the character to be lowercase.  this means if
// you accidentally have caps lock on then your key bindings
// will continue to work
//
// the only side effect that might not be desired is if you
// bind something like 'A' cause you want to trigger an
// event when capital A is pressed caps lock will no longer
// trigger the event.  shift+a will though.
if(!e.shiftKey){character=character.toLowerCase();}return character;}// for non keypress events the special maps are needed
if(_MAP[e.which]){return _MAP[e.which];}if(_KEYCODE_MAP[e.which]){return _KEYCODE_MAP[e.which];}// if it is not in the special map
// with keydown and keyup events the character seems to always
// come in as an uppercase character whether you are pressing shift
// or not.  we should make sure it is always lowercase for comparisons
return String.fromCharCode(e.which).toLowerCase();}/**
     * checks if two arrays are equal
     *
     * @param {Array} modifiers1
     * @param {Array} modifiers2
     * @returns {boolean}
     */function _modifiersMatch(modifiers1,modifiers2){return modifiers1.sort().join(',')===modifiers2.sort().join(',');}/**
     * takes a key event and figures out what the modifiers are
     *
     * @param {Event} e
     * @returns {Array}
     */function _eventModifiers(e){var modifiers=[];if(e.shiftKey){modifiers.push('shift');}if(e.altKey){modifiers.push('alt');}if(e.ctrlKey){modifiers.push('ctrl');}if(e.metaKey){modifiers.push('meta');}return modifiers;}/**
     * prevents default for this event
     *
     * @param {Event} e
     * @returns void
     */function _preventDefault(e){if(e.preventDefault){e.preventDefault();return;}e.returnValue=false;}/**
     * stops propogation for this event
     *
     * @param {Event} e
     * @returns void
     */function _stopPropagation(e){if(e.stopPropagation){e.stopPropagation();return;}e.cancelBubble=true;}/**
     * determines if the keycode specified is a modifier key or not
     *
     * @param {string} key
     * @returns {boolean}
     */function _isModifier(key){return key=='shift'||key=='ctrl'||key=='alt'||key=='meta';}/**
     * reverses the map lookup so that we can look for specific keys
     * to see what can and can't use keypress
     *
     * @return {Object}
     */function _getReverseMap(){if(!_REVERSE_MAP){_REVERSE_MAP={};for(var key in _MAP){// pull out the numeric keypad from here cause keypress should
// be able to detect the keys from the character
if(key>95&&key<112){continue;}if(_MAP.hasOwnProperty(key)){_REVERSE_MAP[_MAP[key]]=key;}}}return _REVERSE_MAP;}/**
     * picks the best action based on the key combination
     *
     * @param {string} key - character for key
     * @param {Array} modifiers
     * @param {string=} action passed in
     */function _pickBestAction(key,modifiers,action){// if no action was picked in we should try to pick the one
// that we think would work best for this key
if(!action){action=_getReverseMap()[key]?'keydown':'keypress';}// modifier keys don't work as expected with keypress,
// switch to keydown
if(action=='keypress'&&modifiers.length){action='keydown';}return action;}/**
     * Converts from a string key combination to an array
     *
     * @param  {string} combination like "command+shift+l"
     * @return {Array}
     */function _keysFromString(combination){if(combination==='+'){return['+'];}combination=combination.replace(/\+{2}/g,'+plus');return combination.split('+');}/**
     * Gets info for a specific key combination
     *
     * @param  {string} combination key combination ("command+s" or "a" or "*")
     * @param  {string=} action
     * @returns {Object}
     */function _getKeyInfo(combination,action){var keys;var key;var i;var modifiers=[];// take the keys from this pattern and figure out what the actual
// pattern is all about
keys=_keysFromString(combination);for(i=0;i<keys.length;++i){key=keys[i];// normalize key names
if(_SPECIAL_ALIASES[key]){key=_SPECIAL_ALIASES[key];}// if this is not a keypress event then we should
// be smart about using shift keys
// this will only work for US keyboards however
if(action&&action!='keypress'&&_SHIFT_MAP[key]){key=_SHIFT_MAP[key];modifiers.push('shift');}// if this key is a modifier then add it to the list of modifiers
if(_isModifier(key)){modifiers.push(key);}}// depending on what the key combination is
// we will try to pick the best event for it
action=_pickBestAction(key,modifiers,action);return{key:key,modifiers:modifiers,action:action};}function _belongsTo(element,ancestor){if(element===null||element===document){return false;}if(element===ancestor){return true;}return _belongsTo(element.parentNode,ancestor);}function Mousetrap(targetElement){var self=this;targetElement=targetElement||document;if(!(self instanceof Mousetrap)){return new Mousetrap(targetElement);}/**
         * element to attach key events to
         *
         * @type {Element}
         */self.target=targetElement;/**
         * a list of all the callbacks setup via Mousetrap.bind()
         *
         * @type {Object}
         */self._callbacks={};/**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */self._directMap={};/**
         * keeps track of what level each sequence is at since multiple
         * sequences can start out with the same sequence
         *
         * @type {Object}
         */var _sequenceLevels={};/**
         * variable to store the setTimeout call
         *
         * @type {null|number}
         */var _resetTimer;/**
         * temporary state where we will ignore the next keyup
         *
         * @type {boolean|string}
         */var _ignoreNextKeyup=false;/**
         * temporary state where we will ignore the next keypress
         *
         * @type {boolean}
         */var _ignoreNextKeypress=false;/**
         * are we currently inside of a sequence?
         * type of action ("keyup" or "keydown" or "keypress") or false
         *
         * @type {boolean|string}
         */var _nextExpectedAction=false;/**
         * resets all sequence counters except for the ones passed in
         *
         * @param {Object} doNotReset
         * @returns void
         */function _resetSequences(doNotReset){doNotReset=doNotReset||{};var activeSequences=false,key;for(key in _sequenceLevels){if(doNotReset[key]){activeSequences=true;continue;}_sequenceLevels[key]=0;}if(!activeSequences){_nextExpectedAction=false;}}/**
         * finds all callbacks that match based on the keycode, modifiers,
         * and action
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event|Object} e
         * @param {string=} sequenceName - name of the sequence we are looking for
         * @param {string=} combination
         * @param {number=} level
         * @returns {Array}
         */function _getMatches(character,modifiers,e,sequenceName,combination,level){var i;var callback;var matches=[];var action=e.type;// if there are no events related to this keycode
if(!self._callbacks[character]){return[];}// if a modifier key is coming up on its own we should allow it
if(action=='keyup'&&_isModifier(character)){modifiers=[character];}// loop through all callbacks for the key that was pressed
// and see if any of them match
for(i=0;i<self._callbacks[character].length;++i){callback=self._callbacks[character][i];// if a sequence name is not specified, but this is a sequence at
// the wrong level then move onto the next match
if(!sequenceName&&callback.seq&&_sequenceLevels[callback.seq]!=callback.level){continue;}// if the action we are looking for doesn't match the action we got
// then we should keep going
if(action!=callback.action){continue;}// if this is a keypress event and the meta key and control key
// are not pressed that means that we need to only look at the
// character, otherwise check the modifiers as well
//
// chrome will not fire a keypress if meta or control is down
// safari will fire a keypress if meta or meta+shift is down
// firefox will fire a keypress if meta or control is down
if(action=='keypress'&&!e.metaKey&&!e.ctrlKey||_modifiersMatch(modifiers,callback.modifiers)){// when you bind a combination or sequence a second time it
// should overwrite the first one.  if a sequenceName or
// combination is specified in this call it does just that
//
// @todo make deleting its own method?
var deleteCombo=!sequenceName&&callback.combo==combination;var deleteSequence=sequenceName&&callback.seq==sequenceName&&callback.level==level;if(deleteCombo||deleteSequence){self._callbacks[character].splice(i,1);}matches.push(callback);}}return matches;}/**
         * actually calls the callback function
         *
         * if your callback function returns false this will use the jquery
         * convention - prevent default and stop propogation on the event
         *
         * @param {Function} callback
         * @param {Event} e
         * @returns void
         */function _fireCallback(callback,e,combo,sequence){// if this event should not happen stop here
if(self.stopCallback(e,e.target||e.srcElement,combo,sequence)){return;}if(callback(e,combo)===false){_preventDefault(e);_stopPropagation(e);}}/**
         * handles a character key event
         *
         * @param {string} character
         * @param {Array} modifiers
         * @param {Event} e
         * @returns void
         */self._handleKey=function(character,modifiers,e){var callbacks=_getMatches(character,modifiers,e);var i;var doNotReset={};var maxLevel=0;var processedSequenceCallback=false;// Calculate the maxLevel for sequences so we can only execute the longest callback sequence
for(i=0;i<callbacks.length;++i){if(callbacks[i].seq){maxLevel=Math.max(maxLevel,callbacks[i].level);}}// loop through matching callbacks for this key event
for(i=0;i<callbacks.length;++i){// fire for all sequence callbacks
// this is because if for example you have multiple sequences
// bound such as "g i" and "g t" they both need to fire the
// callback for matching g cause otherwise you can only ever
// match the first one
if(callbacks[i].seq){// only fire callbacks for the maxLevel to prevent
// subsequences from also firing
//
// for example 'a option b' should not cause 'option b' to fire
// even though 'option b' is part of the other sequence
//
// any sequences that do not match here will be discarded
// below by the _resetSequences call
if(callbacks[i].level!=maxLevel){continue;}processedSequenceCallback=true;// keep a list of which sequences were matches for later
doNotReset[callbacks[i].seq]=1;_fireCallback(callbacks[i].callback,e,callbacks[i].combo,callbacks[i].seq);continue;}// if there were no sequence matches but we are still here
// that means this is a regular match so we should fire that
if(!processedSequenceCallback){_fireCallback(callbacks[i].callback,e,callbacks[i].combo);}}// if the key you pressed matches the type of sequence without
// being a modifier (ie "keyup" or "keypress") then we should
// reset all sequences that were not matched by this event
//
// this is so, for example, if you have the sequence "h a t" and you
// type "h e a r t" it does not match.  in this case the "e" will
// cause the sequence to reset
//
// modifier keys are ignored because you can have a sequence
// that contains modifiers such as "enter ctrl+space" and in most
// cases the modifier key will be pressed before the next key
//
// also if you have a sequence such as "ctrl+b a" then pressing the
// "b" key will trigger a "keypress" and a "keydown"
//
// the "keydown" is expected when there is a modifier, but the
// "keypress" ends up matching the _nextExpectedAction since it occurs
// after and that causes the sequence to reset
//
// we ignore keypresses in a sequence that directly follow a keydown
// for the same character
var ignoreThisKeypress=e.type=='keypress'&&_ignoreNextKeypress;if(e.type==_nextExpectedAction&&!_isModifier(character)&&!ignoreThisKeypress){_resetSequences(doNotReset);}_ignoreNextKeypress=processedSequenceCallback&&e.type=='keydown';};/**
         * handles a keydown event
         *
         * @param {Event} e
         * @returns void
         */function _handleKeyEvent(e){// normalize e.which for key events
// @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
if(typeof e.which!=='number'){e.which=e.keyCode;}var character=_characterFromEvent(e);// no character found then stop
if(!character){return;}// need to use === for the character check because the character can be 0
if(e.type=='keyup'&&_ignoreNextKeyup===character){_ignoreNextKeyup=false;return;}self.handleKey(character,_eventModifiers(e),e);}/**
         * called to set a 1 second timeout on the specified sequence
         *
         * this is so after each key press in the sequence you have 1 second
         * to press the next key before you have to start over
         *
         * @returns void
         */function _resetSequenceTimer(){clearTimeout(_resetTimer);_resetTimer=setTimeout(_resetSequences,1000);}/**
         * binds a key sequence to an event
         *
         * @param {string} combo - combo specified in bind call
         * @param {Array} keys
         * @param {Function} callback
         * @param {string=} action
         * @returns void
         */function _bindSequence(combo,keys,callback,action){// start off by adding a sequence level record for this combination
// and setting the level to 0
_sequenceLevels[combo]=0;/**
             * callback to increase the sequence level for this sequence and reset
             * all other sequences that were active
             *
             * @param {string} nextAction
             * @returns {Function}
             */function _increaseSequence(nextAction){return function(){_nextExpectedAction=nextAction;++_sequenceLevels[combo];_resetSequenceTimer();};}/**
             * wraps the specified callback inside of another function in order
             * to reset all sequence counters as soon as this sequence is done
             *
             * @param {Event} e
             * @returns void
             */function _callbackAndReset(e){_fireCallback(callback,e,combo);// we should ignore the next key up if the action is key down
// or keypress.  this is so if you finish a sequence and
// release the key the final key will not trigger a keyup
if(action!=='keyup'){_ignoreNextKeyup=_characterFromEvent(e);}// weird race condition if a sequence ends with the key
// another sequence begins with
setTimeout(_resetSequences,10);}// loop through keys one at a time and bind the appropriate callback
// function.  for any key leading up to the final one it should
// increase the sequence. after the final, it should reset all sequences
//
// if an action is specified in the original bind call then that will
// be used throughout.  otherwise we will pass the action that the
// next key in the sequence should match.  this allows a sequence
// to mix and match keypress and keydown events depending on which
// ones are better suited to the key provided
for(var i=0;i<keys.length;++i){var isFinal=i+1===keys.length;var wrappedCallback=isFinal?_callbackAndReset:_increaseSequence(action||_getKeyInfo(keys[i+1]).action);_bindSingle(keys[i],wrappedCallback,action,combo,i);}}/**
         * binds a single keyboard combination
         *
         * @param {string} combination
         * @param {Function} callback
         * @param {string=} action
         * @param {string=} sequenceName - name of sequence if part of sequence
         * @param {number=} level - what part of the sequence the command is
         * @returns void
         */function _bindSingle(combination,callback,action,sequenceName,level){// store a direct mapped reference for use with Mousetrap.trigger
self._directMap[combination+':'+action]=callback;// make sure multiple spaces in a row become a single space
combination=combination.replace(/\s+/g,' ');var sequence=combination.split(' ');var info;// if this pattern is a sequence of keys then run through this method
// to reprocess each pattern one key at a time
if(sequence.length>1){_bindSequence(combination,sequence,callback,action);return;}info=_getKeyInfo(combination,action);// make sure to initialize array if this is the first time
// a callback is added for this key
self._callbacks[info.key]=self._callbacks[info.key]||[];// remove an existing match if there is one
_getMatches(info.key,info.modifiers,{type:info.action},sequenceName,combination,level);// add this call back to the array
// if it is a sequence put it at the beginning
// if not put it at the end
//
// this is important because the way these are processed expects
// the sequence ones to come first
self._callbacks[info.key][sequenceName?'unshift':'push']({callback:callback,modifiers:info.modifiers,action:info.action,seq:sequenceName,level:level,combo:combination});}/**
         * binds multiple combinations to the same callback
         *
         * @param {Array} combinations
         * @param {Function} callback
         * @param {string|undefined} action
         * @returns void
         */self._bindMultiple=function(combinations,callback,action){for(var i=0;i<combinations.length;++i){_bindSingle(combinations[i],callback,action);}};// start!
_addEvent(targetElement,'keypress',_handleKeyEvent);_addEvent(targetElement,'keydown',_handleKeyEvent);_addEvent(targetElement,'keyup',_handleKeyEvent);}/**
     * binds an event to mousetrap
     *
     * can be a single key, a combination of keys separated with +,
     * an array of keys, or a sequence of keys separated by spaces
     *
     * be sure to list the modifier keys first to make sure that the
     * correct key ends up getting bound (the last key in the pattern)
     *
     * @param {string|Array} keys
     * @param {Function} callback
     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
     * @returns void
     */Mousetrap.prototype.bind=function(keys,callback,action){var self=this;keys=keys instanceof Array?keys:[keys];self._bindMultiple.call(self,keys,callback,action);return self;};/**
     * unbinds an event to mousetrap
     *
     * the unbinding sets the callback function of the specified key combo
     * to an empty function and deletes the corresponding key in the
     * _directMap dict.
     *
     * TODO: actually remove this from the _callbacks dictionary instead
     * of binding an empty function
     *
     * the keycombo+action has to be exactly the same as
     * it was defined in the bind method
     *
     * @param {string|Array} keys
     * @param {string} action
     * @returns void
     */Mousetrap.prototype.unbind=function(keys,action){var self=this;return self.bind.call(self,keys,function(){},action);};/**
     * triggers an event that has already been bound
     *
     * @param {string} keys
     * @param {string=} action
     * @returns void
     */Mousetrap.prototype.trigger=function(keys,action){var self=this;if(self._directMap[keys+':'+action]){self._directMap[keys+':'+action]({},keys);}return self;};/**
     * resets the library back to its initial state.  this is useful
     * if you want to clear out the current keyboard shortcuts and bind
     * new ones - for example if you switch to another page
     *
     * @returns void
     */Mousetrap.prototype.reset=function(){var self=this;self._callbacks={};self._directMap={};return self;};/**
     * should we stop this event before firing off callbacks
     *
     * @param {Event} e
     * @param {Element} element
     * @return {boolean}
     */Mousetrap.prototype.stopCallback=function(e,element){var self=this;// if the element has the class "mousetrap" then no need to stop
if((' '+element.className+' ').indexOf(' mousetrap ')>-1){return false;}if(_belongsTo(element,self.target)){return false;}// Events originating from a shadow DOM are re-targetted and `e.target` is the shadow host,
// not the initial event target in the shadow tree. Note that not all events cross the
// shadow boundary.
// For shadow trees with `mode: 'open'`, the initial event target is the first element in
// the event’s composed path. For shadow trees with `mode: 'closed'`, the initial event
// target cannot be obtained.
if('composedPath'in e&&typeof e.composedPath==='function'){// For open shadow trees, update `element` so that the following check works.
var initialEventTarget=e.composedPath()[0];if(initialEventTarget!==e.target){element=initialEventTarget;}}// stop for input, select, and textarea
return element.tagName=='INPUT'||element.tagName=='SELECT'||element.tagName=='TEXTAREA'||element.isContentEditable;};/**
     * exposes _handleKey publicly so it can be overwritten by extensions
     */Mousetrap.prototype.handleKey=function(){var self=this;return self._handleKey.apply(self,arguments);};/**
     * allow custom key mappings
     */Mousetrap.addKeycodes=function(object){for(var key in object){if(object.hasOwnProperty(key)){_MAP[key]=object[key];}}_REVERSE_MAP=null;};/**
     * Init the global mousetrap functions
     *
     * This method is needed to allow the global mousetrap functions to work
     * now that mousetrap is a constructor function.
     */Mousetrap.init=function(){var documentMousetrap=Mousetrap(document);for(var method in documentMousetrap){if(method.charAt(0)!=='_'){Mousetrap[method]=function(method){return function(){return documentMousetrap[method].apply(documentMousetrap,arguments);};}(method);}}};Mousetrap.init();// expose mousetrap to the global object
window.Mousetrap=Mousetrap;// expose as a common js module
if(typeof module!=='undefined'&&module.exports){module.exports=Mousetrap;}// expose mousetrap as an AMD module
if(typeof define==='function'&&define.amd){define(function(){return Mousetrap;});}})(typeof window!=='undefined'?window:null,typeof window!=='undefined'?document:null);},{}],94:[function(require,module,exports){(function(process){(function(){// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';function assertPath(path){if(typeof path!=='string'){throw new TypeError('Path must be a string. Received '+JSON.stringify(path));}}// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path,allowAboveRoot){var res='';var lastSegmentLength=0;var lastSlash=-1;var dots=0;var code;for(var i=0;i<=path.length;++i){if(i<path.length)code=path.charCodeAt(i);else if(code===47/*/*/)break;else code=47/*/*/;if(code===47/*/*/){if(lastSlash===i-1||dots===1){// NOOP
}else if(lastSlash!==i-1&&dots===2){if(res.length<2||lastSegmentLength!==2||res.charCodeAt(res.length-1)!==46/*.*/||res.charCodeAt(res.length-2)!==46/*.*/){if(res.length>2){var lastSlashIndex=res.lastIndexOf('/');if(lastSlashIndex!==res.length-1){if(lastSlashIndex===-1){res='';lastSegmentLength=0;}else{res=res.slice(0,lastSlashIndex);lastSegmentLength=res.length-1-res.lastIndexOf('/');}lastSlash=i;dots=0;continue;}}else if(res.length===2||res.length===1){res='';lastSegmentLength=0;lastSlash=i;dots=0;continue;}}if(allowAboveRoot){if(res.length>0)res+='/..';else res='..';lastSegmentLength=2;}}else{if(res.length>0)res+='/'+path.slice(lastSlash+1,i);else res=path.slice(lastSlash+1,i);lastSegmentLength=i-lastSlash-1;}lastSlash=i;dots=0;}else if(code===46/*.*/&&dots!==-1){++dots;}else{dots=-1;}}return res;}function _format(sep,pathObject){var dir=pathObject.dir||pathObject.root;var base=pathObject.base||(pathObject.name||'')+(pathObject.ext||'');if(!dir){return base;}if(dir===pathObject.root){return dir+base;}return dir+sep+base;}var posix={// path.resolve([from ...], to)
resolve:function resolve(){var resolvedPath='';var resolvedAbsolute=false;var cwd;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path;if(i>=0)path=arguments[i];else{if(cwd===undefined)cwd=process.cwd();path=cwd;}assertPath(path);// Skip empty entries
if(path.length===0){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charCodeAt(0)===47/*/*/;}// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)
// Normalize the path
resolvedPath=normalizeStringPosix(resolvedPath,!resolvedAbsolute);if(resolvedAbsolute){if(resolvedPath.length>0)return'/'+resolvedPath;else return'/';}else if(resolvedPath.length>0){return resolvedPath;}else{return'.';}},normalize:function normalize(path){assertPath(path);if(path.length===0)return'.';var isAbsolute=path.charCodeAt(0)===47/*/*/;var trailingSeparator=path.charCodeAt(path.length-1)===47/*/*/;// Normalize the path
path=normalizeStringPosix(path,!isAbsolute);if(path.length===0&&!isAbsolute)path='.';if(path.length>0&&trailingSeparator)path+='/';if(isAbsolute)return'/'+path;return path;},isAbsolute:function isAbsolute(path){assertPath(path);return path.length>0&&path.charCodeAt(0)===47/*/*/;},join:function join(){if(arguments.length===0)return'.';var joined;for(var i=0;i<arguments.length;++i){var arg=arguments[i];assertPath(arg);if(arg.length>0){if(joined===undefined)joined=arg;else joined+='/'+arg;}}if(joined===undefined)return'.';return posix.normalize(joined);},relative:function relative(from,to){assertPath(from);assertPath(to);if(from===to)return'';from=posix.resolve(from);to=posix.resolve(to);if(from===to)return'';// Trim any leading backslashes
var fromStart=1;for(;fromStart<from.length;++fromStart){if(from.charCodeAt(fromStart)!==47/*/*/)break;}var fromEnd=from.length;var fromLen=fromEnd-fromStart;// Trim any leading backslashes
var toStart=1;for(;toStart<to.length;++toStart){if(to.charCodeAt(toStart)!==47/*/*/)break;}var toEnd=to.length;var toLen=toEnd-toStart;// Compare paths to find the longest common path from root
var length=fromLen<toLen?fromLen:toLen;var lastCommonSep=-1;var i=0;for(;i<=length;++i){if(i===length){if(toLen>length){if(to.charCodeAt(toStart+i)===47/*/*/){// We get here if `from` is the exact base path for `to`.
// For example: from='/foo/bar'; to='/foo/bar/baz'
return to.slice(toStart+i+1);}else if(i===0){// We get here if `from` is the root
// For example: from='/'; to='/foo'
return to.slice(toStart+i);}}else if(fromLen>length){if(from.charCodeAt(fromStart+i)===47/*/*/){// We get here if `to` is the exact base path for `from`.
// For example: from='/foo/bar/baz'; to='/foo/bar'
lastCommonSep=i;}else if(i===0){// We get here if `to` is the root.
// For example: from='/foo'; to='/'
lastCommonSep=0;}}break;}var fromCode=from.charCodeAt(fromStart+i);var toCode=to.charCodeAt(toStart+i);if(fromCode!==toCode)break;else if(fromCode===47/*/*/)lastCommonSep=i;}var out='';// Generate the relative path based on the path difference between `to`
// and `from`
for(i=fromStart+lastCommonSep+1;i<=fromEnd;++i){if(i===fromEnd||from.charCodeAt(i)===47/*/*/){if(out.length===0)out+='..';else out+='/..';}}// Lastly, append the rest of the destination (`to`) path that comes after
// the common path parts
if(out.length>0)return out+to.slice(toStart+lastCommonSep);else{toStart+=lastCommonSep;if(to.charCodeAt(toStart)===47/*/*/)++toStart;return to.slice(toStart);}},_makeLong:function _makeLong(path){return path;},dirname:function dirname(path){assertPath(path);if(path.length===0)return'.';var code=path.charCodeAt(0);var hasRoot=code===47/*/*/;var end=-1;var matchedSlash=true;for(var i=path.length-1;i>=1;--i){code=path.charCodeAt(i);if(code===47/*/*/){if(!matchedSlash){end=i;break;}}else{// We saw the first non-path separator
matchedSlash=false;}}if(end===-1)return hasRoot?'/':'.';if(hasRoot&&end===1)return'//';return path.slice(0,end);},basename:function basename(path,ext){if(ext!==undefined&&typeof ext!=='string')throw new TypeError('"ext" argument must be a string');assertPath(path);var start=0;var end=-1;var matchedSlash=true;var i;if(ext!==undefined&&ext.length>0&&ext.length<=path.length){if(ext.length===path.length&&ext===path)return'';var extIdx=ext.length-1;var firstNonSlashEnd=-1;for(i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47/*/*/){// If we reached a path separator that was not part of a set of path
// separators at the end of the string, stop now
if(!matchedSlash){start=i+1;break;}}else{if(firstNonSlashEnd===-1){// We saw the first non-path separator, remember this index in case
// we need it if the extension ends up not matching
matchedSlash=false;firstNonSlashEnd=i+1;}if(extIdx>=0){// Try to match the explicit extension
if(code===ext.charCodeAt(extIdx)){if(--extIdx===-1){// We matched the extension, so mark this as the end of our path
// component
end=i;}}else{// Extension does not match, so our result is the entire path
// component
extIdx=-1;end=firstNonSlashEnd;}}}}if(start===end)end=firstNonSlashEnd;else if(end===-1)end=path.length;return path.slice(start,end);}else{for(i=path.length-1;i>=0;--i){if(path.charCodeAt(i)===47/*/*/){// If we reached a path separator that was not part of a set of path
// separators at the end of the string, stop now
if(!matchedSlash){start=i+1;break;}}else if(end===-1){// We saw the first non-path separator, mark this as the end of our
// path component
matchedSlash=false;end=i+1;}}if(end===-1)return'';return path.slice(start,end);}},extname:function extname(path){assertPath(path);var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;// Track the state of characters (if any) we see before our first dot and
// after any path separator we find
var preDotState=0;for(var i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47/*/*/){// If we reached a path separator that was not part of a set of path
// separators at the end of the string, stop now
if(!matchedSlash){startPart=i+1;break;}continue;}if(end===-1){// We saw the first non-path separator, mark this as the end of our
// extension
matchedSlash=false;end=i+1;}if(code===46/*.*/){// If this is our first dot, mark it as the start of our extension
if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1;}else if(startDot!==-1){// We saw a non-dot and non-path separator before our dot, so we should
// have a good chance at having a non-empty extension
preDotState=-1;}}if(startDot===-1||end===-1||// We saw a non-dot character immediately before the dot
preDotState===0||// The (right-most) trimmed path component is exactly '..'
preDotState===1&&startDot===end-1&&startDot===startPart+1){return'';}return path.slice(startDot,end);},format:function format(pathObject){if(pathObject===null||_typeof(pathObject)!=='object'){throw new TypeError('The "pathObject" argument must be of type Object. Received type '+_typeof(pathObject));}return _format('/',pathObject);},parse:function parse(path){assertPath(path);var ret={root:'',dir:'',base:'',ext:'',name:''};if(path.length===0)return ret;var code=path.charCodeAt(0);var isAbsolute=code===47/*/*/;var start;if(isAbsolute){ret.root='/';start=1;}else{start=0;}var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;var i=path.length-1;// Track the state of characters (if any) we see before our first dot and
// after any path separator we find
var preDotState=0;// Get non-dir info
for(;i>=start;--i){code=path.charCodeAt(i);if(code===47/*/*/){// If we reached a path separator that was not part of a set of path
// separators at the end of the string, stop now
if(!matchedSlash){startPart=i+1;break;}continue;}if(end===-1){// We saw the first non-path separator, mark this as the end of our
// extension
matchedSlash=false;end=i+1;}if(code===46/*.*/){// If this is our first dot, mark it as the start of our extension
if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1;}else if(startDot!==-1){// We saw a non-dot and non-path separator before our dot, so we should
// have a good chance at having a non-empty extension
preDotState=-1;}}if(startDot===-1||end===-1||// We saw a non-dot character immediately before the dot
preDotState===0||// The (right-most) trimmed path component is exactly '..'
preDotState===1&&startDot===end-1&&startDot===startPart+1){if(end!==-1){if(startPart===0&&isAbsolute)ret.base=ret.name=path.slice(1,end);else ret.base=ret.name=path.slice(startPart,end);}}else{if(startPart===0&&isAbsolute){ret.name=path.slice(1,startDot);ret.base=path.slice(1,end);}else{ret.name=path.slice(startPart,startDot);ret.base=path.slice(startPart,end);}ret.ext=path.slice(startDot,end);}if(startPart>0)ret.dir=path.slice(0,startPart-1);else if(isAbsolute)ret.dir='/';return ret;},sep:'/',delimiter:':',win32:null,posix:null};posix.posix=posix;module.exports=posix;}).call(this);}).call(this,require('_process'));},{"_process":98}],95:[function(require,module,exports){/**
* Precedent Meta-Templating
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Process text streams, parsing out meta-template expressions.
*/var libWordTree=require("./WordTree.js");var libStringParser=require("./StringParser.js");var Precedent=/*#__PURE__*/function(){/**
	 * Precedent Constructor
	 */function Precedent(){_classCallCheck(this,Precedent);this.WordTree=new libWordTree();this.StringParser=new libStringParser();this.ParseTree=this.WordTree.ParseTree;}/**
	 * Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pTree - A node on the parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @param {number} pIndex - callback function
	 * @return {bool} True if adding the pattern was successful
	 */_createClass(Precedent,[{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,pParser){return this.WordTree.addPattern(pPatternStart,pPatternEnd,pParser);}/**
	 * Parse a string with the existing parse tree
	 * @method parseString
	 * @param {string} pString - The string to parse
	 * @param {object} pData - Data to pass in as the second argument
	 * @return {string} The result from the parser
	 */},{key:"parseString",value:function parseString(pString,pData){return this.StringParser.parseString(pString,this.ParseTree,pData);}}]);return Precedent;}();module.exports=Precedent;},{"./StringParser.js":96,"./WordTree.js":97}],96:[function(require,module,exports){/**
* String Parser
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Parse a string, properly processing each matched token in the word tree.
*/var StringParser=/*#__PURE__*/function(){/**
	 * StringParser Constructor
	 */function StringParser(){_classCallCheck(this,StringParser);}/**
	 * Create a fresh parsing state object to work with.
	 * @method newParserState
	 * @param {Object} pParseTree - A node on the parse tree to begin parsing from (usually root)
	 * @return {Object} A new parser state object for running a character parser on
	 * @private
	 */_createClass(StringParser,[{key:"newParserState",value:function newParserState(pParseTree){return{ParseTree:pParseTree,Output:'',OutputBuffer:'',Pattern:false,PatternMatch:false,PatternMatchOutputBuffer:''};}/**
	 * Assign a node of the parser tree to be the next potential match.
	 * If the node has a PatternEnd property, it is a valid match and supercedes the last valid match (or becomes the initial match).
	 * @method assignNode
	 * @param {Object} pNode - A node on the parse tree to assign
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"assignNode",value:function assignNode(pNode,pParserState){pParserState.PatternMatch=pNode;// If the pattern has a END we can assume it has a parse function...
if(pParserState.PatternMatch.hasOwnProperty('PatternEnd')){// ... this is the legitimate start of a pattern.
pParserState.Pattern=pParserState.PatternMatch;}}/**
	 * Append a character to the output buffer in the parser state.
	 * This output buffer is used when a potential match is being explored, or a match is being explored.
	 * @method appendOutputBuffer
	 * @param {string} pCharacter - The character to append
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"appendOutputBuffer",value:function appendOutputBuffer(pCharacter,pParserState){pParserState.OutputBuffer+=pCharacter;}/**
	 * Flush the output buffer to the output and clear it.
	 * @method flushOutputBuffer
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"flushOutputBuffer",value:function flushOutputBuffer(pParserState){pParserState.Output+=pParserState.OutputBuffer;pParserState.OutputBuffer='';}/**
	 * Check if the pattern has ended.  If it has, properly flush the buffer and start looking for new patterns.
	 * @method checkPatternEnd
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"checkPatternEnd",value:function checkPatternEnd(pParserState,pData){if(pParserState.OutputBuffer.length>=pParserState.Pattern.PatternEnd.length+pParserState.Pattern.PatternStart.length&&pParserState.OutputBuffer.substr(-pParserState.Pattern.PatternEnd.length)===pParserState.Pattern.PatternEnd){// ... this is the end of a pattern, cut off the end tag and parse it.
// Trim the start and end tags off the output buffer now
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStart.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStart.length+pParserState.Pattern.PatternEnd.length)),pData);// Flush the output buffer.
this.flushOutputBuffer(pParserState);// End pattern mode
pParserState.Pattern=false;pParserState.PatternMatch=false;}}/**
	 * Parse a character in the buffer.
	 * @method parseCharacter
	 * @param {string} pCharacter - The character to append
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"parseCharacter",value:function parseCharacter(pCharacter,pParserState,pData){// (1) If we aren't in a pattern match, and we aren't potentially matching, and this may be the start of a new pattern....
if(!pParserState.PatternMatch&&pParserState.ParseTree.hasOwnProperty(pCharacter)){// ... assign the node as the matched node.
this.assignNode(pParserState.ParseTree[pCharacter],pParserState);this.appendOutputBuffer(pCharacter,pParserState);}// (2) If we are in a pattern match (actively seeing if this is part of a new pattern token)
else if(pParserState.PatternMatch){// If the pattern has a subpattern with this key
if(pParserState.PatternMatch.hasOwnProperty(pCharacter)){// Continue matching patterns.
this.assignNode(pParserState.PatternMatch[pCharacter],pParserState);}this.appendOutputBuffer(pCharacter,pParserState);if(pParserState.Pattern){// ... Check if this is the end of the pattern (if we are matching a valid pattern)...
this.checkPatternEnd(pParserState,pData);}}// (3) If we aren't in a pattern match or pattern, and this isn't the start of a new pattern (RAW mode)....
else{pParserState.Output+=pCharacter;}}/**
	 * Parse a string for matches, and process any template segments that occur.
	 * @method parseString
	 * @param {string} pString - The string to parse.
	 * @param {Object} pParseTree - The parse tree to begin parsing from (usually root)
	 * @param {Object} pData - The data to pass to the function as a second paramter
	 */},{key:"parseString",value:function parseString(pString,pParseTree,pData){var tmpParserState=this.newParserState(pParseTree);for(var i=0;i<pString.length;i++){// TODO: This is not fast.
this.parseCharacter(pString[i],tmpParserState,pData);}this.flushOutputBuffer(tmpParserState);return tmpParserState.Output;}}]);return StringParser;}();module.exports=StringParser;},{}],97:[function(require,module,exports){/**
* Word Tree
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Create a tree (directed graph) of Javascript objects, one character per object.
*/var WordTree=/*#__PURE__*/function(){/**
	 * WordTree Constructor
	 */function WordTree(){_classCallCheck(this,WordTree);this.ParseTree={};}/** 
	 * Add a child character to a Parse Tree node
	 * @method addChild
	 * @param {Object} pTree - A parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @param {number} pIndex - The index of the character in the pattern
	 * @returns {Object} The resulting leaf node that was added (or found)
	 * @private
	 */_createClass(WordTree,[{key:"addChild",value:function addChild(pTree,pPattern,pIndex){if(!pTree.hasOwnProperty(pPattern[pIndex]))pTree[pPattern[pIndex]]={};return pTree[pPattern[pIndex]];}/** Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pPatternStart - The starting string for the pattern (e.g. "${")
	 * @param {string} pPatternEnd - The ending string for the pattern (e.g. "}")
	 * @param {number} pParser - The function to parse if this is the matched pattern, once the Pattern End is met.  If this is a string, a simple replacement occurs.
	 * @return {bool} True if adding the pattern was successful
	 */},{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,pParser){if(pPatternStart.length<1)return false;if(typeof pPatternEnd==='string'&&pPatternEnd.length<1)return false;var tmpLeaf=this.ParseTree;// Add the tree of leaves iteratively
for(var i=0;i<pPatternStart.length;i++)tmpLeaf=this.addChild(tmpLeaf,pPatternStart,i);tmpLeaf.PatternStart=pPatternStart;tmpLeaf.PatternEnd=typeof pPatternEnd==='string'&&pPatternEnd.length>0?pPatternEnd:pPatternStart;tmpLeaf.Parse=typeof pParser==='function'?pParser:typeof pParser==='string'?function(){return pParser;}:function(pData){return pData;};return true;}}]);return WordTree;}();module.exports=WordTree;},{}],98:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],99:[function(require,module,exports){(function(setImmediate,clearImmediate){(function(){var nextTick=require('process/browser.js').nextTick;var apply=Function.prototype.apply;var slice=Array.prototype.slice;var immediateIds={};var nextImmediateId=0;// DOM APIs, for completeness
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){timeout.close();};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};// Does not start the time, just sets up the members needed.
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate=typeof setImmediate==="function"?setImmediate:function(fn){var id=nextImmediateId++;var args=arguments.length<2?false:slice.call(arguments,1);immediateIds[id]=true;nextTick(function onNextTick(){if(immediateIds[id]){// fn.call() is faster so we optimize for the common use-case
// @see http://jsperf.com/call-apply-segu
if(args){fn.apply(null,args);}else{fn.call(null);}// Prevent ids from leaking
exports.clearImmediate(id);}});return id;};exports.clearImmediate=typeof clearImmediate==="function"?clearImmediate:function(id){delete immediateIds[id];};}).call(this);}).call(this,require("timers").setImmediate,require("timers").clearImmediate);},{"process/browser.js":98,"timers":99}],100:[function(require,module,exports){/**
* Pict browser shim loader
* @license MIT
* @author <steven@velozo.com>
*/ // Load the pict module into the browser global automatically.
var libPict=require('./Pict.js');if((typeof window==="undefined"?"undefined":_typeof(window))==='object'){window.Pict=libPict;}module.exports=libPict;},{"./Pict.js":105}],101:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var libElucidator=require('elucidator');var FableServiceElucidator=/*#__PURE__*/function(_libFableServiceBase5){_inherits(FableServiceElucidator,_libFableServiceBase5);var _super13=_createSuper(FableServiceElucidator);function FableServiceElucidator(pFable,pOptions,pServiceHash){var _this32;_classCallCheck(this,FableServiceElucidator);_this32=_super13.call(this,pFable,pOptions,pServiceHash);_this32.serviceType='Solver';_this32.solver=new libElucidator(_this32.options);return _this32;}return _createClass(FableServiceElucidator);}(libFableServiceBase);module.exports=FableServiceElucidator;},{"elucidator":31,"fable":79}],102:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var libInformary=require('informary');var FableServiceInformary=/*#__PURE__*/function(_libFableServiceBase6){_inherits(FableServiceInformary,_libFableServiceBase6);var _super14=_createSuper(FableServiceInformary);function FableServiceInformary(pFable,pOptions,pServiceHash){var _this33;_classCallCheck(this,FableServiceInformary);_this33=_super14.call(this,pFable,pOptions,pServiceHash);_this33.serviceType='Informary';_this33.informary=new libInformary(_this33.options.Settings,_this33.options.Context,_this33.options.ContextGUID);return _this33;}return _createClass(FableServiceInformary);}(libFableServiceBase);module.exports=FableServiceInformary;},{"fable":79,"informary":81}],103:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var libManyfest=require('manyfest');var FableServiceManyfest=/*#__PURE__*/function(_libFableServiceBase7){_inherits(FableServiceManyfest,_libFableServiceBase7);var _super15=_createSuper(FableServiceManyfest);function FableServiceManyfest(pFable,pOptions,pServiceHash){var _this34;_classCallCheck(this,FableServiceManyfest);_this34=_super15.call(this,pFable,pOptions,pServiceHash);_this34.serviceType='Manifest';if(JSON.stringify(_this34.options)=='{}'){_this34.options={Scope:'PictDefault',Descriptors:{}};}_this34.manyfest=new libManyfest(_this34.options);// Kinda the same thing, yo
_this34.manifest=_this34.manyfest;return _this34;}return _createClass(FableServiceManyfest);}(libFableServiceBase);module.exports=FableServiceManyfest;},{"fable":79,"manyfest":92}],104:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var PictTemplateProvider=/*#__PURE__*/function(_libFableServiceBase8){_inherits(PictTemplateProvider,_libFableServiceBase8);var _super16=_createSuper(PictTemplateProvider);function PictTemplateProvider(pFable,pOptions,pServiceHash){var _this35;_classCallCheck(this,PictTemplateProvider);_this35=_super16.call(this,pFable,pOptions,pServiceHash);_this35.serviceType='PictTemplateProvider';_this35.templates={};// Default templates are stored by prefix.
// The longest prefix match is used.
// Case sensitive.
_this35.defaultTemplates={};// Sorted list of default templates by length.
// Since this is a sorted list of case sensitive keys by length, it shouldn't be possible to have collisions.
_this35.defaultTemplateHashes=[];// This function can be overloaded to load templates from a database, in a page or other source.
_this35.loadTemplateFunction=function(pTemplateHash){return false;};return _this35;}_createClass(PictTemplateProvider,[{key:"addTemplate",value:function addTemplate(pTemplateHash,pTemplate){this.templates[pTemplateHash]=pTemplate;}},{key:"addDefaultTemplate",value:function addDefaultTemplate(pTemplateHash,pTemplate){if(typeof pTemplate!='string'){this.log.error('PictTemplateProvider.addDefaultTemplate: pTemplate is not a string.');}this.defaultTemplates[pTemplateHash]=pTemplate;this.defaultTemplateHashes=Object.keys(this.defaultTemplates).sort(function(a,b){return b.length-a.length;});}},{key:"checkDefaultTemplateHash",value:function checkDefaultTemplateHash(pTemplateHash){/*
         * Default templates are managed by postfix.  The use case is things like titles, headers, list wrappers, rows, etc.
         *
         * So we might have a default template for a list wrapper and it should expect "-ListWrap" as the postfix.
         * And we might have a default template for a list row and it should expect "-ListRow" as the postfix.
         * The list might have a "-ListTitle", or we might have shared titles and it would just be "-Title".
         * 
         * The idea is to allow fallbacks on defaults.
         */var tmpTemplateHashLength=pTemplateHash.length;for(var i=0;i<this.defaultTemplateHashes.length;i++){// TODO: This is a bad way to check for a postfix.
// TODO: Is it a good idea to set the template so next time we don't have to check the defaults?
//       * Pros: Faster.
//       * Cons: If we later add another default template with a closer match, it won't get looked up.
//       Faster wins for now.
if(pTemplateHash.indexOf(this.defaultTemplateHashes[i])==tmpTemplateHashLength-this.defaultTemplateHashes[i].length){this.templates[pTemplateHash]=this.defaultTemplates[this.defaultTemplateHashes[i]];return this.templates[pTemplateHash];}}return false;}},{key:"getTemplate",value:function getTemplate(pTemplateHash){// TODO: Optimize this.
// If the template doesn't exist, try to load it with the loading function
if(!this.templates.hasOwnProperty(pTemplateHash)){this.loadTemplate(pTemplateHash);}// If the loading function fails, try to load it from the default templates
if(!this.templates.hasOwnProperty(pTemplateHash)){this.checkDefaultTemplateHash(pTemplateHash);}if(this.templates.hasOwnProperty(pTemplateHash)){return this.templates[pTemplateHash];}else{return false;}}},{key:"loadTemplate",value:function loadTemplate(pTemplateHash){var tmpTemplate=this.loadTemplateFunction(pTemplateHash);if(tmpTemplate){this.templates[pTemplateHash]=tmpTemplate;}return tmpTemplate;}}]);return PictTemplateProvider;}(libFableServiceBase);module.exports=PictTemplateProvider;},{"fable":79}],105:[function(require,module,exports){/**
* @license MIT
* @author <steven@velozo.com>
*/var libFable=require('fable');// Pict Services
var libPictTemplateProvider=require('./Pict-Template-Provider.js');// External Library Services
var libFableServiceManyfest=require('./Pict-Fable-Service-Manyfest.js');var libFableServiceElucidator=require('./Pict-Fable-Service-Elucidator.js');var libFableServiceInformary=require('./Pict-Fable-Service-Informary.js');var libMouseTrap=require('mousetrap');var Pict=/*#__PURE__*/function(){function Pict(pOptions){_classCallCheck(this,Pict);this.fable=new libFable(pOptions);this.log=this.fable.log;this.settings=this.fable.settings;this.serviceManager=this.fable.serviceManager;this.fable.serviceManager.addServiceType('TemplateProvider',libPictTemplateProvider);this.fable.serviceManager.addServiceType('Manifest',libFableServiceManyfest);this.fable.serviceManager.addServiceType('Solver',libFableServiceElucidator);this.fable.serviceManager.addServiceType('Informary',libFableServiceInformary);// Register the services
// The templateProvider provides a basic key->template mapping with default fallback capabilities
this.templateProvider=this.fable.serviceManager.instantiateServiceProvider('TemplateProvider',{},'defaultTemplateProvider');this.defaultTemplateProcessor=this.fable.serviceManager.instantiateServiceProvider('MetaTemplate',{},'defaultTemplateProcessor');this._DefaultTemplateMethodsInitialized=false;this.manifestServiceProvider=this.fable.serviceManager.instantiateServiceProvider('Manifest',{},'defaultManifest');this.manifest=this.manifestServiceProvider.manifest;this.appData={};}_createClass(Pict,[{key:"initializeTemplateMethods",value:function initializeTemplateMethods(fExtraTemplateMethods){var _this36=this;/*
		 *
		 * To stave off madness, these are inefficient for now.  The wkhtmltopdf renderer leaves much to be desired
		 * in the way of feedback with regards to javascript compatibility.
		 *
		 */if(!this._DefaultTemplateMethodsInitialized){this.defaultTemplateProcessor.addPattern('{~Data:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpValue=_this36.manifest.getValueAtAddress({AppData:_this36.appData,Record:pData},tmpHash);if(tmpValue==null||tmpValue=='undefined'||typeof tmpValue=='undefined'){//console.log('undefined!');
return'';}return tmpValue;});this.defaultTemplateProcessor.addPattern('{~Dollars:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpColumnData=_this36.manifest.getValueAtAddress({AppData:_this36.appData,Record:pData},tmpHash);var tmpValue=_this36.fable.DataArithmatic.formatterDollars(tmpColumnData);return tmpValue;});this.defaultTemplateProcessor.addPattern('{~Digits:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpColumnData=_this36.manifest.getValueAtAddress({AppData:_this36.appData,Record:pData},tmpHash);var tmpValue=_this36.fable.DataArithmatic.formatterAddCommasToNumber(_this36.fable.DataArithmatic.formatterRoundNumber(tmpColumnData,2));return tmpValue;});this.defaultTemplateProcessor.addPattern('{~NotEmpty:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpHashParts=tmpHash.split('|');if(tmpHashParts.length!=2){return'';}var tmpTruthiness=_this36.manifest.getValueAtAddress({AppData:_this36.appData,Record:pData},tmpHashParts[0]);var tmpValue='';// For now just check truthiness
if(tmpTruthiness){tmpValue=tmpHashParts[1];}return tmpValue;});this._DefaultTemplateMethodsInitialized=true;}}},{key:"parseTemplate",value:function parseTemplate(pTemplateString,pData){return this.defaultTemplateProcessor.parseString(pTemplateString,pData);}},{key:"parseTemplateByHash",value:function parseTemplateByHash(pTemplateHash,pData){var tmpTemplateString=this.templateProvider.getTemplate(pTemplateHash);// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
if(!tmpTemplateString){return'';}return this.parseTemplate(tmpTemplateString,pData);}}]);return Pict;}();;module.exports=Pict;},{"./Pict-Fable-Service-Elucidator.js":101,"./Pict-Fable-Service-Informary.js":102,"./Pict-Fable-Service-Manyfest.js":103,"./Pict-Template-Provider.js":104,"fable":79,"mousetrap":93}]},{},[100])(100);});