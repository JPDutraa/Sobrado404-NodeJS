import prismaClient from "../../prisma";

interface FinishRequest{
    order_id: string;
}

class FinishHistoricOrderService{
    async execute({ order_id }: FinishRequest){
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                historic: false
            }
        })

        return order;

    }
}

export { FinishHistoricOrderService }