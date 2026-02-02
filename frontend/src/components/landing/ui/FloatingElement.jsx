const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => {
    return (
        <div
            className={`animate-float ${className}`}
            style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
            }}
        >
            {children}
        </div>
    )
}

export default FloatingElement
