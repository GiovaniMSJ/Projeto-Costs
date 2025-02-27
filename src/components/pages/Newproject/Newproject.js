import styles from './Newproject.module.css'
import { redirect, useNavigate } from 'react-router-dom'


import ProjectForm from '../../project/ProjectForm/ProjectForm'

function NewProject () {

    const navigate = useNavigate()

    function createPosts(project) {
        // initailize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/projects', {massage: 'Projeto criado com sucesso!'})
            //redirect
        }).catch((e) => console.log('Deu erro aqui'))

    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviçoes</p>
            <ProjectForm handleSubmit={createPosts} btnText='Criar Projeto' />
        </div>
    )
}

export default NewProject