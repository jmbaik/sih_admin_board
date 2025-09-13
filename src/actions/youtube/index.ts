import { arraySplit50 } from "@/utils/common.utils";
import { IAdminUser } from "../admin.user";
import { convToSupaPlaylist, convToSupaPlaylistItem, convToSupaVideo } from "../types/conv.supabase.types";
import {
  supaGetPlaylistIdByChannel,
  supaUpsertYoutubePlaylist,
  supaUpsertYoutubePlaylistItems,
  supaUpsertYoutubeVideos,
} from "./supabase.yt.api";
import { fetchAllPlaylist, fetchAllPlaylistItem, fetchAllVideos } from "./youtube.api";

export async function processPlaylistToVideosByChannelId(channelId: string, user: IAdminUser) {
  /***********************************************************
   *  1. channel id로 playlists를 구한다.
   *  2. playlist 테이블에 데이터를 넣는다.
   *  3. 데이터를 기준으로 items_count 가 0 보다 큰것을 가져온다
   *  4. playlist 별로 playlistitems 가져와 테이블에 넣는다.
   *  5. playlistitems테이블의 vid를 기준으로 videos를 머지 시킨다.
   **********************************************************/
  const ytPlaylists = await fetchAllPlaylist(channelId);
  const dtPlaylists = convToSupaPlaylist(ytPlaylists, user);
  console.log("dt playlist : ", dtPlaylists);

  const jobUpsetPlaylists = await supaUpsertYoutubePlaylist(dtPlaylists);
  if (jobUpsetPlaylists.success) {
    const playlistIds = await supaGetPlaylistIdByChannel(channelId);
    console.log("playlist ids : ", playlistIds);

    if (playlistIds != null) {
      playlistIds.map(async (playlistId) => {
        console.log("2. play list id ::: ", playlistId);
        const ytPlaylistItems = await fetchAllPlaylistItem(playlistId);
        // console.log("fetchAllPlaylistItem : ", ytPlaylistItems);
        const dtPlaylistItems = convToSupaPlaylistItem(ytPlaylistItems, user);
        console.log("dtPlaylistItems : ", dtPlaylistItems);

        const jobUpsertPlaylistItems = await supaUpsertYoutubePlaylistItems(dtPlaylistItems);
        if (jobUpsertPlaylistItems.success) {
          // playlist item의 vid를 가져온다.
          const vids = dtPlaylistItems.map((item) => item.vid);
          // console.log("dtPlaylistItems vids make : ", vids);

          // vid별 50개를 fetch한다.
          const arrVids: string[][] = arraySplit50(vids);
          // console.log("arr vids : ", arrVids);

          arrVids.map(async (vids) => {
            if (vids.length > 0) {
              console.log("vids : ", vids);
              const videos = await fetchAllVideos(vids);
              const dtVideos = convToSupaVideo(videos, user);
              const jobUpsertVideos = await supaUpsertYoutubeVideos(dtVideos);
              if (jobUpsertVideos.success) {
                console.log(`--- ${vids.join(",")} upsert yt_video : ${vids.length} rows success`);
              }
            }
          });
          // tb_yt_video테이블에 upsert한다.
        }
      });
    }
  }
}
