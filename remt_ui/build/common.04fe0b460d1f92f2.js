"use strict";(self.webpackChunkremt_ui=self.webpackChunkremt_ui||[]).push([[592],{7732:(R,b,a)=>{a.d(b,{P:()=>E});var d=a(2529),e=a(4650),m=a(2289),v=a(3267),l=a(8252),p=a(9653),u=a(5233),x=a(5496),g=a(6895),T=a(7392),L=a(3683),f=a(4859),Z=a(6087);function _(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.displaySideNav())}),e.TgZ(1,"mat-icon"),e._uU(2,"menu"),e.qZA()()}}const C=function(t){return[t]};function N(t,o){if(1&t&&(e.TgZ(0,"span")(1,"a",13),e._uU(2),e.qZA()()),2&t){const n=o.$implicit;e.xp6(1),e.Q6J("routerLink",e.VKq(2,C,n)),e.xp6(1),e.hij(" ",n," ")}}function U(t,o){if(1&t&&(e.TgZ(0,"span",11),e.YNc(1,N,3,4,"span",12),e.qZA()),2&t){const n=o.$implicit;e.xp6(1),e.Q6J("ngForOf",n.permissions)}}function k(t,o){if(1&t&&(e.TgZ(0,"mat-nav-list"),e.YNc(1,U,2,1,"span",10),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngForOf",n.user$)}}const h=function(){return["/auth"]};function A(t,o){if(1&t&&(e.TgZ(0,"a",14),e._UZ(1,"i",15),e._uU(2),e.qZA()),2&t){const n=e.oxw();e.Q6J("routerLink",e.DdM(2,h)),e.xp6(2),e.hij(" ",n.logInUser.toLocaleUpperCase()," ")}}function Y(t,o){1&t&&(e.TgZ(0,"a",14),e._UZ(1,"i",16),e._uU(2,"Login "),e.qZA()),2&t&&e.Q6J("routerLink",e.DdM(1,h))}const y=function(){return["/auth/register"]};function O(t,o){1&t&&(e.TgZ(0,"a",17),e._UZ(1,"i",18),e._uU(2,"Register "),e.qZA()),2&t&&e.Q6J("routerLink",e.DdM(1,y))}const J=function(){return[""]};let H=(()=>{var t;class o{constructor(s,i,r){this.breakpointObserver=s,this.store=i,this.storageService=r,this.isAlive=!0,this.isSidenavExpand=!1,this.isLessThenLargeDevice=!0,this.sideNav=new e.vpe,this.breakpointObserver.observe(["(max-width: 1199px)"]).pipe((0,d.o)(()=>this.isAlive)).subscribe(({matches:c})=>{this.isLessThenLargeDevice=c,c||(this.isSidenavExpand=!1)}),this.store.pipe((0,p.Ys)(u.np)).subscribe({next:c=>this.user$=c}),this.store.pipe((0,p.Ys)(u.gi)).subscribe({next:c=>{this.route=c.slice(1),this.logInUser=r.getUserName(),this.user$=this.user$.filter(M=>M.userTypeName.toLowerCase()==this.route)}}),this.isLoading$=this.store.pipe((0,p.Ys)(u.VO))}displaySideNav(){this.sideNav.emit()}ngOnInit(){}}return(t=o).\u0275fac=function(s){return new(s||t)(e.Y36(m.Yg),e.Y36(p.yh),e.Y36(x.V))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-header"]],outputs:{sideNav:"sideNav"},decls:11,vars:8,consts:[[2,"background-color","black","color","rgb(250, 173, 71)"],["routerLinkActive","active",1,"mt-2",3,"routerLink"],["src","../favicon.ico","alt","","width","30px","height","35px",2,"color","rgb(250, 173, 71)"],["mat-icon-button","","class","example-icon",3,"click",4,"ngIf"],[4,"ngIf"],[1,"example-spacer"],[1,""],["mat-raised-button","","class","",3,"routerLink",4,"ngIf"],["mat-raised-button","","class","m-1",3,"routerLink",4,"ngIf"],["mat-icon-button","",1,"example-icon",3,"click"],["class","m-1",4,"ngFor","ngForOf"],[1,"m-1"],[4,"ngFor","ngForOf"],["mat-raised-button","","routerLinkActive","active",1,"m-1","align-content-center",3,"routerLink"],["mat-raised-button","",1,"",3,"routerLink"],[1,"fa","fa-user"],[1,"fa","fa-lock-open"],["mat-raised-button","",1,"m-1",3,"routerLink"],[1,"fa","fa-sign-in-alt"]],template:function(s,i){1&s&&(e.TgZ(0,"mat-toolbar",0)(1,"span",1),e._UZ(2,"img",2),e._uU(3),e.qZA(),e.YNc(4,_,3,0,"button",3),e.YNc(5,k,2,1,"mat-nav-list",4),e._UZ(6,"span",5),e.TgZ(7,"div",6),e.YNc(8,A,3,3,"a",7),e.YNc(9,Y,3,2,"a",7),e.YNc(10,O,3,2,"a",8),e.qZA()()),2&s&&(e.xp6(1),e.Q6J("routerLink",e.DdM(7,J)),e.xp6(2),e.hij("",i.route||"REMT"," "),e.xp6(1),e.Q6J("ngIf",i.isLessThenLargeDevice),e.xp6(1),e.Q6J("ngIf",!i.isLessThenLargeDevice),e.xp6(3),e.Q6J("ngIf",i.logInUser),e.xp6(1),e.Q6J("ngIf",!i.route),e.xp6(1),e.Q6J("ngIf","admin"==i.route||"lga"==i.route))},dependencies:[g.sg,g.O5,T.Hw,L.Ye,f.zs,f.RK,Z.Hk,l.rH,l.Od]}),o})();const Q=function(t){return[t]};function S(t,o){if(1&t&&(e.TgZ(0,"span")(1,"a",1),e._uU(2),e.qZA(),e._UZ(3,"br"),e.qZA()),2&t){const n=o.$implicit;e.xp6(1),e.Q6J("routerLink",e.VKq(2,Q,n)),e.xp6(1),e.hij(" ",n," ")}}function I(t,o){if(1&t&&(e.TgZ(0,"span"),e.YNc(1,S,4,4,"span",0),e.qZA()),2&t){const n=o.$implicit;e.xp6(1),e.Q6J("ngForOf",n.permissions)}}let F=(()=>{var t;class o{constructor(s,i){this.breakpointObserver=s,this.store=i,this.isAlive=!0,this.isSidenavExpand=!1,this.isLessThenLargeDevice=!0,this.breakpointObserver.observe(["(max-width: 1199px)"]).pipe((0,d.o)(()=>this.isAlive)).subscribe(({matches:r})=>{this.isLessThenLargeDevice=r,r||(this.isSidenavExpand=!1)}),this.store.pipe((0,p.Ys)(u.np)).subscribe({next:r=>this.user$=r}),this.store.pipe((0,p.Ys)(u.gi)).subscribe({next:r=>this.user$=this.user$.filter(c=>c.userTypeName.toLowerCase()==r.slice(1))}),this.isLoading$=this.store.pipe((0,p.Ys)(u.VO))}ngOnInit(){}}return(t=o).\u0275fac=function(s){return new(s||t)(e.Y36(m.Yg),e.Y36(p.yh))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-side-nav"]],decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["mat-raised-button","","routerLinkActive","active",1,"m-1","align-content-center",2,"background-color","rgb(250, 173, 71)","color","black",3,"routerLink"]],template:function(s,i){1&s&&e.YNc(0,I,2,1,"span",0),2&s&&e.Q6J("ngForOf",i.user$)},dependencies:[g.sg,f.zs,l.rH,l.Od]}),o})();var $=a(5227);const D=["sidenav"];let E=(()=>{var t;class o{constructor(s){this.breakpointObserver=s,this.isAlive=!0,this.isSidenavExpand=!1,this.isLessThenLargeDevice=!0,this.breakpointObserver.observe(["(max-width: 1199px)"]).pipe((0,d.o)(()=>this.isAlive)).subscribe(({matches:i})=>{this.isLessThenLargeDevice=i,i||(this.isSidenavExpand=!1)})}ngOnInit(){}toggleSidenav(){this.sidenav.toggle(),this.isSidenavExpand=this.sidenav.opened}}return(t=o).\u0275fac=function(s){return new(s||t)(e.Y36(m.Yg))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-userlayout"]],viewQuery:function(s,i){if(1&s&&e.Gf(D,5),2&s){let r;e.iGM(r=e.CRH())&&(i.sidenav=r.first)}},decls:10,vars:2,consts:[[3,"sideNav"],[1,""],[2,"background-color","rgb(250, 173, 71)",3,"mode","opened"],["sidenav",""],[2,"background-color","rgb(250, 173, 71)"]],template:function(s,i){1&s&&(e.TgZ(0,"div")(1,"app-header",0),e.NdJ("sideNav",function(){return i.toggleSidenav()}),e.qZA(),e.TgZ(2,"mat-sidenav-container",1)(3,"mat-sidenav",2,3),e._UZ(5,"app-side-nav"),e.qZA(),e.TgZ(6,"mat-sidenav-content",4)(7,"main"),e._UZ(8,"router-outlet"),e.qZA(),e._UZ(9,"app-footer"),e.qZA()()()),2&s&&(e.xp6(3),e.Q6J("mode","over")("opened",i.isSidenavExpand&&i.isLessThenLargeDevice))},dependencies:[v.JX,v.TM,v.Rh,l.lC,H,F,$.c]}),o})()}}]);