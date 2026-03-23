// // //import { getAuth } from "@clerk/express";
// // import User from "../models/User.js";

// // export const protect = async (req, res, next) => {
    
// //     const  userId = req.auth?.userId; // ✅ correct way 
// //     console.log("Auth object:", userId);
// //     if (!userId) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Not Authenticated"})
// //     }else{
// //         const user = await User.findById(userId);
// //         req.user = user;
// //         next()
// //     }
// // }

import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    const { userId } = getAuth(req);   // ✅ correct way
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not Authenticated"
      });
    }

    const user = await User.findById(userId);

    // console.log(user)

    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};



// import { getAuth } from "@clerk/express";
// import User from "../models/User.js";

// export const protect = async (req,res,next)=>{
//   const { userId } = getAuth(req);

//   if(!userId){
//     return res.status(401).json({message:"Not authenticated"});
//   }

//   const user = await User.findById(userId);

//   if(!user){
//     return res.status(401).json({message:"User does not exist"});
//   }

//   req.user = user;
//   next();
// }