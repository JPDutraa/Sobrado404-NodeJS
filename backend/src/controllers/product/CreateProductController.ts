import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController{
    async handle(request: Request, response: Response){
        const {name, price, description, category_id} = request.body;
   
        const createProductService = new CreateProductService();

        if(!request.file){
            throw new Error("Banner is required");
        }else{
            const {originalname, filename} = request.file;

            console.log(filename);

        const product = await createProductService.execute({name, price, description, banner:'', category_id});

        return response.json(product);
    }
}
}

export { CreateProductController };