
import { Router } from "express";
import GetAllProducts, { GetProductById } from "../Controllers/ProductControllers";

const Productrouter = Router();
Productrouter.get('/getProducts',GetAllProducts);
Productrouter.get('/getProductById',GetProductById);
export default Productrouter;