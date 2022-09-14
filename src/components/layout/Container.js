import styles from './Container.module.css'

// Define a classe das rotas que vai rodar dentro do container(encapsulamento)
function Container(props){
    return <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
}
export default Container