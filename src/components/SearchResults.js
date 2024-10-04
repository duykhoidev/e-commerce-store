import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";
import CategoryProduct from "./CategoryProduct";

const SearchResults = () => {
  const [products, setProducts] = useState({
    errorMessage: "",
    data: [],
  });

  /* It waits until the user has finished pressing a key, and once that happens, 
  after a certain period of time, we can then make the call to the API. */
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s");

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByQuery(query);
      setProducts(responseObject);
    };
    fetchData();
  }, [query]);

  const renderProducts = () => {
    if (products.data.length > 0) {
      return products.data.map((p) => (
        <CategoryProduct key={p.id} {...p}>
          {p.title}
        </CategoryProduct>
      ));
    } else {
      return <div>No results found</div>;
    }
  };

  return (
    <div>
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      {renderProducts()}
    </div>
  );
};

export default SearchResults;
