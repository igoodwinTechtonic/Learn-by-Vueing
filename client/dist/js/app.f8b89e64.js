(function(t){function e(e){for(var a,s,i=e[0],c=e[1],l=e[2],d=0,m=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&m.push(n[s][0]),n[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(m.length)m.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],a=!0,i=1;i<r.length;i++){var c=r[i];0!==n[c]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},n={app:0},o=[];function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"02ea":function(t,e,r){},"13f8":function(t,e,r){},"33f2":function(t,e,r){"use strict";r("13f8")},"390e":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"learn-by-vueing"}},[t.$auth.isAuthenticated?r("NavDrawer"):t._e(),r("v-app-bar",{attrs:{app:"","clipped-left":""}},[r("div",{staticClass:"d-flex align-center",staticStyle:{width:"300px"}},[t.$auth.isAuthenticated?r("h2",[t._v(t._s(t.$auth.user.name))]):t._e()]),t.$auth.isAuthenticated?r("v-text-field",{staticStyle:{flex:"20 1 auto"},attrs:{placeholder:"Add bookmark or search...",hint:"Paste a link to add a bookmark or begin typing to search.","persistent-hint":"",disabled:t.disabledSearch},on:{click:function(e){return t.navToSearch()},keyup:function(e){return t.searchBookmarks(t.search)},paste:t.onPaste},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}):t._e(),r("v-spacer"),t.$auth.isAuthenticated?t._e():r("v-btn",{staticClass:"success",on:{click:t.login}},[t._v("Log in")]),t.$auth.isAuthenticated?r("v-btn",{on:{click:t.logout}},[t._v("Log out")]):t._e()],1),r("v-main",[r("v-container",{attrs:{fluid:""}},[r("router-view"),r("v-overlay",{attrs:{value:t.overlay}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)],1)],1)},o=[],s=(r("b0c0"),r("ac1f"),r("466d"),r("5319"),r("841c"),r("5530")),i=r("2f62"),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-navigation-drawer",{attrs:{app:"",clipped:"","hide-overlay":"",permanent:"",width:"300"}},[r("v-row",{staticClass:"fill-height",attrs:{"no-gutters":""}},[r("v-col",{staticStyle:{position:"fixed",height:"100%"}},[r("v-navigation-drawer",{attrs:{dark:"",permanent:"","mini-variant":"","mini-variant-width":"70"}},[r("v-list-item",{staticClass:"px-2"},[r("v-list-item-avatar",[r("v-img",{attrs:{src:this.$auth.user.picture}})],1)],1),r("v-divider"),r("v-list-item",[r("AddFolderDialog")],1),r("v-divider"),r("v-list",t._l(t.items,(function(e,a){return r("v-list-item",{key:a,attrs:{link:""},on:{click:function(r){return t.navToItem(e)}}},[r("v-list-item-action",[r("v-icon",[t._v(t._s(e.icon))])],1),r("v-list-item-content",[r("v-list-item-subtitle",[t._v(t._s(e.title))])],1)],1)})),1)],1)],1),"Folders"==t.selectedItem?r("v-col",{staticStyle:{"margin-left":"70px"}},[r("NavDrawerFolders")],1):t._e(),"Bookmarks"==t.selectedItem?r("v-col",{staticStyle:{"margin-left":"70px"}},[r("NavDrawerTags")],1):t._e()],1)],1)},l=[],u=r("94ed"),d=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-list",{attrs:{width:"230",nav:"",dense:""}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title"},[t._v(" Folders ")]),r("v-list-item-subtitle",[t._v(" Click to see your bookmarks. ")])],1)],1),r("v-list",[0===t.folders.length?r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[t._v(" You don't have any folders yet. ")])],1)],1):t._e(),t._l(t.folders,(function(e){return r("v-list-item",{key:e.name,staticStyle:{"margin-bottom":"0"},attrs:{to:{name:"Folder",params:{name:e.name.toLowerCase().replace(/\s/g,"-")}},link:""},on:{click:function(r){return t.setSelectedFolder(e)}}},[r("v-list-item-icon",{staticStyle:{"margin-right":"1rem"}},[r("v-icon",[t._v(t._s(t.displayIcon(e.icon)))])],1),r("v-list-item-content",[r("v-list-item-title",[t._v(" "+t._s(e.name)+" ")])],1)],1)}))],2)],1)},m=[],h={name:"NavDrawerFolders",data:function(){return{drawer:null}},computed:{folders:function(){var t=this.$store.state.folders.list;return t.sort((function(t,e){var r=t.name.toUpperCase(),a=e.name.toUpperCase();return r<a?-1:r>a?1:0})),t}},methods:Object(s["a"])(Object(s["a"])({},Object(i["b"])("folders",["getFolders"])),{},{displayIcon:function(t){return u[t]},setSelectedFolder:function(t){this.$store.commit("folders/setSelectedFolder",t)}})},f=h,v=r("2877"),p=r("6544"),k=r.n(p),g=r("132d"),b=r("8860"),_=r("da13"),y=r("5d23"),x=r("34c3"),w=Object(v["a"])(f,d,m,!1,null,null,null),C=w.exports;k()(w,{VIcon:g["a"],VList:b["a"],VListItem:_["a"],VListItemContent:y["a"],VListItemIcon:x["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"]});var $=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-list",{attrs:{width:"230",nav:"",dense:""}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title"},[t._v(" Tags ")]),r("v-list-item-subtitle",[t._v(" Click to filter bookmarks by tag. ")])],1)],1),r("v-list",[0===t.tags.length?r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[t._v(" You don't have any tags yet. ")])],1)],1):t._e(),t._l(t.tags,(function(e,a){return r("v-list-item",{key:a,attrs:{to:{name:"Tags",params:{tag:e}},link:""},on:{click:function(r){return t.setSelectedTag(e)}}},[r("v-chip",{staticStyle:{cursor:"pointer"}},[r("v-list-item-content",[r("v-list-item-title",[t._v(" "+t._s(e)+" ")])],1)],1)],1)}))],2)],1)},V=[],T={name:"NavDrawerFolders",computed:{tags:function(){return this.$store.state.tags.list}},methods:{setSelectedTag:function(t){this.$store.commit("tags/setSelectedTag",t)}}},S=T,F=r("cc20"),O=Object(v["a"])(S,$,V,!1,null,null,null),I=O.exports;k()(O,{VChip:F["a"],VList:b["a"],VListItem:_["a"],VListItemContent:y["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"]});var j=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"btn--small"},"v-btn",n,!1),a),[r("v-icon",[t._v(t._s(t.displayIcon("mdiFolderPlus")))])],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"dialog__title"},[t._v("Add a new folder")]),r("form",{attrs:{autocomplete:"off"}},[r("v-text-field",{staticClass:"dialog__input",attrs:{label:"Name",hint:"A container for your bookmarks.","prepend-inner-icon":t.displayIcon(t.icon),rules:t.validateName,"persistent-hint":"",clearable:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),r("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[r("v-text-field",t._g(t._b({staticClass:"dialog__input",attrs:{label:"Search for an icon",hint:"The icon cannot be changed once the folder has been added.","persistent-hint":"",clearable:""},on:{keyup:function(e){return t.searchIcons(t.input)}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},"v-text-field",n,!1),a))]}}])},[r("v-list",[r("v-virtual-scroll",{attrs:{height:"224","item-height":"56",bench:4,items:t.filteredIcons},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.item;return[r("v-list-item",{key:a,on:{click:function(e){return t.setIcon(a)}}},[r("v-icon",[t._v(t._s(t.displayIcon(a)))])],1)]}}])})],1)],1)],1),r("v-divider"),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancel ")]),r("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){return t.submit()}}},[t._v(" Submit ")])],1)],1)],1)},B=[],A=(r("4de4"),r("caad"),r("fb6a"),r("b64b"),r("2532"),{name:"AddFolderDialog",data:function(){return{dialog:!1,name:"",icon:"mdiFolder",input:"",icons:Object.keys(u),filteredIcons:Object.keys(u),validateName:[function(t){return t&&t.length>0||"Required."}]}},computed:Object(s["a"])(Object(s["a"])({},Object(i["c"])(["overlay"])),{},{iconList:function(){return Object.keys(u)}}),methods:{submit:function(){var t=this;if(this.name){var e={user_id:this.$store.state.users.currentUser._id,name:this.name,icon:this.icon};this.$store.commit("setOverlay",!0),this.$store.dispatch("folders/addFolder",e).then((function(){t.dialog=!1,t.$store.commit("setOverlay",!1),t.$router.push({name:"Folder",params:{name:t.name.toLowerCase().replace(/\s/g,"-")}}),setTimeout((function(){t.name="",t.icon="mdiFolder"}),200)}))}},displayIcon:function(t){return u[t]},searchIcons:function(t){this.filteredIcons=this.icons.filter((function(e){return e.includes("mdi"+t.charAt(0).toUpperCase()+t.slice(1))}))},setIcon:function(t){this.icon=t}}}),L=A,R=(r("33f2"),r("8336")),U=r("b0af"),D=r("99d9"),N=r("169a"),P=r("ce7e"),E=r("e449"),M=r("2fa4"),W=r("8654"),K=r("0de5"),z=Object(v["a"])(L,j,B,!1,null,null,null),J=z.exports;k()(z,{VBtn:R["a"],VCard:U["a"],VCardActions:D["a"],VCardTitle:D["d"],VDialog:N["a"],VDivider:P["a"],VIcon:g["a"],VList:b["a"],VListItem:_["a"],VMenu:E["a"],VSpacer:M["a"],VTextField:W["a"],VVirtualScroll:K["a"]});var Y={name:"NavDrawer",components:{NavDrawerFolders:C,NavDrawerTags:I,AddFolderDialog:J},data:function(){return{selectedItem:"Folders",drawer:null,items:[{title:"Folders",icon:u["mdiFolderMultiple"]},{title:"Bookmarks",icon:u["mdiBookmark"]},{title:"Public",icon:u["mdiWeb"]},{title:"Settings",icon:u["mdiCog"]}]}},methods:{navToItem:function(t){switch(t.title){case"Folders"!=t.title:return void this.$router.push("/folders");case"Bookmarks"!=t.title:return void this.$router.push("/bookmarks");case"Public"!=t.title:return void this.$router.push("/public");case"Settings"!=t.title:return void this.$router.push("/settings")}this.selectedItem=t.title}}},q=Y,H=(r("b5af"),r("62ad")),G=r("adda"),Z=r("1800"),X=r("8270"),Q=r("f774"),tt=r("0fd9"),et=Object(v["a"])(q,c,l,!1,null,null,null),rt=et.exports;k()(et,{VCol:H["a"],VDivider:P["a"],VIcon:g["a"],VImg:G["a"],VList:b["a"],VListItem:_["a"],VListItemAction:Z["a"],VListItemAvatar:X["a"],VListItemContent:y["a"],VListItemSubtitle:y["b"],VNavigationDrawer:Q["a"],VRow:tt["a"]});var at={name:"App",components:{NavDrawer:rt},data:function(){return{search:"",disabled:!1,debounce:null}},computed:Object(s["a"])(Object(s["a"])({},Object(i["c"])(["overlay"])),{},{disabledSearch:function(){return"add"===this.$route.params.action||"edit"===this.$route.params.action}}),methods:{navToSearch:function(){"/search"!==this.$route.fullPath&&this.$router.push({name:"Search"})},searchBookmarks:function(){var t=this;this.search===this.$store.state.searchKeywords||this.search.match(/^(https?|www)/)||(clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.$store.commit("setSearchKeywords",t.search),t.$store.dispatch("bookmarks/searchBookmarks",t.search)}),500))},onPaste:function(t){var e=this,r=t.clipboardData.getData("text/plain");this.$store.state.folders.selectedFolder.name?r.match(/^(https?|www)/)&&(this.$store.commit("setOverlay",!0),this.$store.dispatch("scrapeUrl",{link:r}).then((function(){var t=e.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g,"-");e.$router.push({name:"AddBookmark",params:{name:t,action:"add"}}),e.$store.commit("setOverlay",!1),e.search=""}))):console.log("Please select a folder first before adding a new bookmark")},login:function(){this.$auth.loginWithRedirect()},logout:function(){this.$auth.logout(),this.$router.push({path:"/"})}}},nt=at,ot=r("7496"),st=r("40dc"),it=r("a523"),ct=r("f6c4"),lt=r("a797"),ut=r("490a"),dt=Object(v["a"])(nt,n,o,!1,null,null,null),mt=dt.exports;k()(dt,{VApp:ot["a"],VAppBar:st["a"],VBtn:R["a"],VContainer:it["a"],VMain:ct["a"],VOverlay:lt["a"],VProgressCircular:ut["a"],VSpacer:M["a"],VTextField:W["a"]});var ht=r("8c4f"),ft=(r("96cf"),r("1da1")),vt=r("15fd"),pt=r("9767"),kt=r("bc3a"),gt=r.n(kt),bt=r("0e44"),_t=(r("99af"),r("2909")),yt={namespaced:!0,state:{list:[],searchResults:[],bookmarkToAdd:{}},mutations:{setBookmarks:function(t,e){t.list=e},setBookmarkToAdd:function(t,e){t.bookmarkToAdd=e},searchResults:function(t,e){t.searchResults=e}},actions:{getBookmarks:function(t,e){var r=t.commit;return gt.a.get("/api/bookmarks?id="+e).then((function(t){return r("setBookmarks",t.data)})).catch((function(t){return console.error(t)}))},searchBookmarks:function(t,e){var r=t.commit,a=t.rootState;if(""!==e)return gt.a.get("api/bookmarks?id=".concat(a.users.currentUser._id,"&search=").concat(e)).then((function(t){return r("searchResults",t.data)})).catch((function(t){return console.error(t)}))},addBookmark:function(t,e){var r=t.commit,a=t.state;return gt.a.post("/api/bookmarks",e).then((function(t){var e=t.data.ops[0],n=[].concat(Object(_t["a"])(a.list),[e]);r("setBookmarks",n)})).catch((function(t){return console.error(t)}))},editBookmark:function(t,e){var r=t.commit,a=t.state,n=e._id,o=Object(vt["a"])(e,["_id"]);return gt.a.put("/api/bookmarks/"+e._id,o).then((function(){var t=a.list.filter((function(t){return t._id!==n})),o=[].concat(Object(_t["a"])(t),[e]);r("setBookmarks",o)})).catch((function(t){return console.error(t)}))},deleteBookmark:function(t,e){var r=t.commit,a=t.state,n=a.list.filter((function(t){return t._id!==e.id}));return gt.a.delete("/api/bookmarks/"+e.id).then((function(){return r("setBookmarks",n)})).catch((function(t){return console.error(t)}))},deleteAllBookmarksInFolder:function(t,e){var r=t.dispatch,a=t.rootState;return gt.a.delete("/api/bookmarks/all/"+e).then((function(){return r("getBookmarks")}),a.users.currentUser._id).catch((function(t){return console.error(t)}))}}},xt={namespaced:!0,state:{selectedFolder:{},list:[]},mutations:{setFolders:function(t,e){t.list=e},setSelectedFolder:function(t,e){t.selectedFolder=e}},actions:{getFolders:function(t,e){var r=t.commit;return gt.a.get("/api/folders?id="+e).then((function(t){return r("setFolders",t.data)})).catch((function(t){return console.error(t)}))},addFolder:function(t,e){var r=t.commit,a=t.state;return gt.a.post("/api/folders",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(t){var e=t.data.ops[0],n=[].concat(Object(_t["a"])(a.list),[e]);r("setSelectedFolder",e),r("setFolders",n)})).catch((function(t){return console.error(t)}))},updateFolderName:function(t,e){var r=t.commit,a=t.state,n=e._id,o=Object(vt["a"])(e,["_id"]),s=a.list.filter((function(t){return t._id!==n}));return s.push(e),gt.a.put("/api/folders/"+n,JSON.stringify(o),{headers:{"Content-Type":"application/json"}}).then((function(){return r("setFolders",s)})).catch((function(t){return console.error(t)}))},deleteFolder:function(t,e){return Object(ft["a"])(regeneratorRuntime.mark((function r(){var a,n,o,s,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.commit,n=t.dispatch,o=t.state,s=t.rootState,i=o.list.filter((function(t){return t._id!==e})),r.prev=2,r.next=5,gt.a.delete("/api/folders/"+e);case 5:return r.next=7,n("bookmarks/deleteAllBookmarksInFolder",e,{root:!0});case 7:return r.next=9,n("tags/getUserTags",s.users.currentUser._id,{root:!0});case 9:a("setFolders",i),r.next=15;break;case 12:return r.prev=12,r.t0=r["catch"](2),r.abrupt("return",console.error(r.t0));case 15:case"end":return r.stop()}}),r,null,[[2,12]])})))()}}},wt=(r("159b"),{namespaced:!0,state:{list:[],selectedTag:{},currentBookmarkTags:[]},mutations:{setTags:function(t,e){if(1===e.length)t.list=e;else{var r=Object(_t["a"])(e);r.sort((function(t,e){return t.toUpperCase()>e.toUpperCase()?1:-1})),t.list=r}},setSelectedTag:function(t,e){t.selectedTag=e},setCurrentBookmarkTags:function(t,e){t.currentBookmarkTags=e}},actions:{getUserTags:function(t,e){var r=t.commit;return gt.a.get("/api/tags?id="+e).then((function(t){var e=[];t.data.forEach((function(t){t.tags.forEach((function(t){if(!e.includes(t))return e.push(t)}))})),r("setTags",e)})).catch((function(t){return console.error(t)}))}}}),Ct={namespaced:!0,state:{currentUser:{}},mutations:{setUser:function(t,e){t.currentUser=e}},actions:{getUser:function(t,e){return Object(ft["a"])(regeneratorRuntime.mark((function r(){var a,n,o,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.commit,n=t.dispatch,o=t.state,r.prev=1,r.next=4,gt.a.get("/api/users/"+e.email);case 4:if(s=r.sent,202!==s.status||!e.email){r.next=9;break}return r.next=8,gt.a.post("/api/users",{name:e.name,email:e.email,tags:[]});case 8:return r.abrupt("return",a("setUser",{name:e.name,email:e.email,tags:[]}));case 9:if(200!==s.status&&304!==s.status){r.next=13;break}return a("setUser",s.data),r.next=13,n("getUserData",o.currentUser._id);case 13:r.next=18;break;case 15:return r.prev=15,r.t0=r["catch"](1),r.abrupt("return",console.error(r.t0));case 18:case"end":return r.stop()}}),r,null,[[1,15]])})))()},getUserData:function(t,e){return Object(ft["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=t.dispatch,r.next=3,a("folders/getFolders",e,{root:!0});case 3:return r.next=5,a("bookmarks/getBookmarks",e,{root:!0});case 5:return r.next=7,a("tags/getUserTags",e,{root:!0});case 7:case"end":return r.stop()}}),r)})))()}}};a["a"].use(i["a"]);var $t,Vt=new i["a"].Store({state:{overlay:!1,searchKeywords:""},modules:{bookmarks:yt,folders:xt,tags:wt,users:Ct},mutations:{setOverlay:function(t,e){t.overlay=e},setSearchKeywords:function(t,e){t.searchKeywords=e}},actions:{scrapeUrl:function(t,e){var r=t.commit;return gt.a.post("/scrape",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(t){return r("bookmarks/setBookmarkToAdd",t.data)}))}},plugins:[Object(bt["a"])()]}),Tt=function(){return window.history.replaceState({},document.title,window.location.pathname)},St=function(){return $t},Ft=function(t){var e=t.onRedirectCallback,r=void 0===e?Tt:e,n=t.redirectUri,o=void 0===n?window.location.origin:n,i=Object(vt["a"])(t,["onRedirectCallback","redirectUri"]);return $t||($t=new a["a"]({store:Vt,data:function(){return{loading:!0,isAuthenticated:!1,user:{},auth0Client:null,popupOpen:!1,error:null}},methods:{loginWithPopup:function(t,e){var r=this;return Object(ft["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r.popupOpen=!0,a.prev=1,a.next=4,r.auth0Client.loginWithPopup(t,e);case 4:return a.next=6,r.auth0Client.getUser();case 6:return r.user=a.sent,a.next=9,r.auth0Client.isAuthenticated();case 9:r.isAuthenticated=a.sent,r.error=null,a.next=17;break;case 13:a.prev=13,a.t0=a["catch"](1),console.error(a.t0),r.error=a.t0;case 17:return a.prev=17,r.popupOpen=!1,a.finish(17);case 20:case"end":return a.stop()}}),a,null,[[1,13,17,20]])})))()},handleRedirectCallback:function(){var t=this;return Object(ft["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.auth0Client.handleRedirectCallback();case 4:return e.next=6,t.auth0Client.getUser();case 6:t.user=e.sent,t.isAuthenticated=!0,t.error=null,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),t.error=e.t0;case 14:return e.prev=14,t.loading=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[1,11,14,17]])})))()},loginWithRedirect:function(t){return this.auth0Client.loginWithRedirect(t)},getIdTokenClaims:function(t){return this.auth0Client.getIdTokenClaims(t)},getTokenSilently:function(t){return this.auth0Client.getTokenSilently(t)},getTokenWithPopup:function(t){return this.auth0Client.getTokenWithPopup(t)},logout:function(t){return this.auth0Client.logout(t)}},created:function(){var t=this;return Object(ft["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("setOverlay",!0),e.next=3,Object(pt["a"])(Object(s["a"])(Object(s["a"])({},i),{},{client_id:i.clientId,redirect_uri:o}));case 3:if(t.auth0Client=e.sent,e.prev=4,!window.location.search.includes("code=")||!window.location.search.includes("state=")){e.next=12;break}return e.next=8,t.auth0Client.handleRedirectCallback();case 8:a=e.sent,n=a.appState,t.error=null,r(n);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](4),t.error=e.t0;case 17:return e.prev=17,e.next=20,t.auth0Client.isAuthenticated();case 20:return t.isAuthenticated=e.sent,e.next=23,t.auth0Client.getUser();case 23:return t.user=e.sent,t.loading=!1,t.user&&t.$store.dispatch("users/getUser",t.user),t.$store.commit("setOverlay",!1),e.finish(17);case 28:case"end":return e.stop()}}),e,null,[[4,14,17,28]])})))()}}),$t)},Ot={install:function(t,e){t.prototype.$auth=Ft(e)}},It=function(t,e,r){var a=St(),n=function(){if(a.isAuthenticated)return r();a.loginWithRedirect({appState:{targetUrl:t.fullPath}})};if(!a.loading)return n();a.$watch("loading",(function(t){if(!1===t)return n()}))},jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("h1",{staticClass:"website-name"},[t._v("Learn By Vueing")]),a("v-row",{staticClass:"home-content",attrs:{md8:"",sm6:""}},[t.$auth.isAuthenticated?t._e():a("v-col",[a("h2",[t._v("Getting Started")]),a("p",[t._v(" Log in with Google using the button in the top right hand of the page! ")]),a("p",[t._v(" You can organize your bookmarks with "),a("b",[t._v("folders")]),t._v(" and "),a("b",[t._v("tags")]),t._v(". Each bookmark lives in one folder and can have multiple tags. ")]),a("h2",[t._v("Navigation")]),a("p",[t._v(" Click on a icon in the navigation view to display your account, all folders, all bookmarks, all public bookmarks, and your personalized settings. ")]),a("h2",[t._v("Searching")]),a("p",[t._v("From any page, you can search for any bookmark.")])]),t.$auth.isAuthenticated?a("v-col",[a("h2",[t._v("Welcome to Learn by Vueing")]),a("p",[t._v(" You can organize your bookmarks with "),a("b",[t._v("folders")]),t._v(" and "),a("b",[t._v("tags")]),t._v(". Each bookmark lives in one folder and can have multiple tags. ")]),a("h2",[t._v("Navigation")]),a("p",[t._v(" Click on a icon in the navigation view to display your account, all folders, all bookmarks, all public bookmarks, and your personalized settings. ")]),a("h2",[t._v("Searching")]),a("p",[t._v("From any page, you can search for any bookmark.")])]):t._e(),a("v-col",{attrs:{md4:"",sm6:""}},[a("img",{staticClass:"logo",attrs:{alt:"Vue logo",src:r("cf05"),sm6:""}})])],1)],1)},Bt=[],At={name:"Home"},Lt=At,Rt=(r("cf1a"),Object(v["a"])(Lt,jt,Bt,!1,null,"064d6088",null)),Ut=Rt.exports;k()(Rt,{VCol:H["a"],VRow:tt["a"]});var Dt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"no-items-container"},[""===t.searchKeywords?r("v-card",{staticClass:"no-items-card mx-auto",staticStyle:{"margin-top":"6rem"}},[r("h2",{staticStyle:{"text-align":"center"}},[t._v(" Start typing to search all bookmarks. ")]),r("v-divider",{staticStyle:{margin:"1rem"}}),r("h2",{staticStyle:{"text-align":"center"}},[t._v(" Or paste a link to add a bookmark to your ")]),r("h2",{staticStyle:{"text-align":"center"}},[r("v-icon",[t._v(t._s(t.selectedFolderIcon))]),t._v(" "+t._s(t.selectedFolderName)+" folder. ")],1)],1):r("v-list",{staticClass:"container--grid",staticStyle:{flex:"1"}},[r("v-list",{attrs:{"three-line":"",id:"bookmarks-list"}},t._l(t.bookmarks,(function(t,e){return r("Bookmark",{key:e,attrs:{bookmark:t}})})),1)],1)],1)},Nt=[],Pt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-list",{staticStyle:{padding:"0"},attrs:{"three-line":""}},[r("v-list-item",{staticClass:"card",staticStyle:{"min-height":"48px"},attrs:{href:t.bookmark.url,target:"_blank"},on:{contextmenu:t.show}},[r("v-tooltip",{attrs:{bottom:"",transition:"v-fade-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[r("span",t._g(t._b({staticStyle:{display:"flex",flex:"1"}},"span",n,!1),a),[r("v-list-item-avatar",{staticStyle:{margin:"0 1rem 0 0"},attrs:{size:"30"}},[r("v-img",{attrs:{src:t.bookmark.favicons[0]}})],1),r("v-list-item-title",{domProps:{innerHTML:t._s(t.bookmark.title)}})],1)]}}])},[r("span",[r("v-list-item-subtitle",{domProps:{innerHTML:t._s(t.bookmark.description)}}),r("v-list-item-subtitle",{domProps:{innerHTML:t._s(t.bookmark.url)}}),r("v-list",{staticStyle:{background:"none"}},t._l(t.tags,(function(e,a){return r("v-chip",{key:a,staticStyle:{"margin-right":"0.2rem"}},[t._v(t._s(e))])})),1)],1)]),r("v-menu",{attrs:{"position-x":t.x,"position-y":t.y,absolute:"","offset-y":""},model:{value:t.showMenu,callback:function(e){t.showMenu=e},expression:"showMenu"}},[r("v-list",t._l(t.rightClickItems,(function(e,a){return r("v-list-item",{key:a,on:{click:e.event}},[r("v-icon",{staticStyle:{"margin-right":"4px"}},[t._v(t._s(e.icon))]),r("v-list-item-title",[t._v(t._s(e.title))])],1)})),1)],1)],1)],1)},Et=[],Mt={name:"Bookmark",props:{bookmark:{type:Object,required:!0}},data:function(){return{showMenu:!1,x:0,y:0,rightClickItems:[{title:"Copy URL",icon:u["mdiContentCopy"],event:this.copyUrl},{title:"Edit",icon:u["mdiSquareEditOutline"],event:this.editBookmark},{title:"Delete",icon:u["mdiTrashCan"],event:this.deleteBookmark}]}},computed:{tags:function(){var t=this;return this.$store.state.tags.list.filter((function(e){return t.bookmark.tags.includes(e)}))}},methods:{copyUrl:function(){navigator.clipboard.writeText(this.bookmark.url)},editBookmark:function(){this.$store.commit("bookmarks/setBookmarkToAdd",this.bookmark);var t=this.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g,"-");this.$router.push({name:"AddBookmark",params:{name:t,action:"edit"}})},deleteBookmark:function(){var t=this;return Object(ft["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("bookmarks/deleteBookmark",{id:t.bookmark._id,tags:t.bookmark.tags});case 2:return e.next=4,t.$store.dispatch("tags/getUserTags",t.$store.state.users.currentUser._id);case 4:case"end":return e.stop()}}),e)})))()},show:function(t){var e=this;t.preventDefault(),this.showMenu=!1,this.x=t.clientX,this.y=t.clientY,this.$nextTick((function(){e.showMenu=!0}))}}},Wt=Mt,Kt=r("3a2f"),zt=Object(v["a"])(Wt,Pt,Et,!1,null,null,null),Jt=zt.exports;k()(zt,{VChip:F["a"],VIcon:g["a"],VImg:G["a"],VList:b["a"],VListItem:_["a"],VListItemAvatar:X["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VMenu:E["a"],VTooltip:Kt["a"]});var Yt={name:"Search",components:{Bookmark:Jt},computed:{searchKeywords:function(){return this.$store.state.searchKeywords},bookmarks:function(){return this.$store.state.bookmarks.searchResults},selectedFolderName:function(){return this.$store.state.folders.selectedFolder.name},selectedFolderIcon:function(){return u[this.$store.state.folders.selectedFolder.icon]}}},qt=Yt,Ht=Object(v["a"])(qt,Dt,Nt,!1,null,null,null),Gt=Ht.exports;k()(Ht,{VCard:U["a"],VContainer:it["a"],VDivider:P["a"],VIcon:g["a"],VList:b["a"]});var Zt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("h1",{staticStyle:{display:"none"}},[t._v(t._s(t.selectedFolder.name))]),r("v-text-field",{attrs:{rules:t.validateName,value:t.selectedFolder.name,solo:""},on:{change:t.updateFolderName}}),0===t.bookmarks.length?r("NoItemsCard"):r("Bookmarks"),r("DeleteFolderDialog")],1)},Xt=[],Qt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-list",{staticClass:"container--grid",staticStyle:{flex:"1"}},[0===t.bookmarks.length?r("NoItemsCard"):r("v-list",{attrs:{"three-line":"",id:"bookmarks-list"}},t._l(t.bookmarks,(function(t,e){return r("Bookmark",{key:e,attrs:{bookmark:t}})})),1)],1)},te=[],ee=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"no-items-container"},[r("v-card",{staticClass:"no-items-card mx-auto"},[r("h2",{staticStyle:{"text-align":"center"}},[t._v("You don't have any bookmarks in "+t._s(t.selectedFolder.name)+" yet.")]),r("v-divider",{staticStyle:{margin:"1rem"}}),r("h3",{staticStyle:{"text-align":"center"}},[t._v(" To add a bookmark, paste a link into the search field at the top of the page. ")])],1)],1)},re=[],ae={name:"NoItemsCard",computed:{selectedFolder:function(){return this.$store.state.folders.selectedFolder}}},ne=ae,oe=(r("b53a"),Object(v["a"])(ne,ee,re,!1,null,null,null)),se=oe.exports;k()(oe,{VCard:U["a"],VContainer:it["a"],VDivider:P["a"]});var ie={name:"Tags",components:{Bookmark:Jt,NoItemsCard:se},computed:{bookmarks:function(){var t=this;return this.$route.params.name?this.$store.state.bookmarks.list.filter((function(e){return e.folder_id===t.$store.state.folders.selectedFolder._id})):this.$route.params.tag?this.$store.state.bookmarks.list.filter((function(e){return e.tags.includes(t.$route.params.tag)})):{}}}},ce=ie,le=Object(v["a"])(ce,Qt,te,!1,null,null,null),ue=le.exports;k()(le,{VList:b["a"]});var de=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({staticClass:"delete-button"},"v-btn",n,!1),a),[r("v-icon",[t._v(t._s(t.trashcanIcon))])],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"dialog__title"},[t._v("Are you sure you want to delete "+t._s(t.name)+"?")]),r("v-card-subtitle",{staticClass:"dialog__title"},[t._v("This will delete ALL bookmarks in this folder.")]),r("v-card-subtitle",{staticClass:"dialog__title"},[t._v("You cannot undo this action.")]),r("v-divider"),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"red",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Cancel ")]),r("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){return t.deleteFolder()}}},[t._v(" Delete ")])],1)],1),r("v-overlay",{attrs:{value:t.overlay}},[r("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)},me=[],he={name:"DeleteFolderDialog",data:function(){return{dialog:!1,overlay:!1,trashcanIcon:u["mdiTrashCanOutline"]}},computed:{name:function(){return this.$store.state.folders.selectedFolder.name}},methods:{deleteFolder:function(){var t=this,e=this.$store.state.folders.selectedFolder._id;this.overlay=!0,this.$store.dispatch("folders/deleteFolder",e).then((function(){t.overlay=!1,t.dialog=!1,t.$router.push("/")}))}}},fe=he,ve=(r("6c14"),Object(v["a"])(fe,de,me,!1,null,null,null)),pe=ve.exports;k()(ve,{VBtn:R["a"],VCard:U["a"],VCardActions:D["a"],VCardSubtitle:D["b"],VCardTitle:D["d"],VDialog:N["a"],VDivider:P["a"],VIcon:g["a"],VOverlay:lt["a"],VProgressCircular:ut["a"],VSpacer:M["a"]});var ke={name:"Folder",data:function(){return{validateName:[function(t){return t&&t.length>0||"Required."}]}},components:{Bookmarks:ue,DeleteFolderDialog:pe,NoItemsCard:se},computed:Object(s["a"])(Object(s["a"])({},Object(i["c"])("folders",["selectedFolder"])),{},{bookmarks:function(){var t=this;return this.$store.state.bookmarks.list.filter((function(e){return e.folder_id===t.$store.state.folders.selectedFolder._id}))}}),methods:{updateFolderName:function(t){if(t.length>0){var e=Object(s["a"])(Object(s["a"])({},this.$store.state.folders.selectedFolder),{},{name:t});this.$store.dispatch("folders/updateFolderName",e)}},displayIcon:function(t){return u[t]}}},ge=ke,be=Object(v["a"])(ge,Zt,Xt,!1,null,null,null),_e=be.exports;k()(be,{VContainer:it["a"],VTextField:W["a"]});var ye=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-card",{staticClass:"insert-bookmark-card"},[r("v-row",[r("v-col",{staticClass:"inner-grid"},[r("v-card-title",[r("v-text-field",{attrs:{placeholder:t.title,rules:t.validateField},model:{value:t.customTitle,callback:function(e){t.customTitle=e},expression:"customTitle"}})],1),r("div",{staticClass:"img-link-grid"},[t.favicon?r("v-img",{staticStyle:{"align-self":"center"},attrs:{src:t.favicon,"max-height":"40","max-width":"40"}}):t._e(),r("v-card-subtitle",[t._v(t._s(t.url))])],1),r("v-card-text",[r("v-textarea",{attrs:{placeholder:t.description},model:{value:t.customDesc,callback:function(e){t.customDesc=e},expression:"customDesc"}})],1),r("TagSelector")],1)],1),r("v-card-actions",{staticStyle:{"justify-content":"center","padding-bottom":"2rem"}},[r("v-btn",{ref:"btn",on:{click:function(e){return t.submit()}}},[r("v-icon",{staticStyle:{"padding-right":"1rem"}},[t._v("mdi-bookmark")]),t._v(t._s(t.action)+" Bookmark")],1)],1)],1)],1)},xe=[],we=(r("a4d3"),r("e01a"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-combobox",{attrs:{items:t.items,chips:"",clearable:"",label:"Tags",multiple:"","prepend-icon":"mdi-filter-variant","persistent-hint":"",hint:"Add new tags or select existing tags.",solo:""},on:{change:t.setTags},scopedSlots:t._u([{key:"selection",fn:function(e){var a=e.attrs,n=e.item,o=e.select,s=e.selected;return[r("v-chip",t._b({attrs:{"input-value":s,close:""},on:{click:o,"click:close":function(e){return t.remove(n)}}},"v-chip",a,!1),[r("strong",[t._v(t._s(n))])])]}}]),model:{value:t.chips,callback:function(e){t.chips=e},expression:"chips"}})}),Ce=[],$e=(r("a434"),{name:"TagSelector",data:function(){return{chips:this.$store.state.tags.currentBookmarkTags||[]}},computed:{items:function(){return this.$store.state.tags.list}},methods:{remove:function(t){this.chips.splice(this.chips.indexOf(t),1),this.chips=Object(_t["a"])(this.chips),this.setTags()},setTags:function(){this.$store.commit("tags/setCurrentBookmarkTags",this.chips)}}}),Ve=$e,Te=r("2b5d"),Se=Object(v["a"])(Ve,we,Ce,!1,null,null,null),Fe=Se.exports;k()(Se,{VChip:F["a"],VCombobox:Te["a"]});var Oe={name:"AddBookmark",components:{TagSelector:Fe},data:function(){return{customTitle:this.$store.state.bookmarks.bookmarkToAdd.title,customDesc:this.$store.state.bookmarks.bookmarkToAdd.description,validateField:[function(t){return t&&t.length>0||"Required."}]}},created:function(){"edit"===this.$route.params.action&&this.$store.commit("tags/setCurrentBookmarkTags",this.$store.state.bookmarks.bookmarkToAdd.tags),"add"===this.$route.params.action&&this.$store.commit("tags/setCurrentBookmarkTags",[])},computed:{action:function(){return"add"===this.$route.params.action?"Add":"Edit"},action2:function(){return"add"===this.$route.params.action?"to":"in"},title:function(){return this.$store.state.bookmarks.bookmarkToAdd.title},description:function(){return this.$store.state.bookmarks.bookmarkToAdd.description},url:function(){return this.$store.state.bookmarks.bookmarkToAdd.url},favicon:function(){var t=this.$store.state.bookmarks.bookmarkToAdd.favicons;return t&&0!=t.length&&t[0]},selectedFolder:function(){return this.$store.state.folders.selectedFolder},selectedFolderIcon:function(){return this.displayIcon(this.$store.state.folders.selectedFolder.icon)}},methods:{submit:function(){var t=this;return Object(ft["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=Object(s["a"])(Object(s["a"])({},t.$store.state.bookmarks.bookmarkToAdd),{},{title:t.customTitle,description:t.customDesc,user_id:t.$store.state.users.currentUser._id,folder_id:t.$store.state.folders.selectedFolder._id,tags:t.$store.state.tags.currentBookmarkTags,dateCreated:new Date}),"add"!==t.$route.params.action){e.next=6;break}return e.next=4,t.$store.dispatch("bookmarks/addBookmark",r);case 4:e.next=9;break;case 6:if("edit"!==t.$route.params.action){e.next=9;break}return e.next=9,t.$store.dispatch("bookmarks/editBookmark",r);case 9:return e.next=11,t.$store.dispatch("tags/getUserTags",t.$store.state.users.currentUser._id);case 11:t.$router.push({name:"Folder",params:{name:t.$store.state.folders.selectedFolder.name.toLowerCase().replace(/\s/g,"-")}}),t.$store.commit("tags/setCurrentBookmarkTags",[]);case 13:case"end":return e.stop()}}),e)})))()},displayIcon:function(t){return u[t]}}},Ie=Oe,je=(r("fb61"),r("a844")),Be=Object(v["a"])(Ie,ye,xe,!1,null,"2519b4cc",null),Ae=Be.exports;k()(Be,{VBtn:R["a"],VCard:U["a"],VCardActions:D["a"],VCardSubtitle:D["b"],VCardText:D["c"],VCardTitle:D["d"],VCol:H["a"],VContainer:it["a"],VIcon:g["a"],VImg:G["a"],VRow:tt["a"],VTextField:W["a"],VTextarea:je["a"]}),a["a"].use(ht["a"]);var Le=[{path:"/",name:"Home",component:Ut},{path:"/search",name:"Search",component:Gt},{path:"/folder/:name",name:"Folder",component:_e,beforeEnter:It},{path:"/folder/:name/:action",name:"AddBookmark",component:Ae,beforeEnter:It},{path:"/tags/:tag",name:"Tags",component:ue,beforeEnter:It}],Re=new ht["a"]({mode:"history",base:"/",routes:Le}),Ue=Re,De=r("f309");a["a"].use(De["a"]);var Ne=new De["a"]({icons:{iconFont:"mdiSvg"}}),Pe=r("8160");a["a"].config.productionTip=!1,a["a"].use(Ot,{domain:Pe["b"],clientId:Pe["a"],onRedirectCallback:function(t){Ue.push(t&&t.targetUrl?t.targetUrl:window.location.pathname)}}),new a["a"]({router:Ue,store:Vt,vuetify:Ne,render:function(t){return t(mt)}}).$mount("#app")},"6c14":function(t,e,r){"use strict";r("390e")},8160:function(t){t.exports=JSON.parse('{"b":"dev-learn-by-vueing.us.auth0.com","a":"wm09ubz7gZ9glyRZ0RmJJqIIej3KrFo8"}')},"936e":function(t,e,r){},aacb:function(t,e,r){},b53a:function(t,e,r){"use strict";r("02ea")},b5af:function(t,e,r){"use strict";r("aacb")},cf05:function(t,e,r){t.exports=r.p+"img/logo.82b9c7a5.png"},cf1a:function(t,e,r){"use strict";r("936e")},e9a1:function(t,e,r){},fb61:function(t,e,r){"use strict";r("e9a1")}});
//# sourceMappingURL=app.f8b89e64.js.map