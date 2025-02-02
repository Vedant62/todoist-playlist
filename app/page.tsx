"use client";
import { Button } from "@/components/ui/button";
import { getTodoistAuthUrl } from "@/utils/todoist";

export default function TodoistAuthPage() {
  const handleAuth = () => {
    window.location.href = getTodoistAuthUrl();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Button
          onClick={handleAuth}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white"
        >
          Authorize with Todoist
        </Button>
      </div>
    </div>
  );
}
