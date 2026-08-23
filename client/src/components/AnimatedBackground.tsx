import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Normalize scroll to 0-1 range (caps around 1200px of scroll)
  const progress = Math.min(scrollY / 1200, 1);

  // Subtle grain position shift
  const grainX = progress * 30;
  const grainY = progress * -20;

  // Gentle gradient rotation based on scroll
  const gradientAngle = 135 + progress * 15;

  // Very subtle warm tint shift
  const warmOpacity = 0.02 + progress * 0.015;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Grain / noise texture that shifts with scroll */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundPosition: `${grainX}px ${grainY}px`,
          transition: "background-position 0.1s linear",
        }}
      />

      {/* Subtle warm gradient orb that moves with scroll */}
      <div
        className="absolute -top-[20%] -right-[10%] h-[60vh] w-[60vh] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, rgba(182,75,50,${warmOpacity}) 0%, transparent 70%)`,
          transform: `translateY(${progress * 80}px)`,
          transition: "transform 0.1s linear, background 0.1s linear",
        }}
      />

      {/* Second softer orb, opposite corner */}
      <div
        className="absolute -bottom-[15%] -left-[10%] h-[50vh] w-[50vh] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, rgba(216,160,143,${warmOpacity * 0.7}) 0%, transparent 70%)`,
          transform: `translateY(${-progress * 60}px)`,
          transition: "transform 0.1s linear, background 0.1s linear",
        }}
      />

      {/* Subtle animated diagonal line pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(${gradientAngle}deg, transparent, transparent 40px, rgba(27,26,24,0.5) 40px, rgba(27,26,24,0.5) 41px)`,
          transition: "background-image 0.1s linear",
        }}
      />
    </div>
  );
}
