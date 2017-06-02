webpackJsonp([1],{149:function(e,t,n){function o(e){n(199)}var i=n(150)(n(161),n(203),o,null,null);e.exports=i.exports},151:function(e,t,n){"use strict";var o=n(19),i=n(205),s=n(149),a=n.n(s);o.a.use(i.a),t.a=new i.a({routes:[{path:"/",name:"Scene",component:a.a}]})},152:function(e,t,n){function o(e){n(200)}var i=n(150)(n(160),n(204),o,null,null);e.exports=i.exports},156:function(e,t,n){"use strict";var o=n(21),i=n.n(o),s=n(157),a=window.THREE||n(10);a.QuickHull=s.a;var r=function(e){a.Geometry.call(this),this.type="ConvexGeometry",this.fromBufferGeometry(new c(e)),this.mergeVertices()};r.prototype=i()(a.Geometry.prototype),r.prototype.constructor=r;var c=function(e){a.BufferGeometry.call(this),this.type="ConvexBufferGeometry";var t=[],n=[];void 0===a.QuickHull&&console.error("THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on THREE.QuickHull");for(var o=(new a.QuickHull).setFromPoints(e),i=o.faces,s=0;s<i.length;s++){var r=i[s],c=r.edge;do{var h=c.head().point;t.push(h.x,h.y,h.z),n.push(r.normal.x,r.normal.y,r.normal.z),c=c.next}while(c!==r.edge)}this.addAttribute("position",new a.Float32BufferAttribute(t,3)),this.addAttribute("normal",new a.Float32BufferAttribute(n,3))};c.prototype=i()(a.BufferGeometry.prototype),c.prototype.constructor=c},157:function(e,t,n){"use strict";function o(){this.normal=new l.Vector3,this.midpoint=new l.Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=d,this.edge=null}function i(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}function s(e){this.point=e,this.prev=null,this.next=null,this.face=null}function a(){this.head=null,this.tail=null}var r=n(163),c=n.n(r),h=n(164),u=n.n(h),l=window.THREE||n(10),d=0,p=function(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new a,this.unassigned=new a,this.vertices=[]};u()(p.prototype,{setFromPoints:function(e){!0!==Array.isArray(e)&&console.error("THREE.QuickHull: Points parameter is not an array."),e.length<4&&console.error("THREE.QuickHull: The algorithm needs at least four points."),this.makeEmpty();for(var t=0,n=e.length;t<n;t++)this.vertices.push(new s(e[t]));return this.compute(),this},setFromObject:function(e){var t=[];return e.updateMatrixWorld(!0),e.traverse(function(e){var n,o,i,s=e.geometry;if(void 0!==s)if(s.isGeometry){var a=s.vertices;for(n=0,o=a.length;n<o;n++)i=a[n].clone(),i.applyMatrix4(e.matrixWorld),t.push(i)}else if(s.isBufferGeometry){var r=s.attributes.position;if(void 0!==r)for(n=0,o=r.count;n<o;n++)i=new l.Vector3,i.fromBufferAttribute(r,n).applyMatrix4(e.matrixWorld),t.push(i)}}),this.setFromPoints(t)},makeEmpty:function(){return this.faces=[],this.vertices=[],this},addVertexToFace:function(e,t){return e.face=t,null===t.outside?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this},removeVertexFromFace:function(e,t){return e===t.outside&&(null!==e.next&&e.next.face===t?t.outside=e.next:t.outside=null),this.assigned.remove(e),this},removeAllVerticesFromFace:function(e){if(null!==e.outside){for(var t=e.outside,n=e.outside;null!==n.next&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}},deleteFaceVertices:function(e,t){var n=this.removeAllVerticesFromFace(e);if(void 0!==n)if(void 0===t)this.unassigned.appendChain(n);else{var o=n;do{var i=o.next,s=t.distanceToPoint(o.point);s>this.tolerance?this.addVertexToFace(o,t):this.unassigned.append(o),o=i}while(null!==o)}return this},resolveUnassignedPoints:function(e){if(!1===this.unassigned.isEmpty()){var t=this.unassigned.first();do{for(var n=t.next,o=this.tolerance,i=null,s=0;s<e.length;s++){var a=e[s];if(a.mark===d){var r=a.distanceToPoint(t.point);if(r>o&&(o=r,i=a),o>1e3*this.tolerance)break}}null!==i&&this.addVertexToFace(t,i),t=n}while(null!==t)}return this},computeExtremes:function(){var e,t,n,o=new l.Vector3,i=new l.Vector3,s=[],a=[];for(e=0;e<3;e++)s[e]=a[e]=this.vertices[0];for(o.copy(this.vertices[0].point),i.copy(this.vertices[0].point),e=0,t=this.vertices.length;e<t;e++){var r=this.vertices[e],h=r.point;for(n=0;n<3;n++)h.getComponent(n)<o.getComponent(n)&&(o.setComponent(n,h.getComponent(n)),s[n]=r);for(n=0;n<3;n++)h.getComponent(n)>i.getComponent(n)&&(i.setComponent(n,h.getComponent(n)),a[n]=r)}return this.tolerance=3*c.a*(Math.max(Math.abs(o.x),Math.abs(i.x))+Math.max(Math.abs(o.y),Math.abs(i.y))+Math.max(Math.abs(o.z),Math.abs(i.z))),{min:s,max:a}},computeInitialHull:function(){var e,t,n;return function(){void 0===e&&(e=new l.Line3,t=new l.Plane,n=new l.Vector3);var i,s,a,r,c,h,u,d,p,m=this.vertices,v=this.computeExtremes(),f=v.min,g=v.max,w=0,y=0;for(h=0;h<3;h++)(p=g[h].point.getComponent(h)-f[h].point.getComponent(h))>w&&(w=p,y=h);for(s=f[y],a=g[y],w=0,e.set(s.point,a.point),h=0,u=this.vertices.length;h<u;h++)(i=m[h])!==s&&i!==a&&(e.closestPointToPoint(i.point,!0,n),(p=n.distanceToSquared(i.point))>w&&(w=p,r=i));for(w=0,t.setFromCoplanarPoints(s.point,a.point,r.point),h=0,u=this.vertices.length;h<u;h++)(i=m[h])!==s&&i!==a&&i!==r&&(p=Math.abs(t.distanceToPoint(i.point)))>w&&(w=p,c=i);var j=[];if(t.distanceToPoint(c.point)<0)for(j.push(o.create(s,a,r),o.create(c,a,s),o.create(c,r,a),o.create(c,s,r)),h=0;h<3;h++)d=(h+1)%3,j[h+1].getEdge(2).setTwin(j[0].getEdge(d)),j[h+1].getEdge(1).setTwin(j[d+1].getEdge(0));else for(j.push(o.create(s,r,a),o.create(c,s,a),o.create(c,a,r),o.create(c,r,s)),h=0;h<3;h++)d=(h+1)%3,j[h+1].getEdge(2).setTwin(j[0].getEdge((3-h)%3)),j[h+1].getEdge(0).setTwin(j[d+1].getEdge(1));for(h=0;h<4;h++)this.faces.push(j[h]);for(h=0,u=m.length;h<u;h++)if((i=m[h])!==s&&i!==a&&i!==r&&i!==c){w=this.tolerance;var x=null;for(d=0;d<4;d++)(p=this.faces[d].distanceToPoint(i.point))>w&&(w=p,x=this.faces[d]);null!==x&&this.addVertexToFace(i,x)}return this}}(),reindexFaces:function(){for(var e=[],t=0;t<this.faces.length;t++){var n=this.faces[t];n.mark===d&&e.push(n)}return this.faces=e,this},nextVertexToAdd:function(){if(!1===this.assigned.isEmpty()){var e,t=0,n=this.assigned.first().face,o=n.outside;do{var i=n.distanceToPoint(o.point);i>t&&(t=i,e=o),o=o.next}while(null!==o&&o.face===n);return e}},computeHorizon:function(e,t,n,o){this.deleteFaceVertices(n),n.mark=1;var i;i=null===t?t=n.getEdge(0):t.next;do{var s=i.twin,a=s.face;a.mark===d&&(a.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,s,a,o):o.push(i)),i=i.next}while(i!==t);return this},addAdjoiningFace:function(e,t){var n=o.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)},addNewFaces:function(e,t){this.newFaces=[];for(var n=null,o=null,i=0;i<t.length;i++){var s=t[i],a=this.addAdjoiningFace(e,s);null===n?n=a:a.next.setTwin(o),this.newFaces.push(a.face),o=a}return n.next.setTwin(o),this},addVertexToHull:function(e){var t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this},cleanup:function(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this},compute:function(){var e;for(this.computeInitialHull();void 0!==(e=this.nextVertexToAdd());)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}),u()(o,{create:function(e,t,n){var s=new o,a=new i(e,s),r=new i(t,s),c=new i(n,s);return a.next=c.prev=r,r.next=a.prev=c,c.next=r.prev=a,s.edge=a,s.compute()}}),u()(o.prototype,{getEdge:function(e){for(var t=this.edge;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t},compute:function(){var e;return function(){void 0===e&&(e=new l.Triangle);var t=this.edge.tail(),n=this.edge.head(),o=this.edge.next.head();return e.set(t.point,n.point,o.point),e.normal(this.normal),e.midpoint(this.midpoint),this.area=e.area(),this.constant=this.normal.dot(this.midpoint),this}}(),distanceToPoint:function(e){return this.normal.dot(e)-this.constant}}),u()(i.prototype,{head:function(){return this.vertex},tail:function(){return this.prev?this.prev.vertex:null},length:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceTo(e.point):-1},lengthSquared:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceToSquared(e.point):-1},setTwin:function(e){return this.twin=e,e.twin=this,this}}),u()(a.prototype,{first:function(){return this.head},last:function(){return this.tail},clear:function(){return this.head=this.tail=null,this},insertBefore:function(e,t){return t.prev=e.prev,t.next=e,null===t.prev?this.head=t:t.prev.next=t,e.prev=t,this},insertAfter:function(e,t){return t.prev=e,t.next=e.next,null===t.next?this.tail=t:t.next.prev=t,e.next=t,this},append:function(e){return null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this},appendChain:function(e){for(null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail;null!==e.next;)e=e.next;return this.tail=e,this},remove:function(e){return null===e.prev?this.head=e.next:e.prev.next=e.next,null===e.next?this.tail=e.prev:e.next.prev=e.prev,this},removeSubList:function(e,t){return null===e.prev?this.head=t.next:e.prev.next=t.next,null===t.next?this.tail=e.prev:t.next.prev=e.prev,this},isEmpty:function(){return null===this.head}}),t.a=p},158:function(e,t,n){"use strict";var o=n(21),i=n.n(o),s=window.THREE||n(10),a=function(e,t){function n(e){!1!==p.enabled&&(window.removeEventListener("keydown",n),g=f,f===m.NONE&&(e.keyCode!==p.keys[m.ROTATE]||p.noRotate?e.keyCode!==p.keys[m.ZOOM]||p.noZoom?e.keyCode!==p.keys[m.PAN]||p.noPan||(f=m.PAN):f=m.ZOOM:f=m.ROTATE))}function o(e){!1!==p.enabled&&(f=g,window.addEventListener("keydown",n,!1))}function i(e){!1!==p.enabled&&(e.preventDefault(),e.stopPropagation(),f===m.NONE&&(f=e.button),f!==m.ROTATE||p.noRotate?f!==m.ZOOM||p.noZoom?f!==m.PAN||p.noPan||(P.copy(D(e.pageX,e.pageY)),O.copy(P)):(b.copy(D(e.pageX,e.pageY)),M.copy(b)):(j.copy(F(e.pageX,e.pageY)),y.copy(j)),document.addEventListener("mousemove",a,!1),document.addEventListener("mouseup",r,!1),p.dispatchEvent(V))}function a(e){!1!==p.enabled&&(e.preventDefault(),e.stopPropagation(),f!==m.ROTATE||p.noRotate?f!==m.ZOOM||p.noZoom?f!==m.PAN||p.noPan||O.copy(D(e.pageX,e.pageY)):M.copy(D(e.pageX,e.pageY)):(y.copy(j),j.copy(F(e.pageX,e.pageY))))}function r(e){!1!==p.enabled&&(e.preventDefault(),e.stopPropagation(),f=m.NONE,document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",r),p.dispatchEvent(C))}function c(e){if(!1!==p.enabled){switch(e.preventDefault(),e.stopPropagation(),e.deltaMode){case 2:b.y-=.025*e.deltaY;break;case 1:b.y-=.01*e.deltaY;break;default:b.y-=25e-5*e.deltaY}p.dispatchEvent(V),p.dispatchEvent(C)}}function h(e){if(!1!==p.enabled){switch(e.touches.length){case 1:f=m.TOUCH_ROTATE,j.copy(F(e.touches[0].pageX,e.touches[0].pageY)),y.copy(j);break;default:f=m.TOUCH_ZOOM_PAN;var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY;k=T=Math.sqrt(t*t+n*n);var o=(e.touches[0].pageX+e.touches[1].pageX)/2,i=(e.touches[0].pageY+e.touches[1].pageY)/2;P.copy(D(o,i)),O.copy(P)}p.dispatchEvent(V)}}function u(e){if(!1!==p.enabled)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:y.copy(j),j.copy(F(e.touches[0].pageX,e.touches[0].pageY));break;default:var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY;k=Math.sqrt(t*t+n*n);var o=(e.touches[0].pageX+e.touches[1].pageX)/2,i=(e.touches[0].pageY+e.touches[1].pageY)/2;O.copy(D(o,i))}}function l(e){if(!1!==p.enabled){switch(e.touches.length){case 0:f=m.NONE;break;case 1:f=m.TOUCH_ROTATE,j.copy(F(e.touches[0].pageX,e.touches[0].pageY)),y.copy(j)}p.dispatchEvent(C)}}function d(e){e.preventDefault()}var p=this,m={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=e,this.domElement=void 0!==t?t:document,this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.keys=[65,83,68],this.target=new s.Vector3;var v=new s.Vector3,f=m.NONE,g=m.NONE,w=new s.Vector3,y=new s.Vector2,j=new s.Vector2,x=new s.Vector3,E=0,b=new s.Vector2,M=new s.Vector2,T=0,k=0,P=new s.Vector2,O=new s.Vector2;this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone();var z={type:"change"},V={type:"start"},C={type:"end"};this.handleResize=function(){if(this.domElement===document)this.screen.left=0,this.screen.top=0,this.screen.width=window.innerWidth,this.screen.height=window.innerHeight;else{var e=this.domElement.getBoundingClientRect(),t=this.domElement.ownerDocument.documentElement;this.screen.left=e.left+window.pageXOffset-t.clientLeft,this.screen.top=e.top+window.pageYOffset-t.clientTop,this.screen.width=e.width,this.screen.height=e.height}},this.handleEvent=function(e){"function"==typeof this[e.type]&&this[e.type](e)};var D=function(){var e=new s.Vector2;return function(t,n){return e.set((t-p.screen.left)/p.screen.width,(n-p.screen.top)/p.screen.height),e}}(),F=function(){var e=new s.Vector2;return function(t,n){return e.set((t-.5*p.screen.width-p.screen.left)/(.5*p.screen.width),(p.screen.height+2*(p.screen.top-n))/p.screen.width),e}}();this.rotateCamera=function(){var e,t=new s.Vector3,n=new s.Quaternion,o=new s.Vector3,i=new s.Vector3,a=new s.Vector3,r=new s.Vector3;return function(){r.set(j.x-y.x,j.y-y.y,0),e=r.length(),e?(w.copy(p.object.position).sub(p.target),o.copy(w).normalize(),i.copy(p.object.up).normalize(),a.crossVectors(i,o).normalize(),i.setLength(j.y-y.y),a.setLength(j.x-y.x),r.copy(i.add(a)),t.crossVectors(r,w).normalize(),e*=p.rotateSpeed,n.setFromAxisAngle(t,e),w.applyQuaternion(n),p.object.up.applyQuaternion(n),x.copy(t),E=e):!p.staticMoving&&E&&(E*=Math.sqrt(1-p.dynamicDampingFactor),w.copy(p.object.position).sub(p.target),n.setFromAxisAngle(x,E),w.applyQuaternion(n),p.object.up.applyQuaternion(n)),y.copy(j)}}(),this.zoomCamera=function(){var e;f===m.TOUCH_ZOOM_PAN?(e=T/k,T=k,w.multiplyScalar(e)):(e=1+(M.y-b.y)*p.zoomSpeed,1!==e&&e>0&&w.multiplyScalar(e),p.staticMoving?b.copy(M):b.y+=(M.y-b.y)*this.dynamicDampingFactor)},this.panCamera=function(){var e=new s.Vector2,t=new s.Vector3,n=new s.Vector3;return function(){e.copy(O).sub(P),e.lengthSq()&&(e.multiplyScalar(w.length()*p.panSpeed),n.copy(w).cross(p.object.up).setLength(e.x),n.add(t.copy(p.object.up).setLength(e.y)),p.object.position.add(n),p.target.add(n),p.staticMoving?P.copy(O):P.add(e.subVectors(O,P).multiplyScalar(p.dynamicDampingFactor)))}}(),this.checkDistances=function(){p.noZoom&&p.noPan||(w.lengthSq()>p.maxDistance*p.maxDistance&&(p.object.position.addVectors(p.target,w.setLength(p.maxDistance)),b.copy(M)),w.lengthSq()<p.minDistance*p.minDistance&&(p.object.position.addVectors(p.target,w.setLength(p.minDistance)),b.copy(M)))},this.update=function(){w.subVectors(p.object.position,p.target),p.noRotate||p.rotateCamera(),p.noZoom||p.zoomCamera(),p.noPan||p.panCamera(),p.object.position.addVectors(p.target,w),p.checkDistances(),p.object.lookAt(p.target),v.distanceToSquared(p.object.position)>1e-6&&(p.dispatchEvent(z),v.copy(p.object.position))},this.reset=function(){f=m.NONE,g=m.NONE,p.target.copy(p.target0),p.object.position.copy(p.position0),p.object.up.copy(p.up0),w.subVectors(p.object.position,p.target),p.object.lookAt(p.target),p.dispatchEvent(z),v.copy(p.object.position)},this.dispose=function(){this.domElement.removeEventListener("contextmenu",d,!1),this.domElement.removeEventListener("mousedown",i,!1),this.domElement.removeEventListener("wheel",c,!1),this.domElement.removeEventListener("touchstart",h,!1),this.domElement.removeEventListener("touchend",l,!1),this.domElement.removeEventListener("touchmove",u,!1),document.removeEventListener("mousemove",a,!1),document.removeEventListener("mouseup",r,!1),window.removeEventListener("keydown",n,!1),window.removeEventListener("keyup",o,!1)},this.domElement.addEventListener("contextmenu",d,!1),this.domElement.addEventListener("mousedown",i,!1),this.domElement.addEventListener("wheel",c,!1),this.domElement.addEventListener("touchstart",h,!1),this.domElement.addEventListener("touchend",l,!1),this.domElement.addEventListener("touchmove",u,!1),window.addEventListener("keydown",n,!1),window.addEventListener("keyup",o,!1),this.handleResize(),this.update()};a.prototype=i()(s.EventDispatcher.prototype),a.prototype.constructor=s.TrackballControls,t.a=a},159:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(19),i=n(152),s=n.n(i),a=n(151);o.a.config.productionTip=!1,new o.a({el:"#app",router:a.a,template:"<App/>",components:{App:s.a}})},160:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(149),i=n.n(o);t.default={name:"app",components:{Scene:i.a}}},161:function(e,t,n){"use strict";function o(){requestAnimationFrame(o),Y+=3e5;var e=g.a.getPosition(new Date(Y),C,D),t=a(x,e.azimuth+Math.PI,e.altitude);R.position.set(t.x,t.y,t.z),O.position.set(t.x,t.y,t.z),V.update(),j.update(),i()}function i(){G.render(w,y)}function s(e,t,n,o){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:16777215,s=new l.TextGeometry(e,{size:2,height:.2,curveSegments:6,font:o,style:"normal"}),a=new l.Color(i),r=new l.MeshBasicMaterial({color:a}),c=new l.Mesh(s,r);c.position.x=t[0],c.position.y=t[1],c.position.z=t[2],c.rotation.x=n[0],c.rotation.y=n[1],c.rotation.z=n[2],w.add(c)}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;n=Math.PI/2-n;var o=e*Math.sin(n)*Math.cos(t),i=e*Math.sin(n)*Math.sin(t),s=e*Math.cos(n);return new l.Vector3(o,s,i)}function r(e,t,n,o){for(var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:16711935,s=arguments.length>5&&void 0!==arguments[5]&&arguments[5],r=g.a.getTimes(e,n,o),c=v()(r.sunrise).valueOf(),h=v()(r.sunset).valueOf(),u=new l.LineBasicMaterial({color:i}),d=new l.Geometry,p=c;p<=h;p+=18e5){var m=g.a.getPosition(new Date(p),n,o),f=a(t,m.azimuth+Math.PI,m.altitude);d.vertices.push(f)}return s?d:new l.Line(d,u)}function c(e){return e*(Math.PI/180)}Object.defineProperty(t,"__esModule",{value:!0});var h=n(165),u=n.n(h),l=n(10),d=n(158),p=(n(156),n(166)),m=(n.n(p),n(0)),v=n.n(m),f=n(202),g=n.n(f),w=new l.Scene,y=new l.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e4);y.position.set(-8,32,36),y.lookAt(w.position);var j=new d.a(y);j.rotateSpeed=5,j.zoomSpeed=3.2,j.panSpeed=.8,j.noZoom=!1,j.noPan=!1,j.staticMoving=!1,j.dynamicDampingFactor=.2;var x=35,E=new l.BoxGeometry(15,15,5),b=new l.MeshStandardMaterial({color:13369344}),M=new l.Mesh(E,b);M.position.y=7.5,M.rotation.y=c(-103.09),M.castShadow=!0,w.add(M);var T=new l.CircleGeometry(x,64),k=new l.MeshStandardMaterial({color:3447003,transparent:!0,opacity:1});k.side=l.DoubleSide;var P=new l.Mesh(T,k);P.rotation.x=c(90),P.receiveShadow=!0,w.add(P);var O=new l.DirectionalLight(16777215,1,100);O.position.set(15,25,0),O.target.position.set(0,0,0),O.castShadow=!0;var z=new l.Object3D;w.add(z),O.target=z,O.shadowMapWidth=2048,O.shadowMapHeight=2048,O.shadowCameraLeft=-50,O.shadowCameraBottom=-50,O.shadowCameraRight=50,O.shadowCameraTop=50,w.add(O);var V=new l.DirectionalLightHelper(O,5),C=(new l.CameraHelper(O.shadow.camera),51.096474713),D=17.034752369;w.add(r(new Date(2017,5,21),x,C,D,15844367)),w.add(r(new Date(2017,5,1),x,C,D,65280)),w.add(r(new Date(2017,11,21),x,C,D,15965202));var F=([].concat(u()(r(new Date(2017,5,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,6,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,7,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,8,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,9,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,10,21),x,C,D,15844367,!0).vertices),u()(r(new Date(2017,11,21),x,C,D,15844367,!0).vertices)),new l.MeshBasicMaterial({color:15844367,transparent:!0,opacity:.25}));F.side=l.DoubleSide;var L={min:new Date(2017,5,21).valueOf(),max:new Date(2017,11,21).valueOf()},A=new l.ParametricGeometry(function(e,t){var n=L.min+e*(L.max-L.min),o=g.a.getTimes(n,C,D),i=o.sunrise.valueOf()+t*(o.sunset.valueOf()-o.sunrise.valueOf()),s=g.a.getPosition(i,C,D);return a(x,s.azimuth+Math.PI,s.altitude)},25,25),S=new l.Mesh(A,F),H=new l.SphereGeometry(1,8,8),N=new l.MeshBasicMaterial({color:16711680,transparent:!0,opacity:1}),R=new l.Mesh(H,N);w.add(R),w.add(S);var Y=Date.now(),B=g.a.getPosition(new Date(Y),C,D),_=a(x,B.azimuth+Math.PI,B.altitude);R.position.set(_.x,_.y,_.z);var G=new l.WebGLRenderer({alpha:!0,antialias:!0});G.shadowMap.soft=!0,G.shadowMap.enabled=!0,G.shadowMap.type=l.PCFBasicShadowMap,G.setSize(window.innerWidth,window.innerHeight);var X=new l.AxisHelper(10);w.add(X);new l.GridHelper(100,100);(new l.FontLoader).load("static/fonts/helvetiker_regular.typeface.json",function(e){var t=.75*x,n=x+5;s("X",[t,0,0],[0,0,0],e,15158332),s("Y",[0,t,0],[0,0,0],e,3066993),s("Z",[0,0,t],[0,0,0],e,3447003),s("N",[n,0,0],[-Math.PI/2,0,0],e,15844367),s("S",[-n,0,0],[-Math.PI/2,0,0],e,15844367),s("E",[0,0,n],[-Math.PI/2,0,0],e,15844367),s("W",[0,0,-n],[-Math.PI/2,0,0],e,15844367),i()}),j.addEventListener("change",i),t.default={name:"scene",data:function(){return{}},mounted:function(){null===this.$refs.scene.querySelector("canvas")&&(this.$refs.scene.appendChild(G.domElement),i(),o())}}},199:function(e,t){},200:function(e,t){},201:function(e,t,n){function o(e){return n(i(e))}function i(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var s={"./af":34,"./af.js":34,"./ar":41,"./ar-dz":35,"./ar-dz.js":35,"./ar-kw":36,"./ar-kw.js":36,"./ar-ly":37,"./ar-ly.js":37,"./ar-ma":38,"./ar-ma.js":38,"./ar-sa":39,"./ar-sa.js":39,"./ar-tn":40,"./ar-tn.js":40,"./ar.js":41,"./az":42,"./az.js":42,"./be":43,"./be.js":43,"./bg":44,"./bg.js":44,"./bn":45,"./bn.js":45,"./bo":46,"./bo.js":46,"./br":47,"./br.js":47,"./bs":48,"./bs.js":48,"./ca":49,"./ca.js":49,"./cs":50,"./cs.js":50,"./cv":51,"./cv.js":51,"./cy":52,"./cy.js":52,"./da":53,"./da.js":53,"./de":56,"./de-at":54,"./de-at.js":54,"./de-ch":55,"./de-ch.js":55,"./de.js":56,"./dv":57,"./dv.js":57,"./el":58,"./el.js":58,"./en-au":59,"./en-au.js":59,"./en-ca":60,"./en-ca.js":60,"./en-gb":61,"./en-gb.js":61,"./en-ie":62,"./en-ie.js":62,"./en-nz":63,"./en-nz.js":63,"./eo":64,"./eo.js":64,"./es":66,"./es-do":65,"./es-do.js":65,"./es.js":66,"./et":67,"./et.js":67,"./eu":68,"./eu.js":68,"./fa":69,"./fa.js":69,"./fi":70,"./fi.js":70,"./fo":71,"./fo.js":71,"./fr":74,"./fr-ca":72,"./fr-ca.js":72,"./fr-ch":73,"./fr-ch.js":73,"./fr.js":74,"./fy":75,"./fy.js":75,"./gd":76,"./gd.js":76,"./gl":77,"./gl.js":77,"./gom-latn":78,"./gom-latn.js":78,"./he":79,"./he.js":79,"./hi":80,"./hi.js":80,"./hr":81,"./hr.js":81,"./hu":82,"./hu.js":82,"./hy-am":83,"./hy-am.js":83,"./id":84,"./id.js":84,"./is":85,"./is.js":85,"./it":86,"./it.js":86,"./ja":87,"./ja.js":87,"./jv":88,"./jv.js":88,"./ka":89,"./ka.js":89,"./kk":90,"./kk.js":90,"./km":91,"./km.js":91,"./kn":92,"./kn.js":92,"./ko":93,"./ko.js":93,"./ky":94,"./ky.js":94,"./lb":95,"./lb.js":95,"./lo":96,"./lo.js":96,"./lt":97,"./lt.js":97,"./lv":98,"./lv.js":98,"./me":99,"./me.js":99,"./mi":100,"./mi.js":100,"./mk":101,"./mk.js":101,"./ml":102,"./ml.js":102,"./mr":103,"./mr.js":103,"./ms":105,"./ms-my":104,"./ms-my.js":104,"./ms.js":105,"./my":106,"./my.js":106,"./nb":107,"./nb.js":107,"./ne":108,"./ne.js":108,"./nl":110,"./nl-be":109,"./nl-be.js":109,"./nl.js":110,"./nn":111,"./nn.js":111,"./pa-in":112,"./pa-in.js":112,"./pl":113,"./pl.js":113,"./pt":115,"./pt-br":114,"./pt-br.js":114,"./pt.js":115,"./ro":116,"./ro.js":116,"./ru":117,"./ru.js":117,"./sd":118,"./sd.js":118,"./se":119,"./se.js":119,"./si":120,"./si.js":120,"./sk":121,"./sk.js":121,"./sl":122,"./sl.js":122,"./sq":123,"./sq.js":123,"./sr":125,"./sr-cyrl":124,"./sr-cyrl.js":124,"./sr.js":125,"./ss":126,"./ss.js":126,"./sv":127,"./sv.js":127,"./sw":128,"./sw.js":128,"./ta":129,"./ta.js":129,"./te":130,"./te.js":130,"./tet":131,"./tet.js":131,"./th":132,"./th.js":132,"./tl-ph":133,"./tl-ph.js":133,"./tlh":134,"./tlh.js":134,"./tr":135,"./tr.js":135,"./tzl":136,"./tzl.js":136,"./tzm":138,"./tzm-latn":137,"./tzm-latn.js":137,"./tzm.js":138,"./uk":139,"./uk.js":139,"./ur":140,"./ur.js":140,"./uz":142,"./uz-latn":141,"./uz-latn.js":141,"./uz.js":142,"./vi":143,"./vi.js":143,"./x-pseudo":144,"./x-pseudo.js":144,"./yo":145,"./yo.js":145,"./zh-cn":146,"./zh-cn.js":146,"./zh-hk":147,"./zh-hk.js":147,"./zh-tw":148,"./zh-tw.js":148};o.keys=function(){return Object.keys(s)},o.resolve=i,e.exports=o,o.id=201},203:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{ref:"scene",staticClass:"Scene"})},staticRenderFns:[]}},204:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Scene")],1)},staticRenderFns:[]}}},[159]);
//# sourceMappingURL=app.be8c01aa1e9ddac70a54.js.map