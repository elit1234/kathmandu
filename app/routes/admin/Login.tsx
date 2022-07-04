import { ActionFunction, json, LinksFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { AuthorizationError } from "remix-auth";
import styles from "~/styles/Admin/Login.css";
import { authenticator } from "~/utils/auth.server";
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const action: ActionFunction = async ({ request }) => {
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/admin",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      console.log("response error");
      return error;
    }
    if (error instanceof AuthorizationError) {
      console.log(error.message);
      return error.message;
    }
  }
};

const AdminLogin = () => {
  const data = useActionData();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="container">
      {data && <h2>{data}</h2>}
      <Form method="post" className="loginForm">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Your email address"
          name="email"
          className="loginFormInput"
        />

        <label htmlFor="email">Password</label>
        <input
          id="password"
          type="text"
          placeholder="Your password"
          className="loginFormInput"
          name="password"
        />
        <button type="submit" className="loginFormSubmit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default AdminLogin;
