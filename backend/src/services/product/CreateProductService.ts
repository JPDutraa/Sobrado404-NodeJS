import prismaClient from "../../prisma";

interface ProductRequest{
  name: string;
  price: string;
  category_id: string;
}

class CreateProductService{
  async execute({name, price, category_id}: ProductRequest){

    const product = await prismaClient.product.create({
      data:{
        name: name,
        price: price,
        category_id: category_id,
      }
    })

    return product;

  }
}

export { CreateProductService }

