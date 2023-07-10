import mongoose, {model, Schema, models} from "mongoose"

const ReviewSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    stars: {type: Number, required: true},
    product: {type:Schema.Types.ObjectId}
}, {timestamps:true})

export const Review = models?.Review || model('Review', ReviewSchema)