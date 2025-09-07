import supabase from "@/config/supabase.config";
import { IResponse } from "../app/store/dto.response";

export interface IAdminUser {
  uid: string;
  email: string;
  phone: string;
  admin_level: string;
  c_code: string;
  name: string;
  nickname: string | null;
  comment: string | null;
  pic: string | null;
  token: string | null;
  regid: string | null;
  regdate: string | null;
  updid: string | null;
  upddate: string | null;
  password: string;
}

export const logonUserInfo = async (
  email: string
): Promise<IResponse | undefined> => {
  try {
    const { data, error } = await supabase
      .from("tb_admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      return {
        success: "fail",
        message: error.message,
        data: null,
      };
    }

    return {
      success: "success",
      message: "",
      data: data,
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
