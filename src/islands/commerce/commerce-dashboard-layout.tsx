import { Session } from "next-auth";

type RootLayoutProps = {
  user: Session["user"];
  children: React.ReactNode;
};

export default function DashboardLayout({ user, children }: RootLayoutProps) {
  return (
    <main className="bg-gray-900 min-h-screen flex flex-col gap-8 p-4 container mx-auto">
      <div className="flex flex-col md:flex-row items-center md:justify-between h-fit">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="gap-2 h-fit items-center hidden sm:flex">
          <div className="flex flex-col text-right">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </main>
  );
}
