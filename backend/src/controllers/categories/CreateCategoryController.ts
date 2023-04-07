import {Request, Response} from "express";
import { CreateCategoryService } from "../../services/categories/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        
        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute();

        return category
        

    }
}

export { CreateCategoryController };