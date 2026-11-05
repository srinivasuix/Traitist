/**
 * Environment detection utility for TRAITIST storefront.
 * Controls feature gating such as Demo Autofill.
 *
 * Rules:
 * - Local Development: Visible
 * - Vercel Preview Deployments: Visible
 * - Vercel Production Deployments: Hidden (Fail closed)
 */

declare global {
  interface Window {
    __VERCEL_ENV__?: string;
  }
}

export function isDemoAutofillAvailable(): boolean {
  // Fail closed by default if in production
  try {
    // 1. Explicit production check from Vite env or Vercel
    const vercelEnv = (
      (import.meta.env.VITE_VERCEL_ENV as string) ||
      (typeof process !== 'undefined' && process.env?.VERCEL_ENV) ||
      window.__VERCEL_ENV__ ||
      ''
    ).toLowerCase();

    if (vercelEnv === 'production') {
      return false;
    }

    if (vercelEnv === 'preview' || vercelEnv === 'development') {
      return true;
    }

    // 2. Local development check
    if (import.meta.env.DEV) {
      return true;
    }

    // 3. Hostname inspection for browser runtime
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname.toLowerCase();

      // Local development hosts
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.endsWith('.local') ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.')
      ) {
        return true;
      }

      // Vercel Preview Deployments (e.g. project-git-branch-team.vercel.app or hash-preview)
      // Production is usually custom domain or official root project.vercel.app
      if (hostname.endsWith('.vercel.app')) {
        // If it contains a git branch or commit hash slug, it's a preview deployment
        const isPreviewBranch = hostname.split('.').length >= 3 && hostname.includes('-');
        if (isPreviewBranch) {
          return true;
        }
      }
    }

    // Default fail-closed in production/unknown environments
    return false;
  } catch {
    return false;
  }
}
