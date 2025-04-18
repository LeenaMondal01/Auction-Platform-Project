import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    startingBid: Number,
    currentBid: { type: Number, default: 0},
    condition: {
        type: String,
        enum: ["New", "Used"],
    },
    startTime: String,
    endTime: String,
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bids: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bid",
            },
            userName: String,
            profileImage: String,
            amount: Number,
        },
    ],
    higestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    commissionCalculated: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Auction = mongoose.model("Auction", auctionSchema);