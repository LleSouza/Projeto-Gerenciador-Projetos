import styles from '../project/ProjectForm.module.css'
import {useState} from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({handleSubmit,btnText,projectData}){
    const [service,setService] = useState({})

    // Criando a função submit
    function submit(e) {
      e.preventDefault()
      projectData.services.push(service)
      handleSubmit(projectData)
    }

    // criando a função handlechange
    function handlechange(e) {
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          text="Nome do serviço"
          name="name"
          placeholder="Insira o nome do serviço"
          handleOnChange={handlechange}
        />
        <Input
          type="number"
          text="custo do serviço"
          name="controle"
          placeholder="Insira o valor total"
          handleOnChange={handlechange}
        />
        <Input
          type="text"
          text="Descrição do serviço"
          name="description"
          placeholder="Descreva o serviço"
          handleOnChange={handlechange}
        />
        <SubmitButton text={btnText} />
    </form>
    )
}

export default ServiceForm