import prismaClient from "../../prisma";

interface OrderRequest {
    table: number;
}

class CreateOrderService {
  async execute({ table }: OrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table: table
      },
    });

    return order;
  }
}

export { CreateOrderService };