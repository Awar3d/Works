"use client"

import { useState } from "react"
import { TwitterIcon, GithubIcon, DiscordIcon, RedditIcon } from "@/components/icons"

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="bg-[#0d0d14]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="page-container h-16 flex items-center justify-between">
                <a href="/" className="text-xl font-bold tracking-widest text-white uppercase">
                    FinVault
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="/benefits" className="nav-link">Benefits</a>
                    <a href="/feedback" className="nav-link">Feedback</a>
                    <a href="/" className="nav-link">Prices</a>
                    <a href="/" className="nav-link">Calculations</a>
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="muted-link"><GithubIcon /></a>
                    <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer" className="muted-link"><DiscordIcon /></a>
                    <a href="https://reddit.com" aria-label="Reddit" target="_blank" rel="noopener noreferrer" className="muted-link"><RedditIcon /></a>
                    <a href="https://x.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="muted-link"><TwitterIcon /></a>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    className="md:hidden text-gray-400 hover:text-white p-1 transition-colors duration-200"
                >
                    {menuOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-white/10 bg-[#09090f] px-6 py-5 flex flex-col gap-4">
                    <a href="/benefits" className="nav-link">Benefits</a>
                    <a href="/feedback" className="nav-link">Feedback</a>
                    <a href="/" className="nav-link">Prices</a>
                    <a href="/" className="nav-link">Calculations</a>
                    <div className="flex gap-4 pt-3 border-t border-white/10">
                        <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="muted-link"><GithubIcon /></a>
                        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer" className="muted-link"><DiscordIcon /></a>
                        <a href="https://reddit.com" aria-label="Reddit" target="_blank" rel="noopener noreferrer" className="muted-link"><RedditIcon /></a>
                        <a href="https://x.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="muted-link"><TwitterIcon /></a>
                    </div>
                </div>
            )}
        </header>
    )
}
