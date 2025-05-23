import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import router from './routes/KhaltiRoutes.js'
import interactionRouter from "./routes/interaction_routes.js";


import recommendation_router from './routes/recommendation_routes.js';

//app config

const app = express()
const port= process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174","https://e-commerce-ensemble-admin.vercel.app","https://idyllic-gecko-d3f210.netlify.app","https://maharjanbinisha.github.io"], // Allow frontend & admin
      credentials: true, // Allow cookies/auth headers if needed
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization", "token"], // Allow token header
    })
  );
//Handle preflight requests
app.options('*', cors()); // This will handle all OPTIONS requests
  
//api endpoints 
app.use('/api/user', userRouter) 
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/khalti', router);
app.use('/api/order',orderRouter)

app.use("/api/interactions", interactionRouter);
app.use('/api/recommendations', recommendation_router);

app.get('/',(req,res)=>{
res.send("api working")
})

app.listen(port,()=> console.log('server started on PORT:' +port))