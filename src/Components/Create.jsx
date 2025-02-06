import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "../utils/Context";
import { nanoid } from "nanoid";
import Arrow from "./Arrow";
function Create() {
  let { formName, id: pid } = useParams();
  const [{ products, setProducts, productItem }] = useContext(productContext);

  const [id, setId] = useState(productItem.id);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    // Cleanup function to reset form values when the component unmounts not working
    if (formName === "create") {
      setId(null);
      setTitle(null);
      setImage(null);
      setCategory(null);
      setPrice(null);
      setDescription(null);
    } else {
      setTitle(productItem.title);
      setImage(productItem.image);
      setCategory(productItem.category);
      setPrice(productItem.price);
      setDescription(productItem.description);
    }
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    if (formName === "create") {
      if (
        title.trim().length < 1 ||
        image.trim().length < 8 ||
        category.trim().length < 1 ||
        price.trim().length < 1 ||
        description.trim().length < 1
      ) {
        alert("Each and every input must have to fill");
        return;
      } else {
        let check = confirm("Are you want to Create product ?");
        if (check) {
          alert("Product Created !");
          const product = {
            id: nanoid(),
            title,
            image,
            category,
            price,
            description,
          };
          setProducts((prev) => [...prev, product]);
          console.log(product);
          navigation("/");
        } else {
          alert("Product not Craeted");
          return;
        }
      }
    } else {
      if (
        !Boolean(title.trim().length >= 1) &&
        !Boolean(image.trim().length >= 1) &&
        !Boolean(category.trim().length >= 1) &&
        !Boolean(price.trim().length >= 1) &&
        !Boolean(description.trim().length >= 1)
      ) {
        alert("Please input data atleast in one field to update");
        return;
      } else {
        let check = confirm("Are you want to Update");

        let updatedProduct = {
          id,
          title,
          image,
          category,
          price,
          description,
        };
        // console.log("update products ==== ", updatedProduct);

        if (check) {
          setProducts((prev) => {
            let ans = prev.map((item, index) =>
              item.id === productItem.id ? { ...item, ...updatedProduct } : item
            );
            console.log("Ans === ", ans);
            return ans;
          });
          alert("Product Updated !");
          navigation(-1);
        } else {
          alert("Product update has been canceled !");
          return;
        }
      }
    }

    // toast.success("New Product Added!");
  };
  return (
    <>
      <Arrow />
      <form
        onSubmit={formSubmit}
        className="w-screen h-screen p-[5%] border flex flex-col items-center"
      >
        <label className="text-3xl w-1/2 mb-5">Add New Product</label>
        <input
          className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          type="url"
          placeholder="Image Link"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <input
          className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="w-1/2 flex justify-between">
          <input
            className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
            type="text"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <input
            className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          rows="10"
          value={description}
          placeholder="Enter Product description here"
        ></textarea>
        <div className="w-1/2 flex justify-between">
          {(() => {
            if (formName === "create") {
              return (
                <>
                  <button className="self-start py-2 px-5 mb-3 border border-blue-500 text-blue-500 rounded">
                    Add Product
                  </button>
                  <button
                    onClick={() => {
                      const check = confirm("Going back to home");
                      if (check) navigation("/");
                    }}
                    className=" self-start py-2 px-5 mb-3 border border-red-500 text-red-500 rounded"
                  >
                    HOME
                  </button>
                </>
              );
            } else {
              return (
                <>
                  <button className="self-start py-3 px-10 mb-3 border border-blue-500 text-blue-500 rounded mx-auto">
                    Update
                  </button>
                </>
              );
            }
          })()}
        </div>
      </form>
    </>
  );
}

export default Create;
