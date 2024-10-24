import { Router } from 'express';
import authRouter from './authrouter';
import Productrouter from './productsRouter';
import orderRouter from './orderRouter';
import CartRouter from './CartRouter';
const router = Router();

router.use('/auth', authRouter);
router.use('/products', Productrouter);
router.use('/orders', orderRouter);
router.use('/cart',CartRouter)
export default router;