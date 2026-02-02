"use client"
import ScrollReveal from '../ui/ScrollReveal'
import MagneticButton from '../ui/MagneticButton'

const CTASection = ({ onGetStarted }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-50 rounded-full filter blur-3xl opacity-60" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-40" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Ready to <span className="text-[#ff741f]">Streamline</span> Your Business?
                        </h2>
                        <p className="text-xl text-gray-600 mb-10">
                            Join Super Imli Traders and experience seamless tamarind trading management
                        </p>
                        <MagneticButton
                            onClick={onGetStarted}
                            className="px-12 py-5 bg-gradient-to-r from-[#ff741f] to-[#ff9b54] text-white font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                        >
                            Start Managing Now
                        </MagneticButton>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}

export default CTASection
