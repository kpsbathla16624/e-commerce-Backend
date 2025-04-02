import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import ProductModel from "../model/ProductModel";

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

export async function addProduct(req: any, res: any) {
    try {
        const collection = await mongoose.connection.db?.collection("products");
        const newProduct = req.body as ProductModel;
        newProduct.createdAt = new Date();
        newProduct.updatedAt = new Date();
        newProduct.isDeleted = false;
        newProduct.stock = 0; // Default stock value

        const result = await collection?.insertOne(newProduct.toJSON());
        if (!result) {
            return res.status(500).json({ message: "Failed to add product" });
        }
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}