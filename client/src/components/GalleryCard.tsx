import React, { useEffect, useState } from "react";
import { Images, X, ChevronLeft, ChevronRight, ExternalLink, Maximize2, Minimize2 } from "lucide-react";

export interface GalleryMedia {
  url: string;
  caption?: string;
  alt?: string;
  link?: {
    label: string;
    url: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  description: string;
  photos: GalleryMedia[];
  link?: {
    label: string;
    url: string;
  };
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-all hover:scale-[1.02] hover:border-neutral-700"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-1">
          <span>{item.category}</span>
          <span>{item.date}</span>
        </div>
        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        {item.photos.length > 1 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
            <Images size={14} />
            <span>{item.photos.length} photos</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface GalleryModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Reset state when item changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsExpanded(false);
    }
  }, [isOpen, item]);

  const currentMedia = item?.photos[currentIndex] || (item ? { url: item.coverImage } : null);
  const hasMultipleMedia = (item?.photos.length || 0) > 1;

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!item) return;
    setCurrentIndex((prev) => (prev - 1 + item.photos.length) % item.photos.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!item) return;
    setCurrentIndex((prev) => (prev + 1) % item.photos.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft" && hasMultipleMedia) {
        handlePrev();
      } else if (e.key === "ArrowRight" && hasMultipleMedia) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isExpanded, hasMultipleMedia, item]);

  if (!isOpen || !item || !currentMedia) return null;

  return (
    <>
      {/* Standard Modal View */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="mb-4 pr-8">
            <div className="flex justify-between items-center text-xs text-neutral-400 uppercase tracking-wider mb-1">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
            {item.description && (
              <p className="text-sm text-neutral-300 mt-2">{item.description}</p>
            )}
          </div>

          {/* Media Viewer Frame */}
<div className="relative group rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center min-h-[280px]">
  <img
    src={currentMedia.url}
    alt={currentMedia.alt || item.title}
    onClick={() => setIsExpanded(true)}
    className="w-full h-auto max-h-[50vh] object-contain mx-auto cursor-pointer rounded-xl"
  />

  {/* Explicit Enlarge Button */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setIsExpanded(true);
    }}
    className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black/95 text-white text-xs font-medium backdrop-blur-md border border-neutral-700 transition-all shadow-lg"
    title="Click to enlarge image"
  >
    <Maximize2 size={14} />
    <span>Enlarge</span>
  </button>

  {/* Carousel Controls */}
  {hasMultipleMedia && (
    <>
      <button
        onClick={handlePrev}
        className="absolute left-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm transition-colors border border-neutral-800"
        aria-label="Previous photo"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm transition-colors border border-neutral-800"
        aria-label="Next photo"
      >
        <ChevronRight size={20} />
      </button>
    </>
  )}
</div>

          {/* Caption & Counter */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            {currentMedia.caption ? (
              <p className="text-sm text-neutral-400 italic">
                {currentMedia.caption}
              </p>
            ) : (
              <div />
            )}

            {hasMultipleMedia && (
              <span className="text-xs font-medium text-neutral-500 self-end sm:self-center">
                {currentIndex + 1} / {item.photos.length}
              </span>
            )}
          </div>

          {/* Link Section */}
          {(currentMedia.link || item.link) && (
            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
              <a
                href={(currentMedia.link || item.link)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline"
              >
                {(currentMedia.link || item.link)?.label || "View Details"}
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Expanded View Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setIsExpanded(false)}
        >
          {/* Top Bar Controls */}
          <div
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white font-medium text-sm truncate max-w-[70%]">
              {item.title} {hasMultipleMedia && `(${currentIndex + 1}/${item.photos.length})`}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full transition-colors"
              aria-label="Exit enlarged view"
            >
              <Minimize2 size={20} />
            </button>
          </div>

          {/* Central Image View */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentMedia.url}
              alt={currentMedia.alt || item.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation Buttons inside Expanded View */}
            {hasMultipleMedia && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 backdrop-blur-sm transition-colors border border-neutral-700"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 backdrop-blur-sm transition-colors border border-neutral-700"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption Container */}
          <div
            className="w-full max-w-3xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 text-center backdrop-blur-sm z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-neutral-200">
              {currentMedia.caption || item.description || item.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryCard;