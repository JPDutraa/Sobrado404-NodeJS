import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import Imagem from "next/image"
import styles from "../../../styles/home.module.scss"
import LogoImg from "../../../public/logo.jpg"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/Button"
import { AuthContext } from "@/src/contexts/AuthContext"
import { toast } from 'react-toastify';
import Link from "next/link"

export default function SignUp() {

  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const[loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();
  

  if(name == '' || email == '' || password == ''){
    toast.error('Preencha todos os campos');
    return;
  }

  setLoading(true);

  let data = {
    name,
    email,
    password
  }

  await signUp(data)

  setLoading(false);
}



  return (
    <>
      <Head>
        <title>Sobrado404 | CADASTRO</title>
      </Head>
    <div className={styles.containerCenter}>
      <img src={LogoImg.src} alt="Logo" />
      <div className={styles.login}>
        <h1> Cadastro </h1>
        <form onSubmit={handleSignUp} >
        <Input
            placeholder="Digite seu Nome"
            type="text"
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />
          <Input
            placeholder="Digite seu Email"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <Input
            placeholder="Sua Senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          
          <Button
            type="submit"
            loading={loading}
            
          >
            Cadastrar
          </Button>

        </form>
        <Link legacyBehavior href="/">
        <a className={styles.text}>Já possui uma conta? Faça Login</a>
        </Link>
      </div>
    </div>
    </>
  )
}