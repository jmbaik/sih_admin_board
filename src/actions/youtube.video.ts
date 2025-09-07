import { IResponse } from "@/app/store/dto.response";
import supabase from "@/config/supabase.config";

export const fetchChannel = async (): Promise<IResponse> => {
  try {
    const { data, error, count } = await supabase
      .from("tb_yt_channel")
      .select("channel_id, title, url", { count: "exact" })
      .order("upddt", { ascending: false });

    // const { data, error } = await supabase.from("tb_yt_channel").select("*");
    // console.log("tb_yt_channel :", data);

    if (error) {
      throw new Error(error.message);
    }
    return {
      success: "success",
      message: "",
      data,
      count,
    };
  } catch (error: any) {
    return {
      success: "fail",
      message: error.message,
    };
  }
};
