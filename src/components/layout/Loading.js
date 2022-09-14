import loading from '../../img/loading.svg'
import styles from './Loading.module.css'

// Essa função utiliza a imagem "LOADING" importada da pasta "IMG"
function Loading(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )

}
export default Loading