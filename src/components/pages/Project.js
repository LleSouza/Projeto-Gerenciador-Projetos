// Essa Página trabalha com a edição do Projeto

import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import { parse, v4 as uuidv4 } from 'uuid'

// Essa função vai fazer um busca no banco de dados e trazer os projetos cadastrados para a edição atráves do ID e direcionando para a página project 
function Project(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setshowProjectForm] = useState(false) // ToggleProjectForm inicia como falso e na função criada é setado para verdadeiro
    const [showServiceForm, setshowServiceForm] = useState(false)
    const [message,setMessage] = useState()
    const [type,setType] = useState()

    useEffect(() => {
       setTimeout(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },    
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log)
       }, 3000) // Carregando o Loading por 3 segundos
    }, [id])

    // Criando o metodo editPost para fazer a edição e salvar no banco de dados a alteração feita pelo usuário
    function editPost(project){
        setMessage('')  
        // budget validation
        if(project.budget < project.controle){
            // mensagem
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
             'Content-Type': 'application/json',
      },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setshowProjectForm(false) 
            // mensagem
            setMessage('Projeto Atualizado!')
            setType('success')
        })
    }
    // criando a função createService
    function createService(project) {
        setMessage('')
       // Last service(pegando o ultimo serviço)
       const lastService = project.services[project.services.length - 1]

       lastService.id = uuidv4()

       const lastServiceControle = lastService.controle

       const newControle = parseFloat(project.controle) + parseFloat(lastServiceControle)
       // maxium value validation ( fazendo a validação)
       if (newControle > parseFloat(project.budget)) {
        setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
        setType('error')
        project.services.pop()
        return false
      }
      // Add service controle to project total controle
      project.controle = newControle
      // update do projeto
      fetch(`htpp://localhost:5000/projects/${project.id}`,{
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
      })
      .then((resp) => resp.json())
      .then((data) => {
        // Exibir  os serviços
      })
    }

    //Criando a função removeService
    function removeService(){}
    
    // Criando o metodo toggleProjectForm chamado no onClick do "butoon"
    function toggleProjectForm(){
        setshowProjectForm(!showProjectForm)
    }

    // Criando o metodo toggleServiceForm chamado no onClick do "butoon"
    function toggleServiceForm(){
        setshowServiceForm(!showServiceForm)
    }
    
    return (<>
      {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div className={styles.details_container}> 
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                    {!showProjectForm ? 'Editar Projeto' : 'Fechar' } 
                </button>
                    {!showProjectForm ? (
                        <div className={styles.project_indo}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado:</span> R${project.controle}
                            </p>
                        </div>
                    ): (
                        <div className={styles.project_info}>
                            <ProjectForm 
                            handleSubmit={editPost}
                            btnText="Concluir Edição"
                            projectData={project} 
                            />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                     {!showServiceForm ? 'Adicionar serviço' : 'Fechar' } 
                    </button>
                </div>
                <div className={styles.project_info}>
                    {showServiceForm && <ServiceForm 
                      handleSubmit={createService}
                      btnText="Adicionar Serviço"
                      projectData={project}
                    />}
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.lenght > 0 &&
                      services.map((service) => (
                        <ServiceCard
                          id={service.id}
                          name={service.name} 
                          controle={service.controle} 
                          description={service.description} 
                          key={service.key} 
                          handleRemove={removeService}  
                        />
                      ))
                    
                    }
                    {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                </Container>
            </Container>
        </div>
      ): (
        <Loading />
      )}
    
    </>)
    
    
}

export default Project