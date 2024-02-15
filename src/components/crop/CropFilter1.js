// import React,{useState} from 'react';
// import 

// const CATEGORIES=[
//     {
//         id:1,
//         name:"작물분류",
//         subcategories:[
//             {subcategoryId:1, name:"가지과"},
//             {subcategoryId:2, name:"국화과"},
//             {subcategoryId:3, name:"꿀풀과"},
//             {subcategoryId:4, name:"명아주과"},
//             {subcategoryId:5, name:"미나리과"},
//             {subcategoryId:6, name:"민트과"},
//             {subcategoryId:7, name:"박과"},
//             {subcategoryId:8, name:"배추과"},
//             {subcategoryId:9, name:"백합과"},
//             {subcategoryId:10, name:"오이과"},
//             {subcategoryId:11, name:"콩과"},
//         ]
//     },
//     {
//         id:2,
//         name:"시기별",
//         subcategories:[
//             {subcategoryId:1, name:"봄"},
//             {subcategoryId:2, name:"여름"},
//             {subcategoryId:3, name:"가을"},
//             {subcategoryId:4, name:"겨울"},
//         ]
//     },
//     {
//         id:3,
//         name:"난이도별",
//         subcategories:[
//             {subcategoryId:1, name:"Level1"},
//             {subcategoryId:2, name:"Level2"},
//             {subcategoryId:3, name:"Level3"},
//         ]
//     },
// ]
// const subcategories = CATEGORIES.find(
//     category => category.id === currentCate
// ).subcategories;

// <S.CategoryBox
//       onMouseLeave={closeCategory}
//       categoryAnimation={categoryAnimation}
//     >
//       <S.Cates>
//         {CATEGORIES.map(city => {
//           return (
//             <S.Category
//               key={city.id}
//               onMouseEnter={() => setCurrentCate(cate.id)}
//               color={currentCate === cate.id ? "#F7323F" : "black"}
//             >
//               <span>{cate.name}</span>
//               {currentCate === cate.id && (
//                 <span>
//                   <HiOutlineChevronRight />
//                 </span>
//               )}
//             </S.Category>
//           );
//         })}
//       </S.Cates>
//       <S.SubCategories>
//         {subCategories.map(subCategory => {
//           return (
//             <S.Category
//               key={subCategory.subCategoryId}
//               color={
//                 parseInt(params.id) === subCategory.subCategoryId
//                   ? "#F7323F"
//                   : "black"
//               }
//               onClick={() => moveToCategory(subCategory.subCategoryId)}
//             >
//               {subCategory.name}
//             </S.Category>
//           );
//         })}
//       </S.SubCategories>
//     </S.CategoryBox>

// const CropFilter1=()=>{
//     return (
//         <>
        
//         </>
//     );
// };
// export default CropFilter1;