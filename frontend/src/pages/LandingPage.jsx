"use client"
import { useNavigate } from 'react-router-dom'
import ScrollProgress from '../components/landing/ui/ScrollProgress'
import GlassHeader from '../components/landing/ui/GlassHeader'
import HeroSection from '../components/landing/sections/HeroSection'
import HowItWorksSection from '../components/landing/sections/HowItWorksSection'
import FeaturesSection from '../components/landing/sections/FeaturesSection'
import StatsSection from '../components/landing/sections/StatsSection'
import CTASection from '../components/landing/sections/CTASection'
import Footer from '../components/landing/sections/Footer'

const LandingPage = () => {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate('/login')
    }

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Custom Styles for Animations */}
            <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scrollDown {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(10px); }
        }
        
        @keyframes scrollUp {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(5deg);
          }
        }
        
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-scrollDown {
          animation: scrollDown 2s ease-in-out infinite;
        }
        
        .animate-scrollUp {
          animation: scrollUp 2s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .animate-text-shimmer {
          animation: text-shimmer 3s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

            <ScrollProgress />
            <GlassHeader onLogin={handleGetStarted} />
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <StatsSection />
            <CTASection onGetStarted={handleGetStarted} />
            <Footer />
        </div>
    )
}

export default LandingPage
