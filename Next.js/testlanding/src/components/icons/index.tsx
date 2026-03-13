export const VaultIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 320 300"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="160" cy="148" r="108" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
        <circle cx="160" cy="148" r="90" stroke="url(#ringGrad2)" strokeWidth="1" opacity="0.3" />

        <rect x="88" y="76" width="144" height="144" rx="20" fill="url(#vaultBody)" />
        <rect x="88" y="76" width="144" height="144" rx="20" stroke="url(#vaultBorder)" strokeWidth="1.5" />

        <circle cx="160" cy="148" r="38" fill="url(#dialBg)" stroke="url(#dialBorder)" strokeWidth="2" />
        <circle cx="160" cy="148" r="26" fill="url(#innerDial)" stroke="#8b5cf6" strokeOpacity="0.4" strokeWidth="1" />

        <rect x="150" y="150" width="20" height="16" rx="3" fill="url(#lockBody)" />
        <path d="M154 150v-5a6 6 0 0 1 12 0v5" stroke="url(#lockShackle)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="160" cy="158" r="2.5" fill="white" fillOpacity="0.9" />

        {/* Dial tick marks — pre-calculated at r1=32, r2=37, cx=160, cy=148 */}
        <line x1="192.00" y1="148.00" x2="197.00" y2="148.00" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="187.71" y1="164.00" x2="192.04" y2="166.50" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="176.00" y1="175.71" x2="178.50" y2="180.04" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="160.00" y1="180.00" x2="160.00" y2="185.00" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="144.00" y1="175.71" x2="141.50" y2="180.04" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="132.29" y1="164.00" x2="127.96" y2="166.50" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="128.00" y1="148.00" x2="123.00" y2="148.00" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="132.29" y1="132.00" x2="127.96" y2="129.50" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="144.00" y1="120.29" x2="141.50" y2="115.96" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="160.00" y1="116.00" x2="160.00" y2="111.00" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="176.00" y1="120.29" x2="178.50" y2="115.96" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="187.71" y1="132.00" x2="192.04" y2="129.50" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />

        <circle cx="104" cy="108" r="5" fill="url(#boltGrad)" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="104" cy="148" r="5" fill="url(#boltGrad)" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="104" cy="188" r="5" fill="url(#boltGrad)" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1" />

        <circle cx="100" cy="88"  r="3.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="220" cy="88"  r="3.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="100" cy="208" r="3.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx="220" cy="208" r="3.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1" />

        <circle cx="58"  cy="100" r="16" fill="url(#coinGold)"   stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="1" />
        <text x="58"  y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fillOpacity="0.85">$</text>

        <circle cx="262" cy="112" r="13" fill="url(#coinPurple)" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1" />
        <text x="262" y="117" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fillOpacity="0.85">₿</text>

        <circle cx="245" cy="195" r="11" fill="url(#coinGold)"   stroke="#fbbf24" strokeOpacity="0.3" strokeWidth="1" />
        <text x="245" y="199" textAnchor="middle" fontSize="9"  fontWeight="bold" fill="white" fillOpacity="0.85">$</text>

        <g opacity="0.7">
            <rect x="62" y="188" width="6" height="18" rx="2" fill="#8b5cf6" fillOpacity="0.7" />
            <rect x="72" y="180" width="6" height="26" rx="2" fill="#a78bfa" fillOpacity="0.8" />
            <rect x="82" y="184" width="6" height="22" rx="2" fill="#c4b5fd" fillOpacity="0.6" />
        </g>

        <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="vaultBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f0f1a" />
            </linearGradient>
            <linearGradient id="vaultBorder" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="dialBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#1e1040" />
            </linearGradient>
            <linearGradient id="dialBorder" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="innerDial" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b0764" />
                <stop offset="100%" stopColor="#1a103a" />
            </linearGradient>
            <linearGradient id="lockBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="lockShackle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ddd6fe" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>
            <linearGradient id="coinGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="coinPurple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
        </defs>
    </svg>
);

export const TwitterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

export const DiscordIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
);

export const RedditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
);
