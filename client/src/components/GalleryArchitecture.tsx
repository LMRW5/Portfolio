import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import GalleryCard, { type GalleryItem } from "./GalleryCard";

interface GalleryArchitectureProps {
  items: GalleryItem[];
}

export const GalleryArchitecture: React.FC<GalleryArchitectureProps> = ({ items }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setActivePhotoIndex(0);
    setIsExpanded(false);
  };

  const handleClose = useCallback(() => {
    setSelectedItem(null);
    setActivePhotoIndex(0);
    setIsExpanded(false);
    navigate("/gallery");
  }, [navigate]);

  const handleNext = useCallback(() => {
    if (!selectedItem) return;
    setActivePhotoIndex((prev) => (prev + 1) % selectedItem.photos.length);
  }, [selectedItem]);

  const handlePrev = useCallback(() => {
    if (!selectedItem) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedItem.photos.length - 1 : prev - 1
    );
  }, [selectedItem]);

  // Keyboard controls: Escape to close/navigate, Arrows for photo carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          handleClose();
        }
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, isExpanded, handleClose, handleNext, handlePrev]);

  // Active photo and link resolution
  const currentPhoto = selectedItem?.photos[activePhotoIndex];
  const activeLink = currentPhoto?.link || selectedItem?.link;

  return (
    <>
      {/* Gallery Grid (1-column on mobile, 3-columns on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} onClick={() => openModal(item)} />
        ))}
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedItem && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          {/* Modal Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/90 sticky top-0 z-10">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-neutral-400">
                  {selectedItem.category} • {selectedItem.date}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Media Display Area */}
            <div className="group relative flex-1 bg-black flex items-center justify-center min-h-[260px] overflow-hidden">
              {currentPhoto && (
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.alt || currentPhoto.caption || selectedItem.title}
                  onClick={() => setIsExpanded(true)}
                  className="max-h-[50vh] w-auto object-contain select-none cursor-pointer"
                />
              )}

              <div
                onClick={() => setIsExpanded(true)}
                className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-black/30 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Maximize2 size={16} />
                <span>Click to expand</span>
              </div>

              {/* Navigation Arrows */}
              {selectedItem.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 active:scale-95 border border-transparent hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-md"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 active:scale-95 border border-transparent hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-md"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Info */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                {selectedItem.photos.length > 1 && (
                  <span className="text-xs text-neutral-500 font-mono">
                    {activePhotoIndex + 1} / {selectedItem.photos.length}
                  </span>
                )}

                {activeLink && (
                  <a
                    href={activeLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors ml-auto"
                  >
                    {activeLink.label}
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {currentPhoto?.caption && (
                <p className="text-xs italic text-neutral-400">
                  {currentPhoto.caption}
                </p>
              )}

              <p className="text-sm text-neutral-300">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Expanded View */}
      {selectedItem && currentPhoto && isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-neutral-800/80 p-3 text-white transition-all duration-200 hover:bg-neutral-700 hover:scale-105 cursor-pointer"
            aria-label="Close expanded image"
          >
            <X size={20} />
          </button>

          {/* Centered Image + Caption Container */}
          <div 
            onClick={(event) => event.stopPropagation()}
            className="flex flex-col items-center max-h-[90vh] max-w-full gap-3"
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.alt || currentPhoto.caption || selectedItem.title}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            {(currentPhoto.caption || currentPhoto.alt || selectedItem.title) && (
              <p className="text-center text-xs sm:text-sm text-neutral-300 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 px-4 py-2 rounded-lg max-w-xl">
                {currentPhoto.caption || currentPhoto.alt || selectedItem.title}
              </p>
            )}
          </div>

          {/* Navigation Arrows */}
          {selectedItem.photos.length > 1 && (
            <>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-neutral-800/80 p-3 text-white shadow-xl transition-all duration-200 cursor-pointer hover:scale-110 hover:bg-neutral-700 hover:border-neutral-600 border border-transparent active:scale-95 md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-neutral-800/80 p-3 text-white shadow-xl transition-all duration-200 cursor-pointer hover:scale-110 hover:bg-neutral-700 hover:border-neutral-600 border border-transparent active:scale-95 md:right-8"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryArchitecture;