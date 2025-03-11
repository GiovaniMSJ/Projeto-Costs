import { useEffect, useState } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'

function Project () {

    const { id } = useParams()
    const [project, setProject] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',   
            }
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            console.log(data)
        }).catch((e) => console.log('Deu erro aqui => ' + e))


    }, [id])
    

    return (
        <p>{project.name}</p>
    )
}

export default Project