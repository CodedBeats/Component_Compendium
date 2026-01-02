# Component Compendium

A curated library for collecting and rendering beautiful frontend UI components with their code variants - saved per user, organised by implementation type, and previewed live directly from code.


## Vision

Component Compendium helps developers and designers:

-   Save UI components they love the look of
-   Store multiple code implementations (React + Tailwind, React + CSS, HTML + CSS, etc)
-   Preview them live from code (no screenshots)
-   Organise personal collections with tags and remixable style options in the future

It’s a visual inspiration board mixed with a practical code vault, built to make UI collection _actually useful_ for real development.

## Upcoming MVP Features

-   User authentication via **Supabase Auth**
-   Personal UI component collections tied to user accounts
-   Multi-variant code storage per component
-   Implementation type support:
    -   `react-tailwind`
    -   `react-css`
    -   `html-css`
-   Code-based live preview (iframe or Sandpack integration)
-   Tag-based organisation
-   Copy-to-clipboard for code snippets
-   Secure user isolation using **Row Level Security (RLS)**

## Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| Frontend     | React (Vite)                                 |
| Auth         | Supabase Auth                                |
| Database     | Supabase Postgres                            |
| Code Preview | Sandpack (React) + iframe sandbox (HTML/CSS) |
| Hosting      | Vercel                                       |
| Tooling      | Git, GitHub, VS Code                         |


## Live Website
_Coming soon_
