import React, { useEffect, useState } from "react";
import TikTokEmbed from "./EachViewComponents";

export const Videos = () => {
  const [isLoading, setIsLoading] = useState(true);

  const videoUrls = [
    "https://www.tiktok.com/@thesweetimpact/video/7196739176266550570?is_from_webapp=1&sender_device=pc&web_id=7461986454807021074",
    "https://www.tiktok.com/@tigga_mac/video/7342389302422162706?is_from_webapp=1&sender_device=pc",
    "https://www.tiktok.com/@magallycakess/video/7367159800511335726?is_from_webapp=1&sender_device=pc",
  ];

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading videos...</p>
        </div>
      ) : (
        videoUrls.map((url) => <TikTokEmbed key={url} videoUrl={url} />)
      )}
    </div>
  );
};
