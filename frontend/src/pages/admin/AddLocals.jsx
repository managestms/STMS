"use client"

import { useState } from "react"
import { MdPersonAdd, MdCancel, MdCheckCircle, MdError, MdPerson, MdHome, MdPhone, MdPayment, MdSchedule } from 'react-icons/md'
import api from "../../api/axios"

export default function AddLocals() {
    const [formData, setFormData] = useState({
        LocalID: "",
        LocalName: "",
        LocalAddress: "",
        LocalPhone: "",
        LocalUPI: "",
    })

    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccessMessage("")
        setErrorMessage("")

        try {
            const response = await api.post("/addLocal", formData)

            setSuccessMessage("✅ Local added successfully to the system")
            setFormData({
                LocalID: "",
                LocalName: "",
                LocalAddress: "",
                LocalPhone: "",
                LocalUPI: "",
            })

            console.log("Response:", response.data)
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to add local. Please try again."
            )
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            LocalID: "",
            LocalName: "",
            LocalAddress: "",
            LocalPhone: "",
            LocalUPI: "",
        })
        setSuccessMessage("")
        setErrorMessage("")
    }

    return (
        <div className="min-h-screen bg-white p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-white px-8 py-6 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                    <MdPersonAdd className="text-2xl text-orange-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Add Local</h1>
                                    <p className="text-gray-500 text-sm font-medium">Register a new local worker</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100">
                                <MdSchedule className="text-gray-400" />
                                <p className="text-gray-500 text-xs font-medium">
                                    {new Date().toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {successMessage && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm flex items-center gap-3">
                                <MdCheckCircle className="text-green-500 text-lg" />
                                <p className="text-green-800 font-medium text-sm">{successMessage}</p>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm flex items-center gap-3">
                                <MdError className="text-red-500 text-lg" />
                                <p className="text-red-800 font-medium text-sm">{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                        <MdPerson className="text-orange-500" />
                                        Local ID
                                    </label>
                                    <input
                                        type="text"
                                        name="LocalID"
                                        value={formData.LocalID}
                                        onChange={handleChange}
                                        placeholder="Enter unique local ID"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                        <MdPerson className="text-orange-500" />
                                        Local Name
                                    </label>
                                    <input
                                        type="text"
                                        name="LocalName"
                                        value={formData.LocalName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                    <MdHome className="text-orange-500" />
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="LocalAddress"
                                    value={formData.LocalAddress}
                                    onChange={handleChange}
                                    placeholder="Enter complete address with landmarks"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                        <MdPhone className="text-orange-500" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="LocalPhone"
                                        value={formData.LocalPhone}
                                        onChange={handleChange}
                                        placeholder="Enter 10-digit mobile number"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                        <MdPayment className="text-orange-500" />
                                        UPI ID
                                    </label>
                                    <input
                                        type="text"
                                        name="LocalUPI"
                                        value={formData.LocalUPI}
                                        onChange={handleChange}
                                        placeholder="username@upi or mobile@upi"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2 text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding Local...
                                        </>
                                    ) : (
                                        <>
                                            <MdPersonAdd className="text-lg" />
                                            Add Local
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
