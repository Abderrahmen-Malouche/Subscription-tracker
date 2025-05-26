import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required."],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [0, "Price cannot be negative."],
        max: [10000, "Price cannot exceed 10000."],
    },
    currency: {
        type: String,
        required: [true, "Currency is required."],
        trim: true,
        enum: ["USD", "EUR", "HUF", "TND", "GBP"],
        default: "EUR"
    },
    frequency: {
        type: String,
        required: [true, "Recurrence is required."],
        enum: ["daily", "monthly", "yearly"],
        default: "monthly"
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required."],
        enum: ["card", "paypal", "bank_transfer"],
        default: "card",
        trim: true
    },
    type: {
        type: String,
        required: [true, "Subscription type is required."],
        enum: ["Sports", "Entertainment", "News", "Education", "Health"],
        default: "Entertainment",
    },
    status: {
        type: String,
        required: [true, "Subscription status is required."],
        enum: ["active", "inactive", "cancelled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required."],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date cannot be in the future."
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: "Renewal Date should be after the Start Date."
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required."],
        index: true
    }

}, { timestamps: true });

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next(); 

})

export default subscriptionModel;

