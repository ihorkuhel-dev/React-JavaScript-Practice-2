# React CRM Dashboard

A modern web application (CRM / Dashboard) built with React and TypeScript, using advanced architecture patterns and state management.

## Brief Functionality

- **Dashboard and Analytics:** Data visualization (charts and graphs) using `Chart.js`.
- **Medication Management:** Medication table with server-side pagination and sorting, fully synchronized with the URL.
- **Interactive Maps:** Detailed page displaying locations on maps (Leaflet + Mapbox integration).
- **Authentication and Registration:** Secure login forms with reliable client-side validation.
- **Real-time Support:** Built-in chat widget powered by WebSockets.
- **Adaptive UI:** Light and dark mode support, modern design, and smooth animations.

## Architecture and Tech Stack

The project follows the **FSD (Feature-Sliced Design)** methodology, ensuring scalability, predictability, and easy maintenance of the codebase.

### Core Technologies:

- **React 19** & **TypeScript** — The foundation of the application, providing strict typing and a modern component-based approach.
- **Vite** — An incredibly fast project bundler.
- **TanStack Query (React Query)** — Server state management. Handles API requests, automatic data caching (configured for 5 minutes), background updates, and cache invalidation via the *Query Key Factory* pattern. Enables seamless pagination without UI jumps.
- **TanStack Router** — Type-safe file-based routing. The project implements an advanced approach: **table state (pagination, sorting parameters) is stored directly in the URL**. This eliminates unnecessary local state and makes it easy to share links with pre-filtered data.
- **TanStack Table** — Headless UI for tables. Fully manages logic (sorting, cells, rendering), leaving the visual responsibility to custom components.
- **Zod & React Hook Form** — Strict typing and form data validation from schema to UI with minimal re-renders.
- **WebSockets** — Real-time functionality (e.g., chat widget) allowing instant sending and receiving of messages without manual server polling.

### UI & Styling:

- **Tailwind CSS** — A utility-first CSS framework for rapid UI styling directly in the markup. Provides flexibility and easy theme implementation (e.g., dark/light mode).
- **Shadcn UI** — A collection of accessible and beautifully designed components. Unlike classic libraries, Shadcn installs the component source code (buttons, inputs, selects) directly into the project under `src/shared/ui`. This provides full control over the logic and 100% freedom to customize the design to fit project needs.

## Dependencies

The project relies on the following key libraries:
- **Core:** `react` (^19.2.5), `react-dom` (^19.2.5)
- **TanStack Ecosystem:** `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/react-table`
- **UI & Styling:** `tailwindcss` (^4.2.4), `shadcn`, `radix-ui`, `lucide-react` (icons), `next-themes` (theming)
- **Forms & Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`
- **Charts & Maps:** `chart.js`, `react-chartjs-2`, `leaflet`
- **Utils:** `date-fns`, `clsx`, `tailwind-merge`, `sonner` (notifications)

## Installation and Setup

### Requirements
- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Local Setup Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ihorkuhel-dev/React-JavaScript-Practice.git
   cd React-JavaScript-Practice-2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root of the project. For components to work correctly (e.g., MedicationMap), you will need API keys:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```
   *(Note: Variables accessible on the Vite client must start with the `VITE_` prefix)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Once built, the application will be available in your browser at `http://localhost:5173/` (or the port provided by Vite).

## Project Structure (FSD)
The project follows this layer structure:
- `app/` — Application initialization, global styles (`global.css`), router, and context providers.
- `pages/` — Compositional components for full pages.
- `routes/` — Implementation of FBS Tanstack Router.
- `widgets/` — Independent and complete UI blocks (e.g., Header, Sidebar, Chat).
- `features/` — Business logic and use cases (e.g., authentication, cart/medication API).
- `shared/` — Reusable code: UI kit (Shadcn), utilities, hooks, assets, and base API configurations.
