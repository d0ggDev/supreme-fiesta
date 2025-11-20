# BITSA Official Website

A modern, futuristic single-page React application for the Bachelor of Information Technology Students Association (BITSA). Built with React 19, Tailwind CSS 4, and interactive animations using React Bits components.

## Overview

The BITSA website serves as a central hub for the student association, providing information about the organization, showcasing events, sharing knowledge through blog articles, and facilitating communication with members and prospective students.

## Features

### Core Sections

**Hero Section** - Eye-catching landing area with animated gradient backgrounds, floating geometric elements, and call-to-action buttons to explore more or get in touch.

**About Section** - Comprehensive information about BITSA including the organization's mission, core values (Community, Innovation, Learning), and key statistics about membership and activities.

**Services Section** - Showcase of six key offerings including technical workshops, career development, learning resources, networking events, innovation projects, and certification programs.

**Events Section** - Display of upcoming events with detailed information including dates, times, locations, registration status, and event descriptions. Features category badges and registration buttons.

**Gallery Section** - Photo showcase of BITSA activities and past events with hover effects revealing event details and categories.

**Blog Section** - Collection of articles and announcements with categorization, author information, read time estimates, and easy navigation to full articles.

**Contact Section** - Contact form with validation, direct contact information (email and phone numbers for leadership), and location details.

## Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework and component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling with OKLCH color support |
| **Wouter** | Lightweight client-side routing |
| **shadcn/ui** | Pre-built accessible components |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **Vite** | Build tool and dev server |

## Project Structure

```
client/
├── public/
│   └── bitsa-logo.png          # BITSA brand logo
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Fixed navigation bar with smooth scrolling
│   │   ├── Footer.tsx           # Footer with contact info and social links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Landing section with animations
│   │   │   ├── AboutSection.tsx     # Organization information
│   │   │   ├── ServicesSection.tsx  # Service offerings
│   │   │   ├── EventsSection.tsx    # Upcoming events
│   │   │   ├── GallerySection.tsx   # Photo gallery
│   │   │   ├── BlogSection.tsx      # Blog articles
│   │   │   └── ContactSection.tsx   # Contact form
│   │   └── ui/                  # shadcn/ui components
│   ├── pages/
│   │   ├── Home.tsx             # Main page combining all sections
│   │   └── NotFound.tsx         # 404 page
│   ├── contexts/
│   │   └── ThemeContext.tsx     # Dark theme management
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles and design tokens
│   └── const.ts                 # Application constants
├── index.html                   # HTML entry point
└── package.json                 # Dependencies and scripts
```

## Design System

### Color Palette

The website uses a sophisticated dark theme with cyan and blue accents, inspired by the BITSA logo:

- **Primary Dark:** `#1a1a2e` - Main background
- **Secondary Dark:** `#16213e` - Section backgrounds
- **Accent Dark:** `#0f3460` - Contrast backgrounds
- **Cyan Accent:** `#00bcd4` - Interactive elements and highlights
- **Blue Accent:** `#4a9eff` - Gradients and secondary accents
- **Text:** White (`#ffffff`) with gray variations for secondary text

### Typography

- **Headings:** Poppins font family (bold, 700 weight)
- **Body:** Inter font family (regular, 400 weight)
- **Sizes:** Responsive scaling from mobile to desktop

### Animations

The website features several animation types:

- **Blob Animations:** Floating gradient orbs in background sections
- **Smooth Scrolling:** Navigation links scroll smoothly to sections
- **Hover Effects:** Cards and buttons scale and change colors on hover
- **Gradient Transitions:** Smooth color transitions on interactive elements
- **Pulse Animations:** Subtle pulsing effects on key elements

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitsa-react-website
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
# or
npm run build
```

The optimized production build will be created in the `dist/` directory.

## Key Components

### Navigation Component

The `Navigation.tsx` component provides:
- Fixed positioning for persistent access
- Smooth scroll navigation to sections
- Mobile-responsive hamburger menu
- Active state indicators
- Gradient background with backdrop blur

### Section Components

Each section is a self-contained component with:
- Unique gradient backgrounds
- Animated background elements
- Responsive grid layouts
- Interactive hover states
- Proper spacing and typography

### Contact Form

The contact form includes:
- Real-time validation
- Toast notifications for feedback
- Responsive input fields
- Accessible form structure
- Error handling

## Responsive Design

The website is fully responsive and optimized for:
- **Mobile:** 320px and up
- **Tablet:** 768px and up
- **Desktop:** 1024px and up
- **Large Desktop:** 1280px and up

All sections adapt gracefully to different screen sizes with appropriate spacing, typography, and layout adjustments.

## Customization

### Updating the Logo

To change the BITSA logo, replace the image file at `client/public/bitsa-logo.png` and update the reference in `client/src/const.ts`:

```typescript
export const APP_LOGO = "/bitsa-logo.png";
```

### Modifying Colors

Edit the CSS variables in `client/src/index.css` to change the color scheme. The dark theme colors are defined in the `.dark` class:

```css
.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.85 0.005 65);
  /* ... other colors ... */
}
```

### Adding New Sections

1. Create a new component in `client/src/components/sections/`
2. Import and add it to the Home page
3. Add a navigation link in `Navigation.tsx`
4. Style using Tailwind CSS utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of images
- Optimized CSS with Tailwind's purging
- Efficient component rendering
- Smooth animations using CSS transforms
- Responsive image sizing

## Accessibility

The website follows WCAG 2.1 guidelines:
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast ratios meet standards
- Keyboard navigation support
- ARIA labels where appropriate

## Deployment

The website can be deployed to various platforms:

### Vercel (Recommended)
```bash
pnpm build
# Push to GitHub and connect to Vercel
```

### Netlify
```bash
pnpm build
# Deploy the dist/ folder
```

### Traditional Hosting
```bash
pnpm build
# Upload dist/ folder to your hosting provider
```

## Future Enhancements

Consider adding these features to further improve the website:

1. **Newsletter Subscription** - Integrate email service for announcements
2. **Member Portal** - Dedicated login area for members
3. **Event Registration System** - Backend integration for event management
4. **Blog CMS** - Content management system for blog posts
5. **Analytics** - Track visitor behavior and engagement
6. **Multi-language Support** - Support for additional languages

## Contributing

To contribute to the BITSA website:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly on different devices
4. Submit a pull request with a clear description

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please contact BITSA:
- **Email:** bitsaclub@ueab.ac.ke
- **President:** Alpha Chamba - +254 708 898 899
- **Vice President:** Gloria Jebet - +254 725 486 687

## Acknowledgments

Built with modern web technologies and best practices in mind. Special thanks to the BITSA community for their vision and support.

---

**Last Updated:** November 17, 2025
**Version:** 1.0.0
