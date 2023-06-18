import { API_URL } from "@/config";
import cookie from "cookie";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      if (!req.headers.cookie) {
        res.status(403).json({ message: "Not Authorized" });
        return;
      }
      const { token } = cookie.parse(req.headers.cookie);

      const strapiRes = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (strapiRes.ok) {
        const data = await strapiRes.json();
        res.status(200).json({ data });
      } else {
        console.log(
          `Received an error message from strapi: ${data.error.status}: ${data.error.message}`
        );
        res.status(403).json({ message: "User Forbidden" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (e) {
    //console.log(`Failure occurred at api/login: ${e.message}`);
    res.setHeader("Allow", ["POST"]);
    res.status(500).json({ message: `Internal server error` });
  }
};
