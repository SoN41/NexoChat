// import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
// import { getUsersForSidebar, updateUserProfile } from "../controllers/user.controller.js";

// const router = express.Router();

// router.get("/" , protectRoute , getUsersForSidebar);
// router.put("/update" , protectRoute , updateUserProfile);

// export default router;

import express from "express";
// 1. MAKE SURE THIS SAYS protectRoute.js
// import protectRoute from "../middleware/protectRoute.js"; 
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// 2. MAKE SURE protectRoute is used here in the middle
router.get("/", protectRoute, getUsersForSidebar);

export default router;