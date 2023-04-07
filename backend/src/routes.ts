import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
import { isAuth } from './middlewares/isAuth';
import { CreateCategoryController } from './controllers/categories/CreateCategoryController';

const router = Router();

// --- Routes User ---
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuth, new DetailuserController().handle);

// --- Routes Categories ---
router.post('/category', isAuth, new CreateCategoryController().handle);


export { router }; 