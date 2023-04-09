import styles from './styles.module.scss'
import { useContext } from 'react'
import Link from 'next/link'
import LogoImg from '../../../../public/logo.jpg'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/src/contexts/AuthContext'

export function Header(){

    const { signOut } = useContext(AuthContext)
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src={LogoImg.src} alt="Logo" width={120} height={110} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link legacyBehavior href='/category'>
                        <a>Categoria</a>
                    </Link>
                    
                    <Link legacyBehavior href='/product'>
                        <a>Cardapio</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='white' size={24}/>
                    </button>

                </nav>




            </div>

        </header>
    )

}