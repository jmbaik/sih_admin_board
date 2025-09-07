"use client";

import { Card } from "@/components/ui/card";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import useAdminUserStore from "../store/admin.user.store";
import { login } from "./actions";

export default function LoginPage() {
  const { adminUser, setAdminUser } = useAdminUserStore();
  console.log("login adminuser state ::: ", adminUser);
  useEffect(() => {
    if (adminUser) redirect("/");
  }, [adminUser]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-amber-500">내손안의 찬양</h2>
      </div>
      <form>
        <Card className="p-4 w-[400px] flex flex-col justify-start items-start gap-8">
          <div className="flex flex-col gap-2 w-full mt-6">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border-2 p-2 rounded-md"
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border-2 p-2 rounded-md"
              placeholder="••••••••"
            />
          </div>
          <div className="w-full my-4 flex flex-row justify-center items-center">
            <button
              formAction={async (formData: FormData) => {
                const userInfo = await login(formData);
                if (userInfo?.success === "fail") {
                  redirect("/error");
                }
                setAdminUser(userInfo?.data);
                redirect("/");
              }}
              className="w-full rounded-md border bg-blue-500 px-6 py-2 text-white justify-center"
            >
              Log in
            </button>
            {/* <button
              formAction={signup}
              className="rounded-xl border bg-blue-500 px-6 py-1 text-white"
            >
              Sign up
            </button> */}
          </div>
        </Card>
      </form>
    </div>
  );
}
