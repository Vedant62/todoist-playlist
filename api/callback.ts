import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state" });
  }

  try {
    const response = await axios.post(
      "https://todoist.com/oauth/access_token",
      {
        client_id: process.env.NEXT_PUBLIC_TODOIST_CLIENT_ID,
        client_secret: process.env.TODOIST_CLIENT_SECRET,
        code,
        redirect_uri: process.env.NEXT_PUBLIC_TODOIST_REDIRECT_URI,
      }
    );

    const access_token = response.data;
    console.log(access_token ? "1" : "0");
  } catch (error) {
    console.error("OAuth error", error);
  }
}
