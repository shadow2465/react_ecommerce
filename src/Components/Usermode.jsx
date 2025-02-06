import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import ProductCard from "./ProductCard";
import { productContext } from "../utils/Context";
import Loading2 from "./Loading2";
import Loading1 from "./Loading1";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "../utils/axios";
var count = 0;
function Usermode() {
  const { catagoryName } = useParams();
  const [{ products, setItemname }] = useContext(productContext);
  const { search } = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    setItemname(search);
  }, [search]);

  const categoryName = decodeURIComponent(search.split("=")[1]);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${categoryName}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (categoryName !== "undefined") getProductCategory();
  }, [categoryName]);

  useEffect(() => {
    if (categoryName === "undefined") {
      setFilteredProducts(products);
    }
  }, [products, categoryName]);

  return (
    <>
      {(() => {
        // console.log("Products === ", products);
      })()}
      {filteredProducts ? (
        <>
          <Navigation />
          <main className="flex flex-col w-[85%] lg:w-[81.5%] 2xl:w-[85%] overflow-x-hidden overflow-y-auto">
            <div className="bg-slate-600 h-[6.7rem] flex justify-between items-center px-10 pr-12">
              <span className="text-4xl text-slate-400 font-mono font-semibold text-center">
                Shopify
              </span>
              <div className="scale-[2.3]  text-white">
                <div className=""></div>
                <i class="ri-shopping-cart-fill"></i>
              </div>
            </div>
            <div className=" w-full p-10 overflow-x-hidden overflow-y-auto flex flex-wrap pt-5 ">
              {filteredProducts &&
                filteredProducts.map((item, index) => (
                  <ProductCard key={index} item={item} index={index} />
                ))}
            </div>
          </main>
        </>
      ) : (
        <Loading1 />
      )}
    </>
  );
}

export default Usermode;
