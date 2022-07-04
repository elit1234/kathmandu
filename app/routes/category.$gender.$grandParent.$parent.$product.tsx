import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/utils/db";

import styles from "~/styles/ViewProduct/ViewProduct.css";
import featureStyles from "~/styles/ViewProduct/FeaturesArea.css";
import sizeStyles from "~/styles/ViewProduct/SizeWindow.css";

import Siema from "siema";
import AfterpayWindow from "~/Views/ViewingItem/AfterpayWindow";
import InfoWindow from "~/Views/ViewingItem/InfoWindow";
import FeaturesArea from "~/Views/ViewingItem/FeaturesArea";
import SizeWindow from "~/Views/ViewingItem/SizeWindow";

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
  {
    rel: "stylesheet",
    href: featureStyles,
  },
  {
    rel: "stylesheet",
    href: sizeStyles,
  },
];

const Product = () => {
  const product: ProductType = useLoaderData();
  const [activePicture, setActivePicture] = useState(0);
  let mySiema;
  useEffect(() => {
    if (typeof window !== "undefined") {
      function siemaOnChange(this: any) {
        console.log(this.currentSlide);
        setActivePicture(this.currentSlide);
      }

      mySiema = new Siema({
        onChange: siemaOnChange,
      });
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

  const userClickedMessage = () => {
    const infoWindow = document.querySelector(".infoWindow")!;
    if (infoWindow.style.opacity !== "1") {
      infoWindow.setAttribute("style", "opacity: 1");

      infoWindow.style.transform = "scale(1)";
    } else {
      infoWindow.setAttribute("style", "opacity: 0");
      infoWindow.style.transform = "scale(0)";
    }
  };

  const toggleSizeDropdown = () => {
    const dropHidden = document.querySelector(".dropMenuHidden")!;
    if (dropHidden.style.opacity !== "1")
      dropHidden.setAttribute("style", "opacity: 1");
    else dropHidden.setAttribute("style", "opacity: 0");

    if (dropHidden.style.transform !== "scaleY(1)")
      dropHidden.style.transform = "scaleY(1)";
    else dropHidden.style.transform = "scaleY(0)";
  };

  useEffect(() => {
    const tryLogin = async () => {};
    tryLogin();
  }, []);

  return (
    <div className="container">
      <AfterpayWindow />
      <SizeWindow />
      <InfoWindow
        paragraphs={[
          {
            bold: true,
            message: "NOW 2 for $349",
          },
          {
            bold: true,
            message:
              "To receive this deal please place two of the selected items into your cart and the offer will be processed at checkout.",
          },
          {
            message: "Made for out there - shop our Winter sale now!",
          },
          {
            message:
              "Final Markdowns end Monday 11th July 2022. Excludes Clearance, spare parts and e-Gift Cards. While stocks last. Some stocks limited. Not all items available in all stores or to buy online. Styles and colours may vary between stores.",
          },
        ]}
      />

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
          <div className="carouselPages">
            {product.images.map((_, key) => {
              return (
                <div
                  className="carouselPage"
                  key={key}
                  style={{ opacity: activePicture === key ? 1 : "0.4" }}
                ></div>
              );
            })}
          </div>
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
            <div className="messageRight" onClick={() => userClickedMessage()}>
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
                onClick={() => toggleSizeDropdown()}
              >
                Size 6
              </div>
              <div onClick={() => toggleSizeDropdown()}>
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
          <div className="findInStore">
            <div className="findInStoreText">Find In Store</div>
            <input
              className="findInStoreInput"
              placeholder="postcode / suburb"
            />
            <div className="findInStoreLabel">postcode / suburb *</div>
          </div>
          <div className="useMyLocation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13 1l.001 3.062A8.004 8.004 0 0 1 19.938 11H23v2l-3.062.001a8.004 8.004 0 0 1-6.937 6.937L13 23h-2v-3.062a8.004 8.004 0 0 1-6.938-6.937L1 13v-2h3.062A8.004 8.004 0 0 1 11 4.062V1h2zm-1 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <p>Use my location</p>
          </div>
          <div className="deliveryHelpOuter">
            <div className="deliveryHelp" style={{ fontWeight: "bold" }}>
              How do I get it?
            </div>
            <div className="deliveryHelp">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
              </svg>
              Order Online - Get it delivered to your home
            </div>
            <div className="deliveryHelp">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"></path>
              </svg>
              Click & Collect - select a store to see options
            </div>
            <div className="deliveryHelp">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z"></path>
              </svg>
              In Store - select a store to see availability
            </div>

            {product.paragraphs && (
              <div className="productParagraphs">
                {product.paragraphs.map((paragraph, key) => {
                  return (
                    <div className="productParagraph" key={key}>
                      {paragraph}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <FeaturesArea features={product.features} materials={product.materials} />
    </div>
  );
};

export default Product;
