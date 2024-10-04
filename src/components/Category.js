import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryProduct from "../components/CategoryProduct";
import { getProductsByCategoryId } from "../fetcher";

const Category = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState({
    errorMessage: "",
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByCategoryId(categoryId);
      setProducts(responseObject);
    };
    fetchData();
  }, [categoryId]);

  const renderProducts = () => {
    return products.data.map((p) => (
      <CategoryProduct
        key={p.id}
        {...p}

        /* id={p.id}
        title={p.title}
        image={p.image}
        specs={p.specs}
        features={p.features}
        price={p.price}
        stock={p.stock} */
      >
        {p.title}
      </CategoryProduct>
    ));
  };

  return (
    /* <div key={id} onClick={() => onCategoryClick(id)}>
      {title}
    </div> */
    <>
      {/* Refactoring Category by using React Router (Link) instead of 
          refreshing the entire page by using calling Category in main tag in App.js directly
       */}
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      {products.data && renderProducts()}
    </>
  );
};
export default Category;
