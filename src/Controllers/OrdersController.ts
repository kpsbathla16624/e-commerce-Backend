import mongoose from "mongoose";

import { ObjectId } from "mongodb";
export  async function GetUserOrders(req: any, res: any) {
    try {
        const {userId} = req.query;
        const collection = await mongoose .connection.db?.collection("orders");
        const result = await collection?.find({userId:userId}).toArray();
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    }

export async function CreateOrder(req: any, res: any) {
    try {
      
        const {userId} = req.query;
        const cartCollection = mongoose.connection.db?.collection("cart");
        const orderCollection = mongoose.connection.db?.collection("orders");
        const productCollection = mongoose.connection.db?.collection("products");
        const cart = await cartCollection?.find({userId}).toArray();
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const products = await productCollection?.find().toArray();
        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }
        const orderProducts = [];
        let total = 0;
        for (const cartItem of cart) {
            const product = products.find((p) => p._id.toString() === cartItem.productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (product.quantity < cartItem.quantity) {
                return res.status(400).json({ message: "Not enough quantity" });
            }
            total += product.price * cartItem.quantity;
            orderProducts.push({
                productId: cartItem.productId,
                quantity: cartItem.quantity,
            });
            await productCollection?.findOneAndUpdate(
                {_id: new ObjectId(cartItem.productId)},
                {$inc: {amount: -cartItem.quantity}}
            );
        }
        const order = {
            userId,
            products: orderProducts,
            status: "pending",
            total,
            date: new Date(),
        };
        const result = await orderCollection?.insertOne(order);
        await cartCollection?.deleteMany({userId});
        return res.status(200).json(result);



    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export  async function deleteOrder(req: any, res: any) {
    try {
        const {id} = req.query;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const objectId = new ObjectId(id as string);
        const collection = mongoose.connection.db?.collection("orders");
        const result = await collection?.deleteOne({_id: objectId});
        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export async function UpdateOrderStatus(req: any, res: any) {
    const {id, status} = req.body;
    if (!id || !status) {
        return res.status(400).json({ message: "ID and status are required" });
    }
    const objectId = new ObjectId(id as string);
    const collection = mongoose.connection.db?.collection("orders");
    const order = await collection?.findOne({_id: objectId});
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    const result = await collection?.findOneAndUpdate(
        {_id: objectId},
        {$set: {status: status}},
        {returnDocument: "after"}
    );
    return res.status(200).json(result);
}