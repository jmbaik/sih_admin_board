import { secondToTime, tryParseInt } from "@/utils/common.utils";
import { youtube_v3 } from "@googleapis/youtube";
import { IAdminUser } from "../admin.user";

interface ITbYtPlaylist {
  playlistId: string;
  channelId: string;
  publishDate: string;
  title: string;
  description: string | null;
  thumbLow: string | null;
  thumbMid: string | null;
  thumbHigh: string | null;
  regid: string;
  updid: string;
  upddt: string;
}

interface ITbYtPlaylistItem {
  vid: string;
  playlistId: string;
  channelId: string;
  publishDate: string;
  videoPublishDate: string;
  title: string;
  description: string | null;
  thumbLow: string | null;
  thumbMid: string | null;
  thumbHigh: string | null;
  regid: string;
  updid: string;
  upddt: string;
}

interface ITbYtVideo {
  vid: string;
  cat?: string;
  channelId: string;
  playlistId?: string | null;
  title: string;
  author?: string | null;
  duration: string | null;
  description: string | null;
  publishDate: string | null;
  avgRate?: string | null;
  viewCount: number | null;
  likeCount: number | null;
  favoriteCount: number | null;
  commentCount: number | null;
  runtimeType?: string | null;
  keywords?: string | null;
  thumbLow: string | null;
  thumbMid: string | null;
  thumbHigh: string | null;
  uploadDate: string | null;
  publishedAt: string | null;
  seconds: number | null;
  defaultLanguage: string | null;
  regid: string;
  updid: string;
  upddt: string;
}

export function convToSupaPlaylist(playlists: youtube_v3.Schema$Playlist[], user: IAdminUser): ITbYtPlaylist[] {
  const result = playlists.map((playlist) => {
    return {
      playlistId: playlist.id ?? "",
      channelId: playlist.snippet?.channelId ?? "",
      publishDate: playlist.snippet?.publishedAt?.toString() ?? "",
      title: playlist.snippet?.title ?? "",
      description: playlist.snippet?.description ?? "",
      thumbLow: playlist.snippet?.thumbnails?.default?.url ?? "",
      thumbMid: playlist.snippet?.thumbnails?.medium?.url ?? "",
      thumbHigh: playlist.snippet?.thumbnails?.high?.url ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
    };
  });
  return result;
}

export function convToSupaPlaylistItem(
  playlists: youtube_v3.Schema$PlaylistItem[],
  user: IAdminUser,
): ITbYtPlaylistItem[] {
  const result = playlists.map((item) => {
    return {
      vid: item.contentDetails?.videoId ?? "",
      playlistId: item.snippet?.playlistId ?? "",
      channelId: item.snippet?.channelId ?? "",
      publishDate: item.snippet?.publishedAt ?? "",
      videoPublishDate: item.contentDetails?.videoPublishedAt ?? "",
      title: item.snippet?.title ?? "",
      description: item.snippet?.description ?? "",
      thumbLow: item.snippet?.thumbnails?.default?.url ?? "",
      thumbMid: item.snippet?.thumbnails?.medium?.url ?? "",
      thumbHigh: item.snippet?.thumbnails?.high?.url ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
    };
  });
  return result;
}

export function convToSupaVideo(playlists: youtube_v3.Schema$Video[], user: IAdminUser): ITbYtVideo[] {
  const result = playlists.map((video) => {
    return {
      vid: video.id ?? "",
      channelId: video.snippet?.channelId ?? "",
      title: video.snippet?.title ?? "",
      duration: secondToTime(tryParseInt(video.contentDetails?.duration ?? "")),
      description: video.snippet?.description ?? "",
      publishDate: video.snippet?.publishedAt ?? "",
      viewCount: tryParseInt(video.statistics?.viewCount ?? "0"),
      likeCount: tryParseInt(video.statistics?.likeCount ?? "0"),
      favoriteCount: tryParseInt(video.statistics?.favoriteCount ?? "0"),
      commentCount: tryParseInt(video.statistics?.commentCount ?? "0"),
      thumbLow: video.snippet?.thumbnails?.default?.url ?? "",
      thumbMid: video.snippet?.thumbnails?.medium?.url ?? "",
      thumbHigh: video.snippet?.thumbnails?.high?.url ?? "",
      uploadDate: video.snippet?.publishedAt ?? "",
      publishedAt: video.snippet?.publishedAt ?? "",
      seconds: tryParseInt(video.contentDetails?.duration ?? "0"),
      defaultLanguage: video.snippet?.defaultLanguage ?? "",
      regid: user.uid,
      updid: user.uid,
      upddt: new Date().toISOString(),
    };
  });
  return result;
}
