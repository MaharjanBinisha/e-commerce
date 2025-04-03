// import mongoose from "mongoose";

// const InteractionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
//   interactionType: { type: String, enum: ["view", "click", "search"], required: true },
//   searchQuery: { type: String }, 
//   timestamp: { type: Date, default: Date.now }
// });

// const Interaction = mongoose.model("Interaction", InteractionSchema);
// export default Interaction;



import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  interactionType: { type: String, enum: ["view", "click", "search"], required: true },
  searchQuery: { type: String }, // Ensure searchQuery stores words, not null
  timestamp: { type: Date, default: Date.now },
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId, // Product ID
      name: String,
      description: String,
      price: Number,
      image: [String], // Array of image URLs
      category: String,
      subCategory: String,
      bestseller: Boolean
    }
  ]
});

const Interaction = mongoose.model("Interaction", InteractionSchema);
export default Interaction;
