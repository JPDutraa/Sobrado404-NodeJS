
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import { Header } from "@/src/components/ui/Header"

export default function Dashboard(){
    return(
        <>
            <Head>
                <title>Sobrado404 | DASHBOARD</title>
            </Head>

            <div>
                <Header />
                <h1>Dashboard</h1>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
}
)