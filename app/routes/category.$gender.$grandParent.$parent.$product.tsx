import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/funcs/db";
import styles from "~/styles/ViewProduct.css";
import Siema from "siema";
import AfterpayWindow from "~/Views/ViewingItem/AfterpayWindow";

const RightMoreArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
  </svg>
);

export const loader: LoaderFunction = async ({ params }) => {
  const { product } = params;
  const foundProduct = await db.products.findFirst({
    where: {
      extName: product,
    },
  });
  return json(foundProduct);
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

const Product = () => {
  const product: ProductType = useLoaderData();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mySiema = new Siema();
    }
  }, []);

  const userClickedAfterpayInfo = () => {
    const afterpayWindow = document.querySelector(".afterpayWindow")!;
    if (afterpayWindow.style.opacity !== "1") {
      afterpayWindow.style.opacity = "1";
      afterpayWindow.style.transform = "scale(1)";
    } else {
      afterpayWindow.style.opacity = "0";
      afterpayWindow.style.transform = "scale(0)";
    }
  };

  return (
    <div className="container">
      <AfterpayWindow />
      <div className="addToBag">
        <div className="addToButton">Add To Bag</div>
      </div>
      <div className="content">
        {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}
        <div className="siema" style={{ maxHeight: "450px" }}>
          {product.images &&
            product.images.map((image, key) => {
              return (
                <div key={key}>
                  <img
                    key={key}
                    src={image}
                    alt={product.title}
                    className="productImage"
                  />
                </div>
              );
            })}
        </div>
        <div className="content">
          <div className="breadcrumbs">
            <div className="breadcrumb">Home</div>
            <RightMoreArrow />
            <div className="breadcrumb">Women</div>
            <RightMoreArrow />

            <div className="breadcrumb">Jackets & Vests</div>
            <RightMoreArrow />

            <div className="breadcrumb">Down & Insulated</div>
          </div>
          <div className="messageWrapper">
            <div className="messageLeft">
              <p>Now 2 for $349</p>
            </div>
            <div className="messageRight">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="grey"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
              </svg>
            </div>
          </div>
          <div className="productName">{product.title}</div>
          <div className="regular">Regular ${product.regular / 100}</div>
          <div className="now">Now ${product.price / 100}</div>
          <div className="activeColour">
            <div>Colour:</div>
            <div>Waterfall</div>
          </div>
          <div className="swatches">
            {product.swatches &&
              product.swatches.map((swatch, key) => {
                return (
                  <img
                    src={swatch.url}
                    alt={swatch.label}
                    key={key}
                    className="swatch"
                  />
                );
              })}
          </div>
          <div className="dropOuter">
            <div className="dropMenu">
              <div
                style={{ width: "100%" }}
                onClick={() => {
                  const dropHidden = document.querySelector(".dropMenuHidden")!;
                  if (dropHidden.style.opacity !== "1")
                    dropHidden.style.opacity = "1";
                  else dropHidden.style.opacity = "0";

                  if (dropHidden.style.transform !== "scaleY(1)")
                    dropHidden.style.transform = "scaleY(1)";
                  else dropHidden.style.transform = "scaleY(0)";
                }}
              >
                Size 6
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                </svg>
              </div>
            </div>
            <div className="dropMenuHidden">
              <div className="size">Size 6</div>
              <div className="size">Size 7</div>
              <div className="size">Size 8</div>
              <div className="size">Size 9</div>
              <div className="size">Size 10</div>
              <div className="size">Size 11</div>
              <div className="size">Size 11</div>
              <div className="size">Size 11</div>
              <div className="size">Size 16</div>
            </div>
          </div>
          <div className="sizeGuide">Size Guide</div>
          <div className="afterPay">
            4 easy payments with
            <img
              src="/img/afterpay.svg"
              alt="afterpay"
              className="afterPayImg"
            />
            <div
              className="afterPayLink"
              onClick={() => userClickedAfterpayInfo()}
            >
              Info
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
