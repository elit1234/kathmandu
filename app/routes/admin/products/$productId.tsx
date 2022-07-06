import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import stringifyNumber from "~/funcs/stringifyNumber";
import styles from "~/styles/Admin/EditingProduct.css";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader: LoaderFunction = async ({ request, params }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });
  const { productId } = params;
  if (user && user.admin > 0 && Number(productId)) {
    const product = await db.products.findUnique({
      where: {
        id: Number(productId),
      },
    });
    return product;
  } else return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  const { productId } = params;
  const formData = await request.formData();
  const title = formData.get("title");
  const message = formData.get("message");
  const regular = formData.get("regular");
  const price = formData.get("price");

  if (title && message && regular && price) {
    const product = await db.products.update({
      where: {
        id: Number(productId),
      },
      data: {
        title: title.toString(),
        message: message.toString(),
        regular: Number(regular),
        price: Number(price),
      },
    });
  }
  return json(true);
};

const EditingProducts = () => {
  const params = useParams();
  const formData = useActionData();

  const { productId } = params;
  const productData: ProductType | null = useLoaderData();
  const [pictures, setPictures] = useState<string[]>([]);
  const [editingPicture, setEditingPicture] = useState<number>();
  const [editingPictureValue, setEditingPictureValue] = useState<string>();
  const [editingSwatchValue, setEditingSwatchValue] = useState<SwatchType>();

  const userClickedImage = (image: string, key: number) => {
    setEditingPicture(key);
    setEditingPictureValue(image);
    setEditingSwatchValue(productData?.swatches[key]);
    const pictureWindow = document.querySelector(".pictureWindow")!;
    pictureWindow.style.transform = "scale(1)";
    pictureWindow.style.opacity = "1";
  };

  const closePictureWindow = () => {
    const pictureWindow = document.querySelector(".pictureWindow")!;
    pictureWindow.style.transform = "scale(0)";
    pictureWindow.style.opacity = "0";
    setEditingPicture(-1);
  };

  const userSavedPhotos = () => {
    console.log(editingPicture);
    console.log(editingPictureValue);
    console.log(editingSwatchValue);
  };

  useEffect(() => {
    if (productData && productData.images) setPictures(productData.images);
  }, [productData]);

  useEffect(() => {
    if (formData) alert("Successfully updated product.");
  }, [formData]);

  return (
    <div className="container">
      {productData && (
        <Form className="form" method="post">
          <label>Product Title</label>
          <input name="title" defaultValue={productData.title} />
          <label>Product Banner Message</label>
          <input name="message" defaultValue={productData.message} />
          <div className="numbers">
            <label>Old Price (divided by $100)</label>
            <input
              name="regular"
              defaultValue={productData.regular}
              type="number"
            />
            <label>Current Price (divided by $100)</label>
            <input
              name="price"
              defaultValue={productData.price}
              type="number"
            />
          </div>
          <label style={{ paddingTop: "2rem" }}>Images</label>
          <div className="images">
            {pictures &&
              pictures.map((image, imageKey) => {
                return (
                  <img
                    src={image}
                    className="image"
                    onClick={() => {
                      userClickedImage(image, imageKey);
                    }}
                    key={imageKey}
                  />
                );
              })}
          </div>
          <button>Save</button>
        </Form>
      )}
      <div className="pictureWindow">
        {editingPicture !== -1 && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="pictureClose"
              onClick={() => closePictureWindow()}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>

            <label>
              {stringifyNumber(Number(editingPicture + 1))} Image URL
            </label>
            <input
              value={editingPictureValue}
              onChange={(e) => setEditingPictureValue(e.target.value)}
            />
            <label>Swatch URL</label>
            <input
              value={editingSwatchValue?.url}
              onChange={(e) =>
                setEditingSwatchValue({
                  label: editingSwatchValue.label,
                  url: e.target.value,
                })
              }
            />
            <label>Swatch Label</label>
            <input
              value={editingSwatchValue?.label}
              onChange={(e) =>
                setEditingSwatchValue({
                  url: editingSwatchValue.url,
                  label: e.target.value,
                })
              }
            />
            <button onClick={() => userSavedPhotos()}>Save</button>
          </>
        )}
      </div>

      <pre>{JSON.stringify(productData, null, 4)}</pre>
    </div>
  );
};

export default EditingProducts;
