import { useState, useEffect, useCallback } from "react";
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
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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
        className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/60 dark:border-slate-700/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
      >
        <div className="relative h-44 w-full overflow-hidden bg-slate-900/10 dark:bg-slate-950/40">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-blue-500">
                {project.title}
              </h3>
              {project.date && (
                <span className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <FaCalendarAlt className="text-[10px] text-slate-400" />
                  {project.date}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-mono font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Project Modal Overlay */}
      {isOpen && (
        <div
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-slate-900 dark:text-slate-100"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FaTimes className="text-base" />
            </button>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
              {project.date && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  <FaCalendarAlt className="text-slate-400" />
                  {project.date}
                </span>
              )}
            </div>

            {/* Teammates / Collaborators Section */}
            {project.teammates && project.teammates.length > 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <FaUserFriends className="text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="font-medium">Built with:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.teammates.map((member, index) => (
                    <span key={member.name} className="inline-flex items-center gap-1">
                      {member.url ? (
                        <a
                          href={member.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          {member.name}
                          <FaExternalLinkAlt className="text-[9px] opacity-70" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-700 dark:text-slate-300">
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
              className="group relative mt-4 h-64 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                <FaExpand /> Click to expand
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                About the Project
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
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
                        className="group relative h-32 w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950/20 cursor-pointer"
                      >
                        <img
                          src={thumbUrl}
                          alt={item.title || `${project.title} media ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white text-xs font-medium gap-1">
                          {item.type === "video" ? (
                            <FaPlay className="text-lg text-blue-400" />
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
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-mono font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    <FaGithub className="text-sm" /> GitHub
                  </a>
                )}
                {project.devpostUrl && (
                  <a
                    href={project.devpostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 text-xs font-medium hover:bg-teal-500/20 transition-colors"
                  >
                    <SiDevpost className="text-sm text-teal-600 dark:text-teal-400" /> Devpost
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Overlay with Navigation */}
      {currentMedia && selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-between p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-150"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-10 p-3 rounded-full text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
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
                className="absolute -left-4 md:-left-12 z-20 p-3 rounded-full text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 shadow-lg transition-transform hover:scale-110"
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
                className="absolute -right-4 md:-right-12 z-20 p-3 rounded-full text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 shadow-lg transition-transform hover:scale-110"
                aria-label="Next image"
              >
                <FaChevronRight className="text-base" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Navigation Controls & Description */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex flex-col items-center gap-2 max-w-lg w-full"
          >
            {allMedia.length > 1 && (
              <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-xs text-slate-300">
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
              <div className="px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-center text-xs font-medium text-slate-300 shadow-lg backdrop-blur-sm w-full">
                {currentMedia.title}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}