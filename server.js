// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkwebhooks from "./controllers/clerkWebhooks.js";

// const app = express()
// app.use(cors()) //enable cross-origin resource sharing


// //middleware
// app.use(express.json())
// app.use(clerkMiddleware())
// connectDB()

// //api to listen to clerk webhooks
// app.use("/api/clerk",clerkwebhooks);

// app.get('/', (req,res)=> res.send("Api is Working perfectly"))

// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=> console.log(`Server is runniung on port ${PORT}`))



import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware} from '@clerk/express';
import clerkwebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
// app.use(cors());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());
//app.use(auth())
// app.get("/api/debug-auth", (req, res) => {
//   console.log("DEBUG: headers", req.headers);
//   console.log("DEBUG: req.auth", req.auth);
//   res.json({ auth: req.auth || null });
// });

// Only start server after DB connects
const startServer = async () => {
  try {
    await connectDB(); // wait for DB connection
    await connectCloudinary();
    console.log("MongoDB connected successfully");

    // Register webhook route after DB is ready
    app.use("/api/clerk", clerkwebhooks);

    app.get('/', (req, res) => res.send("API is working perfectly"));
    // app.get("/api/user", protect, (req, res) => {
    //   console.log(req.auth.userId); // <- set by Clerk middleware
    //  });

    app.use('/api/user',userRouter)
    app.use('/api/hotels',hotelRouter)
    app.use('/api/rooms',roomRouter)
    app.use('/api/bookings',bookingRouter)
 
    

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};


startServer();