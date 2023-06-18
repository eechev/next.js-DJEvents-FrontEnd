import { API_URL } from "@/config";
import cookie from "cookie";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      //Destroying the cookik
      res.setHeader(
        "SET-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ message: "Success" });
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
