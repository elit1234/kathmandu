import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/utils/db";
import styles from "~/styles/Category/Root.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader: LoaderFunction = async ({ params }) => {
  const products = await db.products.findMany();
  products.map((prod) => {});
  return json({ items: products });
};

const Category = () => {
  const [clickedSwatches, setClickedSwatches] = useState({});
  const { items } = useLoaderData();
  const [products, setProducts] = useState<ProductType[] | null>();

  const sortables = [
    {
      label: "Size",
    },
    {
      label: "Price",
    },
    {
      label: "Best Use",
    },
    {
      label: "Customer Rating",
    },
    {
      label: "Gender",
    },
    {
      label: "Down Warmth Rating",
    },
    {
      label: "Down Packability",
    },
    {
      label: "Down Weight",
    },
    {
      label: "Collection",
    },
    {
      label: "Waterproof Rating",
    },
  ];

  useEffect(() => {
    if (items) {
      let arr: ProductType[] = [];
      items &&
        items.map((item: ProductType, key: number) => {
          arr.push({
            ...item,
            showingImage: item.images[0],
          });
        });
      setProducts(arr);
    }
  }, [items]);

  const clickedSwatch = (key: number, item: ProductType) => {
    if (products) {
      let arr: ProductType[] = [];
      products &&
        products.map((loopItem: ProductType) => {
          if (item.id === loopItem.id)
            arr.push({
              ...loopItem,
              showingImage: loopItem.images[key],
            });
          else
            arr.push({
              ...loopItem,
            });
        });
      console.log(arr);
      setProducts(arr);
    }
  };

  return (
    <div className="container">
      <div className="windowTitle">Down & Insulated</div>
      <div className="productsAmount">49 Products</div>
      <div className="filterContainer">
        <div className="filterButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M21 18v3h-2v-3h-2v-2h6v2h-2zM5 18v3H3v-3H1v-2h6v2H5zm6-12V3h2v3h2v2H9V6h2zm0 4h2v11h-2V10zm-8 4V3h2v11H3zm16 0V3h2v11h-2z" />
          </svg>
        </div>
        <div className="filterOptions">
          <div className="filterOption" style={{ background: "#dedede" }}>
            Sort By
          </div>
          {sortables &&
            sortables.map((sortable, key) => {
              return (
                <div className="filterOption" key={key}>
                  {sortable.label}
                </div>
              );
            })}
        </div>
      </div>
      <div className="items">
        {products &&
          products.map((item: ProductType, key) => {
            const href = window.location.href + "/" + item.extName;
            return (
              <div className="itemWrapper" key={key}>
                <a href={href} className="itemWrapper">
                  <img
                    className="itemImage"
                    alt={item.title}
                    src={item.showingImage}
                  />
                  <div className="itemMessage">{item.message}</div>
                  <div className="itemTitle">{item.title}</div>
                  <div className="itemRegular">
                    Regular ${item.regular / 100}
                  </div>
                  <div className="itemPrice">Now ${item.price / 100}</div>
                </a>

                <div className="itemSwatches">
                  {item.swatches &&
                    item.swatches.map((swatch, key) => {
                      return (
                        <img
                          src={swatch.url}
                          className="itemSwatch"
                          onClick={() => {
                            clickedSwatch(key, item);
                          }}
                          key={key}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}

        <Outlet />
      </div>
    </div>
  );
};

export default Category;
