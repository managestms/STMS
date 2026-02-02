"use client"
import { useState, useRef } from 'react'

const MagneticButton = ({ children, onClick, className = "" }) => {
    const buttonRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const distance = Math.sqrt(x * x + y * y)
        const maxDistance = 50

        if (distance < maxDistance) {
            setPosition({ x: x * 0.3, y: y * 0.3 })
        }
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'transform 0.2s ease-out'
            }}
        >
            {children}
        </button>
    )
}

export default MagneticButton
