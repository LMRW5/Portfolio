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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1a18]/55 p-4 backdrop-blur-sm"
        >
          {/* Modal Card Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-y-auto border border-[#d8d1c6] bg-[#faf8f4] text-[#1b1a18] shadow-[8px_8px_0_#d8d1c6]"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#d8d1c6] bg-[#faf8f4]/95 p-4 backdrop-blur-sm">
              <div>
                <h2 className="text-base font-semibold text-[#1b1a18]">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-[#7c7469]">
                  {selectedItem.category} • {selectedItem.date}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer rounded-full p-1.5 text-[#7c7469] transition-colors hover:bg-[#e7e1d8] hover:text-[#1b1a18]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Media Display Area */}
            <div className="group relative flex min-h-[260px] flex-1 items-center justify-center overflow-hidden bg-[#e7e1d8]">
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
                className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-[#1b1a18]/35 text-xs font-medium text-[#faf8f4] opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Maximize2 size={16} />
                <span>Click to expand</span>
              </div>

              {/* Navigation Arrows */}
              {selectedItem.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-[#7c7469] bg-[#4f4a43] p-2 text-[#f4f1eb] shadow-md transition-all duration-200 hover:scale-110 hover:bg-[#b64b32] active:scale-95"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-[#7c7469] bg-[#4f4a43] p-2 text-[#f4f1eb] shadow-md transition-all duration-200 hover:scale-110 hover:bg-[#b64b32] active:scale-95"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Info */}
            <div className="flex flex-col gap-2 border-t border-[#d8d1c6] bg-[#faf8f4] p-4">
              <div className="flex items-center justify-between gap-4">
                {selectedItem.photos.length > 1 && (
                  <span className="font-mono text-xs text-[#7c7469]">
                    {activePhotoIndex + 1} / {selectedItem.photos.length}
                  </span>
                )}

                {activeLink && (
                  <a
                    href={activeLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-[#b64b32] transition-colors hover:underline"
                  >
                    {activeLink.label}
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {currentPhoto?.caption && (
                <p className="text-xs italic text-[#7c7469]">
                  {currentPhoto.caption}
                </p>
              )}

              <p className="text-sm leading-relaxed text-[#4f4a43]">
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
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#1b1a18]/95 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-[#4f4a43] p-3 text-[#f4f1eb] transition-all duration-200 hover:scale-105 hover:bg-[#b64b32]"
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
              <p className="max-w-xl border border-[#7c7469] bg-[#4f4a43] px-4 py-2 text-center text-xs text-[#f4f1eb] sm:text-sm">
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
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] shadow-xl transition-all duration-200 hover:scale-110 hover:bg-[#b64b32] active:scale-95 md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] shadow-xl transition-all duration-200 hover:scale-110 hover:bg-[#b64b32] active:scale-95 md:right-8"
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