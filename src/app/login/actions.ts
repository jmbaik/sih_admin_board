"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { logonUserInfo } from "../../actions/admin.user";
import { IResponse } from "../store/dto.response";

export async function login(
  formData: FormData
): Promise<IResponse | undefined> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log("user data", userData);

  const userInfo = await logonUserInfo(userData.user?.email ?? "");

  revalidatePath("/", "layout");

  return userInfo;
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
