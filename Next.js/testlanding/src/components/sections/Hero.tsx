import { VaultIcon } from "@/components/icons"
import OutlineLink from "@/components/ui/OutlineLink"
import StatCard from "@/components/ui/StatCard"

export default function Hero() {
    return (
        <section className="bg-[#09090f] flex flex-col items-center pt-20 pb-12 overflow-hidden">
            <div className="flex flex-col items-center text-center px-6 w-full max-w-4xl">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide leading-tight mb-3">
                    <span className="gradient-accent">YOUR WEALTH,{" "}</span>
                    <span className="gradient-main">FULLY SECURED</span>
                </h2>

                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                    Protected.
                </h3>

                <p className="text-gray-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                    FinVault combines bank-grade encryption with real-time portfolio tracking
                    to keep your assets safe and growing. One vault for all your finances.
                </p>

                <div className="flex gap-3">
                    <OutlineLink href="/">Open vault</OutlineLink>
                    <OutlineLink href="/">Learn more</OutlineLink>
                </div>
            </div>

            <div className="w-full max-w-5xl px-6 mt-12">
                <div className="flex gap-4 justify-center mb-6 lg:hidden">
                    <StatCard label="Portfolio value" value="$124,850" trend="▲ +3.2% today" trendClassName="text-emerald-400" />
                    <StatCard label="Security score" value="99 / 100" trend="● Bank-grade" trendClassName="text-fuchsia-400" />
                </div>

                <div className="relative flex items-end justify-center">
                    <StatCard
                        label="Portfolio value"
                        value="$124,850"
                        trend="▲ +3.2% today"
                        trendClassName="text-emerald-400"
                        className="hidden lg:block absolute left-8 bottom-[28%]"
                    />
                    <StatCard
                        label="Security score"
                        value="99 / 100"
                        trend="● Bank-grade encryption"
                        trendClassName="text-fuchsia-400"
                        className="hidden lg:block absolute right-8 bottom-[36%]"
                    />

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-violet-600/20 blur-3xl rounded-full" />

                    <VaultIcon className="w-64 md:w-80 lg:w-96 drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]" />
                </div>
            </div>
        </section>
    )
}
