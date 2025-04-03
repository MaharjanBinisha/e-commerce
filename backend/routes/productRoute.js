import express from 'express'
import { listProduct, addProduct, singleProduct, removeProduct, searchProducts, editProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import Product from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"
const productRouter = express.Router();

// Handle missing images in `multer`
const uploadMiddleware = (req, res, next) => {
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Error uploading files", error: err.message });
        }
        console.log("🔹 Multer processed files:", req.files);
        next();
    });
};

// productRouter.post('/add', adminAuth, uploadMiddleware, addProduct);
productRouter.post('/add', adminAuth, uploadMiddleware, (req, res, next) => {
    req.body.date = new Date(); // ✅ Ensure date is stored as a Date object
    console.log("🔹 Injected Date:", req.body.date); // Debugging log
    next();
}, addProduct);


productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/single/:productId', singleProduct);
productRouter.get('/list', listProduct);
productRouter.get('/search', searchProducts);


// productRouter.put("/update/:productId", uploadMiddleware, editProduct)

// productRouter.put("/update/:id", async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;

//     try {
//         console.log("🔹 Received request to update product");
//         console.log("🔹 Product ID:", id);
//         console.log("🔹 Update Data:", updateData);

//         if (!id) {
//             return res.status(400).json({ success: false, message: "Product ID is required" });
//         }

//         // Validate ID format
//         if (id.length !== 24) {
//             return res.status(400).json({ success: false, message: "Invalid Product ID format" });
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         console.log("✅ Product updated successfully:", updatedProduct);
//         res.json({ success: true, message: "Product updated successfully", product: updatedProduct });

//     } catch (error) {
//         console.error("❌ Error updating product:", error.message);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// });
// In your productRoute.js
productRouter.put("/update/:id", uploadMiddleware, async (req, res) => {
    const { id } = req.params;
    
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", req.files);
  
      // Basic validation
      if (!id || id.length !== 24) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }
  
      // Find existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      // Initialize with existing images
      const updatedImages = [...existingProduct.image];
  
      // Process file uploads to Cloudinary if new files exist
      if (req.files) {
        for (const [fieldName, files] of Object.entries(req.files)) {
          if (files && files[0]) {
            const index = parseInt(fieldName.replace('image', '')) - 1;
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "ecommerce_products" },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(files[0].buffer);
            });
            updatedImages[index] = result.secure_url;
          }
        }
      }
  
      // Parse sizes safely
      let sizesArray = existingProduct.sizes;
      try {
        if (req.body.sizes) {
          sizesArray = JSON.parse(req.body.sizes);
        }
      } catch (error) {
        console.error("Error parsing sizes:", error);
        return res.status(400).json({ success: false, message: "Invalid sizes format" });
      }
  
      // Build update object
      const updateData = {
        name: req.body.name || existingProduct.name,
        description: req.body.description || existingProduct.description,
        price: Number(req.body.price) || existingProduct.price,
        category: req.body.category || existingProduct.category,
        subCategory: req.body.subCategory || existingProduct.subCategory,
        bestseller: req.body.bestseller === 'true',
        sizes: sizesArray,
        image: updatedImages.filter(img => img) // Remove empty slots
      };
  
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      res.json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct
      });
  
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  });
export default productRouter;