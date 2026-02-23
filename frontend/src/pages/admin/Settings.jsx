"use client"

import { useState } from "react"
import { MdSettings, MdCheckCircle, MdError, MdEco, MdSave, MdRefresh } from 'react-icons/md'
import api from "../../api/axios"
import { t } from "../../i18n/translations"
import { useLang } from "../../context/LanguageContext"
import T from "../../i18n/T"

export default function Settings() {
    const { lang } = useLang()
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleUpdatePrice = async (e) => {
        e.preventDefault()
        if (!price || isNaN(price)) {
            setErrorMessage(t("Please enter a valid price", lang))
            return
        }

        setLoading(true)
        setSuccessMessage("")
        setErrorMessage("")

        try {
            const response = await api.patch("/imli-price", { price: Number(price) })
            setSuccessMessage(t("Price updated successfully", lang))
            console.log("Response:", response.data)
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || t("Failed to update price. Please try again.", lang)
            )
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white p-6 overflow-x-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-white px-8 py-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                <MdSettings className="text-2xl text-orange-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900"><T k="Settings" /></h1>
                                <p className="text-gray-500 text-sm font-medium">Configure application settings and prices</p>
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

                        <div className="space-y-8">
                            {/* Imli Price Section */}
                            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <MdEco className="text-xl text-orange-500" />
                                    <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Imli Price Configuration</h2>
                                </div>

                                <form onSubmit={handleUpdatePrice} className="max-w-md">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                <T k="Price" /> (Per Cleaned Imli)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    placeholder="e.g. 15"
                                                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                                                    required
                                                />
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500 font-medium">
                                                This price will be used for calculating payments to locals.
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <MdSave className="text-xl" />
                                                    <T k="Update Price" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Additional settings can be added here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
