"use strict";(self.webpackChunksixsigma=self.webpackChunksixsigma||[]).push([[984],{9756:(e,r,s)=>{s.d(r,{c:()=>o});var a,t=s(6692),n=s(2262),i=s(7884);const c=n.cp.body(a||(a=(0,t.c)(["\n    color: black;\n    background-color: #ffffff;\n    font-size: 20px;\n    margin-top: 2rem;\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n    padding-bottom: 1rem;\n"])));function o(e){let{children:r}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(c,{children:r})})}},9976:(e,r,s)=>{s.d(r,{c:()=>x});s(8488);var a=s(9756),t=s(9184),n=s(9584),i=(s(64),s(6556)),c=s(7884);function o(e){let{serverData:r,movePage:s}=e;return(0,c.jsxs)("div",{className:"m-6 flex justify-center pt-3",children:[r.prev?(0,c.jsxs)("div",{className:"m-2 p-2 w-16 text-center  font-bold text-blue-400 cursor-pointer",onClick:()=>s({page:r.prevPage}),children:["\uc774\uc804"," "]}):(0,c.jsx)(c.Fragment,{}),r.pageNumList.map((e=>(0,c.jsx)("div",{className:"m-2 p-2 w-12  text-center rounded shadow-md text-white cursor-pointer ".concat(r.current===e?"bg-[#4F6F52]":"bg-[#80BCBD]"),onClick:()=>s({page:e}),children:e},e))),r.next?(0,c.jsx)("div",{className:"m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer",onClick:()=>s({page:r.nextPage}),children:"\ub2e4\uc74c"}):(0,c.jsx)(c.Fragment,{})]})}const m="".concat(t._K),l={dtoList:[],pageNumList:[],pageRequestDTO:null,prev:!1,next:!1,totoalCount:0,prevPage:0,nextPage:0,totalPage:0,current:0},d={cropCategoryEntity:{cropCateNo:0,cropCateName:""},cropContent:"",cropDictNo:0,cropName:"",effect:"",spring:0,summer:0,fall:0,winter:0,level:0,summary:"",term:0,tip:"",nutrient:"",lowTemp:0,highTemp:0};function x(e){let{numberOfItems:r}=e;const{page:s,size:x,moveToList:f,moveToRead:g,memberMoveToRead:h}=(0,i.c)(),[p,u]=(0,n.useState)({}),[j,N]=(0,n.useState)({...d}),[v,y]=(0,n.useState)(l),[w,b]=(0,n.useState)(!1),[C,E]=(0,n.useState)(null);(0,n.useEffect)((()=>{console.log("http://mam675.synology.me:49575"),(0,t.Qh)().then((e=>{E(e),console.log("memberdata",e),console.log("\uba64\ubc84\ub370\uc774\ud130 ",JSON.stringify(C))})).catch((e=>{console.log("\ub370\uc774\ud130 \uc548\uc634!!!!!!"),console.error(e)}))}),[]),(0,n.useEffect)((()=>{P()}),[s,w]);const P=async()=>{const e=await(0,t.eS)({page:s,size:x,sortByReview:w});S(e.dtoList),y(e)};(0,n.useEffect)((()=>{v.dtoList.length>0&&(async()=>{const e={},r=v.dtoList.map((e=>(0,t.wx)(e.farmNo).then((r=>({farmNo:e.farmNo,imagePath:r}))).catch((r=>({farmNo:e.farmNo,images:[]})))));(await Promise.all(r)).forEach((r=>{e[r.farmNo]=r.imagePath})),u(e)})()}),[v]);(0,n.useEffect)((()=>{v.dtoList.length>0&&(async()=>{const e={},r=v.dtoList.map((e=>(0,t.OC)(e.farmNo).then((r=>({farmNo:e.farmNo,farmCropData:r.getResult}))).catch((r=>({farmNo:e.farmNo,farmCropData:{}})))));(await Promise.all(r)).forEach((r=>{e[r.farmNo]=r.farmCropData})),N(e)})()}),[v]),(0,n.useEffect)((()=>{console.log(JSON.stringify(j)),console.log(JSON.stringify(p))}));const S=e=>{w?e.sort(((e,r)=>r.reviewCnt-e.reviewCnt)):e.sort(((e,r)=>e.farmNo-r.farmNo))},k=v.dtoList.slice(0,r);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(a.c,{children:[(0,c.jsx)("div",{className:"flex justify-end text-[1rem] text-[#4F6F52]",children:(0,c.jsx)("div",{children:(0,c.jsxs)("select",{onChange:e=>{return r=e.target.value,void b("review"===r);var r},children:[(0,c.jsx)("option",{value:"default",children:"\uae30\ubcf8\uc21c"}),(0,c.jsx)("option",{value:"review",children:"\ub9ac\ubdf0 \ub9ce\uc740 \uc21c"})]})})}),(0,c.jsx)("div",{children:k.map(((e,r)=>(0,c.jsx)("div",{className:"",children:(0,c.jsxs)("div",{className:"shadow-xl h-28   mt-2 mb-1 rounded-2xl flex cursor-pointer justify-between",onClick:()=>{return r=e.farmNo,void("FARMER"===C.role?g(r):h(r));var r},children:[(0,c.jsxs)("div",{className:"mt-auto mb-auto ml-6 ",children:[(0,c.jsx)("div",{className:"text-[1.1rem] font-semibold mt-1",children:e.farmName}),j&&j[e.farmNo]&&j[e.farmNo].cropCategoryEntity&&(0,c.jsxs)("p",{className:"text-xs mb-[2px]",children:[j[e.farmNo].cropCategoryEntity.cropCateName," ","\uc804\ubb38 \ub18d\uc7a5"]}),(0,c.jsxs)("div",{className:"flex text-[0.79rem] mb-1",children:[(0,c.jsxs)("div",{className:"text-[0.79rem] font-semibold flex justify-center items-center",children:[(0,c.jsx)("img",{src:"/img/star.png",alt:"",className:"mr-1 w-4 h-4"}),(0,c.jsx)("span",{children:e.farmRating.toFixed(1)}),(0,c.jsxs)("span",{className:"text-[0.7rem] ml-1",children:["(",e.reviewCnt,")"]})]}),(0,c.jsx)("div",{children:(0,c.jsxs)("span",{className:"ml-1",children:["| \uacbd\ub825 ",e.farmCareer,"\ub144"]})}),(0,c.jsx)("div",{children:(0,c.jsxs)("span",{className:"ml-1",children:["|"," ",e.farmAddress.replace(/ .*/,"")]})})]}),(0,c.jsx)("p",{className:"text-xs text-gray-500",children:e.farmContent})]}),(0,c.jsx)("div",{className:" rounded-2xl w-20 h-20 flex justify-center items-center mr-3",children:p&&p[e.farmNo]&&(0,c.jsx)("img",{src:"".concat(m,"/").concat(p[e.farmNo][0]),alt:"image ".concat(0),className:"h-full rounded-2xl shadow-xl mt-[2rem] "},0)})]})},e.farmNo)))})]}),(0,c.jsx)(o,{serverData:v,movePage:f})]})}},6484:(e,r,s)=>{s.r(r),s.d(r,{default:()=>l});var a=s(8488),t=s(9756),n=(s(9584),s(924)),i=(s(5536),s(736),s(5648)),c=s(7884);function o(){return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(n.wx,{effect:"coverflow",grabCursor:!0,autoplay:{delay:2500,disableOnInteraction:!1},centeredSlides:!0,slidesPerView:"auto",coverflowEffect:{rotate:50,stretch:0,depth:70,modifier:1,slideShadows:!0},pagination:{clickable:!0},navigation:!0,modules:[i.Ko,i._2,i.sB,i.eM],className:"mySwiper",children:[(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage6.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage1.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage2.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage3.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage7.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage8.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage9.png",alt:""})}),(0,c.jsx)(n.Ky,{children:(0,c.jsx)("img",{src:"/img/farmImage10.png",alt:""})})]})})}s(64);var m=s(9976);const l=()=>(0,c.jsxs)("div",{className:"main",children:[(0,c.jsx)(a.c,{children:(0,c.jsx)(o,{})}),(0,c.jsxs)(t.c,{children:[(0,c.jsx)("div",{children:"\ub9ac\ubdf0 \ub9ce\uc740 Top3"}),(0,c.jsxs)("div",{className:"shadow-2xl h-[30rem] mt-2 overflow-hidden rounded-2xl hide-scrollbar",children:[" ",(0,c.jsx)(m.c,{numberOfItems:3})]})]})]})}}]);