import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
import {Formik,Form,Field, ErrorMessage} from "formik"
import * as yup from "yup"

function Users() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  

  return (
    <section>
      <div className={styles.newproject_container}>
            <h1>Login</h1>
           <Formik 
           initialValues={{}}  >
          
            <Form className="login-form">
              <div className="login-form-group">
                <Field name="email" className="form-field"
                placeholder="Email" />

                <ErrorMessage 
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              <div className="login-form-group">
                <Field name="password" className="form-field"
                placeholder="Senha" />

                <ErrorMessage 
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit">Logar</button>
            </Form>

           </Formik>
            
        </div>
      <p>
        Voltar para a <button onClick={handleClick}>Home</button>
      </p>
      
    </section>
  )
}

export default Users