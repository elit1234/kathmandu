import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import styles from "~/styles/Category/Root.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

const Category = () => {
  return (
    <div className="container">
      <div className="windowTitle">Down & Insulated</div>
      <div className="productsAmount">49 Products</div>
      <div className="filterContainer">
        <div className="filterButton">F</div>
        <div className="filterOptions">
          <div className="filterOption">Sort By</div>
          <div className="filterOption">Sort By</div>
          <div className="filterOption">Sort By</div>
          <div className="filterOption">Sort By</div>
          <div className="filterOption">Sort By</div>
          <div className="filterOption">Sort By</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Category;
