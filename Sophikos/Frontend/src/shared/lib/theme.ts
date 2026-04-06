export const colors = {
    primary: '#4A3060',
    primaryLight: '#5a3080',
    gold: '#C9A84C',
    white: '#fff',
    black: '#1a1a1a',
    gray: '#666',
    grayLight: '#ddd',
    grayMuted: '#aaa',
    transparent: 'transparent',
} as const;

export const typography = {
    h1: { fontSize: 32, fontWeight: 'bold' as const },
    h2: { fontSize: 24, fontWeight: 'bold' as const },
    subtitle: { fontSize: 16 },
    body: { fontSize: 15 },
    caption: { fontSize: 12 },
} as const;

export const radius = {
    sm: 8,
    md: 14,
    lg: 24,
    xl: 32,
} as const;