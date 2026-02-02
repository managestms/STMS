"use client"
import { useState, useEffect } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import Card3D from '../ui/Card3D'
import GlassCard from '../ui/GlassCard'
import AnimatedCounter from '../ui/AnimatedCounter'

const StatsSection = () => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const stats = [
        { value: 78045, suffix: " KG", label: "Stock Managed" },
        { value: 150, suffix: "+", label: "Local Vendors" },
        { value: 99, suffix: "%", label: "Accuracy Rate" },
        { value: 500, suffix: " Tons", label: "Monthly Sales" }
    ]

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#ff741f] via-[#ff8c42] to-[#ff9b54]">
            {/* Parallax Background Elements */}
            <div
                className="absolute inset-0 opacity-20"
                style={{ transform: `translateY(${(scrollY - 1500) * 0.1}px)` }}
            >
                <div className="absolute top-10 left-20 w-40 h-40 border-2 border-white/30 rounded-full" />
                <div className="absolute bottom-20 right-32 w-60 h-60 border-2 border-white/20 rounded-full" />
                <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-white/25 rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
                        Trusted by <span className="text-orange-100">Traders</span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <Card3D>
                                <GlassCard className="p-8 text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <p className="text-white/80 font-medium">
                                        {stat.label}
                                    </p>
                                </GlassCard>
                            </Card3D>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsSection
