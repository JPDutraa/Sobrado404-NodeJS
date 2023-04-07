import { Response, Request } from "express";
import { ListOrdersService } from "../../services/order/ListOrderService";

class ListOrderController {
    async handle(request: Request, response: Response) {

        const listOrderService = new ListOrdersService();

        const orders = await listOrderService.execute();

        return response.json(orders);

    }
}

export { ListOrderController };