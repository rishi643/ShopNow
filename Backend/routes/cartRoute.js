import express from "express";
import { getUserCart, addToCart, updateCart, DeleteCartItem } from "../controllers/cartController.js";
import { authUser } from "../middleware/auth.js";

const cartRouter= express.Router();

cartRouter.post("/addcart", authUser, addToCart);
cartRouter.post("/updatecart",authUser, updateCart);
cartRouter.post("/getusercart", authUser, getUserCart);
cartRouter.post("/deletecartitem", authUser, DeleteCartItem);

export default cartRouter;