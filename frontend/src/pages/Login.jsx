"use client"
import React, { useState, useEffect } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import FloatingElement from '../components/landing/ui/FloatingElement'
import GlassCard from '../components/landing/ui/GlassCard'

function Login() {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const res = await api.post("/login", {
        username,
        password,
      })

      const role = res.data.data.user.role

      if (role === "admin") {
        navigate("/admin/dashboard")
      } else if (role === "operator") {
        navigate("/operator/dashboard")
      } else {
        alert("Invalid role")
      }

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff741f] via-[#ff8c42] to-[#ffab6b] animate-gradient-shift" />

      {/* Animated Background - Floating Tamarind Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={4} className="absolute top-20 left-10">
          <img
            src="/leaf.svg"
            alt=""
            className="w-24 h-24 opacity-20 filter brightness-0 invert transition-transform duration-300"
            style={{ transform: `rotate(-15deg)` }}
          />
        </FloatingElement>
        <FloatingElement delay={1} duration={5} className="absolute top-32 right-20">
          <img
            src="/leaf.svg"
            alt=""
            className="w-32 h-32 opacity-15 filter brightness-0 invert"
            style={{ transform: `rotate(20deg)` }}
          />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={6} className="absolute bottom-32 left-1/4">
          <img
            src="/leaf.svg"
            alt=""
            className="w-20 h-20 opacity-25 filter brightness-0 invert"
            style={{ transform: `rotate(-30deg)` }}
          />
        </FloatingElement>
        <FloatingElement delay={1.5} duration={5} className="absolute bottom-40 right-10">
          <img
            src="/leaf.svg"
            alt=""
            className="w-28 h-28 opacity-15 filter brightness-0 invert"
            style={{ transform: `rotate(10deg)` }}
          />
        </FloatingElement>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <GlassCard className="p-8 md:p-10 w-full">
          <div className="flex flex-col items-center mb-8">
            <img
              src="/stms-logo.svg"
              alt="Super Imli Traders"
              className="h-16 w-auto mb-4 filter brightness-0 invert"
            />
            <h1 className="text-3xl font-bold text-white tracking-tight">Login</h1>
            <p className="text-white/70 mt-2 text-sm">Welcome back to Super Imli Traders</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2 font-sans">
                Phone or Email
              </label>
              <input
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff741f] focus:border-transparent transition-all backdrop-blur-sm"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                type="text"
                placeholder="Enter your Phone or Email"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-white/90 mb-2 font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff741f] focus:border-transparent transition-all backdrop-blur-sm"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#ff741f] to-[#ff9b54] text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Login