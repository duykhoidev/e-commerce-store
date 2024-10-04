import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { getProductsById } from "../fetcher";
import { formatNumber } from "../utils";

const ProductDetail = () => {
  /* 
  const [product, setProduct] = useState({
    errorMessage: "",
    data: [],
  });
  
  => Destructure
  const [{title, image, specs, features, price, stock}, setProduct] = useState({
    errorMessage: "",
    data: [],
  });
 */

  /* Not get data as an array (data: []) 
  => As we don't get an array for products 
  => we use it as single json object (data: {}) */

  const [product, setProduct] = useState({
    errorMessage: "",
    data: {},
  });

  /* 
  const params = useParams();
  const responseObject = await getProductsById(params.productId);

  => Destructure
  const {productId} = useParams();
  const responseObject = await getProductsById(productId);
 */

  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsById(productId);
      setProduct(responseObject);
    };
    fetchData();
  }, [productId]);

  const createMarkup = () => {
    return {
      __html: product.data?.description,
    };
  };

  const { addProduct } = useContext(CartContext);

  return (
    // params.productId because in index.js we call as products/:productId
    <ProductInfoArticle>
      <ProductTitle>{product.data.title}</ProductTitle>

      <figure>
        <ProductImageContainer>
          <ProductImage
            src={`/assets/${product.data.image}`}
            alt={product.data.title}
          />
        </ProductImageContainer>
      </figure>

      <aside>
        <ProductInfo>
          <ProductInfoHeader>Dimensions</ProductInfoHeader>
          <label>{product.data.specs?.dimensions}</label>
        </ProductInfo>

        {product.data.specs?.capacity && (
          <ProductInfo>
            <ProductInfoHeader>Capacity</ProductInfoHeader>
            <label>{product.data.specs?.capacity}</label>
          </ProductInfo>
        )}

        <ProductInfo>
          <ProductInfoHeader>Features</ProductInfoHeader>
          <ul>
            {/* custom key by using feature${index} */}
            {product.data.features?.map((f, index) => {
              return (
                <ProductInfoListItem key={`feature${index}`}>
                  {f}
                </ProductInfoListItem>
              );
            })}
          </ul>
        </ProductInfo>
      </aside>

      <aside>
        {/* 
        <ProductInfoFinancePrice> &pound;{product.data.price} </ProductInfoFinancePrice> 
        we should change it as:
        <ProductInfoFinancePrice> {formatNumber(product.data.price)} </ProductInfoFinancePrice> 
        */}
        <ProductInfoFinancePrice>
          {formatNumber(product.data.price)}
        </ProductInfoFinancePrice>

        <ProductInfoStock>
          <ProductInfoStockLabel>
            Stock Level: {product.data.stock}
          </ProductInfoStockLabel>
          <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
        </ProductInfoStock>

        <ProductInfoAction>
          <ProductInfoActionButton
            onClick={() =>
              addProduct({
                id: product.data.id,
                title: product.data.title,
                price: product.data.price,
              })
            }
          >
            Add to Basket
          </ProductInfoActionButton>
        </ProductInfoAction>
      </aside>

      <ProductInfoDescription dangerouslySetInnerHTML={createMarkup()} />
    </ProductInfoArticle>
  );
};

export default ProductDetail;

const ProductInfoArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  column-gap: 20px;
`;

const ProductInfoDescription = styled.div`
  grid-column: 1 / span 3;
`;

const ProductTitle = styled.div`
  grid-column: 1 / span 3;
  color: darkslategray;
  font-weight: bold;
  font-size: 1.5em;
  padding-left: 10px;
`;

const ProductImageContainer = styled.div`
  padding: 10px;
  width: 60%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
  color: darkslategray;
  font-size: 1em;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
  padding-top: 5px;
`;

const ProductInfoStock = styled.div`
  padding-left: 10px;
  margin-top: 20px;
  padding-top: 10px;
  background-color: lightgrey;
  height: 20%;
  width: 30%;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;

const ProductInfoStockLabel = styled.label`
  padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
  width: 160px;
  height: 30px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: lightgray;
  border: solid 1px slategrey;
  font-weight: bold;
`;

const ProductInfoFinancePrice = styled.div`
  color: darkslategray;
  font-size: 2em;
  font-weight: bold;
  padding-top: 10px;
`;