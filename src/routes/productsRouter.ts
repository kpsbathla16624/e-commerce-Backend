
import { Router } from "express";
import GetAllProducts, { addProduct, GetProductById } from "../Controllers/ProductControllers";

const Productrouter = Router();
Productrouter.get('/getProducts',GetAllProducts);
Productrouter.get('/getProductById',GetProductById);
Productrouter.post('/addProduct', addProduct);

export default Productrouter;