import React, { use, useEffect, useState } from "react";
import TikTokEmbed from "./EachViewComponents";
import { ApiResponse } from "@/helpers/apiResponse";
import { VideoModel } from "@/db/models/VideoModel";
import axios from "axios";
import toast from "react-hot-toast";

export const Videos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = React.useState<VideoModel[] | null>(null);

  // Function to fetch all videos
  const fetchAllVideos = async () => {
    const response = await axios.get<ApiResponse<VideoModel[]>>(
      "/api/video/fetchAll",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setVideos(response.data.data);
    } else {
      toast.error("Unable to fetch videos. Please try again later.", {
        duration: 3000,
      });
      setVideos(null);
    }
  };

  useEffect(() => {
    fetchAllVideos();
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading videos...</p>
        </div>
      ) : (
        <>
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <TikTokEmbed key={video.id} videoUrl={video.videoUrl} />
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>No videos available.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
