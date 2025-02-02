import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

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
    console.log("sending this access token from my-api: ", response.data.access_token);
    return NextResponse.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}