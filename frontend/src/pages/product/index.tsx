import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from "@/src/components/ui/Header"
import { FiUpload } from 'react-icons/fi';
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
  const [description, setDescription] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)


  function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }

    const image = e.target.files[0];

    if(!image){
      return;
    }

    if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/jpg'){

      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }

  }

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

      if(name === '' || price === '' || description === '' || imageAvatar === null){
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Cadastrado com sucesso!')

    }catch(err){
      console.log(err);
      toast.error("Ops erro ao cadastrar!")
    }

    setName('');
    setPrice('');
    setDescription('')
    setImageAvatar(null);
    setAvatarUrl('');

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


            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={45} color="white"/>
              </span>

              <input type='file' accept='image/png, image/jpeg, image/jpg' onChange={handleFile} />

              {avatarUrl && (
                              <img
                              className={styles.preview}
                              src={avatarUrl}
                              alt='foto do produto'
                              width={250}
                              height={250}
                              />
              )}

            </label>


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

            <textarea 
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={event => setDescription(event.target.value)}
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