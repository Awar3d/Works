import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import PageHero from "@/components/ui/PageHero"
import OutlineLink from "@/components/ui/OutlineLink"
import FeatureCard from "@/components/ui/FeatureCard"

export default function BenefitsPage() {
    return (
        <main>
            <Header />

            <PageHero
                accentText="EVERYTHING YOU"
                titleText="NEED TO GROW"
                subtitle="Powerful."
                description="FinVault is built around features that actually matter — security, clarity, and control over every dollar you own."
            >
                <div className="flex gap-3 justify-center">
                    <OutlineLink href="/">Open vault</OutlineLink>
                    <OutlineLink href="/">See pricing</OutlineLink>
                </div>
            </PageHero>

            <section className="bg-[#09090f] px-6 pb-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <FeatureCard
                        icon="🔒"
                        title="Bank-Grade Encryption"
                        description="Your data is protected by AES-256 encryption at rest and in transit. The same standard used by major financial institutions worldwide."
                        iconBg="bg-violet-500/20"
                        hoverBorder="hover:border-violet-500/40"
                    />
                    <FeatureCard
                        icon="📊"
                        title="Real-Time Portfolio Tracking"
                        description="Watch your assets grow with live data across stocks, crypto, and funds. All in one clean, unified dashboard."
                        iconBg="bg-fuchsia-500/20"
                        hoverBorder="hover:border-fuchsia-500/40"
                    />
                    <FeatureCard
                        icon="⚡"
                        title="Instant Transactions"
                        description="Move money in seconds, not days. FinVault processes transfers with near-zero latency so your funds are always where you need them."
                        iconBg="bg-blue-500/20"
                        hoverBorder="hover:border-blue-500/40"
                    />
                    <FeatureCard
                        icon="📈"
                        title="Smart Analytics"
                        description="AI-powered insights surface patterns in your spending and investments, helping you make smarter financial decisions every day."
                        iconBg="bg-emerald-500/20"
                        hoverBorder="hover:border-emerald-500/40"
                    />
                    <FeatureCard
                        icon="🛡️"
                        title="Fraud Detection"
                        description="Our system monitors every transaction 24/7 and alerts you the moment anything suspicious is detected — before damage is done."
                        iconBg="bg-pink-500/20"
                        hoverBorder="hover:border-pink-500/40"
                    />
                    <FeatureCard
                        icon="🌍"
                        title="Multi-Currency Support"
                        description="Hold, exchange, and send in 50+ currencies with competitive rates. Go global without the hidden fees."
                        iconBg="bg-amber-500/20"
                        hoverBorder="hover:border-amber-500/40"
                    />
                </div>
            </section>

            <Footer />
        </main>
    )
}
