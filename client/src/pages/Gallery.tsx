import GalleryArchitecture from "../components/GalleryArchitecture";
import { type GalleryItem } from "../components/GalleryCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const galleryItems: GalleryItem[] = [
  {
    id: "cs50-certificates",
    title: "Harvard CS50 Certificates",
    category: "Certifications",
    date: "2024",
    coverImage: "https://snipboard.io/ouRtJ1.jpg",
    description:
"CS50 is Harvard University's introductory series to computer science and foundational programming.\n\nThe curriculum focuses heavily on algorithmic thinking, robust software engineering principles, and efficient computational problem-solving.",    photos: [
      {
        url: "https://certificates.cs50.io/b4a9cd63-2c4f-4bb5-8564-d2805b2c4473.png?size=letter",
        caption: "CS50x: Introduction to Computer Science",
        link: {
          label: "Verify CS50x Certificate",
          url: "https://cs50.harvard.edu/certificates/b4a9cd63-2c4f-4bb5-8564-d2805b2c4473",
        },
      },
      {
        url: "https://certificates.cs50.io/f44b0314-3ba9-4987-ac05-fc7a0d1f3b9a.png?size=letter",
        caption: "CS50P: Programming with Python",
        link: {
          label: "Verify CS50P Certificate",
          url: "https://cs50.harvard.edu/certificates/f44b0314-3ba9-4987-ac05-fc7a0d1f3b9a",
        },
      },
      {
        url: "https://certificates.cs50.io/4319ecd8-392b-4bac-b5e3-482b90a58ed3.png?size=letter",
        caption: "CS50AI: Introduction to Artificial Intelligence with Python",
        link: {
          label: "Verify CS50AI Certificate",
          url: "https://cs50.harvard.edu/certificates/4319ecd8-392b-4bac-b5e3-482b90a58ed3",
        },
      },
    ],
  },
  {
    id: "CS50 Puzzle Day",
    title: "CS50 Puzzle Day",
    category: "Events",
    date: "2024 - Present",
    coverImage: "https://media.licdn.com/dms/image/v2/D4E22AQHLnAwD6KoiAQ/feedshare-shrink_800/B4EZX8pRFsHkAk-/0/1743700431559?e=2147483647&v=beta&t=km0rXHLBqlijSgAn-ymsPqZ9lgGFzJISp2Ho0CfXxvk",
    description:
      "CS50x Puzzle Day is an annual global event hosted by Harvard University that challenges teams to solve a packet of clever riddles. The entire weekend focuses on pure logic, creative problem-solving, and collaboration to crack unique patterns and word puzzles.",
     photos: [
      {
        url: "https://certificates.cs50.io/4055729e-d947-4368-b9b5-38aac3560e01.png?size=letter",
        caption: "CS50 Puzzle Day 2026 - All Puzzles Completed",
        link: {
          label: "Verify Certificate",
          url: "https://cs50.harvard.edu/certificates/4055729e-d947-4368-b9b5-38aac3560e01",
        },
      },
      {
        url: "https://certificates.cs50.io/8ed2191f-61f8-4f0c-808e-da2dcddcef15.png?size=letter",
        caption: "CS50 Puzzle Day 2025 - All Puzzles Completed",
        link: {
          label: "Verify Certificate",
          url: "https://cs50.harvard.edu/certificates/8ed2191f-61f8-4f0c-808e-da2dcddcef15",
        },
      },
      {
        url: "https://certificates.cs50.io/3d658531-4b73-4b83-8cd4-3ae856a22f0b.png?size=letter",
        caption: "CS50 Puzzle Day 2024 - Majority Puzzles Completed",
        link: {
          label: "Verify Certificate",
          url: "https://cs50.harvard.edu/certificates/3d658531-4b73-4b83-8cd4-3ae856a22f0b",
        },
      },
    ],
    
  },
  {
    id: "Google Skillshop",
    title: "Google Skillshop Certificates",
    category: "Certifications",
    date: "2024",
    coverImage: "https://empresomos.org/wp-content/uploads/2022/05/google-skillshop.jpg",
    description:
      "Google Skillshop is an official training platform that certifies proficiency in Google's core marketing tools, validating advanced skills in campaign optimization, data analysis, and targeted advertising strategies. The certifications displayed verify hands-on expertise in designing high-performing Search campaigns, executing visual Display strategies, and crafting data-driven Creative assets to maximize return on ad spend.",
     photos: [
      {
        url: "https://snipboard.io/c1V6t8.jpg",
        caption: "Google Ads Creative Certification",
        link: {
          label: "Verify Certificate",
          url: "https://skillshop.credential.net/c586f774-bfec-400d-8c56-0d228261eded#acc.1SyjnNEh",
        },
      },
      {
        url: "https://snipboard.io/m0OMs7.jpg",
        caption: "Google Ads Display Certification",
        link: {
          label: "Verify Certificate",
          url: "https://skillshop.credential.net/d6764a93-8c6d-4767-8783-f2b6081ac5ef#acc.yQtGzULO",
        },
      },
      {
        url: "https://snipboard.io/PJyWmI.jpg",
        caption: "Google Ads Search Certification",
        link: {
          label: "Verify Certificate",
          url: "https://skillshop.credential.net/1729175a-9239-47d7-824b-abe88eedce86#acc.ZDUq5ueE",
        },
      },
    ],
    
  },
   {
    id: "Waterloo FLC",
    title: "Waterloo Financial Literacy Competition Certificates",
    category: "Events",
    date: "2024 - 2025",
    coverImage: "https://i.ytimg.com/vi/7Mp6X61RTv0/mqdefault.jpg",
    description:
      "The University of Waterloo's Financial Literacy Competition is a nationwide academic challenge hosted by the School of Accounting and Finance to test and develop core financial intelligence in students. The competition evaluates practical competency across critical economic areas, including personal wealth management, investment principles, budgeting, microeconomics, and foundational corporate accounting.",
     photos: [
      {
        url: "https://snipboard.io/uj9DYA.jpg",
        caption: "2025 Waterloo FLC Gold Certificate",
        
      },
      {
        url: "https://snipboard.io/6fbNYz.jpg",
        caption: "2024 Waterloo FLC Silver Certificate",
    
      },
    ],
    
  },
];

export function Gallery() {
  const header = useScrollReveal();
  const grid = useScrollReveal({ threshold: 0.05 });

  return (
    <main className="max-w-6xl">
      <div ref={header.ref} className={`reveal ${header.isVisible ? "visible" : ""} border-b border-[#d8d1c6] pb-6`}>          
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Gallery</h1>
        <p className="mt-2 max-w-xl text-sm text-[#7c7469]">
          things i've done over the years.
        </p>
      </div>

      <div ref={grid.ref} className={`reveal ${grid.isVisible ? "visible" : ""} mt-8`}>          
        <GalleryArchitecture items={galleryItems} />
      </div>
    </main>
  );
}