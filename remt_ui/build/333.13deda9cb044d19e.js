"use strict";(self.webpackChunkremt_ui=self.webpackChunkremt_ui||[]).push([[333],{7842:(q,g,s)=>{s.d(g,{z:()=>m});var e=s(4650);let m=(()=>{var i;class p{transform(n){const[Z,U]=n.split("/"),h=new Date(Z).getTime(),A=new Date(U).getTime();if(A<Date.now())return"Done";const d=(A-h)/864e5;if(d%30==0)return Math.floor(d/30).toString();const l=d%30;return Math.floor(d/30).toString()+" and "+l+(l>1?" days":" day")}}return(i=p).\u0275fac=function(n){return new(n||i)},i.\u0275pipe=e.Yjl({name:"monthsDiff",type:i,pure:!0}),p})()},9997:(q,g,s)=>{s.d(g,{_:()=>m});var e=s(4650);let m=(()=>{var i;class p{transform(n){if("number"==typeof n||null==n)return n;const Z=(new Date).getTime()-new Date(n).getTime();return Math.round(Z/31536e6)}}return(i=p).\u0275fac=function(n){return new(n||i)},i.\u0275pipe=e.Yjl({name:"userAge",type:i,pure:!0}),p})()},5266:(q,g,s)=>{s.d(g,{d:()=>A});var e=s(4650),m=s(1213),i=s(5496),p=s(6895),f=s(2673),n=s(5004),Z=s(9997),U=s(7842);function h(c,d){if(1&c&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.ALo(3,"date"),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.ALo(10,"monthsDiff"),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.ALo(13,"number"),e.qZA(),e.TgZ(14,"td"),e._uU(15),e.ALo(16,"number"),e.qZA()()),2&c){const l=d.$implicit;e.xp6(2),e.Oqu(e.lcZ(3,6,l.createdAt)),e.xp6(3),e.Oqu(l.rooms),e.xp6(2),e.Oqu(l.rent),e.xp6(2),e.Oqu(e.lcZ(10,8,l.start+"/"+l.end)),e.xp6(3),e.Oqu(e.lcZ(13,10,l.rentTotal)),e.xp6(3),e.Oqu(e.lcZ(16,12,l.netTotal))}}let A=(()=>{var c;class d{constructor(v,o){this.userEntityService=v,this.storageService=o,this.invoices=[],this.subscription=this.userEntityService.entities$.pipe().subscribe({next:b=>{this.user=b.find(_=>_._id===this.storageService.getId()),this.invoices="landlord"==this.user?.userTypeName?this.user?.invoices:this.user?.invoices?.filter(_=>_.tenantId===this.user?._id),this.invoices=this.invoices?.reduce((_,I)=>_.includes(_[_.findIndex(E=>E.invoiceId==I.invoiceId)])?_:[..._,I],[])}})}ngOnDestroy(){console.log("ngOnDestroy"),this.subscription.unsubscribe()}}return(c=d).\u0275fac=function(v){return new(v||c)(e.Y36(m.W),e.Y36(i.V))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-profile"]],decls:89,vars:22,consts:[[1,"container-fluid","m-0","h-100","w-100"],[1,"row","m-2"],[1,"card","col-sm-6","flex-row",2,"background-color","rgb(112, 111, 111)"],["src","../../../assets//imgs//img7.jpg","width","75px","height","75px","alt",""],[1,"card","col-sm-6"],[1,"card","col-12"],[1,"mx-2"],[1,"card","m-0","p-0"],[1,"card-header","d-flex","justify-content-between"],["matBadgeOverlap","false","matBadgeColor","accent","matBadgeSize","small",3,"matBadge"],[1,"card-body"],[1,"table-responsive"],[1,"table","table-bordered","border-dark"],["scope","col"],[1,"table-group-divider"],[4,"ngFor","ngForOf"],["type","button",1,"mx-2"],[1,"card-body","row"],[1,"col-sm-6"]],template:function(v,o){1&v&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div"),e._UZ(4,"img",3),e.qZA(),e._uU(5,"\xa0\xa0\xa0 "),e.TgZ(6,"div")(7,"h5")(8,"b"),e._uU(9,"Name: "),e.qZA(),e._uU(10),e.ALo(11,"formatNames"),e.qZA(),e.TgZ(12,"p")(13,"b"),e._uU(14,"Tel: "),e.qZA(),e._uU(15),e.qZA()()(),e.TgZ(16,"div",4)(17,"p")(18,"b"),e._uU(19,"Member Since: "),e.qZA(),e._uU(20),e.ALo(21,"date"),e.qZA(),e.TgZ(22,"p")(23,"b"),e._uU(24,"User Type: "),e.qZA(),e._uU(25),e.qZA()(),e.TgZ(26,"div",5)(27,"h6",6),e._uU(28),e.ALo(29,"formatNames"),e.qZA(),e.TgZ(30,"p"),e._uU(31),e.qZA()()(),e.TgZ(32,"div",1)(33,"div",7)(34,"div",8)(35,"h6",9),e._uU(36),e.qZA()(),e.TgZ(37,"div",10)(38,"div",11)(39,"table",12)(40,"thead")(41,"tr")(42,"th",13),e._uU(43,"Issued"),e.qZA(),e.TgZ(44,"th",13),e._uU(45,"Rooms"),e.qZA(),e.TgZ(46,"th",13),e._uU(47,"Rent"),e.qZA(),e.TgZ(48,"th",13),e._uU(49,"Duration "),e.TgZ(50,"small"),e._uU(51,"(months)"),e.qZA()(),e.TgZ(52,"th",13),e._uU(53,"Total"),e.qZA(),e.TgZ(54,"th",13),e._uU(55,"Net Total "),e.TgZ(56,"small"),e._uU(57,"[+ 7% tax]"),e.qZA()()()(),e.TgZ(58,"tbody",14),e.YNc(59,h,17,14,"tr",15),e.qZA()()()()()(),e.TgZ(60,"div",1)(61,"div",7)(62,"div",8)(63,"h6",6),e._uU(64,"Personal Information"),e.qZA(),e.TgZ(65,"button",16),e._uU(66,"edit"),e.qZA()(),e.TgZ(67,"div",17)(68,"p",18)(69,"b"),e._uU(70,"Name:"),e.qZA(),e._uU(71),e.qZA(),e.TgZ(72,"p",18)(73,"b"),e._uU(74,"Gender"),e.qZA(),e._uU(75),e.qZA(),e.TgZ(76,"p",18)(77,"b"),e._uU(78,"PhoneNumber: "),e.qZA(),e._uU(79),e.qZA(),e.TgZ(80,"p",18)(81,"b"),e._uU(82,"Age:"),e.qZA(),e._uU(83),e.ALo(84,"userAge"),e.qZA(),e.TgZ(85,"p",18)(86,"b"),e._uU(87,"Nation Id"),e.qZA(),e._uU(88),e.qZA()()()()()),2&v&&(e.xp6(10),e.Oqu(e.lcZ(11,14,null==o.user?null:o.user.userInfos.name)),e.xp6(5),e.Oqu(null==o.user?null:o.user.userInfos.phoneNumber),e.xp6(5),e.Oqu(e.lcZ(21,16,null==o.user?null:o.user.createdAt)),e.xp6(5),e.Oqu(null==o.user?null:o.user.userTypeName),e.xp6(3),e.hij("",e.lcZ(29,18,null==o.user?null:o.user.userTypeName)," Summary"),e.xp6(3),e.hij(" ",null==o.user||null==o.user.userInfos?null:o.user.userInfos.summary," "),e.xp6(4),e.Q6J("matBadge",null==o.invoices?null:o.invoices.length),e.xp6(1),e.hij("Invoices ","landlord"==(null==o.user?null:o.user.userTypeName)?"Created":"Received",""),e.xp6(23),e.Q6J("ngForOf",o.invoices),e.xp6(12),e.hij(" ",null==o.user||null==o.user.userInfos?null:o.user.userInfos.name,""),e.xp6(4),e.hij(" ",null==o.user||null==o.user.userInfos?null:o.user.userInfos.gender,""),e.xp6(4),e.hij(" ",null==o.user||null==o.user.userInfos?null:o.user.userInfos.phoneNumber,""),e.xp6(4),e.hij(" ",e.lcZ(84,20,null==o.user||null==o.user.userInfos?null:o.user.userInfos.age),""),e.xp6(5),e.hij(" ",null==o.user||null==o.user.userInfos?null:o.user.userInfos.nation_Id,""))},dependencies:[p.sg,f.k,p.JJ,p.uU,n.Q,Z._,U.z],styles:["img[_ngcontent-%COMP%]{border-radius:50%}"]}),d})()},6467:(q,g,s)=>{s.d(g,{k:()=>f});var e=s(1656),m=s(4650),i=s(529),p=s(5496);let f=(()=>{var n;class Z extends e.c8{constructor(h,A,c){super("House",h),this.http=A,this.storage=c}}return(n=Z).\u0275fac=function(h){return new(h||n)(m.LFG(e.yV),m.LFG(i.eN),m.LFG(p.V))},n.\u0275prov=m.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),Z})()},7333:(q,g,s)=>{s.r(g),s.d(g,{TenantModule:()=>D});var e=s(6895),m=s(4466),i=s(8252),p=s(7732),f=s(5266),n=s(4650);let Z=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-auto-payments"]],decls:2,vars:0,template:function(u,T){1&u&&(n.TgZ(0,"p"),n._uU(1,"auto-payments works!"),n.qZA())}}),a})(),U=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-invoices"]],decls:2,vars:0,template:function(u,T){1&u&&(n.TgZ(0,"p"),n._uU(1,"invoices works!"),n.qZA())}}),a})(),h=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-mng-rental-payments"]],decls:2,vars:0,template:function(u,T){1&u&&(n.TgZ(0,"p"),n._uU(1,"mng-rental-payments works!"),n.qZA())}}),a})(),A=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-rental-history"]],decls:2,vars:0,template:function(u,T){1&u&&(n.TgZ(0,"p"),n._uU(1,"rental-history works!"),n.qZA())}}),a})();var c=s(9841),d=s(6467),l=s(1213),v=s(5496),o=s(5004),b=s(9997);function _(t,a){if(1&t&&(n.TgZ(0,"div",4)(1,"div",5)(2,"h4",6),n._uU(3),n.ALo(4,"date"),n.ALo(5,"date"),n.qZA(),n.TgZ(6,"div",7)(7,"div",8)(8,"h6",9)(9,"b"),n._uU(10,"House Details"),n.qZA()(),n.TgZ(11,"blockquote",10)(12,"b"),n._uU(13,"Ward:"),n.qZA(),n._uU(14),n.qZA(),n.TgZ(15,"blockquote",10)(16,"b"),n._uU(17,"Street:"),n.qZA(),n._uU(18),n.qZA(),n.TgZ(19,"blockquote",10)(20,"b"),n._uU(21,"Rooms:"),n.qZA(),n._uU(22),n.qZA(),n.TgZ(23,"blockquote",10)(24,"b"),n._uU(25,"Tenants Records:"),n.qZA(),n._uU(26),n.qZA(),n.TgZ(27,"blockquote",11)(28,"b"),n._uU(29,"Description:"),n.qZA(),n._uU(30),n.qZA()(),n._UZ(31,"hr"),n.TgZ(32,"div",8)(33,"h6",9)(34,"b"),n._uU(35,"Owner Details"),n.qZA()(),n.TgZ(36,"blockquote",10)(37,"b"),n._uU(38,"Owner:"),n.qZA(),n._uU(39),n.ALo(40,"formatNames"),n.qZA(),n.TgZ(41,"blockquote",10)(42,"b"),n._uU(43,"Gender:"),n.qZA(),n._uU(44),n.qZA(),n.TgZ(45,"blockquote",10)(46,"b"),n._uU(47,"Age:"),n.qZA(),n._uU(48),n.ALo(49,"userAge"),n.qZA(),n.TgZ(50,"blockquote",10)(51,"b"),n._uU(52,"phoneNumber:"),n.qZA(),n._uU(53),n.qZA(),n.TgZ(54,"blockquote",11)(55,"b"),n._uU(56,"Summary:"),n.qZA(),n._uU(57),n.qZA()()()()()),2&t){const r=a.$implicit;n.xp6(3),n.AsE("",n.lcZ(4,12,r.from)," - ",n.lcZ(5,14,r.to)," "),n.xp6(11),n.hij(" ",r.ward,""),n.xp6(4),n.hij(" ",r.street," "),n.xp6(4),n.hij(" ",r.rooms," "),n.xp6(4),n.hij(" ",null==r.rental_history?null:r.rental_history.length," "),n.xp6(4),n.hij(" ",r.description," "),n.xp6(9),n.hij(" ",n.lcZ(40,16,r.owner_Id.userInfos.name)," "),n.xp6(5),n.hij(" ",r.owner_Id.userInfos.gender," "),n.xp6(4),n.hij(" ",n.lcZ(49,18,r.owner_Id.userInfos.age)," "),n.xp6(5),n.hij(" ",r.owner_Id.userInfos.phoneNumber," "),n.xp6(4),n.hij(" ",r.owner_Id.userInfos.summary," ")}}const E=[{path:"",component:p.P,children:[{path:"",component:(()=>{var t;class a{constructor(u,T,C){this.houseEntityService=u,this.userEntityService=T,this.storage=C,this.houses=[],this.groupedHouses=[],(0,c.a)([u.entities$,T.entities$]).subscribe({next:([L,R])=>{this.houses=L.filter(O=>O.rental_history?.find(y=>y.client==C.getId())),console.log(this.houses),this.groupedHouses=this.houses.reduce((O,y)=>{const j=y.rental_history?.filter(P=>P.client==this.storage.getId())?.map((P,N,H)=>{const B=P.from,w=P.to;return{...y,from:B,to:w,owner_Id:R.find(F=>F._id==y.owner_Id)}},[]);return[...O,...j]},[]),console.log(this.groupedHouses)}})}ngOnInit(){this.houseEntityService.getAll()}}return(t=a).\u0275fac=function(u){return new(u||t)(n.Y36(d.k),n.Y36(l.W),n.Y36(v.V))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-tenant-home"]],decls:4,vars:1,consts:[[1,"container-fluid"],[1,"row","pt-2","pb-2"],[1,"col-12"],["class","card",4,"ngFor","ngForOf"],[1,"card"],[1,"card-body","row","border-success"],[1,"card-title","col-sm-3","align-middle"],[1,"card","col-sm-9"],[1,"card-body","row"],[1,"text-center","text-decoration-underline"],[1,"col-sm-6"],[1,"col-sm-12"]],template:function(u,T){1&u&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2),n.YNc(3,_,58,20,"div",3),n.qZA()()()),2&u&&(n.xp6(3),n.Q6J("ngForOf",T.groupedHouses))},dependencies:[e.sg,e.uU,o.Q,b._]}),a})()},{path:"manage_rental_payments",component:h},{path:"profile",component:f.d},{path:"request_invoices",component:U},{path:"view_rental_history",component:A},{path:"set_up_auto_payments",component:Z}]}];let M=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[i.Bz.forChild(E),i.Bz]}),a})(),D=(()=>{var t;class a{}return(t=a).\u0275fac=function(u){return new(u||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[e.ez,M,m.m]}),a})()}}]);