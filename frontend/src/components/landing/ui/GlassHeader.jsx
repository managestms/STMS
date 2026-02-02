"use client"
import { useState, useEffect } from 'react'
import { MdLogin } from 'react-icons/md'
const GlassHeader = ({ onLogin }) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <style>{`
                .logo-scrolled {
                    filter: invert(1) brightness(0);
                }
            `}</style>
            <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
                <div className={`transition-all duration-300 rounded-2xl ${scrolled
                    ? 'backdrop-blur-xl bg-white/70 shadow-2xl border border-white/40'
                    : 'backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl'
                    }`}>
                    <div className="px-6">
                        <div className="flex items-center justify-between h-14">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <img
                                    src="/stms-logo.svg"
                                    alt="Super Imli Traders"
                                    className={`h-8 w-auto transition-all duration-300 ${scrolled ? 'logo-scrolled' : ''}`}
                                />
                                <span className={`text-lg font-bold transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>
                                    Super Imli Traders
                                </span>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={onLogin}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 bg-[#ff741f] text-white hover:bg-[#ff8c42] shadow-md hover:shadow-lg"
                            >
                                <MdLogin className="text-base" />
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default GlassHeader


