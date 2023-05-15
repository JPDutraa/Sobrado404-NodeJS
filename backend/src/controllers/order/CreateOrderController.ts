import {Request, Response} from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ table });

    return res.json(order);
  }
}

export { CreateOrderController };