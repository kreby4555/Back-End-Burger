import { Router } from "express";
import multer from 'multer'
import multerConfig from './config/multer'
import UserController from './app/controllers/UserController'
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import CategoryController from "./app/controllers/CategoryController";
import authMiddleware from './app/middlewares/auth'
import OrderController from "./app/controllers/OrderController";

const uplod = multer(multerConfig)
const routes = new Router();

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) // será chamado por todas as rotass ABAIXO

routes.post('/products', uplod.single('file') ,ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', uplod.single('file'), ProductController.update)

routes.post('/categories',uplod.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', uplod.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)





export default routes;
