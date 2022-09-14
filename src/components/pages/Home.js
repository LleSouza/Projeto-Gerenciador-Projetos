import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import { Link } from 'react-router-dom'
import LinkButton from '../layout/LinkButton'

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem-vindo ao <span>Controle de projetos</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto"/>
      <img src={savings} alt="Controle de projetos" />
    
      <p>
        Ver todos os usuários: <Link to="/allusers">Clique aqui</Link>
      </p>

      <p>
      Acessar Tela Login: <Link to="telalogin">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Home