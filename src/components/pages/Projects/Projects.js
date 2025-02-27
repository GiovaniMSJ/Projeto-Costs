import { useLocation } from "react-router-dom"

import Message from "../../layout/Message/Message"
import Container from '../../layout/Container/Container'
import LinkButton from '../../layout/LinkButton/LinkButton'
import ProjectCard from "../../project/ProjectCard/ProjectCard"

import styles from './Project.module.css'
import { useEffect, useState } from "react"

function Projects() {

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if(location.state) {
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
        }).catch((e) => console.log(e))

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto'></LinkButton>
            </div>
            {message && <Message type='success' msg={message}  /> }
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => 
                    <ProjectCard 
                    id={project.id}
                    name={project.name} 
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    />)}
            </Container>
        </div>
    )
}

export default Projects