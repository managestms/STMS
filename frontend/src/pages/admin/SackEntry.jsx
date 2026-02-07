import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

import api from "../../api/axios";

const SackEntryColumn = () => {
    const [rows, setRows] = useState([{ localId: '', quantity: '', delivered: false }]);
    const [allLocals, setAllLocals] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Fetch all locals on component mount
    React.useEffect(() => {
        const fetchLocals = async () => {
            try {
                const response = await api.post("/getlocalData");
                if (response.data && response.data.data) {
                    setAllLocals(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching locals:", error);
            }
        };
        fetchLocals();
    }, []);

    // Click outside to close dropdown
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.local-search-container')) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addRow = () => {
        setRows([...rows, { localId: '', quantity: '', delivered: false }]);
    };

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);

        if (field === 'localId') {
            setActiveDropdown(index);
        }
    };

    const handleSelectLocal = (index, local) => {
        const newRows = [...rows];
        newRows[index].localId = local.LocalID;
        setRows(newRows);
        setActiveDropdown(null);
    };

    const getFilteredLocals = (query) => {
        if (!query) return [];
        return allLocals.filter(local =>
            local.LocalID.toString().toLowerCase().includes(query.toLowerCase()) ||
            local.LocalName.toLowerCase().includes(query.toLowerCase())
        );
    };

    const toggleRowDelivered = (index) => {
        const newRows = [...rows];
        newRows[index].delivered = !newRows[index].delivered;
        setRows(newRows);
    };

    const allDelivered = rows.length > 0 && rows.every(row => row.delivered);
    const toggleAllDelivered = () => {
        const newDeliveredState = !allDelivered;
        const newRows = rows.map(row => ({ ...row, delivered: newDeliveredState }));
        setRows(newRows);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-full shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex-1 text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">ID</div>
                <div className="flex-1 text-xs font-bold text-gray-500 uppercase tracking-wider text-right pr-4">Quantity</div>
                <div className="w-[100px] flex flex-col items-center justify-center border-l border-gray-200 pl-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Delivered</span>
                    <input
                        type="checkbox"
                        checked={allDelivered}
                        onChange={toggleAllDelivered}
                        className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer transition-transform hover:scale-105"
                    />
                </div>
            </div>

            {/* Rows */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                {rows.map((row, index) => (
                    <div
                        key={index}
                        className={`flex items-center px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors duration-200 group ${row.delivered ? 'bg-orange-50/30' : ''}`}
                    >
                        <div className="flex-1 pr-3 relative local-search-container">
                            <input
                                type="text"
                                value={row.localId}
                                onChange={(e) => handleChange(index, 'localId', e.target.value)}
                                onFocus={() => setActiveDropdown(index)}
                                className="w-full bg-transparent border-b border-transparent focus:border-orange-500 outline-none text-sm font-medium text-gray-700 placeholder-gray-400 py-1 transition-all"
                                placeholder="Enter ID"
                            />

                            {/* Autocomplete Dropdown */}
                            {activeDropdown === index && row.localId && (
                                <div className="absolute top-full left-0 w-full z-50 bg-white rounded-lg shadow-lg border border-gray-100 mt-1 max-h-48 overflow-y-auto">
                                    {getFilteredLocals(row.localId).length > 0 ? (
                                        getFilteredLocals(row.localId).map((local) => (
                                            <div
                                                key={local._id || local.LocalID}
                                                onClick={() => handleSelectLocal(index, local)}
                                                className="px-3 py-2 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0"
                                            >
                                                <div className="text-sm font-medium text-gray-900">{local.LocalID}</div>
                                                <div className="text-xs text-gray-500 truncate">{local.LocalName}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-xs text-gray-400">No match found</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 pl-3 pr-4 border-l border-gray-100">
                            <input
                                type="number"
                                value={row.quantity}
                                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                className="w-full bg-transparent border-b border-transparent focus:border-orange-500 outline-none text-sm font-medium text-gray-700 placeholder-gray-400 py-1 text-right transition-all"
                                placeholder="0"
                            />
                        </div>
                        <div className="w-[100px] flex items-center justify-center border-l border-gray-100 pl-2">
                            <input
                                type="checkbox"
                                checked={row.delivered}
                                onChange={() => toggleRowDelivered(index)}
                                className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer transition-transform hover:scale-105"
                            />
                        </div>
                    </div>
                ))}

                {rows.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <p className="text-sm">No entries yet</p>
                    </div>
                )}
            </div>

            {/* Footer / Add Button */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                    onClick={addRow}
                    className="w-full bg-white hover:bg-orange-50 text-gray-600 hover:text-orange-700 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-gray-300 hover:border-orange-200 shadow-sm hover:shadow-md"
                >
                    <div className="bg-gray-100 group-hover:bg-orange-100 p-1 rounded-full transition-colors">
                        <MdAdd className="text-lg" />
                    </div>
                    <span className="text-sm">Add New Row</span>
                </button>
            </div>
        </div>
    );
};

const SackEntry = () => {
    const currentDate = new Date().toLocaleDateString('en-GB');

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-lg font-bold text-gray-900">
                    Sack Entry
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    {currentDate}
                </span>
            </div>

            <div className="flex-1 min-h-0">
                <SackEntryColumn />
            </div>
        </div>
    );
};

export default SackEntry;
