import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string;
    product_id: string;
    quantity: number;
    coment?: string;
}

class AddItemService {
    async execute({ order_id, product_id, quantity, coment }: ItemRequest) {
        const order = await prismaClient.orderitem.create({
            data: {
                order_id,
                product_id,
                quantity,
                coment
            }
        });

        return order;

    }

}

export { AddItemService };