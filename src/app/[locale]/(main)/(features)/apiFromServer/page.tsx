import { headers } from "next/headers";

interface ApiResponse {
  name: string;
}

export default async function APIFromServer() {
  const response = await fetch("http://localhost:3000/api/whoAmI", {
    method: "GET",
    headers: headers(),
  });

  const resp = (await response.json()) as ApiResponse;

  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      <div>Name: {resp?.name}</div>
    </div>
  );
}
