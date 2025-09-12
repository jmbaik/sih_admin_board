import { fetchData } from "@/utils/axios/axios.utils";

export async function getYoutubeVideos() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const apiUrl = "https://www.googleapis.com/youtube/v3/search";
  // UCP7ZxuXP4w6TODC_np5Q_IA
  const channelID = "UCP7ZxuXP4w6TODC_np5Q_IA";
  try {
    const data = await fetch(`${apiUrl}?key=${apiKey}&channelId= ${channelID}&order=date&part=snippet`);
    if (!data.ok) {
      throw Error("failed to fetch videos");
    }
    return data.json;
  } catch (error) {
    throw new Error("An error eccured while fetching the videos");
  }
}

export async function getYoutubeVideo() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const apiUrl = "https://youtube.googleapis.com/youtube/v3/videos";
  // UCP7ZxuXP4w6TODC_np5Q_IA
  const videoId = "LUBp05v52ao";
  try {
    //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=LUBp05v52ao&key=[YOUR_API_KEY] HTTP/1.1
    const data = await fetchData(`${apiUrl}?key=${apiKey}&part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`);
    console.log("apiUrl ::: ", apiUrl);
    console.log("data ::: ", data);

    return data;
  } catch (error) {
    console.log(error);
  }
}
