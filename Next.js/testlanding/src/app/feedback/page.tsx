import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import PageHero from "@/components/ui/PageHero"

export default function FeedbackPage() {
    return (
        <main>
            <Header />

            <PageHero
                accentText="YOUR VOICE"
                titleText="SHAPES US"
                subtitle="Heard."
                description="Every feature in FinVault started as community feedback. Tell us what you love, what you want, and what we should build next."
            />

            <section className="bg-[#09090f] px-6 pb-24">
                <div className="max-w-2xl mx-auto">
                    <form className="glass-card p-7 md:p-10 flex flex-col gap-5">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Name</label>
                                <input type="text" placeholder="John Doe" className="form-input py-2.5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Email</label>
                                <input type="email" placeholder="you@example.com" className="form-input py-2.5" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Category</label>
                            <select className="form-select py-2.5">
                                <option value="">Select a category</option>
                                <option value="feature">Feature request</option>
                                <option value="bug">Bug report</option>
                                <option value="ux">Design & UX</option>
                                <option value="performance">Performance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Subject</label>
                            <input type="text" placeholder="Short summary of your feedback" className="form-input py-2.5" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">Message</label>
                            <textarea rows={5} placeholder="Tell us more..." className="form-input py-3 resize-none" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium">How would you rate your experience?</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button type="button" className="py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-violet-500/50 hover:text-white transition-colors duration-200">😞 Poor</button>
                                <button type="button" className="py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-violet-500/50 hover:text-white transition-colors duration-200">😐 Okay</button>
                                <button type="button" className="py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-violet-500/50 hover:text-white transition-colors duration-200">😊 Good</button>
                                <button type="button" className="py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:border-violet-500/50 hover:text-white transition-colors duration-200">🤩 Great</button>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200">
                            Send feedback
                        </button>
                    </form>

                    <p className="text-gray-600 text-xs text-center mt-5">
                        We read every submission and respond within 2 business days.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
