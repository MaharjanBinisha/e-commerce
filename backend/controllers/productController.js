import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
//function for add product
const addProduct = async (req,res)=>{
   try {
    
    const { name, description, price, category, subCategory, sizes, bestseller}= req.body

    const image1=req.files.image1 && req.files.image1[0]
    const image2=req.files.image2 && req.files.image2[0]
    const image3=req.files.image3 && req.files.image3[0]
    const image4=req.files.image4 && req.files.image4[0]

    const images=[image1,image2,image3,image4].filter((item)=> item !==  undefined)

    let imagesUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
            return result.secure_url
        })
    )

    const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date: Date.now()
    }

    console.log(productData);
    
    const product = new productModel(productData);
    await product.save()
    
    res.json({success:true, message:"product added"})

   } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
   }
}

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


export {listProduct, addProduct, singleProduct, removeProduct, searchProducts}