import { loginAction } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-[#0F2540]/10 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1DBAA5]">
            Internal · Scholvisor
          </p>
          <h1 className="mt-2 text-xl font-bold text-[#0F2540]">Admin login</h1>

          {error && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              Invalid email or password.
            </div>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-semibold text-[#667085]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-[#0F2540]/15 px-4 py-2.5 text-sm text-[#0F2540] outline-none focus:border-[#1DBAA5]"
                placeholder="admin@scholvisor.com"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-semibold text-[#667085]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#0F2540]/15 px-4 py-2.5 text-sm text-[#0F2540] outline-none focus:border-[#1DBAA5]"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#1DBAA5] py-3 text-sm font-semibold text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
