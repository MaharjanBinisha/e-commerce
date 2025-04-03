// const express = require("express");
// const Recommendation = require("../models/recommendationModel");

// const router = express.Router();

// // ➤ Store recommendations for a user
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, recommendedProducts } = req.body;

//     if (!userId || !Array.isArray(recommendedProducts)) {
//       return res.status(400).json({ success: false, message: "User ID and recommended products are required" });
//     }

//     // Check if a recommendation already exists for this user
//     let recommendation = await Recommendation.findOne({ userId });

//     if (recommendation) {
//       recommendation.recommendedProducts = recommendedProducts;
//       recommendation.generatedAt = Date.now();
//     } else {
//       recommendation = new Recommendation({ userId, recommendedProducts });
//     }

//     await recommendation.save();
//     res.status(201).json({ success: true, message: "Recommendations saved" });
//   } catch (error) {
//     console.error("Error saving recommendations:", error);
//     res.status(500).json({ success: false, message: "Error saving recommendations" });
//   }
// });

// // ➤ Get recommendations for a specific user
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     const recommendation = await Recommendation.findOne({ userId }).populate("recommendedProducts").lean();

//     if (!recommendation) {
//       return res.status(404).json({ success: false, message: "No recommendations found" });
//     }

//     res.status(200).json({ success: true, recommendations: recommendation.recommendedProducts });
//   } catch (error) {
//     console.error("Error retrieving recommendations:", error);
//     res.status(500).json({ success: false, message: "Error retrieving recommendations" });
//   }
// });

// export default recommendation_routes
import express from "express";
import axios from "axios";
import authUser from "../middleware/auth.js"; // Include this if authentication is needed

const recommendationRouter = express.Router();

// Fetch recommendations for a user
recommendationRouter.post("/", authUser, async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Call Python recommendation API
        const recommendationResponse = await axios.post("http://localhost:5001/recommend", { user_id });

        res.json(recommendationResponse.data);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default recommendationRouter;
