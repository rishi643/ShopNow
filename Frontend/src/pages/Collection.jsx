import React, { useState, useEffect } from "react";
import { useShop } from "../Context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

export default function Collection() {
   const { products, Search, ShowSearch } = useShop();
   const [isFilter, setIsFilter] = useState(false);
   const [mens, setmen] = useState(false);
   const [womens, setwomen] = useState(false);
   const [kids, setkids] = useState(false);
   const [filteredproducts, setfilteredproducts] = useState([]);
   const [selectValue, setselectValue] = useState();
   const [top, setTop] = useState(false);
   const [bottom, setBottom] = useState(false);


   const toggleFilter = () => setIsFilter(prev => !prev);
   const toggleMan = () => setmen(prev => !prev);
   const toggleWoman = () => setwomen(prev => !prev);
   const toggleKids = () => setkids(prev => !prev);
   const toggleTop = () => setTop(prev => !prev);
   const toggleBottom = () => setBottom(prev => !prev);


   useEffect(() => {
      const result = products.filter(item => { return item.name.toUpperCase().includes(Search.toUpperCase()) });
      setfilteredproducts(result);
   }, [Search]);



   useEffect(() => {

      //Filtering Products

      let result;

      if (mens || womens || kids) {

         result = products.filter(item => {
            return (mens && item.category === "Man") || (womens && item.category === "Woman") || (kids && item.category === "Kids");
         });

         if (top || bottom) {
            result = result.filter(item => { return (top && item.subCategory == "TopWear") || (bottom && item.subCategory == "BottomWear") })
         }
      } else if (top || bottom) {
         result = products.filter(item => {
            return top && item.subCategory === "TopWear" || bottom && item.subCategory === "BottomWear";
         });

      } else {
         result = products;
      }


      //Low High Sorting


      switch (selectValue) {
         case "low-high":
            result = [...result].sort((a, b) => { return a.price - b.price });
            break;
         case "high-low":
            result = [...result].sort((a, b) => { return b.price - a.price });
            break;
         default:
            break;
      }



      setfilteredproducts(result);

   }, [mens, womens, kids, products, top, bottom, selectValue]);


   return (
      <div className="md:grid grid-cols-[250px_1fr] gap-6 p-7">

         {/* LEFT: FILTER */}
         <div>
            <div className="text-xl md:text-2xl font-medium flex items-center gap-2">
               Filter
               <button
                  onClick={toggleFilter}
                  className="md:hidden bg-black text-white px-2 py-1 rounded"
               >
                  {isFilter ? "Close" : "Open"}
               </button>
            </div>

            <div className={`${isFilter ? "block" : "hidden"} md:block mt-4`}>
               <div className="border p-5 w-full">
                  <h2 className="font-semibold mb-2">Category</h2>
                  <div className="flex flex-col gap-1">
                     <label><input type="checkbox" onChange={toggleMan} /> Mens</label>
                     <label><input type="checkbox" onChange={toggleWoman} /> Womens</label>
                     <label><input type="checkbox" onChange={toggleKids} /> Kids</label>
                  </div>
               </div>

               <div className="border mt-6 p-5 w-full">
                  <h2 className="font-semibold mb-2">Type</h2>
                  <div className="flex flex-col gap-1">
                     <label><input type="checkbox" onChange={toggleTop} /> Top Wear</label>
                     <label><input type="checkbox" onChange={toggleBottom} /> Bottom Wear</label>
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT: CONTENT */}
         <div>

            {/* HEADER ROW */}
            <div className="flex items-center justify-between mb-5">
               <Title text1="All" text2="Collections" />

               <select onChange={(e) => setselectValue(e.target.value)} className="w-40 h-10 border px-2">
                  <option value="relevant">Relevant</option>
                  <option value="low-high">Low → High</option>
                  <option value="high-low">High → Low</option>
               </select>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5  gap-4">
               {filteredproducts?.map(item => (
                  <ProductItem
                     key={item._id}
                     id={item._id}
                     image={item.image[0]}
                     name={item.name}
                     price={item.price}
                  />
               ))}
            </div>

         </div>
      </div>
   );
}