import styles from '../project/ProjectCard.module.css'
//import {BsFilltrashFill} from 'react-icons/bs'
function ServiceCard({id, name, controle, description, handleRemove}){
   const remove = (e) => {

   }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${controle}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                  Excluir
                </button>
            </div>
        </div>
    )
}
export default ServiceCard