// routes/authRoutes.ts
import { Router } from 'express';

import { authenticateJWT } from '../functions/authenticateJWT';
import { GetUserById, loginUser, registerUser, UpdateUser } from '../Controllers/userContoller';


const authRouter = Router();

// User registration route
authRouter.post('/login', loginUser );
authRouter.post('/register', registerUser);
authRouter.get('/authenticate', authenticateJWT, (req:any, res:any) => {
    res.json({
        message: 'user authenticated',
        user: req.user, 
    });
});
authRouter.get('/getuserbyId',GetUserById);
authRouter.post('/updateUser',UpdateUser);


export default authRouter;
