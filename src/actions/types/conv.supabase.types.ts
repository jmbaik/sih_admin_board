import { secondsFromYoutubeDuration, semiTimeFromSeconds, tryParseInt } from "@/utils/common.utils";
import { youtube_v3 } from "@googleapis/youtube";
import { IAdminUser } from "../admin.user";

export interface ITbYtPlaylist {
  playlist_id: string;
  channel_id: string;
  publish_date: string;
  title: string;
  description: string | null;
  thumb_low: string | null;
  thumb_mid: string | null;
  thumb_high: string | null;
  regid: string;
  updid: string;
  upddt: string;
  items_count: number | null;
}

export interface ITbYtPlaylistItem {
  vid: string;
  playlist_id: string;
  channel_id: string;
  publish_date?: string;
  video_publish_date: string;
  title: string;
  description: string | null;
  thumb_low: string | null;
  thumb_mid: string | null;
  thumb_high: string | null;
  regid: string;
  updid: string;
  upddt: string;
}

export interface ITbYtVideo {
  vid: string;
  cat?: string;
  channel_id: string;
  playlist_id?: string | null;
  title: string;
  author?: string | null;
  duration: string | null;
  description: string | null;
  publish_date?: string | null;
  avg_rate?: string | null;
  view_count: number | null;
  like_count: number | null;
  favorite_count: number | null;
  comment_count: number | null;
  runtime_type?: string | null;
  keywords?: string | null;
  thumb_low: string | null;
  thumb_mid: string | null;
  thumb_high: string | null;
  upload_date?: string | null;
  published_at?: string | null;
  seconds: number | null;
  default_language: string | null;
  regid: string;
  updid: string;
  upddt: string;
}

export function convToSupaPlaylist(playlists: youtube_v3.Schema$Playlist[], user: IAdminUser): ITbYtPlaylist[] {
  const result = playlists.map((playlist) => {
    return {
      playlist_id: playlist.id ?? "",
      channel_id: playlist.snippet?.channelId ?? "",
      publish_date: playlist.snippet?.publishedAt?.toString() ?? "",
      title: playlist.snippet?.title ?? "",
      description: playlist.snippet?.description ?? "",
      thumb_low: playlist.snippet?.thumbnails?.default?.url ?? "",
      thumb_mid: playlist.snippet?.thumbnails?.medium?.url ?? "",
      thumb_high: playlist.snippet?.thumbnails?.high?.url ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
      items_count: playlist.contentDetails?.itemCount ?? 0,
    };
  });
  return result;
}

export function convToSupaPlaylistItem(
  playlists: youtube_v3.Schema$PlaylistItem[],
  user: IAdminUser,
): ITbYtPlaylistItem[] {
  const result: ITbYtPlaylistItem[] = [];
  playlists.map((item) => {
    const tmp: ITbYtPlaylistItem = {
      vid: item.contentDetails?.videoId ?? "",
      playlist_id: item.snippet?.playlistId ?? "",
      channel_id: item.snippet?.channelId ?? "",
      publish_date: item.snippet?.publishedAt ?? "",
      video_publish_date: item.contentDetails?.videoPublishedAt ?? "",
      title: item.snippet?.title ?? "",
      description: item.snippet?.description ?? "",
      thumb_low: item.snippet?.thumbnails?.default?.url ?? "",
      thumb_mid: item.snippet?.thumbnails?.medium?.url ?? "",
      thumb_high: item.snippet?.thumbnails?.high?.url ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
    };
    if (tmp.publish_date !== "" && tmp.video_publish_date !== "") {
      result.push(tmp);
    }
  });
  return result;
}

export function convToSupaVideo(playlists: youtube_v3.Schema$Video[], user: IAdminUser): ITbYtVideo[] {
  const result = playlists.map((video) => {
    const _seconds = secondsFromYoutubeDuration(video.contentDetails?.duration ?? "");
    const _duration = semiTimeFromSeconds(_seconds);
    const tmp: ITbYtVideo = {
      vid: video.id ?? "",
      cat: "C01",
      channel_id: video.snippet?.channelId ?? "",
      title: video.snippet?.title ?? "",
      duration: _duration,
      description: video.snippet?.description ?? "",
      publish_date: video.snippet?.publishedAt ?? "",
      view_count: tryParseInt(video.statistics?.viewCount ?? "0"),
      like_count: tryParseInt(video.statistics?.likeCount ?? "0"),
      favorite_count: tryParseInt(video.statistics?.favoriteCount ?? "0"),
      comment_count: tryParseInt(video.statistics?.commentCount ?? "0"),
      thumb_low: video.snippet?.thumbnails?.default?.url ?? "",
      thumb_mid: video.snippet?.thumbnails?.medium?.url ?? "",
      thumb_high: video.snippet?.thumbnails?.high?.url ?? "",
      upload_date: video.snippet?.publishedAt ?? "",
      published_at: video.snippet?.publishedAt ?? "",
      seconds: _seconds,
      default_language: video.snippet?.defaultLanguage ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
    };
    if (tmp.publish_date === "") {
      delete tmp.publish_date;
      delete tmp.upload_date;
      delete tmp.published_at;
    }
    return tmp;
  });
  return result;
}
