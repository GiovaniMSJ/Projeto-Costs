import styles from './Newproject.module.css'


import ProjectForm from '../../project/ProjectForm'

function NewProject () {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviçoes</p>
            <ProjectForm />
        </div>
    )
}

export default NewProject