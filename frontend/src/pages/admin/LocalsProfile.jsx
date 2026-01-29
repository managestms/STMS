import { useState, useEffect } from "react"
import axios from "../../api/axios"
import { IoEye, IoPencil, IoAdd } from "react-icons/io5"
import LocalDetailsModal from "../../components/LocalDetailsModal"

const LocalsProfile = ({ navigateToAssignImli }) => {
  const [locals, setLocals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocals, setFilteredLocals] = useState([])
  const [selectedLocal, setSelectedLocal] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchLocals()
  }, [])

  const fetchLocals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post("http://localhost:8000/api/getlocalData")
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
          local.LocalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          local.LocalPhone?.toString().includes(searchTerm) ||
          local.LocalID?.toString().includes(searchTerm)
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

  const openModal = (local) => {
    setSelectedLocal(local)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedLocal(null)
    setIsModalOpen(false)
  }

  const handleDeleteLocal = (deletedLocalId) => {
    // Remove the deleted local from both locals and filteredLocals arrays
    const updatedLocals = locals.filter(local => local._id !== deletedLocalId)
    setLocals(updatedLocals)
    setFilteredLocals(updatedLocals)
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
        
        {/* Search Bar with Count */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 mb-4 border border-gray-200 rounded-lg">
          <div className="flex items-center flex-1">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search locals by name, phone, or ID"
              className="flex-1 border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredLocals.length} locals
          </div>
        </div>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Local
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Assigned Qty
                  </th>
                  <th className="px-4 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider pr-44">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLocals.map((local, index) => (
                  <tr key={local._id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                            <span className="text-sm font-semibold text-white">
                              {(local.LocalName || "U").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {local.LocalName || "Unnamed Local"}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            ID: {local.LocalID}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-1">
                          {local.totalAssignedQuantity || 0}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">kg</span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <svg className="w-2.5 h-2.5 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-6 text-right pr-8">
                      <div className="flex items-center justify-end space-x-3 mr-4">
                        <button 
                          onClick={() => openModal(local)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          title="View Details"
                        >
                          <IoEye className="w-4 h-4 mr-2" />
                          View
                        </button>
                        <button 
                          onClick={() => navigateToAssignImli && navigateToAssignImli(local)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Assign Imli"
                        >
                          <IoAdd className="w-4 h-4 mr-2" />
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* Local Details Modal */}
      <LocalDetailsModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        local={selectedLocal}
        onDelete={handleDeleteLocal}
      />
    </div>
  )
}

export default LocalsProfile;