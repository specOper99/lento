/**
 * Color Scheme Generator Utility
 * 
 * Generates a complete, harmonious color scheme from a single brand color.
 * This allows users to provide just one color and get a full theme.
 */

// Convert hex to HSL
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

// Convert HSL to hex
export function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    const toHex = (n: number) => {
        const hex = Math.round((n + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Adjust hue with wrapping
function adjustHue(h: number, amount: number): number {
    return (h + amount + 360) % 360;
}

// Clamp a value between min and max
function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Determine if a color is light or dark
export function isLightColor(hex: string): boolean {
    const { l } = hexToHSL(hex);
    return l > 50;
}

// Get contrasting foreground color (black or white)
export function getContrastColor(hex: string): string {
    return isLightColor(hex) ? '#1A1A1A' : '#FFFFFF';
}

export interface ThemeColors {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    border: string;
    muted: string;
    mutedForeground: string;
}

export interface GeneratedTheme {
    light: ThemeColors;
    dark: ThemeColors;
}

/**
 * Generate a complete color scheme from a single brand color
 * 
 * The algorithm:
 * - Primary: The input brand color
 * - Secondary: Golden/warm complementary (shifted hue toward gold)
 * - Accent: Complementary or triadic color for contrast
 * - Background/Foreground: Derived from primary for cohesion
 * - Border: Based on secondary for subtle definition
 * - Muted: Desaturated version for backgrounds
 */
export function generateColorScheme(brandColor: string): GeneratedTheme {
    const primary = hexToHSL(brandColor);

    // --- LIGHT THEME ---
    // Primary is the brand color
    const lightPrimary = brandColor;
    const lightPrimaryFg = getContrastColor(lightPrimary);

    // Secondary: Shift toward warm gold tones (around 45° hue)
    // If primary is already golden, use a softer gold
    const secondaryHue = primary.h < 60 || primary.h > 300
        ? 45 // Use gold if primary is red/magenta
        : adjustHue(primary.h, 40); // Otherwise shift 40 degrees
    const lightSecondary = hslToHex(secondaryHue, clamp(primary.s - 10, 40, 70), 55);
    const lightSecondaryFg = getContrastColor(lightSecondary);

    // Accent: Use triadic color (120° shift) or complementary
    const accentHue = adjustHue(primary.h, 150); // Near-complementary for visual interest
    const lightAccent = hslToHex(accentHue, clamp(primary.s, 50, 80), 40);
    const lightAccentFg = getContrastColor(lightAccent);

    // Background: Very light, warm-tinted version
    const lightBackground = hslToHex(primary.h, 20, 97);
    const lightForeground = '#1A1A1A';

    // Border: Based on secondary for definition
    const lightBorder = lightSecondary;

    // Muted: Desaturated, light version
    const lightMuted = hslToHex(primary.h, 30, 88);
    const lightMutedFg = hslToHex(primary.h, 40, 35);

    // --- DARK THEME ---
    // Primary: Lighter, warmer version for dark backgrounds
    const darkPrimary = hslToHex(
        adjustHue(primary.h, 15),
        clamp(primary.s - 20, 30, 60),
        65
    );
    const darkPrimaryFg = '#0C1B33';

    // Secondary: Rich gold that works on dark
    const darkSecondary = hslToHex(45, 60, 55);
    const darkSecondaryFg = '#0C1B33';

    // Accent: Soft, elegant tone (rose/coral for warmth)
    const darkAccent = hslToHex(
        adjustHue(primary.h, 180),
        40,
        75
    );
    const darkAccentFg = '#0C1B33';

    // Background: Deep, rich navy
    const darkBackground = '#0C1B33';
    const darkForeground = '#F5E6D3';

    // Border: Antique gold
    const darkBorder = hslToHex(45, 50, 45);

    // Muted: Slightly lighter navy
    const darkMuted = '#1A2F4A';
    const darkMutedFg = darkSecondary;

    return {
        light: {
            primary: lightPrimary,
            primaryForeground: lightPrimaryFg,
            secondary: lightSecondary,
            secondaryForeground: lightSecondaryFg,
            accent: lightAccent,
            accentForeground: lightAccentFg,
            background: lightBackground,
            foreground: lightForeground,
            border: lightBorder,
            muted: lightMuted,
            mutedForeground: lightMutedFg,
        },
        dark: {
            primary: darkPrimary,
            primaryForeground: darkPrimaryFg,
            secondary: darkSecondary,
            secondaryForeground: darkSecondaryFg,
            accent: darkAccent,
            accentForeground: darkAccentFg,
            background: darkBackground,
            foreground: darkForeground,
            border: darkBorder,
            muted: darkMuted,
            mutedForeground: darkMutedFg,
        },
    };
}

/**
 * Generate CSS variables string for theme colors
 */
export function generateCSSVariables(theme: ThemeColors): string {
    return `
    --color-primary: ${theme.primary};
    --color-primary-foreground: ${theme.primaryForeground};
    --color-secondary: ${theme.secondary};
    --color-secondary-foreground: ${theme.secondaryForeground};
    --color-accent: ${theme.accent};
    --color-accent-foreground: ${theme.accentForeground};
    --color-background: ${theme.background};
    --color-foreground: ${theme.foreground};
    --color-border: ${theme.border};
    --color-muted: ${theme.muted};
    --color-muted-foreground: ${theme.mutedForeground};
  `.trim();
}

// Default Lento Coffee brand color for reference
export const LENTO_BRAND_COLOR = '#8B1E1E';
