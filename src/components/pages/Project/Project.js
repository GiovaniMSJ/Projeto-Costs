import styles from './Project.module.css'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { parse, v4 as uuidv4 } from 'uuid'

import Loading from '../../layout/Loading/loading'
import Container from '../../layout/Container/Container'
import ProjectForm from '../../project/ProjectForm/ProjectForm'
import Message from '../../layout/Message/Message'
import ServiceForm from '../../service/Service'
import ServiceCard from '../../service/ServiceCard'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [messagem, setMessagem] = useState('')
    const [typeMessagem, setTypeMessagem] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            }).catch((e) => console.log('Deu erro aqui => ' + e))


    }, [id])

    function editPost(project) {
        setMessagem('')

        if (project.budget < project.cost) {
            setMessagem('O orçamento não pode ser menor que o custo do projeto!')
            setTypeMessagem('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessagem('Projeto atualizado!')
                setTypeMessagem('success')
            }).catch((e) => console.log('Deu erro aqui =>' + e))
    }

    function toggleProjetForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService() {
        setMessagem('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //masimum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessagem('Orçamento ultrapassado, verifique o valor do serviço')
            setTypeMessagem('error')
            project.services.pop()
            return false
        }

        // Add service cost to project total cost
        project.cost = newCost
        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((respo) => respo.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch((e) => 
            console.log('Deu erro aqui => ' + e)
        )
    }

    function removeServices(id, cost) {
        const serviceUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdate = project
        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        }).then((respo) => respo.json())
        .then((data) => {
            setProject(projectUpdate)
            setServices(serviceUpdate)
            setMessagem('Serviço removido com sucesso!')
            setTypeMessagem('success')
        })
        .catch((e) => console.log('Deu erro aqui =>' + e))
    }   


    return (
        <>
            {project.name ? (
                <div className={styles.project_datails}>
                    <Container customClass='column'>
                        {messagem && <Message type={typeMessagem} msg={messagem} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjetForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services.length > 0 && 
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeServices}
                                    />
                                ))
                            }
                            {services.length === 0 &&
                                <p>Não há serviços cadastrados.</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project