import express from "express";
import Interaction from "../models/interactionModel.js";
import authUser from "../middleware/auth.js"; // Middleware to authenticate users

const interactionRouter = express.Router();

// ➤ Store a new user interaction (view, click, search)
// interactionRouter.post("/add", authUser, async (req, res) => {
//     try {
//       const { productId, interactionType, searchQuery, userId } = req.body; // ✅ Get userId from req.body
  
//       if (!interactionType) {
//         return res.status(400).json({ success: false, message: "Interaction type is required" });
//       }
  
//       const newInteraction = new Interaction({
//         userId, // ✅ Now userId is correctly assigned
//         productId: productId || null,
//         interactionType,
//         searchQuery: searchQuery || null,
//       });
  
//       await newInteraction.save();
//       res.status(201).json({ success: true, message: "Interaction saved" });
//     } catch (error) {
//       console.error("Error saving interaction:", error);
//       res.status(500).json({ success: false, message: "Error saving interaction" });
//     }
//   });



//this below works
  
// interactionRouter.post("/store", authUser, async (req, res) => {
//   try {
//     const { productId, interactionType } = req.body;
//     const userId = req.body.userId; // Get userId from auth middleware

//     if (!userId || !productId || !interactionType) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newInteraction = new Interaction({
//       userId,
//       productId,
//       interactionType,
//     });

//     await newInteraction.save();
//     res.status(201).json({ success: true, message: "Interaction stored successfully" });

//   } catch (error) {
//     console.error("🔥 Error storing interaction:", error);
//     res.status(500).json({ success: false, message: "Error storing interaction" });
//   }
// });

interactionRouter.post("/store", authUser, async (req, res) => {
  try {
    console.log("📥 Received interaction data:", req.body); // ✅ Log incoming request body

    const { productId, interactionType, searchQuery, productDetails } = req.body;
    const userId = req.body.userId;

    if (!userId || !interactionType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!productDetails) {
      return res.status(400).json({ success: false, message: "Missing product details" });
    }

    console.log("🛠️ Extracted product details:", productDetails); // ✅ Log extracted product details

    const newInteraction = new Interaction({
      userId,
      interactionType,
      searchQuery: searchQuery || null,  
      items: [productDetails],  // ✅ Ensure product details are stored properly
    });

    await newInteraction.save();
    console.log("✅ Interaction stored successfully:", newInteraction); // ✅ Confirm data is saved correctly
    res.status(201).json({ success: true, message: "Interaction stored successfully" });

  } catch (error) {
    console.error("🔥 Error storing interaction:", error);
    res.status(500).json({ success: false, message: "Error storing interaction" });
  }
});


// ➤ Get all interactions of a specific user
interactionRouter.get("/:userId", authUser, async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("🔹 Requested userId:", userId);
    console.log("🔹 Authenticated userId:", req.body.userId);

    // ✅ Fix: Compare with req.body.userId instead of req.user.id
    if (userId !== req.body.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const interactions = await Interaction.find({ userId });

    res.status(200).json({ success: true, interactions });
  } catch (error) {
    console.error("🔥 Error retrieving interactions:", error);
    res.status(500).json({ success: false, message: "Error retrieving interactions" });
  }
});


export default interactionRouter;
