import { useState, useEffect } from "react"
import { MdPeople, MdRefresh, MdSearch, MdError, MdPayment, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import axios from "../../api/axios"

const Payment = () => {
    const [locals, setLocals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredLocals, setFilteredLocals] = useState([])
    const [expandedLocalId, setExpandedLocalId] = useState(null)
    const RATE_PER_UNIT = 15

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

    const toggleExpand = (localId) => {
        if (expandedLocalId === localId) {
            setExpandedLocalId(null)
        } else {
            setExpandedLocalId(localId)
        }
    }

    const calculateTotal = (quantity) => {
        return (quantity || 0) * RATE_PER_UNIT
    }

    if (loading) {
        return (
            <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen flex items-center justify-center overflow-x-hidden">
                <div className="text-center">
                    <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">Loading Payments...</div>
                    <div className="text-gray-600">Please wait while we fetch the data</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen flex items-center justify-center overflow-x-hidden">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center border border-gray-200/50">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MdError className="text-3xl text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Data</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
                    <button
                        onClick={fetchLocals}
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto"
                    >
                        <MdRefresh className="text-lg" />
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen overflow-x-hidden">
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-gray-200/50">
                            <MdPayment className="text-3xl text-gray-700" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900">Payment</h2>
                            <p className="text-gray-600 font-medium">Manage payments for locals</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchLocals}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 self-start lg:self-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
                        aria-label="Refresh payments list"
                    >
                        <MdRefresh className="text-lg" />
                        Refresh
                    </button>
                </div>

                {/* Search Bar with Count */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 mr-6">
                            <div className="bg-blue-100 p-3 rounded-xl mr-4">
                                <MdSearch className="text-blue-600 text-xl" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, phone, or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Search locals"
                                className="flex-1 border-none outline-none text-gray-900 placeholder-gray-400 bg-transparent text-lg font-medium"
                            />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-xl">
                            <div className="text-sm text-gray-600 font-medium">
                                <span className="font-bold text-gray-900">{filteredLocals.length}</span> locals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {filteredLocals.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-200/50">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MdSearch className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {searchTerm ? "No matching locals found" : "No locals available"}
                    </h3>
                    <p className="text-gray-500 text-lg mb-6">
                        {searchTerm ? "Try adjusting your search criteria" : "Start by adding some locals to the system"}
                    </p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-2 border-gray-300 rounded-xl hover:from-gray-200 hover:to-gray-300 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                            Clear Search
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredLocals.map((local) => {
                        const isExpanded = expandedLocalId === local._id
                        const cleanedQty = local.totalReturnedQuantity || 0
                        const assignedQty = local.totalAssignedQuantity || 0
                        const totalAmount = calculateTotal(cleanedQty)

                        return (
                            <div key={local._id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300">
                                {/* Header Row */}
                                <div className={`p-6 flex items-center justify-between cursor-pointer ${isExpanded ? 'bg-[#3d302c] text-white' : 'bg-white hover:bg-gray-50'}`} onClick={() => toggleExpand(local._id)}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md ring-2 ring-opacity-50 ${isExpanded ? 'bg-white/20 ring-white' : 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 ring-blue-50'}`}>
                                                <span className={`text-lg font-bold ${isExpanded ? 'text-white' : 'text-white'}`}>
                                                    {(local.LocalName || "U").charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={`text-lg font-bold ${isExpanded ? 'text-white' : 'text-gray-900'}`}>
                                                {local.LocalName || "Unnamed Local"}
                                            </div>
                                            <div className={`text-sm font-medium flex items-center gap-1 ${isExpanded ? 'text-white/70' : 'text-gray-600'}`}>
                                                <span>ID:</span>
                                                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${isExpanded ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                                    {local.LocalID}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isExpanded
                                                ? 'bg-white text-[#3d302c] hover:bg-gray-100'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span>Pay Now</span>
                                        {isExpanded ? <MdKeyboardArrowUp className="text-xl" /> : <MdKeyboardArrowDown className="text-xl" />}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-8 bg-[#ab9c98] text-white">
                                        <div className="flex justify-between items-start">
                                            <div className="w-2/3">
                                                <div className="mb-6 text-white/90 font-medium">
                                                    From thursday 9/10 to 16/10
                                                </div>
                                                <div className="grid grid-cols-3 gap-8 text-sm font-medium text-white/80 mb-2">
                                                    <div>Date</div>
                                                    <div>Assigned Quantity</div>
                                                    <div>Cleaned Qty.</div>
                                                </div>
                                                {/* Placeholder Row for Payment Calculation */}
                                                <div className="grid grid-cols-3 gap-8 py-4 border-b border-white/30 text-white font-semibold">
                                                    <div>-</div>
                                                    <div className="text-xl">{assignedQty}</div>
                                                    <div className="text-xl">{cleanedQty}</div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-8 py-4 text-white font-bold text-lg">
                                                    <div>Total :</div>
                                                    <div>{assignedQty}</div>
                                                    <div>{cleanedQty}</div>
                                                </div>
                                            </div>

                                            <div className="w-1/3 flex flex-col items-end">
                                                <div className="text-right mb-6 text-white/80 text-sm">
                                                    {/* Order ID placeholder */}
                                                    238-92
                                                </div>
                                                <div className="text-4xl font-bold mb-4">
                                                    {cleanedQty} * {RATE_PER_UNIT} = {totalAmount}
                                                </div>
                                                <div className="text-right mb-4">
                                                    <div className="text-white/80 text-sm mb-1">Cash</div>
                                                    <button className="text-3xl font-bold text-[#90EE90] hover:text-[#7CFC00] transition-colors uppercase tracking-wide">
                                                        Pay Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Payment
