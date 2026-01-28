import qrcode from "qrcode";

export const generateQRCode = async (text) => {
    if (!text) {
        throw new Error("Text is required to generate QR code");
    }
    try {
        const qrCodeDataURL = await qrcode.toDataURL(text);
        return qrCodeDataURL;
    } catch (error) {
        throw new Error("Failed to generate QR code");
    }
};

export const getOrGenerateQR = async (localDoc) => {
    if (localDoc.payment?.upiQRCode) {
        return localDoc.payment.upiQRCode;
    }
    
    if (!localDoc.payment?.upiId) {
        throw new Error("UPI ID is required to generate QR code");
    }
    
    const qrCodeDataURL = await generateQRCode(localDoc.payment.upiId);
    return qrCodeDataURL;
};
