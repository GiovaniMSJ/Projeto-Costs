import Input from '../../form/input'
import Select from '../../form/select'
import SubmitButton from '../../form/submitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}) {
    return (
        <form className={styles.form}>
            <Input 
                type='text' 
                text='Nome do projeto' 
                name='name' 
                placeholder='Insira o nome do projeto' 
            />
            <Input 
                type='number'
                text='Orcamento do projeto'
                name='budget'
                placeholder='Insira o orçamento total'
            />
            <Select name='category_id' text='Selecione a categoria' />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm