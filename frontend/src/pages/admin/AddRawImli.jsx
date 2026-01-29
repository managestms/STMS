"use client"

import { useState } from "react"
import api from "../../api/axios"
import toast from "react-hot-toast"

const AddRawImli = () => {
  const [rawImliQuantity, setRawImliQuantity] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!rawImliQuantity) {
      toast.error("Please enter imli quantity")
      return
    }

    try {
      await api.post("/addRawImli", {
        rawImliQuantity,
      })

      toast.success(`✅ ${rawImliQuantity} KG Imli added to stock`)
      setRawImliQuantity("")
    } catch (error) {
      toast.error("❌ Failed to add imli")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-x-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Add Imli Stock</h1>
              <p className="text-orange-100 text-xs">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Imli Quantity (KG)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter quantity in KG"
                  value={rawImliQuantity}
                  onChange={(e) => setRawImliQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRawImliQuantity("")}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>➕</span>
                  <span>Add to Stock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRawImli
