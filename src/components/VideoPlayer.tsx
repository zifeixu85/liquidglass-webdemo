import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  appleUrl: string;
  youtubeId?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description,
  duration,
  thumbnail,
  appleUrl,
  youtubeId
}) => {
  const [showModal, setShowModal] = useState(false);

  const handlePlay = () => {
    if (youtubeId) {
      setShowModal(true);
    } else {
      window.open(appleUrl, '_blank');
    }
  };

  return (
    <>
      <div className="glass-card overflow-hidden group cursor-pointer" onClick={handlePlay}>
        <div className={`h-40 ${thumbnail} relative flex items-center justify-center`}>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
          <div className="absolute top-4 right-4 bg-black/30 px-2 py-1 rounded text-white text-sm">
            {duration}
          </div>
          {youtubeId && (
            <div className="absolute top-4 left-4 bg-red-600/80 px-2 py-1 rounded text-white text-xs font-medium">
              YouTube
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-white/50 text-xs">
              {youtubeId ? 'Play in modal' : 'Open in Apple Developer'}
            </span>
            <ExternalLink className="w-4 h-4 text-white/50" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="glass-card overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=0&iv_load_policy=3&cc_load_policy=0&playsinline=1&color=white&autohide=1&loop=1&playlist=${youtubeId}`}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};