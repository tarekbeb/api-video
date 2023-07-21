"use client";

import ApiVideoPlayer from "@api.video/react-player";

type PlayerViewProps = {
  params: { videoId: string };
};

export default function PlayerView({ params }: PlayerViewProps) {
  return (
    <ApiVideoPlayer
      video={{ id: params.videoId }}
      style={{ width: 500, height: 300 }}
      autoplay={true}
      hideControls={true}
      loop={true}
    />
  );
}
