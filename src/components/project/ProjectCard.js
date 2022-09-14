import {Link} from 'react-router-dom'
import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({id, name, budget, category, handleRemove}){

    // Criando o metodo remove colocado no button onclick 
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                {/* Utilizando um estilo dinâmico  para mudar a cor das bolinhas conforme for inserido o nome do projeto, utilizado o toLowerCase(Java Script) para puxar os estilos criados no ProjectCard.module.css */}
                <span className={`${styles[category.toLowerCase()]}`}></span> {category} 
             </p>
             <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
             </div>
        </div>
    )

}
export default ProjectCard