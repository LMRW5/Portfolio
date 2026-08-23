import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaExpand,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaUserFriends,
  FaCalendarAlt,
} from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface Teammate {
  name: string;
  url?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  date?: string; // e.g. "July 2026" or "Jan 2024 - Present"
  media?: MediaItem[];
  extraImages?: string[];
  tags: string[];
  teammates?: Teammate[];
  githubUrl?: string;
  devpostUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

// Helper functions for YouTube processing
function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
    : null;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsOpen(false);
    setSelectedIndex(null);
    navigate("/projects");
  };

  // Consolidate main image and media items into a single array for navigation
  const allMedia: MediaItem[] = [
    {
      type: "image",
      url: project.image,
      title: `${project.title} - Main Cover`,
    },
    ...(project.media
      ? project.media
      : project.extraImages
      ? project.extraImages.map((url, idx) => ({
          type: "image" as const,
          url,
          title: `${project.title} - Screenshot ${idx + 1}`,
        }))
      : []),
  ];

  const galleryItems = allMedia.slice(1);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % allMedia.length);
    }
  }, [selectedIndex, allMedia.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + allMedia.length) % allMedia.length);
    }
  }, [selectedIndex, allMedia.length]);

  // Keyboard controls for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const currentMedia = selectedIndex !== null ? allMedia[selectedIndex] : null;

  return (
    <>
      {/* Rectangular Card Container */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative flex flex-col overflow-hidden border border-[#d8d1c6] bg-[#faf8f4] cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:border-[#b64b32] hover:shadow-[0_8px_30px_rgba(182,75,50,0.12),6px_6px_0_#d8d1c6] animate-fade-up"
      >
        <div className="relative h-48 w-full overflow-hidden bg-[#e7e1d8]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#1b1a18]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#1b1a18] transition-all duration-300 group-hover:text-[#b64b32] group-hover:translate-x-1">
                {project.title}
              </h3>
              {project.date && (
                <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-[#7c7469]">
                  <FaCalendarAlt className="text-[10px] text-[#b64b32]" />
                  {project.date}
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7c7469]">
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-b border-[#d8a08f] pb-0.5 font-mono text-[10px] uppercase tracking-wide text-[#b64b32]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Project Modal Overlay */}
      {isOpen && createPortal(
        <div
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1a18]/55 p-4 backdrop-blur-sm animate-fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#d8d1c6] bg-[#faf8f4] p-6 text-[#1b1a18] shadow-[8px_8px_0_#d8d1c6]"
          >
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-[#7c7469] transition-all duration-300 hover:bg-[#e7e1d8] hover:text-[#1b1a18] hover:rotate-90 hover:scale-110"
            >
              <FaTimes className="text-base" />
            </button>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 animate-fade-up">
              <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
              {project.date && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#7c7469]">
                  <FaCalendarAlt className="text-[#b64b32]" />
                  {project.date}
                </span>
              )}
            </div>

            {/* Teammates / Collaborators Section */}
            {project.teammates && project.teammates.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs text-[#7c7469]">
                <FaUserFriends className="shrink-0 text-[#b64b32]" />
                <span className="font-medium">Built with:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.teammates.map((member, index) => (
                    <span key={member.name} className="inline-flex items-center gap-1">
                      {member.url ? (
                        <a
                          href={member.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-[#b64b32] hover:underline"
                        >
                          {member.name}
                          <FaExternalLinkAlt className="text-[9px] opacity-70" />
                        </a>
                      ) : (
                        <span className="font-medium text-[#4f4a43]">
                          {member.name}
                        </span>
                      )}
                      {index < project.teammates!.length - 1 && <span>•</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clickable Main Cover Image */}
            <div
              onClick={() => setSelectedIndex(0)}
              className="group relative mt-4 h-64 w-full cursor-pointer overflow-hidden border border-[#d8d1c6] bg-[#e7e1d8]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#1b1a18]/35 text-xs font-medium text-[#faf8f4] opacity-0 transition-opacity group-hover:opacity-100">
                <FaExpand /> Click to expand
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#b64b32]">
                About the Project
              </h4>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#4f4a43]">
                {project.fullDescription}
              </p>
            </div>

            {/* Clickable Media Gallery */}
            {galleryItems.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Screenshots & Media Gallery
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {galleryItems.map((item, index) => {
                    const globalIndex = index + 1;
                    const thumbUrl =
                      item.thumbnail ||
                      (item.type === "video" ? getYouTubeThumbnail(item.url) : item.url) ||
                      item.url;

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedIndex(globalIndex)}
                        className="group relative h-32 w-full cursor-pointer overflow-hidden border border-[#d8d1c6] bg-[#e7e1d8]"
                      >
                        <img
                          src={thumbUrl}
                          alt={item.title || `${project.title} media ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#1b1a18]/45 p-2 text-center text-xs font-medium text-[#faf8f4] opacity-0 transition-opacity group-hover:opacity-100">
                          {item.type === "video" ? (
                            <FaPlay className="text-lg text-[#d8a08f]" />
                          ) : (
                            <FaExpand />
                          )}
                          {item.title && (
                            <span className="line-clamp-2 text-[10px] opacity-90">{item.title}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer Links & Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d8d1c6] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-b border-[#d8a08f] pb-0.5 font-mono text-[10px] uppercase tracking-wide text-[#b64b32]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[#d8d1c6] bg-[#e7e1d8] px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:bg-[#d8d1c6] hover:scale-105 btn-ripple"
                  >
                    <FaGithub className="text-sm" /> GitHub
                  </a>
                )}
                {project.devpostUrl && (
                  <a
                    href={project.devpostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-[#d8a08f] px-3 py-1.5 text-xs font-medium text-[#b64b32] transition-all duration-300 hover:bg-[#f0ddd5] hover:scale-105 btn-ripple"
                  >
                    <SiDevpost className="text-sm" /> Devpost
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#1b1a18] px-3 py-1.5 text-xs font-medium text-[#f4f1eb] transition-all duration-300 hover:bg-[#b64b32] hover:scale-105 btn-ripple"
                  >
                    <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fullscreen Lightbox Overlay with Navigation */}
      {currentMedia && selectedIndex !== null && createPortal(
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-between bg-[#1b1a18]/95 p-6 backdrop-blur-md animate-fade-in duration-150"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-[#4f4a43] p-3 text-[#f4f1eb] transition-colors hover:bg-[#b64b32]"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Media Display Area */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto max-w-4xl max-h-[75vh] w-full flex items-center justify-center"
          >
            {/* Previous Arrow Button */}
            {allMedia.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute -left-4 z-20 rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] shadow-lg transition-transform hover:scale-110 hover:bg-[#b64b32] md:-left-12"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-base" />
              </button>
            )}

            {currentMedia.type === "video" ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black">
                {getYouTubeEmbedUrl(currentMedia.url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(currentMedia.url)!}
                    title={currentMedia.title || "Video Player"}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={currentMedia.url}
                    controls
                    autoPlay
                    className="w-full h-full rounded-xl object-contain"
                  />
                )}
              </div>
            ) : (
              <img
                src={currentMedia.url}
                alt="Expanded preview"
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            )}

            {/* Next Arrow Button */}
            {allMedia.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute -right-4 z-20 rounded-full border border-[#7c7469] bg-[#4f4a43] p-3 text-[#f4f1eb] shadow-lg transition-transform hover:scale-110 hover:bg-[#b64b32] md:-right-12"
                aria-label="Next image"
              >
                <FaChevronRight className="text-base" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Navigation Controls & Description */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex w-full max-w-lg flex-col items-center gap-2"
          >
            {allMedia.length > 1 && (
              <div className="flex items-center gap-4 border border-[#7c7469] bg-[#4f4a43] px-4 py-1.5 text-xs text-[#f4f1eb] shadow-lg">
                <button
                  onClick={handlePrev}
                  className="p-1 hover:text-white transition-colors"
                >
                  <FaChevronLeft />
                </button>
                <span className="font-mono">
                  {selectedIndex + 1} / {allMedia.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1 hover:text-white transition-colors"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}

            {currentMedia.title && (
              <div className="w-full border border-[#7c7469] bg-[#4f4a43] px-4 py-2 text-center text-xs font-medium text-[#f4f1eb] shadow-lg">
                {currentMedia.title}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}