import { Document } from "mongoose";

export default interface ProductModel  {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;

}

