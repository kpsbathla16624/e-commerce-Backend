import mongoose from "mongoose";

import { ObjectId } from "mongodb";
export async function getUserCart(req: any, res: any) {
   try {
    const { userId } = req.query;
    // code to get user cart
    const CartCollection = await mongoose.connection.db?.collection("cart");
    const cart = await CartCollection?.find({ userId }).toArray();
    return res.status(200).json(cart);
   } catch (error: any) {
       return res.status(500).json({ message: error.message });
    
   }

}

export async function addToCart(req: any, res: any) {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const CartCollection = mongoose.connection.db?.collection("cart");
        const data = {
            userId,
            productId,
            quantity,
        };
        const result = await CartCollection?.insertOne(data);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteFromCart(req: any, res: any) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const objectId = new ObjectId(id as string);
        const CartCollection = mongoose.connection.db?.collection("cart");
        const result = await CartCollection?.deleteOne({ _id: objectId });
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}