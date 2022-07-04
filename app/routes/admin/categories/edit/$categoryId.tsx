import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { db } from "~/utils/db";
import styles from "~/styles/Admin/EditCategory.css";

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
  if (user && user.admin < 1) return redirect("/admin/login");
  const { categoryId } = params;
  const product = await db.categories.findFirst({
    where: {
      id: Number(categoryId),
    },
  });
  if (product) return json(product);
  return json(true);
};

export const action: ActionFunction = async ({ request, params }) => {
  const { categoryId } = params;
  const formData = await request.formData();
  const oldData = await db.categories.findFirst({
    where: {
      id: Number(categoryId),
    },
  });
  const label = formData.get("label")!;
  const parent = formData.get("parent")!;

  await db.categories.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      label,
      parent: Number(parent),
    },
  });

  return json(true);
};

const EditingCategory = () => {
  const product = useLoaderData();
  const params = useParams();

  return (
    <div className="container">
      <a href="/admin/categories">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="admin__backIcon"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" />
        </svg>
      </a>
      <h2>Editing Category:</h2>

      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label>Label</label>
        <input name="label" defaultValue={product.label} />

        {product.page > 1 && (
          <>
            <label>Parent ID</label>
            <input name="parent" defaultValue={product.parent} />
          </>
        )}
        <button type="submit">Save</button>
      </Form>
      <pre>{JSON.stringify(product, null, 4)}</pre>
    </div>
  );
};

export default EditingCategory;
