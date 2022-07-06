import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session



export let authenticator = new Authenticator<UserType | null>(sessionStorage, {
    sessionKey: "sessionKey",
    sessionErrorKey: "sessionErrorKey",
    throwOnError: true
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let email = form.get("email");
        let password = form.get("password");
        let user;
        if (email === "elituffley@gmail.com") {
            user = {
                email,
                admin: 1
            }
            return user
        }
        else {
            throw new AuthorizationError("Wrong credentials!")
        }
    }),
    "user-pass"
);