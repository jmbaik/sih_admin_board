import { IResponse } from "@/app/store/dto.response";
import supabase from "@/config/supabase.config";

export interface IYoutubeChannel {
  id: string;
  channel_id: string;
  title: string;
  url?: string | null;
}

export const supaFetchYoutubeChannel = async (): Promise<
  IResponse<IYoutubeChannel>
> => {
  try {
    const {
      data: channelData,
      error,
      count,
    } = await supabase
      .from("tb_yt_channel")
      .select("channel_id, title, url", { count: "exact" })
      .order("upddt", { ascending: false });

    // const { data, error } = await supabase.from("tb_yt_channel").select("*");
    // console.log("tb_yt_channel :", data);
    if (error) {
      throw new Error(error.message);
    }
    const data: IYoutubeChannel[] = channelData.map((d) => {
      return {
        id: d.channel_id,
        channel_id: d.channel_id,
        title: d.title,
        url: d.url,
      };
    });
    return {
      success: true,
      message: "데이터 fetch 작업을 성공적으로 완료하였습니다.",
      data,
      count,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
