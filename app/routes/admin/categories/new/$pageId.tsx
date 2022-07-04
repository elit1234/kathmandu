import { ActionFunction, json, LinksFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useParams } from "@remix-run/react";
import styles from "~/styles/Admin/CreateCategory.css";
import { db } from "~/utils/db";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const action: ActionFunction = async ({ request, params }) => {
  const { pageId } = params;
  const formData = await request.formData();
  const label = formData.get("label");
  const extName = formData.get("extName");
  const position = formData.get("position");
  const parent = formData.get("parent");
  if (label && extName && position)
    await db.categories.create({
      data: {
        label,
        page: Number(pageId),
        extName,
        position: Number(position),
        parent: parent ? Number(parent) : null,
      },
    });
  return json(true);
};

const CreatingCategory = () => {
  const data = useParams();
  const { pageId } = data;
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
      <h2>Creating Category (Page {pageId})</h2>
      <Form
        method="post"
        style={{ flexDirection: "column", display: "flex", gap: "1rem" }}
      >
        <input placeholder="label" name="label" />
        <input name="extName" placeholder="External name(no spaces)" />
        <input type="number" placeholder="position" name="position" />
        <input type="number" placeholder="Parent ID" name="parent" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default CreatingCategory;
