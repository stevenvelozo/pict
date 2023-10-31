"use strict";function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _defineProperty2(obj,key,value){key=_toPropertyKey2(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _get(){if(typeof Reflect!=="undefined"&&Reflect.get){_get=Reflect.get.bind();}else{_get=function _get(target,property,receiver){var base=_superPropBase(target,property);if(!base)return;var desc=Object.getOwnPropertyDescriptor(base,property);if(desc.get){return desc.get.call(arguments.length<3?target:receiver);}return desc.value;};}return _get.apply(this,arguments);}function _superPropBase(object,property){while(!Object.prototype.hasOwnProperty.call(object,property)){object=_getPrototypeOf(object);if(object===null)break;}return object;}function _classCallCheck2(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey2(descriptor.key),descriptor);}}function _createClass2(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}function _toPropertyKey2(arg){var key=_toPrimitive2(arg,"string");return _typeof(key)==="symbol"?key:String(key);}function _toPrimitive2(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});Object.defineProperty(subClass,"prototype",{writable:false});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}else if(call!==void 0){throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o;}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o;},_typeof(o);}(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.Pict=f();}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o;}return r;}()({1:[function(require,module,exports){'use strict';var eachOfLimit=require('async.util.eachoflimit');var withoutIndex=require('async.util.withoutindex');module.exports=function eachLimit(arr,limit,iterator,cb){return eachOfLimit(limit)(arr,withoutIndex(iterator),cb);};},{"async.util.eachoflimit":3,"async.util.withoutindex":14}],2:[function(require,module,exports){'use strict';module.exports=function(tasks){function makeCallback(index){function fn(){if(tasks.length){tasks[index].apply(null,arguments);}return fn.next();}fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null;};return fn;}return makeCallback(0);};},{}],3:[function(require,module,exports){var once=require('async.util.once');var noop=require('async.util.noop');var onlyOnce=require('async.util.onlyonce');var keyIterator=require('async.util.keyiterator');module.exports=function eachOfLimit(limit){return function(obj,iterator,cb){cb=once(cb||noop);obj=obj||[];var nextKey=keyIterator(obj);if(limit<=0){return cb(null);}var done=false;var running=0;var errored=false;(function replenish(){if(done&&running<=0){return cb(null);}while(running<limit&&!errored){var key=nextKey();if(key===null){done=true;if(running<=0){cb(null);}return;}running+=1;iterator(obj[key],key,onlyOnce(function(err){running-=1;if(err){cb(err);errored=true;}else{replenish();}}));}})();};};},{"async.util.keyiterator":7,"async.util.noop":9,"async.util.once":10,"async.util.onlyonce":11}],4:[function(require,module,exports){'use strict';var setImmediate=require('async.util.setimmediate');var restParam=require('async.util.restparam');module.exports=function(fn){return restParam(function(args){var callback=args.pop();args.push(function(){var innerArgs=arguments;if(sync){setImmediate(function(){callback.apply(null,innerArgs);});}else{callback.apply(null,innerArgs);}});var sync=true;fn.apply(this,args);sync=false;});};},{"async.util.restparam":12,"async.util.setimmediate":13}],5:[function(require,module,exports){'use strict';module.exports=Array.isArray||function isArray(obj){return Object.prototype.toString.call(obj)==='[object Array]';};},{}],6:[function(require,module,exports){'use strict';var isArray=require('async.util.isarray');module.exports=function isArrayLike(arr){return isArray(arr)||// has a positive integer length property
typeof arr.length==='number'&&arr.length>=0&&arr.length%1===0;};},{"async.util.isarray":5}],7:[function(require,module,exports){'use strict';var _keys=require('async.util.keys');var isArrayLike=require('async.util.isarraylike');module.exports=function keyIterator(coll){var i=-1;var len;var keys;if(isArrayLike(coll)){len=coll.length;return function next(){i++;return i<len?i:null;};}else{keys=_keys(coll);len=keys.length;return function next(){i++;return i<len?keys[i]:null;};}};},{"async.util.isarraylike":6,"async.util.keys":8}],8:[function(require,module,exports){'use strict';module.exports=Object.keys||function keys(obj){var _keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){_keys.push(k);}}return _keys;};},{}],9:[function(require,module,exports){'use strict';module.exports=function noop(){};},{}],10:[function(require,module,exports){'use strict';module.exports=function once(fn){return function(){if(fn===null)return;fn.apply(this,arguments);fn=null;};};},{}],11:[function(require,module,exports){'use strict';module.exports=function only_once(fn){return function(){if(fn===null)throw new Error('Callback was already called.');fn.apply(this,arguments);fn=null;};};},{}],12:[function(require,module,exports){'use strict';module.exports=function restParam(func,startIndex){startIndex=startIndex==null?func.length-1:+startIndex;return function(){var length=Math.max(arguments.length-startIndex,0);var rest=new Array(length);for(var index=0;index<length;index++){rest[index]=arguments[index+startIndex];}switch(startIndex){case 0:return func.call(this,rest);case 1:return func.call(this,arguments[0],rest);}};};},{}],13:[function(require,module,exports){(function(setImmediate){(function(){'use strict';var _setImmediate=typeof setImmediate==='function'&&setImmediate;var fallback=function fallback(fn){setTimeout(fn,0);};module.exports=function setImmediate(fn){// not a direct alias for IE10 compatibility
return(_setImmediate||fallback)(fn);};}).call(this);}).call(this,require("timers").setImmediate);},{"timers":133}],14:[function(require,module,exports){'use strict';module.exports=function withoutIndex(iterator){return function(value,index,callback){return iterator(value,callback);};};},{}],15:[function(require,module,exports){'use strict';var once=require('async.util.once');var noop=require('async.util.noop');var isArray=require('async.util.isarray');var restParam=require('async.util.restparam');var ensureAsync=require('async.util.ensureasync');var iterator=require('async.iterator');module.exports=function(tasks,cb){cb=once(cb||noop);if(!isArray(tasks))return cb(new Error('First argument to waterfall must be an array of functions'));if(!tasks.length)return cb();function wrapIterator(iterator){return restParam(function(err,args){if(err){cb.apply(null,[err].concat(args));}else{var next=iterator.next();if(next){args.push(wrapIterator(next));}else{args.push(cb);}ensureAsync(iterator).apply(null,args);}});}wrapIterator(iterator(tasks))();};},{"async.iterator":2,"async.util.ensureasync":4,"async.util.isarray":5,"async.util.noop":9,"async.util.once":10,"async.util.restparam":12}],16:[function(require,module,exports){'use strict';exports.byteLength=byteLength;exports.toByteArray=toByteArray;exports.fromByteArray=fromByteArray;var lookup=[];var revLookup=[];var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';for(var i=0,len=code.length;i<len;++i){lookup[i]=code[i];revLookup[code.charCodeAt(i)]=i;}// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)]=62;revLookup['_'.charCodeAt(0)]=63;function getLens(b64){var len=b64.length;if(len%4>0){throw new Error('Invalid string. Length must be a multiple of 4');}// Trim off extra bytes after placeholder bytes are found
// See: https://github.com/beatgammit/base64-js/issues/42
var validLen=b64.indexOf('=');if(validLen===-1)validLen=len;var placeHoldersLen=validLen===len?0:4-validLen%4;return[validLen,placeHoldersLen];}// base64 is 4/3 + up to two characters of the original data
function byteLength(b64){var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];return(validLen+placeHoldersLen)*3/4-placeHoldersLen;}function _byteLength(b64,validLen,placeHoldersLen){return(validLen+placeHoldersLen)*3/4-placeHoldersLen;}function toByteArray(b64){var tmp;var lens=getLens(b64);var validLen=lens[0];var placeHoldersLen=lens[1];var arr=new Arr(_byteLength(b64,validLen,placeHoldersLen));var curByte=0;// if there are placeholders, only get up to the last complete 4 chars
var len=placeHoldersLen>0?validLen-4:validLen;var i;for(i=0;i<len;i+=4){tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];arr[curByte++]=tmp>>16&0xFF;arr[curByte++]=tmp>>8&0xFF;arr[curByte++]=tmp&0xFF;}if(placeHoldersLen===2){tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;arr[curByte++]=tmp&0xFF;}if(placeHoldersLen===1){tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;arr[curByte++]=tmp>>8&0xFF;arr[curByte++]=tmp&0xFF;}return arr;}function tripletToBase64(num){return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];}function encodeChunk(uint8,start,end){var tmp;var output=[];for(var i=start;i<end;i+=3){tmp=(uint8[i]<<16&0xFF0000)+(uint8[i+1]<<8&0xFF00)+(uint8[i+2]&0xFF);output.push(tripletToBase64(tmp));}return output.join('');}function fromByteArray(uint8){var tmp;var len=uint8.length;var extraBytes=len%3;// if we have 1 byte left, pad 2 bytes
var parts=[];var maxChunkLength=16383;// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));}// pad the end with zeros, but make sure to not forget the extra bytes
if(extraBytes===1){tmp=uint8[len-1];parts.push(lookup[tmp>>2]+lookup[tmp<<4&0x3F]+'==');}else if(extraBytes===2){tmp=(uint8[len-2]<<8)+uint8[len-1];parts.push(lookup[tmp>>10]+lookup[tmp>>4&0x3F]+lookup[tmp<<2&0x3F]+'=');}return parts.join('');}},{}],17:[function(require,module,exports){/*
 *  big.js v6.2.1
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2022 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */;(function(GLOBAL){'use strict';var Big,/************************************** EDITABLE DEFAULTS *****************************************/ // The default values below must be integers within the stated ranges.
/*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */DP=20,// 0 to MAX_DP
/*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */RM=1,// 0, 1, 2 or 3
// The maximum value of DP and Big.DP.
MAX_DP=1E6,// 0 to 1000000
// The maximum magnitude of the exponent argument to the pow method.
MAX_POWER=1E6,// 1 to 1000000
/*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */NE=-7,// 0 to -1000000
/*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */PE=21,// 0 to 1000000
/*
     * When true, an error will be thrown if a primitive number is passed to the Big constructor,
     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
     * primitive number without a loss of precision.
     */STRICT=false,// true or false
/**************************************************************************************************/ // Error messages.
NAME='[big.js] ',INVALID=NAME+'Invalid ',INVALID_DP=INVALID+'decimal places',INVALID_RM=INVALID+'rounding mode',DIV_BY_ZERO=NAME+'Division by zero',// The shared prototype object.
P={},UNDEFINED=void 0,NUMERIC=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;/*
   * Create and return a Big constructor.
   */function _Big_(){/*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */function Big(n){var x=this;// Enable constructor usage without new.
if(!(x instanceof Big))return n===UNDEFINED?_Big_():new Big(n);// Duplicate.
if(n instanceof Big){x.s=n.s;x.e=n.e;x.c=n.c.slice();}else{if(typeof n!=='string'){if(Big.strict===true&&typeof n!=='bigint'){throw TypeError(INVALID+'value');}// Minus zero?
n=n===0&&1/n<0?'-0':String(n);}parse(x,n);}// Retain a reference to this Big constructor.
// Shadow Big.prototype.constructor which points to Object.
x.constructor=Big;}Big.prototype=P;Big.DP=DP;Big.RM=RM;Big.NE=NE;Big.PE=PE;Big.strict=STRICT;Big.roundDown=0;Big.roundHalfUp=1;Big.roundHalfEven=2;Big.roundUp=3;return Big;}/*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */function parse(x,n){var e,i,nl;if(!NUMERIC.test(n)){throw Error(INVALID+'number');}// Determine sign.
x.s=n.charAt(0)=='-'?(n=n.slice(1),-1):1;// Decimal point?
if((e=n.indexOf('.'))>-1)n=n.replace('.','');// Exponential form?
if((i=n.search(/e/i))>0){// Determine exponent.
if(e<0)e=i;e+=+n.slice(i+1);n=n.substring(0,i);}else if(e<0){// Integer.
e=n.length;}nl=n.length;// Determine leading zeros.
for(i=0;i<nl&&n.charAt(i)=='0';)++i;if(i==nl){// Zero.
x.c=[x.e=0];}else{// Determine trailing zeros.
for(;nl>0&&n.charAt(--nl)=='0';);x.e=e-i-1;x.c=[];// Convert string to array of digits without leading/trailing zeros.
for(e=0;i<=nl;)x.c[e++]=+n.charAt(i++);}return x;}/*
   * Round Big x to a maximum of sd significant digits using rounding mode rm.
   *
   * x {Big} The Big to round.
   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   * [more] {boolean} Whether the result of division was truncated.
   */function round(x,sd,rm,more){var xc=x.c;if(rm===UNDEFINED)rm=x.constructor.RM;if(rm!==0&&rm!==1&&rm!==2&&rm!==3){throw Error(INVALID_RM);}if(sd<1){more=rm===3&&(more||!!xc[0])||sd===0&&(rm===1&&xc[0]>=5||rm===2&&(xc[0]>5||xc[0]===5&&(more||xc[1]!==UNDEFINED)));xc.length=1;if(more){// 1, 0.1, 0.01, 0.001, 0.0001 etc.
x.e=x.e-sd+1;xc[0]=1;}else{// Zero.
xc[0]=x.e=0;}}else if(sd<xc.length){// xc[sd] is the digit after the digit that may be rounded up.
more=rm===1&&xc[sd]>=5||rm===2&&(xc[sd]>5||xc[sd]===5&&(more||xc[sd+1]!==UNDEFINED||xc[sd-1]&1))||rm===3&&(more||!!xc[0]);// Remove any digits after the required precision.
xc.length=sd;// Round up?
if(more){// Rounding up may mean the previous digit has to be rounded up.
for(;++xc[--sd]>9;){xc[sd]=0;if(sd===0){++x.e;xc.unshift(1);break;}}}// Remove trailing zeros.
for(sd=xc.length;!xc[--sd];)xc.pop();}return x;}/*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   */function stringify(x,doExponential,isNonzero){var e=x.e,s=x.c.join(''),n=s.length;// Exponential notation?
if(doExponential){s=s.charAt(0)+(n>1?'.'+s.slice(1):'')+(e<0?'e':'e+')+e;// Normal notation.
}else if(e<0){for(;++e;)s='0'+s;s='0.'+s;}else if(e>0){if(++e>n){for(e-=n;e--;)s+='0';}else if(e<n){s=s.slice(0,e)+'.'+s.slice(e);}}else if(n>1){s=s.charAt(0)+'.'+s.slice(1);}return x.s<0&&isNonzero?'-'+s:s;}// Prototype/instance methods
/*
   * Return a new Big whose value is the absolute value of this Big.
   */P.abs=function(){var x=new this.constructor(this);x.s=1;return x;};/*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
   */P.cmp=function(y){var isneg,x=this,xc=x.c,yc=(y=new x.constructor(y)).c,i=x.s,j=y.s,k=x.e,l=y.e;// Either zero?
if(!xc[0]||!yc[0])return!xc[0]?!yc[0]?0:-j:i;// Signs differ?
if(i!=j)return i;isneg=i<0;// Compare exponents.
if(k!=l)return k>l^isneg?1:-1;j=(k=xc.length)<(l=yc.length)?k:l;// Compare digit by digit.
for(i=-1;++i<j;){if(xc[i]!=yc[i])return xc[i]>yc[i]^isneg?1:-1;}// Compare lengths.
return k==l?0:k>l^isneg?1:-1;};/*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */P.div=function(y){var x=this,Big=x.constructor,a=x.c,// dividend
b=(y=new Big(y)).c,// divisor
k=x.s==y.s?1:-1,dp=Big.DP;if(dp!==~~dp||dp<0||dp>MAX_DP){throw Error(INVALID_DP);}// Divisor is zero?
if(!b[0]){throw Error(DIV_BY_ZERO);}// Dividend is 0? Return +-0.
if(!a[0]){y.s=k;y.c=[y.e=0];return y;}var bl,bt,n,cmp,ri,bz=b.slice(),ai=bl=b.length,al=a.length,r=a.slice(0,bl),// remainder
rl=r.length,q=y,// quotient
qc=q.c=[],qi=0,p=dp+(q.e=x.e-y.e)+1;// precision of the result
q.s=k;k=p<0?0:p;// Create version of divisor with leading zero.
bz.unshift(0);// Add zeros to make remainder as long as divisor.
for(;rl++<bl;)r.push(0);do{// n is how many times the divisor goes into current remainder.
for(n=0;n<10;n++){// Compare divisor and remainder.
if(bl!=(rl=r.length)){cmp=bl>rl?1:-1;}else{for(ri=-1,cmp=0;++ri<bl;){if(b[ri]!=r[ri]){cmp=b[ri]>r[ri]?1:-1;break;}}}// If divisor < remainder, subtract divisor from remainder.
if(cmp<0){// Remainder can't be more than 1 digit longer than divisor.
// Equalise lengths using divisor with extra leading zero?
for(bt=rl==bl?b:bz;rl;){if(r[--rl]<bt[rl]){ri=rl;for(;ri&&!r[--ri];)r[ri]=9;--r[ri];r[rl]+=10;}r[rl]-=bt[rl];}for(;!r[0];)r.shift();}else{break;}}// Add the digit n to the result array.
qc[qi++]=cmp?n:++n;// Update the remainder.
if(r[0]&&cmp)r[rl]=a[ai]||0;else r=[a[ai]];}while((ai++<al||r[0]!==UNDEFINED)&&k--);// Leading zero? Do not remove if result is simply zero (qi == 1).
if(!qc[0]&&qi!=1){// There can't be more than one zero.
qc.shift();q.e--;p--;}// Round?
if(qi>p)round(q,p,Big.RM,r[0]!==UNDEFINED);return q;};/*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */P.eq=function(y){return this.cmp(y)===0;};/*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */P.gt=function(y){return this.cmp(y)>0;};/*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */P.gte=function(y){return this.cmp(y)>-1;};/*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */P.lt=function(y){return this.cmp(y)<0;};/*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */P.lte=function(y){return this.cmp(y)<1;};/*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */P.minus=P.sub=function(y){var i,j,t,xlty,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;// Signs differ?
if(a!=b){y.s=-b;return x.plus(y);}var xc=x.c.slice(),xe=x.e,yc=y.c,ye=y.e;// Either zero?
if(!xc[0]||!yc[0]){if(yc[0]){y.s=-b;}else if(xc[0]){y=new Big(x);}else{y.s=1;}return y;}// Determine which is the bigger number. Prepend zeros to equalise exponents.
if(a=xe-ye){if(xlty=a<0){a=-a;t=xc;}else{ye=xe;t=yc;}t.reverse();for(b=a;b--;)t.push(0);t.reverse();}else{// Exponents equal. Check digit by digit.
j=((xlty=xc.length<yc.length)?xc:yc).length;for(a=b=0;b<j;b++){if(xc[b]!=yc[b]){xlty=xc[b]<yc[b];break;}}}// x < y? Point xc to the array of the bigger number.
if(xlty){t=xc;xc=yc;yc=t;y.s=-y.s;}/*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */if((b=(j=yc.length)-(i=xc.length))>0)for(;b--;)xc[i++]=0;// Subtract yc from xc.
for(b=i;j>a;){if(xc[--j]<yc[j]){for(i=j;i&&!xc[--i];)xc[i]=9;--xc[i];xc[j]+=10;}xc[j]-=yc[j];}// Remove trailing zeros.
for(;xc[--b]===0;)xc.pop();// Remove leading zeros and adjust exponent accordingly.
for(;xc[0]===0;){xc.shift();--ye;}if(!xc[0]){// n - n = +0
y.s=1;// Result must be zero.
xc=[ye=0];}y.c=xc;y.e=ye;return y;};/*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */P.mod=function(y){var ygtx,x=this,Big=x.constructor,a=x.s,b=(y=new Big(y)).s;if(!y.c[0]){throw Error(DIV_BY_ZERO);}x.s=y.s=1;ygtx=y.cmp(x)==1;x.s=a;y.s=b;if(ygtx)return new Big(x);a=Big.DP;b=Big.RM;Big.DP=Big.RM=0;x=x.div(y);Big.DP=a;Big.RM=b;return this.minus(x.times(y));};/*
   * Return a new Big whose value is the value of this Big negated.
   */P.neg=function(){var x=new this.constructor(this);x.s=-x.s;return x;};/*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */P.plus=P.add=function(y){var e,k,t,x=this,Big=x.constructor;y=new Big(y);// Signs differ?
if(x.s!=y.s){y.s=-y.s;return x.minus(y);}var xe=x.e,xc=x.c,ye=y.e,yc=y.c;// Either zero?
if(!xc[0]||!yc[0]){if(!yc[0]){if(xc[0]){y=new Big(x);}else{y.s=x.s;}}return y;}xc=xc.slice();// Prepend zeros to equalise exponents.
// Note: reverse faster than unshifts.
if(e=xe-ye){if(e>0){ye=xe;t=yc;}else{e=-e;t=xc;}t.reverse();for(;e--;)t.push(0);t.reverse();}// Point xc to the longer array.
if(xc.length-yc.length<0){t=yc;yc=xc;xc=t;}e=yc.length;// Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
for(k=0;e;xc[e]%=10)k=(xc[--e]=xc[e]+yc[e]+k)/10|0;// No need to check for zero, as +x + +y != 0 && -x + -y != 0
if(k){xc.unshift(k);++ye;}// Remove trailing zeros.
for(e=xc.length;xc[--e]===0;)xc.pop();y.c=xc;y.e=ye;return y;};/*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */P.pow=function(n){var x=this,one=new x.constructor('1'),y=one,isneg=n<0;if(n!==~~n||n<-MAX_POWER||n>MAX_POWER){throw Error(INVALID+'exponent');}if(isneg)n=-n;for(;;){if(n&1)y=y.times(x);n>>=1;if(!n)break;x=x.times(x);}return isneg?one.div(y):y;};/*
   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
   * significant digits using rounding mode rm, or Big.RM if rm is not specified.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */P.prec=function(sd,rm){if(sd!==~~sd||sd<1||sd>MAX_DP){throw Error(INVALID+'precision');}return round(new this.constructor(this),sd,rm);};/*
   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
   * using rounding mode rm, or Big.RM if rm is not specified.
   * If dp is negative, round to an integer which is a multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */P.round=function(dp,rm){if(dp===UNDEFINED)dp=0;else if(dp!==~~dp||dp<-MAX_DP||dp>MAX_DP){throw Error(INVALID_DP);}return round(new this.constructor(this),dp+this.e+1,rm);};/*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */P.sqrt=function(){var r,c,t,x=this,Big=x.constructor,s=x.s,e=x.e,half=new Big('0.5');// Zero?
if(!x.c[0])return new Big(x);// Negative?
if(s<0){throw Error(NAME+'No square root');}// Estimate.
s=Math.sqrt(x+'');// Math.sqrt underflow/overflow?
// Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
if(s===0||s===1/0){c=x.c.join('');if(!(c.length+e&1))c+='0';s=Math.sqrt(c);e=((e+1)/2|0)-(e<0||e&1);r=new Big((s==1/0?'5e':(s=s.toExponential()).slice(0,s.indexOf('e')+1))+e);}else{r=new Big(s+'');}e=r.e+(Big.DP+=4);// Newton-Raphson iteration.
do{t=r;r=half.times(t.plus(x.div(t)));}while(t.c.slice(0,e).join('')!==r.c.slice(0,e).join(''));return round(r,(Big.DP-=4)+r.e+1,Big.RM);};/*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */P.times=P.mul=function(y){var c,x=this,Big=x.constructor,xc=x.c,yc=(y=new Big(y)).c,a=xc.length,b=yc.length,i=x.e,j=y.e;// Determine sign of result.
y.s=x.s==y.s?1:-1;// Return signed 0 if either 0.
if(!xc[0]||!yc[0]){y.c=[y.e=0];return y;}// Initialise exponent of result as x.e + y.e.
y.e=i+j;// If array xc has fewer digits than yc, swap xc and yc, and lengths.
if(a<b){c=xc;xc=yc;yc=c;j=a;a=b;b=j;}// Initialise coefficient array of result with zeros.
for(c=new Array(j=a+b);j--;)c[j]=0;// Multiply.
// i is initially xc.length.
for(i=b;i--;){b=0;// a is yc.length.
for(j=a+i;j>i;){// Current sum of products at this digit position, plus carry.
b=c[j]+yc[i]*xc[j-i-1]+b;c[j--]=b%10;// carry
b=b/10|0;}c[j]=b;}// Increment result exponent if there is a final carry, otherwise remove leading zero.
if(b)++y.e;else c.shift();// Remove trailing zeros.
for(i=c.length;!c[--i];)c.pop();y.c=c;return y;};/*
   * Return a string representing the value of this Big in exponential notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */P.toExponential=function(dp,rm){var x=this,n=x.c[0];if(dp!==UNDEFINED){if(dp!==~~dp||dp<0||dp>MAX_DP){throw Error(INVALID_DP);}x=round(new x.constructor(x),++dp,rm);for(;x.c.length<dp;)x.c.push(0);}return stringify(x,true,!!n);};/*
   * Return a string representing the value of this Big in normal notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */P.toFixed=function(dp,rm){var x=this,n=x.c[0];if(dp!==UNDEFINED){if(dp!==~~dp||dp<0||dp>MAX_DP){throw Error(INVALID_DP);}x=round(new x.constructor(x),dp+x.e+1,rm);// x.e may have changed if the value is rounded up.
for(dp=dp+x.e+1;x.c.length<dp;)x.c.push(0);}return stringify(x,false,!!n);};/*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */P.toJSON=P.toString=function(){var x=this,Big=x.constructor;return stringify(x,x.e<=Big.NE||x.e>=Big.PE,!!x.c[0]);};/*
   * Return the value of this Big as a primitve number.
   */P.toNumber=function(){var n=Number(stringify(this,true,true));if(this.constructor.strict===true&&!this.eq(n.toString())){throw Error(NAME+'Imprecise conversion');}return n;};/*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * rounding mode rm, or Big.RM if rm is not specified.
   * Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */P.toPrecision=function(sd,rm){var x=this,Big=x.constructor,n=x.c[0];if(sd!==UNDEFINED){if(sd!==~~sd||sd<1||sd>MAX_DP){throw Error(INVALID+'precision');}x=round(new Big(x),sd,rm);for(;x.c.length<sd;)x.c.push(0);}return stringify(x,sd<=x.e||x.e<=Big.NE||x.e>=Big.PE,!!n);};/*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */P.valueOf=function(){var x=this,Big=x.constructor;if(Big.strict===true){throw Error(NAME+'valueOf disallowed');}return stringify(x,x.e<=Big.NE||x.e>=Big.PE,true);};// Export
Big=_Big_();Big['default']=Big.Big=Big;//AMD.
if(typeof define==='function'&&define.amd){define(function(){return Big;});// Node and other CommonJS-like environments that support module.exports.
}else if(typeof module!=='undefined'&&module.exports){module.exports=Big;//Browser.
}else{GLOBAL.Big=Big;}})(this);},{}],18:[function(require,module,exports){},{}],19:[function(require,module,exports){arguments[4][18][0].apply(exports,arguments);},{"dup":18}],20:[function(require,module,exports){(function(Buffer){(function(){/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */'use strict';var base64=require('base64-js');var ieee754=require('ieee754');exports.Buffer=Buffer;exports.SlowBuffer=SlowBuffer;exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=0x7fffffff;exports.kMaxLength=K_MAX_LENGTH;/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport();if(!Buffer.TYPED_ARRAY_SUPPORT&&typeof console!=='undefined'&&typeof console.error==='function'){console.error('This browser lacks typed array (Uint8Array) support which is required by '+'`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');}function typedArraySupport(){// Can typed array instances can be augmented?
try{var arr=new Uint8Array(1);arr.__proto__={__proto__:Uint8Array.prototype,foo:function foo(){return 42;}};return arr.foo()===42;}catch(e){return false;}}Object.defineProperty(Buffer.prototype,'parent',{enumerable:true,get:function get(){if(!Buffer.isBuffer(this))return undefined;return this.buffer;}});Object.defineProperty(Buffer.prototype,'offset',{enumerable:true,get:function get(){if(!Buffer.isBuffer(this))return undefined;return this.byteOffset;}});function createBuffer(length){if(length>K_MAX_LENGTH){throw new RangeError('The value "'+length+'" is invalid for option "size"');}// Return an augmented `Uint8Array` instance
var buf=new Uint8Array(length);buf.__proto__=Buffer.prototype;return buf;}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function Buffer(arg,encodingOrOffset,length){// Common case.
if(typeof arg==='number'){if(typeof encodingOrOffset==='string'){throw new TypeError('The "string" argument must be of type string. Received type number');}return allocUnsafe(arg);}return from(arg,encodingOrOffset,length);}// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if(typeof Symbol!=='undefined'&&Symbol.species!=null&&Buffer[Symbol.species]===Buffer){Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false});}Buffer.poolSize=8192;// not used by this implementation
function from(value,encodingOrOffset,length){if(typeof value==='string'){return fromString(value,encodingOrOffset);}if(ArrayBuffer.isView(value)){return fromArrayLike(value);}if(value==null){throw TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, '+'or Array-like Object. Received type '+_typeof(value));}if(isInstance(value,ArrayBuffer)||value&&isInstance(value.buffer,ArrayBuffer)){return fromArrayBuffer(value,encodingOrOffset,length);}if(typeof value==='number'){throw new TypeError('The "value" argument must not be of type number. Received type number');}var valueOf=value.valueOf&&value.valueOf();if(valueOf!=null&&valueOf!==value){return Buffer.from(valueOf,encodingOrOffset,length);}var b=fromObject(value);if(b)return b;if(typeof Symbol!=='undefined'&&Symbol.toPrimitive!=null&&typeof value[Symbol.toPrimitive]==='function'){return Buffer.from(value[Symbol.toPrimitive]('string'),encodingOrOffset,length);}throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, '+'or Array-like Object. Received type '+_typeof(value));}/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/Buffer.from=function(value,encodingOrOffset,length){return from(value,encodingOrOffset,length);};// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__=Uint8Array.prototype;Buffer.__proto__=Uint8Array;function assertSize(size){if(typeof size!=='number'){throw new TypeError('"size" argument must be of type number');}else if(size<0){throw new RangeError('The value "'+size+'" is invalid for option "size"');}}function alloc(size,fill,encoding){assertSize(size);if(size<=0){return createBuffer(size);}if(fill!==undefined){// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding==='string'?createBuffer(size).fill(fill,encoding):createBuffer(size).fill(fill);}return createBuffer(size);}/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/Buffer.alloc=function(size,fill,encoding){return alloc(size,fill,encoding);};function allocUnsafe(size){assertSize(size);return createBuffer(size<0?0:checked(size)|0);}/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */Buffer.allocUnsafe=function(size){return allocUnsafe(size);};/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */Buffer.allocUnsafeSlow=function(size){return allocUnsafe(size);};function fromString(string,encoding){if(typeof encoding!=='string'||encoding===''){encoding='utf8';}if(!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}var length=byteLength(string,encoding)|0;var buf=createBuffer(length);var actual=buf.write(string,encoding);if(actual!==length){// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
buf=buf.slice(0,actual);}return buf;}function fromArrayLike(array){var length=array.length<0?0:checked(array.length)|0;var buf=createBuffer(length);for(var i=0;i<length;i+=1){buf[i]=array[i]&255;}return buf;}function fromArrayBuffer(array,byteOffset,length){if(byteOffset<0||array.byteLength<byteOffset){throw new RangeError('"offset" is outside of buffer bounds');}if(array.byteLength<byteOffset+(length||0)){throw new RangeError('"length" is outside of buffer bounds');}var buf;if(byteOffset===undefined&&length===undefined){buf=new Uint8Array(array);}else if(length===undefined){buf=new Uint8Array(array,byteOffset);}else{buf=new Uint8Array(array,byteOffset,length);}// Return an augmented `Uint8Array` instance
buf.__proto__=Buffer.prototype;return buf;}function fromObject(obj){if(Buffer.isBuffer(obj)){var len=checked(obj.length)|0;var buf=createBuffer(len);if(buf.length===0){return buf;}obj.copy(buf,0,0,len);return buf;}if(obj.length!==undefined){if(typeof obj.length!=='number'||numberIsNaN(obj.length)){return createBuffer(0);}return fromArrayLike(obj);}if(obj.type==='Buffer'&&Array.isArray(obj.data)){return fromArrayLike(obj.data);}}function checked(length){// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(length>=K_MAX_LENGTH){throw new RangeError('Attempt to allocate Buffer larger than maximum '+'size: 0x'+K_MAX_LENGTH.toString(16)+' bytes');}return length|0;}function SlowBuffer(length){if(+length!=length){// eslint-disable-line eqeqeq
length=0;}return Buffer.alloc(+length);}Buffer.isBuffer=function isBuffer(b){return b!=null&&b._isBuffer===true&&b!==Buffer.prototype;// so Buffer.isBuffer(Buffer.prototype) will be false
};Buffer.compare=function compare(a,b){if(isInstance(a,Uint8Array))a=Buffer.from(a,a.offset,a.byteLength);if(isInstance(b,Uint8Array))b=Buffer.from(b,b.offset,b.byteLength);if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');}if(a===b)return 0;var x=a.length;var y=b.length;for(var i=0,len=Math.min(x,y);i<len;++i){if(a[i]!==b[i]){x=a[i];y=b[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};Buffer.isEncoding=function isEncoding(encoding){switch(String(encoding).toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'latin1':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return true;default:return false;}};Buffer.concat=function concat(list,length){if(!Array.isArray(list)){throw new TypeError('"list" argument must be an Array of Buffers');}if(list.length===0){return Buffer.alloc(0);}var i;if(length===undefined){length=0;for(i=0;i<list.length;++i){length+=list[i].length;}}var buffer=Buffer.allocUnsafe(length);var pos=0;for(i=0;i<list.length;++i){var buf=list[i];if(isInstance(buf,Uint8Array)){buf=Buffer.from(buf);}if(!Buffer.isBuffer(buf)){throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer,pos);pos+=buf.length;}return buffer;};function byteLength(string,encoding){if(Buffer.isBuffer(string)){return string.length;}if(ArrayBuffer.isView(string)||isInstance(string,ArrayBuffer)){return string.byteLength;}if(typeof string!=='string'){throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. '+'Received type '+_typeof(string));}var len=string.length;var mustMatch=arguments.length>2&&arguments[2]===true;if(!mustMatch&&len===0)return 0;// Use a for loop to avoid recursion
var loweredCase=false;for(;;){switch(encoding){case'ascii':case'latin1':case'binary':return len;case'utf8':case'utf-8':return utf8ToBytes(string).length;case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return len*2;case'hex':return len>>>1;case'base64':return base64ToBytes(string).length;default:if(loweredCase){return mustMatch?-1:utf8ToBytes(string).length;// assume utf8
}encoding=(''+encoding).toLowerCase();loweredCase=true;}}}Buffer.byteLength=byteLength;function slowToString(encoding,start,end){var loweredCase=false;// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if(start===undefined||start<0){start=0;}// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if(start>this.length){return'';}if(end===undefined||end>this.length){end=this.length;}if(end<=0){return'';}// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end>>>=0;start>>>=0;if(end<=start){return'';}if(!encoding)encoding='utf8';while(true){switch(encoding){case'hex':return hexSlice(this,start,end);case'utf8':case'utf-8':return utf8Slice(this,start,end);case'ascii':return asciiSlice(this,start,end);case'latin1':case'binary':return latin1Slice(this,start,end);case'base64':return base64Slice(this,start,end);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return utf16leSlice(this,start,end);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(encoding+'').toLowerCase();loweredCase=true;}}}// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer=true;function swap(b,n,m){var i=b[n];b[n]=b[m];b[m]=i;}Buffer.prototype.swap16=function swap16(){var len=this.length;if(len%2!==0){throw new RangeError('Buffer size must be a multiple of 16-bits');}for(var i=0;i<len;i+=2){swap(this,i,i+1);}return this;};Buffer.prototype.swap32=function swap32(){var len=this.length;if(len%4!==0){throw new RangeError('Buffer size must be a multiple of 32-bits');}for(var i=0;i<len;i+=4){swap(this,i,i+3);swap(this,i+1,i+2);}return this;};Buffer.prototype.swap64=function swap64(){var len=this.length;if(len%8!==0){throw new RangeError('Buffer size must be a multiple of 64-bits');}for(var i=0;i<len;i+=8){swap(this,i,i+7);swap(this,i+1,i+6);swap(this,i+2,i+5);swap(this,i+3,i+4);}return this;};Buffer.prototype.toString=function toString(){var length=this.length;if(length===0)return'';if(arguments.length===0)return utf8Slice(this,0,length);return slowToString.apply(this,arguments);};Buffer.prototype.toLocaleString=Buffer.prototype.toString;Buffer.prototype.equals=function equals(b){if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');if(this===b)return true;return Buffer.compare(this,b)===0;};Buffer.prototype.inspect=function inspect(){var str='';var max=exports.INSPECT_MAX_BYTES;str=this.toString('hex',0,max).replace(/(.{2})/g,'$1 ').trim();if(this.length>max)str+=' ... ';return'<Buffer '+str+'>';};Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){if(isInstance(target,Uint8Array)){target=Buffer.from(target,target.offset,target.byteLength);}if(!Buffer.isBuffer(target)){throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. '+'Received type '+_typeof(target));}if(start===undefined){start=0;}if(end===undefined){end=target?target.length:0;}if(thisStart===undefined){thisStart=0;}if(thisEnd===undefined){thisEnd=this.length;}if(start<0||end>target.length||thisStart<0||thisEnd>this.length){throw new RangeError('out of range index');}if(thisStart>=thisEnd&&start>=end){return 0;}if(thisStart>=thisEnd){return-1;}if(start>=end){return 1;}start>>>=0;end>>>=0;thisStart>>>=0;thisEnd>>>=0;if(this===target)return 0;var x=thisEnd-thisStart;var y=end-start;var len=Math.min(x,y);var thisCopy=this.slice(thisStart,thisEnd);var targetCopy=target.slice(start,end);for(var i=0;i<len;++i){if(thisCopy[i]!==targetCopy[i]){x=thisCopy[i];y=targetCopy[i];break;}}if(x<y)return-1;if(y<x)return 1;return 0;};// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){// Empty buffer means no match
if(buffer.length===0)return-1;// Normalize byteOffset
if(typeof byteOffset==='string'){encoding=byteOffset;byteOffset=0;}else if(byteOffset>0x7fffffff){byteOffset=0x7fffffff;}else if(byteOffset<-0x80000000){byteOffset=-0x80000000;}byteOffset=+byteOffset;// Coerce to Number.
if(numberIsNaN(byteOffset)){// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
byteOffset=dir?0:buffer.length-1;}// Normalize byteOffset: negative offsets start from the end of the buffer
if(byteOffset<0)byteOffset=buffer.length+byteOffset;if(byteOffset>=buffer.length){if(dir)return-1;else byteOffset=buffer.length-1;}else if(byteOffset<0){if(dir)byteOffset=0;else return-1;}// Normalize val
if(typeof val==='string'){val=Buffer.from(val,encoding);}// Finally, search either indexOf (if dir is true) or lastIndexOf
if(Buffer.isBuffer(val)){// Special case: looking for empty string/buffer always fails
if(val.length===0){return-1;}return arrayIndexOf(buffer,val,byteOffset,encoding,dir);}else if(typeof val==='number'){val=val&0xFF;// Search for a byte value [0-255]
if(typeof Uint8Array.prototype.indexOf==='function'){if(dir){return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);}else{return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);}}return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);}throw new TypeError('val must be string, number or Buffer');}function arrayIndexOf(arr,val,byteOffset,encoding,dir){var indexSize=1;var arrLength=arr.length;var valLength=val.length;if(encoding!==undefined){encoding=String(encoding).toLowerCase();if(encoding==='ucs2'||encoding==='ucs-2'||encoding==='utf16le'||encoding==='utf-16le'){if(arr.length<2||val.length<2){return-1;}indexSize=2;arrLength/=2;valLength/=2;byteOffset/=2;}}function read(buf,i){if(indexSize===1){return buf[i];}else{return buf.readUInt16BE(i*indexSize);}}var i;if(dir){var foundIndex=-1;for(i=byteOffset;i<arrLength;i++){if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){if(foundIndex===-1)foundIndex=i;if(i-foundIndex+1===valLength)return foundIndex*indexSize;}else{if(foundIndex!==-1)i-=i-foundIndex;foundIndex=-1;}}}else{if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;for(i=byteOffset;i>=0;i--){var found=true;for(var j=0;j<valLength;j++){if(read(arr,i+j)!==read(val,j)){found=false;break;}}if(found)return i;}}return-1;}Buffer.prototype.includes=function includes(val,byteOffset,encoding){return this.indexOf(val,byteOffset,encoding)!==-1;};Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,true);};Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){return bidirectionalIndexOf(this,val,byteOffset,encoding,false);};function hexWrite(buf,string,offset,length){offset=Number(offset)||0;var remaining=buf.length-offset;if(!length){length=remaining;}else{length=Number(length);if(length>remaining){length=remaining;}}var strLen=string.length;if(length>strLen/2){length=strLen/2;}for(var i=0;i<length;++i){var parsed=parseInt(string.substr(i*2,2),16);if(numberIsNaN(parsed))return i;buf[offset+i]=parsed;}return i;}function utf8Write(buf,string,offset,length){return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);}function asciiWrite(buf,string,offset,length){return blitBuffer(asciiToBytes(string),buf,offset,length);}function latin1Write(buf,string,offset,length){return asciiWrite(buf,string,offset,length);}function base64Write(buf,string,offset,length){return blitBuffer(base64ToBytes(string),buf,offset,length);}function ucs2Write(buf,string,offset,length){return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);}Buffer.prototype.write=function write(string,offset,length,encoding){// Buffer#write(string)
if(offset===undefined){encoding='utf8';length=this.length;offset=0;// Buffer#write(string, encoding)
}else if(length===undefined&&typeof offset==='string'){encoding=offset;length=this.length;offset=0;// Buffer#write(string, offset[, length][, encoding])
}else if(isFinite(offset)){offset=offset>>>0;if(isFinite(length)){length=length>>>0;if(encoding===undefined)encoding='utf8';}else{encoding=length;length=undefined;}}else{throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');}var remaining=this.length-offset;if(length===undefined||length>remaining)length=remaining;if(string.length>0&&(length<0||offset<0)||offset>this.length){throw new RangeError('Attempt to write outside buffer bounds');}if(!encoding)encoding='utf8';var loweredCase=false;for(;;){switch(encoding){case'hex':return hexWrite(this,string,offset,length);case'utf8':case'utf-8':return utf8Write(this,string,offset,length);case'ascii':return asciiWrite(this,string,offset,length);case'latin1':case'binary':return latin1Write(this,string,offset,length);case'base64':// Warning: maxLength not taken into account in base64Write
return base64Write(this,string,offset,length);case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return ucs2Write(this,string,offset,length);default:if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);encoding=(''+encoding).toLowerCase();loweredCase=true;}}};Buffer.prototype.toJSON=function toJSON(){return{type:'Buffer',data:Array.prototype.slice.call(this._arr||this,0)};};function base64Slice(buf,start,end){if(start===0&&end===buf.length){return base64.fromByteArray(buf);}else{return base64.fromByteArray(buf.slice(start,end));}}function utf8Slice(buf,start,end){end=Math.min(buf.length,end);var res=[];var i=start;while(i<end){var firstByte=buf[i];var codePoint=null;var bytesPerSequence=firstByte>0xEF?4:firstByte>0xDF?3:firstByte>0xBF?2:1;if(i+bytesPerSequence<=end){var secondByte,thirdByte,fourthByte,tempCodePoint;switch(bytesPerSequence){case 1:if(firstByte<0x80){codePoint=firstByte;}break;case 2:secondByte=buf[i+1];if((secondByte&0xC0)===0x80){tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;if(tempCodePoint>0x7F){codePoint=tempCodePoint;}}break;case 3:secondByte=buf[i+1];thirdByte=buf[i+2];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){codePoint=tempCodePoint;}}break;case 4:secondByte=buf[i+1];thirdByte=buf[i+2];fourthByte=buf[i+3];if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){codePoint=tempCodePoint;}}}}if(codePoint===null){// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint=0xFFFD;bytesPerSequence=1;}else if(codePoint>0xFFFF){// encode to utf16 (surrogate pair dance)
codePoint-=0x10000;res.push(codePoint>>>10&0x3FF|0xD800);codePoint=0xDC00|codePoint&0x3FF;}res.push(codePoint);i+=bytesPerSequence;}return decodeCodePointsArray(res);}// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH=0x1000;function decodeCodePointsArray(codePoints){var len=codePoints.length;if(len<=MAX_ARGUMENTS_LENGTH){return String.fromCharCode.apply(String,codePoints);// avoid extra slice()
}// Decode in chunks to avoid "call stack size exceeded".
var res='';var i=0;while(i<len){res+=String.fromCharCode.apply(String,codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]&0x7F);}return ret;}function latin1Slice(buf,start,end){var ret='';end=Math.min(buf.length,end);for(var i=start;i<end;++i){ret+=String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf,start,end){var len=buf.length;if(!start||start<0)start=0;if(!end||end<0||end>len)end=len;var out='';for(var i=start;i<end;++i){out+=toHex(buf[i]);}return out;}function utf16leSlice(buf,start,end){var bytes=buf.slice(start,end);var res='';for(var i=0;i<bytes.length;i+=2){res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);}return res;}Buffer.prototype.slice=function slice(start,end){var len=this.length;start=~~start;end=end===undefined?len:~~end;if(start<0){start+=len;if(start<0)start=0;}else if(start>len){start=len;}if(end<0){end+=len;if(end<0)end=0;}else if(end>len){end=len;}if(end<start)end=start;var newBuf=this.subarray(start,end);// Return an augmented `Uint8Array` instance
newBuf.__proto__=Buffer.prototype;return newBuf;};/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function checkOffset(offset,ext,length){if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');}Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}return val;};Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){checkOffset(offset,byteLength,this.length);}var val=this[offset+--byteLength];var mul=1;while(byteLength>0&&(mul*=0x100)){val+=this[offset+--byteLength]*mul;}return val;};Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);return this[offset];};Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]|this[offset+1]<<8;};Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);return this[offset]<<8|this[offset+1];};Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return(this[offset]|this[offset+1]<<8|this[offset+2]<<16)+this[offset+3]*0x1000000;};Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]*0x1000000+(this[offset+1]<<16|this[offset+2]<<8|this[offset+3]);};Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var val=this[offset];var mul=1;var i=0;while(++i<byteLength&&(mul*=0x100)){val+=this[offset+i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert)checkOffset(offset,byteLength,this.length);var i=byteLength;var mul=1;var val=this[offset+--i];while(i>0&&(mul*=0x100)){val+=this[offset+--i]*mul;}mul*=0x80;if(val>=mul)val-=Math.pow(2,8*byteLength);return val;};Buffer.prototype.readInt8=function readInt8(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,1,this.length);if(!(this[offset]&0x80))return this[offset];return(0xff-this[offset]+1)*-1;};Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset]|this[offset+1]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,2,this.length);var val=this[offset+1]|this[offset]<<8;return val&0x8000?val|0xFFFF0000:val;};Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]|this[offset+1]<<8|this[offset+2]<<16|this[offset+3]<<24;};Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return this[offset]<<24|this[offset+1]<<16|this[offset+2]<<8|this[offset+3];};Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,true,23,4);};Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,4,this.length);return ieee754.read(this,offset,false,23,4);};Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,true,52,8);};Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){offset=offset>>>0;if(!noAssert)checkOffset(offset,8,this.length);return ieee754.read(this,offset,false,52,8);};function checkInt(buf,value,offset,ext,max,min){if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');if(offset+ext>buf.length)throw new RangeError('Index out of range');}Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var mul=1;var i=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;byteLength=byteLength>>>0;if(!noAssert){var maxBytes=Math.pow(2,8*byteLength)-1;checkInt(this,value,offset,byteLength,maxBytes,0);}var i=byteLength-1;var mul=1;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){this[offset+i]=value/mul&0xFF;}return offset+byteLength;};Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,0xff,0);this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);this[offset]=value&0xff;this[offset+1]=value>>>8;return offset+2;};Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0xffff,0);this[offset]=value>>>8;this[offset+1]=value&0xff;return offset+2;};Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);this[offset+3]=value>>>24;this[offset+2]=value>>>16;this[offset+1]=value>>>8;this[offset]=value&0xff;return offset+4;};Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;return offset+4;};Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=0;var mul=1;var sub=0;this[offset]=value&0xFF;while(++i<byteLength&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i-1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){value=+value;offset=offset>>>0;if(!noAssert){var limit=Math.pow(2,8*byteLength-1);checkInt(this,value,offset,byteLength,limit-1,-limit);}var i=byteLength-1;var mul=1;var sub=0;this[offset+i]=value&0xFF;while(--i>=0&&(mul*=0x100)){if(value<0&&sub===0&&this[offset+i+1]!==0){sub=1;}this[offset+i]=(value/mul>>0)-sub&0xFF;}return offset+byteLength;};Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);if(value<0)value=0xff+value+1;this[offset]=value&0xff;return offset+1;};Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);this[offset]=value&0xff;this[offset+1]=value>>>8;return offset+2;};Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);this[offset]=value>>>8;this[offset+1]=value&0xff;return offset+2;};Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);this[offset]=value&0xff;this[offset+1]=value>>>8;this[offset+2]=value>>>16;this[offset+3]=value>>>24;return offset+4;};Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){value=+value;offset=offset>>>0;if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);if(value<0)value=0xffffffff+value+1;this[offset]=value>>>24;this[offset+1]=value>>>16;this[offset+2]=value>>>8;this[offset+3]=value&0xff;return offset+4;};function checkIEEE754(buf,value,offset,ext,max,min){if(offset+ext>buf.length)throw new RangeError('Index out of range');if(offset<0)throw new RangeError('Index out of range');}function writeFloat(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);}ieee754.write(buf,value,offset,littleEndian,23,4);return offset+4;}Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){return writeFloat(this,value,offset,true,noAssert);};Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){return writeFloat(this,value,offset,false,noAssert);};function writeDouble(buf,value,offset,littleEndian,noAssert){value=+value;offset=offset>>>0;if(!noAssert){checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);}ieee754.write(buf,value,offset,littleEndian,52,8);return offset+8;}Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){return writeDouble(this,value,offset,true,noAssert);};Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){return writeDouble(this,value,offset,false,noAssert);};// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy=function copy(target,targetStart,start,end){if(!Buffer.isBuffer(target))throw new TypeError('argument should be a Buffer');if(!start)start=0;if(!end&&end!==0)end=this.length;if(targetStart>=target.length)targetStart=target.length;if(!targetStart)targetStart=0;if(end>0&&end<start)end=start;// Copy 0 bytes; we're done
if(end===start)return 0;if(target.length===0||this.length===0)return 0;// Fatal error conditions
if(targetStart<0){throw new RangeError('targetStart out of bounds');}if(start<0||start>=this.length)throw new RangeError('Index out of range');if(end<0)throw new RangeError('sourceEnd out of bounds');// Are we oob?
if(end>this.length)end=this.length;if(target.length-targetStart<end-start){end=target.length-targetStart+start;}var len=end-start;if(this===target&&typeof Uint8Array.prototype.copyWithin==='function'){// Use built-in when available, missing from IE11
this.copyWithin(targetStart,start,end);}else if(this===target&&start<targetStart&&targetStart<end){// descending copy from end
for(var i=len-1;i>=0;--i){target[i+targetStart]=this[i+start];}}else{Uint8Array.prototype.set.call(target,this.subarray(start,end),targetStart);}return len;};// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill=function fill(val,start,end,encoding){// Handle string cases:
if(typeof val==='string'){if(typeof start==='string'){encoding=start;start=0;end=this.length;}else if(typeof end==='string'){encoding=end;end=this.length;}if(encoding!==undefined&&typeof encoding!=='string'){throw new TypeError('encoding must be a string');}if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){throw new TypeError('Unknown encoding: '+encoding);}if(val.length===1){var code=val.charCodeAt(0);if(encoding==='utf8'&&code<128||encoding==='latin1'){// Fast path: If `val` fits into a single byte, use that numeric value.
val=code;}}}else if(typeof val==='number'){val=val&255;}// Invalid ranges are not set to a default, so can range check early.
if(start<0||this.length<start||this.length<end){throw new RangeError('Out of range index');}if(end<=start){return this;}start=start>>>0;end=end===undefined?this.length:end>>>0;if(!val)val=0;var i;if(typeof val==='number'){for(i=start;i<end;++i){this[i]=val;}}else{var bytes=Buffer.isBuffer(val)?val:Buffer.from(val,encoding);var len=bytes.length;if(len===0){throw new TypeError('The value "'+val+'" is invalid for argument "value"');}for(i=0;i<end-start;++i){this[i+start]=bytes[i%len];}}return this;};// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;function base64clean(str){// Node takes equal signs as end of the Base64 encoding
str=str.split('=')[0];// Node strips out invalid characters like \n and \t from the string, base64-js does not
str=str.trim().replace(INVALID_BASE64_RE,'');// Node converts strings with length < 2 to ''
if(str.length<2)return'';// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
while(str.length%4!==0){str=str+'=';}return str;}function toHex(n){if(n<16)return'0'+n.toString(16);return n.toString(16);}function utf8ToBytes(string,units){units=units||Infinity;var codePoint;var length=string.length;var leadSurrogate=null;var bytes=[];for(var i=0;i<length;++i){codePoint=string.charCodeAt(i);// is surrogate component
if(codePoint>0xD7FF&&codePoint<0xE000){// last char was a lead
if(!leadSurrogate){// no lead yet
if(codePoint>0xDBFF){// unexpected trail
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}else if(i+1===length){// unpaired lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);continue;}// valid lead
leadSurrogate=codePoint;continue;}// 2 leads in a row
if(codePoint<0xDC00){if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);leadSurrogate=codePoint;continue;}// valid surrogate pair
codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;}else if(leadSurrogate){// valid bmp char, but last char was a lead
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);}leadSurrogate=null;// encode utf8
if(codePoint<0x80){if((units-=1)<0)break;bytes.push(codePoint);}else if(codePoint<0x800){if((units-=2)<0)break;bytes.push(codePoint>>0x6|0xC0,codePoint&0x3F|0x80);}else if(codePoint<0x10000){if((units-=3)<0)break;bytes.push(codePoint>>0xC|0xE0,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else if(codePoint<0x110000){if((units-=4)<0)break;bytes.push(codePoint>>0x12|0xF0,codePoint>>0xC&0x3F|0x80,codePoint>>0x6&0x3F|0x80,codePoint&0x3F|0x80);}else{throw new Error('Invalid code point');}}return bytes;}function asciiToBytes(str){var byteArray=[];for(var i=0;i<str.length;++i){// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i)&0xFF);}return byteArray;}function utf16leToBytes(str,units){var c,hi,lo;var byteArray=[];for(var i=0;i<str.length;++i){if((units-=2)<0)break;c=str.charCodeAt(i);hi=c>>8;lo=c%256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str){return base64.toByteArray(base64clean(str));}function blitBuffer(src,dst,offset,length){for(var i=0;i<length;++i){if(i+offset>=dst.length||i>=src.length)break;dst[i+offset]=src[i];}return i;}// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj,type){return obj instanceof type||obj!=null&&obj.constructor!=null&&obj.constructor.name!=null&&obj.constructor.name===type.name;}function numberIsNaN(obj){// For IE11 support
return obj!==obj;// eslint-disable-line no-self-compare
}}).call(this);}).call(this,require("buffer").Buffer);},{"base64-js":16,"buffer":20,"ieee754":77}],21:[function(require,module,exports){module.exports={"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I'm a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"};},{}],22:[function(require,module,exports){/**
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
* @author Steven Velozo <steven@velozo.com>
*/var libFableServiceProviderBase=require('fable-serviceproviderbase');var libLinkedList=require("./LinkedList.js");var CashMoney=/*#__PURE__*/function(_libFableServiceProvi){_inherits(CashMoney,_libFableServiceProvi);var _super=_createSuper(CashMoney);function CashMoney(pFable,pManifest,pServiceHash){var _this3;_classCallCheck2(this,CashMoney);if(pFable===undefined){_this3=_super.call(this,{});}else{_this3=_super.call(this,pFable,pManifest,pServiceHash);}_this3.serviceType='ObjectCache';// The map of node objects by hash because Reasons.
_this3._HashMap={};_this3._RecordMap={};_this3._List=new libLinkedList();// If the list gets over maxLength, we will automatically remove nodes on insertion.
_this3.maxLength=0;// If cache entries get over this age, they are removed with prune
_this3.maxAge=0;return _possibleConstructorReturn(_this3);}_createClass2(CashMoney,[{key:"RecordMap",get:function get(){return this._RecordMap;}// Add (or update) a node in the cache
},{key:"put",value:function put(pData,pHash){// If the hash of the record exists
if(this._HashMap.hasOwnProperty(pHash)){// Just update the hashed records datum
this._HashMap[pHash].Datum=pData;this._RecordMap[pHash]=pData;return this._HashMap[pHash].Datum;}var tmpNode=this._List.push(pData,pHash);this._HashMap[tmpNode.Hash]=tmpNode;this._RecordMap[pHash]=pData;// Automatically prune if over length, but only prune this nodes worth.
if(this.maxLength>0&&this._List.length>this.maxLength){// Pop it off the head of the list
tmpNode=this._List.pop();// Also remove it from the hashmap
delete this._RecordMap[tmpNode.Hash];delete this._HashMap[tmpNode.Hash];}// Now some expiration properties on the node metadata... namely the birthdate in ms of the node
tmpNode.Metadata.Created=+new Date();return tmpNode.Datum;}// Read a datum by hash from the cache
},{key:"read",value:function read(pHash){if(!this._HashMap.hasOwnProperty(pHash)){return false;}return this._HashMap[pHash].Datum;}// Reinvigorate a node based on hash, updating the timestamp and moving it to the head of the list (also removes custom metadata)
},{key:"touch",value:function touch(pHash){if(!this._HashMap.hasOwnProperty(pHash)){return false;}// Get the old node out of the list
var tmpNode=this._List.remove(this._HashMap[pHash]);// Remove it from the hash map
delete this._RecordMap[pHash];delete this._HashMap[pHash];// Now put it back, fresh.
return this.put(tmpNode.Datum,tmpNode.Hash);}// Expire a cached record based on hash
},{key:"expire",value:function expire(pHash){if(!this._HashMap.hasOwnProperty(pHash)){return false;}var tmpNode=this._HashMap[pHash];// Remove it from the list of cached records
tmpNode=this._List.remove(tmpNode);// Also remove it from the hashmap
delete this._RecordMap[tmpNode.Hash];delete this._HashMap[tmpNode.Hash];// Return it in case the consumer wants to do anything with it
return tmpNode;}// Prune records from the cached set based on maxAge
},{key:"pruneBasedOnExpiration",value:function pruneBasedOnExpiration(fComplete,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;if(this.maxAge<1){return fComplete(tmpRemovedRecords);}// Now enumerate each record and remove any that are expired
var tmpNow=+new Date();var tmpKeys=Object.keys(this._HashMap);for(var i=0;i<tmpKeys.length;i++){// Expire the node if it is older than max age milliseconds
if(tmpNow-this._HashMap[tmpKeys[i]].Metadata.Created>=this.maxAge){tmpRemovedRecords.push(this.expire(tmpKeys[i]));}}fComplete(tmpRemovedRecords);}// Prune records from the cached set based on maxLength
},{key:"pruneBasedOnLength",value:function pruneBasedOnLength(fComplete,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;// Pop records off until we have reached maxLength unless it's 0
if(this.maxLength>0){while(this._List.length>this.maxLength){tmpRemovedRecords.push(this._List.pop());}}return fComplete(tmpRemovedRecords);}// Prune records from the cached set based on passed in pPruneFunction(pDatum, pHash, pNode) -- returning true expires it
},{key:"pruneCustom",value:function pruneCustom(fComplete,fPruneFunction,pRemovedRecords){var tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;var tmpKeys=Object.keys(this._HashMap);for(var i=0;i<tmpKeys.length;i++){var tmpNode=this._HashMap[tmpKeys[i]];// Expire the node if the passed in function returns true
if(fPruneFunction(tmpNode.Datum,tmpNode.Hash,tmpNode)){tmpRemovedRecords.push(this.expire(tmpKeys[i]));}}fComplete(tmpRemovedRecords);}// Prune the list down to the asserted rules (max age then max length if still too long)
},{key:"prune",value:function prune(fComplete){var _this4=this;var tmpRemovedRecords=[];// If there are no cached records, we are done.
if(this._List.length<1){return fComplete(tmpRemovedRecords);}// Now prune based on expiration time
this.pruneBasedOnExpiration(function(fExpirationPruneComplete){// Now prune based on length, then return the removed records in the callback.
_this4.pruneBasedOnLength(fComplete,tmpRemovedRecords);},tmpRemovedRecords);}// Get a low level node (including metadata statistics) by hash from the cache
},{key:"getNode",value:function getNode(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;return this._HashMap[pHash];}}]);return CashMoney;}(libFableServiceProviderBase);module.exports=CashMoney;},{"./LinkedList.js":24,"fable-serviceproviderbase":44}],23:[function(require,module,exports){/**
* Double Linked List Node
*
* @author Steven Velozo <steven@velozo.com>
* @module CashMoney
*/ /**
* Linked List Node Prototype
*
* @class LinkedListNode
* @constructor
*/var LinkedListNode=/*#__PURE__*/_createClass2(function LinkedListNode(){_classCallCheck2(this,LinkedListNode);this.Hash=false;this.Datum=false;// This is where expiration and other elements are stored;
this.Metadata={};this.LeftNode=false;this.RightNode=false;// To allow safe specialty operations on nodes
this.__ISNODE=true;});module.exports=LinkedListNode;},{}],24:[function(require,module,exports){"use strict";/**
* Simple double linked list to hold the cache entries in, in order.
*
* @author Steven Velozo <steven@velozo.com>
* @module FeeFiFo
*/var libLinkedListNode=require('./LinkedList-Node.js');/**
* Quality Cache Goodness
*
* @class CashMoney
* @constructor
*/var LinkedList=/*#__PURE__*/function(){function LinkedList(){_classCallCheck2(this,LinkedList);// Total number of nodes ever processed by this ADT
this.totalNodes=0;// The length of the set of nodes currently in the list
this.length=0;this.head=false;this.tail=false;}// Create a node object.
_createClass2(LinkedList,[{key:"initializeNode",value:function initializeNode(pDatum,pHash){// Don't allow undefined to be added to the list because of reasons
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
},{key:"each",value:function each(fAction,fComplete){var _this5=this;if(this.length<1)return fComplete();var tmpNode=false;var fIterator=function fIterator(pError){// If the user passed in a callback with an error, call their callback with the error
if(pError)return fComplete(pError);// If there is no node, this must be the initial run.
if(!tmpNode)tmpNode=_this5.head;// Check if we are at the tail of the list
else if(!tmpNode.RightNode)return fComplete();// Proceed to the next node
else tmpNode=tmpNode.RightNode;// Call the actual action
// I hate this pattern because long tails eventually cause stack overflows.
fAction(tmpNode.Datum,tmpNode.Hash,fIterator);};// Now kick off the iterator
return fIterator();}// Seek a specific node, 0 is the index of the first node.
},{key:"seek",value:function seek(pNodeIndex){if(!pNodeIndex)return false;if(this.length<1)return false;if(pNodeIndex>=this.length)return false;var tmpNode=this.head;for(var i=0;i<pNodeIndex;i++){tmpNode=tmpNode.RightNode;}return tmpNode;}}]);return LinkedList;}();module.exports=LinkedList;},{"./LinkedList-Node.js":23}],25:[function(require,module,exports){'use strict';var GetIntrinsic=require('get-intrinsic');var callBind=require('./');var $indexOf=callBind(GetIntrinsic('String.prototype.indexOf'));module.exports=function callBoundIntrinsic(name,allowMissing){var intrinsic=GetIntrinsic(name,!!allowMissing);if(typeof intrinsic==='function'&&$indexOf(name,'.prototype.')>-1){return callBind(intrinsic);}return intrinsic;};},{"./":26,"get-intrinsic":69}],26:[function(require,module,exports){'use strict';var bind=require('function-bind');var GetIntrinsic=require('get-intrinsic');var setFunctionLength=require('set-function-length');var $TypeError=GetIntrinsic('%TypeError%');var $apply=GetIntrinsic('%Function.prototype.apply%');var $call=GetIntrinsic('%Function.prototype.call%');var $reflectApply=GetIntrinsic('%Reflect.apply%',true)||bind.call($call,$apply);var $defineProperty=GetIntrinsic('%Object.defineProperty%',true);var $max=GetIntrinsic('%Math.max%');if($defineProperty){try{$defineProperty({},'a',{value:1});}catch(e){// IE 8 has a broken defineProperty
$defineProperty=null;}}module.exports=function callBind(originalFunction){if(typeof originalFunction!=='function'){throw new $TypeError('a function is required');}var func=$reflectApply(bind,$call,arguments);return setFunctionLength(func,1+$max(0,originalFunction.length-(arguments.length-1)),true);};var applyBind=function applyBind(){return $reflectApply(bind,$apply,arguments);};if($defineProperty){$defineProperty(module.exports,'apply',{value:applyBind});}else{module.exports.apply=applyBind;}},{"function-bind":68,"get-intrinsic":69,"set-function-length":109}],27:[function(require,module,exports){/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */'use strict';/**
 * Module exports.
 * @public
 */exports.parse=parse;exports.serialize=serialize;/**
 * Module variables.
 * @private
 */var __toString=Object.prototype.toString;/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */var fieldContentRegExp=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */function parse(str,options){if(typeof str!=='string'){throw new TypeError('argument str must be a string');}var obj={};var opt=options||{};var dec=opt.decode||decode;var index=0;while(index<str.length){var eqIdx=str.indexOf('=',index);// no more cookie pairs
if(eqIdx===-1){break;}var endIdx=str.indexOf(';',index);if(endIdx===-1){endIdx=str.length;}else if(endIdx<eqIdx){// backtrack on prior semicolon
index=str.lastIndexOf(';',eqIdx-1)+1;continue;}var key=str.slice(index,eqIdx).trim();// only assign once
if(undefined===obj[key]){var val=str.slice(eqIdx+1,endIdx).trim();// quoted values
if(val.charCodeAt(0)===0x22){val=val.slice(1,-1);}obj[key]=tryDecode(val,dec);}index=endIdx+1;}return obj;}/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */function serialize(name,val,options){var opt=options||{};var enc=opt.encode||encode;if(typeof enc!=='function'){throw new TypeError('option encode is invalid');}if(!fieldContentRegExp.test(name)){throw new TypeError('argument name is invalid');}var value=enc(val);if(value&&!fieldContentRegExp.test(value)){throw new TypeError('argument val is invalid');}var str=name+'='+value;if(null!=opt.maxAge){var maxAge=opt.maxAge-0;if(isNaN(maxAge)||!isFinite(maxAge)){throw new TypeError('option maxAge is invalid');}str+='; Max-Age='+Math.floor(maxAge);}if(opt.domain){if(!fieldContentRegExp.test(opt.domain)){throw new TypeError('option domain is invalid');}str+='; Domain='+opt.domain;}if(opt.path){if(!fieldContentRegExp.test(opt.path)){throw new TypeError('option path is invalid');}str+='; Path='+opt.path;}if(opt.expires){var expires=opt.expires;if(!isDate(expires)||isNaN(expires.valueOf())){throw new TypeError('option expires is invalid');}str+='; Expires='+expires.toUTCString();}if(opt.httpOnly){str+='; HttpOnly';}if(opt.secure){str+='; Secure';}if(opt.priority){var priority=typeof opt.priority==='string'?opt.priority.toLowerCase():opt.priority;switch(priority){case'low':str+='; Priority=Low';break;case'medium':str+='; Priority=Medium';break;case'high':str+='; Priority=High';break;default:throw new TypeError('option priority is invalid');}}if(opt.sameSite){var sameSite=typeof opt.sameSite==='string'?opt.sameSite.toLowerCase():opt.sameSite;switch(sameSite){case true:str+='; SameSite=Strict';break;case'lax':str+='; SameSite=Lax';break;case'strict':str+='; SameSite=Strict';break;case'none':str+='; SameSite=None';break;default:throw new TypeError('option sameSite is invalid');}}return str;}/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */function decode(str){return str.indexOf('%')!==-1?decodeURIComponent(str):str;}/**
 * URL-encode value.
 *
 * @param {string} str
 * @returns {string}
 */function encode(val){return encodeURIComponent(val);}/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */function isDate(val){return __toString.call(val)==='[object Date]'||val instanceof Date;}/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */function tryDecode(str,decode){try{return decode(str);}catch(e){return str;}}},{}],28:[function(require,module,exports){!function(t,e){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e();}(this,function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function ordinal(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]";}},m=function m(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t;},v={s:m,z:function z(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0");},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0);},a:function a(t){return t<0?Math.ceil(t)||0:Math.floor(t);},p:function p(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"");},u:function u(t){return void 0===t;}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function S(t){return t instanceof _||!(!t||!t[p]);},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0]);}else{var a=e.name;D[a]=e,i=a;}return!r&&i&&(g=i),i||!r&&g;},O=function O(t,e){if(S(t))return t.clone();var n="object"==_typeof(e)?e:{};return n.date=t,n.args=arguments,new _(n);},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset});};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date();if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s);}}return new Date(e);}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b;},m.isValid=function(){return!(this.$d.toString()===l);},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e);},m.isAfter=function(t,e){return O(t)<this.startOf(e);},m.isBefore=function(t,e){return this.endOf(e)<O(t);},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t);},m.unix=function(){return Math.floor(this.valueOf()/1e3);},m.valueOf=function(){return this.$d.getTime();},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function l(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a);},$=function $(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n);},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone();}},m.endOf=function(t){return this.startOf(t,!1);},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this;},m.set=function(t,e){return this.clone().$set(t,e);},m.get=function(t){return this[b.p(t)]();},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function y(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l);};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this);},m.subtract=function(t,e){return this.add(-1*t,e);},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function h(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s);},d=function d(t){return b.s(s%12||12,t,"0");},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r;};return r.replace(y,function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i;}return null;}(t)||i.replace(":","");});},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15);},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function D(){return b.m(y,m);};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($);},m.daysInMonth=function(){return this.endOf(c).$D;},m.$locale=function(){return D[this.$L];},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n;},m.clone=function(){return b.w(this.$d,this);},m.toDate=function(){return new Date(this.valueOf());},m.toJSON=function(){return this.isValid()?this.toISOString():null;},m.toISOString=function(){return this.$d.toISOString();},m.toString=function(){return this.$d.toUTCString();},M;}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach(function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1]);};}),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O;},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t);},O.en=D[g],O.Ls=D,O.p={},O;});},{}],29:[function(require,module,exports){!function(e,t){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_advancedFormat=t();}(this,function(){"use strict";return function(e,t){var r=t.prototype,n=r.format;r.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return n.bind(this)(e);var s=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return s.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return s.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return s.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return"["+t.offsetName()+"]";case"zzz":return"["+t.offsetName("long")+"]";default:return e;}});return n.bind(this)(a);};};});},{}],30:[function(require,module,exports){!function(e,t){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_isoWeek=t();}(this,function(){"use strict";var e="day";return function(t,i,s){var a=function a(t){return t.add(4-t.isoWeekday(),e);},d=i.prototype;d.isoWeekYear=function(){return a(this).year();},d.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),e);var i,d,n,o,r=a(this),u=(i=this.isoWeekYear(),d=this.$u,n=(d?s.utc:s)().year(i).startOf("year"),o=4-n.isoWeekday(),n.isoWeekday()>4&&(o+=7),n.add(o,e));return r.diff(u,"week")+1;},d.isoWeekday=function(e){return this.$utils().u(e)?this.day()||7:this.day(this.day()%7?e:e-7);};var n=d.startOf;d.startOf=function(e,t){var i=this.$utils(),s=!!i.u(t)||t;return"isoweek"===i.p(e)?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):n.bind(this)(e,t);};};});},{}],31:[function(require,module,exports){!function(r,e){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(r="undefined"!=typeof globalThis?globalThis:r||self).dayjs_plugin_relativeTime=e();}(this,function(){"use strict";return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o);}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break;}}if(n)return a;var M=s?l.future:l.past;return"function"==typeof M?M(a):M.replace("%s",a);},n.to=function(r,e){return i(r,e,this,!0);},n.from=function(r,e){return i(r,e,this);};var d=function d(r){return r.$u?t.utc():t();};n.toNow=function(r){return this.to(d(this),r);},n.fromNow=function(r){return this.from(d(this),r);};};});},{}],32:[function(require,module,exports){!function(t,e){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_timezone=e();}(this,function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function a(t,n,i){void 0===i&&(i={});var o=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r;}(n,i);return r.formatToParts(o);},u=function u(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,h=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",v=+e;return(o.utc(h).valueOf()-(v-=v%1e3))/6e4;},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=o(a,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute");}return f.$x.$timezone=t,f;},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find(function(t){return"timezonename"===t.type.toLowerCase();});return n&&n.value;};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return s.call(n,t,e).tz(this.$x.$timezone,!0);},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return[i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)];}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d;},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone;},o.tz.setDefault=function(t){r=t;};};});},{}],33:[function(require,module,exports){!function(t,i){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_utc=i();}(this,function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i);},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e;},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1});};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u;}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o;};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i);},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t;},u.isUTC=function(){return!!this.$u;},u.toISOString=function(){return this.toDate().toISOString();},u.toString=function(){return this.toDate().toUTCString();};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this);};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e);};};});},{}],34:[function(require,module,exports){!function(e,t){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_weekOfYear=t();}(this,function(){"use strict";var e="week",t="year";return function(i,n,r){var f=n.prototype;f.week=function(i){if(void 0===i&&(i=null),null!==i)return this.add(7*(i-this.week()),"day");var n=this.$locale().yearStart||1;if(11===this.month()&&this.date()>25){var f=r(this).startOf(t).add(1,t).date(n),s=r(this).endOf(e);if(f.isBefore(s))return 1;}var a=r(this).startOf(t).date(n).startOf(e).subtract(1,"millisecond"),o=this.diff(a,e,!0);return o<0?r(this).startOf("week").week():Math.ceil(o);},f.weeks=function(e){return void 0===e&&(e=null),this.week(e);};};});},{}],35:[function(require,module,exports){!function(e,t){"object"==_typeof(exports)&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_weekday=t();}(this,function(){"use strict";return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,i=this.$W,n=(i<t?i+7:i)-t;return this.$utils().u(e)?n:this.subtract(n,"day").add(e,"day");};};});},{}],36:[function(require,module,exports){'use strict';var hasPropertyDescriptors=require('has-property-descriptors')();var GetIntrinsic=require('get-intrinsic');var $defineProperty=hasPropertyDescriptors&&GetIntrinsic('%Object.defineProperty%',true);if($defineProperty){try{$defineProperty({},'a',{value:1});}catch(e){// IE 8 has a broken defineProperty
$defineProperty=false;}}var $SyntaxError=GetIntrinsic('%SyntaxError%');var $TypeError=GetIntrinsic('%TypeError%');var gopd=require('gopd');/** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */module.exports=function defineDataProperty(obj,property,value){if(!obj||_typeof(obj)!=='object'&&typeof obj!=='function'){throw new $TypeError('`obj` must be an object or a function`');}if(typeof property!=='string'&&_typeof(property)!=='symbol'){throw new $TypeError('`property` must be a string or a symbol`');}if(arguments.length>3&&typeof arguments[3]!=='boolean'&&arguments[3]!==null){throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');}if(arguments.length>4&&typeof arguments[4]!=='boolean'&&arguments[4]!==null){throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');}if(arguments.length>5&&typeof arguments[5]!=='boolean'&&arguments[5]!==null){throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');}if(arguments.length>6&&typeof arguments[6]!=='boolean'){throw new $TypeError('`loose`, if provided, must be a boolean');}var nonEnumerable=arguments.length>3?arguments[3]:null;var nonWritable=arguments.length>4?arguments[4]:null;var nonConfigurable=arguments.length>5?arguments[5]:null;var loose=arguments.length>6?arguments[6]:false;/* @type {false | TypedPropertyDescriptor<unknown>} */var desc=!!gopd&&gopd(obj,property);if($defineProperty){$defineProperty(obj,property,{configurable:nonConfigurable===null&&desc?desc.configurable:!nonConfigurable,enumerable:nonEnumerable===null&&desc?desc.enumerable:!nonEnumerable,value:value,writable:nonWritable===null&&desc?desc.writable:!nonWritable});}else if(loose||!nonEnumerable&&!nonWritable&&!nonConfigurable){// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
obj[property]=value;// eslint-disable-line no-param-reassign
}else{throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');}};},{"get-intrinsic":69,"gopd":70,"has-property-descriptors":71}],37:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';var R=(typeof Reflect==="undefined"?"undefined":_typeof(Reflect))==='object'?Reflect:null;var ReflectApply=R&&typeof R.apply==='function'?R.apply:function ReflectApply(target,receiver,args){return Function.prototype.apply.call(target,receiver,args);};var ReflectOwnKeys;if(R&&typeof R.ownKeys==='function'){ReflectOwnKeys=R.ownKeys;}else if(Object.getOwnPropertySymbols){ReflectOwnKeys=function ReflectOwnKeys(target){return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));};}else{ReflectOwnKeys=function ReflectOwnKeys(target){return Object.getOwnPropertyNames(target);};}function ProcessEmitWarning(warning){if(console&&console.warn)console.warn(warning);}var NumberIsNaN=Number.isNaN||function NumberIsNaN(value){return value!==value;};function EventEmitter(){EventEmitter.init.call(this);}module.exports=EventEmitter;module.exports.once=once;// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._eventsCount=0;EventEmitter.prototype._maxListeners=undefined;// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners=10;function checkListener(listener){if(typeof listener!=='function'){throw new TypeError('The "listener" argument must be of type Function. Received type '+_typeof(listener));}}Object.defineProperty(EventEmitter,'defaultMaxListeners',{enumerable:true,get:function get(){return defaultMaxListeners;},set:function set(arg){if(typeof arg!=='number'||arg<0||NumberIsNaN(arg)){throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+arg+'.');}defaultMaxListeners=arg;}});EventEmitter.init=function(){if(this._events===undefined||this._events===Object.getPrototypeOf(this)._events){this._events=Object.create(null);this._eventsCount=0;}this._maxListeners=this._maxListeners||undefined;};// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners=function setMaxListeners(n){if(typeof n!=='number'||n<0||NumberIsNaN(n)){throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+n+'.');}this._maxListeners=n;return this;};function _getMaxListeners(that){if(that._maxListeners===undefined)return EventEmitter.defaultMaxListeners;return that._maxListeners;}EventEmitter.prototype.getMaxListeners=function getMaxListeners(){return _getMaxListeners(this);};EventEmitter.prototype.emit=function emit(type){var args=[];for(var i=1;i<arguments.length;i++)args.push(arguments[i]);var doError=type==='error';var events=this._events;if(events!==undefined)doError=doError&&events.error===undefined;else if(!doError)return false;// If there is no 'error' event listener then throw.
if(doError){var er;if(args.length>0)er=args[0];if(er instanceof Error){// Note: The comments on the `throw` lines are intentional, they show
// up in Node's output if this results in an unhandled exception.
throw er;// Unhandled 'error' event
}// At least give some kind of context to the user
var err=new Error('Unhandled error.'+(er?' ('+er.message+')':''));err.context=er;throw err;// Unhandled 'error' event
}var handler=events[type];if(handler===undefined)return false;if(typeof handler==='function'){ReflectApply(handler,this,args);}else{var len=handler.length;var listeners=arrayClone(handler,len);for(var i=0;i<len;++i)ReflectApply(listeners[i],this,args);}return true;};function _addListener(target,type,listener,prepend){var m;var events;var existing;checkListener(listener);events=target._events;if(events===undefined){events=target._events=Object.create(null);target._eventsCount=0;}else{// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
if(events.newListener!==undefined){target.emit('newListener',type,listener.listener?listener.listener:listener);// Re-assign `events` because a newListener handler could have caused the
// this._events to be assigned to a new object
events=target._events;}existing=events[type];}if(existing===undefined){// Optimize the case of one listener. Don't need the extra array object.
existing=events[type]=listener;++target._eventsCount;}else{if(typeof existing==='function'){// Adding the second element, need to change to array.
existing=events[type]=prepend?[listener,existing]:[existing,listener];// If we've already got an array, just append.
}else if(prepend){existing.unshift(listener);}else{existing.push(listener);}// Check for listener leak
m=_getMaxListeners(target);if(m>0&&existing.length>m&&!existing.warned){existing.warned=true;// No error code for this since it is a Warning
// eslint-disable-next-line no-restricted-syntax
var w=new Error('Possible EventEmitter memory leak detected. '+existing.length+' '+String(type)+' listeners '+'added. Use emitter.setMaxListeners() to '+'increase limit');w.name='MaxListenersExceededWarning';w.emitter=target;w.type=type;w.count=existing.length;ProcessEmitWarning(w);}}return target;}EventEmitter.prototype.addListener=function addListener(type,listener){return _addListener(this,type,listener,false);};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener=function prependListener(type,listener){return _addListener(this,type,listener,true);};function onceWrapper(){if(!this.fired){this.target.removeListener(this.type,this.wrapFn);this.fired=true;if(arguments.length===0)return this.listener.call(this.target);return this.listener.apply(this.target,arguments);}}function _onceWrap(target,type,listener){var state={fired:false,wrapFn:undefined,target:target,type:type,listener:listener};var wrapped=onceWrapper.bind(state);wrapped.listener=listener;state.wrapFn=wrapped;return wrapped;}EventEmitter.prototype.once=function once(type,listener){checkListener(listener);this.on(type,_onceWrap(this,type,listener));return this;};EventEmitter.prototype.prependOnceListener=function prependOnceListener(type,listener){checkListener(listener);this.prependListener(type,_onceWrap(this,type,listener));return this;};// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener=function removeListener(type,listener){var list,events,position,i,originalListener;checkListener(listener);events=this._events;if(events===undefined)return this;list=events[type];if(list===undefined)return this;if(list===listener||list.listener===listener){if(--this._eventsCount===0)this._events=Object.create(null);else{delete events[type];if(events.removeListener)this.emit('removeListener',type,list.listener||listener);}}else if(typeof list!=='function'){position=-1;for(i=list.length-1;i>=0;i--){if(list[i]===listener||list[i].listener===listener){originalListener=list[i].listener;position=i;break;}}if(position<0)return this;if(position===0)list.shift();else{spliceOne(list,position);}if(list.length===1)events[type]=list[0];if(events.removeListener!==undefined)this.emit('removeListener',type,originalListener||listener);}return this;};EventEmitter.prototype.off=EventEmitter.prototype.removeListener;EventEmitter.prototype.removeAllListeners=function removeAllListeners(type){var listeners,events,i;events=this._events;if(events===undefined)return this;// not listening for removeListener, no need to emit
if(events.removeListener===undefined){if(arguments.length===0){this._events=Object.create(null);this._eventsCount=0;}else if(events[type]!==undefined){if(--this._eventsCount===0)this._events=Object.create(null);else delete events[type];}return this;}// emit removeListener for all listeners on all events
if(arguments.length===0){var keys=Object.keys(events);var key;for(i=0;i<keys.length;++i){key=keys[i];if(key==='removeListener')continue;this.removeAllListeners(key);}this.removeAllListeners('removeListener');this._events=Object.create(null);this._eventsCount=0;return this;}listeners=events[type];if(typeof listeners==='function'){this.removeListener(type,listeners);}else if(listeners!==undefined){// LIFO order
for(i=listeners.length-1;i>=0;i--){this.removeListener(type,listeners[i]);}}return this;};function _listeners(target,type,unwrap){var events=target._events;if(events===undefined)return[];var evlistener=events[type];if(evlistener===undefined)return[];if(typeof evlistener==='function')return unwrap?[evlistener.listener||evlistener]:[evlistener];return unwrap?unwrapListeners(evlistener):arrayClone(evlistener,evlistener.length);}EventEmitter.prototype.listeners=function listeners(type){return _listeners(this,type,true);};EventEmitter.prototype.rawListeners=function rawListeners(type){return _listeners(this,type,false);};EventEmitter.listenerCount=function(emitter,type){if(typeof emitter.listenerCount==='function'){return emitter.listenerCount(type);}else{return listenerCount.call(emitter,type);}};EventEmitter.prototype.listenerCount=listenerCount;function listenerCount(type){var events=this._events;if(events!==undefined){var evlistener=events[type];if(typeof evlistener==='function'){return 1;}else if(evlistener!==undefined){return evlistener.length;}}return 0;}EventEmitter.prototype.eventNames=function eventNames(){return this._eventsCount>0?ReflectOwnKeys(this._events):[];};function arrayClone(arr,n){var copy=new Array(n);for(var i=0;i<n;++i)copy[i]=arr[i];return copy;}function spliceOne(list,index){for(;index+1<list.length;index++)list[index]=list[index+1];list.pop();}function unwrapListeners(arr){var ret=new Array(arr.length);for(var i=0;i<ret.length;++i){ret[i]=arr[i].listener||arr[i];}return ret;}function once(emitter,name){return new Promise(function(resolve,reject){function errorListener(err){emitter.removeListener(name,resolver);reject(err);}function resolver(){if(typeof emitter.removeListener==='function'){emitter.removeListener('error',errorListener);}resolve([].slice.call(arguments));};eventTargetAgnosticAddListener(emitter,name,resolver,{once:true});if(name!=='error'){addErrorHandlerIfEventEmitter(emitter,errorListener,{once:true});}});}function addErrorHandlerIfEventEmitter(emitter,handler,flags){if(typeof emitter.on==='function'){eventTargetAgnosticAddListener(emitter,'error',handler,flags);}}function eventTargetAgnosticAddListener(emitter,name,listener,flags){if(typeof emitter.on==='function'){if(flags.once){emitter.once(name,listener);}else{emitter.on(name,listener);}}else if(typeof emitter.addEventListener==='function'){// EventTarget does not have `error` event semantics like Node
// EventEmitters, we do not listen for `error` events here.
emitter.addEventListener(name,function wrapListener(arg){// IE does not have builtin `{ once: true }` support so we
// have to do it manually.
if(flags.once){emitter.removeEventListener(name,wrapListener);}listener(arg);});}else{throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+_typeof(emitter));}}},{}],38:[function(require,module,exports){/**
* Base Logger Class
*
*
* @author Steven Velozo <steven@velozo.com>
*/var libFableServiceProviderBase=require('fable-serviceproviderbase').CoreServiceProviderBase;var BaseLogger=/*#__PURE__*/function(_libFableServiceProvi2){_inherits(BaseLogger,_libFableServiceProvi2);var _super2=_createSuper(BaseLogger);function BaseLogger(pLogStreamSettings,pLogStreamHash){var _this6;_classCallCheck2(this,BaseLogger);_this6=_super2.call(this,pLogStreamSettings,pLogStreamHash);// This should not possibly be able to be instantiated without a settings object
_this6._Settings=_typeof(pLogStreamSettings)=='object'?pLogStreamSettings:{};_this6.serviceType='Logging-Provider';// The base logger does nothing but associate a UUID with itself
// We added this as the mechanism for tracking loggers to allow multiple simultaneous streams
// to the same provider.
_this6.loggerUUID=_this6.generateInsecureUUID();// Eventually we can use this array to ompute which levels the provider allows.
// For now it's just used to precompute some string concatenations.
_this6.levels=["trace","debug","info","warn","error","fatal"];return _this6;}// This is meant to generate programmatically insecure UUIDs to identify loggers
_createClass2(BaseLogger,[{key:"generateInsecureUUID",value:function generateInsecureUUID(){var tmpDate=new Date().getTime();var tmpUUID='LOGSTREAM-xxxxxx-yxxxxx'.replace(/[xy]/g,function(pCharacter){// Funny algorithm from w3resource that is twister-ish without the deep math and security
// ..but good enough for unique log stream identifiers
var tmpRandomData=(tmpDate+Math.random()*16)%16|0;tmpDate=Math.floor(tmpDate/16);return(pCharacter=='x'?tmpRandomData:tmpRandomData&0x3|0x8).toString(16);});return tmpUUID;}},{key:"initialize",value:function initialize(){// No operation.
}},{key:"trace",value:function trace(pLogText,pLogObject){this.write("trace",pLogText,pLogObject);}},{key:"debug",value:function debug(pLogText,pLogObject){this.write("debug",pLogText,pLogObject);}},{key:"info",value:function info(pLogText,pLogObject){this.write("info",pLogText,pLogObject);}},{key:"warn",value:function warn(pLogText,pLogObject){this.write("warn",pLogText,pLogObject);}},{key:"error",value:function error(pLogText,pLogObject){this.write("error",pLogText,pLogObject);}},{key:"fatal",value:function fatal(pLogText,pLogObject){this.write("fatal",pLogText,pLogObject);}},{key:"write",value:function write(pLogLevel,pLogText,pLogObject){// The base logger does nothing.
return true;}}]);return BaseLogger;}(libFableServiceProviderBase);module.exports=BaseLogger;},{"fable-serviceproviderbase":44}],39:[function(require,module,exports){/**
* Default Logger Provider Function
*
*
* @author Steven Velozo <steven@velozo.com>
*/ // Return the providers that are available without extensions loaded
var getDefaultProviders=function getDefaultProviders(){var tmpDefaultProviders={};tmpDefaultProviders.console=require('./Fable-Log-Logger-Console.js');tmpDefaultProviders["default"]=tmpDefaultProviders.console;return tmpDefaultProviders;};module.exports=getDefaultProviders();},{"./Fable-Log-Logger-Console.js":41}],40:[function(require,module,exports){module.exports=[{"loggertype":"console","streamtype":"console","level":"trace"}];},{}],41:[function(require,module,exports){var libBaseLogger=require('./Fable-Log-BaseLogger.js');var ConsoleLogger=/*#__PURE__*/function(_libBaseLogger){_inherits(ConsoleLogger,_libBaseLogger);var _super3=_createSuper(ConsoleLogger);function ConsoleLogger(pLogStreamSettings,pFableLog){var _this7;_classCallCheck2(this,ConsoleLogger);_this7=_super3.call(this,pLogStreamSettings);_this7._ShowTimeStamps=_this7._Settings.hasOwnProperty('showtimestamps')?_this7._Settings.showtimestamps==true:true;_this7._FormattedTimeStamps=_this7._Settings.hasOwnProperty('formattedtimestamps')?_this7._Settings.formattedtimestamps==true:true;_this7._ContextMessage=_this7._Settings.hasOwnProperty('Context')?"(".concat(_this7._Settings.Context,")"):pFableLog._Settings.hasOwnProperty('Product')?"(".concat(pFableLog._Settings.Product,")"):'Unnamed_Log_Context';// Allow the user to decide what gets output to the console
_this7._OutputLogLinesToConsole=_this7._Settings.hasOwnProperty('outputloglinestoconsole')?_this7._Settings.outputloglinestoconsole:true;_this7._OutputObjectsToConsole=_this7._Settings.hasOwnProperty('outputobjectstoconsole')?_this7._Settings.outputobjectstoconsole:true;// Precompute the prefix for each level
_this7.prefixCache={};for(var i=0;i<=_this7.levels.length;i++){_this7.prefixCache[_this7.levels[i]]="[".concat(_this7.levels[i],"] ").concat(_this7._ContextMessage,": ");if(_this7._ShowTimeStamps){// If there is a timestamp we need a to prepend space before the prefixcache string, since the timestamp comes first
_this7.prefixCache[_this7.levels[i]]=' '+_this7.prefixCache[_this7.levels[i]];}}return _this7;}_createClass2(ConsoleLogger,[{key:"write",value:function write(pLevel,pLogText,pObject){var tmpTimeStamp='';if(this._ShowTimeStamps&&this._FormattedTimeStamps){tmpTimeStamp=new Date().toISOString();}else if(this._ShowTimeStamps){tmpTimeStamp=+new Date();}var tmpLogLine="".concat(tmpTimeStamp).concat(this.prefixCache[pLevel]).concat(pLogText);if(this._OutputLogLinesToConsole){console.log(tmpLogLine);}// Write out the object on a separate line if it is passed in
if(this._OutputObjectsToConsole&&typeof pObject!=='undefined'){console.log(JSON.stringify(pObject,null,2));}// Provide an easy way to be overridden and be consistent
return tmpLogLine;}}]);return ConsoleLogger;}(libBaseLogger);module.exports=ConsoleLogger;},{"./Fable-Log-BaseLogger.js":38}],42:[function(require,module,exports){var libConsoleLog=require('./Fable-Log-Logger-Console.js');var libFS=require('fs');var libPath=require('path');var SimpleFlatFileLogger=/*#__PURE__*/function(_libConsoleLog){_inherits(SimpleFlatFileLogger,_libConsoleLog);var _super4=_createSuper(SimpleFlatFileLogger);function SimpleFlatFileLogger(pLogStreamSettings,pFableLog){var _this8;_classCallCheck2(this,SimpleFlatFileLogger);_this8=_super4.call(this,pLogStreamSettings,pFableLog);// If a path isn't provided for the logfile, it tries to use the ProductName or Context
_this8.logFileRawPath=_this8._Settings.hasOwnProperty('path')?_this8._Settings.path:"./".concat(_this8._ContextMessage,".log");_this8.logFilePath=libPath.normalize(_this8.logFileRawPath);_this8.logFileStreamOptions=_this8._Settings.hasOwnProperty('fileStreamoptions')?_this8._Settings.fileStreamOptions:{"flags":"a","encoding":"utf8"};_this8.fileWriter=libFS.createWriteStream(_this8.logFilePath,_this8.logFileStreamOptions);_this8.activelyWriting=false;_this8.logLineStrings=[];_this8.logObjectStrings=[];_this8.defaultWriteCompleteCallback=function(){};_this8.defaultBufferFlushCallback=function(){};return _this8;}_createClass2(SimpleFlatFileLogger,[{key:"closeWriter",value:function closeWriter(fCloseComplete){var tmpCloseComplete=typeof fCloseComplete=='function'?fCloseComplete:function(){};if(this.fileWriter){this.fileWriter.end('\n');return this.fileWriter.once('finish',tmpCloseComplete.bind(this));}}},{key:"completeBufferFlushToLogFile",value:function completeBufferFlushToLogFile(fFlushComplete){this.activelyWriting=false;var tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;if(this.logLineStrings.length>0){this.flushBufferToLogFile(tmpFlushComplete);}else{return tmpFlushComplete();}}},{key:"flushBufferToLogFile",value:function flushBufferToLogFile(fFlushComplete){if(!this.activelyWriting){// Only want to be writing one thing at a time....
this.activelyWriting=true;var tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;// Get the current buffer arrays.  These should always have matching number of elements.
var tmpLineStrings=this.logLineStrings;var tmpObjectStrings=this.logObjectStrings;// Reset these to be filled while we process this queue...
this.logLineStrings=[];this.logObjectStrings=[];// This is where we will put each line before writing it to the file...
var tmpConstructedBufferOutputString='';for(var i=0;i<tmpLineStrings.length;i++){// TODO: Windows Newline?   ....... yo no se!
tmpConstructedBufferOutputString+="".concat(tmpLineStrings[i],"\n");if(tmpObjectStrings[i]!==false){tmpConstructedBufferOutputString+="".concat(tmpObjectStrings[i],"\n");}}if(!this.fileWriter.write(tmpConstructedBufferOutputString,'utf8')){// If the streamwriter returns false, we need to wait for it to drain.
this.fileWriter.once('drain',this.completeBufferFlushToLogFile.bind(this,tmpFlushComplete));}else{return this.completeBufferFlushToLogFile(tmpFlushComplete);}}}},{key:"write",value:function write(pLevel,pLogText,pObject){var tmpLogLine=_get(_getPrototypeOf(SimpleFlatFileLogger.prototype),"write",this).call(this,pLevel,pLogText,pObject);// Use a very simple array as the write buffer
this.logLineStrings.push(tmpLogLine);// Write out the object on a separate line if it is passed in
if(typeof pObject!=='undefined'){this.logObjectStrings.push(JSON.stringify(pObject,null,4));}else{this.logObjectStrings.push(false);}this.flushBufferToLogFile();}}]);return SimpleFlatFileLogger;}(libConsoleLog);module.exports=SimpleFlatFileLogger;},{"./Fable-Log-Logger-Console.js":41,"fs":19,"path":92}],43:[function(require,module,exports){/**
* Fable Logging Service
*/var libFableServiceProviderBase=require('fable-serviceproviderbase').CoreServiceProviderBase;var FableLog=/*#__PURE__*/function(_libFableServiceProvi3){_inherits(FableLog,_libFableServiceProvi3);var _super5=_createSuper(FableLog);function FableLog(pSettings,pServiceHash){var _this9;_classCallCheck2(this,FableLog);_this9=_super5.call(this,pSettings,pServiceHash);_this9.serviceType='Logging';var tmpSettings=_typeof(pSettings)==='object'?pSettings:{};_this9._Settings=tmpSettings;_this9._Providers=require('./Fable-Log-DefaultProviders-Node.js');_this9._StreamDefinitions=tmpSettings.hasOwnProperty('LogStreams')?tmpSettings.LogStreams:require('./Fable-Log-DefaultStreams.json');_this9.logStreams=[];// This object gets decorated for one-time instantiated providers that
//  have multiple outputs, such as bunyan.
_this9.logProviders={};// A hash list of the GUIDs for each log stream, so they can't be added to the set more than one time
_this9.activeLogStreams={};_this9.logStreamsTrace=[];_this9.logStreamsDebug=[];_this9.logStreamsInfo=[];_this9.logStreamsWarn=[];_this9.logStreamsError=[];_this9.logStreamsFatal=[];_this9.datumDecorator=function(pDatum){return pDatum;};_this9.uuid=typeof tmpSettings.Product==='string'?tmpSettings.Product:'Default';return _this9;}_createClass2(FableLog,[{key:"addLogger",value:function addLogger(pLogger,pLevel){// Bail out if we've already created one.
if(this.activeLogStreams.hasOwnProperty(pLogger.loggerUUID)){return false;}// Add it to the streams and to the mutex
this.logStreams.push(pLogger);this.activeLogStreams[pLogger.loggerUUID]=true;// Make sure a kosher level was passed in
switch(pLevel){case'trace':this.logStreamsTrace.push(pLogger);case'debug':this.logStreamsDebug.push(pLogger);case'info':this.logStreamsInfo.push(pLogger);case'warn':this.logStreamsWarn.push(pLogger);case'error':this.logStreamsError.push(pLogger);case'fatal':this.logStreamsFatal.push(pLogger);break;}return true;}},{key:"setDatumDecorator",value:function setDatumDecorator(fDatumDecorator){if(typeof fDatumDecorator==='function'){this.datumDecorator=fDatumDecorator;}else{this.datumDecorator=function(pDatum){return pDatum;};}}},{key:"trace",value:function trace(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsTrace.length;i++){this.logStreamsTrace[i].trace(pMessage,tmpDecoratedDatum);}}},{key:"debug",value:function debug(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsDebug.length;i++){this.logStreamsDebug[i].debug(pMessage,tmpDecoratedDatum);}}},{key:"info",value:function info(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsInfo.length;i++){this.logStreamsInfo[i].info(pMessage,tmpDecoratedDatum);}}},{key:"warn",value:function warn(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsWarn.length;i++){this.logStreamsWarn[i].warn(pMessage,tmpDecoratedDatum);}}},{key:"error",value:function error(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsError.length;i++){this.logStreamsError[i].error(pMessage,tmpDecoratedDatum);}}},{key:"fatal",value:function fatal(pMessage,pDatum){var tmpDecoratedDatum=this.datumDecorator(pDatum);for(var i=0;i<this.logStreamsFatal.length;i++){this.logStreamsFatal[i].fatal(pMessage,tmpDecoratedDatum);}}},{key:"initialize",value:function initialize(){// "initialize" each logger as defined in the logging parameters
for(var i=0;i<this._StreamDefinitions.length;i++){var tmpStreamDefinition=Object.assign({loggertype:'default',streamtype:'console',level:'info'},this._StreamDefinitions[i]);if(!this._Providers.hasOwnProperty(tmpStreamDefinition.loggertype)){console.log("Error initializing log stream: bad loggertype in stream definition ".concat(JSON.stringify(tmpStreamDefinition)));}else{this.addLogger(new this._Providers[tmpStreamDefinition.loggertype](tmpStreamDefinition,this),tmpStreamDefinition.level);}}// Now initialize each one.
for(var _i=0;_i<this.logStreams.length;_i++){this.logStreams[_i].initialize();}}},{key:"logTime",value:function logTime(pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time';var tmpTime=new Date();this.info("".concat(tmpMessage," ").concat(tmpTime," (epoch ").concat(+tmpTime,")"),pDatum);}// Get a timestamp
},{key:"getTimeStamp",value:function getTimeStamp(){return+new Date();}},{key:"getTimeDelta",value:function getTimeDelta(pTimeStamp){var tmpEndTime=+new Date();return tmpEndTime-pTimeStamp;}// Log the delta between a timestamp, and now with a message
},{key:"logTimeDelta",value:function logTimeDelta(pTimeDelta,pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';var tmpDatum=_typeof(pDatum)==='object'?pDatum:{};var tmpEndTime=+new Date();this.info("".concat(tmpMessage," logged at (epoch ").concat(+tmpEndTime,") took (").concat(pTimeDelta,"ms)"),pDatum);}},{key:"logTimeDeltaHuman",value:function logTimeDeltaHuman(pTimeDelta,pMessage,pDatum){var tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';var tmpEndTime=+new Date();var tmpMs=parseInt(pTimeDelta%1000);var tmpSeconds=parseInt(pTimeDelta/1000%60);var tmpMinutes=parseInt(pTimeDelta/(1000*60)%60);var tmpHours=parseInt(pTimeDelta/(1000*60*60));tmpMs=tmpMs<10?"00"+tmpMs:tmpMs<100?"0"+tmpMs:tmpMs;tmpSeconds=tmpSeconds<10?"0"+tmpSeconds:tmpSeconds;tmpMinutes=tmpMinutes<10?"0"+tmpMinutes:tmpMinutes;tmpHours=tmpHours<10?"0"+tmpHours:tmpHours;this.info("".concat(tmpMessage," logged at (epoch ").concat(+tmpEndTime,") took (").concat(pTimeDelta,"ms) or (").concat(tmpHours,":").concat(tmpMinutes,":").concat(tmpSeconds,".").concat(tmpMs,")"),pDatum);}},{key:"logTimeDeltaRelative",value:function logTimeDeltaRelative(pStartTime,pMessage,pDatum){this.logTimeDelta(this.getTimeDelta(pStartTime),pMessage,pDatum);}},{key:"logTimeDeltaRelativeHuman",value:function logTimeDeltaRelativeHuman(pStartTime,pMessage,pDatum){this.logTimeDeltaHuman(this.getTimeDelta(pStartTime),pMessage,pDatum);}}]);return FableLog;}(libFableServiceProviderBase);module.exports=FableLog;module.exports.LogProviderBase=require('./Fable-Log-BaseLogger.js');module.exports.LogProviderConsole=require('./Fable-Log-Logger-Console.js');module.exports.LogProviderFlatfile=require('./Fable-Log-Logger-SimpleFlatFile.js');},{"./Fable-Log-BaseLogger.js":38,"./Fable-Log-DefaultProviders-Node.js":39,"./Fable-Log-DefaultStreams.json":40,"./Fable-Log-Logger-Console.js":41,"./Fable-Log-Logger-SimpleFlatFile.js":42,"fable-serviceproviderbase":44}],44:[function(require,module,exports){/**
* Fable Service Base
* @author <steven@velozo.com>
*/var FableServiceProviderBase=/*#__PURE__*/function(){// The constructor can be used in two ways:
// 1) With a fable, options object and service hash (the options object and service hash are optional)
// 2) With an object or nothing as the first parameter, where it will be treated as the options object
function FableServiceProviderBase(pFable,pOptions,pServiceHash){_classCallCheck2(this,FableServiceProviderBase);// Check if a fable was passed in; connect it if so
if(_typeof(pFable)==='object'&&pFable.isFable){this.connectFable(pFable);}else{this.fable=false;}// initialize options and UUID based on whether the fable was passed in or not.
if(this.fable){this.UUID=pFable.getUUID();this.options=_typeof(pOptions)==='object'?pOptions:{};}else{// With no fable, check to see if there was an object passed into either of the first two
// Parameters, and if so, treat it as the options object
this.options=_typeof(pFable)==='object'&&!pFable.isFable?pFable:_typeof(pOptions)==='object'?pOptions:{};this.UUID="CORE-SVC-".concat(Math.floor(Math.random()*(99999-10000)+10000));}// It's expected that the deriving class will set this
this.serviceType="Unknown-".concat(this.UUID);// The service hash is used to identify the specific instantiation of the service in the services map
this.Hash=typeof pServiceHash==='string'?pServiceHash:!this.fable&&typeof pOptions==='string'?pOptions:"".concat(this.UUID);}_createClass2(FableServiceProviderBase,[{key:"connectFable",value:function connectFable(pFable){if(_typeof(pFable)!=='object'||!pFable.isFable){var tmpErrorMessage="Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(_typeof(pFable),"].}");console.log(tmpErrorMessage);return new Error(tmpErrorMessage);}if(!this.fable){this.fable=pFable;}if(!this.log){this.log=this.fable.Logging;}if(!this.services){this.services=this.fable.services;}if(!this.servicesMap){this.servicesMap=this.fable.servicesMap;}return true;}}]);return FableServiceProviderBase;}();_defineProperty2(FableServiceProviderBase,"isFableService",true);module.exports=FableServiceProviderBase;// This is left here in case we want to go back to having different code/base class for "core" services
module.exports.CoreServiceProviderBase=FableServiceProviderBase;},{}],45:[function(require,module,exports){module.exports={"Product":"ApplicationNameHere","ProductVersion":"0.0.0","ConfigFile":false,"LogStreams":[{"level":"trace"}]};},{}],46:[function(require,module,exports){(function(process){(function(){/**
* Fable Settings Template Processor
*
* This class allows environment variables to come in via templated expressions, and defaults to be set.
*
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable Settings
*/var libPrecedent=require('precedent');var FableSettingsTemplateProcessor=/*#__PURE__*/function(){function FableSettingsTemplateProcessor(pDependencies){_classCallCheck2(this,FableSettingsTemplateProcessor);// Use a no-dependencies templating engine to parse out environment variables
this.templateProcessor=new libPrecedent();// TODO: Make the environment variable wrap expression demarcation characters configurable?
this.templateProcessor.addPattern('${','}',function(pTemplateValue){var tmpTemplateValue=pTemplateValue.trim();var tmpSeparatorIndex=tmpTemplateValue.indexOf('|');var tmpDefaultValue=tmpSeparatorIndex>=0?tmpTemplateValue.substring(tmpSeparatorIndex+1):'';var tmpEnvironmentVariableName=tmpSeparatorIndex>-1?tmpTemplateValue.substring(0,tmpSeparatorIndex):tmpTemplateValue;if(process.env.hasOwnProperty(tmpEnvironmentVariableName)){return process.env[tmpEnvironmentVariableName];}else{return tmpDefaultValue;}});}_createClass2(FableSettingsTemplateProcessor,[{key:"parseSetting",value:function parseSetting(pString){return this.templateProcessor.parseString(pString);}}]);return FableSettingsTemplateProcessor;}();module.exports=FableSettingsTemplateProcessor;}).call(this);}).call(this,require('_process'));},{"_process":98,"precedent":95}],47:[function(require,module,exports){/**
* Fable Settings Add-on
*
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable Settings
*/var libFableServiceProviderBase=require('fable-serviceproviderbase').CoreServiceProviderBase;var libFableSettingsTemplateProcessor=require('./Fable-Settings-TemplateProcessor.js');var FableSettings=/*#__PURE__*/function(_libFableServiceProvi4){_inherits(FableSettings,_libFableServiceProvi4);var _super6=_createSuper(FableSettings);function FableSettings(pSettings,pServiceHash){var _this10;_classCallCheck2(this,FableSettings);_this10=_super6.call(this,pSettings,pServiceHash);_this10.serviceType='SettingsManager';// Initialize the settings value template processor
_this10.settingsTemplateProcessor=new libFableSettingsTemplateProcessor();// set straight away so anything that uses it respects the initial setting
_this10._configureEnvTemplating(pSettings);_this10["default"]=_this10.buildDefaultSettings();// Construct a new settings object
var tmpSettings=_this10.merge(pSettings,_this10.buildDefaultSettings());// The base settings object (what they were on initialization, before other actors have altered them)
_this10.base=JSON.parse(JSON.stringify(tmpSettings));if(tmpSettings.DefaultConfigFile){try{// If there is a DEFAULT configuration file, try to load and merge it.
tmpSettings=_this10.merge(require(tmpSettings.DefaultConfigFile),tmpSettings);}catch(pException){// Why this?  Often for an app we want settings to work out of the box, but
// would potentially want to have a config file for complex settings.
console.log('Fable-Settings Warning: Default configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}if(tmpSettings.ConfigFile){try{// If there is a configuration file, try to load and merge it.
tmpSettings=_this10.merge(require(tmpSettings.ConfigFile),tmpSettings);}catch(pException){// Why this?  Often for an app we want settings to work out of the box, but
// would potentially want to have a config file for complex settings.
console.log('Fable-Settings Warning: Configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}_this10.settings=tmpSettings;return _this10;}// Build a default settings object.  Use the JSON jimmy to ensure it is always a new object.
_createClass2(FableSettings,[{key:"buildDefaultSettings",value:function buildDefaultSettings(){return JSON.parse(JSON.stringify(require('./Fable-Settings-Default')));}// Update the configuration for environment variable templating based on the current settings object
},{key:"_configureEnvTemplating",value:function _configureEnvTemplating(pSettings){// default environment variable templating to on
this._PerformEnvTemplating=!pSettings||pSettings.NoEnvReplacement!==true;}// Resolve (recursive) any environment variables found in settings object.
},{key:"_resolveEnv",value:function _resolveEnv(pSettings){for(var tmpKey in pSettings){if(_typeof(pSettings[tmpKey])==='object'){this._resolveEnv(pSettings[tmpKey]);}else if(typeof pSettings[tmpKey]==='string'){pSettings[tmpKey]=this.settingsTemplateProcessor.parseSetting(pSettings[tmpKey]);}}}/**
	 * Check to see if a value is an object (but not an array).
	 */},{key:"_isObject",value:function _isObject(value){return _typeof(value)==='object'&&!Array.isArray(value);}/**
	 * Merge two plain objects. Keys that are objects in both will be merged property-wise.
	 */},{key:"_deepMergeObjects",value:function _deepMergeObjects(toObject,fromObject){var _this11=this;if(!fromObject||!this._isObject(fromObject)){return;}Object.keys(fromObject).forEach(function(key){var fromValue=fromObject[key];if(_this11._isObject(fromValue)){var toValue=toObject[key];if(toValue&&_this11._isObject(toValue)){// both are objects, so do a recursive merge
_this11._deepMergeObjects(toValue,fromValue);return;}}toObject[key]=fromValue;});return toObject;}// Merge some new object into the existing settings.
},{key:"merge",value:function merge(pSettingsFrom,pSettingsTo){// If an invalid settings from object is passed in (e.g. object constructor without passing in anything) this should still work
var tmpSettingsFrom=_typeof(pSettingsFrom)==='object'?pSettingsFrom:{};// Default to the settings object if none is passed in for the merge.
var tmpSettingsTo=_typeof(pSettingsTo)==='object'?pSettingsTo:this.settings;// do not mutate the From object property values
var tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));tmpSettingsTo=this._deepMergeObjects(tmpSettingsTo,tmpSettingsFromCopy);if(this._PerformEnvTemplating){this._resolveEnv(tmpSettingsTo);}// Update env tempating config, since we just updated the config object, and it may have changed
this._configureEnvTemplating(tmpSettingsTo);return tmpSettingsTo;}// Fill in settings gaps without overwriting settings that are already there
},{key:"fill",value:function fill(pSettingsFrom){// If an invalid settings from object is passed in (e.g. object constructor without passing in anything) this should still work
var tmpSettingsFrom=_typeof(pSettingsFrom)==='object'?pSettingsFrom:{};// do not mutate the From object property values
var tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));this.settings=this._deepMergeObjects(tmpSettingsFromCopy,this.settings);return this.settings;}}]);return FableSettings;}(libFableServiceProviderBase);;// This is for backwards compatibility
function autoConstruct(pSettings){return new FableSettings(pSettings);}module.exports=FableSettings;module.exports["new"]=autoConstruct;},{"./Fable-Settings-Default":45,"./Fable-Settings-TemplateProcessor.js":46,"fable-serviceproviderbase":44}],48:[function(require,module,exports){/**
* Random Byte Generator - Browser version
*
*
* @author Steven Velozo <steven@velozo.com>
*/ // Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var RandomBytes=/*#__PURE__*/function(){function RandomBytes(){_classCallCheck2(this,RandomBytes);// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
this.getRandomValues=typeof crypto!='undefined'&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!='undefined'&&typeof window.msCrypto.getRandomValues=='function'&&msCrypto.getRandomValues.bind(msCrypto);}// WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
_createClass2(RandomBytes,[{key:"generateWhatWGBytes",value:function generateWhatWGBytes(){var tmpBuffer=new Uint8Array(16);// eslint-disable-line no-undef
this.getRandomValues(tmpBuffer);return tmpBuffer;}// Math.random()-based (RNG)
},{key:"generateRandomBytes",value:function generateRandomBytes(){// If all else fails, use Math.random().  It's fast, but is of unspecified
// quality.
var tmpBuffer=new Uint8Array(16);// eslint-disable-line no-undef
for(var i=0,tmpValue;i<16;i++){if((i&0x03)===0){tmpValue=Math.random()*0x100000000;}tmpBuffer[i]=tmpValue>>>((i&0x03)<<3)&0xff;}return tmpBuffer;}},{key:"generate",value:function generate(){if(this.getRandomValues){return this.generateWhatWGBytes();}else{return this.generateRandomBytes();}}}]);return RandomBytes;}();module.exports=RandomBytes;},{}],49:[function(require,module,exports){/**
* Fable UUID Generator
*/var libFableServiceProviderBase=require('fable-serviceproviderbase').CoreServiceProviderBase;0;var libRandomByteGenerator=require('./Fable-UUID-Random.js');var FableUUID=/*#__PURE__*/function(_libFableServiceProvi5){_inherits(FableUUID,_libFableServiceProvi5);var _super7=_createSuper(FableUUID);function FableUUID(pSettings,pServiceHash){var _this12;_classCallCheck2(this,FableUUID);_this12=_super7.call(this,pSettings,pServiceHash);_this12.serviceType='UUID';// Determine if the module is in "Random UUID Mode" which means just use the random character function rather than the v4 random UUID spec.
// Note this allows UUIDs of various lengths (including very short ones) although guaranteed uniqueness goes downhill fast.
_this12._UUIDModeRandom=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDModeRandom')?pSettings.UUIDModeRandom==true:false;// These two properties are only useful if we are in Random mode.  Otherwise it generates a v4 spec
// Length for "Random UUID Mode" is set -- if not set it to 8
_this12._UUIDLength=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDLength')?pSettings.UUIDLength+0:8;// Dictionary for "Random UUID Mode"
_this12._UUIDRandomDictionary=_typeof(pSettings)==='object'&&pSettings.hasOwnProperty('UUIDDictionary')?pSettings.UUIDDictionary+0:'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';_this12.randomByteGenerator=new libRandomByteGenerator();// Lookup table for hex codes
_this12._HexLookup=[];for(var i=0;i<256;++i){_this12._HexLookup[i]=(i+0x100).toString(16).substr(1);}return _this12;}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
_createClass2(FableUUID,[{key:"bytesToUUID",value:function bytesToUUID(pBuffer){var i=0;// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
return[this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]]].join('');}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
},{key:"generateUUIDv4",value:function generateUUIDv4(){var tmpBuffer=new Array(16);var tmpRandomBytes=this.randomByteGenerator.generate();// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
tmpRandomBytes[6]=tmpRandomBytes[6]&0x0f|0x40;tmpRandomBytes[8]=tmpRandomBytes[8]&0x3f|0x80;return this.bytesToUUID(tmpRandomBytes);}// Simple random UUID generation
},{key:"generateRandom",value:function generateRandom(){var tmpUUID='';for(var i=0;i<this._UUIDLength;i++){tmpUUID+=this._UUIDRandomDictionary.charAt(Math.floor(Math.random()*(this._UUIDRandomDictionary.length-1)));}return tmpUUID;}// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
},{key:"getUUID",value:function getUUID(){if(this._UUIDModeRandom){return this.generateRandom();}else{return this.generateUUIDv4();}}}]);return FableUUID;}(libFableServiceProviderBase);// This is for backwards compatibility
function autoConstruct(pSettings){return new FableUUID(pSettings);}module.exports=FableUUID;module.exports["new"]=autoConstruct;},{"./Fable-UUID-Random.js":48,"fable-serviceproviderbase":44}],50:[function(require,module,exports){/**
* Fable Application Services Support Library
* @author <steven@velozo.com>
*/ // Pre-init services
var libFableSettings=require('fable-settings');var libFableUUID=require('fable-uuid');var libFableLog=require('fable-log');var libFableServiceBase=require('fable-serviceproviderbase');var Fable=/*#__PURE__*/function(_libFableServiceBase$){_inherits(Fable,_libFableServiceBase$);var _super8=_createSuper(Fable);function Fable(pSettings){var _this13;_classCallCheck2(this,Fable);_this13=_super8.call(this,pSettings);// Initialization Phase 0: Set up the lowest level state (fable is a utility service manager at heart)
_this13.serviceType='ServiceManager';// An array of the types of services available
_this13.serviceTypes=[];// A map of instantiated services
_this13.servicesMap={};// A map of the default instantiated service by type
_this13.services={};// A map of class constructors for services
_this13.serviceClasses={};// If we need extra service initialization capabilities
_this13.extraServiceInitialization=false;// Initialization Phase 1: Set up the core utility services
// These are things like power, water, and sewage.  They are required for fable to run (e.g. logging, settings, etc)
// Instantiate the default Settings Manager
_this13.SettingsManager=new libFableSettings(pSettings);_this13.SettingsManager=_this13.SettingsManager;// Instantiate the UUID generator
_this13.UUID=new libFableUUID(_this13.SettingsManager.settings);// Instantiate the logging system
_this13.Logging=new libFableLog(_this13.SettingsManager.settings);_this13.Logging.initialize();// Initialization Phase 1.5: Instantiate the service manager
// This is the start actual bootstrapping point for fable.
// For consistency fable is treated as a service.
_this13.ServiceManager=_assertThisInitialized(_this13);// TODO: Remove this when Orator and meadow-endpoints are shifted to this new pattern
_this13.serviceManager=_assertThisInitialized(_this13);// END TODO
_this13.connectFable(_assertThisInitialized(_this13));// --> Bootstrapping of fable into the Service Manager is complete
// Initialization Phase 2: Map in the default services.
// They will then be available in the Default service provider set as well.
_this13.connectPreinitServiceProviderInstance(_this13.UUID);_this13.connectPreinitServiceProviderInstance(_this13.Logging);_this13.connectPreinitServiceProviderInstance(_this13.SettingsManager);// Initialize and instantiate the default baked-in Data Arithmatic service
_this13.addAndInstantiateServiceType('EnvironmentData',require('./services/Fable-Service-EnvironmentData.js'));_this13.addServiceType('Template',require('./services/Fable-Service-Template.js'));_this13.addServiceType('MetaTemplate',require('./services/Fable-Service-MetaTemplate.js'));_this13.addServiceType('Anticipate',require('./services/Fable-Service-Anticipate.js'));_this13.addAndInstantiateServiceType('Dates',require('./services/Fable-Service-DateManipulation.js'));_this13.addAndInstantiateServiceType('DataFormat',require('./services/Fable-Service-DataFormat.js'));_this13.addAndInstantiateServiceType('DataGeneration',require('./services/Fable-Service-DataGeneration.js'));_this13.addAndInstantiateServiceType('Utility',require('./services/Fable-Service-Utility.js'));_this13.addServiceType('Operation',require('./services/Fable-Service-Operation.js'));_this13.addServiceType('RestClient',require('./services/Fable-Service-RestClient.js'));_this13.addServiceType('CSVParser',require('./services/Fable-Service-CSVParser.js'));_this13.addServiceType('Manifest',require('manyfest'));_this13.addServiceType('ObjectCache',require('cachetrax'));_this13.addServiceType('FilePersistence',require('./services/Fable-Service-FilePersistence.js'));return _this13;}/* State Accessors */_createClass2(Fable,[{key:"isFable",get:function get(){return true;}},{key:"settings",get:function get(){return this.SettingsManager.settings;}},{key:"settingsManager",get:function get(){return this.SettingsManager;}// For backwards compatibility
},{key:"getUUID",value:function getUUID(){return this.UUID.getUUID();}/* Service Manager Methods */},{key:"addServiceType",value:function addServiceType(pServiceType,pServiceClass){if(this.servicesMap.hasOwnProperty(pServiceType)){// TODO: Check if any services are running?
this.log.warn("Adding a service type [".concat(pServiceType,"] that already exists."));}else{// Add the container for instantiated services to go in
this.servicesMap[pServiceType]={};// Add the type to the list of types
this.serviceTypes.push(pServiceType);}// Using the static member of the class is a much more reliable way to check if it is a service class than instanceof
if(typeof pServiceClass=='function'&&pServiceClass.isFableService){// Add the class to the list of classes
this.serviceClasses[pServiceType]=pServiceClass;}else{// Add the base class to the list of classes
this.log.error("Attempted to add service type [".concat(pServiceType,"] with an invalid class.  Using base service class, which will not crash but won't provide meaningful services."));this.serviceClasses[pServiceType]=libFableServiceBase;}}// This is for the services that are meant to run mostly single-instance so need a default at initialization
},{key:"addAndInstantiateServiceType",value:function addAndInstantiateServiceType(pServiceType,pServiceClass){this.addServiceType(pServiceType,pServiceClass);return this.instantiateServiceProvider(pServiceType,{},"".concat(pServiceType,"-Default"));}// Some services expect to be overloaded / customized class.
},{key:"instantiateServiceProviderFromPrototype",value:function instantiateServiceProviderFromPrototype(pServiceType,pOptions,pCustomServiceHash,pServicePrototype){// Instantiate the service
var tmpService=new pServicePrototype(this,pOptions,pCustomServiceHash);if(this.extraServiceInitialization){tmpService=this.extraServiceInitialization(tmpService);}// Add the service to the service map
this.servicesMap[pServiceType][tmpService.Hash]=tmpService;// If this is the first service of this type, make it the default
if(!this.services.hasOwnProperty(pServiceType)){this.setDefaultServiceInstantiation(pServiceType,tmpService.Hash);}return tmpService;}},{key:"instantiateServiceProvider",value:function instantiateServiceProvider(pServiceType,pOptions,pCustomServiceHash){// Instantiate the service
var tmpService=this.instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash);// Add the service to the service map
this.servicesMap[pServiceType][tmpService.Hash]=tmpService;// If this is the first service of this type, make it the default
if(!this.services.hasOwnProperty(pServiceType)){this.setDefaultServiceInstantiation(pServiceType,tmpService.Hash);}return tmpService;}// Create a service provider but don't register it to live forever in fable.services
},{key:"instantiateServiceProviderWithoutRegistration",value:function instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash){// Instantiate the service
var tmpService=new this.serviceClasses[pServiceType](this,pOptions,pCustomServiceHash);if(this.extraServiceInitialization){tmpService=this.extraServiceInitialization(tmpService);}return tmpService;}// Connect an initialized service provider that came before Fable was initialized
},{key:"connectPreinitServiceProviderInstance",value:function connectPreinitServiceProviderInstance(pServiceInstance){var tmpServiceType=pServiceInstance.serviceType;var tmpServiceHash=pServiceInstance.Hash;// The service should already be instantiated, so just connect it to fable
pServiceInstance.connectFable(this);// Add the service type to the map if it isn't there yet
if(!this.servicesMap.hasOwnProperty(tmpServiceType)){// If the core service hasn't registered itself yet, create the service container for it.
// This means you couldn't register another with this type unless it was later registered with a constructor class.
this.servicesMap[tmpServiceType]={};}// Add the service to the service map
this.servicesMap[tmpServiceType][tmpServiceHash]=pServiceInstance;// If this is the first service of this type, make it the default
if(!this.services.hasOwnProperty(tmpServiceType)){this.setDefaultServiceInstantiation(tmpServiceType,tmpServiceHash,false);}return pServiceInstance;}},{key:"setDefaultServiceInstantiation",value:function setDefaultServiceInstantiation(pServiceType,pServiceHash,pOverwriteService){// Overwrite services by default, unless told not to
var tmpOverwriteService=typeof pOverwriteService==='undefined'?true:pOverwriteService;// Make sure the service exists
if(this.servicesMap[pServiceType].hasOwnProperty(pServiceHash)){if(!this.hasOwnProperty(pServiceType)||tmpOverwriteService){this[pServiceType]=this.servicesMap[pServiceType][pServiceHash];}if(!this.services.hasOwnProperty(pServiceType)||tmpOverwriteService){this.services[pServiceType]=this.servicesMap[pServiceType][pServiceHash];}return true;}return false;}}]);return Fable;}(libFableServiceBase.CoreServiceProviderBase);// This is for backwards compatibility
function autoConstruct(pSettings){return new Fable(pSettings);}module.exports=Fable;module.exports["new"]=autoConstruct;module.exports.LogProviderBase=libFableLog.LogProviderBase;module.exports.ServiceProviderBase=libFableServiceBase;module.exports.CoreServiceProviderBase=libFableServiceBase.CoreServiceProviderBase;module.exports.precedent=libFableSettings.precedent;},{"./services/Fable-Service-Anticipate.js":51,"./services/Fable-Service-CSVParser.js":52,"./services/Fable-Service-DataFormat.js":53,"./services/Fable-Service-DataGeneration.js":55,"./services/Fable-Service-DateManipulation.js":56,"./services/Fable-Service-EnvironmentData.js":57,"./services/Fable-Service-FilePersistence.js":58,"./services/Fable-Service-MetaTemplate.js":59,"./services/Fable-Service-Operation.js":63,"./services/Fable-Service-RestClient.js":64,"./services/Fable-Service-Template.js":65,"./services/Fable-Service-Utility.js":66,"cachetrax":22,"fable-log":43,"fable-serviceproviderbase":44,"fable-settings":47,"fable-uuid":49,"manyfest":89}],51:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var FableServiceAnticipate=/*#__PURE__*/function(_libFableServiceBase){_inherits(FableServiceAnticipate,_libFableServiceBase);var _super9=_createSuper(FableServiceAnticipate);function FableServiceAnticipate(pFable,pOptions,pServiceHash){var _this14;_classCallCheck2(this,FableServiceAnticipate);_this14=_super9.call(this,pFable,pOptions,pServiceHash);_this14.serviceType='AsyncAnticipate';// The queue of operations waiting to run.
_this14.operationQueue=[];_this14.erroredOperations=[];_this14.executingOperationCount=0;_this14.completedOperationCount=0;_this14.maxOperations=1;_this14.lastError=undefined;_this14.waitingFunctions=[];return _this14;}_createClass2(FableServiceAnticipate,[{key:"checkQueue",value:function checkQueue(){// This checks to see if we need to start any operations.
if(this.operationQueue.length>0&&this.executingOperationCount<this.maxOperations){var tmpOperation=this.operationQueue.shift();this.executingOperationCount+=1;tmpOperation(this.buildAnticipatorCallback());}else if(this.waitingFunctions.length>0&&this.executingOperationCount<1){// If there are no operations left, and we have waiting functions, call them.
for(var i=0;i<this.waitingFunctions.length;i++){this.waitingFunctions[i](this.lastError);}// Reset our state
this.lastError=undefined;this.waitingFunctions=[];}}// Expects a function fAsynchronousFunction(fCallback)
},{key:"anticipate",value:function anticipate(fAsynchronousFunction){this.operationQueue.push(fAsynchronousFunction);this.checkQueue();}},{key:"buildAnticipatorCallback",value:function buildAnticipatorCallback(){// This uses closure-scoped state to track the callback state
var tmpCallbackState={Called:false,Error:undefined,OperationSet:this};return hoistedCallback;function hoistedCallback(pError){if(tmpCallbackState.Called){// If they call the callback twice, throw an error
throw new Error("Anticipation async callback called twice...");}tmpCallbackState.Called=true;tmpCallbackState.error=pError;tmpCallbackState.OperationSet.executingOperationCount-=1;tmpCallbackState.OperationSet.completedOperationCount+=1;tmpCallbackState.OperationSet.checkQueue();}}},{key:"wait",value:function wait(fCallback){this.waitingFunctions.push(fCallback);this.checkQueue();}}]);return FableServiceAnticipate;}(libFableServiceBase);module.exports=FableServiceAnticipate;},{"fable-serviceproviderbase":44}],52:[function(require,module,exports){var libFableServiceProviderBase=require('fable-serviceproviderbase');/**
* Parsing CSVs.  Why?  Because it's a thing that needs to be done.
*
* 1. And the other node CSV parsers had issues with the really messy files we had.
* 
*
* 2. None of the CSV parsers dealt with and multi-line quoted string columns
*    which are apparently a-ok according to the official spec.
* Plus a lot of them are asynchronous because apparently that's the best way to
* do anything; unfortunately some files have a sequence issue with that.
*
* @class CSVParser
*/var CSVParser=/*#__PURE__*/function(_libFableServiceProvi6){_inherits(CSVParser,_libFableServiceProvi6);var _super10=_createSuper(CSVParser);function CSVParser(pFable,pOptions,pServiceHash){var _this15;_classCallCheck2(this,CSVParser);_this15=_super10.call(this,pFable,pOptions,pServiceHash);_this15.serviceType='CSVParser';_this15.Header=[];_this15.HeaderFieldNames=[];_this15.Delimiter=',';_this15.QuoteCharacter='"';_this15.CleanCharacters=['\r'];_this15.HeaderLineIndex=0;_this15.HasHeader=true;_this15.HasSetHeader=false;_this15.EmitHeader=false;_this15.EmitJSON=true;_this15.EscapedQuoteString='&quot;';// Current Line Parsing State
_this15.CurrentLine='';_this15.CurrentRecord=[];_this15.InQuote=false;_this15.InEscapedQuote=false;_this15.LinesParsed=0;_this15.RowsEmitted=0;return _this15;}_createClass2(CSVParser,[{key:"marshalRowToJSON",value:function marshalRowToJSON(pRowArray){if(!Array.isArray(pRowArray)){return false;}for(var i=this.HeaderFieldNames.length;i<pRowArray.length;i++){this.HeaderFieldNames[i]="".concat(i);}var tmpObject={};for(var _i2=0;_i2<pRowArray.length;_i2++){tmpObject[this.HeaderFieldNames[_i2]]=pRowArray[_i2];}return tmpObject;}// Set the header data, for use in marshalling to JSON.
},{key:"setHeader",value:function setHeader(pHeaderArray){this.Header=pHeaderArray;for(var i=0;i<this.Header.length;i++){if(typeof this.Header[i]=='undefined'){this.HeaderFieldNames[i]="".concat(i);}else{this.HeaderFieldNames[i]=this.Header[i].toString();}}}},{key:"resetRowState",value:function resetRowState(){this.CurrentRecord=[];}},{key:"pushLine",value:function pushLine(){for(var i=0;i<this.CleanCharacters.length;i++){this.CurrentLine=this.CurrentLine.replace(this.CleanCharacters[i],'');}this.CurrentRecord.push(this.CurrentLine);this.CurrentLine='';}},{key:"emitRow",value:function emitRow(pFormatAsJSON){var tmpFormatAsJSON=typeof pFormatAsJSON=='undefined'?this.EmitJSON:pFormatAsJSON;this.RowsEmitted++;var tmpCompletedRecord=this.CurrentRecord;this.CurrentRecord=[];if(tmpFormatAsJSON){return this.marshalRowToJSON(tmpCompletedRecord);}else{return tmpCompletedRecord;}}},{key:"parseCSVLine",value:function parseCSVLine(pLineString){this.LinesParsed++;for(var i=0;i<pLineString.length;i++){if(!this.InQuote&&pLineString[i]==this.Delimiter){this.pushLine();}else if(pLineString[i]==this.QuoteCharacter){// If we are in the second part of an escaped quote, ignore it.
if(this.InEscapedQuote){this.InEscapedQuote=false;}// If we aren't in a quote, enter quote
else if(!this.InQuote){this.InQuote=true;}// We are in a quote, so peek forward to see if this is an "escaped" quote pair
else if(i<pLineString.length&&pLineString[i+1]==this.QuoteCharacter){this.CurrentLine+=this.EscapedQuoteString;this.InEscapedQuote=true;}// We are in a quote, this isn't an "escaped" quote pair, so go out of quote mode
else{this.InQuote=false;}}else{this.CurrentLine+=pLineString[i];}}// See if we are in a multiline quoted entry -- if not, emit the row.
if(!this.InQuote){// Push the last remaining column from the buffer to the current line.
this.pushLine();// Check to see if there is a header -- and if so, if this is the header row
if(this.HasHeader&&!this.HasSetHeader&&this.RowsEmitted==this.HeaderLineIndex){this.HasSetHeader=true;// Override the format as json bit
this.setHeader(this.emitRow(false));// No matter what, formatting this as JSON is silly and we don't want to go there anyway.
if(this.EmitHeader){return this.Header;}else{return false;}}else{return this.emitRow();}}else{return false;}}}]);return CSVParser;}(libFableServiceProviderBase);module.exports=CSVParser;},{"fable-serviceproviderbase":44}],53:[function(require,module,exports){var libFableServiceProviderBase=require('fable-serviceproviderbase');/**
* Data Formatting and Translation Functions
*
* @class DataFormat
*/var DataFormat=/*#__PURE__*/function(_libFableServiceProvi7){_inherits(DataFormat,_libFableServiceProvi7);var _super11=_createSuper(DataFormat);function DataFormat(pFable,pOptions,pServiceHash){var _this16;_classCallCheck2(this,DataFormat);_this16=_super11.call(this,pFable,pOptions,pServiceHash);/**
	 * Pad the start of a string.
	 *
	 * @param {*} pString
	 * @param {number} pTargetLength
	 * @returns {string} pPadString
	 */_defineProperty2(_assertThisInitialized(_this16),"stringPadStart",function(pString,pTargetLength,pPadString){var tmpString=pString.toString();return this.stringGeneratePaddingString(tmpString,pTargetLength,pPadString)+tmpString;});/**
	 * Pad the end of a string.
	 *
	 * @param {*} pString
	 * @param {number} pTargetLength
	 * @returns {string} pPadString
	 */_defineProperty2(_assertThisInitialized(_this16),"stringPadEnd",function(pString,pTargetLength,pPadString){var tmpString=pString.toString();return tmpString+this.stringGeneratePaddingString(tmpString,pTargetLength,pPadString);});_this16.serviceType='DataArithmatic';// Regular Expressions (so they don't have to be recompiled every time)
// These could be defined as static, but I'm not sure if that will work with browserify ... and specifically the QT browser.
_this16._Regex_formatterInsertCommas=/.{1,3}/g;// Match Function:
// function(pMatch, pSign, pZeros, pBefore, pDecimal, pAfter)
// Thoughts about below:   /^([+-]?)(0*)(\d+)(\.(\d+))?$/;
_this16._Regex_formatterAddCommasToNumber=/^([-+]?)(0?)(\d+)(.?)(\d+)$/g;_this16._Regex_formatterDollarsRemoveCommas=/,/gi;_this16._Regex_formatterCleanNonAlphaChar=/[^a-zA-Z]/gi;_this16._Regex_formatterCapitalizeEachWord=/([a-zA-Z]+)/g;// TODO: Potentially pull these in from a configuration.
// TODO: Use locale data for this if it's defaults all the way down.
_this16._Value_MoneySign_Currency='$';_this16._Value_NaN_Currency='--';_this16._Value_GroupSeparator_Number=',';_this16._Value_Prefix_StringHash='HSH';_this16._Value_Clean_formatterCleanNonAlpha='';_this16._UseEngineStringStartsWith=typeof String.prototype.startsWith==='function';_this16._UseEngineStringEndsWith=typeof String.prototype.endsWith==='function';return _this16;}/*************************************************************************
	 * String Manipulation and Comparison Functions
	 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/ /**
	 * Reverse a string
	 *
	 * @param {string} pString - The string to reverse
	 * @returns {string}
	 */_createClass2(DataFormat,[{key:"stringReverse",value:function stringReverse(pString){// TODO: Benchmark if there are faster ways we want to do this with all the newer JS stuff
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
	 */},{key:"insecureStringHash",value:function insecureStringHash(pString){var tmpHash=0;var tmpStringLength=pString.length;var tmpCharacterIndex=0;while(tmpCharacterIndex<tmpStringLength){tmpHash=(tmpHash<<5)-tmpHash+pString.charCodeAt(tmpCharacterIndex++)|0;}return"".concat(this._Value_Prefix_StringHash).concat(tmpHash);}},{key:"capitalizeEachWord",value:function capitalizeEachWord(pString){return pString.replace(this._Regex_formatterCapitalizeEachWord,function(pMatch){return pMatch.charAt(0).toUpperCase()+pMatch.substr(1);});}/**
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
	 * Clean a string of any non-alpha characters (including numbers)
	 *
	 * @param {*} pString
	 * @returns
	 */},{key:"cleanNonAlphaCharacters",value:function cleanNonAlphaCharacters(pString){if(typeof pString=='string'&&pString!=''){return pString.replace(this._Regex_formatterCleanNonAlphaChar,this._Value_Clean_formatterCleanNonAlpha);}return'';}/*************************************************************************
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
	 */},{key:"formatterDollars",value:function formatterDollars(pValue){if(isNaN(pValue)){return this._Value_NaN_Currency;}if(pValue===null||pValue===undefined){return this._Value_NaN_Currency;}var tmpDollarAmountArbitrary=this.fable.Utility.bigNumber(pValue);var tmpDollarAmount=tmpDollarAmountArbitrary.toFixed(2);if(isNaN(tmpDollarAmount)){// Try again and see if what was passed in was a dollars string.
if(typeof pValue=='string'){// TODO: Better rounding function?  This is a hack to get rid of the currency symbol and commas.
tmpDollarAmount=parseFloat(pValue.replace(this._Value_MoneySign_Currency,'').replace(this._Regex_formatterDollarsRemoveCommas,'')).toFixed(2);}// If we didn't get a number, return the "not a number" string.
if(isNaN(tmpDollarAmount)){return this._Value_NaN_Currency;}}// TODO: Get locale data and use that for this stuff.
return"$".concat(this.formatterAddCommasToNumber(tmpDollarAmount));}/**
	 * Round a number to a certain number of digits.  If the number is not a number, it will return 0.  If no digits are specified, it will default to 2 significant digits.
	 *
	 * @param {*} pValue
	 * @param {number} pDigits
	 * @returns {string}
	 */},{key:"formatterRoundNumber",value:function formatterRoundNumber(pValue,pDigits){var tmpDigits=typeof pDigits=='undefined'?2:pDigits;if(isNaN(pValue)){var tmpZed=0;return tmpZed.toFixed(tmpDigits);}if(pValue===null||pValue===undefined){return'';}var tmpAmountArbitrary=this.fable.Utility.bigNumber(pValue);var tmpValue=tmpAmountArbitrary.toFixed(tmpDigits);if(isNaN(tmpValue)){var _tmpZed=0;return _tmpZed.toFixed(tmpDigits);}else{return tmpValue;}}/**
	 * Generate a reapeating padding string to be appended before or after depending on 
	 * which padding function it uses.
	 *
	 * @param {*} pString
	 * @param {number} pTargetLength
	 * @returns {string} pPadString
	 */},{key:"stringGeneratePaddingString",value:function stringGeneratePaddingString(pString,pTargetLength,pPadString){var tmpTargetLength=pTargetLength>>0;var tmpPadString=String(typeof pPadString!=='undefined'?pPadString:' ');if(pString.length>pTargetLength){// No padding string if the source string is already longer than the target length, return an empty string
return'';}else{var tmpPadLength=pTargetLength-pString.length;if(tmpPadLength>tmpPadString.length){tmpPadString+=tmpPadString.repeat(tmpTargetLength/tmpPadString.length);}return tmpPadString.slice(0,tmpPadLength);}}},{key:"formatTimeSpan",value:/*************************************************************************
	 * Time Formatting Functions (milliseconds)
	 *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/ /**
	 * Format a time length in milliseconds into a human readable string.
	 * @param {number} pTimeSpan 
	 * @returns {string} - HH:MM:SS.mmm
	 */function formatTimeSpan(pTimeSpan){if(typeof pTimeSpan!='number'){return'';}var tmpMs=parseInt(pTimeSpan%1000);var tmpSeconds=parseInt(pTimeSpan/1000%60);var tmpMinutes=parseInt(pTimeSpan/(1000*60)%60);var tmpHours=parseInt(pTimeSpan/(1000*60*60));return"".concat(this.stringPadStart(tmpHours,2,'0'),":").concat(this.stringPadStart(tmpMinutes,2,'0'),":").concat(this.stringPadStart(tmpSeconds,2,'0'),".").concat(this.stringPadStart(tmpMs,3,'0'));}/**
	 * Format the time delta between two times in milliseconds into a human readable string.
	 * 
	 * @param {number} pTimeStart 
	 * @param {number} pTimeEnd 
	 * @returns {string} - HH:MM:SS.mmm
	 */},{key:"formatTimeDelta",value:function formatTimeDelta(pTimeStart,pTimeEnd){if(typeof pTimeStart!='number'||typeof pTimeEnd!='number'){return'';}return this.formatTimeSpan(pTimeEnd-pTimeStart);}// THE FOLLOWING TERRIBLE FUNCTIONS ARE FOR QT / WKHTMLTOPDF when luxon and moment don't work so well
},{key:"getMonthFromDate",value:function getMonthFromDate(pJavascriptDate){var tmpMonths=["January","February","March","April","May","June","July","August","September","October","November","December"];return tmpMonths[pJavascriptDate.getMonth()];}},{key:"getMonthAbbreviatedFromDate",value:function getMonthAbbreviatedFromDate(pJavascriptDate){var tmpMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return tmpMonths[pJavascriptDate.getMonth()];}},{key:"formatMonthDayYearFromDate",value:function formatMonthDayYearFromDate(pJavascriptDate,pStrict){var tmpStrict=typeof pStrict!=='undefined'?pStrict:false;var tmpMonth=pJavascriptDate.getMonth()+1;var tmpDay=pJavascriptDate.getDate();var tmpYear=pJavascriptDate.getFullYear();if(tmpStrict){tmpMonth=this.stringPadStart(tmpMonth,2,'0');tmpDay=this.stringPadStart(tmpDay,2,'0');tmpYear=this.stringPadStart(tmpYear,4,'0');}return"".concat(tmpMonth,"/").concat(tmpDay,"/").concat(tmpYear);}},{key:"formatSortableStringFromDate",value:function formatSortableStringFromDate(pDate){return pDate.getFullYear()+this.stringPadStart(pDate.getMonth(),2,'0')+this.stringPadStart(pDate.getDate(),2,'0');}/*************************************************************************
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
if(tmpString[i]==tmpEnclosureStart){tmpEnclosureDepth++;if(tmpEnclosureDepth==1){tmpEnclosureCount++;if(tmpEnclosureIndexToRemove==tmpEnclosureCount-1){tmpMatchedEnclosureIndex=true;tmpEnclosureStartIndex=i;}}}else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;if(tmpEnclosureDepth==0&&tmpMatchedEnclosureIndex&&tmpEnclosureEndIndex<=tmpEnclosureStartIndex){tmpEnclosureEndIndex=i;tmpMatchedEnclosureIndex=false;}}}if(tmpEnclosureCount<=tmpEnclosureIndexToRemove){return tmpString;}var tmpReturnString='';if(tmpEnclosureStartIndex>1){tmpReturnString=tmpString.substring(0,tmpEnclosureStartIndex);}if(tmpString.length>tmpEnclosureEndIndex+1&&tmpEnclosureEndIndex>tmpEnclosureStartIndex){tmpReturnString+=tmpString.substring(tmpEnclosureEndIndex+1);}return tmpReturnString;}}]);return DataFormat;}(libFableServiceProviderBase);module.exports=DataFormat;},{"fable-serviceproviderbase":44}],54:[function(require,module,exports){module.exports={"DefaultIntegerMinimum":0,"DefaultIntegerMaximum":9999999,"DefaultNumericStringLength":10,"MonthSet":["January","February","March","April","May","June","July","August","September","October","November","December"],"WeekDaySet":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"ColorSet":["Red","Orange","Yellow","Green","Blue","Indigo","Violet","Pink","Purple","Turquoise","Gold","Lime","Maroon","Navy","Coral","Teal","Brown","White","Black","Sky","Berry","Grey","Straw","Silver","Sapphire"],"SurNameSet":["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez","Campbell","Mitchell","Roberts","Carter","Phillips","Evans","Turner","Torres","Parker","Collins","Edwards","Stewart","Flores","Morris","Nguyen","Murphy","Rivera","Cook","Rogers","Morgan","Peterson","Cooper","Reed","Bailey","Bell","Gomez","Kelly","Howard","Ward","Cox","Diaz","Richardson","Wood","Watson","Brooks","Bennett","Gray","James","Reyes","Cruz","Hughes","Price","Myers","Long","Foster","Sanders","Ross","Morales","Powell","Sullivan","Russell","Ortiz","Jenkins","Gutierrez","Perry","Butler","Barnes","Fisher"],"NameSet":["Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Sandra","Margaret","Ashley","Kimberly","Emily","Donna","Michelle","Carol","Amanda","Melissa","Deborah","Stephanie","Dorothy","Rebecca","Sharon","Laura","Cynthia","Amy","Kathleen","Angela","Shirley","Brenda","Emma","Anna","Pamela","Nicole","Samantha","Katherine","Christine","Helen","Debra","Rachel","Carolyn","Janet","Maria","Catherine","Heather","Diane","Olivia","Julie","Joyce","Victoria","Ruth","Virginia","Lauren","Kelly","Christina","Joan","Evelyn","Judith","Andrea","Hannah","Megan","Cheryl","Jacqueline","Martha","Madison","Teresa","Gloria","Sara","Janice","Ann","Kathryn","Abigail","Sophia","Frances","Jean","Alice","Judy","Isabella","Julia","Grace","Amber","Denise","Danielle","Marilyn","Beverly","Charlotte","Natalie","Theresa","Diana","Brittany","Doris","Kayla","Alexis","Lori","Marie","James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Christopher","Charles","Daniel","Matthew","Anthony","Mark","Donald","Steven","Andrew","Paul","Joshua","Kenneth","Kevin","Brian","George","Timothy","Ronald","Jason","Edward","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Gregory","Alexander","Patrick","Frank","Raymond","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Adam","Nathan","Henry","Zachary","Douglas","Peter","Kyle","Noah","Ethan","Jeremy","Walter","Christian","Keith","Roger","Terry","Austin","Sean","Gerald","Carl","Harold","Dylan","Arthur","Lawrence","Jordan","Jesse","Bryan","Billy","Bruce","Gabriel","Joe","Logan","Alan","Juan","Albert","Willie","Elijah","Wayne","Randy","Vincent","Mason","Roy","Ralph","Bobby","Russell","Bradley","Philip","Eugene"]};},{}],55:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var FableServiceDataGeneration=/*#__PURE__*/function(_libFableServiceBase2){_inherits(FableServiceDataGeneration,_libFableServiceBase2);var _super12=_createSuper(FableServiceDataGeneration);function FableServiceDataGeneration(pFable,pOptions,pServiceHash){var _this17;_classCallCheck2(this,FableServiceDataGeneration);_this17=_super12.call(this,pFable,pOptions,pServiceHash);_this17.serviceType='DataGeneration';_this17.defaultData=require('./Fable-Service-DataGeneration-DefaultValues.json');return _this17;}// Return a random integer between pMinimum and pMaximum
_createClass2(FableServiceDataGeneration,[{key:"randomIntegerBetween",value:function randomIntegerBetween(pMinimum,pMaximum){return Math.floor(Math.random()*(pMaximum-pMinimum))+pMinimum;}// Return a random integer up to the passed-in maximum
},{key:"randomIntegerUpTo",value:function randomIntegerUpTo(pMaximum){return this.randomIntegerBetween(0,pMaximum);}// Return a random integer between 0 and 9999999
},{key:"randomInteger",value:function randomInteger(){return Math.floor(Math.random()*this.defaultData.DefaultIntegerMaximum);}},{key:"randomNumericString",value:function randomNumericString(pLength,pMaxNumber){var tmpLength=typeof pLength==='undefined'?10:pLength;var tmpMaxNumber=typeof pMaxNumber==='undefined'?Math.pow(10,tmpLength)-1:pMaxNumber;return this.services.DataFormat.stringPadStart(this.randomIntegerUpTo(tmpMaxNumber),pLength,'0');}},{key:"randomMonth",value:function randomMonth(){return this.defaultData.MonthSet[this.randomIntegerUpTo(this.defaultData.MonthSet.length-1)];}},{key:"randomDayOfWeek",value:function randomDayOfWeek(){return this.defaultData.WeekDaySet[this.randomIntegerUpTo(this.defaultData.WeekDaySet.length-1)];}},{key:"randomColor",value:function randomColor(){return this.defaultData.ColorSet[this.randomIntegerUpTo(this.defaultData.ColorSet.length-1)];}},{key:"randomName",value:function randomName(){return this.defaultData.NameSet[this.randomIntegerUpTo(this.defaultData.NameSet.length-1)];}},{key:"randomSurname",value:function randomSurname(){return this.defaultData.SurNameSet[this.randomIntegerUpTo(this.defaultData.SurNameSet.length-1)];}}]);return FableServiceDataGeneration;}(libFableServiceBase);module.exports=FableServiceDataGeneration;},{"./Fable-Service-DataGeneration-DefaultValues.json":54,"fable-serviceproviderbase":44}],56:[function(require,module,exports){var libFableServiceProviderBase=require('fable-serviceproviderbase');/**
* Date management a la Moment using days.js
*
* @class DateManipulation
*/var DateManipulation=/*#__PURE__*/function(_libFableServiceProvi8){_inherits(DateManipulation,_libFableServiceProvi8);var _super13=_createSuper(DateManipulation);function DateManipulation(pFable,pOptions,pServiceHash){var _this18;_classCallCheck2(this,DateManipulation);_this18=_super13.call(this,pFable,pOptions,pServiceHash);_this18.serviceType='Dates';_this18.dayJS=require('dayjs');// Include the `weekOfYear` plugin
_this18.plugin_weekOfYear=require('dayjs/plugin/weekOfYear');_this18.dayJS.extend(_this18.plugin_weekOfYear);// Include the `weekday` plugin
_this18.plugin_weekday=require('dayjs/plugin/weekday');_this18.dayJS.extend(_this18.plugin_weekday);// Include the `isoWeek` plugin
_this18.plugin_isoWeek=require('dayjs/plugin/isoWeek');_this18.dayJS.extend(_this18.plugin_isoWeek);// Include the `timezone` plugin
_this18.plugin_timezone=require('dayjs/plugin/timezone');_this18.dayJS.extend(_this18.plugin_timezone);// Include the `relativetime` plugin
_this18.plugin_relativetime=require('dayjs/plugin/relativeTime');_this18.dayJS.extend(_this18.plugin_relativetime);// Include the `utc` plugin
_this18.plugin_utc=require('dayjs/plugin/utc');_this18.dayJS.extend(_this18.plugin_utc);// Include the `advancedFormat` plugin
_this18.plugin_advancedFormat=require('dayjs/plugin/advancedFormat');_this18.dayJS.extend(_this18.plugin_advancedFormat);// A developer can include locales if they want
// You would do the following:
// const localeDE = require('dayjs/locale/de');
// _Fable.Dates.dayJS.locale('de');
return _this18;}return _createClass2(DateManipulation);}(libFableServiceProviderBase);module.exports=DateManipulation;},{"dayjs":28,"dayjs/plugin/advancedFormat":29,"dayjs/plugin/isoWeek":30,"dayjs/plugin/relativeTime":31,"dayjs/plugin/timezone":32,"dayjs/plugin/utc":33,"dayjs/plugin/weekOfYear":34,"dayjs/plugin/weekday":35,"fable-serviceproviderbase":44}],57:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var FableServiceEnvironmentData=/*#__PURE__*/function(_libFableServiceBase3){_inherits(FableServiceEnvironmentData,_libFableServiceBase3);var _super14=_createSuper(FableServiceEnvironmentData);function FableServiceEnvironmentData(pFable,pOptions,pServiceHash){var _this19;_classCallCheck2(this,FableServiceEnvironmentData);_this19=_super14.call(this,pFable,pOptions,pServiceHash);_this19.serviceType='EnvironmentData';_this19.Environment="node.js";return _this19;}return _createClass2(FableServiceEnvironmentData);}(libFableServiceBase);module.exports=FableServiceEnvironmentData;},{"fable-serviceproviderbase":44}],58:[function(require,module,exports){(function(process){(function(){var libFableServiceBase=require('fable-serviceproviderbase');var libFS=require('fs');var libPath=require('path');var libReadline=require('readline');var FableServiceFilePersistence=/*#__PURE__*/function(_libFableServiceBase4){_inherits(FableServiceFilePersistence,_libFableServiceBase4);var _super15=_createSuper(FableServiceFilePersistence);function FableServiceFilePersistence(pFable,pOptions,pServiceHash){var _this20;_classCallCheck2(this,FableServiceFilePersistence);_this20=_super15.call(this,pFable,pOptions,pServiceHash);_this20.serviceType='FilePersistence';if(!_this20.options.hasOwnProperty('Mode')){_this20.options.Mode=parseInt('0777',8)&~process.umask();}_this20.libFS=libFS;_this20.libPath=libPath;_this20.libReadline=libReadline;return _this20;}_createClass2(FableServiceFilePersistence,[{key:"joinPath",value:function joinPath(){return libPath.resolve.apply(libPath,arguments);}},{key:"existsSync",value:function existsSync(pPath){return libFS.existsSync(pPath);}},{key:"exists",value:function exists(pPath,fCallback){var tmpFileExists=this.existsSync(pPath);;return fCallback(null,tmpFileExists);}},{key:"appendFileSync",value:function appendFileSync(pFileName,pAppendContent,pOptions){var tmpOptions=typeof pOptions==='undefined'?'utf8':pOptions;return libFS.appendFileSync(pFileName,pAppendContent,tmpOptions);}},{key:"deleteFileSync",value:function deleteFileSync(pFileName){return libFS.unlinkSync(pFileName);}},{key:"deleteFolderSync",value:function deleteFolderSync(pFileName){return libFS.rmdirSync(pFileName);}},{key:"readFileSync",value:function readFileSync(pFilePath,pOptions){var tmpOptions=typeof pOptions==='undefined'?'utf8':pOptions;return libFS.readFileSync(pFilePath,tmpOptions);}},{key:"readFile",value:function readFile(pFilePath,pOptions,fCallback){var tmpOptions=typeof pOptions==='undefined'?'utf8':pOptions;return libFS.readFile(pFilePath,tmpOptions,fCallback);}},{key:"writeFileSync",value:function writeFileSync(pFileName,pFileContent,pOptions){var tmpOptions=typeof pOptions==='undefined'?'utf8':pOptions;return libFS.writeFileSync(pFileName,pFileContent,tmpOptions);}},{key:"writeFileSyncFromObject",value:function writeFileSyncFromObject(pFileName,pObject){return this.writeFileSync(pFileName,JSON.stringify(pObject,null,4));}},{key:"writeFileSyncFromArray",value:function writeFileSyncFromArray(pFileName,pFileArray){if(!Array.isArray(pFileArray)){this.log.error("File Persistence Service attempted to write ".concat(pFileName," from array but the expected array was not an array (it was a ").concat(_typeof(pFileArray),")."));return Error('Attempted to write ${pFileName} from array but the expected array was not an array (it was a ${typeof(pFileArray)}).');}else{for(var i=0;i<pFileArray.length;i++){return this.appendFileSync(pFileName,"".concat(pFileArray[i],"\n"));}}}},{key:"writeFile",value:function writeFile(pFileName,pFileContent,pOptions,fCallback){var tmpOptions=typeof pOptions==='undefined'?'utf8':pOptions;return libFS.writeFile(pFileName,pFileContent,tmpOptions,fCallback);}},{key:"lineReaderFactory",value:function lineReaderFactory(pFilePath,fOnLine,fOnComplete,fOnError){var tmpLineReader={};if(typeof pFilePath!='string'){return false;}tmpLineReader.filePath=pFilePath;tmpLineReader.fileStream=libFS.createReadStream(tmpLineReader.filePath);tmpLineReader.reader=libReadline.createInterface({input:tmpLineReader.fileStream,crlfDelay:Infinity});if(typeof fOnError==='function'){tmpLineReader.reader.on('error',fOnError);}tmpLineReader.reader.on('line',typeof fOnLine==='function'?fOnLine:function(){});if(typeof fOnComplete==='function'){tmpLineReader.reader.on('close',fOnComplete);}return tmpLineReader;}// Folder management
},{key:"makeFolderRecursive",value:function makeFolderRecursive(pParameters,fCallback){var _this21=this;var tmpParameters=pParameters;if(typeof pParameters=='string'){tmpParameters={Path:pParameters};}else if(_typeof(pParameters)!=='object'){fCallback(new Error('Parameters object or string not properly passed to recursive folder create.'));return false;}if(typeof tmpParameters.Path!=='string'){fCallback(new Error('Parameters object needs a path to run the folder create operation.'));return false;}if(!tmpParameters.hasOwnProperty('Mode')){tmpParameters.Mode=this.options.Mode;}// Check if we are just starting .. if so, build the initial state for our recursive function
if(typeof tmpParameters.CurrentPathIndex==='undefined'){// Build the tools to start recursing
tmpParameters.ActualPath=libPath.normalize(tmpParameters.Path);tmpParameters.ActualPathParts=tmpParameters.ActualPath.split(libPath.sep);tmpParameters.CurrentPathIndex=0;tmpParameters.CurrentPath='';}else{// This is not our first run, so we will continue the recursion.
// Build the new base path
if(tmpParameters.CurrentPath==libPath.sep){tmpParameters.CurrentPath=tmpParameters.CurrentPath+tmpParameters.ActualPathParts[tmpParameters.CurrentPathIndex];}else{tmpParameters.CurrentPath=tmpParameters.CurrentPath+libPath.sep+tmpParameters.ActualPathParts[tmpParameters.CurrentPathIndex];}// Increment the path index
tmpParameters.CurrentPathIndex++;}// Check if the path is fully complete
if(tmpParameters.CurrentPathIndex>=tmpParameters.ActualPathParts.length){return fCallback(null);}// Check if the path exists (and is a folder)
libFS.open(tmpParameters.CurrentPath+libPath.sep+tmpParameters.ActualPathParts[tmpParameters.CurrentPathIndex],'r',function(pError,pFileDescriptor){if(pFileDescriptor){libFS.closeSync(pFileDescriptor);}if(pError&&pError.code=='ENOENT'){/* Path doesn't exist, create it */libFS.mkdir(tmpParameters.CurrentPath+libPath.sep+tmpParameters.ActualPathParts[tmpParameters.CurrentPathIndex],tmpParameters.Mode,function(pCreateError){if(!pCreateError){// We have now created our folder and there was no error -- continue.
return _this21.makeFolderRecursive(tmpParameters,fCallback);}else if(pCreateError.code=='EEXIST'){// The folder exists -- our dev might be running this in parallel/async/whatnot.
return _this21.makeFolderRecursive(tmpParameters,fCallback);}else{console.log(pCreateError.code);return fCallback(pCreateError);}});}else{return _this21.makeFolderRecursive(tmpParameters,fCallback);}});}}]);return FableServiceFilePersistence;}(libFableServiceBase);module.exports=FableServiceFilePersistence;}).call(this);}).call(this,require('_process'));},{"_process":98,"fable-serviceproviderbase":44,"fs":19,"path":92,"readline":19}],59:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');/**
* Precedent Meta-Templating
* @author      Steven Velozo <steven@velozo.com>
* @description Process text stream trie and postfix tree, parsing out meta-template expression functions.
*/var libWordTree=require("./Fable-Service-MetaTemplate/MetaTemplate-WordTree.js");var libStringParser=require("./Fable-Service-MetaTemplate/MetaTemplate-StringParser.js");var FableServiceMetaTemplate=/*#__PURE__*/function(_libFableServiceBase5){_inherits(FableServiceMetaTemplate,_libFableServiceBase5);var _super16=_createSuper(FableServiceMetaTemplate);function FableServiceMetaTemplate(pFable,pOptions,pServiceHash){var _this22;_classCallCheck2(this,FableServiceMetaTemplate);_this22=_super16.call(this,pFable,pOptions,pServiceHash);_this22.serviceType='MetaTemplate';_this22.WordTree=new libWordTree();// In order to allow asynchronous template processing we need to use the async.eachLimit function
_this22.StringParser=new libStringParser(_this22.fable.services.Utility.eachLimit);_this22.ParseTree=_this22.WordTree.ParseTree;return _this22;}/**
	 * Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pTree - A node on the parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @param {number} pIndex - callback function
	 * @return {bool} True if adding the pattern was successful
	 */_createClass2(FableServiceMetaTemplate,[{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,pParser){return this.WordTree.addPattern(pPatternStart,pPatternEnd,pParser);}},{key:"addPatternAsync",value:function addPatternAsync(pPatternStart,pPatternEnd,pParserPromise){return this.WordTree.addPatternAsync(pPatternStart,pPatternEnd,pParserPromise);}/**
	 * Parse a string with the existing parse tree
	 * @method parseString
	 * @param {string} pString - The string to parse
	 * @param {object} pData - Data to pass in as the second argument
	 * @return {string} The result from the parser
	 */},{key:"parseString",value:function parseString(pString,pData,fCallback){return this.StringParser.parseString(pString,this.ParseTree,pData,fCallback);}}]);return FableServiceMetaTemplate;}(libFableServiceBase);module.exports=FableServiceMetaTemplate;},{"./Fable-Service-MetaTemplate/MetaTemplate-StringParser.js":60,"./Fable-Service-MetaTemplate/MetaTemplate-WordTree.js":61,"fable-serviceproviderbase":44}],60:[function(require,module,exports){/**
* String Parser
* @author      Steven Velozo <steven@velozo.com>
* @description Parse a string, properly processing each matched token in the word tree.
*/var StringParser=/*#__PURE__*/function(){/**
	 * StringParser Constructor
	 */function StringParser(fEachLimit){_classCallCheck2(this,StringParser);this.eachLimit=fEachLimit;}/**
	 * Create a fresh parsing state object to work with.
	 * @method newParserState
	 * @param {Object} pParseTree - A node on the parse tree to begin parsing from (usually root)
	 * @return {Object} A new parser state object for running a character parser on
	 * @private
	 */_createClass2(StringParser,[{key:"newParserState",value:function newParserState(pParseTree){return{ParseTree:pParseTree,Asynchronous:false,Output:'',OutputBuffer:'',Pattern:{},PatternMatch:false,PatternMatchEnd:false};}/**
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
	 */},{key:"flushOutputBuffer",value:function flushOutputBuffer(pParserState){pParserState.Output+=pParserState.OutputBuffer;pParserState.OutputBuffer='';}},{key:"resetOutputBuffer",value:function resetOutputBuffer(pParserState){// Flush the output buffer.
this.flushOutputBuffer(pParserState);// End pattern mode
pParserState.Pattern=false;pParserState.PatternStartNode=false;pParserState.StartPatternMatchComplete=false;pParserState.EndPatternMatchBegan=false;pParserState.PatternMatch=false;return true;}/**
	 * Parse a character in the buffer.
	 * @method parseCharacter
	 * @param {string} pCharacter - The character to append
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"parseCharacter",value:function parseCharacter(pCharacter,pParserState,pData){// If we are already in a pattern match traversal
if(pParserState.PatternMatch){// If the pattern is still matching the start and we haven't passed the buffer
if(!pParserState.StartPatternMatchComplete&&pParserState.Pattern.hasOwnProperty(pCharacter)){pParserState.Pattern=pParserState.Pattern[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else if(pParserState.EndPatternMatchBegan){if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// Flush the output buffer.
this.appendOutputBuffer(pCharacter,pParserState);// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){// Run the function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);return this.resetOutputBuffer(pParserState);}}else if(pParserState.PatternStartNode.PatternEnd.hasOwnProperty(pCharacter)){// We broke out of the end -- see if this is a new start of the end.
pParserState.Pattern=pParserState.PatternStartNode.PatternEnd[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else{pParserState.EndPatternMatchBegan=false;this.appendOutputBuffer(pCharacter,pParserState);}}else if(pParserState.Pattern.hasOwnProperty('PatternEnd')){if(!pParserState.StartPatternMatchComplete){pParserState.StartPatternMatchComplete=true;pParserState.PatternStartNode=pParserState.Pattern;}this.appendOutputBuffer(pCharacter,pParserState);if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This is the first character of the end pattern.
pParserState.EndPatternMatchBegan=true;// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){if(pParserState.Pattern.isAsync){this.log.error("MetaTemplate: The pattern ".concat(pParserState.Pattern.PatternStartString," is asynchronous and cannot be used in a synchronous parser."));this.resetOutputBuffer(pParserState);}else{// Run the t*mplate function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);return this.resetOutputBuffer(pParserState);}}}}else{// We are in a pattern start but didn't match one; reset and start trying again from this character.
this.resetOutputBuffer(pParserState);}}// If we aren't in a pattern match or pattern, and this isn't the start of a new pattern (RAW mode)....
if(!pParserState.PatternMatch){// This may be the start of a new pattern....
if(pParserState.ParseTree.hasOwnProperty(pCharacter)){// ... assign the root node as the matched node.
this.resetOutputBuffer(pParserState);this.appendOutputBuffer(pCharacter,pParserState);pParserState.Pattern=pParserState.ParseTree[pCharacter];pParserState.PatternMatch=true;return true;}else{this.appendOutputBuffer(pCharacter,pParserState);}}return false;}/**
	 * Parse a character in the buffer.
	 * @method parseCharacter
	 * @param {string} pCharacter - The character to append
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"parseCharacterAsync",value:function parseCharacterAsync(pCharacter,pParserState,pData,fCallback){var _this23=this;// If we are already in a pattern match traversal
if(pParserState.PatternMatch){// If the pattern is still matching the start and we haven't passed the buffer
if(!pParserState.StartPatternMatchComplete&&pParserState.Pattern.hasOwnProperty(pCharacter)){pParserState.Pattern=pParserState.Pattern[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else if(pParserState.EndPatternMatchBegan){if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// Flush the output buffer.
this.appendOutputBuffer(pCharacter,pParserState);// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){// ... this is the end of a pattern, cut off the end tag and parse it.
// Trim the start and end tags off the output buffer now
if(pParserState.Pattern.isAsync){// Run the function
return pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData,function(pError,pAsyncOutput){if(pError){console.log("Precedent ERROR: Async template error happened parsing ".concat(pParserState.Pattern.PatternStart," ... ").concat(pParserState.Pattern.PatternEnd,": ").concat(pError));}pParserState.OutputBuffer=pAsyncOutput;_this23.resetOutputBuffer(pParserState);return fCallback();});}else{// Run the t*mplate function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);this.resetOutputBuffer(pParserState);return fCallback();}}}else if(pParserState.PatternStartNode.PatternEnd.hasOwnProperty(pCharacter)){// We broke out of the end -- see if this is a new start of the end.
pParserState.Pattern=pParserState.PatternStartNode.PatternEnd[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else{pParserState.EndPatternMatchBegan=false;this.appendOutputBuffer(pCharacter,pParserState);}}else if(pParserState.Pattern.hasOwnProperty('PatternEnd')){if(!pParserState.StartPatternMatchComplete){pParserState.StartPatternMatchComplete=true;pParserState.PatternStartNode=pParserState.Pattern;}this.appendOutputBuffer(pCharacter,pParserState);if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This is the first character of the end pattern.
pParserState.EndPatternMatchBegan=true;// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){// ... this is the end of a pattern, cut off the end tag and parse it.
// Trim the start and end tags off the output buffer now
if(pParserState.Pattern.isAsync){// Run the function
return pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData,function(pError,pAsyncOutput){if(pError){console.log("Precedent ERROR: Async template error happened parsing ".concat(pParserState.Pattern.PatternStart," ... ").concat(pParserState.Pattern.PatternEnd,": ").concat(pError));}pParserState.OutputBuffer=pAsyncOutput;_this23.resetOutputBuffer(pParserState);return fCallback();});}else{// Run the t*mplate function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);this.resetOutputBuffer(pParserState);return fCallback();}}}}else{// We are in a pattern start but didn't match one; reset and start trying again from this character.
this.resetOutputBuffer(pParserState);return fCallback();}}// If we aren't in a pattern match or pattern, and this isn't the start of a new pattern (RAW mode)....
if(!pParserState.PatternMatch){// This may be the start of a new pattern....
if(pParserState.ParseTree.hasOwnProperty(pCharacter)){// ... assign the root node as the matched node.
this.resetOutputBuffer(pParserState);this.appendOutputBuffer(pCharacter,pParserState);pParserState.Pattern=pParserState.ParseTree[pCharacter];pParserState.PatternMatch=true;}else{this.appendOutputBuffer(pCharacter,pParserState);}}return fCallback();}/**
	 * Parse a string for matches, and process any template segments that occur.
	 * @method parseString
	 * @param {string} pString - The string to parse.
	 * @param {Object} pParseTree - The parse tree to begin parsing from (usually root)
	 * @param {Object} pData - The data to pass to the function as a second parameter
	 * @param {function} fCallback - The callback function to call when the parse is complete
	 */},{key:"parseString",value:function parseString(pString,pParseTree,pData,fCallback){var _this24=this;if(typeof fCallback!=='function'){var tmpParserState=this.newParserState(pParseTree);for(var i=0;i<pString.length;i++){// TODO: This is not fast.
this.parseCharacter(pString[i],tmpParserState,pData,fCallback);}this.flushOutputBuffer(tmpParserState);return tmpParserState.Output;}else{// This is the async mode
var _tmpParserState=this.newParserState(pParseTree);_tmpParserState.Asynchronous=true;this.eachLimit(pString,1,function(pCharacter,fCharacterCallback){_this24.parseCharacterAsync(pCharacter,_tmpParserState,pData,fCharacterCallback);},function(pError){// Flush the remaining data
_this24.flushOutputBuffer(_tmpParserState);fCallback(pError,_tmpParserState.Output);});}}}]);return StringParser;}();module.exports=StringParser;},{}],61:[function(require,module,exports){/**
* Word Tree
* @author      Steven Velozo <steven@velozo.com>
* @description Create a tree (directed graph) of Javascript objects, one character per object.
*/var WordTree=/*#__PURE__*/function(){/**
	 * WordTree Constructor
	 */function WordTree(){_classCallCheck2(this,WordTree);this.ParseTree={};}/**
	 * Add a child character to a Parse Tree node
	 * @method addChild
	 * @param {Object} pTree - A parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @returns {Object} The resulting leaf node that was added (or found)
	 * @private
	 */_createClass2(WordTree,[{key:"addChild",value:function addChild(pTree,pPattern){if(!pTree.hasOwnProperty(pPattern)){pTree[pPattern]={};}return pTree[pPattern];}/**
	 * Add a child character to a Parse Tree PatternEnd subtree
	 * @method addChild
	 * @param {Object} pTree - A parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @returns {Object} The resulting leaf node that was added (or found)
	 * @private
	 */},{key:"addEndChild",value:function addEndChild(pTree,pPattern){if(!pTree.hasOwnProperty('PatternEnd')){pTree.PatternEnd={};}pTree.PatternEnd[pPattern]={};return pTree.PatternEnd[pPattern];}/** Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pPatternStart - The starting string for the pattern (e.g. "${")
	 * @param {string} pPatternEnd - The ending string for the pattern (e.g. "}")
	 * @param {function} fParser - The function to parse if this is the matched pattern, once the Pattern End is met.  If this is a string, a simple replacement occurs.
	 * @return {bool} True if adding the pattern was successful
	 */},{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,fParser){if(pPatternStart.length<1){return false;}if(typeof pPatternEnd==='string'&&pPatternEnd.length<1){return false;}var tmpLeaf=this.ParseTree;// Add the tree of leaves iteratively
for(var i=0;i<pPatternStart.length;i++){tmpLeaf=this.addChild(tmpLeaf,pPatternStart[i],i);}if(!tmpLeaf.hasOwnProperty('PatternEnd')){tmpLeaf.PatternEnd={};}var tmpPatternEnd=typeof pPatternEnd==='string'?pPatternEnd:pPatternStart;for(var _i3=0;_i3<tmpPatternEnd.length;_i3++){tmpLeaf=this.addEndChild(tmpLeaf,tmpPatternEnd[_i3],_i3);}tmpLeaf.PatternStartString=pPatternStart;tmpLeaf.PatternEndString=tmpPatternEnd;tmpLeaf.Parse=typeof fParser==='function'?fParser:typeof fParser==='string'?function(){return fParser;}:function(pData){return pData;};return tmpLeaf;}/** Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pPatternStart - The starting string for the pattern (e.g. "${")
	 * @param {string} pPatternEnd - The ending string for the pattern (e.g. "}")
	 * @param {function} fParser - The function to parse if this is the matched pattern, once the Pattern End is met.  If this is a string, a simple replacement occurs.
	 * @return {bool} True if adding the pattern was successful
	 */},{key:"addPatternAsync",value:function addPatternAsync(pPatternStart,pPatternEnd,fParser){var tmpLeaf=this.addPattern(pPatternStart,pPatternEnd,fParser);if(tmpLeaf){tmpLeaf.isAsync=true;}}}]);return WordTree;}();module.exports=WordTree;},{}],62:[function(require,module,exports){module.exports={"Metadata":{"UUID":false,"Hash":false,"Name":"","Summary":"","Version":0},"Status":{"Completed":false,"CompletionProgress":0,"CompletionTimeElapsed":0,"TimeStart":0,"TimeEnd":0},"Steps":[],"Errors":[],"Log":[]};},{}],63:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var _OperationStatePrototypeString=JSON.stringify(require('./Fable-Service-Operation-DefaultSettings.js'));var FableOperation=/*#__PURE__*/function(_libFableServiceBase6){_inherits(FableOperation,_libFableServiceBase6);var _super17=_createSuper(FableOperation);function FableOperation(pFable,pOptions,pServiceHash){var _this25;_classCallCheck2(this,FableOperation);_this25=_super17.call(this,pFable,pOptions,pServiceHash);// Timestamps will just be the long ints
_this25.timeStamps={};// ProgressTrackers have an object format of: {Hash:'SomeHash',EndTime:UINT,CurrentTime:UINT,TotalCount:INT,CurrentCount:INT}
_this25.progressTrackers={};_this25.serviceType='PhasedOperation';_this25.state=JSON.parse(_OperationStatePrototypeString);_this25.stepMap={};_this25.stepFunctions={};// Match the service instantiation to the operation.
_this25.state.Metadata.Hash=_this25.Hash;_this25.state.Metadata.UUID=_this25.UUID;_this25.state.Metadata.Name=typeof _this25.options.Name=='string'?_this25.options.Name:"Unnamed Operation ".concat(_this25.state.Metadata.UUID);_this25.name=_this25.state.Metadata.Name;_this25.log=_assertThisInitialized(_this25);return _this25;}_createClass2(FableOperation,[{key:"execute",value:function execute(fExecutionCompleteCallback){var _this26=this;if(this.state.Status.TimeStart){return fExecutionCompleteCallback(new Error("Operation [".concat(this.state.Metadata.UUID,"] ").concat(this.state.Metadata.Name," has already been executed!")));}this.state.Status.TimeStart=+new Date();var tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');for(var i=0;i<this.state.Steps;i++){tmpAnticipate.anticipate(this.stepFunctions[this.state.Steps[i].GUIDStep].bind(this));}// Wait for the anticipation to complete
tmpAnticipate.wait(function(pError){_this26.state.Status.TimeEnd=+new Date();return fExecutionCompleteCallback();});}/*
	TODO: I've gone back and forth on whether this should be an object, JSON 
	object prototype, or set of functions here.  Discuss with colleagues!
*/},{key:"addStep",value:function addStep(pGUIDStep,fStepFunction,pStepName,pStepDescription,pStepMetadata){var tmpStep={};tmpStep.GUIDStep=typeof pGUIDStep!=='undefined'?pGUIDStep:"STEP-".concat(this.state.Steps.length,"-").concat(this.fable.DataGeneration.randomNumericString());tmpStep.Name=typeof pStepName!=='undefined'?pStepName:"Step [".concat(tmpStep.GUIDStep,"]");tmpStep.Description=typeof pStepDescription!=='undefined'?pStepDescription:"Step execution of ".concat(tmpStep.Name,".");// TODO: Right now this allows an Array... do we want to block that?
tmpStep.Metadata=_typeof(pStepMetadata)==='object'?pStepMetadata:{};tmpStep.TimeStart=false;tmpStep.TimeEnd=false;// There is an array of steps, in the Operation State itself ... push a step there
this.state.Steps.push(tmpStep);this.stepMap[tmpStep.GUIDStep];this.stepFunctions[tmpStep.GUIDStep]=fStepFunction;this.state.Status.StepCount++;return tmpStep;}},{key:"getStep",value:function getStep(pGUIDStep){if(this.stepMap.hasOwnProperty(pGUIDStep)){return this.stepMap[pGUIDStep];}return false;}},{key:"startStep",value:function startStep(pGUIDStep){var tmpStep=this.getStep(pGUIDStep);if(tmpStep===false){return false;}tmpStep.TimeStart=+new Date();return tmpStep;}},{key:"stopStep",value:function stopStep(pGUIDStep){var tmpStep=this.getStep(pGUIDStep);if(tmpStep===false){return false;}tmpStep.TimeEnd=+new Date();return tmpStep;}},{key:"writeOperationLog",value:function writeOperationLog(pLogLevel,pLogText,pLogObject){this.state.Log.push("[".concat(new Date().toUTCString(),"]-[").concat(pLogLevel,"]: ").concat(pLogText));if(_typeof(pLogObject)=='object'){this.state.Log.push(JSON.stringify(pLogObject));}}},{key:"writeOperationErrors",value:function writeOperationErrors(pLogText,pLogObject){this.state.Errors.push("".concat(pLogText));if(_typeof(pLogObject)=='object'){this.state.Errors.push(JSON.stringify(pLogObject));}}},{key:"trace",value:function trace(pLogText,pLogObject){this.writeOperationLog('TRACE',pLogText,pLogObject);this.fable.log.trace(pLogText,pLogObject);}},{key:"debug",value:function debug(pLogText,pLogObject){this.writeOperationLog('DEBUG',pLogText,pLogObject);this.fable.log.debug(pLogText,pLogObject);}},{key:"info",value:function info(pLogText,pLogObject){this.writeOperationLog('INFO',pLogText,pLogObject);this.fable.log.info(pLogText,pLogObject);}},{key:"warn",value:function warn(pLogText,pLogObject){this.writeOperationLog('WARN',pLogText,pLogObject);this.fable.log.warn(pLogText,pLogObject);}},{key:"error",value:function error(pLogText,pLogObject){this.writeOperationLog('ERROR',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.error(pLogText,pLogObject);}},{key:"fatal",value:function fatal(pLogText,pLogObject){this.writeOperationLog('FATAL',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.fatal(pLogText,pLogObject);}/************************************************************************
	 * BEGINNING OF -->  Telemetry Helpers
	 */},{key:"createTimeStamp",value:function createTimeStamp(pTimeStampHash){var tmpTimeStampHash=typeof pTimeStampHash=='string'?pTimeStampHash:'Default';this.timeStamps[tmpTimeStampHash]=+new Date();return this.timeStamps[tmpTimeStampHash];}},{key:"getTimeDelta",value:function getTimeDelta(pTimeStampHash){var tmpTimeStampHash=typeof pTimeStampHash=='string'?pTimeStampHash:'Default';if(this.timeStamps.hasOwnProperty(tmpTimeStampHash)){var tmpEndTime=+new Date();return tmpEndTime-this.timeStamps[tmpTimeStampHash];}else{return-1;}}},{key:"logTimeDelta",value:function logTimeDelta(pTimeStampHash,pMessage){var tmpTimeStampHash=typeof pTimeStampHash=='string'?pTimeStampHash:'Default';var tmpMessage=typeof pMessage!=='undefined'?pMessage:"Elapsed for ".concat(tmpTimeStampHash,": ");var tmpOperationTime=this.getTimeDelta(pTimeStampHash);this.info(tmpMessage+' ('+tmpOperationTime+'ms)');return tmpOperationTime;}},{key:"createProgressTracker",value:function createProgressTracker(pTotalOperations,pProgressTrackerHash){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';var tmpTotalOperations=typeof pTotalOperations=='number'?pTotalOperations:100;var tmpProgressTracker={Hash:tmpProgressTrackerHash,StartTime:this.createTimeStamp(tmpProgressTrackerHash),EndTime:0,CurrentTime:0,PercentComplete:-1,AverageOperationTime:-1,EstimatedCompletionTime:-1,TotalCount:tmpTotalOperations,CurrentCount:-1};this.progressTrackers[tmpProgressTrackerHash]=tmpProgressTracker;return tmpProgressTracker;}},{key:"solveProgressTrackerStatus",value:function solveProgressTrackerStatus(pProgressTrackerHash){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';if(!this.progressTrackers.hasOwnProperty(tmpProgressTrackerHash)){this.createProgressTracker(100,tmpProgressTrackerHash);}var tmpProgressTracker=this.progressTrackers[tmpProgressTrackerHash];tmpProgressTracker.CurrentTime=this.getTimeDelta(tmpProgressTracker.Hash);if(tmpProgressTracker.CurrentCount>0&&tmpProgressTracker.TotalCount>0){tmpProgressTracker.PercentComplete=tmpProgressTracker.CurrentCount/tmpProgressTracker.TotalCount*100.0;}if(tmpProgressTracker.CurrentCount>0&&tmpProgressTracker.CurrentTime>0){tmpProgressTracker.AverageOperationTime=tmpProgressTracker.CurrentTime/tmpProgressTracker.CurrentCount;}if(tmpProgressTracker.CurrentCount<tmpProgressTracker.TotalCount&&tmpProgressTracker.AverageOperationTime>0){tmpProgressTracker.EstimatedCompletionTime=(tmpProgressTracker.TotalCount-tmpProgressTracker.CurrentCount)*tmpProgressTracker.AverageOperationTime;}}},{key:"updateProgressTrackerStatus",value:function updateProgressTrackerStatus(pProgressTrackerHash,pCurrentOperations){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';var tmpCurrentOperations=parseInt(pCurrentOperations);if(isNaN(tmpCurrentOperations)){return false;}if(!this.progressTrackers.hasOwnProperty(tmpProgressTrackerHash)){this.createProgressTracker(100,tmpProgressTrackerHash);}this.progressTrackers[tmpProgressTrackerHash].CurrentCount=tmpCurrentOperations;this.progressTrackers[tmpProgressTrackerHash].CurrentTime=this.getTimeDelta(tmpProgressTrackerHash);this.solveProgressTrackerStatus(tmpProgressTrackerHash);return this.progressTrackers[tmpProgressTrackerHash];}},{key:"incrementProgressTrackerStatus",value:function incrementProgressTrackerStatus(pProgressTrackerHash,pIncrementSize){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';var tmpIncrementSize=parseInt(pIncrementSize);if(isNaN(tmpIncrementSize)){return false;}if(!this.progressTrackers.hasOwnProperty(tmpProgressTrackerHash)){this.createProgressTracker(100,tmpProgressTrackerHash);}this.progressTrackers[tmpProgressTrackerHash].CurrentCount=this.progressTrackers[tmpProgressTrackerHash].CurrentCount+tmpIncrementSize;this.progressTrackers[tmpProgressTrackerHash].CurrentTime=this.getTimeDelta(tmpProgressTrackerHash);this.solveProgressTrackerStatus(tmpProgressTrackerHash);return this.progressTrackers[tmpProgressTrackerHash];}},{key:"setProgressTrackerEndTime",value:function setProgressTrackerEndTime(pProgressTrackerHash,pCurrentOperations){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';var tmpCurrentOperations=parseInt(pCurrentOperations);if(!this.progressTrackers.hasOwnProperty(tmpProgressTrackerHash)){return false;}if(!isNaN(tmpCurrentOperations)){this.updateProgressTrackerStatus(tmpProgressTrackerHash,tmpCurrentOperations);}this.progressTrackers[tmpProgressTrackerHash].EndTime=this.getTimeDelta(tmpProgressTrackerHash);this.solveProgressTrackerStatus(tmpProgressTrackerHash);return this.progressTrackers[tmpProgressTrackerHash];}},{key:"printProgressTrackerStatus",value:function printProgressTrackerStatus(pProgressTrackerHash){var tmpProgressTrackerHash=typeof pProgressTrackerHash=='string'?pProgressTrackerHash:'DefaultProgressTracker';if(!this.progressTrackers.hasOwnProperty(tmpProgressTrackerHash)){this.info(">> Progress Tracker ".concat(tmpProgressTrackerHash," does not exist!  No stats to display."));}else{var tmpProgressTracker=this.progressTrackers[tmpProgressTrackerHash];if(tmpProgressTracker.CurrentCount<1){this.info(">> Progress Tracker ".concat(tmpProgressTracker.Hash," has no completed operations.  ").concat(tmpProgressTracker.CurrentTime,"ms have elapsed since it was started."));}else if(tmpProgressTracker.EndTime<1){this.info(">> Progress Tracker ".concat(tmpProgressTracker.Hash," is ").concat(tmpProgressTracker.PercentComplete.toFixed(3),"% completed - ").concat(tmpProgressTracker.CurrentCount," / ").concat(tmpProgressTracker.TotalCount," operations over ").concat(tmpProgressTracker.CurrentTime,"ms (median ").concat(tmpProgressTracker.AverageOperationTime.toFixed(3)," per).  Estimated completion in ").concat(tmpProgressTracker.EstimatedCompletionTime.toFixed(0),"ms or ").concat((tmpProgressTracker.EstimatedCompletionTime/1000/60).toFixed(2),"minutes"));}else{this.info(">> Progress Tracker ".concat(tmpProgressTracker.Hash," is done and completed ").concat(tmpProgressTracker.CurrentCount," / ").concat(tmpProgressTracker.TotalCount," operations in ").concat(tmpProgressTracker.EndTime,"ms."));}}}/*
	 * END OF       -->  Logging and Telemetry Helpers
	 ************************************************************************/}]);return FableOperation;}(libFableServiceBase);module.exports=FableOperation;},{"./Fable-Service-Operation-DefaultSettings.js":62,"fable-serviceproviderbase":44}],64:[function(require,module,exports){(function(Buffer){(function(){var libFableServiceBase=require('fable-serviceproviderbase');var libSimpleGet=require('simple-get');var libCookie=require('cookie');var FableServiceRestClient=/*#__PURE__*/function(_libFableServiceBase7){_inherits(FableServiceRestClient,_libFableServiceBase7);var _super18=_createSuper(FableServiceRestClient);function FableServiceRestClient(pFable,pOptions,pServiceHash){var _this27;_classCallCheck2(this,FableServiceRestClient);_this27=_super18.call(this,pFable,pOptions,pServiceHash);_this27.TraceLog=false;if(_this27.options.TraceLog||_this27.fable.TraceLog){_this27.TraceLog=true;}_this27.dataFormat=_this27.fable.services.DataFormat;_this27.serviceType='RestClient';_this27.cookie=false;// This is a function that can be overridden, to allow the management
// of the request options before they are passed to the request library.
_this27.prepareRequestOptions=function(pOptions){return pOptions;};return _this27;}_createClass2(FableServiceRestClient,[{key:"simpleGet",get:function get(){return libSimpleGet;}},{key:"prepareCookies",value:function prepareCookies(pRequestOptions){if(this.cookie){var tmpCookieObject=this.cookie;if(!pRequestOptions.hasOwnProperty('headers')){pRequestOptions.headers={};}var tmpCookieKeys=Object.keys(tmpCookieObject);if(tmpCookieKeys.length>0){// Only grab the first for now.
pRequestOptions.headers.cookie=libCookie.serialize(tmpCookieKeys[0],tmpCookieObject[tmpCookieKeys[0]]);}}return pRequestOptions;}},{key:"preRequest",value:function preRequest(pOptions){// Validate the options object
var tmpOptions=this.prepareCookies(pOptions);return this.prepareRequestOptions(tmpOptions);}},{key:"executeChunkedRequest",value:function executeChunkedRequest(pOptions,fCallback){var _this28=this;var tmpOptions=this.preRequest(pOptions);tmpOptions.RequestStartTime=this.fable.log.getTimeStamp();if(this.TraceLog){this.fable.log.debug("Beginning ".concat(tmpOptions.method," request to ").concat(tmpOptions.url," at ").concat(tmpOptions.RequestStartTime));}return libSimpleGet(tmpOptions,function(pError,pResponse){if(pError){return fCallback(pError,pResponse);}if(_this28.TraceLog){var tmpConnectTime=_this28.fable.log.getTimeStamp();_this28.fable.log.debug("--> ".concat(tmpOptions.method," connected in ").concat(_this28.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpConnectTime),"ms code ").concat(pResponse.statusCode));}var tmpData='';pResponse.on('data',function(pChunk){// For JSON, the chunk is the serialized object.
if(_this28.TraceLog){var tmpChunkTime=_this28.fable.log.getTimeStamp();_this28.fable.log.debug("--> ".concat(tmpOptions.method," data chunk size ").concat(pChunk.length,"b received in ").concat(_this28.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpChunkTime),"ms"));}tmpData+=pChunk;});pResponse.on('end',function(){if(_this28.TraceLog){var tmpCompletionTime=_this28.fable.log.getTimeStamp();_this28.fable.log.debug("==> ".concat(tmpOptions.method," completed data size ").concat(tmpData.length,"b received in ").concat(_this28.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpCompletionTime),"ms"));}return fCallback(pError,pResponse,tmpData);});});}},{key:"executeChunkedRequestBinary",value:function executeChunkedRequestBinary(pOptions,fCallback){var _this29=this;var tmpOptions=this.preRequest(pOptions);tmpOptions.RequestStartTime=this.fable.log.getTimeStamp();if(this.TraceLog){this.fable.log.debug("Beginning ".concat(tmpOptions.method," request to ").concat(tmpOptions.url," at ").concat(tmpOptions.RequestStartTime));}tmpOptions.json=false;tmpOptions.encoding=null;return libSimpleGet(tmpOptions,function(pError,pResponse){if(pError){return fCallback(pError,pResponse);}if(_this29.TraceLog){var tmpConnectTime=_this29.fable.log.getTimeStamp();_this29.fable.log.debug("--> ".concat(tmpOptions.method," connected in ").concat(_this29.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpConnectTime),"ms code ").concat(pResponse.statusCode));}var tmpDataBuffer=false;pResponse.on('data',function(pChunk){// For JSON, the chunk is the serialized object.
if(_this29.TraceLog){var tmpChunkTime=_this29.fable.log.getTimeStamp();_this29.fable.log.debug("--> ".concat(tmpOptions.method," data chunk size ").concat(pChunk.length,"b received in ").concat(_this29.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpChunkTime),"ms"));}// TODO: Potentially create a third option that streams this to a file?  So it doesn't have to hold it all in memory.
if(!tmpDataBuffer){tmpDataBuffer=Buffer.from(pChunk);}else{tmpDataBuffer=Buffer.concat([tmpDataBuffer,pChunk]);}});pResponse.on('end',function(){if(_this29.TraceLog){var tmpCompletionTime=_this29.fable.log.getTimeStamp();_this29.fable.log.debug("==> ".concat(tmpOptions.method," completed data size ").concat(tmpDataBuffer.length,"b received in ").concat(_this29.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpCompletionTime),"ms"));}return fCallback(pError,pResponse,tmpDataBuffer);});});}},{key:"executeJSONRequest",value:function executeJSONRequest(pOptions,fCallback){var _this30=this;pOptions.json=true;var tmpOptions=this.preRequest(pOptions);if(!tmpOptions.hasOwnProperty('headers')){tmpOptions.headers={};}/* Automated headers break some APIs
		if (!tmpOptions.headers.hasOwnProperty('Content-Type'))
		{
			tmpOptions.headers['Content-Type'] = 'application/json';
		}
		*/tmpOptions.RequestStartTime=this.fable.log.getTimeStamp();if(this.TraceLog){this.fable.log.debug("Beginning ".concat(tmpOptions.method," JSON request to ").concat(tmpOptions.url," at ").concat(tmpOptions.RequestStartTime));}return libSimpleGet(tmpOptions,function(pError,pResponse){if(pError){return fCallback(pError,pResponse);}if(_this30.TraceLog){var tmpConnectTime=_this30.fable.log.getTimeStamp();_this30.fable.log.debug("--> JSON ".concat(tmpOptions.method," connected in ").concat(_this30.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpConnectTime),"ms code ").concat(pResponse.statusCode));}var tmpJSONData='';pResponse.on('data',function(pChunk){if(_this30.TraceLog){var tmpChunkTime=_this30.fable.log.getTimeStamp();_this30.fable.log.debug("--> JSON ".concat(tmpOptions.method," data chunk size ").concat(pChunk.length,"b received in ").concat(_this30.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpChunkTime),"ms"));}tmpJSONData+=pChunk;});pResponse.on('end',function(){if(_this30.TraceLog){var tmpCompletionTime=_this30.fable.log.getTimeStamp();_this30.fable.log.debug("==> JSON ".concat(tmpOptions.method," completed - received in ").concat(_this30.dataFormat.formatTimeDelta(tmpOptions.RequestStartTime,tmpCompletionTime),"ms"));}return fCallback(pError,pResponse,JSON.parse(tmpJSONData));});});}},{key:"getJSON",value:function getJSON(pOptionsOrURL,fCallback){var tmpRequestOptions=_typeof(pOptionsOrURL)=='object'?pOptionsOrURL:{};if(typeof pOptionsOrURL=='string'){tmpRequestOptions.url=pOptionsOrURL;}tmpRequestOptions.method='GET';return this.executeJSONRequest(tmpRequestOptions,fCallback);}},{key:"putJSON",value:function putJSON(pOptions,fCallback){if(_typeof(pOptions.body)!='object'){return fCallback(new Error("PUT JSON Error Invalid options object"));}pOptions.method='PUT';return this.executeJSONRequest(pOptions,fCallback);}},{key:"postJSON",value:function postJSON(pOptions,fCallback){if(_typeof(pOptions.body)!='object'){return fCallback(new Error("POST JSON Error Invalid options object"));}pOptions.method='POST';return this.executeJSONRequest(pOptions,fCallback);}},{key:"patchJSON",value:function patchJSON(pOptions,fCallback){if(_typeof(pOptions.body)!='object'){return fCallback(new Error("PATCH JSON Error Invalid options object"));}pOptions.method='PATCH';return this.executeJSONRequest(pOptions,fCallback);}},{key:"headJSON",value:function headJSON(pOptions,fCallback){if(_typeof(pOptions.body)!='object'){return fCallback(new Error("HEAD JSON Error Invalid options object"));}pOptions.method='HEAD';return this.executeJSONRequest(pOptions,fCallback);}},{key:"delJSON",value:function delJSON(pOptions,fCallback){pOptions.method='DELETE';return this.executeJSONRequest(pOptions,fCallback);}},{key:"getRawText",value:function getRawText(pOptionsOrURL,fCallback){var tmpRequestOptions=_typeof(pOptionsOrURL)=='object'?pOptionsOrURL:{};if(typeof pOptionsOrURL=='string'){tmpRequestOptions.url=pOptionsOrURL;}tmpRequestOptions.method='GET';return this.executeChunkedRequest(tmpRequestOptions,fCallback);}}]);return FableServiceRestClient;}(libFableServiceBase);module.exports=FableServiceRestClient;}).call(this);}).call(this,require("buffer").Buffer);},{"buffer":20,"cookie":27,"fable-serviceproviderbase":44,"simple-get":112}],65:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var FableServiceTemplate=/*#__PURE__*/function(_libFableServiceBase8){_inherits(FableServiceTemplate,_libFableServiceBase8);var _super19=_createSuper(FableServiceTemplate);// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
//
// NOTE: This does not implement underscore escape expressions
// NOTE: This does not implement underscore magic browser variable assignment
//
// This is an implementation of that.
// TODO: Make this use precedent, add configuration, add debugging.
function FableServiceTemplate(pFable,pOptions,pServiceHash){var _this31;_classCallCheck2(this,FableServiceTemplate);_this31=_super19.call(this,pFable,pOptions,pServiceHash);_this31.serviceType='Template';// These are the exact regex's used in lodash/underscore
// TODO: Switch this to precedent
_this31.Matchers={Evaluate:/<%([\s\S]+?)%>/g,Interpolate:/<%=([\s\S]+?)%>/g,Escaper:/\\|'|\r|\n|\t|\u2028|\u2029/g,Unescaper:/\\(\\|'|r|n|t|u2028|u2029)/g,// This is how underscore does it, so we are keeping it for now.
GuaranteedNonMatch:/.^/};// This is a helper for the escaper and unescaper functions.
// Right now we are going to keep what underscore is doing, but, not forever.
_this31.templateEscapes={'\\':'\\',"'":"'",'r':'\r','\r':'r','n':'\n','\n':'n','t':'\t','\t':'t','u2028':"\u2028","\u2028":'u2028','u2029':"\u2029","\u2029":'u2029'};// This is defined as such to underscore that it is a dynamic programming
// function on this class.
_this31.renderFunction=false;_this31.templateString=false;return _this31;}_createClass2(FableServiceTemplate,[{key:"renderTemplate",value:function renderTemplate(pData){return this.renderFunction(pData);}},{key:"templateFunction",value:function templateFunction(pData){var fRenderTemplateBound=this.renderTemplate.bind(this);return fRenderTemplateBound;}},{key:"buildTemplateFunction",value:function buildTemplateFunction(pTemplateText,pData){var _this32=this;// For now this is being kept in a weird form ... this is to mimic the old
// underscore code until this is rewritten using precedent.
this.TemplateSource="__p+='"+pTemplateText.replace(this.Matchers.Escaper,function(pMatch){return"\\".concat(_this32.templateEscapes[pMatch]);}).replace(this.Matchers.Interpolate||this.Matchers.GuaranteedNonMatch,function(pMatch,pCode){return"'+\n(".concat(decodeURIComponent(pCode),")+\n'");}).replace(this.Matchers.Evaluate||this.Matchers.GuaranteedNonMatch,function(pMatch,pCode){return"';\n".concat(decodeURIComponent(pCode),"\n;__p+='");})+"';\n";this.TemplateSource="with(pTemplateDataObject||{}){\n".concat(this.TemplateSource,"}\n");this.TemplateSource="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n".concat(this.TemplateSource,"return __p;\n");this.renderFunction=new Function('pTemplateDataObject',this.TemplateSource);if(typeof pData!='undefined'){return this.renderFunction(pData);}// Provide the compiled function source as a convenience for build time
// precompilation.
this.TemplateSourceCompiled='function(obj){\n'+this.TemplateSource+'}';return this.templateFunction();}}]);return FableServiceTemplate;}(libFableServiceBase);module.exports=FableServiceTemplate;},{"fable-serviceproviderbase":44}],66:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');// TODO: These are still pretty big -- consider the smaller polyfills
var libAsyncWaterfall=require('async.waterfall');var libAsyncEachLimit=require('async.eachlimit');var libBigNumber=require('big.js');var FableServiceUtility=/*#__PURE__*/function(_libFableServiceBase9){_inherits(FableServiceUtility,_libFableServiceBase9);var _super20=_createSuper(FableServiceUtility);// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
//
// NOTE: This does not implement underscore escape expressions
// NOTE: This does not implement underscore magic browser variable assignment
//
// This is an implementation of that.
// TODO: Make this use precedent, add configuration, add debugging.
function FableServiceUtility(pFable,pOptions,pServiceHash){var _this33;_classCallCheck2(this,FableServiceUtility);_this33=_super20.call(this,pFable,pOptions,pServiceHash);_this33.templates={};// These two functions are used extensively throughout
_this33.waterfall=libAsyncWaterfall;_this33.eachLimit=libAsyncEachLimit;_this33.bigNumber=libBigNumber;return _this33;}// Underscore and lodash have a behavior, _.extend, which merges objects.
// Now that es6 gives us this, use the native thingy.
// Nevermind, the native thing is not stable enough across environments
// Basic shallow copy
_createClass2(FableServiceUtility,[{key:"extend",value:function extend(pDestinationObject){for(var i=0;i<(arguments.length<=1?0:arguments.length-1);i++){var tmpSourceObject=i+1<1||arguments.length<=i+1?undefined:arguments[i+1];if(_typeof(tmpSourceObject)==='object'){var tmpObjectProperties=Object.keys(tmpSourceObject);for(var k=0;k<tmpObjectProperties.length;k++){pDestinationObject[tmpObjectProperties[k]]=tmpSourceObject[tmpObjectProperties[k]];}}}return pDestinationObject;}// Underscore and lodash have a behavior, _.template, which compiles a
// string-based template with code snippets into simple executable pieces,
// with the added twist of returning a precompiled function ready to go.
},{key:"template",value:function template(pTemplateText,pData){var tmpTemplate=this.fable.instantiateServiceProviderWithoutRegistration('Template');return tmpTemplate.buildTemplateFunction(pTemplateText,pData);}// Build a template function from a template hash, and, register it with the service provider
},{key:"buildHashedTemplate",value:function buildHashedTemplate(pTemplateHash,pTemplateText,pData){var tmpTemplate=this.fable.instantiateServiceProvider('Template',{},pTemplateHash);this.templates[pTemplateHash]=tmpTemplate.buildTemplateFunction(pTemplateText,pData);return this.templates[pTemplateHash];}// This is a safe, modern version of chunk from underscore
// Algorithm pulled from a mix of these two polyfills:
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
// https://youmightnotneed.com/lodash
// This implementation was most tolerant in browsers.  Uglify can fix the rest.
},{key:"chunk",value:function chunk(pInput,pChunkSize,pChunkCache){var tmpInputArray=_toConsumableArray(pInput);// Note lodash defaults to 1, underscore defaults to 0
var tmpChunkSize=typeof pChunkSize=='number'?pChunkSize:0;var tmpChunkCache=typeof pChunkCache!='undefined'?pChunkCache:[];if(tmpChunkSize<=0){return tmpChunkCache;}while(tmpInputArray.length){tmpChunkCache.push(tmpInputArray.splice(0,tmpChunkSize));}return tmpChunkCache;}// Convert an ISO string to a javascript date object
// Adapted from https://stackoverflow.com/a/54751179
//
// Takes strings like: 2022-11-04T11:34:45.000Z
//                and: 1986-06-11T09:34:46.012Z+0200
// ... and converts them into javascript timestamps, following the directions of the timezone stuff.
//
// This is not meant to replace the more complex libraries such as moment or luxon.
// This *is* meant to be a simple, small, and fast way to convert ISO strings to dates in engines
// with ultra limited JS capabilities where those don't work.
},{key:"isoStringToDate",value:function isoStringToDate(pISOString){// Split the string into an array based on the digit groups.
var tmpDateParts=pISOString.split(/\D+/);// Set up a date object with the current time.
var tmpReturnDate=new Date();// Track the number of hours we need to adjust the date by based on the timezone.
var tmpTimeZoneOffsetInHours=0;// Track the number of minutes we need to adjust the date by based on the timezone.
var tmpTimeZoneOffsetInMinutes=0;// This fixes an inconsistency with constructing the date programmatically.
tmpReturnDate.setUTCDate(1);tmpReturnDate.setUTCMonth(1);tmpReturnDate.setUTCHours(0);tmpReturnDate.setUTCMinutes(0);tmpReturnDate.setUTCSeconds(0);tmpReturnDate.setUTCMilliseconds(0);// Manually parse the parts of the string and set each part for the
// date. Note: Using the UTC versions of these functions is necessary
// because we're manually adjusting for time zones stored in the
// string.
tmpReturnDate.setUTCFullYear(parseInt(tmpDateParts[0]));// The month numbers are one "off" from what normal humans would expect
// because January == 0.
tmpReturnDate.setUTCMonth(parseInt(tmpDateParts[1])-1);tmpReturnDate.setUTCDate(parseInt(tmpDateParts[2]));// Set the time parts of the date object.
tmpReturnDate.setUTCHours(parseInt(tmpDateParts[3]));tmpReturnDate.setUTCMinutes(parseInt(tmpDateParts[4]));tmpReturnDate.setUTCSeconds(parseInt(tmpDateParts[5]));tmpReturnDate.setUTCMilliseconds(parseInt(tmpDateParts[6]));// If there's a value for either the hours or minutes offset.
if(tmpDateParts[7]||tmpDateParts[8]){// If there's a value for the minutes offset.
if(tmpDateParts[8]){// Convert the minutes value into an hours value.
tmpTimeZoneOffsetInMinutes=parseInt(tmpDateParts[8])/60;}// Add the hours and minutes values to get the total offset in hours.
tmpTimeZoneOffsetInHours=parseInt(tmpDateParts[7])+tmpTimeZoneOffsetInMinutes;// If the sign for the timezone is a plus to indicate the timezone is ahead of UTC time.
if(pISOString.substr(-6,1)=="+"){// Make the offset negative since the hours will need to be subtracted from the date.
tmpTimeZoneOffsetInHours*=-1;}}// Get the current hours for the date and add the offset to get the correct time adjusted for timezone.
tmpReturnDate.setHours(tmpReturnDate.getHours()+tmpTimeZoneOffsetInHours);// Return the Date object calculated from the string.
return tmpReturnDate;}}]);return FableServiceUtility;}(libFableServiceBase);module.exports=FableServiceUtility;},{"async.eachlimit":1,"async.waterfall":15,"big.js":17,"fable-serviceproviderbase":44}],67:[function(require,module,exports){'use strict';/* eslint no-invalid-this: 1 */var ERROR_MESSAGE='Function.prototype.bind called on incompatible ';var toStr=Object.prototype.toString;var max=Math.max;var funcType='[object Function]';var concatty=function concatty(a,b){var arr=[];for(var i=0;i<a.length;i+=1){arr[i]=a[i];}for(var j=0;j<b.length;j+=1){arr[j+a.length]=b[j];}return arr;};var slicy=function slicy(arrLike,offset){var arr=[];for(var i=offset||0,j=0;i<arrLike.length;i+=1,j+=1){arr[j]=arrLike[i];}return arr;};var joiny=function joiny(arr,joiner){var str='';for(var i=0;i<arr.length;i+=1){str+=arr[i];if(i+1<arr.length){str+=joiner;}}return str;};module.exports=function bind(that){var target=this;if(typeof target!=='function'||toStr.apply(target)!==funcType){throw new TypeError(ERROR_MESSAGE+target);}var args=slicy(arguments,1);var bound;var binder=function binder(){if(this instanceof bound){var result=target.apply(this,concatty(args,arguments));if(Object(result)===result){return result;}return this;}return target.apply(that,concatty(args,arguments));};var boundLength=max(0,target.length-args.length);var boundArgs=[];for(var i=0;i<boundLength;i++){boundArgs[i]='$'+i;}bound=Function('binder','return function ('+joiny(boundArgs,',')+'){ return binder.apply(this,arguments); }')(binder);if(target.prototype){var Empty=function Empty(){};Empty.prototype=target.prototype;bound.prototype=new Empty();Empty.prototype=null;}return bound;};},{}],68:[function(require,module,exports){'use strict';var implementation=require('./implementation');module.exports=Function.prototype.bind||implementation;},{"./implementation":67}],69:[function(require,module,exports){'use strict';var undefined;var $SyntaxError=SyntaxError;var $Function=Function;var $TypeError=TypeError;// eslint-disable-next-line consistent-return
var getEvalledConstructor=function getEvalledConstructor(expressionSyntax){try{return $Function('"use strict"; return ('+expressionSyntax+').constructor;')();}catch(e){}};var $gOPD=Object.getOwnPropertyDescriptor;if($gOPD){try{$gOPD({},'');}catch(e){$gOPD=null;// this is IE 8, which has a broken gOPD
}}var throwTypeError=function throwTypeError(){throw new $TypeError();};var ThrowTypeError=$gOPD?function(){try{// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
arguments.callee;// IE 8 does not throw here
return throwTypeError;}catch(calleeThrows){try{// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
return $gOPD(arguments,'callee').get;}catch(gOPDthrows){return throwTypeError;}}}():throwTypeError;var hasSymbols=require('has-symbols')();var hasProto=require('has-proto')();var getProto=Object.getPrototypeOf||(hasProto?function(x){return x.__proto__;}// eslint-disable-line no-proto
:null);var needsEval={};var TypedArray=typeof Uint8Array==='undefined'||!getProto?undefined:getProto(Uint8Array);var INTRINSICS={'%AggregateError%':typeof AggregateError==='undefined'?undefined:AggregateError,'%Array%':Array,'%ArrayBuffer%':typeof ArrayBuffer==='undefined'?undefined:ArrayBuffer,'%ArrayIteratorPrototype%':hasSymbols&&getProto?getProto([][Symbol.iterator]()):undefined,'%AsyncFromSyncIteratorPrototype%':undefined,'%AsyncFunction%':needsEval,'%AsyncGenerator%':needsEval,'%AsyncGeneratorFunction%':needsEval,'%AsyncIteratorPrototype%':needsEval,'%Atomics%':typeof Atomics==='undefined'?undefined:Atomics,'%BigInt%':typeof BigInt==='undefined'?undefined:BigInt,'%BigInt64Array%':typeof BigInt64Array==='undefined'?undefined:BigInt64Array,'%BigUint64Array%':typeof BigUint64Array==='undefined'?undefined:BigUint64Array,'%Boolean%':Boolean,'%DataView%':typeof DataView==='undefined'?undefined:DataView,'%Date%':Date,'%decodeURI%':decodeURI,'%decodeURIComponent%':decodeURIComponent,'%encodeURI%':encodeURI,'%encodeURIComponent%':encodeURIComponent,'%Error%':Error,'%eval%':eval,// eslint-disable-line no-eval
'%EvalError%':EvalError,'%Float32Array%':typeof Float32Array==='undefined'?undefined:Float32Array,'%Float64Array%':typeof Float64Array==='undefined'?undefined:Float64Array,'%FinalizationRegistry%':typeof FinalizationRegistry==='undefined'?undefined:FinalizationRegistry,'%Function%':$Function,'%GeneratorFunction%':needsEval,'%Int8Array%':typeof Int8Array==='undefined'?undefined:Int8Array,'%Int16Array%':typeof Int16Array==='undefined'?undefined:Int16Array,'%Int32Array%':typeof Int32Array==='undefined'?undefined:Int32Array,'%isFinite%':isFinite,'%isNaN%':isNaN,'%IteratorPrototype%':hasSymbols&&getProto?getProto(getProto([][Symbol.iterator]())):undefined,'%JSON%':(typeof JSON==="undefined"?"undefined":_typeof(JSON))==='object'?JSON:undefined,'%Map%':typeof Map==='undefined'?undefined:Map,'%MapIteratorPrototype%':typeof Map==='undefined'||!hasSymbols||!getProto?undefined:getProto(new Map()[Symbol.iterator]()),'%Math%':Math,'%Number%':Number,'%Object%':Object,'%parseFloat%':parseFloat,'%parseInt%':parseInt,'%Promise%':typeof Promise==='undefined'?undefined:Promise,'%Proxy%':typeof Proxy==='undefined'?undefined:Proxy,'%RangeError%':RangeError,'%ReferenceError%':ReferenceError,'%Reflect%':typeof Reflect==='undefined'?undefined:Reflect,'%RegExp%':RegExp,'%Set%':typeof Set==='undefined'?undefined:Set,'%SetIteratorPrototype%':typeof Set==='undefined'||!hasSymbols||!getProto?undefined:getProto(new Set()[Symbol.iterator]()),'%SharedArrayBuffer%':typeof SharedArrayBuffer==='undefined'?undefined:SharedArrayBuffer,'%String%':String,'%StringIteratorPrototype%':hasSymbols&&getProto?getProto(''[Symbol.iterator]()):undefined,'%Symbol%':hasSymbols?Symbol:undefined,'%SyntaxError%':$SyntaxError,'%ThrowTypeError%':ThrowTypeError,'%TypedArray%':TypedArray,'%TypeError%':$TypeError,'%Uint8Array%':typeof Uint8Array==='undefined'?undefined:Uint8Array,'%Uint8ClampedArray%':typeof Uint8ClampedArray==='undefined'?undefined:Uint8ClampedArray,'%Uint16Array%':typeof Uint16Array==='undefined'?undefined:Uint16Array,'%Uint32Array%':typeof Uint32Array==='undefined'?undefined:Uint32Array,'%URIError%':URIError,'%WeakMap%':typeof WeakMap==='undefined'?undefined:WeakMap,'%WeakRef%':typeof WeakRef==='undefined'?undefined:WeakRef,'%WeakSet%':typeof WeakSet==='undefined'?undefined:WeakSet};if(getProto){try{null.error;// eslint-disable-line no-unused-expressions
}catch(e){// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
var errorProto=getProto(getProto(e));INTRINSICS['%Error.prototype%']=errorProto;}}var doEval=function doEval(name){var value;if(name==='%AsyncFunction%'){value=getEvalledConstructor('async function () {}');}else if(name==='%GeneratorFunction%'){value=getEvalledConstructor('function* () {}');}else if(name==='%AsyncGeneratorFunction%'){value=getEvalledConstructor('async function* () {}');}else if(name==='%AsyncGenerator%'){var fn=doEval('%AsyncGeneratorFunction%');if(fn){value=fn.prototype;}}else if(name==='%AsyncIteratorPrototype%'){var gen=doEval('%AsyncGenerator%');if(gen&&getProto){value=getProto(gen.prototype);}}INTRINSICS[name]=value;return value;};var LEGACY_ALIASES={'%ArrayBufferPrototype%':['ArrayBuffer','prototype'],'%ArrayPrototype%':['Array','prototype'],'%ArrayProto_entries%':['Array','prototype','entries'],'%ArrayProto_forEach%':['Array','prototype','forEach'],'%ArrayProto_keys%':['Array','prototype','keys'],'%ArrayProto_values%':['Array','prototype','values'],'%AsyncFunctionPrototype%':['AsyncFunction','prototype'],'%AsyncGenerator%':['AsyncGeneratorFunction','prototype'],'%AsyncGeneratorPrototype%':['AsyncGeneratorFunction','prototype','prototype'],'%BooleanPrototype%':['Boolean','prototype'],'%DataViewPrototype%':['DataView','prototype'],'%DatePrototype%':['Date','prototype'],'%ErrorPrototype%':['Error','prototype'],'%EvalErrorPrototype%':['EvalError','prototype'],'%Float32ArrayPrototype%':['Float32Array','prototype'],'%Float64ArrayPrototype%':['Float64Array','prototype'],'%FunctionPrototype%':['Function','prototype'],'%Generator%':['GeneratorFunction','prototype'],'%GeneratorPrototype%':['GeneratorFunction','prototype','prototype'],'%Int8ArrayPrototype%':['Int8Array','prototype'],'%Int16ArrayPrototype%':['Int16Array','prototype'],'%Int32ArrayPrototype%':['Int32Array','prototype'],'%JSONParse%':['JSON','parse'],'%JSONStringify%':['JSON','stringify'],'%MapPrototype%':['Map','prototype'],'%NumberPrototype%':['Number','prototype'],'%ObjectPrototype%':['Object','prototype'],'%ObjProto_toString%':['Object','prototype','toString'],'%ObjProto_valueOf%':['Object','prototype','valueOf'],'%PromisePrototype%':['Promise','prototype'],'%PromiseProto_then%':['Promise','prototype','then'],'%Promise_all%':['Promise','all'],'%Promise_reject%':['Promise','reject'],'%Promise_resolve%':['Promise','resolve'],'%RangeErrorPrototype%':['RangeError','prototype'],'%ReferenceErrorPrototype%':['ReferenceError','prototype'],'%RegExpPrototype%':['RegExp','prototype'],'%SetPrototype%':['Set','prototype'],'%SharedArrayBufferPrototype%':['SharedArrayBuffer','prototype'],'%StringPrototype%':['String','prototype'],'%SymbolPrototype%':['Symbol','prototype'],'%SyntaxErrorPrototype%':['SyntaxError','prototype'],'%TypedArrayPrototype%':['TypedArray','prototype'],'%TypeErrorPrototype%':['TypeError','prototype'],'%Uint8ArrayPrototype%':['Uint8Array','prototype'],'%Uint8ClampedArrayPrototype%':['Uint8ClampedArray','prototype'],'%Uint16ArrayPrototype%':['Uint16Array','prototype'],'%Uint32ArrayPrototype%':['Uint32Array','prototype'],'%URIErrorPrototype%':['URIError','prototype'],'%WeakMapPrototype%':['WeakMap','prototype'],'%WeakSetPrototype%':['WeakSet','prototype']};var bind=require('function-bind');var hasOwn=require('hasown');var $concat=bind.call(Function.call,Array.prototype.concat);var $spliceApply=bind.call(Function.apply,Array.prototype.splice);var $replace=bind.call(Function.call,String.prototype.replace);var $strSlice=bind.call(Function.call,String.prototype.slice);var $exec=bind.call(Function.call,RegExp.prototype.exec);/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */var rePropName=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;var reEscapeChar=/\\(\\)?/g;/** Used to match backslashes in property paths. */var stringToPath=function stringToPath(string){var first=$strSlice(string,0,1);var last=$strSlice(string,-1);if(first==='%'&&last!=='%'){throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');}else if(last==='%'&&first!=='%'){throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');}var result=[];$replace(string,rePropName,function(match,number,quote,subString){result[result.length]=quote?$replace(subString,reEscapeChar,'$1'):number||match;});return result;};/* end adaptation */var getBaseIntrinsic=function getBaseIntrinsic(name,allowMissing){var intrinsicName=name;var alias;if(hasOwn(LEGACY_ALIASES,intrinsicName)){alias=LEGACY_ALIASES[intrinsicName];intrinsicName='%'+alias[0]+'%';}if(hasOwn(INTRINSICS,intrinsicName)){var value=INTRINSICS[intrinsicName];if(value===needsEval){value=doEval(intrinsicName);}if(typeof value==='undefined'&&!allowMissing){throw new $TypeError('intrinsic '+name+' exists, but is not available. Please file an issue!');}return{alias:alias,name:intrinsicName,value:value};}throw new $SyntaxError('intrinsic '+name+' does not exist!');};module.exports=function GetIntrinsic(name,allowMissing){if(typeof name!=='string'||name.length===0){throw new $TypeError('intrinsic name must be a non-empty string');}if(arguments.length>1&&typeof allowMissing!=='boolean'){throw new $TypeError('"allowMissing" argument must be a boolean');}if($exec(/^%?[^%]*%?$/,name)===null){throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');}var parts=stringToPath(name);var intrinsicBaseName=parts.length>0?parts[0]:'';var intrinsic=getBaseIntrinsic('%'+intrinsicBaseName+'%',allowMissing);var intrinsicRealName=intrinsic.name;var value=intrinsic.value;var skipFurtherCaching=false;var alias=intrinsic.alias;if(alias){intrinsicBaseName=alias[0];$spliceApply(parts,$concat([0,1],alias));}for(var i=1,isOwn=true;i<parts.length;i+=1){var part=parts[i];var first=$strSlice(part,0,1);var last=$strSlice(part,-1);if((first==='"'||first==="'"||first==='`'||last==='"'||last==="'"||last==='`')&&first!==last){throw new $SyntaxError('property names with quotes must have matching quotes');}if(part==='constructor'||!isOwn){skipFurtherCaching=true;}intrinsicBaseName+='.'+part;intrinsicRealName='%'+intrinsicBaseName+'%';if(hasOwn(INTRINSICS,intrinsicRealName)){value=INTRINSICS[intrinsicRealName];}else if(value!=null){if(!(part in value)){if(!allowMissing){throw new $TypeError('base intrinsic for '+name+' exists, but the property is not available.');}return void undefined;}if($gOPD&&i+1>=parts.length){var desc=$gOPD(value,part);isOwn=!!desc;// By convention, when a data property is converted to an accessor
// property to emulate a data property that does not suffer from
// the override mistake, that accessor's getter is marked with
// an `originalValue` property. Here, when we detect this, we
// uphold the illusion by pretending to see that original data
// property, i.e., returning the value rather than the getter
// itself.
if(isOwn&&'get'in desc&&!('originalValue'in desc.get)){value=desc.get;}else{value=value[part];}}else{isOwn=hasOwn(value,part);value=value[part];}if(isOwn&&!skipFurtherCaching){INTRINSICS[intrinsicRealName]=value;}}}return value;};},{"function-bind":68,"has-proto":72,"has-symbols":73,"hasown":75}],70:[function(require,module,exports){'use strict';var GetIntrinsic=require('get-intrinsic');var $gOPD=GetIntrinsic('%Object.getOwnPropertyDescriptor%',true);if($gOPD){try{$gOPD([],'length');}catch(e){// IE 8 has a broken gOPD
$gOPD=null;}}module.exports=$gOPD;},{"get-intrinsic":69}],71:[function(require,module,exports){'use strict';var GetIntrinsic=require('get-intrinsic');var $defineProperty=GetIntrinsic('%Object.defineProperty%',true);var hasPropertyDescriptors=function hasPropertyDescriptors(){if($defineProperty){try{$defineProperty({},'a',{value:1});return true;}catch(e){// IE 8 has a broken defineProperty
return false;}}return false;};hasPropertyDescriptors.hasArrayLengthDefineBug=function hasArrayLengthDefineBug(){// node v0.6 has a bug where array lengths can be Set but not Defined
if(!hasPropertyDescriptors()){return null;}try{return $defineProperty([],'length',{value:1}).length!==1;}catch(e){// In Firefox 4-22, defining length on an array throws an exception.
return true;}};module.exports=hasPropertyDescriptors;},{"get-intrinsic":69}],72:[function(require,module,exports){'use strict';var test={foo:{}};var $Object=Object;module.exports=function hasProto(){return{__proto__:test}.foo===test.foo&&!({__proto__:null}instanceof $Object);};},{}],73:[function(require,module,exports){'use strict';var origSymbol=typeof Symbol!=='undefined'&&Symbol;var hasSymbolSham=require('./shams');module.exports=function hasNativeSymbols(){if(typeof origSymbol!=='function'){return false;}if(typeof Symbol!=='function'){return false;}if(_typeof(origSymbol('foo'))!=='symbol'){return false;}if(_typeof(Symbol('bar'))!=='symbol'){return false;}return hasSymbolSham();};},{"./shams":74}],74:[function(require,module,exports){'use strict';/* eslint complexity: [2, 18], max-statements: [2, 33] */module.exports=function hasSymbols(){if(typeof Symbol!=='function'||typeof Object.getOwnPropertySymbols!=='function'){return false;}if(_typeof(Symbol.iterator)==='symbol'){return true;}var obj={};var sym=Symbol('test');var symObj=Object(sym);if(typeof sym==='string'){return false;}if(Object.prototype.toString.call(sym)!=='[object Symbol]'){return false;}if(Object.prototype.toString.call(symObj)!=='[object Symbol]'){return false;}// temp disabled per https://github.com/ljharb/object.assign/issues/17
// if (sym instanceof Symbol) { return false; }
// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
// if (!(symObj instanceof Symbol)) { return false; }
// if (typeof Symbol.prototype.toString !== 'function') { return false; }
// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
var symVal=42;obj[sym]=symVal;for(sym in obj){return false;}// eslint-disable-line no-restricted-syntax, no-unreachable-loop
if(typeof Object.keys==='function'&&Object.keys(obj).length!==0){return false;}if(typeof Object.getOwnPropertyNames==='function'&&Object.getOwnPropertyNames(obj).length!==0){return false;}var syms=Object.getOwnPropertySymbols(obj);if(syms.length!==1||syms[0]!==sym){return false;}if(!Object.prototype.propertyIsEnumerable.call(obj,sym)){return false;}if(typeof Object.getOwnPropertyDescriptor==='function'){var descriptor=Object.getOwnPropertyDescriptor(obj,sym);if(descriptor.value!==symVal||descriptor.enumerable!==true){return false;}}return true;};},{}],75:[function(require,module,exports){'use strict';var call=Function.prototype.call;var $hasOwn=Object.prototype.hasOwnProperty;var bind=require('function-bind');/** @type {(o: {}, p: PropertyKey) => p is keyof o} */module.exports=bind.call(call,$hasOwn);},{"function-bind":68}],76:[function(require,module,exports){var http=require('http');var url=require('url');var https=module.exports;for(var key in http){if(http.hasOwnProperty(key))https[key]=http[key];}https.request=function(params,cb){params=validateParams(params);return http.request.call(this,params,cb);};https.get=function(params,cb){params=validateParams(params);return http.get.call(this,params,cb);};function validateParams(params){if(typeof params==='string'){params=url.parse(params);}if(!params.protocol){params.protocol='https:';}if(params.protocol!=='https:'){throw new Error('Protocol "'+params.protocol+'" not supported. Expected "https:"');}return params;}},{"http":113,"url":134}],77:[function(require,module,exports){/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */exports.read=function(buffer,offset,isLE,mLen,nBytes){var e,m;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var nBits=-7;var i=isLE?nBytes-1:0;var d=isLE?-1:1;var s=buffer[offset+i];i+=d;e=s&(1<<-nBits)-1;s>>=-nBits;nBits+=eLen;for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}m=e&(1<<-nBits)-1;e>>=-nBits;nBits+=mLen;for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}if(e===0){e=1-eBias;}else if(e===eMax){return m?NaN:(s?-1:1)*Infinity;}else{m=m+Math.pow(2,mLen);e=e-eBias;}return(s?-1:1)*m*Math.pow(2,e-mLen);};exports.write=function(buffer,value,offset,isLE,mLen,nBytes){var e,m,c;var eLen=nBytes*8-mLen-1;var eMax=(1<<eLen)-1;var eBias=eMax>>1;var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;var i=isLE?0:nBytes-1;var d=isLE?1:-1;var s=value<0||value===0&&1/value<0?1:0;value=Math.abs(value);if(isNaN(value)||value===Infinity){m=isNaN(value)?1:0;e=eMax;}else{e=Math.floor(Math.log(value)/Math.LN2);if(value*(c=Math.pow(2,-e))<1){e--;c*=2;}if(e+eBias>=1){value+=rt/c;}else{value+=rt*Math.pow(2,1-eBias);}if(value*c>=2){e++;c/=2;}if(e+eBias>=eMax){m=0;e=eMax;}else if(e+eBias>=1){m=(value*c-1)*Math.pow(2,mLen);e=e+eBias;}else{m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);e=0;}}for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}e=e<<mLen|m;eLen+=mLen;for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}buffer[offset+i-d]|=s*128;};},{}],78:[function(require,module,exports){if(typeof Object.create==='function'){// implementation from standard node.js 'util' module
module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;ctor.prototype=Object.create(superCtor.prototype,{constructor:{value:ctor,enumerable:false,writable:true,configurable:true}});}};}else{// old school shim for old browsers
module.exports=function inherits(ctor,superCtor){if(superCtor){ctor.super_=superCtor;var TempCtor=function TempCtor(){};TempCtor.prototype=superCtor.prototype;ctor.prototype=new TempCtor();ctor.prototype.constructor=ctor;}};}},{}],79:[function(require,module,exports){// When a boxed property is passed in, it should have quotes of some
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
var cleanWrapCharacters=function cleanWrapCharacters(pCharacter,pString){if(pString.startsWith(pCharacter)&&pString.endsWith(pCharacter)){return pString.substring(1,pString.length-1);}else{return pString;}};module.exports=cleanWrapCharacters;},{}],80:[function(require,module,exports){/**
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
*/var ManyfestHashTranslation=/*#__PURE__*/function(){function ManyfestHashTranslation(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestHashTranslation);// Wire in logging
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;this.translationTable={};}_createClass2(ManyfestHashTranslation,[{key:"translationCount",value:function translationCount(){return Object.keys(this.translationTable).length;}},{key:"addTranslation",value:function addTranslation(pTranslation){var _this34=this;// This adds a translation in the form of:
// { "SourceHash": "DestinationHash", "SecondSourceHash":"SecondDestinationHash" }
if(_typeof(pTranslation)!='object'){this.logError("Hash translation addTranslation expected a translation be type object but was passed in ".concat(_typeof(pTranslation)));return false;}var tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(function(pTranslationSource){if(typeof pTranslation[pTranslationSource]!='string'){_this34.logError("Hash translation addTranslation expected a translation destination hash for [".concat(pTranslationSource,"] to be a string but the referrant was a ").concat(_typeof(pTranslation[pTranslationSource])));}else{_this34.translationTable[pTranslationSource]=pTranslation[pTranslationSource];}});}},{key:"removeTranslationHash",value:function removeTranslationHash(pTranslationHash){if(this.translationTable.hasOwnProperty(pTranslationHash)){delete this.translationTable[pTranslationHash];}}// This removes translations.
// If passed a string, just removes the single one.
// If passed an object, it does all the source keys.
},{key:"removeTranslation",value:function removeTranslation(pTranslation){var _this35=this;if(typeof pTranslation=='string'){this.removeTranslationHash(pTranslation);return true;}else if(_typeof(pTranslation)=='object'){var tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(function(pTranslationSource){_this35.removeTranslation(pTranslationSource);});return true;}else{this.logError("Hash translation removeTranslation expected either a string or an object but the passed-in translation was type ".concat(_typeof(pTranslation)));return false;}}},{key:"clearTranslations",value:function clearTranslations(){this.translationTable={};}},{key:"translate",value:function translate(pTranslation){if(this.translationTable.hasOwnProperty(pTranslation)){return this.translationTable[pTranslation];}else{return pTranslation;}}}]);return ManyfestHashTranslation;}();module.exports=ManyfestHashTranslation;},{"./Manyfest-LogToConsole.js":81}],81:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/ /**
* Manyfest simple logging shim (for browser and dependency-free running)
*/var logToConsole=function logToConsole(pLogLine,pLogObject){var tmpLogLine=typeof pLogLine==='string'?pLogLine:'';console.log("[Manyfest] ".concat(tmpLogLine));if(pLogObject)console.log(JSON.stringify(pLogObject));};module.exports=logToConsole;},{}],82:[function(require,module,exports){/**
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
*/var ManyfestObjectAddressResolverCheckAddressExists=/*#__PURE__*/function(){function ManyfestObjectAddressResolverCheckAddressExists(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestObjectAddressResolverCheckAddressExists);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;}// Check if an address exists.
//
// This is necessary because the getValueAtAddress function is ambiguous on
// whether the element/property is actually there or not (it returns
// undefined whether the property exists or not).  This function checks for
// existance and returns true or false dependent.
_createClass2(ManyfestObjectAddressResolverCheckAddressExists,[{key:"checkAddressExists",value:function checkAddressExists(pObject,pAddress){// TODO: Should these throw an error?
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
pObject[tmpSubObjectName]={};return this.checkAddressExists(pObject[tmpSubObjectName],tmpNewAddress);}}}}]);return ManyfestObjectAddressResolverCheckAddressExists;}();;module.exports=ManyfestObjectAddressResolverCheckAddressExists;},{"./Manyfest-LogToConsole.js":81}],83:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');var fParseConditionals=require("../source/Manyfest-ParseConditionals.js");/**
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
*/var ManyfestObjectAddressResolverDeleteValue=/*#__PURE__*/function(){function ManyfestObjectAddressResolverDeleteValue(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestObjectAddressResolverDeleteValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.cleanWrapCharacters=fCleanWrapCharacters;}// TODO: Dry me
_createClass2(ManyfestObjectAddressResolverDeleteValue,[{key:"checkFilters",value:function checkFilters(pAddress,pRecord){return fParseConditionals(this,pAddress,pRecord);}// Delete the value of an element at an address
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
var tmpContainerObject={};for(var _i4=0;_i4<tmpArrayProperty.length;_i4++){var tmpPropertyParentAddress="".concat(tmpParentAddress,"[").concat(_i4,"]");var tmpValue=this.deleteValueAtAddress(pObject[_tmpBoxedPropertyName4][_i4],tmpNewAddress,tmpPropertyParentAddress);tmpContainerObject["".concat(tmpPropertyParentAddress,".").concat(tmpNewAddress)]=tmpValue;}return tmpContainerObject;}// OBJECT SET
// Note this will not work with a bracket in the same address box set
var _tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');if(_tmpObjectTypeMarkerIndex>0){var _tmpObjectPropertyName=pAddress.substring(0,_tmpObjectTypeMarkerIndex).trim();if(_typeof(pObject[_tmpObjectPropertyName])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the Object and grab the addresses from there.
var tmpObjectProperty=pObject[_tmpObjectPropertyName];var tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpObjectPropertyName);// The container object is where we have the "Address":SOMEVALUE pairs
var _tmpContainerObject={};for(var _i5=0;_i5<tmpObjectPropertyKeys.length;_i5++){var _tmpPropertyParentAddress="".concat(tmpParentAddress,".").concat(tmpObjectPropertyKeys[_i5]);var _tmpValue=this.deleteValueAtAddress(pObject[_tmpObjectPropertyName][tmpObjectPropertyKeys[_i5]],tmpNewAddress,_tmpPropertyParentAddress);// The filtering is complex but allows config-based metaprogramming directly from schema
var _tmpKeepRecord=this.checkFilters(pAddress,_tmpValue);if(_tmpKeepRecord){_tmpContainerObject["".concat(_tmpPropertyParentAddress,".").concat(tmpNewAddress)]=_tmpValue;}}return _tmpContainerObject;}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}else{// Create a subobject and then pass that
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);pObject[tmpSubObjectName]={};return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}}}}]);return ManyfestObjectAddressResolverDeleteValue;}();;module.exports=ManyfestObjectAddressResolverDeleteValue;},{"../source/Manyfest-ParseConditionals.js":87,"./Manyfest-CleanWrapCharacters.js":79,"./Manyfest-LogToConsole.js":81}],84:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');var fParseConditionals=require("../source/Manyfest-ParseConditionals.js");/**
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
*/var ManyfestObjectAddressResolverGetValue=/*#__PURE__*/function(){function ManyfestObjectAddressResolverGetValue(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestObjectAddressResolverGetValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.cleanWrapCharacters=fCleanWrapCharacters;}_createClass2(ManyfestObjectAddressResolverGetValue,[{key:"checkFilters",value:function checkFilters(pAddress,pRecord){return fParseConditionals(this,pAddress,pRecord);}// Get the value of an element at an address
},{key:"getValueAtAddress",value:function getValueAtAddress(pObject,pAddress,pParentAddress,pRootObject){// Make sure pObject (the object we are meant to be recursing) is an object (which could be an array or object)
if(_typeof(pObject)!='object')return undefined;// Make sure pAddress (the address we are resolving) is a string
if(typeof pAddress!='string')return undefined;// Stash the parent address for later resolution
var tmpParentAddress="";if(typeof pParentAddress=='string'){tmpParentAddress=pParentAddress;}// Set the root object to the passed-in object if it isn't set yet.  This is expected to be the root object.
var tmpRootObject=typeof pRootObject=='undefined'?pObject:pRootObject;// TODO: Make this work for things like SomeRootObject.Metadata["Some.People.Use.Bad.Object.Property.Names"]
var tmpSeparatorIndex=pAddress.indexOf('.');// Adding simple back-navigation in objects
if(tmpSeparatorIndex==0){// Given an address of "Bundle.Contract.IDContract...Project.IDProject" the ... would be interpreted as two back-navigations from IDContract.
// When the address is passed in, though, the first . is already eliminated.  So we can count the dots.
var tmpParentAddressParts=tmpParentAddress.split('.');var tmpBackNavigationCount=0;// Count the number of dots
for(var i=0;i<pAddress.length;i++){if(pAddress.charAt(i)!='.'){break;}tmpBackNavigationCount++;}var tmpParentAddressLength=tmpParentAddressParts.length-tmpBackNavigationCount;if(tmpParentAddressLength<0){// We are trying to back navigate more than we can.
// TODO: Should this be undefined or should we bank out at the bottom and try to go forward?
// This seems safest for now.
return undefined;}else{// We are trying to back navigate to a parent object.
// Recurse with the back-propagated parent address, and, the new address without the back-navigation dots.
var tmpRecurseAddress=pAddress.slice(tmpBackNavigationCount);if(tmpParentAddressLength>0){tmpRecurseAddress="".concat(tmpParentAddressParts.slice(0,tmpParentAddressLength).join('.'),".").concat(tmpRecurseAddress);}this.logInfo("Back-navigation detected.  Recursing back to address [".concat(tmpRecurseAddress,"]"));return this.getValueAtAddress(tmpRootObject,tmpRecurseAddress);}}// This is the terminal address string (no more dots so the RECUSION ENDS IN HERE somehow)
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
return false;}var tmpInputArray=pObject[_tmpBoxedPropertyName5];var tmpOutputArray=[];for(var _i6=0;_i6<tmpInputArray.length;_i6++){// The filtering is complex but allows config-based metaprogramming directly from schema
var tmpKeepRecord=this.checkFilters(pAddress,tmpInputArray[_i6]);if(tmpKeepRecord){tmpOutputArray.push(tmpInputArray[_i6]);}}return tmpOutputArray;}// The object has been flagged as an object set, so treat it as such
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
return this.getValueAtAddress(pObject[_tmpBoxedPropertyName6][_tmpBoxedPropertyReference3],tmpNewAddress,tmpParentAddress,tmpRootObject);}else{// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);// We parsed a valid number out of the boxed property name, so recurse into the array
return this.getValueAtAddress(pObject[_tmpBoxedPropertyName6][_tmpBoxedPropertyNumber3],tmpNewAddress,tmpParentAddress,tmpRootObject);}}// The requirements to detect a boxed set element are:
//    1) The start bracket is after character 0
else if(_tmpBracketStartIndex3>0//    2) The end bracket is after the start bracket
&&_tmpBracketStopIndex3>_tmpBracketStartIndex3//    3) There is nothing in the brackets
&&_tmpBracketStopIndex3-_tmpBracketStartIndex3==1){var _tmpBoxedPropertyName7=pAddress.substring(0,_tmpBracketStartIndex3).trim();if(!Array.isArray(pObject[_tmpBoxedPropertyName7])){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the array and grab the addresses from there.
var tmpArrayProperty=pObject[_tmpBoxedPropertyName7];// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpBoxedPropertyName7);// The container object is where we have the "Address":SOMEVALUE pairs
var tmpContainerObject={};for(var _i7=0;_i7<tmpArrayProperty.length;_i7++){var tmpPropertyParentAddress="".concat(tmpParentAddress,"[").concat(_i7,"]");var tmpValue=this.getValueAtAddress(pObject[_tmpBoxedPropertyName7][_i7],tmpNewAddress,tmpPropertyParentAddress,tmpRootObject);tmpContainerObject["".concat(tmpPropertyParentAddress,".").concat(tmpNewAddress)]=tmpValue;}return tmpContainerObject;}// OBJECT SET
// Note this will not work with a bracket in the same address box set
var _tmpObjectTypeMarkerIndex2=pAddress.indexOf('{}');if(_tmpObjectTypeMarkerIndex2>0){var _tmpObjectPropertyName2=pAddress.substring(0,_tmpObjectTypeMarkerIndex2).trim();if(_typeof(pObject[_tmpObjectPropertyName2])!='object'){// We asked for a set from an array but it isnt' an array.
return false;}// We need to enumerate the Object and grab the addresses from there.
var tmpObjectProperty=pObject[_tmpObjectPropertyName2];var tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);// Managing the parent address is a bit more complex here -- the box will be added for each element.
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(_tmpObjectPropertyName2);// The container object is where we have the "Address":SOMEVALUE pairs
var _tmpContainerObject2={};for(var _i8=0;_i8<tmpObjectPropertyKeys.length;_i8++){var _tmpPropertyParentAddress2="".concat(tmpParentAddress,".").concat(tmpObjectPropertyKeys[_i8]);var _tmpValue2=this.getValueAtAddress(pObject[_tmpObjectPropertyName2][tmpObjectPropertyKeys[_i8]],tmpNewAddress,_tmpPropertyParentAddress2,tmpRootObject);// The filtering is complex but allows config-based metaprogramming directly from schema
var _tmpKeepRecord2=this.checkFilters(pAddress,_tmpValue2);if(_tmpKeepRecord2){_tmpContainerObject2["".concat(_tmpPropertyParentAddress2,".").concat(tmpNewAddress)]=_tmpValue2;}}return _tmpContainerObject2;}// If there is an object property already named for the sub object, but it isn't an object
// then the system can't set the value in there.  Error and abort!
if(pObject.hasOwnProperty(tmpSubObjectName)&&_typeof(pObject[tmpSubObjectName])!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){// If there is already a subobject pass that to the recursive thingy
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress,tmpRootObject);}else{// Create a subobject and then pass that
// Continue to manage the parent address for recursion
tmpParentAddress="".concat(tmpParentAddress).concat(tmpParentAddress.length>0?'.':'').concat(tmpSubObjectName);pObject[tmpSubObjectName]={};return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress,tmpRootObject);}}}}]);return ManyfestObjectAddressResolverGetValue;}();;module.exports=ManyfestObjectAddressResolverGetValue;},{"../source/Manyfest-ParseConditionals.js":87,"./Manyfest-CleanWrapCharacters.js":79,"./Manyfest-LogToConsole.js":81}],85:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');var fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');/**
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
*/var ManyfestObjectAddressSetValue=/*#__PURE__*/function(){function ManyfestObjectAddressSetValue(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestObjectAddressSetValue);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.cleanWrapCharacters=fCleanWrapCharacters;}// Set the value of an element at an address
_createClass2(ManyfestObjectAddressSetValue,[{key:"setValueAtAddress",value:function setValueAtAddress(pObject,pAddress,pValue){// Make sure pObject is an object
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
pObject[tmpSubObjectName]={};return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}}}}]);return ManyfestObjectAddressSetValue;}();;module.exports=ManyfestObjectAddressSetValue;},{"./Manyfest-CleanWrapCharacters.js":79,"./Manyfest-LogToConsole.js":81}],86:[function(require,module,exports){/**
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
*/var ManyfestObjectAddressGeneration=/*#__PURE__*/function(){function ManyfestObjectAddressGeneration(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestObjectAddressGeneration);// Wire in logging
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;}// generateAddressses
//
// This flattens an object into a set of key:value pairs for *EVERY SINGLE
// POSSIBLE ADDRESS* in the object.  It can get ... really insane really
// quickly.  This is not meant to be used directly to generate schemas, but
// instead as a starting point for scripts or UIs.
//
// This will return a mega set of key:value pairs with all possible schema
// permutations and default values (when not an object) and everything else.
_createClass2(ManyfestObjectAddressGeneration,[{key:"generateAddressses",value:function generateAddressses(pObject,pBaseAddress,pSchema){var tmpBaseAddress=typeof pBaseAddress=='string'?pBaseAddress:'';var tmpSchema=_typeof(pSchema)=='object'?pSchema:{};var tmpObjectType=_typeof(pObject);var tmpSchemaObjectEntry={Address:tmpBaseAddress,Hash:tmpBaseAddress,Name:tmpBaseAddress,// This is so scripts and UI controls can force a developer to opt-in.
InSchema:false};if(tmpObjectType=='object'&&pObject==null){tmpObjectType='null';}switch(tmpObjectType){case'string':tmpSchemaObjectEntry.DataType='String';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'number':case'bigint':tmpSchemaObjectEntry.DataType='Number';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'undefined':case'null':tmpSchemaObjectEntry.DataType='Any';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'object':if(Array.isArray(pObject)){tmpSchemaObjectEntry.DataType='Array';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;}for(var i=0;i<pObject.length;i++){this.generateAddressses(pObject[i],"".concat(tmpBaseAddress,"[").concat(i,"]"),tmpSchema);}}else{tmpSchemaObjectEntry.DataType='Object';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;tmpBaseAddress+='.';}var tmpObjectProperties=Object.keys(pObject);for(var _i9=0;_i9<tmpObjectProperties.length;_i9++){this.generateAddressses(pObject[tmpObjectProperties[_i9]],"".concat(tmpBaseAddress).concat(tmpObjectProperties[_i9]),tmpSchema);}}break;case'symbol':case'function':// Symbols and functions neither recurse nor get added to the schema
break;}return tmpSchema;}}]);return ManyfestObjectAddressGeneration;}();;module.exports=ManyfestObjectAddressGeneration;},{"./Manyfest-LogToConsole.js":81}],87:[function(require,module,exports){// Given a string, parse out any conditional expressions and set whether or not to keep the record.
//
// For instance:
// 		'files[]<<~?format,==,Thumbnail?~>>'
//      'files[]<<~?format,==,Metadata?~>>'
//      'files[]<<~?size,>,4000?~>>'
//
// The wrapping parts are the <<~? and ?~>> megabrackets.
//
// The function does not need to alter the string -- just check the conditionals within.
// TODO: Consider making this an es6 class
// Let's use indexOf since it is apparently the fastest.
var _ConditionalStanzaStart='<<~?';var _ConditionalStanzaStartLength=_ConditionalStanzaStart.length;var _ConditionalStanzaEnd='?~>>';var _ConditionalStanzaEndLength=_ConditionalStanzaEnd.length;// Test the condition of a value in a record
var testCondition=function testCondition(pManyfest,pRecord,pSearchAddress,pSearchComparator,pValue){switch(pSearchComparator){case'!=':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)!=pValue;break;case'<':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)<pValue;break;case'>':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)>pValue;break;case'<=':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)<=pValue;break;case'>=':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)>=pValue;break;case'===':return pManyfest.getValueAtAddress(pRecord,pSearchAddress)===pValue;break;case'==':default:return pManyfest.getValueAtAddress(pRecord,pSearchAddress)==pValue;break;}};var parseConditionals=function parseConditionals(pManyfest,pAddress,pRecord){var tmpKeepRecord=true;/*
		Algorithm is simple:

		1.  Enuerate start points

		2.  Find stop points within each start point
		3. Check the conditional
	*/var tmpStartIndex=pAddress.indexOf(_ConditionalStanzaStart);while(tmpStartIndex!=-1){var tmpStopIndex=pAddress.indexOf(_ConditionalStanzaEnd,tmpStartIndex+_ConditionalStanzaStartLength);if(tmpStopIndex!=-1){var tmpMagicComparisonPatternSet=pAddress.substring(tmpStartIndex+_ConditionalStanzaStartLength,tmpStopIndex).split(',');var tmpSearchAddress=tmpMagicComparisonPatternSet[0];var tmpSearchComparator=tmpMagicComparisonPatternSet[1];var tmpSearchValue=tmpMagicComparisonPatternSet[2];// Process the piece
tmpKeepRecord=tmpKeepRecord&&testCondition(pManyfest,pRecord,tmpSearchAddress,tmpSearchComparator,tmpSearchValue);tmpStartIndex=pAddress.indexOf(_ConditionalStanzaStart,tmpStopIndex+_ConditionalStanzaEndLength);}else{tmpStartIndex=-1;}}return tmpKeepRecord;};module.exports=parseConditionals;},{}],88:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libSimpleLog=require('./Manyfest-LogToConsole.js');/**
* Schema Manipulation Functions
*
* @class ManyfestSchemaManipulation
*/var ManyfestSchemaManipulation=/*#__PURE__*/function(){function ManyfestSchemaManipulation(pInfoLog,pErrorLog){_classCallCheck2(this,ManyfestSchemaManipulation);// Wire in logging
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
_createClass2(ManyfestSchemaManipulation,[{key:"resolveAddressMappings",value:function resolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){if(_typeof(pManyfestSchemaDescriptors)!='object'){this.logError("Attempted to resolve address mapping but the descriptor was not an object.");return false;}if(_typeof(pAddressMapping)!='object'){// No mappings were passed in
return true;}// Get the arrays of both the schema definition and the hash mapping
var tmpManyfestAddresses=Object.keys(pManyfestSchemaDescriptors);var tmpHashMapping={};tmpManyfestAddresses.forEach(function(pAddress){if(pManyfestSchemaDescriptors[pAddress].hasOwnProperty('Hash')){tmpHashMapping[pManyfestSchemaDescriptors[pAddress].Hash]=pAddress;}});var tmpAddressMappingSet=Object.keys(pAddressMapping);tmpAddressMappingSet.forEach(function(pInputAddress){var tmpNewDescriptorAddress=pAddressMapping[pInputAddress];var tmpOldDescriptorAddress=false;var tmpDescriptor=false;// See if there is a matching descriptor either by Address directly or Hash
if(pManyfestSchemaDescriptors.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=pInputAddress;}else if(tmpHashMapping.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=tmpHashMapping[pInputAddress];}// If there was a matching descriptor in the manifest, store it in the temporary descriptor
if(tmpOldDescriptorAddress){tmpDescriptor=pManyfestSchemaDescriptors[tmpOldDescriptorAddress];delete pManyfestSchemaDescriptors[tmpOldDescriptorAddress];}else{// Create a new descriptor!  Map it to the input address.
tmpDescriptor={Hash:pInputAddress};}// Now re-add the descriptor to the manyfest schema
pManyfestSchemaDescriptors[tmpNewDescriptorAddress]=tmpDescriptor;});return true;}},{key:"safeResolveAddressMappings",value:function safeResolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){// This returns the descriptors as a new object, safely remapping without mutating the original schema Descriptors
var tmpManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptors));this.resolveAddressMappings(tmpManyfestSchemaDescriptors,pAddressMapping);return tmpManyfestSchemaDescriptors;}},{key:"mergeAddressMappings",value:function mergeAddressMappings(pManyfestSchemaDescriptorsDestination,pManyfestSchemaDescriptorsSource){if(_typeof(pManyfestSchemaDescriptorsSource)!='object'||_typeof(pManyfestSchemaDescriptorsDestination)!='object'){this.logError("Attempted to merge two schema descriptors but both were not objects.");return false;}var tmpSource=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsSource));var tmpNewManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsDestination));// The first passed-in set of descriptors takes precedence.
var tmpDescriptorAddresses=Object.keys(tmpSource);tmpDescriptorAddresses.forEach(function(pDescriptorAddress){if(!tmpNewManyfestSchemaDescriptors.hasOwnProperty(pDescriptorAddress)){tmpNewManyfestSchemaDescriptors[pDescriptorAddress]=tmpSource[pDescriptorAddress];}});return tmpNewManyfestSchemaDescriptors;}}]);return ManyfestSchemaManipulation;}();module.exports=ManyfestSchemaManipulation;},{"./Manyfest-LogToConsole.js":81}],89:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libFableServiceProviderBase=require('fable-serviceproviderbase');var libSimpleLog=require('./Manyfest-LogToConsole.js');var libHashTranslation=require('./Manyfest-HashTranslation.js');var libObjectAddressCheckAddressExists=require('./Manyfest-ObjectAddress-CheckAddressExists.js');var libObjectAddressGetValue=require('./Manyfest-ObjectAddress-GetValue.js');var libObjectAddressSetValue=require('./Manyfest-ObjectAddress-SetValue.js');var libObjectAddressDeleteValue=require('./Manyfest-ObjectAddress-DeleteValue.js');var libObjectAddressGeneration=require('./Manyfest-ObjectAddressGeneration.js');var libSchemaManipulation=require('./Manyfest-SchemaManipulation.js');var _DefaultConfiguration={Scope:'DEFAULT',Descriptors:{}};/**
* Manyfest object address-based descriptions and manipulations.
*
* @class Manyfest
*/var Manyfest=/*#__PURE__*/function(_libFableServiceProvi9){_inherits(Manyfest,_libFableServiceProvi9);var _super21=_createSuper(Manyfest);function Manyfest(pFable,pManifest,pServiceHash){var _this36;_classCallCheck2(this,Manyfest);if(pFable===undefined){_this36=_super21.call(this,{});}else{_this36=_super21.call(this,pFable,pManifest,pServiceHash);}_this36.serviceType='Manifest';// Wire in logging
_this36.logInfo=libSimpleLog;_this36.logError=libSimpleLog;// Create an object address resolver and map in the functions
_this36.objectAddressCheckAddressExists=new libObjectAddressCheckAddressExists(_this36.logInfo,_this36.logError);_this36.objectAddressGetValue=new libObjectAddressGetValue(_this36.logInfo,_this36.logError);_this36.objectAddressSetValue=new libObjectAddressSetValue(_this36.logInfo,_this36.logError);_this36.objectAddressDeleteValue=new libObjectAddressDeleteValue(_this36.logInfo,_this36.logError);if(!_this36.options.hasOwnProperty('defaultValues')){_this36.options.defaultValues={"String":"","Number":0,"Float":0.0,"Integer":0,"Boolean":false,"Binary":0,"DateTime":0,"Array":[],"Object":{},"Null":null};}if(!_this36.options.hasOwnProperty('strict')){_this36.options.strict=false;}_this36.scope=undefined;_this36.elementAddresses=undefined;_this36.elementHashes=undefined;_this36.elementDescriptors=undefined;_this36.reset();if(_typeof(_this36.options)==='object'){_this36.loadManifest(_this36.options);}_this36.schemaManipulations=new libSchemaManipulation(_this36.logInfo,_this36.logError);_this36.objectAddressGeneration=new libObjectAddressGeneration(_this36.logInfo,_this36.logError);_this36.hashTranslations=new libHashTranslation(_this36.logInfo,_this36.logError);return _possibleConstructorReturn(_this36);}/*************************************************************************
	 * Schema Manifest Loading, Reading, Manipulation and Serialization Functions
	 */ // Reset critical manifest properties
_createClass2(Manyfest,[{key:"reset",value:function reset(){this.scope='DEFAULT';this.elementAddresses=[];this.elementHashes={};this.elementDescriptors={};}},{key:"clone",value:function clone(){// Make a copy of the options in-place
var tmpNewOptions=JSON.parse(JSON.stringify(this.options));var tmpNewManyfest=new Manyfest(this.getManifest(),this.logInfo,this.logError,tmpNewOptions);// Import the hash translations
tmpNewManyfest.hashTranslations.addTranslation(this.hashTranslations.translationTable);return tmpNewManyfest;}// Deserialize a Manifest from a string
},{key:"deserialize",value:function deserialize(pManifestString){// TODO: Add guards for bad manifest string
return this.loadManifest(JSON.parse(pManifestString));}// Load a manifest from an object
},{key:"loadManifest",value:function loadManifest(pManifest){if(_typeof(pManifest)!=='object'){this.logError("(".concat(this.scope,") Error loading manifest; expecting an object but parameter was type ").concat(_typeof(pManifest),"."));}var tmpManifest=_typeof(pManifest)=='object'?pManifest:{};var tmpDescriptorKeys=Object.keys(_DefaultConfiguration);for(var i=0;i<tmpDescriptorKeys.length;i++){if(!tmpManifest.hasOwnProperty(tmpDescriptorKeys[i])){tmpManifest[tmpDescriptorKeys[i]]=JSON.parse(JSON.stringify(_DefaultConfiguration[tmpDescriptorKeys[i]]));}}if(tmpManifest.hasOwnProperty('Scope')){if(typeof tmpManifest.Scope==='string'){this.scope=tmpManifest.Scope;}else{this.logError("(".concat(this.scope,") Error loading scope from manifest; expecting a string but property was type ").concat(_typeof(tmpManifest.Scope),"."),tmpManifest);}}else{this.logError("(".concat(this.scope,") Error loading scope from manifest object.  Property \"Scope\" does not exist in the root of the object."),tmpManifest);}if(tmpManifest.hasOwnProperty('Descriptors')){if(_typeof(tmpManifest.Descriptors)==='object'){var tmpDescriptionAddresses=Object.keys(tmpManifest.Descriptors);for(var _i10=0;_i10<tmpDescriptionAddresses.length;_i10++){this.addDescriptor(tmpDescriptionAddresses[_i10],tmpManifest.Descriptors[tmpDescriptionAddresses[_i10]]);}}else{this.logError("(".concat(this.scope,") Error loading description object from manifest object.  Expecting an object in 'Manifest.Descriptors' but the property was type ").concat(_typeof(tmpManifest.Descriptors),"."),tmpManifest);}}else{this.logError("(".concat(this.scope,") Error loading object description from manifest object.  Property \"Descriptors\" does not exist in the root of the Manifest object."),tmpManifest);}if(tmpManifest.hasOwnProperty('HashTranslations')){if(_typeof(tmpManifest.HashTranslations)==='object'){for(var _i11=0;_i11<tmpManifest.HashTranslations.length;_i11++){// Each translation is 
}}}}// Serialize the Manifest to a string
},{key:"serialize",value:function serialize(){return JSON.stringify(this.getManifest());}},{key:"getManifest",value:function getManifest(){return{Scope:this.scope,Descriptors:JSON.parse(JSON.stringify(this.elementDescriptors)),HashTranslations:JSON.parse(JSON.stringify(this.hashTranslations.translationTable))};}// Add a descriptor to the manifest
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
},{key:"populateObject",value:function populateObject(pObject,pOverwriteProperties,fFilter){var _this37=this;// Automatically create an object if one isn't passed in.
var tmpObject=_typeof(pObject)==='object'?pObject:{};// Default to *NOT OVERWRITING* properties
var tmpOverwriteProperties=typeof pOverwriteProperties=='undefined'?false:pOverwriteProperties;// This is a filter function, which is passed the schema and allows complex filtering of population
// The default filter function just returns true, populating everything.
var tmpFilterFunction=typeof fFilter=='function'?fFilter:function(pDescriptor){return true;};this.elementAddresses.forEach(function(pAddress){var tmpDescriptor=_this37.getDescriptor(pAddress);// Check the filter function to see if this is an address we want to set the value for.
if(tmpFilterFunction(tmpDescriptor)){// If we are overwriting properties OR the property does not exist
if(tmpOverwriteProperties||!_this37.checkAddressExists(tmpObject,pAddress)){_this37.setValueAtAddress(tmpObject,pAddress,_this37.getDefaultValue(tmpDescriptor));}}});return tmpObject;}}]);return Manyfest;}(libFableServiceProviderBase);;module.exports=Manyfest;},{"./Manyfest-HashTranslation.js":80,"./Manyfest-LogToConsole.js":81,"./Manyfest-ObjectAddress-CheckAddressExists.js":82,"./Manyfest-ObjectAddress-DeleteValue.js":83,"./Manyfest-ObjectAddress-GetValue.js":84,"./Manyfest-ObjectAddress-SetValue.js":85,"./Manyfest-ObjectAddressGeneration.js":86,"./Manyfest-SchemaManipulation.js":88,"fable-serviceproviderbase":44}],90:[function(require,module,exports){(function(global){(function(){var hasMap=typeof Map==='function'&&Map.prototype;var mapSizeDescriptor=Object.getOwnPropertyDescriptor&&hasMap?Object.getOwnPropertyDescriptor(Map.prototype,'size'):null;var mapSize=hasMap&&mapSizeDescriptor&&typeof mapSizeDescriptor.get==='function'?mapSizeDescriptor.get:null;var mapForEach=hasMap&&Map.prototype.forEach;var hasSet=typeof Set==='function'&&Set.prototype;var setSizeDescriptor=Object.getOwnPropertyDescriptor&&hasSet?Object.getOwnPropertyDescriptor(Set.prototype,'size'):null;var setSize=hasSet&&setSizeDescriptor&&typeof setSizeDescriptor.get==='function'?setSizeDescriptor.get:null;var setForEach=hasSet&&Set.prototype.forEach;var hasWeakMap=typeof WeakMap==='function'&&WeakMap.prototype;var weakMapHas=hasWeakMap?WeakMap.prototype.has:null;var hasWeakSet=typeof WeakSet==='function'&&WeakSet.prototype;var weakSetHas=hasWeakSet?WeakSet.prototype.has:null;var hasWeakRef=typeof WeakRef==='function'&&WeakRef.prototype;var weakRefDeref=hasWeakRef?WeakRef.prototype.deref:null;var booleanValueOf=Boolean.prototype.valueOf;var objectToString=Object.prototype.toString;var functionToString=Function.prototype.toString;var $match=String.prototype.match;var $slice=String.prototype.slice;var $replace=String.prototype.replace;var $toUpperCase=String.prototype.toUpperCase;var $toLowerCase=String.prototype.toLowerCase;var $test=RegExp.prototype.test;var $concat=Array.prototype.concat;var $join=Array.prototype.join;var $arrSlice=Array.prototype.slice;var $floor=Math.floor;var bigIntValueOf=typeof BigInt==='function'?BigInt.prototype.valueOf:null;var gOPS=Object.getOwnPropertySymbols;var symToString=typeof Symbol==='function'&&_typeof(Symbol.iterator)==='symbol'?Symbol.prototype.toString:null;var hasShammedSymbols=typeof Symbol==='function'&&_typeof(Symbol.iterator)==='object';// ie, `has-tostringtag/shams
var toStringTag=typeof Symbol==='function'&&Symbol.toStringTag&&(_typeof(Symbol.toStringTag)===hasShammedSymbols?'object':'symbol')?Symbol.toStringTag:null;var isEnumerable=Object.prototype.propertyIsEnumerable;var gPO=(typeof Reflect==='function'?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype// eslint-disable-line no-proto
?function(O){return O.__proto__;// eslint-disable-line no-proto
}:null);function addNumericSeparator(num,str){if(num===Infinity||num===-Infinity||num!==num||num&&num>-1000&&num<1000||$test.call(/e/,str)){return str;}var sepRegex=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof num==='number'){var _int=num<0?-$floor(-num):$floor(num);// trunc(num)
if(_int!==num){var intStr=String(_int);var dec=$slice.call(str,intStr.length+1);return $replace.call(intStr,sepRegex,'$&_')+'.'+$replace.call($replace.call(dec,/([0-9]{3})/g,'$&_'),/_$/,'');}}return $replace.call(str,sepRegex,'$&_');}var utilInspect=require('./util.inspect');var inspectCustom=utilInspect.custom;var inspectSymbol=isSymbol(inspectCustom)?inspectCustom:null;module.exports=function inspect_(obj,options,depth,seen){var opts=options||{};if(has(opts,'quoteStyle')&&opts.quoteStyle!=='single'&&opts.quoteStyle!=='double'){throw new TypeError('option "quoteStyle" must be "single" or "double"');}if(has(opts,'maxStringLength')&&(typeof opts.maxStringLength==='number'?opts.maxStringLength<0&&opts.maxStringLength!==Infinity:opts.maxStringLength!==null)){throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');}var customInspect=has(opts,'customInspect')?opts.customInspect:true;if(typeof customInspect!=='boolean'&&customInspect!=='symbol'){throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');}if(has(opts,'indent')&&opts.indent!==null&&opts.indent!=='\t'&&!(parseInt(opts.indent,10)===opts.indent&&opts.indent>0)){throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');}if(has(opts,'numericSeparator')&&typeof opts.numericSeparator!=='boolean'){throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');}var numericSeparator=opts.numericSeparator;if(typeof obj==='undefined'){return'undefined';}if(obj===null){return'null';}if(typeof obj==='boolean'){return obj?'true':'false';}if(typeof obj==='string'){return inspectString(obj,opts);}if(typeof obj==='number'){if(obj===0){return Infinity/obj>0?'0':'-0';}var str=String(obj);return numericSeparator?addNumericSeparator(obj,str):str;}if(typeof obj==='bigint'){var bigIntStr=String(obj)+'n';return numericSeparator?addNumericSeparator(obj,bigIntStr):bigIntStr;}var maxDepth=typeof opts.depth==='undefined'?5:opts.depth;if(typeof depth==='undefined'){depth=0;}if(depth>=maxDepth&&maxDepth>0&&_typeof(obj)==='object'){return isArray(obj)?'[Array]':'[Object]';}var indent=getIndent(opts,depth);if(typeof seen==='undefined'){seen=[];}else if(indexOf(seen,obj)>=0){return'[Circular]';}function inspect(value,from,noIndent){if(from){seen=$arrSlice.call(seen);seen.push(from);}if(noIndent){var newOpts={depth:opts.depth};if(has(opts,'quoteStyle')){newOpts.quoteStyle=opts.quoteStyle;}return inspect_(value,newOpts,depth+1,seen);}return inspect_(value,opts,depth+1,seen);}if(typeof obj==='function'&&!isRegExp(obj)){// in older engines, regexes are callable
var name=nameOf(obj);var keys=arrObjKeys(obj,inspect);return'[Function'+(name?': '+name:' (anonymous)')+']'+(keys.length>0?' { '+$join.call(keys,', ')+' }':'');}if(isSymbol(obj)){var symString=hasShammedSymbols?$replace.call(String(obj),/^(Symbol\(.*\))_[^)]*$/,'$1'):symToString.call(obj);return _typeof(obj)==='object'&&!hasShammedSymbols?markBoxed(symString):symString;}if(isElement(obj)){var s='<'+$toLowerCase.call(String(obj.nodeName));var attrs=obj.attributes||[];for(var i=0;i<attrs.length;i++){s+=' '+attrs[i].name+'='+wrapQuotes(quote(attrs[i].value),'double',opts);}s+='>';if(obj.childNodes&&obj.childNodes.length){s+='...';}s+='</'+$toLowerCase.call(String(obj.nodeName))+'>';return s;}if(isArray(obj)){if(obj.length===0){return'[]';}var xs=arrObjKeys(obj,inspect);if(indent&&!singleLineValues(xs)){return'['+indentedJoin(xs,indent)+']';}return'[ '+$join.call(xs,', ')+' ]';}if(isError(obj)){var parts=arrObjKeys(obj,inspect);if(!('cause'in Error.prototype)&&'cause'in obj&&!isEnumerable.call(obj,'cause')){return'{ ['+String(obj)+'] '+$join.call($concat.call('[cause]: '+inspect(obj.cause),parts),', ')+' }';}if(parts.length===0){return'['+String(obj)+']';}return'{ ['+String(obj)+'] '+$join.call(parts,', ')+' }';}if(_typeof(obj)==='object'&&customInspect){if(inspectSymbol&&typeof obj[inspectSymbol]==='function'&&utilInspect){return utilInspect(obj,{depth:maxDepth-depth});}else if(customInspect!=='symbol'&&typeof obj.inspect==='function'){return obj.inspect();}}if(isMap(obj)){var mapParts=[];if(mapForEach){mapForEach.call(obj,function(value,key){mapParts.push(inspect(key,obj,true)+' => '+inspect(value,obj));});}return collectionOf('Map',mapSize.call(obj),mapParts,indent);}if(isSet(obj)){var setParts=[];if(setForEach){setForEach.call(obj,function(value){setParts.push(inspect(value,obj));});}return collectionOf('Set',setSize.call(obj),setParts,indent);}if(isWeakMap(obj)){return weakCollectionOf('WeakMap');}if(isWeakSet(obj)){return weakCollectionOf('WeakSet');}if(isWeakRef(obj)){return weakCollectionOf('WeakRef');}if(isNumber(obj)){return markBoxed(inspect(Number(obj)));}if(isBigInt(obj)){return markBoxed(inspect(bigIntValueOf.call(obj)));}if(isBoolean(obj)){return markBoxed(booleanValueOf.call(obj));}if(isString(obj)){return markBoxed(inspect(String(obj)));}// note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
/* eslint-env browser */if(typeof window!=='undefined'&&obj===window){return'{ [object Window] }';}if(obj===global){return'{ [object globalThis] }';}if(!isDate(obj)&&!isRegExp(obj)){var ys=arrObjKeys(obj,inspect);var isPlainObject=gPO?gPO(obj)===Object.prototype:obj instanceof Object||obj.constructor===Object;var protoTag=obj instanceof Object?'':'null prototype';var stringTag=!isPlainObject&&toStringTag&&Object(obj)===obj&&toStringTag in obj?$slice.call(toStr(obj),8,-1):protoTag?'Object':'';var constructorTag=isPlainObject||typeof obj.constructor!=='function'?'':obj.constructor.name?obj.constructor.name+' ':'';var tag=constructorTag+(stringTag||protoTag?'['+$join.call($concat.call([],stringTag||[],protoTag||[]),': ')+'] ':'');if(ys.length===0){return tag+'{}';}if(indent){return tag+'{'+indentedJoin(ys,indent)+'}';}return tag+'{ '+$join.call(ys,', ')+' }';}return String(obj);};function wrapQuotes(s,defaultStyle,opts){var quoteChar=(opts.quoteStyle||defaultStyle)==='double'?'"':"'";return quoteChar+s+quoteChar;}function quote(s){return $replace.call(String(s),/"/g,'&quot;');}function isArray(obj){return toStr(obj)==='[object Array]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isDate(obj){return toStr(obj)==='[object Date]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isRegExp(obj){return toStr(obj)==='[object RegExp]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isError(obj){return toStr(obj)==='[object Error]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isString(obj){return toStr(obj)==='[object String]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isNumber(obj){return toStr(obj)==='[object Number]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}function isBoolean(obj){return toStr(obj)==='[object Boolean]'&&(!toStringTag||!(_typeof(obj)==='object'&&toStringTag in obj));}// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj){if(hasShammedSymbols){return obj&&_typeof(obj)==='object'&&obj instanceof Symbol;}if(_typeof(obj)==='symbol'){return true;}if(!obj||_typeof(obj)!=='object'||!symToString){return false;}try{symToString.call(obj);return true;}catch(e){}return false;}function isBigInt(obj){if(!obj||_typeof(obj)!=='object'||!bigIntValueOf){return false;}try{bigIntValueOf.call(obj);return true;}catch(e){}return false;}var hasOwn=Object.prototype.hasOwnProperty||function(key){return key in this;};function has(obj,key){return hasOwn.call(obj,key);}function toStr(obj){return objectToString.call(obj);}function nameOf(f){if(f.name){return f.name;}var m=$match.call(functionToString.call(f),/^function\s*([\w$]+)/);if(m){return m[1];}return null;}function indexOf(xs,x){if(xs.indexOf){return xs.indexOf(x);}for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x){return i;}}return-1;}function isMap(x){if(!mapSize||!x||_typeof(x)!=='object'){return false;}try{mapSize.call(x);try{setSize.call(x);}catch(s){return true;}return x instanceof Map;// core-js workaround, pre-v2.5.0
}catch(e){}return false;}function isWeakMap(x){if(!weakMapHas||!x||_typeof(x)!=='object'){return false;}try{weakMapHas.call(x,weakMapHas);try{weakSetHas.call(x,weakSetHas);}catch(s){return true;}return x instanceof WeakMap;// core-js workaround, pre-v2.5.0
}catch(e){}return false;}function isWeakRef(x){if(!weakRefDeref||!x||_typeof(x)!=='object'){return false;}try{weakRefDeref.call(x);return true;}catch(e){}return false;}function isSet(x){if(!setSize||!x||_typeof(x)!=='object'){return false;}try{setSize.call(x);try{mapSize.call(x);}catch(m){return true;}return x instanceof Set;// core-js workaround, pre-v2.5.0
}catch(e){}return false;}function isWeakSet(x){if(!weakSetHas||!x||_typeof(x)!=='object'){return false;}try{weakSetHas.call(x,weakSetHas);try{weakMapHas.call(x,weakMapHas);}catch(s){return true;}return x instanceof WeakSet;// core-js workaround, pre-v2.5.0
}catch(e){}return false;}function isElement(x){if(!x||_typeof(x)!=='object'){return false;}if(typeof HTMLElement!=='undefined'&&x instanceof HTMLElement){return true;}return typeof x.nodeName==='string'&&typeof x.getAttribute==='function';}function inspectString(str,opts){if(str.length>opts.maxStringLength){var remaining=str.length-opts.maxStringLength;var trailer='... '+remaining+' more character'+(remaining>1?'s':'');return inspectString($slice.call(str,0,opts.maxStringLength),opts)+trailer;}// eslint-disable-next-line no-control-regex
var s=$replace.call($replace.call(str,/(['\\])/g,'\\$1'),/[\x00-\x1f]/g,lowbyte);return wrapQuotes(s,'single',opts);}function lowbyte(c){var n=c.charCodeAt(0);var x={8:'b',9:'t',10:'n',12:'f',13:'r'}[n];if(x){return'\\'+x;}return'\\x'+(n<0x10?'0':'')+$toUpperCase.call(n.toString(16));}function markBoxed(str){return'Object('+str+')';}function weakCollectionOf(type){return type+' { ? }';}function collectionOf(type,size,entries,indent){var joinedEntries=indent?indentedJoin(entries,indent):$join.call(entries,', ');return type+' ('+size+') {'+joinedEntries+'}';}function singleLineValues(xs){for(var i=0;i<xs.length;i++){if(indexOf(xs[i],'\n')>=0){return false;}}return true;}function getIndent(opts,depth){var baseIndent;if(opts.indent==='\t'){baseIndent='\t';}else if(typeof opts.indent==='number'&&opts.indent>0){baseIndent=$join.call(Array(opts.indent+1),' ');}else{return null;}return{base:baseIndent,prev:$join.call(Array(depth+1),baseIndent)};}function indentedJoin(xs,indent){if(xs.length===0){return'';}var lineJoiner='\n'+indent.prev+indent.base;return lineJoiner+$join.call(xs,','+lineJoiner)+'\n'+indent.prev;}function arrObjKeys(obj,inspect){var isArr=isArray(obj);var xs=[];if(isArr){xs.length=obj.length;for(var i=0;i<obj.length;i++){xs[i]=has(obj,i)?inspect(obj[i],obj):'';}}var syms=typeof gOPS==='function'?gOPS(obj):[];var symMap;if(hasShammedSymbols){symMap={};for(var k=0;k<syms.length;k++){symMap['$'+syms[k]]=syms[k];}}for(var key in obj){// eslint-disable-line no-restricted-syntax
if(!has(obj,key)){continue;}// eslint-disable-line no-restricted-syntax, no-continue
if(isArr&&String(Number(key))===key&&key<obj.length){continue;}// eslint-disable-line no-restricted-syntax, no-continue
if(hasShammedSymbols&&symMap['$'+key]instanceof Symbol){// this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
continue;// eslint-disable-line no-restricted-syntax, no-continue
}else if($test.call(/[^\w$]/,key)){xs.push(inspect(key,obj)+': '+inspect(obj[key],obj));}else{xs.push(key+': '+inspect(obj[key],obj));}}if(typeof gOPS==='function'){for(var j=0;j<syms.length;j++){if(isEnumerable.call(obj,syms[j])){xs.push('['+inspect(syms[j])+']: '+inspect(obj[syms[j]],obj));}}}return xs;}}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./util.inspect":18}],91:[function(require,module,exports){var wrappy=require('wrappy');module.exports=wrappy(once);module.exports.strict=wrappy(onceStrict);once.proto=once(function(){Object.defineProperty(Function.prototype,'once',{value:function value(){return once(this);},configurable:true});Object.defineProperty(Function.prototype,'onceStrict',{value:function value(){return onceStrict(this);},configurable:true});});function once(fn){var f=function f(){if(f.called)return f.value;f.called=true;return f.value=fn.apply(this,arguments);};f.called=false;return f;}function onceStrict(fn){var f=function f(){if(f.called)throw new Error(f.onceError);f.called=true;return f.value=fn.apply(this,arguments);};var name=fn.name||'Function wrapped with `once`';f.onceError=name+" shouldn't be called more than once";f.called=false;return f;}},{"wrappy":136}],92:[function(require,module,exports){(function(process){(function(){// 'path' module extracted from Node.js v8.11.1 (only the posix part)
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
preDotState===1&&startDot===end-1&&startDot===startPart+1){if(end!==-1){if(startPart===0&&isAbsolute)ret.base=ret.name=path.slice(1,end);else ret.base=ret.name=path.slice(startPart,end);}}else{if(startPart===0&&isAbsolute){ret.name=path.slice(1,startDot);ret.base=path.slice(1,end);}else{ret.name=path.slice(startPart,startDot);ret.base=path.slice(startPart,end);}ret.ext=path.slice(startDot,end);}if(startPart>0)ret.dir=path.slice(0,startPart-1);else if(isAbsolute)ret.dir='/';return ret;},sep:'/',delimiter:':',win32:null,posix:null};posix.posix=posix;module.exports=posix;}).call(this);}).call(this,require('_process'));},{"_process":98}],93:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var defaultPictSettings={Name:'DefaultPictApplication',// The main "viewport" is the view that is used to host our application
MainViewportViewIdentifier:'Default-View',MainViewportRenderableHash:false,MainViewportDestinationAddress:false,MainViewportDefaultDataAddress:false,// Whether or not we should automatically render the main viewport after we initialize the pict application
AutoSolveAfterInitialize:true,AutoRenderMainViewportViewAfterInitialize:true,Manifests:{},// The prefix to prepend on all template destination hashes
IdentifierAddressPrefix:'PICT-'};var PictApplication=/*#__PURE__*/function(_libFableServiceBase10){_inherits(PictApplication,_libFableServiceBase10);var _super22=_createSuper(PictApplication);function PictApplication(pFable,pOptions,pServiceHash){var _this38;_classCallCheck2(this,PictApplication);var tmpOptions=Object.assign({},JSON.parse(JSON.stringify(defaultPictSettings)),pOptions);_this38=_super22.call(this,pFable,tmpOptions,pServiceHash);_this38.serviceType='PictApplication';// Convenience and consistency naming
_this38.pict=_this38.fable;// Wire in the essential Pict state
_this38.AppData=_this38.fable.AppData;_this38.initializeTimestamp=false;_this38.lastSolvedTimestamp=false;_this38.lastMarshalFromViewsTimestamp=false;_this38.lastMarshalToViewsTimestamp=false;// Load all the manifests for the application
var tmpManifestKeys=Object.keys(_this38.options.Manifests);if(tmpManifestKeys.length>0){for(var i=0;i<tmpManifestKeys.length;i++){// Load each manifest
var tmpManifestKey=tmpManifestKeys[i];_this38.fable.instantiateServiceProvider('Manifest',_this38.options.Manifests[tmpManifestKey],tmpManifestKey);}}return _this38;}/* -------------------------------------------------------------------------- */ /*                     Code Section: Solve All Views                          */ /* -------------------------------------------------------------------------- */_createClass2(PictApplication,[{key:"onBeforeSolve",value:function onBeforeSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onBeforeSolve:"));}return true;}},{key:"onBeforeSolveAsync",value:function onBeforeSolveAsync(fCallback){this.onBeforeSolve();return fCallback();}},{key:"onSolve",value:function onSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onSolve:"));}return true;}},{key:"onSolveAsync",value:function onSolveAsync(fCallback){this.onSolve();return fCallback();}},{key:"solve",value:function solve(){if(this.pict.LogNoisiness>2){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," executing solve() function..."));}this.onBeforeSolve();// Now walk through any loaded views and initialize them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToSolve=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToSolve.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToSolve.sort(function(a,b){return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(var _i12=0;_i12<tmpViewsToSolve.length;_i12++){tmpViewsToSolve[_i12].solve();}this.onSolve();this.onAfterSolve();this.lastSolvedTimestamp=this.fable.log.getTimeStamp();return true;}},{key:"solveAsync",value:function solveAsync(fCallback){var _this39=this;var tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));// Walk through any loaded views and solve them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToSolve=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoSolveWithApp){tmpViewsToSolve.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToSolve.sort(function(a,b){return a.options.AutoSolveOrdinal-b.options.AutoSolveOrdinal;});for(var _i13=0;_i13<tmpViewsToSolve.length;_i13++){tmpAnticipate.anticipate(tmpViewsToSolve[_i13].solveAsync.bind(tmpViewsToSolve[_i13]));}tmpAnticipate.anticipate(this.onSolveAsync.bind(this));tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this39.pict.LogNoisiness>2){_this39.log.trace("PictApp [".concat(_this39.UUID,"]::[").concat(_this39.Hash,"] ").concat(_this39.options.Name," solveAsync() complete."));}_this39.lastSolvedTimestamp=_this39.fable.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterSolve",value:function onAfterSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onAfterSolve:"));}return true;}},{key:"onAfterSolveAsync",value:function onAfterSolveAsync(fCallback){this.onAfterSolve();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Initialize Application                   */ /* -------------------------------------------------------------------------- */},{key:"onBeforeInitialize",value:function onBeforeInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onBeforeInitialize:"));}return true;}},{key:"onBeforeInitializeAsync",value:function onBeforeInitializeAsync(fCallback){this.onBeforeInitialize();return fCallback();}},{key:"onInitialize",value:function onInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onInitialize:"));}return true;}},{key:"onInitializeAsync",value:function onInitializeAsync(fCallback){this.onInitialize();return fCallback();}},{key:"initialize",value:function initialize(){if(!this.initializeTimestamp){this.onBeforeInitialize();this.onInitialize();// Now walk through any loaded views and initialize them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToInitialize=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToInitialize.push(tmpView);}}// Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
tmpViewsToInitialize.sort(function(a,b){return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(var _i14=0;_i14<tmpViewsToInitialize.length;_i14++){tmpViewsToInitialize[_i14].initialize();}this.onAfterInitialize();if(this.options.AutoSolveAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," auto solving after initialization..."));}// Solve the template synchronously
this.solve();}// Now check and see if we should automatically render as well
if(this.options.AutoRenderMainViewportViewAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," auto rendering after initialization..."));}// Render the template synchronously
this.render();}this.initializeTimestamp=this.fable.log.getTimeStamp();return true;}else{this.log.warn("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," initialize called but initialization is already completed.  Aborting."));return false;}}},{key:"initializeAsync",value:function initializeAsync(fCallBack){var _this40=this;if(!this.initializeTimestamp){var tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," beginning initialization..."));}tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));// Now walk through any loaded views and initialize them as well.
// TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToInitialize=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];if(tmpView.options.AutoInitialize){tmpViewsToInitialize.push(tmpView);}}// Sort the views by their priority
// If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
tmpViewsToInitialize.sort(function(a,b){return a.options.AutoInitializeOrdinal-b.options.AutoInitializeOrdinal;});for(var _i15=0;_i15<tmpViewsToInitialize.length;_i15++){var _tmpView=tmpViewsToInitialize[_i15];tmpAnticipate.anticipate(_tmpView.initializeAsync.bind(_tmpView));}tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));if(this.options.AutoSolveAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," auto solving (asynchronously) after initialization..."));}tmpAnticipate.anticipate(this.solveAsync.bind(this));}if(this.options.AutoRenderMainViewportViewAfterInitialize){if(this.pict.LogNoisiness>1){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," auto rendering (asynchronously) after initialization..."));}tmpAnticipate.anticipate(this.renderMainViewportAsync.bind(this));}tmpAnticipate.wait(function(pError){_this40.initializeTimestamp=_this40.fable.log.getTimeStamp();if(_this40.pict.LogNoisiness>2){_this40.log.trace("PictApp [".concat(_this40.UUID,"]::[").concat(_this40.Hash,"] ").concat(_this40.options.Name," initialization complete."));}return fCallBack();});}else{this.log.warn("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," async initialize called but initialization is already completed.  Aborting."));// TODO: Should this be an error?
return fCallback();}}},{key:"onAfterInitialize",value:function onAfterInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onAfterInitialize:"));}return true;}},{key:"onAfterInitializeAsync",value:function onAfterInitializeAsync(fCallback){this.onAfterInitialize();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Marshal Data From All Views              */ /* -------------------------------------------------------------------------- */},{key:"onBeforeMarshalFromViews",value:function onBeforeMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onBeforeMarshalFromViews:"));}return true;}},{key:"onBeforeMarshalFromViewsAsync",value:function onBeforeMarshalFromViewsAsync(fCallback){this.onBeforeMarshalFromViews();return fCallback();}},{key:"onMarshalFromViews",value:function onMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onMarshalFromViews:"));}return true;}},{key:"onMarshalFromViewsAsync",value:function onMarshalFromViewsAsync(fCallback){this.onMarshalFromViews();return fCallback();}},{key:"marshalFromViews",value:function marshalFromViews(){if(this.pict.LogNoisiness>2){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," executing marshalFromViews() function..."));}this.onBeforeMarshalFromViews();// Now walk through any loaded views and initialize them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToMarshalFromViews=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalFromViews.push(tmpView);}for(var _i16=0;_i16<tmpViewsToMarshalFromViews.length;_i16++){tmpViewsToMarshalFromViews[_i16].marshalFromView();}this.onMarshalFromViews();this.onAfterMarshalFromViews();this.lastMarshalFromViewsTimestamp=this.fable.log.getTimeStamp();return true;}},{key:"marshalFromViewsAsync",value:function marshalFromViewsAsync(fCallback){var _this41=this;var tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));// Walk through any loaded views and marshalFromViews them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToMarshalFromViews=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalFromViews.push(tmpView);}for(var _i17=0;_i17<tmpViewsToMarshalFromViews.length;_i17++){tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[_i17].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[_i17]));}tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this41.pict.LogNoisiness>2){_this41.log.trace("PictApp [".concat(_this41.UUID,"]::[").concat(_this41.Hash,"] ").concat(_this41.options.Name," marshalFromViewsAsync() complete."));}_this41.lastMarshalFromViewsTimestamp=_this41.fable.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterMarshalFromViews",value:function onAfterMarshalFromViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onAfterMarshalFromViews:"));}return true;}},{key:"onAfterMarshalFromViewsAsync",value:function onAfterMarshalFromViewsAsync(fCallback){this.onAfterMarshalFromViews();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Marshal Data To All Views                */ /* -------------------------------------------------------------------------- */},{key:"onBeforeMarshalToViews",value:function onBeforeMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onBeforeMarshalToViews:"));}return true;}},{key:"onBeforeMarshalToViewsAsync",value:function onBeforeMarshalToViewsAsync(fCallback){this.onBeforeMarshalToViews();return fCallback();}},{key:"onMarshalToViews",value:function onMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onMarshalToViews:"));}return true;}},{key:"onMarshalToViewsAsync",value:function onMarshalToViewsAsync(fCallback){this.onMarshalToViews();return fCallback();}},{key:"marshalToViews",value:function marshalToViews(){if(this.pict.LogNoisiness>2){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," executing marshalToViews() function..."));}this.onBeforeMarshalToViews();// Now walk through any loaded views and initialize them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToMarshalToViews=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalToViews.push(tmpView);}for(var _i18=0;_i18<tmpViewsToMarshalToViews.length;_i18++){tmpViewsToMarshalToViews[_i18].marshalToView();}this.onMarshalToViews();this.onAfterMarshalToViews();this.lastMarshalToViewsTimestamp=this.fable.log.getTimeStamp();return true;}},{key:"marshalToViewsAsync",value:function marshalToViewsAsync(fCallback){var _this42=this;var tmpAnticipate=this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));// Walk through any loaded views and marshalToViews them as well.
var tmpLoadedViews=Object.keys(this.pict.views);var tmpViewsToMarshalToViews=[];for(var i=0;i<tmpLoadedViews.length;i++){var tmpView=this.pict.views[tmpLoadedViews[i]];tmpViewsToMarshalToViews.push(tmpView);}for(var _i19=0;_i19<tmpViewsToMarshalToViews.length;_i19++){tmpAnticipate.anticipate(tmpViewsToMarshalToViews[_i19].marshalToViewAsync.bind(tmpViewsToMarshalToViews[_i19]));}tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this42.pict.LogNoisiness>2){_this42.log.trace("PictApp [".concat(_this42.UUID,"]::[").concat(_this42.Hash,"] ").concat(_this42.options.Name," marshalToViewsAsync() complete."));}_this42.lastMarshalToViewsTimestamp=_this42.fable.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterMarshalToViews",value:function onAfterMarshalToViews(){if(this.pict.LogNoisiness>3){this.log.trace("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," onAfterMarshalToViews:"));}return true;}},{key:"onAfterMarshalToViewsAsync",value:function onAfterMarshalToViewsAsync(fCallback){this.onAfterMarshalToViews();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Render View                              */ /* -------------------------------------------------------------------------- */},{key:"render",value:function render(pViewIdentifier,pRenderableHash,pRenderDestinationAddress,pTemplateDataAddress){var tmpViewIdentifier=typeof pViewIdentifier==='undefined'?this.options.MainViewportViewIdentifier:pViewIdentifier;var tmpRenderableHash=typeof pRenderableHash==='undefined'?this.options.MainViewportRenderableHash:pRenderableHash;var tmpRenderDestinationAddress=typeof pRenderDestinationAddress==='undefined'?this.options.MainViewportDestinationAddress:pRenderDestinationAddress;var tmpTemplateDataAddress=typeof pTemplateDataAddress==='undefined'?this.options.MainViewportDefaultDataAddress:pTemplateDataAddress;// Now get the view (by hash) from the loaded views
var tmpView=typeof tmpViewIdentifier==='string'?this.servicesMap.PictView[tmpViewIdentifier]:false;if(!tmpView){this.log.error("PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," could not render from View ").concat(tmpViewIdentifier," because it is not a valid view."));return false;}return tmpView.render(tmpRenderableHash,tmpRenderDestinationAddress,tmpTemplateDataAddress);}},{key:"renderMainViewport",value:function renderMainViewport(){return this.render(this.options.MainViewportViewIdentifier,this.options.MainViewportRenderableHash,this.options.MainViewportDestinationAddress,this.options.MainViewportDefaultDataAddress);}},{key:"renderAsync",value:function renderAsync(pViewIdentifier,pRenderableHash,pRenderDestinationAddress,pTemplateDataAddress,fCallback){var tmpViewIdentifier=typeof pViewIdentifier==='undefined'?this.options.MainViewportViewIdentifier:pViewIdentifier;var tmpRenderableHash=typeof pRenderableHash==='undefined'?this.options.MainViewportRenderableHash:pRenderableHash;var tmpRenderDestinationAddress=typeof pRenderDestinationAddress==='undefined'?this.options.MainViewportDestinationAddress:pRenderDestinationAddress;var tmpTemplateDataAddress=typeof pTemplateDataAddress==='undefined'?this.options.MainViewportDefaultDataAddress:pTemplateDataAddress;var tmpView=typeof tmpViewIdentifier==='string'?this.servicesMap.PictView[tmpViewIdentifier]:false;if(!tmpView){var tmpErrorMessage="PictApp [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.Name," could not asynchronously render from View ").concat(tmpViewIdentifier," because it is not a valid view.");if(this.pict.LogNoisiness>3){this.log.error(tmpErrorMessage);}return fCallback(new Error(tmpErrorMessage));}return tmpView.renderAsync(tmpRenderableHash,tmpRenderDestinationAddress,tmpTemplateDataAddress,fCallback);}},{key:"renderMainViewportAsync",value:function renderMainViewportAsync(fCallback){return this.renderAsync(this.options.MainViewportViewIdentifier,this.options.MainViewportRenderableHash,this.options.MainViewportDestinationAddress,this.options.MainViewportDefaultDataAddress,fCallback);}}]);return PictApplication;}(libFableServiceBase);module.exports=PictApplication;},{"fable-serviceproviderbase":44}],94:[function(require,module,exports){var libFableServiceBase=require('fable-serviceproviderbase');var defaultPictViewSettings={DefaultRenderable:false,DefaultDestinationAddress:false,DefaultTemplateRecordAddress:false,ViewIdentifier:false,// If this is set to true, when the App initializes this will.
// After the App initializes, initialize will be called as soon as it's added.
AutoInitialize:true,AutoInitializeOrdinal:0,// If this is set to true, when the App autorenders (on load) this will.
// After the App initializes, render will be called as soon as it's added.
AutoRender:true,AutoRenderOrdinal:0,AutoSolveWithApp:true,AutoSolveOrdinal:0,CSSHash:false,CSS:false,CSSProvider:false,CSSPriority:500,Templates:[],DefaultTemplates:[],Renderables:[],Manifests:{}};var PictView=/*#__PURE__*/function(_libFableServiceBase11){_inherits(PictView,_libFableServiceBase11);var _super23=_createSuper(PictView);function PictView(pFable,pOptions,pServiceHash){var _this43;_classCallCheck2(this,PictView);// Intersect default options, parent constructor, service information
var tmpOptions=Object.assign({},JSON.parse(JSON.stringify(defaultPictViewSettings)),pOptions);_this43=_super23.call(this,pFable,tmpOptions,pServiceHash);if(!_this43.options.ViewIdentifier){_this43.options.ViewIdentifier="AutoViewID-".concat(_this43.fable.getUUID());}_this43.serviceType='PictView';// Convenience and consistency naming
_this43.pict=_this43.fable;// Wire in the essential Pict application state
_this43.AppData=_this43.pict.AppData;_this43.initializeTimestamp=false;_this43.lastSolvedTimestamp=false;_this43.lastRenderedTimestamp=false;_this43.lastMarshalFromViewTimestamp=false;_this43.lastMarshalToViewTimestamp=false;// Load all templates from the array in the options
// Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
for(var i=0;i<_this43.options.Templates.length;i++){var tmpTemplate=_this43.options.Templates[i];if(!tmpTemplate.hasOwnProperty('Hash')||!tmpTemplate.hasOwnProperty('Template')){_this43.log.error("PictView [".concat(_this43.UUID,"]::[").concat(_this43.Hash,"] ").concat(_this43.options.ViewIdentifier," could not load Template ").concat(i," in the options array."),tmpTemplate);}else{if(!tmpTemplate.Source){tmpTemplate.Source="PictView [".concat(_this43.UUID,"]::[").concat(_this43.Hash,"] ").concat(_this43.options.ViewIdentifier," options object.");}_this43.pict.TemplateProvider.addTemplate(tmpTemplate.Hash,tmpTemplate.Template,tmpTemplate.Source);}}// Load all default templates from the array in the options
// Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
for(var _i20=0;_i20<_this43.options.DefaultTemplates.length;_i20++){var tmpDefaultTemplate=_this43.options.DefaultTemplates[_i20];if(!tmpDefaultTemplate.hasOwnProperty('Postfix')||!tmpDefaultTemplate.hasOwnProperty('Template')){_this43.log.error("PictView [".concat(_this43.UUID,"]::[").concat(_this43.Hash,"] ").concat(_this43.options.ViewIdentifier," could not load Default Template ").concat(_i20," in the options array."),tmpDefaultTemplate);}else{if(!tmpDefaultTemplate.Source){tmpDefaultTemplate.Source="PictView [".concat(_this43.UUID,"]::[").concat(_this43.Hash,"] ").concat(_this43.options.ViewIdentifier," options object.");}_this43.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix,tmpDefaultTemplate.Postfix,tmpDefaultTemplate.Template,tmpDefaultTemplate.Source);}}// Load the CSS if it's available
if(_this43.options.CSS){var tmpCSSHash=_this43.options.CSSHash?_this43.options.CSSHash:"View-".concat(_this43.options.ViewIdentifier);var tmpCSSProvider=_this43.options.CSSProvider?_this43.options.CSSProvider:tmpCSSHash;_this43.pict.CSSMap.addCSS(tmpCSSHash,_this43.options.CSS,tmpCSSProvider,_this43.options.CSSPriority);}// Load all renderables
// Renderables are launchable renderable instructions with templates
// They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
// The only parts that are necessary are Identifier and Template
// A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
_this43.renderables={};for(var _i21=0;_i21<_this43.options.Renderables.length;_i21++){var tmpRenderable=_this43.options.Renderables[_i21];_this43.addRenderable(_this43.options.Renderables[_i21]);}return _this43;}_createClass2(PictView,[{key:"addRenderable",value:function addRenderable(pRenderableHash,pTemplateHash,pDefaultTemplateDataAddress,pDefaultDestinationAddress,pRenderMethod){var tmpRenderable=false;if(_typeof(pRenderableHash)=='object'){// The developer passed in the renderable as an object.
// Use theirs instead!
tmpRenderable=pRenderableHash;}else{var tmpRenderMethod=typeof pRenderMethod!=='string'?pRenderMethod:'replace';tmpRenderable={RenderableHash:pRenderableHash,TemplateHash:pTemplateHash,DefaultTemplateDataAddress:pDefaultTemplateDataAddress,DefaultDestinationAddress:pDefaultDestinationAddress,RenderMethod:tmpRenderMethod};}if(typeof tmpRenderable.RenderableHash!='string'||typeof tmpRenderable.TemplateHash!='string'){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not load Renderable; RenderableHash or TemplateHash are invalid."),tmpRenderable);}else{if(this.pict.LogNoisiness>0){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," adding renderable [").concat(tmpRenderable.RenderableHash,"] pointed to template ").concat(tmpRenderable.TemplateHash,"."));}this.renderables[tmpRenderable.RenderableHash]=tmpRenderable;}}/* -------------------------------------------------------------------------- */ /*                        Code Section: Initialization                        */ /* -------------------------------------------------------------------------- */},{key:"onBeforeInitialize",value:function onBeforeInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onBeforeInitialize:"));}return true;}},{key:"onBeforeInitializeAsync",value:function onBeforeInitializeAsync(fCallback){this.onBeforeInitialize();return fCallback();}},{key:"onInitialize",value:function onInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onInitialize:"));}return true;}},{key:"onInitializeAsync",value:function onInitializeAsync(fCallback){this.onInitialize();return fCallback();}},{key:"initialize",value:function initialize(){if(!this.initializeTimestamp){this.onBeforeInitialize();this.onInitialize();this.onAfterInitialize();this.initializeTimestamp=this.pict.log.getTimeStamp();return true;}else{this.log.warn("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," initialize called but initialization is already completed.  Aborting."));return false;}}},{key:"initializeAsync",value:function initializeAsync(fCallback){var _this44=this;if(!this.initializeTimestamp){var tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');if(this.pict.LogNoisiness>0){this.log.info("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," beginning initialization..."));}tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));tmpAnticipate.wait(function(pError){_this44.initializeTimestamp=_this44.pict.log.getTimeStamp();if(_this44.pict.LogNoisiness>0){_this44.log.info("PictView [".concat(_this44.UUID,"]::[").concat(_this44.Hash,"] ").concat(_this44.options.ViewIdentifier," initialization complete."));}return fCallback();});}else{this.log.warn("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," async initialize called but initialization is already completed.  Aborting."));// TODO: Should this be an error?
return fCallback();}}},{key:"onAfterInitialize",value:function onAfterInitialize(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onAfterInitialize:"));}return true;}},{key:"onAfterInitializeAsync",value:function onAfterInitializeAsync(fCallback){this.onAfterInitialize();return fCallback();}/* -------------------------------------------------------------------------- */ /*                            Code Section: Render                            */ /* -------------------------------------------------------------------------- */},{key:"onBeforeRender",value:function onBeforeRender(pRenderable,pRenderDestinationAddress,pData){// Overload this to mess with stuff before the content gets generated from the template
if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onBeforeRender:"));}return true;}},{key:"onBeforeRenderAsync",value:function onBeforeRenderAsync(pRenderable,pRenderDestinationAddress,pData,fCallback){this.onBeforeRender(pRenderable,pRenderDestinationAddress,pData);return fCallback();}},{key:"render",value:function render(pRenderable,pRenderDestinationAddress,pTemplateDataAddress){var tmpRenderableHash=typeof pRenderable==='string'?pRenderable:typeof this.options.DefaultRenderable=='string'?this.options.DefaultRenderable:false;if(!tmpRenderableHash){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it is not a valid renderable."));return false;}var tmpRenderable=this.renderables[tmpRenderableHash];if(!tmpRenderable){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it does not exist."));return false;}var tmpRenderDestinationAddress=typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderable.ContentDestinationAddress==='string'?tmpRenderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:false;if(!tmpRenderDestinationAddress){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it does not have a valid destination address."));return false;}var tmpDataAddress=typeof pTemplateDataAddress==='string'?pTemplateDataAddress:typeof tmpRenderable.DefaultTemplateRecordAddress==='string'?tmpRenderable.DefaultTemplateRecordAddress:typeof this.options.DefaultTemplateRecordAddress==='string'?this.options.DefaultTemplateRecordAddress:false;var tmpData=typeof tmpDataAddress==='string'?this.pict.DataProvider.getDataByAddress(tmpDataAddress):undefined;// Execute the developer-overridable pre-render behavior
this.onBeforeRender(tmpRenderable,tmpRenderDestinationAddress,tmpData);// Generate the content output from the template and data
var tmpContent=this.pict.parseTemplateByHash(tmpRenderable.TemplateHash,tmpData);// Assign the content to the destination address
switch(tmpRenderable.RenderMethod){case'append':this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress,tmpContent);break;case'prepend':this.pict.ContentAssignment.prependContent(tmpRenderDestinationAddress,tmpContent);break;case'append_once':// Try to find the content in the destination address
var tmpExistingContent=this.pict.ContentAssignment.getElement("#".concat(tmpRenderableHash));if(tmpExistingContent.length<1){this.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress,tmpContent);}case'replace':default:this.pict.ContentAssignment.assignContent(tmpRenderDestinationAddress,tmpContent);break;}// Execute the developer-overridable post-render behavior
this.onAfterRender(tmpRenderable,tmpRenderDestinationAddress,tmpData,tmpContent);this.lastRenderedTimestamp=this.pict.log.getTimeStamp();return true;}},{key:"renderAsync",value:function renderAsync(pRenderable,pRenderDestinationAddress,pTemplateDataAddress,fCallback){var _this45=this;var tmpRenderableHash=typeof pRenderable==='string'?pRenderable:typeof this.options.DefaultRenderable=='string'?this.options.DefaultRenderable:false;if(!tmpRenderableHash){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not asynchronously render ").concat(tmpRenderableHash," (param ").concat(pRenderable,"because it is not a valid renderable."));return fCallback(Error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not asynchronously render ").concat(tmpRenderableHash," (param ").concat(pRenderable,"because it is not a valid renderable.")));}var tmpRenderable=this.renderables[tmpRenderableHash];if(!tmpRenderable){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it does not exist."));return fCallback(Error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it does not exist.")));}var tmpRenderDestinationAddress=typeof pRenderDestinationAddress==='string'?pRenderDestinationAddress:typeof tmpRenderable.ContentDestinationAddress==='string'?tmpRenderable.ContentDestinationAddress:typeof this.options.DefaultDestinationAddress==='string'?this.options.DefaultDestinationAddress:false;if(!tmpRenderDestinationAddress){this.log.error("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," could not render ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it does not have a valid destination address."));return fCallback(Error("Could not render ".concat(tmpRenderableHash)));}var tmpDataAddress=typeof pTemplateDataAddress==='string'?pTemplateDataAddress:typeof tmpRenderable.DefaultTemplateRecordAddress==='string'?tmpRenderable.DefaultTemplateRecordAddress:typeof this.options.DefaultTemplateRecordAddress==='string'?this.options.DefaultTemplateRecordAddress:false;var tmpData=typeof tmpDataAddress==='string'?this.pict.DataProvider.getDataByAddress(tmpDataAddress):undefined;// Execute the developer-overridable pre-render behavior
this.onBeforeRender(tmpRenderable,tmpRenderDestinationAddress,tmpData);// Render the template (asynchronously)
this.pict.parseTemplateByHash(tmpRenderable.TemplateHash,tmpData,function(pError,pContent){if(pError){_this45.log.error("PictView [".concat(_this45.UUID,"]::[").concat(_this45.Hash,"] ").concat(_this45.options.ViewIdentifier," could not render (asynchronously) ").concat(tmpRenderableHash," (param ").concat(pRenderable,") because it did not parse the template."),pError);return fCallback(pError);}// Assign the content to the destination address
switch(tmpRenderable.RenderMethod){case'append':_this45.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress,pContent);break;case'prepend':_this45.pict.ContentAssignment.prependContent(tmpRenderDestinationAddress,pContent);break;case'append_once':// Try to find the content in the destination address
var tmpExistingContent=_this45.pict.ContentAssignment.getElement("#".concat(tmpRenderableHash));if(tmpExistingContent.length<1){_this45.pict.ContentAssignment.appendContent(tmpRenderDestinationAddress,pContent);}case'replace':default:_this45.pict.ContentAssignment.assignContent(tmpRenderDestinationAddress,pContent);break;}// Execute the developer-overridable asynchronous post-render behavior
_this45.lastRenderedTimestamp=_this45.pict.log.getTimeStamp();return _this45.onAfterRenderAsync(fCallback,pContent);});}},{key:"onAfterRender",value:function onAfterRender(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onAfterRender:"));}return true;}},{key:"onAfterRenderAsync",value:function onAfterRenderAsync(fCallback){this.onAfterRender();return fCallback();}/* -------------------------------------------------------------------------- */ /*                            Code Section: Solver                            */ /* -------------------------------------------------------------------------- */},{key:"onBeforeSolve",value:function onBeforeSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onBeforeSolve:"));}return true;}},{key:"onBeforeSolveAsync",value:function onBeforeSolveAsync(fCallback){this.onBeforeSolve();return fCallback();}},{key:"onSolve",value:function onSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onSolve:"));}return true;}},{key:"onSolveAsync",value:function onSolveAsync(fCallback){this.onSolve();return fCallback();}},{key:"solve",value:function solve(){if(this.pict.LogNoisiness>2){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," executing solve() function..."));}this.onBeforeSolve();this.onSolve();this.onAfterSolve();this.lastSolvedTimestamp=this.pict.log.getTimeStamp();return true;}},{key:"solveAsync",value:function solveAsync(fCallback){var _this46=this;var tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));tmpAnticipate.anticipate(this.onSolveAsync.bind(this));tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this46.pict.LogNoisiness>2){_this46.log.trace("PictView [".concat(_this46.UUID,"]::[").concat(_this46.Hash,"] ").concat(_this46.options.ViewIdentifier," solveAsync() complete."));}_this46.lastSolvedTimestamp=_this46.pict.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterSolve",value:function onAfterSolve(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onAfterSolve:"));}return true;}},{key:"onAfterSolveAsync",value:function onAfterSolveAsync(fCallback){this.onAfterSolve();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Marshal From View                        */ /* -------------------------------------------------------------------------- */},{key:"onBeforeMarshalFromView",value:function onBeforeMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onBeforeMarshalFromView:"));}return true;}},{key:"onBeforeMarshalFromViewAsync",value:function onBeforeMarshalFromViewAsync(fCallback){this.onBeforeMarshalFromView();return fCallback();}},{key:"onMarshalFromView",value:function onMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onMarshalFromView:"));}return true;}},{key:"onMarshalFromViewAsync",value:function onMarshalFromViewAsync(fCallback){this.onMarshalFromView();return fCallback();}},{key:"marshalFromView",value:function marshalFromView(){if(this.pict.LogNoisiness>2){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," executing solve() function..."));}this.onBeforeMarshalFromView();this.onMarshalFromView();this.onAfterMarshalFromView();this.lastMarshalFromViewTimestamp=this.pict.log.getTimeStamp();return true;}},{key:"marshalFromViewAsync",value:function marshalFromViewAsync(fCallback){var _this47=this;var tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeMarshalFromViewAsync.bind(this));tmpAnticipate.anticipate(this.onMarshalFromViewAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalFromViewAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this47.pict.LogNoisiness>2){_this47.log.trace("PictView [".concat(_this47.UUID,"]::[").concat(_this47.Hash,"] ").concat(_this47.options.ViewIdentifier," solveAsync() complete."));}_this47.lastMarshalFromViewTimestamp=_this47.pict.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterMarshalFromView",value:function onAfterMarshalFromView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onAfterMarshalFromView:"));}return true;}},{key:"onAfterMarshalFromViewAsync",value:function onAfterMarshalFromViewAsync(fCallback){this.onAfterMarshalFromView();return fCallback();}/* -------------------------------------------------------------------------- */ /*                     Code Section: Marshal To View                          */ /* -------------------------------------------------------------------------- */},{key:"onBeforeMarshalToView",value:function onBeforeMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onBeforeMarshalToView:"));}return true;}},{key:"onBeforeMarshalToViewAsync",value:function onBeforeMarshalToViewAsync(fCallback){this.onBeforeMarshalToView();return fCallback();}},{key:"onMarshalToView",value:function onMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onMarshalToView:"));}return true;}},{key:"onMarshalToViewAsync",value:function onMarshalToViewAsync(fCallback){this.onMarshalToView();return fCallback();}},{key:"marshalToView",value:function marshalToView(){if(this.pict.LogNoisiness>2){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," executing solve() function..."));}this.onBeforeMarshalToView();this.onMarshalToView();this.onAfterMarshalToView();this.lastMarshalToViewTimestamp=this.pict.log.getTimeStamp();return true;}},{key:"marshalToViewAsync",value:function marshalToViewAsync(fCallback){var _this48=this;var tmpAnticipate=this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');tmpAnticipate.anticipate(this.onBeforeMarshalToViewAsync.bind(this));tmpAnticipate.anticipate(this.onMarshalToViewAsync.bind(this));tmpAnticipate.anticipate(this.onAfterMarshalToViewAsync.bind(this));tmpAnticipate.wait(function(pError){if(_this48.pict.LogNoisiness>2){_this48.log.trace("PictView [".concat(_this48.UUID,"]::[").concat(_this48.Hash,"] ").concat(_this48.options.ViewIdentifier," solveAsync() complete."));}_this48.lastMarshalToViewTimestamp=_this48.pict.log.getTimeStamp();return fCallback(pError);});}},{key:"onAfterMarshalToView",value:function onAfterMarshalToView(){if(this.pict.LogNoisiness>3){this.log.trace("PictView [".concat(this.UUID,"]::[").concat(this.Hash,"] ").concat(this.options.ViewIdentifier," onAfterMarshalToView:"));}return true;}},{key:"onAfterMarshalToViewAsync",value:function onAfterMarshalToViewAsync(fCallback){this.onAfterMarshalToView();return fCallback();}}]);return PictView;}(libFableServiceBase);module.exports=PictView;},{"fable-serviceproviderbase":44}],95:[function(require,module,exports){/**
* Precedent Meta-Templating
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Process text streams, parsing out meta-template expressions.
*/var libWordTree=require("./WordTree.js");var libStringParser=require("./StringParser.js");var Precedent=/*#__PURE__*/function(){/**
	 * Precedent Constructor
	 */function Precedent(){_classCallCheck2(this,Precedent);this.WordTree=new libWordTree();this.StringParser=new libStringParser();this.ParseTree=this.WordTree.ParseTree;}/**
	 * Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pTree - A node on the parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @param {number} pIndex - callback function
	 * @return {bool} True if adding the pattern was successful
	 */_createClass2(Precedent,[{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,pParser){return this.WordTree.addPattern(pPatternStart,pPatternEnd,pParser);}/**
	 * Parse a string with the existing parse tree
	 * @method parseString
	 * @param {string} pString - The string to parse
	 * @param {object} pData - Data to pass in as the second argument
	 * @return {string} The result from the parser
	 */},{key:"parseString",value:function parseString(pString,pData){return this.StringParser.parseString(pString,this.ParseTree,pData);}}]);return Precedent;}();module.exports=Precedent;},{"./StringParser.js":96,"./WordTree.js":97}],96:[function(require,module,exports){/**
* String Parser
* @author      Steven Velozo <steven@velozo.com>
* @description Parse a string, properly processing each matched token in the word tree.
*/var StringParser=/*#__PURE__*/function(){/**
	 * StringParser Constructor
	 */function StringParser(){_classCallCheck2(this,StringParser);}/**
	 * Create a fresh parsing state object to work with.
	 * @method newParserState
	 * @param {Object} pParseTree - A node on the parse tree to begin parsing from (usually root)
	 * @return {Object} A new parser state object for running a character parser on
	 * @private
	 */_createClass2(StringParser,[{key:"newParserState",value:function newParserState(pParseTree){return{ParseTree:pParseTree,Asynchronous:false,Output:'',OutputBuffer:'',Pattern:{},PatternMatch:false,PatternMatchEnd:false};}/**
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
	 */},{key:"flushOutputBuffer",value:function flushOutputBuffer(pParserState){pParserState.Output+=pParserState.OutputBuffer;pParserState.OutputBuffer='';}},{key:"resetOutputBuffer",value:function resetOutputBuffer(pParserState){// Flush the output buffer.
this.flushOutputBuffer(pParserState);// End pattern mode
pParserState.Pattern=false;pParserState.PatternStartNode=false;pParserState.StartPatternMatchComplete=false;pParserState.EndPatternMatchBegan=false;pParserState.PatternMatch=false;return true;}/**
	 * Parse a character in the buffer.
	 * @method parseCharacter
	 * @param {string} pCharacter - The character to append
	 * @param {Object} pParserState - The state object for the current parsing task
	 * @private
	 */},{key:"parseCharacter",value:function parseCharacter(pCharacter,pParserState,pData){// If we are already in a pattern match traversal
if(pParserState.PatternMatch){// If the pattern is still matching the start and we haven't passed the buffer
if(!pParserState.StartPatternMatchComplete&&pParserState.Pattern.hasOwnProperty(pCharacter)){pParserState.Pattern=pParserState.Pattern[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else if(pParserState.EndPatternMatchBegan){if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// Flush the output buffer.
this.appendOutputBuffer(pCharacter,pParserState);// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){// Run the function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);return this.resetOutputBuffer(pParserState);}}else if(pParserState.PatternStartNode.PatternEnd.hasOwnProperty(pCharacter)){// We broke out of the end -- see if this is a new start of the end.
pParserState.Pattern=pParserState.PatternStartNode.PatternEnd[pCharacter];this.appendOutputBuffer(pCharacter,pParserState);}else{pParserState.EndPatternMatchBegan=false;this.appendOutputBuffer(pCharacter,pParserState);}}else if(pParserState.Pattern.hasOwnProperty('PatternEnd')){if(!pParserState.StartPatternMatchComplete){pParserState.StartPatternMatchComplete=true;pParserState.PatternStartNode=pParserState.Pattern;}this.appendOutputBuffer(pCharacter,pParserState);if(pParserState.Pattern.PatternEnd.hasOwnProperty(pCharacter)){// This is the first character of the end pattern.
pParserState.EndPatternMatchBegan=true;// This leaf has a PatternEnd tree, so we will wait until that end is met.
pParserState.Pattern=pParserState.Pattern.PatternEnd[pCharacter];// If this last character is the end of the pattern, parse it.
if(pParserState.Pattern.hasOwnProperty('Parse')){// Run the t*mplate function
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStartString.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStartString.length+pParserState.Pattern.PatternEndString.length)),pData);return this.resetOutputBuffer(pParserState);}}}else{// We are in a pattern start but didn't match one; reset and start trying again from this character.
this.resetOutputBuffer(pParserState);}}// If we aren't in a pattern match or pattern, and this isn't the start of a new pattern (RAW mode)....
if(!pParserState.PatternMatch){// This may be the start of a new pattern....
if(pParserState.ParseTree.hasOwnProperty(pCharacter)){// ... assign the root node as the matched node.
this.resetOutputBuffer(pParserState);this.appendOutputBuffer(pCharacter,pParserState);pParserState.Pattern=pParserState.ParseTree[pCharacter];pParserState.PatternMatch=true;return true;}else{this.appendOutputBuffer(pCharacter,pParserState);}}return false;}/**
	 * Parse a string for matches, and process any template segments that occur.
	 * @method parseString
	 * @param {string} pString - The string to parse.
	 * @param {Object} pParseTree - The parse tree to begin parsing from (usually root)
	 * @param {Object} pData - The data to pass to the function as a second parameter
	 */},{key:"parseString",value:function parseString(pString,pParseTree,pData){var tmpParserState=this.newParserState(pParseTree);for(var i=0;i<pString.length;i++){this.parseCharacter(pString[i],tmpParserState,pData);}this.flushOutputBuffer(tmpParserState);return tmpParserState.Output;}}]);return StringParser;}();module.exports=StringParser;},{}],97:[function(require,module,exports){/**
* Word Tree
* @author      Steven Velozo <steven@velozo.com>
* @description Create a tree (directed graph) of Javascript objects, one character per object.
*/var WordTree=/*#__PURE__*/function(){/**
	 * WordTree Constructor
	 */function WordTree(){_classCallCheck2(this,WordTree);this.ParseTree={};}/**
	 * Add a child character to a Parse Tree node
	 * @method addChild
	 * @param {Object} pTree - A parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @returns {Object} The resulting leaf node that was added (or found)
	 * @private
	 */_createClass2(WordTree,[{key:"addChild",value:function addChild(pTree,pPattern){if(!pTree.hasOwnProperty(pPattern)){pTree[pPattern]={};}return pTree[pPattern];}/**
	 * Add a child character to a Parse Tree PatternEnd subtree
	 * @method addChild
	 * @param {Object} pTree - A parse tree to push the characters into
	 * @param {string} pPattern - The string to add to the tree
	 * @returns {Object} The resulting leaf node that was added (or found)
	 * @private
	 */},{key:"addEndChild",value:function addEndChild(pTree,pPattern){if(!pTree.hasOwnProperty('PatternEnd')){pTree.PatternEnd={};}pTree.PatternEnd[pPattern]={};return pTree.PatternEnd[pPattern];}/** Add a Pattern to the Parse Tree
	 * @method addPattern
	 * @param {Object} pPatternStart - The starting string for the pattern (e.g. "${")
	 * @param {string} pPatternEnd - The ending string for the pattern (e.g. "}")
	 * @param {function} fParser - The function to parse if this is the matched pattern, once the Pattern End is met.  If this is a string, a simple replacement occurs.
	 * @return {bool} True if adding the pattern was successful
	 */},{key:"addPattern",value:function addPattern(pPatternStart,pPatternEnd,fParser){if(pPatternStart.length<1){return false;}if(typeof pPatternEnd==='string'&&pPatternEnd.length<1){return false;}var tmpLeaf=this.ParseTree;// Add the tree of leaves iteratively
for(var i=0;i<pPatternStart.length;i++){tmpLeaf=this.addChild(tmpLeaf,pPatternStart[i],i);}if(!tmpLeaf.hasOwnProperty('PatternEnd')){tmpLeaf.PatternEnd={};}var tmpPatternEnd=typeof pPatternEnd==='string'?pPatternEnd:pPatternStart;for(var _i22=0;_i22<tmpPatternEnd.length;_i22++){tmpLeaf=this.addEndChild(tmpLeaf,tmpPatternEnd[_i22],_i22);}tmpLeaf.PatternStartString=pPatternStart;tmpLeaf.PatternEndString=tmpPatternEnd;tmpLeaf.Parse=typeof fParser==='function'?fParser:typeof fParser==='string'?function(){return fParser;}:function(pData){return pData;};return true;}}]);return WordTree;}();module.exports=WordTree;},{}],98:[function(require,module,exports){// shim for using process in browser
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
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],99:[function(require,module,exports){(function(global){(function(){/*! https://mths.be/punycode v1.4.1 by @mathias */;(function(root){/** Detect free variables */var freeExports=_typeof(exports)=='object'&&exports&&!exports.nodeType&&exports;var freeModule=_typeof(module)=='object'&&module&&!module.nodeType&&module;var freeGlobal=_typeof(global)=='object'&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal;}/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var punycode,/** Highest positive signed 32-bit float value */maxInt=2147483647,// aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,// 0x80
delimiter='-',// '\x2D'
/** Regular expressions */regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,// unprintable ASCII chars + non-ASCII chars
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,// RFC 3490 separators
/** Error messages */errors={'overflow':'Overflow: input needs wider integers to process','not-basic':'Illegal input >= 0x80 (not a basic code point)','invalid-input':'Invalid input'},/** Convenience shortcuts */baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,/** Temporary variable */key;/*--------------------------------------------------------------------------*/ /**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function error(type){throw new RangeError(errors[type]);}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length]);}return result;}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function mapDomain(string,fn){var parts=string.split('@');var result='';if(parts.length>1){// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
result=parts[0]+'@';string=parts[1];}// Avoid `split(regex)` for IE8 compatibility. See #17.
string=string.replace(regexSeparators,'\x2E');var labels=string.split('.');var encoded=map(labels,fn).join('.');return result+encoded;}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=0xD800&&value<=0xDBFF&&counter<length){// high surrogate, and there is a next character
extra=string.charCodeAt(counter++);if((extra&0xFC00)==0xDC00){// low surrogate
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);}else{// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else{output.push(value);}}return output;}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function ucs2encode(array){return map(array,function(value){var output='';if(value>0xFFFF){value-=0x10000;output+=stringFromCharCode(value>>>10&0x3FF|0xD800);value=0xDC00|value&0x3FF;}output+=stringFromCharCode(value);return output;}).join('');}/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22;}if(codePoint-65<26){return codePoint-65;}if(codePoint-97<26){return codePoint-97;}return base;}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function digitToBasic(digit,flag){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return digit+22+75*(digit<26)-((flag!=0)<<5);}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for/* no initialization */(;delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin);}return floor(k+(baseMinusTMin+1)*delta/(delta+skew));}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function decode(input){// Don't use UCS-2
var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,/** Cached calculation results */baseMinusT;// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
basic=input.lastIndexOf(delimiter);if(basic<0){basic=0;}for(j=0;j<basic;++j){// if it's not a basic code point
if(input.charCodeAt(j)>=0x80){error('not-basic');}output.push(input.charCodeAt(j));}// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for/* no final expression */(index=basic>0?basic+1:0;index<inputLength;){// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for/* no condition */(oldi=i,w=1,k=base;;k+=base){if(index>=inputLength){error('invalid-input');}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error('overflow');}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break;}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error('overflow');}w*=baseMinusT;}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);// `i` was supposed to wrap around from `out` to `0`,
// incrementing `n` each time, so we'll fix that now:
if(floor(i/out)>maxInt-n){error('overflow');}n+=floor(i/out);i%=out;// Insert `n` at position `i` of the output
output.splice(i++,0,n);}return ucs2encode(output);}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],/** `inputLength` will hold the number of code points in `input`. */inputLength,/** Cached calculation results */handledCPCountPlusOne,baseMinusT,qMinusT;// Convert the input in UCS-2 to Unicode
input=ucs2decode(input);// Cache the length
inputLength=input.length;// Initialize the state
n=initialN;delta=0;bias=initialBias;// Handle the basic code points
for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<0x80){output.push(stringFromCharCode(currentValue));}}handledCPCount=basicLength=output.length;// `handledCPCount` is the number of code points that have been handled;
// `basicLength` is the number of basic code points.
// Finish the basic string - if it is not empty - with a delimiter
if(basicLength){output.push(delimiter);}// Main encoding loop:
while(handledCPCount<inputLength){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue;}}// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error('overflow');}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error('overflow');}if(currentValue==n){// Represent delta as a generalized variable-length integer
for/* no condition */(q=delta,k=base;;k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break;}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT);}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount;}}++delta;++n;}return output.join('');}/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string;});}/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?'xn--'+encode(string):string;});}/*--------------------------------------------------------------------------*/ /** Define the public API */punycode={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */'version':'1.4.1',/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */'ucs2':{'decode':ucs2decode,'encode':ucs2encode},'decode':decode,'encode':encode,'toASCII':toASCII,'toUnicode':toUnicode};/** Expose `punycode` */ // Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(typeof define=='function'&&_typeof(define.amd)=='object'&&define.amd){define('punycode',function(){return punycode;});}else if(freeExports&&freeModule){if(module.exports==freeExports){// in Node.js, io.js, or RingoJS v0.8.0+
freeModule.exports=punycode;}else{// in Narwhal or RingoJS v0.7.0-
for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);}}}else{// in Rhino or a web browser
root.punycode=punycode;}})(this);}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],100:[function(require,module,exports){'use strict';var replace=String.prototype.replace;var percentTwenties=/%20/g;var Format={RFC1738:'RFC1738',RFC3986:'RFC3986'};module.exports={'default':Format.RFC3986,formatters:{RFC1738:function RFC1738(value){return replace.call(value,percentTwenties,'+');},RFC3986:function RFC3986(value){return String(value);}},RFC1738:Format.RFC1738,RFC3986:Format.RFC3986};},{}],101:[function(require,module,exports){'use strict';var stringify=require('./stringify');var parse=require('./parse');var formats=require('./formats');module.exports={formats:formats,parse:parse,stringify:stringify};},{"./formats":100,"./parse":102,"./stringify":103}],102:[function(require,module,exports){'use strict';var utils=require('./utils');var has=Object.prototype.hasOwnProperty;var isArray=Array.isArray;var defaults={allowDots:false,allowPrototypes:false,allowSparse:false,arrayLimit:20,charset:'utf-8',charsetSentinel:false,comma:false,decoder:utils.decode,delimiter:'&',depth:5,ignoreQueryPrefix:false,interpretNumericEntities:false,parameterLimit:1000,parseArrays:true,plainObjects:false,strictNullHandling:false};var interpretNumericEntities=function interpretNumericEntities(str){return str.replace(/&#(\d+);/g,function($0,numberStr){return String.fromCharCode(parseInt(numberStr,10));});};var parseArrayValue=function parseArrayValue(val,options){if(val&&typeof val==='string'&&options.comma&&val.indexOf(',')>-1){return val.split(',');}return val;};// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel='utf8=%26%2310003%3B';// encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel='utf8=%E2%9C%93';// encodeURIComponent('✓')
var parseValues=function parseQueryStringValues(str,options){var obj={__proto__:null};var cleanStr=options.ignoreQueryPrefix?str.replace(/^\?/,''):str;var limit=options.parameterLimit===Infinity?undefined:options.parameterLimit;var parts=cleanStr.split(options.delimiter,limit);var skipIndex=-1;// Keep track of where the utf8 sentinel was found
var i;var charset=options.charset;if(options.charsetSentinel){for(i=0;i<parts.length;++i){if(parts[i].indexOf('utf8=')===0){if(parts[i]===charsetSentinel){charset='utf-8';}else if(parts[i]===isoSentinel){charset='iso-8859-1';}skipIndex=i;i=parts.length;// The eslint settings do not allow break;
}}}for(i=0;i<parts.length;++i){if(i===skipIndex){continue;}var part=parts[i];var bracketEqualsPos=part.indexOf(']=');var pos=bracketEqualsPos===-1?part.indexOf('='):bracketEqualsPos+1;var key,val;if(pos===-1){key=options.decoder(part,defaults.decoder,charset,'key');val=options.strictNullHandling?null:'';}else{key=options.decoder(part.slice(0,pos),defaults.decoder,charset,'key');val=utils.maybeMap(parseArrayValue(part.slice(pos+1),options),function(encodedVal){return options.decoder(encodedVal,defaults.decoder,charset,'value');});}if(val&&options.interpretNumericEntities&&charset==='iso-8859-1'){val=interpretNumericEntities(val);}if(part.indexOf('[]=')>-1){val=isArray(val)?[val]:val;}if(has.call(obj,key)){obj[key]=utils.combine(obj[key],val);}else{obj[key]=val;}}return obj;};var parseObject=function parseObject(chain,val,options,valuesParsed){var leaf=valuesParsed?val:parseArrayValue(val,options);for(var i=chain.length-1;i>=0;--i){var obj;var root=chain[i];if(root==='[]'&&options.parseArrays){obj=[].concat(leaf);}else{obj=options.plainObjects?Object.create(null):{};var cleanRoot=root.charAt(0)==='['&&root.charAt(root.length-1)===']'?root.slice(1,-1):root;var index=parseInt(cleanRoot,10);if(!options.parseArrays&&cleanRoot===''){obj={0:leaf};}else if(!isNaN(index)&&root!==cleanRoot&&String(index)===cleanRoot&&index>=0&&options.parseArrays&&index<=options.arrayLimit){obj=[];obj[index]=leaf;}else if(cleanRoot!=='__proto__'){obj[cleanRoot]=leaf;}}leaf=obj;}return leaf;};var parseKeys=function parseQueryStringKeys(givenKey,val,options,valuesParsed){if(!givenKey){return;}// Transform dot notation to bracket notation
var key=options.allowDots?givenKey.replace(/\.([^.[]+)/g,'[$1]'):givenKey;// The regex chunks
var brackets=/(\[[^[\]]*])/;var child=/(\[[^[\]]*])/g;// Get the parent
var segment=options.depth>0&&brackets.exec(key);var parent=segment?key.slice(0,segment.index):key;// Stash the parent if it exists
var keys=[];if(parent){// If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
if(!options.plainObjects&&has.call(Object.prototype,parent)){if(!options.allowPrototypes){return;}}keys.push(parent);}// Loop through children appending to the array until we hit depth
var i=0;while(options.depth>0&&(segment=child.exec(key))!==null&&i<options.depth){i+=1;if(!options.plainObjects&&has.call(Object.prototype,segment[1].slice(1,-1))){if(!options.allowPrototypes){return;}}keys.push(segment[1]);}// If there's a remainder, just add whatever is left
if(segment){keys.push('['+key.slice(segment.index)+']');}return parseObject(keys,val,options,valuesParsed);};var normalizeParseOptions=function normalizeParseOptions(opts){if(!opts){return defaults;}if(opts.decoder!==null&&opts.decoder!==undefined&&typeof opts.decoder!=='function'){throw new TypeError('Decoder has to be a function.');}if(typeof opts.charset!=='undefined'&&opts.charset!=='utf-8'&&opts.charset!=='iso-8859-1'){throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');}var charset=typeof opts.charset==='undefined'?defaults.charset:opts.charset;return{allowDots:typeof opts.allowDots==='undefined'?defaults.allowDots:!!opts.allowDots,allowPrototypes:typeof opts.allowPrototypes==='boolean'?opts.allowPrototypes:defaults.allowPrototypes,allowSparse:typeof opts.allowSparse==='boolean'?opts.allowSparse:defaults.allowSparse,arrayLimit:typeof opts.arrayLimit==='number'?opts.arrayLimit:defaults.arrayLimit,charset:charset,charsetSentinel:typeof opts.charsetSentinel==='boolean'?opts.charsetSentinel:defaults.charsetSentinel,comma:typeof opts.comma==='boolean'?opts.comma:defaults.comma,decoder:typeof opts.decoder==='function'?opts.decoder:defaults.decoder,delimiter:typeof opts.delimiter==='string'||utils.isRegExp(opts.delimiter)?opts.delimiter:defaults.delimiter,// eslint-disable-next-line no-implicit-coercion, no-extra-parens
depth:typeof opts.depth==='number'||opts.depth===false?+opts.depth:defaults.depth,ignoreQueryPrefix:opts.ignoreQueryPrefix===true,interpretNumericEntities:typeof opts.interpretNumericEntities==='boolean'?opts.interpretNumericEntities:defaults.interpretNumericEntities,parameterLimit:typeof opts.parameterLimit==='number'?opts.parameterLimit:defaults.parameterLimit,parseArrays:opts.parseArrays!==false,plainObjects:typeof opts.plainObjects==='boolean'?opts.plainObjects:defaults.plainObjects,strictNullHandling:typeof opts.strictNullHandling==='boolean'?opts.strictNullHandling:defaults.strictNullHandling};};module.exports=function(str,opts){var options=normalizeParseOptions(opts);if(str===''||str===null||typeof str==='undefined'){return options.plainObjects?Object.create(null):{};}var tempObj=typeof str==='string'?parseValues(str,options):str;var obj=options.plainObjects?Object.create(null):{};// Iterate over the keys and setup the new object
var keys=Object.keys(tempObj);for(var i=0;i<keys.length;++i){var key=keys[i];var newObj=parseKeys(key,tempObj[key],options,typeof str==='string');obj=utils.merge(obj,newObj,options);}if(options.allowSparse===true){return obj;}return utils.compact(obj);};},{"./utils":104}],103:[function(require,module,exports){'use strict';var getSideChannel=require('side-channel');var utils=require('./utils');var formats=require('./formats');var has=Object.prototype.hasOwnProperty;var arrayPrefixGenerators={brackets:function brackets(prefix){return prefix+'[]';},comma:'comma',indices:function indices(prefix,key){return prefix+'['+key+']';},repeat:function repeat(prefix){return prefix;}};var isArray=Array.isArray;var push=Array.prototype.push;var pushToArray=function pushToArray(arr,valueOrArray){push.apply(arr,isArray(valueOrArray)?valueOrArray:[valueOrArray]);};var toISO=Date.prototype.toISOString;var defaultFormat=formats['default'];var defaults={addQueryPrefix:false,allowDots:false,charset:'utf-8',charsetSentinel:false,delimiter:'&',encode:true,encoder:utils.encode,encodeValuesOnly:false,format:defaultFormat,formatter:formats.formatters[defaultFormat],// deprecated
indices:false,serializeDate:function serializeDate(date){return toISO.call(date);},skipNulls:false,strictNullHandling:false};var isNonNullishPrimitive=function isNonNullishPrimitive(v){return typeof v==='string'||typeof v==='number'||typeof v==='boolean'||_typeof(v)==='symbol'||typeof v==='bigint';};var sentinel={};var stringify=function stringify(object,prefix,generateArrayPrefix,commaRoundTrip,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,format,formatter,encodeValuesOnly,charset,sideChannel){var obj=object;var tmpSc=sideChannel;var step=0;var findFlag=false;while((tmpSc=tmpSc.get(sentinel))!==void undefined&&!findFlag){// Where object last appeared in the ref tree
var pos=tmpSc.get(object);step+=1;if(typeof pos!=='undefined'){if(pos===step){throw new RangeError('Cyclic object value');}else{findFlag=true;// Break while
}}if(typeof tmpSc.get(sentinel)==='undefined'){step=0;}}if(typeof filter==='function'){obj=filter(prefix,obj);}else if(obj instanceof Date){obj=serializeDate(obj);}else if(generateArrayPrefix==='comma'&&isArray(obj)){obj=utils.maybeMap(obj,function(value){if(value instanceof Date){return serializeDate(value);}return value;});}if(obj===null){if(strictNullHandling){return encoder&&!encodeValuesOnly?encoder(prefix,defaults.encoder,charset,'key',format):prefix;}obj='';}if(isNonNullishPrimitive(obj)||utils.isBuffer(obj)){if(encoder){var keyValue=encodeValuesOnly?prefix:encoder(prefix,defaults.encoder,charset,'key',format);return[formatter(keyValue)+'='+formatter(encoder(obj,defaults.encoder,charset,'value',format))];}return[formatter(prefix)+'='+formatter(String(obj))];}var values=[];if(typeof obj==='undefined'){return values;}var objKeys;if(generateArrayPrefix==='comma'&&isArray(obj)){// we need to join elements in
if(encodeValuesOnly&&encoder){obj=utils.maybeMap(obj,encoder);}objKeys=[{value:obj.length>0?obj.join(',')||null:void undefined}];}else if(isArray(filter)){objKeys=filter;}else{var keys=Object.keys(obj);objKeys=sort?keys.sort(sort):keys;}var adjustedPrefix=commaRoundTrip&&isArray(obj)&&obj.length===1?prefix+'[]':prefix;for(var j=0;j<objKeys.length;++j){var key=objKeys[j];var value=_typeof(key)==='object'&&typeof key.value!=='undefined'?key.value:obj[key];if(skipNulls&&value===null){continue;}var keyPrefix=isArray(obj)?typeof generateArrayPrefix==='function'?generateArrayPrefix(adjustedPrefix,key):adjustedPrefix:adjustedPrefix+(allowDots?'.'+key:'['+key+']');sideChannel.set(object,step);var valueSideChannel=getSideChannel();valueSideChannel.set(sentinel,sideChannel);pushToArray(values,stringify(value,keyPrefix,generateArrayPrefix,commaRoundTrip,strictNullHandling,skipNulls,generateArrayPrefix==='comma'&&encodeValuesOnly&&isArray(obj)?null:encoder,filter,sort,allowDots,serializeDate,format,formatter,encodeValuesOnly,charset,valueSideChannel));}return values;};var normalizeStringifyOptions=function normalizeStringifyOptions(opts){if(!opts){return defaults;}if(opts.encoder!==null&&typeof opts.encoder!=='undefined'&&typeof opts.encoder!=='function'){throw new TypeError('Encoder has to be a function.');}var charset=opts.charset||defaults.charset;if(typeof opts.charset!=='undefined'&&opts.charset!=='utf-8'&&opts.charset!=='iso-8859-1'){throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');}var format=formats['default'];if(typeof opts.format!=='undefined'){if(!has.call(formats.formatters,opts.format)){throw new TypeError('Unknown format option provided.');}format=opts.format;}var formatter=formats.formatters[format];var filter=defaults.filter;if(typeof opts.filter==='function'||isArray(opts.filter)){filter=opts.filter;}return{addQueryPrefix:typeof opts.addQueryPrefix==='boolean'?opts.addQueryPrefix:defaults.addQueryPrefix,allowDots:typeof opts.allowDots==='undefined'?defaults.allowDots:!!opts.allowDots,charset:charset,charsetSentinel:typeof opts.charsetSentinel==='boolean'?opts.charsetSentinel:defaults.charsetSentinel,delimiter:typeof opts.delimiter==='undefined'?defaults.delimiter:opts.delimiter,encode:typeof opts.encode==='boolean'?opts.encode:defaults.encode,encoder:typeof opts.encoder==='function'?opts.encoder:defaults.encoder,encodeValuesOnly:typeof opts.encodeValuesOnly==='boolean'?opts.encodeValuesOnly:defaults.encodeValuesOnly,filter:filter,format:format,formatter:formatter,serializeDate:typeof opts.serializeDate==='function'?opts.serializeDate:defaults.serializeDate,skipNulls:typeof opts.skipNulls==='boolean'?opts.skipNulls:defaults.skipNulls,sort:typeof opts.sort==='function'?opts.sort:null,strictNullHandling:typeof opts.strictNullHandling==='boolean'?opts.strictNullHandling:defaults.strictNullHandling};};module.exports=function(object,opts){var obj=object;var options=normalizeStringifyOptions(opts);var objKeys;var filter;if(typeof options.filter==='function'){filter=options.filter;obj=filter('',obj);}else if(isArray(options.filter)){filter=options.filter;objKeys=filter;}var keys=[];if(_typeof(obj)!=='object'||obj===null){return'';}var arrayFormat;if(opts&&opts.arrayFormat in arrayPrefixGenerators){arrayFormat=opts.arrayFormat;}else if(opts&&'indices'in opts){arrayFormat=opts.indices?'indices':'repeat';}else{arrayFormat='indices';}var generateArrayPrefix=arrayPrefixGenerators[arrayFormat];if(opts&&'commaRoundTrip'in opts&&typeof opts.commaRoundTrip!=='boolean'){throw new TypeError('`commaRoundTrip` must be a boolean, or absent');}var commaRoundTrip=generateArrayPrefix==='comma'&&opts&&opts.commaRoundTrip;if(!objKeys){objKeys=Object.keys(obj);}if(options.sort){objKeys.sort(options.sort);}var sideChannel=getSideChannel();for(var i=0;i<objKeys.length;++i){var key=objKeys[i];if(options.skipNulls&&obj[key]===null){continue;}pushToArray(keys,stringify(obj[key],key,generateArrayPrefix,commaRoundTrip,options.strictNullHandling,options.skipNulls,options.encode?options.encoder:null,options.filter,options.sort,options.allowDots,options.serializeDate,options.format,options.formatter,options.encodeValuesOnly,options.charset,sideChannel));}var joined=keys.join(options.delimiter);var prefix=options.addQueryPrefix===true?'?':'';if(options.charsetSentinel){if(options.charset==='iso-8859-1'){// encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
prefix+='utf8=%26%2310003%3B&';}else{// encodeURIComponent('✓')
prefix+='utf8=%E2%9C%93&';}}return joined.length>0?prefix+joined:'';};},{"./formats":100,"./utils":104,"side-channel":110}],104:[function(require,module,exports){'use strict';var formats=require('./formats');var has=Object.prototype.hasOwnProperty;var isArray=Array.isArray;var hexTable=function(){var array=[];for(var i=0;i<256;++i){array.push('%'+((i<16?'0':'')+i.toString(16)).toUpperCase());}return array;}();var compactQueue=function compactQueue(queue){while(queue.length>1){var item=queue.pop();var obj=item.obj[item.prop];if(isArray(obj)){var compacted=[];for(var j=0;j<obj.length;++j){if(typeof obj[j]!=='undefined'){compacted.push(obj[j]);}}item.obj[item.prop]=compacted;}}};var arrayToObject=function arrayToObject(source,options){var obj=options&&options.plainObjects?Object.create(null):{};for(var i=0;i<source.length;++i){if(typeof source[i]!=='undefined'){obj[i]=source[i];}}return obj;};var merge=function merge(target,source,options){/* eslint no-param-reassign: 0 */if(!source){return target;}if(_typeof(source)!=='object'){if(isArray(target)){target.push(source);}else if(target&&_typeof(target)==='object'){if(options&&(options.plainObjects||options.allowPrototypes)||!has.call(Object.prototype,source)){target[source]=true;}}else{return[target,source];}return target;}if(!target||_typeof(target)!=='object'){return[target].concat(source);}var mergeTarget=target;if(isArray(target)&&!isArray(source)){mergeTarget=arrayToObject(target,options);}if(isArray(target)&&isArray(source)){source.forEach(function(item,i){if(has.call(target,i)){var targetItem=target[i];if(targetItem&&_typeof(targetItem)==='object'&&item&&_typeof(item)==='object'){target[i]=merge(targetItem,item,options);}else{target.push(item);}}else{target[i]=item;}});return target;}return Object.keys(source).reduce(function(acc,key){var value=source[key];if(has.call(acc,key)){acc[key]=merge(acc[key],value,options);}else{acc[key]=value;}return acc;},mergeTarget);};var assign=function assignSingleSource(target,source){return Object.keys(source).reduce(function(acc,key){acc[key]=source[key];return acc;},target);};var decode=function decode(str,decoder,charset){var strWithoutPlus=str.replace(/\+/g,' ');if(charset==='iso-8859-1'){// unescape never throws, no try...catch needed:
return strWithoutPlus.replace(/%[0-9a-f]{2}/gi,unescape);}// utf-8
try{return decodeURIComponent(strWithoutPlus);}catch(e){return strWithoutPlus;}};var encode=function encode(str,defaultEncoder,charset,kind,format){// This code was originally written by Brian White (mscdex) for the io.js core querystring library.
// It has been adapted here for stricter adherence to RFC 3986
if(str.length===0){return str;}var string=str;if(_typeof(str)==='symbol'){string=Symbol.prototype.toString.call(str);}else if(typeof str!=='string'){string=String(str);}if(charset==='iso-8859-1'){return escape(string).replace(/%u[0-9a-f]{4}/gi,function($0){return'%26%23'+parseInt($0.slice(2),16)+'%3B';});}var out='';for(var i=0;i<string.length;++i){var c=string.charCodeAt(i);if(c===0x2D// -
||c===0x2E// .
||c===0x5F// _
||c===0x7E// ~
||c>=0x30&&c<=0x39// 0-9
||c>=0x41&&c<=0x5A// a-z
||c>=0x61&&c<=0x7A// A-Z
||format===formats.RFC1738&&(c===0x28||c===0x29)// ( )
){out+=string.charAt(i);continue;}if(c<0x80){out=out+hexTable[c];continue;}if(c<0x800){out=out+(hexTable[0xC0|c>>6]+hexTable[0x80|c&0x3F]);continue;}if(c<0xD800||c>=0xE000){out=out+(hexTable[0xE0|c>>12]+hexTable[0x80|c>>6&0x3F]+hexTable[0x80|c&0x3F]);continue;}i+=1;c=0x10000+((c&0x3FF)<<10|string.charCodeAt(i)&0x3FF);/* eslint operator-linebreak: [2, "before"] */out+=hexTable[0xF0|c>>18]+hexTable[0x80|c>>12&0x3F]+hexTable[0x80|c>>6&0x3F]+hexTable[0x80|c&0x3F];}return out;};var compact=function compact(value){var queue=[{obj:{o:value},prop:'o'}];var refs=[];for(var i=0;i<queue.length;++i){var item=queue[i];var obj=item.obj[item.prop];var keys=Object.keys(obj);for(var j=0;j<keys.length;++j){var key=keys[j];var val=obj[key];if(_typeof(val)==='object'&&val!==null&&refs.indexOf(val)===-1){queue.push({obj:obj,prop:key});refs.push(val);}}}compactQueue(queue);return value;};var isRegExp=function isRegExp(obj){return Object.prototype.toString.call(obj)==='[object RegExp]';};var isBuffer=function isBuffer(obj){if(!obj||_typeof(obj)!=='object'){return false;}return!!(obj.constructor&&obj.constructor.isBuffer&&obj.constructor.isBuffer(obj));};var combine=function combine(a,b){return[].concat(a,b);};var maybeMap=function maybeMap(val,fn){if(isArray(val)){var mapped=[];for(var i=0;i<val.length;i+=1){mapped.push(fn(val[i]));}return mapped;}return fn(val);};module.exports={arrayToObject:arrayToObject,assign:assign,combine:combine,compact:compact,decode:decode,encode:encode,isBuffer:isBuffer,isRegExp:isRegExp,maybeMap:maybeMap,merge:merge};},{"./formats":100}],105:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop);}module.exports=function(qs,sep,eq,options){sep=sep||'&';eq=eq||'=';var obj={};if(typeof qs!=='string'||qs.length===0){return obj;}var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1000;if(options&&typeof options.maxKeys==='number'){maxKeys=options.maxKeys;}var len=qs.length;// maxKeys <= 0 means that we should not limit keys count
if(maxKeys>0&&len>maxKeys){len=maxKeys;}for(var i=0;i<len;++i){var x=qs[i].replace(regexp,'%20'),idx=x.indexOf(eq),kstr,vstr,k,v;if(idx>=0){kstr=x.substr(0,idx);vstr=x.substr(idx+1);}else{kstr=x;vstr='';}k=decodeURIComponent(kstr);v=decodeURIComponent(vstr);if(!hasOwnProperty(obj,k)){obj[k]=v;}else if(isArray(obj[k])){obj[k].push(v);}else{obj[k]=[obj[k],v];}}return obj;};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};},{}],106:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';var stringifyPrimitive=function stringifyPrimitive(v){switch(_typeof(v)){case'string':return v;case'boolean':return v?'true':'false';case'number':return isFinite(v)?v:'';default:return'';}};module.exports=function(obj,sep,eq,name){sep=sep||'&';eq=eq||'=';if(obj===null){obj=undefined;}if(_typeof(obj)==='object'){return map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;if(isArray(obj[k])){return map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v));}).join(sep);}else{return ks+encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if(!name)return'';return encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj));};var isArray=Array.isArray||function(xs){return Object.prototype.toString.call(xs)==='[object Array]';};function map(xs,f){if(xs.map)return xs.map(f);var res=[];for(var i=0;i<xs.length;i++){res.push(f(xs[i],i));}return res;}var objectKeys=Object.keys||function(obj){var res=[];for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);}return res;};},{}],107:[function(require,module,exports){'use strict';exports.decode=exports.parse=require('./decode');exports.encode=exports.stringify=require('./encode');},{"./decode":105,"./encode":106}],108:[function(require,module,exports){/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */var buffer=require('buffer');var Buffer=buffer.Buffer;// alternative to using Object.keys for old browsers
function copyProps(src,dst){for(var key in src){dst[key]=src[key];}}if(Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow){module.exports=buffer;}else{// Copy properties from require('buffer')
copyProps(buffer,exports);exports.Buffer=SafeBuffer;}function SafeBuffer(arg,encodingOrOffset,length){return Buffer(arg,encodingOrOffset,length);}SafeBuffer.prototype=Object.create(Buffer.prototype);// Copy static methods from Buffer
copyProps(Buffer,SafeBuffer);SafeBuffer.from=function(arg,encodingOrOffset,length){if(typeof arg==='number'){throw new TypeError('Argument must not be a number');}return Buffer(arg,encodingOrOffset,length);};SafeBuffer.alloc=function(size,fill,encoding){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}var buf=Buffer(size);if(fill!==undefined){if(typeof encoding==='string'){buf.fill(fill,encoding);}else{buf.fill(fill);}}else{buf.fill(0);}return buf;};SafeBuffer.allocUnsafe=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return Buffer(size);};SafeBuffer.allocUnsafeSlow=function(size){if(typeof size!=='number'){throw new TypeError('Argument must be a number');}return buffer.SlowBuffer(size);};},{"buffer":20}],109:[function(require,module,exports){'use strict';var GetIntrinsic=require('get-intrinsic');var define=require('define-data-property');var hasDescriptors=require('has-property-descriptors')();var gOPD=require('gopd');var $TypeError=GetIntrinsic('%TypeError%');var $floor=GetIntrinsic('%Math.floor%');module.exports=function setFunctionLength(fn,length){if(typeof fn!=='function'){throw new $TypeError('`fn` is not a function');}if(typeof length!=='number'||length<0||length>0xFFFFFFFF||$floor(length)!==length){throw new $TypeError('`length` must be a positive 32-bit integer');}var loose=arguments.length>2&&!!arguments[2];var functionLengthIsConfigurable=true;var functionLengthIsWritable=true;if('length'in fn&&gOPD){var desc=gOPD(fn,'length');if(desc&&!desc.configurable){functionLengthIsConfigurable=false;}if(desc&&!desc.writable){functionLengthIsWritable=false;}}if(functionLengthIsConfigurable||functionLengthIsWritable||!loose){if(hasDescriptors){define(fn,'length',length,true,true);}else{define(fn,'length',length);}}return fn;};},{"define-data-property":36,"get-intrinsic":69,"gopd":70,"has-property-descriptors":71}],110:[function(require,module,exports){'use strict';var GetIntrinsic=require('get-intrinsic');var callBound=require('call-bind/callBound');var inspect=require('object-inspect');var $TypeError=GetIntrinsic('%TypeError%');var $WeakMap=GetIntrinsic('%WeakMap%',true);var $Map=GetIntrinsic('%Map%',true);var $weakMapGet=callBound('WeakMap.prototype.get',true);var $weakMapSet=callBound('WeakMap.prototype.set',true);var $weakMapHas=callBound('WeakMap.prototype.has',true);var $mapGet=callBound('Map.prototype.get',true);var $mapSet=callBound('Map.prototype.set',true);var $mapHas=callBound('Map.prototype.has',true);/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */var listGetNode=function listGetNode(list,key){// eslint-disable-line consistent-return
for(var prev=list,curr;(curr=prev.next)!==null;prev=curr){if(curr.key===key){prev.next=curr.next;curr.next=list.next;list.next=curr;// eslint-disable-line no-param-reassign
return curr;}}};var listGet=function listGet(objects,key){var node=listGetNode(objects,key);return node&&node.value;};var listSet=function listSet(objects,key,value){var node=listGetNode(objects,key);if(node){node.value=value;}else{// Prepend the new node to the beginning of the list
objects.next={// eslint-disable-line no-param-reassign
key:key,next:objects.next,value:value};}};var listHas=function listHas(objects,key){return!!listGetNode(objects,key);};module.exports=function getSideChannel(){var $wm;var $m;var $o;var channel={assert:function assert(key){if(!channel.has(key)){throw new $TypeError('Side channel does not contain '+inspect(key));}},get:function get(key){// eslint-disable-line consistent-return
if($WeakMap&&key&&(_typeof(key)==='object'||typeof key==='function')){if($wm){return $weakMapGet($wm,key);}}else if($Map){if($m){return $mapGet($m,key);}}else{if($o){// eslint-disable-line no-lonely-if
return listGet($o,key);}}},has:function has(key){if($WeakMap&&key&&(_typeof(key)==='object'||typeof key==='function')){if($wm){return $weakMapHas($wm,key);}}else if($Map){if($m){return $mapHas($m,key);}}else{if($o){// eslint-disable-line no-lonely-if
return listHas($o,key);}}return false;},set:function set(key,value){if($WeakMap&&key&&(_typeof(key)==='object'||typeof key==='function')){if(!$wm){$wm=new $WeakMap();}$weakMapSet($wm,key,value);}else if($Map){if(!$m){$m=new $Map();}$mapSet($m,key,value);}else{if(!$o){/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */$o={key:{},next:null};}listSet($o,key,value);}}};return channel;};},{"call-bind/callBound":25,"get-intrinsic":69,"object-inspect":90}],111:[function(require,module,exports){(function(Buffer){(function(){/*! simple-concat. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */module.exports=function(stream,cb){var chunks=[];stream.on('data',function(chunk){chunks.push(chunk);});stream.once('end',function(){if(cb)cb(null,Buffer.concat(chunks));cb=null;});stream.once('error',function(err){if(cb)cb(err);cb=null;});};}).call(this);}).call(this,require("buffer").Buffer);},{"buffer":20}],112:[function(require,module,exports){(function(Buffer){(function(){/*! simple-get. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */module.exports=simpleGet;var concat=require('simple-concat');var decompressResponse=require('decompress-response');// excluded from browser build
var http=require('http');var https=require('https');var once=require('once');var querystring=require('querystring');var url=require('url');var isStream=function isStream(o){return o!==null&&_typeof(o)==='object'&&typeof o.pipe==='function';};function simpleGet(opts,cb){opts=Object.assign({maxRedirects:10},typeof opts==='string'?{url:opts}:opts);cb=once(cb);if(opts.url){var _url$parse=url.parse(opts.url),hostname=_url$parse.hostname,port=_url$parse.port,_protocol=_url$parse.protocol,auth=_url$parse.auth,path=_url$parse.path;// eslint-disable-line node/no-deprecated-api
delete opts.url;if(!hostname&&!port&&!_protocol&&!auth)opts.path=path;// Relative redirect
else Object.assign(opts,{hostname:hostname,port:port,protocol:_protocol,auth:auth,path:path});// Absolute redirect
}var headers={'accept-encoding':'gzip, deflate'};if(opts.headers)Object.keys(opts.headers).forEach(function(k){return headers[k.toLowerCase()]=opts.headers[k];});opts.headers=headers;var body;if(opts.body){body=opts.json&&!isStream(opts.body)?JSON.stringify(opts.body):opts.body;}else if(opts.form){body=typeof opts.form==='string'?opts.form:querystring.stringify(opts.form);opts.headers['content-type']='application/x-www-form-urlencoded';}if(body){if(!opts.method)opts.method='POST';if(!isStream(body))opts.headers['content-length']=Buffer.byteLength(body);if(opts.json&&!opts.form)opts.headers['content-type']='application/json';}delete opts.body;delete opts.form;if(opts.json)opts.headers.accept='application/json';if(opts.method)opts.method=opts.method.toUpperCase();var originalHost=opts.hostname;// hostname before potential redirect
var protocol=opts.protocol==='https:'?https:http;// Support http/https urls
var req=protocol.request(opts,function(res){if(opts.followRedirects!==false&&res.statusCode>=300&&res.statusCode<400&&res.headers.location){opts.url=res.headers.location;// Follow 3xx redirects
delete opts.headers.host;// Discard `host` header on redirect (see #32)
res.resume();// Discard response
var redirectHost=url.parse(opts.url).hostname;// eslint-disable-line node/no-deprecated-api
// If redirected host is different than original host, drop headers to prevent cookie leak (#73)
if(redirectHost!==null&&redirectHost!==originalHost){delete opts.headers.cookie;delete opts.headers.authorization;}if(opts.method==='POST'&&[301,302].includes(res.statusCode)){opts.method='GET';// On 301/302 redirect, change POST to GET (see #35)
delete opts.headers['content-length'];delete opts.headers['content-type'];}if(opts.maxRedirects--===0)return cb(new Error('too many redirects'));else return simpleGet(opts,cb);}var tryUnzip=typeof decompressResponse==='function'&&opts.method!=='HEAD';cb(null,tryUnzip?decompressResponse(res):res);});req.on('timeout',function(){req.abort();cb(new Error('Request timed out'));});req.on('error',cb);if(isStream(body))body.on('error',cb).pipe(req);else req.end(body);return req;}simpleGet.concat=function(opts,cb){return simpleGet(opts,function(err,res){if(err)return cb(err);concat(res,function(err,data){if(err)return cb(err);if(opts.json){try{data=JSON.parse(data.toString());}catch(err){return cb(err,res,data);}}cb(null,res,data);});});};['get','post','put','patch','head','delete'].forEach(function(method){simpleGet[method]=function(opts,cb){if(typeof opts==='string')opts={url:opts};return simpleGet(Object.assign({method:method.toUpperCase()},opts),cb);};});}).call(this);}).call(this,require("buffer").Buffer);},{"buffer":20,"decompress-response":18,"http":113,"https":76,"once":91,"querystring":107,"simple-concat":111,"url":134}],113:[function(require,module,exports){(function(global){(function(){var ClientRequest=require('./lib/request');var response=require('./lib/response');var extend=require('xtend');var statusCodes=require('builtin-status-codes');var url=require('url');var http=exports;http.request=function(opts,cb){if(typeof opts==='string')opts=url.parse(opts);else opts=extend(opts);// Normally, the page is loaded from http or https, so not specifying a protocol
// will result in a (valid) protocol-relative url. However, this won't work if
// the protocol is something else, like 'file:'
var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?'http:':'';var protocol=opts.protocol||defaultProtocol;var host=opts.hostname||opts.host;var port=opts.port;var path=opts.path||'/';// Necessary for IPv6 addresses
if(host&&host.indexOf(':')!==-1)host='['+host+']';// This may be a relative url. The browser should always be able to interpret it correctly.
opts.url=(host?protocol+'//'+host:'')+(port?':'+port:'')+path;opts.method=(opts.method||'GET').toUpperCase();opts.headers=opts.headers||{};// Also valid opts.auth, opts.mode
var req=new ClientRequest(opts);if(cb)req.on('response',cb);return req;};http.get=function get(opts,cb){var req=http.request(opts,cb);req.end();return req;};http.ClientRequest=ClientRequest;http.IncomingMessage=response.IncomingMessage;http.Agent=function(){};http.Agent.defaultMaxSockets=4;http.globalAgent=new http.Agent();http.STATUS_CODES=statusCodes;http.METHODS=['CHECKOUT','CONNECT','COPY','DELETE','GET','HEAD','LOCK','M-SEARCH','MERGE','MKACTIVITY','MKCOL','MOVE','NOTIFY','OPTIONS','PATCH','POST','PROPFIND','PROPPATCH','PURGE','PUT','REPORT','SEARCH','SUBSCRIBE','TRACE','UNLOCK','UNSUBSCRIBE'];}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"./lib/request":115,"./lib/response":116,"builtin-status-codes":21,"url":134,"xtend":137}],114:[function(require,module,exports){(function(global){(function(){exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream);exports.writableStream=isFunction(global.WritableStream);exports.abortController=isFunction(global.AbortController);// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr;function getXHR(){// Cache the xhr value
if(xhr!==undefined)return xhr;if(global.XMLHttpRequest){xhr=new global.XMLHttpRequest();// If XDomainRequest is available (ie only, where xhr might not work
// cross domain), use the page location. Otherwise use example.com
// Note: this doesn't actually make an http request.
try{xhr.open('GET',global.XDomainRequest?'/':'https://example.com');}catch(e){xhr=null;}}else{// Service workers don't have XHR
xhr=null;}return xhr;}function checkTypeSupport(type){var xhr=getXHR();if(!xhr)return false;try{xhr.responseType=type;return xhr.responseType===type;}catch(e){}return false;}// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer=exports.fetch||checkTypeSupport('arraybuffer');// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream=!exports.fetch&&checkTypeSupport('ms-stream');exports.mozchunkedarraybuffer=!exports.fetch&&checkTypeSupport('moz-chunked-arraybuffer');// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType=exports.fetch||(getXHR()?isFunction(getXHR().overrideMimeType):false);function isFunction(value){return typeof value==='function';}xhr=null;// Help gc
}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],115:[function(require,module,exports){(function(process,global,Buffer){(function(){var capability=require('./capability');var inherits=require('inherits');var response=require('./response');var stream=require('readable-stream');var IncomingMessage=response.IncomingMessage;var rStates=response.readyStates;function decideMode(preferBinary,useFetch){if(capability.fetch&&useFetch){return'fetch';}else if(capability.mozchunkedarraybuffer){return'moz-chunked-arraybuffer';}else if(capability.msstream){return'ms-stream';}else if(capability.arraybuffer&&preferBinary){return'arraybuffer';}else{return'text';}}var ClientRequest=module.exports=function(opts){var self=this;stream.Writable.call(self);self._opts=opts;self._body=[];self._headers={};if(opts.auth)self.setHeader('Authorization','Basic '+Buffer.from(opts.auth).toString('base64'));Object.keys(opts.headers).forEach(function(name){self.setHeader(name,opts.headers[name]);});var preferBinary;var useFetch=true;if(opts.mode==='disable-fetch'||'requestTimeout'in opts&&!capability.abortController){// If the use of XHR should be preferred. Not typically needed.
useFetch=false;preferBinary=true;}else if(opts.mode==='prefer-streaming'){// If streaming is a high priority but binary compatibility and
// the accuracy of the 'content-type' header aren't
preferBinary=false;}else if(opts.mode==='allow-wrong-content-type'){// If streaming is more important than preserving the 'content-type' header
preferBinary=!capability.overrideMimeType;}else if(!opts.mode||opts.mode==='default'||opts.mode==='prefer-fast'){// Use binary if text streaming may corrupt data or the content-type header, or for speed
preferBinary=true;}else{throw new Error('Invalid value for opts.mode');}self._mode=decideMode(preferBinary,useFetch);self._fetchTimer=null;self._socketTimeout=null;self._socketTimer=null;self.on('finish',function(){self._onFinish();});};inherits(ClientRequest,stream.Writable);ClientRequest.prototype.setHeader=function(name,value){var self=this;var lowerName=name.toLowerCase();// This check is not necessary, but it prevents warnings from browsers about setting unsafe
// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
// http-browserify did it, so I will too.
if(unsafeHeaders.indexOf(lowerName)!==-1)return;self._headers[lowerName]={name:name,value:value};};ClientRequest.prototype.getHeader=function(name){var header=this._headers[name.toLowerCase()];if(header)return header.value;return null;};ClientRequest.prototype.removeHeader=function(name){var self=this;delete self._headers[name.toLowerCase()];};ClientRequest.prototype._onFinish=function(){var self=this;if(self._destroyed)return;var opts=self._opts;if('timeout'in opts&&opts.timeout!==0){self.setTimeout(opts.timeout);}var headersObj=self._headers;var body=null;if(opts.method!=='GET'&&opts.method!=='HEAD'){body=new Blob(self._body,{type:(headersObj['content-type']||{}).value||''});}// create flattened list of headers
var headersList=[];Object.keys(headersObj).forEach(function(keyName){var name=headersObj[keyName].name;var value=headersObj[keyName].value;if(Array.isArray(value)){value.forEach(function(v){headersList.push([name,v]);});}else{headersList.push([name,value]);}});if(self._mode==='fetch'){var signal=null;if(capability.abortController){var controller=new AbortController();signal=controller.signal;self._fetchAbortController=controller;if('requestTimeout'in opts&&opts.requestTimeout!==0){self._fetchTimer=global.setTimeout(function(){self.emit('requestTimeout');if(self._fetchAbortController)self._fetchAbortController.abort();},opts.requestTimeout);}}global.fetch(self._opts.url,{method:self._opts.method,headers:headersList,body:body||undefined,mode:'cors',credentials:opts.withCredentials?'include':'same-origin',signal:signal}).then(function(response){self._fetchResponse=response;self._resetTimers(false);self._connect();},function(reason){self._resetTimers(true);if(!self._destroyed)self.emit('error',reason);});}else{var xhr=self._xhr=new global.XMLHttpRequest();try{xhr.open(self._opts.method,self._opts.url,true);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}// Can't set responseType on really old browsers
if('responseType'in xhr)xhr.responseType=self._mode;if('withCredentials'in xhr)xhr.withCredentials=!!opts.withCredentials;if(self._mode==='text'&&'overrideMimeType'in xhr)xhr.overrideMimeType('text/plain; charset=x-user-defined');if('requestTimeout'in opts){xhr.timeout=opts.requestTimeout;xhr.ontimeout=function(){self.emit('requestTimeout');};}headersList.forEach(function(header){xhr.setRequestHeader(header[0],header[1]);});self._response=null;xhr.onreadystatechange=function(){switch(xhr.readyState){case rStates.LOADING:case rStates.DONE:self._onXHRProgress();break;}};// Necessary for streaming in Firefox, since xhr.response is ONLY defined
// in onprogress, not in onreadystatechange with xhr.readyState = 3
if(self._mode==='moz-chunked-arraybuffer'){xhr.onprogress=function(){self._onXHRProgress();};}xhr.onerror=function(){if(self._destroyed)return;self._resetTimers(true);self.emit('error',new Error('XHR error'));};try{xhr.send(body);}catch(err){process.nextTick(function(){self.emit('error',err);});return;}}};/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */function statusValid(xhr){try{var status=xhr.status;return status!==null&&status!==0;}catch(e){return false;}}ClientRequest.prototype._onXHRProgress=function(){var self=this;self._resetTimers(false);if(!statusValid(self._xhr)||self._destroyed)return;if(!self._response)self._connect();self._response._onXHRProgress(self._resetTimers.bind(self));};ClientRequest.prototype._connect=function(){var self=this;if(self._destroyed)return;self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode,self._resetTimers.bind(self));self._response.on('error',function(err){self.emit('error',err);});self.emit('response',self._response);};ClientRequest.prototype._write=function(chunk,encoding,cb){var self=this;self._body.push(chunk);cb();};ClientRequest.prototype._resetTimers=function(done){var self=this;global.clearTimeout(self._socketTimer);self._socketTimer=null;if(done){global.clearTimeout(self._fetchTimer);self._fetchTimer=null;}else if(self._socketTimeout){self._socketTimer=global.setTimeout(function(){self.emit('timeout');},self._socketTimeout);}};ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(err){var self=this;self._destroyed=true;self._resetTimers(true);if(self._response)self._response._destroyed=true;if(self._xhr)self._xhr.abort();else if(self._fetchAbortController)self._fetchAbortController.abort();if(err)self.emit('error',err);};ClientRequest.prototype.end=function(data,encoding,cb){var self=this;if(typeof data==='function'){cb=data;data=undefined;}stream.Writable.prototype.end.call(self,data,encoding,cb);};ClientRequest.prototype.setTimeout=function(timeout,cb){var self=this;if(cb)self.once('timeout',cb);self._socketTimeout=timeout;self._resetTimers(false);};ClientRequest.prototype.flushHeaders=function(){};ClientRequest.prototype.setNoDelay=function(){};ClientRequest.prototype.setSocketKeepAlive=function(){};// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders=['accept-charset','accept-encoding','access-control-request-headers','access-control-request-method','connection','content-length','cookie','cookie2','date','dnt','expect','host','keep-alive','origin','referer','te','trailer','transfer-encoding','upgrade','via'];}).call(this);}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":114,"./response":116,"_process":98,"buffer":20,"inherits":78,"readable-stream":131}],116:[function(require,module,exports){(function(process,global,Buffer){(function(){var capability=require('./capability');var inherits=require('inherits');var stream=require('readable-stream');var rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4};var IncomingMessage=exports.IncomingMessage=function(xhr,response,mode,resetTimers){var self=this;stream.Readable.call(self);self._mode=mode;self.headers={};self.rawHeaders=[];self.trailers={};self.rawTrailers=[];// Fake the 'close' event, but only once 'end' fires
self.on('end',function(){// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
process.nextTick(function(){self.emit('close');});});if(mode==='fetch'){var read=function read(){reader.read().then(function(result){if(self._destroyed)return;resetTimers(result.done);if(result.done){self.push(null);return;}self.push(Buffer.from(result.value));read();})["catch"](function(err){resetTimers(true);if(!self._destroyed)self.emit('error',err);});};self._fetchResponse=response;self.url=response.url;self.statusCode=response.status;self.statusMessage=response.statusText;response.headers.forEach(function(header,key){self.headers[key.toLowerCase()]=header;self.rawHeaders.push(key,header);});if(capability.writableStream){var writable=new WritableStream({write:function write(chunk){resetTimers(false);return new Promise(function(resolve,reject){if(self._destroyed){reject();}else if(self.push(Buffer.from(chunk))){resolve();}else{self._resumeFetch=resolve;}});},close:function close(){resetTimers(true);if(!self._destroyed)self.push(null);},abort:function abort(err){resetTimers(true);if(!self._destroyed)self.emit('error',err);}});try{response.body.pipeTo(writable)["catch"](function(err){resetTimers(true);if(!self._destroyed)self.emit('error',err);});return;}catch(e){}// pipeTo method isn't defined. Can't find a better way to feature test this
}// fallback for when writableStream or pipeTo aren't available
var reader=response.body.getReader();read();}else{self._xhr=xhr;self._pos=0;self.url=xhr.responseURL;self.statusCode=xhr.status;self.statusMessage=xhr.statusText;var headers=xhr.getAllResponseHeaders().split(/\r?\n/);headers.forEach(function(header){var matches=header.match(/^([^:]+):\s*(.*)/);if(matches){var key=matches[1].toLowerCase();if(key==='set-cookie'){if(self.headers[key]===undefined){self.headers[key]=[];}self.headers[key].push(matches[2]);}else if(self.headers[key]!==undefined){self.headers[key]+=', '+matches[2];}else{self.headers[key]=matches[2];}self.rawHeaders.push(matches[1],matches[2]);}});self._charset='x-user-defined';if(!capability.overrideMimeType){var mimeType=self.rawHeaders['mime-type'];if(mimeType){var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);if(charsetMatch){self._charset=charsetMatch[1].toLowerCase();}}if(!self._charset)self._charset='utf-8';// best guess
}}};inherits(IncomingMessage,stream.Readable);IncomingMessage.prototype._read=function(){var self=this;var resolve=self._resumeFetch;if(resolve){self._resumeFetch=null;resolve();}};IncomingMessage.prototype._onXHRProgress=function(resetTimers){var self=this;var xhr=self._xhr;var response=null;switch(self._mode){case'text':response=xhr.responseText;if(response.length>self._pos){var newData=response.substr(self._pos);if(self._charset==='x-user-defined'){var buffer=Buffer.alloc(newData.length);for(var i=0;i<newData.length;i++)buffer[i]=newData.charCodeAt(i)&0xff;self.push(buffer);}else{self.push(newData,self._charset);}self._pos=response.length;}break;case'arraybuffer':if(xhr.readyState!==rStates.DONE||!xhr.response)break;response=xhr.response;self.push(Buffer.from(new Uint8Array(response)));break;case'moz-chunked-arraybuffer':// take whole
response=xhr.response;if(xhr.readyState!==rStates.LOADING||!response)break;self.push(Buffer.from(new Uint8Array(response)));break;case'ms-stream':response=xhr.response;if(xhr.readyState!==rStates.LOADING)break;var reader=new global.MSStreamReader();reader.onprogress=function(){if(reader.result.byteLength>self._pos){self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))));self._pos=reader.result.byteLength;}};reader.onload=function(){resetTimers(true);self.push(null);};// reader.onerror = ??? // TODO: this
reader.readAsArrayBuffer(response);break;}// The ms-stream case handles end separately in reader.onload()
if(self._xhr.readyState===rStates.DONE&&self._mode!=='ms-stream'){resetTimers(true);self.push(null);}};}).call(this);}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer);},{"./capability":114,"_process":98,"buffer":20,"inherits":78,"readable-stream":131}],117:[function(require,module,exports){'use strict';function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype);subClass.prototype.constructor=subClass;subClass.__proto__=superClass;}var codes={};function createErrorType(code,message,Base){if(!Base){Base=Error;}function getMessage(arg1,arg2,arg3){if(typeof message==='string'){return message;}else{return message(arg1,arg2,arg3);}}var NodeError=/*#__PURE__*/function(_Base){_inheritsLoose(NodeError,_Base);function NodeError(arg1,arg2,arg3){return _Base.call(this,getMessage(arg1,arg2,arg3))||this;}return NodeError;}(Base);NodeError.prototype.name=Base.name;NodeError.prototype.code=code;codes[code]=NodeError;}// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected,thing){if(Array.isArray(expected)){var len=expected.length;expected=expected.map(function(i){return String(i);});if(len>2){return"one of ".concat(thing," ").concat(expected.slice(0,len-1).join(', '),", or ")+expected[len-1];}else if(len===2){return"one of ".concat(thing," ").concat(expected[0]," or ").concat(expected[1]);}else{return"of ".concat(thing," ").concat(expected[0]);}}else{return"of ".concat(thing," ").concat(String(expected));}}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str,search,pos){return str.substr(!pos||pos<0?0:+pos,search.length)===search;}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str,search,this_len){if(this_len===undefined||this_len>str.length){this_len=str.length;}return str.substring(this_len-search.length,this_len)===search;}// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str,search,start){if(typeof start!=='number'){start=0;}if(start+search.length>str.length){return false;}else{return str.indexOf(search,start)!==-1;}}createErrorType('ERR_INVALID_OPT_VALUE',function(name,value){return'The value "'+value+'" is invalid for option "'+name+'"';},TypeError);createErrorType('ERR_INVALID_ARG_TYPE',function(name,expected,actual){// determiner: 'must be' or 'must not be'
var determiner;if(typeof expected==='string'&&startsWith(expected,'not ')){determiner='must not be';expected=expected.replace(/^not /,'');}else{determiner='must be';}var msg;if(endsWith(name,' argument')){// For cases like 'first argument'
msg="The ".concat(name," ").concat(determiner," ").concat(oneOf(expected,'type'));}else{var type=includes(name,'.')?'property':'argument';msg="The \"".concat(name,"\" ").concat(type," ").concat(determiner," ").concat(oneOf(expected,'type'));}msg+=". Received type ".concat(_typeof(actual));return msg;},TypeError);createErrorType('ERR_STREAM_PUSH_AFTER_EOF','stream.push() after EOF');createErrorType('ERR_METHOD_NOT_IMPLEMENTED',function(name){return'The '+name+' method is not implemented';});createErrorType('ERR_STREAM_PREMATURE_CLOSE','Premature close');createErrorType('ERR_STREAM_DESTROYED',function(name){return'Cannot call '+name+' after a stream was destroyed';});createErrorType('ERR_MULTIPLE_CALLBACK','Callback called multiple times');createErrorType('ERR_STREAM_CANNOT_PIPE','Cannot pipe, not readable');createErrorType('ERR_STREAM_WRITE_AFTER_END','write after end');createErrorType('ERR_STREAM_NULL_VALUES','May not write null values to stream',TypeError);createErrorType('ERR_UNKNOWN_ENCODING',function(arg){return'Unknown encoding: '+arg;},TypeError);createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT','stream.unshift() after end event');module.exports.codes=codes;},{}],118:[function(require,module,exports){(function(process){(function(){// Copyright Joyent, Inc. and other Node contributors.
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
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';/*<replacement>*/var objectKeys=Object.keys||function(obj){var keys=[];for(var key in obj)keys.push(key);return keys;};/*</replacement>*/module.exports=Duplex;var Readable=require('./_stream_readable');var Writable=require('./_stream_writable');require('inherits')(Duplex,Readable);{// Allow the keys array to be GC'ed.
var keys=objectKeys(Writable.prototype);for(var v=0;v<keys.length;v++){var method=keys[v];if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];}}function Duplex(options){if(!(this instanceof Duplex))return new Duplex(options);Readable.call(this,options);Writable.call(this,options);this.allowHalfOpen=true;if(options){if(options.readable===false)this.readable=false;if(options.writable===false)this.writable=false;if(options.allowHalfOpen===false){this.allowHalfOpen=false;this.once('end',onend);}}}Object.defineProperty(Duplex.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});Object.defineProperty(Duplex.prototype,'writableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer();}});Object.defineProperty(Duplex.prototype,'writableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.length;}});// the no-half-open enforcer
function onend(){// If the writable side ended, then we're ok.
if(this._writableState.ended)return;// no more data can be written.
// But allow more writes to happen in this tick.
process.nextTick(onEndNT,this);}function onEndNT(self){self.end();}Object.defineProperty(Duplex.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._readableState===undefined||this._writableState===undefined){return false;}return this._readableState.destroyed&&this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(this._readableState===undefined||this._writableState===undefined){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;this._writableState.destroyed=value;}});}).call(this);}).call(this,require('_process'));},{"./_stream_readable":120,"./_stream_writable":122,"_process":98,"inherits":78}],119:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';module.exports=PassThrough;var Transform=require('./_stream_transform');require('inherits')(PassThrough,Transform);function PassThrough(options){if(!(this instanceof PassThrough))return new PassThrough(options);Transform.call(this,options);}PassThrough.prototype._transform=function(chunk,encoding,cb){cb(null,chunk);};},{"./_stream_transform":121,"inherits":78}],120:[function(require,module,exports){(function(process,global){(function(){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';module.exports=Readable;/*<replacement>*/var Duplex;/*</replacement>*/Readable.ReadableState=ReadableState;/*<replacement>*/var EE=require('events').EventEmitter;var EElistenerCount=function EElistenerCount(emitter,type){return emitter.listeners(type).length;};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/var Buffer=require('buffer').Buffer;var OurUint8Array=(typeof global!=='undefined'?global:typeof window!=='undefined'?window:typeof self!=='undefined'?self:{}).Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array;}/*<replacement>*/var debugUtil=require('util');var debug;if(debugUtil&&debugUtil.debuglog){debug=debugUtil.debuglog('stream');}else{debug=function debug(){};}/*</replacement>*/var BufferList=require('./internal/streams/buffer_list');var destroyImpl=require('./internal/streams/destroy');var _require=require('./internal/streams/state'),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require('../errors').codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_STREAM_PUSH_AFTER_EOF=_require$codes.ERR_STREAM_PUSH_AFTER_EOF,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_STREAM_UNSHIFT_AFTER_END_EVENT=_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;// Lazy loaded to improve the startup performance.
var StringDecoder;var createReadableStreamAsyncIterator;var from;require('inherits')(Readable,Stream);var errorOrDestroy=destroyImpl.errorOrDestroy;var kProxyEvents=['error','close','destroy','pause','resume'];function prependListener(emitter,event,fn){// Sadly this is not cacheable as some libraries bundle their own
// event emitter implementation with them.
if(typeof emitter.prependListener==='function')return emitter.prependListener(event,fn);// This is a hack to make sure that our error handler is attached before any
// userland ones.  NEVER DO THIS. This is here only because this code needs
// to continue to work with older versions of Node.js that do not include
// the prependListener() method. The goal is to eventually remove this hack.
if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(Array.isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];}function ReadableState(options,stream,isDuplex){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream.
// These options can be provided separately as readableXXX and writableXXX.
if(typeof isDuplex!=='boolean')isDuplex=stream instanceof Duplex;// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.readableObjectMode;// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
this.highWaterMark=getHighWaterMark(this,options,'readableHighWaterMark',isDuplex);// A linked list is used to store data chunks instead of an array because the
// linked list can remove elements from the beginning faster than
// array.shift()
this.buffer=new BufferList();this.length=0;this.pipes=null;this.pipesCount=0;this.flowing=null;this.ended=false;this.endEmitted=false;this.reading=false;// a flag to be able to tell if the event 'readable'/'data' is emitted
// immediately, or on a later tick.  We set this to true at first, because
// any actions that shouldn't happen until "later" should generally also
// not happen before the first read call.
this.sync=true;// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable=false;this.emittedReadable=false;this.readableListening=false;this.resumeScheduled=false;this.paused=true;// Should close be emitted on destroy. Defaults to true.
this.emitClose=options.emitClose!==false;// Should .destroy() be called after 'end' (and potentially 'finish')
this.autoDestroy=!!options.autoDestroy;// has it been destroyed
this.destroyed=false;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain=0;// if true, a maybeReadMore has been scheduled
this.readingMore=false;this.decoder=null;this.encoding=null;if(options.encoding){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;this.decoder=new StringDecoder(options.encoding);this.encoding=options.encoding;}}function Readable(options){Duplex=Duplex||require('./_stream_duplex');if(!(this instanceof Readable))return new Readable(options);// Checking for a Stream.Duplex instance is faster here instead of inside
// the ReadableState constructor, at least with V8 6.5
var isDuplex=this instanceof Duplex;this._readableState=new ReadableState(options,this,isDuplex);// legacy
this.readable=true;if(options){if(typeof options.read==='function')this._read=options.read;if(typeof options.destroy==='function')this._destroy=options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._readableState===undefined){return false;}return this._readableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._readableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._readableState.destroyed=value;}});Readable.prototype.destroy=destroyImpl.destroy;Readable.prototype._undestroy=destroyImpl.undestroy;Readable.prototype._destroy=function(err,cb){cb(err);};// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push=function(chunk,encoding){var state=this._readableState;var skipChunkCheck;if(!state.objectMode){if(typeof chunk==='string'){encoding=encoding||state.defaultEncoding;if(encoding!==state.encoding){chunk=Buffer.from(chunk,encoding);encoding='';}skipChunkCheck=true;}}else{skipChunkCheck=true;}return readableAddChunk(this,chunk,encoding,false,skipChunkCheck);};// Unshift should *always* be something directly out of read()
Readable.prototype.unshift=function(chunk){return readableAddChunk(this,chunk,null,true,false);};function readableAddChunk(stream,chunk,encoding,addToFront,skipChunkCheck){debug('readableAddChunk',chunk);var state=stream._readableState;if(chunk===null){state.reading=false;onEofChunk(stream,state);}else{var er;if(!skipChunkCheck)er=chunkInvalid(state,chunk);if(er){errorOrDestroy(stream,er);}else if(state.objectMode||chunk&&chunk.length>0){if(typeof chunk!=='string'&&!state.objectMode&&Object.getPrototypeOf(chunk)!==Buffer.prototype){chunk=_uint8ArrayToBuffer(chunk);}if(addToFront){if(state.endEmitted)errorOrDestroy(stream,new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream,state,chunk,true);}else if(state.ended){errorOrDestroy(stream,new ERR_STREAM_PUSH_AFTER_EOF());}else if(state.destroyed){return false;}else{state.reading=false;if(state.decoder&&!encoding){chunk=state.decoder.write(chunk);if(state.objectMode||chunk.length!==0)addChunk(stream,state,chunk,false);else maybeReadMore(stream,state);}else{addChunk(stream,state,chunk,false);}}}else if(!addToFront){state.reading=false;maybeReadMore(stream,state);}}// We can push more data if we are below the highWaterMark.
// Also, if we have no data yet, we can stand some more bytes.
// This is to work around cases where hwm=0, such as the repl.
return!state.ended&&(state.length<state.highWaterMark||state.length===0);}function addChunk(stream,state,chunk,addToFront){if(state.flowing&&state.length===0&&!state.sync){state.awaitDrain=0;stream.emit('data',chunk);}else{// update the buffer info.
state.length+=state.objectMode?1:chunk.length;if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);if(state.needReadable)emitReadable(stream);}maybeReadMore(stream,state);}function chunkInvalid(state,chunk){var er;if(!_isUint8Array(chunk)&&typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE('chunk',['string','Buffer','Uint8Array'],chunk);}return er;}Readable.prototype.isPaused=function(){return this._readableState.flowing===false;};// backwards compatibility.
Readable.prototype.setEncoding=function(enc){if(!StringDecoder)StringDecoder=require('string_decoder/').StringDecoder;var decoder=new StringDecoder(enc);this._readableState.decoder=decoder;// If setEncoding(null), decoder.encoding equals utf8
this._readableState.encoding=this._readableState.decoder.encoding;// Iterate over current buffer to convert already stored Buffers:
var p=this._readableState.buffer.head;var content='';while(p!==null){content+=decoder.write(p.data);p=p.next;}this._readableState.buffer.clear();if(content!=='')this._readableState.buffer.push(content);this._readableState.length=content.length;return this;};// Don't raise the hwm > 1GB
var MAX_HWM=0x40000000;function computeNewHighWaterMark(n){if(n>=MAX_HWM){// TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
n=MAX_HWM;}else{// Get the next highest power of 2 to prevent increasing hwm excessively in
// tiny amounts
n--;n|=n>>>1;n|=n>>>2;n|=n>>>4;n|=n>>>8;n|=n>>>16;n++;}return n;}// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n,state){if(n<=0||state.length===0&&state.ended)return 0;if(state.objectMode)return 1;if(n!==n){// Only flow one buffer at a time
if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length;}// If we're asking for more than the current hwm, then raise the hwm.
if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);if(n<=state.length)return n;// Don't have enough
if(!state.ended){state.needReadable=true;return 0;}return state.length;}// you can override either this method, or the async _read(n) below.
Readable.prototype.read=function(n){debug('read',n);n=parseInt(n,10);var state=this._readableState;var nOrig=n;if(n!==0)state.emittedReadable=false;// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if(n===0&&state.needReadable&&((state.highWaterMark!==0?state.length>=state.highWaterMark:state.length>0)||state.ended)){debug('read: emitReadable',state.length,state.ended);if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);return null;}n=howMuchToRead(n,state);// if we've ended, and we're now clear, then finish it up.
if(n===0&&state.ended){if(state.length===0)endReadable(this);return null;}// All the actual chunk generation logic needs to be
// *below* the call to _read.  The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.
// Note that this may be asynchronous, or synchronous.  Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead=state.needReadable;debug('need readable',doRead);// if we currently have less than the highWaterMark, then also read some
if(state.length===0||state.length-n<state.highWaterMark){doRead=true;debug('length less than watermark',doRead);}// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if(state.ended||state.reading){doRead=false;debug('reading or ended',doRead);}else if(doRead){debug('do read');state.reading=true;state.sync=true;// if the length is currently zero, then we *need* a readable event.
if(state.length===0)state.needReadable=true;// call internal read method
this._read(state.highWaterMark);state.sync=false;// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if(!state.reading)n=howMuchToRead(nOrig,state);}var ret;if(n>0)ret=fromList(n,state);else ret=null;if(ret===null){state.needReadable=state.length<=state.highWaterMark;n=0;}else{state.length-=n;state.awaitDrain=0;}if(state.length===0){// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if(!state.ended)state.needReadable=true;// If we tried to read() past the EOF, then emit end on the next tick.
if(nOrig!==n&&state.ended)endReadable(this);}if(ret!==null)this.emit('data',ret);return ret;};function onEofChunk(stream,state){debug('onEofChunk');if(state.ended)return;if(state.decoder){var chunk=state.decoder.end();if(chunk&&chunk.length){state.buffer.push(chunk);state.length+=state.objectMode?1:chunk.length;}}state.ended=true;if(state.sync){// if we are sync, wait until next tick to emit the data.
// Otherwise we risk emitting data in the flow()
// the readable code triggers during a read() call
emitReadable(stream);}else{// emit 'readable' now to make sure it gets picked up.
state.needReadable=false;if(!state.emittedReadable){state.emittedReadable=true;emitReadable_(stream);}}}// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream){var state=stream._readableState;debug('emitReadable',state.needReadable,state.emittedReadable);state.needReadable=false;if(!state.emittedReadable){debug('emitReadable',state.flowing);state.emittedReadable=true;process.nextTick(emitReadable_,stream);}}function emitReadable_(stream){var state=stream._readableState;debug('emitReadable_',state.destroyed,state.length,state.ended);if(!state.destroyed&&(state.length||state.ended)){stream.emit('readable');state.emittedReadable=false;}// The stream needs another readable event if
// 1. It is not flowing, as the flow mechanism will take
//    care of it.
// 2. It is not ended.
// 3. It is below the highWaterMark, so we can schedule
//    another readable later.
state.needReadable=!state.flowing&&!state.ended&&state.length<=state.highWaterMark;flow(stream);}// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream,state){if(!state.readingMore){state.readingMore=true;process.nextTick(maybeReadMore_,stream,state);}}function maybeReadMore_(stream,state){// Attempt to read more data if we should.
//
// The conditions for reading more data are (one of):
// - Not enough data buffered (state.length < state.highWaterMark). The loop
//   is responsible for filling the buffer with enough data if such data
//   is available. If highWaterMark is 0 and we are not in the flowing mode
//   we should _not_ attempt to buffer any extra data. We'll get more data
//   when the stream consumer calls read() instead.
// - No data in the buffer, and the stream is in flowing mode. In this mode
//   the loop below is responsible for ensuring read() is called. Failing to
//   call read here would abort the flow and there's no other mechanism for
//   continuing the flow if the stream consumer has just subscribed to the
//   'data' event.
//
// In addition to the above conditions to keep reading data, the following
// conditions prevent the data from being read:
// - The stream has ended (state.ended).
// - There is already a pending 'read' operation (state.reading). This is a
//   case where the the stream has called the implementation defined _read()
//   method, but they are processing the call asynchronously and have _not_
//   called push() with new data. In this case we skip performing more
//   read()s. The execution ends in this method again after the _read() ends
//   up calling push() with more data.
while(!state.reading&&!state.ended&&(state.length<state.highWaterMark||state.flowing&&state.length===0)){var len=state.length;debug('maybeReadMore read 0');stream.read(0);if(len===state.length)// didn't get any data, stop spinning.
break;}state.readingMore=false;}// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read=function(n){errorOrDestroy(this,new ERR_METHOD_NOT_IMPLEMENTED('_read()'));};Readable.prototype.pipe=function(dest,pipeOpts){var src=this;var state=this._readableState;switch(state.pipesCount){case 0:state.pipes=dest;break;case 1:state.pipes=[state.pipes,dest];break;default:state.pipes.push(dest);break;}state.pipesCount+=1;debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;var endFn=doEnd?onend:unpipe;if(state.endEmitted)process.nextTick(endFn);else src.once('end',endFn);dest.on('unpipe',onunpipe);function onunpipe(readable,unpipeInfo){debug('onunpipe');if(readable===src){if(unpipeInfo&&unpipeInfo.hasUnpiped===false){unpipeInfo.hasUnpiped=true;cleanup();}}}function onend(){debug('onend');dest.end();}// when the dest drains, it reduces the awaitDrain counter
// on the source.  This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain=pipeOnDrain(src);dest.on('drain',ondrain);var cleanedUp=false;function cleanup(){debug('cleanup');// cleanup event handlers once the pipe is broken
dest.removeListener('close',onclose);dest.removeListener('finish',onfinish);dest.removeListener('drain',ondrain);dest.removeListener('error',onerror);dest.removeListener('unpipe',onunpipe);src.removeListener('end',onend);src.removeListener('end',unpipe);src.removeListener('data',ondata);cleanedUp=true;// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();}src.on('data',ondata);function ondata(chunk){debug('ondata');var ret=dest.write(chunk);debug('dest.write',ret);if(ret===false){// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){debug('false write response, pause',state.awaitDrain);state.awaitDrain++;}src.pause();}}// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er){debug('onerror',er);unpipe();dest.removeListener('error',onerror);if(EElistenerCount(dest,'error')===0)errorOrDestroy(dest,er);}// Make sure our error handler is attached before userland ones.
prependListener(dest,'error',onerror);// Both close and finish should trigger unpipe, but only once.
function onclose(){dest.removeListener('finish',onfinish);unpipe();}dest.once('close',onclose);function onfinish(){debug('onfinish');dest.removeListener('close',onclose);unpipe();}dest.once('finish',onfinish);function unpipe(){debug('unpipe');src.unpipe(dest);}// tell the dest that it's being piped to
dest.emit('pipe',src);// start the flow if it hasn't been started already.
if(!state.flowing){debug('pipe resume');src.resume();}return dest;};function pipeOnDrain(src){return function pipeOnDrainFunctionResult(){var state=src._readableState;debug('pipeOnDrain',state.awaitDrain);if(state.awaitDrain)state.awaitDrain--;if(state.awaitDrain===0&&EElistenerCount(src,'data')){state.flowing=true;flow(src);}};}Readable.prototype.unpipe=function(dest){var state=this._readableState;var unpipeInfo={hasUnpiped:false};// if we're not piping anywhere, then do nothing.
if(state.pipesCount===0)return this;// just one destination.  most common case.
if(state.pipesCount===1){// passed in one, but it's not the right one.
if(dest&&dest!==state.pipes)return this;if(!dest)dest=state.pipes;// got a match.
state.pipes=null;state.pipesCount=0;state.flowing=false;if(dest)dest.emit('unpipe',this,unpipeInfo);return this;}// slow case. multiple pipe destinations.
if(!dest){// remove all.
var dests=state.pipes;var len=state.pipesCount;state.pipes=null;state.pipesCount=0;state.flowing=false;for(var i=0;i<len;i++)dests[i].emit('unpipe',this,{hasUnpiped:false});return this;}// try to find the right one.
var index=indexOf(state.pipes,dest);if(index===-1)return this;state.pipes.splice(index,1);state.pipesCount-=1;if(state.pipesCount===1)state.pipes=state.pipes[0];dest.emit('unpipe',this,unpipeInfo);return this;};// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on=function(ev,fn){var res=Stream.prototype.on.call(this,ev,fn);var state=this._readableState;if(ev==='data'){// update readableListening so that resume() may be a no-op
// a few lines down. This is needed to support once('readable').
state.readableListening=this.listenerCount('readable')>0;// Try start flowing on next tick if stream isn't explicitly paused
if(state.flowing!==false)this.resume();}else if(ev==='readable'){if(!state.endEmitted&&!state.readableListening){state.readableListening=state.needReadable=true;state.flowing=false;state.emittedReadable=false;debug('on readable',state.length,state.reading);if(state.length){emitReadable(this);}else if(!state.reading){process.nextTick(nReadingNextTick,this);}}}return res;};Readable.prototype.addListener=Readable.prototype.on;Readable.prototype.removeListener=function(ev,fn){var res=Stream.prototype.removeListener.call(this,ev,fn);if(ev==='readable'){// We need to check if there is someone still listening to
// readable and reset the state. However this needs to happen
// after readable has been emitted but before I/O (nextTick) to
// support once('readable', fn) cycles. This means that calling
// resume within the same tick will have no
// effect.
process.nextTick(updateReadableListening,this);}return res;};Readable.prototype.removeAllListeners=function(ev){var res=Stream.prototype.removeAllListeners.apply(this,arguments);if(ev==='readable'||ev===undefined){// We need to check if there is someone still listening to
// readable and reset the state. However this needs to happen
// after readable has been emitted but before I/O (nextTick) to
// support once('readable', fn) cycles. This means that calling
// resume within the same tick will have no
// effect.
process.nextTick(updateReadableListening,this);}return res;};function updateReadableListening(self){var state=self._readableState;state.readableListening=self.listenerCount('readable')>0;if(state.resumeScheduled&&!state.paused){// flowing needs to be set to true now, otherwise
// the upcoming resume will not flow.
state.flowing=true;// crude way to check if we should resume
}else if(self.listenerCount('data')>0){self.resume();}}function nReadingNextTick(self){debug('readable nexttick read 0');self.read(0);}// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume=function(){var state=this._readableState;if(!state.flowing){debug('resume');// we flow only if there is no one listening
// for readable, but we still have to call
// resume()
state.flowing=!state.readableListening;resume(this,state);}state.paused=false;return this;};function resume(stream,state){if(!state.resumeScheduled){state.resumeScheduled=true;process.nextTick(resume_,stream,state);}}function resume_(stream,state){debug('resume',state.reading);if(!state.reading){stream.read(0);}state.resumeScheduled=false;stream.emit('resume');flow(stream);if(state.flowing&&!state.reading)stream.read(0);}Readable.prototype.pause=function(){debug('call pause flowing=%j',this._readableState.flowing);if(this._readableState.flowing!==false){debug('pause');this._readableState.flowing=false;this.emit('pause');}this._readableState.paused=true;return this;};function flow(stream){var state=stream._readableState;debug('flow',state.flowing);while(state.flowing&&stream.read()!==null);}// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap=function(stream){var _this=this;var state=this._readableState;var paused=false;stream.on('end',function(){debug('wrapped end');if(state.decoder&&!state.ended){var chunk=state.decoder.end();if(chunk&&chunk.length)_this.push(chunk);}_this.push(null);});stream.on('data',function(chunk){debug('wrapped data');if(state.decoder)chunk=state.decoder.write(chunk);// don't skip over falsy values in objectMode
if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;var ret=_this.push(chunk);if(!ret){paused=true;stream.pause();}});// proxy all the other methods.
// important when wrapping filters and duplexes.
for(var i in stream){if(this[i]===undefined&&typeof stream[i]==='function'){this[i]=function methodWrap(method){return function methodWrapReturnFunction(){return stream[method].apply(stream,arguments);};}(i);}}// proxy certain important events.
for(var n=0;n<kProxyEvents.length;n++){stream.on(kProxyEvents[n],this.emit.bind(this,kProxyEvents[n]));}// when we try to consume some more bytes, simply unpause the
// underlying stream.
this._read=function(n){debug('wrapped _read',n);if(paused){paused=false;stream.resume();}};return this;};if(typeof Symbol==='function'){Readable.prototype[Symbol.asyncIterator]=function(){if(createReadableStreamAsyncIterator===undefined){createReadableStreamAsyncIterator=require('./internal/streams/async_iterator');}return createReadableStreamAsyncIterator(this);};}Object.defineProperty(Readable.prototype,'readableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.highWaterMark;}});Object.defineProperty(Readable.prototype,'readableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState&&this._readableState.buffer;}});Object.defineProperty(Readable.prototype,'readableFlowing',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.flowing;},set:function set(state){if(this._readableState){this._readableState.flowing=state;}}});// exposed for testing purposes only.
Readable._fromList=fromList;Object.defineProperty(Readable.prototype,'readableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._readableState.length;}});// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n,state){// nothing buffered
if(state.length===0)return null;var ret;if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){// read it all, truncate the list
if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.first();else ret=state.buffer.concat(state.length);state.buffer.clear();}else{// read part of list
ret=state.buffer.consume(n,state.decoder);}return ret;}function endReadable(stream){var state=stream._readableState;debug('endReadable',state.endEmitted);if(!state.endEmitted){state.ended=true;process.nextTick(endReadableNT,state,stream);}}function endReadableNT(state,stream){debug('endReadableNT',state.endEmitted,state.length);// Check that we didn't get one last unshift.
if(!state.endEmitted&&state.length===0){state.endEmitted=true;stream.readable=false;stream.emit('end');if(state.autoDestroy){// In case of duplex streams we need a way to detect
// if the writable side is ready for autoDestroy as well
var wState=stream._writableState;if(!wState||wState.autoDestroy&&wState.finished){stream.destroy();}}}}if(typeof Symbol==='function'){Readable.from=function(iterable,opts){if(from===undefined){from=require('./internal/streams/from');}return from(Readable,iterable,opts);};}function indexOf(xs,x){for(var i=0,l=xs.length;i<l;i++){if(xs[i]===x)return i;}return-1;}}).call(this);}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":117,"./_stream_duplex":118,"./internal/streams/async_iterator":123,"./internal/streams/buffer_list":124,"./internal/streams/destroy":125,"./internal/streams/from":127,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":98,"buffer":20,"events":37,"inherits":78,"string_decoder/":132,"util":18}],121:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';module.exports=Transform;var _require$codes=require('../errors').codes,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_TRANSFORM_ALREADY_TRANSFORMING=_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,ERR_TRANSFORM_WITH_LENGTH_0=_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;var Duplex=require('./_stream_duplex');require('inherits')(Transform,Duplex);function afterTransform(er,data){var ts=this._transformState;ts.transforming=false;var cb=ts.writecb;if(cb===null){return this.emit('error',new ERR_MULTIPLE_CALLBACK());}ts.writechunk=null;ts.writecb=null;if(data!=null)// single equals check for both `null` and `undefined`
this.push(data);cb(er);var rs=this._readableState;rs.reading=false;if(rs.needReadable||rs.length<rs.highWaterMark){this._read(rs.highWaterMark);}}function Transform(options){if(!(this instanceof Transform))return new Transform(options);Duplex.call(this,options);this._transformState={afterTransform:afterTransform.bind(this),needTransform:false,transforming:false,writecb:null,writechunk:null,writeencoding:null};// start out asking for a readable event once data is transformed.
this._readableState.needReadable=true;// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync=false;if(options){if(typeof options.transform==='function')this._transform=options.transform;if(typeof options.flush==='function')this._flush=options.flush;}// When the writable side finishes, then flush out anything remaining.
this.on('prefinish',prefinish);}function prefinish(){var _this=this;if(typeof this._flush==='function'&&!this._readableState.destroyed){this._flush(function(er,data){done(_this,er,data);});}else{done(this,null,null);}}Transform.prototype.push=function(chunk,encoding){this._transformState.needTransform=false;return Duplex.prototype.push.call(this,chunk,encoding);};// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));};Transform.prototype._write=function(chunk,encoding,cb){var ts=this._transformState;ts.writecb=cb;ts.writechunk=chunk;ts.writeencoding=encoding;if(!ts.transforming){var rs=this._readableState;if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);}};// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read=function(n){var ts=this._transformState;if(ts.writechunk!==null&&!ts.transforming){ts.transforming=true;this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);}else{// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform=true;}};Transform.prototype._destroy=function(err,cb){Duplex.prototype._destroy.call(this,err,function(err2){cb(err2);});};function done(stream,er,data){if(er)return stream.emit('error',er);if(data!=null)// single equals check for both `null` and `undefined`
stream.push(data);// TODO(BridgeAR): Write a test for these two error cases
// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
if(stream._writableState.length)throw new ERR_TRANSFORM_WITH_LENGTH_0();if(stream._transformState.transforming)throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();return stream.push(null);}},{"../errors":117,"./_stream_duplex":118,"inherits":78}],122:[function(require,module,exports){(function(process,global){(function(){// Copyright Joyent, Inc. and other Node contributors.
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
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';module.exports=Writable;/* <replacement> */function WriteReq(chunk,encoding,cb){this.chunk=chunk;this.encoding=encoding;this.callback=cb;this.next=null;}// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state){var _this=this;this.next=null;this.entry=null;this.finish=function(){onCorkedFinish(_this,state);};}/* </replacement> */ /*<replacement>*/var Duplex;/*</replacement>*/Writable.WritableState=WritableState;/*<replacement>*/var internalUtil={deprecate:require('util-deprecate')};/*</replacement>*/ /*<replacement>*/var Stream=require('./internal/streams/stream');/*</replacement>*/var Buffer=require('buffer').Buffer;var OurUint8Array=(typeof global!=='undefined'?global:typeof window!=='undefined'?window:typeof self!=='undefined'?self:{}).Uint8Array||function(){};function _uint8ArrayToBuffer(chunk){return Buffer.from(chunk);}function _isUint8Array(obj){return Buffer.isBuffer(obj)||obj instanceof OurUint8Array;}var destroyImpl=require('./internal/streams/destroy');var _require=require('./internal/streams/state'),getHighWaterMark=_require.getHighWaterMark;var _require$codes=require('../errors').codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_STREAM_CANNOT_PIPE=_require$codes.ERR_STREAM_CANNOT_PIPE,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED,ERR_STREAM_NULL_VALUES=_require$codes.ERR_STREAM_NULL_VALUES,ERR_STREAM_WRITE_AFTER_END=_require$codes.ERR_STREAM_WRITE_AFTER_END,ERR_UNKNOWN_ENCODING=_require$codes.ERR_UNKNOWN_ENCODING;var errorOrDestroy=destroyImpl.errorOrDestroy;require('inherits')(Writable,Stream);function nop(){}function WritableState(options,stream,isDuplex){Duplex=Duplex||require('./_stream_duplex');options=options||{};// Duplex streams are both readable and writable, but share
// the same options object.
// However, some cases require setting options to different
// values for the readable and the writable sides of the duplex stream,
// e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
if(typeof isDuplex!=='boolean')isDuplex=stream instanceof Duplex;// object stream flag to indicate whether or not this stream
// contains buffers or objects.
this.objectMode=!!options.objectMode;if(isDuplex)this.objectMode=this.objectMode||!!options.writableObjectMode;// the point at which write() starts returning false
// Note: 0 is a valid value, means that we always return false if
// the entire buffer is not flushed immediately on write()
this.highWaterMark=getHighWaterMark(this,options,'writableHighWaterMark',isDuplex);// if _final has been called
this.finalCalled=false;// drain event flag.
this.needDrain=false;// at the start of calling end()
this.ending=false;// when end() has been called, and returned
this.ended=false;// when 'finish' is emitted
this.finished=false;// has it been destroyed
this.destroyed=false;// should we decode strings into buffers before passing to _write?
// this is here so that some node-core streams can optimize string
// handling at a lower level.
var noDecode=options.decodeStrings===false;this.decodeStrings=!noDecode;// Crypto is kind of old and crusty.  Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding=options.defaultEncoding||'utf8';// not an actual buffer we keep track of, but a measurement
// of how much we're waiting to get pushed to some underlying
// socket or file.
this.length=0;// a flag to see when we're in the middle of a write.
this.writing=false;// when true all writes will be buffered until .uncork() call
this.corked=0;// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick.  We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync=true;// a flag to know if we're processing previously buffered items, which
// may call the _write() callback in the same tick, so that we don't
// end up in an overlapped onwrite situation.
this.bufferProcessing=false;// the callback that's passed to _write(chunk,cb)
this.onwrite=function(er){onwrite(stream,er);};// the callback that the user supplies to write(chunk,encoding,cb)
this.writecb=null;// the amount that is being written when _write is called.
this.writelen=0;this.bufferedRequest=null;this.lastBufferedRequest=null;// number of pending user-supplied write callbacks
// this must be 0 before 'finish' can be emitted
this.pendingcb=0;// emit prefinish if the only thing we're waiting for is _write cbs
// This is relevant for synchronous Transform streams
this.prefinished=false;// True if the error was already emitted and should not be thrown again
this.errorEmitted=false;// Should close be emitted on destroy. Defaults to true.
this.emitClose=options.emitClose!==false;// Should .destroy() be called after 'finish' (and potentially 'end')
this.autoDestroy=!!options.autoDestroy;// count buffered requests
this.bufferedRequestCount=0;// allocate the first CorkedRequest, there is always
// one allocated and free to use, and we maintain at most two
this.corkedRequestsFree=new CorkedRequest(this);}WritableState.prototype.getBuffer=function getBuffer(){var current=this.bufferedRequest;var out=[];while(current){out.push(current);current=current.next;}return out;};(function(){try{Object.defineProperty(WritableState.prototype,'buffer',{get:internalUtil.deprecate(function writableStateBufferGetter(){return this.getBuffer();},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.','DEP0003')});}catch(_){}})();// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;if(typeof Symbol==='function'&&Symbol.hasInstance&&typeof Function.prototype[Symbol.hasInstance]==='function'){realHasInstance=Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable,Symbol.hasInstance,{value:function value(object){if(realHasInstance.call(this,object))return true;if(this!==Writable)return false;return object&&object._writableState instanceof WritableState;}});}else{realHasInstance=function realHasInstance(object){return object instanceof this;};}function Writable(options){Duplex=Duplex||require('./_stream_duplex');// Writable ctor is applied to Duplexes, too.
// `realHasInstance` is necessary because using plain `instanceof`
// would return false, as no `_writableState` property is attached.
// Trying to use the custom `instanceof` for Writable here will also break the
// Node.js LazyTransform implementation, which has a non-trivial getter for
// `_writableState` that would lead to infinite recursion.
// Checking for a Stream.Duplex instance is faster here instead of inside
// the WritableState constructor, at least with V8 6.5
var isDuplex=this instanceof Duplex;if(!isDuplex&&!realHasInstance.call(Writable,this))return new Writable(options);this._writableState=new WritableState(options,this,isDuplex);// legacy.
this.writable=true;if(options){if(typeof options.write==='function')this._write=options.write;if(typeof options.writev==='function')this._writev=options.writev;if(typeof options.destroy==='function')this._destroy=options.destroy;if(typeof options["final"]==='function')this._final=options["final"];}Stream.call(this);}// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe=function(){errorOrDestroy(this,new ERR_STREAM_CANNOT_PIPE());};function writeAfterEnd(stream,cb){var er=new ERR_STREAM_WRITE_AFTER_END();// TODO: defer error events consistently everywhere, not just the cb
errorOrDestroy(stream,er);process.nextTick(cb,er);}// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream,state,chunk,cb){var er;if(chunk===null){er=new ERR_STREAM_NULL_VALUES();}else if(typeof chunk!=='string'&&!state.objectMode){er=new ERR_INVALID_ARG_TYPE('chunk',['string','Buffer'],chunk);}if(er){errorOrDestroy(stream,er);process.nextTick(cb,er);return false;}return true;}Writable.prototype.write=function(chunk,encoding,cb){var state=this._writableState;var ret=false;var isBuf=!state.objectMode&&_isUint8Array(chunk);if(isBuf&&!Buffer.isBuffer(chunk)){chunk=_uint8ArrayToBuffer(chunk);}if(typeof encoding==='function'){cb=encoding;encoding=null;}if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;if(typeof cb!=='function')cb=nop;if(state.ending)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){state.pendingcb++;ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);}return ret;};Writable.prototype.cork=function(){this._writableState.corked++;};Writable.prototype.uncork=function(){var state=this._writableState;if(state.corked){state.corked--;if(!state.writing&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);}};Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){// node::ParseEncoding() requires lower case.
if(typeof encoding==='string')encoding=encoding.toLowerCase();if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new ERR_UNKNOWN_ENCODING(encoding);this._writableState.defaultEncoding=encoding;return this;};Object.defineProperty(Writable.prototype,'writableBuffer',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState&&this._writableState.getBuffer();}});function decodeChunk(state,chunk,encoding){if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){chunk=Buffer.from(chunk,encoding);}return chunk;}Object.defineProperty(Writable.prototype,'writableHighWaterMark',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.highWaterMark;}});// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){if(!isBuf){var newChunk=decodeChunk(state,chunk,encoding);if(chunk!==newChunk){isBuf=true;encoding='buffer';chunk=newChunk;}}var len=state.objectMode?1:chunk.length;state.length+=len;var ret=state.length<state.highWaterMark;// we must ensure that previous needDrain will not be reset to false.
if(!ret)state.needDrain=true;if(state.writing||state.corked){var last=state.lastBufferedRequest;state.lastBufferedRequest={chunk:chunk,encoding:encoding,isBuf:isBuf,callback:cb,next:null};if(last){last.next=state.lastBufferedRequest;}else{state.bufferedRequest=state.lastBufferedRequest;}state.bufferedRequestCount+=1;}else{doWrite(stream,state,false,len,chunk,encoding,cb);}return ret;}function doWrite(stream,state,writev,len,chunk,encoding,cb){state.writelen=len;state.writecb=cb;state.writing=true;state.sync=true;if(state.destroyed)state.onwrite(new ERR_STREAM_DESTROYED('write'));else if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);state.sync=false;}function onwriteError(stream,state,sync,er,cb){--state.pendingcb;if(sync){// defer the callback if we are being called synchronously
// to avoid piling up things on the stack
process.nextTick(cb,er);// this can emit finish, and it will always happen
// after error
process.nextTick(finishMaybe,stream,state);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);}else{// the caller expect this to happen before if
// it is async
cb(er);stream._writableState.errorEmitted=true;errorOrDestroy(stream,er);// this can emit finish, but finish must
// always follow error
finishMaybe(stream,state);}}function onwriteStateUpdate(state){state.writing=false;state.writecb=null;state.length-=state.writelen;state.writelen=0;}function onwrite(stream,er){var state=stream._writableState;var sync=state.sync;var cb=state.writecb;if(typeof cb!=='function')throw new ERR_MULTIPLE_CALLBACK();onwriteStateUpdate(state);if(er)onwriteError(stream,state,sync,er,cb);else{// Check if we're actually ready to finish, but don't emit yet
var finished=needFinish(state)||stream.destroyed;if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){clearBuffer(stream,state);}if(sync){process.nextTick(afterWrite,stream,state,finished,cb);}else{afterWrite(stream,state,finished,cb);}}}function afterWrite(stream,state,finished,cb){if(!finished)onwriteDrain(stream,state);state.pendingcb--;cb();finishMaybe(stream,state);}// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream,state){if(state.length===0&&state.needDrain){state.needDrain=false;stream.emit('drain');}}// if there's something in the buffer waiting, then process it
function clearBuffer(stream,state){state.bufferProcessing=true;var entry=state.bufferedRequest;if(stream._writev&&entry&&entry.next){// Fast case, write everything using _writev()
var l=state.bufferedRequestCount;var buffer=new Array(l);var holder=state.corkedRequestsFree;holder.entry=entry;var count=0;var allBuffers=true;while(entry){buffer[count]=entry;if(!entry.isBuf)allBuffers=false;entry=entry.next;count+=1;}buffer.allBuffers=allBuffers;doWrite(stream,state,true,state.length,buffer,'',holder.finish);// doWrite is almost always async, defer these to save a bit of time
// as the hot path ends with doWrite
state.pendingcb++;state.lastBufferedRequest=null;if(holder.next){state.corkedRequestsFree=holder.next;holder.next=null;}else{state.corkedRequestsFree=new CorkedRequest(state);}state.bufferedRequestCount=0;}else{// Slow case, write chunks one-by-one
while(entry){var chunk=entry.chunk;var encoding=entry.encoding;var cb=entry.callback;var len=state.objectMode?1:chunk.length;doWrite(stream,state,false,len,chunk,encoding,cb);entry=entry.next;state.bufferedRequestCount--;// if we didn't call the onwrite immediately, then
// it means that we need to wait until it does.
// also, that means that the chunk and cb are currently
// being processed, so move the buffer counter past them.
if(state.writing){break;}}if(entry===null)state.lastBufferedRequest=null;}state.bufferedRequest=entry;state.bufferProcessing=false;}Writable.prototype._write=function(chunk,encoding,cb){cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));};Writable.prototype._writev=null;Writable.prototype.end=function(chunk,encoding,cb){var state=this._writableState;if(typeof chunk==='function'){cb=chunk;chunk=null;encoding=null;}else if(typeof encoding==='function'){cb=encoding;encoding=null;}if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);// .end() fully uncorks
if(state.corked){state.corked=1;this.uncork();}// ignore unnecessary end() calls.
if(!state.ending)endWritable(this,state,cb);return this;};Object.defineProperty(Writable.prototype,'writableLength',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){return this._writableState.length;}});function needFinish(state){return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;}function callFinal(stream,state){stream._final(function(err){state.pendingcb--;if(err){errorOrDestroy(stream,err);}state.prefinished=true;stream.emit('prefinish');finishMaybe(stream,state);});}function prefinish(stream,state){if(!state.prefinished&&!state.finalCalled){if(typeof stream._final==='function'&&!state.destroyed){state.pendingcb++;state.finalCalled=true;process.nextTick(callFinal,stream,state);}else{state.prefinished=true;stream.emit('prefinish');}}}function finishMaybe(stream,state){var need=needFinish(state);if(need){prefinish(stream,state);if(state.pendingcb===0){state.finished=true;stream.emit('finish');if(state.autoDestroy){// In case of duplex streams we need a way to detect
// if the readable side is ready for autoDestroy as well
var rState=stream._readableState;if(!rState||rState.autoDestroy&&rState.endEmitted){stream.destroy();}}}}return need;}function endWritable(stream,state,cb){state.ending=true;finishMaybe(stream,state);if(cb){if(state.finished)process.nextTick(cb);else stream.once('finish',cb);}state.ended=true;stream.writable=false;}function onCorkedFinish(corkReq,state,err){var entry=corkReq.entry;corkReq.entry=null;while(entry){var cb=entry.callback;state.pendingcb--;cb(err);entry=entry.next;}// reuse the free corkReq.
state.corkedRequestsFree.next=corkReq;}Object.defineProperty(Writable.prototype,'destroyed',{// making it explicit this property is not enumerable
// because otherwise some prototype manipulation in
// userland will fail
enumerable:false,get:function get(){if(this._writableState===undefined){return false;}return this._writableState.destroyed;},set:function set(value){// we ignore the value if the stream
// has not been initialized yet
if(!this._writableState){return;}// backward compatibility, the user is explicitly
// managing destroyed
this._writableState.destroyed=value;}});Writable.prototype.destroy=destroyImpl.destroy;Writable.prototype._undestroy=destroyImpl.undestroy;Writable.prototype._destroy=function(err,cb){cb(err);};}).call(this);}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"../errors":117,"./_stream_duplex":118,"./internal/streams/destroy":125,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":98,"buffer":20,"inherits":78,"util-deprecate":135}],123:[function(require,module,exports){(function(process){(function(){'use strict';var _Object$setPrototypeO;function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return _typeof(key)==="symbol"?key:String(key);}function _toPrimitive(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}var finished=require('./end-of-stream');var kLastResolve=Symbol('lastResolve');var kLastReject=Symbol('lastReject');var kError=Symbol('error');var kEnded=Symbol('ended');var kLastPromise=Symbol('lastPromise');var kHandlePromise=Symbol('handlePromise');var kStream=Symbol('stream');function createIterResult(value,done){return{value:value,done:done};}function readAndResolve(iter){var resolve=iter[kLastResolve];if(resolve!==null){var data=iter[kStream].read();// we defer if data is null
// we can be expecting either 'end' or
// 'error'
if(data!==null){iter[kLastPromise]=null;iter[kLastResolve]=null;iter[kLastReject]=null;resolve(createIterResult(data,false));}}}function onReadable(iter){// we wait for the next tick, because it might
// emit an error with process.nextTick
process.nextTick(readAndResolve,iter);}function wrapForNext(lastPromise,iter){return function(resolve,reject){lastPromise.then(function(){if(iter[kEnded]){resolve(createIterResult(undefined,true));return;}iter[kHandlePromise](resolve,reject);},reject);};}var AsyncIteratorPrototype=Object.getPrototypeOf(function(){});var ReadableStreamAsyncIteratorPrototype=Object.setPrototypeOf((_Object$setPrototypeO={get stream(){return this[kStream];},next:function next(){var _this=this;// if we have detected an error in the meanwhile
// reject straight away
var error=this[kError];if(error!==null){return Promise.reject(error);}if(this[kEnded]){return Promise.resolve(createIterResult(undefined,true));}if(this[kStream].destroyed){// We need to defer via nextTick because if .destroy(err) is
// called, the error will be emitted via nextTick, and
// we cannot guarantee that there is no error lingering around
// waiting to be emitted.
return new Promise(function(resolve,reject){process.nextTick(function(){if(_this[kError]){reject(_this[kError]);}else{resolve(createIterResult(undefined,true));}});});}// if we have multiple next() calls
// we will wait for the previous Promise to finish
// this logic is optimized to support for await loops,
// where next() is only called once at a time
var lastPromise=this[kLastPromise];var promise;if(lastPromise){promise=new Promise(wrapForNext(lastPromise,this));}else{// fast path needed to support multiple this.push()
// without triggering the next() queue
var data=this[kStream].read();if(data!==null){return Promise.resolve(createIterResult(data,false));}promise=new Promise(this[kHandlePromise]);}this[kLastPromise]=promise;return promise;}},_defineProperty(_Object$setPrototypeO,Symbol.asyncIterator,function(){return this;}),_defineProperty(_Object$setPrototypeO,"return",function _return(){var _this2=this;// destroy(err, cb) is a private API
// we can guarantee we have that here, because we control the
// Readable class this is attached to
return new Promise(function(resolve,reject){_this2[kStream].destroy(null,function(err){if(err){reject(err);return;}resolve(createIterResult(undefined,true));});});}),_Object$setPrototypeO),AsyncIteratorPrototype);var createReadableStreamAsyncIterator=function createReadableStreamAsyncIterator(stream){var _Object$create;var iterator=Object.create(ReadableStreamAsyncIteratorPrototype,(_Object$create={},_defineProperty(_Object$create,kStream,{value:stream,writable:true}),_defineProperty(_Object$create,kLastResolve,{value:null,writable:true}),_defineProperty(_Object$create,kLastReject,{value:null,writable:true}),_defineProperty(_Object$create,kError,{value:null,writable:true}),_defineProperty(_Object$create,kEnded,{value:stream._readableState.endEmitted,writable:true}),_defineProperty(_Object$create,kHandlePromise,{value:function value(resolve,reject){var data=iterator[kStream].read();if(data){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(data,false));}else{iterator[kLastResolve]=resolve;iterator[kLastReject]=reject;}},writable:true}),_Object$create));iterator[kLastPromise]=null;finished(stream,function(err){if(err&&err.code!=='ERR_STREAM_PREMATURE_CLOSE'){var reject=iterator[kLastReject];// reject if we are waiting for data in the Promise
// returned by next() and store the error
if(reject!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;reject(err);}iterator[kError]=err;return;}var resolve=iterator[kLastResolve];if(resolve!==null){iterator[kLastPromise]=null;iterator[kLastResolve]=null;iterator[kLastReject]=null;resolve(createIterResult(undefined,true));}iterator[kEnded]=true;});stream.on('readable',onReadable.bind(null,iterator));return iterator;};module.exports=createReadableStreamAsyncIterator;}).call(this);}).call(this,require('_process'));},{"./end-of-stream":126,"_process":98}],124:[function(require,module,exports){'use strict';function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;})),keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){_defineProperty(target,key,source[key]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}return target;}function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return _typeof(key)==="symbol"?key:String(key);}function _toPrimitive(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}var _require=require('buffer'),Buffer=_require.Buffer;var _require2=require('util'),inspect=_require2.inspect;var custom=inspect&&inspect.custom||'inspect';function copyBuffer(src,target,offset){Buffer.prototype.copy.call(src,target,offset);}module.exports=/*#__PURE__*/function(){function BufferList(){_classCallCheck(this,BufferList);this.head=null;this.tail=null;this.length=0;}_createClass(BufferList,[{key:"push",value:function push(v){var entry={data:v,next:null};if(this.length>0)this.tail.next=entry;else this.head=entry;this.tail=entry;++this.length;}},{key:"unshift",value:function unshift(v){var entry={data:v,next:this.head};if(this.length===0)this.tail=entry;this.head=entry;++this.length;}},{key:"shift",value:function shift(){if(this.length===0)return;var ret=this.head.data;if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;--this.length;return ret;}},{key:"clear",value:function clear(){this.head=this.tail=null;this.length=0;}},{key:"join",value:function join(s){if(this.length===0)return'';var p=this.head;var ret=''+p.data;while(p=p.next)ret+=s+p.data;return ret;}},{key:"concat",value:function concat(n){if(this.length===0)return Buffer.alloc(0);var ret=Buffer.allocUnsafe(n>>>0);var p=this.head;var i=0;while(p){copyBuffer(p.data,ret,i);i+=p.data.length;p=p.next;}return ret;}// Consumes a specified amount of bytes or characters from the buffered data.
},{key:"consume",value:function consume(n,hasStrings){var ret;if(n<this.head.data.length){// `slice` is the same for buffers and strings.
ret=this.head.data.slice(0,n);this.head.data=this.head.data.slice(n);}else if(n===this.head.data.length){// First chunk is a perfect match.
ret=this.shift();}else{// Result spans more than one buffer.
ret=hasStrings?this._getString(n):this._getBuffer(n);}return ret;}},{key:"first",value:function first(){return this.head.data;}// Consumes a specified amount of characters from the buffered data.
},{key:"_getString",value:function _getString(n){var p=this.head;var c=1;var ret=p.data;n-=ret.length;while(p=p.next){var str=p.data;var nb=n>str.length?str.length:n;if(nb===str.length)ret+=str;else ret+=str.slice(0,n);n-=nb;if(n===0){if(nb===str.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else{this.head=p;p.data=str.slice(nb);}break;}++c;}this.length-=c;return ret;}// Consumes a specified amount of bytes from the buffered data.
},{key:"_getBuffer",value:function _getBuffer(n){var ret=Buffer.allocUnsafe(n);var p=this.head;var c=1;p.data.copy(ret);n-=p.data.length;while(p=p.next){var buf=p.data;var nb=n>buf.length?buf.length:n;buf.copy(ret,ret.length-n,0,nb);n-=nb;if(n===0){if(nb===buf.length){++c;if(p.next)this.head=p.next;else this.head=this.tail=null;}else{this.head=p;p.data=buf.slice(nb);}break;}++c;}this.length-=c;return ret;}// Make sure the linked list only shows the minimal necessary information.
},{key:custom,value:function value(_,options){return inspect(this,_objectSpread(_objectSpread({},options),{},{// Only inspect one level.
depth:0,// It should not recurse.
customInspect:false}));}}]);return BufferList;}();},{"buffer":20,"util":18}],125:[function(require,module,exports){(function(process){(function(){'use strict';// undocumented cb() API, needed for core, not for public API
function destroy(err,cb){var _this=this;var readableDestroyed=this._readableState&&this._readableState.destroyed;var writableDestroyed=this._writableState&&this._writableState.destroyed;if(readableDestroyed||writableDestroyed){if(cb){cb(err);}else if(err){if(!this._writableState){process.nextTick(emitErrorNT,this,err);}else if(!this._writableState.errorEmitted){this._writableState.errorEmitted=true;process.nextTick(emitErrorNT,this,err);}}return this;}// we set destroyed to true before firing error callbacks in order
// to make it re-entrance safe in case destroy() is called within callbacks
if(this._readableState){this._readableState.destroyed=true;}// if this is a duplex stream mark the writable part as destroyed as well
if(this._writableState){this._writableState.destroyed=true;}this._destroy(err||null,function(err){if(!cb&&err){if(!_this._writableState){process.nextTick(emitErrorAndCloseNT,_this,err);}else if(!_this._writableState.errorEmitted){_this._writableState.errorEmitted=true;process.nextTick(emitErrorAndCloseNT,_this,err);}else{process.nextTick(emitCloseNT,_this);}}else if(cb){process.nextTick(emitCloseNT,_this);cb(err);}else{process.nextTick(emitCloseNT,_this);}});return this;}function emitErrorAndCloseNT(self,err){emitErrorNT(self,err);emitCloseNT(self);}function emitCloseNT(self){if(self._writableState&&!self._writableState.emitClose)return;if(self._readableState&&!self._readableState.emitClose)return;self.emit('close');}function undestroy(){if(this._readableState){this._readableState.destroyed=false;this._readableState.reading=false;this._readableState.ended=false;this._readableState.endEmitted=false;}if(this._writableState){this._writableState.destroyed=false;this._writableState.ended=false;this._writableState.ending=false;this._writableState.finalCalled=false;this._writableState.prefinished=false;this._writableState.finished=false;this._writableState.errorEmitted=false;}}function emitErrorNT(self,err){self.emit('error',err);}function errorOrDestroy(stream,err){// We have tests that rely on errors being emitted
// in the same tick, so changing this is semver major.
// For now when you opt-in to autoDestroy we allow
// the error to be emitted nextTick. In a future
// semver major update we should change the default to this.
var rState=stream._readableState;var wState=stream._writableState;if(rState&&rState.autoDestroy||wState&&wState.autoDestroy)stream.destroy(err);else stream.emit('error',err);}module.exports={destroy:destroy,undestroy:undestroy,errorOrDestroy:errorOrDestroy};}).call(this);}).call(this,require('_process'));},{"_process":98}],126:[function(require,module,exports){// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';var ERR_STREAM_PREMATURE_CLOSE=require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;function once(callback){var called=false;return function(){if(called)return;called=true;for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}callback.apply(this,args);};}function noop(){}function isRequest(stream){return stream.setHeader&&typeof stream.abort==='function';}function eos(stream,opts,callback){if(typeof opts==='function')return eos(stream,null,opts);if(!opts)opts={};callback=once(callback||noop);var readable=opts.readable||opts.readable!==false&&stream.readable;var writable=opts.writable||opts.writable!==false&&stream.writable;var onlegacyfinish=function onlegacyfinish(){if(!stream.writable)onfinish();};var writableEnded=stream._writableState&&stream._writableState.finished;var onfinish=function onfinish(){writable=false;writableEnded=true;if(!readable)callback.call(stream);};var readableEnded=stream._readableState&&stream._readableState.endEmitted;var onend=function onend(){readable=false;readableEnded=true;if(!writable)callback.call(stream);};var onerror=function onerror(err){callback.call(stream,err);};var onclose=function onclose(){var err;if(readable&&!readableEnded){if(!stream._readableState||!stream._readableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE();return callback.call(stream,err);}if(writable&&!writableEnded){if(!stream._writableState||!stream._writableState.ended)err=new ERR_STREAM_PREMATURE_CLOSE();return callback.call(stream,err);}};var onrequest=function onrequest(){stream.req.on('finish',onfinish);};if(isRequest(stream)){stream.on('complete',onfinish);stream.on('abort',onclose);if(stream.req)onrequest();else stream.on('request',onrequest);}else if(writable&&!stream._writableState){// legacy streams
stream.on('end',onlegacyfinish);stream.on('close',onlegacyfinish);}stream.on('end',onend);stream.on('finish',onfinish);if(opts.error!==false)stream.on('error',onerror);stream.on('close',onclose);return function(){stream.removeListener('complete',onfinish);stream.removeListener('abort',onclose);stream.removeListener('request',onrequest);if(stream.req)stream.req.removeListener('finish',onfinish);stream.removeListener('end',onlegacyfinish);stream.removeListener('close',onlegacyfinish);stream.removeListener('finish',onfinish);stream.removeListener('end',onend);stream.removeListener('error',onerror);stream.removeListener('close',onclose);};}module.exports=eos;},{"../../../errors":117}],127:[function(require,module,exports){module.exports=function(){throw new Error('Readable.from is not available in the browser');};},{}],128:[function(require,module,exports){// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';var eos;function once(callback){var called=false;return function(){if(called)return;called=true;callback.apply(void 0,arguments);};}var _require$codes=require('../../../errors').codes,ERR_MISSING_ARGS=_require$codes.ERR_MISSING_ARGS,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED;function noop(err){// Rethrow the error if it exists to avoid swallowing it
if(err)throw err;}function isRequest(stream){return stream.setHeader&&typeof stream.abort==='function';}function destroyer(stream,reading,writing,callback){callback=once(callback);var closed=false;stream.on('close',function(){closed=true;});if(eos===undefined)eos=require('./end-of-stream');eos(stream,{readable:reading,writable:writing},function(err){if(err)return callback(err);closed=true;callback();});var destroyed=false;return function(err){if(closed)return;if(destroyed)return;destroyed=true;// request.destroy just do .end - .abort is what we want
if(isRequest(stream))return stream.abort();if(typeof stream.destroy==='function')return stream.destroy();callback(err||new ERR_STREAM_DESTROYED('pipe'));};}function call(fn){fn();}function pipe(from,to){return from.pipe(to);}function popCallback(streams){if(!streams.length)return noop;if(typeof streams[streams.length-1]!=='function')return noop;return streams.pop();}function pipeline(){for(var _len=arguments.length,streams=new Array(_len),_key=0;_key<_len;_key++){streams[_key]=arguments[_key];}var callback=popCallback(streams);if(Array.isArray(streams[0]))streams=streams[0];if(streams.length<2){throw new ERR_MISSING_ARGS('streams');}var error;var destroys=streams.map(function(stream,i){var reading=i<streams.length-1;var writing=i>0;return destroyer(stream,reading,writing,function(err){if(!error)error=err;if(err)destroys.forEach(call);if(reading)return;destroys.forEach(call);callback(error);});});return streams.reduce(pipe);}module.exports=pipeline;},{"../../../errors":117,"./end-of-stream":126}],129:[function(require,module,exports){'use strict';var ERR_INVALID_OPT_VALUE=require('../../../errors').codes.ERR_INVALID_OPT_VALUE;function highWaterMarkFrom(options,isDuplex,duplexKey){return options.highWaterMark!=null?options.highWaterMark:isDuplex?options[duplexKey]:null;}function getHighWaterMark(state,options,duplexKey,isDuplex){var hwm=highWaterMarkFrom(options,isDuplex,duplexKey);if(hwm!=null){if(!(isFinite(hwm)&&Math.floor(hwm)===hwm)||hwm<0){var name=isDuplex?duplexKey:'highWaterMark';throw new ERR_INVALID_OPT_VALUE(name,hwm);}return Math.floor(hwm);}// Default value
return state.objectMode?16:16*1024;}module.exports={getHighWaterMark:getHighWaterMark};},{"../../../errors":117}],130:[function(require,module,exports){module.exports=require('events').EventEmitter;},{"events":37}],131:[function(require,module,exports){exports=module.exports=require('./lib/_stream_readable.js');exports.Stream=exports;exports.Readable=exports;exports.Writable=require('./lib/_stream_writable.js');exports.Duplex=require('./lib/_stream_duplex.js');exports.Transform=require('./lib/_stream_transform.js');exports.PassThrough=require('./lib/_stream_passthrough.js');exports.finished=require('./lib/internal/streams/end-of-stream.js');exports.pipeline=require('./lib/internal/streams/pipeline.js');},{"./lib/_stream_duplex.js":118,"./lib/_stream_passthrough.js":119,"./lib/_stream_readable.js":120,"./lib/_stream_transform.js":121,"./lib/_stream_writable.js":122,"./lib/internal/streams/end-of-stream.js":126,"./lib/internal/streams/pipeline.js":128}],132:[function(require,module,exports){// Copyright Joyent, Inc. and other Node contributors.
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
'use strict';/*<replacement>*/var Buffer=require('safe-buffer').Buffer;/*</replacement>*/var isEncoding=Buffer.isEncoding||function(encoding){encoding=''+encoding;switch(encoding&&encoding.toLowerCase()){case'hex':case'utf8':case'utf-8':case'ascii':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':case'raw':return true;default:return false;}};function _normalizeEncoding(enc){if(!enc)return'utf8';var retried;while(true){switch(enc){case'utf8':case'utf-8':return'utf8';case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':return'utf16le';case'latin1':case'binary':return'latin1';case'base64':case'ascii':case'hex':return enc;default:if(retried)return;// undefined
enc=(''+enc).toLowerCase();retried=true;}}};// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc){var nenc=_normalizeEncoding(enc);if(typeof nenc!=='string'&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error('Unknown encoding: '+enc);return nenc||enc;}// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder=StringDecoder;function StringDecoder(encoding){this.encoding=normalizeEncoding(encoding);var nb;switch(this.encoding){case'utf16le':this.text=utf16Text;this.end=utf16End;nb=4;break;case'utf8':this.fillLast=utf8FillLast;nb=4;break;case'base64':this.text=base64Text;this.end=base64End;nb=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return;}this.lastNeed=0;this.lastTotal=0;this.lastChar=Buffer.allocUnsafe(nb);}StringDecoder.prototype.write=function(buf){if(buf.length===0)return'';var r;var i;if(this.lastNeed){r=this.fillLast(buf);if(r===undefined)return'';i=this.lastNeed;this.lastNeed=0;}else{i=0;}if(i<buf.length)return r?r+this.text(buf,i):this.text(buf,i);return r||'';};StringDecoder.prototype.end=utf8End;// Returns only complete characters in a Buffer
StringDecoder.prototype.text=utf8Text;// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast=function(buf){if(this.lastNeed<=buf.length){buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal);}buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length);this.lastNeed-=buf.length;};// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(_byte){if(_byte<=0x7F)return 0;else if(_byte>>5===0x06)return 2;else if(_byte>>4===0x0E)return 3;else if(_byte>>3===0x1E)return 4;return _byte>>6===0x02?-1:-2;}// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self,buf,i){var j=buf.length-1;if(j<i)return 0;var nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-1;return nb;}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0)self.lastNeed=nb-2;return nb;}if(--j<i||nb===-2)return 0;nb=utf8CheckByte(buf[j]);if(nb>=0){if(nb>0){if(nb===2)nb=0;else self.lastNeed=nb-3;}return nb;}return 0;}// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self,buf,p){if((buf[0]&0xC0)!==0x80){self.lastNeed=0;return"\uFFFD";}if(self.lastNeed>1&&buf.length>1){if((buf[1]&0xC0)!==0x80){self.lastNeed=1;return"\uFFFD";}if(self.lastNeed>2&&buf.length>2){if((buf[2]&0xC0)!==0x80){self.lastNeed=2;return"\uFFFD";}}}}// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf){var p=this.lastTotal-this.lastNeed;var r=utf8CheckExtraBytes(this,buf,p);if(r!==undefined)return r;if(this.lastNeed<=buf.length){buf.copy(this.lastChar,p,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal);}buf.copy(this.lastChar,p,0,buf.length);this.lastNeed-=buf.length;}// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf,i){var total=utf8CheckIncomplete(this,buf,i);if(!this.lastNeed)return buf.toString('utf8',i);this.lastTotal=total;var end=buf.length-(total-this.lastNeed);buf.copy(this.lastChar,0,end);return buf.toString('utf8',i,end);}// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+"\uFFFD";return r;}// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf,i){if((buf.length-i)%2===0){var r=buf.toString('utf16le',i);if(r){var c=r.charCodeAt(r.length-1);if(c>=0xD800&&c<=0xDBFF){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];return r.slice(0,-1);}}return r;}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=buf[buf.length-1];return buf.toString('utf16le',i,buf.length-1);}// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed){var end=this.lastTotal-this.lastNeed;return r+this.lastChar.toString('utf16le',0,end);}return r;}function base64Text(buf,i){var n=(buf.length-i)%3;if(n===0)return buf.toString('base64',i);this.lastNeed=3-n;this.lastTotal=3;if(n===1){this.lastChar[0]=buf[buf.length-1];}else{this.lastChar[0]=buf[buf.length-2];this.lastChar[1]=buf[buf.length-1];}return buf.toString('base64',i,buf.length-n);}function base64End(buf){var r=buf&&buf.length?this.write(buf):'';if(this.lastNeed)return r+this.lastChar.toString('base64',0,3-this.lastNeed);return r;}// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf){return buf.toString(this.encoding);}function simpleEnd(buf){return buf&&buf.length?this.write(buf):'';}},{"safe-buffer":108}],133:[function(require,module,exports){(function(setImmediate,clearImmediate){(function(){var nextTick=require('process/browser.js').nextTick;var apply=Function.prototype.apply;var slice=Array.prototype.slice;var immediateIds={};var nextImmediateId=0;// DOM APIs, for completeness
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){timeout.close();};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};// Does not start the time, just sets up the members needed.
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate=typeof setImmediate==="function"?setImmediate:function(fn){var id=nextImmediateId++;var args=arguments.length<2?false:slice.call(arguments,1);immediateIds[id]=true;nextTick(function onNextTick(){if(immediateIds[id]){// fn.call() is faster so we optimize for the common use-case
// @see http://jsperf.com/call-apply-segu
if(args){fn.apply(null,args);}else{fn.call(null);}// Prevent ids from leaking
exports.clearImmediate(id);}});return id;};exports.clearImmediate=typeof clearImmediate==="function"?clearImmediate:function(id){delete immediateIds[id];};}).call(this);}).call(this,require("timers").setImmediate,require("timers").clearImmediate);},{"process/browser.js":98,"timers":133}],134:[function(require,module,exports){/*
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */'use strict';var punycode=require('punycode');function Url(){this.protocol=null;this.slashes=null;this.auth=null;this.host=null;this.port=null;this.hostname=null;this.hash=null;this.search=null;this.query=null;this.pathname=null;this.path=null;this.href=null;}// Reference: RFC 3986, RFC 1808, RFC 2396
/*
 * define these here so at least they only have to be
 * compiled once on the first module load.
 */var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,// Special case for a simple path URL
simplePathPattern=/^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,/*
   * RFC 2396: characters reserved for delimiting URLs.
   * We actually just auto-escape these.
   */delims=['<','>','"','`',' ','\r','\n','\t'],// RFC 2396: characters not allowed for various reasons.
unwise=['{','}','|','\\','^','`'].concat(delims),// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape=['\''].concat(unwise),/*
   * Characters that are never ever allowed in a hostname.
   * Note that any invalid chars are also handled, but these
   * are the ones that are *expected* to be seen, so we fast-path
   * them.
   */nonHostChars=['%','/','?',';','#'].concat(autoEscape),hostEndingChars=['/','?','#'],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,// protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol={javascript:true,'javascript:':true},// protocols that never have a hostname.
hostlessProtocol={javascript:true,'javascript:':true},// protocols that always contain a // bit.
slashedProtocol={http:true,https:true,ftp:true,gopher:true,file:true,'http:':true,'https:':true,'ftp:':true,'gopher:':true,'file:':true},querystring=require('qs');function urlParse(url,parseQueryString,slashesDenoteHost){if(url&&_typeof(url)==='object'&&url instanceof Url){return url;}var u=new Url();u.parse(url,parseQueryString,slashesDenoteHost);return u;}Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){if(typeof url!=='string'){throw new TypeError("Parameter 'url' must be a string, not "+_typeof(url));}/*
   * Copy chrome, IE, opera backslash-handling behavior.
   * Back slashes before the query string get converted to forward slashes
   * See: https://code.google.com/p/chromium/issues/detail?id=25916
   */var queryIndex=url.indexOf('?'),splitter=queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',uSplit=url.split(splitter),slashRegex=/\\/g;uSplit[0]=uSplit[0].replace(slashRegex,'/');url=uSplit.join(splitter);var rest=url;/*
   * trim before proceeding.
   * This is to support parse stuff like "  http://foo.com  \n"
   */rest=rest.trim();if(!slashesDenoteHost&&url.split('#').length===1){// Try fast path regexp
var simplePath=simplePathPattern.exec(rest);if(simplePath){this.path=rest;this.href=rest;this.pathname=simplePath[1];if(simplePath[2]){this.search=simplePath[2];if(parseQueryString){this.query=querystring.parse(this.search.substr(1));}else{this.query=this.search.substr(1);}}else if(parseQueryString){this.search='';this.query={};}return this;}}var proto=protocolPattern.exec(rest);if(proto){proto=proto[0];var lowerProto=proto.toLowerCase();this.protocol=lowerProto;rest=rest.substr(proto.length);}/*
   * figure out if it's got a host
   * user@server is *always* interpreted as a hostname, and url
   * resolution will treat //foo/bar as host=foo,path=bar because that's
   * how the browser resolves relative URLs.
   */if(slashesDenoteHost||proto||rest.match(/^\/\/[^@/]+@[^@/]+/)){var slashes=rest.substr(0,2)==='//';if(slashes&&!(proto&&hostlessProtocol[proto])){rest=rest.substr(2);this.slashes=true;}}if(!hostlessProtocol[proto]&&(slashes||proto&&!slashedProtocol[proto])){/*
     * there's a hostname.
     * the first instance of /, ?, ;, or # ends the host.
     *
     * If there is an @ in the hostname, then non-host chars *are* allowed
     * to the left of the last @ sign, unless some host-ending character
     * comes *before* the @-sign.
     * URLs are obnoxious.
     *
     * ex:
     * http://a@b@c/ => user:a@b host:c
     * http://a@b?@c => user:a host:c path:/?@c
     */ /*
     * v0.12 TODO(isaacs): This is not quite how Chrome does things.
     * Review our test case against browsers more comprehensively.
     */ // find the first instance of any hostEndingChars
var hostEnd=-1;for(var i=0;i<hostEndingChars.length;i++){var hec=rest.indexOf(hostEndingChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd)){hostEnd=hec;}}/*
     * at this point, either we have an explicit point where the
     * auth portion cannot go past, or the last @ char is the decider.
     */var auth,atSign;if(hostEnd===-1){// atSign can be anywhere.
atSign=rest.lastIndexOf('@');}else{/*
       * atSign must be in auth portion.
       * http://a@b/c@d => host:b auth:a path:/c@d
       */atSign=rest.lastIndexOf('@',hostEnd);}/*
     * Now we have a portion which is definitely the auth.
     * Pull that off.
     */if(atSign!==-1){auth=rest.slice(0,atSign);rest=rest.slice(atSign+1);this.auth=decodeURIComponent(auth);}// the host is the remaining to the left of the first non-host char
hostEnd=-1;for(var i=0;i<nonHostChars.length;i++){var hec=rest.indexOf(nonHostChars[i]);if(hec!==-1&&(hostEnd===-1||hec<hostEnd)){hostEnd=hec;}}// if we still have not hit it, then the entire thing is a host.
if(hostEnd===-1){hostEnd=rest.length;}this.host=rest.slice(0,hostEnd);rest=rest.slice(hostEnd);// pull out port.
this.parseHost();/*
     * we've indicated that there is a hostname,
     * so even if it's empty, it has to be present.
     */this.hostname=this.hostname||'';/*
     * if hostname begins with [ and ends with ]
     * assume that it's an IPv6 address.
     */var ipv6Hostname=this.hostname[0]==='['&&this.hostname[this.hostname.length-1]===']';// validate a little.
if(!ipv6Hostname){var hostparts=this.hostname.split(/\./);for(var i=0,l=hostparts.length;i<l;i++){var part=hostparts[i];if(!part){continue;}if(!part.match(hostnamePartPattern)){var newpart='';for(var j=0,k=part.length;j<k;j++){if(part.charCodeAt(j)>127){/*
               * we replace non-ASCII char with a temporary placeholder
               * we need this to make sure size of hostname is not
               * broken by replacing non-ASCII by nothing
               */newpart+='x';}else{newpart+=part[j];}}// we test again with ASCII char only
if(!newpart.match(hostnamePartPattern)){var validParts=hostparts.slice(0,i);var notHost=hostparts.slice(i+1);var bit=part.match(hostnamePartStart);if(bit){validParts.push(bit[1]);notHost.unshift(bit[2]);}if(notHost.length){rest='/'+notHost.join('.')+rest;}this.hostname=validParts.join('.');break;}}}}if(this.hostname.length>hostnameMaxLen){this.hostname='';}else{// hostnames are always lower case.
this.hostname=this.hostname.toLowerCase();}if(!ipv6Hostname){/*
       * IDNA Support: Returns a punycoded representation of "domain".
       * It only converts parts of the domain name that
       * have non-ASCII characters, i.e. it doesn't matter if
       * you call it with a domain that already is ASCII-only.
       */this.hostname=punycode.toASCII(this.hostname);}var p=this.port?':'+this.port:'';var h=this.hostname||'';this.host=h+p;this.href+=this.host;/*
     * strip [ and ] from the hostname
     * the host field still retains them, though
     */if(ipv6Hostname){this.hostname=this.hostname.substr(1,this.hostname.length-2);if(rest[0]!=='/'){rest='/'+rest;}}}/*
   * now rest is set to the post-host stuff.
   * chop off any delim chars.
   */if(!unsafeProtocol[lowerProto]){/*
     * First, make 100% sure that any "autoEscape" chars get
     * escaped, even if encodeURIComponent doesn't think they
     * need to be.
     */for(var i=0,l=autoEscape.length;i<l;i++){var ae=autoEscape[i];if(rest.indexOf(ae)===-1){continue;}var esc=encodeURIComponent(ae);if(esc===ae){esc=escape(ae);}rest=rest.split(ae).join(esc);}}// chop off from the tail first.
var hash=rest.indexOf('#');if(hash!==-1){// got a fragment string.
this.hash=rest.substr(hash);rest=rest.slice(0,hash);}var qm=rest.indexOf('?');if(qm!==-1){this.search=rest.substr(qm);this.query=rest.substr(qm+1);if(parseQueryString){this.query=querystring.parse(this.query);}rest=rest.slice(0,qm);}else if(parseQueryString){// no query string, but parseQueryString still requested
this.search='';this.query={};}if(rest){this.pathname=rest;}if(slashedProtocol[lowerProto]&&this.hostname&&!this.pathname){this.pathname='/';}// to support http.request
if(this.pathname||this.search){var p=this.pathname||'';var s=this.search||'';this.path=p+s;}// finally, reconstruct the href based on what has been validated.
this.href=this.format();return this;};// format a parsed object into a url string
function urlFormat(obj){/*
   * ensure it's an object, and not a string url.
   * If it's an obj, this is a no-op.
   * this way, you can call url_format() on strings
   * to clean up potentially wonky urls.
   */if(typeof obj==='string'){obj=urlParse(obj);}if(!(obj instanceof Url)){return Url.prototype.format.call(obj);}return obj.format();}Url.prototype.format=function(){var auth=this.auth||'';if(auth){auth=encodeURIComponent(auth);auth=auth.replace(/%3A/i,':');auth+='@';}var protocol=this.protocol||'',pathname=this.pathname||'',hash=this.hash||'',host=false,query='';if(this.host){host=auth+this.host;}else if(this.hostname){host=auth+(this.hostname.indexOf(':')===-1?this.hostname:'['+this.hostname+']');if(this.port){host+=':'+this.port;}}if(this.query&&_typeof(this.query)==='object'&&Object.keys(this.query).length){query=querystring.stringify(this.query,{arrayFormat:'repeat',addQueryPrefix:false});}var search=this.search||query&&'?'+query||'';if(protocol&&protocol.substr(-1)!==':'){protocol+=':';}/*
   * only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
   * unless they had them to begin with.
   */if(this.slashes||(!protocol||slashedProtocol[protocol])&&host!==false){host='//'+(host||'');if(pathname&&pathname.charAt(0)!=='/'){pathname='/'+pathname;}}else if(!host){host='';}if(hash&&hash.charAt(0)!=='#'){hash='#'+hash;}if(search&&search.charAt(0)!=='?'){search='?'+search;}pathname=pathname.replace(/[?#]/g,function(match){return encodeURIComponent(match);});search=search.replace('#','%23');return protocol+host+pathname+search+hash;};function urlResolve(source,relative){return urlParse(source,false,true).resolve(relative);}Url.prototype.resolve=function(relative){return this.resolveObject(urlParse(relative,false,true)).format();};function urlResolveObject(source,relative){if(!source){return relative;}return urlParse(source,false,true).resolveObject(relative);}Url.prototype.resolveObject=function(relative){if(typeof relative==='string'){var rel=new Url();rel.parse(relative,false,true);relative=rel;}var result=new Url();var tkeys=Object.keys(this);for(var tk=0;tk<tkeys.length;tk++){var tkey=tkeys[tk];result[tkey]=this[tkey];}/*
   * hash is always overridden, no matter what.
   * even href="" will remove it.
   */result.hash=relative.hash;// if the relative url is empty, then there's nothing left to do here.
if(relative.href===''){result.href=result.format();return result;}// hrefs like //foo/bar always cut to the protocol.
if(relative.slashes&&!relative.protocol){// take everything except the protocol from relative
var rkeys=Object.keys(relative);for(var rk=0;rk<rkeys.length;rk++){var rkey=rkeys[rk];if(rkey!=='protocol'){result[rkey]=relative[rkey];}}// urlParse appends trailing / to urls like http://www.example.com
if(slashedProtocol[result.protocol]&&result.hostname&&!result.pathname){result.pathname='/';result.path=result.pathname;}result.href=result.format();return result;}if(relative.protocol&&relative.protocol!==result.protocol){/*
     * if it's a known url protocol, then changing
     * the protocol does weird things
     * first, if it's not file:, then we MUST have a host,
     * and if there was a path
     * to begin with, then we MUST have a path.
     * if it is file:, then the host is dropped,
     * because that's known to be hostless.
     * anything else is assumed to be absolute.
     */if(!slashedProtocol[relative.protocol]){var keys=Object.keys(relative);for(var v=0;v<keys.length;v++){var k=keys[v];result[k]=relative[k];}result.href=result.format();return result;}result.protocol=relative.protocol;if(!relative.host&&!hostlessProtocol[relative.protocol]){var relPath=(relative.pathname||'').split('/');while(relPath.length&&!(relative.host=relPath.shift())){}if(!relative.host){relative.host='';}if(!relative.hostname){relative.hostname='';}if(relPath[0]!==''){relPath.unshift('');}if(relPath.length<2){relPath.unshift('');}result.pathname=relPath.join('/');}else{result.pathname=relative.pathname;}result.search=relative.search;result.query=relative.query;result.host=relative.host||'';result.auth=relative.auth;result.hostname=relative.hostname||relative.host;result.port=relative.port;// to support http.request
if(result.pathname||result.search){var p=result.pathname||'';var s=result.search||'';result.path=p+s;}result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;}var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',isRelAbs=relative.host||relative.pathname&&relative.pathname.charAt(0)==='/',mustEndAbs=isRelAbs||isSourceAbs||result.host&&relative.pathname,removeAllDots=mustEndAbs,srcPath=result.pathname&&result.pathname.split('/')||[],relPath=relative.pathname&&relative.pathname.split('/')||[],psychotic=result.protocol&&!slashedProtocol[result.protocol];/*
   * if the url is a non-slashed url, then relative
   * links like ../.. should be able
   * to crawl up to the hostname, as well.  This is strange.
   * result.protocol has already been set by now.
   * Later on, put the first path part into the host field.
   */if(psychotic){result.hostname='';result.port=null;if(result.host){if(srcPath[0]===''){srcPath[0]=result.host;}else{srcPath.unshift(result.host);}}result.host='';if(relative.protocol){relative.hostname=null;relative.port=null;if(relative.host){if(relPath[0]===''){relPath[0]=relative.host;}else{relPath.unshift(relative.host);}}relative.host=null;}mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');}if(isRelAbs){// it's absolute.
result.host=relative.host||relative.host===''?relative.host:result.host;result.hostname=relative.hostname||relative.hostname===''?relative.hostname:result.hostname;result.search=relative.search;result.query=relative.query;srcPath=relPath;// fall through to the dot-handling below.
}else if(relPath.length){/*
     * it's relative
     * throw away the existing file, and take the new path instead.
     */if(!srcPath){srcPath=[];}srcPath.pop();srcPath=srcPath.concat(relPath);result.search=relative.search;result.query=relative.query;}else if(relative.search!=null){/*
     * just pull out the search.
     * like href='?foo'.
     * Put this after the other two cases because it simplifies the booleans
     */if(psychotic){result.host=srcPath.shift();result.hostname=result.host;/*
       * occationaly the auth can get stuck only in host
       * this especially happens in cases like
       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
       */var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.hostname=authInHost.shift();result.host=result.hostname;}}result.search=relative.search;result.query=relative.query;// to support http.request
if(result.pathname!==null||result.search!==null){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.href=result.format();return result;}if(!srcPath.length){/*
     * no path at all.  easy.
     * we've already handled the other stuff above.
     */result.pathname=null;// to support http.request
if(result.search){result.path='/'+result.search;}else{result.path=null;}result.href=result.format();return result;}/*
   * if a url ENDs in . or .., then it must get a trailing slash.
   * however, if it ends in anything else non-slashy,
   * then it must NOT get a trailing slash.
   */var last=srcPath.slice(-1)[0];var hasTrailingSlash=(result.host||relative.host||srcPath.length>1)&&(last==='.'||last==='..')||last==='';/*
   * strip single dots, resolve double dots to parent dir
   * if the path tries to go above the root, `up` ends up > 0
   */var up=0;for(var i=srcPath.length;i>=0;i--){last=srcPath[i];if(last==='.'){srcPath.splice(i,1);}else if(last==='..'){srcPath.splice(i,1);up++;}else if(up){srcPath.splice(i,1);up--;}}// if the path is allowed to go above the root, restore leading ..s
if(!mustEndAbs&&!removeAllDots){for(;up--;up){srcPath.unshift('..');}}if(mustEndAbs&&srcPath[0]!==''&&(!srcPath[0]||srcPath[0].charAt(0)!=='/')){srcPath.unshift('');}if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){srcPath.push('');}var isAbsolute=srcPath[0]===''||srcPath[0]&&srcPath[0].charAt(0)==='/';// put the host back
if(psychotic){result.hostname=isAbsolute?'':srcPath.length?srcPath.shift():'';result.host=result.hostname;/*
     * occationaly the auth can get stuck only in host
     * this especially happens in cases like
     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
     */var authInHost=result.host&&result.host.indexOf('@')>0?result.host.split('@'):false;if(authInHost){result.auth=authInHost.shift();result.hostname=authInHost.shift();result.host=result.hostname;}}mustEndAbs=mustEndAbs||result.host&&srcPath.length;if(mustEndAbs&&!isAbsolute){srcPath.unshift('');}if(srcPath.length>0){result.pathname=srcPath.join('/');}else{result.pathname=null;result.path=null;}// to support request.http
if(result.pathname!==null||result.search!==null){result.path=(result.pathname?result.pathname:'')+(result.search?result.search:'');}result.auth=relative.auth||result.auth;result.slashes=result.slashes||relative.slashes;result.href=result.format();return result;};Url.prototype.parseHost=function(){var host=this.host;var port=portPattern.exec(host);if(port){port=port[0];if(port!==':'){this.port=port.substr(1);}host=host.substr(0,host.length-port.length);}if(host){this.hostname=host;}};exports.parse=urlParse;exports.resolve=urlResolve;exports.resolveObject=urlResolveObject;exports.format=urlFormat;exports.Url=Url;},{"punycode":99,"qs":101}],135:[function(require,module,exports){(function(global){(function(){/**
 * Module exports.
 */module.exports=deprecate;/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */function deprecate(fn,msg){if(config('noDeprecation')){return fn;}var warned=false;function deprecated(){if(!warned){if(config('throwDeprecation')){throw new Error(msg);}else if(config('traceDeprecation')){console.trace(msg);}else{console.warn(msg);}warned=true;}return fn.apply(this,arguments);}return deprecated;}/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */function config(name){// accessing global.localStorage can trigger a DOMException in sandboxed iframes
try{if(!global.localStorage)return false;}catch(_){return false;}var val=global.localStorage[name];if(null==val)return false;return String(val).toLowerCase()==='true';}}).call(this);}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],136:[function(require,module,exports){// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports=wrappy;function wrappy(fn,cb){if(fn&&cb)return wrappy(fn)(cb);if(typeof fn!=='function')throw new TypeError('need wrapper function');Object.keys(fn).forEach(function(k){wrapper[k]=fn[k];});return wrapper;function wrapper(){var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i];}var ret=fn.apply(this,args);var cb=args[args.length-1];if(typeof ret==='function'&&ret!==cb){Object.keys(cb).forEach(function(k){ret[k]=cb[k];});}return ret;}}},{}],137:[function(require,module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){var target={};for(var i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}},{}],138:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var defaultConfiguration={// This is the address for the <script /> tag that contains the CSS.
CSSElementAddress:'#PICT-CSS'};var PictCSS=/*#__PURE__*/function(_libFableServiceBase12){_inherits(PictCSS,_libFableServiceBase12);var _super24=_createSuper(PictCSS);function PictCSS(pFable,pOptions,pServiceHash){var _this49;_classCallCheck2(this,PictCSS);_this49=_super24.call(this,pFable,pOptions,pServiceHash);// No merging of options necessary
if(typeof _this49.options.CSSElementAddress==='undefined'){_this49.options.CSSElementAddress=defaultConfiguration.CSSElementAddress;}_this49.inlineCSSMap={};return _this49;}// Add a CSS fragment to the CSS map (each view can have its own CSS fragment)
// Hash is shared across all views, so if 10 views all load the "My-Table-View" fragment, it will only be loaded once.
_createClass2(PictCSS,[{key:"addCSS",value:function addCSS(pHash,pContent,pPriority,pProvider){var tmpPriority=typeof pPriority!=='undefined'?pPriority:1000;var tmpProvidor=typeof pProvider==='string'?pProvider:'Unknown';this.inlineCSSMap[pHash]={Hash:pHash,Content:pContent,Provider:tmpProvidor,Priority:tmpPriority};}},{key:"removeCSS",value:function removeCSS(pHash){delete this.inlineCSSMap[pHash];}},{key:"generateCSS",value:function generateCSS(){var _this50=this;var tmpCSS='';var tmpCSSHashes=Object.keys(this.inlineCSSMap);// Sort the hashes by Priority
tmpCSSHashes.sort(function(a,b){return _this50.inlineCSSMap[a].Priority-_this50.inlineCSSMap[b].Priority;});for(var i=0;i<tmpCSSHashes.length;i++){var tmpCSSFragment=this.inlineCSSMap[tmpCSSHashes[i]];var tmpCSSComment=tmpCSSFragment.Hash;if(tmpCSSFragment.Hash!=tmpCSSFragment.Provider){tmpCSSComment="".concat(tmpCSSComment," from ").concat(tmpCSSFragment.Provider);}tmpCSS+="/* ".concat(tmpCSSComment," */\n").concat(tmpCSSFragment.Content,"\n");}return tmpCSS;}// Inject the CSS into the magic DOM element for it
},{key:"injectCSS",value:function injectCSS(){this.services.ContentAssignment.assignContent(this.options.CSSElementAddress,this.generateCSS());}}]);return PictCSS;}(libFableServiceBase);module.exports=PictCSS;},{"fable":50}],139:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var PictContentAssignment=/*#__PURE__*/function(_libFableServiceBase13){_inherits(PictContentAssignment,_libFableServiceBase13);var _super25=_createSuper(PictContentAssignment);function PictContentAssignment(pFable,pOptions,pServiceHash){var _this51;_classCallCheck2(this,PictContentAssignment);_this51=_super25.call(this,pFable,pOptions,pServiceHash);_this51.serviceType='PictContentAssignment';// Check to see if we are running in a browser
_this51.inBrowser=false;_this51.hasDocument=false;if((typeof window==="undefined"?"undefined":_typeof(window))=='object'){_this51.inBrowser=true;// Now check that the browser has a document object
if(typeof window.document!='undefined'&&typeof window.document.querySelectorAll=='function'){_this51.hasDocument=true;}}// If we're in a browser, check to see if jQuery is available.
_this51.hasJquery=false;_this51.jQuery=false;if(_this51.inBrowser&&typeof window.jQuery!=='undefined'){_this51.hasJquery=true;}// API Consumers can craft their own assign function
_this51.customAssignFunction=false;// API Consumers can also craft their own prepend function
_this51.customPrependFunction=false;// API Consumers can also craft their own append function
_this51.customAppendFunction=false;// API Consumers can also craft their own read function
_this51.customReadFunction=false;// API Consumers can even craft their own get element function.
_this51.customGetElementFunction=false;return _this51;}_createClass2(PictContentAssignment,[{key:"getElement",value:function getElement(pAddress){if(this.customGetElementFunction){return this.customGetElementFunction(pAddress);}else if(this.hasJquery){var tmpElements=window.jQuery(pAddress);if(tmpElements.length==0){return[];}else{// TODO: This isn't the most efficient method, but it is the most compatible.
var tmpElementSet=[];for(var i=0;i<tmpElements.length;i++){tmpElementSet.push(tmpElements[0]);}return tmpElementSet;}}else if(this.inBrowser&&this.hasDocument){return window.document.querySelectorAll(pAddress);}else{// Just log it out for now
this.log.trace("PICT Content GET ELEMENT for [".concat(pAddress,"] will return empty because none of the browser methods are available"));return[];}}},{key:"assignContent",value:function assignContent(pAddress,pContent){if(this.customAssignFunction){return this.customAssignFunction(pAddress,pContent);}else if(this.hasJquery){// Get the element
var tmpTargetElement=window.jQuery(pAddress);// Should we ensure we matched 1 and exactly 1 element?
//if (tmpTargetElement && tmpTargetElement.length == 1)
//{
// Set the content
tmpTargetElement.html(pContent);//}
}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);for(var i=0;i<tmpTargetElementSet.length;i++){switch(tmpTargetElementSet[i].tagName){case'INPUT':case'BUTTON':case'TEXTAREA':tmpTargetElementSet[i].value=pContent;break;case'SCRIPT':case'A':tmpTargetElementSet[i].text=pContent;break;default:tmpTargetElementSet[i].innerHTML=pContent;break;}}}else{// Just log it out for now
this.log.trace("PICT Content ASSIGN to [".concat(pAddress,"]:"),pContent);}}},{key:"appendContent",value:function appendContent(pAddress,pContent){if(this.customAppendFunction){return this.customAppendFunction(pAddress,pContent);}else if(this.hasJquery){var tmpTargetElement=window.jQuery(pAddress);tmpTargetElement.append(pContent);}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);for(var i=0;i<tmpTargetElementSet.length;i++){tmpTargetElementSet[i].insertAdjacentHTML("beforeend",pContent);}}else{// Just log it out for now -- nothing browser in our mix.
this.log.trace("PICT Content APPEND to [".concat(pAddress,"]:"),pContent);}}},{key:"prependContent",value:function prependContent(pAddress,pContent){if(this.customAppendFunction){return this.customPrependFunction(pAddress,pContent);}else if(this.hasJquery){var tmpTargetElement=window.jQuery(pAddress);tmpTargetElement.prepend(pContent);}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);for(var i=0;i<tmpTargetElementSet.length;i++){tmpTargetElementSet[i].insertAdjacentHTML("afterbegin",pContent);}}else{// Just log it out for now -- nothing browser in our mix.
this.log.trace("PICT Content PREPEND in [".concat(pAddress,"]:"),pContent);}}},{key:"readContent",value:function readContent(pAddress){if(this.customReadFunction){return this.customReadFunction(pAddress);}else if(this.hasJquery){var tmpTargetElement=window.jQuery(pAddress);if(tmpTargetElement.prop('tagName')=='INPUT'||tmpTargetElement.prop('tagName')=='TEXTAREA'){return tmpTargetElement.val();}else if(tmpTargetElement.prop('tagName')=='SCRIPT'){return tmpTargetElement.html();}else{return tmpTargetElement.html();}}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);if(tmpTargetElementSet.length<1){return null;}else if(tmpTargetElementSet.length==1){if(tmpTargetElementSet[0].tagName=='INPUT'||tmpTargetElementSet[0].tagName=='TEXTAREA'){return tmpTargetElementSet[0].value;}else if(tmpTargetElementSet[0].tagName=='SCRIPT'){return tmpTargetElementSet[0].text;}else{return tmpTargetElementSet[0].innerHTML;}}}else{// Just log it out for now -- nothing browser in our mix.
this.log.trace("PICT Content READ from [".concat(pAddress,"]..."));return'';}}},{key:"addClass",value:function addClass(pAddress,pClass){if(this.customAddClassFunction){return this.customAddClassFunction(pAddress,pClass);}else if(this.hasJquery){// Get the element
var tmpTargetElement=window.jQuery(pAddress);tmpTargetElement.addClass(pClass);}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);for(var i=0;i<tmpTargetElementSet.length;i++){tmpTargetElementSet[i].classList.add(pClass);}}else{this.log.trace("PICT Content ADDCLASS to [".concat(pAddress,"]:"),pClass);}}},{key:"removeClass",value:function removeClass(pAddress,pClass){if(this.customRemoveClassFunction){return this.customRemoveClassFunction(pAddress,pClass);}else if(this.hasJquery){// Get the element
var tmpTargetElement=window.jQuery(pAddress);tmpTargetElement.removeClass(pClass);}else if(this.inBrowser&&this.hasDocument){var tmpTargetElementSet=window.document.querySelectorAll(pAddress);for(var i=0;i<tmpTargetElementSet.length;i++){tmpTargetElementSet[i].classList.remove(pClass);}}else{this.log.trace("PICT Content REMOVECLASS from [".concat(pAddress,"]:"),pClass);}}},{key:"toggleClass",value:function toggleClass(pAddress,pClass){// STUB
}},{key:"hasClass",value:function hasClass(pAddress,pClass){// STUB
}}]);return PictContentAssignment;}(libFableServiceBase);module.exports=PictContentAssignment;},{"fable":50}],140:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var PictDataProvider=/*#__PURE__*/function(_libFableServiceBase14){_inherits(PictDataProvider,_libFableServiceBase14);var _super26=_createSuper(PictDataProvider);function PictDataProvider(pFable,pOptions,pServiceHash){var _this52;_classCallCheck2(this,PictDataProvider);_this52=_super26.call(this,pFable,pOptions,pServiceHash);_this52.serviceType='PictDataProvider';return _this52;}_createClass2(PictDataProvider,[{key:"getDataByAddress",value:function getDataByAddress(pAddress,pData){var tmpData=typeof pData==='undefined'?{}:pData;return this.fable.manifest.getValueByHash({AppData:this.AppData,Bundle:this.Bundle,Record:tmpData},pAddress);}}]);return PictDataProvider;}(libFableServiceBase);module.exports=PictDataProvider;},{"fable":50}],141:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var PictMeadowEntityProvider=/*#__PURE__*/function(_libFableServiceBase15){_inherits(PictMeadowEntityProvider,_libFableServiceBase15);var _super27=_createSuper(PictMeadowEntityProvider);function PictMeadowEntityProvider(pFable,pOptions,pServiceHash){var _this53;_classCallCheck2(this,PictMeadowEntityProvider);_this53=_super27.call(this,pFable,pOptions,pServiceHash);_this53.serviceType='PictMeadowProvider';if(_this53.fable.settings.PictDefaultURLPrefix){_this53.options.urlPrefix=_this53.fable.settings.PictDefaultURLPrefix;}else if(!_this53.options.urlPrefix){_this53.options.urlPrefix='/1.0/';}if(_this53.fable.settings.PictDefaultDownloadBatchSize){_this53.options.downloadBatchSize=_this53.fable.settings.PictDefaultDownloadBatchSize;}else if(!_this53.options.downloadBatchSize){_this53.options.downloadBatchSize=100;}_this53.restClient=_this53.fable.instantiateServiceProviderWithoutRegistration('RestClient');_this53.cache={};_this53.prepareRequestOptions=function(pOptions){return pOptions;};return _this53;}_createClass2(PictMeadowEntityProvider,[{key:"initializeCache",value:function initializeCache(pEntity){// This should not be happening as often as it's happening.
if(!this.cache.hasOwnProperty(pEntity)){this.cache[pEntity]=this.fable.instantiateServiceProviderWithoutRegistration('ObjectCache');// TODO: Make this a configuration?
// For now cache for 30 seconds.
this.cache[pEntity].maxAge=30000;this.cache[pEntity].maxLength=10000;this.fable.Bundle[pEntity]=this.cache[pEntity].RecordMap;}}},{key:"getEntity",value:function getEntity(pEntity,pIDRecord,fCallback){var _this54=this;this.initializeCache(pEntity);// Discard anything from the cache that has expired or is over size.
this.cache[pEntity].prune(function(){var tmpPossibleRecord=_this54.cache[pEntity].read(pIDRecord);if(tmpPossibleRecord){return tmpPossibleRecord;}var tmpOptions={url:"".concat(_this54.options.urlPrefix).concat(pEntity,"/").concat(pIDRecord)};tmpOptions=_this54.prepareRequestOptions(tmpOptions);return _this54.restClient.getJSON(tmpOptions,function(pError,pResponse,pBody){if(pBody){_this54.cache[pEntity].put(pBody,pIDRecord);}return fCallback(pError,pBody);});});}},{key:"getEntitySetPage",value:function getEntitySetPage(pEntity,pMeadowFilterExpression,pRecordStartCursor,pRecordCount,fCallback){var tmpURL="".concat(this.options.urlPrefix).concat(pEntity,"s/FilteredTo/").concat(pMeadowFilterExpression,"/").concat(pRecordStartCursor,"/").concat(pRecordCount);return this.restClient.getJSON(tmpURL,function(pDownloadError,pDownloadResponse,pDownloadBody){return fCallback(pDownloadError,pDownloadBody);});}},{key:"getEntitySetRecordCount",value:function getEntitySetRecordCount(pEntity,pMeadowFilterExpression,fCallback){var _this55=this;var tmpURL="".concat(this.options.urlPrefix).concat(pEntity,"s/Count/FilteredTo/").concat(pMeadowFilterExpression);return this.restClient.getJSON(tmpURL,function(pError,pResponse,pBody){if(pError){_this55.log.error("Error getting entity count of [".concat(pEntity,"] filtered to [").concat(pMeadowFilterExpression,"] from url [").concat(tmpURL,"]: ").concat(pError));return fCallback(pError);}var tmpRecordCount=0;if(pBody.Count){tmpRecordCount=pBody.Count;}return fCallback(pError,tmpRecordCount);});}},{key:"getEntitySet",value:function getEntitySet(pEntity,pMeadowFilterExpression,fCallback){var _this56=this;// TODO: Should we test for too many record IDs here by string length in pMeadowFilterExpression?
//       FBL~ID${pDestinationEntity}~INN~${tmpIDRecordsCommaSeparated}
//       If the list is mega-long we can parse it and break it into chunks.
this.initializeCache(pEntity);// Discard anything from the cache that has expired or is over size.
this.cache[pEntity].prune(function(){return _this56.getEntitySetRecordCount(pEntity,pMeadowFilterExpression,function(pRecordCountError,pRecordCount){if(pRecordCountError){return fCallback(pRecordCountError);}var tmpRecordCount=pRecordCount;if(isNaN(pRecordCount)){_this56.log.error("Entity count did not return a number for [".concat(pEntity,"] filtered to [").concat(pMeadowFilterExpression,"]... something is fatally wrong from the server accessed in getEntitySet call."));return fCallback(new Error('Entity count did not return a number in getEntitySet.'));}var tmpDownloadURIFragments=[];var tmpDownloadBatchSize=_this56.options.downloadBatchSize;for(var i=0;i<tmpRecordCount/tmpDownloadBatchSize;i++){// Generate each of the URI fragments to download
tmpDownloadURIFragments.push("".concat(_this56.options.urlPrefix).concat(pEntity,"s/FilteredTo/").concat(pMeadowFilterExpression,"/").concat(i*tmpDownloadBatchSize,"/").concat(tmpDownloadBatchSize));}var tmpEntitySet=[];// Now run these in series (it's possible to parallelize the requests but they would not be in server order)
_this56.fable.Utility.eachLimit(tmpDownloadURIFragments,1,function(pURIFragment,fDownloadCallback){_this56.restClient.getJSON(pURIFragment,function(pDownloadError,pDownloadResponse,pDownloadBody){tmpEntitySet=tmpEntitySet.concat(pDownloadBody);// Should we be caching each record?
return fDownloadCallback(pDownloadError);});},function(pFullDownloadError){return fCallback(pFullDownloadError,tmpEntitySet);});});});}}]);return PictMeadowEntityProvider;}(libFableServiceBase);module.exports=PictMeadowEntityProvider;},{"fable":50}],142:[function(require,module,exports){var libFableServiceBase=require('fable').ServiceProviderBase;var PictTemplateProvider=/*#__PURE__*/function(_libFableServiceBase16){_inherits(PictTemplateProvider,_libFableServiceBase16);var _super28=_createSuper(PictTemplateProvider);function PictTemplateProvider(pFable,pOptions,pServiceHash){var _this57;_classCallCheck2(this,PictTemplateProvider);_this57=_super28.call(this,pFable,pOptions,pServiceHash);_this57.serviceType='PictTemplateProvider';_this57.templates={};_this57.templateSources={};// Default templates are stored by prefix.
// The longest prefix match is used.
// Case sensitive.
_this57.defaultTemplates=[];// This function can be overloaded to load templates from a database, in a page or other source.
_this57.loadTemplateFunction=function(pTemplateHash){return false;};return _this57;}_createClass2(PictTemplateProvider,[{key:"addTemplate",value:function addTemplate(pTemplateHash,pTemplate,pTemplateSource){this.templates[pTemplateHash]=pTemplate;if(typeof pTemplateSource=='string'){this.templateSources[pTemplateHash]=pTemplateSource;}else{this.templateSources[pTemplateHash]="Direct addTemplate('".concat(pTemplateHash,"') function load into PictTemplateProvider [").concat(this.UUID,"]::[").concat(this.Hash,"]");}}},{key:"addDefaultTemplate",value:function addDefaultTemplate(pPrefix,pPostfix,pTemplate,pSource){var tmpSource=typeof pSource=='string'?pSource:"Direct addDefaultTemplate('".concat(pPrefix,"','").concat(pPostfix,"',..) function load into PictTemplateProvider [").concat(this.UUID,"]::[").concat(this.Hash,"]");var tmpDefaultTemplate={prefix:pPrefix,postfix:pPostfix,template:pTemplate,source:tmpSource};if(typeof pTemplate!='string'){this.log.error('PictTemplateProvider.addDefaultTemplate: pTemplate is not a string.');}this.defaultTemplates.push(tmpDefaultTemplate);}},{key:"checkDefaultTemplateHash",value:function checkDefaultTemplateHash(pTemplateHash){/*
         * Default templates are managed by postfix and prefix.  The use case is things like titles, headers, list 
         * wrappers, rows, etc.
         *
         * So we might have a default template for a list wrapper and it should expect "-ListWrap" as the postfix.
         * And we might have a default template for a list row and it should expect "-ListRow" as the postfix.
         * The list might have a "-ListTitle", or we might have shared titles and it would just be "-Title".
         * 
         * The idea is to allow fallbacks on defaults.
         */for(var i=0;i<this.defaultTemplates.length;i++){if(pTemplateHash.indexOf(this.defaultTemplates[i].postfix)==pTemplateHash.length-this.defaultTemplates[i].postfix.length&&pTemplateHash.indexOf(this.defaultTemplates[i].prefix)==0){this.templates[pTemplateHash]=this.defaultTemplates[i].template;this.templateSources[pTemplateHash]="Auto created in checkDefaultTemplateHash('".concat(pTemplateHash,"') function by PictTemplateProvider [").concat(this.UUID,"]::[").concat(this.Hash,"] from [").concat(this.defaultTemplates[i].prefix,"]...[").concat(this.defaultTemplates[i].postfix,"]");return this.templates[pTemplateHash];}}return false;}},{key:"getTemplate",value:function getTemplate(pTemplateHash){// TODO: Optimize this.
// If the template doesn't exist, try to load it with the loading function
if(!this.templates.hasOwnProperty(pTemplateHash)){this.loadTemplate(pTemplateHash);}// If the loading function fails, try to load it from the default templates
if(!this.templates.hasOwnProperty(pTemplateHash)){this.checkDefaultTemplateHash(pTemplateHash);}if(this.templates.hasOwnProperty(pTemplateHash)){return this.templates[pTemplateHash];}else{return false;}}},{key:"loadTemplate",value:function loadTemplate(pTemplateHash){var tmpTemplate=this.loadTemplateFunction(pTemplateHash);if(tmpTemplate){this.templates[pTemplateHash]=tmpTemplate.template;this.templateSources[pTemplateHash]="Loaded in loadTemplate('".concat(pTemplateHash,"') function by PictTemplateProvider [").concat(this.UUID,"]::[").concat(this.Hash,"] from [").concat(tmpTemplate.source,"]");}return tmpTemplate;}}]);return PictTemplateProvider;}(libFableServiceBase);module.exports=PictTemplateProvider;},{"fable":50}],143:[function(require,module,exports){/**
* @author <steven@velozo.com>
*/var libFable=require('fable');var Pict=/*#__PURE__*/function(_libFable){_inherits(Pict,_libFable);var _super29=_createSuper(Pict);function Pict(pSettings){var _this58;_classCallCheck2(this,Pict);_this58=_super29.call(this,pSettings);_this58.isBrowser=new Function("try {return (this===window);} catch(pError) {return false;}");// The templateProvider provides a basic key->template mapping with default fallback capabilities
_this58.addAndInstantiateServiceType('TemplateProvider',require('./Pict-Template-Provider.js'));_this58.addAndInstantiateServiceType('EntityProvider',require('./Pict-Meadow-EntityProvider.js'));_this58.addAndInstantiateServiceType('DataProvider',require('./Pict-DataProvider.js'));_this58.addAndInstantiateServiceType('ContentAssignment',require('./Pict-Content-Assignment.js'));_this58.addAndInstantiateServiceType('CSSMap',require('./Pict-CSS.js'));_this58.instantiateServiceProvider('MetaTemplate');_this58.instantiateServiceProvider('DataGeneration');_this58.manifest=_this58.instantiateServiceProvider('Manifest');_this58.AppData={};_this58.Bundle={};// Log noisness goes from 0 - 5, where 5 is show me everything.
_this58.LogNoisiness=0;// Load manifest sets
if(_this58.settings.Manifests){_this58.loadManifestSet(_this58.settings.Manifests);}_this58._DefaultPictTemplatesInitialized=false;_this58.initializePictTemplateEngine();_this58.addServiceType('PictView',require('pict-view'));_this58.addServiceType('PictApplication',require('pict-application'));// Expose the named views directly, through a convenience accessor
_this58.views=_this58.servicesMap.PictView;return _this58;}// Load manifests in as Hashed services
_createClass2(Pict,[{key:"loadManifestSet",value:function loadManifestSet(pManifestSet){if(_typeof(pManifestSet)!='object'){this.log.warn("PICT [".concat(this.UUID,"] could not load Manifest Set; pManifestSet was not an object."));return false;}var tmpManifestKeys=Object.keys(pManifestSet);if(tmpManifestKeys.length>0){for(var i=0;i<tmpManifestKeys.length;i++){// Load each manifest
var tmpManifestKey=tmpManifestKeys[i];this.instantiateServiceProvider('Manifest',pManifestSet[tmpManifestKey],tmpManifestKey);}}}// Just passing an options will construct one for us.
// Passing a hash will set the hash.
// Passing a prototype will use that!
},{key:"addView",value:function addView(pViewHash,pOptions,pViewPrototype){var tmpOptions=_typeof(pOptions)=='object'?pOptions:{};var tmpViewHash=typeof pViewHash=='string'?pViewHash:this.fable.getUUID();if(typeof pViewPrototype!='undefined'){// If the prototype has a default_configuration, it will be merged with options.
if(pViewPrototype.hasOwnProperty('default_configuration')){tmpOptions=this.fable.Utility.extend({},pViewPrototype.default_configuration,tmpOptions);}return this.instantiateServiceProviderFromPrototype('PictView',tmpOptions,tmpViewHash,pViewPrototype);}else{return this.instantiateServiceProvider('PictView',tmpOptions,tmpViewHash);}}// Just passing an options will construct one for us.
// Passing a hash will set the hash.
// Passing a prototype will use that!
},{key:"addApplication",value:function addApplication(pApplicationHash,pOptions,pApplicationPrototype){var tmpOptions=_typeof(pOptions)=='object'?pOptions:{};var tmpApplicationHash=typeof pApplicationHash=='string'?pApplicationHash:this.fable.getUUID();if(typeof pApplicationPrototype!='undefined'){// If the prototype has a default_configuration, it will be merged with options.
if(pApplicationPrototype.hasOwnProperty('default_configuration')){tmpOptions=this.fable.Utility.extend({},pApplicationPrototype.default_configuration,tmpOptions);}return this.instantiateServiceProviderFromPrototype('PictApplication',tmpOptions,tmpApplicationHash,pApplicationPrototype);}else{return this.instantiateServiceProvider('PictApplication',tmpOptions,tmpApplicationHash);}}},{key:"initializePictTemplateEngine",value:function initializePictTemplateEngine(){var _this59=this;/*
		 *
		 * To stave off madness, these are inefficient for now.  The wkhtmltopdf renderer leaves much to be desired
		 * in the way of feedback with regards to javascript compatibility.
		 *
		 */if(!this._DefaultPictTemplatesInitialized){// Expects one of the following:
// 		{~Entity:Book:1~}
//          ...meaning GET BOOK 1
// 		{~Entity:Book:AppData.Some.Address.IDBook~}
//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook
// 		{~E:Book:AppData.Some.Address.IDBook:Render-Book-Template~}
//          ...meaning GET BOOK with IDBook FROM AppData.Some.Address.IDBook and render it to Render-Book-Template
var fEntityRender=function fEntityRender(pHash,pData,fCallback){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fEntityRender]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>0){_this59.log.trace("PICT Template [fEntityRender]::[".concat(tmpHash,"]"));}var tmpEntity=false;var tmpEntityID=false;var tmpEntityTemplate=false;// This expression requires 2 parts -- a third is optional, and, if present, is the template to render to.
var tmpHashSeparator=tmpHash.indexOf('|');if(tmpHashSeparator<0){// This is just a simple 2 part hash (the entity and the ID)
var tmpHashEntitySeparator=tmpHash.indexOf(':');tmpEntity=tmpHash.substring(0,tmpHashEntitySeparator);tmpEntityID=tmpHash.substring(tmpHashEntitySeparator+1);}else{// This is a 3 part hash (the entity, the ID, and the template)
var _tmpHashEntitySeparator=tmpHash.indexOf(':');tmpEntity=tmpHash.substring(0,_tmpHashEntitySeparator);var tmpHashTemplateSeparator=tmpHash.indexOf('|');tmpEntityID=tmpHash.substring(_tmpHashEntitySeparator+1,tmpHashTemplateSeparator);tmpEntityTemplate=tmpHash.substring(tmpHashTemplateSeparator+1);}if(!isNaN(tmpEntityID)){tmpEntityID=parseInt(tmpEntityID);}else{// This is an address, so we need to get the value at the address
tmpEntityID=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpEntityID);}// No Entity or EntityID
if(!tmpEntity||!tmpEntityID){_this59.log.warn("Pict: Entity Render: Entity or entity ID not resolved for [".concat(tmpHash,"]"));return fCallback(Error("Pict: Entity Render: Entity or entity ID not resolved for [".concat(tmpHash,"]")),'');}// Now try to get the entity
_this59.EntityProvider.getEntity(tmpEntity,tmpEntityID,function(pError,pRecord){if(pError){_this59.log.error("Pict: Entity Render: Error getting entity [".concat(tmpEntity,"] with ID [").concat(tmpEntityID,"] for [").concat(tmpHash,"]: ").concat(pError),pError);return fCallback(pError,'');}// Now render the template
if(tmpEntityTemplate){return fCallback(null,_this59.parseTemplateByHash(tmpEntityTemplate,pRecord));}else{return fCallback(null,'');}});};this.MetaTemplate.addPatternAsync('{~E:','~}',fEntityRender);this.MetaTemplate.addPatternAsync('{~Entity:','~}',fEntityRender);// {NE~Some.Address|If the left value is truthy, render this value.~}
var fNotEmptyRender=function fNotEmptyRender(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fNotEmptyRender]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>2){_this59.log.trace("PICT Template [fNotEmptyRender]::[".concat(tmpHash,"]"));}// Should switch this to indexOf so pipes can be in the content.
var tmpHashParts=tmpHash.split('|');// For now just check truthiness
if(_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHashParts[0])){return tmpHashParts[1];}else{return'';}};this.MetaTemplate.addPattern('{~NotEmpty:','~}',fNotEmptyRender);this.MetaTemplate.addPattern('{~NE:','~}',fNotEmptyRender);// {~T:Template:AddressOfData~}
var fTemplateRender=function fTemplateRender(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fTemplateRender]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>0){_this59.log.trace("PICT Template [fTemplateRender]::[".concat(tmpHash,"]"));}var tmpTemplateHash=false;var tmpAddressOfData=false;// This is just a simple 2 part hash (the entity and the ID)
var tmpHashTemplateSeparator=tmpHash.indexOf(':');tmpTemplateHash=tmpHash.substring(0,tmpHashTemplateSeparator);if(tmpHashTemplateSeparator>-1){tmpAddressOfData=tmpHash.substring(tmpHashTemplateSeparator+1);}else{tmpTemplateHash=tmpHash;}// No template hash
if(!tmpTemplateHash){_this59.log.warn("Pict: Template Render: TemplateHash not resolved for [".concat(tmpHash,"]"));return"Pict: Template Render: TemplateHash not resolved for [".concat(tmpHash,"]");}if(!tmpAddressOfData){// No address was provided, just render the template with what this template has.
return _this59.parseTemplateByHash(tmpTemplateHash,pData);}else{return _this59.parseTemplateByHash(tmpTemplateHash,_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpAddressOfData));}};this.MetaTemplate.addPattern('{~T:','~}',fTemplateRender);this.MetaTemplate.addPattern('{~Template:','~}',fTemplateRender);// {~TS:Template:AddressOfDataSet~}
var fTemplateSetRender=function fTemplateSetRender(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fTemplateSetRender]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>0){_this59.log.trace("PICT Template [fTemplateSetRender]::[".concat(tmpHash,"]"));}var tmpTemplateHash=false;var tmpAddressOfData=false;// This is just a simple 2 part hash (the entity and the ID)
var tmpHashTemplateSeparator=tmpHash.indexOf(':');tmpTemplateHash=tmpHash.substring(0,tmpHashTemplateSeparator);if(tmpHashTemplateSeparator>-1){tmpAddressOfData=tmpHash.substring(tmpHashTemplateSeparator+1);}else{tmpTemplateHash=tmpHash;}// No template hash
if(!tmpTemplateHash){_this59.log.warn("Pict: Template Render: TemplateHash not resolved for [".concat(tmpHash,"]"));return"Pict: Template Render: TemplateHash not resolved for [".concat(tmpHash,"]");}if(!tmpAddressOfData){// No address was provided, just render the template with what this template has.
return _this59.parseTemplateSetByHash(tmpTemplateHash,pData);}else{return _this59.parseTemplateSetByHash(tmpTemplateHash,_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpAddressOfData));}};this.MetaTemplate.addPattern('{~TS:','~}',fTemplateSetRender);this.MetaTemplate.addPattern('{~TemplateSet:','~}',fTemplateSetRender);//{~Data:AppData.Some.Value.to.Render~}
var fDataRender=function fDataRender(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fDataRender]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fDataRender]::[".concat(tmpHash,"]"));}var tmpValue=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHash);if(tmpValue==null||tmpValue=='undefined'||typeof tmpValue=='undefined'){return'';}return tmpValue;};this.MetaTemplate.addPattern('{~D:','~}',fDataRender);this.MetaTemplate.addPattern('{~Data:','~}',fDataRender);this.MetaTemplate.addPattern('{~Dollars:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fDollars]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fDollars]::[".concat(tmpHash,"]"));}var tmpColumnData=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHash);return _this59.DataFormat.formatterDollars(tmpColumnData);});this.MetaTemplate.addPattern('{~Digits:','~}',function(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fDigits]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fDigits]::[".concat(tmpHash,"]"));}var tmpColumnData=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHash);return _this59.DataFormat.formatterAddCommasToNumber(_this59.DataFormat.formatterRoundNumber(tmpColumnData,2));});var fRandomNumberString=function fRandomNumberString(pHash,pData){var tmpHash=pHash.trim();if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fRandomNumberString]::[".concat(tmpHash,"]"));}var tmpStringLength=4;var tmpMaxNumber=9999;if(tmpHash.length>0){var tmpHashParts=tmpHash.split(',');if(tmpHashParts.length>0){tmpStringLength=parseInt(tmpHashParts[0]);}if(tmpHashParts.length>1){tmpMaxNumber=parseInt(tmpHashParts[1]);}}return _this59.DataGeneration.randomNumericString(tmpStringLength,tmpMaxNumber);};this.MetaTemplate.addPattern('{~RandomNumberString:','~}',fRandomNumberString);this.MetaTemplate.addPattern('{~RNS:','~}',fRandomNumberString);var fRandomNumber=function fRandomNumber(pHash,pData){var tmpHash=pHash.trim();if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fRandomNumber]::[".concat(tmpHash,"]"));}var tmpMinimumNumber=0;var tmpMaxNumber=9999999;if(tmpHash.length>0){var tmpHashParts=tmpHash.split(',');if(tmpHashParts.length>0){tmpMinimumNumber=parseInt(tmpHashParts[0]);}if(tmpHashParts.length>1){tmpMaxNumber=parseInt(tmpHashParts[1]);}}return _this59.DataGeneration.randomIntegerBetween(tmpMinimumNumber,tmpMaxNumber);};this.MetaTemplate.addPattern('{~RandomNumber:','~}',fRandomNumber);this.MetaTemplate.addPattern('{~RN:','~}',fRandomNumber);var fPascalCaseIdentifier=function fPascalCaseIdentifier(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};if(_this59.LogNoisiness>4){_this59.log.trace("PICT Template [fPascalCaseIdentifier]::[".concat(tmpHash,"] with tmpData:"),tmpData);}else if(_this59.LogNoisiness>3){_this59.log.trace("PICT Template [fPascalCaseIdentifier]::[".concat(tmpHash,"]"));}var tmpValue=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHash);if(tmpValue==null||tmpValue=='undefined'||typeof tmpValue=='undefined'){return'';}return _this59.DataFormat.cleanNonAlphaCharacters(_this59.DataFormat.capitalizeEachWord(tmpValue));};this.MetaTemplate.addPattern('{~PascalCaseIdentifier:','~}',fPascalCaseIdentifier);var fLogValue=function fLogValue(pHash,pData){var tmpHash=pHash.trim();var tmpData=_typeof(pData)==='object'?pData:{};var tmpValue=_this59.manifest.getValueByHash({AppData:_this59.AppData,Bundle:_this59.Bundle,Record:tmpData},tmpHash);var tmpValueType=_typeof(tmpValue);if(tmpValue==null||tmpValueType=='undefined'){_this59.log.trace("PICT Template Log Value: [".concat(tmpHash,"] is ").concat(tmpValueType,"."));}else if(tmpValueType=='object'){_this59.log.trace("PICT Template Log Value: [".concat(tmpHash,"] is an obect."),tmpValue);}else{_this59.log.trace("PICT Template Log Value: [".concat(tmpHash,"] if a ").concat(tmpValueType," = [").concat(tmpValue,"]"));}return'';};this.MetaTemplate.addPattern('{~LogValue:','~}',fLogValue);this.MetaTemplate.addPattern('{~LV:','~}',fLogValue);var fLogStatement=function fLogStatement(pHash,pData){var tmpHash=pHash.trim();_this59.log.trace("PICT Template Log Message: ".concat(tmpHash));return'';};this.MetaTemplate.addPattern('{~LogStatement:','~}',fLogStatement);this.MetaTemplate.addPattern('{~LS:','~}',fLogStatement);var fBreakpoint=function fBreakpoint(pHash,pData){var tmpHash=pHash.trim();var tmpError=new Error("PICT Template Breakpoint: ".concat(tmpHash));_this59.log.trace("PICT Template Breakpoint: ".concat(tmpHash),tmpError.stack);debugger;return'';};this.MetaTemplate.addPattern('{~Breakpoint','~}',fBreakpoint);this._DefaultPictTemplatesInitialized=true;}}},{key:"parseTemplate",value:function parseTemplate(pTemplateString,pData,fCallback){var tmpData=_typeof(pData)==='object'?pData:{};return this.MetaTemplate.parseString(pTemplateString,tmpData,fCallback);}},{key:"parseTemplateByHash",value:function parseTemplateByHash(pTemplateHash,pData,fCallback){var tmpTemplateString=this.TemplateProvider.getTemplate(pTemplateHash);// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
if(!tmpTemplateString){return'';}return this.parseTemplate(tmpTemplateString,pData,fCallback);}},{key:"parseTemplateSet",value:function parseTemplateSet(pTemplateString,pDataSet,fCallback){var _this60=this;// TODO: This will need streaming -- for now janky old string append does the trick
var tmpValue='';if(typeof fCallback=='function'){if(Array.isArray(pDataSet)||_typeof(pDataSet)=='object'){this.Utility.eachLimit(pDataSet,1,function(pRecord,fRecordTemplateCallback){return _this60.parseTemplate(pTemplateString,pRecord,function(pError,pTemplateResult){tmpValue+=pTemplateResult;return fRecordTemplateCallback();});},function(pError){return fCallback(pError,tmpValue);});}else{return fCallback(Error('Pict: Template Set: pDataSet is not an array or object.'),'');}}else{if(Array.isArray(pDataSet)||_typeof(pDataSet)=='object'){if(Array.isArray(pDataSet)){for(var i=0;i<pDataSet.length;i++){tmpValue+=this.parseTemplate(pTemplateString,pDataSet[i]);}}else{var tmpKeys=Object.keys(pDataSet);for(var _i23=0;_i23<tmpKeys.length;_i23++){tmpValue+=this.parseTemplate(pTemplateString,pDataSet[tmpKeys[_i23]]);}}return tmpValue;}else{return'';}}}},{key:"parseTemplateSetByHash",value:function parseTemplateSetByHash(pTemplateHash,pDataSet,fCallback){var tmpTemplateString=this.TemplateProvider.getTemplate(pTemplateHash);// TODO: Unsure if returning empty is always the right behavior -- if it isn't we will use config to set the behavior
if(!tmpTemplateString){return'';}return this.parseTemplateSet(tmpTemplateString,pDataSet,fCallback);}}]);return Pict;}(libFable);;module.exports=Pict;module.exports.PictApplicationClass=require('pict-application');module.exports.PictViewClass=require('pict-view');module.exports.EnvironmentLog=require('./environments/Pict-Environment-Log.js');module.exports.EnvironmentObject=require('./environments/Pict-Environment-Object.js');// This is to help understand the type of enivironement we're executing in
module.exports.isBrowser=new Function("try {return (this===window);} catch(pError) {return false;}");},{"./Pict-CSS.js":138,"./Pict-Content-Assignment.js":139,"./Pict-DataProvider.js":140,"./Pict-Meadow-EntityProvider.js":141,"./Pict-Template-Provider.js":142,"./environments/Pict-Environment-Log.js":144,"./environments/Pict-Environment-Object.js":145,"fable":50,"pict-application":93,"pict-view":94}],144:[function(require,module,exports){/**
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
*/var PictEnvironmentLog=/*#__PURE__*/function(){function PictEnvironmentLog(pPict,pContentMap){_classCallCheck2(this,PictEnvironmentLog);this.contentMap=_typeof(pContentMap)=='object'?pContentMap:{};this.pict=pPict;// If this is set to false, we won't keep an array-based log of every read, assignment, append or get.
this.truncateContentLength=256;this.storeEventLog=true;// Where to store each event type
this.eventLog={};this.eventLog.GetElement=[];this.eventLog.Read=[];this.eventLog.Prepend=[];this.eventLog.Append=[];this.eventLog.Assign=[];this.pict.ContentAssignment.customGetElementFunction=this.customGetElementFunction.bind(this);this.pict.ContentAssignment.customReadFunction=this.customReadFunction.bind(this);this.pict.ContentAssignment.customAppendFunction=this.customAppendFunction.bind(this);this.pict.ContentAssignment.customPrependFunction=this.customPrependFunction.bind(this);this.pict.ContentAssignment.customAssignFunction=this.customAssignFunction.bind(this);}_createClass2(PictEnvironmentLog,[{key:"createEventLogEntry",value:function createEventLogEntry(pAddress,pContent){var tmpContent=typeof pContent=='undefined'?'':pContent;return{TimeStamp:this.pict.log.getTimeStamp(),Hash:pAddress,Content:tmpContent};}},{key:"customGetElementFunction",value:function customGetElementFunction(pAddress){if(this.storeEventLog)this.eventLog.GetElement.push(this.createEventLogEntry(pAddress));this.pict.log.info("Mocking an GET of Address -> [".concat(pAddress,"]"));return'';}},{key:"customReadFunction",value:function customReadFunction(pAddress){if(this.storeEventLog)this.eventLog.Read.push(this.createEventLogEntry(pAddress));this.pict.log.info("Mocking an READ from Address -> [".concat(pAddress,"]"));if(this.contentMap.hasOwnProperty(pAddress)){// The data is in the content map!
return this.contentMap[pAddress];}this.pict.log.warn("Mock read from Address ".concat(pAddress," did not find a value in the content map."));return'';}},{key:"customAppendFunction",value:function customAppendFunction(pAddress,pContent){if(this.storeEventLog)this.eventLog.Append.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an APPEND to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an APPEND to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}},{key:"customPrependFunction",value:function customPrependFunction(pAddress,pContent){if(this.storeEventLog)this.eventLog.Prepend.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an PREPEND to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an PREPEND to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}},{key:"customAssignFunction",value:function customAssignFunction(pAddress,pContent){if(this.storeEventLog)this.eventLog.Assign.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an ASSIGN to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an ASSIGN to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}}]);return PictEnvironmentLog;}();module.exports=PictEnvironmentLog;},{}],145:[function(require,module,exports){/**
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
*/var PictEnvironmentObject=/*#__PURE__*/function(){function PictEnvironmentObject(pPict,pContentMap){_classCallCheck2(this,PictEnvironmentObject);this.contentMap=_typeof(pContentMap)=='object'?pContentMap:{};this.pict=pPict;// If this is set to false, we won't keep an array-based log of every read, assignment, append or get.
this.truncateContentLength=256;this.storeEventLog=true;// Where to store each event type
this.eventLog={};this.eventLog.GetElement=[];this.eventLog.Read=[];this.eventLog.Prepend=[];this.eventLog.Append=[];this.eventLog.Assign=[];this.pict.ContentAssignment.customGetElementFunction=this.customGetElementFunction.bind(this);this.pict.ContentAssignment.customReadFunction=this.customReadFunction.bind(this);this.pict.ContentAssignment.customAppendFunction=this.customAppendFunction.bind(this);this.pict.ContentAssignment.customPrependFunction=this.customPrependFunction.bind(this);this.pict.ContentAssignment.customAssignFunction=this.customAssignFunction.bind(this);}_createClass2(PictEnvironmentObject,[{key:"createEventLogEntry",value:function createEventLogEntry(pAddress,pContent){var tmpContent=typeof pContent=='undefined'?'':pContent;return{TimeStamp:this.pict.log.getTimeStamp(),Hash:pAddress,Content:tmpContent};}},{key:"customGetElementFunction",value:function customGetElementFunction(pAddress){if(this.storeEventLog)this.eventLog.GetElement.push(this.createEventLogEntry(pAddress));this.pict.log.info("Mocking an GET of Address -> [".concat(pAddress,"]"));return'';}},{key:"customReadFunction",value:function customReadFunction(pAddress){if(this.storeEventLog)this.eventLog.Read.push(this.createEventLogEntry(pAddress));this.pict.log.info("Mocking an READ from Address -> [".concat(pAddress,"]"));if(this.contentMap.hasOwnProperty(pAddress)){// The data is in the content map!
return this.contentMap[pAddress];}this.pict.log.warn("Mock read from Address ".concat(pAddress," did not find a value in the content map."));return'';}},{key:"customAppendFunction",value:function customAppendFunction(pAddress,pContent){this.contentMap[pAddress]=typeof this.contentMap[pAddress]=='undefined'?pContent:this.contentMap[pAddress]+pContent;if(this.storeEventLog)this.eventLog.Append.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an APPEND to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an APPEND to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}},{key:"customPrependFunction",value:function customPrependFunction(pAddress,pContent){this.contentMap[pAddress]=typeof this.contentMap[pAddress]=='undefined'?pContent:pContent+this.contentMap[pAddress];if(this.storeEventLog)this.eventLog.Prepend.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an PREPEND to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an PREPEND to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}},{key:"customAssignFunction",value:function customAssignFunction(pAddress,pContent){this.contentMap[pAddress]=pContent;if(this.storeEventLog)this.eventLog.Assign.push(this.createEventLogEntry(pAddress,pContent));if(pContent.length>this.truncateContentLength){this.pict.log.info("Mocking an ASSIGN to Address -> [".concat(pAddress,"] (log truncated to first ").concat(this.truncateContentLength," characters)"),{Content:pContent.substring(0,this.truncateContentLength)});}else{this.pict.log.info("Mocking an ASSIGN to Address -> [".concat(pAddress,"]"),{Content:pContent});}return'';}}]);return PictEnvironmentObject;}();module.exports=PictEnvironmentObject;},{}]},{},[143])(143);});