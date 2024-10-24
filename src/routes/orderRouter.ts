import { Router } from "express";   
import  { CreateOrder, deleteOrder, GetUserOrders, UpdateOrderStatus } from "../Controllers/OrdersController";

const orderRouter = Router();
orderRouter.get('/getUserOrders', GetUserOrders );
orderRouter.post('/createOrder',CreateOrder);
orderRouter.post('/deleteOrder',deleteOrder);
orderRouter.post('/updateOrderStatus',UpdateOrderStatus);

export default orderRouter;