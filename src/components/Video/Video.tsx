interface VideoProps {
  src: string;
  height?: string | number;
  width?: string | number;
  aspectRatio?: string | number;
}

export const Video = ({ src, height = '100%', width = '100%', aspectRatio = '9 / 16' }: VideoProps) => {
  return (
    <div style={{
      maxWidth: width,
      maxHeight: height,
      aspectRatio: aspectRatio,
    }}>
      <video
        style={{
          width: '100%'
        }}
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
