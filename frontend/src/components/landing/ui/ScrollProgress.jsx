"use client"
import { useState, useEffect } from 'react'

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollProgress = (window.scrollY / totalHeight) * 100
            setProgress(scrollProgress)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
            <div
                className="h-full bg-gradient-to-r from-[#ff741f] via-[#ff9b54] to-[#ff741f] transition-all duration-150 shadow-lg shadow-orange-500/50"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

export default ScrollProgress
