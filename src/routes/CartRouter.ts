import { Router} from "express";
import { addToCart, deleteFromCart, getUserCart } from "../Controllers/CartController";

const CartRouter = Router();

CartRouter.get('/getUserCart',getUserCart);
CartRouter.post('/addToCart',addToCart);
CartRouter.post('/deleteFromCart',deleteFromCart);


export default CartRouter;
