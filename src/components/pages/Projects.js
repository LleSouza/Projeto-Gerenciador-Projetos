import { useLocation  } from 'react-router-dom' //Hook para otimizar mensagem dinâmica nas páginas
import {useState, useEffect} from 'react'
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'

function Projects(){
    // Criando o projeto
    const [projects, setProjects] = useState([])
    // Criando a constante Loading para aparecer quando for remover ou editar um projeto 
    const [removeLoading, setRemoveLoading] = useState(false) // Inicia a partir do zero(false)
    // Cadastrando a mensagem para ser exibida na remoção do projeto onde começa Vazia e é preenchida quando a requisição é finalizada
    const [projectMessage,setProjectMessage] = useState('')

    // Resgatando a mensagem da página NewProjct através do Hook
    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }
      
    // Fazendo a busca no banco de dados para vericar se tem projeto cadastrado,direcionando para a página projects (A busca inicia a partir do 0 e vai fazendo a busca no loop ."MAP" criado dentro do container))
    useEffect(() => {
        // Fazendo o teste Loading(Servidor na propria máquina)
        setTimeout(() => {
        fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    },3000) // Tempo que o Loading vai ficar exibido na tela para o usuário(Pode ser aumentado ou diminuido dependeno da resposta do servidor)
    },[])
    
    // Criando a função remover (Excluir projeto)
    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(resp => resp.json()) 
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            // Mostrando a mensagem
            setProjectMessage('Projeto removido com sucesso!')
        })
        
    }
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
        
            {message && <Message  type="success" msg={message} />}
            {projectMessage && <Message  type="success" msg={projectMessage} />} 
            <Container customClass="start"> 
              {projects.length > 0 && 
               projects.map((project) => ( 
               <ProjectCard 
                 id={project.id}
                 name={project.name}
                 budget={project.budget}
                 category={project.category.name}
                 key={project.id}
                 handleRemove={removeProject}
                  />
                  ))} 
                  {!removeLoading && <Loading />}  
                  {removeLoading && projects.lenght === 0 && (
                    <p>Não há projetos cadastrados!</p>
                  )}
            </Container>
        </div>
    )
}
export default Projects