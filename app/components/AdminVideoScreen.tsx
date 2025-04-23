import { VideoModel } from "@/db/models/VideoModel";
import { ApiResponse } from "@/helpers/apiResponse";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const AdminVideoScreen = () => {
  const [videos, setVideos] = React.useState<VideoModel[] | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string>("");
  const handleUploadVideo = async (videoUrl: string) => {
    if (!videoUrl) return;

    try {
      const response = await axios.post<ApiResponse<object>>(
        "/api/video/upload",
        { videoUrl },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        toast.success("Video uploaded successfully!", {
          duration: 3000,
        });
        fetchAllVideos();
      } else {
        toast.error("Unable to upload video. Please try again later.", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Error uploading video. Please try again.", {
        duration: 3000,
      });
    }
  };

  // Function to handle video deletion
  const handleDeleteVideo = (id: string) => {
    if (!id) return;

    axios
      .delete<ApiResponse<object>>("/api/video/delete", {
        data: { id },
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Video deleted successfully!", {
            duration: 3000,
          });
          fetchAllVideos();
        } else {
          toast.error("Unable to delete video. Please try again later.", {
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
        toast.error("Error deleting video. Please try again.", {
          duration: 3000,
        });
      });
  };

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

  React.useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="flex flex-col font-bold text-xl col-span-3 py-4 px-4 rounded-sm ">
      <h1 className="font-bold text-2xl my-2">Manage Videos</h1>
      <div className="flex flex-col gap-4">
        {videos &&
          videos.map((video) => (
            <div
              key={video.id}
              className="md:flex md:flex-row justify-between items-center border-1 p-4 rounded-2xl overflow-clip"
            >
              <p>{video.videoUrl}</p>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                className="md:mt-0 mt-4 py-2 px-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          ))}

        <div className="flex flex-row justify-between gap-2">
          <input
            type="text"
            placeholder="Enter video URL"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <button
            className="py-2 w-full px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={() => {
              handleUploadVideo(videoUrl);
              setVideoUrl("");
            }}
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminVideoScreen;
