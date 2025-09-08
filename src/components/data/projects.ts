import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description: "Fully tested and accessible personal portfolio built with modern React ecosystem. Features comprehensive test coverage (95%+), accessibility compliance (WCAG 2.1), modular component architecture, and CI/CD pipeline. Showcases advanced TypeScript patterns, custom hooks, and performance optimization techniques.",
    tech: ["React 19", "TypeScript", "TailwindCSS", "Vite", "TanStack Start", "Vitest", "Testing Library"],
    liveUrl: "https://alfonzosuarez.dev",
    githubUrl: "https://github.com/lanzosuarez/personal-website",
    image: "🚀"
  },
  {
    id: 2,
    title: "TravelCon Traveller PWA",
    description: "Progressive web app for travellers to search, discover, book, and manage tours across the Philippines. Mobile-first PWA with modern tech stack including Radix UI, Zod validation, and TanStack Router. Currently in active development.",
    tech: ["React 18", "TypeScript", "TailwindCSS", "Vite", "TanStack Router"],
    liveUrl: "https://miniapp.travelcon.io/home/listing?category=popular",
    githubUrl: "#",
    image: "🏝️"
  },
  {
    id: 3,
    title: "TravelCon Admin Dashboard",
    description: "Enterprise-grade business management platform with advanced data visualization, drag-and-drop interfaces, and comprehensive analytics. Features sophisticated form handling, real-time charts, and streamlined workflow management for tour operators.",
    tech: ["React 18", "TypeScript", "Ant Design", "Recharts", "DND Kit"],
    liveUrl: "https://app.travelcon.io/dashboard",
    githubUrl: "#",
    image: "📊"
  },
  {
    id: 4,
    title: "Component Library & Design System",
    description: "Enterprise-grade UI component library built from scratch using modern design principles, accessibility standards, and comprehensive testing coverage for scalable frontend development.",
    tech: ["Vue3", "TypeScript", "Storybook", "Vitest", "Design Tokens"],
    liveUrl: "#",
    githubUrl: "#",
    image: "🎨",
    hasScreenshots: true,
    screenshots: ["/images/components/button.png"]
  }
];
