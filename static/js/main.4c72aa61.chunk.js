(this.webpackJsonpt3d=this.webpackJsonpt3d||[]).push([[0],{19:function(e){e.exports=JSON.parse('{"serverRoot":"https://t3dweb.herokuapp.com","localRoot":"http://localhost:4000","webSocketRoot":"wss://t3dweb.herokuapp.com","signupRoute":"signup","signinRoute":"signin","usersRoute":"users"}')},37:function(e,t,n){},38:function(e,t,n){},58:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var a=n(23),r=n(9),s=n(10),c=n(12),o=n(11),i=n(0),l=(n(37),n(1)),d=function(e){var t=e.playerXName,n=e.playerOName,a=e.xScore,r=e.oScore,s=null,c=null,o=null,i=null;return a>r?(o="badge-success",s={border:"5px solid green",borderRadius:"15px",paddingLeft:"1%",paddingRight:"1%"},i="badge-danger",c=null):a===r?(o="badge-warning",i="badge-warning",s=null,c=null):(i="badge-success",c={border:"5px solid green",borderRadius:"15px",paddingLeft:"1%",paddingRight:"1%"},o="badge-danger",s=null),Object(l.jsxs)("div",{className:"card border-info mb-3 scoreCard",children:[Object(l.jsx)("div",{className:"card-header text-center border-info",children:"\u0646\u0648\u0639 \u0628\u0627\u0632\u06cc"}),Object(l.jsx)("div",{className:"card-body",children:Object(l.jsxs)("p",{className:"card-title text-center mx-auto",children:[Object(l.jsx)("span",{style:s,children:t}),Object(l.jsx)("span",{className:"badge badge-pill ".concat(o," scoreBadge ml-3 mr-3"),children:a<10?"0".concat(a):"".concat(a)}),Object(l.jsx)("span",{className:"badge badge-pill ".concat(i," scoreBadge ml-3 mr-3"),children:r<10?"0".concat(r):"".concat(r)}),Object(l.jsx)("span",{style:c,children:n})]})}),Object(l.jsx)("button",{id:"btnReplayGame",className:"btn btn-outline-info btn-lg btn-block",children:"\u0628\u0627\u0632\u067e\u062e\u0634 \u0628\u0627\u0632\u06cc"})]})},u=function(e){var t=e.scores;return Object(l.jsx)("div",{children:t.map((function(e){return Object(l.jsx)(d,{playerXName:e.playerXName,playerOName:e.playerOName,xScore:e.xScore,oScore:e.oScore},e.id)}))})},b=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={liveScores:[{id:0,playerXName:"\u0633\u0647\u0646\u062f \u0639\u0644\u06cc \u0632\u0627\u062f\u0647",playerOName:"\u0639\u0644\u06cc \u0631\u0636\u0627 \u0642\u0631\u0628\u0627\u0646\u06cc",xScore:10,oScore:6},{id:1,playerXName:"paya",playerOName:"whatever",xScore:15,oScore:1},{id:2,playerXName:"\u0645\u062c\u06cc\u062f \u0646\u0648\u06cc\u062f\u0632\u0627\u062f\u0647",playerOName:"\u0639\u0644\u06cc \u06cc\u0627\u0631\u06cc",xScore:8,oScore:8},{id:3,playerXName:"\u0645\u062c\u062a\u0628\u06cc \u062d\u0633\u06cc\u0646\u06cc",playerOName:"\u0645\u0635\u0637\u0641\u06cc \u0639\u0644\u06cc \u0645\u0631\u062f\u0627\u0646\u06cc",xScore:2,oScore:14},{id:4,playerXName:"\u0645\u062c\u062a\u0628\u06cc \u062d\u0633\u06cc\u0646\u06cc",playerOName:"\u0645\u0635\u0637\u0641\u06cc \u0639\u0644\u06cc \u0645\u0631\u062f\u0627\u0646\u06cc",xScore:2,oScore:14},{id:5,playerXName:"\u0645\u062c\u062a\u0628\u06cc \u062d\u0633\u06cc\u0646\u06cc",playerOName:"\u0645\u0635\u0637\u0641\u06cc \u0639\u0644\u06cc \u0645\u0631\u062f\u0627\u0646\u06cc",xScore:2,oScore:14}],finalScores:[{id:0,playerXName:"\u0646\u0648\u06cc\u062f \u0628\u062e\u062a\u06cc\u0627\u0631\u06cc",playerOName:"\u0645\u062d\u0633\u0646 \u0631\u0636\u0627\u06cc\u06cc",xScore:0,oScore:6},{id:1,playerXName:"\u067e\u0631\u0647\u0627\u0645 \u06a9\u0628\u06cc\u0631\u06cc",playerOName:"\u0633\u0645\u0627\u0646\u0647 \u0633\u0645\u0627\u0648\u06cc",xScore:2,oScore:4},{id:2,playerXName:"\u0645\u062c\u06cc\u062f \u062f\u0627\u0648\u0631\u062e\u0648\u0627\u0647",playerOName:"\u0632\u0647\u0631\u0627 \u0641\u0646\u0627\u06cc\u06cc",xScore:4,oScore:12},{id:3,playerXName:"\u0627\u0645\u06cc\u0631 \u0635\u0641\u0648\u06cc \u0646\u0633\u0628",playerOName:"paya",xScore:3,oScore:3}],showLiveOnes:!0},e.btnShowLiveScores=function(){e.setState({showLiveOnes:!0})},e.btnShowFinalScores=function(){e.setState({showLiveOnes:!1})},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state,t=e.liveScores,n=e.finalScores,a=e.showLiveOnes;return Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col-6",children:Object(l.jsx)("button",{className:"scoresTypeSelectButton btn ".concat(a?"btn-outline-success":"btn-outline-primary"),onClick:this.btnShowLiveScores,children:"\u0646\u062a\u0627\u06cc\u062c \u0632\u0646\u062f\u0647"})}),Object(l.jsx)("div",{className:"col-6",children:Object(l.jsx)("button",{className:"scoresTypeSelectButton btn ".concat(a?"btn-outline-primary":"btn-outline-success"),onClick:this.btnShowFinalScores,children:"\u0646\u062a\u0627\u06cc\u062c \u0646\u0647\u0627\u06cc\u06cc"})})]}),Object(l.jsx)("div",{className:"row",children:Object(l.jsx)("div",{className:"col-12",children:Object(l.jsx)(u,{scores:a?t:n})})})]})}}]),n}(i.Component),j=n(7),m=(n(38),function(){return Object(l.jsxs)("div",{className:"card border-warning mb-3 singleCard",children:[Object(l.jsx)("div",{className:"card-header text-center border-warning",children:"\u0642\u0648\u0627\u0646\u06cc\u0646 \u0628\u0627\u0632\u06cc"}),Object(l.jsxs)("div",{className:"card-body text-right",children:[Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u0627\u0648\u0644"}),Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u062f\u0648\u0645"}),Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u0633\u0648\u0645"}),Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u0686\u0647\u0627\u0631\u0645"}),Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u067e\u0646\u062c\u0645"}),Object(l.jsx)("p",{children:"\u0633\u0637\u0631 \u0634\u0634\u0645"}),Object(l.jsx)("p",{children:"blah blah blah"})]})]})}),p=function(){return Object(l.jsxs)("div",{className:"card border-dark mb-3 singleCard",children:[Object(l.jsx)("div",{className:"card-header text-center border-dark",children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u062a\u0645\u0627\u0633"}),Object(l.jsxs)("div",{className:"card-body text-center",children:[Object(l.jsx)("p",{children:"\u062f\u0627\u0646\u0634\u06af\u0627\u0647 \u0639\u0644\u0645 \u0648 \u0635\u0646\u0639\u062a \u0627\u06cc\u0631\u0627\u0646"}),Object(l.jsxs)("p",{children:["E-mail: ",Object(l.jsx)("a",{href:"https://mail.google.com",children:"thcplusplus@gmail.com"})]}),Object(l.jsx)("p",{children:"Phone Number: 0000000000000"}),Object(l.jsx)("p",{children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u062a\u0645\u0627\u0633 \u0627\u0633\u062a\u0627\u062f"}),Object(l.jsx)("p",{children:"instagram: ......"}),Object(l.jsx)("p",{children:"blah blah blah"})]})]})},h=n(27),x=(n(58),n(15)),O=Object(i.createContext)({player:null}),v=n(19),f=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).state={rowMarginRatio:0,players:[{shape:"X",color:"cyan",lineColor:"btn btn-primary",score:0},{shape:"O",color:"darkred",lineColor:"btn btn-danger",score:0}],turn:0,tableDimension:4,table:[],yourTurn:-1},e.connectToWS=function(){var t=new WebSocket(v.webSocketRoot);return t.onopen=function(){},t.onerror=function(e){console.log("WebSocket error: ".concat(e))},t.onmessage=function(t){var n=e.state,a=n.yourTurn,r=n.tableDimension;if(-1!==a){var s=Number(t.data),c=e.getCellCoordinates(s,r);e.verifyAndApplyTheMove(c,e.cellButtons[s])}else e.setState({yourTurn:Number(t.data)})},t.onclose=function(){t=null},t},e.updateMarginParameters=function(t){e.setState({rowMarginRatio:t.offsetWidth/12.4})},e.onTableBlockResize=function(t){e.updateMarginParameters(t.target)},e.getCellCoordinates=function(e,t){var n=e%(t*t);return{floor:Math.floor(e/(t*t)),row:Math.floor(n/t),column:n%t}},e.onEachCellClick=function(t){var n=e.state.tableDimension,a=t.target;if(e.state.turn===e.state.yourTurn){var r=e.getCellCoordinates(a.id,n);e.verifyAndApplyTheMove(r,a),e.socketConnection.send("".concat(a.id))}},e.verifyAndApplyTheMove=function(t,n){var a=e.state,r=a.players,s=a.turn,c=Object(h.a)(e.state.table);null===c[t.floor][t.row][t.column]&&(c[t.floor][t.row][t.column]=s,n.innerHTML=r[s].shape,n.style.color=r[s].color,e.setState({turn:(s+1)%2,table:c}),e.inspectTableAroundTheCell(t.floor,t.row,t.column))},e.inspectTableAroundTheCell=function(t,n,a){for(var r=e.state,s=r.players,c=r.table,o=r.tableDimension,i=c[t][n][a],l=0,d=0,u=0,b=0,j=0,m=0,p=0,O=0;O<o;O++)c[t][n][O]===i&&l++,c[t][O][a]===i&&d++,c[O][n][a]===i&&p++,n===a&&(c[t][O][O]===i&&u++,n===t&&c[O][O][O]===i&&j++),n+a+1===o&&(c[t][O][o-O-1]===i&&b++,n===t&&c[O][O][o-O-1]===i&&m++);var v=e.connectTheScoreLines(l,t*o*o+n*o,1,s[i],o)+e.connectTheScoreLines(d,t*o*o+a,o,s[i],o)+e.connectTheScoreLines(u,t*o*o,o+1,s[i],o)+e.connectTheScoreLines(b,t*o*o+(o-1),o-1,s[i],o)+e.connectTheScoreLines(j,0,o*(o+1)+1,s[i],o)+e.connectTheScoreLines(m,o-1,o*(o+1)-1,s[i],o)+e.connectTheScoreLines(p,n*o+a,o*o,s[i],o);if(v){var f=Object(h.a)(s);f[i].score+=v,e.setState({players:f}),0===i?x.b.info(s[i].shape+" : "+s[i].score,{position:"top-right"}):x.b.error(s[i].shape+" : "+s[i].score,{position:"bottom-left"})}},e.connectTheScoreLines=function(t,n,a,r,s){if(t===s){for(var c=0;c<s;c++)e.cellButtons[n+c*a].className="gameTableCells "+r.lineColor;return 1}return 0},e.drawGameTable=function(){for(var t=e.state,n=t.rowMarginRatio,a=t.tableDimension,r=[],s=0;s<a;s++)r.push(s);return r.map((function(t){return Object(l.jsxs)("div",{children:[r.map((function(s){return Object(l.jsx)("div",{style:{marginLeft:"".concat(s*n,"px")},children:r.map((function(n){return Object(l.jsx)("button",{type:"button",className:"gameTableCells btn btn-outline-dark",id:t*a*a+s*a+n,onClick:function(t){return e.onEachCellClick(t)},children:" "})}))})})),Object(l.jsx)("br",{})]})}))},e.cellButtons=[],e.socketConnection=e.connectToWS(),e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.cellButtons=document.getElementsByClassName("gameTableCells");for(var t=this.state.tableDimension,n=[],a=0;a<t;a++)n.push(a);var r=n.map((function(e){return n.map((function(e){return n.map((function(e){return null}))}))}));this.setState({table:r});var s=document.getElementById("divTableBlock");this.updateMarginParameters(s),s.addEventListener("resize",(function(t){return e.onTableBlockResize(t)}))}},{key:"render",value:function(){return Object(l.jsx)("div",{id:"divTableBlock",className:"card border-dark gameBorderCard",children:this.drawGameTable()})}}]),n}(i.Component);f.contextType=O;var g=f,N=n(16),y=n.n(N),S=n(22),w=n(90),C=n(88),k=n(89),I=n(24),T=n.n(I);T.a.defaults.headers.post["Content-Type"]="application/json",T.a.interceptors.response.use(null,(function(e){var t=401,n=422,a=e.response&&e.response.status>=400&&e.response.status<500;return e.response.status===t?x.b.error("\u0634\u0645\u0627\u0631\u0647 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc\u06cc \u06cc\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0646\u0627\u062f\u0631\u0633\u062a \u0627\u0633\u062a",{position:"top-right",closeOnClick:!0}):e.response.status===n?x.b.error("\u0641\u0631\u0645\u062a \u0648\u0631\u0648\u062f\u06cc \u0646\u0627\u062f\u0631\u0633\u062a \u0627\u0633\u062a",{position:"top-right",closeOnClick:!0}):a||x.b.error("\u0645\u0634\u06a9\u0644\u06cc \u0627\u0632 \u0633\u0645\u062a \u0633\u0631\u0648\u0631 \u0631\u062e \u062f\u0627\u062f\u0647 \u0627\u0633\u062a.",{position:"top-right",closeOnClick:!0}),Promise.reject(e)}));var L={get:T.a.get,post:T.a.post,put:T.a.put,delete:T.a.delete},D={signUp:function(e){return L.post("".concat(v.serverRoot,"/").concat(v.usersRoute,"/").concat(v.signupRoute),JSON.stringify(e))},signIn:function(e){return L.post("".concat(v.serverRoot,"/").concat(v.usersRoute,"/").concat(v.signinRoute),JSON.stringify(e))},getPlayer:function(e){return L.get("".concat(v.serverRoot,"/").concat(v.usersRoute,"/").concat(e))},getAllPlayers:function(){return L.get("".concat(v.serverRoot,"/").concat(v.usersRoute))},saveUser:function(e,t){sessionStorage.setItem("uid",e),sessionStorage.setItem("token",t)},readUserID:function(){return sessionStorage.getItem("uid")}},U=n(48),R=function(e){var t=e.loading;return Object(i.useLayoutEffect)((function(){document.body.style={overflowY:"auto"},document.body.style={height:"auto"}}),[t]),Object(l.jsx)(l.Fragment,{children:t?Object(l.jsx)(U.Planets,{time:0,customLoading:t}):null})},B=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={showModal:!1,studentID:"",password:"",loading:!1},e.onCloseClick=function(){return e.setState({showModal:!1})},e.onShowClick=function(){return e.setState({showModal:!0})},e.onSignInSubmitted=function(){var t=Object(S.a)(y.a.mark((function t(n){var a,r,s,c,o,i,l,d;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.setState({loading:!0}),a={SUCCESSFULL:200,AUTHENTICATION_INVALID:401},r=e.state,s=r.studentID,c=r.password,o={studentID:s,password:Number(c)},t.prev=5,t.next=8,D.signIn(o);case 8:i=t.sent,l=i.status,d=i.data,l===a.SUCCESSFULL&&(D.saveUser(d.userID,d.token),e.props.history.replace("/")),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(5),e.setState({password:""});case 17:e.setState({loading:!1});case 18:case"end":return t.stop()}}),t,null,[[5,14]])})));return function(e){return t.apply(this,arguments)}}(),e.onForgotPasswordClick=function(){},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.showModal,a=t.studentID,r=t.password,s=t.loading;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(R,{loading:s}),Object(l.jsx)(w.a,{variant:"outline-primary",onClick:this.onShowClick,children:"\u0648\u0631\u0648\u062f \u06a9\u0627\u0631\u0628\u0631\u0627\u0646"}),Object(l.jsxs)(C.a,{show:n,onHide:this.onCloseClick,children:[Object(l.jsx)(C.a.Header,{closeButton:!0}),Object(l.jsx)(C.a.Body,{children:Object(l.jsxs)(k.a,{className:"m-4 text-right",onSubmit:function(t){return e.onSignInSubmitted(t)},children:[Object(l.jsxs)(k.a.Group,{className:"mb-3 form-inline",children:[Object(l.jsx)(k.a.Label,{className:"w-25",children:"\u0634\u0645\u0627\u0631\u0647 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc\u06cc"}),Object(l.jsx)(k.a.Control,{type:"text",className:"w-75 text-left",placeholder:"Student ID",value:a,onChange:function(t){return e.setState({studentID:t.target.value})}})]}),Object(l.jsxs)(k.a.Group,{className:"mb-3 form-inline",controlId:"formBasicPassword",children:[Object(l.jsx)(k.a.Label,{className:"w-25",children:"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"}),Object(l.jsx)(k.a.Control,{type:"password",className:"w-75 text-left",placeholder:"Password",value:r,onChange:function(t){return e.setState({password:t.target.value})}})]}),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(w.a,{className:"w-50",type:"submit",variant:"outline-success",children:"\u0648\u0631\u0648\u062f"}),Object(l.jsx)(w.a,{className:"w-50",variant:"outline-info",onClick:this.onForgotPasswordClick,children:"\u0641\u0631\u0627\u0645\u0648\u0634\u06cc \u0631\u0645\u0632"})]})]})})]})]})}}]),n}(i.Component),E=Object(j.f)(B),P=(n(84),function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={studentID:"",password:"",confirmPassword:"",firstname:"",lastname:"",email:"",loading:!1},e.checkConfirmPassword=function(t){e.setState({confirmPassword:t.target.value}),e.state.password!==t.target.value?t.target.setCustomValidity("\u062a\u0627\u06cc\u06cc\u062f \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627\u06cc\u062f \u0628\u0627 \u062e\u0648\u062f \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0645\u0637\u0627\u0628\u0642\u062a \u06a9\u0627\u0645\u0644 \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f"):t.target.setCustomValidity("")},e.onSignUpSubmit=function(){var t=Object(S.a)(y.a.mark((function t(n){var a,r,s,c,o,i,l,d,u,b,j,m;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),a=e.state,r=a.studentID,s=a.password,c=a.confirmPassword,o=a.firstname,i=a.lastname,l=a.email,!(o.trim().length<3||i.trim().length<3)){t.next=6;break}return x.b.error("\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0628\u0627\u06cc\u062f \u062d\u062f\u0627\u0642\u0644 \u0634\u0627\u0645 \u0633\u0647 \u062d\u0631\u0641 \u0641\u0627\u0631\u0633\u06cc \u0628\u0627\u0634\u062f",{position:"top-right",closeOnClick:!0}),e.setState({firstname:o.trim(),lastname:i.trim()}),t.abrupt("return");case 6:if(d={USER_CREATED:201,ALREADY_EXISTS:403},s!==c){t.next=25;break}return t.prev=8,e.setState({loading:!0}),u={studentID:Number(r),password:s,email:l,fullname:(o+" "+i).replace(/\s+/g," ")},t.next=13,D.signUp(u);case 13:b=t.sent,j=b.status,m=b.data,j===d.USER_CREATED&&(x.b.success("\u062b\u0628\u062a \u0646\u0627\u0645 \u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u0627\u0646\u062c\u0627\u0645 \u0634\u062f",{position:"top-right",closeOnClick:!0}),D.saveUser(m.userID,m.token),e.props.history.replace("/")),t.next=23;break;case 19:t.prev=19,t.t0=t.catch(8),e.setState({loading:!1}),t.t0.response.status===d.ALREADY_EXISTS?(x.b.error("\u06a9\u0627\u0631\u0628\u0631\u06cc \u0628\u0627 \u0627\u06cc\u0646 \u0634\u0645\u0627\u0631\u0647 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc\u06cc \u06cc\u0627 \u0627\u06cc\u0645\u06cc\u0644 \u0642\u0628\u0644\u0627 \u062b\u0628\u062a \u0646\u0627\u0645 \u06a9\u0631\u062f\u0647 \u0627\u0633\u062a",{position:"top-right",closeOnClick:!0}),x.b.warn("\u0627\u06af\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0641\u0631\u0627\u0645\u0648\u0634 \u06a9\u0631\u062f\u0647 \u0627\u06cc\u062f\u060c \u0627\u0632 \u06af\u0632\u06cc\u0646\u0647 \u0628\u0627\u0632\u06cc\u0627\u0628\u06cc \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062f\u0631 \u0635\u0641\u062d\u0647 \u06cc \u0648\u0631\u0648\u062f \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0646\u0645\u0627\u06cc\u06cc\u062f",{position:"top-right",closeOnClick:!0})):x.b.error("\u062b\u0628\u062a \u0646\u0627\u0645 \u0628\u0627 \u0645\u0634\u06a9\u0644 \u0631\u0648 \u0628\u0647 \u0631\u0648 \u0634\u062f. \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u062a\u0644\u0627\u0634 \u06a9\u062a\u0646\u06cc\u062f",{position:"top-right",closeOnClick:!0});case 23:t.next=26;break;case 25:x.b.error("\u0631\u0645\u0632 \u0639\u0628\u0648\u0631\u0647\u0627 \u0645\u0637\u0627\u0628\u0642\u062a \u0646\u062f\u0627\u0631\u0646\u062f",{position:"top-right",closeOnClick:!0});case 26:e.setState({loading:!1});case 27:case"end":return t.stop()}}),t,null,[[8,19]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.studentID,a=t.password,r=t.confirmPassword,s=t.firstname,c=t.lastname,o=t.email,i=t.loading;return Object(l.jsxs)("div",{className:"card border-success mb-3 signUpCard",children:[Object(l.jsx)(R,{loading:i}),Object(l.jsx)("div",{className:"card-header bg-transparent text-center border-success",children:"\u0641\u0631\u0645 \u062b\u0628\u062a \u0646\u0627\u0645"}),Object(l.jsxs)("div",{className:"card-body",children:[Object(l.jsxs)("form",{onSubmit:function(t){return e.onSignUpSubmit(t)},children:[Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u0646\u0627\u0645"}),Object(l.jsx)("input",{type:"text",pattern:"[\u0622-\u06cc ]{3,}",onInput:function(e){return e.target.setCustomValidity("")},onInvalid:function(e){return e.target.setCustomValidity("\u0646\u0627\u0645 \u0628\u0627\u06cc\u062f \u0628\u0627 \u062d\u0631\u0648\u0641 \u0641\u0627\u0631\u0633\u06cc \u0648 \u0628\u0627 \u062d\u062f\u0627\u0642\u0644 \u0637\u0648\u0644 \u0633\u0647 \u062d\u0631\u0641 \u0628\u0627\u0634\u062f")},className:"signUpTextBox form-control w-75",placeholder:"First Name",value:s,required:"required",onChange:function(t){return e.setState({firstname:t.target.value})}})]}),Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),Object(l.jsx)("input",{type:"text",className:"signUpTextBox form-control w-75",pattern:"[\u0622-\u06cc ]{3,}",onInput:function(e){return e.target.setCustomValidity("")},onInvalid:function(e){return e.target.setCustomValidity("\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0628\u0627\u06cc\u062f \u0628\u0627 \u062d\u0631\u0648\u0641 \u0641\u0627\u0631\u0633\u06cc \u0648 \u0628\u0627 \u062d\u062f\u0627\u0642\u0644 \u0637\u0648\u0644 \u0633\u0647 \u062d\u0631\u0641 \u0628\u0627\u0634\u062f")},placeholder:"Last Name",value:c,required:"required",onChange:function(t){return e.setState({lastname:t.target.value})}})]}),Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u0634\u0645\u0627\u0631\u0647 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc\u06cc"}),Object(l.jsx)("input",{type:"text",pattern:"[0-9]{8}",onInput:function(e){return e.target.setCustomValidity("")},onInvalid:function(e){return e.target.setCustomValidity("\u0634\u0645\u0627\u0631\u0647 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc\u06cc \u0628\u0627\u06cc\u062f \u06cc\u06a9 \u0639\u062f\u062f 8 \u0631\u0642\u0645\u06cc \u0628\u0627\u0634\u062f")},className:"signUpTextBox form-control w-75",placeholder:"Student ID",value:n,required:"required",onChange:function(t){return e.setState({studentID:t.target.value})}})]}),Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u0627\u06cc\u0645\u06cc\u0644"}),Object(l.jsx)("input",{type:"email",pattern:".{6,}",onInput:function(e){return e.target.setCustomValidity("")},onInvalid:function(e){return e.target.setCustomValidity("\u0648\u0631\u0648\u062f\u06cc \u0628\u0627\u06cc\u062f \u0641\u0631\u0645\u062a \u0645\u0639\u062a\u0628\u0631 \u0627\u06cc\u0645\u06cc\u0644 \u0631\u0627 \u0631\u0639\u0627\u06cc\u062a \u06a9\u0631\u062f\u0647 \u0648 \u062d\u062f\u0627\u0642\u0644 6 \u06a9\u0627\u0631\u0627\u06a9\u062a\u0631 \u0628\u0627\u0634\u062f")},className:"signUpTextBox form-control w-75",placeholder:"E-mail",value:o,required:"required",onChange:function(t){return e.setState({email:t.target.value})}})]}),Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631"}),Object(l.jsx)("input",{type:"password",pattern:".{6,15}",onInput:function(e){return e.target.setCustomValidity("")},onInvalid:function(e){return e.target.setCustomValidity("\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627\u06cc\u062f \u062d\u062f\u0627\u0642\u0644 6 \u06a9\u0627\u0631\u0627\u06a9\u062a\u0631 \u0648 \u062d\u062f\u0627\u06a9\u062b\u0631 15 \u06a9\u0627\u0631\u0627\u06a9\u062a\u0631 \u062f\u0627\u0634\u062a\u0647 \u0628\u0627\u0634\u062f")},className:"signUpTextBox form-control w-75",placeholder:"Password",value:a,required:"required",onChange:function(t){return e.setState({password:t.target.value})}})]}),Object(l.jsxs)("div",{className:"form-inline",children:[Object(l.jsx)("label",{className:"w-25",children:"\u062a\u0627\u06cc\u06cc\u062f \u0631\u0645\u0632 \u0639\u0628\u0648\u0631"}),Object(l.jsx)("input",{type:"password",className:"signUpTextBox form-control w-75",placeholder:"Confirm Password",value:r,required:"required",onChange:function(t){return e.checkConfirmPassword(t)}})]}),Object(l.jsx)("button",{type:"submit",className:"btn btn-success btn-block mt-4",children:"\u062b\u0628\u062a \u0646\u0627\u0645"})]}),Object(l.jsxs)("p",{className:"forgot-password text-right mt-5",children:["\u0627\u06af\u0631 \u0642\u0628\u0644\u0627 \u062b\u0628\u062a \u0646\u0627\u0645 \u06a9\u0631\u062f\u06cc\u060c \u0628\u0647 \u0635\u0641\u062d\u0647 \u06cc ",Object(l.jsx)(E,{})," \u0628\u0631\u0648 !"," "]})]})]})}}]),n}(i.Component)),A=Object(j.f)(P),M=n(51),F=n(8),X=function(){var e=Object(i.useContext)(O);return Object(l.jsxs)("nav",{className:"navbar navbar-expand-lg nav-pills navbar-light bg-light text-right",children:[Object(l.jsx)("div",{className:"container text-right",children:Object(l.jsx)("div",{className:"navbar-expand",id:"navbarResponsive",children:Object(l.jsxs)("ul",{className:"navbar-nav text-primary",children:[Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/",exact:!0,activeClassName:"btn-outline-secondary text-dark",children:"\u0635\u0641\u062d\u0647 \u0627\u0635\u0644\u06cc"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/theGame",activeClassName:"btn-outline-secondary text-dark",children:"\u0628\u0627\u0632\u06cc \u0647\u0627"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/ranking",activeClassName:"btn-outline-secondary text-dark",children:"\u0631\u0646\u06a9\u06cc\u0646\u06af"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/gameRules",activeClassName:"btn-outline-secondary text-dark",children:"\u0642\u0648\u0627\u0646\u06cc\u0646"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/contactInfo",activeClassName:"btn-outline-secondary text-dark",children:"\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627"})})]})})}),e.player?Object(l.jsx)(F.b,{style:{float:"left"},className:"navItems nav-link btn btn-outline-success btn-sm",to:"/controlPanel",children:"\u06a9\u0646\u062a\u0631\u0644 \u067e\u0646\u0644"}):Object(l.jsx)(F.b,{style:{float:"left"},className:"navItems nav-link btn btn-outline-success btn-sm",to:"/signUp",children:"\u062b\u0628\u062a \u0646\u0627\u0645"})]})},q=(n(85),function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={studentID:"",password:"",loading:!1},e.onSignInSubmitted=function(){var t=Object(S.a)(y.a.mark((function t(n){var a,r,s,c,o,i,l,d;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.setState({loading:!0}),a={SUCCESSFULL:200},r=e.state,s=r.studentID,c=r.password,o={studentID:s,password:Number(c)},t.prev=5,t.next=8,D.signIn(o);case 8:i=t.sent,l=i.status,d=i.data,l===a.SUCCESSFULL&&(D.saveUser(d.userID,d.token),e.props.history.replace("/")),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(5),e.setState({password:""});case 17:e.setState({loading:!1});case 18:case"end":return t.stop()}}),t,null,[[5,14]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.studentID,a=t.password,r=t.loading;return Object(l.jsxs)("div",{className:"card signInSidebar border-primary mb-3",children:[Object(l.jsx)("div",{className:"card-header text-center text-primary border-primary",children:"\u0648\u0631\u0648\u062f \u06a9\u0627\u0631\u0628\u0631\u0627\u0646"}),Object(l.jsx)(R,{loading:r}),Object(l.jsx)("div",{className:"card-body text-primary",children:Object(l.jsxs)("form",{onSubmit:function(t){return e.onSignInSubmitted(t)},children:[Object(l.jsx)("input",{type:"text",className:"signInSidebarTextBox form-control text-primary",placeholder:"Student ID",value:n,onChange:function(t){return e.setState({studentID:t.target.value})}}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{type:"password",className:"signInSidebarTextBox form-control text-primary",placeholder:"Password",value:a,onChange:function(t){return e.setState({password:t.target.value})}}),Object(l.jsx)("br",{}),Object(l.jsxs)("div",{className:"card-footer bg-transparent border-primary",children:[Object(l.jsx)("button",{id:"btnSideBarSignIn",type:"submit",className:"btn btn-outline-success btn-lg",children:"\u0648\u0631\u0648\u062f"}),Object(l.jsx)("button",{id:"btnSideBarPasswordRecovery",className:"btn btn-outline-info btn-lg",children:"\u0628\u0627\u0632\u06cc\u0627\u0628\u06cc \u067e\u0633\u0648\u0631\u062f"})]})]})})]})}}]),n}(i.Component)),V=Object(j.f)(q),G=function(){return Object(l.jsxs)("div",{className:"card newsSidebar border-success  mb-3",children:[Object(l.jsx)("div",{className:"card-header text-center text-success border-success",children:"\u0627\u0637\u0644\u0627\u0639\u06cc\u0647"}),Object(l.jsxs)("div",{className:"card-body text-right",children:[Object(l.jsx)("p",{children:"\u0645\u062a\u0646 \u062e\u0628\u0631 1"}),Object(l.jsx)("p",{children:"\u0645\u062a\u0646 \u062e\u0628\u0631 2"}),Object(l.jsx)("p",{children:"\u0645\u062a\u0646 \u062e\u0628\u0631 3"}),Object(l.jsx)("p",{children:"\u0645\u062a\u0646 \u062e\u0628\u0631 4"}),Object(l.jsx)("p",{children:"blah blah blah"})]})]})},H=n(36),J=function(){var e=Object(i.useContext)(O);return Object(l.jsx)("nav",{className:"navbar navbar-expand-lg nav-pills navbar-light bg-light text-right",children:Object(l.jsx)("div",{className:"container text-right",children:Object(l.jsxs)("div",{className:"navbar-expand w-100",id:"navbarResponsive",children:[Object(l.jsx)("ul",{className:"navbar-nav text-primary",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("li",{className:"nav-item",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/",exact:!0,activeClassName:"btn-outline-secondary text-dark",children:"\u0635\u0641\u062d\u0647 \u0627\u0635\u0644\u06cc"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/theGame",activeClassName:"btn-outline-secondary text-dark",children:"\u0628\u0627\u0632\u06cc \u0647\u0627"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/ranking",activeClassName:"btn-outline-secondary text-dark",children:"\u0631\u0646\u06a9\u06cc\u0646\u06af"})})]})}),Object(l.jsx)("hr",{}),Object(l.jsx)("ul",{className:"navbar-nav text-primary",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/gameRules",activeClassName:"btn-outline-secondary text-dark",children:"\u0642\u0648\u0627\u0646\u06cc\u0646"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:Object(l.jsx)(F.b,{className:"nav-link text-primary",to:"/contactInfo",activeClassName:"btn-outline-secondary text-dark",children:"\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627"})}),Object(l.jsx)("li",{className:"nav-item ml-2",children:e.player?Object(l.jsx)(F.b,{className:"navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5",to:"/controlPanel",children:"\u06a9\u0646\u062a\u0631\u0644 \u067e\u0646\u0644"}):Object(l.jsx)(F.b,{className:"navItems nav-link btn btn-outline-success btn-block mt-1 mr-lg-5",to:"/signUp",children:"\u062b\u0628\u062a \u0646\u0627\u0645"})})]})})]})})})},W=n.p+"static/media/no-avatar.5e7c913e.png",_=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this.context.player;return Object(l.jsxs)("div",{className:"card playerInfoSideBar border-info mb-3",children:[Object(l.jsx)("div",{className:"card-header text-center text-info border-info",children:e.fullname}),Object(l.jsx)("img",{className:"card-img-top playerAvatar",src:W,alt:"No Images Found"}),Object(l.jsx)("hr",{}),Object(l.jsx)("div",{className:"card-body",children:Object(l.jsxs)("ul",{className:"list-group list-group-flush",children:[Object(l.jsx)("li",{className:" list-group-item",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("p",{className:"col-6 text-right",children:"\u0627\u0645\u062a\u06cc\u0627\u0632 \u0628\u0627\u0632\u06cc\u06a9\u0646"}),Object(l.jsx)("p",{className:"col-6 text-left",children:e.records.points})]})}),Object(l.jsx)("li",{className:" list-group-item",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("p",{className:"col-6 text-right",children:"\u062a\u0639\u062f\u0627\u062f \u0628\u0631\u062f"}),Object(l.jsx)("p",{className:"col-6 text-left",children:e.records.wins})]})}),Object(l.jsx)("li",{className:" list-group-item",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("p",{className:"col-6 text-right",children:"\u062a\u0639\u062f\u0627\u062f \u0628\u0627\u062e\u062a"}),Object(l.jsx)("p",{className:"col-6 text-left",children:e.records.loses})]})}),Object(l.jsx)("li",{className:" list-group-item",children:Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("p",{className:"col-6 text-right",children:"\u062a\u0639\u062f\u0627\u062f \u062a\u0633\u0627\u0648\u06cc"}),Object(l.jsx)("p",{className:"col-6 text-left",children:e.records.draws})]})})]})})]})}}]),n}(i.Component);_.contextType=O;var z=_,Y=Object(j.f)((function(e){var t=e.location.pathname,n=Object(H.useMediaQuery)({query:"(min-width: 1200px)"}),a=Object(H.useMediaQuery)({query:"(max-width: 768px)"}),r=!n&&!a,s=Object(i.useState)(""),c=Object(M.a)(s,2),o=c[0],d=c[1];Object(S.a)(y.a.mark((function e(){var t,n,a,r;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t={SUCCESSFULL:200},!(n=D.readUserID())){e.next=10;break}return e.next=5,D.getPlayer(n);case 5:if(a=e.sent,r=a.data,a.status!==t.SUCCESSFULL){e.next=10;break}return e.abrupt("return",r.player);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e)})))().then((function(e){d(e)})).catch((function(e){d(null)}));var u=Object(l.jsx)(G,{}),b=o?Object(l.jsx)(z,{}):Object(l.jsx)(V,{});return"/signUp"===t&&(u=null,b=null),"/theGame"===t&&a&&(u=null,b=null),Object(l.jsxs)(O.Provider,{value:{player:o},children:[Object(l.jsx)(x.a,{}),n||r?Object(l.jsx)(X,{}):Object(l.jsx)(J,{}),n&&Object(l.jsxs)("div",{className:"row mx-auto w-100",children:[Object(l.jsx)("div",{className:"col-3 p-3",children:b}),Object(l.jsx)("div",{className:null!==u?"col-6":"col-12",children:e.children}),Object(l.jsx)("div",{className:"col-3",children:u})]}),r&&Object(l.jsxs)("div",{className:"row mx-auto w-100",children:[Object(l.jsx)("div",{className:null!==u?"col-8":"col-12",children:e.children}),Object(l.jsx)("div",{className:"col-4",children:u})]}),a&&Object(l.jsxs)("div",{className:"container mx-auto w-100",children:[o?Object(l.jsx)("div",{className:"row w-100 mx-auto",children:b}):null,Object(l.jsx)("div",{className:"row w-100 mx-auto",children:u}),Object(l.jsx)("div",{className:"row w-100 mx-auto",children:e.children})]})]})})),Q=n(91),K=function(e){var t=e.rowNumber,n=e.name,a=e.points,r=e.wins,s=e.loses,c=e.draws;return Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{scope:"row",children:t}),Object(l.jsx)("td",{children:n}),Object(l.jsx)("td",{children:a}),Object(l.jsx)("td",{children:r}),Object(l.jsx)("td",{children:s}),Object(l.jsx)("td",{children:c})]})},Z=function(e){var t=e.players;return Object(l.jsxs)(Q.a,{border:"dark",style:{width:"100%",borderRadius:"15px"},children:[Object(l.jsx)(Q.a.Header,{className:"text-center",children:"\u0631\u062f\u0647 \u0628\u0646\u062f\u06cc"}),Object(l.jsxs)("table",{className:"table table-striped table-bordered table-hover text-center",children:[Object(l.jsx)("thead",{className:"bg-info",children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{scope:"col",children:"#"}),Object(l.jsx)("th",{scope:"col",children:"\u0646\u0627\u0645 \u0628\u0627\u0632\u06cc\u06a9\u0646"}),Object(l.jsx)("th",{scope:"col",children:"\u0627\u0645\u062a\u06cc\u0627\u0632"}),Object(l.jsx)("th",{scope:"col",children:"\u062a\u0639\u062f\u0627\u062f \u0628\u0631\u062f"}),Object(l.jsx)("th",{scope:"col",children:"\u062a\u0639\u062f\u0627\u062f \u0628\u0627\u062e\u062a"}),Object(l.jsx)("th",{scope:"col",children:"\u062a\u0639\u062f\u0627\u062f \u062a\u0633\u0627\u0648\u06cc"})]})}),Object(l.jsx)("tbody",{children:t.map((function(e){return Object(l.jsx)(K,{rowNumber:t.findIndex((function(t){return t.userID===e.userID}))+1,name:e.fullname,points:e.records.points,wins:e.records.wins,loses:e.records.loses,draws:e.records.draws},e.userID)}))})]})]})},$=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={players:[],loading:!1},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;Object(S.a)(y.a.mark((function t(){var n,a,r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({loading:!0}),n={SUCCESSFULL:200},t.next=4,D.getAllPlayers();case 4:if(a=t.sent,r=a.data,a.status!==n.SUCCESSFULL){t.next=9;break}return t.abrupt("return",r.players);case 9:return t.abrupt("return",[]);case 10:case"end":return t.stop()}}),t)})))().then((function(t){var n=Object(h.a)(t);e.setState({players:n.sort((function(e,t){return t.records.points-e.records.points})),loading:!1})})).catch((function(t){e.setState({players:[],loading:!1})}))}},{key:"render",value:function(){var e=this.state,t=e.players,n=e.loading;return Object(l.jsxs)("div",{className:"row mt-3",children:[n?Object(l.jsx)(R,{loading:n}):null,Object(l.jsx)("div",{className:"col-12",children:Object(l.jsx)(Z,{players:t})})]})}}]),n}(i.Component),ee=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).onSignOutClick=function(){sessionStorage.clear()},e}return Object(s.a)(n,[{key:"render",value:function(){return Object(l.jsxs)("div",{className:"card border-success mb-3 signUpCard",children:[Object(l.jsx)("div",{className:"card-header bg-transparent text-center border-success",children:"\u06a9\u0646\u062a\u0631\u0644 \u067e\u0646\u0644"}),Object(l.jsx)("div",{className:"card-body",children:Object(l.jsx)("button",{type:"button",className:"btn btn-danger btn-block mt-4",onClick:this.onSignOutClick,children:"\u062e\u0631\u0648\u062c \u0627\u0632 \u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc"})})]})}}]),n}(i.Component),te=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(l.jsx)(Y,{children:Object(l.jsxs)(j.c,{children:[Object(l.jsx)(j.a,{path:"/signUp",component:A}),Object(l.jsx)(j.a,{path:"/theGame",component:g}),Object(l.jsx)(j.a,{path:"/ranking",component:$}),Object(l.jsx)(j.a,{path:"/gameRules",component:m}),Object(l.jsx)(j.a,{path:"/contactInfo",component:p}),Object(l.jsx)(j.a,{path:"/",exact:!0,component:b}),Object(l.jsx)(j.a,{path:"/controlPanel",exact:!0,component:ee})]})})}}]),n}(i.Component);Object(a.render)(Object(l.jsx)(F.a,{children:Object(l.jsx)(te,{})}),document.getElementById("root"))}},[[86,1,2]]]);
//# sourceMappingURL=main.4c72aa61.chunk.js.map