import { getServerSession } from "next-auth";

import WhoAmIButton from "~/core/auth/authjs/islands/check-user-button";

export default async function ServerActionPage() {
  const whoAmI = async () => {
    "use server";
    const session = await getServerSession();
    return session?.user?.name || "Not Logged In";
  };
  return (
    <div>
      <WhoAmIButton whoAmIAction={whoAmI} />
    </div>
  );
}
