"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signIn, signOut, useSession } from "next-auth/react";

// @see https://github.com/jherr/app-router-auth-using-next-auth */
const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";

const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name}
        <br />
        <button onClick={() => signOut()} type="button">
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} type="button">
        Sign in
      </button>
    </>
  );
}

export default function NavMenuClient() {
  const pathname = usePathname();

  return (
    <div>
      <AuthButton />
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link>
        <Link href="/serverAction">
          <li
            className={
              pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>
        <Link href="/apiFromClient">
          <li
            className={
              pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link>
        <Link href="/apiFromServer">
          <li
            className={
              pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link>
      </ul>
    </div>
  );
}
