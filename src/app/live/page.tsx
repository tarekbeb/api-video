"use client";

import ApiVideoClient from "@api.video/nodejs-client";
import ApiVideoPlayer from "@api.video/react-player";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

type PlayerViewProps = {
  params: { liveStreamId: string };
};

export default function PlayerView({ params }: PlayerViewProps) {
  const [liveStream, setLiveStream] = useState<any>(undefined);
  const webcamRef = useRef<any>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    const createLiveStream = async () => {
      const apiVideoClient = new ApiVideoClient({
        apiKey: "API_KEY_GOES_HERE",
      });

      const liveStream = await apiVideoClient.liveStreams.create({
        _public: true,
        name: "Cory from corys world",
        record: false,
      });
      return liveStream;
    };
    createLiveStream().then((stream) => {
      setLiveStream(stream);
    });
  }, []);

  const handleStartStreaming = async () => {
    console.log("webcamRef", webcamRef);
    if (!isStreaming && webcamRef.current && webcamRef.current.stream) {
      try {
        const stream = webcamRef.current.stream;
        // Attach the webcam stream to the live stream
        const mediaRecorder = new MediaRecorder(stream);
        // mediaRecorder.ondataavailable = async (event) => {
        //   if (event.data.size > 0) {
        //     await liveStream.upload(event.data);
        //   }
        // };

        mediaRecorder.start();
        setIsStreaming(true);
      } catch (error) {
        console.error("Error while starting the live stream:", error);
      }
    }
  };

  const handleStopStreaming = async () => {
    if (isStreaming && webcamRef.current && webcamRef.current.stream) {
      try {
        const mediaRecorder = new MediaRecorder(webcamRef.current.stream);
        mediaRecorder.stop();
        setIsStreaming(false);
      } catch (error) {
        console.error("Error while stopping the live stream:", error);
      }
    }
  };

  return (
    <>
      {isStreaming ? (
        <button onClick={handleStopStreaming}>Stop Streaming</button>
      ) : (
        <button onClick={handleStartStreaming}>Start Streaming</button>
      )}
      <h2>This is Webcam capture</h2>
      <Webcam
        audio={false}
        height={300}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <br></br>
      <h2>This is playback from api.video</h2>
      {liveStream ? (
        <ApiVideoPlayer
          video={{ id: "li3hw63Wb6f1h3WnStQruKAS" }}
          style={{ width: 500, height: 300 }}
          autoplay={true}
          hideControls={true}
          loop={true}
        />
      ) : (
        "no live stream present"
      )}
    </>
  );
}
