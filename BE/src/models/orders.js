import mongoose from "mongoose";
const Orders = new mongoose.Schema(
    {
        address: {
            type: String,
        },
        phone: {
            type: Number,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [{
            product_id: {type: mongoose.Types.ObjectId, required: true},
            color: {
                type: String,
            },
            size: {
                type: String,
            },
            quantity: {type: Number, default: 1},
            _id: false
        }],
        status: {type: String, enum: ["pending", "waiting", "delivering", "done", "cancel"], default: "pending"},
        sale_id: {
            type: mongoose.Types.ObjectId,
        },
        reason: {type: String},
        total_price: Number,
    },
    {
        timestamps: true,
        collection: "Orders",
    }
);

export default mongoose.model("Orders", Orders);