import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "~/styles/Admin/Index.css";
import { authenticator } from "~/utils/auth.server";
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
  return user;
};

const AdminIndex = () => {
  const data = useLoaderData();
  return (
    <div className="container">
      <a href="/admin/categories" className="option">
        Menu Categories
      </a>
      <a href="/admin/products" className="option">
        Products
      </a>
    </div>
  );
};

export default AdminIndex;
