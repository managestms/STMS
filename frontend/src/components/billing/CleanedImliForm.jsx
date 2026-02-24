"use client"

import { MdArrowForward, MdArrowBack, MdAdd, MdDelete, MdPerson } from 'react-icons/md'

const EMPTY_ROW = { product: "", quantity: "", unit: "", weight: "", amount: "" }

const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.1rem 1.1rem',
}

export default function CleanedImliForm({ imliData, setImliData, onNext, onBack }) {
    const { senderName = "", rows = [{ ...EMPTY_ROW }, { ...EMPTY_ROW }] } = imliData

    const updateSenderName = (value) => {
        setImliData({ ...imliData, senderName: value, rows })
    }

    const updateRow = (index, field, value) => {
        const updated = rows.map((row, i) => {
            if (i !== index) return row
            const newRow = { ...row, [field]: value }

            // Auto-set unit when product changes
            if (field === "product") {
                if (value === "HT") newRow.unit = "bag"
                else if (value === "1kg Packet") newRow.unit = "box"
                else newRow.unit = ""
            }

            return newRow
        })
        setImliData({ ...imliData, senderName, rows: updated })
    }

    const addRow = () => {
        setImliData({ ...imliData, senderName, rows: [...rows, { ...EMPTY_ROW }] })
    }

    const removeRow = (index) => {
        if (rows.length <= 2) return
        setImliData({ ...imliData, senderName, rows: rows.filter((_, i) => i !== index) })
    }

    const isValid = senderName.trim() && rows.every(
        (r) => r.product && r.quantity && r.weight && r.amount
    )

    // Calculate totals
    const totalWeight = rows.reduce((sum, r) => sum + (parseFloat(r.weight) || 0), 0)
    const totalAmount = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)

    return (
        <div className="space-y-6">
            {/* Section Title */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Cleaned Imli Bill</h3>
                <p className="text-gray-500 text-sm font-medium">Fill in sender and item details</p>
            </div>

            {/* Sender Name */}
            <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    <MdPerson className="text-orange-500" />
                    Sender Name <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={senderName}
                    onChange={(e) => updateSenderName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-base font-medium"
                    required
                />
            </div>

            {/* Items Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_auto] bg-orange-50 border-b border-orange-200">
                    <div className="px-4 py-3 text-xs font-bold text-orange-700 uppercase tracking-wide">Product</div>
                    <div className="px-4 py-3 text-xs font-bold text-orange-700 uppercase tracking-wide">Quantity</div>
                    <div className="px-4 py-3 text-xs font-bold text-orange-700 uppercase tracking-wide">Weight (kg)</div>
                    <div className="px-4 py-3 text-xs font-bold text-orange-700 uppercase tracking-wide">Amount (₹)</div>
                    <div className="px-2 py-3 w-10"></div>
                </div>

                {/* Table Rows */}
                {rows.map((row, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-[2fr_1.2fr_1fr_1.2fr_auto] items-center border-b border-gray-100 last:border-0 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                    >
                        {/* Product Dropdown */}
                        <div className="px-3 py-2">
                            <select
                                value={row.product}
                                onChange={(e) => updateRow(index, "product", e.target.value)}
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer"
                                style={selectStyle}
                            >
                                <option value="">Select</option>
                                <option value="HT">HT</option>
                                <option value="1kg Packet">1kg Packet</option>
                            </select>
                        </div>

                        {/* Quantity + auto unit */}
                        <div className="px-3 py-2">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => updateRow(index, "quantity", e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                                />
                                {row.unit && (
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md whitespace-nowrap border border-orange-200">
                                        {row.unit === "bag" ? "bags" : "boxes"}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Weight */}
                        <div className="px-3 py-2">
                            <input
                                type="number"
                                value={row.weight}
                                onChange={(e) => updateRow(index, "weight", e.target.value)}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                        </div>

                        {/* Amount */}
                        <div className="px-3 py-2">
                            <input
                                type="number"
                                value={row.amount}
                                onChange={(e) => updateRow(index, "amount", e.target.value)}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            />
                        </div>

                        {/* Delete button */}
                        <div className="px-2 py-2 flex justify-center">
                            {rows.length > 2 ? (
                                <button
                                    type="button"
                                    onClick={() => removeRow(index)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                                    title="Remove row"
                                >
                                    <MdDelete className="text-lg" />
                                </button>
                            ) : (
                                <div className="w-8 h-8" />
                            )}
                        </div>
                    </div>
                ))}

                {/* Totals Row */}
                <div className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_auto] items-center bg-orange-50/80 border-t-2 border-orange-200">
                    <div className="px-4 py-3 text-sm font-bold text-gray-700 uppercase">Total</div>
                    <div className="px-4 py-3 text-sm font-bold text-gray-500">—</div>
                    <div className="px-4 py-3 text-sm font-bold text-orange-700">
                        {totalWeight.toLocaleString("en-IN", { minimumFractionDigits: 2 })} kg
                    </div>
                    <div className="px-4 py-3 text-sm font-bold text-orange-700">
                        ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="px-2 py-3 w-10"></div>
                </div>
            </div>

            {/* Add Row */}
            <button
                type="button"
                onClick={addRow}
                className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 px-4 py-2 rounded-lg border border-dashed border-orange-300 hover:bg-orange-50 transition-all duration-200 cursor-pointer"
            >
                <MdAdd className="text-lg" />
                Add Row
            </button>

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                    <MdArrowBack className="text-lg" />
                    Back
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!isValid}
                    className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all duration-200 shadow-sm flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    Preview
                    <MdArrowForward className="text-lg" />
                </button>
            </div>
        </div>
    )
}
