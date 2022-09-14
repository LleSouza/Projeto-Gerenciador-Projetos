import { useState,useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){
  const [project, setProject] = useState(projectData || {})
  const [categories,setCategories] = useState([]) // Criando a constante com um array vazio esperando a resposta do backend(API) para ser preenchido
 
  
  // Recebendo a resposta do backend(API)
  useEffect(() =>{
    fetch('http://localhost:5000/categories',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((resp) => resp.json())
  .then((data) =>{
    setCategories(data)
  })
  .catch((err) => console.log(err))
  }, [])

  // Criando a constante submit  para enviar os dados para o banco
  const submit = (e) =>{
    e.preventDefault()
    handleSubmit(project)
  }

  // Essa estrutura é mais para trabalhar com banco NOSQL (mongodb)

  // Criando a função handleChange (inserir os dados no banco e altera o valor do objeto)
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value}) 
  }

// Criando a função handleCategory (selecionar os dados no banco)
function handleCategory(e) {
  setProject({
    ...project,
    category:{
    id: e.target.value,
    name: e.target.options[e.target.selectedIndex].text,
  },
  })
}  
  
  return(
        <form onSubmit={submit} className={styles.form}>
            <Input
              type="text"
              text="Nome do Projeto"
              name="name"
              placeholder="Insira o nome do projeto"
              handleOnChange={handleChange}
              value={project.name}
            />
            <Input
              type="number"
              text="Orçamento do projeto"
              name="budget"
              placeholder= " Insira o orçamento total"
              handleOnChange={handleChange}
              value={project.budget}
            />
            <Select 
               name="category_id" 
               text="Selecione a categoria" 
               options={categories}  
               handleOnChange={handleCategory}
               value={project.category ? project.category.id : ''} 
            />
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ProjectForm