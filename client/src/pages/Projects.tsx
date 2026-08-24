import { ProjectCard, type ProjectData } from "../components/ProjectCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  title?: string;
}

export interface ExtendedProjectData extends ProjectData {
  media?: MediaItem[];
}

const projectsData: ExtendedProjectData[] = [
  {
    id: "scaleup",
    title: "ScaleUp",
    shortDescription:
      "Gamified AI music tutor that treats instrument learning like an RPG skill tree using Web Audio API note matching and local posture feedback via MediaPipe.",
    fullDescription: `Submission for Ignition Hacks. \n\nScaleUp is an AI tutor that listens while you play, analyzes your posture, and teaches you in real-time through RPG-style skill trees generated dynamically.

Core Features & Mechanics:
• RPG Skill Trees & Shared Catalog: Choose from instruments (piano, guitar, violin, trumpet, drums, banjo) and unlock nodes. A shared skill catalogue auto-completes overlapping skills so you never re-learn what you know.
• Dynamic Curriculum Generation: Describe any new instrument in plain English and Gemini generates a valid curriculum graph without circular dependencies.
• Real-Time Audio & Pitch Analysis: Web Audio API detects pitch and notes in real time, scoring performance against the score using Dynamic Time Warping (DTW).
• Local Vision Posture Tracking: MediaPipe extracts 33 body pose and 21 hand landmarks directly in-browser to grade posture across 16 rules without transmitting raw video to the cloud.
• Contextual AI Voice Coaching: A WebSocket session streams real-time voice feedback (via Gemini Live API) that intelligently waits for musical phrase boundaries and only interrupts when performance strays.
• Spaced Repetition Practice: Uses an SM-2 spaced repetition algorithm to track technique decay and surface targeted daily practice quests.

Tech Stack & Architecture:
• Frontend: Next.js 15, React 19, Tailwind CSS, @xyflow/react (interactive trees), Three.js, MediaPipe, Web Audio API.
• Backend & AI: FastAPI, Python 3.12, PostgreSQL with pgvector, Redis, Celery, Neo4j (graph traversal), Chroma (vector search), Gemini 2.0 Flash, Gemini Live API.

Key Engineering Challenges:
• Developing an online note matcher using DTW for live coaching rather than post-performance scoring.
• Designing non-intrusive AI voice feedback that respects phrasing and doesn't interrupt flow.
• Creating landmark visibility checks and body-relative measurements in MediaPipe to eliminate posture false positives.`,
    image:
      "https://snipboard.io/Yz4kjW.jpg", // Update thumbnail image as needed
    date: "August 2026",
    tags: [
      "Next.js",
      "React",
      "Python",
      "FastAPI",
      "MediaPipe",
      "Web Audio API",
      "Gemini API",
      "Neo4j",
      "PostgreSQL",
    ],
    teammates: [
      { name: "Saivenkat Jilla", url: "https://www.linkedin.com/in/saivenkat-jilla/" },
      { name: "Nathan Chu", url: "https://www.linkedin.com/in/nc101/" },
      { name: "Arsia Khorramijam", url: "https://www.linkedin.com/in/arsia-khorramijam/" },
    ],
     media: [
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=pG5L6LhzR7Y&t=1s",
        title: "Demo Video",
      },
         
      {
        type: "image",
        url: "https://snipboard.io/UtNXBA.jpg",
        title: "Choose Course",
      },
          {
        type: "image",
        url: "https://snipboard.io/sS3DJN.jpg",
        title: "Course Outline",
      },
       {
        type: "image",
        url: "https://snipboard.io/E4yg1t.jpg",
        title: "3d POV view",
      },
       {
        type: "image",
        url: "https://snipboard.io/ThG05O.jpg",
        title: "Lesson Practice",
      },
       {
        type: "image",
        url: "https://snipboard.io/9mKcPG.jpg",
        title: "Lesson Outline",
      },
       {
        type: "image",
        url: "https://snipboard.io/sUOnJ3.jpg",
        title: "Quartz Sprites - Courtesy of Saivenkat's Sister",
      },
      {
        type: "video",
        url: "https://youtu.be/NuzWK6j_3DI",
        title: "Graph Traversal Used in Skill Tree Generation",
      },
    ],
    githubUrl: "https://github.com/sai3000pro/ScaleUp",
    devpostUrl: "https://hack-hub-base44.base44.app/SubmissionDetail?id=6a8a1cf85e13061b23621386", // Update Devpost URL if available
  },
  {
    id: "sketchime",
    title: "Sketchime - 🏆 Centennial Hacks Winner",
    shortDescription:
      "Accessible digital storytelling tool that turns two hand-drawn keyframe sketches into smooth, continuous AI-animated video clips.",
    fullDescription: ` Won first place at Centennial Hacks 2026 and MLH Best Use of Gemini API Award.  
  
Sketchime is an accessible digital storytelling platform that transforms hand-drawn keyframes into smooth, continuous animated sequences without requiring advanced animation skills or expensive software.

Core Features & Mechanics:
• Hand-Drawn Keyframe Interpolation: Users draw a starting and ending image on a custom digital canvas with onion-skinning support to define motion endpoints.
• Multi-Agent "Board of Directors": Powered by Google Gemini, four distinct AI agents evaluate the drawn frames and ask targeted questions about timing, camera angles, character motion, and backgrounds to compile a hyper-detailed video prompt.
• Style-Preserving Video Generation: Passes keyframes and compiled prompts to generative video models (including Google Veo) to create 5-second smooth transitions while strictly preserving the user's original 2D hand-drawn line style.
• Storyboard Timeline Chain: Automatically links scenes sequentially by matching the start frame of a new clip to the end frame of the previous one, allowing users to reorder clips, re-render scenes, or export as MP4/GIF.

Tech Stack & Architecture:
• Frontend & Canvas: Next.js, React, TypeScript, HTML5 Canvas API (custom vector-based stroke rendering), LocalStorage/IndexedDB (client-side state persistence).
• Backend & AI Orchestration: Next.js Server Routes, Google Gemini API (multi-agent motion prompt synthesis), Google Veo API (video generation & frame interpolation).

Key Engineering Challenges:
• Preserving original stroke styles, line weights, and character proportions across raw 2D sketch keyframe transformations.
• Managing client-side canvas state continuity, onion-skinning, and real-time frame syncing across multi-clip timelines.
• Fine-tuning multi-agent Gemini system prompts to extract precise motion dynamics without burdening the user.`,
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/111/601/datas/gallery.jpg",
    teammates: [
      { name: "Eric Chen", url: "https://ericzxchen.com/" },
      { name: "Andrew Miller", url: "https://devpost.com/AndrewMiller22" },
    ],
    media: [
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=ACJfFWRHw_g",
        title: "Demo Video",
      },
    ],
    date: "August 2026",
    tags: ["Next.js", "React", "TypeScript", "Gemini API", "Google Veo", "HTML5 Canvas"],
    githubUrl: "https://github.com/ericchen356/sketchime",
    devpostUrl: "https://devpost.com/software/sketchime",
  },
  {
    id: "pitchify",
    title: "Pitchify",
    shortDescription:
      "AI-powered pitch training platform inspired by Shark Tank featuring multi-agent AI investors and computer vision delivery analysis.",
    fullDescription: `Submission for Hack the Valley's Hack Day.\n\nPitchify is an AI-powered pitch training platform inspired by Shark Tank that gives entrepreneurs and students a realistic environment to practice startup ideas, answer tough investor questions, and refine their presentation skills.
Core Features & Mechanics:
• The Pitch & Q&A: Users have 3 minutes to present their idea to 4 distinct AI investor agents (financial, technical, logistical, strategic) who independently evaluate the pitch and ask targeted follow-up questions.
• Multimodal Delivery Analysis: Beyond text evaluation, computer vision tracks physical posture, movement, tone, confidence, and vocal clarity to provide holistic performance feedback.
• Virtual 3D Stage: Features interactive 3D judge avatars rendered on a digital stage with low-latency voice synthesis.

Tech Stack & Architecture:
• Frontend & 3D: Next.js, React, TypeScript, Three.js, Meshy (3D models)
• Backend & AI: Python, Gemini API (multi-agent orchestration), OpenCV (vision tracking), Fish Audio (speech synthesis)

Key Engineering Challenges:
• Minimizing audio latency for natural real-time Q&A pacing.
• Synchronizing Next.js frontend state with Python backend vision and speech processing.
• Precision prompt engineering to ensure distinct, non-repetitive investor agent personalities.`,
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/005/024/333/datas/medium.png",
    teammates: [
      { name: "Kevin Hou", url: "https://www.linkedin.com/in/kevin-hou-244b222ab/" },
      { name: "Ayaan Sajjad", url: "https://ayaansajjad.ca/" },
      { name: "Awsaf Syed", url: "https://www.awsaf.dev/" },
    ],
    date: "July 2026",
    media: [
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=e_ImMWfW6L0",
        title: "Live Demo Video",
      },
      {
        type: "video",
        url: "https://youtu.be/CTCnh2mnMcc",
        title: "Showcase Video",
      },
      {
        type: "image",
        url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/024/639/datas/gallery.jpg",
        title: "Landing Page",
      },
      {
        type: "image",
        url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/024/640/datas/gallery.jpg",
        title: "Product Input",
      },
      {
        type: "image",
        url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/024/652/datas/gallery.jpg",
        title: "Judging Panel",
      },
      {
        type: "image",
        url: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/005/024/653/datas/gallery.jpg",
        title: "Summary",
      },
    ],
    tags: ["Next.js", "Python", "Gemini API", "OpenCV", "Three.js", "TypeScript"],
    githubUrl: "https://github.com/nordicator/pitchify",
    devpostUrl: "https://devpost.com/software/pitchify",
  },
  {
    id: "f1-predictor",
    title: "F1 Race Predictor",
    shortDescription: "A machine learning web application predicting Formula 1 qualifying and race outcomes with interactive telemetry-driven confidence scoring.",
    fullDescription: `An end-to-end Formula 1 forecasting web app designed to predict qualifying and race finishing positions for upcoming Grand Prix events. By analyzing historical lap times, driver performance trends, and telemetry data ingested through the FastF1 API, the app provides data-driven race insights alongside confidence scores and statistical variance metrics.

Core Features & Highlights:
• Machine Learning Pipeline: Trained a Random Forest Regressor using Scikit-learn, achieving high predictive accuracy with an R² value of ~0.91 and a Mean Squared Error (MSE) of 2.894 across race position evaluations.
• Model Interpretability: Integrated SHAP (SHapley Additive exPlanations) to analyze feature importance across driver historical forms, qualifying grid order, and team performance metrics.
• High-Performance Backend: Built a lightweight FastAPI server with Pydantic data validation and Joblib serialization to deliver low-latency prediction endpoints.
• F1-Inspired Responsive UI: Designed a sleek, dark-themed React + Vite interface with driver image previews, dual qualifying/race prediction comparisons, and mobile-optimized local development networking.`,
    image:
      "https://raw.githubusercontent.com/LMRW5/f1-project-app/refs/heads/main/image-3.png",
    date: "July 2025 - August 2025",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Scikit-Learn",
      "Pandas",
      "FastF1",
    ],
    githubUrl: "https://github.com/LMRW5/f1-project-app",
    media: [{
      type: "video",
      url: "https://youtu.be/XBGPeUSpk7Y",
      title: "Demo Video",
    }],
  },
  {
    "id": "cs50ai-nim-q-learning",
    "title": "Autonomous Reinforcement Learning Agent for Nim",
    "shortDescription": "A model-free Reinforcement Learning agent built with Tabular Q-Learning to master the game of Nim through 10,000+ self-play simulations.",
    "fullDescription": "A model-free Reinforcement Learning system developed for CS50AI (Harvard's Introduction to Artificial Intelligence with Python). \n\nNim is a mathematical game of strategy where two players take turns removing items from distinct piles, and the player forced to take the very last item loses. Using Tabular Q-Learning, this AI agent starts with zero prior knowledge of the game rules or strategies, autonomously developing an optimal, unbeatable gaming policy through thousands of iterative self-play games. The training loop features a completely customizable architecture, allowing users to dynamically adjust the number of training simulations to scale the agent's accuracy and depth.\n\nEngineering Highlights & Mathematical Foundations:\n- Q-Learning Framework: Implemented temporal-difference Q-value updates, balancing learning rates (alpha) and discount factors (gamma) to calculate real-time state-action rewards.\n- Exploration vs. Exploitation: Built an epsilon-greedy action selection engine that decays exploration rates over time, allowing the agent to initially experiment with random moves before locking into high-value exploitation strategies.\n- Dynamic State Space Modeling: Represented game environments and legal move transformations using immutable tuple dictionaries, tracking thousands of dynamic state-action pairs across varying pile counts.\n- Scalable Training Configurations: Coded an adaptable training pipeline where the default 10,000 self-play iterations can be easily adjusted to profile policy accuracy against computational training times.\n- Sparse Reward System: Modeled immediate terminal feedback loops (penalizing loss states and rewarding win states) to backpropagate strategic choices back to early-game moves across autonomous self-play iterations.\n\nDue to the policy of the course, code will only be available upon request for academic integrity reasons.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/f6/NimGame.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    "date": "November 2024",
    "tags": [
      "Python",
      "Reinforcement Learning",
      "Q-Learning",
      "Algorithms",
      "CS50AI"
    ],
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/rKGiR4JISaw",
        "title": "Demo Video"
      }
    ]
  },
  {
    "id": "cs50ai-degrees-bfs",
    "title": "Six Degrees of Separation Finder",
    "shortDescription": "A graph-search application utilizing Breadth-First Search (BFS) to discover the shortest path between Hollywood actors through shared movie credits.",
    "fullDescription": "A data-driven graph navigation system developed for CS50AI (Harvard's Introduction to Artificial Intelligence with Python). The application solves the 'Six Degrees of Kevin Bacon' problem by mapping relationships between actors as a network graph, where actors are nodes and shared movie roles are the connecting edges. Using optimized search algorithms, the system instantly calculates the absolute shortest path of connection between any two individuals in a massive IMDb-sourced dataset.\n\nEngineering Highlights & Algorithmic Foundations:\n- Graph Search Implementation: Engineered a memory-efficient Breadth-First Search (BFS) algorithm to guarantee the discovery of the optimal, shortest connection path between nodes.\n- Advanced Data Structures: Utilized node wrappers, frontier queues, and explored sets to manage state distributions and completely eliminate infinite loop redundancies during traversal.\n- CSV Data Parsing: Processed large relational CSV datasets containing thousands of actor profiles and movie records, programmatically mapping them into fast-lookup Python dictionaries.\n- Performance Optimization: Designed the frontier management system to prioritize evaluation steps, minimizing RAM consumption and query execution latency even when processing deep connections.\n\nDue to the policy of the course, code will only be available upon request for academic integrity reasons.",
    "image": "https://miro.medium.com/v2/1*6rJ2T1-LG0PXemMY85HMJw.png",
    "date": "August 2024",
    "tags": [
      "Python",
      "Graph Theory",
      "Breadth-First Search",
      "Algorithms",
      "CS50AI"
    ],
    "media": [{ "type": "video", "title": "Demo Video", "url": "https://youtu.be/os6gsyaobyE" }]
  },
  {
    id: "cs50-blackjack",
    title: "Blackjack Web App",
    shortDescription: "A full-stack, session-managed Blackjack web application built with Python Flask, SQL, and Jinja templates as my CS50x final capstone project.",
    fullDescription: `A full-stack web application for playing interactive Blackjack, built as my capstone project for CS50x (Harvard's Introduction to Computer Science). Expanding on backend design principles from CS50's Finance assignment, the app handles complete game state management, user authentication, and transaction history tracking.

Core Features & Technical Architecture:
• Full-Stack Architecture: Built using Python (Flask) for server-side routing, SQLite for data persistence, and HTML5/CSS3/Jinja2 for dynamic template rendering.
• Game Mechanics & Logic: Designed object-oriented modules (\`Deck\` and \`Hand\` classes) in Python to handle shuffling, card dealing, dynamic Ace valuation (1 or 11), and a randomized dealer AI strategy with hit/stand thresholds.
• Session & Route Security: Implemented server-side session variables and custom POST-redirect patterns to protect active hands, prevent URL manipulation during live games, and maintain real-time chip counts.
• Database & Financial History: Engineered relational SQLite tables (\`Users\` and \`History\`) to securely store hashed credentials, track win/loss payouts, and log timestamped balance changes.`,
    image: "https://i.snipboard.io/tY4O9Z.jpg",
    date: "May 2024",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "JavaScript",
      "HTML/CSS",
      "Jinja2",
      "CS50X"
    ],
    githubUrl: "https://github.com/LMRW5/Blackjack/tree/main/project",
    media: [
      {
        type: "video",
        url: "https://www.youtube.com/watch?v=XSfJeFS25Us",
        title: "Demo Video",
      },
    ],
  }
];

export function Projects() {
  const header = useScrollReveal();
  const grid = useScrollReveal({ threshold: 0.05 });

  return (
    <div className="space-y-8">
      <div ref={header.ref} className={`reveal ${header.isVisible ? "visible" : ""} pb-6`}>          
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Projects</h1>
        <p className="mt-2 max-w-xl text-sm text-[#7c7469]">
          cool things i developed and co-developed.
        </p>
      </div>

      {/* 2-column grid layout */}
      <div ref={grid.ref} className={`reveal ${grid.isVisible ? "visible" : ""} grid grid-cols-1 gap-5 sm:grid-cols-2`}>          
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project as ProjectData} />
        ))}
      </div>
    </div>
  );
}