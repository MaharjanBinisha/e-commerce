import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
import Product from "../models/productModel.js";

//function for add product
// const addProduct = async (req,res)=>{
//    try {
    
//     const { name, description, price, category, subCategory, sizes, bestseller}= req.body

//     const image1=req.files.image1 && req.files.image1[0]
//     const image2=req.files.image2 && req.files.image2[0]
//     const image3=req.files.image3 && req.files.image3[0]
//     const image4=req.files.image4 && req.files.image4[0]

//     const images=[image1,image2,image3,image4].filter((item)=> item !==  undefined)

//     let imagesUrl = await Promise.all(
//         images.map(async(item)=>{
//             let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
//             return result.secure_url
//         })
//     )

//     const productData = {
//         name,
//         description,
//         category,
//         price: Number(price),
//         subCategory,
//         bestseller: bestseller === "true" ? true : false,
//         sizes: JSON.parse(sizes),
//         image: imagesUrl,
//         date: Date.now()
//     }

//     console.log(productData);
    
//     const product = new productModel(productData);
//     await product.save()
    
//     res.json({success:true, message:"product added"})

//    } catch (error) {
//     console.log(error)
//     res.json({success:false, message:error.message})
//    }
// }


//stores but stores in local
// const addProduct = async (req, res) => {
//     try {
//         console.log("🔹 Request body:", req.body);
//         console.log("🔹 Request files:", req.files);

//         const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

//         // Ensure at least one image is uploaded
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ success: false, message: "At least one image is required." });
//         }

//         let imageUrls = []; // To store Cloudinary image URLs

//         // Function to upload an image to Cloudinary
//         const uploadToCloudinary = async (file) => {
//             return new Promise((resolve, reject) => {
//                 cloudinary.uploader.upload(file.path, { folder: "ecommerce_products" }, (error, result) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result.secure_url); // Cloudinary URL
//                     }
//                 });
//             });
//         };

//         // Upload each image to Cloudinary
//         const uploadPromises = [];
//         ["image1", "image2", "image3", "image4"].forEach((key) => {
//             if (req.files[key]) {
//                 uploadPromises.push(uploadToCloudinary(req.files[key][0]));
//             }
//         });

//         imageUrls = await Promise.all(uploadPromises);

//         // Create product in MongoDB with Cloudinary image URLs
//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             category,
//             subCategory,
//             bestseller,
//             sizes: JSON.parse(sizes), // Convert sizes from JSON string to array
//             image: imageUrls, // Store Cloudinary URLs
//         });

//         await newProduct.save();
//         res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });

//     } catch (error) {
//         console.error(" Error adding product:", error);
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };




const addProduct = async (req, res) => {
    try {
        console.log("🔹 Request body:", req.body);
        console.log("🔹 Request files:", req.files);

        const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

        // Ensure at least one image is uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required." });
        }

        let imageUrls = []; // To store Cloudinary image URLs

        // Function to upload an image to Cloudinary
        const uploadToCloudinary = async (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "ecommerce_products" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            console.log("✅ Uploaded to Cloudinary:", result.secure_url);
                            resolve(result.secure_url);
                        }
                    }
                );
                uploadStream.end(file.buffer); // Use file buffer instead of file.path
            });
        };

        // Upload each image to Cloudinary
        const uploadPromises = [];
        ["image1", "image2", "image3", "image4"].forEach((key) => {
            if (req.files[key]) {
                uploadPromises.push(uploadToCloudinary(req.files[key][0])); 
            }
        });

        imageUrls = await Promise.all(uploadPromises);

        // Create product in MongoDB with Cloudinary image URLs
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            bestseller,
            sizes: JSON.parse(sizes), // Convert sizes from JSON string to array
            image: imageUrls, // Store Cloudinary URLs
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });

    } catch (error) {
        console.error("❌ Error adding product:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//function for list producss
const listProduct = async (req,res)=>{

    try {
        
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
    res.json({success:false, message:error.message})
    }
}

//remove product
const removeProduct = async (req,res)=>{
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"product removed"})

    } catch (error) {
        console.log(error)
    res.json({success:false, message:error.message})
    }

}

//for single product info
// const singleProduct = async (req,res)=>{

//     try {
//         const {productId}= req.body
//         const product= await productModel.findById(productId)
//         res.json({success:true,product})

//     } catch (error) {
//         console.log(error)
//     res.json({success:false, message:error.message})
//     }

// }
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Get product ID from URL params
        const product = await productModel.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.json({ success: false, message: "No search query provided" });
        }

        // Search by product name, category, or subcategory
        const products = await productModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Case-insensitive search
                { category: { $regex: query, $options: "i" } },
                { subCategory: { $regex: query, $options: "i" } }
            ]
        });

        res.json({ success: true, products });

    } catch (error) {
        console.error("Error in search:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// const editProduct = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//         // Find the existing product
//         let product = await productModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // Handle new images if uploaded
//         const image1 = req.files?.image1?.[0];
//         const image2 = req.files?.image2?.[0];
//         const image3 = req.files?.image3?.[0];
//         const image4 = req.files?.image4?.[0];

//         const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

//         let imagesUrl = product.image; // Keep existing images if no new images are uploaded

//         if (images.length > 0) {
//             imagesUrl = await Promise.all(
//                 images.map(async (item) => {
//                     let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//                     return result.secure_url;
//                 })
//             );
//         }

//         // Update product data
//         product.name = name || product.name;
//         product.description = description || product.description;
//         product.category = category || product.category;
//         product.price = price ? Number(price) : product.price;
//         product.subCategory = subCategory || product.subCategory;
//         product.bestseller = bestseller === "true" ? true : false;
//         product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
//         product.image = imagesUrl;

//         // Save the updated product
//         await product.save();

//         res.json({ success: true, message: "Product updated successfully", product });

//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Find the existing product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Create a copy of existing images
        const updatedImages = [...product.image];

        // Function to upload to Cloudinary
        const uploadToCloudinary = async (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "ecommerce_products" },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                );
                uploadStream.end(file.buffer);
            });
        };

        // Process each image field
        if (req.files) {
            for (const [fieldName, files] of Object.entries(req.files)) {
                if (files && files[0]) {
                    const index = parseInt(fieldName.replace('image', '')) - 1;
                    const cloudinaryUrl = await uploadToCloudinary(files[0]);
                    updatedImages[index] = cloudinaryUrl;
                }
            }
        }

        // Prepare update data
        const updateData = {
            name: name || product.name,
            description: description || product.description,
            price: Number(price) || product.price,
            category: category || product.category,
            subCategory: subCategory || product.subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: updatedImages.filter(img => img) // Remove any empty slots
        };

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        res.json({ 
            success: true, 
            message: "Product updated successfully", 
            product: updatedProduct 
        });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error",
            error: error.message 
        });
    }
};
export {listProduct, addProduct, singleProduct, removeProduct, searchProducts,editProduct}