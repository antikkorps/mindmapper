/**
 * Application configuration
 * Centralized app-wide constants and settings
 */

export const APP_CONFIG = {
  name: 'MindMapper',
  description: 'Create beautiful, interactive mind maps',

  // Social & Project Links
  links: {
    github: 'https://github.com/antikkorps/mindmapper',
    buyMeACoffee: 'https://buymeacoffee.com/fvienot',
    kofi: '', // Optional - leave empty if not used
    githubSponsors: '', // Optional - leave empty if not used
  },

  // Theme Configuration
  themes: ['light', 'dark', 'cupcake', 'retro', 'forest', 'wireframe'],
  defaultTheme: 'light',

  // Feature Flags (for future use)
  features: {
    collaboration: false, // Real-time collaboration
    export: false, // Export to PNG/PDF/JSON
    templates: false, // Pre-built templates
    ai: false, // AI suggestions
  },
}
