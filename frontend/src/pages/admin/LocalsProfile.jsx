import { useState, useEffect } from "react"
import axios from "../../api/axios"

const LocalsProfile = () => {
  const [locals, setLocals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocals, setFilteredLocals] = useState([])

  useEffect(() => {
    fetchLocals()
  }, [])

  const fetchLocals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get("http://localhost:8000/api/return_local")
      if (response.data.data) {
        setLocals(response.data.data)
        setFilteredLocals(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching locals:", error)
      setError("Failed to load locals. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const filtered = locals.filter(
        (local) =>
          local.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          local.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          local.phone?.includes(searchTerm)
      )
      setFilteredLocals(filtered)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, locals])

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase()
    switch (statusLower) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="p-8 bg-gray-100 ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <div className="text-2xl font-bold text-gray-700">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-100 ml-64 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchLocals}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-100 ml-64 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Locals Profile</h2>
          <button
            onClick={fetchLocals}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            aria-label="Refresh locals list"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search locals by name, email, or phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {filteredLocals.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">
            {searchTerm ? "No locals found matching your search" : "No locals found"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocals.map((local) => (
            <div
              key={local._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-gray-900"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {local.name || "Unnamed Local"}
                </h3>
                <p className="text-gray-600 text-sm">{local.localType || "Local"}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <span className="text-gray-500 font-semibold mr-2 min-w-fit">
                    Email:
                  </span>
                  <span className="text-gray-700 break-all">
                    {local.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 font-semibold mr-2 min-w-fit">
                    Phone:
                  </span>
                  <span className="text-gray-700">{local.phone || "N/A"}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 font-semibold mr-2 min-w-fit">
                    Address:
                  </span>
                  <span className="text-gray-700">{local.address || "N/A"}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 font-semibold mr-2 min-w-fit">
                    City:
                  </span>
                  <span className="text-gray-700">{local.city || "N/A"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span
                    className={`${getStatusColor(
                      local.status
                    )} px-3 py-1 rounded-full text-sm font-semibold capitalize`}
                  >
                    {local.status || "Active"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredLocals.length > 0 && (
        <div className="mt-8 bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredLocals.length}
              </span>{" "}
              of <span className="font-bold text-gray-900">{locals.length}</span>{" "}
              total locals
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LocalsProfile;