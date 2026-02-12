import React from "react";

const BackgroundVideo = ({ src, overlayClass = "bg-black/60" }) => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`${overlayClass} absolute inset-0 pointer-events-none`} />
    </div>
  );
};

export default BackgroundVideo;
