import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CartIcon, HomeIcon } from "./Icons";
import Search from "./Search";

const Layout = ({ categories }) => {
  // const navigate = useNavigate();

  const renderCategories = () => {
    // Case 1: Using normal for each loop (Prefer)
    /* const categories = [];
        for (let i = 0; i < results.length; i++) {
          categories.push(
            <Category
              key={results[i].id}
              id={results[i].id}
              title={results[i].title}
            />
          );
        }
    
        return categories; */

    // Case 2: Using map method
    return categories.data.map((c) => (
      // Using React Router (Link) instead of refreshing the entire page
      <li key={c.id}>
        {/* <Link to={`/categories/${c.id}`}>{c.title}</Link> */}
        <Link to={`/categories/${c.id}`}>{c.title}</Link>
      </li>

      // Using the method of refreshing entire page
      // <Category
      //   key={c.id}
      //   id={c.id}
      //   title={c.title}
      //   onCategoryClick={() => handleCategoryClick(c.id)}
      // />
    ));
  };

  return (
    <>
      <header>
        <div id="headerHomeIcon">
          {/* <HomeIcon width={40} onClick={() => navigate("/")} /> */}
          <Link to="/">
            <HomeIcon width={40} />
          </Link>
        </div>
        <Search />
        <div id="headerTitle">Our Store</div>
        <div id="headerCartIcon">
          {/* <CartIcon width={40} onClick={() => navigate("/basket")} /> */}
          <Link to="/basket">
            <CartIcon width={40} />
          </Link>
        </div>
      </header>

      <section>
        <nav>
          {categories.errorMessage && (
            <div>Error: {categories.errorMessage}</div>
          )}
          <ul>{categories.data && renderCategories()}</ul>
        </nav>
        <main>
          {/* {products.errorMessage && <div>Error: {products.errorMessage}</div>}
          {products.data && renderProducts()} */}
          <Outlet />
        </main>
      </section>

      <footer>
        <Link to="/">Home</Link> | <Link to="/basket">Basket</Link>
      </footer>
    </>
  );
};

export default Layout;
