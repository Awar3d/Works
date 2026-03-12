import { TwitterIcon, GithubIcon, DiscordIcon, RedditIcon } from "@/components/icons";

export default function Header() {
    return (
        <header className={"bg-[rgba(13, 13, 20, 0.85)] backdrop-blur-md border-b border-border sticky top-0 z-50"} >
            <div className={"max-w-300 m-[0 auto] p-[0 2rem] h-16 flex items-center justify-center"}>
                <h1
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        margin: 0,
                    }}
                >
                    FinVault
                </h1>

                <nav>
                    <ul
                        style={{
                            display: "flex",
                            gap: "2rem",
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {["Benefits", "Feedback", "Prices", "Calculations"].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="text-[rgba(232,232,240,0.75)] hover:text-white no-underline text-sm transition-colors duration-200"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {[
                        { icon: <GithubIcon />, label: "GitHub", href: "#" },
                        { icon: <DiscordIcon />, label: "Discord", href: "#" },
                        { icon: <RedditIcon />, label: "Reddit", href: "#" },
                        { icon: <TwitterIcon />, label: "Twitter", href: "#" },
                    ].map(({ icon, label, href }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="flex items-center text-[rgba(232,232,240,0.6)] hover:text-white transition-colors duration-200"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
}
