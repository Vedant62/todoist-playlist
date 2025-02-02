export function getTodoistAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_TODOIST_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_TODOIST_REDIRECT_URI;
  const scope = "data:read_write,data:delete";
  const state = crypto.randomUUID();

  // Add these parameters to force new authorization
  return `https://todoist.com/oauth/authorize?clientid=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
}
