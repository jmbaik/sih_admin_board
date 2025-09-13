"use server";

import { youtube, youtube_v3 } from "@googleapis/youtube";

/***
 * 채널별로 플레이리스트 뽑기
#재생목록#list#yt_playlist.json
중요포인트 ::: 
  items>id -> playlistId
    >snippet>publishedAt
    >snippet>channelId 
    >snippet>title 
    >snippet>thumbnails>default, medium, high
    >contentDetails>itemsCount 
itemsCount가 0보다 큰경우 추출

curl \
  'https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&part=snippet&channelId=UCb8eXF4XpCpTmudMvFKFSxg&maxResults=50&key=[YOUR_API_KEY]' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
***/

const yt = youtube({
  version: "v3",
  auth: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
});

async function getYoutubePlayList(channelId: string, pageToken: string) {
  const response = await yt.playlists.list({
    part: ["contentDetails", "snippet"],
    channelId,
    maxResults: 50,
    pageToken,
  });
  const schema: youtube_v3.Schema$PlaylistListResponse = response.data;
  return schema;
}

export async function fetchAllPlaylist(channelId: string) {
  let result: youtube_v3.Schema$Playlist[] = [];
  let _nextPageToken = "";
  const initResponse = await getYoutubePlayList(channelId, _nextPageToken);
  _nextPageToken = initResponse.nextPageToken ?? "";
  result = initResponse.items ?? [];

  while (_nextPageToken !== "") {
    const response = await getYoutubePlayList(channelId, _nextPageToken);
    _nextPageToken = response.nextPageToken ?? "";
    result = [...result, ...(response.items ?? [])];
  }
  return result;
}

/***
 * playlistitem vid 구함 
 *  vid: contentDetails>videoId
 *  publishedAt: contentDetails>videoPublishedAt
 * channelId: snippet>channelId
 * title: snippet>title
 * description : snippet>description
 * thumnails: snippet>thumbnails>default,medium,high
 * playlistId: snippet>playlistId
 * 
    curl \
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&part=status&maxResults=50&playlistId=PLwYfRyUAnqHCeDHCUvSDv17cGf2RZZKfS&key=[YOUR_API_KEY]' \
      --header 'Accept: application/json' \
      --compressed

 */
async function getYoutubePlayListItem(playlistId: string, pageToken: string) {
  const response = await yt.playlistItems.list({
    part: ["contentDetails", "snippet"],
    playlistId,
    maxResults: 50,
    pageToken,
  });
  const rtn: youtube_v3.Schema$PlaylistItemListResponse = response.data;
  return rtn;
}

export async function fetchAllPlaylistItem(playlistId: string) {
  let result: youtube_v3.Schema$PlaylistItem[] = [];
  let _nextPageToken = "";
  const initResponse = await getYoutubePlayListItem(playlistId, _nextPageToken);

  _nextPageToken = initResponse.nextPageToken ?? "";
  result = initResponse.items ?? [];

  while (_nextPageToken !== "") {
    const response = await getYoutubePlayListItem(playlistId, _nextPageToken);
    _nextPageToken = response.nextPageToken ?? "";
    result = [...result, ...(response.items ?? [])];
  }
  return result;
}

/***
 * video 
 * 
 curl \
  'https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=statistics&id=UTWsXQTagAE&id=MDzOiHB6FQA&id=uzhLH66QS5U&id=5m4Id9zWxW4&id=9Fn7RDWRmrQ&maxResults=50&key=[YOUR_API_KEY]' \
  --header 'Authorization: Bearer [YOUR_ACCESS_TOKEN]' \
  --header 'Accept: application/json' \
  --compressed
 */

async function getYoutubeVideos(videos: string[], pageToken: string) {
  const response = await yt.videos.list({
    part: ["contentDetails", "snippet", "statistics"],
    id: videos,
    maxResults: 50,
    pageToken,
  });
  const rtn: youtube_v3.Schema$VideoListResponse = response.data;
  return rtn;
}

export async function fetchAllVideos(videos: string[]) {
  let result: youtube_v3.Schema$Video[] = [];
  let _nextPageToken = "";
  const initResponse = await getYoutubeVideos(videos, _nextPageToken);

  _nextPageToken = initResponse.nextPageToken ?? "";
  result = initResponse.items ?? [];

  while (_nextPageToken !== "") {
    const response = await getYoutubeVideos(videos, _nextPageToken);
    _nextPageToken = response.nextPageToken ?? "";
    result = [...result, ...(response.items ?? [])];
  }
  return result;
}
