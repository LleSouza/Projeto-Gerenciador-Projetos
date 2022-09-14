import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'


//import logo from '../../src/img/costs_logo.png' 

function Navbar() {
  return (
    <nav className={styles.navbar}>
      
      <ul className={styles.list}>  
        <li className={styles.item}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.item}>
          <Link to="/users">Usuários</Link>
        </li>
        <li className={styles.item}>
          <Link to="/contact">Contato</Link>
        </li>
        <li className={styles.item}>
          <Link to="/company">Empresa</Link>
        </li>
        <li className={styles.item}>
          <Link to="/newproject">Novo Projeto</Link>
        </li>
        <li className={styles.item}>
          <Link to="/projects">Projetos</Link>
        </li>

      </ul>
    </nav>
  )
}

export default Navbar