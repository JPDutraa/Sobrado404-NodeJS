import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string;
}

class SendOrderService{
    async execute({order_id}: ItemRequest){
        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: false,
            },
        });

        return order;
    }
        
}


export { SendOrderService };