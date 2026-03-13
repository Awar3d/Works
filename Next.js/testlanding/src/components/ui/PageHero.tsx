interface Props {
    accentText: string
    titleText: string
    subtitle: string
    description: string
    children?: React.ReactNode
}

export default function PageHero({ accentText, titleText, subtitle, description, children }: Props) {
    return (
        <section className="bg-[#09090f] flex flex-col items-center text-center pt-20 pb-16 px-6">
            <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide leading-tight mb-3">
                    <span className="gradient-accent">{accentText}{" "}</span>
                    <span className="gradient-main">{titleText}</span>
                </h1>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                    {subtitle}
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                    {description}
                </p>
                {children}
            </div>
        </section>
    )
}
