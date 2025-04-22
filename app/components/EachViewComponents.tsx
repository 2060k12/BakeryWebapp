"use client";

import { useEffect } from "react";

interface TikTokEmbedProps {
  videoUrl: string;
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ videoUrl }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="tiktok-embed "
      cite={videoUrl}
      data-video-id={videoUrl.split("/video/")[1]}
    >
      <a href={videoUrl}></a>
    </blockquote>
  );
};

export default TikTokEmbed;
