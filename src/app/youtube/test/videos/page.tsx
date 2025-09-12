import { fetchYoutubeVideo } from "@/actions/youtube.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { tryParseInt } from "@/utils/common.utils";
import { youtube_v3 } from "@googleapis/youtube";

interface SihVideo {
  vid: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  defaultLanguage: string;
  title: string;
  description: string;
  publishDate: string | null;
  thumbLow: string | null;
  thumbMid: string | null;
  thumbHigh: string | null;
  commentCount: number | null;
  favoriteCount: number | null;
  likeCount: number | null;
  viewCount: number | null;
  durationStr: string | null;
}

export default async function Videos() {
  const videos: youtube_v3.Schema$VideoListResponse = await fetchYoutubeVideo("LUBp05v52ao");
  console.log("videos ::: ", videos);
  const result: SihVideo[] | undefined = videos.items?.map((v, i) => {
    return {
      vid: v.id!,
      channelId: v.snippet?.channelId ?? "",
      channelTitle: v.snippet?.channelTitle ?? "",
      defaultAudioLanguage: v.snippet?.defaultAudioLanguage ?? "",
      defaultLanguage: v.snippet?.defaultLanguage ?? "",
      title: v.snippet?.title ?? "",
      description: v.snippet?.description ?? "",
      publishDate: v.snippet?.publishedAt ?? "",
      durationStr: v.contentDetails?.duration ?? "",
      thumbLow: v.snippet?.thumbnails?.default?.url ?? "",
      thumbMid: v.snippet?.thumbnails?.medium?.url ?? "",
      thumbHigh: v.snippet?.thumbnails?.high?.url ?? "",
      commentCount: tryParseInt(v.statistics?.commentCount ?? ""),
      favoriteCount: tryParseInt(v.statistics?.favoriteCount ?? ""),
      likeCount: tryParseInt(v.statistics?.likeCount ?? ""),
      viewCount: tryParseInt(v.statistics?.viewCount ?? ""),
    };
  });
  console.log("shivideo scheme : ", result);

  return (
    <Card>
      <CardHeader>Youtube Video Scheme</CardHeader>
      <CardContent>
        <p className="text-wrap">{JSON.stringify(result)}</p>
      </CardContent>
    </Card>
  );
}
