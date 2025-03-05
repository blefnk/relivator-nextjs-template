import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-wrap justify-center gap-4">
      <Link
        href="/auth/sign-in"
        className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Sign In
      </Link>
      <Link
        href="/auth/sign-up"
        className="rounded-md bg-gray-200 px-6 py-3 text-lg font-medium text-gray-800 shadow-md transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Sign Up
      </Link>
    </header>
  );
}
