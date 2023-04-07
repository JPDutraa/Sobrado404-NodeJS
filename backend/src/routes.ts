import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
import { isAuth } from './middlewares/isAuth';
import { CreateCategoryController } from './controllers/categories/CreateCategoryController';
import { ListCategoryController } from './controllers/categories/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import uploadConfig from './config/multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

const router = Router();

const  upload = multer(uploadConfig.upload('./tmp'));

// --- Routes User ---
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuth, new DetailuserController().handle);

// --- Routes Categories ---
router.post('/category', isAuth, new CreateCategoryController().handle);
router.get('/category', isAuth, new ListCategoryController().handle);

// --- Routes Products ---
router.post('/product', isAuth, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuth, new ListByCategoryController().handle);

// --- Routes Orders ---
router.post('/order', isAuth, new CreateOrderController().handle);
router.delete('/order', isAuth, new RemoveOrderController().handle);


export { router }; 