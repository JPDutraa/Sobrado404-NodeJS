import { useState, FormEvent } from 'react'
import Head from "next/head"
import { Header } from "@/src/components/ui/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'
import { canSSRAuth } from '@/src/utils/canSSRAuth'

export default function Category(){
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    if(name == ''){
      toast.error('Preencha todos os campos!')
      return;
    }

    const api = setupAPIClient();
    await api.post('/category', {
      name: name
    })

    toast.success('Categoria cadastrada com sucesso!')
    setName('')

    
  }


  return(
    <>
    <Head>
      <title>Sobrado404 - Nova Categoria</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Cadastrar Categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input 
          type="text" 
          placeholder="Digite o Nome da Categoria"
          className={styles.input}
          value={name}
          onChange={ (e) => setName(e.target.value) }
          />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>

      </main>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})