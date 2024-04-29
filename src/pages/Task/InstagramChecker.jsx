import React from 'react';

const VideoDownloader = () => {
  const handleDownload = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sparrowsports.com/image/file_example_MP4_480_1_5MG.mp4", true);
    xhr.responseType = "blob";
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = "video.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        window.URL.revokeObjectURL(url);
      }
    };
  
    xhr.send();
  };
  
  

  return (
    <button onClick={handleDownload}>
      Download Video
    </button>
  );
};

export default VideoDownloader;
