import { API_URL } from "@/config";
import cookie from "cookie";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { identifier, password } = req.body;

      const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      });

      const data = await strapiRes.json();

      if (strapiRes.ok) {
        //console.log("api/login:: Received data:");
        //console.log(data);

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
          `api/login:: Received an error message from strapi: ${data.error.status}: ${data.error.message}`
        );
        res.status(data.error.status).json({ message: data.error.message });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (e) {
    console.log(`api/login::Failure occurred at api/login: ${e.message}`);
    res.setHeader("Allow", ["POST"]);
    res.status(500).json({ message: `Internal server error` });
  }
};
