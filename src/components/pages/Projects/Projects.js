import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Message from "../../layout/Message/Message"
import Container from '../../layout/Container/Container'
import LinkButton from '../../layout/LinkButton/LinkButton'
import ProjectCard from "../../project/ProjectCard/ProjectCard"
import Loading from "../../layout/Loading/loading"

import styles from './Project.module.css'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removerLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((r) => r.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            }).catch((e) => console.log(e))
    }, [])

    function removerProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',     
            }
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        }).catch((e) => console.log('DEU ERRO AQUI  =>' + e))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto'></LinkButton>
            </div>
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) =>
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removerProject}
                        />)}
                {!removerLoading && <Loading />}
                {removerLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados!</p>
                }
            </Container>
        </div>
    )
}

export default Projects