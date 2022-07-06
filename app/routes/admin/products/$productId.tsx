import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useParams,
  useSubmit,
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

export const action: ActionFunction = async ({ request, params, context }) => {
  const formData = await request.formData();
  const { productId } = params;

  let { _action } = Object.fromEntries(formData);
  if (_action === "images") {
    let newProduct: ProductType;
    const photoId = formData.get("photoId");
    const photoImage = formData.get("photoImage");
    const swatchImage = formData.get("swatchImage");
    const swatchLabel = formData.get("swatchLabel");
    console.log("updating " + swatchLabel + ", key: " + photoId);
    const oldProduct: ProductType | any = await db.products.findUnique({
      where: {
        id: Number(productId),
      },
    });
    if (oldProduct) {
      let newImages: string[] = [];
      const newSwatch: SwatchType[] = [];

      oldProduct.images &&
        oldProduct.images.map((image: string, key: number) => {
          if (key !== Number(photoId)) newImages.push(image);
          else if (photoImage) newImages.push(photoImage.toString());
        });

      oldProduct.swatches &&
        oldProduct.swatches.map((swatch: SwatchType, key: number) => {
          if (key !== Number(photoId)) newSwatch.push(swatch);
          else if (swatchImage && swatchLabel) {
            newSwatch.push({
              label: swatchLabel.toString(),
              url: swatchImage.toString(),
            });
          }
        });
      newProduct = {
        ...oldProduct,
        swatches: newSwatch,
        images: newImages,
      };
      //Strip ID from object
      const clone = (({ id, ...newProduct }) => newProduct)(newProduct);
      await db.products.update({
        where: {
          id: Number(productId),
        },
        data: clone,
      });
    }

    return json(true);
  }
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
  const fetcher = useFetcher();
  const submit = useSubmit();
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
    if (productData && productData.swatches)
      setEditingSwatchValue(productData.swatches[key]);
    const pictureWindow = document.querySelector(".pictureWindow")!;

    pictureWindow.classList.toggle("active");
  };

  const closePictureWindow = () => {
    const pictureWindow = document.querySelector(".pictureWindow")!;
    pictureWindow.classList.toggle("active");
    setEditingPicture(-1);
  };

  const userSavedPhotos = () => {
    const oldProd = productData;
    let newProd: ProductType | object = {};
    if (productData) {
      let newImages: string[] = [];
      const newSwatch: SwatchType[] = [];
      const images = productData.images;
      const swatches = productData.swatches;

      images &&
        images.map((image, key) => {
          if (key !== editingPicture) newImages.push(image);
          else if (editingPictureValue) newImages.push(editingPictureValue);
        });

      swatches &&
        swatches.map((swatch, key) => {
          if (key !== editingPicture) newSwatch.push(swatch);
          else if (editingSwatchValue) newSwatch.push(editingSwatchValue);
        });

      newProd = {
        ...oldProd,
        images: newImages,
        swatches: newSwatch,
      };

      console.log(newProd);
      console.log(oldProd);
    }
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
        <Form method="post" className="pictureWindowForm">
          <label>{stringifyNumber(Number(editingPicture + 1))} Image URL</label>
          <input defaultValue={editingPictureValue} name="photoImage" />
          <input
            type="hidden"
            name="photoId"
            defaultValue={Number(editingPicture)}
          />
          <label>Swatch URL</label>
          <input
            defaultValue={editingSwatchValue?.url}
            name="swatchImage"
            // onChange={(e) =>
            //   setEditingSwatchValue({
            //     label: editingSwatchValue.label,
            //     url: e.target.value,
            //   })
            // }
          />
          <label>Swatch Label</label>
          <input
            defaultValue={editingSwatchValue?.label}
            name="swatchLabel"
            // onChange={(e) =>
            //   setEditingSwatchValue({
            //     url: editingSwatchValue.url,
            //     label: e.target.value,
            //   })
            // }
          />
          <button type="submit" name="_action" value="images">
            Apply photo
          </button>
        </Form>
      </div>

      <pre>{JSON.stringify(productData, null, 4)}</pre>
    </div>
  );
};

export default EditingProducts;
