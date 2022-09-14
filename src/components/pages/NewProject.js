import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){

// Criando a Navegação pronta para suspense
  const navigate = useNavigate()
  
  function createPost(project){
    // Initialize controle and services
    project.controle = 0
    project.services = []

    fetch('http://localhost:5000/projects',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project), // manda os  dados do projeto para a API(backend)
  })
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data)
    
    // redirecionando para a página projects ( Projetos)
    navigate('/projects', {state:{message: 'Projeto criado com sucesso!'}})
    
  })
  .catch((err) => console.log(err))
  }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"  />
        </div>
    )
}

export default NewProject