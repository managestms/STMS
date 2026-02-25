import * as XLSX from "xlsx";

// ─── Column configs per export type ──────────────────────────────────────────
// Only these fields will appear in the sheet, in this exact order.
// If no config exists for a sheetName, all fields are exported (auto-detect).

const COLUMN_CONFIGS = {
    Payments: [
        { key: "LocalID", header: "Local ID" },
        { key: "localName", header: "Local Name" },
        { key: "period", header: "Period", type: "date" },
        { key: "assignedQty", header: "Assigned Qty" },
        { key: "cleanedQty", header: "Cleaned Qty" },
        { key: "rate", header: "Rate (₹)" },
        { key: "totalAmount", header: "Total Amount (₹)" },
        { key: "paymentMethod", header: "Payment Method" },
        { key: "paymentStatus", header: "Status" },
    ],
    LocalData: [
        { key: "LocalID", header: "Local ID" },
        { key: "LocalName", header: "Name" },
        { key: "LocalAddress", header: "Address" },
        { key: "LocalPhone", header: "Phone" },
        { key: "totalAssignedQuantity", header: "Total Assigned" },
        { key: "totalReturnedQuantity", header: "Total Returned" },
        { key: "upiId", header: "UPI ID" },
        { key: "totalPaidAmount", header: "Total Paid (₹)" },
    ],
};

/**
 * Format a Date value to DD-MM-YYYY
 */
const formatDate = (value) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
};

/**
 * Convert camelCase / PascalCase to readable header
 */
const toReadableHeader = (key) => {
    return key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .replace(/^./, (c) => c.toUpperCase());
};

/**
 * Build rows using a column config (specific fields in specific order)
 */
const buildWithConfig = (data, config) => {
    const headers = config.map((c) => c.header);

    const rows = data.map((row) =>
        config.map((col) => {
            let val = row[col.key];
            if (val == null) return "";
            if (col.type === "date") return formatDate(val);
            if (typeof val === "object" && val._bsontype) return val.toString();
            return val;
        })
    );

    return { headers, rows };
};

/**
 * Build rows with auto-detect (all fields, strips _id/__v, formats dates)
 */
const buildAutoDetect = (data) => {
    const cleanData = data.map((row) => {
        const clean = {};
        for (const [key, value] of Object.entries(row)) {
            if (key === "_id" || key === "__v") continue;
            if (value instanceof Date || key === "period" || key === "createdAt" || key === "updatedAt") {
                clean[key] = formatDate(value);
                continue;
            }
            if (value && typeof value === "object" && value._bsontype) {
                clean[key] = value.toString();
                continue;
            }
            clean[key] = value;
        }
        return clean;
    });

    const keys = Object.keys(cleanData[0]);
    const headers = keys.map(toReadableHeader);
    const rows = cleanData.map((row) => keys.map((k) => row[k] != null ? row[k] : ""));

    return { headers, rows };
};

/**
 * Calculate optimal column widths
 */
const getColumnWidths = (headers, rows) => {
    return headers.map((header, i) => {
        const headerLen = header.length;
        const maxDataLen = rows.reduce((max, row) => {
            const len = row[i] != null ? String(row[i]).length : 0;
            return Math.max(max, len);
        }, 0);
        return { wch: Math.max(headerLen, maxDataLen) + 2 };
    });
};

/**
 * Main handler: converts an array of Mongo documents into an XLSX buffer
 *
 * @param {Array<Object>} data      - Array of .lean() Mongoose documents
 * @param {string}        sheetName - Name shown on the Excel sheet tab
 * @returns {Buffer} XLSX file buffer ready to send as response
 */
export const xlslhandler = (data, sheetName) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No data to export");
    }

    // Use config if available, otherwise auto-detect
    const config = COLUMN_CONFIGS[sheetName];
    const { headers, rows } = config
        ? buildWithConfig(data, config)
        : buildAutoDetect(data);

    // Build sheet
    const sheetData = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    worksheet["!cols"] = getColumnWidths(headers, rows);

    // Build workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const output = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
    });
    return Buffer.from(output);
};