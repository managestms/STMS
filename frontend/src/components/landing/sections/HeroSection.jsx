"use client"
import { useState, useEffect } from 'react'
import FloatingElement from '../ui/FloatingElement'

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff741f] via-[#ff8c42] to-[#ffab6b] animate-gradient-shift" />

            {/* Animated Background - Floating Tamarind Leaves with Enhanced Parallax */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large tamarind leaf - top left */}
                <FloatingElement delay={0} duration={4} className="absolute top-20 left-10">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-24 h-24 opacity-20 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.3}px) rotate(${-15 + scrollY * 0.05}deg) scale(${1 + scrollY * 0.0001})`
                        }}
                    />
                </FloatingElement>

                {/* Medium tamarind leaf - top right */}
                <FloatingElement delay={1} duration={5} className="absolute top-32 right-20">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-32 h-32 opacity-15 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.25}px) rotate(${20 + scrollY * 0.03}deg) scale(${1 + scrollY * 0.00015})`
                        }}
                    />
                </FloatingElement>

                {/* Small tamarind leaf - bottom left */}
                <FloatingElement delay={0.5} duration={6} className="absolute bottom-32 left-1/4">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-20 h-20 opacity-25 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.4}px) rotate(${-30 + scrollY * 0.04}deg)`
                        }}
                    />
                </FloatingElement>

                {/* Extra small leaf - center right */}
                <FloatingElement delay={2} duration={4.5} className="absolute top-1/3 right-1/4">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-16 h-16 opacity-20 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.15}px) rotate(${45 + scrollY * 0.06}deg)`
                        }}
                    />
                </FloatingElement>

                {/* Medium leaf - bottom right */}
                <FloatingElement delay={1.5} duration={5} className="absolute bottom-40 right-10">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-28 h-28 opacity-15 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.28}px) rotate(${10 + scrollY * 0.035}deg)`
                        }}
                    />
                </FloatingElement>

                {/* Small leaf - center left */}
                <FloatingElement delay={0.8} duration={4} className="absolute top-60 left-1/3">
                    <img
                        src="/leaf.svg"
                        alt=""
                        className="w-14 h-14 opacity-20 filter brightness-0 invert transition-transform duration-300"
                        style={{
                            transform: `translateY(${scrollY * 0.18}px) rotate(${-45 + scrollY * 0.045}deg)`
                        }}
                    />
                </FloatingElement>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

                {/* Main Heading with Gradient Text and Shimmer */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    <span className="inline-block animate-slideInUp bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
                        Super Imli Traders
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fadeIn animation-delay-500">
                    Your trusted partner in tamarind processing. From raw imli collection to premium cleaned products —
                    we manage the complete supply chain with local vendors and bulk buyers.
                </p>

                {/* Scroll Indicator */}
                <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                        <div className="w-2 h-3 bg-white/70 rounded-full animate-scrollDown" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
