import prismaClient from "../../prisma";

interface FinishRequest{
    order_id: string;
}

class FinishOrderService{
    async execute({ order_id }: FinishRequest){
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                status: true,
            }
        })

        return order;

    }
}

export { FinishOrderService }