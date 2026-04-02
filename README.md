# Personal Site in Astro

A warm, editorial personal website built with Astro and content collections.

## Project structure

```text
/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ContactCard.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── SectionHeading.astro
│   │   └── WritingCard.astro
│   ├── content/
│   │   └── writing/
│   ├── data/
│   │   ├── projects.ts
│   │   └── site.ts
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   └── writing/
│   │       ├── [slug].astro
│   │       └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── astro.config.mjs
└── package.json
```

## Commands

- `npm run dev` starts the local dev server.
- `npm run build` creates the production build.
- `npm run preview` previews the production build locally.

## Content editing

- Update name, bio, navigation, and contact details in `src/data/site.ts`.
- Add or edit projects in `src/data/projects.ts`.
- Add writing posts as Markdown files in `src/content/writing/`.
