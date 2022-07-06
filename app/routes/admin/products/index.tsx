import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/Admin/EditProducts.css";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/admin/login",
  });
  if (user && user.admin > 0) {
    const products = await db.products.findMany({});
    return products;
  }
};

const EditingProducts = () => {
  const productData = useLoaderData();
  return (
    <div className="container">
      <p>Editing Products</p>
      <div className="products">
        {productData &&
          productData.map((product: ProductType, key: number) => {
            return (
              <a
                className="productLink"
                key={key}
                href={`/admin/products/${product.id}`}
              >
                <div className="product">
                  <img
                    className="productImage"
                    src={product.images && product.images[0]}
                  />
                  {product.title}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default EditingProducts;
