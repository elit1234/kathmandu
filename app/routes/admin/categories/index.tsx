import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import styles from "~/styles/Admin/Categories.css";
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
  if (user) {
    const menuOptions = await db.categories.findMany({
      orderBy: [
        {
          position: "asc",
        },
      ],
    });
    return json(menuOptions);
  }
};

const AdminCategories = () => {
  const data = useLoaderData();
  const [categories, setCategories] = useState<MenuOption[] | null>();
  const [page, setPage] = useState<number>(0);

  const userClickedPage = (pageId: number) => {
    let arr: MenuOption[] = [];
    data &&
      data.map((category: MenuOption) => {
        if (category.page === pageId) arr.push(category);
      });
    setCategories(arr);
    setPage(pageId);
  };

  useEffect(() => {
    const pages = document.querySelectorAll(".page");

    pages &&
      pages.forEach((page) => {
        page.addEventListener("click", function (this: any) {
          this.classList.add("selected");
          const clickedId = Number(this.id);
          userClickedPage(clickedId + 1);
          const otherPages = Array.from(pages).filter(
            (fPage) => fPage !== this
          );
          otherPages &&
            otherPages.forEach((oPage) => {
              oPage.classList.remove("selected");
            });
        });
      });
  }, []);

  return (
    <div className="container">
      <div className="pages">
        {[...Array(3)].map((e, i) => (
          <div className="page" key={i} id={i.toString()}>
            Page {i + 1}
          </div>
        ))}
      </div>
      <div className="categories">
        {categories &&
          categories.map((category, key) => {
            return (
              <a
                href={`/admin/categories/edit/${category.id}`}
                className="category"
                key={key}
              >
                ({category.id}) {category.label} - ranking: {category.position}
              </a>
            );
          })}
        {page > 0 && (
          <a
            className="category"
            href={`/admin/categories/new/${page}`}
            style={{ backgroundColor: "var(--green)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="44"
              height="44"
              fill="#fff"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
