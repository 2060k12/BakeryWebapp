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
    try {
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

      // ✅ Hold the loading screen for an extra 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      toast.error("Something went wrong while fetching videos.");
      setVideos(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
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
