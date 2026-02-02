const GlassCard = ({ children, className = "" }) => {
    return (
        <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl ${className}`}>
            {children}
        </div>
    )
}

export default GlassCard
