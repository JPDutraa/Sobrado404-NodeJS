import {Request, Response} from "express";
import { ListCategoryService } from "../../services/categories/ListCategoryService";

class ListCategoryController{
    async handle(request: Request, response: Response){
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute();

        return response.json(category);

    }
}

export { ListCategoryController };