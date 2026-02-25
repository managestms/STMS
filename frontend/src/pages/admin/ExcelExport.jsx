import { useState, useRef, useEffect } from 'react';
import { MdDownload, MdKeyboardArrowDown } from 'react-icons/md';
import api from "../../api/axios";
import T from '../../i18n/T';

const ExcelExport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDownload = async (endpoint, filename) => {
        try {
            const response = await api.get(endpoint, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setIsOpen(false);
        } catch (error) {
            console.error(`Download failed for ${endpoint}:`, error);
            alert(`Failed to download ${filename}. Please try again.`);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="mt-4 md:mt-6 border-t border-gray-100 pt-4 md:pt-6 relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 md:p-3.5 flex items-center justify-center gap-2 transition-all shadow-md group font-bold text-xs md:text-sm"
            >
                <MdDownload className="text-lg" />
                <T k="Export Excel Report" />
                <MdKeyboardArrowDown className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-2">
                    <button
                        onClick={() => handleDownload("/export/locals", "Locals_Report.xlsx")}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-700 text-xs md:text-sm border-b border-gray-100 flex items-center gap-3 transition-colors"
                    >
                        <MdDownload className="text-green-500" />
                        <T k="Locals Data Excel" />
                    </button>
                    <button
                        onClick={() => handleDownload("/export/payments", "Payments_Report.xlsx")}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-700 text-xs md:text-sm flex items-center gap-3 transition-colors"
                    >
                        <MdDownload className="text-green-500" />
                        <T k="Payments Data Excel" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExcelExport;
