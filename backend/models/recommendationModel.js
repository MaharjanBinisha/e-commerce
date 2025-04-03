import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User receiving recommendations
  recommendedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // List of recommended product IDs
  generatedAt: { type: Date, default: Date.now } // Timestamp of recommendation generation
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

export default Recommendation;
