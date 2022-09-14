import {FaFacebook,FaInstagram,FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

// Essa função cria o rodapé com os icones facebook,instagram,linkedin
function Footer(){
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                   <FaFacebook />
                </li>
                <li>
                   <FaInstagram />
                </li>
                <li>
                <FaLinkedin />
                </li>
                
            </ul>
            <p className={styles.copy_right}>
                <span>Desenvolvido por Leandro Roberto Souza Freitas</span> &copy; 2022
            </p>
        </footer>
    ) 
}
export default Footer