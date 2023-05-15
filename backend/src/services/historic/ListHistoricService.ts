import prismaClient from "../../prisma";

class ListHistoricService{
  async execute(){

    const listhistoric = await prismaClient.order.findMany({
      where:{
        historic: true
      },
      orderBy:{
        created_at: 'desc'
      }
    })

    return listhistoric;

  }
}

export { ListHistoricService }