import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Config } from "../models/config.model.js"
import { imliReturn } from "../models/imliReturn.model.js"
import { ImliAssign } from "../models/imliAssign.model.js"
import { localData } from "../models/local.model.js"


export const Imli_price_changer = asyncHandler(async (req, res) => {

    const { price } = req.body;
    const config = await Config.findOneAndUpdate(
        {},
        { $set: { price_per_cleaned_imli: price } },
        { returnDocument: 'after', upsert: true }
    );
    return res.status(200).json(
        new ApiResponse(200, { price: config.price_per_cleaned_imli }, "Price updated successfully")
    );

});

export const orderReference = asyncHandler(async (req, res) => {
    const { localID } = req.body;

    if (!localID) throw new ApiError(400, "localID required");

    const r = await imliReturn.findOne({ localID, returnedQuantity: { $gt: 0 } });
    if (!r) throw new ApiError(404, "No pending return record found");

    const p = await Config.findOne();
    if (!p) throw new ApiError(404, "Price config not found");

    const total = r.returnedQuantity * p.price_per_cleaned_imli;

    return res.status(200).json(
        new ApiResponse(200, {
            orderReference: r._id,
            quantity: r.returnedQuantity,
            price_per_cleaned_imli: p.price_per_cleaned_imli,
            total,
        }, "Order details fetched successfully")
    );
});

export const confirmPayment = asyncHandler(async (req, res) => {
    const { localId, method } = req.body;

    if (!localId || !method) throw new ApiError(400, "localId and method are required");

    const r = await imliReturn.findOne({ localID: localId, returnedQuantity: { $gt: 0 } });
    if (!r) throw new ApiError(404, "No pending return record found");

    const p = await Config.findOne();
    if (!p) throw new ApiError(404, "Price config not found");

    const local = await localData.findOne({ LocalID: localId });
    if (!local) throw new ApiError(404, "Local not found");

    const total = r.returnedQuantity * p.price_per_cleaned_imli;
    // localTotalPaid = is local ko ab tak total kitna paid hua (existing + is baar ka)
    const localTotalPaid = local.totalPaidAmount + total;

    if (method === "Cash") {
        try {
            await Payment.create({
                local: local._id,
                localID: localId,
                method,
                amount: total
            });

            await localData.findOneAndUpdate(
                { LocalID: localId },
                { $inc: { totalPaidAmount: total } }
            );

            await ImliAssign.findOneAndUpdate(
                { localID: localId },
                { $inc: { assignedQuantity: -r.returnedQuantity } }
            );

            await imliReturn.findOneAndUpdate(
                { _id: r._id },
                { $inc: { returnedQuantity: -r.returnedQuantity } }
            );

            return res.status(201).json(
                new ApiResponse(201, {
                    orderReference: r._id,
                    total,
                    localTotalPaid,
                    method,
                }, "Payment successful")
            );
        } catch (err) {
            throw new ApiError(500, err.message);
        }
    }

    if (method === "Online") {
        try {
            if (!local.upiId || !local.upiQrCode) throw new ApiError(404, "UPI not configured for this local");

            await Payment.create({
                local: local._id,
                localID: localId,
                method,
                amount: total
            });

            await localData.findOneAndUpdate(
                { LocalID: localId },
                { $inc: { totalPaidAmount: total } }
            );

            await ImliAssign.findOneAndUpdate(
                { localID: localId },
                { $inc: { assignedQuantity: -r.returnedQuantity } }
            );

            await imliReturn.findOneAndUpdate(
                { _id: r._id },
                { $inc: { returnedQuantity: -r.returnedQuantity } }
            );

            return res.status(200).json(
                new ApiResponse(200, {
                    orderReference: r._id,
                    total,
                    localTotalPaid,
                    method,
                    upiId: local.upiId,
                    qr: local.upiQrCode,
                }, "Scan QR to pay")
            );
        } catch (err) {
            throw new ApiError(500, err.message);
        }
    }
});
