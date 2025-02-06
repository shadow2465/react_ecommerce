import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
function Arrow() {
  const navigation = useNavigate();
  const [{ itemName }] = useContext(productContext);
  return (
    <NavLink
      onClick={(e) => {
        e.preventDefault();
        navigation(-1);
      }}
      // to={`/${itemName}`}
      className="absolute top-20 left-32 2xl:left-56 z-10 rounded-full bg-stone-600 border-2 border-stone-300 w-14 h-14 flex items-center justify-center cursor-pointer"
    >
      <i class="ri-arrow-left-line scale-[1.5] text-white"></i>
    </NavLink>
  );
}

export default Arrow;
