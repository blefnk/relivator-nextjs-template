"use client";

import { useEffect, useState } from "react";

interface ApiResponse {
  name: string;
}

export default function APITestPage() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch("/api/whoAmI")
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((data) => setName(data.name));
  }, []);

  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Client</span>
      </div>
      <div>Name: {name}</div>
    </div>
  );
}
