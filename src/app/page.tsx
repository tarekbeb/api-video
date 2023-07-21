"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { VideoUploader } from "@api.video/video-uploader";
import Link from "next/link";
import ApiVideoPlayer from "@api.video/react-player";
import ApiVideoClient from "@api.video/nodejs-client";

export default function Home() {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [uploadToken, setUploadToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const apiVideoClient = new ApiVideoClient({
      apiKey: "API_KEY_GOES_HERE",
    });

    const getUploadToken = async () => {
      const uploadToken = await apiVideoClient.uploadTokens.createToken({
        ttl: 56,
      });
      setUploadToken(uploadToken.token);
      Promise.resolve(uploadToken);
    };
    getUploadToken();
  }, []);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) return;
    try {
      setUploading(true);
      setVideoId(undefined);

      const videoUploader = new VideoUploader({
        uploadToken: uploadToken ?? "NO TOKEN",
        file: event.currentTarget.files[0],
      });
      videoUploader.onProgress((e) =>
        setProgress(Math.round((e.uploadedBytes * 100) / e.totalBytes))
      );
      videoUploader.onPlayable((e) => setVideoId(e.videoId));
      await videoUploader.upload();
    } catch (error) {
      console.error("Error trying to upload a video:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main>
      <h1>Upload a video</h1>
      <input type="file" onChange={handleFile} />
      <div>
        {uploading && progress < 100 && `Video uploaded at ${progress}%`}
        {progress >= 100 && !videoId && "Wait a second..."}
        {videoId && "Your video is ready 🎉"}
      </div>
      {videoId && (
        <ApiVideoPlayer
          video={{ id: videoId }}
          style={{ width: 500, height: 300 }}
        />
      )}
    </main>
  );
}
