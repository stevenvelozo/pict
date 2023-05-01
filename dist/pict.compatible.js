(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.Pict=f();}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o;}return r;}()({1:[function(require,module,exports){'use strict';var eachOfLimit=require('async.util.eachoflimit');var withoutIndex=require('async.util.withoutindex');module.exports=function eachLimit(arr,limit,iterator,cb){return eachOfLimit(limit)(arr,withoutIndex(iterator),cb);};},{"async.util.eachoflimit":3,"async.util.withoutindex":14}],2:[function(require,module,exports){'use strict';module.exports=function(tasks){function makeCallback(index){function fn(){if(tasks.length){tasks[index].apply(null,arguments);}return fn.next();}fn.next=function(){return index<tasks.length-1?makeCallback(index+1):null;};return fn;}return makeCallback(0);};},{}],3:[function(require,module,exports){var once=require('async.util.once');var noop=require('async.util.noop');var onlyOnce=require('async.util.onlyonce');var keyIterator=require('async.util.keyiterator');module.exports=function eachOfLimit(limit){return function(obj,iterator,cb){cb=once(cb||noop);obj=obj||[];var nextKey=keyIterator(obj);if(limit<=0){return cb(null);}var done=false;var running=0;var errored=false;(function replenish(){if(done&&running<=0){return cb(null);}while(running<limit&&!errored){var key=nextKey();if(key===null){done=true;if(running<=0){cb(null);}return;}running+=1;iterator(obj[key],key,onlyOnce(function(err){running-=1;if(err){cb(err);errored=true;}else{replenish();}}));}})();};};},{"async.util.keyiterator":7,"async.util.noop":9,"async.util.once":10,"async.util.onlyonce":11}],4:[function(require,module,exports){'use strict';var setImmediate=require('async.util.setimmediate');var restParam=require('async.util.restparam');module.exports=function(fn){return restParam(function(args){var callback=args.pop();args.push(function(){var innerArgs=arguments;if(sync){setImmediate(function(){callback.apply(null,innerArgs);});}else{callback.apply(null,innerArgs);}});var sync=true;fn.apply(this,args);sync=false;});};},{"async.util.restparam":12,"async.util.setimmediate":13}],5:[function(require,module,exports){'use strict';module.exports=Array.isArray||function isArray(obj){return Object.prototype.toString.call(obj)==='[object Array]';};},{}],6:[function(require,module,exports){'use strict';var isArray=require('async.util.isarray');module.exports=function isArrayLike(arr){return isArray(arr)||
typeof arr.length==='number'&&arr.length>=0&&arr.length%1===0;};},{"async.util.isarray":5}],7:[function(require,module,exports){'use strict';var _keys=require('async.util.keys');var isArrayLike=require('async.util.isarraylike');module.exports=function keyIterator(coll){var i=-1;var len;var keys;if(isArrayLike(coll)){len=coll.length;return function next(){i++;return i<len?i:null;};}else{keys=_keys(coll);len=keys.length;return function next(){i++;return i<len?keys[i]:null;};}};},{"async.util.isarraylike":6,"async.util.keys":8}],8:[function(require,module,exports){'use strict';module.exports=Object.keys||function keys(obj){var _keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){_keys.push(k);}}return _keys;};},{}],9:[function(require,module,exports){'use strict';module.exports=function noop(){};},{}],10:[function(require,module,exports){'use strict';module.exports=function once(fn){return function(){if(fn===null)return;fn.apply(this,arguments);fn=null;};};},{}],11:[function(require,module,exports){'use strict';module.exports=function only_once(fn){return function(){if(fn===null)throw new Error('Callback was already called.');fn.apply(this,arguments);fn=null;};};},{}],12:[function(require,module,exports){'use strict';module.exports=function restParam(func,startIndex){startIndex=startIndex==null?func.length-1:+startIndex;return function(){var length=Math.max(arguments.length-startIndex,0);var rest=new Array(length);for(var index=0;index<length;index++){rest[index]=arguments[index+startIndex];}switch(startIndex){case 0:return func.call(this,rest);case 1:return func.call(this,arguments[0],rest);}};};},{}],13:[function(require,module,exports){(function(setImmediate){(function(){'use strict';var _setImmediate=typeof setImmediate==='function'&&setImmediate;var fallback=function(fn){setTimeout(fn,0);};module.exports=function setImmediate(fn){
return(_setImmediate||fallback)(fn);};}).call(this);}).call(this,require("timers").setImmediate);},{"timers":99}],14:[function(require,module,exports){'use strict';module.exports=function withoutIndex(iterator){return function(value,index,callback){return iterator(value,callback);};};},{}],15:[function(require,module,exports){'use strict';var once=require('async.util.once');var noop=require('async.util.noop');var isArray=require('async.util.isarray');var restParam=require('async.util.restparam');var ensureAsync=require('async.util.ensureasync');var iterator=require('async.iterator');module.exports=function(tasks,cb){cb=once(cb||noop);if(!isArray(tasks))return cb(new Error('First argument to waterfall must be an array of functions'));if(!tasks.length)return cb();function wrapIterator(iterator){return restParam(function(err,args){if(err){cb.apply(null,[err].concat(args));}else{var next=iterator.next();if(next){args.push(wrapIterator(next));}else{args.push(cb);}ensureAsync(iterator).apply(null,args);}});}wrapIterator(iterator(tasks))();};},{"async.iterator":2,"async.util.ensureasync":4,"async.util.isarray":5,"async.util.noop":9,"async.util.once":10,"async.util.restparam":12}],16:[function(require,module,exports){},{}],17:[function(require,module,exports){ const libLinkedList=require(`./LinkedList.js`);class CashMoney{constructor(){
this._HashMap={};this._List=new libLinkedList();
this.maxLength=0;
this.maxAge=0;}
put(pData,pHash){
if(this._HashMap.hasOwnProperty(pHash)){
this._HashMap[pHash].Datum=pData;return this._HashMap[pHash].Datum;}let tmpNode=this._List.push(pData,pHash);this._HashMap[tmpNode.Hash]=tmpNode;
if(this.maxLength>0&&this._List.length>this.maxLength){
tmpNode=this._List.pop();
delete this._HashMap[tmpNode.Hash];}
tmpNode.Metadata.Created=+new Date();return tmpNode.Datum;}
touch(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;
let tmpNode=this._List.remove(this._HashMap[pHash]);
delete this._HashMap[pHash];
return this.put(tmpNode.Datum,tmpNode.Hash);}
expire(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;let tmpNode=this._HashMap[pHash];
tmpNode=this._List.remove(tmpNode);
delete this._HashMap[tmpNode.Hash];
return tmpNode;}
pruneBasedOnExpiration(fComplete,pRemovedRecords){let tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;if(this.maxAge<1)return fComplete(tmpRemovedRecords);
let tmpNow=+new Date();let tmpKeys=Object.keys(this._HashMap);for(let i=0;i<tmpKeys.length;i++){
if(tmpNow-this._HashMap[tmpKeys[i]].Metadata.Created>=this.maxAge)tmpRemovedRecords.push(this.expire(tmpKeys[i]));}fComplete(tmpRemovedRecords);}
pruneBasedOnLength(fComplete,pRemovedRecords){let tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;
if(this.maxLength>0)while(this._List.length>this.maxLength)tmpRemovedRecords.push(this._List.pop());return fComplete(tmpRemovedRecords);}
pruneCustom(fComplete,fPruneFunction,pRemovedRecords){let tmpRemovedRecords=typeof pRemovedRecords==='undefined'?[]:pRemovedRecords;let tmpKeys=Object.keys(this._HashMap);for(let i=0;i<tmpKeys.length;i++){let tmpNode=this._HashMap[tmpKeys[i]];
if(fPruneFunction(tmpNode.Datum,tmpNode.Hash,tmpNode))tmpRemovedRecords.push(this.expire(tmpKeys[i]));}fComplete(tmpRemovedRecords);}
prune(fComplete){let tmpRemovedRecords=[];
if(this._List.length<1)return fComplete(tmpRemovedRecords);
this.pruneBasedOnExpiration(fExpirationPruneComplete=>{
this.pruneBasedOnLength(fComplete,tmpRemovedRecords);},tmpRemovedRecords);}
read(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;return this._HashMap[pHash].Datum;}
getNode(pHash){if(!this._HashMap.hasOwnProperty(pHash))return false;return this._HashMap[pHash];}}module.exports=CashMoney;},{"./LinkedList.js":19}],18:[function(require,module,exports){ class LinkedListNode{constructor(){this.Hash=false;this.Datum=false;
this.Metadata={};this.LeftNode=false;this.RightNode=false;
this.__ISNODE=true;}}module.exports=LinkedListNode;},{}],19:[function(require,module,exports){"use strict";const libLinkedListNode=require('./LinkedList-Node.js');class LinkedList{constructor(){
this.totalNodes=0;
this.length=0;this.head=false;this.tail=false;}
initializeNode(pDatum,pHash){
if(typeof pDatum==='undefined')return false;this.totalNodes++;
let tmpHash=typeof pHash!='undefined'?pHash:`NODE[${this.totalNodes}]`;let tmpNode=new libLinkedListNode();tmpNode.Hash=tmpHash;tmpNode.Datum=pDatum;return tmpNode;}
append(pDatum,pHash){
let tmpNode=this.initializeNode(pDatum,pHash);if(!tmpNode)return false;
this.length++;
if(this.length==1){this.head=tmpNode;this.tail=tmpNode;return tmpNode;}this.tail.RightNode=tmpNode;tmpNode.LeftNode=this.tail;this.tail=tmpNode;return tmpNode;}
push(pDatum,pHash){return this.append(pDatum,pHash);}
prepend(pDatum,pHash){
let tmpNode=this.initializeNode(pDatum,pHash);if(!tmpNode)return false;
this.length++;
if(this.length==1){this.head=tmpNode;this.tail=tmpNode;return tmpNode;}this.head.LeftNode=tmpNode;tmpNode.RightNode=this.head;this.head=tmpNode;return tmpNode;}
remove(pNode){if(typeof pNode==='undefined')return false;if(!pNode.__ISNODE)return false;this.length--;
if(this.length<1){this.head=false;this.tail=false;return pNode;}
if(pNode.LeftNode&&pNode.RightNode){pNode.LeftNode.RightNode=pNode.RightNode;pNode.RightNode.LeftNode=pNode.LeftNode;pNode.RightNode=false;pNode.LeftNode=false;return pNode;}
if(pNode.LeftNode){pNode.LeftNode.RightNode=false;this.tail=pNode.LeftNode;pNode.LeftNode=false;return pNode;}
pNode.RightNode.LeftNode=false;this.head=pNode.RightNode;pNode.RightNode=false;return pNode;}
pop(){return this.remove(this.head);}
each(fAction,fComplete){if(this.length<1)return fComplete();let tmpNode=false;let fIterator=pError=>{
if(pError)return fComplete(pError);
if(!tmpNode)tmpNode=this.head;
else if(!tmpNode.RightNode)return fComplete();
else tmpNode=tmpNode.RightNode;
fAction(tmpNode.Datum,tmpNode.Hash,fIterator);};
return fIterator();}
seek(pNodeIndex){if(!pNodeIndex)return false;if(this.length<1)return false;if(pNodeIndex>=this.length)return false;let tmpNode=this.head;for(let i=0;i<pNodeIndex;i++){tmpNode=tmpNode.RightNode;}return tmpNode;}}module.exports=LinkedList;},{"./LinkedList-Node.js":18}],20:[function(require,module,exports){ class DataArithmatic{constructor(){
this._Regex_formatterInsertCommas=/.{1,3}/g;
this._Regex_formatterAddCommasToNumber=/^([-+]?)(0?)(\d+)(.?)(\d+)$/g;this._Regex_formatterDollarsRemoveCommas=/,/gi;this._Regex_formatterCleanNonAlpha=/[^a-z0-9]/gi;
this._Value_MoneySign_Currency='$';this._Value_NaN_Currency='--';this._Value_GroupSeparator_Number=',';this._Value_Prefix_StringHash='HSH';this._Value_Clean_formatterCleanNonAlpha='_';this._UseEngineStringStartsWith=typeof String.prototype.startsWith==='function';this._UseEngineStringEndsWith=typeof String.prototype.endsWith==='function';} stringReverse(pString){
return pString.split('').reverse().join('');}stringStartsWith(pString,pSearchString,pStartIndex){if(this._UseEngineStringStartsWith){return pString.startsWith(pSearchString,pStartIndex);}else{return this.stringStartsWith_Polyfill.call(pString,pSearchString,pStartIndex);}}stringStartsWith_Polyfill(pSearchString,pStartIndex){return this.slice(pStartIndex||0,pSearchString.length)===pSearchString;}stringEndsWith(pString,pSearchString,pEndIndex){if(this._UseEngineStringEndsWith){return pString.endsWith(pSearchString,pEndIndex);}else{return this.stringEndsWith_Polyfill.call(pString,pSearchString,pEndIndex);}}stringEndsWith_Polyfill(pSearchString,pEndIndex){
if(!(pEndIndex<this.length)){pEndIndex=this.length;}else{pEndIndex|=0;
}return this.substr(pEndIndex-pSearchString.length,pSearchString.length)===pSearchString;}insecureStringHash(pString){let tmpHash=0;let tmpStringLength=pString.length;let tmpCharacterIndex=0;while(tmpCharacterIndex<tmpStringLength){tmpHash=(tmpHash<<5)-tmpHash+pString.charCodeAt(tmpCharacterIndex++)|0;}return`${this._Value_Prefix_StringHash}${tmpHash}`;}cleanEnclosureWrapCharacters(pWrapCharacter,pString){
if(pString.startsWith(pWrapCharacter)&&pString.endsWith(pWrapCharacter)){return pString.substring(1,pString.length-1);}else{return pString;}}cleanNonAlphaCharacters(pString){if(typeof pString=='string'&&pString!=''){return pString.replace(this._Regex_formatterCleanNonAlpha,this._Value_Clean_formatterCleanNonAlpha);}} formatterInsertCommas(pString){
let tmpReversed=this.stringReverse(pString);
let tmpReversedWithCommas=tmpReversed.match(this._Regex_formatterInsertCommas).join(',');
return this.stringReverse(tmpReversedWithCommas);}processAddCommasToNumberRegex(pMatch,pSign,pZeros,pBefore,pDecimal,pAfter){
return pSign+(pDecimal?this.formatterInsertCommas(pBefore)+pDecimal+pAfter:this.formatterInsertCommas(pBefore+pAfter));}formatterAddCommasToNumber(pNumber){
return pNumber.toString().replace(this._Regex_formatterAddCommasToNumber,this.processAddCommasToNumberRegex.bind(this));}formatterDollars(pValue){let tmpDollarAmount=parseFloat(pValue).toFixed(2);if(isNaN(tmpDollarAmount)){
if(typeof pValue=='string'){
tmpDollarAmount=parseFloat(pValue.replace(this._Value_MoneySign_Currency,'').replace(this._Regex_formatterDollarsRemoveCommas,'')).toFixed(2);}
if(isNaN(tmpDollarAmount)){return this._Value_NaN_Currency;}}
return`$${this.formatterAddCommasToNumber(tmpDollarAmount)}`;}formatterRoundNumber(pValue,pDigits){let tmpDigits=typeof pDigits=='undefined'?2:pDigits;let tmpValue=Number.parseFloat(pValue).toFixed(tmpDigits);if(isNaN(tmpValue)){let tmpZed=0;return tmpZed.toFixed(tmpDigits);}else{return tmpValue;}} stringBeforeMatch(pString,pMatch){return pString.split(pMatch)[0];}stringAfterMatch(pString,pMatch){let tmpStringSplitLocation=pString.indexOf(pMatch);if(tmpStringSplitLocation<0||tmpStringSplitLocation+pMatch.length>=pString.length){return'';}return pString.substring(tmpStringSplitLocation+pMatch.length);}stringCountEnclosures(pString,pEnclosureStart,pEnclosureEnd){let tmpString=typeof pString=='string'?pString:'';let tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';let tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';let tmpEnclosureCount=0;let tmpEnclosureDepth=0;for(let i=0;i<tmpString.length;i++){
if(tmpString[i]==tmpEnclosureStart){if(tmpEnclosureDepth==0){tmpEnclosureCount++;}tmpEnclosureDepth++;}else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;}}return tmpEnclosureCount;}stringGetEnclosureValueByIndex(pString,pEnclosureIndexToGet,pEnclosureStart,pEnclosureEnd){let tmpString=typeof pString=='string'?pString:'';let tmpEnclosureIndexToGet=typeof pEnclosureIndexToGet=='number'?pEnclosureIndexToGet:0;let tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';let tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';let tmpEnclosureCount=0;let tmpEnclosureDepth=0;let tmpMatchedEnclosureIndex=false;let tmpEnclosedValueStartIndex=0;let tmpEnclosedValueEndIndex=0;for(let i=0;i<tmpString.length;i++){
if(tmpString[i]==tmpEnclosureStart){tmpEnclosureDepth++;
if(tmpEnclosureDepth==1){tmpEnclosureCount++;if(tmpEnclosureIndexToGet==tmpEnclosureCount-1){
tmpMatchedEnclosureIndex=true;tmpEnclosedValueStartIndex=i;}}}
else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;
if(tmpEnclosureDepth==0&&tmpMatchedEnclosureIndex&&tmpEnclosedValueEndIndex<=tmpEnclosedValueStartIndex){tmpEnclosedValueEndIndex=i;tmpMatchedEnclosureIndex=false;}}}if(tmpEnclosureCount<=tmpEnclosureIndexToGet){
return'';}if(tmpEnclosedValueEndIndex>0&&tmpEnclosedValueEndIndex>tmpEnclosedValueStartIndex){return tmpString.substring(tmpEnclosedValueStartIndex+1,tmpEnclosedValueEndIndex);}else{return tmpString.substring(tmpEnclosedValueStartIndex+1);}}stringRemoveEnclosureByIndex(pString,pEnclosureIndexToRemove,pEnclosureStart,pEnclosureEnd){let tmpString=typeof pString=='string'?pString:'';let tmpEnclosureIndexToRemove=typeof pEnclosureIndexToRemove=='number'?pEnclosureIndexToRemove:0;let tmpEnclosureStart=typeof pEnclosureStart=='string'?pEnclosureStart:'(';let tmpEnclosureEnd=typeof pEnclosureEnd=='string'?pEnclosureEnd:')';let tmpEnclosureCount=0;let tmpEnclosureDepth=0;let tmpMatchedEnclosureIndex=false;let tmpEnclosureStartIndex=0;let tmpEnclosureEndIndex=0;for(let i=0;i<tmpString.length;i++){
if(tmpString[i]==tmpEnclosureStart){tmpEnclosureDepth++;if(tmpEnclosureDepth==1){tmpEnclosureCount++;if(tmpEnclosureIndexToRemove==tmpEnclosureCount-1){tmpMatchedEnclosureIndex=true;tmpEnclosureStartIndex=i;}}}else if(tmpString[i]==tmpEnclosureEnd){tmpEnclosureDepth--;if(tmpEnclosureDepth==0&&tmpMatchedEnclosureIndex&&tmpEnclosureEndIndex<=tmpEnclosureStartIndex){tmpEnclosureEndIndex=i;tmpMatchedEnclosureIndex=false;}}}if(tmpEnclosureCount<=tmpEnclosureIndexToRemove){return tmpString;}let tmpReturnString='';if(tmpEnclosureStartIndex>1){tmpReturnString=tmpString.substring(0,tmpEnclosureStartIndex);}if(tmpString.length>tmpEnclosureEndIndex+1&&tmpEnclosureEndIndex>tmpEnclosureStartIndex){tmpReturnString+=tmpString.substring(tmpEnclosureEndIndex+1);}return tmpReturnString;}}module.exports=DataArithmatic;},{}],21:[function(require,module,exports){;(function(globalScope){'use strict'; 
var EXP_LIMIT=9e15,
MAX_DIGITS=1e9,
NUMERALS='0123456789abcdef',
LN10='2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
PI='3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
DEFAULTS={
precision:20,
rounding:4,
modulo:1,
toExpNeg:-7,
toExpPos:21,
minE:-EXP_LIMIT,
maxE:EXP_LIMIT,
crypto:false
},
Decimal,inexact,noConflict,quadrant,external=true,decimalError='[DecimalError] ',invalidArgument=decimalError+'Invalid argument: ',precisionLimitExceeded=decimalError+'Precision limit exceeded',cryptoUnavailable=decimalError+'crypto unavailable',tag='[object Decimal]',mathfloor=Math.floor,mathpow=Math.pow,isBinary=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,isHex=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,isOctal=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,isDecimal=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,BASE=1e7,LOG_BASE=7,MAX_SAFE_INTEGER=9007199254740991,LN10_PRECISION=LN10.length-1,PI_PRECISION=PI.length-1,
P={toStringTag:tag};
P.absoluteValue=P.abs=function(){var x=new this.constructor(this);if(x.s<0)x.s=1;return finalise(x);};P.ceil=function(){return finalise(new this.constructor(this),this.e+1,2);};P.clampedTo=P.clamp=function(min,max){var k,x=this,Ctor=x.constructor;min=new Ctor(min);max=new Ctor(max);if(!min.s||!max.s)return new Ctor(NaN);if(min.gt(max))throw Error(invalidArgument+max);k=x.cmp(min);return k<0?min:x.cmp(max)>0?max:new Ctor(x);};P.comparedTo=P.cmp=function(y){var i,j,xdL,ydL,x=this,xd=x.d,yd=(y=new x.constructor(y)).d,xs=x.s,ys=y.s;
if(!xd||!yd){return!xs||!ys?NaN:xs!==ys?xs:xd===yd?0:!xd^xs<0?1:-1;}
if(!xd[0]||!yd[0])return xd[0]?xs:yd[0]?-ys:0;
if(xs!==ys)return xs;
if(x.e!==y.e)return x.e>y.e^xs<0?1:-1;xdL=xd.length;ydL=yd.length;
for(i=0,j=xdL<ydL?xdL:ydL;i<j;++i){if(xd[i]!==yd[i])return xd[i]>yd[i]^xs<0?1:-1;}
return xdL===ydL?0:xdL>ydL^xs<0?1:-1;};P.cosine=P.cos=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.d)return new Ctor(NaN);
if(!x.d[0])return new Ctor(1);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+LOG_BASE;Ctor.rounding=1;x=cosine(Ctor,toLessThanHalfPi(Ctor,x));Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant==2||quadrant==3?x.neg():x,pr,rm,true);};P.cubeRoot=P.cbrt=function(){var e,m,n,r,rep,s,sd,t,t3,t3plusx,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);external=false;
s=x.s*mathpow(x.s*x,1/3);
if(!s||Math.abs(s)==1/0){n=digitsToString(x.d);e=x.e;
if(s=(e-n.length+1)%3)n+=s==1||s==-2?'0':'00';s=mathpow(n,1/3);
e=mathfloor((e+1)/3)-(e%3==(e<0?-1:2));if(s==1/0){n='5e'+e;}else{n=s.toExponential();n=n.slice(0,n.indexOf('e')+1)+e;}r=new Ctor(n);r.s=x.s;}else{r=new Ctor(s.toString());}sd=(e=Ctor.precision)+3;
for(;;){t=r;t3=t.times(t).times(t);t3plusx=t3.plus(x);r=divide(t3plusx.plus(x).times(t),t3plusx.plus(t3),sd+2,1);
if(digitsToString(t.d).slice(0,sd)===(n=digitsToString(r.d)).slice(0,sd)){n=n.slice(sd-3,sd+1);
if(n=='9999'||!rep&&n=='4999'){
if(!rep){finalise(t,e+1,0);if(t.times(t).times(t).eq(x)){r=t;break;}}sd+=4;rep=1;}else{
if(!+n||!+n.slice(1)&&n.charAt(0)=='5'){
finalise(r,e+1,1);m=!r.times(r).times(r).eq(x);}break;}}}external=true;return finalise(r,e,Ctor.rounding,m);};P.decimalPlaces=P.dp=function(){var w,d=this.d,n=NaN;if(d){w=d.length-1;n=(w-mathfloor(this.e/LOG_BASE))*LOG_BASE;
w=d[w];if(w)for(;w%10==0;w/=10)n--;if(n<0)n=0;}return n;};P.dividedBy=P.div=function(y){return divide(this,new this.constructor(y));};P.dividedToIntegerBy=P.divToInt=function(y){var x=this,Ctor=x.constructor;return finalise(divide(x,new Ctor(y),0,1,1),Ctor.precision,Ctor.rounding);};P.equals=P.eq=function(y){return this.cmp(y)===0;};P.floor=function(){return finalise(new this.constructor(this),this.e+1,3);};P.greaterThan=P.gt=function(y){return this.cmp(y)>0;};P.greaterThanOrEqualTo=P.gte=function(y){var k=this.cmp(y);return k==1||k===0;};P.hyperbolicCosine=P.cosh=function(){var k,n,pr,rm,len,x=this,Ctor=x.constructor,one=new Ctor(1);if(!x.isFinite())return new Ctor(x.s?1/0:NaN);if(x.isZero())return one;pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+4;Ctor.rounding=1;len=x.d.length;
if(len<32){k=Math.ceil(len/3);n=(1/tinyPow(4,k)).toString();}else{k=16;n='2.3283064365386962890625e-10';}x=taylorSeries(Ctor,1,x.times(n),new Ctor(1),true);
var cosh2_x,i=k,d8=new Ctor(8);for(;i--;){cosh2_x=x.times(x);x=one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));}return finalise(x,Ctor.precision=pr,Ctor.rounding=rm,true);};P.hyperbolicSine=P.sinh=function(){var k,pr,rm,len,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+4;Ctor.rounding=1;len=x.d.length;if(len<3){x=taylorSeries(Ctor,2,x,x,true);}else{
k=1.4*Math.sqrt(len);k=k>16?16:k|0;x=x.times(1/tinyPow(5,k));x=taylorSeries(Ctor,2,x,x,true);
var sinh2_x,d5=new Ctor(5),d16=new Ctor(16),d20=new Ctor(20);for(;k--;){sinh2_x=x.times(x);x=x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));}}Ctor.precision=pr;Ctor.rounding=rm;return finalise(x,pr,rm,true);};P.hyperbolicTangent=P.tanh=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(x.s);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+7;Ctor.rounding=1;return divide(x.sinh(),x.cosh(),Ctor.precision=pr,Ctor.rounding=rm);};P.inverseCosine=P.acos=function(){var halfPi,x=this,Ctor=x.constructor,k=x.abs().cmp(1),pr=Ctor.precision,rm=Ctor.rounding;if(k!==-1){return k===0
?x.isNeg()?getPi(Ctor,pr,rm):new Ctor(0)
:new Ctor(NaN);}if(x.isZero())return getPi(Ctor,pr+4,rm).times(0.5);
Ctor.precision=pr+6;Ctor.rounding=1;x=x.asin();halfPi=getPi(Ctor,pr+4,rm).times(0.5);Ctor.precision=pr;Ctor.rounding=rm;return halfPi.minus(x);};P.inverseHyperbolicCosine=P.acosh=function(){var pr,rm,x=this,Ctor=x.constructor;if(x.lte(1))return new Ctor(x.eq(1)?0:NaN);if(!x.isFinite())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(Math.abs(x.e),x.sd())+4;Ctor.rounding=1;external=false;x=x.times(x).minus(1).sqrt().plus(x);external=true;Ctor.precision=pr;Ctor.rounding=rm;return x.ln();};P.inverseHyperbolicSine=P.asinh=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite()||x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+2*Math.max(Math.abs(x.e),x.sd())+6;Ctor.rounding=1;external=false;x=x.times(x).plus(1).sqrt().plus(x);external=true;Ctor.precision=pr;Ctor.rounding=rm;return x.ln();};P.inverseHyperbolicTangent=P.atanh=function(){var pr,rm,wpr,xsd,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.e>=0)return new Ctor(x.abs().eq(1)?x.s/0:x.isZero()?x:NaN);pr=Ctor.precision;rm=Ctor.rounding;xsd=x.sd();if(Math.max(xsd,pr)<2*-x.e-1)return finalise(new Ctor(x),pr,rm,true);Ctor.precision=wpr=xsd-x.e;x=divide(x.plus(1),new Ctor(1).minus(x),wpr+pr,1);Ctor.precision=pr+4;Ctor.rounding=1;x=x.ln();Ctor.precision=pr;Ctor.rounding=rm;return x.times(0.5);};P.inverseSine=P.asin=function(){var halfPi,k,pr,rm,x=this,Ctor=x.constructor;if(x.isZero())return new Ctor(x);k=x.abs().cmp(1);pr=Ctor.precision;rm=Ctor.rounding;if(k!==-1){
if(k===0){halfPi=getPi(Ctor,pr+4,rm).times(0.5);halfPi.s=x.s;return halfPi;}
return new Ctor(NaN);}
Ctor.precision=pr+6;Ctor.rounding=1;x=x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();Ctor.precision=pr;Ctor.rounding=rm;return x.times(2);};P.inverseTangent=P.atan=function(){var i,j,k,n,px,t,r,wpr,x2,x=this,Ctor=x.constructor,pr=Ctor.precision,rm=Ctor.rounding;if(!x.isFinite()){if(!x.s)return new Ctor(NaN);if(pr+4<=PI_PRECISION){r=getPi(Ctor,pr+4,rm).times(0.5);r.s=x.s;return r;}}else if(x.isZero()){return new Ctor(x);}else if(x.abs().eq(1)&&pr+4<=PI_PRECISION){r=getPi(Ctor,pr+4,rm).times(0.25);r.s=x.s;return r;}Ctor.precision=wpr=pr+10;Ctor.rounding=1;
k=Math.min(28,wpr/LOG_BASE+2|0);for(i=k;i;--i)x=x.div(x.times(x).plus(1).sqrt().plus(1));external=false;j=Math.ceil(wpr/LOG_BASE);n=1;x2=x.times(x);r=new Ctor(x);px=x;
for(;i!==-1;){px=px.times(x2);t=r.minus(px.div(n+=2));px=px.times(x2);r=t.plus(px.div(n+=2));if(r.d[j]!==void 0)for(i=j;r.d[i]===t.d[i]&&i--;);}if(k)r=r.times(2<<k-1);external=true;return finalise(r,Ctor.precision=pr,Ctor.rounding=rm,true);};P.isFinite=function(){return!!this.d;};P.isInteger=P.isInt=function(){return!!this.d&&mathfloor(this.e/LOG_BASE)>this.d.length-2;};P.isNaN=function(){return!this.s;};P.isNegative=P.isNeg=function(){return this.s<0;};P.isPositive=P.isPos=function(){return this.s>0;};P.isZero=function(){return!!this.d&&this.d[0]===0;};P.lessThan=P.lt=function(y){return this.cmp(y)<0;};P.lessThanOrEqualTo=P.lte=function(y){return this.cmp(y)<1;};P.logarithm=P.log=function(base){var isBase10,d,denominator,k,inf,num,sd,r,arg=this,Ctor=arg.constructor,pr=Ctor.precision,rm=Ctor.rounding,guard=5;
if(base==null){base=new Ctor(10);isBase10=true;}else{base=new Ctor(base);d=base.d;
if(base.s<0||!d||!d[0]||base.eq(1))return new Ctor(NaN);isBase10=base.eq(10);}d=arg.d;
if(arg.s<0||!d||!d[0]||arg.eq(1)){return new Ctor(d&&!d[0]?-1/0:arg.s!=1?NaN:d?0:1/0);}
if(isBase10){if(d.length>1){inf=true;}else{for(k=d[0];k%10===0;)k/=10;inf=k!==1;}}external=false;sd=pr+guard;num=naturalLogarithm(arg,sd);denominator=isBase10?getLn10(Ctor,sd+10):naturalLogarithm(base,sd);
r=divide(num,denominator,sd,1);
if(checkRoundingDigits(r.d,k=pr,rm)){do{sd+=10;num=naturalLogarithm(arg,sd);denominator=isBase10?getLn10(Ctor,sd+10):naturalLogarithm(base,sd);r=divide(num,denominator,sd,1);if(!inf){
if(+digitsToString(r.d).slice(k+1,k+15)+1==1e14){r=finalise(r,pr+1,0);}break;}}while(checkRoundingDigits(r.d,k+=10,rm));}external=true;return finalise(r,pr,rm);};  P.minus=P.sub=function(y){var d,e,i,j,k,len,pr,rm,xd,xe,xLTy,yd,x=this,Ctor=x.constructor;y=new Ctor(y);
if(!x.d||!y.d){
if(!x.s||!y.s)y=new Ctor(NaN);
else if(x.d)y.s=-y.s;
else y=new Ctor(y.d||x.s!==y.s?x:NaN);return y;}
if(x.s!=y.s){y.s=-y.s;return x.plus(y);}xd=x.d;yd=y.d;pr=Ctor.precision;rm=Ctor.rounding;
if(!xd[0]||!yd[0]){
if(yd[0])y.s=-y.s;
else if(xd[0])y=new Ctor(x);
else return new Ctor(rm===3?-0:0);return external?finalise(y,pr,rm):y;}
e=mathfloor(y.e/LOG_BASE);xe=mathfloor(x.e/LOG_BASE);xd=xd.slice();k=xe-e;
if(k){xLTy=k<0;if(xLTy){d=xd;k=-k;len=yd.length;}else{d=yd;e=xe;len=xd.length;}
i=Math.max(Math.ceil(pr/LOG_BASE),len)+2;if(k>i){k=i;d.length=1;}
d.reverse();for(i=k;i--;)d.push(0);d.reverse();
}else{
i=xd.length;len=yd.length;xLTy=i<len;if(xLTy)len=i;for(i=0;i<len;i++){if(xd[i]!=yd[i]){xLTy=xd[i]<yd[i];break;}}k=0;}if(xLTy){d=xd;xd=yd;yd=d;y.s=-y.s;}len=xd.length;
for(i=yd.length-len;i>0;--i)xd[len++]=0;
for(i=yd.length;i>k;){if(xd[--i]<yd[i]){for(j=i;j&&xd[--j]===0;)xd[j]=BASE-1;--xd[j];xd[i]+=BASE;}xd[i]-=yd[i];}
for(;xd[--len]===0;)xd.pop();
for(;xd[0]===0;xd.shift())--e;
if(!xd[0])return new Ctor(rm===3?-0:0);y.d=xd;y.e=getBase10Exponent(xd,e);return external?finalise(y,pr,rm):y;};P.modulo=P.mod=function(y){var q,x=this,Ctor=x.constructor;y=new Ctor(y);
if(!x.d||!y.s||y.d&&!y.d[0])return new Ctor(NaN);
if(!y.d||x.d&&!x.d[0]){return finalise(new Ctor(x),Ctor.precision,Ctor.rounding);}
external=false;if(Ctor.modulo==9){
q=divide(x,y.abs(),0,3,1);q.s*=y.s;}else{q=divide(x,y,0,Ctor.modulo,1);}q=q.times(y);external=true;return x.minus(q);};P.naturalExponential=P.exp=function(){return naturalExponential(this);};P.naturalLogarithm=P.ln=function(){return naturalLogarithm(this);};P.negated=P.neg=function(){var x=new this.constructor(this);x.s=-x.s;return finalise(x);};P.plus=P.add=function(y){var carry,d,e,i,k,len,pr,rm,xd,yd,x=this,Ctor=x.constructor;y=new Ctor(y);
if(!x.d||!y.d){
if(!x.s||!y.s)y=new Ctor(NaN);
else if(!x.d)y=new Ctor(y.d||x.s===y.s?x:NaN);return y;}
if(x.s!=y.s){y.s=-y.s;return x.minus(y);}xd=x.d;yd=y.d;pr=Ctor.precision;rm=Ctor.rounding;
if(!xd[0]||!yd[0]){
if(!yd[0])y=new Ctor(x);return external?finalise(y,pr,rm):y;}
k=mathfloor(x.e/LOG_BASE);e=mathfloor(y.e/LOG_BASE);xd=xd.slice();i=k-e;
if(i){if(i<0){d=xd;i=-i;len=yd.length;}else{d=yd;e=k;len=xd.length;}
k=Math.ceil(pr/LOG_BASE);len=k>len?k+1:len+1;if(i>len){i=len;d.length=1;}
d.reverse();for(;i--;)d.push(0);d.reverse();}len=xd.length;i=yd.length;
if(len-i<0){i=len;d=yd;yd=xd;xd=d;}
for(carry=0;i;){carry=(xd[--i]=xd[i]+yd[i]+carry)/BASE|0;xd[i]%=BASE;}if(carry){xd.unshift(carry);++e;}
for(len=xd.length;xd[--len]==0;)xd.pop();y.d=xd;y.e=getBase10Exponent(xd,e);return external?finalise(y,pr,rm):y;};P.precision=P.sd=function(z){var k,x=this;if(z!==void 0&&z!==!!z&&z!==1&&z!==0)throw Error(invalidArgument+z);if(x.d){k=getPrecision(x.d);if(z&&x.e+1>k)k=x.e+1;}else{k=NaN;}return k;};P.round=function(){var x=this,Ctor=x.constructor;return finalise(new Ctor(x),x.e+1,Ctor.rounding);};P.sine=P.sin=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+Math.max(x.e,x.sd())+LOG_BASE;Ctor.rounding=1;x=sine(Ctor,toLessThanHalfPi(Ctor,x));Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant>2?x.neg():x,pr,rm,true);};P.squareRoot=P.sqrt=function(){var m,n,sd,r,rep,t,x=this,d=x.d,e=x.e,s=x.s,Ctor=x.constructor;
if(s!==1||!d||!d[0]){return new Ctor(!s||s<0&&(!d||d[0])?NaN:d?x:1/0);}external=false;
s=Math.sqrt(+x);
if(s==0||s==1/0){n=digitsToString(d);if((n.length+e)%2==0)n+='0';s=Math.sqrt(n);e=mathfloor((e+1)/2)-(e<0||e%2);if(s==1/0){n='5e'+e;}else{n=s.toExponential();n=n.slice(0,n.indexOf('e')+1)+e;}r=new Ctor(n);}else{r=new Ctor(s.toString());}sd=(e=Ctor.precision)+3;
for(;;){t=r;r=t.plus(divide(x,t,sd+2,1)).times(0.5);
if(digitsToString(t.d).slice(0,sd)===(n=digitsToString(r.d)).slice(0,sd)){n=n.slice(sd-3,sd+1);
if(n=='9999'||!rep&&n=='4999'){
if(!rep){finalise(t,e+1,0);if(t.times(t).eq(x)){r=t;break;}}sd+=4;rep=1;}else{
if(!+n||!+n.slice(1)&&n.charAt(0)=='5'){
finalise(r,e+1,1);m=!r.times(r).eq(x);}break;}}}external=true;return finalise(r,e,Ctor.rounding,m);};P.tangent=P.tan=function(){var pr,rm,x=this,Ctor=x.constructor;if(!x.isFinite())return new Ctor(NaN);if(x.isZero())return new Ctor(x);pr=Ctor.precision;rm=Ctor.rounding;Ctor.precision=pr+10;Ctor.rounding=1;x=x.sin();x.s=1;x=divide(x,new Ctor(1).minus(x.times(x)).sqrt(),pr+10,0);Ctor.precision=pr;Ctor.rounding=rm;return finalise(quadrant==2||quadrant==4?x.neg():x,pr,rm,true);};P.times=P.mul=function(y){var carry,e,i,k,r,rL,t,xdL,ydL,x=this,Ctor=x.constructor,xd=x.d,yd=(y=new Ctor(y)).d;y.s*=x.s;
if(!xd||!xd[0]||!yd||!yd[0]){return new Ctor(!y.s||xd&&!xd[0]&&!yd||yd&&!yd[0]&&!xd
?NaN
:!xd||!yd?y.s/0:y.s*0);}e=mathfloor(x.e/LOG_BASE)+mathfloor(y.e/LOG_BASE);xdL=xd.length;ydL=yd.length;
if(xdL<ydL){r=xd;xd=yd;yd=r;rL=xdL;xdL=ydL;ydL=rL;}
r=[];rL=xdL+ydL;for(i=rL;i--;)r.push(0);
for(i=ydL;--i>=0;){carry=0;for(k=xdL+i;k>i;){t=r[k]+yd[i]*xd[k-i-1]+carry;r[k--]=t%BASE|0;carry=t/BASE|0;}r[k]=(r[k]+carry)%BASE|0;}
for(;!r[--rL];)r.pop();if(carry)++e;else r.shift();y.d=r;y.e=getBase10Exponent(r,e);return external?finalise(y,Ctor.precision,Ctor.rounding):y;};P.toBinary=function(sd,rm){return toStringBinary(this,2,sd,rm);};P.toDecimalPlaces=P.toDP=function(dp,rm){var x=this,Ctor=x.constructor;x=new Ctor(x);if(dp===void 0)return x;checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);return finalise(x,dp+x.e+1,rm);};P.toExponential=function(dp,rm){var str,x=this,Ctor=x.constructor;if(dp===void 0){str=finiteToString(x,true);}else{checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);x=finalise(new Ctor(x),dp+1,rm);str=finiteToString(x,true,dp+1);}return x.isNeg()&&!x.isZero()?'-'+str:str;};P.toFixed=function(dp,rm){var str,y,x=this,Ctor=x.constructor;if(dp===void 0){str=finiteToString(x);}else{checkInt32(dp,0,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);y=finalise(new Ctor(x),dp+x.e+1,rm);str=finiteToString(y,false,dp+y.e+1);}
return x.isNeg()&&!x.isZero()?'-'+str:str;};P.toFraction=function(maxD){var d,d0,d1,d2,e,k,n,n0,n1,pr,q,r,x=this,xd=x.d,Ctor=x.constructor;if(!xd)return new Ctor(x);n1=d0=new Ctor(1);d1=n0=new Ctor(0);d=new Ctor(d1);e=d.e=getPrecision(xd)-x.e-1;k=e%LOG_BASE;d.d[0]=mathpow(10,k<0?LOG_BASE+k:k);if(maxD==null){
maxD=e>0?d:n1;}else{n=new Ctor(maxD);if(!n.isInt()||n.lt(n1))throw Error(invalidArgument+n);maxD=n.gt(d)?e>0?d:n1:n;}external=false;n=new Ctor(digitsToString(xd));pr=Ctor.precision;Ctor.precision=e=xd.length*LOG_BASE*2;for(;;){q=divide(n,d,0,1,1);d2=d0.plus(q.times(d1));if(d2.cmp(maxD)==1)break;d0=d1;d1=d2;d2=n1;n1=n0.plus(q.times(d2));n0=d2;d2=d;d=n.minus(q.times(d2));n=d2;}d2=divide(maxD.minus(d0),d1,0,1,1);n0=n0.plus(d2.times(n1));d0=d0.plus(d2.times(d1));n0.s=n1.s=x.s;
r=divide(n1,d1,e,1).minus(x).abs().cmp(divide(n0,d0,e,1).minus(x).abs())<1?[n1,d1]:[n0,d0];Ctor.precision=pr;external=true;return r;};P.toHexadecimal=P.toHex=function(sd,rm){return toStringBinary(this,16,sd,rm);};P.toNearest=function(y,rm){var x=this,Ctor=x.constructor;x=new Ctor(x);if(y==null){
if(!x.d)return x;y=new Ctor(1);rm=Ctor.rounding;}else{y=new Ctor(y);if(rm===void 0){rm=Ctor.rounding;}else{checkInt32(rm,0,8);}
if(!x.d)return y.s?x:y;
if(!y.d){if(y.s)y.s=x.s;return y;}}
if(y.d[0]){external=false;x=divide(x,y,0,rm,1).times(y);external=true;finalise(x);
}else{y.s=x.s;x=y;}return x;};P.toNumber=function(){return+this;};P.toOctal=function(sd,rm){return toStringBinary(this,8,sd,rm);};P.toPower=P.pow=function(y){var e,k,pr,r,rm,s,x=this,Ctor=x.constructor,yn=+(y=new Ctor(y));
if(!x.d||!y.d||!x.d[0]||!y.d[0])return new Ctor(mathpow(+x,yn));x=new Ctor(x);if(x.eq(1))return x;pr=Ctor.precision;rm=Ctor.rounding;if(y.eq(1))return finalise(x,pr,rm);
e=mathfloor(y.e/LOG_BASE);
if(e>=y.d.length-1&&(k=yn<0?-yn:yn)<=MAX_SAFE_INTEGER){r=intPow(Ctor,x,k,pr);return y.s<0?new Ctor(1).div(r):finalise(r,pr,rm);}s=x.s;
if(s<0){
if(e<y.d.length-1)return new Ctor(NaN);
if((y.d[e]&1)==0)s=1;
if(x.e==0&&x.d[0]==1&&x.d.length==1){x.s=s;return x;}}
k=mathpow(+x,yn);e=k==0||!isFinite(k)?mathfloor(yn*(Math.log('0.'+digitsToString(x.d))/Math.LN10+x.e+1)):new Ctor(k+'').e;
if(e>Ctor.maxE+1||e<Ctor.minE-1)return new Ctor(e>0?s/0:0);external=false;Ctor.rounding=x.s=1;
k=Math.min(12,(e+'').length);
r=naturalExponential(y.times(naturalLogarithm(x,pr+k)),pr);
if(r.d){
r=finalise(r,pr+5,1);
if(checkRoundingDigits(r.d,pr,rm)){e=pr+10;
r=finalise(naturalExponential(y.times(naturalLogarithm(x,e+k)),e),e+5,1);
if(+digitsToString(r.d).slice(pr+1,pr+15)+1==1e14){r=finalise(r,pr+1,0);}}}r.s=s;external=true;Ctor.rounding=rm;return finalise(r,pr,rm);};P.toPrecision=function(sd,rm){var str,x=this,Ctor=x.constructor;if(sd===void 0){str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);}else{checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);x=finalise(new Ctor(x),sd,rm);str=finiteToString(x,sd<=x.e||x.e<=Ctor.toExpNeg,sd);}return x.isNeg()&&!x.isZero()?'-'+str:str;};P.toSignificantDigits=P.toSD=function(sd,rm){var x=this,Ctor=x.constructor;if(sd===void 0){sd=Ctor.precision;rm=Ctor.rounding;}else{checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);}return finalise(new Ctor(x),sd,rm);};P.toString=function(){var x=this,Ctor=x.constructor,str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);return x.isNeg()&&!x.isZero()?'-'+str:str;};P.truncated=P.trunc=function(){return finalise(new this.constructor(this),this.e+1,1);};P.valueOf=P.toJSON=function(){var x=this,Ctor=x.constructor,str=finiteToString(x,x.e<=Ctor.toExpNeg||x.e>=Ctor.toExpPos);return x.isNeg()?'-'+str:str;};
function digitsToString(d){var i,k,ws,indexOfLastWord=d.length-1,str='',w=d[0];if(indexOfLastWord>0){str+=w;for(i=1;i<indexOfLastWord;i++){ws=d[i]+'';k=LOG_BASE-ws.length;if(k)str+=getZeroString(k);str+=ws;}w=d[i];ws=w+'';k=LOG_BASE-ws.length;if(k)str+=getZeroString(k);}else if(w===0){return'0';}
for(;w%10===0;)w/=10;return str+w;}function checkInt32(i,min,max){if(i!==~~i||i<min||i>max){throw Error(invalidArgument+i);}}function checkRoundingDigits(d,i,rm,repeating){var di,k,r,rd;
for(k=d[0];k>=10;k/=10)--i;
if(--i<0){i+=LOG_BASE;di=0;}else{di=Math.ceil((i+1)/LOG_BASE);i%=LOG_BASE;}
k=mathpow(10,LOG_BASE-i);rd=d[di]%k|0;if(repeating==null){if(i<3){if(i==0)rd=rd/100|0;else if(i==1)rd=rd/10|0;r=rm<4&&rd==99999||rm>3&&rd==49999||rd==50000||rd==0;}else{r=(rm<4&&rd+1==k||rm>3&&rd+1==k/2)&&(d[di+1]/k/100|0)==mathpow(10,i-2)-1||(rd==k/2||rd==0)&&(d[di+1]/k/100|0)==0;}}else{if(i<4){if(i==0)rd=rd/1000|0;else if(i==1)rd=rd/100|0;else if(i==2)rd=rd/10|0;r=(repeating||rm<4)&&rd==9999||!repeating&&rm>3&&rd==4999;}else{r=((repeating||rm<4)&&rd+1==k||!repeating&&rm>3&&rd+1==k/2)&&(d[di+1]/k/1000|0)==mathpow(10,i-3)-1;}}return r;}
function convertBase(str,baseIn,baseOut){var j,arr=[0],arrL,i=0,strL=str.length;for(;i<strL;){for(arrL=arr.length;arrL--;)arr[arrL]*=baseIn;arr[0]+=NUMERALS.indexOf(str.charAt(i++));for(j=0;j<arr.length;j++){if(arr[j]>baseOut-1){if(arr[j+1]===void 0)arr[j+1]=0;arr[j+1]+=arr[j]/baseOut|0;arr[j]%=baseOut;}}}return arr.reverse();}function cosine(Ctor,x){var k,len,y;if(x.isZero())return x;
len=x.d.length;if(len<32){k=Math.ceil(len/3);y=(1/tinyPow(4,k)).toString();}else{k=16;y='2.3283064365386962890625e-10';}Ctor.precision+=k;x=taylorSeries(Ctor,1,x.times(y),new Ctor(1));
for(var i=k;i--;){var cos2x=x.times(x);x=cos2x.times(cos2x).minus(cos2x).times(8).plus(1);}Ctor.precision-=k;return x;}var divide=function(){
function multiplyInteger(x,k,base){var temp,carry=0,i=x.length;for(x=x.slice();i--;){temp=x[i]*k+carry;x[i]=temp%base|0;carry=temp/base|0;}if(carry)x.unshift(carry);return x;}function compare(a,b,aL,bL){var i,r;if(aL!=bL){r=aL>bL?1:-1;}else{for(i=r=0;i<aL;i++){if(a[i]!=b[i]){r=a[i]>b[i]?1:-1;break;}}}return r;}function subtract(a,b,aL,base){var i=0;
for(;aL--;){a[aL]-=i;i=a[aL]<b[aL]?1:0;a[aL]=i*base+a[aL]-b[aL];}
for(;!a[0]&&a.length>1;)a.shift();}return function(x,y,pr,rm,dp,base){var cmp,e,i,k,logBase,more,prod,prodL,q,qd,rem,remL,rem0,sd,t,xi,xL,yd0,yL,yz,Ctor=x.constructor,sign=x.s==y.s?1:-1,xd=x.d,yd=y.d;
if(!xd||!xd[0]||!yd||!yd[0]){return new Ctor(
!x.s||!y.s||(xd?yd&&xd[0]==yd[0]:!yd)?NaN:
xd&&xd[0]==0||!yd?sign*0:sign/0);}if(base){logBase=1;e=x.e-y.e;}else{base=BASE;logBase=LOG_BASE;e=mathfloor(x.e/logBase)-mathfloor(y.e/logBase);}yL=yd.length;xL=xd.length;q=new Ctor(sign);qd=q.d=[];
for(i=0;yd[i]==(xd[i]||0);i++);if(yd[i]>(xd[i]||0))e--;if(pr==null){sd=pr=Ctor.precision;rm=Ctor.rounding;}else if(dp){sd=pr+(x.e-y.e)+1;}else{sd=pr;}if(sd<0){qd.push(1);more=true;}else{
sd=sd/logBase+2|0;i=0;
if(yL==1){k=0;yd=yd[0];sd++;
for(;(i<xL||k)&&sd--;i++){t=k*base+(xd[i]||0);qd[i]=t/yd|0;k=t%yd|0;}more=k||i<xL;
}else{
k=base/(yd[0]+1)|0;if(k>1){yd=multiplyInteger(yd,k,base);xd=multiplyInteger(xd,k,base);yL=yd.length;xL=xd.length;}xi=yL;rem=xd.slice(0,yL);remL=rem.length;
for(;remL<yL;)rem[remL++]=0;yz=yd.slice();yz.unshift(0);yd0=yd[0];if(yd[1]>=base/2)++yd0;do{k=0;
cmp=compare(yd,rem,yL,remL);
if(cmp<0){
rem0=rem[0];if(yL!=remL)rem0=rem0*base+(rem[1]||0);
k=rem0/yd0|0;
if(k>1){if(k>=base)k=base-1;
prod=multiplyInteger(yd,k,base);prodL=prod.length;remL=rem.length;
cmp=compare(prod,rem,prodL,remL);
if(cmp==1){k--;
subtract(prod,yL<prodL?yz:yd,prodL,base);}}else{
if(k==0)cmp=k=1;prod=yd.slice();}prodL=prod.length;if(prodL<remL)prod.unshift(0);
subtract(rem,prod,remL,base);
if(cmp==-1){remL=rem.length;
cmp=compare(yd,rem,yL,remL);
if(cmp<1){k++;
subtract(rem,yL<remL?yz:yd,remL,base);}}remL=rem.length;}else if(cmp===0){k++;rem=[0];}
qd[i++]=k;
if(cmp&&rem[0]){rem[remL++]=xd[xi]||0;}else{rem=[xd[xi]];remL=1;}}while((xi++<xL||rem[0]!==void 0)&&sd--);more=rem[0]!==void 0;}
if(!qd[0])qd.shift();}
if(logBase==1){q.e=e;inexact=more;}else{
for(i=1,k=qd[0];k>=10;k/=10)i++;q.e=i+e*logBase-1;finalise(q,dp?pr+q.e+1:pr,rm,more);}return q;};}();function finalise(x,sd,rm,isTruncated){var digits,i,j,k,rd,roundUp,w,xd,xdi,Ctor=x.constructor;
out:if(sd!=null){xd=x.d;
if(!xd)return x;
for(digits=1,k=xd[0];k>=10;k/=10)digits++;i=sd-digits;
if(i<0){i+=LOG_BASE;j=sd;w=xd[xdi=0];
rd=w/mathpow(10,digits-j-1)%10|0;}else{xdi=Math.ceil((i+1)/LOG_BASE);k=xd.length;if(xdi>=k){if(isTruncated){
for(;k++<=xdi;)xd.push(0);w=rd=0;digits=1;i%=LOG_BASE;j=i-LOG_BASE+1;}else{break out;}}else{w=k=xd[xdi];
for(digits=1;k>=10;k/=10)digits++;
i%=LOG_BASE;
j=i-LOG_BASE+digits;
rd=j<0?0:w/mathpow(10,digits-j-1)%10|0;}}
isTruncated=isTruncated||sd<0||xd[xdi+1]!==void 0||(j<0?w:w%mathpow(10,digits-j-1));
roundUp=rm<4?(rd||isTruncated)&&(rm==0||rm==(x.s<0?3:2)):rd>5||rd==5&&(rm==4||isTruncated||rm==6&&
(i>0?j>0?w/mathpow(10,digits-j):0:xd[xdi-1])%10&1||rm==(x.s<0?8:7));if(sd<1||!xd[0]){xd.length=0;if(roundUp){
sd-=x.e+1;
xd[0]=mathpow(10,(LOG_BASE-sd%LOG_BASE)%LOG_BASE);x.e=-sd||0;}else{
xd[0]=x.e=0;}return x;}
if(i==0){xd.length=xdi;k=1;xdi--;}else{xd.length=xdi+1;k=mathpow(10,LOG_BASE-i);
xd[xdi]=j>0?(w/mathpow(10,digits-j)%mathpow(10,j)|0)*k:0;}if(roundUp){for(;;){
if(xdi==0){
for(i=1,j=xd[0];j>=10;j/=10)i++;j=xd[0]+=k;for(k=1;j>=10;j/=10)k++;
if(i!=k){x.e++;if(xd[0]==BASE)xd[0]=1;}break;}else{xd[xdi]+=k;if(xd[xdi]!=BASE)break;xd[xdi--]=0;k=1;}}}
for(i=xd.length;xd[--i]===0;)xd.pop();}if(external){
if(x.e>Ctor.maxE){
x.d=null;x.e=NaN;
}else if(x.e<Ctor.minE){
x.e=0;x.d=[0];
}
}return x;}function finiteToString(x,isExp,sd){if(!x.isFinite())return nonFiniteToString(x);var k,e=x.e,str=digitsToString(x.d),len=str.length;if(isExp){if(sd&&(k=sd-len)>0){str=str.charAt(0)+'.'+str.slice(1)+getZeroString(k);}else if(len>1){str=str.charAt(0)+'.'+str.slice(1);}str=str+(x.e<0?'e':'e+')+x.e;}else if(e<0){str='0.'+getZeroString(-e-1)+str;if(sd&&(k=sd-len)>0)str+=getZeroString(k);}else if(e>=len){str+=getZeroString(e+1-len);if(sd&&(k=sd-e-1)>0)str=str+'.'+getZeroString(k);}else{if((k=e+1)<len)str=str.slice(0,k)+'.'+str.slice(k);if(sd&&(k=sd-len)>0){if(e+1===len)str+='.';str+=getZeroString(k);}}return str;}
function getBase10Exponent(digits,e){var w=digits[0];
for(e*=LOG_BASE;w>=10;w/=10)e++;return e;}function getLn10(Ctor,sd,pr){if(sd>LN10_PRECISION){
external=true;if(pr)Ctor.precision=pr;throw Error(precisionLimitExceeded);}return finalise(new Ctor(LN10),sd,1,true);}function getPi(Ctor,sd,rm){if(sd>PI_PRECISION)throw Error(precisionLimitExceeded);return finalise(new Ctor(PI),sd,rm,true);}function getPrecision(digits){var w=digits.length-1,len=w*LOG_BASE+1;w=digits[w];
if(w){
for(;w%10==0;w/=10)len--;
for(w=digits[0];w>=10;w/=10)len++;}return len;}function getZeroString(k){var zs='';for(;k--;)zs+='0';return zs;}function intPow(Ctor,x,n,pr){var isTruncated,r=new Ctor(1),
k=Math.ceil(pr/LOG_BASE+4);external=false;for(;;){if(n%2){r=r.times(x);if(truncate(r.d,k))isTruncated=true;}n=mathfloor(n/2);if(n===0){
n=r.d.length-1;if(isTruncated&&r.d[n]===0)++r.d[n];break;}x=x.times(x);truncate(x.d,k);}external=true;return r;}function isOdd(n){return n.d[n.d.length-1]&1;}function maxOrMin(Ctor,args,ltgt){var y,x=new Ctor(args[0]),i=0;for(;++i<args.length;){y=new Ctor(args[i]);if(!y.s){x=y;break;}else if(x[ltgt](y)){x=y;}}return x;}function naturalExponential(x,sd){var denominator,guard,j,pow,sum,t,wpr,rep=0,i=0,k=0,Ctor=x.constructor,rm=Ctor.rounding,pr=Ctor.precision;
if(!x.d||!x.d[0]||x.e>17){return new Ctor(x.d?!x.d[0]?1:x.s<0?0:1/0:x.s?x.s<0?0:x:0/0);}if(sd==null){external=false;wpr=pr;}else{wpr=sd;}t=new Ctor(0.03125);
while(x.e>-2){
x=x.times(t);k+=5;}
guard=Math.log(mathpow(2,k))/Math.LN10*2+5|0;wpr+=guard;denominator=pow=sum=new Ctor(1);Ctor.precision=wpr;for(;;){pow=finalise(pow.times(x),wpr,1);denominator=denominator.times(++i);t=sum.plus(divide(pow,denominator,wpr,1));if(digitsToString(t.d).slice(0,wpr)===digitsToString(sum.d).slice(0,wpr)){j=k;while(j--)sum=finalise(sum.times(sum),wpr,1);
if(sd==null){if(rep<3&&checkRoundingDigits(sum.d,wpr-guard,rm,rep)){Ctor.precision=wpr+=10;denominator=pow=t=new Ctor(1);i=0;rep++;}else{return finalise(sum,Ctor.precision=pr,rm,external=true);}}else{Ctor.precision=pr;return sum;}}sum=t;}}function naturalLogarithm(y,sd){var c,c0,denominator,e,numerator,rep,sum,t,wpr,x1,x2,n=1,guard=10,x=y,xd=x.d,Ctor=x.constructor,rm=Ctor.rounding,pr=Ctor.precision;
if(x.s<0||!xd||!xd[0]||!x.e&&xd[0]==1&&xd.length==1){return new Ctor(xd&&!xd[0]?-1/0:x.s!=1?NaN:xd?0:x);}if(sd==null){external=false;wpr=pr;}else{wpr=sd;}Ctor.precision=wpr+=guard;c=digitsToString(xd);c0=c.charAt(0);if(Math.abs(e=x.e)<1.5e15){
while(c0<7&&c0!=1||c0==1&&c.charAt(1)>3){x=x.times(y);c=digitsToString(x.d);c0=c.charAt(0);n++;}e=x.e;if(c0>1){x=new Ctor('0.'+c);e++;}else{x=new Ctor(c0+'.'+c.slice(1));}}else{
t=getLn10(Ctor,wpr+2,pr).times(e+'');x=naturalLogarithm(new Ctor(c0+'.'+c.slice(1)),wpr-guard).plus(t);Ctor.precision=pr;return sd==null?finalise(x,pr,rm,external=true):x;}
x1=x;
sum=numerator=x=divide(x.minus(1),x.plus(1),wpr,1);x2=finalise(x.times(x),wpr,1);denominator=3;for(;;){numerator=finalise(numerator.times(x2),wpr,1);t=sum.plus(divide(numerator,new Ctor(denominator),wpr,1));if(digitsToString(t.d).slice(0,wpr)===digitsToString(sum.d).slice(0,wpr)){sum=sum.times(2);
if(e!==0)sum=sum.plus(getLn10(Ctor,wpr+2,pr).times(e+''));sum=divide(sum,new Ctor(n),wpr,1);
if(sd==null){if(checkRoundingDigits(sum.d,wpr-guard,rm,rep)){Ctor.precision=wpr+=guard;t=numerator=x=divide(x1.minus(1),x1.plus(1),wpr,1);x2=finalise(x.times(x),wpr,1);denominator=rep=1;}else{return finalise(sum,Ctor.precision=pr,rm,external=true);}}else{Ctor.precision=pr;return sum;}}sum=t;denominator+=2;}}
function nonFiniteToString(x){
return String(x.s*x.s/0);}function parseDecimal(x,str){var e,i,len;
if((e=str.indexOf('.'))>-1)str=str.replace('.','');
if((i=str.search(/e/i))>0){
if(e<0)e=i;e+=+str.slice(i+1);str=str.substring(0,i);}else if(e<0){
e=str.length;}
for(i=0;str.charCodeAt(i)===48;i++);
for(len=str.length;str.charCodeAt(len-1)===48;--len);str=str.slice(i,len);if(str){len-=i;x.e=e=e-i-1;x.d=[];
i=(e+1)%LOG_BASE;if(e<0)i+=LOG_BASE;if(i<len){if(i)x.d.push(+str.slice(0,i));for(len-=LOG_BASE;i<len;)x.d.push(+str.slice(i,i+=LOG_BASE));str=str.slice(i);i=LOG_BASE-str.length;}else{i-=len;}for(;i--;)str+='0';x.d.push(+str);if(external){
if(x.e>x.constructor.maxE){
x.d=null;x.e=NaN;
}else if(x.e<x.constructor.minE){
x.e=0;x.d=[0];
}
}}else{
x.e=0;x.d=[0];}return x;}function parseOther(x,str){var base,Ctor,divisor,i,isFloat,len,p,xd,xe;if(str.indexOf('_')>-1){str=str.replace(/(\d)_(?=\d)/g,'$1');if(isDecimal.test(str))return parseDecimal(x,str);}else if(str==='Infinity'||str==='NaN'){if(!+str)x.s=NaN;x.e=NaN;x.d=null;return x;}if(isHex.test(str)){base=16;str=str.toLowerCase();}else if(isBinary.test(str)){base=2;}else if(isOctal.test(str)){base=8;}else{throw Error(invalidArgument+str);}
i=str.search(/p/i);if(i>0){p=+str.slice(i+1);str=str.substring(2,i);}else{str=str.slice(2);}
i=str.indexOf('.');isFloat=i>=0;Ctor=x.constructor;if(isFloat){str=str.replace('.','');len=str.length;i=len-i;
divisor=intPow(Ctor,new Ctor(base),i,i*2);}xd=convertBase(str,base,BASE);xe=xd.length-1;
for(i=xe;xd[i]===0;--i)xd.pop();if(i<0)return new Ctor(x.s*0);x.e=getBase10Exponent(xd,xe);x.d=xd;external=false;
if(isFloat)x=divide(x,divisor,len*4);
if(p)x=x.times(Math.abs(p)<54?mathpow(2,p):Decimal.pow(2,p));external=true;return x;}function sine(Ctor,x){var k,len=x.d.length;if(len<3){return x.isZero()?x:taylorSeries(Ctor,2,x,x);}
k=1.4*Math.sqrt(len);k=k>16?16:k|0;x=x.times(1/tinyPow(5,k));x=taylorSeries(Ctor,2,x,x);
var sin2_x,d5=new Ctor(5),d16=new Ctor(16),d20=new Ctor(20);for(;k--;){sin2_x=x.times(x);x=x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));}return x;}
function taylorSeries(Ctor,n,x,y,isHyperbolic){var j,t,u,x2,i=1,pr=Ctor.precision,k=Math.ceil(pr/LOG_BASE);external=false;x2=x.times(x);u=new Ctor(y);for(;;){t=divide(u.times(x2),new Ctor(n++*n++),pr,1);u=isHyperbolic?y.plus(t):y.minus(t);y=divide(t.times(x2),new Ctor(n++*n++),pr,1);t=u.plus(y);if(t.d[k]!==void 0){for(j=k;t.d[j]===u.d[j]&&j--;);if(j==-1)break;}j=u;u=y;y=t;t=j;i++;}external=true;t.d.length=k+1;return t;}
function tinyPow(b,e){var n=b;while(--e)n*=b;return n;}
function toLessThanHalfPi(Ctor,x){var t,isNeg=x.s<0,pi=getPi(Ctor,Ctor.precision,1),halfPi=pi.times(0.5);x=x.abs();if(x.lte(halfPi)){quadrant=isNeg?4:1;return x;}t=x.divToInt(pi);if(t.isZero()){quadrant=isNeg?3:2;}else{x=x.minus(t.times(pi));
if(x.lte(halfPi)){quadrant=isOdd(t)?isNeg?2:3:isNeg?4:1;return x;}quadrant=isOdd(t)?isNeg?1:4:isNeg?3:2;}return x.minus(pi).abs();}function toStringBinary(x,baseOut,sd,rm){var base,e,i,k,len,roundUp,str,xd,y,Ctor=x.constructor,isExp=sd!==void 0;if(isExp){checkInt32(sd,1,MAX_DIGITS);if(rm===void 0)rm=Ctor.rounding;else checkInt32(rm,0,8);}else{sd=Ctor.precision;rm=Ctor.rounding;}if(!x.isFinite()){str=nonFiniteToString(x);}else{str=finiteToString(x);i=str.indexOf('.');
if(isExp){base=2;if(baseOut==16){sd=sd*4-3;}else if(baseOut==8){sd=sd*3-2;}}else{base=baseOut;}
if(i>=0){str=str.replace('.','');y=new Ctor(1);y.e=str.length-i;y.d=convertBase(finiteToString(y),10,base);y.e=y.d.length;}xd=convertBase(str,10,base);e=len=xd.length;
for(;xd[--len]==0;)xd.pop();if(!xd[0]){str=isExp?'0p+0':'0';}else{if(i<0){e--;}else{x=new Ctor(x);x.d=xd;x.e=e;x=divide(x,y,sd,rm,0,base);xd=x.d;e=x.e;roundUp=inexact;}
i=xd[sd];k=base/2;roundUp=roundUp||xd[sd+1]!==void 0;roundUp=rm<4?(i!==void 0||roundUp)&&(rm===0||rm===(x.s<0?3:2)):i>k||i===k&&(rm===4||roundUp||rm===6&&xd[sd-1]&1||rm===(x.s<0?8:7));xd.length=sd;if(roundUp){
for(;++xd[--sd]>base-1;){xd[sd]=0;if(!sd){++e;xd.unshift(1);}}}
for(len=xd.length;!xd[len-1];--len);
for(i=0,str='';i<len;i++)str+=NUMERALS.charAt(xd[i]);
if(isExp){if(len>1){if(baseOut==16||baseOut==8){i=baseOut==16?4:3;for(--len;len%i;len++)str+='0';xd=convertBase(str,base,baseOut);for(len=xd.length;!xd[len-1];--len);
for(i=1,str='1.';i<len;i++)str+=NUMERALS.charAt(xd[i]);}else{str=str.charAt(0)+'.'+str.slice(1);}}str=str+(e<0?'p':'p+')+e;}else if(e<0){for(;++e;)str='0'+str;str='0.'+str;}else{if(++e>len)for(e-=len;e--;)str+='0';else if(e<len)str=str.slice(0,e)+'.'+str.slice(e);}}str=(baseOut==16?'0x':baseOut==2?'0b':baseOut==8?'0o':'')+str;}return x.s<0?'-'+str:str;}
function truncate(arr,len){if(arr.length>len){arr.length=len;return true;}}
function abs(x){return new this(x).abs();}function acos(x){return new this(x).acos();}function acosh(x){return new this(x).acosh();}function add(x,y){return new this(x).plus(y);}function asin(x){return new this(x).asin();}function asinh(x){return new this(x).asinh();}function atan(x){return new this(x).atan();}function atanh(x){return new this(x).atanh();}function atan2(y,x){y=new this(y);x=new this(x);var r,pr=this.precision,rm=this.rounding,wpr=pr+4;
if(!y.s||!x.s){r=new this(NaN);
}else if(!y.d&&!x.d){r=getPi(this,wpr,1).times(x.s>0?0.25:0.75);r.s=y.s;
}else if(!x.d||y.isZero()){r=x.s<0?getPi(this,pr,rm):new this(0);r.s=y.s;
}else if(!y.d||x.isZero()){r=getPi(this,wpr,1).times(0.5);r.s=y.s;
}else if(x.s<0){this.precision=wpr;this.rounding=1;r=this.atan(divide(y,x,wpr,1));x=getPi(this,wpr,1);this.precision=pr;this.rounding=rm;r=y.s<0?r.minus(x):r.plus(x);}else{r=this.atan(divide(y,x,wpr,1));}return r;}function cbrt(x){return new this(x).cbrt();}function ceil(x){return finalise(x=new this(x),x.e+1,2);}function clamp(x,min,max){return new this(x).clamp(min,max);}function config(obj){if(!obj||typeof obj!=='object')throw Error(decimalError+'Object expected');var i,p,v,useDefaults=obj.defaults===true,ps=['precision',1,MAX_DIGITS,'rounding',0,8,'toExpNeg',-EXP_LIMIT,0,'toExpPos',0,EXP_LIMIT,'maxE',0,EXP_LIMIT,'minE',-EXP_LIMIT,0,'modulo',0,9];for(i=0;i<ps.length;i+=3){if(p=ps[i],useDefaults)this[p]=DEFAULTS[p];if((v=obj[p])!==void 0){if(mathfloor(v)===v&&v>=ps[i+1]&&v<=ps[i+2])this[p]=v;else throw Error(invalidArgument+p+': '+v);}}if(p='crypto',useDefaults)this[p]=DEFAULTS[p];if((v=obj[p])!==void 0){if(v===true||v===false||v===0||v===1){if(v){if(typeof crypto!='undefined'&&crypto&&(crypto.getRandomValues||crypto.randomBytes)){this[p]=true;}else{throw Error(cryptoUnavailable);}}else{this[p]=false;}}else{throw Error(invalidArgument+p+': '+v);}}return this;}function cos(x){return new this(x).cos();}function cosh(x){return new this(x).cosh();}function clone(obj){var i,p,ps;function Decimal(v){var e,i,t,x=this;
if(!(x instanceof Decimal))return new Decimal(v);
x.constructor=Decimal;
if(isDecimalInstance(v)){x.s=v.s;if(external){if(!v.d||v.e>Decimal.maxE){
x.e=NaN;x.d=null;}else if(v.e<Decimal.minE){
x.e=0;x.d=[0];}else{x.e=v.e;x.d=v.d.slice();}}else{x.e=v.e;x.d=v.d?v.d.slice():v.d;}return;}t=typeof v;if(t==='number'){if(v===0){x.s=1/v<0?-1:1;x.e=0;x.d=[0];return;}if(v<0){v=-v;x.s=-1;}else{x.s=1;}
if(v===~~v&&v<1e7){for(e=0,i=v;i>=10;i/=10)e++;if(external){if(e>Decimal.maxE){x.e=NaN;x.d=null;}else if(e<Decimal.minE){x.e=0;x.d=[0];}else{x.e=e;x.d=[v];}}else{x.e=e;x.d=[v];}return;
}else if(v*0!==0){if(!v)x.s=NaN;x.e=NaN;x.d=null;return;}return parseDecimal(x,v.toString());}else if(t!=='string'){throw Error(invalidArgument+v);}
if((i=v.charCodeAt(0))===45){v=v.slice(1);x.s=-1;}else{
if(i===43)v=v.slice(1);x.s=1;}return isDecimal.test(v)?parseDecimal(x,v):parseOther(x,v);}Decimal.prototype=P;Decimal.ROUND_UP=0;Decimal.ROUND_DOWN=1;Decimal.ROUND_CEIL=2;Decimal.ROUND_FLOOR=3;Decimal.ROUND_HALF_UP=4;Decimal.ROUND_HALF_DOWN=5;Decimal.ROUND_HALF_EVEN=6;Decimal.ROUND_HALF_CEIL=7;Decimal.ROUND_HALF_FLOOR=8;Decimal.EUCLID=9;Decimal.config=Decimal.set=config;Decimal.clone=clone;Decimal.isDecimal=isDecimalInstance;Decimal.abs=abs;Decimal.acos=acos;Decimal.acosh=acosh;
Decimal.add=add;Decimal.asin=asin;Decimal.asinh=asinh;
Decimal.atan=atan;Decimal.atanh=atanh;
Decimal.atan2=atan2;Decimal.cbrt=cbrt;
Decimal.ceil=ceil;Decimal.clamp=clamp;Decimal.cos=cos;Decimal.cosh=cosh;
Decimal.div=div;Decimal.exp=exp;Decimal.floor=floor;Decimal.hypot=hypot;
Decimal.ln=ln;Decimal.log=log;Decimal.log10=log10;
Decimal.log2=log2;
Decimal.max=max;Decimal.min=min;Decimal.mod=mod;Decimal.mul=mul;Decimal.pow=pow;Decimal.random=random;Decimal.round=round;Decimal.sign=sign;
Decimal.sin=sin;Decimal.sinh=sinh;
Decimal.sqrt=sqrt;Decimal.sub=sub;Decimal.sum=sum;Decimal.tan=tan;Decimal.tanh=tanh;
Decimal.trunc=trunc;
if(obj===void 0)obj={};if(obj){if(obj.defaults!==true){ps=['precision','rounding','toExpNeg','toExpPos','maxE','minE','modulo','crypto'];for(i=0;i<ps.length;)if(!obj.hasOwnProperty(p=ps[i++]))obj[p]=this[p];}}Decimal.config(obj);return Decimal;}function div(x,y){return new this(x).div(y);}function exp(x){return new this(x).exp();}function floor(x){return finalise(x=new this(x),x.e+1,3);}function hypot(){var i,n,t=new this(0);external=false;for(i=0;i<arguments.length;){n=new this(arguments[i++]);if(!n.d){if(n.s){external=true;return new this(1/0);}t=n;}else if(t.d){t=t.plus(n.times(n));}}external=true;return t.sqrt();}function isDecimalInstance(obj){return obj instanceof Decimal||obj&&obj.toStringTag===tag||false;}function ln(x){return new this(x).ln();}function log(x,y){return new this(x).log(y);}function log2(x){return new this(x).log(2);}function log10(x){return new this(x).log(10);}function max(){return maxOrMin(this,arguments,'lt');}function min(){return maxOrMin(this,arguments,'gt');}function mod(x,y){return new this(x).mod(y);}function mul(x,y){return new this(x).mul(y);}function pow(x,y){return new this(x).pow(y);}function random(sd){var d,e,k,n,i=0,r=new this(1),rd=[];if(sd===void 0)sd=this.precision;else checkInt32(sd,1,MAX_DIGITS);k=Math.ceil(sd/LOG_BASE);if(!this.crypto){for(;i<k;)rd[i++]=Math.random()*1e7|0;
}else if(crypto.getRandomValues){d=crypto.getRandomValues(new Uint32Array(k));for(;i<k;){n=d[i];
if(n>=4.29e9){d[i]=crypto.getRandomValues(new Uint32Array(1))[0];}else{
rd[i++]=n%1e7;}}
}else if(crypto.randomBytes){
d=crypto.randomBytes(k*=4);for(;i<k;){
n=d[i]+(d[i+1]<<8)+(d[i+2]<<16)+((d[i+3]&0x7f)<<24);
if(n>=2.14e9){crypto.randomBytes(4).copy(d,i);}else{
rd.push(n%1e7);i+=4;}}i=k/4;}else{throw Error(cryptoUnavailable);}k=rd[--i];sd%=LOG_BASE;
if(k&&sd){n=mathpow(10,LOG_BASE-sd);rd[i]=(k/n|0)*n;}
for(;rd[i]===0;i--)rd.pop();
if(i<0){e=0;rd=[0];}else{e=-1;
for(;rd[0]===0;e-=LOG_BASE)rd.shift();
for(k=1,n=rd[0];n>=10;n/=10)k++;
if(k<LOG_BASE)e-=LOG_BASE-k;}r.e=e;r.d=rd;return r;}function round(x){return finalise(x=new this(x),x.e+1,this.rounding);}function sign(x){x=new this(x);return x.d?x.d[0]?x.s:0*x.s:x.s||NaN;}function sin(x){return new this(x).sin();}function sinh(x){return new this(x).sinh();}function sqrt(x){return new this(x).sqrt();}function sub(x,y){return new this(x).sub(y);}function sum(){var i=0,args=arguments,x=new this(args[i]);external=false;for(;x.s&&++i<args.length;)x=x.plus(args[i]);external=true;return finalise(x,this.precision,this.rounding);}function tan(x){return new this(x).tan();}function tanh(x){return new this(x).tanh();}function trunc(x){return finalise(x=new this(x),x.e+1,1);}
Decimal=clone(DEFAULTS);Decimal.prototype.constructor=Decimal;Decimal['default']=Decimal.Decimal=Decimal;
LN10=new Decimal(LN10);PI=new Decimal(PI);
if(typeof define=='function'&&define.amd){define(function(){return Decimal;});
}else if(typeof module!='undefined'&&module.exports){if(typeof Symbol=='function'&&typeof Symbol.iterator=='symbol'){P[Symbol['for']('nodejs.util.inspect.custom')]=P.toString;P[Symbol.toStringTag]='Decimal';}module.exports=Decimal;
}else{if(!globalScope){globalScope=typeof self!='undefined'&&self&&self.self==self?self:window;}noConflict=globalScope.Decimal;Decimal.noConflict=function(){globalScope.Decimal=noConflict;return Decimal;};globalScope.Decimal=Decimal;}})(this);},{}],22:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils.js");const addedDiff=(lhs,rhs)=>{if(lhs===rhs||!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return{};return Object.keys(rhs).reduce((acc,key)=>{if((0,_utils.hasOwnProperty)(lhs,key)){const difference=addedDiff(lhs[key],rhs[key]);if((0,_utils.isObject)(difference)&&(0,_utils.isEmpty)(difference))return acc;acc[key]=difference;return acc;}acc[key]=rhs[key];return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=addedDiff;exports.default=_default;},{"./utils.js":28}],23:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils.js");const deletedDiff=(lhs,rhs)=>{if(lhs===rhs||!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return{};return Object.keys(lhs).reduce((acc,key)=>{if((0,_utils.hasOwnProperty)(rhs,key)){const difference=deletedDiff(lhs[key],rhs[key]);if((0,_utils.isObject)(difference)&&(0,_utils.isEmpty)(difference))return acc;acc[key]=difference;return acc;}acc[key]=undefined;return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=deletedDiff;exports.default=_default;},{"./utils.js":28}],24:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _added=_interopRequireDefault(require("./added.js"));var _deleted=_interopRequireDefault(require("./deleted.js"));var _updated=_interopRequireDefault(require("./updated.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const detailedDiff=(lhs,rhs)=>({added:(0,_added.default)(lhs,rhs),deleted:(0,_deleted.default)(lhs,rhs),updated:(0,_updated.default)(lhs,rhs)});var _default=detailedDiff;exports.default=_default;},{"./added.js":22,"./deleted.js":23,"./updated.js":27}],25:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils.js");const diff=(lhs,rhs)=>{if(lhs===rhs)return{};
if(!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return rhs;
const deletedValues=Object.keys(lhs).reduce((acc,key)=>{if(!(0,_utils.hasOwnProperty)(rhs,key)){acc[key]=undefined;}return acc;},(0,_utils.makeObjectWithoutPrototype)());if((0,_utils.isDate)(lhs)||(0,_utils.isDate)(rhs)){if(lhs.valueOf()==rhs.valueOf())return{};return rhs;}return Object.keys(rhs).reduce((acc,key)=>{if(!(0,_utils.hasOwnProperty)(lhs,key)){acc[key]=rhs[key];
return acc;}const difference=diff(lhs[key],rhs[key]);
if((0,_utils.isEmptyObject)(difference)&&!(0,_utils.isDate)(difference)&&((0,_utils.isEmptyObject)(lhs[key])||!(0,_utils.isEmptyObject)(rhs[key])))return acc;
acc[key]=difference;
return acc;
},deletedValues);};var _default=diff;exports.default=_default;},{"./utils.js":28}],26:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"addedDiff",{enumerable:true,get:function(){return _added.default;}});Object.defineProperty(exports,"deletedDiff",{enumerable:true,get:function(){return _deleted.default;}});Object.defineProperty(exports,"detailedDiff",{enumerable:true,get:function(){return _detailed.default;}});Object.defineProperty(exports,"diff",{enumerable:true,get:function(){return _diff.default;}});Object.defineProperty(exports,"updatedDiff",{enumerable:true,get:function(){return _updated.default;}});var _diff=_interopRequireDefault(require("./diff.js"));var _added=_interopRequireDefault(require("./added.js"));var _deleted=_interopRequireDefault(require("./deleted.js"));var _updated=_interopRequireDefault(require("./updated.js"));var _detailed=_interopRequireDefault(require("./detailed.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}},{"./added.js":22,"./deleted.js":23,"./detailed.js":24,"./diff.js":25,"./updated.js":27}],27:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _utils=require("./utils.js");const updatedDiff=(lhs,rhs)=>{if(lhs===rhs)return{};if(!(0,_utils.isObject)(lhs)||!(0,_utils.isObject)(rhs))return rhs;if((0,_utils.isDate)(lhs)||(0,_utils.isDate)(rhs)){if(lhs.valueOf()==rhs.valueOf())return{};return rhs;}return Object.keys(rhs).reduce((acc,key)=>{if((0,_utils.hasOwnProperty)(lhs,key)){const difference=updatedDiff(lhs[key],rhs[key]);
if((0,_utils.isEmptyObject)(difference)&&!(0,_utils.isDate)(difference)&&((0,_utils.isEmptyObject)(lhs[key])||!(0,_utils.isEmptyObject)(rhs[key])))return acc;
acc[key]=difference;return acc;}return acc;},(0,_utils.makeObjectWithoutPrototype)());};var _default=updatedDiff;exports.default=_default;},{"./utils.js":28}],28:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.makeObjectWithoutPrototype=exports.isObject=exports.isEmptyObject=exports.isEmpty=exports.isDate=exports.hasOwnProperty=void 0;const isDate=d=>d instanceof Date;exports.isDate=isDate;const isEmpty=o=>Object.keys(o).length===0;exports.isEmpty=isEmpty;const isObject=o=>o!=null&&typeof o==='object';exports.isObject=isObject;const hasOwnProperty=(o,...args)=>Object.prototype.hasOwnProperty.call(o,...args);exports.hasOwnProperty=hasOwnProperty;const isEmptyObject=o=>isObject(o)&&isEmpty(o);exports.isEmptyObject=isEmptyObject;const makeObjectWithoutPrototype=()=>Object.create(null);exports.makeObjectWithoutPrototype=makeObjectWithoutPrototype;},{}],29:[function(require,module,exports){ class ElucidatorInstructionSet{constructor(pElucidator){this.elucidator=pElucidator;this.namespace='default';}
initializeNamespace(pNamespace){if(typeof pNamespace=='string'){this.namespace=pNamespace;}if(!this.elucidator.instructionSets.hasOwnProperty(this.namespace)){this.elucidator.instructionSets[this.namespace.toLowerCase()]={};}if(!this.elucidator.operationSets.hasOwnProperty(this.namespace)){this.elucidator.operationSets[this.namespace.toLowerCase()]={};}}
addInstruction(pInstructionHash,fInstructionFunction){if(typeof pInstructionHash!='string'){this.elucidator.logError(`Attempted to add an instruction with an invalid hash; expected a string but the instruction hash type was ${typeof pInstructionHash}`);return false;}if(typeof fInstructionFunction!='function'){this.elucidator.logError(`Attempted to add an instruction with an invalid function; expected a function but type was ${typeof fInstructionFunction}`);return false;}this.elucidator.instructionSets[this.namespace.toLowerCase()][pInstructionHash]=fInstructionFunction;return true;}initializeInstructions(){
this.addInstruction('noop',pOperation=>{pOperation.logInfo('Executing a no-operation operation.');return true;});return true;}
addOperation(pOperationHash,pOperation){if(typeof pOperationHash!='string'){this.elucidator.logError(`Attempted to add an operation with an invalid hash; expected a string but the operation hash type was ${typeof pOperationHash}`,pOperation);return false;}if(typeof pOperation!='object'){this.elucidator.logError(`Attempted to add an invalid operation; expected an object data type but the type was ${typeof pOperation}`,pOperation);return false;}
if(!pOperation.hasOwnProperty("Description")){this.elucidator.logError(`Attempted to add an operation with an invalid description; no Description subobject set.`,pOperation);return false;}if(typeof pOperation.Description!='object'){this.elucidator.logError(`Attempted to add an operation with an invalid description; Description subobject was not an object.  The type was ${typeof pOperation.Description}.`,pOperation);return false;}if(typeof pOperation.Description.Hash!='string'){if(typeof pOperation.Description.Operation=='string'){
pOperation.Description.Hash=pOperation.Description.Operation;}else{this.elucidator.logError(`Attempted to add an operation with an invalid description; Description subobject did not contain a valid Hash which is required to call the operation.`,pOperation);return false;}}
if(typeof pOperation.Description.Namespace!='string'||pOperation.Description.Namespace!=this.namespace){pOperation.Description.Namespace=this.namespace;}if(typeof pOperation.Description.Summary!='string'){pOperation.Description.Summary=`[${pOperation.Description.Namespace}] [${pOperation.Description.Hash}] operation.`;}
if(!pOperation.hasOwnProperty('Inputs')){pOperation.Inputs={};}if(!pOperation.hasOwnProperty('Outputs')){pOperation.Outputs={};}if(!pOperation.hasOwnProperty('Steps')){pOperation.Steps=[];}
if(typeof pOperation.Inputs!=='object'){this.elucidator.logError(`Attempted to add an operation with an invalid Inputs object.`,pOperation);return false;}
if(typeof pOperation.Outputs!=='object'){this.elucidator.logError(`Attempted to add an operation with an invalid Outputs object.`,pOperation);return false;}if(!Array.isArray(pOperation.Steps)){this.elucidator.logError(`Attempted to add an operation with an invalid Steps array.`,pOperation);return false;}this.elucidator.operationSets[this.namespace.toLowerCase()][pOperationHash.toLowerCase()]=pOperation;return true;}initializeOperations(){this.addOperation('noop',{"Description":{"Operation":"noop","Description":"No operation - no affect on any data."}});return true;}};module.exports=ElucidatorInstructionSet;},{}],30:[function(require,module,exports){ const logToConsole=(pLogLine,pLogObject,pLogLevel)=>{let tmpLogLine=typeof pLogLine==='string'?pLogLine:'';let tmpLogLevel=typeof pLogLevel==='string'?pLogLevel:'INFO';console.log(`[Elucidator:${tmpLogLevel}] ${tmpLogLine}`);if(pLogObject)console.log(JSON.stringify(pLogObject,null,4)+"\n");};const logInfo=(pLogLine,pLogObject)=>{logToConsole(pLogLine,pLogObject,'Info');};const logWarning=(pLogLine,pLogObject)=>{logToConsole(pLogLine,pLogObject,'Warning');};const logError=(pLogLine,pLogObject)=>{logToConsole(pLogLine,pLogObject,'Error');};module.exports={logToConsole:logToConsole,info:logInfo,warning:logWarning,error:logError};},{}],31:[function(require,module,exports){const libSimpleLog=require('./Elucidator-LogToConsole.js');const libManyfest=require('manyfest');const libPrecedent=require('precedent');const libElucidatorInstructionSet=require('./Elucidator-InstructionSet.js');class Elucidator{constructor(pOperations,fInfoLog,fErrorLog){
this.logInfo=typeof fInfoLog==='function'?fInfoLog:libSimpleLog.info;this.logWarning=typeof fWarningLog==='function'?fWarningLog:libSimpleLog.warning;this.logError=typeof fErrorLog==='function'?fErrorLog:libSimpleLog.error;
this.instructionSets={};
this.operationSets={};
this.UUID=0;this.loadDefaultInstructionSets();if(pOperations){let tmpSolverHashes=Object.keys(pOperations);for(let i=0;i<tmpSolverHashes.length;i++){this.addOperation('Custom',tmpSolverHashes[i],pOperations[tmpSolverHashes[i]]);}}}
loadInstructionSet(cInstructionSet){let tmpInstructionSet=new cInstructionSet(this);
tmpInstructionSet.initializeNamespace();tmpInstructionSet.initializeInstructions();tmpInstructionSet.initializeOperations();}loadDefaultInstructionSets(){
this.loadInstructionSet(require(`./InstructionSets/Math-Javascript.js`));
this.loadInstructionSet(require(`./InstructionSets/PreciseMath-Decimal.js`));
this.loadInstructionSet(require(`./InstructionSets/Geometry.js`));
this.loadInstructionSet(require(`./InstructionSets/Logic.js`));
this.loadInstructionSet(require(`./InstructionSets/String.js`));
this.loadInstructionSet(require(`./InstructionSets/Set.js`));}operationExists(pNamespace,pOperationHash){if(typeof pNamespace!='string'||typeof pOperationHash!='string'){return false;}let tmpNamespace=pNamespace.toLowerCase();return this.operationSets.hasOwnProperty(tmpNamespace)&&this.operationSets[tmpNamespace].hasOwnProperty(pOperationHash.toLowerCase());}addOperation(pNamespace,pOperationHash,pOperation){if(typeof pNamespace!='string'){this.logError(`Attempted to add an operation at runtime via Elucidator.addOperation with an invalid namespace; expected a string but the type was ${typeof pNamespace}`,pOperation);return false;}let tmpOperationInjector=new libElucidatorInstructionSet(this);tmpOperationInjector.initializeNamespace(pNamespace);return tmpOperationInjector.addOperation(pOperationHash,pOperation);}solveInternalOperation(pNamespace,pOperationHash,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext){if(!this.operationExists(pNamespace,pOperationHash)){this.logError(`Attempted to solveInternalOperation for namespace ${pNamespace} operationHash ${pOperationHash} but the operation was not found.`);
return false;}let tmpOperation=this.operationSets[pNamespace.toLowerCase()][pOperationHash.toLowerCase()];return this.solveOperation(tmpOperation,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext);}solveOperation(pOperationObject,pInputObject,pOutputObject,pDescriptionManyfest,pInputAddressMapping,pOutputAddressMapping,pSolutionContext){let tmpOperation=JSON.parse(JSON.stringify(pOperationObject));if(typeof pInputObject!='object'){this.logError(`Attempted to run a solve but the passed in Input was not an object.  The type was ${typeof pInputObject}.`);return false;}let tmpInputObject=pInputObject;
let tmpOutputObject=tmpInputObject;
let tmpSolutionContext=pSolutionContext;if(typeof tmpSolutionContext==='undefined'){tmpSolutionContext={"SolutionGUID":`Solution-${this.UUID++}`,"SolutionBaseNamespace":pOperationObject.Description.Namespace,"SolutionBaseOperation":pOperationObject.Description.Operation,"SolutionLog":[]};
if(!tmpOperation.hasOwnProperty('Inputs')){tmpOperation.Inputs={};}if(!tmpOperation.hasOwnProperty('Outputs')){tmpOperation.Outputs={};}
if(tmpOperation.hasOwnProperty('InputHashTranslationTable')){tmpSolutionContext.InputHashMapping=JSON.parse(JSON.stringify(tmpOperation.InputHashTranslationTable));}else{tmpSolutionContext.InputHashMapping={};}if(tmpOperation.hasOwnProperty('OutputHashTranslationTable')){tmpSolutionContext.OutputHashMapping=JSON.parse(JSON.stringify(tmpOperation.OutputHashTranslationTable));}if(typeof pOutputObject!='object'&&typeof tmpOutputHashMapping=='undefined'&&typeof tmpInputHashMapping!='undefined'){
tmpSolutionContext.OutputHashMapping=tmpSolutionContext.InputHashMapping;}}if(typeof pOutputObject=='object'){
tmpOutputObject=pOutputObject;}let tmpDescriptionManyfest=false;if(typeof pDescriptionManyfest==='undefined'){
tmpDescriptionManyfest=new libManyfest();
let tmpManyfestSchema={Scope:'Solver Data Part Descriptions',Descriptors:tmpDescriptionManyfest.schemaManipulations.mergeAddressMappings(tmpOperation.Inputs,tmpOperation.Outputs)};}else{
tmpDescriptionManyfest=pDescriptionManyfest.clone();}
if(pInputAddressMapping){tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOperation.Inputs,pInputAddressMapping);}if(pOutputAddressMapping){tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOperation.Inputs,pOutputAddressMapping);}if(tmpSolutionContext.InputHashMapping){tmpDescriptionManyfest.hashTranslations.addTranslation(tmpSolutionContext.InputHashMapping);}if(tmpSolutionContext.OutputHashMapping){tmpDescriptionManyfest.hashTranslations.addTranslation(tmpSolutionContext.OutputHashMapping);}
tmpOperation.UUID=this.UUID++;tmpOperation.SolutionContext=tmpSolutionContext;if(tmpOperation.Description.Synopsys){tmpSolutionContext.SolutionLog.push(`[${tmpOperation.UUID}]: Solver running operation ${tmpOperation.Description.Synopsys}`);}let tmpPrecedent=new libPrecedent();tmpPrecedent.addPattern('{{Name:','}}',pHash=>{let tmpHash=pHash.trim();let tmpDescriptor=tmpDescriptionManyfest.getDescriptorByHash(tmpHash);
if(typeof tmpDescriptor=='object'&&tmpDescriptor.hasOwnProperty('Name')){return tmpDescriptor.Name;}else{return tmpHash;}});tmpPrecedent.addPattern('{{InputValue:','}}',pHash=>{let tmpHash=pHash.trim();return tmpDescriptionManyfest.getValueByHash(tmpInputObject,tmpHash);});tmpPrecedent.addPattern('{{OutputValue:','}}',pHash=>{let tmpHash=pHash.trim();return tmpDescriptionManyfest.getValueByHash(tmpOutputObject,tmpHash);});if(tmpOperation.hasOwnProperty('Log')&&tmpOperation.Log.hasOwnProperty('PreOperation')){if(typeof tmpOperation.Log.PreOperation=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PreOperation));}else if(Array.isArray(tmpOperation.Log.PreOperation)){for(let i=0;i<tmpOperation.Log.PreOperation.length;i++){if(typeof tmpOperation.Log.PreOperation[i]=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PreOperation[i]));}}}}
for(let i=0;i<tmpOperation.Steps.length;i++){let tmpStep=tmpOperation.Steps[i];
if(tmpStep.hasOwnProperty('Instruction')){let tmpInputSchema={"Scope":"InputObject","Descriptors":JSON.parse(JSON.stringify(tmpOperation.Inputs))};
tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpInputSchema.Descriptors,tmpStep.InputHashAddressMap);let tmpInputManyfest=new libManyfest(tmpInputSchema);if(tmpSolutionContext.InputHashMapping){tmpInputManyfest.hashTranslations.addTranslation(tmpSolutionContext.InputHashMapping);}let tmpOutputSchema={"Scope":"OutputObject","Descriptors":JSON.parse(JSON.stringify(tmpOperation.Outputs))};tmpDescriptionManyfest.schemaManipulations.resolveAddressMappings(tmpOutputSchema.Descriptors,tmpStep.OutputHashAddressMap);let tmpOutputManyfest=new libManyfest(tmpOutputSchema);if(tmpSolutionContext.OutputHashMapping){tmpOutputManyfest.hashTranslations.addTranslation(tmpSolutionContext.OutputHashMapping);}
let tmpInstructionState={Elucidator:this,Namespace:tmpStep.Namespace.toLowerCase(),Instruction:tmpStep.Instruction.toLowerCase(),Operation:tmpOperation,SolutionContext:tmpSolutionContext,DescriptionManyfest:tmpDescriptionManyfest,InputObject:tmpInputObject,InputManyfest:tmpInputManyfest,OutputObject:tmpOutputObject,OutputManyfest:tmpOutputManyfest};tmpInstructionState.logError=pMessage=>{tmpSolutionContext.SolutionLog.push(`[ERROR][Operation ${tmpInstructionState.Operation.Description.Namespace}:${tmpInstructionState.Operation.Description.Hash} - Step #${i}:${tmpStep.Namespace}:${tmpStep.Instruction}] ${pMessage}`);};tmpInstructionState.logInfo=pMessage=>{tmpSolutionContext.SolutionLog.push(`[INFO][Operation ${tmpInstructionState.Operation.Description.Namespace}:${tmpInstructionState.Operation.Description.Hash} - Step #${i}:${tmpStep.Namespace}:${tmpStep.Instruction}] ${pMessage}`);};if(this.instructionSets[tmpInstructionState.Namespace].hasOwnProperty(tmpInstructionState.Instruction)){let fInstruction=this.instructionSets[tmpInstructionState.Namespace][tmpInstructionState.Instruction];fInstruction(tmpInstructionState);}}
if(tmpStep.hasOwnProperty('Operation')){if(typeof tmpStep.Operation=='string'){this.solveInternalOperation(tmpStep.Namespace,tmpStep.Operation,tmpInputObject,tmpOutputObject,tmpDescriptionManyfest,tmpStep.InputHashAddressMap,tmpStep.OutputHashAddressMap,tmpSolutionContext);}else if(typeof tmpStep.Operation=='object'){
this.solveOperation(tmpStep.Operation,tmpInputObject,tmpOutputObject,tmpDescriptionManyfest,tmpStep.InputHashAddressMap,tmpStep.OutputHashAddressMap,tmpSolutionContext);}}}if(tmpOperation.hasOwnProperty('Log')&&tmpOperation.Log.hasOwnProperty('PostOperation')){if(typeof tmpOperation.Log.PostOperation=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PostOperation));}else if(Array.isArray(tmpOperation.Log.PreOperation)){for(let i=0;i<tmpOperation.Log.PostOperation.length;i++){if(typeof tmpOperation.Log.PostOperation[i]=='string'){tmpOperation.SolutionContext.SolutionLog.push(tmpPrecedent.parseString(tmpOperation.Log.PostOperation[i]));}}}}return tmpSolutionContext;}};module.exports=Elucidator;},{"./Elucidator-InstructionSet.js":29,"./Elucidator-LogToConsole.js":30,"./InstructionSets/Geometry.js":32,"./InstructionSets/Logic.js":33,"./InstructionSets/Math-Javascript.js":34,"./InstructionSets/PreciseMath-Decimal.js":58,"./InstructionSets/Set.js":59,"./InstructionSets/String.js":60,"manyfest":92,"precedent":95}],32:[function(require,module,exports){
let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');class Geometry extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='Geometry';}
initializeInstructions(){return true;}initializeOperations(){this.addOperation('rectanglearea',require(`./Operations/Geometry-RectangleArea.json`));return true;}}module.exports=Geometry;},{"../Elucidator-InstructionSet.js":29,"./Operations/Geometry-RectangleArea.json":35}],33:[function(require,module,exports){
let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');const ifInstruction=pOperation=>{let tmpLeftValue=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'leftValue');let tmpRightValue=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'rightValue');let tmpComparator=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'comparator').toString().toLowerCase();let tmpComparisonOperator='equal';
let tmpComparisonOperatorMapping={'==':'equal','eq':'equal','equal':'equal','!=':'notequal','noteq':'notequal','notequal':'notequal','===':'identity','id':'identity','identity':'identity','>':'greaterthan','gt':'greaterthan','greaterthan':'greaterthan','>=':'greaterthanorequal','gte':'greaterthanorequal','greaterthanorequal':'greaterthanorequal','<':'lessthan','lt':'lessthan','lessthan':'lessthan','<=':'lessthanorequal','lte':'lessthanorequal','lessthanorequal':'lessthanorequal'};if(tmpComparisonOperatorMapping.hasOwnProperty(tmpComparator)){tmpComparisonOperator=tmpComparisonOperatorMapping[tmpComparator];}let tmpTrueNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'trueNamespace');let tmpTrueOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'trueOperation');let tmpFalseNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'falseNamespace');let tmpFalseOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'falseOperation');let tmpTruthiness=null;switch(tmpComparisonOperator){case'equal':tmpTruthiness=tmpLeftValue==tmpRightValue;break;case'identity':tmpTruthiness=tmpLeftValue===tmpRightValue;break;case'notequal':tmpTruthiness=tmpLeftValue!=tmpRightValue;break;case'greaterthan':tmpTruthiness=tmpLeftValue>tmpRightValue;break;case'greaterthanorequal':tmpTruthiness=tmpLeftValue>=tmpRightValue;break;case'lessthan':tmpTruthiness=tmpLeftValue<tmpRightValue;break;case'lessthanorequal':tmpTruthiness=tmpLeftValue<=tmpRightValue;break;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'truthinessResult',tmpTruthiness);
if(tmpTruthiness&&typeof tmpTrueNamespace=='string'&&typeof tmpTrueOperation=='string'&&tmpTrueOperation!='noop'){pOperation.Elucidator.solveInternalOperation(tmpTrueNamespace,tmpTrueOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);}else if(typeof tmpFalseNamespace=='string'&&typeof tmpFalseOperation=='string'&&tmpFalseOperation!='noop'){pOperation.Elucidator.solveInternalOperation(tmpFalseNamespace,tmpFalseOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);}return true;};const executeOperation=pOperation=>{let tmpNamespace=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'namespace');let tmpOperation=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'operation');pOperation.Elucidator.solveInternalOperation(tmpNamespace,tmpOperation,pOperation.InputObject,pOperation.OutputObject,pOperation.DescriptionManyfest,pOperation.SolutionContext.InputHashMapping,pOperation.SolutionContext.OutputHashMapping,pOperation.SolutionContext);return true;};class Logic extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='Logic';}initializeInstructions(){
super.initializeInstructions();this.addInstruction('if',ifInstruction);this.addInstruction('execute',executeOperation);return true;}initializeOperations(){this.addOperation('if',require(`./Operations/Logic-If.json`));this.addOperation('execute',require(`./Operations/Logic-Execute.json`));return true;}}module.exports=Logic;},{"../Elucidator-InstructionSet.js":29,"./Operations/Logic-Execute.json":36,"./Operations/Logic-If.json":37}],34:[function(require,module,exports){
let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');let add=pOperation=>{
let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA+tmpB);return true;};let subtract=pOperation=>{
let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA-tmpB);return true;};let multiply=pOperation=>{
let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA*tmpB);return true;};let divide=pOperation=>{
let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpB=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA/tmpB);return true;};let aggregate=pOperation=>{let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpObjectType=typeof tmpA;let tmpAggregationValue=0;if(tmpObjectType=='object'){if(Array.isArray(tmpA)){for(let i=0;i<tmpA.length;i++){
let tmpValue=parseInt(tmpA[i]);if(isNaN(tmpValue)){pOperation.logError(`Array element index [${i}] could not be parsed as a number; skipping.  (${tmpA[i]})`);}else{tmpAggregationValue+=tmpValue;pOperation.logInfo(`Adding element [${i}] value ${tmpValue} totaling: ${tmpAggregationValue}`);}}}else{let tmpObjectKeys=Object.keys(tmpA);for(let i=0;i<tmpObjectKeys.length;i++){let tmpValue=parseInt(tmpA[tmpObjectKeys[i]]);if(isNaN(tmpValue)){pOperation.logError(`Object property [${tmpObjectKeys[i]}] could not be parsed as a number; skipping.  (${tmpA[tmpObjectKeys[i]]})`);}else{tmpAggregationValue+=tmpValue;pOperation.logInfo(`Adding object property [${tmpObjectKeys[i]}] value ${tmpValue} totaling: ${tmpAggregationValue}`);}}}}else{let tmpValue=parseInt(tmpA);if(isNaN(tmpValue)){pOperation.logError(`Direct value could not be parsed as a number; skipping.  (${tmpA})`);}else{tmpAggregationValue+=tmpValue;}}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpAggregationValue);return true;};class MathJavascript extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='Math';}initializeInstructions(){this.addInstruction('add',add);this.addInstruction('subtract',subtract);this.addInstruction('sub',subtract);this.addInstruction('multiply',multiply);this.addInstruction('mul',multiply);this.addInstruction('divide',divide);this.addInstruction('div',divide);this.addInstruction('aggregate',aggregate);return true;}initializeOperations(){this.addOperation('add',require(`./Operations/Math-Add.json`));this.addOperation('subtract',require(`./Operations/Math-Subtract.json`));this.addOperation('multiply',require(`./Operations/Math-Multiply.json`));this.addOperation('divide',require(`./Operations/Math-Divide.json`));this.addOperation('aggregate',require(`./Operations/Math-Aggregate.json`));return true;}}module.exports=MathJavascript;},{"../Elucidator-InstructionSet.js":29,"./Operations/Math-Add.json":38,"./Operations/Math-Aggregate.json":39,"./Operations/Math-Divide.json":40,"./Operations/Math-Multiply.json":41,"./Operations/Math-Subtract.json":42}],35:[function(require,module,exports){module.exports={"Description":{"Namespace":"Geometry","Operation":"RectangleArea","Synopsis":"Solve for the area of a rectangle:  Area = Width * Height"},"Inputs":{"Width":{"Hash":"Width","Type":"Number"},"Height":{"Hash":"Height","Type":"Number"}},"Outputs":{"Area":{"Hash":"Area","Name":"Area of the Rectangle"},"Ratio":{"Hash":"Ratio","Name":"The Ratio between the Width and the Height"}},"Log":{"PreOperation":"Solve for [ {{Name:Area}} ] based on [ {{Name:Width}} ] and [ {{Name:Height}} ].","PostOperation":"Operation complete; [ {{Name:Area}} ] = {{InputValue:Width}} * {{InputValue:Height}} = {{OutputValue:Area}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"multiply","InputHashAddressMap":{"a":"Width","b":"Height"},"OutputHashAddressMap":{"x":"Area"}},{"Namespace":"PreciseMath","Instruction":"divide","InputHashAddressMap":{"a":"Width","b":"Height"},"OutputHashAddressMap":{"x":"Ratio"}}]};},{}],36:[function(require,module,exports){module.exports={"Description":{"Namespace":"Logic","Operation":"Execute","Synopsis":"Execute an operation based on namespace and operation."},"Inputs":{"namespace":{"Hash":"namespace","Type":"string","Default":"logic"},"operation":{"Hash":"operation","Type":"string","Default":"noop"}},"Outputs":{},"Log":{"PreOperation":"Execute the {{InputValue:operation}} operation in namespace {{InputValue:namespace}}.","PostOperation":"Operation [{{InputValue:namespace}}:{{InputValue:operation}}] execution complete."},"Steps":[{"Namespace":"Logic","Instruction":"execute"}]};},{}],37:[function(require,module,exports){module.exports={"Description":{"Namespace":"Logic","Operation":"If","Synopsis":"Comparison-based if of leftValue and RightValue based on comparator.  Executes trueNamespace:trueOperation or falseNamespace:falseOperation based on truthiness of result.  Also outputs a true or false to truthinessResult."},"Inputs":{"leftValue":{"Hash":"leftValue","Type":"Any"},"rightValue":{"Hash":"rightValue","Type":"Any","Default":true},"comparator":{"Hash":"comparator","Type":"String","Default":"=="},"trueNamespace":{"Hash":"trueNamespace","Type":"String","Default":"logic"},"trueOperation":{"Hash":"trueOperation","Type":"String","Default":"noop"},"falseNamespace":{"Hash":"falseNamespace","Type":"String","Default":"logic"},"falseOperation":{"Hash":"falseOperation","Type":"String","Default":"noop"}},"Outputs":{"truthinessResult":{"Hash":"truthinessResult","Type":"Boolean"}},"Log":{"PreOperation":"Compare {{Name:leftValue}} and {{Name:rightValue}} with the {{InputValue:comparator}} operator, storing the truthiness in {{Name:truthinessResult}}.","PostOperation":"Operation complete: {{InputValue:leftValue}} {{InputValue:comparator}} {{InputValue:rightValue}} evaluated to {{OutputValue:truthinessResult}}"},"Steps":[{"Namespace":"Logic","Instruction":"If"}]};},{}],38:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Add","Synopsis":"Add two numbers:  x = a + b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Add {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} + {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"add"}]};},{}],39:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Aggregate","Synopsis":"Aggregate a set of numbers (from array or object address):  x = a + b + ... + z"},"Inputs":{"a":{"Hash":"a","Type":"Set"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Aggregate all numeric values in {{Name:a}}, storing the resultant in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"aggregate"}]};},{}],40:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Divide","Synopsis":"Divide two numbers:  x = a / b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Divide {{Name:a}} over {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} / {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"divide"}]};},{}],41:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Multiply","Synopsis":"Multiply two numbers:  x = a * b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Multiply {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} * {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"multiply"}]};},{}],42:[function(require,module,exports){module.exports={"Description":{"Namespace":"Math","Operation":"Subtract","Synopsis":"Subtract two numbers:  x = a - b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Subtract {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} - {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"Math","Instruction":"subtract"}]};},{}],43:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Add","Synopsis":"Precisely add two numbers:  x = a + b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Add {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} + {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"add"}]};},{}],44:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Aggregate","Synopsis":"Precisely aggregate a set of numbers (from array or object address):  x = a + b + ... + z"},"Inputs":{"a":{"Hash":"a","Type":"Set"},"ValueNames":{"Hash":"ValueNames","Type":"Set"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Aggregate all numeric values in {{Name:a}}, storing the resultant in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"aggregate"}]};},{}],45:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Divide","Synopsis":"Precisely divide two numbers:  x = a / b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Divide {{Name:a}} over {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} / {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"divide"}]};},{}],46:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"GroupValuesAndAggregate","Synopsis":"Group values in a set and aggregate the set of numbers (from array or object addresses)"},"Inputs":{"inputDataSet":{"Hash":"inputDataSet","Type":"Set"},"groupByProperty":{"Hash":"groupByProperty","Type":"Any"},"groupValueProperty":{"Hash":"groupValueProperty","Type":"Any"},"recordIndicatorProperty":{"Hash":"recordIndicatorProperty","Type":"String","Default":false}},"Outputs":{"outputDataSet":{"Hash":"outputDataSet","Type":"Set"}},"Log":{"PreOperation":"Group {{Name:inputDataSet}} by {{Name:groupByProperty}} and create a map, storing the resultant in {{Name:outputDataSet}}.","PostOperation":"Operation complete: Grouping {{Name:inputDataSet}} by {{Name:groupByProperty}} into aggregated values in {{Name:outputDataSet}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"groupvaluesandaggregate"}]};},{}],47:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Multiply","Synopsis":"Precisely multiply two numbers:  x = a * b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Multiply {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} * {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"multiply"}]};},{}],48:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Round","Synopsis":"Precisely round a number."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"precision":{"Hash":"precision","Type":"Number"},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}}) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"round"}]};},{}],49:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"SetPrecision","Synopsis":"Set the precision."},"Inputs":{"precision":{"Hash":"precision","Type":"Number","Default":2}},"Outputs":{},"Log":{"PreOperation":"Set precision to {{InputValue:precision}}.","PostOperation":"Operation complete: Default precision set to {{InputValue:precision}}."},"Steps":[{"Namespace":"PreciseMath","Instruction":"setprecision"}]};},{}],50:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"SetRoundingMode","Synopsis":"Set the rounding mode."},"Inputs":{"roundingmode":{"Hash":"roundingmode","Type":"String","Default":"ROUND_HALF_UP"}},"Outputs":{},"Log":{"PreOperation":"Set rounding mode to {{InputValue:roundingmode}}.","PostOperation":"Operation complete: Default rounding mode set to {{InputValue:roundingmode}}."},"Steps":[{"Namespace":"PreciseMath","Instruction":"setroundingmode"}]};},{}],51:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"Subtract","Synopsis":"Precisely subtract two numbers:  x = a - b"},"Inputs":{"a":{"Hash":"a","Type":"Number"},"b":{"Hash":"b","Type":"Number"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Subtract {{Name:a}} and {{Name:b}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = {{InputValue:a}} - {{InputValue:b}} = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"subtract"}]};},{}],52:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"ToDecimalPlaces","Synopsis":"Precisely round a number to a certain number of decimal places."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"decimalplaces":{"Hash":"decimalplaces","Type":"Number","Default":2},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}} to {{Value:decimalplaces}} decimal places, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}} TO {{Value:decimalplaces}} decimal places) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"todecimalplaces"}]};},{}],53:[function(require,module,exports){module.exports={"Description":{"Namespace":"PreciseMath","Operation":"ToSignificantDigits","Synopsis":"Precisely round a number to a specific number of significant digits."},"Inputs":{"a":{"Hash":"a","Type":"Number"},"digits":{"Hash":"digits","Type":"Number","Default":12},"roundingmode":{"Hash":"roundingmode","Type":"String"}},"Outputs":{"x":{"Hash":"x","Type":"Number"}},"Log":{"PreOperation":"Round {{Name:a}} to {{InputValue:digits}}, storing the value in {{Name:x}}.","PostOperation":"Operation complete: {{Name:x}} = Round({{InputValue:a}} TO {{InputValue:digits}}) = {{OutputValue:x}}"},"Steps":[{"Namespace":"PreciseMath","Instruction":"tosignificantdigits"}]};},{}],54:[function(require,module,exports){module.exports={"Description":{"Namespace":"Set","Operation":"GroupValuesBy","Synopsis":"Group set of Sub object values by another property in the objects."},"Inputs":{"inputDataSet":{"Hash":"inputDataSet","Type":"Set"},"groupByProperty":{"Hash":"groupByProperty","Type":"Any"},"groupValueProperty":{"Hash":"groupValueProperty","Type":"Any"}},"Outputs":{"outputDataSet":{"Hash":"outputDataSet","Type":"Set"}},"Log":{"PreOperation":"Group {{Name:inputDataSet}} by {{Name:groupByProperty}} and create a mapped result set into {{Name:outputDataSet}}.","PostOperation":"Operation complete: Grouping {{Name:inputDataSet}} by {{Name:groupByProperty}} into {{Name:outputDataSet}}"},"Steps":[{"Namespace":"Set","Instruction":"GroupValuesBy"}]};},{}],55:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Replace","Synopsis":"Replace all instances of searchFor with replaceWith in inputString"},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"},"searchFor":{"Hash":"searchFor","Type":"String"},"replaceWith":{"Hash":"replaceWith","Type":"String"}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Search for [{{InputValue:searchFor}}] and replace it with [{{InputValue:replaceWith}}] in [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}] replacing [{{InputValue:searchFor}}] with [{{InputValue:replaceWith}}]."},"Steps":[{"Namespace":"String","Instruction":"replace"}]};},{}],56:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Substring","Synopsis":"Get all characters between indexStart and indexEnd (optional) for a given inputString."},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"},"indexStart":{"Hash":"indexStart","Type":"Number","Default":0},"indexEnd":{"Hash":"indexEnd","Type":"String","Default":null}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Get all characters between {{InputValue:indexStart}} and {{InputValue:indexEnd}} in [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}] between {{InputValue:indexStart}} and {{InputValue:indexEnd}}."},"Steps":[{"Namespace":"String","Instruction":"substring"}]};},{}],57:[function(require,module,exports){module.exports={"Description":{"Namespace":"String","Operation":"Trim","Synopsis":"Trim whitespace off the end of string in inputString, putting the result in outputString"},"Inputs":{"inputString":{"Hash":"inputString","Type":"String"}},"Outputs":{"outputString":{"Hash":"outputString","Type":"String"}},"Log":{"PreOperation":"Trim the whitespace from value [{{InputValue:inputString}}].","PostOperation":"Operation complete: {{Name:outputString}} = [{{OutputValue:outputString}}] from [{{InputValue:inputString}}]"},"Steps":[{"Namespace":"String","Instruction":"trim"}]};},{}],58:[function(require,module,exports){let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');const libDecimal=require('decimal.js');let add=pOperation=>{
let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.plus(tmpB).toString());return true;};let subtract=pOperation=>{
let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.sub(tmpB).toString());return true;};let multiply=pOperation=>{
let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.mul(tmpB).toString());return true;};let divide=pOperation=>{
let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpB=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'b'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.div(tmpB).toString());return true;};let round=pOperation=>{let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpPrecision=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'precision'));let tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(!isNaN(tmpPrecision)){libDecimal.set({precision:tmpPrecision});}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',libDecimal.round(tmpA).toString());};let tosignificantdigits=pOperation=>{let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpDigits=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'digits'));let tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(isNaN(tmpDigits)){tmpDigits=12;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toSignificantDigits(tmpDigits).toString());};let todecimalplaces=pOperation=>{let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));let tmpDecimalPlaces=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'decimalplaces'));let tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}if(isNaN(tmpDecimalPlaces)){tmpDecimalPlaces=2;}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toDecimalPlaces(tmpDecimalPlaces).toString());};let setprecision=pOperation=>{let tmpPrecision=parseInt(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'precision'));console.log(tmpPrecision);if(!isNaN(tmpPrecision)){libDecimal.set({precision:tmpPrecision});}};let setroundingmode=pOperation=>{let tmpRoundingMode=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'roundingmode');
if(tmpRoundingMode){switch(tmpRoundingMode.toString().toLowerCase()){case'round_up':libDecimal.set({rounding:libDecimal.ROUND_UP});break;case'round_down':libDecimal.set({rounding:libDecimal.ROUND_DOWN});break;case'round_ceil':libDecimal.set({rounding:libDecimal.ROUND_CEIL});break;case'round_floor':libDecimal.set({rounding:libDecimal.ROUND_FLOOR});break;default:case'round_half_up':libDecimal.set({rounding:libDecimal.ROUND_HALF_UP});break;case'round_half_down':libDecimal.set({rounding:libDecimal.ROUND_HALF_DOWN});break;case'round_half_even':libDecimal.set({rounding:libDecimal.ROUND_HALF_EVEN});break;case'round_half_ceil':libDecimal.set({rounding:libDecimal.ROUND_HALF_CEIL});break;case'round_half_floor':libDecimal.set({rounding:libDecimal.ROUND_HALF_FLOOR});break;case'euclid':libDecimal.set({rounding:libDecimal.EUCLID});break;}}};let aggregate=pOperation=>{let tmpA=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a');let tmpObjectType=typeof tmpA;let tmpAggregationValue=new libDecimal(0);if(tmpObjectType=='object'){if(Array.isArray(tmpA)){for(let i=0;i<tmpA.length;i++){
let tmpValue=new libDecimal(tmpA[i]);if(isNaN(tmpValue)){pOperation.logError(`Array element index [${i}] could not be parsed as a number by Decimal.js; skipping.  (${tmpA[i]})`);}else{tmpAggregationValue=tmpAggregationValue.plus(tmpValue);pOperation.logInfo(`Adding element [${i}] value ${tmpValue} totaling: ${tmpAggregationValue}`);}}}else{let tmpObjectKeys=Object.keys(tmpA);for(let i=0;i<tmpObjectKeys.length;i++){let tmpValue=new libDecimal(tmpA[tmpObjectKeys[i]]);if(isNaN(tmpValue)){pOperation.logError(`Object property [${tmpObjectKeys[i]}] could not be parsed as a number; skipping.  (${tmpA[tmpObjectKeys[i]]})`);}else{tmpAggregationValue=tmpAggregationValue.plus(tmpValue);pOperation.logInfo(`Adding object property [${tmpObjectKeys[i]}] value ${tmpValue} totaling: ${tmpAggregationValue}`);}}}}else{let tmpValue=new libDecimal(tmpA);if(isNaN(tmpValue)){pOperation.logError(`Direct value could not be parsed as a number; skipping.  (${tmpA})`);}else{tmpAggregationValue=tmpValue;}}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpAggregationValue.toString());return true;};const groupValuesAndAggregate=pOperation=>{let tmpInputDataSet=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputDataSet');let tmpGroupByProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupByProperty');let tmpGroupValueProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupValueProperty');let tmpOutputDataSet={};let tmpProcessedOutputDataSet={};let tmpObjectType=typeof tmpInputDataSet;if(tmpObjectType=='object'){if(Array.isArray(tmpInputDataSet)){for(let i=0;i<tmpInputDataSet.length;i++){if(typeof tmpInputDataSet[i]!=='object'){pOperation.logInfo(`Element [${i}] was not an object; skipping group operation.`);}else{let tmpValue=tmpInputDataSet[i];let tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo(`Element [${i}] doesn't have the group by property [${tmpGroupByProperty}]; setting group to [__NO_GROUP].`);tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo(`Element [${i}] doesn't have the group value property [${tmpGroupValueProperty}]; skipping group operation.`);}else{let tmpDecimalValue=new libDecimal(tmpValue[tmpGroupValueProperty]);if(isNaN(tmpDecimalValue)){pOperation.logError(`Object property [${i}] could not be parsed as a number; skipping.  (${tmpValue[tmpGroupValueProperty]})`);}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){tmpOutputDataSet[tmpGroupByValue]=tmpDecimalValue;}else{tmpOutputDataSet[tmpGroupByValue]=tmpOutputDataSet[tmpGroupByValue].plus(tmpDecimalValue);}pOperation.logInfo(`Adding object property [${i}] value ${tmpDecimalValue} totaling: ${tmpOutputDataSet[tmpGroupByValue]}`);}}}}}else{let tmpObjectKeys=Object.keys(tmpInputDataSet);for(let i=0;i<tmpObjectKeys.length;i++){if(typeof tmpInputDataSet[tmpObjectKeys[i]]!=='object'){pOperation.logInfo(`Element [${i}] was not an object; skipping group operation.`);}else{let tmpValue=tmpInputDataSet[tmpObjectKeys[i]];let tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo(`Element [${tmpObjectKeys[i]}][${i}] doesn't have the group by property [${tmpGroupByProperty}]; setting group to [__NO_GROUP].`);tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo(`Element [${tmpObjectKeys[i]}][${i}] doesn't have the group value property [${tmpGroupValueProperty}]; skipping group operation.`);}else{let tmpDecimalValue=new libDecimal(tmpValue[tmpGroupValueProperty]);if(isNaN(tmpDecimalValue)){pOperation.logError(`Object property [${tmpObjectKeys[i]}][${i}] to group ${tmpGroupByValue} could not be parsed as a number; skipping.  (${tmpValue[tmpGroupValueProperty]})`);}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){tmpOutputDataSet[tmpGroupByValue]=tmpDecimalValue;}else{tmpOutputDataSet[tmpGroupByValue]=tmpOutputDataSet[tmpGroupByValue].plus(tmpDecimalValue);}pOperation.logInfo(`Adding object property [${tmpObjectKeys[i]}][${i}] to group ${tmpGroupByValue} value ${tmpDecimalValue} totaling: ${tmpOutputDataSet[tmpGroupByValue]}`);}}}}}
let tmpOutputGroups=Object.keys(tmpOutputDataSet);for(let j=0;j<tmpOutputGroups.length;j++){tmpProcessedOutputDataSet[tmpOutputGroups[j]]=tmpOutputDataSet[tmpOutputGroups[j]].toString();}}else{pOperation.logError(`Input set is neither an Array nor an Object`);}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputDataSet',tmpProcessedOutputDataSet);return true;};let toFraction=pOperation=>{
let tmpA=new libDecimal(pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'a'));pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'x',tmpA.toFraction().toString());return true;};class PreciseMath extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='PreciseMath';}initializeInstructions(){this.addInstruction('add',add);this.addInstruction('subtract',subtract);this.addInstruction('sub',subtract);this.addInstruction('multiply',multiply);this.addInstruction('mul',multiply);this.addInstruction('divide',divide);this.addInstruction('div',divide);this.addInstruction('aggregate',aggregate);this.addInstruction('groupvaluesandaggregate',groupValuesAndAggregate);this.addInstruction('setprecision',setprecision);this.addInstruction('setroundingmode',setroundingmode);this.addInstruction('todecimalplaces',todecimalplaces);this.addInstruction('tosignificantdigits',tosignificantdigits);this.addInstruction('round',round);this.addInstruction('tofraction',toFraction);return true;}initializeOperations(){this.addOperation('add',require(`./Operations/PreciseMath-Add.json`));this.addOperation('subtract',require(`./Operations/PreciseMath-Subtract.json`));this.addOperation('multiply',require(`./Operations/PreciseMath-Multiply.json`));this.addOperation('divide',require(`./Operations/PreciseMath-Divide.json`));this.addOperation('aggregate',require('./Operations/PreciseMath-Aggregate.json'));this.addOperation('groupvaluesandaggregate',require('./Operations/PreciseMath-GroupValuesAndAggregate.json'));this.addOperation('setprecision',require('./Operations/PreciseMath-SetPrecision.json'));this.addOperation('setroundingmode',require('./Operations/PreciseMath-SetRoundingMode.json'));this.addOperation('tosignificantdigits',require('./Operations/PreciseMath-ToSignificantDigits.json'));this.addOperation('todecimalplaces',require('./Operations/PreciseMath-ToDecimalPlaces.json'));this.addOperation('round',require('./Operations/PreciseMath-Round.json'));return true;}}module.exports=PreciseMath;},{"../Elucidator-InstructionSet.js":29,"./Operations/PreciseMath-Add.json":43,"./Operations/PreciseMath-Aggregate.json":44,"./Operations/PreciseMath-Divide.json":45,"./Operations/PreciseMath-GroupValuesAndAggregate.json":46,"./Operations/PreciseMath-Multiply.json":47,"./Operations/PreciseMath-Round.json":48,"./Operations/PreciseMath-SetPrecision.json":49,"./Operations/PreciseMath-SetRoundingMode.json":50,"./Operations/PreciseMath-Subtract.json":51,"./Operations/PreciseMath-ToDecimalPlaces.json":52,"./Operations/PreciseMath-ToSignificantDigits.json":53,"decimal.js":21}],59:[function(require,module,exports){
let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');const groupValuesBy=pOperation=>{let tmpInputDataSet=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputDataSet');let tmpGroupByProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupByProperty');let tmpGroupValueProperty=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'groupValueProperty');let tmpOutputDataSet={};let tmpObjectType=typeof tmpInputDataSet;if(tmpObjectType=='object'){if(Array.isArray(tmpInputDataSet)){for(let i=0;i<tmpInputDataSet.length;i++){if(typeof tmpInputDataSet[i]!=='object'){pOperation.logInfo(`Element [${i}] was not an object; skipping group operation.`);}else{let tmpValue=tmpInputDataSet[i];let tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo(`Element [${i}] doesn't have the group by property [${tmpGroupByProperty}]; setting group to [__NO_GROUP].`);tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo(`Element [${i}] doesn't have the group value property [${tmpGroupValueProperty}]; skipping group operation.`);}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){
pOperation.logInfo(`Creating a new group [${tmpGroupByValue}] for element [${i}].`);tmpOutputDataSet[tmpGroupByValue]=[];}tmpOutputDataSet[tmpGroupByValue].push(tmpValue[tmpGroupValueProperty]);}}}}else{let tmpObjectKeys=Object.keys(tmpInputDataSet);for(let i=0;i<tmpObjectKeys.length;i++){if(typeof tmpInputDataSet[tmpObjectKeys[i]]!=='object'){pOperation.logInfo(`Element [${i}] was not an object; skipping group operation.`);}else{let tmpValue=tmpInputDataSet[tmpObjectKeys[i]];let tmpGroupByValue=tmpValue[tmpGroupByProperty];if(!tmpValue.hasOwnProperty(tmpGroupByProperty)){pOperation.logInfo(`Element [${tmpObjectKeys[i]}][${i}] doesn't have the group by property [${tmpGroupByProperty}]; setting group to [__NO_GROUP].`);tmpGroupByValue='__NO_GROUP';}if(!tmpValue.hasOwnProperty(tmpGroupValueProperty)){pOperation.logInfo(`Element [${tmpObjectKeys[i]}][${i}] doesn't have the group value property [${tmpGroupValueProperty}]; skipping group operation.`);}else{if(!tmpOutputDataSet.hasOwnProperty(tmpGroupByValue)){
pOperation.logInfo(`Creating a new group [${tmpGroupByValue}] for element [${tmpObjectKeys[i]}][${i}].`);tmpOutputDataSet[tmpGroupByValue]=[];}tmpOutputDataSet[tmpGroupByValue].push(tmpValue[tmpGroupValueProperty]);}}}}}else{pOperation.logError(`Input set is neither an Array nor an Object`);}pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputDataSet',tmpOutputDataSet);return true;};class Set extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='Set';}initializeInstructions(){
super.initializeInstructions();this.addInstruction('groupvaluesby',groupValuesBy);return true;}initializeOperations(){this.addOperation('groupvaluesby',require(`./Operations/Set-GroupValuesBy.json`));return true;}}module.exports=Set;},{"../Elucidator-InstructionSet.js":29,"./Operations/Set-GroupValuesBy.json":54}],60:[function(require,module,exports){
let libElucidatorInstructionSet=require('../Elucidator-InstructionSet.js');let trim=pOperation=>{let tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.trim());return true;};let replace=pOperation=>{let tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');let tmpSearchFor=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'searchFor');let tmpReplaceWith=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'replaceWith');pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.replace(tmpSearchFor,tmpReplaceWith));return true;};let substring=pOperation=>{let tmpInputString=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'inputString');let indexStart=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'indexStart');let indexEnd=pOperation.InputManyfest.getValueByHash(pOperation.InputObject,'indexEnd');if(indexEnd!=null){pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.substring(indexStart,indexEnd));}else{pOperation.OutputManyfest.setValueByHash(pOperation.OutputObject,'outputString',tmpInputString.substring(indexStart));}return true;};class StringOperations extends libElucidatorInstructionSet{constructor(pElucidator){super(pElucidator);this.namespace='String';}initializeInstructions(){this.addInstruction('trim',trim);this.addInstruction('replace',replace);this.addInstruction('substring',substring);return true;}initializeOperations(){this.addOperation('trim',require(`./Operations/String-Trim.json`));this.addOperation('replace',require(`./Operations/String-Replace.json`));this.addOperation('substring',require(`./Operations/String-Substring.json`));return true;}}module.exports=StringOperations;},{"../Elucidator-InstructionSet.js":29,"./Operations/String-Replace.json":55,"./Operations/String-Substring.json":56,"./Operations/String-Trim.json":57}],61:[function(require,module,exports){class BaseLogger{constructor(pLogStreamSettings,pFableLog){
this._Settings=typeof pLogStreamSettings=='object'?pLogStreamSettings:{};
this.loggerUUID=this.generateInsecureUUID();
this.levels=["trace","debug","info","warn","error","fatal"];}
generateInsecureUUID(){let tmpDate=new Date().getTime();let tmpUUID='LOGSTREAM-xxxxxx-yxxxxx'.replace(/[xy]/g,pCharacter=>{
let tmpRandomData=(tmpDate+Math.random()*16)%16|0;tmpDate=Math.floor(tmpDate/16);return(pCharacter=='x'?tmpRandomData:tmpRandomData&0x3|0x8).toString(16);});return tmpUUID;}initialize(){
}trace(pLogText,pLogObject){this.write("trace",pLogText,pLogObject);}debug(pLogText,pLogObject){this.write("debug",pLogText,pLogObject);}info(pLogText,pLogObject){this.write("info",pLogText,pLogObject);}warn(pLogText,pLogObject){this.write("warn",pLogText,pLogObject);}error(pLogText,pLogObject){this.write("error",pLogText,pLogObject);}fatal(pLogText,pLogObject){this.write("fatal",pLogText,pLogObject);}write(pLogLevel,pLogText,pLogObject){
return true;}}module.exports=BaseLogger;},{}],62:[function(require,module,exports){ 
getDefaultProviders=()=>{let tmpDefaultProviders={};tmpDefaultProviders.console=require('./Fable-Log-Logger-Console.js');tmpDefaultProviders.default=tmpDefaultProviders.console;return tmpDefaultProviders;};module.exports=getDefaultProviders();},{"./Fable-Log-Logger-Console.js":64}],63:[function(require,module,exports){module.exports=[{"loggertype":"console","streamtype":"console","level":"trace"}];},{}],64:[function(require,module,exports){let libBaseLogger=require('./Fable-Log-BaseLogger.js');class ConsoleLogger extends libBaseLogger{constructor(pLogStreamSettings,pFableLog){super(pLogStreamSettings);this._ShowTimeStamps=this._Settings.hasOwnProperty('showtimestamps')?this._Settings.showtimestamps==true:true;this._FormattedTimeStamps=this._Settings.hasOwnProperty('formattedtimestamps')?this._Settings.formattedtimestamps==true:true;this._ContextMessage=this._Settings.hasOwnProperty('Context')?`(${this._Settings.Context})`:pFableLog._Settings.hasOwnProperty('Product')?`(${pFableLog._Settings.Product})`:'Unnamed_Log_Context';
this._OutputLogLinesToConsole=this._Settings.hasOwnProperty('outputloglinestoconsole')?this._Settings.outputloglinestoconsole:true;this._OutputObjectsToConsole=this._Settings.hasOwnProperty('outputobjectstoconsole')?this._Settings.outputobjectstoconsole:true;
this.prefixCache={};for(let i=0;i<=this.levels.length;i++){this.prefixCache[this.levels[i]]=`[${this.levels[i]}] ${this._ContextMessage}: `;if(this._ShowTimeStamps){
this.prefixCache[this.levels[i]]=' '+this.prefixCache[this.levels[i]];}}}write(pLevel,pLogText,pObject){let tmpTimeStamp='';if(this._ShowTimeStamps&&this._FormattedTimeStamps){tmpTimeStamp=new Date().toISOString();}else if(this._ShowTimeStamps){tmpTimeStamp=+new Date();}let tmpLogLine=`${tmpTimeStamp}${this.prefixCache[pLevel]}${pLogText}`;if(this._OutputLogLinesToConsole){console.log(tmpLogLine);}
if(this._OutputObjectsToConsole&&typeof pObject!=='undefined'){console.log(JSON.stringify(pObject,null,2));}
return tmpLogLine;}}module.exports=ConsoleLogger;},{"./Fable-Log-BaseLogger.js":61}],65:[function(require,module,exports){const libConsoleLog=require('./Fable-Log-Logger-Console.js');const libFS=require('fs');const libPath=require('path');class SimpleFlatFileLogger extends libConsoleLog{constructor(pLogStreamSettings,pFableLog){super(pLogStreamSettings,pFableLog);
this.logFileRawPath=this._Settings.hasOwnProperty('path')?this._Settings.path:`./${this._ContextMessage}.log`;this.logFilePath=libPath.normalize(this.logFileRawPath);this.logFileStreamOptions=this._Settings.hasOwnProperty('fileStreamoptions')?this._Settings.fileStreamOptions:{"flags":"a","encoding":"utf8"};this.fileWriter=libFS.createWriteStream(this.logFilePath,this.logFileStreamOptions);this.activelyWriting=false;this.logLineStrings=[];this.logObjectStrings=[];this.defaultWriteCompleteCallback=()=>{};this.defaultBufferFlushCallback=()=>{};}closeWriter(fCloseComplete){let tmpCloseComplete=typeof fCloseComplete=='function'?fCloseComplete:()=>{};if(this.fileWriter){this.fileWriter.end('\n');return this.fileWriter.once('finish',tmpCloseComplete.bind(this));}}completeBufferFlushToLogFile(fFlushComplete){this.activelyWriting=false;let tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;if(this.logLineStrings.length>0){this.flushBufferToLogFile(tmpFlushComplete);}else{return tmpFlushComplete();}}flushBufferToLogFile(fFlushComplete){if(!this.activelyWriting){
this.activelyWriting=true;let tmpFlushComplete=typeof fFlushComplete=='function'?fFlushComplete:this.defaultBufferFlushCallback;
let tmpLineStrings=this.logLineStrings;let tmpObjectStrings=this.logObjectStrings;
this.logLineStrings=[];this.logObjectStrings=[];
let tmpConstructedBufferOutputString='';for(let i=0;i<tmpLineStrings.length;i++){
tmpConstructedBufferOutputString+=`${tmpLineStrings[i]}\n`;if(tmpObjectStrings[i]!==false){tmpConstructedBufferOutputString+=`${tmpObjectStrings[i]}\n`;}}if(!this.fileWriter.write(tmpConstructedBufferOutputString,'utf8')){
this.fileWriter.once('drain',this.completeBufferFlushToLogFile.bind(this,tmpFlushComplete));}else{return this.completeBufferFlushToLogFile(tmpFlushComplete);}}}write(pLevel,pLogText,pObject){let tmpLogLine=super.write(pLevel,pLogText,pObject);
this.logLineStrings.push(tmpLogLine);
if(typeof pObject!=='undefined'){this.logObjectStrings.push(JSON.stringify(pObject,null,4));}else{this.logObjectStrings.push(false);}this.flushBufferToLogFile();}}module.exports=SimpleFlatFileLogger;},{"./Fable-Log-Logger-Console.js":64,"fs":16,"path":94}],66:[function(require,module,exports){ class FableLog{constructor(pFableSettings,pFable){let tmpSettings=typeof pFableSettings==='object'?pFableSettings:{};this._Settings=tmpSettings;this._Providers=require('./Fable-Log-DefaultProviders-Node.js');this._StreamDefinitions=tmpSettings.hasOwnProperty('LogStreams')?tmpSettings.LogStreams:require('./Fable-Log-DefaultStreams.json');this.logStreams=[];
this.logProviders={};
this.activeLogStreams={};this.logStreamsTrace=[];this.logStreamsDebug=[];this.logStreamsInfo=[];this.logStreamsWarn=[];this.logStreamsError=[];this.logStreamsFatal=[];this.datumDecorator=pDatum=>pDatum;this.uuid=typeof tmpSettings.Product==='string'?tmpSettings.Product:'Default';}addLogger(pLogger,pLevel){
if(this.activeLogStreams.hasOwnProperty(pLogger.loggerUUID)){return false;}
this.logStreams.push(pLogger);this.activeLogStreams[pLogger.loggerUUID]=true;
switch(pLevel){case'trace':this.logStreamsTrace.push(pLogger);case'debug':this.logStreamsDebug.push(pLogger);case'info':this.logStreamsInfo.push(pLogger);case'warn':this.logStreamsWarn.push(pLogger);case'error':this.logStreamsError.push(pLogger);case'fatal':this.logStreamsFatal.push(pLogger);break;}return true;}setDatumDecorator(fDatumDecorator){if(typeof fDatumDecorator==='function'){this.datumDecorator=fDatumDecorator;}else{this.datumDecorator=pDatum=>pDatum;}}trace(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsTrace.length;i++){this.logStreamsTrace[i].trace(pMessage,tmpDecoratedDatum);}}debug(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsDebug.length;i++){this.logStreamsDebug[i].debug(pMessage,tmpDecoratedDatum);}}info(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsInfo.length;i++){this.logStreamsInfo[i].info(pMessage,tmpDecoratedDatum);}}warn(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsWarn.length;i++){this.logStreamsWarn[i].warn(pMessage,tmpDecoratedDatum);}}error(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsError.length;i++){this.logStreamsError[i].error(pMessage,tmpDecoratedDatum);}}fatal(pMessage,pDatum){const tmpDecoratedDatum=this.datumDecorator(pDatum);for(let i=0;i<this.logStreamsFatal.length;i++){this.logStreamsFatal[i].fatal(pMessage,tmpDecoratedDatum);}}initialize(){
for(let i=0;i<this._StreamDefinitions.length;i++){let tmpStreamDefinition=Object.assign({loggertype:'default',streamtype:'console',level:'info'},this._StreamDefinitions[i]);if(!this._Providers.hasOwnProperty(tmpStreamDefinition.loggertype)){console.log(`Error initializing log stream: bad loggertype in stream definition ${JSON.stringify(tmpStreamDefinition)}`);}else{this.addLogger(new this._Providers[tmpStreamDefinition.loggertype](tmpStreamDefinition,this),tmpStreamDefinition.level);}}
for(let i=0;i<this.logStreams.length;i++){this.logStreams[i].initialize();}}logTime(pMessage,pDatum){let tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time';let tmpTime=new Date();this.info(`${tmpMessage} ${tmpTime} (epoch ${+tmpTime})`,pDatum);}
getTimeStamp(){return+new Date();}getTimeDelta(pTimeStamp){let tmpEndTime=+new Date();return tmpEndTime-pTimeStamp;}
logTimeDelta(pTimeDelta,pMessage,pDatum){let tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';let tmpDatum=typeof pDatum==='object'?pDatum:{};let tmpEndTime=+new Date();this.info(`${tmpMessage} logged at (epoch ${+tmpEndTime}) took (${pTimeDelta}ms)`,pDatum);}logTimeDeltaHuman(pTimeDelta,pMessage,pDatum){let tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';let tmpEndTime=+new Date();let tmpMs=parseInt(pTimeDelta%1000);let tmpSeconds=parseInt(pTimeDelta/1000%60);let tmpMinutes=parseInt(pTimeDelta/(1000*60)%60);let tmpHours=parseInt(pTimeDelta/(1000*60*60));tmpMs=tmpMs<10?"00"+tmpMs:tmpMs<100?"0"+tmpMs:tmpMs;tmpSeconds=tmpSeconds<10?"0"+tmpSeconds:tmpSeconds;tmpMinutes=tmpMinutes<10?"0"+tmpMinutes:tmpMinutes;tmpHours=tmpHours<10?"0"+tmpHours:tmpHours;this.info(`${tmpMessage} logged at (epoch ${+tmpEndTime}) took (${pTimeDelta}ms) or (${tmpHours}:${tmpMinutes}:${tmpSeconds}.${tmpMs})`,pDatum);}logTimeDeltaRelative(pStartTime,pMessage,pDatum){this.logTimeDelta(this.getTimeDelta(pStartTime),pMessage,pDatum);}logTimeDeltaRelativeHuman(pStartTime,pMessage,pDatum){this.logTimeDeltaHuman(this.getTimeDelta(pStartTime),pMessage,pDatum);}}
function autoConstruct(pSettings){return new FableLog(pSettings);}module.exports=FableLog;module.exports.new=autoConstruct;module.exports.LogProviderBase=require('./Fable-Log-BaseLogger.js');module.exports.LogProviderConsole=require('./Fable-Log-Logger-Console.js');module.exports.LogProviderConsole=require('./Fable-Log-Logger-SimpleFlatFile.js');},{"./Fable-Log-BaseLogger.js":61,"./Fable-Log-DefaultProviders-Node.js":62,"./Fable-Log-DefaultStreams.json":63,"./Fable-Log-Logger-Console.js":64,"./Fable-Log-Logger-SimpleFlatFile.js":65}],67:[function(require,module,exports){module.exports={"Product":"ApplicationNameHere","ProductVersion":"0.0.0","ConfigFile":false,"LogStreams":[{"level":"trace"}]};},{}],68:[function(require,module,exports){(function(process){(function(){class FableSettingsTemplateProcessor{constructor(pDependencies){
this.templateProcessor=new pDependencies.precedent();
this.templateProcessor.addPattern('${','}',pTemplateValue=>{let tmpTemplateValue=pTemplateValue.trim();let tmpSeparatorIndex=tmpTemplateValue.indexOf('|');
let tmpDefaultValue=tmpTemplateValue.substring(tmpSeparatorIndex+1);let tmpEnvironmentVariableName=tmpSeparatorIndex>-1?tmpTemplateValue.substring(0,tmpSeparatorIndex):tmpTemplateValue;if(process.env.hasOwnProperty(tmpEnvironmentVariableName)){return process.env[tmpEnvironmentVariableName];}else{return tmpDefaultValue;}});}parseSetting(pString){return this.templateProcessor.parseString(pString);}}module.exports=FableSettingsTemplateProcessor;}).call(this);}).call(this,require('_process'));},{"_process":98}],69:[function(require,module,exports){const libPrecedent=require('precedent');const libFableSettingsTemplateProcessor=require('./Fable-Settings-TemplateProcessor.js');class FableSettings{constructor(pFableSettings){
this.dependencies={precedent:libPrecedent};
this.settingsTemplateProcessor=new libFableSettingsTemplateProcessor(this.dependencies);
this._configureEnvTemplating(pFableSettings);this.default=this.buildDefaultSettings();
let tmpSettings=this.merge(pFableSettings,this.buildDefaultSettings());
this.base=JSON.parse(JSON.stringify(tmpSettings));if(tmpSettings.DefaultConfigFile){try{
tmpSettings=this.merge(require(tmpSettings.DefaultConfigFile),tmpSettings);}catch(pException){
console.log('Fable-Settings Warning: Default configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}if(tmpSettings.ConfigFile){try{
tmpSettings=this.merge(require(tmpSettings.ConfigFile),tmpSettings);}catch(pException){
console.log('Fable-Settings Warning: Configuration file specified but there was a problem loading it.  Falling back to base.');console.log('     Loading Exception: '+pException);}}this.settings=tmpSettings;}
buildDefaultSettings(){return JSON.parse(JSON.stringify(require('./Fable-Settings-Default')));}
_configureEnvTemplating(pSettings){
this._PerformEnvTemplating=!pSettings||pSettings.NoEnvReplacement!==true;}
_resolveEnv(pSettings){for(const tmpKey in pSettings){if(typeof pSettings[tmpKey]==='object'){this._resolveEnv(pSettings[tmpKey]);}else if(typeof pSettings[tmpKey]==='string'){pSettings[tmpKey]=this.settingsTemplateProcessor.parseSetting(pSettings[tmpKey]);}}}_isObject(value){return typeof value==='object'&&!Array.isArray(value);}_deepMergeObjects(toObject,fromObject){if(!fromObject||!this._isObject(fromObject)){return;}Object.keys(fromObject).forEach(key=>{const fromValue=fromObject[key];if(this._isObject(fromValue)){const toValue=toObject[key];if(toValue&&this._isObject(toValue)){
this._deepMergeObjects(toValue,fromValue);return;}}toObject[key]=fromValue;});return toObject;}
merge(pSettingsFrom,pSettingsTo){
let tmpSettingsFrom=typeof pSettingsFrom==='object'?pSettingsFrom:{};
let tmpSettingsTo=typeof pSettingsTo==='object'?pSettingsTo:this.settings;
let tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));tmpSettingsTo=this._deepMergeObjects(tmpSettingsTo,tmpSettingsFromCopy);if(this._PerformEnvTemplating){this._resolveEnv(tmpSettingsTo);}
this._configureEnvTemplating(tmpSettingsTo);return tmpSettingsTo;}
fill(pSettingsFrom){
let tmpSettingsFrom=typeof pSettingsFrom==='object'?pSettingsFrom:{};
let tmpSettingsFromCopy=JSON.parse(JSON.stringify(tmpSettingsFrom));this.settings=this._deepMergeObjects(tmpSettingsFromCopy,this.settings);return this.settings;}};
function autoConstruct(pSettings){return new FableSettings(pSettings);}module.exports=FableSettings;module.exports.new=autoConstruct;module.exports.precedent=libPrecedent;},{"./Fable-Settings-Default":67,"./Fable-Settings-TemplateProcessor.js":68,"precedent":95}],70:[function(require,module,exports){ 
class RandomBytes{constructor(){
this.getRandomValues=typeof crypto!='undefined'&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!='undefined'&&typeof window.msCrypto.getRandomValues=='function'&&msCrypto.getRandomValues.bind(msCrypto);}
generateWhatWGBytes(){let tmpBuffer=new Uint8Array(16);
this.getRandomValues(tmpBuffer);return tmpBuffer;}
generateRandomBytes(){
let tmpBuffer=new Uint8Array(16);
for(let i=0,tmpValue;i<16;i++){if((i&0x03)===0){tmpValue=Math.random()*0x100000000;}tmpBuffer[i]=tmpValue>>>((i&0x03)<<3)&0xff;}return tmpBuffer;}generate(){if(this.getRandomValues){return this.generateWhatWGBytes();}else{return this.generateRandomBytes();}}}module.exports=RandomBytes;},{}],71:[function(require,module,exports){ var libRandomByteGenerator=require('./Fable-UUID-Random.js');class FableUUID{constructor(pSettings){
this._UUIDModeRandom=typeof pSettings==='object'&&pSettings.hasOwnProperty('UUIDModeRandom')?pSettings.UUIDModeRandom==true:false;
this._UUIDLength=typeof pSettings==='object'&&pSettings.hasOwnProperty('UUIDLength')?pSettings.UUIDLength+0:8;
this._UUIDRandomDictionary=typeof pSettings==='object'&&pSettings.hasOwnProperty('UUIDDictionary')?pSettings.UUIDDictionary+0:'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';this.randomByteGenerator=new libRandomByteGenerator();
this._HexLookup=[];for(let i=0;i<256;++i){this._HexLookup[i]=(i+0x100).toString(16).substr(1);}}
bytesToUUID(pBuffer){let i=0;
return[this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],'-',this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]],this._HexLookup[pBuffer[i++]]].join('');}
generateUUIDv4(){let tmpBuffer=new Array(16);var tmpRandomBytes=this.randomByteGenerator.generate();
tmpRandomBytes[6]=tmpRandomBytes[6]&0x0f|0x40;tmpRandomBytes[8]=tmpRandomBytes[8]&0x3f|0x80;return this.bytesToUUID(tmpRandomBytes);}
generateRandom(){let tmpUUID='';for(let i=0;i<this._UUIDLength;i++){tmpUUID+=this._UUIDRandomDictionary.charAt(Math.floor(Math.random()*(this._UUIDRandomDictionary.length-1)));}return tmpUUID;}
getUUID(){if(this._UUIDModeRandom){return this.generateRandom();}else{return this.generateUUIDv4();}}}
function autoConstruct(pSettings){return new FableUUID(pSettings);}module.exports=FableUUID;module.exports.new=autoConstruct;},{"./Fable-UUID-Random.js":70}],72:[function(require,module,exports){const _OperationStatePrototype=JSON.stringify({"Metadata":{"GUID":false,"Hash":false,"Title":"","Summary":"","Version":0},"Status":{"Completed":false,"CompletionProgress":0,"CompletionTimeElapsed":0,"Steps":1,"StepsCompleted":0,"StartTime":0,"EndTime":0},"Errors":[],"Log":[]});class FableOperation{constructor(pFable,pOperationName,pOperationHash){this.fable=pFable;this.name=pOperationName;this.state=JSON.parse(_OperationStatePrototype);this.state.Metadata.GUID=this.fable.getUUID();this.state.Metadata.Hash=this.state.GUID;if(typeof pOperationHash=='string'){this.state.Metadata.Hash=pOperationHash;}}get GUID(){return this.state.Metadata.GUID;}get Hash(){return this.state.Metadata.Hash;}get log(){return this;}writeOperationLog(pLogLevel,pLogText,pLogObject){this.state.Log.push(`${new Date().toUTCString()} [${pLogLevel}]: ${pLogText}`);if(typeof pLogObject=='object'){this.state.Log.push(JSON.stringify(pLogObject));}}writeOperationErrors(pLogText,pLogObject){this.state.Errors.push(`${pLogText}`);if(typeof pLogObject=='object'){this.state.Errors.push(JSON.stringify(pLogObject));}}trace(pLogText,pLogObject){this.writeOperationLog('TRACE',pLogText,pLogObject);this.fable.log.trace(pLogText,pLogObject);}debug(pLogText,pLogObject){this.writeOperationLog('DEBUG',pLogText,pLogObject);this.fable.log.debug(pLogText,pLogObject);}info(pLogText,pLogObject){this.writeOperationLog('INFO',pLogText,pLogObject);this.fable.log.info(pLogText,pLogObject);}warn(pLogText,pLogObject){this.writeOperationLog('WARN',pLogText,pLogObject);this.fable.log.warn(pLogText,pLogObject);}error(pLogText,pLogObject){this.writeOperationLog('ERROR',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.error(pLogText,pLogObject);}fatal(pLogText,pLogObject){this.writeOperationLog('FATAL',pLogText,pLogObject);this.writeOperationErrors(pLogText,pLogObject);this.fable.log.fatal(pLogText,pLogObject);}}module.exports=FableOperation;},{}],73:[function(require,module,exports){const libFableServiceBase=require('./Fable-ServiceProviderBase.js');const libDataArithmatic=require('data-arithmatic');class FableServiceDataArithmatic extends libFableServiceBase{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='DataArithmatic';this._DataArithmaticLibrary=new libDataArithmatic();}}module.exports=FableServiceDataArithmatic;},{"./Fable-ServiceProviderBase.js":78,"data-arithmatic":20}],74:[function(require,module,exports){const libFableServiceBase=require('./Fable-ServiceProviderBase.js');const libPrecedent=require('precedent');class FableServiceMetaTemplate extends libFableServiceBase{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='MetaTemplate';this._MetaTemplateLibrary=new libPrecedent(this.options);}addPattern(pPatternStart,pPatternEnd,pParser){return this._MetaTemplateLibrary.addPattern(pPatternStart,pPatternEnd,pParser);}parseString(pString,pData){return this._MetaTemplateLibrary.parseString(pString,pData);}}module.exports=FableServiceMetaTemplate;},{"./Fable-ServiceProviderBase.js":78,"precedent":95}],75:[function(require,module,exports){const libFableServiceBase=require('./Fable-ServiceProviderBase.js');class FableServiceTemplate extends libFableServiceBase{
constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='Template';
this.Matchers={Evaluate:/<%([\s\S]+?)%>/g,Interpolate:/<%=([\s\S]+?)%>/g,Escaper:/\\|'|\r|\n|\t|\u2028|\u2029/g,Unescaper:/\\(\\|'|r|n|t|u2028|u2029)/g,
GuaranteedNonMatch:/.^/};
this.templateEscapes={'\\':'\\',"'":"'",'r':'\r','\r':'r','n':'\n','\n':'n','t':'\t','\t':'t','u2028':'\u2028','\u2028':'u2028','u2029':'\u2029','\u2029':'u2029'};
this.renderFunction=false;this.templateString=false;}renderTemplate(pData){return this.renderFunction(pData);}templateFunction(pData){let fRenderTemplateBound=this.renderTemplate.bind(this);return fRenderTemplateBound;}buildTemplateFunction(pTemplateText,pData){
this.TemplateSource="__p+='"+pTemplateText.replace(this.Matchers.Escaper,pMatch=>{return`\\${this.templateEscapes[pMatch]}`;}).replace(this.Matchers.Interpolate||this.Matchers.GuaranteedNonMatch,(pMatch,pCode)=>{return`'+\n(${decodeURIComponent(pCode)})+\n'`;}).replace(this.Matchers.Evaluate||this.Matchers.GuaranteedNonMatch,(pMatch,pCode)=>{return`';\n${decodeURIComponent(pCode)}\n;__p+='`;})+`';\n`;this.TemplateSource=`with(pTemplateDataObject||{}){\n${this.TemplateSource}}\n`;this.TemplateSource=`var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n${this.TemplateSource}return __p;\n`;this.renderFunction=new Function('pTemplateDataObject',this.TemplateSource);if(typeof pData!='undefined'){return this.renderFunction(pData);}
this.TemplateSourceCompiled='function(obj){\n'+this.TemplateSource+'}';return this.templateFunction();}}module.exports=FableServiceTemplate;},{"./Fable-ServiceProviderBase.js":78}],76:[function(require,module,exports){const libFableServiceBase=require('./Fable-ServiceProviderBase.js');
const libAsyncWaterfall=require('async.waterfall');const libAsyncEachLimit=require('async.eachlimit');class FableServiceUtility extends libFableServiceBase{
constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.templates={};
this.waterfall=libAsyncWaterfall;this.eachLimit=libAsyncEachLimit;}
extend(pDestinationObject,...pSourceObjects){return Object.assign(pDestinationObject,...pSourceObjects);}
template(pTemplateText,pData){let tmpTemplate=this.fable.serviceManager.instantiateServiceProviderWithoutRegistration('Template');return tmpTemplate.buildTemplateFunction(pTemplateText,pData);}
buildHashedTemplate(pTemplateHash,pTemplateText,pData){let tmpTemplate=this.fable.serviceManager.instantiateServiceProvider('Template',{},pTemplateHash);this.templates[pTemplateHash]=tmpTemplate.buildTemplateFunction(pTemplateText,pData);return this.templates[pTemplateHash];}
chunk(pInput,pChunkSize,pChunkCache){let tmpInputArray=[...pInput];
let tmpChunkSize=typeof pChunkSize=='number'?pChunkSize:0;let tmpChunkCache=typeof pChunkCache!='undefined'?pChunkCache:[];if(tmpChunkSize<=0){return tmpChunkCache;}while(tmpInputArray.length){tmpChunkCache.push(tmpInputArray.splice(0,tmpChunkSize));}return tmpChunkCache;}}module.exports=FableServiceUtility;},{"./Fable-ServiceProviderBase.js":78,"async.eachlimit":1,"async.waterfall":15}],77:[function(require,module,exports){const libFableServiceBase=require('./Fable-ServiceProviderBase.js');class FableService{constructor(pFable){this.fable=pFable;this.serviceTypes=[];
this.services={};
this.defaultServices={};
this.serviceClasses={};}addServiceType(pServiceType,pServiceClass){
this.serviceTypes.push(pServiceType);
this.services[pServiceType]={};if(typeof pServiceClass=='function'&&pServiceClass.prototype instanceof libFableServiceBase){
this.serviceClasses[pServiceType]=pServiceClass;}else{
this.serviceClasses[pServiceType]=libFableServiceBase;}}instantiateServiceProvider(pServiceType,pOptions,pCustomServiceHash){
let tmpService=this.instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash);
this.services[pServiceType][tmpService.Hash]=tmpService;
if(!this.defaultServices.hasOwnProperty(pServiceType)){this.defaultServices[pServiceType]=tmpService;}return tmpService;}
instantiateServiceProviderWithoutRegistration(pServiceType,pOptions,pCustomServiceHash){
let tmpService=new this.serviceClasses[pServiceType](this.fable,pOptions,pCustomServiceHash);return tmpService;}setDefaultServiceInstantiation(pServiceType,pServiceHash){if(this.services[pServiceType].hasOwnProperty(pServiceHash)){this.defaultServices[pServiceType]=this.services[pServiceType][pServiceHash];return true;}return false;}}module.exports=FableService;module.exports.ServiceProviderBase=libFableServiceBase;},{"./Fable-ServiceProviderBase.js":78}],78:[function(require,module,exports){class FableServiceProviderBase{constructor(pFable,pOptions,pServiceHash){this.fable=pFable;this.options=typeof pOptions==='object'?pOptions:{};this.serviceType='Unknown';this.UUID=pFable.getUUID();this.Hash=typeof pServiceHash==='string'?pServiceHash:`${this.UUID}`;}}module.exports=FableServiceProviderBase;},{}],79:[function(require,module,exports){const libFableSettings=require('fable-settings');const libFableUUID=require('fable-uuid');const libFableLog=require('fable-log');const libFableServiceManager=require('./Fable-ServiceManager.js');const libFableServiceDataArithmatic=require('./Fable-Service-DataArithmatic.js');const libFableServiceTemplate=require('./Fable-Service-Template.js');const libFableServiceMetaTemplate=require('./Fable-Service-MetaTemplate.js');const libFableServiceUtility=require('./Fable-Service-Utility.js');const libFableOperation=require('./Fable-Operation.js');class Fable{constructor(pSettings){let tmpSettings=new libFableSettings(pSettings);this.settingsManager=tmpSettings;
this.libUUID=new libFableUUID(this.settingsManager.settings);this.log=new libFableLog(this.settingsManager.settings);this.log.initialize();
this.Dependencies={precedent:libFableSettings.precedent};
this.Operations={};this.serviceManager=new libFableServiceManager(this);
this.serviceManager.addServiceType('DataArithmatic',libFableServiceDataArithmatic);this.fable.serviceManager.instantiateServiceProvider('DataArithmatic',{},'Default-Service-DataArithmatic');
this.DataArithmatic=this.serviceManager.defaultServices.DataArithmatic._DataArithmaticLibrary;
this.serviceManager.addServiceType('Template',libFableServiceTemplate);
this.serviceManager.addServiceType('MetaTemplate',libFableServiceMetaTemplate);
this.serviceManager.addServiceType('Utility',libFableServiceUtility);this.fable.serviceManager.instantiateServiceProvider('Utility',{},'Default-Service-Utility');this.Utility=this.serviceManager.defaultServices.Utility;this.services=this.serviceManager.services;this.defaultServices=this.serviceManager.defaultServices;}get settings(){return this.settingsManager.settings;}get fable(){return this;}getUUID(){return this.libUUID.getUUID();}createOperation(pOperationName,pOperationHash){let tmpOperation=new libFableOperation(this,pOperationName,pOperationHash);if(this.Operations.hasOwnProperty(tmpOperation.Hash)){
}else{this.Operations[tmpOperation.Hash]=tmpOperation;}return tmpOperation;}getOperation(pOperationHash){if(!this.Operations.hasOwnProperty(pOperationHash)){return false;}else{return this.Operations[pOperationHash];}}}
function autoConstruct(pSettings){return new Fable(pSettings);}module.exports=Fable;module.exports.new=autoConstruct;module.exports.LogProviderBase=libFableLog.LogProviderBase;module.exports.ServiceProviderBase=libFableServiceManager.ServiceProviderBase;module.exports.precedent=libFableSettings.precedent;},{"./Fable-Operation.js":72,"./Fable-Service-DataArithmatic.js":73,"./Fable-Service-MetaTemplate.js":74,"./Fable-Service-Template.js":75,"./Fable-Service-Utility.js":76,"./Fable-ServiceManager.js":77,"fable-log":66,"fable-settings":69,"fable-uuid":71}],80:[function(require,module,exports){ class InformaryLog{constructor(pSettings){this._Settings=pSettings;}writeConsole(pLevel,pMessage,pObject){
console.log('['+pLevel+'] ('+this._Settings.Form+') '+pMessage);
if(typeof pObject!=='undefined'){console.log(JSON.stringify(pObject,null,4));}}trace(pMessage,pObject){this.writeConsole('TRACE',pMessage,pObject);}debug(pMessage,pObject){this.writeConsole('DEBUG',pMessage,pObject);}info(pMessage,pObject){this.writeConsole('INFO',pMessage,pObject);}warning(pMessage,pObject){this.writeConsole('WARNING',pMessage,pObject);}error(pMessage,pObject){this.writeConsole('ERROR',pMessage,pObject);}
logTime(pMessage){let tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time';let tmpDate=new Date();this.info(tmpMessage+': '+tmpDate.toString());}
getTimeStamp(){return+new Date();}getTimeDelta(pTimeStamp){let tmpEndTime=+new Date();return tmpEndTime-pTimeStamp;}
logTimeDelta(pTimeStamp,pMessage){let tmpMessage=typeof pMessage!=='undefined'?pMessage:'Time Measurement';let tmpEndTime=+new Date();let tmpOperationTime=tmpEndTime-pTimeStamp;this.info(tmpMessage+' ('+tmpOperationTime+'ms)');}}module.exports=InformaryLog;},{}],81:[function(require,module,exports){let libObjectDiff=require('deep-object-diff');let libCacheTraxx=require('cachetrax');class Informary{constructor(pSettings,pContext,pContextGUID){this._Dependencies={};this._Dependencies.jqueryLibrary=require('jquery');
this._NonHTMLState={};this._NonHTMLStateProperty=`__InformaryNonHTMLState`;this._Settings=typeof pSettings==='object'?pSettings:{
Form:'UNSET_HTML_FORM_ID',User:0,
UndoLevels:25,
DebugLog:false};if(this._Settings.__VirtualDOM){
this._Dependencies.jquery=this._Dependencies.jqueryLibrary(this._Settings.__VirtualDOM);}else{this._Dependencies.jquery=this._Dependencies.jqueryLibrary;}if(!this._Settings.User){
this._Settings.User=0;}if(!this._Settings.Form){this._Settings.Form='UNSET_HTML_FORM_ID';}
this._Log=new(require('./Informary-Log.js'))(this._Settings);this.log=this._Log;
this._LocalStorage=null;this._UndoKeys=[];this._UndoBuffer=new libCacheTraxx();
this._UndoBuffer.maxLength=this._Settings.UndoLevels?this._Settings.UndoLevels:25;this._RedoKeys=[];this._RedoBuffer=new libCacheTraxx();this._RedoBuffer.maxLength=this._UndoBuffer.maxLength;
this._SourceDocumentState=false;
this._CurrentDocumentState=false;
this._Context=pContext?pContext.toString():'InformaryDefaultContext';this._ContextGUID=pContextGUID?pContextGUID.toString():'0x000000001';}setStorageProvider(pStorageProvider){this._LocalStorage=pStorageProvider;}checkStorageProvider(){
if(!this._LocalStorage){this._LocalStorage=window.localStorage;if(!this._LocalStorage){const cache={};this._LocalStorage={setItem:(key,value)=>{cache[key]=value;},getItem:key=>{return cache[key];},removeItem:key=>{delete cache[key];}};}}}getIndexKey(pValueType){return`Informary_Index_User[${this._Settings.User.toString()}]_ValueType[${pValueType}]`;}getStorageKey(pValueType){return`Informary_Data_User[${this._Settings.User.toString()}]_ValueType[${pValueType}]_Context[${this._Context}]_ContextGUID[${this._ContextGUID}]`;}
readIndex(pValueType){this.checkStorageProvider();let tmpIndex=false;let tmpData=this._LocalStorage.getItem(this.getIndexKey(pValueType));if(tmpData){try{tmpIndex=JSON.parse(tmpData);}catch(pError){this.log.error(`Error parsing local storage index key [${this.getIndexKey(pValueType)}]`);}}if(!tmpIndex){tmpIndex={IndexCreateTime:Date.now(),IndexUser:this._Settings.User};}tmpIndex.IndexLastReadTime=Date.now();return tmpIndex;}
readIndexValue(pValueType){let tmpIndex=this.readIndex(pValueType);let tmpIndexKeyValue=tmpIndex[this.getStorageKey(pValueType)];
return tmpIndexKeyValue?tmpIndexKeyValue:false;}
touchIndex(pValueType){this.checkStorageProvider();let tmpIndex=this.readIndex(pValueType);let tmpKey=this.getStorageKey(pValueType);tmpIndex[tmpKey]={Time:Date.now(),ValueType:pValueType,User:this._Settings.User,Context:this._Context,ContextGUID:this._ContextGUID};
this._LocalStorage.setItem(this.getIndexKey(pValueType),JSON.stringify(tmpIndex));}readData(pValueType){
this.checkStorageProvider();let tmpData=this._LocalStorage.getItem(this.getStorageKey(pValueType));if(tmpData){try{tmpData=JSON.parse(tmpData);}catch(pError){this.log.error(`Error parsing local storage key [${this.getStorageKey(pValueType)}]`);tmpData=false;}}else{tmpData=false;}return tmpData;}writeData(pValueType,pData){
this.checkStorageProvider();
this.touchIndex(pValueType);
this._LocalStorage.setItem(this.getStorageKey(pValueType),JSON.stringify(pData));}deleteData(pValueType){
this.checkStorageProvider();
this.touchIndex(pValueType);
this._LocalStorage.removeItem(this.getStorageKey(pValueType));}getValueAtAddress(pObject,pAddress){
if(!typeof pObject==='object')return false;
if(!typeof pAddress==='string')return false;let tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex===-1){
return pObject[pAddress];}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress);}else{
pObject[tmpSubObjectName]={};return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress);}}}setValueAtAddress(pObject,pAddress,pValue){
if(!typeof pObject==='object')return false;
if(!typeof pAddress==='string')return false;let tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex===-1){
pObject[pAddress]=pValue;return true;}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){if(!pObject.hasOwnProperty('__ERROR'))pObject['__ERROR']={};
pObject['__ERROR'][pAddress]=pValue;return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}else{
pObject[tmpSubObjectName]={};return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}}}setValueAtAddressInContainer(pRecordObject,pFormContainerAddress,pFormContainerIndex,pFormValueAddress,pFormValue){
let tmpContainerObject=this.getValueAtAddress(pRecordObject,pFormContainerAddress);if(typeof pFormContainerAddress!=='string')return false;let tmpFormContainerIndex=parseInt(pFormContainerIndex,10);if(isNaN(tmpFormContainerIndex))return false;if(typeof tmpContainerObject!=='object'||!Array.isArray(tmpContainerObject)){
tmpContainerObject=[];this.setValueAtAddress(pRecordObject,pFormContainerAddress,tmpContainerObject);}for(let i=0;tmpContainerObject.length+i<=tmpFormContainerIndex+1;i++){
tmpContainerObject.push({});}
return this.setValueAtAddress(tmpContainerObject[tmpFormContainerIndex],pFormValueAddress,pFormValue);}
storeSourceData(pData){return this.writeData('Source',pData);}
storeRecoveryData(fCallback){let tmpCallback=typeof fCallback=='function'?fCallback:()=>{};let tmpRecoveryData={};this.marshalFormToData(tmpRecoveryData,()=>{this._RecoveryDocumentState=tmpRecoveryData;return tmpCallback(this.writeData('Recovery',this._RecoveryDocumentState));});}snapshotData(){let tmpNewUndoKey=Date.now().toString();
let tmpOldRecoveryState=JSON.stringify(this._RecoveryDocumentState);this.storeRecoveryData(()=>{if(tmpOldRecoveryState!=JSON.stringify(this._RecoveryDocumentState)){if(this._Settings.DebugLog){this.log.debug(`Creating recovery snapshot at [${tmpNewUndoKey}]...`);}
while(this._RedoKeys.length>0){let tmpRedoKey=this._RedoKeys.pop();this._RedoBuffer.expire(tmpRedoKey);}this._UndoKeys.push(tmpNewUndoKey);this._UndoBuffer.put(this._RecoveryDocumentState,tmpNewUndoKey);}else{if(this._Settings.DebugLog){this.log.debug(`Skipped creating recovery snapshot at [${tmpNewUndoKey}] because there were no changes to the recovery state...`);}}});}snapshotDataInitial(){let tmpNewUndoKey=Date.now().toString();if(this._UndoKeys.length>0){this.log.info(`Skipping creation of initial snapshot because one already exists.`);return false;}this.storeRecoveryData(()=>{if(this._Settings.DebugLog){this.log.debug(`Creating recovery snapshot at [${tmpNewUndoKey}]...`);}this._UndoKeys.push(tmpNewUndoKey);this._UndoBuffer.put(this._RecoveryDocumentState,tmpNewUndoKey);});return true;}undoSnapshotCount(){
return this._UndoKeys.length;}redoSnapshotCount(){return this._RedoKeys.length;}revertToPreviousSnapshot(fCallback){let tmpCallback=typeof fCallback=='function'?fCallback:()=>{};if(this._UndoKeys.length<1){this.log.info(`Not enough undo snapshots; skipping undo.`);return tmpCallback(false);}let tmpSnapshotKey=this._UndoKeys.pop();let tmpSnapshotData=this._UndoBuffer.read(tmpSnapshotKey);if(tmpSnapshotData){
this._RedoKeys.push(tmpSnapshotKey);this._RedoBuffer.put(tmpSnapshotData,tmpSnapshotKey);
let tmpCurrentFormData={};this.marshalFormToData(tmpCurrentFormData,()=>{
this._UndoBuffer.expire(tmpSnapshotKey);this.marshalDataToForm(tmpSnapshotData,()=>{this._RecoveryDocumentState=tmpSnapshotData;this.log.info(`Informary reverted to snapshot ID ${tmpSnapshotKey}`);if(JSON.stringify(tmpCurrentFormData)==JSON.stringify(tmpSnapshotData)&&this._UndoKeys.length>0){return this.revertToPreviousSnapshot(tmpCallback);}if(this._UndoKeys.length==0){this.log.info(`Snapshot Data Depleted -- Creating Extra Undo Snapshot`);this.snapshotDataInitial();}return tmpCallback(true);});});}return tmpCallback(false);}reapplyNextRevertedSnapshot(fCallback){let tmpCallback=typeof fCallback=='function'?fCallback:()=>{};let tmpSnapshotKey=this._RedoKeys.pop();let tmpSnapshotData=this._RedoBuffer.read(tmpSnapshotKey);if(tmpSnapshotData){
this._UndoKeys.push(tmpSnapshotKey);this._UndoBuffer.put(tmpSnapshotData,tmpSnapshotKey);
this._RedoBuffer.expire(tmpSnapshotKey);
let tmpCurrentFormData={};this.marshalFormToData(tmpCurrentFormData,()=>{this.marshalDataToForm(tmpSnapshotData,()=>{this._RecoveryDocumentState=tmpSnapshotData;this.log.info(`Informary reapplied snapshot ID ${tmpSnapshotKey}`);if(JSON.stringify(tmpCurrentFormData)==JSON.stringify(tmpSnapshotData)&&this._RedoKeys.length>0){
return this.reapplyNextRevertedSnapshot(tmpCallback);}return tmpCallback(true);});});}return tmpCallback(false);}clearRecoveryData(){return this.deleteData('Recovery');}readRecoveryData(){return this.readData('Recovery');}restoreRecoveryScenarioData(fCallback){let tmpCallback=typeof fCallback=='function'?fCallback:()=>{};let tmpRecoveryScenarioData=this.readRecoveryScenario();if(tmpRecoveryScenarioData&&tmpRecoveryScenarioData.ExistingRecovery){this.marshalDataToForm(tmpRecoveryScenarioData.ExistingRecovery,()=>{this.clearRecoveryScenarioData();
return tmpCallback(true);});}return tmpCallback(false);}clearRecoveryScenarioData(){return this.deleteData('RecoveryScenario');}storeRecoveryScenarioData(pRecoveryScenarioData){return this.writeData('RecoveryScenario',pRecoveryScenarioData);}readRecoveryScenario(){return this.readData('RecoveryScenario');}
checkRecoveryState(pSourceData){let tmpRecoveryData={NewSource:pSourceData,ExistingSource:this.readData('Source'),ExistingRecovery:this.readData('Recovery')};if(!tmpRecoveryData.ExistingSource||!tmpRecoveryData.ExistingRecovery){
return false;}else{
let tmpRecoveryDifferences=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingSource,tmpRecoveryData.ExistingRecovery);if(JSON.stringify(tmpRecoveryDifferences)==JSON.stringify(libObjectDiff.detailedDiff({},{}))){
return false;}else{this._Log.info(`Informary found recovery data at ${this.getStorageKey('Recovery')}!`);
tmpRecoveryData.Diffs={};tmpRecoveryData.Diffs.ExistingRecovery_ExistingSource=tmpRecoveryDifferences;tmpRecoveryData.Diffs.ExistingSource_NewSource=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingSource,tmpRecoveryData.NewSource);tmpRecoveryData.Diffs.ExistingRecovery_NewSource=libObjectDiff.detailedDiff(tmpRecoveryData.ExistingRecovery,tmpRecoveryData.NewSource);
tmpRecoveryData.Index={};tmpRecoveryData.Index.ExistingSource=this.readIndexValue('Source');tmpRecoveryData.Index.ExistingRecovery=this.readIndexValue('Recovery');this.writeData('RecoveryScenario',tmpRecoveryData);return tmpRecoveryData;}}}compareCurrentStateToUndoAndRedo(fCallback){let tmpCallBack=typeof fCallback==='function'?fCallback:()=>{};let tmpCurrentStateData={};let tmpCurrentUndoObject={};let tmpCurrentRedoObject={};this.marshalFormToData(tmpCurrentStateData,()=>{let tmpCurrentStateDataJSON=JSON.stringify(tmpCurrentStateData);if(this._UndoKeys.length>0){let tmpCurrentUndoBufferSnapshotKey=this._UndoKeys[this._UndoKeys.length-1];tmpCurrentUndoObject=this._UndoBuffer.read(tmpCurrentUndoBufferSnapshotKey);}if(this._RedoKeys.length>0){
let tmpFirstRedoIndexWithDifferences=this._RedoKeys.length-1;for(let i=this._RedoKeys.length-1;i>=0;i--){let tmpRedoComparisonJSON=JSON.stringify(this._RedoBuffer.read(this._RedoKeys[i]));if(tmpRedoComparisonJSON!=tmpCurrentStateDataJSON){tmpFirstRedoIndexWithDifferences=i;
break;}}tmpCurrentRedoObject=this._RedoBuffer.read(this._RedoKeys[tmpFirstRedoIndexWithDifferences]);}let tmpComparisonData={UndoDelta:libObjectDiff.detailedDiff(tmpCurrentStateData,tmpCurrentUndoObject),UndoGUIDDelta:{Added:[],Deleted:[]},RedoDelta:libObjectDiff.detailedDiff(tmpCurrentStateData,tmpCurrentRedoObject),RedoGUIDDelta:{Added:[],Deleted:[]}};
let tmpCurrentGUIDElements=[];let tmpCurrentDataIndex=0;if(tmpCurrentStateData.hasOwnProperty('__GUID')){tmpCurrentGUIDElements=Object.keys(tmpCurrentStateData.__GUID).sort();}
let tmpUndoGUIDElements=[];if(tmpCurrentUndoObject.hasOwnProperty('__GUID')){tmpUndoGUIDElements=Object.keys(tmpCurrentUndoObject.__GUID).sort();}let tmpUndoDataIndex=0;let tmpUndoDataMaxIndex=tmpUndoGUIDElements.length-1;for(tmpCurrentDataIndex=0;tmpCurrentDataIndex<tmpCurrentGUIDElements.length;tmpCurrentDataIndex++){while(tmpUndoDataIndex<=tmpUndoDataMaxIndex&&tmpUndoGUIDElements[tmpUndoDataIndex]!=tmpCurrentGUIDElements[tmpCurrentDataIndex]){
if(tmpUndoGUIDElements[tmpUndoDataIndex]<tmpCurrentGUIDElements[tmpCurrentDataIndex]){tmpComparisonData.UndoGUIDDelta.Added.push(tmpUndoGUIDElements[tmpUndoDataIndex]);tmpUndoDataIndex++;}else{
break;}}if(tmpUndoDataIndex<=tmpUndoDataMaxIndex&&tmpUndoGUIDElements[tmpUndoDataIndex]==tmpCurrentGUIDElements[tmpCurrentDataIndex]){
tmpUndoDataIndex++;}else{tmpComparisonData.UndoGUIDDelta.Deleted.push(tmpCurrentGUIDElements[tmpCurrentDataIndex]);}}
for(let i=tmpUndoDataIndex;i<=tmpUndoDataMaxIndex;i++){tmpComparisonData.UndoGUIDDelta.Added.push(tmpUndoGUIDElements[i]);}
let tmpRedoGUIDElements=[];if(tmpCurrentRedoObject.hasOwnProperty('__GUID')){tmpRedoGUIDElements=Object.keys(tmpCurrentRedoObject.__GUID).sort();}let tmpRedoDataIndex=0;let tmpRedoDataMaxIndex=tmpRedoGUIDElements.length-1;for(tmpCurrentDataIndex=0;tmpCurrentDataIndex<tmpCurrentGUIDElements.length;tmpCurrentDataIndex++){while(tmpRedoDataIndex<=tmpRedoDataMaxIndex&&tmpRedoGUIDElements[tmpRedoDataIndex]!=tmpCurrentGUIDElements[tmpCurrentDataIndex]){
if(tmpRedoGUIDElements[tmpRedoDataIndex]<tmpCurrentGUIDElements[tmpCurrentDataIndex]){tmpComparisonData.RedoGUIDDelta.Added.push(tmpRedoGUIDElements[tmpRedoDataIndex]);tmpRedoDataIndex++;}else{
break;}}if(tmpRedoDataIndex<=tmpRedoDataMaxIndex&&tmpRedoGUIDElements[tmpRedoDataIndex]==tmpCurrentGUIDElements[tmpCurrentDataIndex]){
tmpRedoDataIndex++;}else{tmpComparisonData.RedoGUIDDelta.Deleted.push(tmpCurrentGUIDElements[tmpCurrentDataIndex]);}}
for(let i=tmpRedoDataIndex;i<=tmpRedoDataMaxIndex;i++){tmpComparisonData.RedoGUIDDelta.Added.push(tmpRedoGUIDElements[i]);}tmpCallBack(tmpComparisonData);});}createArrayContainers(pRecordObject,fCallback,pArrayPropertyAddress){
if(this._Settings.DebugLog){this.log.debug(`Informary Data->Form marshalling recursive entry...`);}}get nonFormData(){return this._NonHTMLState;}marshalDataToForm(pRecordObject,fCallback,pParentPropertyAddress,pContainerPropertyAddress,pContainerIndex){
let tmpRecoveryState=false;if(this._Settings.DebugLog){this.log.debug(`Informary Data->Form marshalling recursive entry...`);}
if(typeof pRecordObject!=='object'){this.log.error('Invalid record object passed in!');return fCallback('Invalid record object passed in!');}if(pRecordObject===null){return fCallback();}if(pRecordObject===undefined){return fCallback();}let tmpParentPropertyAddress=typeof pParentPropertyAddress!=='undefined'?pParentPropertyAddress:false;let tmpParentPropertyAddressString=typeof pParentPropertyAddress!=='undefined'?pParentPropertyAddress:'JSON OBJECT ROOT';let tmpContainerPropertyAddress=typeof pContainerPropertyAddress!=='undefined'?pContainerPropertyAddress:false;let tmpContainerPropertyIndex=typeof pContainerIndex!=='undefined'?pContainerIndex:false;if(this._Settings.DebugLog){this.log.debug(`Informary Data->Form found parent address [${tmpParentPropertyAddress}] and is parsing properties`);}if(tmpParentPropertyAddressString=='JSON OBJECT ROOT'){
if(pRecordObject.hasOwnProperty(this._NonHTMLStateProperty)&&typeof pRecordObject[this._NonHTMLStateProperty]==='object'){
this._NonHTMLState=pRecordObject[this._NonHTMLStateProperty];}}let tmpRecordObjectKeys=Object.keys(pRecordObject);tmpRecordObjectKeys.forEach(pKey=>{let tmpRecord=pRecordObject[pKey];let tmpPropertyAddress=tmpParentPropertyAddress.length>0?`${pParentPropertyAddress}.${pKey}`:pKey;if(this._Settings.DebugLog){this.log.debug(`Informary Data->Form parent address [${tmpParentPropertyAddressString}] parsing property [${tmpPropertyAddress}]`);}switch(typeof tmpRecord){
case'object':
if(Array.isArray(tmpRecord)){for(let i=0;i<tmpRecord.length;i++){
this.marshalDataToForm(tmpRecord[i],()=>{},undefined,tmpPropertyAddress,i.toString());}}else{
return this.marshalDataToForm(tmpRecord,()=>{},tmpPropertyAddress,tmpContainerPropertyAddress,tmpContainerPropertyIndex.toString());}break;
case'undefined':break;
default:let tmpFormElement=[];if(tmpContainerPropertyAddress&&tmpContainerPropertyIndex){
tmpFormElement=this._Dependencies.jquery(`
								input[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"][data-i-container="${tmpContainerPropertyAddress}"][data-i-index="${tmpContainerPropertyIndex}"],
								select[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"][data-i-container="${tmpContainerPropertyAddress}"][data-i-index="${tmpContainerPropertyIndex}"],
								textarea[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"][data-i-container="${tmpContainerPropertyAddress}"][data-i-index="${tmpContainerPropertyIndex}"]
							`);}else{tmpFormElement=this._Dependencies.jquery(`
								input[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"],
								select[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"],
								textarea[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"]
							`);}if(tmpFormElement.length>0){
if(this._Dependencies.jquery(tmpFormElement)[0].tagName==='TEXTAREA'){this._Dependencies.jquery(tmpFormElement)[0].textContent=tmpRecord;
}else if(this._Dependencies.jquery(tmpFormElement)[0].tagName==='SELECT'){this._Dependencies.jquery(`select[data-i-form="${this._Settings.Form}"][data-i-datum="${tmpPropertyAddress}"] option[value="${tmpRecord}"]`).prop('selected',true);
}else{this._Dependencies.jquery(tmpFormElement).val(tmpRecord);}
var tmpGUIDAttribute=this._Dependencies.jquery(this).attr('data-i-guid');
if(typeof tmpGUIDAttribute!=='undefined'&&tmpGUIDAttribute!==false){this._Dependencies.jquery(tmpFormElement).attr('data-i-guid',tmpRecord);}}break;}});if(!pParentPropertyAddress){return fCallback(tmpRecoveryState);}else{return fCallback();}}marshalFormToData(pRecordObject,fCallback){if(this._Settings.DebugLog){this.log.debug(`Informary Form->Data marshalling recursive entry...`);}
if(typeof pRecordObject!=='object'){this.log.error('Invalid record object passed in!  Informary needs a Javascript object to put values into.');return fCallback('Invalid record object passed in!  Informary needs a Javascript object to put values into.');}let tmpFormValueElements=this._Dependencies.jquery(`
				input[data-i-form=${this._Settings.Form}],
				select[data-i-form=${this._Settings.Form}],
				textarea[data-i-form=${this._Settings.Form}]
			`);let tmpUnknownValueIndex=0;
pRecordObject[this._NonHTMLStateProperty]=this._NonHTMLState;this._Dependencies.jquery.each(tmpFormValueElements,(pRecordIndex,pRecordAddress)=>{let tmpFormValueAddress=this._Dependencies.jquery(pRecordAddress).attr('data-i-datum');let tmpFormContainerAddress=this._Dependencies.jquery(pRecordAddress).attr('data-i-container');let tmpFormContainerIndex=this._Dependencies.jquery(pRecordAddress).attr('data-i-index');let tmpFormContainerGUID=this._Dependencies.jquery(pRecordAddress).attr('data-i-guid');let tmpFormValue;
if(this._Dependencies.jquery(pRecordAddress).tagName==='TEXTAREA'){tmpFormValue=this._Dependencies.jquery(pRecordAddress).textContent;}else{tmpFormValue=this._Dependencies.jquery(pRecordAddress).val();}
if(typeof tmpFormValue==='undefined'){tmpFormValue=null;}if(typeof tmpFormValueAddress==='undefined'){tmpFormValueAddress='__ERROR.UnsetDatum.'+tmpUnknownValueIndex;tmpUnknownValueIndex++;}if(tmpFormContainerGUID){let tmpGUIDValueAddress='__GUID.'+tmpFormContainerGUID;this.setValueAtAddress(pRecordObject,tmpGUIDValueAddress,tmpFormContainerGUID);}if(tmpFormContainerAddress&&tmpFormContainerIndex){this.setValueAtAddressInContainer(pRecordObject,tmpFormContainerAddress,tmpFormContainerIndex,tmpFormValueAddress,tmpFormValue);}else{this.setValueAtAddress(pRecordObject,tmpFormValueAddress,tmpFormValue);}});return fCallback();}};module.exports=Informary;},{"./Informary-Log.js":80,"cachetrax":17,"deep-object-diff":26,"jquery":82}],82:[function(require,module,exports){(function(global,factory){"use strict";if(typeof module==="object"&&typeof module.exports==="object"){
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else{factory(global);}
})(typeof window!=="undefined"?window:this,function(window,noGlobal){
"use strict";var arr=[];var getProto=Object.getPrototypeOf;var slice=arr.slice;var flat=arr.flat?function(array){return arr.flat.call(array);}:function(array){return arr.concat.apply([],array);};var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var fnToString=hasOwn.toString;var ObjectFunctionString=fnToString.call(Object);var support={};var isFunction=function isFunction(obj){
return typeof obj==="function"&&typeof obj.nodeType!=="number"&&typeof obj.item!=="function";};var isWindow=function isWindow(obj){return obj!=null&&obj===obj.window;};var document=window.document;var preservedScriptAttributes={type:true,src:true,nonce:true,noModule:true};function DOMEval(code,node,doc){doc=doc||document;var i,val,script=doc.createElement("script");script.text=code;if(node){for(i in preservedScriptAttributes){
val=node[i]||node.getAttribute&&node.getAttribute(i);if(val){script.setAttribute(i,val);}}}doc.head.appendChild(script).parentNode.removeChild(script);}function toType(obj){if(obj==null){return obj+"";}
return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj;} 
var version="3.6.4",
jQuery=function(selector,context){
return new jQuery.fn.init(selector,context);};jQuery.fn=jQuery.prototype={
jquery:version,constructor:jQuery,
length:0,toArray:function(){return slice.call(this);},
get:function(num){
if(num==null){return slice.call(this);}
return num<0?this[num+this.length]:this[num];},
pushStack:function(elems){
var ret=jQuery.merge(this.constructor(),elems);
ret.prevObject=this;
return ret;},
each:function(callback){return jQuery.each(this,callback);},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function(){return this.pushStack(slice.apply(this,arguments));},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},even:function(){return this.pushStack(jQuery.grep(this,function(_elem,i){return(i+1)%2;}));},odd:function(){return this.pushStack(jQuery.grep(this,function(_elem,i){return i%2;}));},eq:function(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function(){return this.prevObject||this.constructor();},
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;
if(typeof target==="boolean"){deep=target;
target=arguments[i]||{};i++;}
if(typeof target!=="object"&&!isFunction(target)){target={};}
if(i===length){target=this;i--;}for(;i<length;i++){
if((options=arguments[i])!=null){
for(name in options){copy=options[name];
if(name==="__proto__"||target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=Array.isArray(copy)))){src=target[name];
if(copyIsArray&&!Array.isArray(src)){clone=[];}else if(!copyIsArray&&!jQuery.isPlainObject(src)){clone={};}else{clone=src;}copyIsArray=false;
target[name]=jQuery.extend(deep,clone,copy);
}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),
isReady:true,error:function(msg){throw new Error(msg);},noop:function(){},isPlainObject:function(obj){var proto,Ctor;
if(!obj||toString.call(obj)!=="[object Object]"){return false;}proto=getProto(obj);
if(!proto){return true;}
Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString;},isEmptyObject:function(obj){var name;for(name in obj){return false;}return true;},
globalEval:function(code,options,doc){DOMEval(code,{nonce:options&&options.nonce},doc);},each:function(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;},
makeArray:function(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else{push.call(ret,arr);}}return ret;},inArray:function(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},
merge:function(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;},
map:function(elems,callback,arg){var length,value,i=0,ret=[];
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}
}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}}
return flat(ret);},
guid:1,
support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];}
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(_i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){
var length=!!obj&&"length"in obj&&obj.length,type=toType(obj);if(isFunction(obj)||isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle=function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate,
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),nonnativeSelectorCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true;}return 0;},
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,pushNative=arr.push,push=arr.push,slice=arr.slice,
indexOf=function(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|"+"ismap|loop|multiple|open|readonly|required|scoped",
whitespace="[\\x20\\t\\r\\n\\f]",
identifier="(?:\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+
"*([*^$|!~]?=)"+whitespace+
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+
".*"+")\\)|)",
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rleadingCombinator=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rdescend=new RegExp(whitespace+"|>"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rhtml=/HTML$/i,rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,
runescape=new RegExp("\\\\[\\da-fA-F]{1,6}"+whitespace+"?|\\\\([^\\r\\n\\f])","g"),funescape=function(escape,nonHex){var high="0x"+escape.slice(1)-0x10000;return nonHex?
nonHex:
high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);},
rcssescape=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,fcssescape=function(ch,asCodePoint){if(asCodePoint){
if(ch==="\0"){return"\uFFFD";}
return ch.slice(0,-1)+"\\"+ch.charCodeAt(ch.length-1).toString(16)+" ";}
return"\\"+ch;},
unloadHandler=function(){setDocument();},inDisabledFieldset=addCombinator(function(elem){return elem.disabled===true&&elem.nodeName.toLowerCase()==="fieldset";},{dir:"parentNode",next:"legend"});
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes);
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?
function(target,els){pushNative.apply(target,slice.call(els));}:
function(target,els){var j=target.length,i=0;
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,match,groups,newSelector,newContext=context&&context.ownerDocument,
nodeType=context?context.nodeType:9;results=results||[];
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;}
if(!seed){setDocument(context);context=context||document;if(documentIsHTML){
if(nodeType!==11&&(match=rquickExpr.exec(selector))){
if(m=match[1]){
if(nodeType===9){if(elem=context.getElementById(m)){
if(elem.id===m){results.push(elem);return results;}}else{return results;}
}else{
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&!nonnativeSelectorCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))&&(
nodeType!==1||context.nodeName.toLowerCase()!=="object")){newSelector=selector;newContext=context;
if(nodeType===1&&(rdescend.test(selector)||rleadingCombinator.test(selector))){
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;
if(newContext!==context||!support.scope){
if(nid=context.getAttribute("id")){nid=nid.replace(rcssescape,fcssescape);}else{context.setAttribute("id",nid=expando);}}
groups=tokenize(selector);i=groups.length;while(i--){groups[i]=(nid?"#"+nid:":scope")+" "+toSelector(groups[i]);}newSelector=groups.join(",");}try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){nonnativeSelectorCache(selector,true);}finally{if(nid===expando){context.removeAttribute("id");}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}function createCache(){var keys=[];function cache(key,value){
if(keys.push(key+" ")>Expr.cacheLength){
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;}function markFunction(fn){fn[expando]=true;return fn;}function assert(fn){var el=document.createElement("fieldset");try{return!!fn(el);}catch(e){return false;}finally{
if(el.parentNode){el.parentNode.removeChild(el);}
el=null;}}function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&a.sourceIndex-b.sourceIndex;
if(diff){return diff;}
if(cur){while(cur=cur.nextSibling){if(cur===b){return-1;}}}return a?1:-1;}function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}function createDisabledPseudo(disabled){
return function(elem){
if("form"in elem){
if(elem.parentNode&&elem.disabled===false){
if("label"in elem){if("label"in elem.parentNode){return elem.parentNode.disabled===disabled;}else{return elem.disabled===disabled;}}
return elem.isDisabled===disabled||
elem.isDisabled!==!disabled&&inDisabledFieldset(elem)===disabled;}return elem.disabled===disabled;
}else if("label"in elem){return elem.disabled===disabled;}
return false;};}function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});}function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;}
support=Sizzle.support={};isXML=Sizzle.isXML=function(elem){var namespace=elem&&elem.namespaceURI,docElem=elem&&(elem.ownerDocument||elem).documentElement;
return!rhtml.test(namespace||docElem&&docElem.nodeName||"HTML");};setDocument=Sizzle.setDocument=function(node){var hasCompare,subWindow,doc=node?node.ownerDocument||node:preferredDoc;
if(doc==document||doc.nodeType!==9||!doc.documentElement){return document;}
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document);
if(preferredDoc!=document&&(subWindow=document.defaultView)&&subWindow.top!==subWindow){
if(subWindow.addEventListener){subWindow.addEventListener("unload",unloadHandler,false);
}else if(subWindow.attachEvent){subWindow.attachEvent("onunload",unloadHandler);}}
support.scope=assert(function(el){docElem.appendChild(el).appendChild(document.createElement("div"));return typeof el.querySelectorAll!=="undefined"&&!el.querySelectorAll(":scope fieldset div").length;});
support.cssHas=assert(function(){try{document.querySelector(":has(*,:jqfake)");return false;}catch(e){return true;}}); 
support.attributes=assert(function(el){el.className="i";return!el.getAttribute("className");}); 
support.getElementsByTagName=assert(function(el){el.appendChild(document.createComment(""));return!el.getElementsByTagName("*").length;});
support.getElementsByClassName=rnative.test(document.getElementsByClassName);
support.getById=assert(function(el){docElem.appendChild(el).id=expando;return!document.getElementsByName||!document.getElementsByName(expando).length;});
if(support.getById){Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var elem=context.getElementById(id);return elem?[elem]:[];}};}else{Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};
Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var node,i,elems,elem=context.getElementById(id);if(elem){
node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}
elems=context.getElementsByName(id);i=0;while(elem=elems[i++]){node=elem.getAttributeNode("id");if(node&&node.value===id){return[elem];}}}return[];}};}
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag);
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0,
results=context.getElementsByTagName(tag);
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;};
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}}; 
rbuggyMatches=[];
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){
assert(function(el){var input;
docElem.appendChild(el).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>";
if(el.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}
if(!el.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}
if(!el.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");}
input=document.createElement("input");input.setAttribute("name","");el.appendChild(input);if(!el.querySelectorAll("[name='']").length){rbuggyQSA.push("\\["+whitespace+"*name"+whitespace+"*="+whitespace+"*(?:''|\"\")");}
if(!el.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}
if(!el.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}
el.querySelectorAll("\\\f");rbuggyQSA.push("[\\r\\n\\f]");});assert(function(el){el.innerHTML="<a href='' disabled='disabled'></a>"+"<select disabled='disabled'><option/></select>";
var input=document.createElement("input");input.setAttribute("type","hidden");el.appendChild(input).setAttribute("name","D");
if(el.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}
if(el.querySelectorAll(":enabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}
docElem.appendChild(el).disabled=true;if(el.querySelectorAll(":disabled").length!==2){rbuggyQSA.push(":enabled",":disabled");}
el.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(el){
support.disconnectedMatch=matches.call(el,"*");
matches.call(el,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}if(!support.cssHas){
rbuggyQSA.push(":has");}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));hasCompare=rnative.test(docElem.compareDocumentPosition);
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){
var adown=a.nodeType===9&&a.documentElement||a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;}; 
sortOrder=hasCompare?function(a,b){
if(a===b){hasDuplicate=true;return 0;}
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}
compare=(a.ownerDocument||a)==(b.ownerDocument||b)?a.compareDocumentPosition(b):
1;
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){
if(a==document||a.ownerDocument==preferredDoc&&contains(preferredDoc,a)){return-1;}
if(b==document||b.ownerDocument==preferredDoc&&contains(preferredDoc,b)){return 1;}
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];
if(!aup||!bup){
return a==document?-1:b==document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;
}else if(aup===bup){return siblingCheck(a,b);}
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);}
while(ap[i]===bp[i]){i++;}return i?
siblingCheck(ap[i],bp[i]):
ap[i]==preferredDoc?-1:bp[i]==preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){setDocument(elem);if(support.matchesSelector&&documentIsHTML&&!nonnativeSelectorCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);
if(ret||support.disconnectedMatch||
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){nonnativeSelectorCache(expr,true);}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){
if((context.ownerDocument||context)!=document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){
if((elem.ownerDocument||elem)!=document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()],
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.escape=function(sel){return(sel+"").replace(rcssescape,fcssescape);};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}}
sortInput=null;return results;};getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){
while(node=elem[i++]){
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){
if(typeof elem.textContent==="string"){return elem.textContent;}else{
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}
return ret;};Expr=Sizzle.selectors={
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(runescape,funescape);
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){
if(!match[3]){Sizzle.error(match[0]);}
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd");
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]){match[2]=match[4]||match[5]||"";
}else if(unquoted&&rpseudo.test(unquoted)&&(
excess=tokenize(unquoted,true))&&(
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}
return match.slice(0,3);}},filter:{"TAG":function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function(type,what,_argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?
function(elem){return!!elem.parentNode;}:function(elem,_context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild];
if(forward&&useCache){
node=parent;outerCache=node[expando]||(node[expando]={});
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||(
diff=nodeIndex=0)||start.pop()){
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else{
if(useCache){
node=elem;outerCache=node[expando]||(node[expando]={});
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;}
if(diff===false){
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){
if(useCache){outerCache=node[expando]||(node[expando]={});
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}}
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function(pseudo,argument){
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);
if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{
"not":markFunction(function(selector){
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,_context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,_context,xml){input[0]=elem;matcher(input,null,xml,results);
input[0]=null;return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return(elem.textContent||getText(elem)).indexOf(text)>-1;};}),
"lang":markFunction(function(lang){
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),
"target":function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function(elem){return elem===docElem;},"focus":function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},
"enabled":createDisabledPseudo(false),"disabled":createDisabledPseudo(true),"checked":function(elem){
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function(elem){
if(elem.parentNode){
elem.parentNode.selectedIndex;}return elem.selected===true;},
"empty":function(elem){
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},
"header":function(elem){return rheader.test(elem.nodeName);},"input":function(elem){return rinputs.test(elem.nodeName);},"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&(
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},
"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(_matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(_matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument>length?length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];
for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){
if(!matched||(match=rcomma.exec(soFar))){if(match){
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false;
if(match=rleadingCombinator.exec(soFar)){matched=match.shift();tokens.push({value:matched,
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,skip=combinator.next,key=skip||dir,checkNonElements=base&&key==="parentNode",doneName=done++;return combinator.first?
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}return false;}:
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName];
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if(skip&&skip===elem.nodeName.toLowerCase()){elem=elem[dir]||elem;}else if((oldCache=uniqueCache[key])&&oldCache[0]===dirruns&&oldCache[1]===doneName){
return newCache[2]=oldCache[2];}else{
uniqueCache[key]=newCache;
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}return false;};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?
postFinder||(seed?preFilter:preexisting||postFilter)?
[]:
results:matcherIn;
if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);}
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}
}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);
if(matcher[expando]){
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,
elems=seed||byElement&&Expr.find["TAG"]("*",outermost),
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){
outermostContext=context==document||context||outermost;}
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;
if(!context&&elem.ownerDocument!=document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}}
if(bySet){
if(elem=!matcher&&elem){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));
cached.selector=selector;}return cached;};select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[];
if(match.length===1){
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);}
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}}
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;
support.detectDuplicates=!!hasDuplicate;
setDocument();
support.sortDetached=assert(function(el){
return el.compareDocumentPosition(document.createElement("fieldset"))&1;});
if(!assert(function(el){el.innerHTML="<a href='#'></a>";return el.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}
if(!support.attributes||!assert(function(el){el.innerHTML="<input/>";el.firstChild.setAttribute("value","");return el.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,_name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}
if(!assert(function(el){return el.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;
jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;jQuery.escapeSelector=Sizzle.escape;var dir=function(elem,dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var siblings=function(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();}var rsingleTag=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
function winnow(elements,qualifier,not){if(isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}
if(typeof qualifier!=="string"){return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}
return jQuery.filter(qualifier,elements,not);}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}if(elems.length===1&&elem.nodeType===1){return jQuery.find.matchesSelector(elem,expr)?[elem]:[];}return jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function(selector){var i,ret,len=this.length,self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}ret=this.pushStack([]);for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}return len>1?jQuery.uniqueSort(ret):ret;},filter:function(selector){return this.pushStack(winnow(this,selector||[],false));},not:function(selector){return this.pushStack(winnow(this,selector||[],true));},is:function(selector){return!!winnow(this,
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}});
var rootjQuery,
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem;
if(!selector){return this;}
root=root||rootjQuery;
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){
match=[null,selector,null];}else{match=rquickExpr.exec(selector);}
if(match&&(match[1]||!context)){
if(match[1]){context=context instanceof jQuery?context[0]:context;
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){
if(isFunction(this[match])){this[match](context[match]);
}else{this.attr(match,context[match]);}}}return this;
}else{elem=document.getElementById(match[2]);if(elem){
this[0]=elem;this.length=1;}return this;}
}else if(!context||context.jquery){return(context||root).find(selector);
}else{return this.constructor(context).find(selector);}
}else if(selector.nodeType){this[0]=selector;this.length=1;return this;
}else if(isFunction(selector)){return root.ready!==undefined?root.ready(selector):
selector(jQuery);}return jQuery.makeArray(selector,this);};
init.prototype=jQuery.fn;
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/,
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function(selectors,context){var cur,i=0,l=this.length,matched=[],targets=typeof selectors!=="string"&&jQuery(selectors);
if(!rneedsContext.test(selectors)){for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){
if(cur.nodeType<11&&(targets?targets.index(cur)>-1:
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);},
index:function(elem){
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;}
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);}
return indexOf.call(this,
elem.jquery?elem[0]:elem);},add:function(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return dir(elem,"parentNode");},parentsUntil:function(elem,_i,until){return dir(elem,"parentNode",until);},next:function(elem){return sibling(elem,"nextSibling");},prev:function(elem){return sibling(elem,"previousSibling");},nextAll:function(elem){return dir(elem,"nextSibling");},prevAll:function(elem){return dir(elem,"previousSibling");},nextUntil:function(elem,_i,until){return dir(elem,"nextSibling",until);},prevUntil:function(elem,_i,until){return dir(elem,"previousSibling",until);},siblings:function(elem){return siblings((elem.parentNode||{}).firstChild,elem);},children:function(elem){return siblings(elem.firstChild);},contents:function(elem){if(elem.contentDocument!=null&&
getProto(elem.contentDocument)){return elem.contentDocument;}
if(nodeName(elem,"template")){elem=elem.content||elem;}return jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);}
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnothtmlwhite=/[^\x20\t\r\n\f]+/g;
function createOptions(options){var object={};jQuery.each(options.match(rnothtmlwhite)||[],function(_,flag){object[flag]=true;});return object;}jQuery.Callbacks=function(options){
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var
firing,
memory,
fired,
locked,
list=[],
queue=[],
firingIndex=-1,
fire=function(){
locked=locked||options.once;
fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){
firingIndex=list.length;memory=false;}}}
if(!options.memory){memory=false;}firing=false;
if(locked){
if(memory){list=[];
}else{list="";}}},
self={
add:function(){if(list){
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&toType(arg)!=="string"){
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;},
remove:function(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);
if(index<=firingIndex){firingIndex--;}}});return this;},
has:function(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;},
empty:function(){if(list){list=[];}return this;},
disable:function(){locked=queue=[];list=memory="";return this;},disabled:function(){return!list;},
lock:function(){locked=queue=[];if(!memory&&!firing){list=memory="";}return this;},locked:function(){return!!locked;},
fireWith:function(context,args){if(!locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;},
fire:function(){self.fireWith(this,arguments);return this;},
fired:function(){return!!fired;}};return self;};function Identity(v){return v;}function Thrower(ex){throw ex;}function adoptValue(value,resolve,reject,noValue){var method;try{
if(value&&isFunction(method=value.promise)){method.call(value).done(resolve).fail(reject);
}else if(value&&isFunction(method=value.then)){method.call(value,resolve,reject);
}else{
resolve.apply(undefined,[value].slice(noValue));}
}catch(value){
reject.apply(undefined,[value]);}}jQuery.extend({Deferred:function(func){var tuples=[
["notify","progress",jQuery.Callbacks("memory"),jQuery.Callbacks("memory"),2],["resolve","done",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),0,"resolved"],["reject","fail",jQuery.Callbacks("once memory"),jQuery.Callbacks("once memory"),1,"rejected"]],state="pending",promise={state:function(){return state;},always:function(){deferred.done(arguments).fail(arguments);return this;},"catch":function(fn){return promise.then(null,fn);},
pipe:function(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(_i,tuple){
var fn=isFunction(fns[tuple[4]])&&fns[tuple[4]];
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else{newDefer[tuple[0]+"With"](this,fn?[returned]:arguments);}});});fns=null;}).promise();},then:function(onFulfilled,onRejected,onProgress){var maxDepth=0;function resolve(depth,deferred,handler,special){return function(){var that=this,args=arguments,mightThrow=function(){var returned,then;
if(depth<maxDepth){return;}returned=handler.apply(that,args);
if(returned===deferred.promise()){throw new TypeError("Thenable self-resolution");}
then=returned&&(
typeof returned==="object"||typeof returned==="function")&&returned.then;
if(isFunction(then)){
if(special){then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special));
}else{
maxDepth++;then.call(returned,resolve(maxDepth,deferred,Identity,special),resolve(maxDepth,deferred,Thrower,special),resolve(maxDepth,deferred,Identity,deferred.notifyWith));}
}else{
if(handler!==Identity){that=undefined;args=[returned];}
(special||deferred.resolveWith)(that,args);}},
process=special?mightThrow:function(){try{mightThrow();}catch(e){if(jQuery.Deferred.exceptionHook){jQuery.Deferred.exceptionHook(e,process.stackTrace);}
if(depth+1>=maxDepth){
if(handler!==Thrower){that=undefined;args=[e];}deferred.rejectWith(that,args);}}};
if(depth){process();}else{
if(jQuery.Deferred.getStackHook){process.stackTrace=jQuery.Deferred.getStackHook();}window.setTimeout(process);}};}return jQuery.Deferred(function(newDefer){
tuples[0][3].add(resolve(0,newDefer,isFunction(onProgress)?onProgress:Identity,newDefer.notifyWith));
tuples[1][3].add(resolve(0,newDefer,isFunction(onFulfilled)?onFulfilled:Identity));
tuples[2][3].add(resolve(0,newDefer,isFunction(onRejected)?onRejected:Thrower));}).promise();},
promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise;}},deferred={};
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[5];
promise[tuple[1]]=list.add;
if(stateString){list.add(function(){
state=stateString;},
tuples[3-i][2].disable,
tuples[3-i][3].disable,
tuples[0][2].lock,
tuples[0][3].lock);}
list.add(tuple[3].fire);
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?undefined:this,arguments);return this;};
deferred[tuple[0]+"With"]=list.fireWith;});
promise.promise(deferred);
if(func){func.call(deferred,deferred);}
return deferred;},
when:function(singleValue){var
remaining=arguments.length,
i=remaining,
resolveContexts=Array(i),resolveValues=slice.call(arguments),
primary=jQuery.Deferred(),
updateFunc=function(i){return function(value){resolveContexts[i]=this;resolveValues[i]=arguments.length>1?slice.call(arguments):value;if(! --remaining){primary.resolveWith(resolveContexts,resolveValues);}};};
if(remaining<=1){adoptValue(singleValue,primary.done(updateFunc(i)).resolve,primary.reject,!remaining);
if(primary.state()==="pending"||isFunction(resolveValues[i]&&resolveValues[i].then)){return primary.then();}}
while(i--){adoptValue(resolveValues[i],updateFunc(i),primary.reject);}return primary.promise();}});
var rerrorNames=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;jQuery.Deferred.exceptionHook=function(error,stack){
if(window.console&&window.console.warn&&error&&rerrorNames.test(error.name)){window.console.warn("jQuery.Deferred exception: "+error.message,error.stack,stack);}};jQuery.readyException=function(error){window.setTimeout(function(){throw error;});};
var readyList=jQuery.Deferred();jQuery.fn.ready=function(fn){readyList.then(fn)
.catch(function(error){jQuery.readyException(error);});return this;};jQuery.extend({
isReady:false,
readyWait:1,
ready:function(wait){
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}
jQuery.isReady=true;
if(wait!==true&&--jQuery.readyWait>0){return;}
readyList.resolveWith(document,[jQuery]);}});jQuery.ready.then=readyList.then;
function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){
window.setTimeout(jQuery.ready);}else{
document.addEventListener("DOMContentLoaded",completed);
window.addEventListener("load",completed);}
var access=function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null;
if(toType(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);}
}else if(value!==undefined){chainable=true;if(!isFunction(value)){raw=true;}if(bulk){
if(raw){fn.call(elems,value);fn=null;
}else{bulk=fn;fn=function(elem,_key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}if(chainable){return elems;}
if(bulk){return fn.call(elems);}return len?fn(elems[0],key):emptyGet;};
var rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g;
function fcamelCase(_all,letter){return letter.toUpperCase();}
function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);}var acceptData=function(owner){
return owner.nodeType===1||owner.nodeType===9||!+owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={cache:function(owner){
var value=owner[this.expando];
if(!value){value={};
if(acceptData(owner)){
if(owner.nodeType){owner[this.expando]=value;
}else{Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function(owner,data,value){var prop,cache=this.cache(owner);
if(typeof data==="string"){cache[camelCase(data)]=value;
}else{
for(prop in data){cache[camelCase(prop)]=data[prop];}}return cache;},get:function(owner,key){return key===undefined?this.cache(owner):
owner[this.expando]&&owner[this.expando][camelCase(key)];},access:function(owner,key,value){
if(key===undefined||key&&typeof key==="string"&&value===undefined){return this.get(owner,key);}
this.set(owner,key,value);
return value!==undefined?value:key;},remove:function(owner,key){var i,cache=owner[this.expando];if(cache===undefined){return;}if(key!==undefined){
if(Array.isArray(key)){
key=key.map(camelCase);}else{key=camelCase(key);
key=key in cache?[key]:key.match(rnothtmlwhite)||[];}i=key.length;while(i--){delete cache[key[i]];}}
if(key===undefined||jQuery.isEmptyObject(cache)){
if(owner.nodeType){owner[this.expando]=undefined;}else{delete owner[this.expando];}}},hasData:function(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data();
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function getData(data){if(data==="true"){return true;}if(data==="false"){return false;}if(data==="null"){return null;}
if(data===+data+""){return+data;}if(rbrace.test(data)){return JSON.parse(data);}return data;}function dataAttr(elem,key,data){var name;
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=getData(data);}catch(e){}
dataUser.set(elem,key,data);}else{data=undefined;}}return data;}jQuery.extend({hasData:function(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function(elem,name,data){return dataUser.access(elem,name,data);},removeData:function(elem,name){dataUser.remove(elem,name);},
_data:function(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes;
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;}
if(typeof key==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data;
if(elem&&value===undefined){
data=dataUser.get(elem,key);if(data!==undefined){return data;}
data=dataAttr(elem,key);if(data!==undefined){return data;}
return;}
this.each(function(){
dataUser.set(this,key,value);});},null,value,arguments.length>1,null,true);},removeData:function(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type);
if(data){if(!queue||Array.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}return queue||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type);};
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){
if(type==="fx"){queue.unshift("inprogress");}
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}},
_queueHooks:function(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function(type){return this.queue(type||"fx",[]);},
promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var documentElement=document.documentElement;var isAttached=function(elem){return jQuery.contains(elem.ownerDocument,elem);},composed={composed:true};
if(documentElement.getRootNode){isAttached=function(elem){return jQuery.contains(elem.ownerDocument,elem)||elem.getRootNode(composed)===elem.ownerDocument;};}var isHiddenWithinTree=function(elem,el){
elem=el||elem;
return elem.style.display==="none"||elem.style.display===""&&
isAttached(elem)&&jQuery.css(elem,"display")==="none";};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"),
initialInUnit=elem.nodeType&&(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){
initial=initial/2;
unit=unit||initialInUnit[3];
initialInUnit=+initial||1;while(maxIterations--){
jQuery.style(elem,prop,initialInUnit+unit);if((1-scale)*(1-(scale=currentValue()/initial||0.5))<=0){maxIterations=0;}initialInUnit=initialInUnit/scale;}initialInUnit=initialInUnit*2;jQuery.style(elem,prop,initialInUnit+unit);
valueParts=valueParts||[];}if(valueParts){initialInUnit=+initialInUnit||+initial||0;
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var defaultDisplayMap={};function getDefaultDisplay(elem){var temp,doc=elem.ownerDocument,nodeName=elem.nodeName,display=defaultDisplayMap[nodeName];if(display){return display;}temp=doc.body.appendChild(doc.createElement(nodeName));display=jQuery.css(temp,"display");temp.parentNode.removeChild(temp);if(display==="none"){display="block";}defaultDisplayMap[nodeName]=display;return display;}function showHide(elements,show){var display,elem,values=[],index=0,length=elements.length;
for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}display=elem.style.display;if(show){
if(display==="none"){values[index]=dataPriv.get(elem,"display")||null;if(!values[index]){elem.style.display="";}}if(elem.style.display===""&&isHiddenWithinTree(elem)){values[index]=getDefaultDisplay(elem);}}else{if(display!=="none"){values[index]="none";
dataPriv.set(elem,"display",display);}}}
for(index=0;index<length;index++){if(values[index]!=null){elements[index].style.display=values[index];}}return elements;}jQuery.fn.extend({show:function(){return showHide(this,true);},hide:function(){return showHide(this);},toggle:function(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHiddenWithinTree(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var rscriptType=/^$|^module$|\/(?:java|ecma)script/i;(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input");
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked;
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;
div.innerHTML="<option></option>";support.option=!!div.lastChild;})();
var wrapMap={
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;
if(!support.option){wrapMap.optgroup=wrapMap.option=[1,"<select multiple='multiple'>","</select>"];}function getAll(context,tag){
var ret;if(typeof context.getElementsByTagName!=="undefined"){ret=context.getElementsByTagName(tag||"*");}else if(typeof context.querySelectorAll!=="undefined"){ret=context.querySelectorAll(tag||"*");}else{ret=[];}if(tag===undefined||tag&&nodeName(context,tag)){return jQuery.merge([context],ret);}return ret;}
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,attached,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){
if(toType(elem)==="object"){
jQuery.merge(nodes,elem.nodeType?[elem]:elem);
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));
}else{tmp=tmp||fragment.appendChild(context.createElement("div"));
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2];
j=wrap[0];while(j--){tmp=tmp.lastChild;}
jQuery.merge(nodes,tmp.childNodes);
tmp=fragment.firstChild;
tmp.textContent="";}}}
fragment.textContent="";i=0;while(elem=nodes[i++]){
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}attached=isAttached(elem);
tmp=getAll(fragment.appendChild(elem),"script");
if(attached){setGlobalEval(tmp);}
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}var rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;}
function expectSync(elem,type){return elem===safeActiveElement()===(type==="focus");}
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function on(elem,types,selector,data,fn,one){var origFn,type;
if(typeof types==="object"){
if(typeof selector!=="string"){
data=data||selector;selector=undefined;}for(type in types){on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){
fn=data;data=undefined;}else{
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function(event){
jQuery().off(event);return origFn.apply(this,arguments);};
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});}jQuery.event={global:{},add:function(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem);
if(!acceptData(elem)){return;}
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}
if(selector){jQuery.find.matchesSelector(documentElement,selector);}
if(!handler.guid){handler.guid=jQuery.guid++;}
if(!(events=elemData.events)){events=elemData.events=Object.create(null);}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};}
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();
if(!type){continue;}
special=jQuery.event.special[type]||{};
type=(selector?special.delegateType:special.bindType)||type;
special=jQuery.event.special[type]||{};
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0;
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}
jQuery.event.global[type]=true;}},
remove:function(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;}
types=(types||"").match(rnothtmlwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}}
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}}
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function(nativeEvent){var i,j,ret,matched,handleObj,handlerQueue,args=new Array(arguments.length),
event=jQuery.event.fix(nativeEvent),handlers=(dataPriv.get(this,"events")||Object.create(null))[event.type]||[],special=jQuery.event.special[event.type]||{};
args[0]=event;for(i=1;i<arguments.length;i++){args[i]=arguments[i];}event.delegateTarget=this;
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}
handlerQueue=jQuery.event.handlers.call(this,event,handlers);
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){
if(!event.rnamespace||handleObj.namespace===false||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function(event,handlers){var i,handleObj,sel,matchedHandlers,matchedSelectors,handlerQueue=[],delegateCount=handlers.delegateCount,cur=event.target;
if(delegateCount&&
cur.nodeType&&
!(event.type==="click"&&event.button>=1)){for(;cur!==this;cur=cur.parentNode||this){
if(cur.nodeType===1&&!(event.type==="click"&&cur.disabled===true)){matchedHandlers=[];matchedSelectors={};for(i=0;i<delegateCount;i++){handleObj=handlers[i];
sel=handleObj.selector+" ";if(matchedSelectors[sel]===undefined){matchedSelectors[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matchedSelectors[sel]){matchedHandlers.push(handleObj);}}if(matchedHandlers.length){handlerQueue.push({elem:cur,handlers:matchedHandlers});}}}}
cur=this;if(delegateCount<handlers.length){handlerQueue.push({elem:cur,handlers:handlers.slice(delegateCount)});}return handlerQueue;},addProp:function(name,hook){Object.defineProperty(jQuery.Event.prototype,name,{enumerable:true,configurable:true,get:isFunction(hook)?function(){if(this.originalEvent){return hook(this.originalEvent);}}:function(){if(this.originalEvent){return this.originalEvent[name];}},set:function(value){Object.defineProperty(this,name,{enumerable:true,configurable:true,writable:true,value:value});}});},fix:function(originalEvent){return originalEvent[jQuery.expando]?originalEvent:new jQuery.Event(originalEvent);},special:{load:{
noBubble:true},click:{
setup:function(data){
var el=this||data;
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){
leverageNative(el,"click",returnTrue);}
return false;},trigger:function(data){
var el=this||data;
if(rcheckableType.test(el.type)&&el.click&&nodeName(el,"input")){leverageNative(el,"click");}
return true;},
_default:function(event){var target=event.target;return rcheckableType.test(target.type)&&target.click&&nodeName(target,"input")&&dataPriv.get(target,"click")||nodeName(target,"a");}},beforeunload:{postDispatch:function(event){
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};
function leverageNative(el,type,expectSync){
if(!expectSync){if(dataPriv.get(el,type)===undefined){jQuery.event.add(el,type,returnTrue);}return;}
dataPriv.set(el,type,false);jQuery.event.add(el,type,{namespace:false,handler:function(event){var notAsync,result,saved=dataPriv.get(this,type);if(event.isTrigger&1&&this[type]){
if(!saved.length){
saved=slice.call(arguments);dataPriv.set(this,type,saved);
notAsync=expectSync(this,type);this[type]();result=dataPriv.get(this,type);if(saved!==result||notAsync){dataPriv.set(this,type,false);}else{result={};}if(saved!==result){
event.stopImmediatePropagation();event.preventDefault();
return result&&result.value;}
}else if((jQuery.event.special[type]||{}).delegateType){event.stopPropagation();}
}else if(saved.length){
dataPriv.set(this,type,{value:jQuery.event.trigger(
jQuery.extend(saved[0],jQuery.Event.prototype),saved.slice(1),this)});
event.stopImmediatePropagation();}}});}jQuery.removeEvent=function(elem,type,handle){
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&&
src.returnValue===false?returnTrue:returnFalse;
this.target=src.target&&src.target.nodeType===3?src.target.parentNode:src.target;this.currentTarget=src.currentTarget;this.relatedTarget=src.relatedTarget;
}else{this.type=src;}
if(props){jQuery.extend(this,props);}
this.timeStamp=src&&src.timeStamp||Date.now();
this[jQuery.expando]=true;};
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:false,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e&&!this.isSimulated){e.preventDefault();}},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopPropagation();}},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e&&!this.isSimulated){e.stopImmediatePropagation();}this.stopPropagation();}};
jQuery.each({altKey:true,bubbles:true,cancelable:true,changedTouches:true,ctrlKey:true,detail:true,eventPhase:true,metaKey:true,pageX:true,pageY:true,shiftKey:true,view:true,"char":true,code:true,charCode:true,key:true,keyCode:true,button:true,buttons:true,clientX:true,clientY:true,offsetX:true,offsetY:true,pointerId:true,pointerType:true,screenX:true,screenY:true,targetTouches:true,toElement:true,touches:true,which:true},jQuery.event.addProp);jQuery.each({focus:"focusin",blur:"focusout"},function(type,delegateType){jQuery.event.special[type]={
setup:function(){
leverageNative(this,type,expectSync);
return false;},trigger:function(){
leverageNative(this,type);
return true;},
_default:function(event){return dataPriv.get(event.target,type);},delegateType:delegateType};});
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function(types,selector,data,fn){return on(this,types,selector,data,fn);},one:function(types,selector,data,fn){return on(this,types,selector,data,fn,1);},off:function(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if(typeof types==="object"){
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var
rnoInnerhtml=/<script|<style|<link/i,
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rcleanScript=/^\s*<!\[CDATA\[|\]\]>\s*$/g;
function manipulationTarget(elem,content){if(nodeName(elem,"table")&&nodeName(content.nodeType!==11?content:content.firstChild,"tr")){return jQuery(elem).children("tbody")[0]||elem;}return elem;}
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){if((elem.type||"").slice(0,5)==="true/"){elem.type=elem.type.slice(5);}else{elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,udataOld,udataCur,events;if(dest.nodeType!==1){return;}
if(dataPriv.hasData(src)){pdataOld=dataPriv.get(src);events=pdataOld.events;if(events){dataPriv.remove(dest,"handle events");for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}}
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}}
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase();
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked;
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){
args=flat(args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],valueIsFunction=isFunction(value);
if(valueIsFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(valueIsFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);
if(hasScripts){
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;
jQuery.map(scripts,restoreScript);
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src&&(node.type||"").toLowerCase()!=="module"){
if(jQuery._evalUrl&&!node.noModule){jQuery._evalUrl(node.src,{nonce:node.nonce||node.getAttribute("nonce")},doc);}}else{
DOMEval(node.textContent.replace(rcleanScript,""),node,doc);}}}}}}return collection;}function remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&isAttached(node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function(html){return html;},clone:function(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=isAttached(elem);
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}}
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else{cloneCopyEvent(elem,clone);}}
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));}
return clone;},cleanData:function(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);
}else{jQuery.removeEvent(elem,type,data.handle);}}}
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({detach:function(selector){return remove(this,selector,true);},remove:function(selector){return remove(this,selector);},text:function(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){
jQuery.cleanData(getAll(elem,false));
elem.textContent="";}}return this;},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;}
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{};
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0;
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function(){var ignored=[];
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}}
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);
push.apply(ret,elems.get());}return this.pushStack(ret);};});var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var rcustomProp=/^--/;var getStyles=function(elem){
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};var swap=function(elem,options,callback){var ret,name,old={};
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.call(elem);
for(name in options){elem.style[name]=old[name];}return ret;};var rboxStyle=new RegExp(cssExpand.join("|"),"i");var whitespace="[\\x20\\t\\r\\n\\f]";var rtrimCSS=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g");(function(){
function computeStyleTests(){
if(!div){return;}container.style.cssText="position:absolute;left:-11111px;width:60px;"+"margin-top:1px;padding:0;border:0";div.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;"+"margin:auto;border:1px;padding:1px;"+"width:60%;top:1%";documentElement.appendChild(container).appendChild(div);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";
reliableMarginLeftVal=roundPixelMeasures(divStyle.marginLeft)===12;
div.style.right="60%";pixelBoxStylesVal=roundPixelMeasures(divStyle.right)===36;
boxSizingReliableVal=roundPixelMeasures(divStyle.width)===36;
div.style.position="absolute";scrollboxSizeVal=roundPixelMeasures(div.offsetWidth/3)===12;documentElement.removeChild(container);
div=null;}function roundPixelMeasures(measure){return Math.round(parseFloat(measure));}var pixelPositionVal,boxSizingReliableVal,scrollboxSizeVal,pixelBoxStylesVal,reliableTrDimensionsVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div");
if(!div.style){return;}
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";jQuery.extend(support,{boxSizingReliable:function(){computeStyleTests();return boxSizingReliableVal;},pixelBoxStyles:function(){computeStyleTests();return pixelBoxStylesVal;},pixelPosition:function(){computeStyleTests();return pixelPositionVal;},reliableMarginLeft:function(){computeStyleTests();return reliableMarginLeftVal;},scrollboxSize:function(){computeStyleTests();return scrollboxSizeVal;},
reliableTrDimensions:function(){var table,tr,trChild,trStyle;if(reliableTrDimensionsVal==null){table=document.createElement("table");tr=document.createElement("tr");trChild=document.createElement("div");table.style.cssText="position:absolute;left:-11111px;border-collapse:separate";tr.style.cssText="border:1px solid";
tr.style.height="1px";trChild.style.height="9px";
trChild.style.display="block";documentElement.appendChild(table).appendChild(tr).appendChild(trChild);trStyle=window.getComputedStyle(tr);reliableTrDimensionsVal=parseInt(trStyle.height,10)+parseInt(trStyle.borderTopWidth,10)+parseInt(trStyle.borderBottomWidth,10)===tr.offsetHeight;documentElement.removeChild(table);}return reliableTrDimensionsVal;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,isCustomProp=rcustomProp.test(name),
style=elem.style;computed=computed||getStyles(elem);
if(computed){
ret=computed.getPropertyValue(name)||computed[name];if(isCustomProp&&ret){
ret=ret.replace(rtrimCSS,"$1")||undefined;}if(ret===""&&!isAttached(elem)){ret=jQuery.style(elem,name);}
if(!support.pixelBoxStyles()&&rnumnonpx.test(ret)&&rboxStyle.test(name)){
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined?
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){
return{get:function(){if(conditionFn()){
delete this.get;return;}
return(this.get=hookFn).apply(this,arguments);}};}var cssPrefixes=["Webkit","Moz","ms"],emptyStyle=document.createElement("div").style,vendorProps={};
function vendorPropName(name){
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}
function finalPropName(name){var final=jQuery.cssProps[name]||vendorProps[name];if(final){return final;}if(name in emptyStyle){return name;}return vendorProps[name]=vendorPropName(name)||name;}var
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"};function setPositiveNumber(_elem,value,subtract){
var matches=rcssNum.exec(value);return matches?
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function boxModelAdjustment(elem,dimension,box,isBorderBox,styles,computedVal){var i=dimension==="width"?1:0,extra=0,delta=0;
if(box===(isBorderBox?"border":"content")){return 0;}for(;i<4;i+=2){
if(box==="margin"){delta+=jQuery.css(elem,box+cssExpand[i],true,styles);}
if(!isBorderBox){
delta+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);
if(box!=="padding"){delta+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);
}else{extra+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}
}else{
if(box==="content"){delta-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}
if(box!=="margin"){delta-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}
if(!isBorderBox&&computedVal>=0){
delta+=Math.max(0,Math.ceil(elem["offset"+dimension[0].toUpperCase()+dimension.slice(1)]-computedVal-delta-extra-0.5
))||0;}return delta;}function getWidthOrHeight(elem,dimension,extra){
var styles=getStyles(elem),
boxSizingNeeded=!support.boxSizingReliable()||extra,isBorderBox=boxSizingNeeded&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",valueIsBorderBox=isBorderBox,val=curCSS(elem,dimension,styles),offsetProp="offset"+dimension[0].toUpperCase()+dimension.slice(1);
if(rnumnonpx.test(val)){if(!extra){return val;}val="auto";}
if((!support.boxSizingReliable()&&isBorderBox||
!support.reliableTrDimensions()&&nodeName(elem,"tr")||
val==="auto"||
!parseFloat(val)&&jQuery.css(elem,"display",false,styles)==="inline")&&
elem.getClientRects().length){isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box";
valueIsBorderBox=offsetProp in elem;if(valueIsBorderBox){val=elem[offsetProp];}}
val=parseFloat(val)||0;
return val+boxModelAdjustment(elem,dimension,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles,
val)+"px";}jQuery.extend({
cssHooks:{opacity:{get:function(elem,computed){if(computed){
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"gridArea":true,"gridColumn":true,"gridColumnEnd":true,"gridColumnStart":true,"gridRow":true,"gridRowEnd":true,"gridRowStart":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},
cssProps:{},
style:function(elem,name,value,extra){
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}
var ret,type,hooks,origName=camelCase(name),isCustomProp=rcustomProp.test(name),style=elem.style;
if(!isCustomProp){name=finalPropName(origName);}
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(value!==undefined){type=typeof value;
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret);
type="number";}
if(value==null||value!==value){return;}
if(type==="number"&&!isCustomProp){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");}
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){if(isCustomProp){style.setProperty(name,value);}else{style[name]=value;}}}else{
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}
return style[name];}},css:function(elem,name,extra,styles){var val,num,hooks,origName=camelCase(name),isCustomProp=rcustomProp.test(name);
if(!isCustomProp){name=finalPropName(origName);}
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];
if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}
if(val===undefined){val=curCSS(elem,name,styles);}
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(_i,dimension){jQuery.cssHooks[dimension]={get:function(elem,computed,extra){if(computed){
return rdisplayswap.test(jQuery.css(elem,"display"))&&(
!elem.getClientRects().length||!elem.getBoundingClientRect().width)?swap(elem,cssShow,function(){return getWidthOrHeight(elem,dimension,extra);}):getWidthOrHeight(elem,dimension,extra);}},set:function(elem,value,extra){var matches,styles=getStyles(elem),
scrollboxSizeBuggy=!support.scrollboxSize()&&styles.position==="absolute",
boxSizingNeeded=scrollboxSizeBuggy||extra,isBorderBox=boxSizingNeeded&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",subtract=extra?boxModelAdjustment(elem,dimension,extra,isBorderBox,styles):0;
if(isBorderBox&&scrollboxSizeBuggy){subtract-=Math.ceil(elem["offset"+dimension[0].toUpperCase()+dimension.slice(1)]-parseFloat(styles[dimension])-boxModelAdjustment(elem,dimension,"border",false,styles)-0.5);}
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[dimension]=value;value=jQuery.css(elem,dimension);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return(parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}});
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i=0,expanded={},
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(prefix!=="margin"){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(Array.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function(tween){var result;
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];}
result=jQuery.css(tween.elem,tween.prop,"");
return!result||result==="auto"?0:result;},set:function(tween){
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(jQuery.cssHooks[tween.prop]||tween.elem.style[finalPropName(tween.prop)]!=null)){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function(p){return p;},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init;
jQuery.fx.step={};var fxNow,inProgress,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/;function schedule(){if(inProgress){if(document.hidden===false&&window.requestAnimationFrame){window.requestAnimationFrame(schedule);}else{window.setTimeout(schedule,jQuery.fx.interval);}jQuery.fx.tick();}}
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=Date.now();}
function genFx(type,includeWidth){var which,i=0,attrs={height:type};
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){
return tween;}}}function defaultPrefilter(elem,props,opts){var prop,value,toggle,hooks,oldfire,propTween,restoreDisplay,display,isBox="width"in props||"height"in props,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHiddenWithinTree(elem),dataShow=dataPriv.get(elem,"fxshow");
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}
for(prop in props){value=props[prop];if(rfxtypes.test(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;
}else{continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}
propTween=!jQuery.isEmptyObject(props);if(!propTween&&jQuery.isEmptyObject(orig)){return;}
if(isBox&&elem.nodeType===1){
opts.overflow=[style.overflow,style.overflowX,style.overflowY];
restoreDisplay=dataShow&&dataShow.display;if(restoreDisplay==null){restoreDisplay=dataPriv.get(elem,"display");}display=jQuery.css(elem,"display");if(display==="none"){if(restoreDisplay){display=restoreDisplay;}else{
showHide([elem],true);restoreDisplay=elem.style.display||restoreDisplay;display=jQuery.css(elem,"display");showHide([elem]);}}
if(display==="inline"||display==="inline-block"&&restoreDisplay!=null){if(jQuery.css(elem,"float")==="none"){
if(!propTween){anim.done(function(){style.display=restoreDisplay;});if(restoreDisplay==null){display=style.display;restoreDisplay=display==="none"?"":display;}}style.display="inline-block";}}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}
propTween=false;for(prop in orig){
if(!propTween){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=dataPriv.access(elem,"fxshow",{display:restoreDisplay});}
if(toggle){dataShow.hidden=!hidden;}
if(hidden){showHide([elem],true);}anim.done(function(){ 
if(!hidden){showHide([elem]);}dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});}
propTween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=propTween.start;if(hidden){propTween.end=propTween.start;propTween.start=0;}}}}function propFilter(props,specialEasing){var index,name,easing,value,hooks;
for(index in props){name=camelCase(index);easing=specialEasing[name];value=props[index];if(Array.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){
delete tick.elem;}),tick=function(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);
if(percent<1&&length){return remaining;}
if(!length){deferred.notifyWith(elem,[animation,1,0]);}
deferred.resolveWith(elem,[animation]);return false;},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function(gotoEnd){var index=0,
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=result.stop.bind(result);}return result;}}jQuery.map(props,createTween,animation);if(isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}
animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));return animation;}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function(props,callback){if(isFunction(props)){callback=props;props=["*"];}else{props=props.match(rnothtmlwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else{Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!isFunction(easing)&&easing};
if(jQuery.fx.off){opt.duration=0;}else{if(typeof opt.duration!=="number"){if(opt.duration in jQuery.fx.speeds){opt.duration=jQuery.fx.speeds[opt.duration];}else{opt.duration=jQuery.fx.speeds._default;}}}
if(opt.queue==null||opt.queue===true){opt.queue="fx";}
opt.old=opt.complete;opt.complete=function(){if(isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){
return this.filter(isHiddenWithinTree).css("opacity",0).show()
.end().animate({opacity:to},speed,easing,callback);},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){
var anim=Animation(this,jQuery.extend({},prop),optall);
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;
data.finish=true;
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(_i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=Date.now();for(;i<timers.length;i++){timer=timers[i];
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);jQuery.fx.start();};jQuery.fx.interval=13;jQuery.fx.start=function(){if(inProgress){return;}inProgress=true;schedule();};jQuery.fx.stop=function(){inProgress=null;};jQuery.fx.speeds={slow:600,fast:200,
_default:400};
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox";
support.checkOn=input.value!=="";
support.optSelected=opt.selected;
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function(elem,name,value){var ret,hooks,nType=elem.nodeType;
if(nType===3||nType===8||nType===2){return;}
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}
if(nType!==1||!jQuery.isXMLDoc(elem)){hooks=jQuery.attrHooks[name.toLowerCase()]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name);
return ret==null?undefined:ret;},attrHooks:{type:{set:function(elem,value){if(!support.radioValue&&value==="radio"&&nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function(elem,value){var name,i=0,
attrNames=value&&value.match(rnothtmlwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){elem.removeAttribute(name);}}}});
boolHook={set:function(elem,value,name){if(value===false){
jQuery.removeAttr(elem,name);}else{elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(_i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle,lowercaseName=name.toLowerCase();if(!isXML){
handle=attrHandle[lowercaseName];attrHandle[lowercaseName]=ret;ret=getter(elem,name,isXML)!=null?lowercaseName:null;attrHandle[lowercaseName]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function(elem,name,value){var ret,hooks,nType=elem.nodeType;
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function(elem){
var tabindex=jQuery.find.attr(elem,"tabindex");if(tabindex){return parseInt(tabindex,10);}if(rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href){return 0;}return-1;}}},propFix:{"for":"htmlFor","class":"className"}});
if(!support.optSelected){jQuery.propHooks.selected={get:function(elem){var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;},set:function(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});
function stripAndCollapse(value){var tokens=value.match(rnothtmlwhite)||[];return tokens.join(" ");}function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}function classesToArray(value){if(Array.isArray(value)){return value;}if(typeof value==="string"){return value.match(rnothtmlwhite)||[];}return[];}jQuery.fn.extend({addClass:function(value){var classNames,cur,curValue,className,i,finalValue;if(isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}classNames=classesToArray(value);if(classNames.length){return this.each(function(){curValue=getClass(this);cur=this.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){for(i=0;i<classNames.length;i++){className=classNames[i];if(cur.indexOf(" "+className+" ")<0){cur+=className+" ";}}
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){this.setAttribute("class",finalValue);}}});}return this;},removeClass:function(value){var classNames,cur,curValue,className,i,finalValue;if(isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}classNames=classesToArray(value);if(classNames.length){return this.each(function(){curValue=getClass(this);
cur=this.nodeType===1&&" "+stripAndCollapse(curValue)+" ";if(cur){for(i=0;i<classNames.length;i++){className=classNames[i];
while(cur.indexOf(" "+className+" ")>-1){cur=cur.replace(" "+className+" "," ");}}
finalValue=stripAndCollapse(cur);if(curValue!==finalValue){this.setAttribute("class",finalValue);}}});}return this;},toggleClass:function(value,stateVal){var classNames,className,i,self,type=typeof value,isValidValue=type==="string"||Array.isArray(value);if(isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}if(typeof stateVal==="boolean"&&isValidValue){return stateVal?this.addClass(value):this.removeClass(value);}classNames=classesToArray(value);return this.each(function(){if(isValidValue){
self=jQuery(this);for(i=0;i<classNames.length;i++){className=classNames[i];
if(self.hasClass(className)){self.removeClass(className);}else{self.addClass(className);}}
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){
dataPriv.set(this,"__className__",className);}
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+stripAndCollapse(getClass(elem))+" ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function(value){var hooks,ret,valueIsFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;
if(typeof ret==="string"){return ret.replace(rreturn,"");}
return ret==null?"":ret;}return;}valueIsFunction=isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(valueIsFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(Array.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];
if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:
stripAndCollapse(jQuery.text(elem));}},select:{get:function(elem){var value,option,i,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one",values=one?null:[],max=one?index+1:options.length;if(index<0){i=max;}else{i=one?index:0;}
for(;i<max;i++){option=options[i];
if((option.selected||i===index)&&
!option.disabled&&(!option.parentNode.disabled||!nodeName(option.parentNode,"optgroup"))){
value=jQuery(option).val();
if(one){return value;}
values.push(value);}}return values;},set:function(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}}
if(!optionSet){elem.selectedIndex=-1;}return values;}}}});
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){if(Array.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});
support.focusin="onfocusin"in window;var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,stopPropagationCallback=function(e){e.stopPropagation();};jQuery.extend(jQuery.event,{trigger:function(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,lastElement,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=lastElement=tmp=elem=elem||document;
if(elem.nodeType===3||elem.nodeType===8){return;}
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type;
event=event[jQuery.expando]?event:new jQuery.Event(type,typeof event==="object"&&event);
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
event.result=undefined;if(!event.target){event.target=elem;}
data=data==null?[event]:jQuery.makeArray(data,[event]);
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}
if(!onlyHandlers&&!special.noBubble&&!isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){lastElement=cur;event.type=i>1?bubbleType:special.bindType||type;
handle=(dataPriv.get(cur,"events")||Object.create(null))[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);}
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type;
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){
if(ontype&&isFunction(elem[type])&&!isWindow(elem)){
tmp=elem[ontype];if(tmp){elem[ontype]=null;}
jQuery.event.triggered=type;if(event.isPropagationStopped()){lastElement.addEventListener(type,stopPropagationCallback);}elem[type]();if(event.isPropagationStopped()){lastElement.removeEventListener(type,stopPropagationCallback);}jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;},
simulate:function(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true});jQuery.event.trigger(e,null,elem);}});jQuery.fn.extend({trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){
var handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function(){
var doc=this.ownerDocument||this.document||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function(){var doc=this.ownerDocument||this.document||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else{dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce={guid:Date.now()};var rquery=/\?/;
jQuery.parseXML=function(data){var xml,parserErrorElem;if(!data||typeof data!=="string"){return null;}
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){}parserErrorElem=xml&&xml.getElementsByTagName("parsererror")[0];if(!xml||parserErrorElem){jQuery.error("Invalid XML: "+(parserErrorElem?jQuery.map(parserErrorElem.childNodes,function(el){return el.textContent;}).join("\n"):data));}return xml;};var rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(Array.isArray(obj)){
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){
add(prefix,v);}else{
buildParams(prefix+"["+(typeof v==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&toType(obj)==="object"){
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{
add(prefix,obj);}}
jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,valueOrFunction){
var value=isFunction(valueOrFunction)?valueOrFunction():valueOrFunction;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value==null?"":value);};if(a==null){return"";}
if(Array.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){
jQuery.each(a,function(){add(this.name,this.value);});}else{
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}
return s.join("&");};jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(_i,elem){var val=jQuery(this).val();if(val==null){return null;}if(Array.isArray(val)){return jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};});}return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});var r20=/%20/g,rhash=/#.*$/,rantiCache=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg,
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,prefilters={},transports={},
allTypes="*/".concat("*"),
originAnchor=document.createElement("a");originAnchor.href=location.href;
function addToPrefiltersOrTransports(structure){
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnothtmlwhite)||[];if(isFunction(func)){
while(dataType=dataTypes[i++]){
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);
}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;}function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes;
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}}
finalDataType=finalDataType||firstDataType;}
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}}function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},
dataTypes=s.dataTypes.slice();
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift();
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){
if(current==="*"){current=prev;
}else if(prev!=="*"&&prev!==current){
conv=converters[prev+" "+current]||converters["* "+current];
if(!conv){for(conv2 in converters){
tmp=conv2.split(" ");if(tmp[1]===current){
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){
if(conv===true){conv=converters[conv2];
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}}
if(conv!==true){
if(conv&&s.throws){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return{state:"success",data:response};}jQuery.extend({
active:0,
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},
converters:{
"* text":String,
"text html":true,
"text json":JSON.parse,
"text xml":jQuery.parseXML},
flatOptions:{url:true,context:true}},
ajaxSetup:function(target,settings){return settings?
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),
ajax:function(url,options){
if(typeof url==="object"){options=url;url=undefined;}
options=options||{};var transport,
cacheURL,
responseHeadersString,responseHeaders,
timeoutTimer,
urlAnchor,
completed,
fireGlobals,
i,
uncached,
s=jQuery.ajaxSetup({},options),
callbackContext=s.context||s,
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),
statusCode=s.statusCode||{},
requestHeaders={},requestHeadersNames={},
strAbort="canceled",
jqXHR={readyState:0,
getResponseHeader:function(key){var match;if(completed){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()+" "]=(responseHeaders[match[1].toLowerCase()+" "]||[]).concat(match[2]);}}match=responseHeaders[key.toLowerCase()+" "];}return match==null?null:match.join(", ");},
getAllResponseHeaders:function(){return completed?responseHeadersString:null;},
setRequestHeader:function(name,value){if(completed==null){name=requestHeadersNames[name.toLowerCase()]=requestHeadersNames[name.toLowerCase()]||name;requestHeaders[name]=value;}return this;},
overrideMimeType:function(type){if(completed==null){s.mimeType=type;}return this;},
statusCode:function(map){var code;if(map){if(completed){
jqXHR.always(map[jqXHR.status]);}else{
for(code in map){statusCode[code]=[statusCode[code],map[code]];}}}return this;},
abort:function(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}};
deferred.promise(jqXHR);
s.url=((url||s.url||location.href)+"").replace(rprotocol,location.protocol+"//");
s.type=options.method||options.type||s.method||s.type;
s.dataTypes=(s.dataType||"*").toLowerCase().match(rnothtmlwhite)||[""];
if(s.crossDomain==null){urlAnchor=document.createElement("a");
try{urlAnchor.href=s.url;
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){
s.crossDomain=true;}}
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);
if(completed){return jqXHR;}
fireGlobals=jQuery.event&&s.global;
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}
s.type=s.type.toUpperCase();
s.hasContent=!rnoContent.test(s.type);
cacheURL=s.url.replace(rhash,"");
if(!s.hasContent){
uncached=s.url.slice(cacheURL.length);
if(s.data&&(s.processData||typeof s.data==="string")){cacheURL+=(rquery.test(cacheURL)?"&":"?")+s.data;
delete s.data;}
if(s.cache===false){cacheURL=cacheURL.replace(rantiCache,"$1");uncached=(rquery.test(cacheURL)?"&":"?")+"_="+nonce.guid++ +uncached;}
s.url=cacheURL+uncached;
}else if(s.data&&s.processData&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0){s.data=s.data.replace(r20,"+");}
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||completed)){
return jqXHR.abort();}
strAbort="abort";
completeDeferred.add(s.complete);jqXHR.done(s.success);jqXHR.fail(s.error);
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);
if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}
if(completed){return jqXHR;}
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{completed=false;transport.send(requestHeaders,done);}catch(e){
if(completed){throw e;}
done(-1,e);}}
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;
if(completed){return;}completed=true;
if(timeoutTimer){window.clearTimeout(timeoutTimer);}
transport=undefined;
responseHeadersString=headers||"";
jqXHR.readyState=status>0?4:0;
isSuccess=status>=200&&status<300||status===304;
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}
if(!isSuccess&&jQuery.inArray("script",s.dataTypes)>-1&&jQuery.inArray("json",s.dataTypes)<0){s.converters["text script"]=function(){};}
response=ajaxConvert(s,response,jqXHR,isSuccess);
if(isSuccess){
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}}
if(status===204||s.type==="HEAD"){statusText="nocontent";
}else if(status===304){statusText="notmodified";
}else{statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else{
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}}
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);}
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(_i,method){jQuery[method]=function(url,data,callback,type){
if(isFunction(data)){type=type||callback;callback=data;data=undefined;}
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery.ajaxPrefilter(function(s){var i;for(i in s.headers){if(i.toLowerCase()==="content-type"){s.contentType=s.headers[i]||"";}}});jQuery._evalUrl=function(url,options,doc){return jQuery.ajax({url:url,
type:"GET",dataType:"script",cache:true,async:false,global:false,
converters:{"text script":function(){}},dataFilter:function(response){jQuery.globalEval(response,options,doc);}});};jQuery.fn.extend({wrapAll:function(html){var wrap;if(this[0]){if(isFunction(html)){html=html.call(this[0]);}
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function(html){if(isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){var htmlIsFunction=isFunction(html);return this.each(function(i){jQuery(this).wrapAll(htmlIsFunction?html.call(this,i):html);});},unwrap:function(selector){this.parent(selector).not("body").each(function(){jQuery(this).replaceWith(this.childNodes);});return this;}});jQuery.expr.pseudos.hidden=function(elem){return!jQuery.expr.pseudos.visible(elem);};jQuery.expr.pseudos.visible=function(elem){return!!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={
0:200,
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials"in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var callback,errorCallback;
if(support.cors||xhrSupported&&!options.crossDomain){return{send:function(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password);
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}}
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);}
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}
for(i in headers){xhr.setRequestHeader(i,headers[i]);}
callback=function(type){return function(){if(callback){callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.ontimeout=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){
if(typeof xhr.status!=="number"){complete(0,"error");}else{complete(
xhr.status,xhr.statusText);}}else{complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText,
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};};
xhr.onload=callback();errorCallback=xhr.onerror=xhr.ontimeout=callback("error");
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else{xhr.onreadystatechange=function(){
if(xhr.readyState===4){
window.setTimeout(function(){if(callback){errorCallback();}});}};}
callback=callback("abort");try{
xhr.send(options.hasContent&&options.data||null);}catch(e){
if(callback){throw e;}}},abort:function(){if(callback){callback();}}};}});
jQuery.ajaxPrefilter(function(s){if(s.crossDomain){s.contents.script=false;}});
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(text){jQuery.globalEval(text);return text;}}});
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}});
jQuery.ajaxTransport("script",function(s){
if(s.crossDomain||s.scriptAttrs){var script,callback;return{send:function(_,complete){script=jQuery("<script>").attr(s.scriptAttrs||{}).prop({charset:s.scriptCharset,src:s.url}).on("load error",callback=function(evt){script.remove();callback=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}});
document.head.appendChild(script[0]);},abort:function(){if(callback){callback();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce.guid++;this[callback]=true;return callback;}});
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data");
if(jsonProp||s.dataTypes[0]==="jsonp"){
callbackName=s.jsonpCallback=isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];};
s.dataTypes[0]="json";
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};
jqXHR.always(function(){
if(overwritten===undefined){jQuery(window).removeProp(callbackName);
}else{window[callbackName]=overwritten;}
if(s[callbackName]){
s.jsonpCallback=originalSettings.jsonpCallback;
oldCallbacks.push(callbackName);}
if(responseContainer&&isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;});
return"script";}});
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}();
jQuery.parseHTML=function(data,context,keepScripts){if(typeof data!=="string"){return[];}if(typeof context==="boolean"){keepScripts=context;context=false;}var base,parsed,scripts;if(!context){
if(support.createHTMLDocument){context=document.implementation.createHTMLDocument("");
base=context.createElement("base");base.href=document.location.href;context.head.appendChild(base);}else{context=document;}}parsed=rsingleTag.exec(data);scripts=!keepScripts&&[];
if(parsed){return[context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);};jQuery.fn.load=function(url,params,callback){var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=stripAndCollapse(url.slice(off));url=url.slice(0,off);}
if(isFunction(params)){
callback=params;params=undefined;
}else if(params&&typeof params==="object"){type="POST";}
if(self.length>0){jQuery.ajax({url:url,
type:type||"GET",dataType:"html",data:params}).done(function(responseText){
response=arguments;self.html(selector?
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):
responseText);
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(this,response||[jqXHR.responseText,status,jqXHR]);});});}return this;};jQuery.expr.pseudos.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};jQuery.offset={setOffset:function(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={};
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1;
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(isFunction(options)){
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({
offset:function(options){
if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var rect,win,elem=this[0];if(!elem){return;}
if(!elem.getClientRects().length){return{top:0,left:0};}
rect=elem.getBoundingClientRect();win=elem.ownerDocument.defaultView;return{top:rect.top+win.pageYOffset,left:rect.left+win.pageXOffset};},
position:function(){if(!this[0]){return;}var offsetParent,offset,doc,elem=this[0],parentOffset={top:0,left:0};
if(jQuery.css(elem,"position")==="fixed"){
offset=elem.getBoundingClientRect();}else{offset=this.offset();
doc=elem.ownerDocument;offsetParent=elem.offsetParent||doc.documentElement;while(offsetParent&&(offsetParent===doc.body||offsetParent===doc.documentElement)&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.parentNode;}if(offsetParent&&offsetParent!==elem&&offsetParent.nodeType===1){
parentOffset=jQuery(offsetParent).offset();parentOffset.top+=jQuery.css(offsetParent,"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent,"borderLeftWidth",true);}}
return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};},
offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}});
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){
var win;if(isWindow(elem)){win=elem;}else if(elem.nodeType===9){win=elem.defaultView;}if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else{elem[method]=val;}},method,val,arguments.length);};});
jQuery.each(["top","left"],function(_i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop);
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});});
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(isWindow(elem)){
return funcName.indexOf("outer")===0?elem["inner"+name]:elem.document.documentElement["client"+name];}
if(elem.nodeType===9){doc=elem.documentElement;
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined?
jQuery.css(elem,type,extra):
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable);};});});jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(_i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.fn.extend({bind:function(types,data,fn){return this.on(types,null,data,fn);},unbind:function(types,fn){return this.off(types,null,fn);},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function(selector,types,fn){
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});jQuery.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(_i,name){
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});
var rtrim=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
jQuery.proxy=function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}
if(!isFunction(fn)){return undefined;}
args=slice.call(arguments,2);proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)));};
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;};jQuery.holdReady=function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}};jQuery.isArray=Array.isArray;jQuery.parseJSON=JSON.parse;jQuery.nodeName=nodeName;jQuery.isFunction=isFunction;jQuery.isWindow=isWindow;jQuery.camelCase=camelCase;jQuery.type=toType;jQuery.now=Date.now;jQuery.isNumeric=function(obj){
var type=jQuery.type(obj);return(type==="number"||type==="string")&&
!isNaN(obj-parseFloat(obj));};jQuery.trim=function(text){return text==null?"":(text+"").replace(rtrim,"$1");};
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}var
_jQuery=window.jQuery,
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;};
if(typeof noGlobal==="undefined"){window.jQuery=window.$=jQuery;}return jQuery;});},{}],83:[function(require,module,exports){
let cleanWrapCharacters=(pCharacter,pString)=>{if(pString.startsWith(pCharacter)&&pString.endsWith(pCharacter)){return pString.substring(1,pString.length-1);}else{return pString;}};module.exports=cleanWrapCharacters;},{}],84:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');class ManyfestHashTranslation{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;this.translationTable={};}translationCount(){return Object.keys(this.translationTable).length;}addTranslation(pTranslation){
if(typeof pTranslation!='object'){this.logError(`Hash translation addTranslation expected a translation be type object but was passed in ${typeof pTranslation}`);return false;}let tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(pTranslationSource=>{if(typeof pTranslation[pTranslationSource]!='string'){this.logError(`Hash translation addTranslation expected a translation destination hash for [${pTranslationSource}] to be a string but the referrant was a ${typeof pTranslation[pTranslationSource]}`);}else{this.translationTable[pTranslationSource]=pTranslation[pTranslationSource];}});}removeTranslationHash(pTranslationHash){if(this.translationTable.hasOwnProperty(pTranslationHash)){delete this.translationTable[pTranslationHash];}}
removeTranslation(pTranslation){if(typeof pTranslation=='string'){this.removeTranslationHash(pTranslation);return true;}else if(typeof pTranslation=='object'){let tmpTranslationSources=Object.keys(pTranslation);tmpTranslationSources.forEach(pTranslationSource=>{this.removeTranslation(pTranslationSource);});return true;}else{this.logError(`Hash translation removeTranslation expected either a string or an object but the passed-in translation was type ${typeof pTranslation}`);return false;}}clearTranslations(){this.translationTable={};}translate(pTranslation){if(this.translationTable.hasOwnProperty(pTranslation)){return this.translationTable[pTranslation];}else{return pTranslation;}}}module.exports=ManyfestHashTranslation;},{"./Manyfest-LogToConsole.js":85}],85:[function(require,module,exports){ const logToConsole=(pLogLine,pLogObject)=>{let tmpLogLine=typeof pLogLine==='string'?pLogLine:'';console.log(`[Manyfest] ${tmpLogLine}`);if(pLogObject)console.log(JSON.stringify(pLogObject));};module.exports=logToConsole;},{}],86:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');class ManyfestObjectAddressResolverCheckAddressExists{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};}
checkAddressExists(pObject,pAddress){
if(typeof pObject!='object')return false;
if(typeof pAddress!='string')return false;
let tmpSeparatorIndex=pAddress.indexOf('.');
if(tmpSeparatorIndex==-1){
let tmpBracketStartIndex=pAddress.indexOf('[');let tmpBracketStopIndex=pAddress.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){
let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();
if(typeof pObject[tmpBoxedPropertyName]!=='object'){return false;}
let tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();
let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
return pObject[tmpBoxedPropertyName].hasOwnProperty(tmpBoxedPropertyReference);}else{
return tmpBoxedPropertyNumber in pObject[tmpBoxedPropertyName];}}else{
return pObject.hasOwnProperty(pAddress);}}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
let tmpBracketStartIndex=tmpSubObjectName.indexOf('[');let tmpBracketStopIndex=tmpSubObjectName.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){let tmpBoxedPropertyName=tmpSubObjectName.substring(0,tmpBracketStartIndex).trim();let tmpBoxedPropertyReference=tmpSubObjectName.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){
return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
return this.checkAddressExists(pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference],tmpNewAddress);}else{
return this.checkAddressExists(pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber],tmpNewAddress);}}
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
return this.checkAddressExists(pObject[tmpSubObjectName],tmpNewAddress);}else{
pObject[tmpSubObjectName]={};return this.checkAddressExists(pObject[tmpSubObjectName],tmpNewAddress);}}}};module.exports=ManyfestObjectAddressResolverCheckAddressExists;},{"./Manyfest-LogToConsole.js":85}],87:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');let libPrecedent=require('precedent');let fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');class ManyfestObjectAddressResolverDeleteValue{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}checkFilters(pAddress,pRecord){let tmpPrecedent=new libPrecedent();
let tmpAddress=pAddress;if(!this.elucidatorSolver){
let libElucidator=require('elucidator');this.elucidatorSolver=new libElucidator({},this.logInfo,this.logError);}if(this.elucidatorSolver){
let tmpFilterState={Record:pRecord,keepRecord:true};
tmpPrecedent.addPattern('<<~~','~~>>',pInstructionHash=>{
if(this.elucidatorSolverState.hasOwnProperty(pInstructionHash)){tmpFilterState.SolutionState=this.elucidatorSolverState[pInstructionHash];}this.elucidatorSolver.solveInternalOperation('Custom',pInstructionHash,tmpFilterState);});tmpPrecedent.addPattern('<<~?','?~>>',pMagicSearchExpression=>{if(typeof pMagicSearchExpression!=='string'){return false;}
let tmpMagicComparisonPatternSet=pMagicSearchExpression.split(',');let tmpSearchAddress=tmpMagicComparisonPatternSet[0];let tmpSearchComparator=tmpMagicComparisonPatternSet[1];let tmpSearchValue=tmpMagicComparisonPatternSet[2];tmpFilterState.ComparisonState={SearchAddress:tmpSearchAddress,Comparator:tmpSearchComparator,SearchTerm:tmpSearchValue};this.elucidatorSolver.solveOperation({"Description":{"Operation":"Simple_If","Synopsis":"Test for "},"Steps":[{"Namespace":"Logic","Instruction":"if","InputHashAddressMap":{
"leftValue":`Record.${tmpSearchAddress}`,"rightValue":"ComparisonState.SearchTerm","comparator":"ComparisonState.Comparator"},"OutputHashAddressMap":{"truthinessResult":"keepRecord"}}]},tmpFilterState);});tmpPrecedent.parseString(tmpAddress);
return tmpFilterState.keepRecord;}else{return true;}}
deleteValueAtAddress(pObject,pAddress,pParentAddress){
if(typeof pObject!='object')return undefined;
if(typeof pAddress!='string')return undefined;
let tmpParentAddress="";if(typeof pParentAddress=='string'){tmpParentAddress=pParentAddress;}
let tmpSeparatorIndex=pAddress.indexOf('.');
if(tmpSeparatorIndex==-1){
let tmpBracketStartIndex=pAddress.indexOf('[');let tmpBracketStopIndex=pAddress.indexOf(']');
let tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){
let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();
if(typeof pObject[tmpBoxedPropertyName]!=='object'){return false;}
let tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();
let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
delete pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference];return true;}else{delete pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber];return true;}}
else if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex==1){let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[tmpBoxedPropertyName])){
return false;}let tmpInputArray=pObject[tmpBoxedPropertyName];
for(let i=tmpInputArray.length-1;i>=0;i--){
let tmpKeepRecord=this.checkFilters(pAddress,tmpInputArray[i]);if(tmpKeepRecord){
tmpInputArray.splice(i,1);}}return true;}
else if(tmpObjectTypeMarkerIndex>0){let tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(typeof pObject[tmpObjectPropertyName]!='object'){
return false;}delete pObject[tmpObjectPropertyName];return true;}else{
delete pObject[pAddress];return true;}}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
let tmpBracketStartIndex=tmpSubObjectName.indexOf('[');let tmpBracketStopIndex=tmpSubObjectName.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){let tmpBoxedPropertyName=tmpSubObjectName.substring(0,tmpBracketStartIndex).trim();let tmpBoxedPropertyReference=tmpSubObjectName.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}
if(typeof pObject[tmpBoxedPropertyName]!='object'){return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;
return this.deleteValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference],tmpNewAddress,tmpParentAddress);}else{
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;
return this.deleteValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber],tmpNewAddress,tmpParentAddress);}}
else if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex==1){let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[tmpBoxedPropertyName])){
return false;}
let tmpArrayProperty=pObject[tmpBoxedPropertyName];
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpBoxedPropertyName}`;
let tmpContainerObject={};for(let i=0;i<tmpArrayProperty.length;i++){let tmpPropertyParentAddress=`${tmpParentAddress}[${i}]`;let tmpValue=this.deleteValueAtAddress(pObject[tmpBoxedPropertyName][i],tmpNewAddress,tmpPropertyParentAddress);tmpContainerObject[`${tmpPropertyParentAddress}.${tmpNewAddress}`]=tmpValue;}return tmpContainerObject;}
let tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');if(tmpObjectTypeMarkerIndex>0){let tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(typeof pObject[tmpObjectPropertyName]!='object'){
return false;}
let tmpObjectProperty=pObject[tmpObjectPropertyName];let tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpObjectPropertyName}`;
let tmpContainerObject={};for(let i=0;i<tmpObjectPropertyKeys.length;i++){let tmpPropertyParentAddress=`${tmpParentAddress}.${tmpObjectPropertyKeys[i]}`;let tmpValue=this.deleteValueAtAddress(pObject[tmpObjectPropertyName][tmpObjectPropertyKeys[i]],tmpNewAddress,tmpPropertyParentAddress);
let tmpKeepRecord=this.checkFilters(pAddress,tmpValue);if(tmpKeepRecord){tmpContainerObject[`${tmpPropertyParentAddress}.${tmpNewAddress}`]=tmpValue;}}return tmpContainerObject;}
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}else{
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;pObject[tmpSubObjectName]={};return this.deleteValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}}}};module.exports=ManyfestObjectAddressResolverDeleteValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"elucidator":31,"precedent":95}],88:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');let libPrecedent=require('precedent');let fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');class ManyfestObjectAddressResolverGetValue{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}checkFilters(pAddress,pRecord){let tmpPrecedent=new libPrecedent();
let tmpAddress=pAddress;if(!this.elucidatorSolver){
let libElucidator=require('elucidator');this.elucidatorSolver=new libElucidator({},this.logInfo,this.logError);}if(this.elucidatorSolver){
let tmpFilterState={Record:pRecord,keepRecord:true};
tmpPrecedent.addPattern('<<~~','~~>>',pInstructionHash=>{
if(this.elucidatorSolverState.hasOwnProperty(pInstructionHash)){tmpFilterState.SolutionState=this.elucidatorSolverState[pInstructionHash];}this.elucidatorSolver.solveInternalOperation('Custom',pInstructionHash,tmpFilterState);});tmpPrecedent.addPattern('<<~?','?~>>',pMagicSearchExpression=>{if(typeof pMagicSearchExpression!=='string'){return false;}
let tmpMagicComparisonPatternSet=pMagicSearchExpression.split(',');let tmpSearchAddress=tmpMagicComparisonPatternSet[0];let tmpSearchComparator=tmpMagicComparisonPatternSet[1];let tmpSearchValue=tmpMagicComparisonPatternSet[2];tmpFilterState.ComparisonState={SearchAddress:tmpSearchAddress,Comparator:tmpSearchComparator,SearchTerm:tmpSearchValue};this.elucidatorSolver.solveOperation({"Description":{"Operation":"Simple_If","Synopsis":"Test for "},"Steps":[{"Namespace":"Logic","Instruction":"if","InputHashAddressMap":{
"leftValue":`Record.${tmpSearchAddress}`,"rightValue":"ComparisonState.SearchTerm","comparator":"ComparisonState.Comparator"},"OutputHashAddressMap":{"truthinessResult":"keepRecord"}}]},tmpFilterState);});tmpPrecedent.parseString(tmpAddress);
return tmpFilterState.keepRecord;}else{return true;}}
getValueAtAddress(pObject,pAddress,pParentAddress){
if(typeof pObject!='object')return undefined;
if(typeof pAddress!='string')return undefined;
let tmpParentAddress="";if(typeof pParentAddress=='string'){tmpParentAddress=pParentAddress;}
let tmpSeparatorIndex=pAddress.indexOf('.');
if(tmpSeparatorIndex==-1){
let tmpBracketStartIndex=pAddress.indexOf('[');let tmpBracketStopIndex=pAddress.indexOf(']');
let tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){
let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();
if(typeof pObject[tmpBoxedPropertyName]!=='object'){return undefined;}
let tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();
let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return undefined;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
return pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference];}else{return pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber];}}
else if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex==1){let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[tmpBoxedPropertyName])){
return false;}let tmpInputArray=pObject[tmpBoxedPropertyName];let tmpOutputArray=[];for(let i=0;i<tmpInputArray.length;i++){
let tmpKeepRecord=this.checkFilters(pAddress,tmpInputArray[i]);if(tmpKeepRecord){tmpOutputArray.push(tmpInputArray[i]);}}return tmpOutputArray;}
else if(tmpObjectTypeMarkerIndex>0){let tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(typeof pObject[tmpObjectPropertyName]!='object'){
return false;}return pObject[tmpObjectPropertyName];}else{
return pObject[pAddress];}}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
let tmpBracketStartIndex=tmpSubObjectName.indexOf('[');let tmpBracketStopIndex=tmpSubObjectName.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){let tmpBoxedPropertyName=tmpSubObjectName.substring(0,tmpBracketStartIndex).trim();let tmpBoxedPropertyReference=tmpSubObjectName.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return undefined;}
if(typeof pObject[tmpBoxedPropertyName]!='object'){return undefined;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;
return this.getValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference],tmpNewAddress,tmpParentAddress);}else{
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;
return this.getValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber],tmpNewAddress,tmpParentAddress);}}
else if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex==1){let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();if(!Array.isArray(pObject[tmpBoxedPropertyName])){
return false;}
let tmpArrayProperty=pObject[tmpBoxedPropertyName];
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpBoxedPropertyName}`;
let tmpContainerObject={};for(let i=0;i<tmpArrayProperty.length;i++){let tmpPropertyParentAddress=`${tmpParentAddress}[${i}]`;let tmpValue=this.getValueAtAddress(pObject[tmpBoxedPropertyName][i],tmpNewAddress,tmpPropertyParentAddress);tmpContainerObject[`${tmpPropertyParentAddress}.${tmpNewAddress}`]=tmpValue;}return tmpContainerObject;}
let tmpObjectTypeMarkerIndex=pAddress.indexOf('{}');if(tmpObjectTypeMarkerIndex>0){let tmpObjectPropertyName=pAddress.substring(0,tmpObjectTypeMarkerIndex).trim();if(typeof pObject[tmpObjectPropertyName]!='object'){
return false;}
let tmpObjectProperty=pObject[tmpObjectPropertyName];let tmpObjectPropertyKeys=Object.keys(tmpObjectProperty);
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpObjectPropertyName}`;
let tmpContainerObject={};for(let i=0;i<tmpObjectPropertyKeys.length;i++){let tmpPropertyParentAddress=`${tmpParentAddress}.${tmpObjectPropertyKeys[i]}`;let tmpValue=this.getValueAtAddress(pObject[tmpObjectPropertyName][tmpObjectPropertyKeys[i]],tmpNewAddress,tmpPropertyParentAddress);
let tmpKeepRecord=this.checkFilters(pAddress,tmpValue);if(tmpKeepRecord){tmpContainerObject[`${tmpPropertyParentAddress}.${tmpNewAddress}`]=tmpValue;}}return tmpContainerObject;}
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){return undefined;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}else{
tmpParentAddress=`${tmpParentAddress}${tmpParentAddress.length>0?'.':''}${tmpSubObjectName}`;pObject[tmpSubObjectName]={};return this.getValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,tmpParentAddress);}}}};module.exports=ManyfestObjectAddressResolverGetValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"elucidator":31,"precedent":95}],89:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');let libPrecedent=require('precedent');let fCleanWrapCharacters=require('./Manyfest-CleanWrapCharacters.js');class ManyfestObjectAddressSetValue{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;this.elucidatorSolver=false;this.elucidatorSolverState={};this.cleanWrapCharacters=fCleanWrapCharacters;}
setValueAtAddress(pObject,pAddress,pValue){
if(typeof pObject!='object')return false;
if(typeof pAddress!='string')return false;let tmpSeparatorIndex=pAddress.indexOf('.');if(tmpSeparatorIndex==-1){
let tmpBracketStartIndex=pAddress.indexOf('[');let tmpBracketStopIndex=pAddress.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){
let tmpBoxedPropertyName=pAddress.substring(0,tmpBracketStartIndex).trim();
if(typeof pObject[tmpBoxedPropertyName]!=='object'){return false;}
let tmpBoxedPropertyReference=pAddress.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();
let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference]=pValue;return true;}else{pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber]=pValue;return true;}}else{
pObject[pAddress]=pValue;return true;}}else{let tmpSubObjectName=pAddress.substring(0,tmpSeparatorIndex);let tmpNewAddress=pAddress.substring(tmpSeparatorIndex+1);
let tmpBracketStartIndex=tmpSubObjectName.indexOf('[');let tmpBracketStopIndex=tmpSubObjectName.indexOf(']');
if(tmpBracketStartIndex>0
&&tmpBracketStopIndex>tmpBracketStartIndex
&&tmpBracketStopIndex-tmpBracketStartIndex>1){let tmpBoxedPropertyName=tmpSubObjectName.substring(0,tmpBracketStartIndex).trim();let tmpBoxedPropertyReference=tmpSubObjectName.substring(tmpBracketStartIndex+1,tmpBracketStopIndex).trim();let tmpBoxedPropertyNumber=parseInt(tmpBoxedPropertyReference,10);
if(Array.isArray(pObject[tmpBoxedPropertyName])==isNaN(tmpBoxedPropertyNumber)){return false;}
if(isNaN(tmpBoxedPropertyNumber)){
tmpBoxedPropertyReference=this.cleanWrapCharacters('"',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters('`',tmpBoxedPropertyReference);tmpBoxedPropertyReference=this.cleanWrapCharacters("'",tmpBoxedPropertyReference);
return this.setValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyReference],tmpNewAddress,pValue);}else{
return this.setValueAtAddress(pObject[tmpBoxedPropertyName][tmpBoxedPropertyNumber],tmpNewAddress,pValue);}}
if(pObject.hasOwnProperty(tmpSubObjectName)&&typeof pObject[tmpSubObjectName]!=='object'){if(!pObject.hasOwnProperty('__ERROR'))pObject['__ERROR']={};
pObject['__ERROR'][pAddress]=pValue;return false;}else if(pObject.hasOwnProperty(tmpSubObjectName)){
return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}else{
pObject[tmpSubObjectName]={};return this.setValueAtAddress(pObject[tmpSubObjectName],tmpNewAddress,pValue);}}}};module.exports=ManyfestObjectAddressSetValue;},{"./Manyfest-CleanWrapCharacters.js":83,"./Manyfest-LogToConsole.js":85,"precedent":95}],90:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');class ManyfestObjectAddressGeneration{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog=='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog=='function'?pErrorLog:libSimpleLog;}
generateAddressses(pObject,pBaseAddress,pSchema){let tmpBaseAddress=typeof pBaseAddress=='string'?pBaseAddress:'';let tmpSchema=typeof pSchema=='object'?pSchema:{};let tmpObjectType=typeof pObject;let tmpSchemaObjectEntry={Address:tmpBaseAddress,Hash:tmpBaseAddress,Name:tmpBaseAddress,
InSchema:false};if(tmpObjectType=='object'&&pObject==null){tmpObjectType='null';}switch(tmpObjectType){case'string':tmpSchemaObjectEntry.DataType='String';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'number':case'bigint':tmpSchemaObjectEntry.DataType='Number';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'undefined':case'null':tmpSchemaObjectEntry.DataType='Any';tmpSchemaObjectEntry.Default=pObject;tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;break;case'object':if(Array.isArray(pObject)){tmpSchemaObjectEntry.DataType='Array';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;}for(let i=0;i<pObject.length;i++){this.generateAddressses(pObject[i],`${tmpBaseAddress}[${i}]`,tmpSchema);}}else{tmpSchemaObjectEntry.DataType='Object';if(tmpBaseAddress!=''){tmpSchema[tmpBaseAddress]=tmpSchemaObjectEntry;tmpBaseAddress+='.';}let tmpObjectProperties=Object.keys(pObject);for(let i=0;i<tmpObjectProperties.length;i++){this.generateAddressses(pObject[tmpObjectProperties[i]],`${tmpBaseAddress}${tmpObjectProperties[i]}`,tmpSchema);}}break;case'symbol':case'function':
break;}return tmpSchema;}};module.exports=ManyfestObjectAddressGeneration;},{"./Manyfest-LogToConsole.js":85}],91:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');class ManyfestSchemaManipulation{constructor(pInfoLog,pErrorLog){
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;}
resolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){if(typeof pManyfestSchemaDescriptors!='object'){this.logError(`Attempted to resolve address mapping but the descriptor was not an object.`);return false;}if(typeof pAddressMapping!='object'){
return true;}
let tmpManyfestAddresses=Object.keys(pManyfestSchemaDescriptors);let tmpHashMapping={};tmpManyfestAddresses.forEach(pAddress=>{if(pManyfestSchemaDescriptors[pAddress].hasOwnProperty('Hash')){tmpHashMapping[pManyfestSchemaDescriptors[pAddress].Hash]=pAddress;}});let tmpAddressMappingSet=Object.keys(pAddressMapping);tmpAddressMappingSet.forEach(pInputAddress=>{let tmpNewDescriptorAddress=pAddressMapping[pInputAddress];let tmpOldDescriptorAddress=false;let tmpDescriptor=false;
if(pManyfestSchemaDescriptors.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=pInputAddress;}else if(tmpHashMapping.hasOwnProperty(pInputAddress)){tmpOldDescriptorAddress=tmpHashMapping[pInputAddress];}
if(tmpOldDescriptorAddress){tmpDescriptor=pManyfestSchemaDescriptors[tmpOldDescriptorAddress];delete pManyfestSchemaDescriptors[tmpOldDescriptorAddress];}else{
tmpDescriptor={Hash:pInputAddress};}
pManyfestSchemaDescriptors[tmpNewDescriptorAddress]=tmpDescriptor;});return true;}safeResolveAddressMappings(pManyfestSchemaDescriptors,pAddressMapping){
let tmpManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptors));this.resolveAddressMappings(tmpManyfestSchemaDescriptors,pAddressMapping);return tmpManyfestSchemaDescriptors;}mergeAddressMappings(pManyfestSchemaDescriptorsDestination,pManyfestSchemaDescriptorsSource){if(typeof pManyfestSchemaDescriptorsSource!='object'||typeof pManyfestSchemaDescriptorsDestination!='object'){this.logError(`Attempted to merge two schema descriptors but both were not objects.`);return false;}let tmpSource=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsSource));let tmpNewManyfestSchemaDescriptors=JSON.parse(JSON.stringify(pManyfestSchemaDescriptorsDestination));
let tmpDescriptorAddresses=Object.keys(tmpSource);tmpDescriptorAddresses.forEach(pDescriptorAddress=>{if(!tmpNewManyfestSchemaDescriptors.hasOwnProperty(pDescriptorAddress)){tmpNewManyfestSchemaDescriptors[pDescriptorAddress]=tmpSource[pDescriptorAddress];}});return tmpNewManyfestSchemaDescriptors;}}module.exports=ManyfestSchemaManipulation;},{"./Manyfest-LogToConsole.js":85}],92:[function(require,module,exports){let libSimpleLog=require('./Manyfest-LogToConsole.js');let libPrecedent=require('precedent');let libHashTranslation=require('./Manyfest-HashTranslation.js');let libObjectAddressCheckAddressExists=require('./Manyfest-ObjectAddress-CheckAddressExists.js');let libObjectAddressGetValue=require('./Manyfest-ObjectAddress-GetValue.js');let libObjectAddressSetValue=require('./Manyfest-ObjectAddress-SetValue.js');let libObjectAddressDeleteValue=require('./Manyfest-ObjectAddress-DeleteValue.js');let libObjectAddressGeneration=require('./Manyfest-ObjectAddressGeneration.js');let libSchemaManipulation=require('./Manyfest-SchemaManipulation.js');class Manyfest{constructor(pManifest,pInfoLog,pErrorLog,pOptions){
this.logInfo=typeof pInfoLog==='function'?pInfoLog:libSimpleLog;this.logError=typeof pErrorLog==='function'?pErrorLog:libSimpleLog;
this.objectAddressCheckAddressExists=new libObjectAddressCheckAddressExists(this.logInfo,this.logError);this.objectAddressGetValue=new libObjectAddressGetValue(this.logInfo,this.logError);this.objectAddressSetValue=new libObjectAddressSetValue(this.logInfo,this.logError);this.objectAddressDeleteValue=new libObjectAddressDeleteValue(this.logInfo,this.logError);this.options={strict:false,defaultValues:{"String":"","Number":0,"Float":0.0,"Integer":0,"Boolean":false,"Binary":0,"DateTime":0,"Array":[],"Object":{},"Null":null}};this.scope=undefined;this.elementAddresses=undefined;this.elementHashes=undefined;this.elementDescriptors=undefined;
this.dataSolvers=undefined;
this.dataSolverState=undefined;this.reset();if(typeof pManifest==='object'){this.loadManifest(pManifest);}this.schemaManipulations=new libSchemaManipulation(this.logInfo,this.logError);this.objectAddressGeneration=new libObjectAddressGeneration(this.logInfo,this.logError);this.hashTranslations=new libHashTranslation(this.logInfo,this.logError);} 
reset(){this.scope='DEFAULT';this.elementAddresses=[];this.elementHashes={};this.elementDescriptors={};this.dataSolvers=undefined;this.dataSolverState={};this.libElucidator=undefined;}setElucidatorSolvers(pElucidatorSolver,pElucidatorSolverState){this.objectAddressCheckAddressExists.elucidatorSolver=pElucidatorSolver;this.objectAddressGetValue.elucidatorSolver=pElucidatorSolver;this.objectAddressSetValue.elucidatorSolver=pElucidatorSolver;this.objectAddressDeleteValue.elucidatorSolver=pElucidatorSolver;this.objectAddressCheckAddressExists.elucidatorSolverState=pElucidatorSolverState;this.objectAddressGetValue.elucidatorSolverState=pElucidatorSolverState;this.objectAddressSetValue.elucidatorSolverState=pElucidatorSolverState;this.objectAddressDeleteValue.elucidatorSolverState=pElucidatorSolverState;}clone(){
let tmpNewOptions=JSON.parse(JSON.stringify(this.options));let tmpNewManyfest=new Manyfest(this.getManifest(),this.logInfo,this.logError,tmpNewOptions);
tmpNewManyfest.hashTranslations.addTranslation(this.hashTranslations.translationTable);return tmpNewManyfest;}
deserialize(pManifestString){
return this.loadManifest(JSON.parse(pManifestString));}
loadManifest(pManifest){if(typeof pManifest!=='object'){this.logError(`(${this.scope}) Error loading manifest; expecting an object but parameter was type ${typeof pManifest}.`);return false;}if(pManifest.hasOwnProperty('Scope')){if(typeof pManifest.Scope==='string'){this.scope=pManifest.Scope;}else{this.logError(`(${this.scope}) Error loading scope from manifest; expecting a string but property was type ${typeof pManifest.Scope}.`,pManifest);}}else{this.logError(`(${this.scope}) Error loading scope from manifest object.  Property "Scope" does not exist in the root of the object.`,pManifest);}if(pManifest.hasOwnProperty('Descriptors')){if(typeof pManifest.Descriptors==='object'){let tmpDescriptionAddresses=Object.keys(pManifest.Descriptors);for(let i=0;i<tmpDescriptionAddresses.length;i++){this.addDescriptor(tmpDescriptionAddresses[i],pManifest.Descriptors[tmpDescriptionAddresses[i]]);}}else{this.logError(`(${this.scope}) Error loading description object from manifest object.  Expecting an object in 'Manifest.Descriptors' but the property was type ${typeof pManifest.Descriptors}.`,pManifest);}}else{this.logError(`(${this.scope}) Error loading object description from manifest object.  Property "Descriptors" does not exist in the root of the Manifest object.`,pManifest);}
if(pManifest.hasOwnProperty('Solvers')&&typeof pManifest.Solvers=='object'){
let libElucidator=require('elucidator');
this.dataSolvers=new libElucidator(pManifest.Solvers,this.logInfo,this.logError);
let tmpSolverKeys=Object.keys(pManifest.Solvers);for(let i=0;i<tmpSolverKeys.length;i++){this.dataSolverState[tmpSolverKeys]=pManifest.Solvers[tmpSolverKeys[i]];}this.setElucidatorSolvers(this.dataSolvers,this.dataSolverState);}}
serialize(){return JSON.stringify(this.getManifest());}getManifest(){return{Scope:this.scope,Descriptors:JSON.parse(JSON.stringify(this.elementDescriptors))};}
addDescriptor(pAddress,pDescriptor){if(typeof pDescriptor==='object'){
if(!pDescriptor.hasOwnProperty('Address')){pDescriptor.Address=pAddress;}if(!this.elementDescriptors.hasOwnProperty(pAddress)){this.elementAddresses.push(pAddress);}
this.elementDescriptors[pAddress]=pDescriptor;
this.elementHashes[pAddress]=pAddress;if(pDescriptor.hasOwnProperty('Hash')){
this.elementHashes[pDescriptor.Hash]=pAddress;}else{pDescriptor.Hash=pAddress;}return true;}else{this.logError(`(${this.scope}) Error loading object descriptor for address '${pAddress}' from manifest object.  Expecting an object but property was type ${typeof pDescriptor}.`);return false;}}getDescriptorByHash(pHash){return this.getDescriptor(this.resolveHashAddress(pHash));}getDescriptor(pAddress){return this.elementDescriptors[pAddress];}
eachDescriptor(fAction){let tmpDescriptorAddresses=Object.keys(this.elementDescriptors);for(let i=0;i<tmpDescriptorAddresses.length;i++){fAction(this.elementDescriptors[tmpDescriptorAddresses[i]]);}} 
checkAddressExistsByHash(pObject,pHash){return this.checkAddressExists(pObject,this.resolveHashAddress(pHash));}
checkAddressExists(pObject,pAddress){return this.objectAddressCheckAddressExists.checkAddressExists(pObject,pAddress);}
resolveHashAddress(pHash){let tmpAddress=undefined;let tmpInElementHashTable=this.elementHashes.hasOwnProperty(pHash);let tmpInTranslationTable=this.hashTranslations.translationTable.hasOwnProperty(pHash);
if(tmpInElementHashTable&&!tmpInTranslationTable){tmpAddress=this.elementHashes[pHash];}
else if(tmpInTranslationTable&&this.elementHashes.hasOwnProperty(this.hashTranslations.translate(pHash))){tmpAddress=this.elementHashes[this.hashTranslations.translate(pHash)];}
else if(tmpInTranslationTable){tmpAddress=this.hashTranslations.translate(pHash);}
else{tmpAddress=pHash;}return tmpAddress;}
getValueByHash(pObject,pHash){let tmpValue=this.getValueAtAddress(pObject,this.resolveHashAddress(pHash));if(typeof tmpValue=='undefined'){
tmpValue=this.getDefaultValue(this.getDescriptorByHash(pHash));}return tmpValue;}
getValueAtAddress(pObject,pAddress){let tmpValue=this.objectAddressGetValue.getValueAtAddress(pObject,pAddress);if(typeof tmpValue=='undefined'){
tmpValue=this.getDefaultValue(this.getDescriptor(pAddress));}return tmpValue;}
setValueByHash(pObject,pHash,pValue){return this.setValueAtAddress(pObject,this.resolveHashAddress(pHash),pValue);}
setValueAtAddress(pObject,pAddress,pValue){return this.objectAddressSetValue.setValueAtAddress(pObject,pAddress,pValue);}
deleteValueByHash(pObject,pHash,pValue){return this.deleteValueAtAddress(pObject,this.resolveHashAddress(pHash),pValue);}
deleteValueAtAddress(pObject,pAddress,pValue){return this.objectAddressDeleteValue.deleteValueAtAddress(pObject,pAddress,pValue);}
validate(pObject){let tmpValidationData={Error:null,Errors:[],MissingElements:[]};if(typeof pObject!=='object'){tmpValidationData.Error=true;tmpValidationData.Errors.push(`Expected passed in object to be type object but was passed in ${typeof pObject}`);}let addValidationError=(pAddress,pErrorMessage)=>{tmpValidationData.Error=true;tmpValidationData.Errors.push(`Element at address "${pAddress}" ${pErrorMessage}.`);};
for(let i=0;i<this.elementAddresses.length;i++){let tmpDescriptor=this.getDescriptor(this.elementAddresses[i]);let tmpValueExists=this.checkAddressExists(pObject,tmpDescriptor.Address);let tmpValue=this.getValueAtAddress(pObject,tmpDescriptor.Address);if(typeof tmpValue=='undefined'||!tmpValueExists){
tmpValidationData.MissingElements.push(tmpDescriptor.Address);if(tmpDescriptor.Required||this.options.strict){addValidationError(tmpDescriptor.Address,'is flagged REQUIRED but is not set in the object');}}
if(tmpDescriptor.DataType){let tmpElementType=typeof tmpValue;switch(tmpDescriptor.DataType.toString().trim().toLowerCase()){case'string':if(tmpElementType!='string'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but is of the type ${tmpElementType}`);}break;case'number':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but is of the type ${tmpElementType}`);}break;case'integer':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but is of the type ${tmpElementType}`);}else{let tmpValueString=tmpValue.toString();if(tmpValueString.indexOf('.')>-1){
addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but has a decimal point in the number.`);}}break;case'float':if(tmpElementType!='number'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but is of the type ${tmpElementType}`);}break;case'DateTime':let tmpValueDate=new Date(tmpValue);if(tmpValueDate.toString()=='Invalid Date'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} but is not parsable as a Date by Javascript`);}default:
if(tmpElementType!='string'){addValidationError(tmpDescriptor.Address,`has a DataType ${tmpDescriptor.DataType} (which auto-converted to String because it was unrecognized) but is of the type ${tmpElementType}`);}break;}}}return tmpValidationData;}
getDefaultValue(pDescriptor){if(typeof pDescriptor!='object'){return undefined;}if(pDescriptor.hasOwnProperty('Default')){return pDescriptor.Default;}else{
let tmpDataType=pDescriptor.hasOwnProperty('DataType')?pDescriptor.DataType:'String';if(this.options.defaultValues.hasOwnProperty(tmpDataType)){return this.options.defaultValues[tmpDataType];}else{
return null;}}}
populateDefaults(pObject,pOverwriteProperties){return this.populateObject(pObject,pOverwriteProperties,
pDescriptor=>{return pDescriptor.hasOwnProperty('Default');});}
populateObject(pObject,pOverwriteProperties,fFilter){
let tmpObject=typeof pObject==='object'?pObject:{};
let tmpOverwriteProperties=typeof pOverwriteProperties=='undefined'?false:pOverwriteProperties;
let tmpFilterFunction=typeof fFilter=='function'?fFilter:pDescriptor=>{return true;};this.elementAddresses.forEach(pAddress=>{let tmpDescriptor=this.getDescriptor(pAddress);
if(tmpFilterFunction(tmpDescriptor)){
if(tmpOverwriteProperties||!this.checkAddressExists(tmpObject,pAddress)){this.setValueAtAddress(tmpObject,pAddress,this.getDefaultValue(tmpDescriptor));}}});return tmpObject;}};module.exports=Manyfest;},{"./Manyfest-HashTranslation.js":84,"./Manyfest-LogToConsole.js":85,"./Manyfest-ObjectAddress-CheckAddressExists.js":86,"./Manyfest-ObjectAddress-DeleteValue.js":87,"./Manyfest-ObjectAddress-GetValue.js":88,"./Manyfest-ObjectAddress-SetValue.js":89,"./Manyfest-ObjectAddressGeneration.js":90,"./Manyfest-SchemaManipulation.js":91,"elucidator":31,"precedent":95}],93:[function(require,module,exports){ (function(window,document,undefined){
if(!window){return;}var _MAP={8:'backspace',9:'tab',13:'enter',16:'shift',17:'ctrl',18:'alt',20:'capslock',27:'esc',32:'space',33:'pageup',34:'pagedown',35:'end',36:'home',37:'left',38:'up',39:'right',40:'down',45:'ins',46:'del',91:'meta',93:'meta',224:'meta'};var _KEYCODE_MAP={106:'*',107:'+',109:'-',110:'.',111:'/',186:';',187:'=',188:',',189:'-',190:'.',191:'/',192:'`',219:'[',220:'\\',221:']',222:'\''};var _SHIFT_MAP={'~':'`','!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7','*':'8','(':'9',')':'0','_':'-','+':'=',':':';','\"':'\'','<':',','>':'.','?':'/','|':'\\'};var _SPECIAL_ALIASES={'option':'alt','command':'meta','return':'enter','escape':'esc','plus':'+','mod':/Mac|iPod|iPhone|iPad/.test(navigator.platform)?'meta':'ctrl'};var _REVERSE_MAP;for(var i=1;i<20;++i){_MAP[111+i]='f'+i;}for(i=0;i<=9;++i){
_MAP[i+96]=i.toString();}function _addEvent(object,type,callback){if(object.addEventListener){object.addEventListener(type,callback,false);return;}object.attachEvent('on'+type,callback);}function _characterFromEvent(e){
if(e.type=='keypress'){var character=String.fromCharCode(e.which);
if(!e.shiftKey){character=character.toLowerCase();}return character;}
if(_MAP[e.which]){return _MAP[e.which];}if(_KEYCODE_MAP[e.which]){return _KEYCODE_MAP[e.which];}
return String.fromCharCode(e.which).toLowerCase();}function _modifiersMatch(modifiers1,modifiers2){return modifiers1.sort().join(',')===modifiers2.sort().join(',');}function _eventModifiers(e){var modifiers=[];if(e.shiftKey){modifiers.push('shift');}if(e.altKey){modifiers.push('alt');}if(e.ctrlKey){modifiers.push('ctrl');}if(e.metaKey){modifiers.push('meta');}return modifiers;}function _preventDefault(e){if(e.preventDefault){e.preventDefault();return;}e.returnValue=false;}function _stopPropagation(e){if(e.stopPropagation){e.stopPropagation();return;}e.cancelBubble=true;}function _isModifier(key){return key=='shift'||key=='ctrl'||key=='alt'||key=='meta';}function _getReverseMap(){if(!_REVERSE_MAP){_REVERSE_MAP={};for(var key in _MAP){
if(key>95&&key<112){continue;}if(_MAP.hasOwnProperty(key)){_REVERSE_MAP[_MAP[key]]=key;}}}return _REVERSE_MAP;}function _pickBestAction(key,modifiers,action){
if(!action){action=_getReverseMap()[key]?'keydown':'keypress';}
if(action=='keypress'&&modifiers.length){action='keydown';}return action;}function _keysFromString(combination){if(combination==='+'){return['+'];}combination=combination.replace(/\+{2}/g,'+plus');return combination.split('+');}function _getKeyInfo(combination,action){var keys;var key;var i;var modifiers=[];
keys=_keysFromString(combination);for(i=0;i<keys.length;++i){key=keys[i];
if(_SPECIAL_ALIASES[key]){key=_SPECIAL_ALIASES[key];}
if(action&&action!='keypress'&&_SHIFT_MAP[key]){key=_SHIFT_MAP[key];modifiers.push('shift');}
if(_isModifier(key)){modifiers.push(key);}}
action=_pickBestAction(key,modifiers,action);return{key:key,modifiers:modifiers,action:action};}function _belongsTo(element,ancestor){if(element===null||element===document){return false;}if(element===ancestor){return true;}return _belongsTo(element.parentNode,ancestor);}function Mousetrap(targetElement){var self=this;targetElement=targetElement||document;if(!(self instanceof Mousetrap)){return new Mousetrap(targetElement);}self.target=targetElement;self._callbacks={};self._directMap={};var _sequenceLevels={};var _resetTimer;var _ignoreNextKeyup=false;var _ignoreNextKeypress=false;var _nextExpectedAction=false;function _resetSequences(doNotReset){doNotReset=doNotReset||{};var activeSequences=false,key;for(key in _sequenceLevels){if(doNotReset[key]){activeSequences=true;continue;}_sequenceLevels[key]=0;}if(!activeSequences){_nextExpectedAction=false;}}function _getMatches(character,modifiers,e,sequenceName,combination,level){var i;var callback;var matches=[];var action=e.type;
if(!self._callbacks[character]){return[];}
if(action=='keyup'&&_isModifier(character)){modifiers=[character];}
for(i=0;i<self._callbacks[character].length;++i){callback=self._callbacks[character][i];
if(!sequenceName&&callback.seq&&_sequenceLevels[callback.seq]!=callback.level){continue;}
if(action!=callback.action){continue;}
if(action=='keypress'&&!e.metaKey&&!e.ctrlKey||_modifiersMatch(modifiers,callback.modifiers)){
var deleteCombo=!sequenceName&&callback.combo==combination;var deleteSequence=sequenceName&&callback.seq==sequenceName&&callback.level==level;if(deleteCombo||deleteSequence){self._callbacks[character].splice(i,1);}matches.push(callback);}}return matches;}function _fireCallback(callback,e,combo,sequence){
if(self.stopCallback(e,e.target||e.srcElement,combo,sequence)){return;}if(callback(e,combo)===false){_preventDefault(e);_stopPropagation(e);}}self._handleKey=function(character,modifiers,e){var callbacks=_getMatches(character,modifiers,e);var i;var doNotReset={};var maxLevel=0;var processedSequenceCallback=false;
for(i=0;i<callbacks.length;++i){if(callbacks[i].seq){maxLevel=Math.max(maxLevel,callbacks[i].level);}}
for(i=0;i<callbacks.length;++i){
if(callbacks[i].seq){
if(callbacks[i].level!=maxLevel){continue;}processedSequenceCallback=true;
doNotReset[callbacks[i].seq]=1;_fireCallback(callbacks[i].callback,e,callbacks[i].combo,callbacks[i].seq);continue;}
if(!processedSequenceCallback){_fireCallback(callbacks[i].callback,e,callbacks[i].combo);}}
var ignoreThisKeypress=e.type=='keypress'&&_ignoreNextKeypress;if(e.type==_nextExpectedAction&&!_isModifier(character)&&!ignoreThisKeypress){_resetSequences(doNotReset);}_ignoreNextKeypress=processedSequenceCallback&&e.type=='keydown';};function _handleKeyEvent(e){
if(typeof e.which!=='number'){e.which=e.keyCode;}var character=_characterFromEvent(e);
if(!character){return;}
if(e.type=='keyup'&&_ignoreNextKeyup===character){_ignoreNextKeyup=false;return;}self.handleKey(character,_eventModifiers(e),e);}function _resetSequenceTimer(){clearTimeout(_resetTimer);_resetTimer=setTimeout(_resetSequences,1000);}function _bindSequence(combo,keys,callback,action){
_sequenceLevels[combo]=0;function _increaseSequence(nextAction){return function(){_nextExpectedAction=nextAction;++_sequenceLevels[combo];_resetSequenceTimer();};}function _callbackAndReset(e){_fireCallback(callback,e,combo);
if(action!=='keyup'){_ignoreNextKeyup=_characterFromEvent(e);}
setTimeout(_resetSequences,10);}
for(var i=0;i<keys.length;++i){var isFinal=i+1===keys.length;var wrappedCallback=isFinal?_callbackAndReset:_increaseSequence(action||_getKeyInfo(keys[i+1]).action);_bindSingle(keys[i],wrappedCallback,action,combo,i);}}function _bindSingle(combination,callback,action,sequenceName,level){
self._directMap[combination+':'+action]=callback;
combination=combination.replace(/\s+/g,' ');var sequence=combination.split(' ');var info;
if(sequence.length>1){_bindSequence(combination,sequence,callback,action);return;}info=_getKeyInfo(combination,action);
self._callbacks[info.key]=self._callbacks[info.key]||[];
_getMatches(info.key,info.modifiers,{type:info.action},sequenceName,combination,level);
self._callbacks[info.key][sequenceName?'unshift':'push']({callback:callback,modifiers:info.modifiers,action:info.action,seq:sequenceName,level:level,combo:combination});}self._bindMultiple=function(combinations,callback,action){for(var i=0;i<combinations.length;++i){_bindSingle(combinations[i],callback,action);}};
_addEvent(targetElement,'keypress',_handleKeyEvent);_addEvent(targetElement,'keydown',_handleKeyEvent);_addEvent(targetElement,'keyup',_handleKeyEvent);}Mousetrap.prototype.bind=function(keys,callback,action){var self=this;keys=keys instanceof Array?keys:[keys];self._bindMultiple.call(self,keys,callback,action);return self;};Mousetrap.prototype.unbind=function(keys,action){var self=this;return self.bind.call(self,keys,function(){},action);};Mousetrap.prototype.trigger=function(keys,action){var self=this;if(self._directMap[keys+':'+action]){self._directMap[keys+':'+action]({},keys);}return self;};Mousetrap.prototype.reset=function(){var self=this;self._callbacks={};self._directMap={};return self;};Mousetrap.prototype.stopCallback=function(e,element){var self=this;
if((' '+element.className+' ').indexOf(' mousetrap ')>-1){return false;}if(_belongsTo(element,self.target)){return false;}
if('composedPath'in e&&typeof e.composedPath==='function'){
var initialEventTarget=e.composedPath()[0];if(initialEventTarget!==e.target){element=initialEventTarget;}}
return element.tagName=='INPUT'||element.tagName=='SELECT'||element.tagName=='TEXTAREA'||element.isContentEditable;};Mousetrap.prototype.handleKey=function(){var self=this;return self._handleKey.apply(self,arguments);};Mousetrap.addKeycodes=function(object){for(var key in object){if(object.hasOwnProperty(key)){_MAP[key]=object[key];}}_REVERSE_MAP=null;};Mousetrap.init=function(){var documentMousetrap=Mousetrap(document);for(var method in documentMousetrap){if(method.charAt(0)!=='_'){Mousetrap[method]=function(method){return function(){return documentMousetrap[method].apply(documentMousetrap,arguments);};}(method);}}};Mousetrap.init();
window.Mousetrap=Mousetrap;
if(typeof module!=='undefined'&&module.exports){module.exports=Mousetrap;}
if(typeof define==='function'&&define.amd){define(function(){return Mousetrap;});}})(typeof window!=='undefined'?window:null,typeof window!=='undefined'?document:null);},{}],94:[function(require,module,exports){(function(process){(function(){
'use strict';function assertPath(path){if(typeof path!=='string'){throw new TypeError('Path must be a string. Received '+JSON.stringify(path));}}
function normalizeStringPosix(path,allowAboveRoot){var res='';var lastSegmentLength=0;var lastSlash=-1;var dots=0;var code;for(var i=0;i<=path.length;++i){if(i<path.length)code=path.charCodeAt(i);else if(code===47)break;else code=47;if(code===47){if(lastSlash===i-1||dots===1){
}else if(lastSlash!==i-1&&dots===2){if(res.length<2||lastSegmentLength!==2||res.charCodeAt(res.length-1)!==46||res.charCodeAt(res.length-2)!==46){if(res.length>2){var lastSlashIndex=res.lastIndexOf('/');if(lastSlashIndex!==res.length-1){if(lastSlashIndex===-1){res='';lastSegmentLength=0;}else{res=res.slice(0,lastSlashIndex);lastSegmentLength=res.length-1-res.lastIndexOf('/');}lastSlash=i;dots=0;continue;}}else if(res.length===2||res.length===1){res='';lastSegmentLength=0;lastSlash=i;dots=0;continue;}}if(allowAboveRoot){if(res.length>0)res+='/..';else res='..';lastSegmentLength=2;}}else{if(res.length>0)res+='/'+path.slice(lastSlash+1,i);else res=path.slice(lastSlash+1,i);lastSegmentLength=i-lastSlash-1;}lastSlash=i;dots=0;}else if(code===46&&dots!==-1){++dots;}else{dots=-1;}}return res;}function _format(sep,pathObject){var dir=pathObject.dir||pathObject.root;var base=pathObject.base||(pathObject.name||'')+(pathObject.ext||'');if(!dir){return base;}if(dir===pathObject.root){return dir+base;}return dir+sep+base;}var posix={
resolve:function resolve(){var resolvedPath='';var resolvedAbsolute=false;var cwd;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path;if(i>=0)path=arguments[i];else{if(cwd===undefined)cwd=process.cwd();path=cwd;}assertPath(path);
if(path.length===0){continue;}resolvedPath=path+'/'+resolvedPath;resolvedAbsolute=path.charCodeAt(0)===47;}
resolvedPath=normalizeStringPosix(resolvedPath,!resolvedAbsolute);if(resolvedAbsolute){if(resolvedPath.length>0)return'/'+resolvedPath;else return'/';}else if(resolvedPath.length>0){return resolvedPath;}else{return'.';}},normalize:function normalize(path){assertPath(path);if(path.length===0)return'.';var isAbsolute=path.charCodeAt(0)===47;var trailingSeparator=path.charCodeAt(path.length-1)===47;
path=normalizeStringPosix(path,!isAbsolute);if(path.length===0&&!isAbsolute)path='.';if(path.length>0&&trailingSeparator)path+='/';if(isAbsolute)return'/'+path;return path;},isAbsolute:function isAbsolute(path){assertPath(path);return path.length>0&&path.charCodeAt(0)===47;},join:function join(){if(arguments.length===0)return'.';var joined;for(var i=0;i<arguments.length;++i){var arg=arguments[i];assertPath(arg);if(arg.length>0){if(joined===undefined)joined=arg;else joined+='/'+arg;}}if(joined===undefined)return'.';return posix.normalize(joined);},relative:function relative(from,to){assertPath(from);assertPath(to);if(from===to)return'';from=posix.resolve(from);to=posix.resolve(to);if(from===to)return'';
var fromStart=1;for(;fromStart<from.length;++fromStart){if(from.charCodeAt(fromStart)!==47)break;}var fromEnd=from.length;var fromLen=fromEnd-fromStart;
var toStart=1;for(;toStart<to.length;++toStart){if(to.charCodeAt(toStart)!==47)break;}var toEnd=to.length;var toLen=toEnd-toStart;
var length=fromLen<toLen?fromLen:toLen;var lastCommonSep=-1;var i=0;for(;i<=length;++i){if(i===length){if(toLen>length){if(to.charCodeAt(toStart+i)===47){
return to.slice(toStart+i+1);}else if(i===0){
return to.slice(toStart+i);}}else if(fromLen>length){if(from.charCodeAt(fromStart+i)===47){
lastCommonSep=i;}else if(i===0){
lastCommonSep=0;}}break;}var fromCode=from.charCodeAt(fromStart+i);var toCode=to.charCodeAt(toStart+i);if(fromCode!==toCode)break;else if(fromCode===47)lastCommonSep=i;}var out='';
for(i=fromStart+lastCommonSep+1;i<=fromEnd;++i){if(i===fromEnd||from.charCodeAt(i)===47){if(out.length===0)out+='..';else out+='/..';}}
if(out.length>0)return out+to.slice(toStart+lastCommonSep);else{toStart+=lastCommonSep;if(to.charCodeAt(toStart)===47)++toStart;return to.slice(toStart);}},_makeLong:function _makeLong(path){return path;},dirname:function dirname(path){assertPath(path);if(path.length===0)return'.';var code=path.charCodeAt(0);var hasRoot=code===47;var end=-1;var matchedSlash=true;for(var i=path.length-1;i>=1;--i){code=path.charCodeAt(i);if(code===47){if(!matchedSlash){end=i;break;}}else{
matchedSlash=false;}}if(end===-1)return hasRoot?'/':'.';if(hasRoot&&end===1)return'//';return path.slice(0,end);},basename:function basename(path,ext){if(ext!==undefined&&typeof ext!=='string')throw new TypeError('"ext" argument must be a string');assertPath(path);var start=0;var end=-1;var matchedSlash=true;var i;if(ext!==undefined&&ext.length>0&&ext.length<=path.length){if(ext.length===path.length&&ext===path)return'';var extIdx=ext.length-1;var firstNonSlashEnd=-1;for(i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47){
if(!matchedSlash){start=i+1;break;}}else{if(firstNonSlashEnd===-1){
matchedSlash=false;firstNonSlashEnd=i+1;}if(extIdx>=0){
if(code===ext.charCodeAt(extIdx)){if(--extIdx===-1){
end=i;}}else{
extIdx=-1;end=firstNonSlashEnd;}}}}if(start===end)end=firstNonSlashEnd;else if(end===-1)end=path.length;return path.slice(start,end);}else{for(i=path.length-1;i>=0;--i){if(path.charCodeAt(i)===47){
if(!matchedSlash){start=i+1;break;}}else if(end===-1){
matchedSlash=false;end=i+1;}}if(end===-1)return'';return path.slice(start,end);}},extname:function extname(path){assertPath(path);var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;
var preDotState=0;for(var i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47){
if(!matchedSlash){startPart=i+1;break;}continue;}if(end===-1){
matchedSlash=false;end=i+1;}if(code===46){
if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1;}else if(startDot!==-1){
preDotState=-1;}}if(startDot===-1||end===-1||
preDotState===0||
preDotState===1&&startDot===end-1&&startDot===startPart+1){return'';}return path.slice(startDot,end);},format:function format(pathObject){if(pathObject===null||typeof pathObject!=='object'){throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof pathObject);}return _format('/',pathObject);},parse:function parse(path){assertPath(path);var ret={root:'',dir:'',base:'',ext:'',name:''};if(path.length===0)return ret;var code=path.charCodeAt(0);var isAbsolute=code===47;var start;if(isAbsolute){ret.root='/';start=1;}else{start=0;}var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;var i=path.length-1;
var preDotState=0;
for(;i>=start;--i){code=path.charCodeAt(i);if(code===47){
if(!matchedSlash){startPart=i+1;break;}continue;}if(end===-1){
matchedSlash=false;end=i+1;}if(code===46){
if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1;}else if(startDot!==-1){
preDotState=-1;}}if(startDot===-1||end===-1||
preDotState===0||
preDotState===1&&startDot===end-1&&startDot===startPart+1){if(end!==-1){if(startPart===0&&isAbsolute)ret.base=ret.name=path.slice(1,end);else ret.base=ret.name=path.slice(startPart,end);}}else{if(startPart===0&&isAbsolute){ret.name=path.slice(1,startDot);ret.base=path.slice(1,end);}else{ret.name=path.slice(startPart,startDot);ret.base=path.slice(startPart,end);}ret.ext=path.slice(startDot,end);}if(startPart>0)ret.dir=path.slice(0,startPart-1);else if(isAbsolute)ret.dir='/';return ret;},sep:'/',delimiter:':',win32:null,posix:null};posix.posix=posix;module.exports=posix;}).call(this);}).call(this,require('_process'));},{"_process":98}],95:[function(require,module,exports){var libWordTree=require(`./WordTree.js`);var libStringParser=require(`./StringParser.js`);class Precedent{constructor(){this.WordTree=new libWordTree();this.StringParser=new libStringParser();this.ParseTree=this.WordTree.ParseTree;}addPattern(pPatternStart,pPatternEnd,pParser){return this.WordTree.addPattern(pPatternStart,pPatternEnd,pParser);}parseString(pString,pData){return this.StringParser.parseString(pString,this.ParseTree,pData);}}module.exports=Precedent;},{"./StringParser.js":96,"./WordTree.js":97}],96:[function(require,module,exports){class StringParser{constructor(){}newParserState(pParseTree){return{ParseTree:pParseTree,Output:'',OutputBuffer:'',Pattern:false,PatternMatch:false,PatternMatchOutputBuffer:''};}assignNode(pNode,pParserState){pParserState.PatternMatch=pNode;
if(pParserState.PatternMatch.hasOwnProperty('PatternEnd')){
pParserState.Pattern=pParserState.PatternMatch;}}appendOutputBuffer(pCharacter,pParserState){pParserState.OutputBuffer+=pCharacter;}flushOutputBuffer(pParserState){pParserState.Output+=pParserState.OutputBuffer;pParserState.OutputBuffer='';}checkPatternEnd(pParserState,pData){if(pParserState.OutputBuffer.length>=pParserState.Pattern.PatternEnd.length+pParserState.Pattern.PatternStart.length&&pParserState.OutputBuffer.substr(-pParserState.Pattern.PatternEnd.length)===pParserState.Pattern.PatternEnd){
pParserState.OutputBuffer=pParserState.Pattern.Parse(pParserState.OutputBuffer.substr(pParserState.Pattern.PatternStart.length,pParserState.OutputBuffer.length-(pParserState.Pattern.PatternStart.length+pParserState.Pattern.PatternEnd.length)),pData);
this.flushOutputBuffer(pParserState);
pParserState.Pattern=false;pParserState.PatternMatch=false;}}parseCharacter(pCharacter,pParserState,pData){
if(!pParserState.PatternMatch&&pParserState.ParseTree.hasOwnProperty(pCharacter)){
this.assignNode(pParserState.ParseTree[pCharacter],pParserState);this.appendOutputBuffer(pCharacter,pParserState);}
else if(pParserState.PatternMatch){
if(pParserState.PatternMatch.hasOwnProperty(pCharacter)){
this.assignNode(pParserState.PatternMatch[pCharacter],pParserState);}this.appendOutputBuffer(pCharacter,pParserState);if(pParserState.Pattern){
this.checkPatternEnd(pParserState,pData);}}
else{pParserState.Output+=pCharacter;}}parseString(pString,pParseTree,pData){let tmpParserState=this.newParserState(pParseTree);for(var i=0;i<pString.length;i++){
this.parseCharacter(pString[i],tmpParserState,pData);}this.flushOutputBuffer(tmpParserState);return tmpParserState.Output;}}module.exports=StringParser;},{}],97:[function(require,module,exports){class WordTree{constructor(){this.ParseTree={};}addChild(pTree,pPattern,pIndex){if(!pTree.hasOwnProperty(pPattern[pIndex]))pTree[pPattern[pIndex]]={};return pTree[pPattern[pIndex]];}addPattern(pPatternStart,pPatternEnd,pParser){if(pPatternStart.length<1)return false;if(typeof pPatternEnd==='string'&&pPatternEnd.length<1)return false;let tmpLeaf=this.ParseTree;
for(var i=0;i<pPatternStart.length;i++)tmpLeaf=this.addChild(tmpLeaf,pPatternStart,i);tmpLeaf.PatternStart=pPatternStart;tmpLeaf.PatternEnd=typeof pPatternEnd==='string'&&pPatternEnd.length>0?pPatternEnd:pPatternStart;tmpLeaf.Parse=typeof pParser==='function'?pParser:typeof pParser==='string'?()=>{return pParser;}:pData=>{return pData;};return true;}}module.exports=WordTree;},{}],98:[function(require,module,exports){
var process=module.exports={};
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){
return setTimeout(fun,0);}
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{
return cachedSetTimeout(fun,0);}catch(e){try{
return cachedSetTimeout.call(null,fun,0);}catch(e){
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){
return clearTimeout(marker);}
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{
return cachedClearTimeout(marker);}catch(e){try{
return cachedClearTimeout.call(null,marker);}catch(e){
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],99:[function(require,module,exports){(function(setImmediate,clearImmediate){(function(){var nextTick=require('process/browser.js').nextTick;var apply=Function.prototype.apply;var slice=Array.prototype.slice;var immediateIds={};var nextImmediateId=0;
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){timeout.close();};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};
exports.setImmediate=typeof setImmediate==="function"?setImmediate:function(fn){var id=nextImmediateId++;var args=arguments.length<2?false:slice.call(arguments,1);immediateIds[id]=true;nextTick(function onNextTick(){if(immediateIds[id]){
if(args){fn.apply(null,args);}else{fn.call(null);}
exports.clearImmediate(id);}});return id;};exports.clearImmediate=typeof clearImmediate==="function"?clearImmediate:function(id){delete immediateIds[id];};}).call(this);}).call(this,require("timers").setImmediate,require("timers").clearImmediate);},{"process/browser.js":98,"timers":99}],100:[function(require,module,exports){ 
const libPict=require('./Pict.js');if(typeof window==='object'){window.Pict=libPict;}module.exports=libPict;},{"./Pict.js":104}],101:[function(require,module,exports){const libFableServiceBase=require('fable').ServiceProviderBase;const libElucidator=require('elucidator');class FableServiceElucidator extends libFableServiceBase{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='Solver';this.solver=new libElucidator(this.options);}}module.exports=FableServiceElucidator;},{"elucidator":31,"fable":79}],102:[function(require,module,exports){const libFableServiceBase=require('fable').ServiceProviderBase;const libInformary=require('informary');class FableServiceInformary extends libFableServiceBase{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='Informary';this.informary=new libInformary(this.options.Settings,this.options.Context,this.options.ContextGUID);}}module.exports=FableServiceInformary;},{"fable":79,"informary":81}],103:[function(require,module,exports){const libFableServiceBase=require('fable').ServiceProviderBase;const libManyfest=require('manyfest');class FableServiceManyfest extends libFableServiceBase{constructor(pFable,pOptions,pServiceHash){super(pFable,pOptions,pServiceHash);this.serviceType='Manifest';this.manyfest=false;if(JSON.stringify(this.options)!='{}'){this.manyfest=new libManyfest(this.options);}else{this.manyfest=new libManyfest();}
this.manifest=this.manyfest;}}module.exports=FableServiceManyfest;},{"fable":79,"manyfest":92}],104:[function(require,module,exports){const libFable=require('fable');const libFableServiceManyfest=require('./Pict-Fable-Service-Manyfest.js');const libFableServiceElucidator=require('./Pict-Fable-Service-Elucidator.js');const libFableServiceInformary=require('./Pict-Fable-Service-Informary.js');const libMouseTrap=require('mousetrap');class Pict{constructor(pOptions){this.fable=new libFable(pOptions);this.log=this.fable.log;this.settings=this.fable.settings;this.serviceManager=this.fable.serviceManager;this.fable.serviceManager.addServiceType('Manifest',libFableServiceManyfest);this.fable.serviceManager.addServiceType('Solver',libFableServiceElucidator);this.fable.serviceManager.addServiceType('Informary',libFableServiceInformary);
this.defaultTemplateProcessor=this.fable.serviceManager.instantiateServiceProvider('MetaTemplate',{},'defaultTemplateProcessor');this._DefaultTemplateMethodsInitialized=false;this.manifestServiceProvider=this.fable.serviceManager.instantiateServiceProvider('Manifest',{},'defaultManifest');this.manifest=this.manifestServiceProvider.manifest;this._TemplateContainer={};this.appData={};}initializeTemplateMethods(fExtraTemplateMethods){if(!this._DefaultTemplateMethodsInitialized){this.defaultTemplateProcessor.addPattern('{~Data:','~}',(pHash,pData)=>{let tmpHash=pHash.trim();let tmpValue=this.manifest.getValueAtAddress({AppData:this.appData,Record:pData},tmpHash);if(tmpValue==null||tmpValue=='undefined'||typeof tmpValue=='undefined'){console.log('undefined!');return'';}return tmpValue;});this.defaultTemplateProcessor.addPattern('{~Dollars:','~}',(pHash,pData)=>{let tmpHash=pHash.trim();let tmpValue=this.manifest.getValueAtAddress({AppData:this.appData,Record:pData},tmpHash);return this.fable.DataArithmatic.formatterDollars(tmpValue);});this.defaultTemplateProcessor.addPattern('{~Digits:','~}',(pHash,pData)=>{let tmpHash=pHash.trim();let tmpValue=this.manifest.getValueAtAddress({AppData:this.appData,Record:pData},tmpHash);return this.fable.DataArithmatic.formatterAddCommasToNumber(this.fable.DataArithmatic.formatterRoundNumber(tmpValue,2));});this.defaultTemplateProcessor.addPattern('{~NotEmpty:','~}',(pHash,pData)=>{let tmpHash=pHash.trim();let tmpHashParts=tmpHash.split('|');if(tmpHashParts.length!=2){return'';}let tmpValue=this.manifest.getValueAtAddress({AppData:this.appData,Record:pData},tmpHashParts[0]);
if(tmpValue){return tmpHashParts[1];}else{return'';}});this._DefaultTemplateMethodsInitialized=true;}}parseTemplate(pTemplateString,pData){return this.defaultTemplateProcessor.parseString(pTemplateString,pData);}};module.exports=Pict;},{"./Pict-Fable-Service-Elucidator.js":101,"./Pict-Fable-Service-Informary.js":102,"./Pict-Fable-Service-Manyfest.js":103,"fable":79,"mousetrap":93}]},{},[100])(100);});