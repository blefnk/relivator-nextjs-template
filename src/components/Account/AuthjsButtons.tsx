import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignIn({
  mode,
  provider,
  ...props
}: {
  mode: "sign-in" | "sign-up";
  provider?: string;
} & ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        await signIn(provider);
      }}
    >
      <Button {...props}>{mode === "sign-in" ? "Sign in" : "Sign up"}</Button>
    </form>
  ); // eslint-disable-next-line @stylistic/max-len
} // export function SignOut(props: ComponentPropsWithRef<typeof Button>) {//   return (//     <form//       action={async () => {//         await signOut();//       }}//       className="w-full"//     >//       <Button className="w-full p-0" variant="ghost" {...props}>//         <Icons.logout aria-hidden="true" className="mr-2 size-4" />//         Sign Out//       </Button>//     </form>//   );// }
