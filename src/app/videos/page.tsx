import ApiVideoClient from "@api.video/nodejs-client";
import Link from "next/link";

export default async function Videos() {
  const videoClient = new ApiVideoClient({
    apiKey: "API_KEY_GOES_HERE",
  });
  const videos = await videoClient.videos.list();
  return (
    <>
      <div>Videos</div>
      {videos.data.length === 0 && (
        <Link href="/">No videos! Upload one here!</Link>
      )}
      {videos.data.map((video, i) => (
        <>
          <img
            src={`https://vod.api.video/vod/${video.videoId}/thumbnail.jpg`}
            width="100"
            height="100"
            alt=""
          />
          <Link key={i} href={`videos/${video.videoId}`}>
            {video.title}
          </Link>
        </>
      ))}
    </>
  );
}
