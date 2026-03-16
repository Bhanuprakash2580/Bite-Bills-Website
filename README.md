# Business Website - Astro + React

A modern business website built with Astro, React, TypeScript, and Tailwind CSS. This project is designed as a standalone site (no Wix dependency) that you can customize for your own business.

## 🚀 Features

- **Astro Framework** - Modern static site generator with server-side rendering
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **Modern UI Components** - Radix UI components with custom styling
- **Authentication (optional)** - Login and account pages you can wire to any backend
- **Content & CMS (optional)** - Content layer you can connect to your own API or static data
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile-first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Any static/SSR host (e.g. Vercel, Netlify, Cloudflare)


## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

The development server will start and you can view your site at `http://localhost:4321`.

## 📁 Project Structure

```
main/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Head.tsx        # Page head component
│   │   └── Router.tsx      # Routing component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro pages
│   └── styles/             # Global styles
├── integrations/           # Optional data/auth integrations (no Wix required)
│   ├── cms/               # Data / CMS helpers
│   └── members/           # Member authentication helpers
├── public/                # Static assets
└── eslint-rules/          # Custom ESLint rules
```

## 🎨 UI Components

This template includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Tabs, Sheet
- **Forms**: Input, Select, Checkbox, Radio Group, Switch
- **Navigation**: Navigation Menu, Menubar, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Data Display**: Table, Card, Badge, Avatar
- **Interactive**: Button, Toggle, Slider, Command

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with Astro
- `npm run test:run` - Run tests
- `npm install` - Install dependencies

## 🧪 Testing

The project includes Vitest for testing:

```bash
npm run test:run
```

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:

- Responsive breakpoints
- Touch-friendly interactions
- Optimized images
- Flexible layouts

## 🚀 Deployment

Build the project and deploy the `dist` output to your preferred host:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🆘 Support

For framework docs and guides:

- Review the [Astro Documentation](https://docs.astro.build/)
- Review the [React Documentation](https://react.dev/)


---

Built with ❤️ using Astro, React, Tailwind CSS, and modern web technologies.
