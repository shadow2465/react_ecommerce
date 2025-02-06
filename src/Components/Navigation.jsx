import React from "react";
import { useContext } from "react";
import { productContext } from "../utils/Context";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
function Navigation() {
  let count = -1;
  let location = useLocation();
  const { search } = useLocation();
  // console.log("search ===== ", Boolean(search));
  const [color] = useState([
    {
      border: "border-sky-400",
      bg: "bg-sky-400",
      bg_hover: "group-hover:bg-sky-400",
    },
    {
      border: "border-lime-500",
      bg: "bg-lime-500",
      bg_hover: "group-hover:bg-lime-500",
    },
    {
      border: "border-purple-500",
      bg: "bg-purple-500",
      bg_hover: "group-hover:bg-purple-500",
    },
    {
      border: "border-orange-500",
      bg: "bg-orange-500",
      bg_hover: "group-hover:bg-orange-500",
    },
  ]);

  const [{ products }] = useContext(productContext);

  let catagoryNameProduct = products.reduce(
    (accumulator, current) => [...accumulator, current.category],
    []
  );
  catagoryNameProduct = [...new Set(catagoryNameProduct)];

  return (
    <nav className="w-[15%] lg:w-[18.5%] 2xl:w-[15%]  h-full bg-zinc-200 flex flex-col items-center p-5 pt-[5%]">
      {Boolean(search) ? (
        <Link
          className="py-2 px-5 mb-5 border border-red-500 rounded fixed top-10"
          to="/"
        >
          <span className="px-9 text-red-500">HOME</span>
        </Link>
      ) : (
        ""
      )}

      <Link
        className="py-2 px-5 mb-3 border border-blue-500 text-blue-500 rounded"
        to="/form/create"
      >
        Add new product
      </Link>
      <hr className="w-[80%] mb-3"></hr>
      <h1 className="text-2xl w-[100%] mb-3 text-center text-[gray]">
        Catagory Filter
      </h1>
      <div className="w-full h-[.06px] 2xl:h-[0.8px] bg-stone-400 mb-3 rounded-full"></div>
      <ul className="w-[80%] ">
        {catagoryNameProduct ? (
          catagoryNameProduct.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={`/?category=${item}`}
                  className={() => {
                    const searchParams = new URLSearchParams(location.search);
                    var isActive = searchParams.get("category") === item;

                    return isActive
                      ? `group mb-3 flex items-center cursor-pointer text-blue-500 border-b
                           pb-1 `
                      : "group mb-3 flex items-center cursor-pointer hover:text-blue-500 pb-1";
                  }}
                >
                  {() => {
                    const searchParams = new URLSearchParams(location.search);
                    const isActive = searchParams.get("category") === item;
                    return (
                      <>
                        <div
                          className={`mr-2 w-[15px] h-[15px] rounded-full border-4 
                           ${(() => {
                             if (count + 1 === color.length) {
                               count = -1;
                             }
                             return color[++count].border;
                           })()} 
                           ${color[count].bg_hover} 
                          ${isActive ? `${color[count].bg} ` : ""} 
                          `}
                        ></div>
                        <span>{item}</span>
                      </>
                    );
                  }}
                </NavLink>
              </li>
            );
          })
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
