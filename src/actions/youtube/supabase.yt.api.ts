import { IResponse } from "@/app/store/dto.response";
import supabase from "@/config/supabase.config";
import { ITbYtPlaylist, ITbYtPlaylistItem, ITbYtVideo } from "../types/conv.supabase.types";

export interface IYoutubeChannel {
  id: string;
  channel_id: string;
  title: string;
  url?: string | null;
  logo_url: string | null;
  upddt: string | null;
}

export const supaFetchYoutubeChannel = async (): Promise<IResponse<IYoutubeChannel>> => {
  try {
    // const {
    //   data: channelData,
    //   error,
    //   count,
    // } = await supabase
    //   .from("tb_yt_channel")
    //   .select("channel_id, title, url", { count: "exact" })
    //   .order("upddt", { ascending: false });
    const { data, error, count } = await supabase.rpc("fetch_sih_channel");

    // const { data, error } = await supabase.from("tb_yt_channel").select("*");
    // console.log("tb_yt_channel :", data);
    if (error) {
      console.log(error.message);

      throw new Error(error.message);
    }

    return {
      success: true,
      message: "데이터 fetch 작업을 성공적으로 완료하였습니다.",
      data,
      count,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: "fetch 작업에 알수 없는 에러가 발생했습니다.",
      };
    }
  }
};

export async function supaGetPlaylistIdByChannel(channelId: string) {
  const { data } = await supabase
    .from("tb_yt_playlist")
    .select("playlist_id")
    .eq("channel_id", channelId)
    .gt("items_count", 0);
  const result = data?.map((item) => item.playlist_id.toString()) ?? null;
  return result;
}

export async function supaUpsertYoutubePlaylist(tbPlaylists: ITbYtPlaylist[]): Promise<IResponse<string>> {
  try {
    const { error } = await supabase.from("tb_yt_playlist").upsert(tbPlaylists);
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "playlist merge process success",
      data: [""],
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: "fetch 작업에 알수 없는 에러가 발생했습니다.",
      };
    }
  }
}

export async function supaUpsertYoutubePlaylistItems(tbPlaylistItems: ITbYtPlaylistItem[]): Promise<IResponse<string>> {
  try {
    const { error } = await supabase.from("tb_yt_playlist_item").upsert(tbPlaylistItems);
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "playlist item merge process success",
      data: [""],
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: "fetch 작업에 알수 없는 에러가 발생했습니다.",
      };
    }
  }
}

export async function supaUpsertYoutubeVideos(tbVideos: ITbYtVideo[]): Promise<IResponse<string>> {
  try {
    const { error } = await supabase.from("tb_yt_video").upsert(tbVideos);
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    return {
      success: true,
      message: "video merge process success",
      data: [""],
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    } else {
      return {
        success: false,
        message: "fetch 작업에 알수 없는 에러가 발생했습니다.",
      };
    }
  }
}
