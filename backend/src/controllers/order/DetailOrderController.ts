import { Request,Response } from "express";
import { DetailOrderSerivce } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.query.order_id as string;

        const detailOrderService = new DetailOrderSerivce();

        const orders = await detailOrderService.execute({ order_id });

        return response.json(orders);
    }
}

export { DetailOrderController };