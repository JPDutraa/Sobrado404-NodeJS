import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from "@/src/components/ui/Header"
import { canSSRAuth } from '../../utils/canSSRAuth'
import { toast } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');


  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)


  //Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event){
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
   //console.log('Categoria selecionada ', categories[event.target.value])

    setCategorySelected(event.target.value)

  }

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    try{
      const data = new FormData();

      if(name === '' || price === ''){
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('category_id', categories[categorySelected].id);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Cadastrado com sucesso!')

    }catch(err){
      console.log(err);
      toast.error("Ops erro ao cadastrar!")
    }

    setName('');
    setPrice('');

  }
    

  return(
    <>
      <Head>
        <title>Sobrado404 - Novo Produto</title>
      </Head>
      <div>
        <Header/>

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>


            <select value={categorySelected} onChange={handleChangeCategory}>
              {categoryList.map((item, index) => {
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })
              }

            </select>

            <input 
            type="text"
            placeholder="Digite o nome do produto"
            className={styles.input}
            value={name}
            onChange={event => setName(event.target.value)}
            />

            <input 
            type="text"
            placeholder="Preço do produto"
            className={styles.input}
            value={price}
            onChange={event => setPrice(event.target.value)}
            />      


            <button className={styles.buttonAdd} type="submit" onClick={() => window.location.reload()}>
              Cadastrar  
            </button>   

          </form>

        </main>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx)

  const response = await apliClient.get('/category');
  console.log(response.data);

  return {
    props: {
      categoryList: response.data
    }
  }
})