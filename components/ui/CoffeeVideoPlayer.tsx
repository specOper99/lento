'use client';

import { useRef, useState } from 'react';

interface CoffeeVideoPlayerProps {
  locale: string;
}

export function CoffeeVideoPlayer({ locale }: CoffeeVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative rounded-2xl shadow-2xl overflow-hidden group">
      {/* Outer decorative frame */}
      <div className="absolute inset-0 rounded-2xl border-4 border-secondary pointer-events-none z-20" />
      
      <video 
        ref={videoRef}
        className="w-full aspect-[4/3] md:aspect-video object-cover rounded-2xl"
        autoPlay 
        muted
        playsInline
        onEnded={handleVideoEnd}
        poster="/videos/coffee-animation-poster.jpg"
      >
        <source src="/videos/coffee-animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
        {/* Play/Pause & Replay Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full border border-white/30 hover:bg-black/80 hover:border-white/50 transition-all shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          {/* Replay Button (shows when video ended) */}
          {!isPlaying && (
            <button
              onClick={replayVideo}
              className="flex items-center justify-center w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full border border-white/30 hover:bg-black/80 hover:border-white/50 transition-all shadow-lg"
              aria-label="Replay"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>
          )}
        </div>
        
        {/* Sound Control */}
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 hover:bg-black/80 hover:border-white/50 transition-all shadow-lg"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <span className="text-sm font-medium text-white">
                {locale === 'ar' ? 'أفضل مع الصوت' : 'Better with sound'}
              </span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <span className="text-sm font-medium text-white">
                {locale === 'ar' ? 'كتم الصوت' : 'Mute'}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
