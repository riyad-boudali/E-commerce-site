import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    product:{
        type: Object
    },
    quantity:{
        type: Number,
        required: true
    }
  }],
  user: {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    email:{
        type: String,
        required: true
    }
  },
});

export const Order = mongoose.model('Order', orderSchema)