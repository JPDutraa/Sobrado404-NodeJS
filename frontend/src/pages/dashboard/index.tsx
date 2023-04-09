import {useState} from 'react'
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import { Header } from "@/src/components/ui/Header"
import styles from "./styles.module.scss"
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPIClient } from "@/src/services/api"
import Modal from 'react-modal'
import { ModalOrder } from '@/src/components/Modal'

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    dratt: boolean;
    name: string | null;
}


interface HomeProps {
    orders: OrderProps[];
}

export type OrderitemProps = {
    id: string;
    quantity: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    };
    order:{
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }


}

export default function Dashboard({orders}: HomeProps){

    const [ordersList, setOrdersList] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrderitemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string){
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/order/detail`,{
            params: {
                order_id: id
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
    }

    async function handleFinishItem(id: string){
        const apiClient = setupAPIClient();
        await apiClient.put('/order/finish', {
          order_id: id,
        })

        const response = await apiClient.get('/orders');
        setOrdersList(response.data)

        setModalVisible(false)
    }

    async function handleRefreshItems() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders');
        setOrdersList(response.data)
    }


    Modal.setAppElement('#__next');



    return(
        <>
            <Head>
                <title>Sobrado404 | DASHBOARD</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>

                    <button onClick={() => handleRefreshItems}>
                        <FiRefreshCcw color='#3fffa3' size={35}/>
                    </button>

                    </div>

                    <article className={styles.listOrders}>

                        {ordersList.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum pedido foi encontrado..
                            </span>
                            )}

                        {ordersList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                            <button onClick={() => handleOpenModalView(item.id)}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                            </section>
                        ))}



                    </article>
                    
                
                </main>

                { modalVisible && (
                    <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order={modalItem}
                    handleFinishOrder={ handleFinishItem }                
                    />)
                    }

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
  
    const response = await apiClient.get('/orders');
    //console.log(response.data);
  
  
    return {
      props: {
        orders: response.data
      }
    }
  })