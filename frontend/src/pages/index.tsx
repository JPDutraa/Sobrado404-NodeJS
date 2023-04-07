import Head from "next/head"
import Imagem from "next/image"
import styles from "../../styles/home.module.scss"
import LogoImg from "../../public/logo.jpg"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/Button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>Sobrado404 | LOGIN</title>
      </Head>
    <div className={styles.containerCenter}>
      <img src={LogoImg.src} alt="Logo" />
      <div className={styles.login}>
        <form>
          <Input
            placeholder="Digite seu email"
            type="text"
          />

          <Input
            placeholder="Sua senha"
            type="password"
          />
          
          <Button
            type="submit"
            loading={false}
            
          >
            Acessar
          </Button>

        </form>
        <Link legacyBehavior href="/signup">
        <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </Link>
      </div>
    </div>
    </>
  )
}