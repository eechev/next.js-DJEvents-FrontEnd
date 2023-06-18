import { API_URL } from "@/config";
import cookie from "cookie";

export default async (req, res) => {
  try {
    console.log("api/register called....");

    if (req.method === "POST") {
      const { user } = req.body;

      //console.log(user, user.username, user.email, user.password);

      const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await strapiRes.json();

      if (strapiRes.ok) {
        //set cookie
        res.setHeader(
          "SET-Cookie",
          cookie.serialize("token", data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          })
        );

        res.status(200).json({ user: data.user });
      } else {
        console.log(
          `api::register: Received an error message from strapi: ${data.error.status}: ${data.error.message}`
        );
        console.log(data);
        let msg = data.error.details.errors
          ? data.error.details.errors[0].message
          : data.error.message;

        res.status(data.error.status).json({ message: msg });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (e) {
    console.log(`Failure occurred at api/register: ${e.message}`);
    res.setHeader("Allow", ["POST"]);
    res.status(500).json({ message: `Internal server error` });
  }
};
