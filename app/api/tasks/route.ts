import { NextRequest, NextResponse } from "next/server";
import { addPlaylistTask } from "@/lib/add_task";

export async function POST(request: NextRequest) {
  try {
    const { access_token, taskList } = await request.json();

    await addPlaylistTask(access_token, taskList);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding tasks:", error);
    return NextResponse.json({ error: "Failed to add tasks" }, { status: 500 });
  }
}
