"use strict";(self.webpackChunksixsigma=self.webpackChunksixsigma||[]).push([[516],{5948:(e,t,n)=>{n.d(t,{c:()=>R});var r,o,i,c=n(6692),s=n(2262),a=n(6838),l=n(5592),d=n(9584),m=n(3424),g=n(9984),u=n(8680),h=n(7884);const p=s.cp.div(r||(r=(0,c.c)(["\n  display: inline-flex;\n  align-items: center;\n  margin-left:0.5rem;\n"]))),x=(0,s.cp)(u.c7Q)(o||(o=(0,c.c)(["\n  color: ",";\n  cursor: pointer;\n  font-size: ","; /* \ubcc4 \ud06c\uae30 \uc124\uc815 */\n"])),(e=>{let{active:t}=e;return t?"#90C8AC":"#ccc"}),(e=>{let{size:t}=e;return t||"24px"})),b=(0,s.cp)(u.ozM)(i||(i=(0,c.c)(["\n  color: ",";\n  cursor: pointer;\n  font-size: ","; /* \ubcc4 \ud06c\uae30 \uc124\uc815 */\n"])),(e=>{let{active:t}=e;return t?"#90C8AC":"#ccc"}),(e=>{let{size:t}=e;return t||"24px"})),w=e=>{let{rating:t,setRating:n,size:r}=e;const[o,i]=(0,d.useState)(0),c=()=>{i(0)};return(0,h.jsx)(p,{children:[1,2,3,4,5].map((e=>{const s=e<=(o||t),a=(o||t)-e===-.5;return(0,h.jsx)("span",{onMouseEnter:()=>(e=>{i(e)})(e),onMouseLeave:c,onClick:()=>(e=>{n(e)})(e),children:a?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(b,{active:s,size:r}),(0,h.jsx)(x,{size:r,style:{position:"absolute",left:"0"}})]}):(0,h.jsx)(x,{active:s,size:r})},e)}))})};var f,v,y,j,C=n(9792),N=n(9184),k=n(6556);const z=s.cp.div(f||(f=(0,c.c)(["\n    background-color:white;\n    font-size:1em;\n    font-weight:600;\n    border-radius:0.8rem;\n"]))),S=s.cp.div(v||(v=(0,c.c)(["\n    display:flex;\n    flex-direction:row;\n    justify-content: space-between;\n    align-items:center;\n"]))),E=s.cp.div(y||(y=(0,c.c)(["\n    font-weight: 500;\n    margin-top:1rem;\n    & input {\n        width: ",";\n        border: 0.1rem solid lightgray;\n        padding: 1rem;\n        box-sizing: border-box;\n        border-radius: 1rem;\n    }\n    & textarea {\n        width: ",";\n        border: 0.1rem solid lightgray; \n        padding: 1rem;\n        box-sizing: border-box;\n        border-radius: 1rem;\n        height: 30rem;\n    }\n"])),(e=>e.width?e.width:"100%"),(e=>e.width?e.width:"100%")),D=(0,s.cp)(l.oc3)(j||(j=(0,c.c)(["\n    color: var(--color-textgrey);\n    margin-bottom: 1rem;\n    cursor: pointer;\n"]))),M="http://mam675.synology.me:49575",R=e=>{let{rating:t,content:n,reviewNo:r,isEdit:o}=e;const{farmNo:i}=(0,m.W4)(),{memberNo:c}=(0,m.W4)(),[s,l]=(0,d.useState)(n||""),[u,p]=(0,d.useState)(t||""),x=(0,m.i6)(),[b,f]=(0,d.useState)(),[v,y]=(0,d.useState)(null),{memberMoveToRead:j}=(0,k.c)();(0,d.useEffect)((()=>{o&&t&&n&&(p(t),l(n))}),[o,t,n]);const R=(0,d.useCallback)((e=>{p(e)}),[]),W=(0,d.useCallback)((e=>{l(e.target.value)}),[]);(0,d.useEffect)((()=>{(0,N.Qh)().then((e=>{f(e),console.log(e),console.log("\uba64\ubc84\ub370\uc774\ud130 ",JSON.stringify(e.memberNo))})).catch((e=>{console.log("\ub370\uc774\ud130 \uc548\uc634!!!!!!"),console.error(e)}))}),[]);return(0,h.jsxs)(z,{children:[(0,h.jsx)(D,{onClick:()=>{x(-1)},size:"20"}),(0,h.jsxs)(S,{children:[(0,h.jsx)(g.c,{name:"\ub9ac\ubdf0\ud558\uae30"}),(0,h.jsx)("button",{onClick:()=>{const e=o?"".concat(M,"/review/edit/").concat(r):"".concat(M,"/review/regist"),t=o?"put":"post";(0,a.c)({method:t,url:e,data:{reviewContent:s,rating:u,createdDate:(new Date).toISOString(),isDeleted:!1,memberNo:b.memberNo,farmNo:i}}).then((e=>{y(o?{message:"\ub9ac\ubdf0\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",type:"success"}:{message:"\ub9ac\ubdf0\uac00 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",type:"success"})})).catch((e=>{console.error("Error occured while registering the review:",e),y({message:"\ub9ac\ubdf0 \ub4f1\ub85d \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.",type:"error"})}))},className:"block rounded-md bg-[#80BCBD] text-white text-lg py-1.5 px-3",children:o?"\uc218\uc815":"\ub4f1\ub85d"})]}),(0,h.jsx)(w,{rating:u,setRating:R}),(0,h.jsx)(E,{children:(0,h.jsx)("textarea",{value:s,onChange:W,placeholder:"\ub0b4\uc6a9\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694"})}),v&&(0,h.jsx)(C.c,{title:"",content:v.message,callbackFnc:()=>{y(null),j(i)}})]})}},2516:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r,o=n(6692),i=n(2262),c=n(6838),s=n(3424),a=n(9584),l=n(5948),d=n(7884);const m=i.cp.div(r||(r=(0,o.c)(["\n    background-color:white;\n    border-radius:0.6rem;\n    margin:1.5rem;\n"]))),g=()=>{const{reviewNo:e,memberNo:t,farmNo:n}=(0,s.W4)(),[r,o]=(0,a.useState)(null);return(0,a.useEffect)((()=>{(async()=>{try{const t=await c.c.get("".concat("http://mam675.synology.me:49575","/review/").concat(e),{withCredentials:!0});o(t.data)}catch(t){console.error("Error fetching inquiry detail:",t)}})()}),[e]),(0,d.jsx)(m,{children:r&&(0,d.jsx)(l.c,{content:r.reviewContent,rating:r.rating,reviewNo:e,isEdit:!0,memberNo:t,farmNo:n})})}}}]);