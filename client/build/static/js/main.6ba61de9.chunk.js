(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){e.exports=n(49)},28:function(e,t,n){},37:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){},45:function(e,t,n){},47:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),i=n.n(o),s=(n(28),n(6)),l=n(7),c=n(10),u=n(8),d=n(11),p=n(51),m=n(50),h=n(3),f=n.n(h),g=n(13),E=n(52),v=n(18),b=n.n(v),w=(n(37),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={selectedSearchObj:void 0,listSearchText:"",email:"",lists:[],showWarning:!1},n.handleListSearchChange=function(e){n.setState({listSearchText:e.target.value})},n.handleAutocompleteSelect=function(e,t){n.setState({listSearchText:e,selectedSearchObj:t})},n.handleNameChange=function(e){n.setState({email:e.target.value})},n.getFilteredListsFromServer=Object(g.a)(f.a.mark(function e(){var t,a,r,o;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==n.state.email&&" "!==n.state.email){e.next=2;break}return e.abrupt("return");case 2:return t=new URL("http://localhost:9000/api/lists"),a={email:n.state.email},Object.keys(a).forEach(function(e){return t.searchParams.append(e,a[e])}),e.next=7,fetch(t);case 7:return r=e.sent,e.next=10,r.json();case 10:o=e.sent,n.setState({lists:o});case 12:case"end":return e.stop()}},e,this)})),n.goToList=function(){var e=n.state.lists.filter(function(e){return e.name.toLowerCase()===n.state.listSearchText.toLowerCase()});e.length?n.props.history.push("/list/".concat(e[0].id)):n.setState({showWarning:!0})},n.createList=Object(g.a)(f.a.mark(function e(){var t,a,r,o;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=new URL("http://localhost:9000/api/lists"),a={name:n.state.listSearchText,createdBy:n.state.email},Object.keys(a).forEach(function(e){return t.searchParams.append(e,a[e])}),e.next=5,fetch(t,{method:"POST"});case 5:return r=e.sent,e.next=8,r.json();case 8:o=e.sent,n.props.history.push("/list/".concat(o.id));case 10:case"end":return e.stop()}},e,this)})),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.handleListSearchChange,t=this.handleAutocompleteSelect,n=this.handleNameChange,a=this.goToList,o=this.createList,i=this.getFilteredListsFromServer,s=this.state,l=s.listSearchText,c=s.email,u=s.lists,d=s.showWarning;return r.a.createElement("form",{className:"Login"},r.a.createElement("h1",null,"Gift Lists"),r.a.createElement("input",{placeholder:"Enter email",value:c,onChange:n,onBlur:i,autoComplete:"on",type:"email"}),r.a.createElement(b.a,{wrapperProps:{className:"autocomplete"},inputProps:{placeholder:"List name",onKeyPress:function(e){return"Enter"===e.key?a():null}},value:l,items:u||[],onChange:e,onSelect:t,renderItem:function(e,t){return r.a.createElement("div",{style:{background:t?"lightgray":"white"},key:e.id,className:"autocomplete-item"},e.name)},getItemValue:function(e,t){return e.name},shouldItemRender:function(e,t){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())}}),d&&r.a.createElement("span",{className:"warning"},"This list does not exist. Click ",r.a.createElement("strong",null,"Create New List")," to create it."),r.a.createElement("div",{className:"actions"},r.a.createElement("button",{onClick:a,disabled:""===l||" "===l},"Go To List"),r.a.createElement("button",{onClick:o,disabled:""===l||" "===l},"Create New List")))}}]),t}(r.a.Component)),k=Object(E.a)(w),O=n(5),j=n(21),C=(n(41),n(12)),S=(n(43),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={showEditButton:!0},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(){this.nameInput.focus()}},{key:"render",value:function(){var e=this,t=this.props,n=t.inputProps,a=t.children,o=t.editMode,i=t.handleToggleEditMode,s=t.className,l=t.clickToEdit;return r.a.createElement("div",{className:"EditInput ".concat(s)},r.a.createElement("input",Object.assign({},n,{ref:function(t){e.nameInput=t},className:o?"visible":"hidden",onBlur:function(e){return i(e,!0)},onKeyPress:function(e){return"Enter"===e.key?i(e,!0):null}})),!o&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{onClick:!1===l?null:i},a),r.a.createElement("button",{onClick:function(){i()},className:"edit-btn"},"Edit ",r.a.createElement(C.d,null))))}}]),t}(r.a.Component)),x=(n(45),function(e){var t=e.id,n=e.name,a=e.list,o=e.selected,i=e.index,s=e.editInputField,l=e.removePerson,c=e.handleEditInput,u=e.handleToggleEditMode,d=e.bringPersonToFront,p=e.addGift,m=e.handleUpdateGift,h=e.removeGift;return r.a.createElement("div",{className:["Person"+(o?" selected":"")],onClick:function(){return d(t)},style:{zIndex:i,left:60*i+"px"}},r.a.createElement(S,{editMode:"name"===s,inputProps:{value:n,placeholder:"Enter name",onChange:function(e){return c(i,"name",e)}},handleToggleEditMode:function(e,t){return u(i,t?"":"name")},className:"person-edit-name"},r.a.createElement("h3",null,""===n?"Click to enter name":n)),r.a.createElement("ul",null,a.map(function(e,t){return r.a.createElement("li",{key:e.id},r.a.createElement("div",null,r.a.createElement(S,{editMode:s===e.id+"gift.name",inputProps:{value:e.name,placeholder:"Enter gift",onChange:function(t){return m(i,e.id,"gift.name",t)}},handleToggleEditMode:function(t,n){return u(i,n?"":e.id+"gift.name")},className:"gift-edit-name"},r.a.createElement("h4",null,t+1,") ",""===e.name?"Click to enter name":e.name)),r.a.createElement(S,{editMode:s===e.id+"gift.link",inputProps:{value:e.link,placeholder:"Enter link",onChange:function(t){return m(i,e.id,"gift.link",t)}},handleToggleEditMode:function(t,n){return u(i,n?"":e.id+"gift.link")},className:"gift-edit-input",clickToEdit:""===e.link},""===e.link?r.a.createElement("span",null,"Click to enter link"):r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"gift-link-label"},e.link),r.a.createElement("a",{href:e.link,target:"_"},"Link"))),r.a.createElement("button",{onClick:function(){return h(i,e.id)},className:"remove-gift-btn"},r.a.createElement(C.c,null))))}),r.a.createElement("li",null,r.a.createElement("button",{onClick:function(e){return p(i,e)},className:"add-gift-btn"},"Add Gift ",r.a.createElement(C.a,null)))),r.a.createElement("button",{onClick:function(e){return l(i,e)},className:"remove-person-btn"},r.a.createElement(C.b,null)))});function y(){var e=8,t=+new Date;return function(){for(var n,a,r=t.toString().split("").reverse(),o="",i=0;i<e;++i)o+=r[(n=0,a=r.length-1,Math.floor(Math.random()*(a-n+1))+n)];return o}()}var P=new URL("http://localhost:9000/api/lists"),L=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={listInfo:{},people:[],showEnterPassword:!0,password:"",errorMsg:null},n.componentWillMount=Object(g.a)(f.a.mark(function e(){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getListInfoFromServer();case 2:case"end":return e.stop()}},e,this)})),n.getListInfoFromServer=Object(g.a)(f.a.mark(function e(){var t,a;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(P.href,"/").concat(n.props.match.params.listId,"?password=").concat(n.state.password));case 2:return t=e.sent,e.next=5,t.json();case 5:(a=e.sent).error?n.setState({showEnterPassword:!0,errorMsg:2===a.error?a.msg:null}):(a.people=a.people.length?n.indexList(a.people):[{name:"",list:[],selected:!0,index:0,editMode:!0,editInputField:"name",id:y()}],console.log(a),n.setState({listInfo:Object(j.a)({},a,{people:void 0}),people:a.people,showEnterPassword:!1}));case 7:case"end":return e.stop()}},e,this)})),n.indexList=function(e){return e.map(function(t,n){return t.index=n,t.editInputField="",t.selected=n===e.length-1,t.id=y(),t})},n.bringPersonToFront=function(e){if(console.log("bringPersonToFront"),n.state.people.filter(function(e){return e.selected})[0].id!==e){var t=Object(O.a)(n.state.people),a=0;t=t.map(function(n){return n.id===e?(n.index=t.length-1,n.selected=!0):(n.index=a,n.selected=!1,a++),n}),n.setState({people:t})}},n.createPersonCard=function(){console.log("createPersonCard");var e=Object(O.a)(n.state.people);0!==e.length&&(e.filter(function(e){return e.selected})[0].selected=!1);e.push({name:"",list:[],selected:!0,index:e.length,editMode:!0,editInputField:"name",id:y()}),n.setState({people:e})},n.removePerson=function(e,t){console.log("removePerson");var a=Object(O.a)(n.state.people).filter(function(t){return t.index!==e});a=n.indexList(a),n.setState({people:a},function(){return n.updateListOnServer()}),t.stopPropagation()},n.handleToggleEditMode=function(e,t){console.log("handleToggleEditMode",e,t),n.setState({people:Object(O.a)(n.state.people.map(function(n){return n.index===e&&(n.editInputField=t),n}))}),t&&""!==t||n.updateListOnServer()},n.handleEditInput=function(e,t,a){console.log("handleEditInput",e,t),n.setState({people:Object(O.a)(n.state.people.map(function(n){return n.index===e&&(n[t]=a.target.value),n}))})},n.addGift=function(e,t){console.log("addGift",e),n.setState({people:Object(O.a)(n.state.people.map(function(t){return t.index===e&&t.list.push({id:y(),name:"",link:""}),t}))}),t.stopPropagation()},n.handleUpdateGift=function(e,t,a,r){console.log("handleUpdateGift",e,t,a),n.setState({people:Object(O.a)(n.state.people.map(function(n){n.index===e&&(n.list.filter(function(e){return e.id===t})[0][a.split(".")[1]]=r.target.value);return n}))})},n.removeGift=function(e,t){n.setState({people:Object(O.a)(n.state.people.map(function(n){return n.index===e&&(n.list=n.list.filter(function(e){return e.id!==t})),n}))},function(){return n.updateListOnServer()})},n.updateListOnServer=Object(g.a)(f.a.mark(function e(){var t,a,r;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(n.state.people)},e.next=3,fetch("".concat(P.href,"/").concat(n.props.match.params.listId),t);case 3:return a=e.sent,e.next=6,a.json();case 6:r=e.sent,console.log("response from PATCH",r);case 8:case"end":return e.stop()}},e,this)})),n.handlePasswordChange=function(e){n.setState({password:e.target.value})},n.submitPassword=function(){n.setState({errorMsg:null},function(){n.getListInfoFromServer()})},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.listInfo,n=e.people,a=e.showEnterPassword,o=e.password,i=e.errorMsg,s=this.bringPersonToFront,l=this.createPersonCard,c=this.removePerson,u=this.handleToggleEditMode,d=this.handleEditInput,p=this.addGift,m=this.handleUpdateGift,h=this.removeGift,f=this.handlePasswordChange,g=this.submitPassword;return console.log("render",n),a?r.a.createElement("div",{className:"enter-password"},i&&r.a.createElement("span",null,i),r.a.createElement("input",{type:"password",value:o,placeholder:"Enter password",onChange:f,onKeyPress:function(e){return"Enter"===e.key?g():null},className:i?"incorrect":""}),r.a.createElement("button",{onClick:g},"Submit")):r.a.createElement("div",{className:"List"},r.a.createElement("h1",null,t.name),r.a.createElement("h2",null,"Created by: ",t.createdBy," on ",new Date(t.createdOn).toLocaleString()),r.a.createElement("div",{className:"people"},n&&n.map(function(e){return r.a.createElement(x,Object.assign({key:e.id},e,{bringPersonToFront:s,removePerson:c,handleToggleEditMode:u,handleEditInput:d,addGift:p,handleUpdateGift:m,removeGift:h}))}),r.a.createElement("button",{onClick:l,className:"create-person-card-btn"},r.a.createElement(C.a,null))))}}]),t}(r.a.Component),T=(n(47),function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement("div",{className:"GiftLists"},r.a.createElement(m.a,{exact:!0,path:"/",component:k}),r.a.createElement(m.a,{path:"/list/:listId",component:L})))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,2,1]]]);
//# sourceMappingURL=main.6ba61de9.chunk.js.map