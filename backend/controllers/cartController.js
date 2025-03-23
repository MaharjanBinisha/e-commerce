import userModel from "../models/userModel.js"


// add product to user cart
const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "added to cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


//update product of user cart
const updateCart = async (req, res) => {
    try {

        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size]= quantity
        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: " cart updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// //user cart data
// const getUserCart = async (req, res) => {

//     try {
        
//     const {userId}=req.body

//     const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         res.json({success:true,cartData})

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }

// }
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userData = await userModel.findById(userId);

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists before accessing it
        const cartData = userData.cartData || [];  // Default to an empty array if undefined

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { addToCart, updateCart, getUserCart }