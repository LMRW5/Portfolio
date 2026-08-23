import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
      className="group relative cursor-pointer overflow-hidden border border-[#d8d1c6] bg-[#faf8f4] transition-all duration-400 hover:-translate-y-1.5 hover:border-[#b64b32] hover:shadow-[0_8px_30px_rgba(182,75,50,0.12),6px_6px_0_#d8d1c6] animate-fade-up"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#e7e1d8]">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-[#7c7469]">
          <span>{item.category}</span>
          <span>{item.date}</span>
        </div>
        <h3 className="font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#1b1a18] transition-all duration-300 group-hover:text-[#b64b32] group-hover:translate-x-1">
          {item.title}
        </h3>
        {item.photos.length > 1 && (
          <div className="mt-3 flex items-center gap-1 text-xs text-[#7c7469]">
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
      {createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1a18]/55 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
        <div
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#d8d1c6] bg-[#faf8f4] p-6 text-[#1b1a18] shadow-[8px_8px_0_#d8d1c6]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#7c7469] transition-colors hover:bg-[#e7e1d8] hover:text-[#1b1a18]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="mb-4 pr-8">
            <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wider text-[#7c7469]">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#1b1a18]">{item.title}</h2>
            {item.description && (
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#4f4a43]">{item.description}</p>
            )}
          </div>

          {/* Media Viewer Frame */}
<div className="group relative flex min-h-[280px] items-center justify-center border border-[#d8d1c6] bg-[#e7e1d8]">
  <img
    src={currentMedia.url}
    alt={currentMedia.alt || item.title}
    onClick={() => setIsExpanded(true)}
    className="mx-auto h-auto max-h-[50vh] w-full cursor-pointer object-contain"
  />

  {/* Explicit Enlarge Button */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setIsExpanded(true);
    }}
    className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 border border-[#7c7469] bg-[#1b1a18]/85 px-3 py-1.5 text-xs font-medium text-[#f4f1eb] shadow-lg transition-all hover:bg-[#b64b32]"
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
        className="absolute left-3 z-20 rounded-full border border-[#7c7469] bg-[#4f4a43] p-2 text-[#f4f1eb] transition-colors hover:bg-[#b64b32]"
        aria-label="Previous photo"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 z-20 rounded-full border border-[#7c7469] bg-[#4f4a43] p-2 text-[#f4f1eb] transition-colors hover:bg-[#b64b32]"
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
              <p className="text-sm italic text-[#7c7469]">
                {currentMedia.caption}
              </p>
            ) : (
              <div />
            )}

            {hasMultipleMedia && (
              <span className="self-end text-xs font-medium text-[#7c7469] sm:self-center">
                {currentIndex + 1} / {item.photos.length}
              </span>
            )}
          </div>

          {/* Link Section */}
          {(currentMedia.link || item.link) && (
            <div className="mt-6 flex justify-end border-t border-[#d8d1c6] pt-4">
              <a
                href={(currentMedia.link || item.link)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#b64b32] hover:underline"
              >
                {(currentMedia.link || item.link)?.label || "View Details"}
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>,
        document.body
      )}

      {/* Fullscreen Expanded View Overlay */}
      {isExpanded && createPortal(
        <div
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#1b1a18]/95 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setIsExpanded(false)}
        >
          {/* Top Bar Controls */}
          <div
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[70%] truncate text-sm font-medium text-[#f4f1eb]">
              {item.title} {hasMultipleMedia && `(${currentIndex + 1}/${item.photos.length})`}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="rounded-full bg-[#4f4a43] p-2 text-[#f4f1eb] transition-colors hover:bg-[#b64b32]"
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
                  className="absolute left-2 rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] transition-colors hover:bg-[#b64b32] sm:left-4"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] transition-colors hover:bg-[#b64b32] sm:right-4"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption Container */}
          <div
            className="z-10 mx-auto w-full max-w-3xl border border-[#7c7469] bg-[#4f4a43] p-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-[#f4f1eb]">
              {currentMedia.caption || item.description || item.title}
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default GalleryCard;