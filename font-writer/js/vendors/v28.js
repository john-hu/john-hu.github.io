(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{124:function(t,n,i){"use strict";var e=i(13),r=i(127),o=i(76),s=i(133),u=i(137),a=/^(Version )?(\d+[.]\d+)$/i;t.exports=function(t,n){var i=new u.Font,h=s.load(t);n=n||{},i.id=n.id||h.id,i.familyName=n.familyname||h.familyName||h.id,i.copyright=n.copyright||h.metadata,i.description=n.description||"Generated by svg2ttf from Fontello project.",i.url=n.url||"http://fontello.com",i.sfntNames.push({id:2,value:n.subfamilyname||h.subfamilyName||"Regular"}),i.sfntNames.push({id:4,value:n.fullname||h.id});var c=n.version||"Version 1.0";if("string"!=typeof c)throw new Error("svg2ttf: version option should be a string");if(!a.test(c))throw new Error('svg2ttf: invalid option, version - "'+n.version+'"');c="Version "+c.match(a)[2],i.sfntNames.push({id:5,value:c}),i.sfntNames.push({id:6,value:(n.fullname||h.id).replace(/[\s\(\)\[\]<>%\/]/g,"").substr(0,62)}),void 0!==n.ts&&(i.createdDate=i.modifiedDate=new Date(1e3*parseInt(n.ts,10))),i.unitsPerEm=h.unitsPerEm||1e3,i.horizOriginX=h.horizOriginX||0,i.horizOriginY=h.horizOriginY||0,i.vertOriginX=h.vertOriginX||0,i.vertOriginY=h.vertOriginY||0,i.width=h.width||h.unitsPerEm,i.height=h.height||h.unitsPerEm,i.descent=isNaN(h.descent)?-i.vertOriginY:h.descent,i.ascent=h.ascent||i.unitsPerEm-i.vertOriginY,void 0!==h.underlinePosition&&(i.underlinePosition=h.underlinePosition),void 0!==h.underlineThickness&&(i.underlineThickness=h.underlineThickness);var f,p=i.glyphs,l=i.codePoints,d=i.ligatures;function g(t,n){return!l[t]&&(l[t]=n,!0)}e.forEach(h.glyphs,function(t){var n=new u.Glyph;n.name=t.name,n.d=t.d,n.height=isNaN(t.height)?i.height:t.height,n.width=isNaN(t.width)?i.width:t.width,p.push(n),t.sfntGlyph=n,e.forEach(t.unicode,function(t){g(t,n)})}),h.missingGlyph?((f=new u.Glyph).d=h.missingGlyph.d,f.height=isNaN(h.missingGlyph.height)?i.height:h.missingGlyph.height,f.width=isNaN(h.missingGlyph.width)?i.width:h.missingGlyph.width):f=e.find(p,function(t){return".notdef"===t.name}),f||(f=new u.Glyph),e.forEach(h.ligatures,function(t){var n={ligature:t.ligature,unicode:t.unicode,glyph:t.glyph.sfntGlyph};e.forEach(n.unicode,function(t){var n=new u.Glyph;g(t,n)&&(n.name=o.encode([t]),p.push(n))}),d.push(n)}),-1!==p.indexOf(f)&&p.splice(p.indexOf(f),1),p.unshift(f);var w=0;return e.forEach(p,function(t){t.id=w,w++}),e.forEach(p,function(t){var n=Math.max(t.width,t.height),i=n>500?.3:6e-4*n,o=new r(t.d).abs().unshort().unarc().iterate(function(t,n,e,r){return s.cubicToQuad(t,n,e,r,i)}),a=s.toSfntCoutours(o);t.contours=e.map(a,function(t){var n=new u.Contour;return n.points=e.map(t,function(t){var n=new u.Point;return n.x=t.x,n.y=t.y,n.onCurve=t.onCurve,n}),n})}),u.toTTF(i)}},133:function(t,n,i){"use strict";var e=i(13),r=i(134),o=i(135).DOMParser,s=i(76);t.exports.load=function(t){var n,i,r,u,a=(new o).parseFromString(t,"application/xml");if(i=a.getElementsByTagName("metadata")[0],!(r=a.getElementsByTagName("font")[0]))throw new Error("Can't find <font> tag. Make sure you SVG file is font, not image.");var h=(u=r.getElementsByTagName("font-face")[0]).getAttribute("font-family")||"fontello",c=u.getAttribute("font-style")||"Regular",f={id:r.getAttribute("id")||(h+"-"+c).replace(/[\s\(\)\[\]<>%\/]/g,"").substr(0,62),familyName:h,subfamilyName:c,stretch:u.getAttribute("font-stretch")||"normal"};i&&i.textContent&&(f.metadata=i.textContent),n={width:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y"},e.forEach(n,function(t,n){r.hasAttribute(t)&&(f[n]=parseInt(r.getAttribute(t),10))}),n={ascent:"ascent",descent:"descent",unitsPerEm:"units-per-em",underlineThickness:"underline-thickness",underlinePosition:"underline-position"},e.forEach(n,function(t,n){u.hasAttribute(t)&&(f[n]=parseInt(u.getAttribute(t),10))}),u.hasAttribute("font-weight")&&(f.weightClass=u.getAttribute("font-weight"));var p=r.getElementsByTagName("missing-glyph")[0];p&&(f.missingGlyph={},f.missingGlyph.d=p.getAttribute("d")||"",p.getAttribute("horiz-adv-x")&&(f.missingGlyph.width=parseInt(p.getAttribute("horiz-adv-x"),10)));var l=[],d=[];return e.forEach(r.getElementsByTagName("glyph"),function(t){var n=function(t){var n={};if(n.d=t.getAttribute("d").trim(),n.unicode=[],t.getAttribute("unicode")){n.character=t.getAttribute("unicode");var i=s.decode(n.character);i.length>1?(n.ligature=n.character,n.ligatureCodes=i):n.unicode.push(i[0])}return n.name=t.getAttribute("glyph-name"),t.getAttribute("horiz-adv-x")&&(n.width=parseInt(t.getAttribute("horiz-adv-x"),10)),n}(t);e.has(n,"ligature")&&d.push({ligature:n.ligature,unicode:n.ligatureCodes,glyph:n}),l.push(n)}),l=function(t,n){var i=[];return e.forEach(t,function(t){var n=e.find(i,{width:t.width,d:t.d});n?(n.unicode=n.unicode.concat(t.unicode),t.canonical=n):i.push(t)}),e.forEach(n,function(t){for(;e.has(t.glyph,"canonical");)t.glyph=t.glyph.canonical}),i}(l,d),f.glyphs=l,f.ligatures=d,f},t.exports.cubicToQuad=function(t,n,i,e,o){if("C"===t[0]){for(var s=r(i,e,t[1],t[2],t[3],t[4],t[5],t[6],o),u=[],a=2;a<s.length;a+=4)u.push(["Q",s[a],s[a+1],s[a+2],s[a+3]]);return u}},t.exports.toSfntCoutours=function(t){var n=[],i=[];return t.iterate(function(t,e,r,o){0!==e&&"M"!==t[0]||(i=[],n.push(i));var s=t[0];"Q"===s&&i.push({x:t[1],y:t[2],onCurve:!1}),"H"===s?i.push({x:t[1],y:o,onCurve:!0}):"V"===s?i.push({x:r,y:t[1],onCurve:!0}):"Z"!==s&&i.push({x:t[t.length-2],y:t[t.length-1],onCurve:!0})}),n}},137:function(t,n,i){"use strict";var e=i(13);function r(){this.contours=[],this.d="",this.id="",this.height=0,this.name="",this.width=0}Object.defineProperty(r.prototype,"xMin",{get:function(){var t=0,n=!1;return e.forEach(this.contours,function(i){e.forEach(i.points,function(i){t=Math.min(t,Math.floor(i.x)),n=!0})}),n?t:0}}),Object.defineProperty(r.prototype,"xMax",{get:function(){var t=0,n=!1;return e.forEach(this.contours,function(i){e.forEach(i.points,function(i){t=Math.max(t,-Math.floor(-i.x)),n=!0})}),n?t:this.width}}),Object.defineProperty(r.prototype,"yMin",{get:function(){var t=0,n=!1;return e.forEach(this.contours,function(i){e.forEach(i.points,function(i){t=Math.min(t,Math.floor(i.y)),n=!0})}),n?t:0}}),Object.defineProperty(r.prototype,"yMax",{get:function(){var t=0,n=!1;return e.forEach(this.contours,function(i){e.forEach(i.points,function(i){t=Math.max(t,-Math.floor(-i.y)),n=!0})}),n?t:0}}),t.exports.Font=function(){this.ascent=850,this.copyright="",this.createdDate=new Date,this.glyphs=[],this.ligatures=[],this.codePoints={},this.isFixedPitch=0,this.italicAngle=0,this.familyClass=0,this.familyName="",this.fsSelection=64,this.fsType=0,this.lowestRecPPEM=8,this.macStyle=0,this.modifiedDate=new Date,this.panose={familyType:2,serifStyle:0,weight:5,proportion:3,contrast:0,strokeVariation:0,armStyle:0,letterform:0,midline:0,xHeight:0},this.revision=1,this.sfntNames=[],this.underlineThickness=0,this.unitsPerEm=1e3,this.weightClass=400,this.width=1e3,this.widthClass=5,this.ySubscriptXOffset=0,this.ySuperscriptXOffset=0,this.int_descent=-150,Object.defineProperty(this,"descent",{get:function(){return this.int_descent},set:function(t){this.int_descent=parseInt(Math.round(-Math.abs(t)),10)}}),this.__defineGetter__("avgCharWidth",function(){if(0===this.glyphs.length)return 0;var t=e.map(this.glyphs,"width");return parseInt(t.reduce(function(t,n){return t+n})/t.length,10)}),Object.defineProperty(this,"ySubscriptXSize",{get:function(){return parseInt(e.isUndefined(this.int_ySubscriptXSize)?.6347*this.width:this.int_ySubscriptXSize,10)},set:function(t){this.int_ySubscriptXSize=t}}),Object.defineProperty(this,"ySubscriptYSize",{get:function(){return parseInt(e.isUndefined(this.int_ySubscriptYSize)?.7*(this.ascent-this.descent):this.int_ySubscriptYSize,10)},set:function(t){this.int_ySubscriptYSize=t}}),Object.defineProperty(this,"ySubscriptYOffset",{get:function(){return parseInt(e.isUndefined(this.int_ySubscriptYOffset)?.14*(this.ascent-this.descent):this.int_ySubscriptYOffset,10)},set:function(t){this.int_ySubscriptYOffset=t}}),Object.defineProperty(this,"ySuperscriptXSize",{get:function(){return parseInt(e.isUndefined(this.int_ySuperscriptXSize)?.6347*this.width:this.int_ySuperscriptXSize,10)},set:function(t){this.int_ySuperscriptXSize=t}}),Object.defineProperty(this,"ySuperscriptYSize",{get:function(){return parseInt(e.isUndefined(this.int_ySuperscriptYSize)?.7*(this.ascent-this.descent):this.int_ySuperscriptYSize,10)},set:function(t){this.int_ySuperscriptYSize=t}}),Object.defineProperty(this,"ySuperscriptYOffset",{get:function(){return parseInt(e.isUndefined(this.int_ySuperscriptYOffset)?.48*(this.ascent-this.descent):this.int_ySuperscriptYOffset,10)},set:function(t){this.int_ySuperscriptYOffset=t}}),Object.defineProperty(this,"yStrikeoutSize",{get:function(){return parseInt(e.isUndefined(this.int_yStrikeoutSize)?.049*(this.ascent-this.descent):this.int_yStrikeoutSize,10)},set:function(t){this.int_yStrikeoutSize=t}}),Object.defineProperty(this,"yStrikeoutPosition",{get:function(){return parseInt(e.isUndefined(this.int_yStrikeoutPosition)?.258*(this.ascent-this.descent):this.int_yStrikeoutPosition,10)},set:function(t){this.int_yStrikeoutPosition=t}}),Object.defineProperty(this,"minLsb",{get:function(){return parseInt(e.min(e.map(this.glyphs,"xMin")),10)}}),Object.defineProperty(this,"minRsb",{get:function(){return this.glyphs.length?parseInt(e.reduce(this.glyphs,function(t,n){return Math.min(t,n.width-n.xMax)},0),10):parseInt(this.width,10)}}),Object.defineProperty(this,"xMin",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.min(t,n.xMin)},0):this.width}}),Object.defineProperty(this,"yMin",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.min(t,n.yMin)},0):this.width}}),Object.defineProperty(this,"xMax",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.max(t,n.xMax)},0):this.width}}),Object.defineProperty(this,"yMax",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.max(t,n.yMax)},0):this.width}}),Object.defineProperty(this,"avgWidth",{get:function(){var t=this.glyphs.length;if(0===t)return this.width;var n=e.reduce(this.glyphs,function(t,n){return t+n.width},0);return Math.round(n/t)}}),Object.defineProperty(this,"maxWidth",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.max(t,n.width)},0):this.width}}),Object.defineProperty(this,"maxExtent",{get:function(){return this.glyphs.length?e.reduce(this.glyphs,function(t,n){return Math.max(t,n.xMax)},0):this.width}}),Object.defineProperty(this,"lineGap",{get:function(){return parseInt(e.isUndefined(this.int_lineGap)?.09*(this.ascent-this.descent):this.int_lineGap,10)},set:function(t){this.int_lineGap=t}}),Object.defineProperty(this,"underlinePosition",{get:function(){return parseInt(e.isUndefined(this.int_underlinePosition)?.01*(this.ascent-this.descent):this.int_underlinePosition,10)},set:function(t){this.int_underlinePosition=t}})},t.exports.Glyph=r,t.exports.Contour=function(){this.points=[]},t.exports.Point=function(){this.onCurve=!0,this.x=0,this.y=0},t.exports.SfntName=function(){this.id=0,this.value=""},t.exports.toTTF=i(138)},138:function(t,n,i){"use strict";var e=i(13),r=i(15),o=i(139),s=i(141),u=i(142),a=i(143),h=i(144),c=i(145),f=i(146),p=i(147),l=i(148),d=i(149),g=i(151),w=i(58),y=[{innerName:"GSUB",order:4,create:o},{innerName:"OS/2",order:4,create:s},{innerName:"cmap",order:6,create:u},{innerName:"glyf",order:8,create:a},{innerName:"head",order:2,create:h},{innerName:"hhea",order:1,create:c},{innerName:"hmtx",order:5,create:f},{innerName:"loca",order:7,create:p},{innerName:"maxp",order:3,create:l},{innerName:"name",order:9,create:d},{innerName:"post",order:10,create:g}],v={VERSION:65536,CHECKSUM_ADJUSTMENT:2981146554};function m(t){return(t&=4294967295)<0&&(t+=4294967296),t}function U(t){var n,i=0,e=Math.floor(t.length/4);for(n=0;n<e;++n){i=m(i+t.getUint32(4*n))}var r=t.length-4*e;if(r>0){var o=0;for(n=0;n<4;n++)o=(o<<8)+(n<r?t.getUint8(4*e+n):0);i=m(i+o)}return i}t.exports=function(t){e.forEach(t.glyphs,function(t){t.ttfContours=e.map(t.contours,function(t){return t.points})}),e.forEach(t.glyphs,function(t){t.ttfContours=w.simplify(t.ttfContours,.3),t.ttfContours=w.simplify(t.ttfContours,.3),t.ttfContours=w.interpolate(t.ttfContours,1.1),t.ttfContours=w.roundPoints(t.ttfContours),t.ttfContours=w.removeClosingReturnPoints(t.ttfContours),t.ttfContours=w.toRelative(t.ttfContours)});var n=12+16*y.length,i=n;e.forEach(y,function(n){n.buffer=n.create(t),n.length=n.buffer.length,n.corLength=n.length+(4-n.length%4)%4,n.checkSum=U(n.buffer),i+=n.corLength});var o=n;e.forEach(e.sortBy(y,"order"),function(t){t.offset=o,o+=t.corLength});var s=new r(i),u=Math.floor(Math.log(y.length)/Math.LN2),a=16*Math.pow(2,u),h=16*y.length-a;s.writeUint32(v.VERSION),s.writeUint16(y.length),s.writeUint16(a),s.writeUint16(u),s.writeUint16(h),e.forEach(y,function(t){s.writeUint32(w.identifier(t.innerName)),s.writeUint32(t.checkSum),s.writeUint32(t.offset),s.writeUint32(t.length)});var c=0;return e.forEach(e.sortBy(y,"order"),function(t){"head"===t.innerName&&(c=s.tell()),s.writeBytes(t.buffer.buffer);for(var n=t.length;n<t.corLength;n++)s.writeUint8(0)}),s.setUint32(c+8,m(v.CHECKSUM_ADJUSTMENT-U(s))),s}},139:function(t,n,i){"use strict";var e=i(13),r=i(58).identifier,o=i(15);function s(){var t=new o(12);return t.writeUint16(4),t.writeUint16(0),t.writeUint16(0),t.writeUint16(0),t.writeUint16(1),t.writeUint16(0),t}function u(t,n,i){var r=[];e.forEach(i,function(n){r.push(function(t,n){var i=t.codePoints,e=n.unicode,r=4+2*(e.length-1),s=new o(r),u=n.glyph;s.writeUint16(u.id),s.writeUint16(e.length);for(var a=1;a<e.length;a++)u=i[e[a]],s.writeUint16(u.id);return s}(t,n))});var s=e.reduce(e.map(r,"length"),function(t,n){return t+n},0),u=2+2*i.length,a=new o(0+u+s);return a.writeUint16(i.length),e.forEach(r,function(t){a.writeUint16(u),u+=t.length}),e.forEach(r,function(t){a.writeBytes(t.buffer)}),a}function a(t,n){var i=[];e.forEach(n,function(n){var e=u(t,n.codePoint,n.ligatures);i.push(e)});var r=e.reduce(e.map(i,"length"),function(t,n){return t+n},0),s=function(t,n){var i=n.length,r=new o(4+2*i);return r.writeUint16(1),r.writeUint16(i),e.forEach(n,function(t){r.writeUint16(t.startGlyph.id)}),r}(0,n),a=6+2*i.length,h=a+r,c=8+h+s.length,f=new o(c);return f.writeUint16(4),f.writeUint16(0),f.writeUint16(1),f.writeUint16(8),f.writeUint16(1),f.writeUint16(h),f.writeUint16(i.length),e.forEach(i,function(t){f.writeUint16(a),a+=t.length}),e.forEach(i,function(t){f.writeBytes(t.buffer)}),f.writeBytes(s.buffer),f}t.exports=function(t){var n=[function(){var t=[["DFLT",s()],["latn",s()]],n=2+6*t.length,i=e.reduce(e.map(t,function(t){return t[1].length}),function(t,n){return t+n},0),u=new o(0+n+i);u.writeUint16(t.length);var a=n;return e.forEach(t,function(t){var n=t[0],i=t[1];u.writeUint32(r(n)),u.writeUint16(a),a+=i.length}),e.forEach(t,function(t){var n=t[1];u.writeBytes(n.buffer)}),u}(),function(){var t=new o(14);return t.writeUint16(1),t.writeUint32(r("liga")),t.writeUint16(8),t.writeUint16(0),t.writeUint16(1),t.writeUint16(0),t}(),function(t){var n=t.ligatures,i={};e.forEach(n,function(t){var n=t.unicode[0];e.has(i,n)||(i[n]=[]),i[n].push(t)});var r=[];e.forEach(i,function(n,i){i=parseInt(i,10),n.sort(function(t,n){return n.unicode.length-t.unicode.length}),r.push({codePoint:i,ligatures:n,startGlyph:t.codePoints[i]})}),r.sort(function(t,n){return t.startGlyph.id-n.startGlyph.id});var s=a(t,r),u=4+s.length,h=new o(u);return h.writeUint16(1),h.writeUint16(4),h.writeBytes(s.buffer),h}(t)],i=4+2*n.length;e.forEach(n,function(t){t._listOffset=i,i+=t.length});var u=new o(i);return u.writeUint32(65536),e.forEach(n,function(t){u.writeUint16(t._listOffset)}),e.forEach(n,function(t){u.writeBytes(t.buffer)}),u}},140:function(t,n,i){"use strict";function e(t,n){this.x=t,this.y=n}e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y)},e.prototype.sub=function(t){return new e(this.x-t.x,this.y-t.y)},e.prototype.mul=function(t){return new e(this.x*t,this.y*t)},e.prototype.div=function(t){return new e(this.x/t,this.y/t)},e.prototype.dist=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},e.prototype.sqr=function(){return this.x*this.x+this.y*this.y},t.exports.Point=e,t.exports.isInLine=function(t,n,i,e){var r=t.sub(n).sqr(),o=i.sub(n).sqr(),s=t.sub(i).sqr();return!(r>o+s||o>r+s)&&Math.sqrt(Math.pow((t.x-n.x)*(i.y-n.y)-(i.x-n.x)*(t.y-n.y),2)/s)<e}},141:function(t,n,i){"use strict";var e=i(13),r=i(58).identifier,o=i(15);t.exports=function(t){var n=new o(86);return n.writeUint16(1),n.writeInt16(t.avgWidth),n.writeUint16(t.weightClass),n.writeUint16(t.widthClass),n.writeInt16(t.fsType),n.writeInt16(t.ySubscriptXSize),n.writeInt16(t.ySubscriptYSize),n.writeInt16(t.ySubscriptXOffset),n.writeInt16(t.ySubscriptYOffset),n.writeInt16(t.ySuperscriptXSize),n.writeInt16(t.ySuperscriptYSize),n.writeInt16(t.ySuperscriptXOffset),n.writeInt16(t.ySuperscriptYOffset),n.writeInt16(t.yStrikeoutSize),n.writeInt16(t.yStrikeoutPosition),n.writeInt16(t.familyClass),n.writeUint8(t.panose.familyType),n.writeUint8(t.panose.serifStyle),n.writeUint8(t.panose.weight),n.writeUint8(t.panose.proportion),n.writeUint8(t.panose.contrast),n.writeUint8(t.panose.strokeVariation),n.writeUint8(t.panose.armStyle),n.writeUint8(t.panose.letterform),n.writeUint8(t.panose.midline),n.writeUint8(t.panose.xHeight),n.writeUint32(0),n.writeUint32(0),n.writeUint32(0),n.writeUint32(0),n.writeUint32(r("PfEd")),n.writeUint16(t.fsSelection),n.writeUint16(function(t){return Math.max(0,Math.min(65535,Math.abs(e.minBy(Object.keys(t.codePoints),function(t){return parseInt(t,10)}))))}(t)),n.writeUint16(function(t){return Math.max(0,Math.min(65535,Math.abs(e.maxBy(Object.keys(t.codePoints),function(t){return parseInt(t,10)}))))}(t)),n.writeInt16(t.ascent),n.writeInt16(t.descent),n.writeInt16(t.lineGap),n.writeInt16(Math.max(t.yMax,t.ascent)),n.writeInt16(-Math.min(t.yMin,t.descent)),n.writeInt32(1),n.writeInt32(0),n}},142:function(t,n,i){"use strict";var e=i(13),r=i(15);function o(t,n){return t.codePoints[n]?t.codePoints[n].id:0}function s(t,n){var i=8===t||10===t||12===t||13===t?4:2,e=new r(n+=0+i+i+i),o=4===i?e.writeUint32:e.writeUint16;return e.writeUint16(t),4===i&&e.writeUint16(0),o.call(e,n),o.call(e,0),e}function u(t){var n,i=function(t,n){n=n||Number.MAX_VALUE;var i,r=[];return e.forEach(t.codePoints,function(t,e){if((e=parseInt(e,10))>=n)return!1;i&&e===i.end+1||(i&&r.push(i),i={start:e}),i.end=e}),i&&r.push(i),e.forEach(r,function(t){t.length=t.end-t.start+1}),r}(t,65535),r=[];e.forEach(i,function(n){for(var i=[],e=n.start;e<=n.end;e++)i.push(o(t,e));r.push(i)});var u=i.length+1,a=s(4,8+2*u+2+2*u+2*u+2*u+2*e.reduce(e.map(r,"length"),function(t,n){return t+n},0));a.writeUint16(2*u);var h=Math.floor(Math.log(u)/Math.LN2),c=2*Math.pow(2,h);for(a.writeUint16(c),a.writeUint16(h),a.writeUint16(2*u-c),e.forEach(i,function(t){a.writeUint16(t.end)}),a.writeUint16(65535),a.writeUint16(0),e.forEach(i,function(t){a.writeUint16(t.start)}),a.writeUint16(65535),n=0;n<i.length;n++)a.writeUint16(0);a.writeUint16(1);var f=0;for(n=0;n<i.length;n++)a.writeUint16(2*(i.length-n+1+f)),f+=r[n].length;return a.writeUint16(0),e.forEach(r,function(t){e.forEach(t,function(t){a.writeUint16(t)})}),a}function a(t){var n=function(t,n){n=n||Number.MAX_VALUE;var i=[];return e.forEach(t,function(t,e){if((e=parseInt(e,10))>n)return!1;i.push({unicode:e,glyph:t})}),i}(t.codePoints),i=s(12,4+4*n.length+4*n.length+4*n.length);return i.writeUint32(n.length),e.forEach(n,function(t){i.writeUint32(t.unicode),i.writeUint32(t.unicode),i.writeUint32(t.glyph.id)}),i}t.exports=function(t){var n=function(t){var n,i=s(0,256);for(n=0;n<256;n++)i.writeUint8(o(t,n));return i}(t),i=u(t),h=a(t),c=[{platformID:0,encodingID:3,table:i},{platformID:0,encodingID:4,table:h},{platformID:1,encodingID:0,table:n},{platformID:3,encodingID:1,table:i},{platformID:3,encodingID:10,table:h}],f=[i,n,h],p=4+8*c.length;e.forEach(f,function(t){t._tableOffset=p,p+=t.length});var l=new r(p);return l.writeUint16(0),l.writeUint16(c.length),e.forEach(c,function(t){l.writeUint16(t.platformID),l.writeUint16(t.encodingID),l.writeUint32(t.table._tableOffset)}),e.forEach(f,function(t){l.writeBytes(t.buffer)}),l}},143:function(t,n,i){"use strict";var e=i(13),r=i(15);function o(t,n){var i=[];return e.forEach(t.ttfContours,function(t){i.push.apply(i,e.map(t,n))}),i}function s(t){return e.filter(t,function(t){return 0!==t})}function u(t){var n=0;return e.forEach(t.glyphs,function(t){t.ttf_size=function(t){if(!t.contours.length)return 0;var n=12;return n+=2*t.contours.length,e.forEach(t.ttf_x,function(t){n+=-255<=t&&t<=255?1:2}),e.forEach(t.ttf_y,function(t){n+=-255<=t&&t<=255?1:2}),(n+=t.ttf_flags.length)%4!=0&&(n+=4-n%4),n}(t),n+=t.ttf_size}),t.ttf_glyph_size=n,n}t.exports=function(t){e.forEach(t.glyphs,function(t){var n,i,r,u;t.ttf_flags=function(t){var n=[];return e.forEach(t.ttfContours,function(t){e.forEach(t,function(t){var i=t.onCurve?1:0;0===t.x?i+=16:(-255<=t.x&&t.x<=255&&(i+=2),t.x>0&&t.x<=255&&(i+=16)),0===t.y?i+=32:(-255<=t.y&&t.y<=255&&(i+=4),t.y>0&&t.y<=255&&(i+=32)),n.push(i)})}),n}(t),t.ttf_flags=(n=t.ttf_flags,i=[],r=-1,u=!1,e.forEach(n,function(t){r===t?u?(i[i.length-1]+=8,i.push(1),u=!1):i[i.length-1]++:(u=!0,r=t,i.push(t))}),i),t.ttf_x=o(t,"x"),t.ttf_x=s(t.ttf_x),t.ttf_y=o(t,"y"),t.ttf_y=s(t.ttf_y)});var n=new r(u(t));return e.forEach(t.glyphs,function(t){if(t.contours.length){var i=n.tell();n.writeInt16(t.contours.length),n.writeInt16(t.xMin),n.writeInt16(t.yMin),n.writeInt16(t.xMax),n.writeInt16(t.yMax);var r=-1,o=t.ttfContours;e.forEach(o,function(t){r+=t.length,n.writeInt16(r)}),n.writeInt16(0),e.forEach(t.ttf_flags,function(t){n.writeInt8(t)}),e.forEach(t.ttf_x,function(t){-255<=t&&t<=255?n.writeUint8(Math.abs(t)):n.writeInt16(t)}),e.forEach(t.ttf_y,function(t){-255<=t&&t<=255?n.writeUint8(Math.abs(t)):n.writeInt16(t)});var s=(n.tell()-i)%4;if(0!==s)for(;s<4;s++)n.writeUint8(0)}}),n}},144:function(t,n,i){"use strict";var e=i(15);function r(t){var n=new Date("1904-01-01T00:00:00.000Z");return Math.floor((t-n)/1e3)}t.exports=function(t){var n=new e(54);return n.writeInt32(65536),n.writeInt32(65536*t.revision),n.writeUint32(0),n.writeUint32(1594834165),n.writeUint16(11),n.writeUint16(t.unitsPerEm),n.writeUint64(r(t.createdDate)),n.writeUint64(r(t.modifiedDate)),n.writeInt16(t.xMin),n.writeInt16(t.yMin),n.writeInt16(t.xMax),n.writeInt16(t.yMax),n.writeUint16(t.macStyle),n.writeUint16(t.lowestRecPPEM),n.writeInt16(2),n.writeInt16(t.ttf_glyph_size<131072?0:1),n.writeInt16(0),n}},145:function(t,n,i){"use strict";var e=i(15);t.exports=function(t){var n=new e(36);return n.writeInt32(65536),n.writeInt16(t.ascent),n.writeInt16(t.descent),n.writeInt16(0),n.writeUint16(t.maxWidth),n.writeInt16(t.minLsb),n.writeInt16(t.minRsb),n.writeInt16(t.maxExtent),n.writeInt16(1),n.writeInt16(0),n.writeUint32(0),n.writeUint32(0),n.writeUint16(0),n.writeInt16(0),n.writeUint16(t.glyphs.length),n}},146:function(t,n,i){"use strict";var e=i(13),r=i(15);t.exports=function(t){var n=new r(4*t.glyphs.length);return e.forEach(t.glyphs,function(t){n.writeUint16(t.width),n.writeInt16(t.xMin)}),n}},147:function(t,n,i){"use strict";var e=i(13),r=i(15);t.exports=function(t){var n=t.ttf_glyph_size<131072,i=new r(function(t,n){return(t.glyphs.length+1)*(n?2:4)}(t,n)),o=0;return e.forEach(t.glyphs,function(t){n?(i.writeUint16(o),o+=t.ttf_size/2):(i.writeUint32(o),o+=t.ttf_size)}),n?i.writeUint16(o):i.writeUint32(o),i}},148:function(t,n,i){"use strict";var e=i(13),r=i(15);t.exports=function(t){var n=new r(32);return n.writeInt32(65536),n.writeUint16(t.glyphs.length),n.writeUint16(function(t){return e.max(e.map(t.glyphs,function(t){return e.reduce(t.ttfContours,function(t,n){return t+n.length},0)}))}(t)),n.writeUint16(function(t){return e.max(e.map(t.glyphs,function(t){return t.ttfContours.length}))}(t)),n.writeUint16(0),n.writeUint16(0),n.writeUint16(2),n.writeUint16(0),n.writeUint16(10),n.writeUint16(10),n.writeUint16(0),n.writeUint16(255),n.writeUint16(0),n.writeUint16(0),n.writeUint16(0),n}},149:function(t,n,i){"use strict";var e=i(13),r=i(15),o=i(150),s={COPYRIGHT:0,FONT_FAMILY:1,ID:3,DESCRIPTION:10,URL_VENDOR:11};function u(t,n){var i=[],e=new o(t);return i.push({data:e.toUTF8Bytes(),id:n,platformID:1,encodingID:0,languageID:0}),i.push({data:e.toUCS2Bytes(),id:n,platformID:3,encodingID:1,languageID:1033}),i}t.exports=function(t){var n=function(t){var n=[];return t.copyright&&n.push.apply(n,u(t.copyright,s.COPYRIGHT)),t.familyName&&n.push.apply(n,u(t.familyName,s.FONT_FAMILY)),t.id&&n.push.apply(n,u(t.id,s.ID)),n.push.apply(n,u(t.description,s.DESCRIPTION)),n.push.apply(n,u(t.url,s.URL_VENDOR)),e.forEach(t.sfntNames,function(t){n.push.apply(n,u(t.value,t.id))}),n.sort(function(t,n){var i,e=["platformID","encodingID","languageID","id"];for(i=0;i<e.length;i++)if(t[e[i]]!==n[e[i]])return t[e[i]]<n[e[i]]?-1:1;return 0}),n}(t),i=new r(function(t){var n=6;return e.forEach(t,function(t){n+=12+t.data.length}),n}(n));i.writeUint16(0),i.writeUint16(n.length);var o=i.tell();i.writeUint16(0);var a=0;e.forEach(n,function(t){i.writeUint16(t.platformID),i.writeUint16(t.encodingID),i.writeUint16(t.languageID),i.writeUint16(t.id),i.writeUint16(t.data.length),i.writeUint16(a),a+=t.data.length});var h=i.tell();return e.forEach(n,function(t){i.writeBytes(t.data)}),i.seek(o),i.writeUint16(h),i}},150:function(t,n,i){"use strict";t.exports=function t(n){if(!(this instanceof t))return new t(n);this.str=n,this.toUTF8Bytes=function(){for(var t=[],i=0;i<n.length;i++)if(n.charCodeAt(i)<=127)t.push(n.charCodeAt(i));else for(var e=encodeURIComponent(n.charAt(i)).substr(1).split("%"),r=0;r<e.length;r++)t.push(parseInt(e[r],16));return t},this.toUCS2Bytes=function(){for(var t,i=[],e=0;e<n.length;++e)t=n.charCodeAt(e),i.push(t>>8),i.push(255&t);return i}}},151:function(t,n,i){"use strict";var e=i(13),r=i(15);t.exports=function(t){var n=[];e.forEach(t.glyphs,function(t){0!==t.unicode&&n.push(function(t){var n=[],i=t?t.length<256?t.length:255:0;n.push(i);for(var e=0;e<i;e++){var r=t.charCodeAt(e);n.push(r<128?r:95)}return n}(t.name))});var i=new r(function(t,n){var i=36;return i+=2*t.glyphs.length,e.forEach(n,function(t){i+=t.length}),i}(t,n));i.writeInt32(131072),i.writeInt32(t.italicAngle),i.writeInt16(t.underlinePosition),i.writeInt16(t.underlineThickness),i.writeUint32(t.isFixedPitch),i.writeUint32(0),i.writeUint32(0),i.writeUint32(0),i.writeUint32(0),i.writeUint16(t.glyphs.length);var o=258;return e.forEach(t.glyphs,function(t){0===t.unicode?i.writeUint16(0):i.writeUint16(o++)}),e.forEach(n,function(t){i.writeBytes(t)}),i}},58:function(t,n,i){"use strict";var e=i(13),r=i(140);t.exports.interpolate=function(t,n){return e.map(t,function(t){var i=[];return e.forEach(t,function(e,o){if(0!==o&&o!==t.length-1){var s,u,a,h=t[o-1],c=t[o+1];!h.onCurve&&e.onCurve&&!c.onCurve&&(s=new r.Point(e.x,e.y),u=new r.Point(h.x,h.y),a=new r.Point(c.x,c.y),u.add(a).div(2).sub(s).dist()<n)||i.push(e)}else i.push(e)}),i})},t.exports.simplify=function(t,n){return e.map(t,function(t){var i,e,o,s,u,a,h;for(i=t.length-2;i>1;i--)o=t[i-1],s=t[i+1],e=t[i],o.onCurve&&s.onCurve&&(u=new r.Point(e.x,e.y),a=new r.Point(o.x,o.y),h=new r.Point(s.x,s.y),r.isInLine(a,u,h,n)&&t.splice(i,1));return t})},t.exports.roundPoints=function(t){return e.map(t,function(t){return e.map(t,function(t){return{x:Math.round(t.x),y:Math.round(t.y),onCurve:t.onCurve}})})},t.exports.removeClosingReturnPoints=function(t){return e.map(t,function(t){var n=t.length;return n>1&&t[0].x===t[n-1].x&&t[0].y===t[n-1].y&&t.splice(n-1),t})},t.exports.toRelative=function(t){var n,i={x:0,y:0},r=[];return e.forEach(t,function(t){n=[],r.push(n),e.forEach(t,function(t){n.push({x:t.x-i.x,y:t.y-i.y,onCurve:t.onCurve}),i=t})}),r},t.exports.identifier=function(t,n){for(var i=0,e=0;e<t.length;e++){i<<=8;var r=n?t.length-e-1:e;i+=t.charCodeAt(r)}return i}},76:function(t,n,i){"use strict";var e=i(13);t.exports={encode:function(t){return e.map(t,function(t){var n="";return t>65535&&(t-=65536,n+=String.fromCharCode(t>>>10&1023|55296),t=56320|1023&t),n+=String.fromCharCode(t)}).join("")},decode:function(t){for(var n,i,e=[],r=0,o=t.length;r<o;)(n=t.charCodeAt(r++))>=55296&&n<=56319&&r<o?56320==(64512&(i=t.charCodeAt(r++)))?e.push(((1023&n)<<10)+(1023&i)+65536):(e.push(n),r--):e.push(n);return e}}}}]);