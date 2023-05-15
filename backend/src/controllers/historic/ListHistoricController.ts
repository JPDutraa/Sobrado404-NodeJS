import { Response, Request } from "express";
import { ListHistoricService } from "../../services/historic/ListHistoricService";

class ListHistoricController {
    async handle(request: Request, response: Response) {

        const HistoricService = new ListHistoricService();

        const listhistoric = await HistoricService.execute();

        return response.json(listhistoric);

    }
}

export { ListHistoricController };