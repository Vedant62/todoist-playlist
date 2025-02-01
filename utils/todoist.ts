export function getTodoistAuthUrl(){
  const clientId = process.env.NEXT_PUBLIC_TODOIST_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_TODOIST_REDIRECT_URI;
  const scope = "data:read,data:delete";
  const state = crypto.randomUUID(); 

  return `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUri}`;
}