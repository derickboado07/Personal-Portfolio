export type ProjectScreenshot = {
  src: string;
  alt: string;
  title: string;
  description: string;
  group: string;
  width: number;
  height: number;
};

export type Project = {
  platform: "web" | "mobile";
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  status: string;
  technologies: string[];
  accent: "indigo" | "coffee" | "cyan" | "coral";
  github?: string;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
  screenshots?: ProjectScreenshot[];
  caseStudyNote?: string;
  context?: string;
  contribution?: string;
  capabilities?: { title: string; description: string }[];
};

export const profile = {
  name: "Mark Frederick Boado",
  displayName: "Derick Boado",
  firstName: "Derick",
  location: "Caloocan City, Philippines",
  education: "BS Information Technology",
  school: "Global Reciprocal Colleges",
  educationNote: "Fourth-year BSIT student",
  brandStatement: "Turning ideas into digital experiences through code, data, and creativity.",
  introduction: "I’m Derick, an aspiring developer in Caloocan City. I build practical web systems, explore business data with Power BI, and communicate ideas through video and visuals.",
  biography: "My name is Mark Frederick Boado, but friends call me Derick. I’m a fourth-year BS Information Technology student at Global Reciprocal Colleges. I enjoy figuring out how things work—and how to make them more useful for the people who rely on them.",
  approach: "Building ARAT Coffee’s ordering and inventory system connected programming to real business needs. Studying Power BI taught me to ask what the data is telling us. Editing videos gives me another way to make an idea clear. Those three interests shape how I work: build the tool, understand the information, and communicate it well.",
  enrollmentProject: "Our GRC Connect team capstone explores an automated enrollment system with predictive analytics, bringing together enrollment, schedules, advising, and approvals. I contributed to process analysis, planning, requirements, and system diagrams. The project is undergoing major revisions.",
  roles: ["Aspiring Web Developer", "Software Developer", "Business Analytics Practitioner", "Video Editor"],
  availability: "Seeking an internship or entry-level opportunity",
  opportunitySummary: "My first priority is a web development, software development, or IT internship or entry-level role. I’m also interested in business and data analytics opportunities, and open to freelance websites, business systems, Power BI dashboards, and creative content.",
  // Add confirmed contact details. Empty values never render as dead links.
  email: "derickboado1@gmail.com",
  links: { github: "https://github.com/derickboado07", linkedin: "", videoPortfolio: "" },
  // Add an actual file under public/assets, then set e.g. /assets/derick-boado-cv.pdf.
  cvPath: "",
  portrait: "",
  portraitAlt: "Portrait of Mark Frederick (Derick) Boado",
};

export const disciplines = [
  { id: "development", label: "THE DEVELOPER", title: "Build something useful.", description: "I develop websites and database-driven systems with real business workflows in mind. ARAT Coffee made ordering, stock, and sales more than classroom concepts.", footnote: "WEBSITES / BUSINESS SYSTEMS / DATABASES" },
  { id: "analytics", label: "THE ANALYTICAL MIND", title: "Ask what the data means.", description: "Through coursework with Microsoft Power BI, I’ve explored sales trends, revenue, and product categories using Power Query, DAX measures, and interactive reports.", footnote: "POWER BI / DATA VISUALIZATION / REPORTING" },
  { id: "creative", label: "THE CREATIVE", title: "Make the idea connect.", description: "I work with video sequencing, text overlays, transitions, and music to shape a clear message. Photoshop and social media materials are part of that creative toolkit.", footnote: "VIDEO / PHOTOSHOP / DIGITAL CONTENT" },
] as const;

export const personalDetails = [
  { id: "faith", label: "FAITH & COMMUNITY", title: "Showing up for others.", description: "At CCF Grace Park, I serve in ministries and lead and facilitate youth discipleship groups. It’s a place where I keep learning to listen, communicate, and take responsibility." },
  { id: "music", label: "MUSIC", title: "Finding the right sound.", description: "I play electric guitar and keyboard, participate in worship-related activities, and enjoy experimenting with guitar effects. Music shapes my sense of timing and the mood I look for in an edit." },
  { id: "basketball", label: "BASKETBALL", title: "Better as a team.", description: "Basketball has been part of my life since I was younger. Serving as a team captain taught me discipline, perseverance, and how much leadership depends on the people around you." },
  { id: "business", label: "ENTREPRENEURSHIP", title: "Learning by running it.", description: "I started a small Graham Nest dessert business. Working through sales, costs, and customer relationships gave me a more personal understanding of what small businesses need." },
] as const;

export const personalValues = ["Faith", "Family", "Creativity", "Discipline", "Continuous learning", "Helping others"];

export const analytics = {
  title: "A system captures the data. The next question is what it means.",
  introduction: "I became interested in business analytics because I wanted to understand how data could help a business make better decisions. My Power BI experience comes from academic coursework and hands-on work with datasets.",
  connection: "ARAT Coffee brought the connection into focus: an ordering system records transactions, but sales reporting helps explain the business behind them. I want to keep building both sides of that picture.",
  tools: ["Microsoft Power BI", "Power Query", "DAX", "Interactive report filters"],
  workflow: [
    { title: "Prepare the data", description: "Clean, organize, and transform datasets with Power Query before building a report." },
    { title: "Find the business question", description: "Explore revenue, compare product categories, and look for sales trends using measures and filters." },
    { title: "Make the insight readable", description: "Bring the analysis into interactive dashboards, charts, and business reports that are easier to understand." },
  ],
  // Add actual Power BI report images and a real public report URL when ready.
  reportImage: "",
  reportImageAlt: "",
  reportUrl: "",
  status: "Academic practice · report examples to be added",
};

export const creativePractice = {
  introduction: "I enjoy shaping promotional content, short-form videos, social media materials, and visual presentations. My experience in business and real estate has helped me see how the way we present an idea affects how people understand it.",
  musicConnection: "Playing electric guitar and keyboard influences how I edit. I pay attention to the relationship between a cut, the music, and the mood of a message.",
  skills: ["Video sequencing", "Text overlays & transitions", "Music synchronization", "Short-form content", "Adobe Photoshop"],
  publicationNote: "I’m selecting completed work for this collection. Posters remain illustrative until the final videos and thumbnails are added.",
};

export type NavigationItem = {
  label: string;
  id: string;
  children?: { label: string; id: string }[];
};

export const navigation: NavigationItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about", children: [{ label: "More About Me", id: "more-about-me" }, { label: "Journey", id: "journey" }] },
  { label: "Projects", id: "projects", children: [{ label: "Web Development", id: "web-development" }, { label: "Mobile Application", id: "mobile-application" }, { label: "Video Works", id: "video-work" }] },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export const projects: Project[] = ([
  {
    platform: "web", slug: "enrollment-system", number: "02", title: "A Development of an Automated Enrollment System with Predictive Analytics", shortTitle: "Enrollment, reimagined.",
    category: "TEAM CAPSTONE · UNDER REFINEMENT", overview: "A team-based academic capstone exploring a more connected enrollment process at Global Reciprocal Colleges.",
    problem: "Enrollment involves interconnected student records, course requirements, and schedules. Managing these independently can make planning difficult.",
    solution: "Our team is developing an enrollment system spanning student records, advising assistance, prerequisite checks, schedule recommendations, digital forms, approval tracking, and reporting. The technical stack includes PHP, JavaScript, MySQL, and Python, with FastAPI planned for the machine-learning service. The project underwent final defense in October 2026 and requires major revisions to refine its extensive scope.",
    role: "Team contributor · analysis & planning", status: "Major revisions in progress", technologies: ["PHP", "JavaScript", "MySQL", "Python", "FastAPI · planned"], accent: "indigo",
    liveUrl: "https://www.grc-enrollment.tech/",
    image: "/assets/projects/grc-enrollment/01-grc-connect-home.jpg",
    imageAlt: "GRC Connect home showing Global Reciprocal Colleges branding and enrollment, schedule, and statement-of-account workspaces",
    caseStudyNote: "This team-based academic capstone underwent final defense in October 2026 and is undergoing major revisions following feedback on its scope. It is shown here under the working name GRC Connect, as used in the supplied system screenshots. It remains an academic system under refinement; predictive analytics and the planned FastAPI service are part of its development scope. Some workspaces on the project website may require an authorized account.",
    context: "A team academic project, shaped by the complexity of enrollment across student classifications, offices, and approval procedures.",
    contribution: "My contribution includes analyzing the manual enrollment process, contributing to system planning and requirements, preparing system diagrams, and working with the development environment for technical components.",
    screenshots: [
      { src: "/assets/projects/grc-enrollment/01-grc-connect-home.jpg", alt: "GRC Connect home with enrollment and schedule workspace cards", title: "One place to begin", description: "The GRC Connect home brings role-specific academic workspaces into one starting point.", group: "Overview", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/02-student-select-section.jpg", alt: "Student enrollment interface for choosing a class section", title: "Section selection", description: "A student-facing workspace for reviewing and selecting an enrollment section.", group: "Student experience", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/03-student-irregular-schedule-options.jpg", alt: "Irregular student schedule options in the enrollment workspace", title: "Room for different schedules", description: "Schedule options support the needs of irregular students during enrollment.", group: "Student experience", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/04-student-enrollment-status.jpg", alt: "Student enrollment status and progress interface", title: "A clearer enrollment status", description: "Students can review their enrollment progress and the current state of their application.", group: "Student experience", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/05-student-weekly-schedule.jpg", alt: "Weekly class schedule displayed as a student timetable", title: "The week at a glance", description: "A weekly timetable brings class schedules into a familiar calendar view.", group: "Student experience", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/06-student-certificate-of-registration.jpg", alt: "Certificate of registration view in GRC Connect", title: "Registration, documented", description: "The student workspace includes a certificate-of-registration view.", group: "Student experience", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/07-chair-predictive-schedule-planning.jpg", alt: "Academic chairperson workspace for predictive schedule planning", title: "Planning the next schedule", description: "A predictive planning workspace brings scheduling considerations together for academic review.", group: "Academic planning", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/08-chair-advising-conflict-check.jpg", alt: "Academic advising interface with a schedule conflict-check panel", title: "Advising with context", description: "An advising workspace supports reviewing student schedules and checking for conflicts.", group: "Academic planning", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/09-chair-enrollment-analytics.jpg", alt: "Enrollment analytics dashboard for academic planning", title: "Enrollment in perspective", description: "Enrollment analytics provide a dedicated view for examining patterns and planning considerations.", group: "Academic planning", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/10-registrar-enrollment-approvals.jpg", alt: "Registrar workspace listing enrollment submissions for review and approval", title: "A focused approval workflow", description: "A registrar workspace organizes enrollment submissions for review and approval.", group: "Registrar workflows", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/11-registrar-enrollment-dashboard.jpg", alt: "Registrar enrollment dashboard with an overview of enrollment activity", title: "An operational overview", description: "The enrollment dashboard brings registrar activity into a consolidated interface.", group: "Registrar workflows", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/12-registrar-ched-reports.jpg", alt: "Registrar CHED reporting interface with report export options", title: "Reporting from the same workspace", description: "CHED reporting screens include CSV and Excel export options for academic records.", group: "Registrar workflows", width: 1280, height: 800 },
      { src: "/assets/projects/grc-enrollment/13-mobile-enrollment.jpg", alt: "GRC Connect enrollment interface arranged for a mobile screen", title: "Enrollment on a smaller screen", description: "A mobile enrollment view keeps the workflow accessible in a narrow viewport.", group: "Mobile", width: 780, height: 1688 },
    ],
  },
  {
    platform: "web", slug: "arat-coffee", number: "01", title: "ARAT Coffee — Smart Ordering and Inventory System", shortTitle: "Good coffee. Better flow.",
    category: "BUSINESS WEB APPLICATION", overview: "A website and business system I developed to connect ARAT Coffee’s orders, inventory, and sales reporting.",
    problem: "Orders change stock levels, and transactions generate sales data. A useful business system needs to keep those pieces connected so daily operations and reporting make sense together.",
    solution: "I developed ARAT Coffee’s website and web-based Smart Ordering and Inventory System using PHP, JavaScript, HTML, CSS, MySQL, and Chart.js. It brings ordering and transactions, inventory monitoring, sales reporting, product and menu management, and administrative tools into one system. Real-time inventory management and sales reporting are the two core features.",
    role: "Website & system developer", status: "Developed business system", technologies: ["PHP", "JavaScript", "HTML / CSS", "MySQL", "Chart.js"], accent: "coffee",
    context: "A practical business project that connected my interest in programming with the day-to-day needs of a coffee business.",
    contribution: "I developed the website and web-based system, connecting the ordering workflow, database, inventory management, and sales reporting. This project helped me understand how technical decisions support real business processes.",
    caseStudyNote: "ARAT Coffee is a business web application I developed, with real-time inventory management and sales reporting at its core. The preview above is illustrative artwork; actual project screenshots are still to be added.",
    capabilities: [
      { title: "Real-time inventory", description: "Monitor inventory and manage stock as part of the ordering and transaction workflow." },
      { title: "Sales reporting", description: "Track sales and present business performance through dashboard views and reports." },
      { title: "Daily operations", description: "Manage orders, transactions, products, menu items, and administrative tasks in a connected system." },
    ],
  },
  {
    platform: "web", slug: "smartload", number: "03", title: "SmartLoad", shortTitle: "A smarter academic load.",
    category: "EDUCATION · PROTOTYPE", overview: "Exploring a more structured way to assign faculty teaching loads.",
    problem: "Faculty load assignment requires balancing teaching responsibilities with academic requirements and evaluation.",
    solution: "A PHP and MySQL prototype exploring faculty load assignment with AI-assisted evaluation. Outputs require human review; the prototype is not presented as a production decision system.",
    role: "Student developer", status: "Prototype", technologies: ["PHP", "MySQL", "AI-assisted evaluation"], accent: "cyan",
  },
  {
    platform: "mobile", slug: "flutter-firebase", number: "04", title: "Flutter / Firebase Applications", shortTitle: "Small screens. Big ideas.",
    category: "MOBILE · STUDENT PROJECTS", overview: "Hands-on explorations of connected, interactive mobile experiences.",
    problem: "Mobile applications need interfaces that are easy to navigate, alongside reliable authentication and data flows.",
    solution: "Student projects using Flutter and Dart for interactive mobile interfaces, with Firebase Authentication and Firestore for connected app features.",
    role: "Student developer", status: "Student projects", technologies: ["Flutter", "Dart", "Firebase", "Firestore"], accent: "coral",
  },
] satisfies Project[]).sort((first, second) => Number(first.number) - Number(second.number));

export const videoCategories = ["All work", "Event Highlights", "Promotional Videos", "Social Media Edits", "Worship & Church Media", "Motion Graphics"] as const;
export type VideoCategory = (typeof videoCategories)[number];
export type Video = {
  id: string;
  title: string;
  category: Exclude<VideoCategory, "All work">;
  description: string;
  poster: string;
  // Local /assets/*.mp4 or an https YouTube/Vimeo URL. No embed loads before opening.
  url: string;
  status: "Coming soon" | "Available";
  year?: string;
};
export const showreel = {
  title: "A little rhythm. A clear message.",
  description: "Music, timing, text, and visuals are how I shape a story. I’m selecting completed promotional and short-form work for this space; the featured reel is still to be confirmed.",
  poster: "/assets/reel-art.svg",
  url: "",
};
export const videos: Video[] = [
  { id: "event", title: "Moments into memories", category: "Event Highlights", description: "A future home for event recaps, carefully paced highlights, and the moments in between.", poster: "/assets/film-event.svg", url: "", status: "Coming soon" },
  { id: "promo", title: "Made to leave an impression", category: "Promotional Videos", description: "A future collection of promotional edits with a clear story and a considered visual direction.", poster: "/assets/film-promo.svg", url: "", status: "Coming soon" },
  { id: "social", title: "Stories that stop the scroll", category: "Social Media Edits", description: "A space for short-form experiments in pacing, typography, and vertical storytelling.", poster: "/assets/film-social.svg", url: "", status: "Coming soon" },
  { id: "worship", title: "Purpose in every frame", category: "Worship & Church Media", description: "A future home for worship and church media with a thoughtful, story-first approach.", poster: "/assets/film-worship.svg", url: "", status: "Coming soon" },
  { id: "motion", title: "An idea, set in motion", category: "Motion Graphics", description: "A space for explorations in animated type, visual rhythm, and motion graphics.", poster: "/assets/film-motion.svg", url: "", status: "Coming soon" },
];

export const skillGroups = [
  { id: "development", label: "Development", filename: "development.ts", description: "The building blocks behind functional digital experiences.", tracks: [
    { label: "01 / FRONTEND", skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"] },
    { label: "02 / LANGUAGES", skills: ["PHP", "Python", "SQL"] },
    { label: "03 / DATA & MOBILE", skills: ["MySQL", "Firebase", "Flutter", "Dart"] },
  ] },
  { id: "analytics", label: "Business analytics", filename: "analytics.pbix", description: "Academic Power BI practice, with business questions at the center.", tracks: [
    { label: "01 / PREPARATION", skills: ["Microsoft Power BI", "Power Query", "Data cleaning"] },
    { label: "02 / ANALYSIS", skills: ["DAX measures", "Revenue analysis", "Sales trends", "Product comparisons"] },
    { label: "03 / COMMUNICATION", skills: ["Data visualization", "Interactive filters", "Business reporting"] },
  ] },
  { id: "creative", label: "Creative", filename: "creative.timeline", description: "Music, timing, and visuals working toward a clear message.", tracks: [
    { label: "01 / EDITING", skills: ["Video sequencing", "Text overlays", "Transitions", "Music synchronization"] },
    { label: "02 / VISUAL CONTENT", skills: ["Adobe Photoshop", "Social media materials", "Promotional content"] },
    { label: "03 / STORYTELLING", skills: ["Short-form videos", "Visual presentations", "Pacing"] },
  ] },
] as const;

export const journey = [
  { period: "EDUCATION · BS INFORMATION TECHNOLOGY", title: "Learning the foundations. Applying them.", organization: "Global Reciprocal Colleges", description: "I’m a fourth-year BS Information Technology student. My studies connect programming, databases, system development, and business analytics with hands-on projects." },
  { period: "OCTOBER 2026 · CAPSTONE DEFENSE", title: "Refining the scope, strengthening the system.", organization: "Team enrollment-system capstone", description: "Our Automated Enrollment System with Predictive Analytics underwent final defense in October 2026. Major revisions are in progress following feedback on the project’s extensive scope. My documented involvement spans process analysis, planning, requirements, and system diagrams." },
  { period: "BUSINESS & ENTREPRENEURSHIP", title: "Understanding the work behind the workflow.", organization: "ARAT Coffee & Graham Nest", description: "Developing ARAT Coffee’s ordering and inventory system helped me apply software to business needs. Starting a small Graham Nest dessert venture brought first-hand lessons in sales, costs, and customer relationships." },
  { period: "COMMUNITY & LEADERSHIP", title: "Learning to lead by serving.", organization: "CCF Grace Park", description: "Serving in ministries and leading and facilitating youth discipleship groups gives me room to practice communication, responsibility, teamwork, and care for others." },
];

export const professionalExperience = [
  { organization: "Remotasks", role: "Professional experience", description: "Part of my professional background and the experiences I bring into my growth as an aspiring IT professional.", focus: "Professional background" },
  { organization: "Seanderg Realty", role: "Real estate administration & sales", description: "Experience in real estate administration and sales, with exposure to digital marketing and presenting products and services through engaging visuals.", focus: "Business processes · customer communication" },
  { organization: "AIA Philippines", role: "Financial advising", description: "Financial advising experience that contributes to my business-oriented perspective and interest in understanding people’s needs.", focus: "Business understanding · communication" },
];

export const site = {
  name: "DBCreates",
  tagline: "Code. Data. Create.",
  title: "DBCreates | Derick Boado — Developer, Analytics & Creative",
  description: "The personal portfolio of Derick Boado, showcasing web development, business analytics, and creative digital projects.",
  // Set NEXT_PUBLIC_SITE_URL in production for canonical URLs, Open Graph, robots, and sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://dbcreates.vercel.app",
};
