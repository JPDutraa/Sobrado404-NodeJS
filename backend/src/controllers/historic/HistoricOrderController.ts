import {Request, Response} from "express";
import { FinishHistoricOrderService } from "../../services/historic/HistoricOrderService";


class HistoricOrderController {
    async handle(request: Request, response: Response){
        const {order_id} = request.body;

        const finishOrderService = new FinishHistoricOrderService();

        const order = await finishOrderService.execute({ order_id });

        return response.json(order);
    }
}

export { HistoricOrderController };