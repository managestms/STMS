import qrcode from "qrcode";

export const generateQRCode = async (text) => {
    if (!text) throw new Error("Text is required to generate QR code");

    try {
        return await qrcode.toDataURL(text);
    } catch {
        throw new Error("Failed to generate QR code");
    }
};

export const getOrGenerateQR = async (localDoc) => {
    if (!localDoc) throw new Error("Local document is required");

    // Return existing QR if already saved
    if (localDoc.payment?.upiQRCode) {
        return localDoc.payment.upiQRCode;
    }

    if (!localDoc.payment?.upiId) {
        throw new Error("UPI ID is required to generate QR code");
    }

    // Only generate, do NOT save here
    return await generateQRCode(localDoc.payment.upiId);
};