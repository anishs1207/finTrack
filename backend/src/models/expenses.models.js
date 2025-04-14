import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const expenseSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    expenseName: {
        type: String,
        required: true,
        unqiue: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["LIVING", "TRANSPORT", "FOOD", "HEALTH", "ENTERTAIN", "SAVE", "MISC"],
        default: "MISC",
    }

}, { timestamps: true })

expenseSchema.plugin(mongooseAggregatePaginate);

export const Expense = mongoose.model("Expense", expenseSchema);