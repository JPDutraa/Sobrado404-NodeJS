import {Response, Request} from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';


class SendOrderController{
    async handle(request: Request, response: Response){
        const {order_id} = request.body;

        const sendOrderService = new SendOrderService();

        const order = await sendOrderService.execute({order_id});

        return response.json(order);
    }
}

export { SendOrderController };