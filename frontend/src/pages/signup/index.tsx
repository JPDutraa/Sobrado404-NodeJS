import Head from "next/head"
import Imagem from "next/image"
import styles from "../../../styles/home.module.scss"
import LogoImg from "../../../public/logo.jpg"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/Button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Sobrado404 | CADASTRO</title>
      </Head>
    <div className={styles.containerCenter}>
      <img src={LogoImg.src} alt="Logo" />
      <div className={styles.login}>
        <h1> Cadastro </h1>
        <form>
        <Input
            placeholder="Digite seu Nome"
            type="text"
          />
          <Input
            placeholder="Digite seu Email"
            type="text"
          />

          <Input
            placeholder="Sua Senha"
            type="password"
          />
          
          <Button
            type="submit"
            loading={false}
            
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