import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { productContext } from "../utils/Context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading1 from "./Loading1";
import { useLocation } from "react-router-dom";
import Arrow from "./Arrow";

function Details() {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [{ products, setProducts, setProductItem }] =
    useContext(productContext);
  const { id } = useParams();
  const { search } = useLocation();

  // console.log("search === ", search);

  useEffect(() => {
    let [{ ...item }] = products.filter(
      (item, index) => String(item.id) === id
    );
    setProductItem(item);
    setItem(item);
  }, [id]);

  return item ? (
    <div className="w-[70%] flex justify-between items-center h-full  m-auto p-[10%]">
      <Arrow />
      <img
        className="object-contain w-[40%] h-[100%] 2xl:h-[70%]"
        src={`${item.image}`}
        alt=""
      />
      <div className="content w-[56%] mt-7 flex flex-col lg:gap-1 2xl:gap-3">
        <h1 className="text-3xl">{item.title}</h1>
        <h3 className="text-zinc-400">{item.category}</h3>
        <h2 className="text-red-400">$ {item.price}</h2>
        <p className="text-wrap leading-5 ">{item.description}</p>
        <div className="pt-6 flex gap-6">
          <Link
            to={`/edit/${id}`}
            className="py-2 px-5 mb-3 border border-blue-400 text-blue-400 rounded"
          >
            Edit
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              let check = confirm(
                "Are you sure you want to delete that product?"
              );
              if (check) {
                setProducts(
                  (prev) =>
                    prev.filter(
                      (productitem, index) => !(productitem.id === item.id)
                    ) /// problems
                );
                navigate("/"); // Programmatically navigate to "/"
              }
            }}
            className="py-2 px-5 mb-3 border border-red-400 text-red-400 rounded"
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Loading1 />
  );
}

export default Details;
