import { useState, useEffect } from 'react'
import styles from './Message.module.css'

function Message({type, msg}){
    const [visible,setVisible] = useState(false)
    useEffect(() =>{
        // retorna a visibilidade falsa (não existe mensagem)
        if (!msg) {
            setVisible(false)
            return
          }
        // inicia a sessão  com tempo de 3 segundos (existe mensagem)
          setVisible(true)
          const timer = setTimeout(() => {
            setVisible(false)
          },3000)
        // encerra a sessão e retorna a mensagem
        return() => clearTimeout(timer)
    }, [msg])
    return(
        <>
        {visible && (
          <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
      
}

export default Message