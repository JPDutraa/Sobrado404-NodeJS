import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';

class RemoveItemController {
    async handle(request: Request, response: Response) {
        const item_id = request.query.item_id as string;

        const removeItemService = new RemoveItemService();

        const order = await removeItemService.execute({ item_id });

        return response.json(order);
    }
}

export { RemoveItemController };