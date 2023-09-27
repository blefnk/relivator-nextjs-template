"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Or use SWR, react-query, etc.

import { env } from "~/data/env/env.mjs";

/**
 * todo: it is basic implementation
 * todo: and it need to be improved
 */

export function PackagesIndicator() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (env.NODE_ENV === "production") {
      return;
    }

    const fetchData = async () => {
      const { data } = await axios.get("/api/dev/packages");
      setUpdates(data);
    };

    fetchData();
  }, []);

  if (env.NODE_ENV === "production" || !updates.length) return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      {updates.map(({ pkg, current, latest }) => (
        <div key={pkg}>
          {pkg}: {current} {"->"} {latest}
        </div>
      ))}
    </div>
  );
}
