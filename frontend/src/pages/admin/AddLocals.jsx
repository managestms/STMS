"use client"

import { useState } from "react"
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
        <div className="ml-50">
            <div className="p-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                    <div className="text-center mb-8">
                        <p className="text-gray-600 text-sm italic">
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}{" "}
                            , {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">ADD LOCAL</h2>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 font-medium">{successMessage}</p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 font-medium">{errorMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Local ID</label>
                            <input
                                type="text"
                                name="LocalID"
                                value={formData.LocalID}
                                onChange={handleChange}
                                placeholder="Enter Local ID"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Local Name</label>
                            <input
                                type="text"
                                name="LocalName"
                                value={formData.LocalName}
                                onChange={handleChange}
                                placeholder="Enter Local Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Address</label>
                            <input
                                type="text"
                                name="LocalAddress"
                                value={formData.LocalAddress}
                                onChange={handleChange}
                                placeholder="Enter Local Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="LocalPhone"
                                value={formData.LocalPhone}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">UPI ID</label>
                            <input
                                type="text"
                                name="LocalUPI"
                                value={formData.LocalUPI}
                                onChange={handleChange}
                                placeholder="Enter UPI ID"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-500 flex items-center justify-center gap-2"
                            >
                                {loading ? "Adding..." : "+"}
                                {loading ? "" : "Add Local"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
