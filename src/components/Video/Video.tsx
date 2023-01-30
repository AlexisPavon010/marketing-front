import React from 'react'

interface VideoProps {
  src: string;
  height?: string | number;
  width?: string | number;
}

export const Video = ({ src, height = '100%', width = '100%' }: VideoProps) => {
  return (
    <video
      width={height}
      height={width}
      controls
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
