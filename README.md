# Aster & Co. Studio

Aster & Co. Studio is a responsive, single-page website for a fictional strategy and digital-innovation consultancy. It presents the studio's positioning, services, working approach, illustrative client work, and a contact experience in a polished editorial design.

> The company, client names, testimonials, addresses, and performance metrics shown in the site are fictional and are included for demonstration purposes.

## Links

- [GitHub repository](https://github.com/prajapatim1/aster-and-co-studio)
- [Open the project in Lovable](https://lovable.dev)

## Features

- Responsive landing page with accessible, semantic navigation
- About, services, approach, selected-work, testimonial, and contact sections
- Reusable header, contact form, and UI components
- Shared Zod validation for the contact form, covered by tests
- SEO metadata, social-preview metadata, favicon, and custom error/404 pages
- Subtle reveal animations with reduced-motion support

## Tech stack

- [TanStack Start](https://tanstack.com/start)
- [React 19](https://react.dev/) and TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) components
- [Vitest](https://vitest.dev/) and Testing Library
- [Lovable](https://lovable.dev/) for project authoring and synchronization

## Run locally

### Prerequisites

Install [Bun](https://bun.sh/) (recommended because the repository includes `bun.lock`) or Node.js 20+ with npm.

### Bun

```sh
git clone https://github.com/prajapatim1/aster-and-co-studio.git
cd aster-and-co-studio
bun install
bun run dev
```

### npm

```sh
git clone https://github.com/prajapatim1/aster-and-co-studio.git
cd aster-and-co-studio
npm install
npm run dev
```

Open the local URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Available commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Check the code with ESLint |
| `bun run test` | Run the test suite once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run format` | Format the project with Prettier |

Replace `bun run` with `npm run` when using npm.

## Project structure

```text
src/
├── components/
│   ├── site/          # Site-specific header and contact form
│   └── ui/            # Reusable interface components
├── lib/               # Validation, utilities, and error reporting
├── routes/            # TanStack Start routes and page metadata
├── test/              # Routing and form-validation tests
└── styles.css         # Global theme and styles
public/                # Static assets
```

The main page content lives in `src/routes/index.tsx`. Site-specific shared components are in `src/components/site/`, and contact-form rules live in `src/lib/contact-validation.ts`.

## Production check

Before publishing a change, run:

```sh
bun run lint
bun run test
bun run build
```

Changes pushed to the connected GitHub branch sync back to Lovable. Avoid rewriting published Git history so that the Lovable project history remains intact.
