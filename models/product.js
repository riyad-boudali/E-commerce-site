import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
// import { ObjectId } from "mongodb";

// export class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //updating the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {})
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: ObjectId.createFromHexString(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: ObjectId.createFromHexString(prodId) })
//       .then((result) => {
//         console.log("deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
