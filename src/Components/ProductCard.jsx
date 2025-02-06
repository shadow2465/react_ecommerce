import React from "react";
import { Link, useLocation } from "react-router-dom";

function ProductCard({ item, index }) {
  return (
    <Link
      to={`/details/${item.id}`}
      className="card m-3 p-3 border shadow rounded w-[22%] h-[37vh] 2xl:w-[18%] 2xl:h-[30vh] flex justify-center items-center flex-col "
    >
      <div
        className="w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 hover:scale-105 hover:z-20 transition-transform duration-1000"
        style={{
          backgroundImage: `url(
            ${item.image}
          )`,
        }}
      ></div>
      <h1 className="hover:text-blue-300 text-[0.8rem]">{item.title}</h1>
    </Link>
  );
}

export default ProductCard;
