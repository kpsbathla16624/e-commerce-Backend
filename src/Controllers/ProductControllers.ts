import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export default async function GetAllProducts(req: any, res: any) {
    try {
        const collection = await mongoose.connection.db?.collection("products");
        const result = await collection?.find({}).toArray();
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    }

export async function GetProductById(req: any, res: any) {
    try {
        const {id} = req.query;
        const objectId = new ObjectId (id as string);
        const collection = await mongoose.connection.db?.collection("products");
        const result = await collection?.findOne({ _id:objectId });
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}