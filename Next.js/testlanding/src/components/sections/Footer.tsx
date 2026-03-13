import { TwitterIcon, GithubIcon, DiscordIcon, RedditIcon } from "@/components/icons"

export default function Footer() {
    return (
        <footer className="bg-[#09090f] border-t border-white/10">
            <div className="page-container pt-14 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">

                <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                    <span className="text-xl font-bold tracking-widest text-white uppercase">FinVault</span>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Bank-grade security meets real-time portfolio intelligence.
                        Your wealth, always protected.
                    </p>
                    <div className="flex gap-3">
                        <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="muted-link"><GithubIcon /></a>
                        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer" className="muted-link"><DiscordIcon /></a>
                        <a href="https://reddit.com" aria-label="Reddit" target="_blank" rel="noopener noreferrer" className="muted-link"><RedditIcon /></a>
                        <a href="https://x.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="muted-link"><TwitterIcon /></a>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-white text-sm font-semibold">Product</p>
                    <ul className="flex flex-col gap-2 list-none p-0 m-0">
                        <li><a href="/benefits" className="muted-link text-sm">Benefits</a></li>
                        <li><a href="/" className="muted-link text-sm">Prices</a></li>
                        <li><a href="/" className="muted-link text-sm">Calculations</a></li>
                        <li><a href="/" className="muted-link text-sm">Changelog</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-white text-sm font-semibold">Company</p>
                    <ul className="flex flex-col gap-2 list-none p-0 m-0">
                        <li><a href="/" className="muted-link text-sm">About</a></li>
                        <li><a href="/" className="muted-link text-sm">Blog</a></li>
                        <li><a href="/" className="muted-link text-sm">Careers</a></li>
                        <li><a href="/" className="muted-link text-sm">Press</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-white text-sm font-semibold">Legal</p>
                    <ul className="flex flex-col gap-2 list-none p-0 m-0">
                        <li><a href="/" className="muted-link text-sm">Privacy Policy</a></li>
                        <li><a href="/" className="muted-link text-sm">Terms of Service</a></li>
                        <li><a href="/" className="muted-link text-sm">Cookie Policy</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-white text-sm font-semibold">Support</p>
                    <ul className="flex flex-col gap-2 list-none p-0 m-0">
                        <li><a href="/" className="muted-link text-sm">Documentation</a></li>
                        <li><a href="/feedback" className="muted-link text-sm">Feedback</a></li>
                        <li><a href="/" className="muted-link text-sm">Contact Us</a></li>
                        <li><a href="/" className="muted-link text-sm">Status</a></li>
                    </ul>
                </div>
            </div>

            <div className="page-container py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-gray-600 text-xs">© 2026 FinVault. All rights reserved.</p>
                <div className="flex gap-5">
                    <a href="/" className="text-gray-600 hover:text-white text-xs transition-colors duration-200">Privacy Policy</a>
                    <a href="/" className="text-gray-600 hover:text-white text-xs transition-colors duration-200">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
